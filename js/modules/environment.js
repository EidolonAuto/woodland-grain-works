const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactQuery = window.matchMedia('(max-width: 767px)');

export const environment = {
  get reducedMotion() {
    return motionQuery.matches;
  },
  get compact() {
    return compactQuery.matches;
  },
  get finePointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  },
};

export function onMotionPreferenceChange(callback) {
  motionQuery.addEventListener('change', callback);
  return () => motionQuery.removeEventListener('change', callback);
}

