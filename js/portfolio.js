export const projects = [
  {
    slug: "signal-grain",
    title: "Grain / Signal",
    category: "Material + electronics",
    description:
      "A material study built around one question: can a circuit feel grown rather than printed?",
    detail:
      "Growth rings, routed traces, and a faceted center are being tested as one object language. This is direction-setting artwork, not customer work.",
    signals: ["Layered linework", "Material contrast", "Signal geometry"],
    image: "assets/generated/3d/precision-relic.png",
    alt: "Concept render of a dark wood and brass circular object with a purple faceted center",
  },
  {
    slug: "engraved-geometry",
    title: "Engraving Rig",
    category: "Laser + graphic design",
    description:
      "A compact visual study for the point where digital linework becomes a mark in real material.",
    detail:
      "The frame, beam, and sample block exaggerate the working parts on purpose. It is a way to test how process can be shown without turning the shop into a diagram.",
    signals: ["Vector paths", "Engraving study", "Surface composition"],
    image: "assets/generated/3d/laser-fabrication.png",
    alt: "Concept render of a brass and purple engraving mechanism over a wood sample",
  },
  {
    slug: "cabin-network",
    title: "Quiet Network",
    category: "Smart-home integration",
    description:
      "A connected-space study where the technology stays useful and mostly out of sight.",
    detail:
      "The small house is the point; the network is support. This explores how to show connected devices without making a home look like a control room.",
    signals: ["Network planning", "Spatial integration", "Quiet technology"],
    image: "assets/generated/3d/forest-model.png",
    alt: "Concept render of a small dark house in a sculpted forest with subtle illuminated paths",
  },
];

function projectCard(project, index) {
  const article = document.createElement("article");
  article.className = "project-card reveal";
  article.innerHTML = `
    <a class="project-card__link" href="portfolio.html#${project.slug}" aria-label="Explore ${project.title}">
      <div class="project-card__visual"><img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async"></div>
      <span class="project-card__study">Concept study ${String(index + 1).padStart(2, "0")}</span>
      <div class="project-card__body">
        <span class="project-card__type">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="project-card__action">Open study <span aria-hidden="true">↗</span></span>
      </div>
    </a>`;
  return article;
}

function projectStudy(project, index) {
  const article = document.createElement("article");
  article.className = "project-study reveal";
  article.id = project.slug;
  article.innerHTML = `
    <div class="project-study__visual">
      <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async">
      <span>Study / ${String(index + 1).padStart(2, "0")}</span>
    </div>
    <div class="project-study__copy">
      <p class="eyebrow"><span></span>${project.category}</p>
      <h2>${project.title}</h2>
      <p class="project-study__lede">${project.description}</p>
      <p>${project.detail}</p>
      <ul>${project.signals.map((signal) => `<li>${signal}</li>`).join("")}</ul>
    </div>`;
  return article;
}

export function renderProjects() {
  const grids = document.querySelectorAll("[data-project-grid]");
  const studies = document.querySelector("[data-project-studies]");

  grids.forEach((grid) => {
    const fragment = document.createDocumentFragment();
    const limit = Number(grid.dataset.projectLimit) || projects.length;
    projects
      .slice(0, limit)
      .forEach((project, index) =>
        fragment.append(projectCard(project, index)),
      );
    grid.append(fragment);
  });

  if (studies) {
    const fragment = document.createDocumentFragment();
    projects.forEach((project, index) =>
      fragment.append(projectStudy(project, index)),
    );
    studies.append(fragment);
  }
}
