import { settings } from './portrait-settings.mjs';
import { PortraitFlock } from './flocking.mjs';
const root = document.documentElement;
const host = document.querySelector('#portrait-scene');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const skillSvgs = [...document.querySelectorAll('.expertise .skill-svg')];
if (skillSvgs.length) {
  const revealSkills = () =>
    skillSvgs.forEach((svg) => svg.classList.add('start'));
  if (reduced.matches) revealSkills();
  else
    new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealSkills();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    ).observe(document.querySelector('.expertise'));
}
let hue = 12,
  paused = reduced.matches,
  available = false,
  visible = true,
  frame = 0,
  last = 0,
  elapsed = 0;
let renderer,
  scene,
  camera,
  flock,
  geometry,
  material,
  points,
  THREE,
  boidMaterial;
const boidLayers = [];
let width = 1,
  height = 1,
  halfWidth = 80,
  baseTargets,
  levels,
  sizes,
  initialized = false;
const pointer = { active: false, x: 0, y: 0 };
let sceneScale = 1,
  portraitVisible = true,
  heroRect;
function viewport() {
  if (!available) return;

  const rect = document.querySelector('.hero').getBoundingClientRect();
  portraitVisible = rect.bottom > -180 && rect.top < innerHeight + 180;
  points.visible = portraitVisible;
  visible = portraitVisible;
}
function paint() {
  if (available) {
    viewport();
    syncBoidLayers();
    renderer.render(scene, camera);
  }
}
function makeBoidLayer(source, owner, isPortrait = false) {
  const g = new THREE.InstancedBufferGeometry();
  // Two folded wings give each triangular boid real depth and visible banking.
  g.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        1, 0, 0, -0.65, 0.65, 0.35, -0.35, 0, -0.4, 1, 0, 0, -0.35, 0, -0.4,
        -0.65, -0.65, 0.35, 1, 0, 0, -0.65, -0.65, 0.35, -0.65, 0.65, 0.35,
      ],
      3
    )
  );
  const mapping = {
    offset: 'position',
    brightness: 'level',
    extent: 'size',
    flight: 'travel',
    appearance: 'opacity',
  };
  for (const [to, from] of Object.entries(mapping))
    g.setAttribute(
      to,
      new THREE.InstancedBufferAttribute(
        source.attributes[from].array,
        source.attributes[from].itemSize
      ).setUsage(THREE.DynamicDrawUsage)
    );
  const count = source.attributes.level.count;
  g.instanceCount = count;
  g.setAttribute(
    'orientation',
    new THREE.InstancedBufferAttribute(new Float32Array(count * 4), 4).setUsage(
      THREE.DynamicDrawUsage
    )
  );
  const mesh = new THREE.Mesh(g, boidMaterial);
  mesh.frustumCulled = false;
  scene.add(mesh);
  boidLayers.push({
    g,
    owner,
    source,
    mesh,
    isPortrait,
    lastOrientationTime: elapsed,
    orientationReady: false,
    current: new THREE.Quaternion(),
    q: new THREE.Quaternion(),
    roll: new THREE.Quaternion(),
    direction: new THREE.Vector3(),
    axis: new THREE.Vector3(1, 0, 0),
  });
}
function syncBoidLayers() {
  for (const layer of boidLayers) {
    layer.mesh.visible = layer.owner.visible;
    if (!layer.mesh.visible) continue;
    const orientations = layer.g.attributes.orientation.array;
    const rotationDt = Math.min(
      0.05,
      Math.max(0, elapsed - layer.lastOrientationTime)
    );
    layer.lastOrientationTime = elapsed;
    for (let i = 0; i < layer.g.instanceCount; i++) {
      const k = i * 3;
      if (layer.isPortrait) {
        layer.direction.set(
          flock.velocity[k],
          flock.velocity[k + 1],
          flock.velocity[k + 2]
        );
      } else {
        const angle = layer.source.attributes.angle.array[i];
        layer.direction.set(
          Math.cos(angle),
          Math.sin(angle),
          Math.sin(elapsed * 0.4 + i) * 0.35
        );
      }
      // Retain heading at rest instead of snapping back to the X axis.
      if (layer.direction.lengthSq() < 0.0025) {
        if (layer.orientationReady) continue;
        layer.direction.set(1, 0, 0);
      }
      layer.direction.normalize();
      layer.q.setFromUnitVectors(layer.axis, layer.direction);
      const bank = Math.sin(elapsed * 0.45 + i * 2.39) * 0.32;
      layer.roll.setFromAxisAngle(layer.axis, bank);
      layer.q.multiply(layer.roll);
      if (layer.orientationReady) {
        layer.current.fromArray(orientations, i * 4);
        const angle = layer.current.angleTo(layer.q);
        const blend = Math.min(
          1 - Math.exp((-3 * rotationDt) / settings.rotationSmooth),
          angle > 0 ? (1.8 * rotationDt) / (angle * settings.rotationSmooth) : 1
        );
        layer.current
          .slerp(layer.q, blend)
          .normalize()
          .toArray(orientations, i * 4);
      } else layer.q.toArray(orientations, i * 4);
    }
    layer.orientationReady = true;
    for (const name of [
      'offset',
      'brightness',
      'extent',
      'flight',
      'appearance',
      'orientation',
    ])
      layer.g.attributes[name].needsUpdate = true;
  }
}
function applyHue(value) {
  hue = value;
  root.style.setProperty('--h', String(hue));
  document
    .querySelectorAll('[data-hue]')
    .forEach((b) =>
      b.setAttribute(
        'aria-pressed',
        String(Math.abs(Number(b.dataset.hue) - hue) < 1)
      )
    );
  if (material) material.uniforms.tint.value.setHSL(hue / 360, 0.61, 0.72);
  paint();
}
document
  .querySelectorAll('[data-hue]')
  .forEach((b) =>
    b.addEventListener('click', () => applyHue(Number(b.dataset.hue)))
  );
