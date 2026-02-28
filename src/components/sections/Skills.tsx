import React, { useEffect, useState } from "react";
import SectionWrap from "./SectionWrap";

type Tech = {
  label: string;
  logoSrc?: string;
};

const initials = (label: string) => {
  const parts = label.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/** ✅ Keep coins data OUTSIDE component so no hooks needed */
const COINS = [
  { x: 12, y: 22, s: 1.05, d: 0.0 },
  { x: 72, y: 18, s: 0.9, d: 0.15 },
  { x: 42, y: 40, s: 1.2, d: 0.25 },
  { x: 18, y: 66, s: 0.85, d: 0.35 },
  { x: 78, y: 64, s: 1.0, d: 0.45 }
];

const TechPill = ({ label, logoSrc }: Tech) => {
  const fallback = initials(label);

  return (
    <span className="techPill">
      <span className={`techIcon ${logoSrc ? "hasLogo" : "isFallback"}`}>
        {logoSrc ? (
          <img src={logoSrc} alt={`${label} logo`} loading="lazy" />
        ) : (
          <span className="techInitials">{fallback}</span>
        )}
      </span>

      <span className="techLabel">{label}</span>

      {/* hover sparkles */}
      <span className="pillSpark s1" />
      <span className="pillSpark s2" />
      <span className="pillSpark s3" />
    </span>
  );
};

/**
 * ✅ IMPORTANT:
 * - Never early-return
 * - Never call hooks conditionally
 * - Just "render" and control visibility via style/class
 */
function CoinIntroOverlay({
  show,
  durationMs = 1200,
  onDone
}: {
  show: boolean;
  durationMs?: number;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!show) return;
    const t = window.setTimeout(onDone, durationMs);
    return () => window.clearTimeout(t);
  }, [show, durationMs, onDone]);

  return (
    <div
      className="skillsIntroOverlay"
      aria-hidden="true"
      style={{
        opacity: show ? 1 : 0,
        pointerEvents: show ? "auto" : "none"
      }}
    >
      <div className="introInner">
        <div className="coinField">
          {COINS.map((c, i) => (
            <span
              key={i}
              className="coin"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                transform: `translate(-50%, -50%) scale(${c.s})`,
                animationDelay: `${c.d}s`
              }}
            />
          ))}

          <span className="burst b1" />
          <span className="burst b2" />
          <span className="burst b3" />
        </div>

        <div className="introText">
          <div className="introKicker">Loading Skills</div>
          <div className="introBar">
            <span />
          </div>
          <div className="introHint">coins • hover • sparkle</div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [intro, setIntro] = useState(true);

  const languages: Tech[] = [
    { label: "English", logoSrc: "/logos/Eng.png" },
    { label: "Hindi/हिंदी", logoSrc: "/logos/hindi.png" },
    { label: "Sanskrit/संस्कृतम्", logoSrc: "/logos/sanskrit.jpg" }
  ];

  const programming: Tech[] = [
    { label: "Python", logoSrc: "/logos/py.png" },
    { label: "JavaScript", logoSrc: "/logos/js.png" },
    { label: "Kotlin", logoSrc: "/logos/kotlin.jpg" },
    { label: "Go", logoSrc: "/logos/go.png" },
    { label: "C++", logoSrc: "/logos/cpp.png" }
  ];

  const frameworks: Tech[] = [
    { label: "Django", logoSrc: "/logos/django.png" },
    { label: "Flask", logoSrc: "/logos/flask.png" },
    { label: "React", logoSrc: "/logos/react.png" },
    { label: "WebRTC", logoSrc: "/logos/webrtc.jpg" }
  ];

  const dataML: Tech[] = [
    { label: "PyTorch", logoSrc: "/logos/pytorch.jpg" },
    { label: "LightGBM", logoSrc: "/logos/lightgbm.png" },
    { label: "OpenCV", logoSrc: "/logos/opencv.png" },
    { label: "ARIMA" },
    { label: "Selenium", logoSrc: "/logos/selenium.jpg" }
  ];

  const web3: Tech[] = [
    { label: "Web3.py" },
    { label: "IPFS", logoSrc: "/logos/ipfs.png" },
    { label: "MetaMask", logoSrc: "/logos/metamask.png" },
    { label: "QuickNode", logoSrc: "/logos/quicknode.jpg" },
    { label: "Dune", logoSrc: "/logos/dune.jpg" }
  ];

  const devops: Tech[] = [
    { label: "AWS", logoSrc: "/logos/aws.jpg" },
    { label: "Git", logoSrc: "/logos/git.png" },
    // ✅ FIX THIS if it was wrong in your folder:
    { label: "n8n", logoSrc: "/logos/n8n.jpg" },
    { label: "LangGraph" },
    { label: "Eliza" },
    { label: "MQTT" }
  ];

  const tools: Tech[] = [
    { label: "Power BI", logoSrc: "/logos/powerbi.png" },
    { label: "Pinecone", logoSrc: "/logos/pinecone.png" },
    { label: "Excel", logoSrc: "/logos/excel.jpg" },
    { label: "ComfyUI" },
    { label: "GenAI" }
  ];

  const Wrap = ({ items }: { items: Tech[] }) => (
    <div className="techWrap" style={{ marginTop: 12 }}>
      {items.map((x, idx) => (
        <span
          key={x.label}
          className="pillEnter"
          style={{ animationDelay: `${0.08 * idx + 0.06}s` }}
        >
          <TechPill label={x.label} logoSrc={x.logoSrc} />
        </span>
      ))}
    </div>
  );

  return (
    <SectionWrap id="skills" title="Skills">
      <CoinIntroOverlay show={intro} onDone={() => setIntro(false)} />

      <div
        className={`grid skillsGrid ${intro ? "isIntro" : "isReady"}`}
        style={{ gridTemplateColumns: "1fr 1fr", marginTop: 12 }}
      >
        <div className="card frame" style={{ padding: 18, background: "rgba(255,255,255,.04)" }}>
          <div className="badge">Languages</div>
          <Wrap items={languages} />

          <div className="badge" style={{ marginTop: 18 }}>
            Programming
          </div>
          <Wrap items={programming} />
        </div>

        <div className="card frame" style={{ padding: 18, background: "rgba(255,255,255,.04)" }}>
          <div className="badge">Frameworks</div>
          <Wrap items={frameworks} />

          <div className="badge" style={{ marginTop: 18 }}>
            Data & ML
          </div>
          <Wrap items={dataML} />
        </div>

        <div className="card frame" style={{ padding: 18, background: "rgba(255,255,255,.04)" }}>
          <div className="badge">Web3</div>
          <Wrap items={web3} />
        </div>

        <div className="card frame" style={{ padding: 18, background: "rgba(255,255,255,.04)" }}>
          <div className="badge">DevOps & Automation</div>
          <Wrap items={devops} />

          <div className="badge" style={{ marginTop: 18 }}>
            Tools
          </div>
          <Wrap items={tools} />
        </div>
      </div>

      <style>{`
        #skills{ position:relative; }

        /* ========= Intro Overlay ========= */
        .skillsIntroOverlay{
          position:absolute;
          inset:0;
          z-index:20;
          display:grid;
          place-items:center;
          border-radius: 22px;
          background:
            radial-gradient(900px 400px at 40% 0%, rgba(201,168,106,.18), transparent 60%),
            radial-gradient(700px 420px at 80% 70%, rgba(160,130,255,.14), transparent 65%),
            rgba(0,0,0,.58);
          backdrop-filter: blur(10px);
          transition: opacity .35s ease;
        }

        .introInner{
          width:min(520px, 92%);
          padding:18px;
          border-radius:24px;
          border:1px solid rgba(231,211,162,.22);
          background: rgba(0,0,0,.35);
          box-shadow: 0 24px 80px rgba(0,0,0,.45);
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:14px;
          position:relative;
          overflow:hidden;
          isolation:isolate;
        }
        .introInner::before{
          content:"";
          position:absolute;
          inset:-40%;
          background:
            conic-gradient(from 120deg, rgba(201,168,106,.0), rgba(201,168,106,.22), rgba(160,130,255,.16), rgba(201,168,106,.0));
          filter: blur(18px);
          animation: slowSpin 3.4s linear infinite;
          opacity:.7;
          z-index:0;
        }
        @keyframes slowSpin{ to{ transform: rotate(360deg); } }

        .coinField{
          position:relative;
          min-height:160px;
          border-radius:20px;
          border:1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.03);
          overflow:hidden;
          isolation:isolate;
          z-index:1;
        }
        .coinField::after{
          content:"";
          position:absolute;
          inset:-40%;
          background: radial-gradient(closest-side, rgba(255,255,255,.09), transparent 65%);
          filter: blur(10px);
          animation: breathe 1.9s ease-in-out infinite;
          opacity:.85;
          z-index:0;
        }
        @keyframes breathe{
          0%,100%{ transform: translate3d(-2%, -2%, 0) scale(1); opacity:.85; }
          50%{ transform: translate3d(2%, 2%, 0) scale(1.06); opacity:1; }
        }

        .coin{
          position:absolute;
          width:46px;
          height:46px;
          border-radius:50%;
          border:1px solid rgba(231,211,162,.40);
          background:
            radial-gradient(16px 16px at 30% 30%, rgba(255,255,255,.55), transparent 62%),
            radial-gradient(44px 44px at 50% 55%, rgba(201,168,106,.55), rgba(201,168,106,.18) 55%, rgba(0,0,0,.28) 100%);
          box-shadow:
            0 14px 30px rgba(0,0,0,.35),
            inset 0 0 0 2px rgba(255,255,255,.10);
          animation: coinFloat 1.15s ease-in-out infinite;
          z-index:2;
        }
        .coin::before{
          content:"";
          position:absolute;
          inset:10px;
          border-radius:50%;
          border:1px dashed rgba(255,255,255,.18);
          opacity:.75;
        }
        .coin::after{
          content:"";
          position:absolute;
          inset:-30%;
          background:
            conic-gradient(from 90deg,
              rgba(255,255,255,0),
              rgba(255,255,255,.22),
              rgba(255,255,255,0),
              rgba(160,130,255,.10),
              rgba(255,255,255,0));
          filter: blur(10px);
          animation: shimmer 1.1s linear infinite;
          opacity:.8;
          mix-blend-mode: screen;
        }
        @keyframes coinFloat{
          0%{ transform: translate(-50%,-50%) translateY(8px) rotate(-6deg) scale(1); }
          50%{ transform: translate(-50%,-50%) translateY(-10px) rotate(10deg) scale(1.02); }
          100%{ transform: translate(-50%,-50%) translateY(8px) rotate(-6deg) scale(1); }
        }
        @keyframes shimmer{ to{ transform: rotate(360deg); } }

        .burst{
          position:absolute;
          width:10px;
          height:10px;
          left:50%;
          top:50%;
          border-radius:999px;
          background: rgba(255,255,255,.8);
          transform: translate(-50%,-50%) scale(.3);
          opacity:0;
          z-index:3;
        }
        .burst::before, .burst::after{
          content:"";
          position:absolute;
          inset:-24px;
          border-radius:999px;
          background: radial-gradient(circle, rgba(255,255,255,.55) 0 10%, transparent 12% 100%);
          transform: rotate(18deg);
          opacity:.95;
        }
        .burst::after{
          inset:-34px;
          opacity:.55;
          transform: rotate(-12deg);
        }
        .b1{ animation: burstPop 1.15s ease forwards; }
        .b2{ animation: burstPop 1.15s ease forwards; animation-delay:.18s; left:62%; top:42%; }
        .b3{ animation: burstPop 1.15s ease forwards; animation-delay:.34s; left:40%; top:60%; }
        @keyframes burstPop{
          0%{ opacity:0; transform: translate(-50%,-50%) scale(.25); }
          25%{ opacity:1; transform: translate(-50%,-50%) scale(1); }
          55%{ opacity:.85; transform: translate(-50%,-50%) scale(1.35); }
          100%{ opacity:0; transform: translate(-50%,-50%) scale(1.6); }
        }

        .introText{
          position:relative;
          z-index:1;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:8px;
          padding:6px 2px;
        }
        .introKicker{
          font-weight:900;
          letter-spacing:.08em;
          text-transform:uppercase;
          font-size:12px;
          opacity:.92;
        }
        .introBar{
          height:10px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06);
          overflow:hidden;
        }
        .introBar > span{
          display:block;
          height:100%;
          width:50%;
          border-radius:999px;
          background:
            linear-gradient(90deg, rgba(201,168,106,.10), rgba(201,168,106,.50), rgba(160,130,255,.24));
          animation: barRun 1.15s ease forwards;
          filter: blur(.2px);
        }
        @keyframes barRun{
          0%{ transform: translateX(-120%); opacity:.6; }
          45%{ opacity:1; }
          100%{ transform: translateX(220%); opacity:.8; }
        }
        .introHint{
          font-size:12px;
          opacity:.7;
        }

        /* Slight blur while intro shows */
        .skillsGrid.isIntro{
          filter: blur(2px);
          opacity: .92;
          transition: .35s ease;
        }
        .skillsGrid.isReady{
          filter: none;
          opacity: 1;
          transition: .35s ease;
        }

        /* ========= Pills Enter ========= */
        .pillEnter{
          display:inline-block;
          animation: pillIn .55s cubic-bezier(.2,.9,.2,1) both;
        }
        @keyframes pillIn{
          from{ opacity:0; transform: translateY(10px) scale(.98); filter: blur(2px); }
          to{ opacity:1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        /* ---- Skills Pills ---- */
        .techWrap{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }
        .techPill{
          position:relative;
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:8px 12px;
          border-radius:999px;
          border: 1px solid rgba(231,211,162,.18);
          background: rgba(0,0,0,.20);
          font-size:12px;
          opacity:.95;
          backdrop-filter: blur(10px);
          box-shadow: 0 14px 30px rgba(0,0,0,.22);
          transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
          will-change: transform;
          overflow:hidden;
        }
        .techPill:hover{
          transform: translateY(-3px);
          border-color: rgba(231,211,162,.34);
          box-shadow: 0 18px 44px rgba(0,0,0,.32);
        }
        .techPill::before{
          content:"";
          position:absolute;
          inset:-40%;
          background:
            conic-gradient(from 120deg,
              rgba(255,255,255,0),
              rgba(255,255,255,.18),
              rgba(255,255,255,0),
              rgba(160,130,255,.10),
              rgba(255,255,255,0));
          opacity:0;
          filter: blur(10px);
          transition: opacity .18s ease;
          animation: shimmer 1.35s linear infinite;
          pointer-events:none;
          mix-blend-mode: screen;
        }
        .techPill:hover::before{ opacity:.9; }

        .pillSpark{
          position:absolute;
          width:6px; height:6px;
          border-radius:999px;
          background: rgba(255,255,255,.9);
          opacity:0;
          pointer-events:none;
          filter: blur(.2px);
          box-shadow:
            0 0 12px rgba(255,255,255,.45),
            0 0 18px rgba(201,168,106,.35);
          transform: scale(.6);
        }
        .pillSpark.s1{ left:14px; top:8px; }
        .pillSpark.s2{ right:18px; top:10px; }
        .pillSpark.s3{ right:22px; bottom:10px; }

        .techPill:hover .pillSpark{
          animation: sparkPop .55s ease forwards;
        }
        .techPill:hover .pillSpark.s2{ animation-delay:.06s; }
        .techPill:hover .pillSpark.s3{ animation-delay:.12s; }

        @keyframes sparkPop{
          0%{ opacity:0; transform: scale(.6) translateY(0); }
          35%{ opacity:1; transform: scale(1.05) translateY(-2px); }
          100%{ opacity:0; transform: scale(1.35) translateY(-6px); }
        }

        .techIcon{
          width:28px;
          height:28px;
          border-radius:10px;
          display:grid;
          place-items:center;
          flex:0 0 auto;
          overflow:hidden;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.06);
        }
        .techIcon.hasLogo img{
          width:18px;
          height:18px;
          object-fit:contain;
          filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
        }
        .techIcon.isFallback{
          position:relative;
        }
        .techIcon.isFallback::before{
          content:"";
          position:absolute;
          inset:-20%;
          background:
            radial-gradient(90px 70px at 30% 20%, rgba(201,168,106,.35), transparent 60%),
            radial-gradient(90px 70px at 70% 80%, rgba(160,130,255,.25), transparent 60%);
          filter: blur(6px);
        }
        .techInitials{
          position:relative;
          font-size:11px;
          font-weight:900;
          letter-spacing:.08em;
          color: rgba(234,231,223,.92);
        }
        .techLabel{
          font-weight:800;
          letter-spacing:.02em;
        }

        @media (max-width: 900px) {
          #skills .grid { grid-template-columns: 1fr !important; }
          .introInner{ grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce){
          .coin, .burst, .introBar > span, .pillEnter,
          .techPill::before, .techPill:hover .pillSpark{
            animation: none !important;
          }
        }
      `}</style>
    </SectionWrap>
  );
}