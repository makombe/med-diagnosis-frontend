export interface DiagnosisRequest {
  age?: number
  gender: 'male' | 'female'| 'other'
  symptoms: string[]
  dateOfBirth: string;
}

export interface DiagnosisResult {
  id: number
  issueName: string
  accuracy: number
}
