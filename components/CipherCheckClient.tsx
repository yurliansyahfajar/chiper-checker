"use client";

import React, { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { LanguageTabs } from "@/components/LanguageTabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PasswordGeneratorCard } from "@/components/PasswordGeneratorCard";
import { PasswordCheckerCard } from "@/components/PasswordCheckerCard";
import { PrivacyNotice } from "@/components/PrivacyNotice";

export function CipherCheckClient() {
  const [locale, setLocale] = useState<Locale>("en");
  const [toCheck, setToCheck] = useState<string>("");

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <header className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-700 ring-1 ring-black/10 dark:text-slate-200 dark:ring-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {t(locale, "badge")}
            </div>

            <div className="flex items-center gap-2">
              <LanguageTabs locale={locale} onChange={setLocale} />
              <ThemeToggle locale={locale} />
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t(locale, "title")}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">{t(locale, "subtitle")}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <PasswordGeneratorCard
            locale={locale}
            onUseInChecker={(pwd) => {
              setToCheck(pwd);
            }}
          />

          <PasswordCheckerCard locale={locale} password={toCheck} onChangePassword={setToCheck} />
        </div>

        <PrivacyNotice locale={locale} />
      </div>
    </div>
  );
}

