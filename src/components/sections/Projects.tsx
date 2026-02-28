import React, { useEffect, useRef, useState } from "react";
import SectionWrap from "./SectionWrap";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    className="projTag"
    style={{
      border: "1px solid rgba(231,211,162,.18)",
      background: "rgba(0,0,0,.26)",
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      opacity: 0.95
    }}
  >
    {children}
  </span>
);

const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

/** Lazy mount heavy video only when card is near viewport */
function LazyCardVideo({
  src,
  dim = 0.35,
  poster
}: {
  src: string;
  dim?: number;
  poster?: string; // optional: /posters/medico.jpg
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mountVideo, setMountVideo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;

        const t = window.setTimeout(() => setMountVideo(true), 120);
        io.disconnect();
        return () => window.clearTimeout(t);
      },
      { threshold: 0.12, rootMargin: "220px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="projBgWrap" aria-hidden>
      {!mountVideo && (
        <div
          className="projPoster"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined
          }}
        />
      )}

      {mountVideo && (
        <video className="project-bg" autoPlay muted loop playsInline preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className="projDim" style={{ opacity: dim }} />
    </div>
  );
}

const ProjectCard = ({
  title,
  subtitle,
  link,
  bullets,
  tags,
  bgVideoSrc,
  poster
}: {
  title: string;
  subtitle: string;
  link: string;
  bullets: string[];
  tags: string[];
  bgVideoSrc?: string;
  poster?: string;
}) => {
  return (
    <a
      className="card frame project-card"
      style={{
        padding: 18,
        cursor: "pointer",
        display: "block",
        position: "relative",
        overflow: "hidden",
        background: "rgba(255,255,255,.04)",
        textDecoration: "none"
      }}
      href={`https://${link}`}
      target="_blank"
      rel="noreferrer"
    >
      {/* VIDEO BG (lazy) */}
      {bgVideoSrc && <LazyCardVideo src={bgVideoSrc} dim={0.38} poster={poster} />}

      {/* CONTENT (now on a tinted glass panel) */}
      <div className="projContent">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div className="projTitle">{title}</div>
            <p className="p projSub" style={{ marginTop: 6 }}>
              {subtitle}
            </p>
          </div>

          <div className="badge projBadge">{link}</div>
        </div>

        <ul className="projBullets" style={{ margin: "12px 0 0", paddingLeft: 18, lineHeight: 1.6 }}>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      <style>{`
        #projects .project-card{
          transition: transform .25s ease, box-shadow .25s ease;
          will-change: transform;
        }
        #projects .project-card:hover{
          transform: translateY(-2px);
        }

        /* -------- BG LAYERS -------- */
        #projects .projBgWrap{
          position:absolute;
          inset:0;
          z-index:0;
          pointer-events:none;
          overflow:hidden;
        }

        #projects .project-bg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          transform: scale(1.03);
          filter: saturate(1.1) contrast(1.05);
          opacity: .92;
          transition: transform .35s ease, opacity .35s ease;
        }

        #projects .projPoster{
          position:absolute;
          inset:0;
          background:
            radial-gradient(900px 420px at 25% 10%, rgba(201,168,106,.18), transparent 60%),
            radial-gradient(700px 420px at 80% 70%, rgba(160,130,255,.14), transparent 65%),
            rgba(0,0,0,.30);
          background-size: cover;
          background-position:center;
          filter: saturate(1.05) contrast(1.02);
        }

        /* global dim across card */
        #projects .projDim{
          position:absolute;
          inset:0;
          background: linear-gradient(180deg, rgba(0,0,0,.85), rgba(0,0,0,.42) 45%, rgba(0,0,0,.88));
          z-index:1;
          pointer-events:none;
          transition: opacity .35s ease;
        }

        /* -------- CONTENT PANEL (the "back light black tint") -------- */
        #projects .projContent{
          position: relative;
          z-index: 2;

          /* black tinted plate behind white text */
          background: rgba(0,0,0,.46);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 14px 14px;

          /* glass feel (works in modern browsers) */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          /* keeps it from filling whole card; looks like a panel */
          margin: 2px;
        }

        /* white text + subtle glow so it stands out on video */
        #projects .projTitle{
          font-weight: 850;
          font-size: 18px;
          color: rgba(255,255,255,.92);
          text-shadow: 0 2px 14px rgba(0,0,0,.65);
        }
        #projects .projSub{
          color: rgba(255,255,255,.78);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
        }
        #projects .projBullets{
          color: rgba(255,255,255,.75);
          text-shadow: 0 2px 14px rgba(0,0,0,.45);
        }

        #projects .projBadge{
          background: rgba(0,0,0,.40);
          border: 1px solid rgba(255,255,255,.10);
          color: rgba(255,255,255,.82);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
        }

        #projects .projTag{
          color: rgba(255,255,255,.82);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
        }

        /* hover effect: slightly reduce dim + zoom bg */
        #projects .project-card:hover .project-bg{
          transform: scale(1.08);
        }
        #projects .project-card:hover .projDim{
          opacity: .26 !important;
        }
        #projects .project-card:hover .projContent{
          background: rgba(0,0,0,.40);
          border-color: rgba(255,255,255,.12);
        }

        @media (prefers-reduced-motion: reduce){
          #projects .project-bg{ transition:none !important; }
          #projects .project-card{ transition:none !important; }
        }
      `}</style>
    </a>
  );
};

export default function Projects() {
  return (
    <SectionWrap id="projects" title="Projects">
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          marginTop: 12
        }}
      >
        <ProjectCard
          title="MedGenie 3.0"
          subtitle="Full-stack One Health platform + telemedicine flows"
          link="medico-cyborg-db.vercel.app"
          bgVideoSrc={withBase("videos/medico.mp4")}
          poster={withBase("posters/medico.jpg")}
          bullets={[
            "React 18 + Vite + Tailwind, Django REST, JWT auth; climate-aware outbreak forecasting and medical record uploads.",
            "Node.js WebSocket signaling + Django APIs for WebRTC video consults, Robot36 SSTV/voice workflows, and live dashboards."
          ]}
          tags={["React", "Django/DRF", "WebRTC", "WebSockets", "Groq"]}
        />

        <ProjectCard
          title="ML DeFi Agent"
          subtitle="Web3 dashboard + automations for safer transactions"
          link="defiv3.pythonanywhere.com"
          bgVideoSrc={withBase("videos/defi.mp4")}
          poster={withBase("posters/defi.jpg")}
          bullets={[
            "Next.js 14 RSC + Django REST; wallet onboarding with MetaMask/Coinbase/WalletConnect.",
            "QuickNode pre-tx simulation and real-time dashboards; embedded Groq LLaMA-3 chatbot + n8n automations."
          ]}
          tags={["Next.js", "Django/DRF", "Web3", "QuickNode", "n8n"]}
        />
      </div>

      <style>{`
        @media (max-width: 900px) {
          #projects .grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </SectionWrap>
  );
}