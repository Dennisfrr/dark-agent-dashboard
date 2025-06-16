import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useSalesTrends } from "@/hooks/useAnalytics";
import { Skeleton } from "@/components/ui/skeleton";

export function SalesChart() {
  const { data: salesData, isLoading, error } = useSalesTrends();

  if (isLoading) {
    return (
      <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
        <CardHeader>
          <CardTitle>Vendas & Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (error || !salesData || salesData.length === 0) {
    return (
      <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
        <CardHeader>
          <CardTitle>Vendas & Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Dados não disponíveis
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vendas & Leads</span>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Vendas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-info rounded-full"></div>
              <span className="text-muted-foreground">Leads</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--popover-foreground))"
              }}
            />
            <Line 
              type="monotone" 
              dataKey="vendas" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="leads" 
              stroke="hsl(var(--info))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--info))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}