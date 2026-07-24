import { DEMO_RESPONSE } from '../src/data/demoResponse'
import { callAnthropic } from '../src/lib/callAnthropic'
import type { GenerationResponse } from '../src/types/generation'

type Req = {
  method?: string
  body?: { sessionEvent?: string }
}

type Res = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => Res
  json: (body: unknown) => void
}

/**
 * Vercel serverless function: POST /api/generate
 * Body: { sessionEvent: string }
 *
 * If ANTHROPIC_API_KEY is missing, returns the Stormbristle Boar demo response.
 */
export default async function handler(req: Req, res: Res): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const sessionEvent =
    typeof req.body?.sessionEvent === 'string' ? req.body.sessionEvent.trim() : ''

  if (!sessionEvent) {
    res.status(400).json({ error: 'Please describe what just happened in your session.' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY?.trim()

  if (!apiKey) {
    const demo: GenerationResponse = { ...DEMO_RESPONSE, isDemo: true }
    res.status(200).json(demo)
    return
  }

  try {
    const result = await callAnthropic(apiKey, sessionEvent)
    res.status(200).json(result)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong generating ideas.'
    console.error('[api/generate]', message)
    res.status(500).json({ error: message })
  }
}
