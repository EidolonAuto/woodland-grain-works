import { initNavigation } from "./navigation.js";
import {
  initHeroResponse,
  initDepthScenes,
  initMagneticElements,
  initPageIntro,
  initPortalResponse,
  initReveals,
  initScrollMotion,
} from "./motion.js?v=20260813-3";
import { initParticles } from "./particles.js";
import { renderProjects } from "./portfolio.js";
import { initProjectNote } from "./project-note.js";
import { initPageTransitions } from "./page-transitions.js?v=20260813-3";

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
