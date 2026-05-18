/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // src/_legacy holds reference-only originals (removed in Task 22); keep it
  // out of build-time linting. New code under src/app + src/components is linted.
  eslint: { dirs: ["src/app", "src/components"] },
};
export default nextConfig;
