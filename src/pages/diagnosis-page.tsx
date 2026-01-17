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
    <div className="diagnosis-page">
      <header className="page-header">
        <div className="header-content">
          <h1>Clinical Decision Support</h1>
          <p className="subtitle">Symptom-based diagnosis assistant</p>
        </div>
      </header>

      <main className="diagnosis-page-container">
        {!selectedPatient ? (
          <div className="patient-selection-section">
            <h2>Select Patient</h2>
            <PatientSearch onSelectPatient={setSelectedPatient} />
          </div>
        ) : (
          <>
            <div className="patient-header-card">
              <div className="patient-info">
                <h3>
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h3>
                <div className="patient-meta">
                  <span>DOB: {selectedPatient.dateOfBirth}</span>
                  <span>•</span>
                  <span>Gender: {selectedPatient.gender}</span>
                </div>
              </div>
              <button className="btn change-btn" onClick={handleChangePatient}>
                Change Patient
              </button>
            </div>

            <div className="diagnosis-workflow-grid">
              <div className="symptoms-panel">
                <SymptomForm
                  onSubmit={(data: any) =>
                    diagnoseMutation.mutate({
                      dateOfBirth: selectedPatient.dateOfBirth,
                      gender: selectedPatient.gender,
                      symptoms: data.symptoms
                        .split(",")
                        .map((s: string) => s.trim()),
                    })
                  }
                />
              </div>

              <div className="results-panel">
                {diagnoseMutation.data &&
                  diagnoseMutation.data
                    .filter((d) => !dismissedDiagnosisIds.has(d.id))
                    .map((diagnosis) => (
                      <DiagnosisCard
                        key={diagnosis.id}
                        diagnosis={diagnosis}
                        onValidate={handleValidate}
                      />
                    ))}

                {diagnoseMutation.data?.length === 0 && (
                  <div className="empty-state">
                    <p>No diagnoses found for current symptoms</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
