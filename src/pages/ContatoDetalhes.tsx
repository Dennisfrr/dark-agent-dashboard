import { useParams } from "react-router-dom";
import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, MessageCircle, User, Mail, Phone, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLead, useLeadIntelligence, useChatHistory } from "@/hooks/useLeads";

const ContatoDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { data: contato, isLoading: loadingLead, error: leadError } = useLead(id || '');
  const [activeTab, setActiveTab] = React.useState('conversa');
  
  // Carregar dados de inteligência apenas quando a aba 'agente' estiver ativa
  const [hypotheses, reflections, plannerHistory] = useLeadIntelligence(id || '', activeTab === 'agente');
  
  // Carregar histórico de chat apenas quando a aba 'conversa' estiver ativa
  const { data: chatHistory, isLoading: loadingChat } = useChatHistory(id || '', activeTab === 'conversa');

  if (loadingLead) {
    return (
      <CRMLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="ml-2">Carregando...</p>
        </div>
      </CRMLayout>
    );
  }

  if (leadError) {
    return (
      <CRMLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">Falha ao carregar os dados do lead.</p>
        </div>
      </CRMLayout>
    );
  }

  if (!contato) {
    return (
      <CRMLayout>
        <div className="text-center p-6">
          <p>Lead não encontrado.</p>
        </div>
      </CRMLayout>
    );
  }

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link to="/contatos">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{contato.name}</h1>
            <p className="text-muted-foreground">
              {contato.currentPlanName} - {contato.currentPlanStep} ({contato.currentPlanStatus})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Central - Abas Detalhadas */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="conversa">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Conversa
                </TabsTrigger>
                <TabsTrigger value="agente">
                  <Brain className="w-4 h-4 mr-2" />
                  Cérebro do Agente
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversa">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Conversas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingChat ? (
                      <div className="flex items-center justify-center p-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <p className="ml-2">Carregando conversas...</p>
                      </div>
                    ) : chatHistory && chatHistory.length > 0 ? (
                      <div className="space-y-4">
                        {chatHistory.map((msg, index) => (
                          <div key={index} className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-muted/50' : 'bg-primary/10'}`}>
                            <div className="font-medium text-foreground mb-2">
                              {msg.role === 'user' ? contato.name : 'Agente IA'}
                            </div>
                            <p className="text-muted-foreground">{msg.parts?.[0]?.text || msg.text}</p>
                            <span className="text-xs text-muted-foreground">{new Date(msg.timestamp).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-muted-foreground">
                        Nenhuma conversa encontrada.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="agente">
                <div className="space-y-6">
                  {/* Resumo da Situação */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resumo da Situação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{contato.ultimoResumoDaSituacao || 'Nenhum resumo disponível.'}</p>
                    </CardContent>
                  </Card>

                  {/* Últimas Hipóteses do Agente */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Últimas Hipóteses do Agente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {hypotheses.isLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : hypotheses.data && hypotheses.data.length > 0 ? (
                        hypotheses.data.map((hipotese, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-foreground">{hipotese.interpretation}</p>
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-muted-foreground mr-2">Confiança:</span>
                              <Badge variant="outline">{hipotese.confidence}%</Badge>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhuma hipótese encontrada.</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Últimas Reflexões do Agente */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Últimas Reflexões do Agente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {reflections.isLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : reflections.data && reflections.data.length > 0 ? (
                        reflections.data.map((reflexao, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-foreground">{reflexao.summary}</p>
                            <Badge variant="secondary" className="mt-2">{reflexao.focusType}</Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhuma reflexão encontrada.</p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Histórico Recente do Plano */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Histórico Recente do Plano</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {plannerHistory.isLoading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      ) : plannerHistory.data && plannerHistory.data.length > 0 ? (
                        plannerHistory.data.map((step, index) => (
                          <div key={index} className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground">{step.stepName}</span>
                              <Badge variant={step.status === "Concluído" ? "default" : "secondary"}>
                                {step.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{step.details}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Nenhum histórico de plano encontrado.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Coluna da Direita - Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{contato.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{contato.phone}</span>
                </div>
                {contato.businessName && (
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium">Empresa</p>
                    <p className="text-sm text-muted-foreground">{contato.businessName}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default ContatoDetalhes;