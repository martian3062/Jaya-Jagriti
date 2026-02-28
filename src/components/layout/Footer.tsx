import React, { useMemo, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const email = "jagritijaya11@gmail.com";
  const location = "Mohali, Punjab";
  const linkedin = "https://linkedin.com/in/jaya-jagriti-539361277";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback: open mail if clipboard fails
      window.location.href = `mailto:${email}`;
    }
  };

  const pillBase: React.CSSProperties = {
    border: "1px solid rgba(231,211,162,.22)",
    background: "rgba(0,0,0,.22)",
    padding: "10px 12px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    transition: "transform 160ms ease, background 160ms ease, border-color 160ms ease",
    userSelect: "none"
  };

  const iconStyle: React.CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: 10,
    display: "grid",
    placeItems: "center",
    border: "1px solid rgba(231,211,162,.22)",
    background: "rgba(231,211,162,.08)",
    fontSize: 14,
    flex: "0 0 auto"
  };

  return (
    <footer className="section" style={{ paddingTop: 28, paddingBottom: 28 }}>
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {/* Centered interactive box */}
        <div
          className="card frame"
          style={{
            width: "min(980px, 100%)",
            padding: 18,
            borderRadius: 18,
            background:
              "linear-gradient(180deg, rgba(231,211,162,.10), rgba(0,0,0,.18))",
            border: "1px solid rgba(231,211,162,.18)",
            boxShadow: "0 18px 60px rgba(0,0,0,.35)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap"
            }}
          >
            {/* Left: mini text */}
            <div style={{ minWidth: 220 }}>
              <div style={{ fontWeight: 850, letterSpacing: 0.2 }}>
                Let’s build something ✨
              </div>
              
            </div>

            {/* Right: interactive pills */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {/* Email pill (copy) */}
              <button
                type="button"
                onClick={copyEmail}
                title="Click to copy email"
                style={{
                  ...pillBase,
                  borderRadius: 14,
                  padding: "10px 14px",
                  background: copied ? "rgba(46, 204, 113, .14)" : pillBase.background
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = "rgba(231,211,162,.12)";
                  e.currentTarget.style.borderColor = "rgba(231,211,162,.30)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.background = copied
                    ? "rgba(46, 204, 113, .14)"
                    : "rgba(0,0,0,.22)";
                  e.currentTarget.style.borderColor = "rgba(231,211,162,.22)";
                }}
              >
                <span style={iconStyle}>✉️</span>
                <span style={{ fontWeight: 750, fontSize: 13 }}>
                  {copied ? "Copied!" : email}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                    borderLeft: "1px solid rgba(231,211,162,.18)",
                    paddingLeft: 10,
                    marginLeft: 6
                  }}
                >
                  Copy
                </span>
              </button>

              {/* LinkedIn pill */}
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ ...pillBase, borderRadius: 14, padding: "10px 14px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.background = "rgba(231,211,162,.12)";
                  e.currentTarget.style.borderColor = "rgba(231,211,162,.30)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.background = "rgba(0,0,0,.22)";
                  e.currentTarget.style.borderColor = "rgba(231,211,162,.22)";
                }}
              >
                <span style={iconStyle}>in</span>
                <span style={{ fontWeight: 800, fontSize: 13 }}>LinkedIn</span>
                <span style={{ opacity: 0.65, fontSize: 12 }}>↗</span>
              </a>
            </div>
          </div>

          {/* Bottom hint row */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(231,211,162,.14)",
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              opacity: 0.8,
              fontSize: 12.5
            }}
          >
            <span>Open to work • full-time • freelance</span>
            <span style={{ opacity: 0.75 }}>Built with React • Motion • WebGL vibes</span>
          </div>
        </div>
      </div>
    </footer>
  );
}