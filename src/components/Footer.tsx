export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          © {year} Henrique Reis Neves —{" "}
          <span className="whitespace-nowrap">built with Next.js</span>
        </p>
        <p className="font-mono">
          <span aria-hidden="true" className="text-accent">
            ●
          </span>{" "}
          status: open to new roles
        </p>
      </div>
    </footer>
  );
}
