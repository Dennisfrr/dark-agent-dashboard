import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Leads", icon: UserPlus, path: "/leads" },
  { name: "Clientes", icon: Users, path: "/clientes" },
  { name: "Pipeline", icon: Target, path: "/pipeline" },
  { name: "Vendas", icon: TrendingUp, path: "/vendas" },
  { name: "Relatórios", icon: BarChart3, path: "/relatorios" },
  { name: "E-mails", icon: Mail, path: "/emails" },
  { name: "Chamadas", icon: Phone, path: "/chamadas" },
  { name: "Calendário", icon: Calendar, path: "/calendario" },
  { name: "Documentos", icon: FileText, path: "/documentos" },
  { name: "Configurações", icon: Settings, path: "/configuracoes" },
];

export function CRMSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3"
                )}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className={cn("w-5 h-5", collapsed ? "" : "mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
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