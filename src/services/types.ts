// API Response Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentPlanName: string;
  currentPlanStep: string;
  currentPlanStatus: string;
  ultimoResumoDaSituacao: string;
  nivelDeInteresseReuniao: number;
  recentHypothesesSummary: Hypothesis[];
  recentReflectionsSummary: Reflection[];
  plannerHistorySummary: PlanStep[];
  lastContact?: string;
  source?: string;
  value?: string;
  status?: string;
  type?: 'lead' | 'cliente';
}

export interface Hypothesis {
  interpretation: string;
  confidence: number;
  timestamp?: string;
}

export interface Reflection {
  summary: string;
  focusType: string;
  timestamp?: string;
}

export interface PlanStep {
  stepName: string;
  status: string;
  details: string;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  message: string;
  timestamp: string;
}

export interface AnalyticsOverview {
  totalRevenue: number;
  newLeads: number;
  conversions: number;
  activeClients: number;
  averagePlanSuccessRate: number;
  totalInteractions: number;
  averageResponseTime: number;
  leadSatisfactionRate: number;
}

export interface ToolUsage {
  tool: string;
  usage: number;
  success: number;
}

export interface PlanSuccess {
  plan: string;
  total: number;
  success: number;
  rate: number;
}

export interface EffectiveTactic {
  tactic: string;
  effectiveness: number;
  usage: number;
}

export interface SentimentDistribution {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SalesData {
  month: string;
  vendas: number;
  leads: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  status: string;
  leadId?: string;
}