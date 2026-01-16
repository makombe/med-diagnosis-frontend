export interface DiagnosisRequest {
  age: number
  gender: 'male' | 'female'
  symptoms: string[]
}

export interface DiagnosisResult {
  id: number
  issueName: string
  accuracy: number
}
