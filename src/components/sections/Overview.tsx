import React from "react";
import SectionWrap from "./SectionWrap";

export default function Overview() {
  return (
    <SectionWrap id="overview">
      <div className="badge">HIe welcome here</div>

      <h1 className="h1" style={{ marginTop: 14 }}>
        Jaya Jagriti — <span style={{ opacity: 0.85 }}>Full-Stack + GenAI</span>
      </h1>

      <div className="ovGrid" style={{ marginTop: 22 }}>
        {/* Highlights */}
        <div className="card frame ovCard">
          <div className="ovLabel">Highlights</div>

          <div className="ovStack">
            <div className="card ovInner">
              <div style={{ fontWeight: 700 }}>MedGenie 3.0</div>
              <p className="p">One Health platform + forecasting + uploads + multilingual chat + telemedicine.</p>
            </div>

            <div className="card ovInner">
              <div style={{ fontWeight: 700 }}>ML DeFi Agent</div>
              <p className="p">Web3 dashboard + simulation + automation for safer transactions.</p>
            </div>

            <div className="card ovInner">
              <div style={{ fontWeight: 700 }}>Core Stack</div>
              <p className="p">Django/DRF • React • WebSockets • WebRTC • Automation</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card frame ovCard">
          <div className="ovLabel">Contact</div>

          <div className="ovStack" style={{ marginTop: 14 }}>
            <a className="card ovInner linkCard" href="mailto:jagritijaya11@gmail.com">
              <div style={{ fontWeight: 700 }}>Email</div>
              <p className="p">jagritijaya11@gmail.com</p>
            </a>

            <a
              className="card ovInner linkCard"
              href="https://linkedin.com/in/jaya-jagriti-539361277"
              target="_blank"
              rel="noreferrer"
            >
              <div style={{ fontWeight: 700 }}>LinkedIn</div>
              <p className="p">linkedin.com/in/jaya-jagriti-539361277</p>
            </a>

            <div className="card ovInner">
              <div style={{ fontWeight: 700 }}>Location</div>
              <p className="p">Mohali, Punjab</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #overview .ovGrid{
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, .65fr);
          gap: 16px;
          align-items: stretch;
        }

        #overview .ovCard{
          padding: 18px;
          min-height: 330px;
          min-width: 0;
          background: rgba(255,255,255,.04);
        }

        #overview .ovLabel{
          font-size: 12px;
          letter-spacing: .10em;
          text-transform: uppercase;
          opacity: .8;
        }

        #overview .ovStack{
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }

        #overview .ovInner{
          padding: 14px;
          background: rgba(0,0,0,.18);
          min-width: 0;
        }

        #overview .linkCard{
          text-decoration: none;
        }
        #overview .linkCard:hover{
          transform: translateY(-1px);
        }

        @media (max-width: 900px){
          #overview .ovGrid{
            grid-template-columns: 1fr;
          }
          #overview .ovCard{
            min-height: auto;
            padding: 16px;
          }
        }

        @media (max-width: 520px){
          #overview .ovCard{
            padding: 14px;
          }
          #overview .ovInner{
            padding: 12px;
          }
        }
      `}</style>
    </SectionWrap>
  );
}
