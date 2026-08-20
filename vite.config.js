import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "My-Momix",
        short_name: "My-Momix",
        description: "Application de gestion et consultation de recettes Thermomix",
        theme_color: "#4CAF50",
        background_color: "#FAFAF5",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo_300.png",
            sizes: "300x300",
            type: "image/png",
          },
        ],
      },
    }),
    visualizer({
      filename: "./dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});