const channels = [
  { label: "email", value: "henriquereisneves@gmail.com", href: "mailto:henriquereisneves@gmail.com" },
  // TODO: replace with your real LinkedIn profile URL
  { label: "linkedin", value: "linkedin.com/in/henrique-reis-neves", href: "https://linkedin.com/in/henrique-reis-neves" },
  { label: "location", value: "São José dos Campos, BR", href: null },
];

export default function Contact() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-ink">Contact</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
        The fastest way to reach me is email — I usually reply within a day.
      </p>

      <div className="mt-10 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.label}
            className="flex flex-col gap-1 border-l border-line pl-6 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <p className="w-24 font-mono text-xs text-ink-faint">[{channel.label}]</p>
            {channel.href ? (
              <a
                href={channel.href}
                className="text-sm text-ink transition-colors hover:text-accent"
              >
                {channel.value}
              </a>
            ) : (
              <p className="text-sm text-ink">{channel.value}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs text-ink-faint">
        <span aria-hidden="true" className="text-accent">●</span> status: open to new roles
      </p>
    </section>
  );
}
