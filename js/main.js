import { initNavigation } from "./navigation.js";
import {
  initMagneticElements,
  initPageIntro,
  initPortalResponse,
  initReveals,
} from "./motion.js?v=20260813-spatial3";
import { initParticles } from "./particles.js";
import { renderProjects } from "./portfolio.js?v=20260818-voice1";
import { initProjectNote } from "./project-note.js?v=20260818-voice1";
import { initPageTransitions } from "./page-transitions.js?v=20260813-spatial3";
import {
  initEngravingReveals,
  initSpatialScenes,
} from "./spatial-scenes.js?v=20260813-spatial3";

renderProjects();
initPageTransitions();
initPageIntro();
initNavigation();
initReveals();
initSpatialScenes();
initEngravingReveals();
initMagneticElements();
initPortalResponse();
initParticles();
initProjectNote();

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());
