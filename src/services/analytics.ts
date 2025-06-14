import { apiService } from './api';
import { 
  AnalyticsOverview, 
  ToolUsage, 
  PlanSuccess, 
  EffectiveTactic, 
  SentimentDistribution,
  SalesData,
  Activity 
} from './types';

export const analyticsService = {
  // Get analytics overview
  getOverview: async (): Promise<AnalyticsOverview> => {
    try {
      return await apiService.get<AnalyticsOverview>('/api/analytics/overview');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockOverview();
    }
  },

  // Get tool usage analytics
  getToolUsage: async (): Promise<ToolUsage[]> => {
    try {
      return await apiService.get<ToolUsage[]>('/api/analytics/tool-usage');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockToolUsage();
    }
  },

  // Get plan success analytics
  getPlanSuccess: async (): Promise<PlanSuccess[]> => {
    try {
      return await apiService.get<PlanSuccess[]>('/api/analytics/plan-success');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockPlanSuccess();
    }
  },

  // Get effective tactics
  getEffectiveTactics: async (): Promise<EffectiveTactic[]> => {
    try {
      return await apiService.get<EffectiveTactic[]>('/api/analytics/effective-tactics');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockEffectiveTactics();
    }
  },

  // Get sentiment distribution
  getSentimentDistribution: async (): Promise<SentimentDistribution> => {
    try {
      return await apiService.get<SentimentDistribution>('/api/analytics/sentiment-distribution');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockSentimentDistribution();
    }
  },

  // Get sales trends (for charts)
  getSalesTrends: async (): Promise<SalesData[]> => {
    try {
      return await apiService.get<SalesData[]>('/api/analytics/sales-trends');
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockSalesData();
    }
  },

  // Get recent activities
  getRecentActivities: async (limit: number = 6): Promise<Activity[]> => {
    try {
      return await apiService.get<Activity[]>(`/api/analytics/recent-activities?limit=${limit}`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockRecentActivities();
    }
  },
};

// Mock data functions for development/fallback
const getMockOverview = (): AnalyticsOverview => ({
  totalRevenue: 245890,
  newLeads: 1234,
  conversions: 89,
  activeClients: 856,
  averagePlanSuccessRate: 87,
  totalInteractions: 324,
  averageResponseTime: 2.3,
  leadSatisfactionRate: 94
});

const getMockToolUsage = (): ToolUsage[] => [
  { tool: "Análise de Sentimento", usage: 324, success: 94 },
  { tool: "Geração de Propostas", usage: 186, success: 87 },
  { tool: "Agendamento de Reuniões", usage: 142, success: 91 },
  { tool: "Pesquisa de Mercado", usage: 98, success: 89 },
  { tool: "Análise de Concorrentes", usage: 76, success: 92 }
];

const getMockPlanSuccess = (): PlanSuccess[] => [
  { plan: "Qualificação de Lead", total: 89, success: 78, rate: 88 },
  { plan: "Nutrição de Relacionamento", total: 156, success: 142, rate: 91 },
  { plan: "Fechamento de Venda", total: 43, success: 37, rate: 86 },
  { plan: "Retenção de Cliente", total: 67, success: 61, rate: 91 },
  { plan: "Upsell/Cross-sell", total: 34, success: 28, rate: 82 }
];

const getMockEffectiveTactics = (): EffectiveTactic[] => [
  { tactic: "Personalização baseada em histórico", effectiveness: 94, usage: 234 },
  { tactic: "Perguntas abertas para descoberta", effectiveness: 91, usage: 189 },
  { tactic: "Uso de cases de sucesso similares", effectiveness: 89, usage: 156 },
  { tactic: "Criação de senso de urgência", effectiveness: 87, usage: 142 },
  { tactic: "Demonstração de ROI específico", effectiveness: 92, usage: 98 }
];

const getMockSentimentDistribution = (): SentimentDistribution => ({
  positive: 68,
  neutral: 24,
  negative: 8
});

const getMockSalesData = (): SalesData[] => [
  { month: "Jan", vendas: 65000, leads: 120 },
  { month: "Fev", vendas: 72000, leads: 145 },
  { month: "Mar", vendas: 68000, leads: 132 },
  { month: "Abr", vendas: 85000, leads: 167 },
  { month: "Mai", vendas: 91000, leads: 189 },
  { month: "Jun", vendas: 88000, leads: 176 }
];

const getMockRecentActivities = (): Activity[] => [
  {
    id: "1",
    type: "call",
    description: "Ligação com Maria Santos",
    time: "2 min atrás",
    status: "completed"
  },
  {
    id: "2",
    type: "email",
    description: "E-mail enviado para João Silva",
    time: "15 min atrás",
    status: "sent"
  },
  {
    id: "3",
    type: "meeting",
    description: "Reunião agendada com Ana Costa",
    time: "1 hora atrás",
    status: "scheduled"
  },
  {
    id: "4",
    type: "proposal",
    description: "Proposta enviada para TechCorp",
    time: "2 horas atrás",
    status: "pending"
  },
  {
    id: "5",
    type: "lead",
    description: "Novo lead: Pedro Oliveira",
    time: "3 horas atrás",
    status: "new"
  },
  {
    id: "6",
    type: "sale",
    description: "Venda fechada: R$ 25.000",
    time: "4 horas atrás",
    status: "closed"
  }
];