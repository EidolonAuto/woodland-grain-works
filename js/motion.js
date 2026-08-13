import { environment } from "./modules/environment.js";

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

  elements.forEach((element) => observer.observe(element));
}

export function initHeroResponse() {
  const hero = document.querySelector(".hero");
  const visual = document.querySelector("[data-hero-visual]");
  if (!hero || !visual || environment.reducedMotion || !environment.finePointer)
    return;

  let frame = 0;
  hero.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty("--hero-x", `${x * -10}px`);
      hero.style.setProperty("--hero-y", `${y * -7}px`);
      visual.style.transform = `translate3d(${x * 13}px, ${y * 10}px, 0) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    });
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.removeProperty("--hero-x");
    hero.style.removeProperty("--hero-y");
    visual.style.transform = "";
  });
}

export function initMagneticElements() {
  if (environment.reducedMotion || !environment.finePointer) return;
  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      element.style.transform = `translate(${x * 0.09}px, ${y * 0.12}px)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

export function initPortalResponse() {
  if (environment.reducedMotion || !environment.finePointer) return;

  document.querySelectorAll("[data-portal]").forEach((portal) => {
    portal.addEventListener("pointermove", (event) => {
      const bounds = portal.getBoundingClientRect();
      portal.style.setProperty(
        "--portal-x",
        `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      );
      portal.style.setProperty(
        "--portal-y",
        `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
      );
    });
  });
}
