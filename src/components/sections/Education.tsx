import React from "react";
import SectionWrap from "./SectionWrap";
import VideoCardBG from "../background/VideoCardBG";

export default function Education() {
  return (
    <SectionWrap id="education" title="Education">
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 12 }}>
        {/* Chandigarh University */}
        <div className="card frame hasVideoBG" style={{ padding: 18 }}>
          <VideoCardBG src="/cu.mp4" dim={0.62} />

          <div className="badge">Sept 2022 — Apr 2026</div>
          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 18 }}>Chandigarh University</div>
          <p className="p" style={{ marginTop: 8 }}>
            B.E. Computer Science Engineering — <b style={{ color: "var(--ink)" }}>CGPA 8.1/10</b> • Mohali, Punjab
          </p>
          <p className="p" style={{ marginTop: 10 }}>
            Courses: OOP, Compilers, Algorithms, Software Systems, OS, DS, DBMS, ML, Distributed Systems, Networking.
          </p>
        </div>

        {/* Bishop Scott Girls School */}
        <div className="card frame hasVideoBG" style={{ padding: 18 }}>
          <VideoCardBG src="/bishop.mp4" dim={0.58} />

          <div className="badge">Apr 2020 — Apr 2022</div>
          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 18 }}>Bishop Scott Girls School</div>
          <p className="p" style={{ marginTop: 8 }}>
            Class XII <b style={{ color: "var(--ink)" }}>91.20%</b> • Class X{" "}
            <b style={{ color: "var(--ink)" }}>96.60%</b> • Patna, Bihar
          </p>
        </div>
      </div>
    </SectionWrap>
  );
}