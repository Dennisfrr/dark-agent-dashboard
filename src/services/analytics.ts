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
    try {
      const response = await api.get('/api/analytics/overview');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar overview:', error);
      return {
        activeLeads: 0,
        meetingsScheduled: 0,
        averagePlanSuccessRate: 0,
        totalReflections: 0
      };
    }
  },

  // Get tool usage analytics
  async getToolUsage(): Promise<ToolUsage[]> {
    try {
      const response = await api.get('/api/analytics/tool-usage');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/tool-usage não disponível');
      return [];
    }
  },

  // Get plan success analytics
  async getPlanSuccess(): Promise<PlanSuccess[]> {
    try {
      const response = await api.get('/api/analytics/plan-success');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/plan-success não disponível');
      return [];
    }
  },

  // Get effective tactics
  async getEffectiveTactics(): Promise<EffectiveTactic[]> {
    try {
      const response = await api.get('/api/analytics/effective-tactics');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/effective-tactics não disponível');
      return [];
    }
  },

  // Get sentiment distribution
  async getSentimentDistribution(): Promise<SentimentDistribution> {
    try {
      const response = await api.get('/api/analytics/sentiment-distribution');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/sentiment-distribution não disponível');
      return { positive: 0, neutral: 0, negative: 0 };
    }
  },

  // Get sales trends
  async getSalesTrends(): Promise<any[]> {
    try {
      const response = await api.get('/api/analytics/sales-trends');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/sales-trends não disponível');
      return [];
    }
  },

  // Get recent activities
  async getRecentActivities(limit: number = 6): Promise<RecentActivity[]> {
    try {
      const response = await api.get(`/api/analytics/recent-activities?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Falha ao buscar atividades recentes:', error);
      return [];
    }
  },

  async getLLMUsage() {
    try {
      const response = await api.get('/api/analytics/llm-usage');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/llm-usage não disponível');
      return { tokens: 0, cost: 0 };
    }
  },

  async getRecentActivity() {
    try {
      const response = await api.get('/api/analytics/recent-activity');
      return response.data;
    } catch (error) {
      console.warn('Endpoint /api/analytics/recent-activity não disponível');
      return [];
    }
  }
};