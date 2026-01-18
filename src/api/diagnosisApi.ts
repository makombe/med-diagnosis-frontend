import { DiagnosisRequest, DiagnosisResult } from '../types/diagnosis'
import { apiClient } from './apiClient'

// Mock implementations for testing purposes. This will be replaced with real API calls later.
export const fetchDiagnosis = async (
  payload: DiagnosisRequest
): Promise<DiagnosisResult[]> => {
  return Promise.resolve([
    { id: 1, issueName: 'Malaria', accuracy: 92 },
    { id: 2, issueName: 'Typhoid', accuracy: 74 }
  ])
}

export const validateDiagnosis = async (
  diagnosisId: number,
  isValid: boolean
) => {
  console.log('Saved validation=======', diagnosisId, isValid)
}

export const fetchDiagnosisHistory = async (payload: DiagnosisRequest): Promise<DiagnosisResult[]> => {
  const {data} = await apiClient.post("/diagnosis", payload);
  return data;
}
//TODO include patient ID in the payload
export const saveDiagnosisValidation = async (
  diagnosisId: number,
  isValid: boolean
) => {
  await apiClient.post("/diagnosis/validate", { diagnosisId, isValid });
}


