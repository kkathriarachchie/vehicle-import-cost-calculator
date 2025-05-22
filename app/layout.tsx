import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Vehicle Tax Calculator 2025",
  description: "Calculate vehicle import costs and taxes for Sri Lanka",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icons/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/vehicle-import-cost-calculator/favicon.ico",
        sizes: "any",
      },
      {
        url: "/vehicle-import-cost-calculator/icon.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    shortcut: ["/icons/manifest-icon-192.maskable.png"],
    apple: [
      { url: "/icons/manifest-icon-192.maskable.png" },
      { url: "/icons/manifest-icon-512.maskable.png", sizes: "512x512" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vehicle Tax",
  },
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

{
  /* @ts-expect-error Server Component 
  export const metadata: Metadata = {
  title: "Vehicle Import Cost Calculator",
  description: "Calculate the cost of importing a vehicle",
};
  */
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
