import { useState } from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, Users, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Evento {
  id: number;
  titulo: string;
  descricao?: string;
  data: Date;
  horaInicio: string;
  horaFim: string;
  tipo: "Reunião" | "Demonstração" | "Call" | "Follow-up";
  participantes: string[];
  status: "Confirmado" | "Pendente" | "Cancelado";
  cliente?: string;
}

const eventosIniciais: Evento[] = [
  {
    id: 1,
    titulo: "Reunião com Cliente ABC",
    descricao: "Discussão sobre nova proposta",
    data: new Date(2024, 0, 15),
    horaInicio: "09:00",
    horaFim: "10:00",
    tipo: "Reunião",
    participantes: ["João Silva", "Maria Santos"],
    status: "Confirmado",
    cliente: "Cliente ABC"
  },
  {
    id: 2,
    titulo: "Demo do Produto - Tech Corp",
    descricao: "Apresentação das funcionalidades",
    data: new Date(2024, 0, 15),
    horaInicio: "14:30",
    horaFim: "15:15",
    tipo: "Demonstração",
    participantes: ["Pedro Costa"],
    status: "Pendente",
    cliente: "Tech Corp"
  },
  {
    id: 3,
    titulo: "Follow-up Innovation Ltd",
    descricao: "Acompanhamento do projeto",
    data: new Date(2024, 0, 15),
    horaInicio: "16:00",
    horaFim: "16:30",
    tipo: "Call",
    participantes: ["Ana Oliveira"],
    status: "Confirmado",
    cliente: "Innovation Ltd"
  }
];

