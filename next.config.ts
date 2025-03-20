import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "refcqtbqsjscbiernekq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
