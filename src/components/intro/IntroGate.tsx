// IntroGate.tsx (FULL UPDATED) ✅
// - Fixes slow TV video load: single <video>, lazy src, preload metadata, posters, idle prefetch next/prev
// - TV sticks on desktop + mobile (no forced scale shrink)
// - TV Zoom: ONLY an option (Zoom In / Default) — doesn’t change your normal dock behavior
// - Cleans imports (no duplicate React import)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function IntroGate({ onEnter }: { onEnter: () => void }) {
  const BONGO_LINK = "https://obsproject.com/forum/resources/bongobs-cat-plugin.992/";
  const BONGO_ASSETS = "/assets/bongo";

  // ---- Bongo sprite state ----
  const [tapSide, setTapSide] = useState<"L" | "R">("L");
  const tapSideRef = useRef<"L" | "R">("L");
  useEffect(() => {
    tapSideRef.current = tapSide;
  }, [tapSide]);

  const [tapPulse, setTapPulse] = useState(0);
  const [kFrame, setKFrame] = useState(0); // 0..6
  const [lFrame, setLFrame] = useState<"up" | 0 | 1 | 2>("up");
  const [rFrame, setRFrame] = useState<"up" | 0 | 1 | 2 | 3>("up");

  const [slam, setSlam] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);

  const lastKeyTime = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [mouseTick, setMouseTick] = useState(0);

  const [hasMousePng, setHasMousePng] = useState(true);

  // ---- Retro TV ----
  const UPDATES_SRC = "/assets/tv/upcoming.web.mp4";

  const CHANNELS: Array<
  | { id: number; name: string; type: "video"; src: string }
  | { id: number; name: string; type: "signal" }
  | { id: number; name: string; type: "coming" }
