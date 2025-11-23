import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "671jrfpjkr.ufs.sh",
        port: "",
      },
    ],
  },
};

export default nextConfig;
