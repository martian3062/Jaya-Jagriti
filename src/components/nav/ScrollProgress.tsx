import React from "react";
import { useLenis } from "../smooth/LenisProvider";

export default function ScrollProgress() {
  const lenis = useLenis();
  const [p, setP] = React.useState(0);

  React.useEffect(() => {
    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    // Fallback: compute progress from window scroll
    const computeFromWindow = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const limit = Math.max(0, doc.scrollHeight - doc.clientHeight);
      setP(limit > 0 ? clamp01(scrollTop / limit) : 0);
    };

    // If Lenis not ready, still show progress using native scroll
    if (!lenis) {
      computeFromWindow();
      window.addEventListener("scroll", computeFromWindow, { passive: true });
      window.addEventListener("resize", computeFromWindow);
      return () => {
        window.removeEventListener("scroll", computeFromWindow);
        window.removeEventListener("resize", computeFromWindow);
      };
    }

    // Lenis scroll handler
    const handler = (e: any) => {
      // Prefer Lenis progress if provided
      if (typeof e?.progress === "number") {
        setP(clamp01(e.progress));
        return;
      }

      const scroll = typeof e?.scroll === "number" ? e.scroll : 0;
      const limit = typeof e?.limit === "number" ? e.limit : 0;
      setP(limit > 0 ? clamp01(scroll / limit) : 0);
    };

    // init once
    setP(0);

    // Lenis emits scroll events with { scroll, limit, velocity, direction, progress }
    lenis.on("scroll", handler);

    return () => {
      lenis.off("scroll", handler);
    };
  }, [lenis]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__bar"
        style={{
          transform: `scaleX(${p})`,
          transformOrigin: "0 0"
        }}
      />
    </div>
  );
}