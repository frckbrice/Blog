"use client";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`${
          resolvedTheme === "light" ? "dark" : "bg-white/75"
        } min-h-screen`}
      >
        <div className="dark:text-white dark:bg-slate-800 text-[#1e1e1e]">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
