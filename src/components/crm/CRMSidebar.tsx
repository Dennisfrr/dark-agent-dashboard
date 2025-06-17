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
  { name: "Caixa de Entrada", icon: Mail, path: "/inbox" },
  { name: "Contatos", icon: Users, path: "/contatos" },
  { name: "Pipeline", icon: Target, path: "/pipeline" },
  { name: "Vendas", icon: TrendingUp, path: "/vendas" },
  { name: "Análises", icon: BarChart3, path: "/relatorios" },
  { name: "Desempenho do Agente", icon: BarChart3, path: "/relatorios/desempenho-agente" },
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
      <div className="flex h-20 items-center justify-between px-4 border-b border-border">
        <div className="flex items-center justify-center flex-1">
          <div className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/bc8a55c5-6ebb-4f5c-9c22-4ea832448c90.png" 
              alt="BMA Logo" 
              className={cn(
                "object-contain transition-all duration-300 filter brightness-0 invert",
                collapsed ? "w-24 h-24" : "w-40 h-40"
              )}
            />
          </div>
        </div>
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
                  "w-full justify-start transition-all duration-200 hover:bg-accent/50 shine-effect",
                  collapsed ? "px-2" : "px-3",
                  location.pathname === item.path && "bg-accent/70 border border-accent"
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

    </div>
  );
}