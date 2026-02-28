import React, { type ReactNode, useMemo } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
};

export default function SectionWrap({ id, children }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, x: 60, filter: "blur(8px)" },
      show: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      },
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
        {children}
      </motion.div>
    </section>
  );
}