import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const ThemeCtx = createContext({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light"; // SSR safe

    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;

      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
        .matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  /* Apply theme to <html> immediately */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  /* React to OS theme changes */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        // Only auto-switch if user hasn't manually chosen a theme
        setTheme(e.matches ? "dark" : "light");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggle = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  const value = useMemo(() => ({ theme, toggle }), [theme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
