import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/sneakers-heaven/',
  server: {
    host: '0.0.0.0',  // чтобы сервер был доступен на всех IP
    port: 3000,
    // или другой порт
  },

})


