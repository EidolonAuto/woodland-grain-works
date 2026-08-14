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
import { initSpatialScenes } from "./spatial-3d.js";
import { initProjectNote } from "./project-note.js";

renderProjects();
initPageIntro();
initNavigation();
initReveals();
initHeroResponse();
initMagneticElements();
initPortalResponse();
initScrollMotion();
initParticles();
initSpatialScenes();
initProjectNote();

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());
