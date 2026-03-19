"use client";

import React, { useMemo } from "react";
import { analyzePassword, estimateCrackTime, getEntropyAndStrength, type StrengthLevel } from "@/lib/strength";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

function levelStyles(level: StrengthLevel) {
  switch (level) {
    case "Weak":
      return "bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/30";
    case "Moderate":
      return "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30";
    case "Strong":
      return "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/30";
    case "Very Strong":
      return "bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/30";
  }
}

export function PasswordCheckerCard({
  locale,
  password,
  onChangePassword,
}: {
  locale: Locale;
  password: string;
  onChangePassword: (password: string) => void;
}) {
  const { entropy, strength } = useMemo(() => getEntropyAndStrength(password), [password]);
  const warnings = useMemo(() => analyzePassword(password), [password]);
  const crackText = useMemo(() => estimateCrackTime(entropy), [entropy]);

  return (
    <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-black/10 backdrop-blur dark:bg-white/5 dark:ring-white/10 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t(locale, "checkerTitle")}</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t(locale, "checkerSubtitle")}</p>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-800 dark:text-slate-200">{t(locale, "password")}</label>
          <input
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            placeholder="Type or paste a password…"
            className="w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 ring-1 ring-black/10 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60 dark:bg-slate-950/40 dark:text-slate-100 dark:ring-white/10"
          />
        </div>

        <div className="grid gap-3 rounded-xl bg-white/60 p-4 ring-1 ring-black/10 dark:bg-slate-950/35 dark:ring-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t(locale, "strength")}
            </span>
            <span className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${levelStyles(strength)}`}>{strength}</span>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white/70 p-3 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{t(locale, "entropy")}</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {password ? `${entropy.toFixed(1)} bits` : "—"}
              </dd>
            </div>
            <div className="rounded-lg bg-white/70 p-3 ring-1 ring-black/10 dark:bg-white/5 dark:ring-white/10">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{t(locale, "bruteForceEstimate")}</dt>
              <dd className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {password ? crackText : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-1">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t(locale, "securityWarnings")}
            </p>

            {password && warnings.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-800 dark:text-slate-200">
                {warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{password ? t(locale, "noIssues") : "—"}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

