import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Sita Store",
        short_name: "Shop",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/mobile-1.png",
            sizes: "540x720",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/screenshots/desktop-1.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
        start_url: ".",
        background_color: "#ffffff",
        theme_color: "#424242",
        display: "standalone",
        description: "Sita Store Of Kitchen products",
        scope: "/",
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: new RegExp("^https://sumitaachaju.pythonanywhere.com"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: "https://sita-store.netlify.app/vite.svg",
            handler: "CacheFirst",
            options: {
              cacheName: "icon-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern:
              "https://sita-store.netlify.app/bootstrap/js/bootstrap.bundle.min.js",
            handler: "CacheFirst",
            options: {
              cacheName: "bootstrap-script-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern:
              "https://sita-store.netlify.app/bootstrap/css/bootstrap.min.css",
            handler: "CacheFirst",
            options: {
              cacheName: "bootstrap-css-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
