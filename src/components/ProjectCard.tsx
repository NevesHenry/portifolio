import Link from "next/link";
import Tag from "./Tag";
import StatusFlag from "./StatusFlag";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col rounded-md border border-line bg-panel p-6 transition-colors hover:bg-panel-hover focus-within:border-accent/50">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-display text-lg font-medium text-ink">
          {/* The ::after overlay turns the whole card into one click target
              while keeping the repo link below separately reachable. */}
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h2>
        <StatusFlag status={project.status} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-1 pt-5 font-mono text-xs">
        <span className="text-accent">read the case study →</span>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 text-ink-faint transition-colors hover:text-ink"
        >
          source ↗
        </a>
      </div>
    </div>
  );
}
