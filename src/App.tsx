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

  /** True only on the homepage route */
  const isHome = location.pathname === "/";

  /**
   * Read once from sessionStorage on first render.
   * If gate_open === "true" we skip IntroGate.
   */
  const initialGateOpen = useMemo(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("gate_open") === "true";
  }, []);

  const [gateOpen, setGateOpen] = useState(initialGateOpen);

  /** Open the gate and persist state for this browser session */
  const openGate = () => {
    sessionStorage.setItem("gate_open", "true");
    setGateOpen(true);
  };

  /**
   * Reset gate and scroll to top.
   * Useful if you want a "re-enter" experience.
   */
  const resetGate = () => {
    sessionStorage.removeItem("gate_open");
    sessionStorage.removeItem("pending_scroll_to");
    setGateOpen(false);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  /**
   * Allow other components to reset the gate via:
   * window.dispatchEvent(new Event("reset_gate"))
   */
  useEffect(() => {
    const onReset = () => resetGate();
    window.addEventListener("reset_gate", onReset);
    return () => window.removeEventListener("reset_gate", onReset);
  }, []);

  /**
   * If something sets sessionStorage.pending_scroll_to = "<sectionId>"
   * before navigating home, we scroll once the gate is open.
   */
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

  /** IntroGate callback */
  const onEnter = () => openGate();

  /** Helper: open gate then go home */
  const openAndGoHome = () => {
    openGate();
    navigate("/");
  };
  // NOTE: openAndGoHome is currently unused. Remove it if you don't need it.

  /** Background video changes based on gate state */
  const bgSrc = isHome && !gateOpen ? "/jayuu.mp4" : "/pikachu-bg.mp4";

  return (
    <LenisProvider>
      <BackgroundVideo src={bgSrc} />

      {/* Gate closed on home => show intro only */}
      {isHome && !gateOpen ? (
        <IntroGate onEnter={onEnter} />
      ) : (
        <>
          <ScrollProgress />

          {/* Home gets dock-safe spacing; other pages normal */}
          <div className={isHome ? "dock-safe" : undefined}>
            <Navbar />

            <PageTransition locationKey={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* default */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>

            <Footer />
          </div>

          {/* Mini dock only on home when gate is open */}
          {isHome && gateOpen ? <MiniSectionDock /> : null}
        </>
      )}
    </LenisProvider>
  );
}