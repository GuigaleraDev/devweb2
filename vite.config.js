import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/comparador-novo/', // Mude para o nome do repositório no GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
  ],
})