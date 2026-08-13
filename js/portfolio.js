export const projects = [
  {
    slug: "signal-grain",
    title: "Signal / Grain Study",
    category: "Material + electronics",
    description:
      "A visual study exploring the shared rhythm of natural grain and clean signal paths.",
    detail:
      "This concept asks what happens when organic growth rings and routed signal paths share the same visual language. It is an art-direction study, not customer work.",
    signals: ["Layered linework", "Material contrast", "Signal geometry"],
    image: "assets/illustrations/project-signal-grain.svg",
    alt: "Abstract wood rings crossed by purple and gold circuit traces",
  },
  {
    slug: "engraved-geometry",
    title: "Engraved Geometry",
    category: "Laser + graphic design",
    description:
      "Fine vector linework translated into a warm, material-focused engraving composition.",
    detail:
      "A study in repeatable vector geometry, registration marks, and warm surface treatment—built to establish how future engraving work can be documented.",
    signals: ["Vector paths", "Engraving study", "Surface composition"],
    image: "assets/illustrations/project-engraved-geometry.svg",
    alt: "Geometric golden line engraving over a dark timber-inspired field",
  },
  {
    slug: "cabin-network",
    title: "Cabin Network Study",
    category: "Smart-home integration",
    description:
      "A calm connected-space concept where automation stays quietly in the background.",
    detail:
      "A spatial systems concept connecting forest atmosphere, residential form, and unobtrusive device relationships without turning the technology into the subject.",
    signals: ["Network planning", "Spatial integration", "Quiet technology"],
    image: "assets/illustrations/project-cabin-network.svg",
    alt: "Forest cabin silhouette with subtle connected device nodes",
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