> = [
  { id: 1, name: "CH-01 • Showcase", type: "video", src: "/assets/tv/ch01.web.mp4" },
  { id: 2, name: "CH-02 • Projects", type: "video", src: "/assets/tv/ch02.web.mp4" },
  { id: 3, name: "CH-03 • About Me", type: "video", src: "/assets/tv/ch03.web.mp4" },

  { id: 4, name: "CH-04 • SIGNAL LOST", type: "signal" },
  { id: 5, name: "CH-05 • Coming Soon", type: "coming" },

  { id: 6, name: "CH-06 • Skills", type: "video", src: "/assets/tv/ch06.web.mp4" },
  { id: 7, name: "CH-07 • Fun", type: "video", src: "/assets/tv/ch07.web.mp4" },

  { id: 8, name: "CH-08 • SIGNAL LOST", type: "signal" },

  { id: 9, name: "CH-09 • Coming Soon" ,type: "video", src: "/assets/tv/ch09.web.mp4" },

  { id: 10, name: "CH-10 • Extras", type: "video", src: "/assets/tv/ch10.web.mp4" },

  { id: 11, name: "CH-11 • Coming Soon", type: "coming" },

  // keep your updates var, just make sure it points to .web.mp4 too
  { id: 12, name: "CH-12 • UPDATES", type: "video", src: UPDATES_SRC }
];

  const [ch, setCh] = useState(0);
  const [switchFx, setSwitchFx] = useState(0);

  const prevCh = () => {
    setSwitchFx((s) => s + 1);
    setCh((c) => (c - 1 + CHANNELS.length) % CHANNELS.length);
  };
  const nextCh = () => {
    setSwitchFx((s) => s + 1);
    setCh((c) => (c + 1) % CHANNELS.length);
  };

  const playUpdates = () => {
    setSwitchFx((s) => s + 1);
    const idx = CHANNELS.findIndex((c) => c.type === "video" && "src" in c && c.src === UPDATES_SRC);
    if (idx !== -1) setCh(idx);
    else window.open(UPDATES_SRC, "_blank");
  };

  // --- posters (create these files for best UX) ---
  // Example: /assets/tv/posters/ch01.jpg, ch02.jpg, ..., upcoming.jpg
  const posterFor = (src?: string) => {
    if (!src) return "/assets/tv/posters/fallback.jpg";
    const base = src.split("/").pop()?.replace(".mp4", "") ?? "fallback";
    return `/assets/tv/posters/${base}.jpg`;
  };

  // --- prefetch helper (next/prev only) ---
  function prefetchVideo(url: string) {
    const safeId = `prefetch-${encodeURIComponent(url)}`;
    if (document.getElementById(safeId)) return;
    const link = document.createElement("link");
    link.id = safeId;
    link.rel = "prefetch";
    link.as = "video";
    link.href = url;
    document.head.appendChild(link);
  }

  // ---- Detect mouse.png ----
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasMousePng(true);
    img.onerror = () => setHasMousePng(false);
    img.src = `${BONGO_ASSETS}/mouse.png`;
  }, []);

  // ---- Input handlers ----
  useEffect(() => {
    let slamTimer: number | null = null;
    let releaseTimer: number | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      // TV hotkeys
      if (e.key === "ArrowLeft") {
        prevCh();
        return;
      }
      if (e.key === "ArrowRight") {
        nextCh();
        return;
      }

      const now = performance.now();
      if (now - lastKeyTime.current < 25) return;
      lastKeyTime.current = now;

      setTapSide((s) => (s === "L" ? "R" : "L"));
      setTapPulse((p) => p + 1);
      setKFrame((k) => (k + 1) % 7);

      const nextSide = tapSideRef.current === "L" ? "R" : "L";

      if (nextSide === "L") {
        setLFrame((f) => (f === "up" ? 0 : ((Number(f) + 1) % 3) as 0 | 1 | 2));
        setRFrame("up");
      } else {
        setRFrame((f) => (f === "up" ? 0 : ((Number(f) + 1) % 4) as 0 | 1 | 2 | 3));
        setLFrame("up");
      }

      if (releaseTimer) window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => {
        setLFrame("up");
        setRFrame("up");
      }, 85);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setMouseTick((t) => (t + 1) % 1000000);
    };

    const onMouseDown = () => {
      setMouseDown(true);
      setSlam((s) => s + 1);

      setLFrame(2);
      setRFrame(3);
      setKFrame((k) => (k + 2) % 7);

      if (slamTimer) window.clearTimeout(slamTimer);
      slamTimer = window.setTimeout(() => {
        setLFrame("up");
        setRFrame("up");
      }, 110);
    };

    const onMouseUp = () => setMouseDown(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (slamTimer) window.clearTimeout(slamTimer);
      if (releaseTimer) window.clearTimeout(releaseTimer);
    };
  }, []);

  const mouseOffset = useMemo(() => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = (mouse.current.x / w) * 2 - 1;
    const ny = (mouse.current.y / h) * 2 - 1;
    return { x: Math.max(-1, Math.min(1, nx)), y: Math.max(-1, Math.min(1, ny)) };
  }, [mouseTick]);

  const leftSrc = lFrame === "up" ? `${BONGO_ASSETS}/leftup.png` : `${BONGO_ASSETS}/left${lFrame}.png`;
  const rightSrc = rFrame === "up" ? `${BONGO_ASSETS}/rightup.png` : `${BONGO_ASSETS}/right${rFrame}.png`;
  const keySrc = `${BONGO_ASSETS}/k${kFrame}.png`;

  // ===========================
  // ✅ TV Optimized Video Loader
  // ===========================
  const tvRef = useRef<HTMLVideoElement | null>(null);
  const [tvLoading, setTvLoading] = useState(false);

  // TV Zoom state (ONLY optional)
  const [tvZoom, setTvZoom] = useState<"default" | "zoom">("default");

  // Lazy-load src only when channel is video
  useEffect(() => {
    const cur = CHANNELS[ch];
    const v = tvRef.current;
    if (!v) return;

    // cleanup previous listeners safely by resetting handlers via new scope below
    if (cur.type !== "video") {
      v.pause?.();
      v.removeAttribute("src");
      v.load();
      setTvLoading(false);
      return;
    }

    const src = (cur as any).src as string;

    setTvLoading(true);

    // IMPORTANT: set poster before src so browser can paint quickly
    v.poster = posterFor(src);

    // load
    v.preload = "metadata";
    v.src = src;
    v.load();

    const onCanPlay = () => setTvLoading(false);
    const onWaiting = () => setTvLoading(true);
    const onPlaying = () => setTvLoading(false);

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);

    // autoplay (ignore errors on some browsers)
    v.play().catch(() => {});

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch]);

  // Prefetch next/prev videos on idle for smoother switching
  useEffect(() => {
    const idle = (cb: () => void) => {
      const ric = (window as any).requestIdleCallback;
      if (ric) return ric(cb);
      return window.setTimeout(cb, 400);
    };

    const handle = idle(() => {
      const next = CHANNELS[(ch + 1) % CHANNELS.length];
      const prev = CHANNELS[(ch - 1 + CHANNELS.length) % CHANNELS.length];

      if (next.type === "video") prefetchVideo((next as any).src);
      if (prev.type === "video") prefetchVideo((prev as any).src);
    });

    return () => {
      const cic = (window as any).cancelIdleCallback;
      if (cic && typeof handle === "number") cic(handle);
      else window.clearTimeout(handle as any);
    };
  }, [ch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 999, overflow: "hidden" }}
    >
      {/* Dark veil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 420px at 20% 40%, rgba(0,0,0,.35), transparent 65%), rgba(0,0,0,.35)"
        }}
      />

      {/* MAIN CONTENT */}
      <div className="introMain">
        <div className="badge" style={{ width: "max-content", maxWidth: "100%", display: "inline-flex" }}>
          नमस्कारः जयतु भवतः
        </div>

        <h1 className="h1" style={{ marginTop: 10 }}>
          Jaya Jagriti
        </h1>

        <p className="p" style={{ maxWidth: 520 }}>
          Enter the portfolio — explore projects and updates.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onEnter} className="card frame" style={btnStyle} type="button">
            <div style={{ fontWeight: 850, letterSpacing: ".04em" }}>Enter</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>Overview → Skills → Projects → Contact</div>
          </motion.button>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={playUpdates} className="card frame" style={btnStyle} type="button">
            <div style={{ fontWeight: 850, letterSpacing: ".04em" }}>Updates</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Watch what’s coming next</div>
          </motion.button>
        </div>
      </div>

      {/* TOP RIGHT: Bongo Cat (hidden on mobile) */}
      <a
        className="bongoDock"
        href={BONGO_LINK}
        target="_blank"
        rel="noreferrer"
        title="Bongo Cat OBS Plugin (click)"
        style={{
          position: "fixed",
          top: "max(16px, env(safe-area-inset-top))",
          right: "max(16px, env(safe-area-inset-right))",
          zIndex: 80,
          width: 280,
          borderRadius: 18,
          border: "1px solid rgba(231,211,162,.22)",
          background: "rgba(10,10,10,.30)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 18px 50px rgba(0,0,0,.35)",
          textDecoration: "none",
          padding: 12,
          userSelect: "none",
          transform: "scale(.75)",
          transformOrigin: "right top"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
          <div style={{ color: "rgba(243,234,216,.92)", fontWeight: 900, fontSize: 12, letterSpacing: ".04em" }}>
            BONGO CAT • OBS
          </div>
          <div style={{ color: "rgba(243,234,216,.65)", fontSize: 12, fontWeight: 800 }}>↗</div>
        </div>

        <div
          style={{
            position: "relative",
            height: 150,
            borderRadius: 14,
            overflow: "hidden",
            background: "radial-gradient(160px 80px at 20% 30%, rgba(231,211,162,.18), transparent 60%), rgba(0,0,0,.20)"
          }}
        >
          <img
            src={`${BONGO_ASSETS}/catbg.png`}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
          <img
            src={keySrc}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
          <img
            src={leftSrc}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
          <img
            src={rightSrc}
            alt=""
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />

          {hasMousePng && (
            <img
              src={`${BONGO_ASSETS}/mouse.png`}
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: `translate(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px) ${mouseDown ? "translateY(2px)" : ""}`,
                transition: "transform 90ms ease"
              }}
            />
          )}

          <div
            key={slam}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              background: "rgba(231,211,162,.12)",
              animation: "bongoFlash 140ms ease"
            }}
          />
        </div>

        <div style={{ marginTop: 10, color: "rgba(243,234,216,.70)", fontSize: 12, lineHeight: 1.3 }}>
          Type / click / move mouse — sprites react.
        </div>
      </a>

      {/* ========================= */}
      {/* ✅ TV Dock + Zoom Option   */}
      {/* ========================= */}
      <div className={`tvDock ${tvZoom === "zoom" ? "tvDockZoom" : ""}`}>
        <div
          style={{
            borderRadius: 18,
            border: "1px solid rgba(231,211,162,.22)",
            background: "rgba(10,10,10,.35)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 18px 60px rgba(0,0,0,.45)",
            padding: 12
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <div style={{ color: "rgba(243,234,216,.92)", fontWeight: 900, fontSize: 12, letterSpacing: ".06em" }}>
              VEO AI TV
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={prevCh} className="tvBtn" type="button">
                ◀
              </button>
              <button onClick={nextCh} className="tvBtn" type="button">
                ▶
              </button>

              {/* Zoom toggle */}
              {tvZoom === "default" ? (
                <button onClick={() => setTvZoom("zoom")} className="tvBtn tvBtnAlt" type="button" title="Zoom in TV">
                  ⤢
                </button>
              ) : (
                <button onClick={() => setTvZoom("default")} className="tvBtn tvBtnAlt" type="button" title="Back to default">
                  ⤡
                </button>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              borderRadius: 14,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "16 / 10",
              background: "rgba(0,0,0,.55)",
              border: "1px solid rgba(231,211,162,.14)"
            }}
          >
            {CHANNELS[ch].type === "video" ? (
              <>
                <video
                  ref={tvRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={posterFor((CHANNELS[ch] as any).src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "contrast(1.05) saturate(1.05)"
                  }}
                />
                {tvLoading && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "radial-gradient(120px 80px at 50% 40%, rgba(231,211,162,.10), transparent 70%), rgba(0,0,0,.65)",
                      color: "rgba(243,234,216,.92)",
                      fontWeight: 900,
                      letterSpacing: ".08em",
                      fontSize: 12
                    }}
                  >
                    LOADING…
                  </div>
                )}
              </>
            ) : CHANNELS[ch].type === "signal" ? (
              <div className="tvSignal">
                <div className="tvSignalText">NO SIGNAL</div>
                <div className="tvSignalSub">Adjust antenna • try next channel</div>
              </div>
            ) : (
              <div className="tvComing">
                <div className="tvComingText">COMING SOON</div>
                <div className="tvSignalSub">Channel under construction</div>
              </div>
            )}

            <div className="tvScanlines" />
            <div className="tvNoise" />
            <div key={switchFx} className="tvSwitchFx" />

            <div className="tvHud">
              <div className="tvCh">{String(CHANNELS[ch].id).padStart(2, "0")}</div>
              <div className="tvName">{CHANNELS[ch].name}</div>
            </div>
          </div>

          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div style={{ color: "rgba(243,234,216,.70)", fontSize: 12 }}>12 channels • VHS vibe</div>
            <div style={{ color: "rgba(243,234,216,.45)", fontSize: 12 }}>{tvZoom === "zoom" ? "Zoomed" : ""}</div>
          </div>
        </div>
      </div>

    {/* Inline styles */}
