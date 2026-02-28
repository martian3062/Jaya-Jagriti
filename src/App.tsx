import React from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/layout/PageTransition";
import { LenisProvider } from "./components/smooth/LenisProvider";

import Home from "./routes/Home";
import Projects from "./routes/Projects";
import About from "./routes/About";
import Contact from "./routes/Contact";

import BackgroundVideo from "./components/background/BackgroundVideo";
import MiniSectionDock from "./components/nav/MiniSectionDock";
import IntroGate from "./components/intro/IntroGate";
import ScrollProgress from "./components/nav/ScrollProgress";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  const initialGateOpen = useMemo(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("gate_open") === "true";
  }, []);

  const [gateOpen, setGateOpen] = useState(initialGateOpen);

  const openGate = () => {
    sessionStorage.setItem("gate_open", "true");
    setGateOpen(true);
  };

  const resetGate = () => {
    sessionStorage.removeItem("gate_open");
    sessionStorage.removeItem("pending_scroll_to");
    setGateOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  useEffect(() => {
    const onReset = () => resetGate();
    window.addEventListener("reset_gate", onReset);
    return () => window.removeEventListener("reset_gate", onReset);
  }, []);

  useEffect(() => {
    if (!isHome || !gateOpen) return;

    const id = sessionStorage.getItem("pending_scroll_to");
    if (!id) return;

    let tries = 0;
    const maxTries = 40;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        sessionStorage.removeItem("pending_scroll_to");
        return;
      }
      tries += 1;
      if (tries < maxTries) requestAnimationFrame(tick);
      else sessionStorage.removeItem("pending_scroll_to");
    };

    requestAnimationFrame(tick);
  }, [isHome, gateOpen]);

  const onEnter = () => openGate();

  const bgSrc = isHome && !gateOpen ? "/jayuu.mp4" : "/pikachu-bg.mp4";

  const showGate = isHome && !gateOpen;
  const showDock = isHome && gateOpen;

  return (
    <LenisProvider>
      <div className="appRoot">
        {/* ✅ Background layer (always behind) */}
        <div className="bgLayer" aria-hidden>
          <BackgroundVideo src={bgSrc} />
        </div>

        {/* ✅ Foreground app (always above) */}
        <div className={`appLayer ${showDock ? "dock-safe" : ""}`}>
          {showGate ? (
            <IntroGate onEnter={onEnter} />
          ) : (
            <>
              <ScrollProgress />
              <Navbar />

              <PageTransition locationKey={location.pathname}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </PageTransition>

              <Footer />
              {showDock ? <MiniSectionDock /> : null}
            </>
          )}
        </div>
      </div>

      {/* ✅ App-level stacking CSS (critical) */}
      <style>{`
        .appRoot{
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          isolation: isolate; /* ✅ prevents z-index bugs with fixed video */
        }

        .bgLayer{
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none; /* ✅ video never blocks clicks */
        }

        .appLayer{
          position: relative;
          z-index: 5; /* ✅ content always above background */
          min-height: 100vh;
        }

        /* ✅ reserve space for MiniSectionDock on home */
        .dock-safe{
          padding-bottom: 110px;
        }

        @media (max-width: 640px){
          .dock-safe{
            padding-bottom: 140px;
          }
        }

        /* landscape small height safety */
        @media (orientation: landscape) and (max-height: 520px){
          .dock-safe{
            padding-bottom: 120px;
          }
        }
      `}</style>
    </LenisProvider>
  );
}
