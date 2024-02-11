/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // *when you bring images from remote sources, you must configure this file like this:
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/gitdagray/test-blogposts/main/images/**",
      },
      {hostname: "https://www.google.com"}
    ],
  },
};


module.exports = nextConfig
