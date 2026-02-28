import React, { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const email = "jagritijaya11@gmail.com";
  const linkedin = "https://linkedin.com/in/jaya-jagriti-539361277";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  // reset copied on route changes / re-renders
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <footer className="section footerWrap" style={{ paddingTop: 28, paddingBottom: 28 }}>
      <div className="container footerCenter">
        <div className="card frame footerCard">
          <div className="footerTop">
            <div className="footerLeft">
              <div className="footerTitle">Let’s build something ✨</div>
              <div className="footerSub"> Jaya Jagriti • Open to work</div>
            </div>

            <div className="footerPills">
              <button type="button" onClick={copyEmail} className={`footerPill ${copied ? "isCopied" : ""}`}>
                <span className="footerIcon">✉️</span>
                <span className="footerMainText">{copied ? "Copied!" : email}</span>
                <span className="footerMini">Copy</span>
              </button>

              <a href={linkedin} target="_blank" rel="noreferrer" className="footerPill">
                <span className="footerIcon">in</span>
                <span className="footerMainText">LinkedIn</span>
                <span className="footerMini">↗</span>
              </a>
            </div>
          </div>

          <div className="footerBottom">
            <span>Open to work • full-time • freelance</span>
            <span className="footerMuted">Built with React • Motion • WebGL vibes</span>
          </div>
        </div>
      </div>

      <style>{`
        .footerWrap{
          position: relative;
          z-index: 1;
        }

        .footerCenter{
          display:flex;
          justify-content:center;
        }

        .footerCard{
          width: min(980px, 100%);
          padding: 18px;
          border-radius: 18px;

          /* solid-ish base so it’s always visible on mobile */
          background:
            linear-gradient(180deg, rgba(231,211,162,.10), rgba(0,0,0,.18));
          border: 1px solid rgba(231,211,162,.18);
          box-shadow: 0 18px 60px rgba(0,0,0,.35);

          min-width: 0;
        }

        .footerTop{
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap: 14px;
          flex-wrap: wrap;
          min-width:0;
        }

        .footerLeft{
          min-width: 220px;
          flex: 1 1 240px;
        }

        .footerTitle{
          font-weight: 900;
          letter-spacing: .2px;
        }

        .footerSub{
          margin-top: 6px;
          opacity: .75;
          font-size: 12.5px;
          overflow-wrap: anywhere;
        }

        .footerPills{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items:center;
          justify-content:flex-end;
          min-width: 0;
        }

        .footerPill{
          border: 1px solid rgba(231,211,162,.22);
          background: rgba(0,0,0,.22);
          padding: 10px 14px;
          border-radius: 14px;

          display:inline-flex;
          align-items:center;
          gap: 10px;

          text-decoration:none;
          color: inherit;
          cursor: pointer;
          user-select:none;

          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
          min-width: 0;
          max-width: 100%;
        }

        .footerPill.isCopied{
          background: rgba(46, 204, 113, .14);
          border-color: rgba(46, 204, 113, .25);
        }

        .footerIcon{
          width: 26px;
          height: 26px;
          border-radius: 10px;
          display:grid;
          place-items:center;
          border: 1px solid rgba(231,211,162,.22);
          background: rgba(231,211,162,.08);
          font-size: 14px;
          flex: 0 0 auto;
        }

        .footerMainText{
          font-weight: 800;
          font-size: 13px;
          overflow-wrap:anywhere;
          word-break: break-word;
        }

        .footerMini{
          font-size: 12px;
          opacity: .7;
          border-left: 1px solid rgba(231,211,162,.18);
          padding-left: 10px;
          margin-left: 4px;
          white-space: nowrap;
        }

        .footerBottom{
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(231,211,162,.14);

          display:flex;
          justify-content:space-between;
          gap: 12px;
          flex-wrap: wrap;
          align-items:center;

          opacity: .8;
          font-size: 12.5px;
        }

        .footerMuted{
          opacity: .75;
          overflow-wrap:anywhere;
        }

        /* hover only on devices that actually hover */
        @media (hover: hover) and (pointer: fine){
          .footerPill:hover{
            transform: translateY(-1px);
            background: rgba(231,211,162,.12);
            border-color: rgba(231,211,162,.30);
          }
          .footerPill.isCopied:hover{
            background: rgba(46, 204, 113, .16);
            border-color: rgba(46, 204, 113, .28);
          }
        }

        @media (max-width: 520px){
          .footerCard{ padding: 14px; }
          .footerPill{ padding: 10px 12px; }
          .footerMini{ display:none; } /* clean on tiny screens */
        }

        @media (prefers-reduced-motion: reduce){
          .footerPill{ transition: none !important; }
        }
      `}</style>
    </footer>
  );
}
