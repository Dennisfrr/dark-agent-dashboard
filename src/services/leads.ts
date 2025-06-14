import { apiService } from './api';
import { Lead, ChatMessage, Hypothesis, Reflection, PlanStep } from './types';

export const leadsService = {
  // Get all leads with optional filters
  getLeads: async (params?: {
    limit?: number;
    type?: 'lead' | 'cliente';
    search?: string;
    sort?: string;
  }): Promise<Lead[]> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    const endpoint = `/api/leads${queryString ? `?${queryString}` : ''}`;
    
    try {
      return await apiService.get<Lead[]>(endpoint);
    } catch (error) {
      // Fallback to mock data during development
      console.warn('API not available, using mock data');
      return getMockLeads(params);
    }
  },

  // Get single lead details
  getLead: async (id: string): Promise<Lead> => {
    try {
      return await apiService.get<Lead>(`/api/leads/${id}`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockLead(id);
    }
  },

  // Get chat history for a lead
  getChatHistory: async (id: string): Promise<ChatMessage[]> => {
    try {
      return await apiService.get<ChatMessage[]>(`/api/leads/${id}/chathistory`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockChatHistory(id);
    }
  },

  // Get all hypotheses for a lead
  getAllHypotheses: async (id: string): Promise<Hypothesis[]> => {
    try {
      return await apiService.get<Hypothesis[]>(`/api/leads/${id}/all-hypotheses`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockHypotheses(id);
    }
  },

  // Get all reflections for a lead
  getAllReflections: async (id: string): Promise<Reflection[]> => {
    try {
      return await apiService.get<Reflection[]>(`/api/leads/${id}/all-reflections`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockReflections(id);
    }
  },

  // Get planner history for a lead
  getPlannerHistory: async (id: string): Promise<PlanStep[]> => {
    try {
      return await apiService.get<PlanStep[]>(`/api/leads/${id}/planner-history`);
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockPlannerHistory(id);
    }
  },
};

// Mock data functions for development/fallback
const getMockLeads = (params?: any): Lead[] => [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    currentPlanName: "Qualificação de Lead",
    currentPlanStep: "Análise Inicial",
    currentPlanStatus: "Em Andamento",
    ultimoResumoDaSituacao: "Lead demonstrou interesse em solução de CRM, aguardando proposta personalizada.",
    nivelDeInteresseReuniao: 85,
    recentHypothesesSummary: [
      { interpretation: "Lead tem orçamento adequado", confidence: 85 },
      { interpretation: "Necessita de implementação rápida", confidence: 72 }
    ],
    recentReflectionsSummary: [
      { summary: "Foco em benefícios de ROI", focusType: "estratégia" },
      { summary: "Destacar facilidade de uso", focusType: "produto" }
    ],
    plannerHistorySummary: [
      { stepName: "Primeiro Contato", status: "Concluído", details: "Lead respondeu positivamente" },
      { stepName: "Análise de Necessidades", status: "Em Andamento", details: "Coletando informações sobre empresa" }
    ],
    status: "Lead",
    source: "Website",
    value: "R$ 15.000",
    lastContact: "2024-01-15",
    type: "lead"
  },
  {
    id: "2",
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com",
    phone: "(11) 3333-3333",
    currentPlanName: "Retenção de Cliente",
    currentPlanStep: "Acompanhamento",
    currentPlanStatus: "Ativo",
    ultimoResumoDaSituacao: "Cliente satisfeito, potencial para upgrade de plano.",
    nivelDeInteresseReuniao: 95,
    recentHypothesesSummary: [
      { interpretation: "Interesse em expansão", confidence: 90 }
    ],
    recentReflectionsSummary: [
      { summary: "Oferecer plano premium", focusType: "upsell" }
    ],
    plannerHistorySummary: [
      { stepName: "Onboarding", status: "Concluído", details: "Cliente integrado com sucesso" }
    ],
    status: "Cliente Ativo",
    source: "Indicação",
    value: "R$ 150.000",
    lastContact: "2024-01-14",
    type: "cliente"
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    currentPlanName: "Qualificação de Lead",
    currentPlanStep: "Validação de Interesse",
    currentPlanStatus: "Em Andamento",
    ultimoResumoDaSituacao: "Lead qualificado, agendamento de demonstração pendente.",
    nivelDeInteresseReuniao: 78,
    recentHypothesesSummary: [
      { interpretation: "Decisor na empresa", confidence: 88 }
    ],
    recentReflectionsSummary: [
      { summary: "Agendar demo personalizada", focusType: "próximo_passo" }
    ],
    plannerHistorySummary: [
      { stepName: "Primeiro Contato", status: "Concluído", details: "Interesse confirmado" }
    ],
    status: "Lead Qualificado",
    source: "LinkedIn",
    value: "R$ 25.000",
    lastContact: "2024-01-13",
    type: "lead"
  }
];

const getMockLead = (id: string): Lead => {
  const leads = getMockLeads();
  return leads.find(lead => lead.id === id) || leads[0];
};

const getMockChatHistory = (id: string): ChatMessage[] => [
  {
    id: "1",
    sender: "user",
    message: "Olá, gostaria de saber mais sobre suas soluções de CRM...",
    timestamp: "2024-01-15T14:30:00Z"
  },
  {
    id: "2",
    sender: "agent",
    message: "Olá! Fico feliz em ajudar. Pode me contar um pouco sobre sua empresa e suas necessidades atuais?",
    timestamp: "2024-01-15T14:32:00Z"
  }
];

const getMockHypotheses = (id: string): Hypothesis[] => [
  { interpretation: "Lead tem orçamento adequado", confidence: 85, timestamp: "2024-01-15T14:35:00Z" },
  { interpretation: "Necessita de implementação rápida", confidence: 72, timestamp: "2024-01-15T14:40:00Z" },
  { interpretation: "Empresa em crescimento", confidence: 78, timestamp: "2024-01-15T14:45:00Z" }
];

const getMockReflections = (id: string): Reflection[] => [
  { summary: "Foco em benefícios de ROI", focusType: "estratégia", timestamp: "2024-01-15T14:36:00Z" },
  { summary: "Destacar facilidade de uso", focusType: "produto", timestamp: "2024-01-15T14:42:00Z" }
];

const getMockPlannerHistory = (id: string): PlanStep[] => [
  { stepName: "Primeiro Contato", status: "Concluído", details: "Lead respondeu positivamente", timestamp: "2024-01-15T14:30:00Z" },
  { stepName: "Análise de Necessidades", status: "Em Andamento", details: "Coletando informações sobre empresa", timestamp: "2024-01-15T14:45:00Z" }
];