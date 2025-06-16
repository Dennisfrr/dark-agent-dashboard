import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Plus, MoreVertical, Loader2 } from "lucide-react";
import { leadsService } from "@/services/leads";
import { Lead } from "@/services/types";
import { mapLeadToFunnelStage } from "@/utils/funnel";

// Define os estágios esperados do pipeline.
const STAGES = ["Novo Lead", "Qualificado", "Proposta", "Negociação", "Fechado"];

const Pipeline = () => {
  const [pipelineData, setPipelineData] = React.useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAndGroupLeads = async () => {
      try {
        setLoading(true);
        // @ts-ignore - A API de leads retorna um objeto { data: [...] }, o linter está incorreto.
        const response = await leadsService.getLeads();
        // @ts-ignore
        const leads = response.data || [];
        
        // Agrupa os leads por 'currentPlanStep'
        const groupedByStage: Record<string, Lead[]> = {};
        leads.forEach((lead: Lead) => {
          const stage = mapLeadToFunnelStage(lead as any);
          if (!groupedByStage[stage]) {
            groupedByStage[stage] = [];
          }
          groupedByStage[stage].push(lead);
        });
        
        setPipelineData(groupedByStage);
      } catch (err) {
        setError("Falha ao carregar os dados do pipeline.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndGroupLeads();
  }, []);

  const { totalValue, totalOpportunities, conversionRate } = React.useMemo(() => {
    const allLeads = Object.values(pipelineData).flat();
    const totalVal = allLeads.reduce((sum, lead) => {
      const valueNumeric = parseFloat((lead as any).value?.toString().replace(/[^0-9,-]+/g, "").replace(",", ".") || '0');
      return sum + (isNaN(valueNumeric) ? 0 : valueNumeric);
    }, 0);
    const totalOpp = allLeads.length;
    const closedDeals = (pipelineData['Fechado'] || []).length;
    const convRate = totalOpp > 0 ? (closedDeals / totalOpp) * 100 : 0;
    return { totalValue: totalVal, totalOpportunities: totalOpp, conversionRate: convRate };
  }, [pipelineData]);

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
            <h1 className="text-3xl font-bold text-foreground">Pipeline de Vendas</h1>
            <p className="text-muted-foreground">Visualize e gerencie seu funil de vendas</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nova Oportunidade
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                  <p className="text-muted-foreground text-sm">Pipeline Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">{totalOpportunities}</div>
              <p className="text-muted-foreground text-sm">Oportunidades Ativas</p>
            </CardContent>
          </Card>
           <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">{conversionRate.toFixed(1)}%</div>
              <p className="text-muted-foreground text-sm">Taxa de Conversão</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {STAGES.map((stageName) => {
            const deals = pipelineData[stageName] || [];
            const stageTotal = deals.reduce((sum, lead) => {
               const value = parseFloat(lead.value?.replace(/[^0-9,-]+/g, "").replace(",", ".") || '0');
               return sum + value;
            }, 0);

            return (
              <Card key={stageName} className="h-fit">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stageName}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {deals.length}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {stageTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {deals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm text-foreground">{deal.name}</h4>
                          <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{deal.email}</p>
                        <div className="text-sm font-semibold text-success">
                           {parseFloat(deal.value?.replace(/[^0-9,-]+/g, "").replace(",", ".") || '0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      className="w-full border-2 border-dashed border-border hover:border-primary/50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </CRMLayout>
  );
};

export default Pipeline;