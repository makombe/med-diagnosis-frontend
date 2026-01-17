import { useMutation } from '@tanstack/react-query'
import { fetchDiagnosis, saveDiagnosisValidation, validateDiagnosis } from '../api/diagnosisApi'

export const useDiagnosis = () => {
  const diagnoseMutation = useMutation({ mutationFn: fetchDiagnosis })

  const validateMutation = useMutation({
    mutationFn: ({ diagnosisId, isValid }: { diagnosisId: number; isValid: boolean }) =>
      validateDiagnosis(diagnosisId, isValid)
  })

  return { diagnoseMutation, validateMutation }
}
