export function rafLoop(cb: (t: number) => void) {
  let rafId = 0;
  const loop = (t: number) => {
    cb(t);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(rafId);
}
