"use client";

import React from "react";

export function Toast({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  return (
    <div
      className={`pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2 transition ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="rounded-xl bg-slate-900/90 px-4 py-2 text-sm font-medium text-white ring-1 ring-black/20 backdrop-blur dark:bg-white/10 dark:text-slate-100 dark:ring-white/10">
        {message}
      </div>
    </div>
  );
}

