export const projects = [
  {
    slug: "identity-system",
    title: "The Woodland Mark",
    category: "Identity development",
    description:
      "The original maker seal stays in view while the system around it gets simpler and easier to use.",
    detail:
      "This is supplied Woodland Grain artwork, not a customer project. It is the source for the purple night, gold linework, and woodland details used throughout the site.",
    signals: ["Original mark", "Brand reference", "Source asset"],
    image: "assets/branding/legacy/maker-seal.png",
    alt: "Existing circular Woodland Grain maker seal in purple, gold, and dark wood tones",
  },
  {
    slug: "mountain-line-study",
    title: "Mountain Line Study",
    category: "Artwork study",
    description:
      "One piece of the larger landscape, separated so it can work on its own.",
    detail:
      "I pulled this transparent mountain from the supplied artwork for use in motion and interface layers. The original component sheet stays in the project as a source file, not public page content.",
    signals: ["Transparent asset", "Original artwork", "Motion layer"],
    image: "assets/generated/hd/mountain.png",
    alt: "Isolated purple and gold mountain illustration on a transparent background",
  },
  {
    slug: "layered-landscape",
    title: "Layered Landscape",
    category: "Web art direction",
    description:
      "The supplied landscape rebuilt in layers so it can move with the site.",
    detail:
      "The moon, mountain, forest, and path move at different depths. This is a study for the website, not a fabricated product or a completed customer installation.",
    signals: ["Layered depth", "Responsive layout", "Supplied artwork"],
    image: "assets/backgrounds/woodland-night-road-source.jpg",
    alt: "Purple and gold woodland night landscape used as the website art-direction foundation",
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
        <span class="project-card__action">View study <span aria-hidden="true">↗</span></span>
      </div>
    </a>`;
  return article;
}

function projectStudy(project, index) {
  const article = document.createElement("article");
  const material = ["engraved-plate", "drawing-sheet", "acrylic-sample"][
    index % 3
  ];
  article.className = `project-study project-object project-object--${material} reveal`;
  article.id = project.slug;
  article.dataset.objectReactive = "";
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
