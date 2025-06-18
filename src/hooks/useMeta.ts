import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { metaService } from '@/services/meta';
import { 
  MetaLead, 
  MetaContact, 
  MetaCampaign, 
  MetaMessage, 
  MetaOpportunity,
  MetaDashboardStats 
} from '@/types/meta';
import { useToast } from '@/hooks/use-toast';

// Hook para estatísticas do dashboard
export function useMetaDashboardStats() {
  return useQuery({
    queryKey: ['meta-dashboard-stats'],
    queryFn: () => metaService.getDashboardStats(),
    refetchInterval: 30000, // Atualizar a cada 30 segundos
    staleTime: 15000, // Considerar dados frescos por 15 segundos
  });
}

// Hook para leads da Meta
export function useMetaLeads() {
  return useQuery({
    queryKey: ['meta-leads'],
    queryFn: () => metaService.getLeads(),
    refetchInterval: 60000, // Atualizar a cada minuto
    staleTime: 30000,
  });
}

// Hook para contatos
export function useMetaContacts() {
  return useQuery({
    queryKey: ['meta-contacts'],
    queryFn: () => metaService.getContacts(),
    refetchInterval: 120000, // Atualizar a cada 2 minutos
    staleTime: 60000,
  });
}

// Hook para oportunidades
export function useMetaOpportunities() {
  return useQuery({
    queryKey: ['meta-opportunities'],
    queryFn: () => metaService.getOpportunities(),
    refetchInterval: 300000, // Atualizar a cada 5 minutos
    staleTime: 120000,
  });
}

// Hook para campanhas
export function useMetaCampaigns() {
  return useQuery({
    queryKey: ['meta-campaigns'],
    queryFn: async () => {
      // Como não temos o método direto, vamos simular
      return [
        {
          id: 'camp_456',
          name: 'Campanha Geração de Leads Q1',
          status: 'active' as const,
          objective: 'LEAD_GENERATION',
          budget_remaining: 1500,
          spend: 2500,
          impressions: 125000,
          clicks: 3500,
          cpc: 0.71,
          cpl: 12.50,
          leads_count: 200,
          conversions: 45,
          created_time: new Date(Date.now() - 86400000 * 30).toISOString(),
          updated_time: new Date().toISOString()
        }
      ] as MetaCampaign[];
    },
    refetchInterval: 300000, // Atualizar a cada 5 minutos
    staleTime: 180000,
  });
}

// Hook para mensagens/conversas
export function useMetaMessages() {
  return useQuery({
    queryKey: ['meta-messages'],
    queryFn: async () => {
      // Simular mensagens
      return [
        {
          id: 'msg_1',
          conversation_id: 'conv_123',
          contact_id: 'contact_1',
          platform: 'messenger' as const,
          message: 'Olá! Gostaria de saber mais sobre seus produtos.',
          from: { id: 'user_123', name: 'João Silva' },
          to: { id: 'page_456', name: 'Minha Empresa' },
          created_time: new Date(Date.now() - 1800000).toISOString(),
          message_type: 'text' as const,
          read: false,
          replied: false
        },
        {
          id: 'msg_2',
          conversation_id: 'conv_124',
          contact_id: 'contact_2',
          platform: 'whatsapp' as const,
          message: 'Preciso de um orçamento urgente!',
          from: { id: 'user_124', name: 'Maria Santos' },
          to: { id: 'page_456', name: 'Minha Empresa' },
          created_time: new Date(Date.now() - 3600000).toISOString(),
          message_type: 'text' as const,
          read: false,
          replied: false
        }
      ] as MetaMessage[];
    },
    refetchInterval: 30000, // Atualizar a cada 30 segundos
    staleTime: 15000,
  });
}

