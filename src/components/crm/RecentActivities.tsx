import { Phone, Mail, Calendar, FileText, UserPlus, DollarSign, MessageSquare, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useMetaRecentActivities } from "@/hooks/useMeta";

const getActivityIcon = (type: string, platform?: string) => {
  switch (type) {
    case 'lead':
      return UserPlus;
    case 'message':
      if (platform === 'messenger') return MessageSquare;
      if (platform === 'whatsapp') return Phone;
      if (platform === 'instagram') return Instagram;
      return Mail;
    case 'call':
      return Phone;
    case 'email':
      return Mail;
    case 'meeting':
      return Calendar;
    case 'proposal':
      return FileText;
    case 'sale':
      return DollarSign;
    default:
      return FileText;
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));
  
  if (diffInMinutes < 1) return "agora";
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d atrás`;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
    case "closed":
    case "read":
      return <Badge className="bg-success/10 text-success">Concluído</Badge>;
    case "sent":
      return <Badge className="bg-info/10 text-info">Enviado</Badge>;
    case "scheduled":
      return <Badge className="bg-warning/10 text-warning">Agendado</Badge>;
    case "pending":
    case "unread":
      return <Badge className="bg-muted text-muted-foreground">Pendente</Badge>;
    case "new":
    case "contacted":
      return <Badge className="bg-primary/10 text-primary">Novo</Badge>;
    case "qualified":
      return <Badge className="bg-success/10 text-success">Qualificado</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPlatformBadge = (platform?: string) => {
  if (!platform) return null;
  
  const platformConfig = {
    facebook: { label: 'FB', color: 'bg-blue-500/10 text-blue-600' },
    instagram: { label: 'IG', color: 'bg-pink-500/10 text-pink-600' },
    messenger: { label: 'MSG', color: 'bg-blue-600/10 text-blue-700' },
    whatsapp: { label: 'WA', color: 'bg-green-500/10 text-green-600' },
  };
  
  const config = platformConfig[platform as keyof typeof platformConfig];
  if (!config) return null;
  
  return (
    <Badge className={`${config.color} text-xs px-1 py-0`}>
      {config.label}
    </Badge>
  );
};

export function RecentActivities() {
  const { data: activities, isLoading, error } = useMetaRecentActivities();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes (Meta)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-start space-x-3 p-3">
                <Skeleton className="w-8 h-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
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
          <CardTitle>Atividades Recentes (Meta)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Nenhuma atividade recente encontrada</p>
            <p className="text-xs">Dados serão sincronizados automaticamente</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Atividades Recentes (Meta)</span>
          <Badge variant="outline" className="text-xs">
            {activities.length} atividades
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type, activity.platform);
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg bg-${activity.color}/10 flex items-center justify-center`}>
                    <IconComponent className={`w-4 h-4 text-${activity.color}`} />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      {activity.description}
                      {getPlatformBadge(activity.platform)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity.time)}
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