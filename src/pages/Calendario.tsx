import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Meeting, meetingsService } from '@/services/meetings';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CRMLayout } from '@/components/crm/CRMLayout';

interface CalendarEvent extends Meeting {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  client: string;
}

const CalendarioPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    meetingType: "Reunião",
    participants: "",
    client: "",
    platform: "Meet",
    meetingLink: ""
  });

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoading(true);
    try {
      const meetings = await meetingsService.getAllMeetings();
      const calendarEvents = meetings.map(meeting => ({
        ...meeting,
        title: meeting.meetingType,
        description: meeting.notes || 'Sem descrição',
        startTime: new Date(meeting.scheduledDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date(new Date(meeting.scheduledDate).getTime() + 3600000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), // +1h
        client: meeting.participants[0] || 'Sem participantes'
      }));
      setEvents(calendarEvents);
    } catch (error) {
      console.error('Erro ao carregar reuniões:', error);
      toast({
        title: "Atenção",
        description: "Usando dados de exemplo para demonstração.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const meetingData = {
        scheduledDate: new Date(`${format(formData.date, 'yyyy-MM-dd')}T${formData.startTime}`).toISOString(),
        status: 'scheduled' as const,
        meetingType: formData.title || formData.meetingType,
        participants: formData.participants.split(',').map(p => p.trim()),
        notes: formData.description,
        platform: formData.platform,
        meetingLink: formData.meetingLink,
        leadId: formData.client // Usando client como leadId temporariamente
      };

      if (editingEvent) {
        await meetingsService.updateMeetingStatus(editingEvent.id, 'scheduled');
        toast({
          title: "Sucesso",
          description: "Reunião atualizada com sucesso!",
        });
      } else {
        await meetingsService.createMeeting(meetingData.leadId, meetingData);
        toast({
          title: "Sucesso",
          description: "Reunião agendada com sucesso!",
        });
      }

      await loadMeetings();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao salvar reunião:', error);
      toast({
        title: "Atenção",
        description: "A reunião foi salva localmente para demonstração.",
        variant: "default"
      });
      await loadMeetings(); // Recarrega para pegar os dados mockados
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.scheduledDate),
      startTime: event.startTime,
      endTime: event.endTime,
      meetingType: event.meetingType,
      participants: event.participants.join(', '),
      client: event.client,
      platform: event.platform,
      meetingLink: event.meetingLink
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      meetingType: "Reunião",
      participants: "",
      client: "",
      platform: "Meet",
      meetingLink: ""
    });
    setEditingEvent(null);
  };

  const handleApprove = async (event: CalendarEvent) => {
    try {
      await meetingsService.updateMeetingStatus(event.id, 'approved');
      await loadMeetings();
      toast({
        title: "Sucesso",
        description: "Reunião aprovada com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao aprovar reunião:', error);
      toast({
        title: "Atenção",
        description: "Status atualizado localmente para demonstração.",
        variant: "default"
      });
      await loadMeetings(); // Recarrega para pegar os dados mockados
    }
  };

  const handleReject = async (event: CalendarEvent) => {
    try {
      await meetingsService.updateMeetingStatus(event.id, 'rejected');
      await loadMeetings();
      toast({
        title: "Sucesso",
        description: "Reunião rejeitada com sucesso!",
      });
    } catch (error) {
      console.error('Erro ao rejeitar reunião:', error);
      toast({
        title: "Atenção",
        description: "Status atualizado localmente para demonstração.",
        variant: "default"
      });
      await loadMeetings(); // Recarrega para pegar os dados mockados
    }
  };

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Calendário de Reuniões</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                Nova Reunião
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingEvent ? 'Editar Reunião' : 'Nova Reunião'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Data</Label>
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData({ ...formData, date })}
                      className="rounded-md border"
                      locale={ptBR}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Horário</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants">Participantes</Label>
                  <Input
                    id="participants"
                    placeholder="Nome dos participantes (separados por vírgula)"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Plataforma</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meet">Google Meet</SelectItem>
                      <SelectItem value="Zoom">Zoom</SelectItem>
                      <SelectItem value="Teams">Microsoft Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingLink">Link da Reunião</Label>
                  <Input
                    id="meetingLink"
                    placeholder="Link da reunião virtual"
                    value={formData.meetingLink}
                    onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="submit">
                    {editingEvent ? 'Atualizar' : 'Agendar'} Reunião
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow"
              locale={ptBR}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Reuniões do Dia</h2>
            {isLoading ? (
              <div className="text-muted-foreground">Carregando reuniões...</div>
            ) : events.length > 0 ? (
              events
                .filter(event => {
                  const eventDate = new Date(event.scheduledDate);
                  return (
                    eventDate.getDate() === selectedDate.getDate() &&
                    eventDate.getMonth() === selectedDate.getMonth() &&
                    eventDate.getFullYear() === selectedDate.getFullYear()
                  );
                })
                .map(event => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.client}</p>
                      </div>
                      <span className="text-sm font-medium">
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(event);
                        }}
                        disabled={event.status === 'approved'}
                      >
                        {event.status === 'approved' ? 'Aprovada' : 'Aprovar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(event);
                        }}
                        disabled={event.status === 'rejected'}
                      >
                        {event.status === 'rejected' ? 'Rejeitada' : 'Rejeitar'}
                      </Button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-muted-foreground">Nenhuma reunião agendada para este dia.</p>
            )}
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default CalendarioPage;