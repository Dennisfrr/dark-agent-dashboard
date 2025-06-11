import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Calendar, Target, Plus } from "lucide-react";

const vendasData = [
  {
    id: 1,
    cliente: "Enterprise Co",
    valor: "R$ 120.000",
    data: "2024-01-15",
    vendedor: "Carlos Silva",
    status: "Fechada",
    produto: "Software CRM Premium"
  },
  {
    id: 2,
    cliente: "Tech Solutions",
    valor: "R$ 85.000",
    data: "2024-01-12",
    vendedor: "Ana Santos",
    status: "Fechada",
    produto: "Consultoria Digital"
  },
  {
    id: 3,
    cliente: "Innovation Ltd",
    valor: "R$ 95.000",
    data: "2024-01-10",
    vendedor: "Pedro Costa",
    status: "Fechada",
    produto: "Sistema de Automação"
  }
];

const metasMensais = [
  { vendedor: "Carlos Silva", meta: "R$ 150.000", realizado: "R$ 180.000", percentual: 120 },
  { vendedor: "Ana Santos", meta: "R$ 120.000", realizado: "R$ 110.000", percentual: 92 },
  { vendedor: "Pedro Costa", meta: "R$ 100.000", realizado: "R$ 125.000", percentual: 125 },
];

const Vendas = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
            <p className="text-muted-foreground">Acompanhe suas vendas e performance</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nova Venda
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-success mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">R$ 300.000</div>
                  <p className="text-muted-foreground text-sm">Vendas do Mês</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">+15%</div>
                  <p className="text-muted-foreground text-sm">Crescimento</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-warning mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">105%</div>
                  <p className="text-muted-foreground text-sm">Meta Atingida</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-accent mr-3" />
                <div>
                  <div className="text-2xl font-bold text-foreground">23</div>
                  <p className="text-muted-foreground text-sm">Vendas Fechadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Metas da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metasMensais.map((meta, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{meta.vendedor}</span>
                      <Badge variant={meta.percentual >= 100 ? "default" : "secondary"}>
                        {meta.percentual}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(meta.percentual, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Meta: {meta.meta}</span>
                      <span>Realizado: {meta.realizado}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendasData.map((venda) => (
                  <div key={venda.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{venda.cliente}</h4>
                      <p className="text-sm text-muted-foreground">{venda.produto}</p>
                      <p className="text-xs text-muted-foreground">{venda.vendedor} • {venda.data}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-success">{venda.valor}</div>
                      <Badge variant="outline" className="text-xs">
                        {venda.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CRMLayout>
  );
};

export default Vendas;