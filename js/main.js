import { initNavigation } from './navigation.js';
import { initHeroResponse, initMagneticElements, initReveals } from './motion.js';
import { initParticles } from './particles.js';
import { renderProjects } from './portfolio.js';

renderProjects();
initNavigation();
initReveals();
initHeroResponse();
initMagneticElements();
initParticles();

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = String(new Date().getFullYear());

