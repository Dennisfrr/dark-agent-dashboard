import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsOverview } from "@/hooks/useAnalytics";
import { formatNumber, formatPercentage } from "@/utils/formatters";

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

  if (error) {
    console.error('Erro ao carregar métricas:', error);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="col-span-full">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Erro ao carregar métricas. Por favor, tente novamente mais tarde.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const defaultOverview = {
    activeLeads: 0,
    meetingsScheduled: 0,
    averagePlanSuccessRate: 0,
    totalReflections: 0,
    ...overview
  };

  const metrics = [
    {
      title: "Leads Ativos",
      value: formatNumber(defaultOverview.activeLeads),
      icon: Users,
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Reuniões Agendadas",
      value: formatNumber(defaultOverview.meetingsScheduled),
      icon: Target,
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Sucesso dos Planos",
      value: formatPercentage(defaultOverview.averagePlanSuccessRate),
      icon: TrendingUp,
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Total de Reflexões",
      value: formatNumber(defaultOverview.totalReflections),
      icon: DollarSign,
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden border-accent/20 hover:border-accent/40 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
              <metric.icon className={`w-4 h-4 ${metric.textColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}