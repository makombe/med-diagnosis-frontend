import { SymptomForm } from '../components/symptom/symptomForm.component'
import { DiagnosisCard } from '../components/diagnosis/diagnosisCard.component'
import { useDiagnosis } from '../hooks/useDiagnosis'
import "./diagnosisPage.scss"

export const DiagnosisPage = () => {
  const { diagnoseMutation, validateMutation } = useDiagnosis()

  return (
    <div className="diagnosisPageContainer">
      <SymptomForm onSubmit={(data: any) =>
        diagnoseMutation.mutate({
          age: data.age,
          gender: data.gender,
          symptoms: data.symptoms.split(',')
        })
      } />

      {diagnoseMutation.data?.map(d => (
        <DiagnosisCard
          key={d.id}
          diagnosis={d}
          onValidate={(id: number, valid: boolean) =>
            validateMutation.mutate({ diagnosisId: id, isValid: valid })
          }
        />
      ))}
    </div>
  )
}