document.querySelector('#color').addEventListener('input', (e) => {
  const hex = e.target.value,
    [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    d = max - min;
  const h = !d
    ? 12
    : max === r
    ? 60 * (((g - b) / d) % 6)
    : max === g
    ? 60 * ((b - r) / d + 2)
    : 60 * ((r - g) / d + 4);
  applyHue((h + 360) % 360);
});
const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
function assemblyAt(t) {
  return 0.42 + 0.18 * Math.sin(t * 0.22);
}
function updateStatus() {
  root.dataset.sceneStatus = paused ? 'paused' : 'running';
}
function sync() {
  cancelAnimationFrame(frame);
  frame = 0;
  last = 0;
  if (available && !paused && visible && !document.hidden)
    frame = requestAnimationFrame(tick);
  updateStatus();
  paint();
}
function buildPortrait() {
  flock.beginBuild();
  geometry.attributes.travel.array.fill(1);
  for (const name of ['position', 'travel', 'opacity'])
    geometry.attributes[name].needsUpdate = true;
}
function rebuildPortrait() {
  elapsed = 0;
  pointer.active = false;
  paused = false;
  if (flock) buildPortrait();
  sync();
}
reduced.addEventListener('change', () => {
  paused = reduced.matches;
  if (paused && flock) {
    flock.settle();
    geometry.attributes.position.needsUpdate = true;
  }
  sync();
});
document.addEventListener('visibilitychange', sync);
function resize() {
  if (!available) return;
  const r = host.getBoundingClientRect(),
    anchor = document.querySelector('.portrait').getBoundingClientRect();
  heroRect = document.querySelector('.hero').getBoundingClientRect();
  width = document.documentElement.clientWidth;
  height = document.body.scrollHeight;
  sceneScale = 100 / (heroRect.height + 30);
  halfWidth = (width / 2) * sceneScale;

  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1, 8192 / height));
  renderer.setSize(width, height, false);
  const scale = sceneScale;
  const size = Math.min(anchor.width * 1.2, anchor.height * 1.12);
  // On mobile, align the artwork with the hero's 20px right inset.
  const left = matchMedia('(max-width: 680px)').matches
    ? anchor.right - r.left - size
    : anchor.left - r.left - anchor.width * 0.16;
  const top = anchor.top + scrollY + (anchor.height - size) / 2 - 8;
  // Off-axis perspective: keep the optical center on the portrait while
  // the same canvas spans the document. z=0 still maps exactly to DOM pixels.
  const cameraX = (left + size * 0.66 - width / 2) * scale;
  const cameraY = -(top + size * 0.52) * scale;
  const distance = 180,
    near = 1;
  camera.position.set(cameraX, cameraY, distance);
  camera.projectionMatrix.makePerspective(
    ((-halfWidth - cameraX) * near) / distance,
    ((halfWidth - cameraX) * near) / distance,
    (-cameraY * near) / distance,
    ((-height * scale - cameraY) * near) / distance,
    near,
    1000
  );
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
  camera.updateMatrixWorld();
  pointer.cameraX = cameraX;
  pointer.cameraY = cameraY;
  pointer.cameraZ = distance;
  const target = flock.targets;
  for (let i = 0; i < flock.count; i++) {
    const k = i * 3;
    const nx = (left + baseTargets[k] * size - width / 2) * scale;
    const ny = (-top - baseTargets[k + 1] * size) * scale;
    const nz = baseTargets[k + 2] * size * scale;
    if (target[k] || target[k + 1]) {
      flock.position[k] += nx - target[k];
      flock.position[k + 1] += ny - target[k + 1];
    }
    target[k] = nx;
    target[k + 1] = ny;
    target[k + 2] = nz;
  }
  geometry.attributes.position.needsUpdate = true;
  material.uniforms.pixelRatio.value = renderer.getPixelRatio();
  boidMaterial.uniforms.worldPerPixel.value = sceneScale;
  if (!initialized) {
    buildPortrait();
    initialized = true;
    geometry.attributes.position.needsUpdate = true;
  }
  if (paused) {
    flock.settle();
    geometry.attributes.position.needsUpdate = true;
  }
  viewport();
  paint();
}
function tick(now) {
  frame = 0;
  if (paused || !visible || document.hidden || !available) return;
  const dt = Math.min((now - (last || now)) / 1000, 0.035);
  last = now;
  elapsed += dt;
  const a = assemblyAt(elapsed);
  if (portraitVisible)
    flock.step(dt, a, elapsed, { x: halfWidth, y: 50 }, pointer);
  geometry.attributes.position.needsUpdate = true;
  const angle = geometry.attributes.angle.array,
    travel = geometry.attributes.travel.array;
  for (let i = 0; i < flock.count; i++) {
    const k = i * 3;
    angle[i] = Math.atan2(flock.velocity[k + 1], flock.velocity[k]);
    travel[i] = Math.min(
      1,
      Math.hypot(
        flock.position[k] - flock.targets[k],
        flock.position[k + 1] - flock.targets[k + 1]
      ) * 0.09
    );
  }
  geometry.attributes.angle.needsUpdate = true;
  geometry.attributes.travel.needsUpdate = true;
  geometry.attributes.opacity.needsUpdate = true;
  if (Math.floor(elapsed * 2) !== Math.floor((elapsed - dt) * 2))
    updateStatus();
  paint();
  frame = requestAnimationFrame(tick);
}
async function loadPortrait() {
  const variant = innerWidth < 700 ? 'mobile' : 'desktop';
  const response = await fetch(new URL(`./assets/portrait-${variant}.bin`, import.meta.url));
  if (!response.ok) throw new Error(`Portrait data: HTTP ${response.status}`);
  const buffer = await response.arrayBuffer();
  const header = new DataView(buffer);
  if (buffer.byteLength < 12 || header.getUint32(0, true) !== 0x314c4650)
    throw new Error('Invalid portrait data');
  const count = header.getUint32(4, true);
  if (!count || count > 11500 || buffer.byteLength !== 12 + count * 20)
    throw new Error('Invalid portrait point count');
  let seed = header.getUint32(8, true);
  baseTargets = new Float32Array(buffer, 12, count * 3);
  levels = new Float32Array(buffer, 12 + count * 12, count);
  sizes = new Float32Array(buffer, 12 + count * 16, count);
  return () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
}

