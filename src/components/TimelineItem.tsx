export default function TimelineItem({
  period,
  role,
  org,
  points,
}: {
  period: string;
  role: string;
  org: string;
  points: string[];
}) {
  return (
    <div className="grid gap-2 border-l border-line pl-6 sm:grid-cols-[140px_1fr] sm:gap-6">
      <p className="font-mono text-xs text-ink-faint sm:pt-1">{period}</p>
      <div>
        <h3 className="font-display text-base font-medium text-ink">
          {role} <span className="text-ink-soft">· {org}</span>
        </h3>
        <ul className="mt-2 space-y-1.5">
          {points.map((point) => (
            <li
              key={point}
              className="text-sm leading-relaxed text-ink-soft"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
