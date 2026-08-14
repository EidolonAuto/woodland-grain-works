import { initNavigation } from "./navigation.js";
import {
  initHeroResponse,
  initDepthScenes,
  initMagneticElements,
  initPageIntro,
  initPortalResponse,
  initReveals,
  initScrollMotion,
} from "./motion.js";
import { initParticles } from "./particles.js";
import { renderProjects } from "./portfolio.js";
import { initProjectNote } from "./project-note.js";
import { initPageTransitions } from "./page-transitions.js";

renderProjects();
initPageTransitions();
initPageIntro();
initNavigation();
initReveals();
initHeroResponse();
initDepthScenes();
initMagneticElements();
initPortalResponse();
initScrollMotion();
initParticles();
initProjectNote();

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());
