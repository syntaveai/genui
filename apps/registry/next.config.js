const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@syntave/ui", "@syntave/schemas"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

module.exports = nextConfig;
