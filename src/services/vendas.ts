import { api } from './api';
import { AnalyticsOverview, Lead } from './types';

export interface Sale {
  id: string;
  leadId: string;
  amount: number;
  status: string;
  product: string;
  createdAt: string;
  updatedAt: string;
}

export const vendasService = {
  async getVendasOverview(): Promise<AnalyticsOverview> {
    const response = await api.get<AnalyticsOverview>('/api/analytics/overview');
    return response.data;
  },

  async getUltimasVendas(limit: number = 5): Promise<Lead[]> {
    const response = await api.get<Lead[]>(`/api/leads?nivelDeInteresseReuniao=agendado&limit=${limit}`);
    return response.data;
  },

  async getSales(): Promise<Sale[]> {
    const response = await api.get('/api/sales');
    return response.data;
  },

  async getSale(id: string): Promise<Sale> {
    const response = await api.get(`/api/sales/${id}`);
    return response.data;
  },

  async createSale(data: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>): Promise<Sale> {
    const response = await api.post('/api/sales', data);
    return response.data;
  },

  async updateSale(id: string, data: Partial<Sale>): Promise<Sale> {
    const response = await api.patch(`/api/sales/${id}`, data);
    return response.data;
  },

  async getSalesMetrics() {
    const response = await api.get('/api/sales/metrics');
    return response.data;
  }
}; 