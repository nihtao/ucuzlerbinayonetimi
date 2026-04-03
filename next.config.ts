/** @type {import('next').NextConfig} */
const nextConfig = {
  // Resimlerin yüklenmesi için gerekli hostname izinleri
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ],
  },
};

export default nextConfig;