import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/vault/:path*',
        destination: '/components/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://modernuivault.com" }, // Restrict to production
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
      {
        source: "/registry/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://modernuivault.com" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "modern-ui-vault",
  project: "storefront",
  silent: true, // Suppresses all logs
});
