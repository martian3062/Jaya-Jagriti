import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  opacity: isActive ? 1 : 0.78,
  textDecoration: "none",
  color: "inherit",
  fontWeight: 800 as const,
  letterSpacing: 0.2
});

const pillStyle: React.CSSProperties = {
  padding: "8px 12px",
  fontSize: 12,
  cursor: "pointer",
  background: "rgba(0,0,0,.22)",
  textDecoration: "none",
  color: "inherit",
  borderRadius: 999,
  border: "1px solid rgba(231,211,162,.18)"
};

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goToIntro = () => {
    setOpen(false);
    navigate("/");
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("reset_gate"));
    });
  };

  // Close menu when route changes (basic)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <header className="navWrap">
      <div className="container navInner">
        <button
          onClick={goToIntro}
          className="navBrand"
          aria-label="Back to intro"
          title="Back to entry screen"
          type="button"
        >
          Jaya Jagriti
        </button>

        {/* Desktop nav */}
        <nav className="navLinks">
          <NavLink to="/projects" style={linkStyle}>
            Projects
          </NavLink>
          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>

          <button onClick={goToIntro} className="card frame" style={pillStyle} type="button">
            Home
          </button>

          <a href="mailto:jagritijaya11@gmail.com" className="card frame" style={pillStyle}>
            Email
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="navBurger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`navMobile ${open ? "open" : ""}`}>
        <div className="container navMobileInner">
          <NavLink onClick={() => setOpen(false)} to="/projects" style={linkStyle}>
            Projects
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about" style={linkStyle}>
            About
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contact" style={linkStyle}>
            Contact
          </NavLink>

          <div className="navMobileRow">
            <button onClick={goToIntro} className="card frame" style={pillStyle} type="button">
              Home
            </button>
            <a href="mailto:jagritijaya11@gmail.com" className="card frame" style={pillStyle}>
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="navDivider" />

      <style>{`
        /* ✅ Mobile-safe sticky header */
        .navWrap{
          position: sticky;
          top: 0;
          z-index: 100;
          isolation: isolate;

          /* real background (prevents “blank content under header” bug on mobile) */
          background:
            radial-gradient(900px 340px at 15% 20%, rgba(201,168,106,.14), transparent 60%),
            rgba(7,8,12,.72);
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }

        /* blur only if supported (and not required to see header) */
        @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
          .navWrap{
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
          }
        }

        .navInner{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding: 14px 0;
          gap: 12px;
        }

        .navBrand{
          background: transparent;
          border: none;
          color: inherit;
          font-weight: 900;
          letter-spacing: .4px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          font-size: 14px;
          white-space: nowrap;
        }

        .navLinks{
          display:flex;
          gap: 16px;
          align-items:center;
          flex-wrap: wrap;
        }

        /* burger hidden on desktop */
        .navBurger{
          display:none;
          width: 44px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(231,211,162,.16);
          background: rgba(0,0,0,.22);
          cursor: pointer;
          padding: 8px;
        }
        .navBurger span{
          display:block;
          height: 2px;
          width: 100%;
          background: rgba(243,234,216,.85);
          border-radius: 4px;
          margin: 5px 0;
        }

        .navMobile{
          display:none;
        }

        .navMobileInner{
          padding: 10px 0 14px;
          display:grid;
          gap: 12px;
        }
        .navMobileRow{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .navDivider{
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        /* ✅ Mobile behavior */
        @media (max-width: 900px){
          .navLinks{ display:none; }
          .navBurger{ display:block; }

          .navMobile{
            display:block;
            max-height: 0;
            overflow: hidden;
            transition: max-height .25s ease;
            border-top: 1px solid rgba(255,255,255,0.06);
            background: rgba(7,8,12,.72);
          }
          .navMobile.open{
            max-height: 360px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce){
          .navMobile{ transition: none !important; }
        }
      `}</style>
    </header>
  );
}