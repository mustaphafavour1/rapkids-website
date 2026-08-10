import type { Metadata, Viewport } from "next";
import { Bubblegum_Sans, Nunito_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://rapkids.io/championship";

export const metadata: Metadata = {
  metadataBase: new URL("https://rapkids.io"),
  title: {
    default: "RapKids TypeMaster Championship: $4,000 in Prizes, One Live Final",
    template: "%s · RapKids TypeMaster Championship",
  },
  description:
    "Four weeks of competitive typing for kids 5–12. $4,000 in cash prizes, 30 cash winners, and a live Grand Final hosted by Jason. Every child on an active RapKids plan can enter; one subscription enters your whole family.",
  keywords: [
    "RapKids",
    "typing championship",
    "kids typing",
    "TypeMaster",
    "typing competition for kids",
    "learn to type",
  ],
  openGraph: {
    title: "The RapKids TypeMaster Championship",
    description:
      "Four weeks of competitive typing. $4,000 in cash prizes. A live Grand Final. One subscription enters your whole family.",
    url: siteUrl,
    siteName: "RapKids TypeMaster Championship",
    type: "website",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The RapKids TypeMaster Championship",
    description:
      "Four weeks of competitive typing. $4,000 in cash prizes. A live Grand Final.",
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [{ url: "/brand/logo.png", type: "image/png" }],
    shortcut: [{ url: "/brand/logo.png" }],
    apple: [{ url: "/brand/logo.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
