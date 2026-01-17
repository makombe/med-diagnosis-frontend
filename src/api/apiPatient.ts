import { Patient } from "../components/patient/patient-search.component";
import { apiClient } from "./apiClient";

export const searchPatients = async (search: string): Promise<Patient[]> => {
  const {data} = await apiClient.get(`/patients/search?q=${search}`);
  return data;
}