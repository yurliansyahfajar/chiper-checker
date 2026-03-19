"use client";

import React from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export function PrivacyNotice({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-8 rounded-2xl bg-white/70 p-4 text-sm text-slate-600 ring-1 ring-black/10 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 sm:mt-10">
      <p className="font-medium text-slate-900 dark:text-slate-200">{t(locale, "privacyTitle")}</p>
      <p className="mt-1">{t(locale, "privacyText")}</p>
    </footer>
  );
}

