"use client";

import React, { useMemo, useState } from "react";
import {
  analyzePassword,
  estimateCrackTime,
  getEntropyAndStrength,
  type PasswordWarning,
  type StrengthLevel,
} from "@/lib/strength";
import { downloadTextFile, extractPasswords, parseCsv, toCsv } from "@/lib/csv";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

function levelStyles(level: StrengthLevel) {
  switch (level) {
    case "Weak":
      return "bg-rose-500/15 text-rose-700 dark:text-rose-200 ring-1 ring-rose-500/30";
    case "Moderate":
      return "bg-amber-500/15 text-amber-700 dark:text-amber-200 ring-1 ring-amber-500/30";
    case "Strong":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-200 ring-1 ring-emerald-500/30";
    case "Very Strong":
      return "bg-sky-500/15 text-sky-700 dark:text-sky-200 ring-1 ring-sky-500/30";
  }
}

type BulkResult = {
  password: string;
  entropy: number;
  strength: StrengthLevel;
  crackTime: string;
  warnings: PasswordWarning[];
};

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

  const [bulkResults, setBulkResults] = useState<BulkResult[]>([]);
  const [bulkError, setBulkError] = useState<string | null>(null);
  const [bulkFileName, setBulkFileName] = useState<string>("");

  async function onCsvSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;

    setBulkFileName(file.name);

    try {
      const text = await file.text();
      const passwords = extractPasswords(parseCsv(text));

      if (passwords.length === 0) {
        setBulkResults([]);
        setBulkError(t(locale, "noPasswordsFound"));
        return;
      }

      const results: BulkResult[] = passwords.map((value) => {
        const analysis = getEntropyAndStrength(value);
        return {
          password: value,
          entropy: analysis.entropy,
          strength: analysis.strength,
          crackTime: estimateCrackTime(analysis.entropy),
          warnings: analyzePassword(value),
        };
      });

      setBulkResults(results);
      setBulkError(null);
    } catch {
      setBulkResults([]);
      setBulkError(t(locale, "csvError"));
    }
  }

  function onDownloadResults() {
    const header = [
      t(locale, "csvHeaderPassword"),
      t(locale, "csvHeaderStrength"),
      t(locale, "csvHeaderEntropy"),
      t(locale, "csvHeaderCrackTime"),
      t(locale, "csvHeaderWarnings"),
    ];
    const rows = bulkResults.map((result) => [
      result.password,
      result.strength,
      result.entropy.toFixed(1),
      result.crackTime,
      result.warnings.map((warning) => t(locale, warning)).join("; "),
    ]);
    downloadTextFile("ciphercheck-results.csv", toCsv([header, ...rows]));
  }

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
                  <li key={w}>{t(locale, w)}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{password ? t(locale, "noIssues") : "—"}</p>
            )}
          </div>
        </div>

        <div className="grid gap-3 rounded-xl bg-white/60 p-4 ring-1 ring-black/10 dark:bg-slate-950/35 dark:ring-white/10">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t(locale, "bulkCheckTitle")}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t(locale, "bulkCheckHint")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-sky-500/20 transition hover:bg-sky-400">
              {t(locale, "csvUpload")}
              <input type="file" accept=".csv,text/csv" onChange={onCsvSelected} className="hidden" />
            </label>

            <button
              type="button"
              disabled={bulkResults.length === 0}
              onClick={onDownloadResults}
              className="inline-flex items-center justify-center rounded-lg bg-white/60 px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-black/10 transition hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/5 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-white/10"
            >
              {t(locale, "downloadResults")}
            </button>
          </div>

          {bulkError ? <p className="text-xs text-rose-300">{bulkError}</p> : null}

          {bulkResults.length > 0 ? (
            <>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {bulkFileName ? `${bulkFileName} — ` : ""}
                {bulkResults.length} {t(locale, "passwordsChecked")}
              </p>

              <div className="max-h-72 overflow-auto rounded-lg ring-1 ring-black/10 dark:ring-white/10">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-white/90 text-slate-500 dark:bg-slate-950/80 dark:text-slate-400">
                    <tr>
                      <th className="px-3 py-2 font-medium">{t(locale, "csvHeaderPassword")}</th>
                      <th className="px-3 py-2 font-medium">{t(locale, "csvHeaderStrength")}</th>
                      <th className="px-3 py-2 font-medium">{t(locale, "csvHeaderEntropy")}</th>
                      <th className="px-3 py-2 font-medium">{t(locale, "csvHeaderWarnings")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkResults.slice(0, 50).map((result, index) => (
                      <tr
                        key={`${index}-${result.password}`}
                        className="border-t border-black/5 text-slate-800 dark:border-white/5 dark:text-slate-200"
                      >
                        <td className="max-w-[12rem] truncate px-3 py-2 font-mono">{result.password}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-0.5 font-semibold ${levelStyles(result.strength)}`}>
                            {result.strength}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2">{result.entropy.toFixed(1)}</td>
                        <td className="px-3 py-2">
                          {result.warnings.length > 0
                            ? result.warnings.map((warning) => t(locale, warning)).join("; ")
                            : t(locale, "noIssues")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {bulkResults.length > 50 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  +{bulkResults.length - 50} {t(locale, "moreRows")}
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
