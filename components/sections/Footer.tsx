export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-muted">
          © 2025 Guilherme Junqueira
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/JunqZ-AIBE"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
