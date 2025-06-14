import { Phone, Mail, Calendar, FileText, UserPlus, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentActivities } from "@/hooks/useAnalytics";
import { getStatusLabel } from "@/utils/formatters";

export function RecentActivities() {
  const { data: activities, isLoading, error } = useRecentActivities();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !activities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Erro ao carregar atividades</p>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const color = getActivityColor(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-${color}/10 flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 text-${color}`} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium">
                      {activity.description}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}