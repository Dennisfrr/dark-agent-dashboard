import { api } from './api';
import { leadsService } from './leads';
import { meetingsService } from './meetings';
import { vendasService } from './vendas';
import { relatoriosService } from './relatorios';
import { Lead, ChatMessage, AnalyticsOverview } from './types';

export interface InboxMessage {
  id: string;
  type: 'chat' | 'email' | 'meeting' | 'sale' | 'report';
  from: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
  leadId?: string;
  originalData?: any;
}

export interface InboxStats {
  unread: number;
  highPriority: number;
  totalToday: number;
  responseRate: number;
}

export const inboxService = {
  // Buscar todas as mensagens da inbox
  async getInboxMessages(): Promise<InboxMessage[]> {
    try {
      const [leads, meetings, sales, reports] = await Promise.all([
        leadsService.getLeads({ limit: 50 }),
        meetingsService.getAllMeetings(),
        vendasService.getSales(),
        relatoriosService.getReports()
      ]);

      const messages: InboxMessage[] = [];

      // Converter leads em mensagens
      leads.data.forEach(lead => {
        messages.push({
          id: `lead-${lead.id}`,
          type: 'chat',
          from: lead.name || lead.phone || 'Contato Desconhecido',
          subject: `Conversa com ${lead.name || 'Cliente'}`,
          preview: lead.ultimoResumoDaSituacao || 'Nova conversa iniciada',
          timestamp: lead.lastContact || new Date().toISOString(),
          unread: lead.status === 'new',
          priority: this.getLeadPriority(lead),
          leadId: lead.id,
          originalData: lead
        });
      });

      // Converter reuniões em mensagens
      meetings.forEach(meeting => {
        messages.push({
          id: `meeting-${meeting.id}`,
          type: 'meeting',
          from: 'Sistema de Reuniões',
          subject: `Reunião ${meeting.status === 'scheduled' ? 'Agendada' : meeting.status}`,
          preview: `${meeting.meetingType} - ${meeting.platform}`,
          timestamp: meeting.scheduledDate,
          unread: meeting.status === 'scheduled',
          priority: meeting.status === 'scheduled' ? 'high' : 'medium',
          originalData: meeting
        });
      });

      // Converter vendas em mensagens
      sales.forEach(sale => {
        messages.push({
          id: `sale-${sale.id}`,
          type: 'sale',
          from: 'Sistema de Vendas',
          subject: `Venda - ${sale.product}`,
          preview: `Valor: R$ ${sale.amount.toLocaleString('pt-BR')} - Status: ${sale.status}`,
          timestamp: sale.updatedAt,
          unread: sale.status === 'pending',
          priority: sale.amount > 10000 ? 'high' : 'medium',
          originalData: sale
        });
      });

      // Converter relatórios em mensagens
      reports.forEach(report => {
        messages.push({
          id: `report-${report.id}`,
          type: 'report',
          from: 'Sistema de Relatórios',
          subject: `Relatório: ${report.name}`,
          preview: `Tipo: ${report.type}`,
          timestamp: report.updatedAt,
          unread: false,
          priority: 'low',
          originalData: report
        });
      });

      // Ordenar por timestamp (mais recente primeiro)
      return messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Erro ao buscar mensagens da inbox:', error);
      return [];
    }
  },

  // Buscar estatísticas da inbox
  async getInboxStats(): Promise<InboxStats> {
    try {
      const messages = await this.getInboxMessages();
      const today = new Date().toDateString();
      
      const unread = messages.filter(m => m.unread).length;
      const highPriority = messages.filter(m => m.priority === 'high').length;
      const totalToday = messages.filter(m => 
        new Date(m.timestamp).toDateString() === today
      ).length;
      
      // Calcular taxa de resposta baseada nos leads
      const totalResponded = messages.filter(m => 
        m.type === 'chat' && !m.unread
      ).length;
      const totalChats = messages.filter(m => m.type === 'chat').length;
      const responseRate = totalChats > 0 ? (totalResponded / totalChats) * 100 : 0;

      return {
        unread,
        highPriority,
        totalToday,
        responseRate: Math.round(responseRate)
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas da inbox:', error);
      return {
        unread: 0,
        highPriority: 0,
        totalToday: 0,
        responseRate: 0
      };
    }
  },

  // Buscar histórico de chat de um lead
  async getChatHistory(leadId: string): Promise<ChatMessage[]> {
    try {
      return await leadsService.getChatHistory(leadId);
    } catch (error) {
      console.error('Erro ao buscar histórico de chat:', error);
      return [];
    }
  },

  // Marcar mensagem como lida
  async markAsRead(messageId: string): Promise<void> {
    try {
      const [type, id] = messageId.split('-');
      
      if (type === 'lead') {
        await leadsService.updateLead(id, { status: 'warm' });
      }
      // Implementar para outros tipos quando necessário
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  },

  // Determinar prioridade do lead baseado em critérios
  getLeadPriority(lead: Lead): 'high' | 'medium' | 'low' {
    if (lead.status === 'hot' || lead.nivelDeInteresseReuniao > 8) {
      return 'high';
    }
    if (lead.status === 'warm' || lead.nivelDeInteresseReuniao > 5) {
      return 'medium';
    }
    return 'low';
  }
};