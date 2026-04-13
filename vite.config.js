import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'



// https://vite.dev/config/
// proxy the local server port for api calls
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server:{
    proxy: {
      '/api': 'http://localhost:8080', 
    }
  }
})
