// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import "dotenv/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  outDir: "dist/astro",
  integrations: [vue()],
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: "middleware",
  }),
  experimental: {
    session: {
      driver: "mongodb",
      options: {
        //make the connection string work
        connectionString: process.env.DATABASE_CONNECTION_STRING || "mongodb://mongodb:27017",
        databaseName: process.env.DATABASE_NAME || "supernova",
        collectionName: "session",
      }
    },
  },
  server: { port: 2000, host: true },
});
