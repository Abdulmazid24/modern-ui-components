import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  org: "modern-ui-vault",
  project: "storefront",
  silent: true, // Suppresses all logs
});
