import React from "react";
import SectionWrap from "./SectionWrap";

export default function Overview() {
  return (
    <SectionWrap id="overview">
      <div className="overviewWrap">
        <div className="badge">HIe welcome here</div>

        <h1 className="h1" style={{ marginTop: 14 }}>
          Jaya Jagriti — <span style={{ opacity: 0.85 }}>Full-Stack + GenAI</span>
        </h1>

        {/* GRID */}
        <div className="overviewGrid">
          {/* LEFT */}
          <div className="card frame overviewPanel">
            <div className="overviewKicker">Highlights</div>

            <div className="overviewList">
              <div className="card overviewItem">
                <div className="overviewItemTitle">MedGenie 3.0</div>
                <p className="p">One Health platform + forecasting + uploads + multilingual chat + telemedicine.</p>
              </div>

              <div className="card overviewItem">
                <div className="overviewItemTitle">ML DeFi Agent</div>
                <p className="p">Web3 dashboard + simulation + automation for safer transactions.</p>
              </div>

              <div className="card overviewItem">
                <div className="overviewItemTitle">Core Stack</div>
                <p className="p">Django/DRF • React • WebSockets • WebRTC • Automation</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="card frame overviewPanel">
            <div className="overviewKicker">Contact</div>

            <div className="overviewList">
              <a className="card overviewItem" href="mailto:jagritijaya11@gmail.com">
                <div className="overviewItemTitle">Email</div>
                <p className="p">jagritijaya11@gmail.com</p>
              </a>

              <a
                className="card overviewItem"
                href="https://linkedin.com/in/jaya-jagriti-539361277"
                target="_blank"
                rel="noreferrer"
              >
                <div className="overviewItemTitle">LinkedIn</div>
                <p className="p">linkedin.com/in/jaya-jagriti-539361277</p>
              </a>

              <div className="card overviewItem">
                <div className="overviewItemTitle">Location</div>
                <p className="p">Mohali, Punjab</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-first CSS */}
      <style>{`
        /* wrapper creates readable surface over video */
        #overview{
          position: relative;
        }

        .overviewWrap{
          width: min(1100px, calc(100vw - 48px));
          margin: 0 auto;
          padding: 92px 0 110px; /* ✅ below navbar + above bottom dock */
          position: relative;
          z-index: 5; /* ✅ keep above video/overlays */
        }

        /* subtle background plate so it reads on mobile */
        .overviewWrap::before{
          content:"";
          position:absolute;
          inset: 72px 0 86px;
          border-radius: 22px;
          background: rgba(0,0,0,.28);
          border: 1px solid rgba(231,211,162,.14);
          backdrop-filter: blur(10px);
          z-index: -1;
        }

        .overviewGrid{
          display: grid;
          grid-template-columns: 1.35fr .65fr;
          gap: 16px;
          margin-top: 22px;
        }

        .overviewPanel{
          padding: 18px;
          min-height: 330px;
          background: rgba(255,255,255,.04);
        }

        .overviewKicker{
          font-size: 12px;
          letter-spacing: .10em;
          text-transform: uppercase;
          opacity: .85;
        }

        .overviewList{
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }

        .overviewItem{
          padding: 14px;
          background: rgba(0,0,0,.22);
          border: 1px solid rgba(231,211,162,.12);
          text-decoration: none;
        }

        .overviewItemTitle{
          font-weight: 800;
        }

        /* ✅ MOBILE: stack + safer padding */
        @media (max-width: 900px){
          .overviewGrid{
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px){
          .overviewWrap{
            width: calc(100vw - 24px);
            padding: 84px 0 128px; /* extra bottom for your section dock */
          }

          .overviewWrap::before{
            inset: 62px 0 96px;
            border-radius: 18px;
          }

          .overviewPanel{
            min-height: unset;
          }
        }
      `}</style>
    </SectionWrap>
  );
}
