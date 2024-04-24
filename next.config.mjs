/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/book",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placeimg.com",
        port: "",
        pathname: "/480/640/any",
      },
    ],
  },
};

export default nextConfig;
