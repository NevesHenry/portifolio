import Tag from "./Tag";
import StatusFlag from "./StatusFlag";

type Project = {
  title: string;
  status: "building" | "planned" | "live";
  description: string;
  tags: string[];
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-md border border-line bg-panel p-6 transition-colors hover:bg-panel-hover">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-medium text-ink">
          {project.title}
        </h3>
        <StatusFlag status={project.status} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <p className="mt-5 font-mono text-xs text-ink-faint">
        case study — coming soon
      </p>
    </div>
  );
}
