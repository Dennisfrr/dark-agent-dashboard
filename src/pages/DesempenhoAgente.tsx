import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Target, Clock, BarChart3, Zap, MessageCircle } from "lucide-react";

const DesempenhoAgente = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Desempenho do Agente IA</h1>
            <p className="text-muted-foreground">Análise detalhada do desempenho e inteligência do agente</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">87%</div>
                  <p className="text-muted-foreground text-sm">Taxa de Sucesso dos Planos</p>
                </div>
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-success">324</div>
                  <p className="text-muted-foreground text-sm">Interações Hoje</p>
                </div>
                <MessageCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-warning">2.3s</div>
                  <p className="text-muted-foreground text-sm">Tempo Médio de Resposta</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">94%</div>
                  <p className="text-muted-foreground text-sm">Satisfação dos Leads</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="ferramentas">Uso de Ferramentas</TabsTrigger>
            <TabsTrigger value="planos">Sucesso dos Planos</TabsTrigger>
            <TabsTrigger value="taticas">Táticas Eficazes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance por Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Gráfico de Performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Sentimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Positivo</span>
                        <span className="text-sm font-bold text-success">68%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-2/3"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Neutro</span>
                        <span className="text-sm font-bold text-warning">24%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Negativo</span>
                        <span className="text-sm font-bold text-destructive">8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full w-1/12"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ferramentas">
            <Card>
              <CardHeader>
                <CardTitle>Uso de Ferramentas do Agente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tool: "Análise de Sentimento", usage: 324, success: 94 },
                    { tool: "Geração de Propostas", usage: 186, success: 87 },
                    { tool: "Agendamento de Reuniões", usage: 142, success: 91 },
                    { tool: "Pesquisa de Mercado", usage: 98, success: 89 },
                    { tool: "Análise de Concorrentes", usage: 76, success: 92 }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 text-primary mr-3" />
                          <span className="font-medium text-foreground">{item.tool}</span>
                        </div>
                        <Badge variant="outline">{item.success}% sucesso</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{item.usage} usos hoje</span>
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-gradient-primary rounded-full" 
                            style={{ width: `${item.success}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planos">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Sucesso dos Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { plan: "Qualificação de Lead", total: 89, success: 78, rate: 88 },
                    { plan: "Nutrição de Relacionamento", total: 156, success: 142, rate: 91 },
                    { plan: "Fechamento de Venda", total: 43, success: 37, rate: 86 },
                    { plan: "Retenção de Cliente", total: 67, success: 61, rate: 91 },
                    { plan: "Upsell/Cross-sell", total: 34, success: 28, rate: 82 }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-primary mr-3" />
                          <span className="font-medium text-foreground">{item.plan}</span>
                        </div>
                        <Badge variant={item.rate >= 90 ? "default" : item.rate >= 85 ? "secondary" : "outline"}>
                          {item.rate}% sucesso
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>{item.success} de {item.total} planos bem-sucedidos</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-primary rounded-full" 
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="taticas">
            <Card>
              <CardHeader>
                <CardTitle>Táticas Mais Eficazes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tactic: "Personalização baseada em histórico", effectiveness: 94, usage: 234 },
                    { tactic: "Perguntas abertas para descoberta", effectiveness: 91, usage: 189 },
                    { tactic: "Uso de cases de sucesso similares", effectiveness: 89, usage: 156 },
                    { tactic: "Criação de senso de urgência", effectiveness: 87, usage: 142 },
                    { tactic: "Demonstração de ROI específico", effectiveness: 92, usage: 98 }
                  ].map((item, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-foreground">{item.tactic}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="default">{item.effectiveness}% eficaz</Badge>
                          <span className="text-sm text-muted-foreground">{item.usage} usos</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full" 
                          style={{ width: `${item.effectiveness}%` }}
                        />
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

export default DesempenhoAgente;