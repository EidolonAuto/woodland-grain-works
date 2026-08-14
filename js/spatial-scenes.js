import { environment } from "./modules/environment.js";

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const approach = (current, target, strength) =>
  current + (target - current) * strength;

const documentTop = (element) => {
  let top = 0;
  let current = element;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }
  return top;
};

export function initSpatialScenes() {
  const scenes = [...document.querySelectorAll("[data-workshop-scene]")];
  const depthScenes = [...document.querySelectorAll("[data-depth-scene]")];
  if (!scenes.length && !depthScenes.length) return;

  if (environment.reducedMotion) {
    document.documentElement.dataset.motion = "reduced";
    return;
  }

  document.documentElement.dataset.motion = "spatial";

  const compact = environment.compact;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let sceneMetrics = [];
  let depthMetrics = [];
  let frame = 0;
  let needsMeasure = true;

  const measure = () => {
    sceneMetrics = scenes.map((scene) => ({
      element: scene,
      top: documentTop(scene),
      height: Math.max(scene.offsetHeight, 1),
      layers: [
        ...scene.querySelectorAll(
          ":scope > [data-scene-layer], :scope > * > [data-scene-layer]",
        ),
      ],
    }));

    depthMetrics = depthScenes.map((scene) => ({
      element: scene,
      top: documentTop(scene),
      height: Math.max(scene.offsetHeight, 1),
      layers: [...scene.querySelectorAll("[data-depth]")],
    }));

    needsMeasure = false;
  };

  const progressFor = (metric, viewportCenter, viewportHeight) => {
    const center = metric.top + metric.height / 2;
    const reach = Math.max((metric.height + viewportHeight) * 0.52, 1);
    return clamp((viewportCenter - center) / reach, -1, 1);
  };

  const render = () => {
    if (needsMeasure) measure();

    pointer.x = approach(pointer.x, pointer.targetX, 0.085);
    pointer.y = approach(pointer.y, pointer.targetY, 0.085);

    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = scrollPosition + viewportHeight / 2;
    const layerTravel = compact ? 22 : 42;
    const depthTravel = compact ? 44 : 92;

    sceneMetrics.forEach((metric) => {
      const progress = progressFor(metric, viewportCenter, viewportHeight);
      const distance = Math.abs(progress);
      const activity = 1 - clamp(distance / 0.9, 0, 1);

      metric.element.style.setProperty("--scene-progress", progress.toFixed(4));
      metric.element.style.setProperty("--scene-distance", distance.toFixed(4));
      metric.element.dataset.sceneState =
        distance >= 0.94
          ? "dormant"
          : distance < 0.18
            ? "active"
            : progress < 0
              ? "entering"
              : "leaving";

      metric.layers.forEach((layer) => {
        const depth = Number(layer.dataset.sceneLayer) || 1;
        const pointerStrength = environment.finePointer ? depth * activity : 0;
        const y = -progress * depth * layerTravel;
        const z = -distance * depth * depthTravel;
        const x = pointer.x * pointerStrength * (compact ? 0 : 8);
        const pointerY = pointer.y * pointerStrength * (compact ? 0 : 6);
        const scale = 1 - distance * Math.min(0.052, depth * 0.022);
        const fade = layer.hasAttribute("data-scene-environment")
          ? 1
          : 1 - Math.max(0, distance - 0.72) * 0.62;

        layer.style.setProperty("--scene-layer-x", `${x.toFixed(2)}px`);
        layer.style.setProperty(
          "--scene-layer-y",
          `${(y + pointerY).toFixed(2)}px`,
        );
        layer.style.setProperty("--scene-layer-z", `${z.toFixed(2)}px`);
        layer.style.setProperty("--scene-layer-scale", scale.toFixed(4));
        layer.style.setProperty("--scene-layer-opacity", fade.toFixed(4));
      });
    });

    depthMetrics.forEach((metric) => {
      const progress = progressFor(metric, viewportCenter, viewportHeight);
      const distance = Math.abs(progress);
      const activity = 1 - clamp(distance / 0.9, 0, 1);

      metric.layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth) || 1;
        const pointerStrength = environment.finePointer ? activity : 0;
        layer.style.setProperty(
          "--layer-x",
          `${(pointer.x * depth * pointerStrength * 15).toFixed(2)}px`,
        );
        layer.style.setProperty(
          "--layer-y",
          `${(pointer.y * depth * pointerStrength * 11).toFixed(2)}px`,
        );
        layer.style.setProperty(
          "--layer-scroll",
          `${(-progress * depth * (compact ? 15 : 28)).toFixed(2)}px`,
        );
      });
    });

    const hero = document.querySelector(".hero");
    if (hero) {
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const progress = clamp(scrollPosition / heroHeight, 0, 1);
      hero.style.setProperty("--hero-scroll", progress.toFixed(4));
      hero.style.setProperty("--hero-x", `${(pointer.x * -9).toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${(pointer.y * -6).toFixed(2)}px`);
    }

    frame = 0;
    if (
      Math.abs(pointer.x - pointer.targetX) > 0.001 ||
      Math.abs(pointer.y - pointer.targetY) > 0.001
    ) {
      frame = requestAnimationFrame(render);
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  const remeasure = () => {
    needsMeasure = true;
    schedule();
  };

  if (environment.finePointer) {
    window.addEventListener(
      "pointermove",
      (event) => {
        pointer.targetX =
          clamp(event.clientX / window.innerWidth - 0.5, -0.5, 0.5) * 2;
        pointer.targetY =
          clamp(event.clientY / window.innerHeight - 0.5, -0.5, 0.5) * 2;
        schedule();
      },
      { passive: true },
    );
    document.documentElement.addEventListener("mouseleave", () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
      schedule();
    });
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasure, { passive: true });
  window.addEventListener("load", remeasure, { once: true });
  document.fonts?.ready.then(remeasure).catch(() => {});

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(remeasure);
    scenes.forEach((scene) => observer.observe(scene));
  }

  measure();
  render();
}

export function initEngravingReveals() {
  const drawings = [...document.querySelectorAll("[data-engraving]")];
  if (!drawings.length) return;

  if (environment.reducedMotion || !("IntersectionObserver" in window)) {
    drawings.forEach((drawing) => drawing.classList.add("is-etched"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-etched");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.42 },
  );

  drawings.forEach((drawing) => observer.observe(drawing));
}
