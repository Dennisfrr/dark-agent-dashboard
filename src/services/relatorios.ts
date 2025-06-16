import { api } from './api';
import { AnalyticsOverview } from './types';

export interface Report {
  id: string;
  name: string;
  type: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

export const relatoriosService = {
  async getRelatoriosOverview(): Promise<AnalyticsOverview> {
    const response = await api.get<AnalyticsOverview>('/api/analytics/overview');
    return response.data;
  },

  async getReports(): Promise<Report[]> {
    const response = await api.get('/api/reports');
    return response.data;
  },

  async getReport(id: string): Promise<Report> {
    const response = await api.get(`/api/reports/${id}`);
    return response.data;
  },

  async generateReport(type: string, params: any): Promise<Report> {
    const response = await api.post('/api/reports/generate', { type, params });
    return response.data;
  },

  async downloadReport(id: string, format: string) {
    const response = await api.get(`/api/reports/${id}/download?format=${format}`, {
      responseType: 'blob'
    });
    return response.data;
  }
}; 