import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { generateApiPlugin } from './vite-plugin-generate-api'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (including ANTHROPIC_API_KEY) from `.env` into process.env
  // so the local /api/generate middleware can read the same name used in `.env`.
  const env = loadEnv(mode, process.cwd(), '')
  const anthropicKey = env.ANTHROPIC_API_KEY?.trim()
  if (anthropicKey) {
    process.env.ANTHROPIC_API_KEY = anthropicKey
  } else {
    delete process.env.ANTHROPIC_API_KEY
  }

  return {
    plugins: [react(), tailwindcss(), generateApiPlugin()],
  }
})
