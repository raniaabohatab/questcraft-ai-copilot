import type { Plugin } from 'vite'
import { DEMO_RESPONSE } from './src/data/demoResponse'
import { callAnthropic } from './src/lib/callAnthropic'

/**
 * Local Vite middleware that mirrors the Vercel /api/generate serverless function.
 */
export function generateApiPlugin(): Plugin {
  return {
    name: 'questcraft-generate-api',
    configureServer(server) {
      server.middlewares.use('/api/generate', (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk: Buffer) => chunks.push(chunk))
        req.on('end', () => {
          void (async () => {
            try {
              const raw = Buffer.concat(chunks).toString('utf8')
              let body: { sessionEvent?: string } = {}
              try {
                body = raw ? (JSON.parse(raw) as { sessionEvent?: string }) : {}
              } catch {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Invalid JSON body' }))
                return
              }

              const sessionEvent =
                typeof body.sessionEvent === 'string' ? body.sessionEvent.trim() : ''

              if (!sessionEvent) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    error: 'Please describe what just happened in your session.',
                  }),
                )
                return
              }

              const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
              const result = apiKey
                ? await callAnthropic(apiKey, sessionEvent)
                : { ...DEMO_RESPONSE, isDemo: true }

              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result))
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : 'Something went wrong generating ideas.'
              console.error('[vite /api/generate]', message)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: message }))
            }
          })()
        })

        req.on('error', next)
      })
    },
  }
}
