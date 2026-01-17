import { useState } from "react";
import { SymptomForm } from "../components/symptom/symptom-form.component";
import { DiagnosisCard } from "../components/diagnosis/diagnosis-card.component";
import { useDiagnosis } from "../hooks/useDiagnosis";
import "./diagnosis-page.scss";
import {
  Patient,
  PatientSearch,
} from "../components/patient/patient-search.component";

export const DiagnosisPage = () => {
  const { diagnoseMutation, validateMutation } = useDiagnosis();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [dismissedDiagnosisIds, setDismissedDiagnosisIds] = useState<
    Set<number>
  >(new Set());
  const handleValidate = (diagnosisId: number, isValid: boolean) => {
    // Call the validation API/mutation
    validateMutation.mutate(
      { diagnosisId, isValid },
      {
        onSuccess: () => {
          // Hide the card after successful validation
          setDismissedDiagnosisIds((prev) => new Set([...prev, diagnosisId]));
        },
      }
    );
  };
  const handleChangePatient = () => {
    setSelectedPatient(null);
    setDismissedDiagnosisIds(new Set());
    diagnoseMutation.reset();
  };

  return (
    <>
      <div>
        <h2>Medical Diagnosis Tool</h2>
      </div>
      <div className="diagnosisPageContainer">
        {!selectedPatient ? (
          <PatientSearch onSelectPatient={setSelectedPatient} />
        ) : (
          <div className="patientInfo">
            <h3>Selected patient: {selectedPatient.firstName} {selectedPatient.lastName} </h3>
            <p>DOB: {selectedPatient.dateOfBirth}</p>
            <p>Gender: {selectedPatient.gender}</p>
            <button className="change-btn" onClick={handleChangePatient}>
              Change Patient
            </button>
          </div>
        )}

        {selectedPatient && (
          <SymptomForm
            onSubmit={(data: any) =>
              diagnoseMutation.mutate({
                dateOfBirth: selectedPatient.dateOfBirth,
                gender: selectedPatient.gender,
                symptoms: data.symptoms.split(","),
              })
            }
          />
        )}

        {diagnoseMutation.data
          ?.filter((diagnosis) => !dismissedDiagnosisIds.has(diagnosis.id))
          .map((diagnosis) => (
            <DiagnosisCard
              key={diagnosis.id}
              diagnosis={diagnosis}
              onValidate={(id: number, valid: boolean) =>
                handleValidate(id, valid)
              }
            />
          ))}
      </div>
    </>
  );
};
