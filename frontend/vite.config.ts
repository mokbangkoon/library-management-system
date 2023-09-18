import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@styles", replacement: resolve(__dirname, "src/styles") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@apis", replacement: resolve(__dirname, "src/apis") },
      { find: "@stores", replacement: resolve(__dirname, "src/stores") },
    ],
  },
});
