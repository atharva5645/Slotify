import { Inter } from "next/font/google";
import "./globals.css";
import AIAssistant from "@/components/AIAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Slotify - Master Your Time",
  description: "High-performance scheduling and task management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0b1026] text-white`} suppressHydrationWarning>
        {children}
        <AIAssistant />
      </body>
    </html>
  );
}
