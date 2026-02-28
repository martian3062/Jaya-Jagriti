import { motion } from "framer-motion";

export default function SectionCard({
  title,
  subtitle,
  onClick
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      className="card frame"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        padding: 16,
        cursor: "pointer",
        userSelect: "none",
        textAlign: "left",
        width: "100%",
        position: "relative",
        background: "transparent",
        border: "none",
        color: "inherit"
      }}
    >
      <div className="badge">Open</div>
      <div style={{ marginTop: 12, fontSize: 18, fontWeight: 650 }}>{title}</div>
      <p className="p" style={{ marginTop: 8 }}>{subtitle}</p>

      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 12,
          height: 2,
          borderRadius: 999,
          background: "var(--g2)",
          opacity: 0.25
        }}
      />
    </motion.button>
  );
}