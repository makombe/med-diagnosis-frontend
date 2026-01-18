import { useState } from "react";
import { usePatient } from "../../../hooks/usePatient";
import { Patient } from "../../../types/patient";
import "./patient-search.scss";

interface PatientSearchProps {
  onSelectPatient: (patient: Patient) => void;
}
export const PatientSearch = ({ onSelectPatient }: PatientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = usePatient(searchTerm);
  const hasSearchTerm = searchTerm.trim().length > 0;
  return (
    <>
      <div className="patientSearchContainer">
        <h3>Search for Patient</h3>
        <input
          type="text"
          placeholder="Enter patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
        {hasSearchTerm && (
          <>
            {data && data.length > 0 ? (
              <ul className="patientList">
                {data.map((patient) => (
                  <li
                    key={patient.id}
                    onClick={() => onSelectPatient(patient)}
                    className="patientItem"
                  >
                    <strong>
                      {patient.firstName} {patient.lastName}
                    </strong>
                    <span className="patient-details">
                      DOB: {patient.dateOfBirth} • Gender: {patient.gender}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-results">
                No patients found matching "{searchTerm}"
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
