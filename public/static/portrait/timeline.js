// A dense murmuration: a circulating volume folded by shared travelling waves.
const host = document.querySelector('.timeline-tornado');
const canvas = document.querySelector('#timeline-boids');
const desktop = matchMedia('(min-width: 1001px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let inView = false;
let starting = false;
let contextLost = false;
let scene;
let frame = 0;
let last = 0;
// Start at a different point in the slow movement on each page load.
let elapsed = Math.random() * 600;
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
  if (!reduced.matches) frame = requestAnimationFrame(animate);
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
      side: THREE.DoubleSide, transparent: true, opacity: 0.88,
    });
    const count = 4800;
    const birds = new THREE.InstancedMesh(geometry, material, count);
    birds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    birds.frustumCulled = false;
    world.add(birds);
    const dummy = new THREE.Object3D();
    const direction = new THREE.Vector3();
    const nextPosition = new THREE.Vector3();
    const forward = new THREE.Vector3(1, 0, 0);
    const tint = new THREE.Color();
    const birdTint = new THREE.Color();
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
    const flock = Array.from({ length: count }, () => {
      // Sample a filled sphere, not a shell or separate spiral tracks.
      const latitude = random() * 2 - 1;
      const phase = random() * Math.PI * 2;
      const radius = Math.cbrt(random());
      const ring = Math.sqrt(1 - latitude * latitude) * radius;
      return {
        x: Math.cos(phase) * ring,
        y: latitude * radius,
        z: Math.sin(phase) * ring,
        phase,
        size: 0.65 + random() * 0.85,
        brightness: 0.48 + random() * 0.52,
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
      };
    });
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
      time *= 0.18;
      // Circulation carries birds through the volume. Nearby birds share the
      // same flow; their individual phases never drive the flock's silhouette.
      const turn = time * 0.24;
      const u = bird.y * Math.cos(turn) - bird.z * Math.sin(turn);
      const v = bird.y * Math.sin(turn) + bird.z * Math.cos(turn);
      const twist = u * 1.5 + time * 0.16;
      const cross = bird.x * Math.cos(twist) - v * Math.sin(twist);
      const depth = bird.x * Math.sin(twist) + v * Math.cos(twist);
      // Overlapping swells travel at different rates, so the whole mass never
      // straightens into one ribbon. Keep the cross-section full even at a neck.
      const wave = u * 4.2 - time * 0.43;
      const swell = u * 6.3 + time * 0.29;
      const fullness = 0.9 + 0.13 * Math.sin(swell) + 0.09 * Math.cos(wave);
      const stretch = 0.83 + 0.12 * Math.sin(time * 0.27);
      const spine = Math.sin(wave) * 0.14 + Math.sin(swell) * 0.075;
      const driftX = Math.sin(time * 0.19) * 0.025;
      const driftY = Math.sin(time * 0.23) * 0.035;
      const roll = 0.35 * Math.sin(time * 0.21 + u * 2.4);
      const belly = cross * Math.cos(roll) - depth * Math.sin(roll);
      const away = cross * Math.sin(roll) + depth * Math.cos(roll);
      const x = spine + belly * 0.39 * fullness
        + Math.sin(depth * 3 + wave) * 0.045 + driftX;
      // Smooth compression leaves a margin while allowing the lobes to expand.
      target.set(
        width * 0.47 * Math.tanh(x / 0.47),
        height * 1.2 * (u * 0.40 * stretch + driftY
          + belly * Math.cos(wave) * 0.075
          + away * Math.sin(swell) * 0.045 + Math.sin(wave) * 0.045),
        width * (away * 0.46 * fullness + Math.sin(wave) * 0.16),
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
        let forceX = 0;
        let forceY = 0;
        if (pointer.active) {
          const dx = dummy.position.x + bird.offsetX - pointer.x;
          const dy = dummy.position.y + bird.offsetY - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < reach) {
            const falloff = 1 - distance / reach;
            const force = reach * 3 * falloff * falloff;
            const nx = distance > 0.001 ? dx / distance : Math.cos(bird.phase);
            const ny = distance > 0.001 ? dy / distance : Math.sin(bird.phase);
            // A little sideways curl makes the avoidance feel like a local gust.
            forceX = (nx - ny * 0.25) * force;
            forceY = (ny + nx * 0.25) * force;
          }
        }
        // Dampen momentum, not displacement: the mouse leaves a lasting change
        // in the flock instead of pulling birds back to their original tracks.
        const damping = Math.exp(-2.4 * dt);
        bird.velocityX = (bird.velocityX + forceX * dt) * damping;
        bird.velocityY = (bird.velocityY + forceY * dt) * damping;
        bird.offsetX += bird.velocityX * dt;
        bird.offsetY += bird.velocityY * dt;
        dummy.position.x += bird.offsetX;
        dummy.position.y += bird.offsetY;
        // Bank into the actual flight direction, including the mouse disturbance.
        direction.x += bird.velocityX;
        direction.y += bird.velocityY;
        direction.normalize();
        dummy.quaternion.setFromUnitVectors(forward, direction);
        dummy.rotateX(Math.sin(time * 0.126 + bird.y * 3) * 0.65);
        // Small wingbeats keep individual silhouettes alive within the mass.
        const wingbeat = 0.72 + 0.28 * Math.sin(time * 9 + bird.phase);

        // Depth stays legible with an orthographic camera: closer birds are
        // larger and brighter, distant birds recede into the body of the flock.
        const depthCue = Math.max(-1, Math.min(1, dummy.position.z / (width * 0.65)));
        const size = bird.size * (1 + depthCue * 0.38);
        dummy.scale.set(size, size * wingbeat, size);
        birdTint.copy(tint).multiplyScalar(bird.brightness * (0.78 + depthCue * 0.22));
        birds.setColorAt(i, birdTint);
        dummy.updateMatrix();
        birds.setMatrixAt(i, dummy.matrix);
      }
      birds.instanceMatrix.needsUpdate = true;
      birds.instanceColor.needsUpdate = true;
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
reduced.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
window.addEventListener('pagehide', () => {
  releasePointer();
  cancelAnimationFrame(frame);
  last = 0;
});
window.addEventListener('pageshow', sync);
