import { environment, onMotionPreferenceChange } from './modules/environment.js';

export function initParticles() {
  const canvas = document.querySelector('[data-particle-canvas]');
  if (!canvas || !canvas.getContext) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  let particles = [];
  let animationFrame = 0;
  let active = false;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const bounds = canvas.getBoundingClientRect();
    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = environment.compact ? 18 : 32;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * bounds.width,
      y: Math.random() * bounds.height,
      radius: Math.random() * 1.2 + 0.25,
      speed: Math.random() * 0.12 + 0.035,
      drift: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.42 + 0.1,
    }));
  };

  const draw = () => {
    if (!active) return;
    const bounds = canvas.getBoundingClientRect();
    context.clearRect(0, 0, bounds.width, bounds.height);
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (particle.y < -4) particle.y = bounds.height + 4;
      if (particle.x < -4) particle.x = bounds.width + 4;
      if (particle.x > bounds.width + 4) particle.x = -4;
      context.beginPath();
      context.fillStyle = `rgba(227, 191, 121, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
    animationFrame = requestAnimationFrame(draw);
  };

  const stop = () => {
    active = false;
    cancelAnimationFrame(animationFrame);
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const start = () => {
    if (environment.reducedMotion || document.hidden || active) return;
    active = true;
    draw();
  };

  resize();
  start();
  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  onMotionPreferenceChange(() => (environment.reducedMotion ? stop() : start()));
}
