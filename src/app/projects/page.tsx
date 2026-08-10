import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on builds: event-driven Spring Boot microservices over RabbitMQ, and a full-stack React + Spring Boot app backed by S3.",
};

export default function Projects() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Projects</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Two builds that demonstrate systems I work with day to day rather than a
        generic tutorial clone. Both run in one command, both have integration
        tests against real infrastructure, and each case study covers the
        failure modes I designed for — and what I deliberately left out.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