const CalendarioPage = () => {
  const [eventos, setEventos] = useState<Evento[]>(eventosIniciais);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    data: new Date(),
    horaInicio: "",
    horaFim: "",
    tipo: "Reunião" as Evento["tipo"],
    participantes: "",
    cliente: ""
  });

  const resetForm = () => {
    setFormData({
      titulo: "",
      descricao: "",
      data: new Date(),
      horaInicio: "",
      horaFim: "",
      tipo: "Reunião",
      participantes: "",
      cliente: ""
    });
    setEditingEvent(null);
  };

  const handleSaveEvent = () => {
    if (!formData.titulo || !formData.horaInicio || !formData.horaFim) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const newEvent: Evento = {
      id: editingEvent ? editingEvent.id : Date.now(),
      titulo: formData.titulo,
      descricao: formData.descricao,
      data: formData.data,
      horaInicio: formData.horaInicio,
      horaFim: formData.horaFim,
      tipo: formData.tipo,
      participantes: formData.participantes.split(",").map(p => p.trim()).filter(p => p),
      status: "Confirmado",
      cliente: formData.cliente
    };

    if (editingEvent) {
      setEventos(eventos.map(e => e.id === editingEvent.id ? newEvent : e));
      toast({
        title: "Sucesso",
        description: "Evento atualizado com sucesso!"
      });
    } else {
      setEventos([...eventos, newEvent]);
      toast({
        title: "Sucesso", 
        description: "Evento criado com sucesso!"
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEditEvent = (evento: Evento) => {
    setEditingEvent(evento);
    setFormData({
      titulo: evento.titulo,
      descricao: evento.descricao || "",
      data: evento.data,
      horaInicio: evento.horaInicio,
      horaFim: evento.horaFim,
      tipo: evento.tipo,
      participantes: evento.participantes.join(", "),
      cliente: evento.cliente || ""
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEventos(eventos.filter(e => e.id !== eventId));
    toast({
      title: "Sucesso",
      description: "Evento excluído com sucesso!"
    });
  };

  const getEventosDoMes = () => {
    return eventos.filter(evento => 
      evento.data.getMonth() === currentMonth.getMonth() &&
      evento.data.getFullYear() === currentMonth.getFullYear()
    );
  };

  const getEventosDoDia = (data: Date) => {
    return eventos.filter(evento => 
      evento.data.toDateString() === data.toDateString()
    );
  };

  const eventosHoje = getEventosDoDia(new Date());
  const eventosDoMes = getEventosDoMes();

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Calendário</h1>
            <p className="text-muted-foreground">Gerencie seus compromissos e reuniões</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Editar Evento" : "Novo Evento"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    placeholder="Título do evento"
                  />
                </div>
                
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    placeholder="Descrição do evento"
                  />
                </div>

                <div>
                  <Label>Data *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.data ? format(formData.data, "PPP") : "Selecione a data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.data}
                        onSelect={(date) => date && setFormData({...formData, data: date})}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="horaInicio">Hora Início *</Label>
                    <Input
                      id="horaInicio"
                      type="time"
                      value={formData.horaInicio}
                      onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="horaFim">Hora Fim *</Label>
                    <Input
                      id="horaFim"
                      type="time"
                      value={formData.horaFim}
                      onChange={(e) => setFormData({...formData, horaFim: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Tipo</Label>
                  <Select value={formData.tipo} onValueChange={(value: Evento["tipo"]) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reunião">Reunião</SelectItem>
                      <SelectItem value="Demonstração">Demonstração</SelectItem>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                    placeholder="Nome do cliente"
                  />
                </div>

                <div>
                  <Label htmlFor="participantes">Participantes</Label>
                  <Input
                    id="participantes"
                    value={formData.participantes}
                    onChange={(e) => setFormData({...formData, participantes: e.target.value})}
                    placeholder="Separe por vírgulas"
                  />
                </div>

                <Button onClick={handleSaveEvent} className="w-full">
                  {editingEvent ? "Atualizar" : "Criar"} Evento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CalendarIcon className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{eventosHoje.length}</div>
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
                  <div className="text-2xl font-bold text-foreground">{eventosDoMes.length}</div>
                  <p className="text-muted-foreground text-sm">Este Mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">{eventos.filter(e => e.status === "Pendente").length}</div>
              <p className="text-muted-foreground text-sm">Pendentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{eventos.filter(e => e.status === "Confirmado").length}</div>
              <p className="text-muted-foreground text-sm">Confirmados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentMonth(new Date())}
                    >
                      Hoje
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="w-full"
                  components={{
                    Day: ({ date, ...props }) => {
                      const eventosNoDia = getEventosDoDia(date);
                      const isToday = date.toDateString() === new Date().toDateString();
                      
                      return (
                        <div
                          {...props}
                          className={cn(
                            "relative p-2 h-12 border border-border/50 cursor-pointer hover:bg-muted/50",
                            isToday && "bg-primary text-primary-foreground",
                            eventosNoDia.length > 0 && "bg-gradient-primary/10"
                          )}
                        >
                          <div className="text-sm">{date.getDate()}</div>
                          {eventosNoDia.length > 0 && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eventos de {format(selectedDate, "dd/MM")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventosDoDia(selectedDate).length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum evento agendado</p>
                  ) : (
                    getEventosDoDia(selectedDate).map((evento) => (
                      <div key={evento.id} className="p-3 border border-border rounded-lg hover:bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm text-foreground">{evento.titulo}</div>
                          <div className="flex items-center space-x-1">
                            <Badge variant={evento.status === "Confirmado" ? "default" : "secondary"}>
                              {evento.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditEvent(evento)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-destructive"
                              onClick={() => handleDeleteEvent(evento.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <Clock className="w-3 h-3 mr-1" />
                          {evento.horaInicio} - {evento.horaFim}
                        </div>
                        {evento.participantes.length > 0 && (
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <Users className="w-3 h-3 mr-1" />
                            {evento.participantes.join(", ")}
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {evento.tipo}
                        </Badge>
                        {evento.cliente && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Cliente: {evento.cliente}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventos
                    .filter(evento => evento.data >= new Date())
                    .sort((a, b) => a.data.getTime() - b.data.getTime())
                    .slice(0, 5)
                    .map((evento) => (
                      <div key={evento.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
                        <div>
                          <div className="font-medium text-sm text-foreground">{evento.titulo}</div>
                          <div className="text-xs text-muted-foreground">{evento.cliente}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium text-foreground">{format(evento.data, "dd MMM")}</div>
                          <div className="text-xs text-muted-foreground">{evento.horaInicio}</div>
                        </div>
                      </div>
                    ))}
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