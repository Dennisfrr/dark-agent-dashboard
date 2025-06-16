import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Filter, MoreVertical, Loader2 } from "lucide-react";
import { leadsService } from "@/services/leads";
import { Lead } from "@/services/types";
import React from "react";

const Leads = () => {
  const [leadsData, setLeadsData] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const resp = await leadsService.getLeads({ limit: 50 });
        // @ts-ignore
        setLeadsData(resp.data || []);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar leads.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <CRMLayout>
        <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </CRMLayout>
    );
  }

  if (error) {
    return (
      <CRMLayout>
        <div className="p-6 text-center text-red-500">{error}</div>
      </CRMLayout>
    );
  }

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leads</h1>
            <p className="text-muted-foreground">Gerencie seus leads e oportunidades</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar leads..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Origem</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-foreground">{lead.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                        <div className="text-sm text-muted-foreground">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">{lead.status}</Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{lead.source}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  );
};

export default Leads;