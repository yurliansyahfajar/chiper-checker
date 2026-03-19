export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70 dark:border-slate-800/70 py-3 text-center text-xs text-slate-600 dark:text-slate-300">
      Built by <span className="font-medium">Fajar</span> using{' '}
      <a
        className="underline hover:text-slate-700 dark:hover:text-slate-100"
        href="https://www.cursor.so"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cursor
      </a>
    </footer>
  );
}
