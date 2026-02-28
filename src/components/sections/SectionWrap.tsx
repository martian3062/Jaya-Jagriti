import React, { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrap({ id, title, children, className }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // More forgiving on mobile
  const inView = useInView(ref, { amount: 0.12, once: true, margin: "0px 0px -10% 0px" });

  // Failsafe: if IntersectionObserver doesn't fire, still show content
  const [forceShow, setForceShow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 450);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow;

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 22, filter: "blur(2px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
    }),
    []
  );

  return (
    <section id={id} ref={ref} className={["section-wrap", className].filter(Boolean).join(" ")}>
      <motion.div
        className={`section-inner ${show ? "sparkleOn" : ""}`}
        variants={variants}
        initial="hidden"
        animate={show ? "show" : "hidden"}
        style={{ willChange: "transform, opacity" }}
      >
        {title ? (
          <div className="section-titleRow">
            <div className="section-title">{title}</div>
          </div>
        ) : null}

        {children}
      </motion.div>

      <style>{`
        .section-wrap{
          width: 100%;
          position: relative;
          overflow-x: clip;
        }

        .section-inner{
          width: min(1120px, 100%);
          margin: 0 auto;
          padding: 26px 18px;
          box-sizing: border-box;
          min-width: 0;
        }

        .section-titleRow{ margin-bottom: 12px; }
        .section-title{
          font-weight: 900;
          letter-spacing: .06em;
          text-transform: uppercase;
          font-size: 12px;
          opacity: .8;
        }

        @media (max-width: 900px){
          .section-inner{ padding: 22px 16px; }
        }

        @media (max-width: 520px){
          .section-inner{ padding: 20px 14px; }
        }

        @media (prefers-reduced-motion: reduce){
          .section-inner{ transition: none !important; }
        }
      `}</style>
    </section>
  );
}
