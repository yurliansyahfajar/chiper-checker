"use client";

import React, { useMemo, useState } from "react";
import { generateSecurePassword } from "@/lib/password";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { Toast } from "@/components/Toast";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function PasswordGeneratorCard({
  locale,
  onUseInChecker,
}: {
  locale: Locale;
  onUseInChecker: (password: string) => void;
}) {
  const [length, setLength] = useState<number>(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [generated, setGenerated] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const genDisabled = useMemo(() => !(upper || lower || numbers || symbols), [upper, lower, numbers, symbols]);

  async function onCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1200);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 1500);
    }
  }

  return (
    <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/10 backdrop-blur dark:bg-white/5 dark:ring-white/10 sm:p-6">
      <Toast message={t(locale, "copied")} visible={copyStatus === "copied"} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t(locale, "generatorTitle")}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t(locale, "generatorSubtitle")}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-200">{t(locale, "length")}</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(clamp(Number(e.target.value), 8, 32))}
              className="w-full accent-sky-400"
            />
            <input
              type="number"
              min={8}
              max={32}
              value={length}
              onChange={(e) => setLength(clamp(Number(e.target.value || 0), 8, 32))}
              className="w-20 rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-sky-500/60 dark:bg-slate-950/40 dark:text-slate-100 dark:ring-white/10"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t(locale, "between8and32")}</p>
        </div>

        <div className="grid gap-2">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{t(locale, "characterSets")}</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-white/10">
              <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="accent-sky-400" />
              {t(locale, "uppercase")}
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-white/10">
              <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} className="accent-sky-400" />
              {t(locale, "lowercase")}
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-white/10">
              <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} className="accent-sky-400" />
              {t(locale, "numbers")}
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-slate-800 ring-1 ring-black/10 dark:bg-slate-950/30 dark:text-slate-100 dark:ring-white/10">
              <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} className="accent-sky-400" />
              {t(locale, "symbols")}
            </label>
          </div>

          {genDisabled ? (
            <p className="text-xs text-rose-300">{t(locale, "selectAtLeastOneSet")}</p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">{t(locale, "tipSymbols")}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={genDisabled}
            onClick={() => {
              const pwd = generateSecurePassword(length, {
                uppercase: upper,
                lowercase: lower,
                numbers,
                symbols,
                requireEachSelectedSet: true,
              });
              setGenerated(pwd);
              setCopyStatus("idle");
            }}
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/20 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t(locale, "generate")}
          </button>

          <div className="flex-1" />

          <button
            type="button"
            disabled={!generated}
            onClick={() => onCopy(generated)}
            className="inline-flex items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-black/10 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-white/10"
          >
            {copyStatus === "failed" ? t(locale, "copyFailed") : t(locale, "copy")}
          </button>
        </div>

        <div className="rounded-xl bg-white/60 p-4 ring-1 ring-black/10 dark:bg-slate-950/35 dark:ring-white/10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t(locale, "generatedPassword")}
            </p>
            <button
              type="button"
              onClick={() => {
                if (!generated) return;
                onUseInChecker(generated);
              }}
              disabled={!generated}
              className="text-xs font-medium text-sky-300 hover:text-sky-200 disabled:opacity-40"
            >
              {t(locale, "useInChecker")}
            </button>
          </div>
          <p className="mt-2 break-all font-mono text-sm text-slate-900 dark:text-slate-100">{generated || "—"}</p>
        </div>
      </div>
    </section>
  );
}

