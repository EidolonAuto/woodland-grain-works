import { environment } from "./modules/environment.js";

const storageKey = "woodland-grain-transition";
const outgoingDuration = 780;
const incomingDuration = 900;

function getArrival() {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) || "null");
    sessionStorage.removeItem(storageKey);
    if (!value || Date.now() - value.time > 4500) return null;
    return value;
  } catch {
    return null;
  }
}

function transitionTarget(link, event) {
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

  const sameDocument =
    destination.pathname === window.location.pathname &&
    destination.search === window.location.search;
  const target =
    sameDocument && destination.hash
      ? document.querySelector(destination.hash)
      : null;

  if (sameDocument && !target) return null;
  return { destination, sameDocument, target };
}

function closestWorkshopScene() {
  const viewportCenter = window.innerHeight / 2;
  return [...document.querySelectorAll("[data-workshop-scene]")].reduce(
    (closest, scene) => {
      const bounds = scene.getBoundingClientRect();
      const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
      return !closest || distance < closest.distance
        ? { element: scene, distance }
        : closest;
    },
    null,
  )?.element;
}

function activeScene(link) {
  return (
    link.closest("[data-workshop-scene]") ||
    document.querySelector(
      '[data-workshop-scene][data-scene-state="active"]',
    ) ||
    closestWorkshopScene() ||
    document.querySelector(".interior-hero") ||
    document.querySelector("main")
  );
}

function prepareLayers(scene, direction) {
  if (!scene) return [];
  const layers = [
    ...scene.querySelectorAll("[data-scene-layer], [data-depth]"),
  ];

  layers.forEach((layer) => {
    const depth = Number(layer.dataset.sceneLayer || layer.dataset.depth) || 1;
    const sign = direction === "departing" ? -1 : 1;
    layer.style.setProperty(
      "--camera-layer-y",
      `${(sign * depth * 24).toFixed(2)}px`,
    );
    layer.style.setProperty(
      "--camera-layer-z",
      `${(-depth * 120).toFixed(2)}px`,
    );
    layer.style.setProperty(
      "--camera-layer-scale",
      Math.max(0.82, 1 - depth * 0.045).toFixed(4),
    );
    layer.style.setProperty(
      "--camera-layer-opacity",
      Math.max(0.16, 1 - depth * 0.24).toFixed(3),
    );
  });

  scene.dataset.camera = direction;
  return layers;
}

function clearLayers(scene, layers) {
  delete scene?.dataset.camera;
  layers.forEach((layer) => {
    for (const property of [
      "--camera-layer-y",
      "--camera-layer-z",
      "--camera-layer-scale",
      "--camera-layer-opacity",
    ]) {
      layer.style.removeProperty(property);
    }
  });
}

function focusScene(target) {
  if (!target) return;
  const hadTabIndex = target.hasAttribute("tabindex");
  if (!hadTabIndex) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  if (!hadTabIndex) {
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    });
  }
}

function transitionWithinPage(link, destination, target) {
  const current = activeScene(link);
  const next = target.closest("[data-workshop-scene]") || target;
  const outgoingLayers = prepareLayers(current, "departing");
  const incomingLayers = prepareLayers(next, "arriving");
  document.documentElement.classList.add("is-scene-traveling");
  link.dataset.transitionActive = "true";
  history.pushState(null, "", destination.hash);

  window.setTimeout(() => {
    const header = document.querySelector("[data-site-header]");
    const offset = header?.offsetHeight || 0;
    window.scrollTo({
      top: Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - offset,
      ),
      behavior: "smooth",
    });
  }, 120);

  window.setTimeout(() => {
    clearLayers(current, outgoingLayers);
    clearLayers(next, incomingLayers);
    document.documentElement.classList.remove("is-scene-traveling");
    delete link.dataset.transitionActive;
    focusScene(target);
  }, 840);
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
    const destinationScene =
      document.querySelector(
        '[data-workshop-scene][data-scene-state="active"]',
      ) ||
      closestWorkshopScene() ||
      document.querySelector(".interior-hero") ||
      document.querySelector("main");
    const arrivingLayers = prepareLayers(destinationScene, "arriving");
    window.setTimeout(() => {
      document.documentElement.classList.remove("is-arriving");
      clearLayers(destinationScene, arrivingLayers);
    }, incomingDuration);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const transition = transitionTarget(link, event);
    if (!transition) return;

    event.preventDefault();
    if (transition.sameDocument) {
      transitionWithinPage(link, transition.destination, transition.target);
      return;
    }

    const bounds = link.getBoundingClientRect();
    const x = ((bounds.left + bounds.width / 2) / window.innerWidth) * 100;
    const y = ((bounds.top + bounds.height / 2) / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--transition-x", `${x}%`);
    document.documentElement.style.setProperty("--transition-y", `${y}%`);
    document.documentElement.classList.add("is-departing");
    link.dataset.transitionActive = "true";
    prepareLayers(activeScene(link), "departing");

    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ x, y, time: Date.now() }),
      );
    } catch {
      // Navigation remains functional when browser storage is unavailable.
    }

    window.setTimeout(
      () => window.location.assign(transition.destination.href),
      outgoingDuration,
    );
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    document.documentElement.classList.remove(
      "is-departing",
      "is-arriving",
      "is-scene-traveling",
    );
    document
      .querySelectorAll("[data-transition-active]")
      .forEach((link) => delete link.dataset.transitionActive);
  });
}
