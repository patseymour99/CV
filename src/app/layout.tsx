import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/components/shell/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: `${profile.name} — Interactive CV`,
  description: `${profile.name} · ${profile.title}. An interactive CV dashboard with an AI assistant that answers questions about him.`,
};

/**
 * Applies the saved (or system) theme before first paint so there is no
 * flash of the wrong mode. Runs synchronously during HTML parsing; see
 * the bundled Next.js guide "preventing-flash-before-hydration".
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
