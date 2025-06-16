import { api } from './api';
import { 
  AnalyticsOverview, 
  ToolUsage, 
  PlanSuccess, 
  EffectiveTactic, 
  SentimentDistribution,
  RecentActivity
} from './types';

export const analyticsService = {
  // Get analytics overview
  async getOverview(): Promise<AnalyticsOverview> {
    const response = await api.get('/api/analytics/overview');
    return response.data;
  },

  // Get tool usage analytics
  async getToolUsage(): Promise<ToolUsage[]> {
    const response = await api.get('/api/analytics/tool-usage');
    return response.data;
  },

  // Get plan success analytics
  async getPlanSuccess(): Promise<PlanSuccess[]> {
    const response = await api.get('/api/analytics/plan-success');
    return response.data;
  },

  // Get effective tactics
  async getEffectiveTactics(): Promise<EffectiveTactic[]> {
    const response = await api.get('/api/analytics/effective-tactics');
    return response.data;
  },

  // Get sentiment distribution
  async getSentimentDistribution(): Promise<SentimentDistribution> {
    const response = await api.get('/api/analytics/sentiment-distribution');
    return response.data;
  },

  // Get sales trends
  async getSalesTrends(): Promise<any[]> {
    const response = await api.get('/api/analytics/sales-trends');
    return response.data;
  },

  // Get recent activities
  async getRecentActivities(limit: number = 6): Promise<RecentActivity[]> {
    const response = await api.get(`/api/analytics/recent-activities?limit=${limit}`);
    return response.data;
  },

  async getLLMUsage() {
    const response = await api.get('/api/analytics/llm-usage');
    return response.data;
  },

  async getRecentActivity() {
    const response = await api.get('/api/analytics/recent-activity');
    return response.data;
  }
};