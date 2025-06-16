import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analytics';

// Hook for analytics overview
export const useAnalyticsOverview = () => {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsService.getOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for tool usage analytics
export const useToolUsage = () => {
  return useQuery({
    queryKey: ['analytics', 'tool-usage'],
    queryFn: analyticsService.getToolUsage,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for plan success analytics
export const usePlanSuccess = () => {
  return useQuery({
    queryKey: ['analytics', 'plan-success'],
    queryFn: analyticsService.getPlanSuccess,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook for effective tactics
export const useEffectiveTactics = () => {
  return useQuery({
    queryKey: ['analytics', 'effective-tactics'],
    queryFn: analyticsService.getEffectiveTactics,
    staleTime: 15 * 60 * 1000,
  });
};

// Hook for sentiment distribution
export const useSentimentDistribution = () => {
  return useQuery({
    queryKey: ['analytics', 'sentiment-distribution'],
    queryFn: analyticsService.getSentimentDistribution,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for sales trends
export const useSalesTrends = () => {
  return useQuery({
    queryKey: ['analytics', 'sales-trends'],
    queryFn: analyticsService.getSalesTrends,
    staleTime: 15 * 60 * 1000,
  });
};

// Hook for recent activities
export const useRecentActivities = (limit: number = 6) => {
  return useQuery({
    queryKey: ['analytics', 'recent-activities', limit],
    queryFn: () => analyticsService.getRecentActivities(limit),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
};