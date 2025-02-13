import { fileURLToPath, URL } from 'node:url'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const base = process.env.VITE_BASE_URL || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), '/home/joshua/coding/'],
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#ffffff',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // split font
          if (id.includes('@joshuasu/lxgwbright-code-web')) {
            return 'font'
          }
        },
      },
    },
  },
})
