export interface Outcome {
  title: string
  description: string
}

export interface GenerationResponse {
  outcomes: Outcome[]
  narration: string
  consequence: string
  safetyNote: string
  isDemo?: boolean
}

export interface GenerateRequest {
  sessionEvent: string
}
