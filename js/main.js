import { initNavigation } from "./navigation.js";
import {
  initHeroResponse,
  initMagneticElements,
  initPageIntro,
  initPortalResponse,
  initReveals,
  initScrollMotion,
} from "./motion.js";
import { initParticles } from "./particles.js";
import { renderProjects } from "./portfolio.js";

renderProjects();
initPageIntro();
initNavigation();
initReveals();
initHeroResponse();
initMagneticElements();
initPortalResponse();
initScrollMotion();
initParticles();

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());
