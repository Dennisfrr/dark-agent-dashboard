import { api } from './api';

export interface Meeting {
  id: string;
  scheduledDate: string;
  status: 'scheduled' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
  meetingType: string;
  participants: string[];
  notes: string;
  platform: string;
  meetingLink: string;
  leadId: string;
}

export const meetingsService = {
  // Buscar todas as reuniões
  async getAllMeetings(): Promise<Meeting[]> {
    try {
      const response = await api.get('/api/meetings');
      return response.data;
    } catch (error) {
      console.error('Falha ao buscar reuniões:', error);
      return [];
    }
  },

  // Buscar reuniões de um lead específico
  async getLeadMeetings(leadId: string): Promise<Meeting[]> {
    try {
      const response = await api.get(`/api/leads/${leadId}/meetings`);
      return response.data;
    } catch (error) {
      console.error(`Falha ao buscar reuniões para lead ${leadId}:`, error);
      return [];
    }
  },

  // Criar uma nova reunião
  async createMeeting(leadId: string, meetingData: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Meeting> {
    try {
      const response = await api.post(`/api/leads/${leadId}/meetings`, meetingData);
      return response.data;
    } catch (error) {
      console.error('Falha ao criar reunião:', error);
      throw error;
    }
  },

  // Atualizar status da reunião
  async updateMeetingStatus(meetingId: string, status: Meeting['status']): Promise<Meeting> {
    try {
      const response = await api.patch(`/api/meetings/${meetingId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Falha ao atualizar status da reunião:', error);
      throw error;
    }
  }
}; 