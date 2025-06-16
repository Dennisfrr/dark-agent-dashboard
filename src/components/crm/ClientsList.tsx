import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { leadsService } from "@/services/leads";
import { useQuery } from "@tanstack/react-query";

export function ClientsList() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsService.getLeads({ limit: 5 }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Erro ao carregar leads:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Erro ao carregar leads. Por favor, tente novamente mais tarde.</p>
        </CardContent>
      </Card>
    );
  }

  const leads = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => navigate(`/contatos/${lead.id}`)}
            >
              <Avatar>
                <AvatarFallback>
                  {lead.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none truncate">{lead.name || 'Nome não disponível'}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {lead.businessName || 'Empresa não informada'}
                </p>
              </div>
              <Badge variant={getBadgeVariant(lead.funnelStage)}>
                {getFunnelStageLabel(lead.funnelStage)}
              </Badge>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum lead encontrado.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getBadgeVariant(stage: string): "default" | "secondary" | "destructive" | "outline" {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    'qualificacao': 'default',
    'apresentacao': 'secondary',
    'proposta': 'outline',
    'fechamento': 'destructive',
  };
  return variants[stage?.toLowerCase()] || 'default';
}

function getFunnelStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    'qualificacao': 'Qualificação',
    'apresentacao': 'Apresentação',
    'proposta': 'Proposta',
    'fechamento': 'Fechamento',
  };
  return labels[stage?.toLowerCase()] || stage || 'Novo';
}