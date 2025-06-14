import { TrendingUp, TrendingDown, Users, Target, DollarSign, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsOverview } from "@/hooks/useAnalytics";
import { formatCurrency, formatNumber, formatPercentage } from "@/utils/formatters";

export function MetricsCards() {
  const { data: overview, isLoading, error } = useAnalyticsOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-full">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Erro ao carregar métricas</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metrics = [
    {
      title: "Receita Total",
      value: formatCurrency(overview.totalRevenue),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "success"
    },
    {
      title: "Novos Leads",
      value: formatNumber(overview.newLeads),
      change: "+8.2%",
      trend: "up",
      icon: UserPlus,
      color: "info"
    },
    {
      title: "Conversões",
      value: formatNumber(overview.conversions),
      change: "+23.1%",
      trend: "up",
      icon: Target,
      color: "primary"
    },
    {
      title: "Clientes Ativos",
      value: formatNumber(overview.activeClients),
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "warning"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 shine-effect">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg bg-${metric.color}/10 flex items-center justify-center`}>
              <metric.icon className={`w-4 h-4 text-${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
                {metric.change}
              </span>
              <span className="text-muted-foreground">vs. mês anterior</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}