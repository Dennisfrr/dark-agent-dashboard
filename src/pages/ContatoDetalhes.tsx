import { useParams } from "react-router-dom";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, MessageCircle, User, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContatoDetalhes = () => {
  const { id } = useParams();

  // Mock data - será substituído por chamada à API
  const contato = {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    currentPlanName: "Qualificação de Lead",
    currentPlanStep: "Análise Inicial",
    currentPlanStatus: "Em Andamento",
    ultimoResumoDaSituacao: "Lead demonstrou interesse em solução de CRM, aguardando proposta personalizada.",
    recentHypothesesSummary: [
      { interpretation: "Lead tem orçamento adequado", confidence: 85 },
      { interpretation: "Necessita de implementação rápida", confidence: 72 }
    ],
    recentReflectionsSummary: [
      { summary: "Foco em benefícios de ROI", focusType: "estratégia" },
      { summary: "Destacar facilidade de uso", focusType: "produto" }
    ],
    plannerHistorySummary: [
      { stepName: "Primeiro Contato", status: "Concluído", details: "Lead respondeu positivamente" },
      { stepName: "Análise de Necessidades", status: "Em Andamento", details: "Coletando informações sobre empresa" }
    ]
  };

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
            <Tabs defaultValue="conversa" className="w-full">
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
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="font-medium text-foreground mb-2">João Silva</div>
                        <p className="text-muted-foreground">Olá, gostaria de saber mais sobre suas soluções de CRM...</p>
                        <span className="text-xs text-muted-foreground">15/01/2024 14:30</span>
                      </div>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="font-medium text-foreground mb-2">Agente IA</div>
                        <p className="text-muted-foreground">Olá João! Fico feliz em ajudar. Pode me contar um pouco sobre sua empresa e suas necessidades atuais?</p>
                        <span className="text-xs text-muted-foreground">15/01/2024 14:32</span>
                      </div>
                      <Button className="w-full" variant="outline">
                        Carregar conversa completa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="agente">
                <Card>
                  <CardHeader>
                    <CardTitle>Timeline do Agente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-8">
                        <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Carregue o histórico completo para ver toda a análise do agente IA
                        </p>
                        <Button>
                          Carregar histórico completo do agente
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Coluna da Direita - Painéis de Inteligência */}
          <div className="space-y-6">
            {/* Informações de Contato */}
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
              </CardContent>
            </Card>

            {/* Resumo da Situação */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Situação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{contato.ultimoResumoDaSituacao}</p>
              </CardContent>
            </Card>

            {/* Últimas Hipóteses do Agente */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Hipóteses do Agente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contato.recentHypothesesSummary.map((hipotese, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-foreground">{hipotese.interpretation}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-muted-foreground mr-2">Confiança:</span>
                      <Badge variant="outline">{hipotese.confidence}%</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Últimas Reflexões do Agente */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Reflexões do Agente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contato.recentReflectionsSummary.map((reflexao, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium text-foreground">{reflexao.summary}</p>
                    <Badge variant="secondary" className="mt-2">{reflexao.focusType}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Histórico Recente do Plano */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico Recente do Plano</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contato.plannerHistorySummary.map((step, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{step.stepName}</span>
                      <Badge variant={step.status === "Concluído" ? "default" : "secondary"}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.details}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CRMLayout>
  );
};

export default ContatoDetalhes;