export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "ciphercheck.theme";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function loadStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
  return raw === "dark" || raw === "light" ? raw : null;
}

export function applyThemeToRoot(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  // Helps Tailwind + browser form controls match theme
  root.style.colorScheme = theme;
}

