import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, Users } from "lucide-react";

const eventosData = [
  {
    id: 1,
    titulo: "Reunião com Cliente ABC",
    hora: "09:00",
    duracao: "1h",
    tipo: "Reunião",
    participantes: ["João Silva", "Maria Santos"],
    status: "Confirmado"
  },
  {
    id: 2,
    titulo: "Demo do Produto - Tech Corp",
    hora: "14:30",
    duracao: "45min",
    tipo: "Demonstração",
    participantes: ["Pedro Costa"],
    status: "Pendente"
  },
  {
    id: 3,
    titulo: "Follow-up Innovation Ltd",
    hora: "16:00",
    duracao: "30min",
    tipo: "Call",
    participantes: ["Ana Oliveira"],
    status: "Confirmado"
  }
];

const proximosEventos = [
  {
    data: "16 Jan",
    titulo: "Apresentação Proposta",
    hora: "10:00",
    cliente: "Digital Solutions"
  },
  {
    data: "17 Jan",
    titulo: "Reunião de Fechamento",
    hora: "15:00",
    cliente: "Enterprise Co"
  },
  {
    data: "18 Jan",
    titulo: "Demo para Novos Leads",
    hora: "11:30",
    cliente: "StartUp XYZ"
  }
];

const CalendarioPage = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendário</h1>
            <p className="text-muted-foreground">Gerencie seus compromissos e reuniões</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <p className="text-muted-foreground text-sm">Eventos Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-success mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">6h 30m</div>
                  <p className="text-muted-foreground text-sm">Tempo Agendado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">12</div>
              <p className="text-muted-foreground text-sm">Esta Semana</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">45</div>
              <p className="text-muted-foreground text-sm">Este Mês</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Janeiro 2024</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Hoje
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                    <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {dia}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6; // Ajuste para começar no domingo
                    const isToday = day === 15;
                    const hasEvent = [10, 15, 16, 17, 18, 22, 25].includes(day);
                    
                    return (
                      <div
                        key={i}
                        className={`
                          p-2 h-12 border border-border/50 cursor-pointer hover:bg-muted/50
                          ${isToday ? 'bg-primary text-primary-foreground' : ''}
                          ${hasEvent ? 'bg-gradient-primary/10' : ''}
                        `}
                      >
                        {day > 0 && day <= 31 && (
                          <div className="text-sm">
                            {day}
                            {hasEvent && (
                              <div className="w-1 h-1 bg-primary rounded-full mt-1 mx-auto"></div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eventos de Hoje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventosData.map((evento) => (
                    <div key={evento.id} className="p-3 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm text-foreground">{evento.titulo}</div>
                        <Badge variant={evento.status === "Confirmado" ? "default" : "secondary"}>
                          {evento.status}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <Clock className="w-3 h-3 mr-1" />
                        {evento.hora} ({evento.duracao})
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="w-3 h-3 mr-1" />
                        {evento.participantes.join(", ")}
                      </div>
                      <Badge variant="outline" className="text-xs mt-2">
                        {evento.tipo}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {proximosEventos.map((evento, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
                      <div>
                        <div className="font-medium text-sm text-foreground">{evento.titulo}</div>
                        <div className="text-xs text-muted-foreground">{evento.cliente}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-foreground">{evento.data}</div>
                        <div className="text-xs text-muted-foreground">{evento.hora}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Agendar Reunião
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar Demo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Agendar Follow-up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default CalendarioPage;