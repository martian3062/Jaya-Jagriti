import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionWrap from "./SectionWrap";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="projTag">{children}</span>
);

const withBase = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, "")}`;

/** Use optimized .web.mp4 if present (you generated these) */
const toWebMp4 = (src: string) => {
  // already web
  if (src.includes(".web.mp4")) return src;
  // swap only final .mp4
  if (src.endsWith(".mp4")) return src.replace(/\.mp4$/, ".web.mp4");
  return src;
};

const normalizeLink = (link: string) => {
  const t = link.trim();
  if (!t) return "#";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return `https://${t}`;
};

/** Lazy mount heavy video only when card is near viewport */
function LazyCardVideo({
  src,
  dim = 0.35,
  poster
}: {
  src: string;
  dim?: number;
  poster?: string;
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
      { threshold: 0.12, rootMargin: "260px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const finalSrc = useMemo(() => toWebMp4(src), [src]);

  return (
    <div ref={ref} className="projBgWrap" aria-hidden>
      {!mountVideo && (
        <div className="projPoster" style={poster ? { backgroundImage: `url(${poster})` } : undefined} />
      )}

      {mountVideo && (
<<<<<<< HEAD
        <video className="project-bg" autoPlay muted loop playsInline preload="metadata">
          <source src={finalSrc} type="video/mp4" />
=======
        <video
          className="project-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
        >
          <source src={src} type="video/mp4" />
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
        </video>
      )}

      <div className="projDim" style={{ opacity: dim }} />
    </div>
  );
}

const safeHref = (link: string) => {
  if (/^https?:\/\//i.test(link)) return link;
  return `https://${link}`;
};

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
      href={safeHref(link)}
      target="_blank"
      rel="noreferrer"
      style={{
        padding: 18,
        cursor: "pointer",
        display: "block",
        position: "relative",
        overflow: "hidden",
        background: "rgba(255,255,255,.04)",
        textDecoration: "none",
        minWidth: 0
      }}
<<<<<<< HEAD
      href={normalizeLink(link)}
      target="_blank"
      rel="noreferrer"
=======
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
    >
      {/* ✅ Desktop: full-card BG video | ✅ Mobile: banner video */}
      {bgVideoSrc && (
        <div className="projMedia">
          <LazyCardVideo src={bgVideoSrc} dim={0.38} poster={poster} />
        </div>
      )}

<<<<<<< HEAD
      {/* CONTENT */}
      <div className="projContent">
        <div className="projTop">
          <div>
=======
      <div className="projContent">
        <div className="projTop">
          <div className="projHead">
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
            <div className="projTitle">{title}</div>
            <p className="p projSub">{subtitle}</p>
          </div>

          <div className="badge projBadge">{link}</div>
        </div>

        <ul className="projBullets">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="projTagsRow">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>

      <style>{`
        /* ---------------------------------- */
        /* ✅ MOBILE VISIBILITY / SAFE PADDING */
        /* ---------------------------------- */
        #projects{
          position: relative;
        }

        /* make sure this section is above background layers */
        #projects .project-card{
          z-index: 5;
          transition: transform .25s ease, box-shadow .25s ease;
          will-change: transform;
        }

        #projects .project-card:hover{
          transform: translateY(-2px);
        }

        /* ✅ Media wrapper:
           - Desktop: absolute full background
           - Mobile: relative banner (short height) */
        #projects .projMedia{
          position:absolute;
          inset:0;
          z-index:0;
          pointer-events:none;
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
          object-position:center;
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
          background-repeat:no-repeat;
          filter: saturate(1.05) contrast(1.02);
        }

        #projects .projDim{
          position:absolute;
          inset:0;
          background: linear-gradient(180deg, rgba(0,0,0,.88), rgba(0,0,0,.46) 45%, rgba(0,0,0,.90));
          z-index:1;
          pointer-events:none;
          transition: opacity .35s ease;
        }

        /* -------- CONTENT PANEL -------- */
        #projects .projContent{
          position: relative;
          z-index: 2;
<<<<<<< HEAD
          background: rgba(0,0,0,.46);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          margin: 2px;
        }

        #projects .projTop{
          display:flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          align-items: flex-start;
        }

=======
          background: rgba(0,0,0,.50);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 16px;
          padding: 14px;
          margin: 2px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          min-width: 0;
        }

        #projects .projTop{
          display:flex;
          justify-content: space-between;
          gap: 12px;
          align-items:flex-start;
          flex-wrap: wrap;
          min-width: 0;
        }

        #projects .projHead{
          min-width: 0;
          flex: 1 1 260px;
        }

>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
        #projects .projTitle{
          font-weight: 900;
          font-size: 18px;
          line-height: 1.25;
          color: rgba(255,255,255,.92);
          text-shadow: 0 2px 14px rgba(0,0,0,.65);
          word-break: break-word;
        }

        #projects .projSub{
          margin-top: 6px;
          color: rgba(255,255,255,.78);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
<<<<<<< HEAD
        }

        #projects .projBullets{
          margin: 12px 0 0;
          padding-left: 18px;
          line-height: 1.65;
          color: rgba(255,255,255,.76);
          text-shadow: 0 2px 14px rgba(0,0,0,.45);
=======
          word-break: break-word;
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
        }

        #projects .projBadge{
          background: rgba(0,0,0,.45);
          border: 1px solid rgba(255,255,255,.10);
          color: rgba(255,255,255,.82);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
<<<<<<< HEAD
          white-space: nowrap;
=======
          max-width: 100%;
          overflow-wrap: anywhere;
        }

        #projects .projBullets{
          margin: 12px 0 0;
          padding-left: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,.75);
          text-shadow: 0 2px 14px rgba(0,0,0,.45);
          overflow-wrap: anywhere;
        }

        #projects .projTagsRow{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
        }

        #projects .projTag{
          border: 1px solid rgba(231,211,162,.18);
          background: rgba(0,0,0,.30);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          opacity: .95;
          color: rgba(255,255,255,.84);
          text-shadow: 0 2px 14px rgba(0,0,0,.55);
        }

<<<<<<< HEAD
        #projects .projTagsRow{
          display:flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        /* hover effect */
=======
        /* hover */
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
        #projects .project-card:hover .project-bg{
          transform: scale(1.08);
        }
        #projects .project-card:hover .projDim{
          opacity: .26 !important;
        }
        #projects .project-card:hover .projContent{
          background: rgba(0,0,0,.44);
          border-color: rgba(255,255,255,.12);
        }

        /* ✅ MOBILE: make cards lighter + reduce GPU + improve readability */
        @media (max-width: 640px){
          #projects .project-card{
            padding: 14px;
          }

          #projects .project-bg{
            transform: scale(1.02);
            opacity: .85;
            filter: saturate(1.02) contrast(1.02);
          }

          #projects .projDim{
            opacity: .55 !important; /* stronger dim for readable text */
          }

          #projects .projContent{
            padding: 12px;
            border-radius: 14px;
            background: rgba(0,0,0,.56);
          }

          #projects .projTitle{
            font-size: 16px;
          }

          #projects .projBullets{
            line-height: 1.55;
          }
        }

        @media (prefers-reduced-motion: reduce){
          #projects .project-bg{ transition:none !important; }
          #projects .project-card{ transition:none !important; }
        }

        /* responsive grid */
        #projects .projectsGrid{
          display:grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 12px;
        }
        @media (max-width: 980px){
          #projects .projectsGrid{ grid-template-columns: 1fr; }
        }

        /* ✅ MOBILE: banner video (width > height) */
        @media (max-width: 520px){
          #projects .project-card{ padding: 14px !important; }

          /* banner block */
          #projects .projMedia{
            position: relative;
            height: 140px;         /* ✅ short height => wide banner */
            border-radius: 14px;
            overflow: hidden;
            margin: 0 0 12px 0;
          }

          /* ensure bg wrap fills banner */
          #projects .projMedia .projBgWrap{
            position:absolute;
            inset:0;
          }

          /* crop nicely inside banner */
          #projects .project-bg{
            transform: scale(1.14) !important;
            object-position: center 40% !important;
            opacity: .85;
          }

          /* dim inside banner */
          #projects .projDim{
            opacity: .60 !important;
            background: linear-gradient(
              180deg,
              rgba(0,0,0,.72) 0%,
              rgba(0,0,0,.48) 55%,
              rgba(0,0,0,.88) 100%
            ) !important;
          }

          /* content becomes normal card body */
          #projects .projContent{
            margin: 0;
            padding: 12px;
            border-radius: 14px;
            background: rgba(0,0,0,.52);
          }

          #projects .projTitle{ font-size: 17px; }
        }
      `}</style>
    </a>
  );
};

export default function Projects() {
  return (
    <SectionWrap id="projects" title="Projects">
<<<<<<< HEAD
      <div className="projectsInner">
        <div className="grid projectsGrid">
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
=======
      <div className="projectsGrid">
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
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)

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
      </div>
<<<<<<< HEAD

      <style>{`
        /* ✅ section padding so it doesn't hide under navbar / bottom dock */
        #projects .projectsInner{
          width: min(1100px, calc(100vw - 48px));
          margin: 0 auto;
          padding: 92px 0 120px;
          position: relative;
          z-index: 5;
        }

        #projects .projectsGrid{
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 12px;
        }

        @media (max-width: 900px){
          #projects .projectsGrid{
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px){
          #projects .projectsInner{
            width: calc(100vw - 24px);
            padding: 84px 0 140px; /* extra bottom for your section dock */
          }
        }
      `}</style>
=======
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
    </SectionWrap>
  );
}
