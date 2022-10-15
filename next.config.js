/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "**.scdn.co",
    //   },
    // ],
    domains: ['i.scdn.co',"seeded-session-images.scdn.co","charts-images.scdn.co",'platform-lookaside.fbsbx.com',"t.scdn.co","mosaic.scdn.co","thisis-images.scdn.co"],
  },
  nextConfig
}
