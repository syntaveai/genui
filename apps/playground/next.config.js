const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@syntave/ui", "@syntave/schemas", "@syntave/runtime"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

module.exports = nextConfig;
