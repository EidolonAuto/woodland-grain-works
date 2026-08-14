import { environment } from "./modules/environment.js";

const storageKey = "woodland-grain-transition";

function getArrival() {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) || "null");
    sessionStorage.removeItem(storageKey);
    if (!value || Date.now() - value.time > 4000) return null;
    return value;
  } catch {
    return null;
  }
}

function eligibleLink(link, event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    link.target ||
    link.hasAttribute("download")
  ) {
    return null;
  }

  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin) return null;
  if (
    destination.pathname === window.location.pathname &&
    destination.search === window.location.search
  ) {
    return null;
  }
  return destination;
}

export function initPageTransitions() {
  if (environment.reducedMotion) return;

  const arrival = getArrival();
  if (arrival) {
    document.documentElement.style.setProperty(
      "--transition-x",
      `${arrival.x}%`,
    );
    document.documentElement.style.setProperty(
      "--transition-y",
      `${arrival.y}%`,
    );
    document.documentElement.classList.add("is-arriving");
    window.setTimeout(
      () => document.documentElement.classList.remove("is-arriving"),
      900,
    );
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const destination = eligibleLink(link, event);
    if (!destination) return;

    event.preventDefault();
    const bounds = link.getBoundingClientRect();
    const x = ((bounds.left + bounds.width / 2) / window.innerWidth) * 100;
    const y = ((bounds.top + bounds.height / 2) / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--transition-x", `${x}%`);
    document.documentElement.style.setProperty("--transition-y", `${y}%`);
    document.documentElement.classList.add("is-departing");
    link.dataset.transitionActive = "true";

    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ x, y, time: Date.now() }),
      );
    } catch {
      // Navigation remains functional when browser storage is unavailable.
    }

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, 780);
  });

  window.addEventListener("pageshow", () => {
    document.documentElement.classList.remove("is-departing");
    document
      .querySelectorAll("[data-transition-active]")
      .forEach((link) => delete link.dataset.transitionActive);
  });
}
