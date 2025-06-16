import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar, Target, Loader2 } from "lucide-react";
import { vendasService } from "@/services/vendas";
import { AnalyticsOverview, Lead } from "@/services/types";
import { format } from 'date-fns';

const Vendas = () => {
  const [overview, setOverview] = React.useState<AnalyticsOverview | null>(null);
  const [ultimasVendas, setUltimasVendas] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, vendasData] = await Promise.all([
          vendasService.getVendasOverview(),
          vendasService.getUltimasVendas(5)
        ]);
        setOverview(overviewData);
        setUltimasVendas(vendasData);
      } catch (err) {
        setError("Falha ao carregar os dados de vendas.");
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
            <h1 className="text-3xl font-bold text-foreground">Visão Geral de Vendas</h1>
            <p className="text-muted-foreground">Métricas sobre leads convertidos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-success mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{overview?.activeLeads ?? 0}</div>
                  <p className="text-muted-foreground text-sm">Leads Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-accent mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{overview?.meetingsScheduled ?? 0}</div>
                  <p className="text-muted-foreground text-sm">Reuniões Agendadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-warning mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{overview?.averagePlanSuccessRate ?? 0}%</div>
                  <p className="text-muted-foreground text-sm">Sucesso dos Planos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{overview?.totalReflections ?? 0}</div>
                  <p className="text-muted-foreground text-sm">Reflexões do Agente</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Card de Últimas Vendas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Últimos Leads Convertidos (Reunião Agendada)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ultimasVendas.length > 0 ? ultimasVendas.map((venda) => (
                  <div key={venda.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{venda.name}</h4>
                      <p className="text-sm text-muted-foreground">{venda.currentPlanName}</p>
                      <p className="text-xs text-muted-foreground">
                        Último Contato: {venda.lastContact ? format(new Date(venda.lastContact), 'dd/MM/yyyy HH:mm') : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {venda.status}
                      </Badge>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground text-center p-4">Nenhum lead convertido encontrado.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Vendas;