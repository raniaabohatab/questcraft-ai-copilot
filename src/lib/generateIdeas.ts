import { DEMO_RESPONSE } from '../data/demoResponse'
import { parseGenerationResponse } from './parseGeneration'
import type { GenerationResponse } from '../types/generation'

export class GenerateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GenerateError'
  }
}

/**
 * Calls POST /api/generate. If the endpoint is unreachable or returns an
 * unusable error (and no key is configured server-side), falls back to the
 * Stormbristle Boar demo so the app stays demoable.
 */
export async function generateIdeas(
  sessionEvent: string,
): Promise<GenerationResponse> {
  const trimmed = sessionEvent.trim()
  if (!trimmed) {
    throw new GenerateError('Please describe what just happened in your session.')
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionEvent: trimmed }),
    })

    const payload = (await response.json().catch(() => null)) as
      | (GenerationResponse & { error?: string })
      | null

    if (!response.ok) {
      // Network / server failure with no usable payload → demo fallback
      if (response.status >= 500 && !payload?.error) {
        return { ...DEMO_RESPONSE, isDemo: true }
      }
      throw new GenerateError(
        payload?.error ??
          'The co-pilot could not weave a reply. Please try again in a moment.',
      )
    }

    if (!payload) {
      return { ...DEMO_RESPONSE, isDemo: true }
    }

    return parseGenerationResponse(payload, { isDemo: payload.isDemo })
  } catch (error) {
    if (error instanceof GenerateError) throw error

    // Offline or missing API route (e.g. static preview without middleware)
    console.warn('[generateIdeas] Falling back to demo response', error)
    return { ...DEMO_RESPONSE, isDemo: true }
  }
}
