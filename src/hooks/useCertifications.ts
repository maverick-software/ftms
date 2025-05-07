import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCertificationTypes,
  getCertificationType,
  createCertificationType,
  updateCertificationType,
  deleteCertificationType,
} from '../lib/api/certifications';

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: getCertificationTypes,
  });
}

export function useCertification(id: string) {
  return useQuery({
    queryKey: ['certifications', id],
    queryFn: () => getCertificationType(id),
  });
}

export function useCreateCertification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCertificationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
    },
  });
}

export function useUpdateCertification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCertificationType(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      queryClient.invalidateQueries({ queryKey: ['certifications', id] });
    },
  });
}

export function useDeleteCertification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCertificationType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
    },
  });
}