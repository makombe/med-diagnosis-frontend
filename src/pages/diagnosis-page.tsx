import { useState } from "react";
import { SymptomForm } from "../components/symptom/symptom-form.component";
import { DiagnosisCard } from "../components/diagnosis/diagnosis-card.component";
import { useDiagnosis } from "../hooks/useDiagnosis";
import "./diagnosis-page.scss";
import {
  Patient,
  PatientSearch,
} from "../components/patient/patient-search/patient-search.component";
import AddPatientForm from "../components/patient/patient-registration/add-patient.component";
import { createPatient } from "../api/apiPatient";

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export const DiagnosisPage = () => {
  const { diagnoseMutation, validateMutation } = useDiagnosis();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
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

  const handlePatientCreated = (newPatient: Patient) => {
    setSelectedPatient(newPatient); // Auto-select the new patient
    setIsAddPatientModalOpen(false); // Close modal
  };

  return (
    <div className="diagnosis-page">
      <header className="page-header">
        <div className="headertr-content">
          <h1>SymptomScan</h1>
          <p className="subtitle">Symptom-based diagnosis assistant</p>
        </div>
      </header>

      <main className="diagnosis-page-container">
        {!selectedPatient ? (
          <div className="patient-selection-section">
            <div className="section-header">
              <h2></h2>
              <button
                className="btn primary-btn"
                onClick={() => setIsAddPatientModalOpen(true)}
              >
                + Create New Patient
              </button>
            </div>
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

      {/* Add Patient Modal */}
      <Modal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
      >
        <AddPatientForm
          onSubmit={async (formData: any) => {
            console.log("Add Patient Form Data:", formData);
            try {
              // Here we are calling our api to create patient
              const newPatient: Patient = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                gender: formData.gender || "Other",
                dateOfBirth: formData.dateOfBirth,
              };
              createPatient(newPatient).then((createdPatient) => {
                handlePatientCreated(createdPatient);
              });
            } catch (error) {
              console.error("Failed to create patient:", error);
              // TODO: show error toast/notification
            }
          }}
          onClose={() => setIsAddPatientModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
