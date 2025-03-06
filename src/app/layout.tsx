import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { getIntl, defaultLocale } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 使用服务器端国际化获取元数据
export function generateMetadata(): Metadata {
  const intl = getIntl(defaultLocale);
  
  return {
    title: intl.formatMessage({ id: "app.title" }),
    description: intl.formatMessage({ id: "app.description" }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <main className="container mx-auto px-4 py-8 pt-20">
                {children}
              </main>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
