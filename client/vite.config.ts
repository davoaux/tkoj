import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "^/api|auth": {
        // TODO: is localhost not available as a proxy target due to some wsl limitations?
        target: "http://172.19.0.1:4567",
        changeOrigin: true,
      },
    },
  },
});
