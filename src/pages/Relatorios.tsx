import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Calendar, Filter, Loader2 } from "lucide-react";
import { relatoriosService } from "@/services/relatorios";
import { AnalyticsOverview } from "@/services/types";

const Relatorios = () => {
  const [overview, setOverview] = React.useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const overviewData = await relatoriosService.getRelatoriosOverview();
        setOverview(overviewData);
      } catch (err) {
        setError("Falha ao carregar os dados dos relatórios.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <CRMLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </CRMLayout>
    );
  }

  if (error) {
    return (
      <CRMLayout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </CRMLayout>
    );
  }

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">Análises e insights do seu negócio</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button className="bg-gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview?.activeLeads ?? 'N/A'}</div>
              <p className="text-xs text-muted-foreground">
                Total de leads em andamento
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sucesso dos Planos</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview?.averagePlanSuccessRate ?? 'N/A'}%</div>
              <p className="text-xs text-muted-foreground">
                Média de sucesso dos planos de ação
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reuniões Agendadas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{overview?.meetingsScheduled ?? 'N/A'}</div>
              <p className="text-xs text-muted-foreground">
                Total de leads convertidos em reuniões
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Predefinidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Análise de Performance do Agente",
                  "Eficácia de Táticas de Venda",
                  "Distribuição de Sentimento dos Leads",
                  "Uso de Ferramentas pelo Agente",
                  "Funil de Conversão de Leads",
                  "Análise da Base de Conhecimento"
                ].map((relatorio, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center">
                      <BarChart3 className="w-5 h-5 text-primary mr-3" />
                      <span className="font-medium text-foreground">{relatorio}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Leads Ativos</span>
                    <span className="text-sm font-bold text-foreground">{overview?.activeLeads ?? 0}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Reuniões Agendadas</span>
                    <span className="text-sm font-bold text-foreground">{overview?.meetingsScheduled ?? 0}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Sucesso dos Planos (%)</span>
                    <span className="text-sm font-bold text-foreground">{overview?.averagePlanSuccessRate ?? 0}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Total de Reflexões do Agente</span>
                    <span className="text-sm font-bold text-foreground">{overview?.totalReflections ?? 0}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Relatorios;