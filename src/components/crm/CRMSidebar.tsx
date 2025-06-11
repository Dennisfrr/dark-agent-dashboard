import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Target, 
  Calendar, 
  FileText, 
  Settings, 
  Home, 
  UserPlus,
  TrendingUp,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", icon: Home, current: true },
  { name: "Leads", icon: UserPlus, current: false },
  { name: "Clientes", icon: Users, current: false },
  { name: "Pipeline", icon: Target, current: false },
  { name: "Vendas", icon: TrendingUp, current: false },
  { name: "Relatórios", icon: BarChart3, current: false },
  { name: "E-mails", icon: Mail, current: false },
  { name: "Chamadas", icon: Phone, current: false },
  { name: "Calendário", icon: Calendar, current: false },
  { name: "Documentos", icon: FileText, current: false },
  { name: "Configurações", icon: Settings, current: false },
];

export function CRMSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">CRM Pro</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      <nav className="mt-6 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Button
                variant={item.current ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3"
                )}
              >
                <item.icon className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-primary rounded-lg p-4 text-primary-foreground">
            <div className="text-sm font-medium">Upgrade para Pro</div>
            <div className="text-xs opacity-90 mt-1">
              Acesso ilimitado a todos recursos
            </div>
            <Button 
              className="w-full mt-3 bg-background/20 hover:bg-background/30 text-primary-foreground"
              size="sm"
            >
              Upgrade
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}