async function init() {
  try {
    THREE = await import('./assets/vendor/three.module.min.js');
    const random = await loadPortrait();
    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#flock'),
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    flock = new PortraitFlock(
      new Float32Array(baseTargets.length),
      random,
      baseTargets
    );
    geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(flock.position, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    geometry.setAttribute(
      'opacity',
      new THREE.BufferAttribute(flock.opacity, 1).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    geometry.setAttribute('level', new THREE.BufferAttribute(levels, 1));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute(
      'angle',
      new THREE.BufferAttribute(new Float32Array(flock.count), 1).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    geometry.setAttribute(
      'travel',
      new THREE.BufferAttribute(new Float32Array(flock.count), 1).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      uniforms: {
        tint: { value: new THREE.Color().setHSL(hue / 360, 0.61, 0.72) },
        pixelRatio: { value: 1 },
      },
      vertexShader: `attribute float opacity;attribute float level;attribute float size;attribute float angle;attribute float travel;uniform float pixelRatio;varying float vLevel;varying float vAngle;varying float vTravel;varying float vEdge;void main(){vLevel=level*opacity;vAngle=angle;vTravel=travel;vec4 p=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*p;vEdge=1.-smoothstep(.93,1.,abs(gl_Position.x/gl_Position.w));gl_PointSize=(size+travel*2.8)*pixelRatio*(180./max(1.,-p.z));}`,
      fragmentShader:
        `uniform vec3 tint;varying float vLevel;varying float vAngle;varying float vTravel;varying float vEdge;void main(){vec2 p=gl_PointCoord-.5;p.y=-p.y;float c=cos(vAngle),s=sin(vAngle);p=mat2(c,-s,s,c)*p;float circle=1.-smoothstep(.32,.5,length(p));float tri=(1.-smoothstep(.0,.04,abs(p.y)-(.46-p.x)*.48))*step(-.42,p.x)*step(p.x,.47);float alpha=mix(circle,tri,vTravel)*vLevel*.94*vEdge*(1.-smoothstep(.15,.7,vTravel));if(alpha<.002)discard;gl_FragColor=vec4(tint,alpha);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`.replace(
          ';#include',
          ';\n#include'
        ),
    });
    boidMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
      uniforms: { tint: material.uniforms.tint, worldPerPixel: { value: 1 } },
      vertexShader: `attribute vec3 offset;attribute float appearance;attribute float brightness;attribute float extent;attribute float flight;attribute vec4 orientation;uniform float worldPerPixel;varying float vAlpha;varying float vShade;varying float vEdge;
      vec3 rotateQ(vec3 p,vec4 q){return p+2.*cross(q.xyz,cross(q.xyz,p)+q.w*p);}
      void main(){
        float flightVisibility=smoothstep(.15,.7,flight);vAlpha=flightVisibility*brightness*.94*appearance;
        vec3 vertex=rotateQ(position,orientation)*(extent+2.8)*worldPerPixel*.65;
        vec3 normal=rotateQ(vec3(0.,0.,1.),orientation);vShade=.55+.45*abs(dot(normal,normalize(vec3(-.3,.5,1.))));
        vec4 p=modelViewMatrix*vec4(offset+vertex,1.);gl_Position=projectionMatrix*p;
        vEdge=1.-smoothstep(.93,1.,abs(gl_Position.x/gl_Position.w));
      }`,
      fragmentShader: `uniform vec3 tint;varying float vAlpha;varying float vShade;varying float vEdge;void main(){float alpha=vAlpha*vEdge;if(alpha<.002)discard;gl_FragColor=vec4(tint*vShade,alpha);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
    });
    points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);
    makeBoidLayer(geometry, points, true);
    available = true;
    resize();
    if (paused) {
      flock.settle();
      geometry.attributes.position.needsUpdate = true;
    }
    new ResizeObserver(resize).observe(document.body);

    let scrollFrame = 0;
    window.addEventListener(
      'scroll',
      () => {
        if (!scrollFrame)
          scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            pointer.active = false;
            viewport();
            sync();
          });
      },
      { passive: true }
    );
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      if (e.target.closest('#portrait-panel')) {
        pointer.active = false;
        return;
      }
      pointer.x = (e.clientX - width / 2) * sceneScale;
      pointer.y = -(e.clientY + scrollY) * sceneScale;
      pointer.active = true;
    });
    document.documentElement.addEventListener('pointerleave', () => {
      pointer.active = false;
    });
    window.addEventListener('blur', () => {
      pointer.active = false;
    });
    document
      .querySelector('#flock')
      .addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        available = false;
        cancelAnimationFrame(frame);
        root.dataset.sceneStatus = 'context-lost';
        const notice = document.querySelector('#tuner-status');
        if (notice)
          notice.textContent = 'Rendu 3D interrompu. Recharge la page.';
      });

    sync();
  } catch (error) {
    console.error('Portrait scene could not start', error);
    available = false;
    root.dataset.sceneStatus = 'unavailable';
    root.classList.add('scene-unavailable');
  }
}
init();
