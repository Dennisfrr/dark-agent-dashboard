import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const pipelineStages = [
  { stage: "Prospecção", value: 45, deals: 12, color: "info" },
  { stage: "Qualificação", value: 32, deals: 8, color: "warning" },
  { stage: "Proposta", value: 18, deals: 5, color: "primary" },
  { stage: "Negociação", value: 12, deals: 3, color: "success" },
  { stage: "Fechamento", value: 8, deals: 2, color: "destructive" },
];

export function SalesPipeline() {
  return (
    <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
      <CardHeader>
        <CardTitle>Pipeline de Vendas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pipelineStages.map((stage) => (
          <div key={stage.stage} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{stage.stage}</span>
                <Badge variant="secondary" className="text-xs">
                  {stage.deals} deals
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{stage.value}%</span>
            </div>
            <Progress 
              value={stage.value} 
              className="h-2"
            />
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold">R$ 185.420</div>
              <div className="text-sm text-muted-foreground">Valor total no pipeline</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-success">78%</div>
              <div className="text-sm text-muted-foreground">Taxa de conversão</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}