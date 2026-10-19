import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// The same API handles development and the production Node server.
// @ts-ignore JavaScript module is intentionally shared with the Node runtime.
import { apiHandler } from "./server/app.mjs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "althea-api",
      configureServer(server) {
        server.middlewares.use(apiHandler);
      },
      configurePreviewServer(server) {
        server.middlewares.use(apiHandler);
      },
    },
  ],
});
