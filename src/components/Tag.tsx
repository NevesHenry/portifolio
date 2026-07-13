import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-line bg-panel px-2.5 py-1 font-mono text-xs text-ink-soft">
      {children}
    </span>
  );
}
