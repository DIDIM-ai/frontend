import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "gpt-vision-bucket-test.s3.ap-northeast-2.amazonaws.com",
      "ai-teacher-back-latest.onrender.com",
    ],
  },
};

export default nextConfig;
