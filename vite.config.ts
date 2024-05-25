<<<<<<< HEAD
import path from "path";
import react from "@vitejs/plugin-react";
=======
import react from "@vitejs/plugin-react";
import path from "path";
>>>>>>> develop
import { defineConfig } from "vite";

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
});
