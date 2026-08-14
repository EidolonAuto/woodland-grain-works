import { environment } from "./modules/environment.js";

const storageKey = "woodland-grain-transition";
const routes = {
  "index.html": { key: "home", label: "Workshop hub" },
  "services.html": { key: "services", label: "Capabilities" },
  "portfolio.html": { key: "work", label: "Work room" },
  "about.html": { key: "about", label: "Workshop story" },
  "contact.html": { key: "contact", label: "Project desk" },
};

function routeFromUrl(url) {
  const name = url.pathname.split("/").pop() || "index.html";
  return routes[name] || routes["index.html"];
}

function readArrival() {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) || "null");
    sessionStorage.removeItem(storageKey);
    if (!value || Date.now() - value.time > 5000) return null;
    return value;
  } catch {
    return null;
  }
}

function createMap() {
  const map = document.createElement("div");
  map.className = "world-transition";
  map.setAttribute("aria-hidden", "true");
  map.innerHTML = `
    <div class="world-transition__landscape">
      <div class="world-transition__wash"></div>
      <div class="world-transition__grid"></div>
      <div class="world-transition__route"></div>
      ${Object.values(routes)
        .map(
          (route, index) => `
            <span class="world-node world-node--${route.key}" data-world-node="${route.key}">
              <i>${String(index + 1).padStart(2, "0")}</i><strong>${route.label}</strong>
            </span>`,
        )
        .join("")}
      <div class="world-transition__caption">
        <span>WOODLAND GRAIN / WORKSHOP MAP</span>
        <strong data-world-caption>Moving through the workshop</strong>
      </div>
    </div>`;
  document.body.append(map);
  return map;
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

function setDestination(map, route) {
  map.dataset.target = route.key;
  map.querySelector("[data-world-caption]").textContent = route.label;
  map
    .querySelectorAll("[data-world-node]")
    .forEach((node) =>
      node.toggleAttribute("data-active", node.dataset.worldNode === route.key),
    );
}

export function initPageTransitions() {
  if (environment.reducedMotion) return;

  const map = createMap();
  const arrival = readArrival();
  if (arrival) {
    setDestination(map, arrival.route);
    map.dataset.state = "arriving";
    document.documentElement.classList.add("is-arriving");
    window.setTimeout(() => {
      delete map.dataset.state;
      document.documentElement.classList.remove("is-arriving");
    }, 900);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const destination = eligibleLink(link, event);
    if (!destination) return;

    event.preventDefault();
    const route = routeFromUrl(destination);
    setDestination(map, route);
    map.dataset.state = "departing";
    document.documentElement.classList.add("is-departing");
    link.dataset.transitionActive = "true";

    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({ route, time: Date.now() }),
      );
    } catch {
      // Navigation remains functional when browser storage is unavailable.
    }

    window.setTimeout(() => window.location.assign(destination.href), 980);
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    delete map.dataset.state;
    document.documentElement.classList.remove("is-departing", "is-arriving");
    document
      .querySelectorAll("[data-transition-active]")
      .forEach((link) => delete link.dataset.transitionActive);
  });
}
