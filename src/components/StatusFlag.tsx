const styles = {
  building: "text-flag border-flag/40 bg-flag/10",
  planned: "text-ink-soft border-dashed border-ink-faint/60 bg-transparent",
  live: "text-accent border-accent/40 bg-accent/10",
} as const;

export default function StatusFlag({
  status,
}: {
  status: keyof typeof styles;
}) {
  return (
    <span
      className={`rounded-sm border px-2 py-1 font-mono text-xs ${styles[status]}`}
    >
      [{status}]
    </span>
  );
}
