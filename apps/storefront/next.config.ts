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
};

export default withSentryConfig(nextConfig, {
  org: "modern-ui-vault",
  project: "storefront",
  silent: true, // Suppresses all logs
});
