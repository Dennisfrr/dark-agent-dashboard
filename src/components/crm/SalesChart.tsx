import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const salesData = [
  { month: "Jan", vendas: 65000, leads: 120 },
  { month: "Fev", vendas: 72000, leads: 145 },
  { month: "Mar", vendas: 68000, leads: 132 },
  { month: "Abr", vendas: 85000, leads: 167 },
  { month: "Mai", vendas: 91000, leads: 189 },
  { month: "Jun", vendas: 88000, leads: 176 },
];

export function SalesChart() {
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