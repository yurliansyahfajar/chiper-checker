"use client";

import React from "react";
import type { Locale } from "@/lib/i18n";

export function LanguageTabs({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 p-1 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          locale === "en"
            ? "bg-black/5 text-slate-900 dark:bg-white/10 dark:text-slate-100"
            : "text-slate-700 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("id")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          locale === "id"
            ? "bg-black/5 text-slate-900 dark:bg-white/10 dark:text-slate-100"
            : "text-slate-700 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
        }`}
      >
        ID
      </button>
    </div>
  );
}

