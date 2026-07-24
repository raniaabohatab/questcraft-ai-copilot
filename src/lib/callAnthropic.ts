import { SYSTEM_PROMPT } from './systemPrompt'
import { extractJsonObject, parseGenerationResponse } from './parseGeneration'
import type { GenerationResponse } from '../types/generation'

const MODEL = 'claude-sonnet-4-6'

export async function callAnthropic(
  apiKey: string,
  sessionEvent: string,
): Promise<GenerationResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here is what just happened in the session:\n\n${sessionEvent}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(
      `Anthropic API error (${response.status})${detail ? `: ${detail.slice(0, 200)}` : ''}`,
    )
  }

  const payload = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>
  }

  const text = payload.content
    ?.filter((block) => block.type === 'text' && block.text)
    .map((block) => block.text)
    .join('\n')

  if (!text) {
    throw new Error('Empty response from Anthropic')
  }

  return parseGenerationResponse(extractJsonObject(text))
}
