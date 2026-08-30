import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "plus.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/waitlist",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
