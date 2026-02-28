import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  opacity: isActive ? 1 : 0.75,
  textDecoration: "none",
  color: "inherit"
});

const pillStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 12,
  cursor: "pointer",
  background: "rgba(0,0,0,.22)",
  textDecoration: "none",
  color: "inherit",
  borderRadius: 999
};

export default function Navbar() {
  const navigate = useNavigate();

  const goToIntro = () => {
    navigate("/");
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("reset_gate"));
    });
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(12px)"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          gap: 12
        }}
      >
        <button
          onClick={goToIntro}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit",
            fontWeight: 800,
            letterSpacing: 0.5,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1
          }}
          aria-label="Back to intro"
          title="Back to entry screen"
        >
          Jaya Jagriti
        </button>

        <nav style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <NavLink to="/projects" style={linkStyle}>
            Projects
          </NavLink>

          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>

          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>

          {/* Reopen gate */}
          <button
            onClick={goToIntro}
            className="card frame"
            style={pillStyle}
            type="button"
            aria-label="Open intro gate"
            title="Reopen intro gate"
          >
            Home
          </button>

          <a
            href="mailto:jagritijaya11@gmail.com"
            className="card frame"
            style={pillStyle}
            aria-label="Email"
            title="Email"
          >
            Email
          </a>
        </nav>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.10)" }} />
    </header>
  );
}