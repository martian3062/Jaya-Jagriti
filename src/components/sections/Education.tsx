import React from "react";
import SectionWrap from "./SectionWrap";
import VideoCardBG from "../background/VideoCardBG";

export default function Education() {
  return (
    <SectionWrap id="education" title="Education">
      <div className="eduGrid" style={{ marginTop: 12 }}>
        {/* Chandigarh University */}
        <div className="card frame hasVideoBG eduCard">
          <VideoCardBG src="/cu.mp4" dim={0.62} />

          <div className="badge">Sept 2022 — Apr 2026</div>
          <div className="eduTitle">Chandigarh University</div>
          <p className="p" style={{ marginTop: 8 }}>
            B.E. Computer Science Engineering —{" "}
            <b style={{ color: "var(--ink)" }}>CGPA 8.1/10</b> • Mohali, Punjab
          </p>
          <p className="p" style={{ marginTop: 10 }}>
            Courses: OOP, Compilers, Algorithms, Software Systems, OS, DS, DBMS, ML, Distributed Systems, Networking.
          </p>
        </div>

        {/* Bishop Scott Girls School */}
        <div className="card frame hasVideoBG eduCard">
          <VideoCardBG src="/bishop.mp4" dim={0.58} />

          <div className="badge">Apr 2020 — Apr 2022</div>
          <div className="eduTitle">Bishop Scott Girls School</div>
          <p className="p" style={{ marginTop: 8 }}>
            Class XII <b style={{ color: "var(--ink)" }}>91.20%</b> • Class X{" "}
            <b style={{ color: "var(--ink)" }}>96.60%</b> • Patna, Bihar
          </p>
        </div>
      </div>

      <style>{`
        #education .eduGrid{
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
        }

        #education .eduCard{
          padding: 18px;
          min-width: 0; /* IMPORTANT: prevents overflow */
        }

        #education .eduTitle{
          margin-top: 12px;
          font-weight: 800;
          font-size: 18px;
          line-height: 1.25;
          word-break: break-word;
        }

        /* Tablet */
        @media (max-width: 900px){
          #education .eduGrid{
            grid-template-columns: 1fr;
          }
          #education .eduCard{
            padding: 16px;
          }
        }

        /* Mobile */
        @media (max-width: 520px){
          #education .eduCard{
            padding: 14px;
          }
          #education .eduTitle{
            font-size: 17px;
          }
        }
      `}</style>
    </SectionWrap>
  );
}