import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
