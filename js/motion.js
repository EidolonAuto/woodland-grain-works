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

  document
    .querySelectorAll("[data-portal], [data-object-reactive]")
    .forEach((portal) => {
      let frame = 0;
      const state = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const render = () => {
        state.x = approach(state.x, state.targetX, 0.14);
        state.y = approach(state.y, state.targetY, 0.14);
        portal.style.setProperty("--portal-x", `${50 + state.x * 50}%`);
        portal.style.setProperty("--portal-y", `${50 + state.y * 50}%`);
        portal.style.setProperty("--portal-art-x", `${state.x * 8}px`);
        portal.style.setProperty("--portal-art-y", `${state.y * 6}px`);
        portal.style.setProperty("--portal-copy-x", `${state.x * -1.6}px`);
        portal.style.setProperty("--portal-copy-y", `${state.y * -1.2}px`);
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
