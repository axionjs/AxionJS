import { createMDX } from "fumadocs-mdx/next";
import createBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
};

/** @type {import('next').NextConfig} */
const config = {
  ...baseConfig,
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["ts-morph", "typescript", "oxc-transform"],
};

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX();

export default withAnalyzer(withMDX(config));
