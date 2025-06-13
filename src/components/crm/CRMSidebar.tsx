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
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="/lovable-uploads/20be4af3-33bb-4dcf-9274-7dc7b57ddfc4.png" 
              alt="BMA Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl tracking-wide font-playfair">BMA</span>
          )}
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

    </div>
  );
}