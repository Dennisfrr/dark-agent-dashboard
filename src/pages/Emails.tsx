import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Search, Filter, Paperclip, Users } from "lucide-react";

const emailsData = [
  {
    id: 1,
    remetente: "Carlos Silva",
    destinatario: "joao@empresaabc.com",
    assunto: "Proposta Comercial - Software CRM",
    data: "2024-01-15 14:30",
    status: "Enviado",
    lido: true
  },
  {
    id: 2,
    remetente: "Ana Santos",
    destinatario: "maria@techsolutions.com",
    assunto: "Follow-up - Reunião de Apresentação",
    data: "2024-01-15 10:15",
    status: "Enviado",
    lido: false
  },
  {
    id: 3,
    remetente: "Pedro Costa",
    destinatario: "pedro@inovacao.com",
    assunto: "Agendamento de Demonstração",
    data: "2024-01-14 16:45",
    status: "Respondido",
    lido: true
  }
];

const templateEmails = [
  "Primeiro Contato",
  "Follow-up",
  "Proposta Comercial",
  "Agendamento de Reunião",
  "Pós-Venda",
  "Cobrança Amigável"
];

const Emails = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-mails</h1>
            <p className="text-muted-foreground">Gerencie suas comunicações por e-mail</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Send className="w-4 h-4 mr-2" />
            Novo E-mail
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">1,247</div>
                  <p className="text-muted-foreground text-sm">E-mails Enviados</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">78%</div>
              <p className="text-muted-foreground text-sm">Taxa de Abertura</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">45%</div>
              <p className="text-muted-foreground text-sm">Taxa de Resposta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-muted-foreground text-sm">E-mails Hoje</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Caixa de E-mails</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Buscar e-mails..."
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
                <div className="space-y-3">
                  {emailsData.map((email) => (
                    <div key={email.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{email.remetente}</span>
                          <span className="text-xs text-muted-foreground">{email.data}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-1">{email.destinatario}</div>
                        <div className="font-medium text-sm text-foreground">{email.assunto}</div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant={email.status === "Respondido" ? "default" : "secondary"}>
                          {email.status}
                        </Badge>
                        {!email.lido && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Novo E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Para:</label>
                    <Input placeholder="email@exemplo.com" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Assunto:</label>
                    <Input placeholder="Assunto do e-mail" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Mensagem:</label>
                    <Textarea 
                      placeholder="Digite sua mensagem..." 
                      className="mt-1 min-h-32"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-primary text-primary-foreground">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </Button>
                    <Button variant="outline">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templateEmails.map((template, index) => (
                    <Button 
                      key={index}
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {template}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campanhas Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium text-sm text-foreground">Newsletter Mensal</div>
                    <div className="text-xs text-muted-foreground">500 destinatários</div>
                    <div className="flex items-center mt-2">
                      <Users className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">85% entregue</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium text-sm text-foreground">Follow-up Automático</div>
                    <div className="text-xs text-muted-foreground">120 destinatários</div>
                    <div className="flex items-center mt-2">
                      <Users className="w-3 h-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">92% entregue</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Emails;