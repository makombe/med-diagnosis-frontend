import { useQuery } from '@tanstack/react-query';
import { searchPatients } from '../api/apiPatient'

export const usePatient = (search: string) => {
  return useQuery({
    queryKey: ['patients', search],
    queryFn: () => searchPatients(search),
    enabled: !!search.trim(),           // don't run if search is empty
  });
};