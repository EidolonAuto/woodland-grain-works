import { environment } from "./modules/environment.js";

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const approach = (current, target, strength = 0.12) =>
  current + (target - current) * strength;

export function initPageIntro() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() =>
      document.documentElement.classList.add("is-ready"),
    );
  });
}

export function initReveals() {
  const elements = [...document.querySelectorAll(".reveal")];
  if (!elements.length) return;

  if (environment.reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  elements.forEach((element) => {
    const siblings = [...(element.parentElement?.children ?? [])].filter(
      (sibling) => sibling.classList.contains("reveal"),
    );
    const order = Math.max(0, siblings.indexOf(element));
    element.style.setProperty("--reveal-order", String(Math.min(order, 3)));
    observer.observe(element);
  });
}

export function initHeroResponse() {
  const hero = document.querySelector(".hero");
  const visual = document.querySelector("[data-hero-visual]");
  if (!hero || !visual || environment.reducedMotion || !environment.finePointer)
    return;

  let frame = 0;
  const state = { x: 0, y: 0, targetX: 0, targetY: 0 };

  const render = () => {
    state.x = approach(state.x, state.targetX, 0.11);
    state.y = approach(state.y, state.targetY, 0.11);
    hero.style.setProperty("--hero-x", `${state.x * -10}px`);
    hero.style.setProperty("--hero-y", `${state.y * -7}px`);
    visual.style.setProperty("--hero-visual-x", `${state.x * 13}px`);
    visual.style.setProperty("--hero-visual-y", `${state.y * 10}px`);
    visual.style.setProperty("--hero-rotate-x", `${state.y * -1.5}deg`);
    visual.style.setProperty("--hero-rotate-y", `${state.x * 1.5}deg`);
    visual.style.setProperty("--artifact-far-x", `${state.x * -9}px`);
    visual.style.setProperty("--artifact-far-y", `${state.y * -7}px`);
    visual.style.setProperty("--artifact-near-x", `${state.x * 15}px`);
    visual.style.setProperty("--artifact-near-y", `${state.y * 11}px`);

    if (
      Math.abs(state.x - state.targetX) > 0.001 ||
      Math.abs(state.y - state.targetY) > 0.001
    ) {
      frame = requestAnimationFrame(render);
    } else {
      frame = 0;
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    state.targetX = clamp(
      (event.clientX - bounds.left) / bounds.width - 0.5,
      -0.5,
      0.5,
    );
    state.targetY = clamp(
      (event.clientY - bounds.top) / bounds.height - 0.5,
      -0.5,
      0.5,
    );
    schedule();
  });
  hero.addEventListener("pointerleave", () => {
    state.targetX = 0;
    state.targetY = 0;
    schedule();
  });
}

export function initMagneticElements() {
  if (environment.reducedMotion || !environment.finePointer) return;
  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    let frame = 0;
    const state = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const render = () => {
      state.x = approach(state.x, state.targetX, 0.18);
      state.y = approach(state.y, state.targetY, 0.18);
      element.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      if (
        Math.abs(state.x - state.targetX) > 0.05 ||
        Math.abs(state.y - state.targetY) > 0.05
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      state.targetX = x * 0.07;
      state.targetY = y * 0.09;
      schedule();
    });
    element.addEventListener("pointerleave", () => {
      state.targetX = 0;
      state.targetY = 0;
      schedule();
    });
  });
}

export function initPortalResponse() {
  if (environment.reducedMotion || !environment.finePointer) return;

  document.querySelectorAll("[data-portal]").forEach((portal) => {
    let frame = 0;
    const state = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const render = () => {
      state.x = approach(state.x, state.targetX, 0.14);
      state.y = approach(state.y, state.targetY, 0.14);
      portal.style.setProperty("--portal-x", `${50 + state.x * 50}%`);
      portal.style.setProperty("--portal-y", `${50 + state.y * 50}%`);
      portal.style.setProperty("--portal-art-x", `${state.x * 8}px`);
      portal.style.setProperty("--portal-art-y", `${state.y * 6}px`);
      portal.style.setProperty("--portal-rotate-x", `${state.y * -0.7}deg`);
      portal.style.setProperty("--portal-rotate-y", `${state.x * 0.7}deg`);
      if (
        Math.abs(state.x - state.targetX) > 0.002 ||
        Math.abs(state.y - state.targetY) > 0.002
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    portal.addEventListener("pointermove", (event) => {
      const bounds = portal.getBoundingClientRect();
      state.targetX = clamp(
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
        -1,
        1,
      );
      state.targetY = clamp(
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        -1,
        1,
      );
      schedule();
    });
    portal.addEventListener("pointerleave", () => {
      state.targetX = 0;
      state.targetY = 0;
      schedule();
    });
  });
}

export function initScrollMotion() {
  const hero = document.querySelector(".hero");
  if (!hero || environment.reducedMotion) return;

  let frame = 0;
  const update = () => {
    const progress = clamp(
      window.scrollY / Math.max(hero.offsetHeight, 1),
      0,
      1,
    );
    hero.style.setProperty("--hero-scroll", progress.toFixed(3));
    hero.style.setProperty("--parallax-far", `${progress * 16}px`);
    hero.style.setProperty("--parallax-mid", `${progress * -10}px`);
    hero.style.setProperty("--parallax-near", `${progress * -24}px`);
    frame = 0;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", schedule, { passive: true });
}

export function initDepthScenes() {
  const scenes = [...document.querySelectorAll("[data-depth-scene]")];
  if (!scenes.length || environment.reducedMotion) return;

  scenes.forEach((scene) => {
    const layers = [...scene.querySelectorAll("[data-depth]")];
    if (!layers.length) return;

    let frame = 0;
    let visible = true;
    const state = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const render = () => {
      state.x = approach(state.x, state.targetX, 0.08);
      state.y = approach(state.y, state.targetY, 0.08);
      const bounds = scene.getBoundingClientRect();
      const scrollPosition = clamp(
        (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) /
          window.innerHeight,
        -1,
        1,
      );

      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth) || 1;
        layer.style.setProperty("--layer-x", `${state.x * depth * 13}px`);
        layer.style.setProperty("--layer-y", `${state.y * depth * 9}px`);
        layer.style.setProperty(
          "--layer-scroll",
          `${scrollPosition * depth * -18}px`,
        );
      });

      frame = 0;
      if (
        visible &&
        (Math.abs(state.x - state.targetX) > 0.002 ||
          Math.abs(state.y - state.targetY) > 0.002)
      ) {
        frame = requestAnimationFrame(render);
      }
    };

    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(render);
    };

    if (environment.finePointer) {
      scene.addEventListener("pointermove", (event) => {
        const bounds = scene.getBoundingClientRect();
        state.targetX = clamp(
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          -1,
          1,
        );
        state.targetY = clamp(
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
          -1,
          1,
        );
        schedule();
      });
      scene.addEventListener("pointerleave", () => {
        state.targetX = 0;
        state.targetY = 0;
        schedule();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
      },
      { rootMargin: "160px" },
    );
    observer.observe(scene);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
  });
}
