import type { Metadata } from "next";
import { Syne, Onest, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Guilherme Junqueira — Python · IA · Automação",
  description:
    "Desenvolvo sistemas de automação, agentes de IA e backends robustos. De ideia a produção.",
  openGraph: {
    title: "Guilherme Junqueira — Python · IA · Automação",
    description: "Desenvolvo sistemas de automação, agentes de IA e backends robustos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${syne.variable} ${onest.variable} ${dmMono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
