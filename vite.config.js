import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Agrega esta línea exacta con el nombre de tu repositorio entre diagonales:
  base: '/WebApp/', 
})