import React, { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  padTop?: number;
  padBottom?: number;
};

export default function SectionWrap({ id, title, children, padTop, padBottom }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref as any, { amount: 0.12, once: true });

  // ✅ Failsafe: if IntersectionObserver doesn't fire, still show content
  const [forceShow, setForceShow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 650);
    return () => window.clearTimeout(t);
  }, []);

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
    }),
    []
  );

  const shouldAnimate = inView || forceShow;

  return (
    <section id={id} ref={ref as any} className="section-wrap">
      <motion.div
        className={`section-inner ${shouldAnimate ? "sparkleOn" : ""}`}
        variants={variants}
        // ✅ IMPORTANT: default is visible so you never get a blank page
        initial={false}
        animate={shouldAnimate ? "show" : "hidden"}
        style={{
          willChange: "transform, opacity, filter",
          // ✅ fallback hard-visibility even if motion gets weird
          opacity: shouldAnimate ? 1 : 1
        }}
      >
        {title ? (
          <div className="section-titleRow">
            <div className="section-title">{title}</div>
          </div>
        ) : null}

        {children}
      </motion.div>

      <style>{`
        /* section above background */
        #${id}.section-wrap{
          position: relative;
          z-index: 5;
          width: 100%;
          padding-top: ${padTop ?? 88}px;
          padding-bottom: ${padBottom ?? 130}px;
        }

        #${id} .section-inner{
          width: min(1100px, calc(100vw - 48px));
          margin: 0 auto;
        }

        #${id} .section-titleRow{ margin-bottom: 12px; }
        #${id} .section-title{
          font-weight: 900;
          letter-spacing: .06em;
          text-transform: uppercase;
          font-size: 12px;
          opacity: .8;
        }

        @media (max-width: 640px){
          #${id}.section-wrap{
            padding-top: ${padTop ?? 84}px;
            padding-bottom: ${padBottom ?? 150}px;
          }
          #${id} .section-inner{
            width: calc(100vw - 24px);
          }
        }

        @media (orientation: landscape) and (max-height: 520px){
          #${id}.section-wrap{
            padding-top: 72px;
            padding-bottom: 120px;
          }
        }

        #${id} .section-inner *{ max-width: 100%; }
      `}</style>
    </section>
  );
}
