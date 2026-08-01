import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    title: "Infectious Mononucleosis — Interactive Clinical Guide",
    description: "An interactive visual guide to Epstein–Barr virus, diagnosis, management, complications, and recovery.",
    openGraph: {
      title: "Infectious Mononucleosis",
      description: "A visual clinical guide to EBV infection.",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Infectious Mononucleosis — A Visual Clinical Guide" }],
    },
    twitter: { card: "summary_large_image", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
