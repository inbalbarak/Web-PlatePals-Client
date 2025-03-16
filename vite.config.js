import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import importMetaEnv from "@import-meta-env/unplugin";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        importMetaEnv.vite({
            example: ".env.example.public",
            transformMode: process.env.NODE_ENV === "development" ? "compile-time" : "runtime",
        }),
    ],
    resolve: {
        // aliases should be added both here and in tsconfig.json
        alias: {
            services: path.resolve(__dirname, "./src/services/"),
            constants: path.resolve(__dirname, "./src/constants/"),
            components: path.resolve(__dirname, "./src/components/"),
            pages: path.resolve(__dirname, "./src/pages/"),
            icons: path.resolve(__dirname, "./src/icons/"),
            utils: path.resolve(__dirname, "./src/utils/"),
        },
    },
});
