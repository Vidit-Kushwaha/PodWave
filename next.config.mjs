/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        pathname: "**",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
