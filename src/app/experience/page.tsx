import TimelineItem from "@/components/TimelineItem";

const roles = [
  {
    period: "2025 — present",
    role: "Software Developer",
    org: "Webjump",
    points: [
      "Develop and optimize digital experiences using Adobe Experience Manager (AEM), Adobe Edge, and Adobe Learning Manager.",
      "Build and maintain interactive, responsive applications with Java, HTML, CSS, JavaScript, React, and Node.js.",
      "Collaborate with cross-functional teams to ship high-performance solutions aligned with business needs.",
    ],
  },
  {
    period: "2023 — 2024",
    role: "Software Engineer Intern",
    org: "Axur",
    points: [
      "Developed and maintained large-scale systems on the Java platform, focused on performance and scalability.",
      "Implemented event-driven microservice architectures for efficient communication in distributed data processing.",
      "Automated cloud infrastructure and deployment workflows (AWS, Jenkins), improving reliability and CI/CD practices.",
    ],
  },
];

const education = [
  { period: "2023 — 2026", school: "Centro Universitário ETEP", detail: "Software Engineering" },
  { period: "2018 — 2022", school: "Langara College, Vancouver", detail: "A.Sc. Computer Science" },
  { period: "2017 — 2018", school: "UNESP, Guaratinguetá", detail: "Mechanical Engineering" },
];

export default function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Experience</h1>

      <div className="mt-10 space-y-10">
        {roles.map((entry) => (
          <TimelineItem key={entry.org} {...entry} />
        ))}
      </div>

      <h2 className="mt-16 font-display text-xl font-semibold text-ink">Education</h2>
      <div className="mt-6 space-y-4">
        {education.map((entry) => (
          <div
            key={entry.school}
            className="grid gap-1 border-l border-line pl-6 sm:grid-cols-[140px_1fr] sm:gap-6"
          >
            <p className="font-mono text-xs text-ink-faint sm:pt-0.5">{entry.period}</p>
            <p className="text-sm text-ink-soft">
              <span className="text-ink">{entry.school}</span> — {entry.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
