// app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Crimson Cart',
    short_name: 'Crimson Cart',
    description: 'Crimson Cart is an e-commerce platform that offers a wide range of products at unbeatable prices.',
    start_url: '/',
    scope: "/",
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#A31621',
    orientation: "portrait-primary",
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: "/screenshots/Screenshot 2026-05-16 203020.png",
        type: "image/png",
        sizes: "1280x720",
        form_factor: "wide"
      },
      {
        src: "screenshots/Screenshot 2026-07-23 172037.png",
        type: "image/png",
        sizes: "425x689",
      }
    ]
  }
}
