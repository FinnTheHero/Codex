import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        strictPort: true,
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
