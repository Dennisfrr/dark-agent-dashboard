// API Response Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  currentPlanName: string;
  currentPlanStep: string;
  currentPlanStatus: string;
  ultimoResumoDaSituacao: string;
  nivelDeInteresseReuniao: number;
  recentHypothesesSummary: Hypothesis[];
  recentReflectionsSummary: Reflection[];
  plannerHistorySummary: PlanStep[];
  lastContact?: string;
  lastInteraction?: string;
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
  totalReflections: number;
  activeLeads: number;
  meetingsScheduled: number;
  averagePlanSuccessRate: number;
}

export interface ToolUsage {
  tool: string;
  usage: number;
  success: number;
  negative: number;
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

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  user: {
    name: string;
  };
}