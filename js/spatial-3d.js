import * as THREE from "./vendor/three.module.min.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactScreen = window.matchMedia("(max-width: 47.99rem)");

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function makeMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: options.metalness ?? 0.7,
    roughness: options.roughness ?? 0.28,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
  });
}

function addRingStack(group, palette) {
  const wood = makeMaterial(palette.wood, { metalness: 0.22, roughness: 0.5 });
  const brass = makeMaterial(palette.brass, {
    metalness: 0.92,
    roughness: 0.2,
  });

  [1.82, 1.46, 1.1].forEach((radius, index) => {
    const geometry = new THREE.TorusGeometry(
      radius,
      0.055 + index * 0.012,
      10,
      96,
    );
    const ring = new THREE.Mesh(geometry, index === 1 ? brass : wood);
    ring.rotation.x = 1.05 + index * 0.08;
    ring.rotation.y = -0.18 + index * 0.12;
    ring.rotation.z = index * 0.26;
    group.add(ring);
  });

  for (let index = 0; index < 7; index += 1) {
    const geometry = new THREE.TorusGeometry(0.42 + index * 0.17, 0.012, 6, 72);
    const ring = new THREE.Mesh(geometry, index % 3 === 0 ? brass : wood);
    ring.rotation.x = 1.14;
    ring.rotation.z = index * 0.055;
    ring.position.z = -0.12 + index * 0.035;
    group.add(ring);
  }
}

function addCore(group, palette) {
  const crystal = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.53, 1),
    makeMaterial(palette.purple, {
      metalness: 0.5,
      roughness: 0.16,
      emissive: palette.purple,
      emissiveIntensity: 0.24,
    }),
  );
  crystal.scale.y = 1.35;
  crystal.rotation.z = Math.PI / 4;
  group.add(crystal);

  const cage = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.61, 1)),
    new THREE.LineBasicMaterial({
      color: palette.gold,
      transparent: true,
      opacity: 0.74,
    }),
  );
  cage.scale.y = 1.35;
  cage.rotation.z = Math.PI / 4;
  group.add(cage);
}

function addSignalPaths(group, palette) {
  const brass = makeMaterial(palette.brass, {
    metalness: 0.94,
    roughness: 0.15,
  });
  const node = new THREE.SphereGeometry(0.055, 12, 12);

  for (let index = 0; index < 5; index += 1) {
    const angle = (Math.PI * 2 * index) / 5;
    const points = [
      new THREE.Vector3(Math.cos(angle) * 0.75, Math.sin(angle) * 0.48, 0.05),
      new THREE.Vector3(
        Math.cos(angle + 0.25) * 1.18,
        Math.sin(angle + 0.25) * 0.82,
        0.22,
      ),
      new THREE.Vector3(
        Math.cos(angle + 0.42) * 1.78,
        Math.sin(angle + 0.42) * 1.12,
        -0.08,
      ),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    group.add(
      new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.018, 7, false), brass),
    );
    const endpoint = new THREE.Mesh(node, brass);
    endpoint.position.copy(points[2]);
    group.add(endpoint);
  }
}

function addOrbit(group, palette) {
  const geometry = new THREE.BufferGeometry();
  const count = compactScreen.matches ? 26 : 52;
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const radius = 2.08 + ((index * 17) % 11) * 0.028;
    positions[index * 3] = Math.cos(angle) * radius;
    positions[index * 3 + 1] = Math.sin(angle) * radius * 0.64;
    positions[index * 3 + 2] = Math.sin(index * 1.7) * 0.35;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: palette.gold,
      size: 0.035,
      transparent: true,
      opacity: 0.72,
    }),
  );
  group.add(particles);
  return particles;
}

function paletteFor(element) {
  const variant = element.dataset.spatialScene;
  if (variant === "forest") {
    return {
      wood: 0x315d4c,
      brass: 0xc79543,
      gold: 0xe3bf79,
      purple: 0x713493,
    };
  }
  if (variant === "signal") {
    return {
      wood: 0x2d2730,
      brass: 0xe0a64c,
      gold: 0xf0ca7a,
      purple: 0x9b42c2,
    };
  }
  return { wood: 0x6f4227, brass: 0xc79543, gold: 0xe3bf79, purple: 0x6f168f };
}

function createScene(element) {
  const canvas = element.querySelector("canvas");
  if (!canvas) return null;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !compactScreen.matches,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, compactScreen.matches ? 1.2 : 1.6),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.set(0, 0.15, 6.4);
  const palette = paletteFor(element);
  const object = new THREE.Group();
  object.rotation.x = -0.1;
  scene.add(object);

  addRingStack(object, palette);
  addCore(object, palette);
  addSignalPaths(object, palette);
  const orbit = addOrbit(object, palette);

  scene.add(new THREE.HemisphereLight(0xd5c8ff, 0x1a0d09, 1.8));
  const key = new THREE.PointLight(palette.gold, 24, 10);
  key.position.set(3.2, 2.2, 4.4);
  scene.add(key);
  const purple = new THREE.PointLight(palette.purple, 20, 9);
  purple.position.set(-3, -1.5, 3.2);
  scene.add(purple);

  let width = 0;
  let height = 0;
  let visible = true;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;
  const startedAt = performance.now();

  function resize() {
    const bounds = element.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(bounds.width));
    const nextHeight = Math.max(1, Math.round(bounds.height));
    if (nextWidth === width && nextHeight === height) return;
    width = nextWidth;
    height = nextHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function render() {
    resize();
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;
    object.rotation.y = currentX;
    object.rotation.x = -0.1 + currentY;

    if (!reduceMotion.matches) {
      const elapsed = (performance.now() - startedAt) / 1000;
      object.rotation.z = Math.sin(elapsed * 0.3) * 0.025;
      orbit.rotation.z = elapsed * 0.08;
      orbit.rotation.y = elapsed * -0.045;
    }

    renderer.render(scene, camera);
    frame = 0;
    if (visible && !document.hidden && !reduceMotion.matches)
      frame = requestAnimationFrame(render);
  }

  function requestRender() {
    if (!frame) frame = requestAnimationFrame(render);
  }

  function onPointerMove(event) {
    if (compactScreen.matches || reduceMotion.matches) return;
    const bounds = element.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.55;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.3;
    requestRender();
  }

  function onPointerLeave() {
    targetX = 0;
    targetY = 0;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestRender();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "120px" },
  );

  observer.observe(element);
  element.addEventListener("pointermove", onPointerMove, { passive: true });
  element.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("resize", requestRender, { passive: true });
  document.addEventListener("visibilitychange", requestRender);
  reduceMotion.addEventListener("change", requestRender);

  element.dataset.spatialReady = "true";
  requestRender();

  return () => {
    observer.disconnect();
    cancelAnimationFrame(frame);
    renderer.dispose();
  };
}

export function initSpatialScenes() {
  if (!supportsWebGL()) return;
  document.querySelectorAll("[data-spatial-scene]").forEach(createScene);
}
