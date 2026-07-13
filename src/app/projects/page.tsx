import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on builds: event-driven Spring Boot microservices with RabbitMQ, and a full-stack React + Spring Boot app on AWS.",
};

const projects = [
  {
    title: "Event-driven microservices demo",
    status: "building" as const,
    description:
      "Two Spring Boot services — order and inventory — communicating through RabbitMQ, containerized with Docker Compose. Built to demonstrate the same event-driven patterns used in production at Axur.",
    tags: ["Spring Boot", "RabbitMQ", "Docker"],
  },
  {
    title: "Full-stack AWS demo",
    status: "planned" as const,
    description:
      "A React front end talking to a Spring Boot API, backed by real AWS infrastructure (S3 for file storage). Focused on a clean deploy pipeline, not just a CRUD toy.",
    tags: ["React", "Spring Boot", "AWS S3"],
  },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Projects</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
        Two hands-on builds — one in progress, one queued — each designed to
        demonstrate a system I work with day to day rather than a generic
        tutorial clone.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
