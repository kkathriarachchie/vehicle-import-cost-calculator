import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})({
  // Youer other Next.js config options here
  output: "export",
  images: {
    unoptimized: true,
  },
  // Add basePath for GitHub Pages
  basePath: "/vehicle-import-cost-calculator",
});

export default nextConfig;
