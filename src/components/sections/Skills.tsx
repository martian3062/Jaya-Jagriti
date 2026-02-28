import React, { useEffect, useState } from "react";
import SectionWrap from "./SectionWrap";

type Tech = { label: string; logoSrc?: string };

const initials = (label: string) => {
  const parts = label.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

/** Keep coins data OUTSIDE component */
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

      <span className="pillSpark s1" />
      <span className="pillSpark s2" />
      <span className="pillSpark s3" />
    </span>
  );
};

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
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
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
    { label: "LightGBM",  logoSrc: "/logos/lightbgm.png"},
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
        <span key={x.label} className="pillEnter" style={{ animationDelay: `${0.08 * idx + 0.06}s` }}>
          <TechPill label={x.label} logoSrc={x.logoSrc} />
        </span>
      ))}
    </div>
  );

  return (
    <SectionWrap id="skills" title="Skills">
      <CoinIntroOverlay show={intro} onDone={() => setIntro(false)} />

      <div className={`skillsGrid ${intro ? "isIntro" : "isReady"}`} style={{ marginTop: 12 }}>
        <div className="card frame skillsCard">
          <div className="badge">Languages</div>
          <Wrap items={languages} />

          <div className="badge" style={{ marginTop: 18 }}>
            Programming
          </div>
          <Wrap items={programming} />
        </div>

        <div className="card frame skillsCard">
          <div className="badge">Frameworks</div>
          <Wrap items={frameworks} />

          <div className="badge" style={{ marginTop: 18 }}>
            Data & ML
          </div>
          <Wrap items={dataML} />
        </div>

        <div className="card frame skillsCard">
          <div className="badge">Web3</div>
          <Wrap items={web3} />
        </div>

        <div className="card frame skillsCard">
          <div className="badge">DevOps & Automation</div>
          <Wrap items={devops} />

          <div className="badge" style={{ marginTop: 18 }}>
            Tools
          </div>
          <Wrap items={tools} />
        </div>
      </div>
    </SectionWrap>
  );
}
