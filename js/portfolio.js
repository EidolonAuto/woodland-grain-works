const projects = [
  {
    title: 'Signal / Grain Study',
    category: 'Material + electronics',
    description: 'A visual study exploring the shared rhythm of natural grain and clean signal paths.',
    image: 'assets/illustrations/project-signal-grain.svg',
    alt: 'Abstract wood rings crossed by purple and gold circuit traces',
  },
  {
    title: 'Engraved Geometry',
    category: 'Laser + graphic design',
    description: 'Fine vector linework translated into a warm, material-focused engraving composition.',
    image: 'assets/illustrations/project-engraved-geometry.svg',
    alt: 'Geometric golden line engraving over a dark timber-inspired field',
  },
  {
    title: 'Cabin Network Study',
    category: 'Smart-home integration',
    description: 'A calm connected-space concept where automation stays quietly in the background.',
    image: 'assets/illustrations/project-cabin-network.svg',
    alt: 'Forest cabin silhouette with subtle connected device nodes',
  },
];

export function renderProjects() {
  const grid = document.querySelector('[data-project-grid]');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = 'project-card reveal';
    article.innerHTML = `
      <div class="project-card__visual"><img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async"></div>
      <span class="project-card__study">Concept study ${String(index + 1).padStart(2, '0')}</span>
      <div class="project-card__body">
        <span class="project-card__type">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>`;
    fragment.append(article);
  });
  grid.append(fragment);
}

