import { Patient } from "../components/patient/patient-search/patient-search.component";
import { apiClient } from "./apiClient";

export const searchPatients = async (search: string): Promise<Patient[]> => {
  const {data} = await apiClient.get(`/patient/search?q=${search}`);
  return data;
}

export const createPatient = async (payload: Patient): Promise<Patient> => {
  const {data} = await apiClient.post("/patient", payload);
  return data;
}