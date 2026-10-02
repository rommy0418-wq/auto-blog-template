import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep build-time Postgres connections bounded on the small database plan.
  experimental: { cpus: 2, staticGenerationMaxConcurrency: 2 },
  // Resolve existence/canonical metadata before the response headers are sent.
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aitrans-lab.com" }],
        destination: "https://aitrans-lab.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
