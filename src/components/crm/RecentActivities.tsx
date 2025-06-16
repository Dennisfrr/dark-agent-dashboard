import { Phone, Mail, Calendar, FileText, UserPlus, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentActivities } from "@/hooks/useAnalytics";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatTimeAgo } from "@/utils/formatters";

export function RecentActivities() {
  const { data: activities, isLoading, error } = useRecentActivities(5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "closed":
        return <Badge className="bg-success/10 text-success">Concluído</Badge>;
      case "sent":
        return <Badge className="bg-info/10 text-info">Enviado</Badge>;
      case "scheduled":
        return <Badge className="bg-warning/10 text-warning">Agendado</Badge>;
      case "pending":
        return <Badge className="bg-muted text-muted-foreground">Pendente</Badge>;
      case "new":
        return <Badge className="bg-primary/10 text-primary">Novo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    const iconMap = {
      call: Phone,
      email: Mail,
      meeting: Calendar,
      proposal: FileText,
      lead: UserPlus,
      sale: DollarSign,
    };
    return iconMap[type as keyof typeof iconMap] || Phone;
  };

  const getActivityColor = (type: string) => {
    const colorMap = {
      call: 'success',
      email: 'info', 
      meeting: 'warning',
      proposal: 'primary',
      lead: 'success',
      sale: 'success',
    };
    return colorMap[type as keyof typeof colorMap] || 'primary';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-3 w-[120px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error('Erro ao carregar atividades:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Erro ao carregar atividades. Por favor, tente novamente mais tarde.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {activity.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none">
                  <span className="font-medium">{activity.user?.name || 'Usuário'}</span>
                  {' '}{activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
          {(!activities || activities.length === 0) && (
            <p className="text-sm text-muted-foreground">Nenhuma atividade recente.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}