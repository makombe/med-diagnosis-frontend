export interface DiagnosisRequest {
  age?: number
  gender: 'Male' | 'Female'| 'Other'
  symptoms: string[]
  dateOfBirth: string;
}

export interface DiagnosisResult {
  id: number
  issueName: string
  accuracy: number
}
