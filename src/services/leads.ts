import { api } from './api';
import { Lead, ChatMessage, Hypothesis, Reflection, PlanStep } from './types';

export const leadsService = {
  // Get all leads with optional filters
  getLeads: async (params?: {
    page?: number;
    limit?: number;
    type?: 'lead' | 'cliente';
    search?: string;
    sort?: string;
  }): Promise<{ data: Lead[]; page: number; limit: number; totalItems: number; totalPages: number }> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    const endpoint = `/api/leads${queryString ? `?${queryString}` : ''}`;
    const response = await api.get(endpoint);
    return response.data;
  },

  // Get single lead details
  getLead: async (id: string): Promise<Lead> => {
    const response = await api.get<Lead>(`/api/leads/${id}`);
    return response.data;
  },

  // Get chat history for a lead
  getChatHistory: async (id: string): Promise<ChatMessage[]> => {
    const response = await api.get<ChatMessage[]>(`/api/leads/${id}/chathistory`);
    return response.data;
  },

  // Get all hypotheses for a lead
  getAllHypotheses: async (id: string): Promise<Hypothesis[]> => {
    const response = await api.get<Hypothesis[]>(`/api/leads/${id}/all-hypotheses`);
    return response.data;
  },

  // Get all reflections for a lead
  getAllReflections: async (id: string): Promise<Reflection[]> => {
    const response = await api.get<Reflection[]>(`/api/leads/${id}/all-reflections`);
    return response.data;
  },

  // Get planner history for a lead
  getPlannerHistory: async (id: string): Promise<PlanStep[]> => {
    const response = await api.get<PlanStep[]>(`/api/leads/${id}/planner-history`);
    return response.data;
  },

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead> {
    const response = await api.patch(`/api/leads/${id}`, data);
    return response.data;
  },

  async getLeadHistory(id: string) {
    const response = await api.get(`/api/leads/${id}/history`);
    return response.data;
  },

  async getLeadConversation(id: string) {
    const response = await api.get(`/api/leads/${id}/conversation`);
    return response.data;
  }
};

// Mock data functions for development/fallback
// ... existing code ...