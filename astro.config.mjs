// @ts-check
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import 'dotenv/config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['2000.code.nxweb.com'],
    },
  },
  outDir: 'dist/astro',
  integrations: [vue()],
  prefetch: {
    prefetchAll: true,
  },
  adapter: node({
    mode: 'middleware',
  }),
  session: {
    driver: 'mongodb',
    ttl: 60 * 60 * 12, // 12 hour
    options: {
      //make the connection string work
      connectionString: process.env.DATABASE_CONNECTION_STRING || 'mongodb://mongodb:27017',
      databaseName: process.env.DATABASE_NAME || 'supernova',
      collectionName: 'session',
    },
    cookie: {
      name: 'hjbksdfbhjksdfbhjkdsfbhjfgdssdf',
    },
  },
  server: { port: 2000, host: true },
})
