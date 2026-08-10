import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Tag from "@/components/Tag";
import StatusFlag from "@/components/StatusFlag";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.caseStudy.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function CaseStudy(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/projects"
        className="font-mono text-xs text-ink-faint transition-colors hover:text-accent"
      >
        ← ~/projects
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display text-3xl font-semibold text-ink">
            {project.title}
          </h1>
          <StatusFlag status={project.status} />
        </div>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
          {caseStudy.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-opacity hover:opacity-80"
          >
            source on github ↗
          </a>
          <span className="text-ink-faint">
            runs with <code className="text-ink">{caseStudy.run}</code>
          </span>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {caseStudy.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      </header>

      <Section title="Why this exists">
        {caseStudy.context.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="max-w-2xl text-sm leading-relaxed text-ink-soft"
          >
            {paragraph}
          </p>
        ))}
      </Section>

      <Section title="The flow">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          {caseStudy.trace.caption}
        </p>
        <ol className="mt-2 space-y-5 border-l border-line pl-6">
          {caseStudy.trace.steps.map((step, index) => (
            <li key={step.label} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[1.9rem] top-0 font-mono text-xs text-accent"
              >
                [{index + 1}]
              </span>
              <p className="font-mono text-sm text-ink">{step.label}</p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Decisions worth defending">
        <dl className="space-y-6">
          {caseStudy.decisions.map((decision) => (
            <div key={decision.label}>
              <dt className="font-mono text-sm text-accent">
                {decision.label}
              </dt>
              <dd className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {decision.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="What I left out">
        <div className="max-w-2xl rounded-md border border-line border-l-2 border-l-flag bg-panel p-5">
          <p className="text-sm leading-relaxed text-ink-soft">
            {caseStudy.tradeoff}
          </p>
        </div>
      </Section>

      <Section title="Tests">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          Integration tests boot the real application against throwaway
          infrastructure started by Testcontainers — Docker required, no mocks
          standing in for the broker or the bucket.{" "}
          <code className="font-mono text-ink">{caseStudy.tests.command}</code>{" "}
          covers:
        </p>
        <ul className="mt-2 space-y-1.5">
          {caseStudy.tests.covered.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-ink-soft"
            >
              <span aria-hidden="true" className="font-mono text-accent">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <footer className="mt-16 border-t border-line pt-8">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm bg-accent px-5 py-2.5 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90"
        >
          read the code ↗
        </a>
      </footer>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
