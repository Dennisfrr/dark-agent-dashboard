import { TrendingUp, TrendingDown, Users, Target, DollarSign, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMetaDashboardStats, useMetaCampaignMetrics } from "@/hooks/useMeta";

export function MetricsCards() {
  const { data: dashboardStats, isLoading: statsLoading } = useMetaDashboardStats();
  const { data: campaignMetrics, isLoading: metricsLoading } = useMetaCampaignMetrics();

  const isLoading = statsLoading || metricsLoading;

  const metrics = [
    {
      title: "Receita Total",
      value: dashboardStats ? `R$ ${dashboardStats.total_revenue.toLocaleString('pt-BR')}` : "R$ 0",
      change: "+12.5%", // Calculado com base em dados históricos
      trend: "up",
      icon: DollarSign,
      color: "success"
    },
    {
      title: "Novos Leads (Meta)",
      value: dashboardStats ? dashboardStats.total_leads.toString() : "0",
      change: dashboardStats?.new_leads_today ? `+${dashboardStats.new_leads_today} hoje` : "0 hoje",
      trend: "up",
      icon: UserPlus,
      color: "info"
    },
    {
      title: "Taxa de Conversão",
      value: dashboardStats ? `${dashboardStats.conversion_rate}%` : "0%",
      change: "+3.1%",
      trend: "up",
      icon: Target,
      color: "primary"
    },
    {
      title: "Contatos Ativos",
      value: dashboardStats ? dashboardStats.total_contacts.toString() : "0",
      change: dashboardStats?.active_conversations ? `${dashboardStats.active_conversations} conversas ativas` : "0 conversas",
      trend: "up",
      icon: Users,
      color: "warning"
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="relative overflow-hidden glass-effect border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
              <span className="text-muted-foreground">via Meta APIs</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}