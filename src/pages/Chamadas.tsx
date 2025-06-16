import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall, Search, Filter, Clock, Play } from "lucide-react";

const chamadasData = [
  {
    id: 1,
    contato: "João Silva",
    numero: "(11) 99999-9999",
    tipo: "Saída",
    duracao: "15:30",
    data: "2024-01-15 14:30",
    status: "Atendida",
    gravacao: true
  },
  {
    id: 2,
    contato: "Maria Santos",
    numero: "(11) 88888-8888",
    tipo: "Entrada",
    duracao: "08:45",
    data: "2024-01-15 11:20",
    status: "Atendida",
    gravacao: true
  },
  {
    id: 3,
    contato: "Pedro Costa",
    numero: "(11) 77777-7777",
    tipo: "Saída",
    duracao: "00:00",
    data: "2024-01-15 09:15",
    status: "Não Atendida",
    gravacao: false
  }
];

const Chamadas = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chamadas</h1>
            <p className="text-muted-foreground">Gerencie suas ligações e histórico</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <PhoneCall className="w-4 h-4 mr-2" />
            Nova Chamada
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">156</div>
                  <p className="text-muted-foreground text-sm">Chamadas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">89%</div>
              <p className="text-muted-foreground text-sm">Taxa de Atendimento</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-warning mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">12:35</div>
                  <p className="text-muted-foreground text-sm">Tempo Médio</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">1,247</div>
              <p className="text-muted-foreground text-sm">Total do Mês</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Histórico de Chamadas</CardTitle>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar chamadas..."
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Número</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Duração</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Data/Hora</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Gravação</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {chamadasData.map((chamada) => (
                    <tr key={chamada.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-foreground">{chamada.contato}</div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{chamada.numero}</td>
                      <td className="py-4 px-4">
                        <Badge variant={chamada.tipo === "Entrada" ? "default" : "secondary"}>
                          {chamada.tipo}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 font-medium text-foreground">{chamada.duracao}</td>
                      <td className="py-4 px-4 text-muted-foreground">{chamada.data}</td>
                      <td className="py-4 px-4">
                        <Badge variant={chamada.status === "Atendida" ? "default" : "destructive"}>
                          {chamada.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        {chamada.gravacao ? (
                          <Button variant="ghost" size="sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Discador Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input 
                  placeholder="Digite o número ou nome do contato"
                  className="text-lg"
                />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
                    <Button 
                      key={digit}
                      variant="outline" 
                      className="h-12 text-lg font-medium"
                    >
                      {digit}
                    </Button>
                  ))}
                </div>
                <Button className="w-full h-12 bg-gradient-primary text-primary-foreground">
                  <PhoneCall className="w-5 h-5 mr-2" />
                  Ligar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contatos Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { nome: "João Silva", numero: "(11) 99999-9999", empresa: "Tech Corp" },
                  { nome: "Maria Santos", numero: "(11) 88888-8888", empresa: "Digital Inc" },
                  { nome: "Pedro Costa", numero: "(11) 77777-7777", empresa: "Innovation Ltd" },
                  { nome: "Ana Oliveira", numero: "(11) 66666-6666", empresa: "Future Tech" }
                ].map((contato, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
                    <div>
                      <div className="font-medium text-foreground">{contato.nome}</div>
                      <div className="text-sm text-muted-foreground">{contato.empresa}</div>
                      <div className="text-sm text-muted-foreground">{contato.numero}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Chamadas;