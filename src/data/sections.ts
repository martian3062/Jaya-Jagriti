export type SectionKey = "overview" | "education" | "skills" | "projects";

export const sections: Array<{
  key: SectionKey;
  title: string;
  subtitle: string;
}> = [
  { key: "overview", title: "Overview", subtitle: "Profile, highlights, quick jump" },
  { key: "education", title: "Education", subtitle: "University + school scores" },
  { key: "skills", title: "Skills", subtitle: "Stack, tools, strengths" },
  { key: "projects", title: "Projects", subtitle: "MedGenie, ML DeFi Agent" }
];