import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Call Transcription & Analysis",
  description:
    "AI-powered call transcription and analysis system. Transcribe calls, identify speakers, and automatically extract action items, key decisions, and important dates using OpenAI Whisper and GPT-4.",
  keywords: [
    "call transcription",
    "AI analysis",
    "speech-to-text",
    "meeting notes",
    "todo extraction",
    "speaker identification",
  ],
  authors: [{ name: "CallAnalyzer" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#3B82F6",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Call Transcription & Analysis",
    description: "AI-powered call transcription and analysis system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
