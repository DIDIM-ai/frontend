import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gpt-vision-bucket-test.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ]
    // domains: [
    //   "gpt-vision-bucket-test.s3.ap-northeast-2.amazonaws.com",
    // ],
  },
};

export default nextConfig;