// Hook para atividades recentes (combinando diferentes fontes)
export function useMetaRecentActivities() {
  const { data: leads } = useMetaLeads();
  const { data: messages } = useMetaMessages();
  
  return useQuery({
    queryKey: ['meta-recent-activities', leads, messages],
    queryFn: async () => {
      const activities = [];
      
      // Adicionar leads como atividades
      if (leads) {
        leads.forEach(lead => {
          activities.push({
            id: `lead_${lead.id}`,
            type: 'lead',
            description: `Novo lead: ${lead.field_data.find(f => f.name === 'full_name')?.values[0] || 'Sem nome'}`,
            time: lead.created_at,
            status: lead.status,
            icon: 'UserPlus',
            color: 'success',
            platform: lead.platform
          });
        });
      }
      
      // Adicionar mensagens como atividades
      if (messages) {
        messages.forEach(message => {
          activities.push({
            id: `message_${message.id}`,
            type: 'message',
            description: `Mensagem de ${message.from.name} via ${message.platform}`,
            time: message.created_time,
            status: message.read ? 'read' : 'unread',
            icon: 'Mail',
            color: 'info',
            platform: message.platform
          });
        });
      }
      
      // Ordenar por data mais recente
      return activities.sort((a, b) => 
        new Date(b.time).getTime() - new Date(a.time).getTime()
      ).slice(0, 10); // Pegar apenas os 10 mais recentes
    },
    enabled: !!(leads || messages),
  });
}

// Hook para métricas de performance das campanhas
export function useMetaCampaignMetrics() {
  const { data: campaigns } = useMetaCampaigns();
  
  return useQuery({
    queryKey: ['meta-campaign-metrics', campaigns],
    queryFn: async () => {
      if (!campaigns) return null;
      
      const totalSpend = campaigns.reduce((sum, camp) => sum + camp.spend, 0);
      const totalLeads = campaigns.reduce((sum, camp) => sum + camp.leads_count, 0);
      const totalClicks = campaigns.reduce((sum, camp) => sum + camp.clicks, 0);
      const totalImpressions = campaigns.reduce((sum, camp) => sum + camp.impressions, 0);
      
      return {
        total_spend: totalSpend,
        total_leads: totalLeads,
        total_clicks: totalClicks,
        total_impressions: totalImpressions,
        avg_cpl: totalLeads > 0 ? totalSpend / totalLeads : 0,
        avg_cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
        ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
        active_campaigns: campaigns.filter(c => c.status === 'active').length,
        total_campaigns: campaigns.length
      };
    },
    enabled: !!campaigns,
  });
}

// Hook para mutation de marcar mensagem como lida
export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (messageId: string) => {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['meta-messages'] });
      queryClient.invalidateQueries({ queryKey: ['meta-recent-activities'] });
      
      toast({
        title: "Mensagem marcada como lida",
        description: "A mensagem foi atualizada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar mensagem",
        description: "Não foi possível marcar a mensagem como lida.",
        variant: "destructive",
      });
    }
  });
}

// Hook para mutation de atualizar status do lead
export function useUpdateLeadStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: string }) => {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, leadId, status };
    },
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['meta-leads'] });
      queryClient.invalidateQueries({ queryKey: ['meta-dashboard-stats'] });
      
      toast({
        title: "Status do lead atualizado",
        description: `Lead ${data.leadId} foi marcado como ${data.status}.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar lead",
        description: "Não foi possível atualizar o status do lead.",
        variant: "destructive",
      });
    }
  });
}

// Hook para dados em tempo real (simulação de websocket)
export function useMetaRealTimeData() {
  const queryClient = useQueryClient();
  
  // Simular atualizações em tempo real
  useQuery({
    queryKey: ['meta-realtime'],
    queryFn: async () => {
      // Simular chegada de novos dados
      const randomEvent = Math.random();
      
      if (randomEvent > 0.8) {
        // Simular novo lead
        queryClient.invalidateQueries({ queryKey: ['meta-leads'] });
        queryClient.invalidateQueries({ queryKey: ['meta-dashboard-stats'] });
      } else if (randomEvent > 0.6) {
        // Simular nova mensagem
        queryClient.invalidateQueries({ queryKey: ['meta-messages'] });
        queryClient.invalidateQueries({ queryKey: ['meta-recent-activities'] });
      }
      
      return { timestamp: new Date().toISOString() };
    },
    refetchInterval: 10000, // Verificar a cada 10 segundos
    refetchIntervalInBackground: true,
  });
}