import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inboxService, InboxMessage, InboxStats } from '@/services/inbox';

export const useInboxMessages = () => {
  return useQuery<InboxMessage[]>({
    queryKey: ['inbox-messages'],
    queryFn: inboxService.getInboxMessages,
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });
};

export const useInboxStats = () => {
  return useQuery<InboxStats>({
    queryKey: ['inbox-stats'],
    queryFn: inboxService.getInboxStats,
    refetchInterval: 30000,
  });
};

export const useChatHistory = (leadId: string) => {
  return useQuery({
    queryKey: ['chat-history', leadId],
    queryFn: () => inboxService.getChatHistory(leadId),
    enabled: !!leadId,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: inboxService.markAsRead,
    onSuccess: () => {
      // Invalidar queries para atualizar dados
      queryClient.invalidateQueries({ queryKey: ['inbox-messages'] });
      queryClient.invalidateQueries({ queryKey: ['inbox-stats'] });
    },
  });
};