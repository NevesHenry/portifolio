import type { Metadata } from "next";
import Tag from "@/components/Tag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Java/Spring Boot developer with React and cloud experience, currently building digital experiences with AEM at Webjump.",
};

const skillGroups: { label: string; items: string[] }[] = [
  { label: "languages", items: ["Java", "Python", "C++", "JavaScript", "TypeScript"] },
  { label: "backend", items: ["Spring Boot", "Node.js", "Microservices", "RabbitMQ"] },
  { label: "cloud & infra", items: ["AWS", "Docker", "Jenkins", "Datadog"] },
  { label: "frontend", items: ["React", "HTML", "CSS"] },
  { label: "adobe", items: ["AEM Sites", "AEM Forms", "AEM Edge Delivery"] },
  { label: "spoken", items: ["English (fluent)", "Portuguese (native)", "Spanish (intermediate)"] },
];

export default function About() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">About</h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
        I&apos;m a software developer with solid experience in the Java
        ecosystem (Spring Boot) and modern front-end technologies (React,
        Node.js). I&apos;ve worked with event-driven architectures,
        microservices, and cloud infrastructure, and I currently build
        digital experiences with Adobe Experience Manager at Webjump.
      </p>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Before software, I spent time studying computer science in Vancouver,
        Canada — where a couple of years in customer-facing retail work
        sharpened my English and my patience in equal measure.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="rounded-md border border-line bg-panel p-5"
          >
            <h2 className="font-mono text-xs font-normal text-accent">
              [{group.label}]
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
