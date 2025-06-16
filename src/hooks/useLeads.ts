import { useQuery, useQueries } from '@tanstack/react-query';
import { leadsService } from '@/services/leads';
import { Lead, ChatMessage, Hypothesis, Reflection, PlanStep } from '@/services/types';

// Hook for getting all leads
export const useLeads = (params?: {
  limit?: number;
  type?: 'lead' | 'cliente';
  search?: string;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadsService.getLeads(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for getting a single lead
export const useLead = (id: string) => {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsService.getLead(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for getting chat history
export const useChatHistory = (id: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['chatHistory', id],
    queryFn: () => leadsService.getChatHistory(id),
    enabled: !!id && enabled,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Hook for getting lead intelligence data (hypotheses, reflections, planner history)
export const useLeadIntelligence = (id: string, enabled: boolean = false) => {
  return useQueries({
    queries: [
      {
        queryKey: ['hypotheses', id],
        queryFn: () => leadsService.getAllHypotheses(id),
        enabled: !!id && enabled,
        staleTime: 2 * 60 * 1000,
      },
      {
        queryKey: ['reflections', id],
        queryFn: () => leadsService.getAllReflections(id),
        enabled: !!id && enabled,
        staleTime: 2 * 60 * 1000,
      },
      {
        queryKey: ['plannerHistory', id],
        queryFn: () => leadsService.getPlannerHistory(id),
        enabled: !!id && enabled,
        staleTime: 2 * 60 * 1000,
      },
    ],
  });
};

// Hook for recent leads (for dashboard)
export const useRecentLeads = (limit: number = 5) => {
  return useQuery({
    queryKey: ['leads', 'recent', limit],
    queryFn: () => leadsService.getLeads({ limit, sort: 'lastActivity' }),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};