<style>
  {`
    @keyframes bongoFlash {
      0% { opacity: 0; }
      35% { opacity: 1; }
      100% { opacity: 0; }
    }

    /* ===================== */
    /* ✅ INTRO MAIN (fixed)  */
    /* ===================== */
    .introMain{
      position: relative;
      z-index: 5;
      width: min(1100px, calc(100vw - 64px));
      margin: 0 auto;

      display: flex;
      flex-direction: column;

      /* default = centered on normal screens */
      justify-content: center;

      gap: 14px;
      min-height: 100vh;
      padding: clamp(24px, 6vh, 64px) 0;
    }

    /* ✅ Landscape / short height: push text UP so it doesn't collide with TV */
    @media (max-height: 520px) and (orientation: landscape){
      .introMain{
        justify-content: flex-start;
        padding-top: 22px;
        padding-bottom: 12px;
      }
    }
    @media (max-height: 420px) and (orientation: landscape){
      .introMain{
        padding-top: 14px;
      }
    }

    @media (max-width: 640px){
      .introMain{
        width: calc(100vw - 24px);
        margin: 0;
        padding: 18px 12px;
        min-height: unset;

        /* ✅ fix: was justify-items (grid only) */
        align-items: flex-start;
        justify-content: flex-start;
      }
    }

    @media (max-width: 640px){
      .bongoDock{ display: none !important; }
    }

    /* ===================== */
    /* ✅ TV DOCK (sticky)    */
    /* ===================== */
  /* ✅ TV DOCK (sticky) — default is 80% of current size */
.tvDock{
  position: fixed;
  left: max(16px, env(safe-area-inset-left));
  bottom: max(16px, env(safe-area-inset-bottom));
  z-index: 70;

  width: min(360px, calc(100vw - 32px));
  transform: scale(.8);              /* ✅ 80% */
  transform-origin: left bottom;
}

/* mobile default corner — also 80% */
@media (max-width: 640px){
  .tvDock{
    left: auto;
    right: max(12px, env(safe-area-inset-right));
    bottom: max(12px, env(safe-area-inset-bottom));

    width: min(340px, calc(100vw - 24px));
    transform: scale(.8);            /* ✅ 80% */
    transform-origin: right bottom;
  }
}
    .tvBtn{
      border-radius: 10px;
      padding: 6px 10px;
      font-weight: 900;
      font-size: 12px;
      cursor: pointer;
      color: rgba(243,234,216,.92);
      background: rgba(0,0,0,.25);
      border: 1px solid rgba(231,211,162,.22);
    }
    .tvBtn:hover{ background: rgba(0,0,0,.35); }
    .tvBtnAlt{ padding: 6px 9px; }

    .tvHud{
      position:absolute;
      left:10px;
      bottom:10px;
      display:flex;
      flex-direction:column;
      gap:4px;
      color: rgba(243,234,216,.9);
      text-shadow: 0 2px 10px rgba(0,0,0,.55);
      pointer-events:none;
    }
    .tvCh{
      display:inline-flex;
      width:max-content;
      padding:4px 8px;
      border-radius:999px;
      border:1px solid rgba(231,211,162,.20);
      background: rgba(0,0,0,.22);
      font-weight: 900;
      letter-spacing:.08em;
      font-size: 11px;
    }
    .tvName{
      font-weight: 800;
      font-size: 12px;
      opacity:.9;
    }

    .tvScanlines{
      pointer-events:none;
      position:absolute;
      inset:0;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,.06) 0px,
        rgba(255,255,255,.02) 1px,
        rgba(0,0,0,.00) 3px
      );
      mix-blend-mode: overlay;
      opacity: .25;
    }

    .tvNoise{
      pointer-events:none;
      position:absolute;
      inset:-20%;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
      opacity:.10;
      animation: tvNoise 240ms steps(2) infinite;
    }
    @keyframes tvNoise{
      0%{transform:translate(0,0)}
      100%{transform:translate(-6px, 4px)}
    }

    .tvSwitchFx{
      pointer-events:none;
      position:absolute;
      inset:0;
      background: rgba(255,255,255,.10);
      opacity: 0;
      animation: tvSwitch 260ms ease;
    }
    @keyframes tvSwitch{
      0%{opacity:0; transform:translateY(-6px) skewX(8deg)}
      25%{opacity:1}
      60%{opacity:.35; transform:translateY(4px) skewX(-10deg)}
      100%{opacity:0; transform:translateY(0) skewX(0)}
    }

    .tvSignal, .tvComing{
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      background: radial-gradient(120px 80px at 50% 40%, rgba(231,211,162,.10), transparent 70%), rgba(0,0,0,.65);
      color: rgba(243,234,216,.92);
      text-align:center;
      padding: 8px;
    }
    .tvSignalText, .tvComingText{
      font-weight: 1000;
      letter-spacing: .12em;
      font-size: 16px;
    }
    .tvSignalSub{
      margin-top: 6px;
      font-size: 12px;
      opacity: .7;
    }

    /* ===================== */
    /* ✅ OPTIONAL ZOOM MODE  */
    /* ===================== */
    .tvDockZoom{
      left: 50%;
      right: auto;
      bottom: 22px;
      transform: translateX(-50%);
      transform-origin: center bottom;
      width: min(740px, calc(100vw - 24px));
      z-index: 120;
    }

    @media (max-width: 640px){
      .tvDockZoom{
        left: 50%;
        right: auto;
        bottom: 14px;
        transform: translateX(-50%);
        width: calc(100vw - 16px);
      }
    }
  `}
</style>
    </motion.div>
  );
}

const btnStyle: React.CSSProperties = {
  cursor: "pointer",
  borderRadius: 999,
  padding: "14px 18px",
  background: "rgba(0,0,0,.18)",
  width: 260,
  textAlign: "left",
  border: "1px solid rgba(231,211,162,.22)",
  color: "rgba(243,234,216,.95)"
};