import Link from "next/link";
import Tag from "@/components/Tag";

const stack = [
  "Java",
  "Spring Boot",
  "React",
  "AWS",
  "Docker",
  "RabbitMQ",
  "AEM",
];

export default function Home() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-20 sm:min-h-[70vh] sm:justify-center sm:py-28">
      <p className="font-mono text-sm text-ink-soft">
        software developer ·{" "}
        <span className="whitespace-nowrap">são josé dos campos, br</span>
      </p>

      <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
        Henrique Reis Neves
      </h1>

      <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
        I build event-driven, cloud-native systems — from Java backends to
        the React apps that sit in front of them.
      </p>

      <p className="font-mono text-sm text-ink-soft">
        <span
          aria-hidden="true"
          className="status-dot mr-2 inline-block text-accent"
        >
          ●
        </span>
        open to new roles
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/projects"
          className="rounded-sm bg-accent px-5 py-2.5 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90"
        >
          view projects
        </Link>
        <a
          href="/resume.pdf"
          download
          className="rounded-sm border border-line px-5 py-2.5 font-mono text-sm text-ink transition-colors hover:border-ink-soft"
        >
          download résumé
        </a>
      </div>

      <ul className="flex flex-wrap gap-2 pt-6">
        {stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>
    </section>
  );
}
