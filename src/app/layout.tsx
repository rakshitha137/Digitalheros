import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "Digital Heroes | Stableford Golf Score Monthly Draw & Charity Platform",
  description:
    "Log your Stableford golf scores, convert your rolling 5 scores into monthly draw numbers, win from the prize pool, and support your favorite charity with Digital Heroes.",
  keywords: [
    "Digital Heroes",
    "Golf Stableford",
    "Golf Score Draw",
    "Charity Golf Subscription",
    "Monthly Prize Draw",
    "Golf Charity Platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0B132B] text-[#F8FAF9] antialiased selection:bg-[#D96B27] selection:text-[#F8FAF9]">
        <DemoBanner />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
