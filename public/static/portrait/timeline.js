// A growing spiral: sparse in the early years, dense towards the present.
const host = document.querySelector('.timeline-tornado');
const canvas = document.querySelector('#timeline-boids');
const desktop = matchMedia('(min-width: 1001px)');
let inView = false;
let starting = false;
let contextLost = false;
let scene;
let frame = 0;
let last = 0;
let elapsed = 0;
const pointer = { active: false, x: 0, y: 0 };

// Listen on the page so the decorative canvas never intercepts links or scrolling.
document.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse' || !desktop.matches || !inView) {
    pointer.active = false;
    return;
  }
  const rect = host.getBoundingClientRect();
  pointer.active = event.clientX >= rect.left && event.clientX <= rect.right
    && event.clientY >= rect.top && event.clientY <= rect.bottom;
  pointer.x = event.clientX - rect.left - rect.width / 2;
  pointer.y = rect.height / 2 - (event.clientY - rect.top);
}, { passive: true });
const releasePointer = () => { pointer.active = false; };
document.documentElement.addEventListener('pointerleave', releasePointer);
window.addEventListener('blur', releasePointer);
window.addEventListener('scroll', releasePointer, { passive: true });

function animate(now) {
  frame = 0;
  elapsed += last ? Math.min((now - last) / 1000, 0.05) : 0;
  last = now;
  scene.draw(elapsed);
  frame = requestAnimationFrame(animate);
}

function sync() {
  cancelAnimationFrame(frame);
  frame = 0;
  last = 0;
  if (!scene || contextLost || !inView || !desktop.matches || document.hidden) {
    releasePointer();
    return;
  }
  scene.draw(elapsed);
  frame = requestAnimationFrame(animate);
}

