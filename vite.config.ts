import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackRouter({ routesDirectory: "src/routes" }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["@tanstack/react-router", "@tanstack/react-query"],
          "supabase-vendor": ["@supabase/supabase-js"],
          "ui-vendor": ["lucide-react", "class-variance-authority", "clsx", "tailwind-merge"],
        },
      },
    },
  },
});
