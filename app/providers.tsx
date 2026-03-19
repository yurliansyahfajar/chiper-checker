"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applyThemeToRoot, getSystemTheme, loadStoredTheme, type Theme, THEME_STORAGE_KEY } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return loadStoredTheme() ?? getSystemTheme();
  });

  useEffect(() => {
    applyThemeToRoot(theme);
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const setTheme = (t: Theme) => {
      setThemeState(t);
      window.localStorage.setItem(THEME_STORAGE_KEY, t);
      applyThemeToRoot(t);
    };

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return { theme, setTheme, toggleTheme };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

