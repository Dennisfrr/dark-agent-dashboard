import { Phone, Mail, Calendar, FileText, UserPlus, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "call",
    description: "Ligação com Maria Santos",
    time: "2 min atrás",
    status: "completed",
    icon: Phone,
    color: "success"
  },
  {
    id: 2,
    type: "email",
    description: "E-mail enviado para João Silva",
    time: "15 min atrás",
    status: "sent",
    icon: Mail,
    color: "info"
  },
  {
    id: 3,
    type: "meeting",
    description: "Reunião agendada com Ana Costa",
    time: "1 hora atrás",
    status: "scheduled",
    icon: Calendar,
    color: "warning"
  },
  {
    id: 4,
    type: "proposal",
    description: "Proposta enviada para TechCorp",
    time: "2 horas atrás",
    status: "pending",
    icon: FileText,
    color: "primary"
  },
  {
    id: 5,
    type: "lead",
    description: "Novo lead: Pedro Oliveira",
    time: "3 horas atrás",
    status: "new",
    icon: UserPlus,
    color: "success"
  },
  {
    id: 6,
    type: "sale",
    description: "Venda fechada: R$ 25.000",
    time: "4 horas atrás",
    status: "closed",
    icon: DollarSign,
    color: "success"
  }
];

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

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-${activity.color}/10 flex items-center justify-center`}>
                  <activity.icon className={`w-4 h-4 text-${activity.color}`} />
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}