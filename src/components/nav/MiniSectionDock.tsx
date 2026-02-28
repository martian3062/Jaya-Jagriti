import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { sections } from "../../data/sections";

export default function MiniSectionDock() {
  const ids = useMemo(() => sections.map((s) => s.key), [sections]);
  const [active, setActive] = useState<string>(sections[0]?.key ?? "overview");

  // Keep latest intersection ratios for stability
  const ratiosRef = useRef<Record<string, number>>({});

  const getNavOffset = () => {
    // If you have a navbar element, prefer its real height
    const nav = document.querySelector<HTMLElement>("header, nav, .navbar");
    const h = nav?.getBoundingClientRect().height;
    return Math.max(0, Math.min(200, h ?? 84));
  };

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const NAV_OFFSET = getNavOffset();
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion() ? "auto" : "smooth"
    });
  };

  useEffect(() => {
    // Build elements fresh (in case sections appear after mount)
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    ratiosRef.current = {};

    const io = new IntersectionObserver(
      (entries) => {
        // Update ratios store
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          ratiosRef.current[id] = e.isIntersecting ? e.intersectionRatio : 0;
        }

        // Pick the highest ratio among ALL sections
        let bestId: string | null = null;
        let bestRatio = 0;

        for (const id of ids) {
          const r = ratiosRef.current[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        if (bestId) setActive(bestId);
      },
      {
        threshold: [0.12, 0.2, 0.3, 0.45, 0.6],
        rootMargin: "-20% 0px -55% 0px"
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  // Ensure active key always exists (in case sections list changes)
  useEffect(() => {
    if (!ids.includes(active)) {
      setActive(ids[0] ?? "overview");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  const idleStyle: CSSProperties = {
    border: "1px solid rgba(231,211,162,.10)",
    background: "rgba(255,255,255,.02)",
    opacity: 0.22,
    filter: "grayscale(0.45) brightness(0.85)"
  };

  const activeStyle: CSSProperties = {
    border: "1px solid rgba(201,168,106,.42)",
    background: "rgba(201,168,106,.14)",
    opacity: 1,
    filter: "none"
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Optional: left/right to move between sections when dock is focused
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();

    const idx = Math.max(0, ids.indexOf(active));
    const next =
      e.key === "ArrowRight"
        ? ids[Math.min(ids.length - 1, idx + 1)]
        : ids[Math.max(0, idx - 1)];

    if (next) scrollTo(next);
  };

  return (
    <div
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label="Section navigation dock"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 16,
        zIndex: 50,
        width: "min(980px, 92vw)",
        outline: "none"
      }}
    >
      <div
        className="card frame"
        style={{
          padding: 10,
          background: "rgba(10, 10, 14, 0.58)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 22px 60px rgba(0,0,0,.55)"
        }}
      >
        {/* responsive layout: grid on desktop, scroll row on small screens */}
        <div
          className="miniDockRow"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))`,
            gap: 10
          }}
        >
          {sections.map((s) => {
            const isActive = active === s.key;

            return (
              <button
                key={s.key}
                onClick={() => scrollTo(s.key)}
                type="button"
                className={`miniDockBtn ${isActive ? "isActive" : ""}`}
                aria-current={isActive ? "true" : "false"}
                style={{
                  ...(isActive ? activeStyle : idleStyle),
                  color: "rgba(243,234,216,.92)",
                  borderRadius: 14,
                  padding: "10px 10px",
                  cursor: "pointer",
                  textAlign: "left",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  transition:
                    "opacity .18s ease, transform .18s ease, filter .18s ease"
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    opacity: 0.9
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.65,
                    marginTop: 4,
                    lineHeight: 1.25
                  }}
                >
                  {s.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>
        {`
          /* Hover without mutating inline styles */
          .miniDockBtn:hover{
            opacity: .55 !important;
            transform: translateY(-1px);
            filter: none;
          }
          .miniDockBtn.isActive:hover{
            opacity: 1 !important;
            transform: none;
          }
          .miniDockBtn:focus-visible{
            outline: 2px solid rgba(201,168,106,.65);
            outline-offset: 2px;
          }

          /* Mobile: turn grid into a horizontal scroll row */
          @media (max-width: 720px){
            .miniDockRow{
              display: flex !important;
              overflow-x: auto;
              gap: 10px;
              padding-bottom: 2px;
              scroll-snap-type: x mandatory;
            }
            .miniDockBtn{
              min-width: 190px;
              scroll-snap-align: start;
            }
            .miniDockRow::-webkit-scrollbar{
              height: 8px;
            }
            .miniDockRow::-webkit-scrollbar-thumb{
              background: rgba(255,255,255,.12);
              border-radius: 999px;
            }
          }
        `}
      </style>
    </div>
  );
}