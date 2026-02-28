import React, { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrap({ id, children, className }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // once: true => animate only first time it enters viewport
  const inView = useInView(ref, { amount: 0.25, once: true });

  return (
    <section
      id={id}
      ref={ref}
      className={["section-wrap", className].filter(Boolean).join(" ")}
    >
      <motion.div
        className={`section-inner ${inView ? "sparkleOn" : ""}`}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </section>
  );
}