async function start() {
  if (scene || starting || !desktop.matches || !inView) return;
  starting = true;
  try {
    const THREE = await import('./assets/vendor/three.module.min.js');
    const renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: true, powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const world = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2000);
    camera.position.z = 1000;
    const geometry = new THREE.BufferGeometry();
    // The same folded, three-dimensional wings as the hero's boids.
    geometry.setAttribute('position', new THREE.Float32BufferAttribute([
      1, 0, 0, -0.65, 0.65, 0.35, -0.35, 0, -0.4,
      1, 0, 0, -0.35, 0, -0.4, -0.65, -0.65, 0.35,
      1, 0, 0, -0.65, -0.65, 0.35, -0.65, 0.65, 0.35,
    ], 3));
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide, transparent: true, opacity: 0.8,
    });
    const count = 1200;
    const birds = new THREE.InstancedMesh(geometry, material, count);
    birds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    birds.frustumCulled = false;
    world.add(birds);
    const dummy = new THREE.Object3D();
    const direction = new THREE.Vector3();
    const nextPosition = new THREE.Vector3();
    const forward = new THREE.Vector3(1, 0, 0);
    const tint = new THREE.Color();
    let width = 1;
    let height = 1;
    let currentHue = '';
    let previousDrawTime = 0;
    // Deterministic placement avoids a new composition on each visit.
    let seed = 1999;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const flock = Array.from({ length: count }, () => ({
      depth: Math.pow(random(), 0.36),
      // Three loose streams make the spiral readable without rigid rings.
      phase: Math.floor(random() * 3) * Math.PI * 2 / 3 + random() * 1.5,
      radius: 0.55 + random() * 0.45,
      size: 1.5 + random() * 1.8,
      brightness: 0.4 + random() * 0.6,
      speed: 0.85 + random() * 0.3,
      turbulence: random() * Math.PI * 2,
      wander: random() < 0.14 ? 1 : 0,
      offsetX: 0,
      offsetY: 0,
      velocityX: 0,
      velocityY: 0,
    }));
    function color() {
      const hue = getComputedStyle(document.documentElement).getPropertyValue('--h').trim();
      if (hue === currentHue) return;
      currentHue = hue;
      tint.setHSL((Number(hue) || 0) / 360, 0.61, 0.72);
      for (let i = 0; i < count; i++) {
        birds.setColorAt(i, tint.clone().multiplyScalar(flock[i].brightness));
      }
      birds.instanceColor.needsUpdate = true;
    }
    function positionAt(bird, time, target) {
      const u = bird.depth;
      const noise = bird.turbulence;
      // Smooth, overlapping eddies keep the motion organic, without frame-to-frame jitter.
      const eddy = Math.sin(time * 0.27 + u * 17 + noise);
      const flutter = Math.sin(time * 0.43 + noise * 2.3);
      const excursion = bird.wander * Math.pow((Math.sin(time * 0.21 + noise) + 1) / 2, 3);
      // Rotation accelerates towards the dense base; individual birds still vary slightly.
      const angularSpeed = (0.055 + Math.pow(u, 1.8) * 0.38) * bird.speed;
      const angle = bird.phase + u * 12 + time * angularSpeed + eddy * 0.48 + flutter * 0.16;
      const radius = (7 + Math.pow(u, 2.1) * width * 0.36)
        * (bird.radius + eddy * 0.12) + excursion * width * 0.065 * (0.2 + u);
      const bend = Math.sin(u * 5 + time * 0.11) * width * 0.045;
      target.set(
        Math.cos(angle) * radius + bend + flutter * width * 0.022 * (0.2 + u),
        height * (0.46 - u * 0.88) + Math.sin(angle) * width * 0.045 * u
          + Math.sin(Math.PI * u) * height * 0.024 * eddy + flutter * 5,
        Math.sin(angle) * radius + flutter * width * 0.035,
      );
    }
    function draw(time) {
      const dt = Math.min(0.05, Math.max(0, time - previousDrawTime));
      previousDrawTime = time;
      const reach = Math.min(110, width * 0.32);
      for (let i = 0; i < count; i++) {
        const bird = flock[i];
        positionAt(bird, time, dummy.position);
        positionAt(bird, time + 0.04, nextPosition);
        direction.subVectors(nextPosition, dummy.position).multiplyScalar(25);
        let targetX = 0;
        let targetY = 0;
        if (pointer.active) {
          const dx = dummy.position.x - pointer.x;
          const dy = dummy.position.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < reach) {
            const falloff = 1 - distance / reach;
            const force = reach * 0.8 * falloff * falloff;
            const nx = distance > 0.001 ? dx / distance : Math.cos(bird.phase);
            const ny = distance > 0.001 ? dy / distance : Math.sin(bird.phase);
            // A little sideways curl makes the avoidance feel like a local gust.
            targetX = (nx - ny * 0.25) * force;
            targetY = (ny + nx * 0.25) * force;
          }
        }
        // Damped springs ease away from the pointer and gently return to the flock.
        bird.velocityX += ((targetX - bird.offsetX) * 18 - bird.velocityX * 7) * dt;
        bird.velocityY += ((targetY - bird.offsetY) * 18 - bird.velocityY * 7) * dt;
        bird.offsetX += bird.velocityX * dt;
        bird.offsetY += bird.velocityY * dt;
        dummy.position.x += bird.offsetX;
        dummy.position.y += bird.offsetY;
        // Bank into the actual flight direction, including the mouse disturbance.
        direction.x += bird.velocityX;
        direction.y += bird.velocityY;
        direction.normalize();
        dummy.quaternion.setFromUnitVectors(forward, direction);
        dummy.rotateX(Math.sin(time * 0.43 + bird.turbulence) * 0.7);
        dummy.scale.setScalar(bird.size);
        dummy.updateMatrix();
        birds.setMatrixAt(i, dummy.matrix);
      }
      birds.instanceMatrix.needsUpdate = true;
      renderer.render(world, camera);
    }
    function resize() {
      releasePointer();
      if (!desktop.matches || contextLost) return;
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      color();
      draw(elapsed);
    }
    scene = { draw, resize };
    new ResizeObserver(resize).observe(host);
    new MutationObserver(() => {
      color();
      if (!contextLost && inView && desktop.matches && !document.hidden) draw(elapsed);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      contextLost = true;
    });
    canvas.addEventListener('webglcontextrestored', () => {
      contextLost = false;
      resize();
      sync();
    });
    resize();
    sync();
  } catch (error) {
    console.warn('Timeline animation could not start', error);
  } finally {
    starting = false;
  }
}

new IntersectionObserver((entries) => {
  inView = entries[0].isIntersecting;
  start();
  sync();
}).observe(host);
desktop.addEventListener('change', () => {
  start();
  scene?.resize();
  sync();
});
document.addEventListener('visibilitychange', sync);
window.addEventListener('pagehide', () => {
  releasePointer();
  cancelAnimationFrame(frame);
  last = 0;
});
window.addEventListener('pageshow', sync);
