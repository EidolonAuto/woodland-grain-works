export const projects = [
  {
    slug: "identity-system",
    title: "The Woodland Mark",
    category: "Identity development",
    description:
      "The existing maker seal, kept visible as the identity shifts toward a cleaner working system.",
    detail:
      "This is real supplied Woodland Grain artwork, not a fabricated client project. It establishes the purple-night landscape, gold linework, and woodland detail the web system is being built from.",
    signals: ["Existing mark", "Brand continuity", "Working asset"],
    image: "assets/branding/legacy/maker-seal.png",
    alt: "Existing circular Woodland Grain maker seal in purple, gold, and dark wood tones",
  },
  {
    slug: "mountain-line-study",
    title: "Mountain Line Study",
    category: "Visual language study",
    description:
      "One isolated landscape element, separated from the original composition and given room to work on its own.",
    detail:
      "This transparent mountain layer was extracted from supplied Woodland Grain artwork for restrained use in interfaces and motion. The original component sheet is a working source file, not website content.",
    signals: ["Transparent asset", "Brand continuity", "Layer-ready"],
    image: "assets/generated/hd/mountain.png",
    alt: "Isolated purple and gold mountain illustration on a transparent background",
  },
  {
    slug: "layered-landscape",
    title: "Layered Landscape",
    category: "Web art direction",
    description:
      "The brand landscape rebuilt as a responsive depth system for movement, focus, and navigation.",
    detail:
      "The moon, mountain, forest, and path move as separate planes. This is a website composition study—not an example of fabricated work or a claim about a completed installation.",
    signals: ["Parallax depth", "Responsive composition", "Supplied palette"],
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
