import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  reactStrictMode: true, // react 严格模式
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
