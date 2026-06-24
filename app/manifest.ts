// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Crimson Cart',
    short_name: 'Crimson Cart',
    description: 'Crimson Cart is an e-commerce platform that offers a wide range of products at unbeatable prices.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#A31621',
    icons: [
      {
        src: '/public/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/public/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
