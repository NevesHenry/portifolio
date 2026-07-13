import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — email, LinkedIn, or GitHub. Based in São José dos Campos, Brazil.",
};

const channels = [
  {
    label: "linkedin",
    value: "linkedin.com/in/henriquereisneves",
    href: "https://www.linkedin.com/in/henriquereisneves/",
  },
  {
    label: "github",
    value: "github.com/NevesHenry",
    href: "https://github.com/NevesHenry",
  },
  { label: "location", value: "São José dos Campos, BR", href: null },
];

export default function Contact() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col px-6 py-20 sm:min-h-[70vh] sm:justify-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Contact</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
        The fastest way to reach me is email — I usually reply within a day.
      </p>

      <a
        href="mailto:henriquereisneves@gmail.com"
        className="mt-8 w-fit rounded-sm bg-accent px-5 py-3 font-mono text-sm font-medium text-canvas transition-opacity hover:opacity-90"
      >
        henriquereisneves@gmail.com
      </a>

      <div className="mt-14 space-y-2">
        {channels.map((channel) => (
          <div
            key={channel.label}
            className="flex flex-col border-l border-line pl-6 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <p className="w-24 py-1 font-mono text-xs text-ink-faint">
              [{channel.label}]
            </p>
            {channel.href ? (
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-fit py-1 text-sm text-ink transition-colors hover:text-accent"
              >
                {channel.value}
              </a>
            ) : (
              <p className="py-1 text-sm text-ink">{channel.value}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
