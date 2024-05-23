import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

<<<<<<< HEAD:front/vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
=======
export default defineConfig(() => {
  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
>>>>>>> a2351beee4d3cb54b4a91b10041aecb574b22e73:vite.config.ts
});
