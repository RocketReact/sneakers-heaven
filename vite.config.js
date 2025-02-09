import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',  // чтобы сервер был доступен на всех IP
    port: 3000,        // или другой порт
  }
})
