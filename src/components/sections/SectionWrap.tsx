import React, { type ReactNode, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  /** optional: extra padding if a section needs more/less */
  padTop?: number;
  padBottom?: number;
};

export default function SectionWrap({ id, title, children, padTop, padBottom }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref as any, { amount: 0.18, once: true });

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 18,
        filter: "blur(8px)"
      },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
      }
    }),
    []
  );

  return (
    <section id={id} ref={ref as any} className="section-wrap">
      <motion.div
        className={`section-inner ${inView ? "sparkleOn" : ""}`}
        variants={variants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ willChange: "transform, opacity, filter" }}
      >
        {title ? (
          <div className="section-titleRow">
            <div className="section-title">{title}</div>
          </div>
        ) : null}

        {children}
      </motion.div>

      {/* ✅ Global per-section CSS (mobile-safe) */}
      <style>{`
        /* each section must sit above background video */
        #${id}.section-wrap{
          position: relative;
          z-index: 5;
          width: 100%;
        }

        /* 👇 IMPORTANT:
           padding-top keeps content below navbar
           padding-bottom keeps content above bottom dock
        */
        #${id}.section-wrap{
          padding-top: ${padTop ?? 88}px;
          padding-bottom: ${padBottom ?? 130}px;
        }

        /* inner width constraint */
        #${id} .section-inner{
          width: min(1100px, calc(100vw - 48px));
          margin: 0 auto;
        }

        /* title (optional) */
        #${id} .section-titleRow{
          margin-bottom: 12px;
        }
        #${id} .section-title{
          font-weight: 900;
          letter-spacing: .06em;
          text-transform: uppercase;
          font-size: 12px;
          opacity: .8;
        }

        /* Mobile: more usable padding + full width */
        @media (max-width: 640px){
          #${id}.section-wrap{
            padding-top: ${padTop ?? 84}px;
            padding-bottom: ${padBottom ?? 150}px;
          }
          #${id} .section-inner{
            width: calc(100vw - 24px);
          }
        }

        /* Very short landscape: keep content visible */
        @media (orientation: landscape) and (max-height: 520px){
          #${id}.section-wrap{
            padding-top: 72px;
            padding-bottom: 120px;
          }
        }

        /* Safety: prevent horizontal overflow on mobile */
        #${id} .section-inner *{
          max-width: 100%;
        }
      `}</style>
    </section>
  );
}
