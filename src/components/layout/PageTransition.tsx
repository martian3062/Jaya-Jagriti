import React, { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrap({ id, children, className }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // more forgiving on mobile
  const inView = useInView(ref, { amount: 0.12, once: true, margin: "0px 0px -10% 0px" });

  // ✅ safety: if IntersectionObserver fails on some devices, still show after mount
  const [forceShow, setForceShow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setForceShow(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  const show = inView || forceShow;

  return (
    <section
      id={id}
      ref={ref}
      className={["section-wrap", className].filter(Boolean).join(" ")}
    >
      <motion.div
        className={`section-inner ${show ? "sparkleOn" : ""}`}
        initial={{ opacity: 0, y: 22 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>

      <style>{`
        .section-wrap{
          width: 100%;
          position: relative;
          overflow-x: clip; /* prevents sideways scroll from transforms */
        }

        /* Consistent max-width + padding so mobile layout never breaks */
        .section-inner{
          width: min(1120px, 100%);
          margin: 0 auto;
          padding: 26px 18px;
          box-sizing: border-box;
          min-width: 0;
        }

        @media (max-width: 900px){
          .section-inner{
            padding: 22px 16px;
          }
        }

        @media (max-width: 520px){
          .section-inner{
            padding: 20px 14px;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .section-inner{
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}