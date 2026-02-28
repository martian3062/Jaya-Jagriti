import React from "react";
import SectionWrap from "./SectionWrap";

export default function Overview() {
  return (
    <SectionWrap id="overview">
      <div className="badge"> HIe welcome here</div>

      <h1 className="h1" style={{ marginTop: 14 }}>
        Jaya Jagriti — <span style={{ opacity: 0.85 }}>Full-Stack + GenAI</span>
      </h1>

      {/* BIG GRID */}
      <div className="grid" style={{ gridTemplateColumns: "1.35fr .65fr", marginTop: 22 }}>
        <div className="card frame" style={{ padding: 18, minHeight: 330, background: "rgba(255,255,255,.04)" }}>
          <div style={{ fontSize: 12, letterSpacing: ".10em", textTransform: "uppercase", opacity: 0.8 }}>
            Highlights
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            <div className="card" style={{ padding: 14, background: "rgba(0,0,0,.18)" }}>
              <div style={{ fontWeight: 700 }}>MedGenie 3.0</div>
              <p className="p">One Health platform + forecasting + uploads + multilingual chat + telemedicine.</p>
            </div>

            <div className="card" style={{ padding: 14, background: "rgba(0,0,0,.18)" }}>
              <div style={{ fontWeight: 700 }}>ML DeFi Agent</div>
              <p className="p">Web3 dashboard + simulation + automation for safer transactions.</p>
            </div>

            <div className="card" style={{ padding: 14, background: "rgba(0,0,0,.18)" }}>
              <div style={{ fontWeight: 700 }}>Core Stack</div>
              <p className="p">Django/DRF • React • WebSockets • WebRTC • Automation</p>
            </div>
          </div>
        </div>

        <div className="card frame" style={{ padding: 18, minHeight: 330, background: "rgba(255,255,255,.04)" }}>
          <div style={{ fontSize: 12, letterSpacing: ".10em", textTransform: "uppercase", opacity: 0.8 }}>
            Contact
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <a
              className="card"
              style={{ padding: 14, background: "rgba(0,0,0,.18)" }}
              href="mailto:jagritijaya11@gmail.com"
            >
              <div style={{ fontWeight: 700 }}>Email</div>
              <p className="p">jagritijaya11@gmail.com</p>
            </a>

            <a
              className="card"
              style={{ padding: 14, background: "rgba(0,0,0,.18)" }}
              href="https://linkedin.com/in/jaya-jagriti-539361277"
              target="_blank"
              rel="noreferrer"
            >
              <div style={{ fontWeight: 700 }}>LinkedIn</div>
              <p className="p">linkedin.com/in/jaya-jagriti-539361277</p>
            </a>

            <div className="card" style={{ padding: 14, background: "rgba(0,0,0,.18)" }}>
              <div style={{ fontWeight: 700 }}>Location</div>
              <p className="p">Mohali, Punjab</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #overview .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </SectionWrap>
  );
}