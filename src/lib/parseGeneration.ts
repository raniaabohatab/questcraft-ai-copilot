import type { GenerationResponse, Outcome } from '../types/generation'

function isOutcome(value: unknown): value is Outcome {
  if (typeof value !== 'object' || value === null) return false
  const o = value as Record<string, unknown>
  return typeof o.title === 'string' && typeof o.description === 'string'
}

/** Extract a JSON object from model text that may include markdown fences. */
export function extractJsonObject(text: string): unknown {
  const trimmed = text.trim()
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const candidate = fenceMatch ? fenceMatch[1].trim() : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model response')
  }
  return JSON.parse(candidate.slice(start, end + 1)) as unknown
}

export function parseGenerationResponse(
  raw: unknown,
  options?: { isDemo?: boolean },
): GenerationResponse {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid response shape')
  }

  const data = raw as Record<string, unknown>

  if (!Array.isArray(data.outcomes) || data.outcomes.length < 3) {
    throw new Error('Expected at least 3 outcomes')
  }

  const outcomes = data.outcomes.slice(0, 3)
  if (!outcomes.every(isOutcome)) {
    throw new Error('Each outcome needs a title and description')
  }

  if (
    typeof data.narration !== 'string' ||
    typeof data.consequence !== 'string' ||
    typeof data.safetyNote !== 'string'
  ) {
    throw new Error('Missing narration, consequence, or safetyNote')
  }

  return {
    outcomes,
    narration: data.narration,
    consequence: data.consequence,
    safetyNote: data.safetyNote,
    isDemo: options?.isDemo ?? Boolean(data.isDemo),
  }
}
