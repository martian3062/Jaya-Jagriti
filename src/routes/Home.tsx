import React from "react";
import Overview from "../components/sections/Overview";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";


export default function Home() {
  return (
    <>
      <Overview />
      <Education />
      <Skills />
      <Projects />
    </>
  );
}
