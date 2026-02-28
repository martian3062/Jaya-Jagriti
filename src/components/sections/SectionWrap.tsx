<<<<<<< HEAD
import React, { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
=======
import React, { type ReactNode, useMemo, useRef } from "react";
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  title?: string; // kept for compatibility even if not used
  children: ReactNode;
  padTop?: number;
  padBottom?: number;
};

<<<<<<< HEAD
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
=======
export default function SectionWrap({ id, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // slightly lower threshold so it triggers reliably on mobile
  const inView = useInView(ref, { amount: 0.18, once: true });

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 22,
        // blur is expensive on mobile; keep it very light
        filter: "blur(2px)"
      },
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
<<<<<<< HEAD
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
=======
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
      }
    }),
    []
  );

  const shouldAnimate = inView || forceShow;

  return (
    <section id={id} ref={ref} className="section-wrap">
      <motion.div
        className={`section-inner ${shouldAnimate ? "sparkleOn" : ""}`}
        variants={variants}
<<<<<<< HEAD
        // ✅ IMPORTANT: default is visible so you never get a blank page
        initial={false}
        animate={shouldAnimate ? "show" : "hidden"}
        style={{
          willChange: "transform, opacity, filter",
          // ✅ fallback hard-visibility even if motion gets weird
          opacity: shouldAnimate ? 1 : 1
        }}
=======
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{ willChange: "transform, opacity" }}
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
      >
        {title ? (
          <div className="section-titleRow">
            <div className="section-title">{title}</div>
          </div>
        ) : null}

        {children}
      </motion.div>

      <style>{`
<<<<<<< HEAD
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
=======
        /* Makes every section behave nicely on mobile */
        .section-wrap{
          width: 100%;
          overflow-x: clip; /* prevents sideways scrolling from transforms */
        }

        .section-inner{
          width: min(1100px, 100%);
          margin: 0 auto;
          padding: 26px 18px;
          box-sizing: border-box;
        }

        @media (max-width: 520px){
          .section-inner{
            padding: 22px 14px;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce){
          .section-inner{
            transition: none !important;
          }
        }
>>>>>>> 9cf291b (Fix mobile layout + project banner video + navbar/footer)
      `}</style>
    </section>
  );
}
