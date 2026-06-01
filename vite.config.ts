import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/rolo-product/",
  plugins: [react()],
  build: {
    target: "es2015",
    minify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react";
          }
        },
      },
    },
    reportCompressedSize: true,
  },
  server: {
    port: 3000,
  },
});
