import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCompetencies,
  getCompetency,
  createCompetency,
  updateCompetency,
  deleteCompetency,
} from '../lib/api/competencies';

export function useCompetencies() {
  return useQuery({
    queryKey: ['competencies'],
    queryFn: getCompetencies,
  });
}

export function useCompetency(id: string) {
  return useQuery({
    queryKey: ['competencies', id],
    queryFn: () => getCompetency(id),
  });
}

export function useCreateCompetency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompetency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competencies'] });
    },
  });
}

export function useUpdateCompetency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCompetency(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['competencies'] });
      queryClient.invalidateQueries({ queryKey: ['competencies', id] });
    },
  });
}

export function useDeleteCompetency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompetency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competencies'] });
    },
  });
}