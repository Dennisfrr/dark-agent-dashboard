import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Search, Filter, Clock, User, MessageCircle } from "lucide-react";

const inboxData = [
  {
    id: 1,
    type: "email",
    from: "joao@email.com",
    subject: "Interesse em CRM",
    preview: "Olá, gostaria de saber mais sobre suas soluções...",
    timestamp: "2024-01-15 14:30",
    unread: true,
    priority: "high"
  },
  {
    id: 2,
    type: "chat",
    from: "Maria Santos",
    subject: "Chat em andamento",
    preview: "Quando podemos agendar uma demonstração?",
    timestamp: "2024-01-15 13:45",
    unread: true,
    priority: "medium"
  },
  {
    id: 3,
    type: "email",
    from: "pedro@empresa.com",
    subject: "Proposta comercial",
    preview: "Recebemos sua proposta e gostaríamos de discutir...",
    timestamp: "2024-01-15 12:20",
    unread: false,
    priority: "low"
  }
];

const Inbox = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Caixa de Entrada Unificada</h1>
            <p className="text-muted-foreground">Todas as suas comunicações em um só lugar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-muted-foreground text-sm">Não Lidas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">8</div>
              <p className="text-muted-foreground text-sm">Alta Prioridade</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">156</div>
              <p className="text-muted-foreground text-sm">Total Hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">98%</div>
              <p className="text-muted-foreground text-sm">Taxa de Resposta</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar mensagens..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="todas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="nao-lidas">Não Lidas</TabsTrigger>
            <TabsTrigger value="emails">E-mails</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todas">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Mensagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inboxData.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                        message.unread ? 'bg-accent/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            {message.type === "email" ? (
                              <Mail className="w-5 h-5 text-primary-foreground" />
                            ) : (
                              <MessageCircle className="w-5 h-5 text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {message.from}
                              </span>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">Nova</Badge>
                              )}
                              <Badge 
                                variant={message.priority === 'high' ? 'destructive' : message.priority === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {message.priority === 'high' ? 'Alta' : message.priority === 'medium' ? 'Média' : 'Baixa'}
                              </Badge>
                            </div>
                            <h4 className={`font-medium mb-1 ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {message.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground">{message.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nao-lidas">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens Não Lidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inboxData.filter(m => m.unread).map((message) => (
                    <div 
                      key={message.id} 
                      className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors bg-accent/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            {message.type === "email" ? (
                              <Mail className="w-5 h-5 text-primary-foreground" />
                            ) : (
                              <MessageCircle className="w-5 h-5 text-primary-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-foreground">{message.from}</span>
                              <Badge variant="default" className="text-xs">Nova</Badge>
                            </div>
                            <h4 className="font-medium text-foreground mb-1">{message.subject}</h4>
                            <p className="text-sm text-muted-foreground">{message.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>E-mails</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inboxData.filter(m => m.type === 'email').map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                        message.unread ? 'bg-accent/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {message.from}
                              </span>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">Nova</Badge>
                              )}
                            </div>
                            <h4 className={`font-medium mb-1 ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {message.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground">{message.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chats">
            <Card>
              <CardHeader>
                <CardTitle>Chats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inboxData.filter(m => m.type === 'chat').map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                        message.unread ? 'bg-accent/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {message.from}
                              </span>
                              {message.unread && (
                                <Badge variant="default" className="text-xs">Nova</Badge>
                              )}
                            </div>
                            <h4 className={`font-medium mb-1 ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {message.subject}
                            </h4>
                            <p className="text-sm text-muted-foreground">{message.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Inbox;