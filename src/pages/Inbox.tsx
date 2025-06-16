import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Search, Filter, Clock, User, MessageCircle, Calendar, TrendingUp, FileText } from "lucide-react";
import { useInboxMessages, useInboxStats, useMarkAsRead } from "@/hooks/useInbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InboxMessage } from "@/services/inbox";

const Inbox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todas");
  const navigate = useNavigate();
  
  const { data: messages = [], isLoading: messagesLoading, error: messagesError } = useInboxMessages();
  const { data: stats, isLoading: statsLoading } = useInboxStats();
  const markAsReadMutation = useMarkAsRead();

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5 text-primary-foreground" />;
      case 'chat':
        return <MessageCircle className="w-5 h-5 text-primary-foreground" />;
      case 'meeting':
        return <Calendar className="w-5 h-5 text-primary-foreground" />;
      case 'sale':
        return <TrendingUp className="w-5 h-5 text-primary-foreground" />;
      case 'report':
        return <FileText className="w-5 h-5 text-primary-foreground" />;
      default:
        return <MessageCircle className="w-5 h-5 text-primary-foreground" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Média';
    }
  };

  const handleMessageClick = (message: InboxMessage) => {
    if (message.unread) {
      markAsReadMutation.mutate(message.id);
    }
    
    if (message.type === 'chat' && message.leadId) {
      navigate(`/contatos/${message.leadId}`);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (activeTab) {
      case 'nao-lidas':
        return message.unread;
      case 'emails':
        return message.type === 'email';
      case 'chats':
        return message.type === 'chat';
      case 'todas':
      default:
        return true;
    }
  });

  const renderMessage = (message: InboxMessage) => (
    <div 
      key={message.id} 
      className={`p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
        message.unread ? 'bg-accent/20' : ''
      }`}
      onClick={() => handleMessageClick(message)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            {getMessageIcon(message.type)}
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
                {getPriorityLabel(message.priority)}
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
          {new Date(message.timestamp).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );

  if (messagesError) {
    return (
      <CRMLayout>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Erro ao carregar mensagens</h2>
            <p className="text-muted-foreground">Verifique sua conexão e tente novamente.</p>
          </div>
        </div>
      </CRMLayout>
    );
  }
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
              {statsLoading ? (
                <Skeleton className="h-6 w-8 mb-2" />
              ) : (
                <div className="text-2xl font-bold text-foreground">{stats?.unread || 0}</div>
              )}
              <p className="text-muted-foreground text-sm">Não Lidas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-6 w-8 mb-2" />
              ) : (
                <div className="text-2xl font-bold text-warning">{stats?.highPriority || 0}</div>
              )}
              <p className="text-muted-foreground text-sm">Alta Prioridade</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-6 w-8 mb-2" />
              ) : (
                <div className="text-2xl font-bold text-success">{stats?.totalToday || 0}</div>
              )}
              <p className="text-muted-foreground text-sm">Total Hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {statsLoading ? (
                <Skeleton className="h-6 w-8 mb-2" />
              ) : (
                <div className="text-2xl font-bold text-foreground">{stats?.responseRate || 0}%</div>
              )}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                {messagesLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-64" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map(renderMessage)
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nao-lidas">
            <Card>
              <CardHeader>
                <CardTitle>Mensagens Não Lidas</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-64" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map(renderMessage)
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhuma mensagem não lida</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>E-mails</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-64" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map(renderMessage)
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum e-mail encontrado</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chats">
            <Card>
              <CardHeader>
                <CardTitle>Chats</CardTitle>
              </CardHeader>
              <CardContent>
                {messagesLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Skeleton className="w-10 h-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-64" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredMessages.length > 0 ? (
                      filteredMessages.map(renderMessage)
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhum chat encontrado</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Inbox;