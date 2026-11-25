export function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

export function smoothStep(value) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

export function listenToScroll(render) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  function update() {
    frame = 0;
    render(preference.matches);
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  preference.addEventListener('change', schedule);
  update();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    preference.removeEventListener('change', schedule);
  };
}
