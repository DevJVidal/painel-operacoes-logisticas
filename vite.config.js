import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/painel-operacoes-logisticas/' // <--- necessário para GitHub Pages
})
