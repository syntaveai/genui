const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@syntave/ui", "@syntave/schemas"],
  outputFileTracingRoot: path.join(__dirname, "../.."),

  async rewrites() {
    const playgroundDomain = process.env.PLAYGROUND_DOMAIN || "syntave-playground.vercel.app";

    return [
      {
        source: "/playground",
        destination: `https://${playgroundDomain}/`,
      },
      {
        source: "/playground/:path*",
        destination: `https://${playgroundDomain}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
