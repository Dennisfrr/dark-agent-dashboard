import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Plus, MoreVertical } from "lucide-react";

const pipelineStages = [
  {
    name: "Novo Lead",
    deals: [
      { id: 1, company: "Tech Corp", value: "R$ 25.000", contact: "João Silva" },
      { id: 2, company: "Digital Inc", value: "R$ 15.000", contact: "Maria Santos" }
    ],
    total: "R$ 40.000"
  },
  {
    name: "Qualificado",
    deals: [
      { id: 3, company: "Innovation Ltd", value: "R$ 45.000", contact: "Pedro Costa" },
      { id: 4, company: "Future Tech", value: "R$ 30.000", contact: "Ana Oliveira" }
    ],
    total: "R$ 75.000"
  },
  {
    name: "Proposta",
    deals: [
      { id: 5, company: "StartUp XYZ", value: "R$ 60.000", contact: "Carlos Mendes" }
    ],
    total: "R$ 60.000"
  },
  {
    name: "Negociação",
    deals: [
      { id: 6, company: "Global Solutions", value: "R$ 80.000", contact: "Lucia Fernandes" },
      { id: 7, company: "Smart Business", value: "R$ 35.000", contact: "Roberto Lima" }
    ],
    total: "R$ 115.000"
  },
  {
    name: "Fechado",
    deals: [
      { id: 8, company: "Enterprise Co", value: "R$ 120.000", contact: "Paula Rocha" }
    ],
    total: "R$ 120.000"
  }
];

const Pipeline = () => {
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
                  <div className="text-2xl font-bold text-foreground">R$ 410.000</div>
                  <p className="text-muted-foreground text-sm">Pipeline Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">35%</div>
              <p className="text-muted-foreground text-sm">Taxa de Conversão</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">18</div>
              <p className="text-muted-foreground text-sm">Oportunidades Ativas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {pipelineStages.map((stage, stageIndex) => (
            <Card key={stageIndex} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stage.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {stage.deals.length}
                  </Badge>
                </div>
                <div className="text-lg font-bold text-foreground">{stage.total}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {stage.deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3 bg-muted/50 rounded-lg border border-border hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-foreground">{deal.company}</h4>
                        <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                          <MoreVertical className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{deal.contact}</p>
                      <div className="text-sm font-semibold text-success">{deal.value}</div>
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
          ))}
        </div>
      </div>
    </CRMLayout>
  );
};

export default Pipeline;