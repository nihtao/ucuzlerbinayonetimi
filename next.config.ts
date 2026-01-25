/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sayfa geçişlerinde scroll'u otomatik olarak en üste atar
  experimental: {
    scrollRestoration: true,
  },
  // Resimlerin yüklenmesi için gerekli hostname izinleri (hata almamak için ekledim)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ],
  },
};

export default nextConfig;