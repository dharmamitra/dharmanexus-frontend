const { i18n } = require("./next-i18next.config");
const nextMDX = require("@next/mdx");

/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/database" : undefined,
  i18n,
  reactStrictMode: true,
  compiler: { emotion: true },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: { providerImportSource: "@mdx-js/react" },
});

module.exports = withMDX(nextConfig);
