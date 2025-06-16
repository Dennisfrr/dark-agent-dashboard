import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Search, Filter, MoreVertical, Mail, Phone, User, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { leadsService } from "@/services/leads";
import { Lead } from "@/services/types";
import { format } from 'date-fns';

const ContatoItem = ({ contato }: { contato: Lead }) => (
  <Link to={`/contatos/${contato.id}`}>
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{contato.name}</h3>
          <p className="text-sm text-muted-foreground">{contato.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-sm">
          <div className="text-muted-foreground">Valor</div>
          <div className="font-medium text-foreground">{contato.value || 'N/A'}</div>
        </div>
        <div className="text-sm">
          <div className="text-muted-foreground">Último Contato</div>
          <div className="font-medium text-foreground">
            {contato.lastContact ? format(new Date(contato.lastContact), 'dd/MM/yyyy') : 'N/A'}
          </div>
        </div>
        <Badge variant={contato.type === "cliente" ? "default" : "secondary"}>
          {contato.status}
        </Badge>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm"><Mail className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Phone className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  </Link>
);

const Contatos = () => {
  const [contatos, setContatos] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchContatos = async () => {
      try {
        setLoading(true);
        // @ts-ignore
        const response = await leadsService.getLeads();
        // @ts-ignore
        setContatos(response.data || []);
      } catch (err) {
        setError("Falha ao carregar contatos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContatos();
  }, []);

  const leads = contatos.filter(c => c.type === 'lead');
  const clientes = contatos.filter(c => c.type === 'cliente');
  const totalValue = contatos.reduce((sum, lead) => {
      const value = parseFloat(lead.value?.replace(/[^0-9,-]+/g, "").replace(",", ".") || '0');
      return sum + value;
  }, 0);

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
            <h1 className="text-3xl font-bold text-foreground">Contatos</h1>
            <p className="text-muted-foreground">Gerencie seus leads e clientes</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Contato
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-foreground">{contatos.length}</div><p className="text-muted-foreground text-sm">Total de Contatos</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-warning">{leads.length}</div><p className="text-muted-foreground text-sm">Leads Ativos</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-success">{clientes.length}</div><p className="text-muted-foreground text-sm">Clientes</p></CardContent></Card>
          <Card><CardContent className="p-6"><div className="text-2xl font-bold text-foreground">{totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div><p className="text-muted-foreground text-sm">Valor Total</p></CardContent></Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Buscar contatos..." className="pl-10" />
          </div>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filtros</Button>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="todos">Todos ({contatos.length})</TabsTrigger>
            <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
            <TabsTrigger value="clientes">Clientes ({clientes.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            <div className="space-y-4 pt-4">
              {contatos.map((contato) => <ContatoItem key={contato.id} contato={contato} />)}
            </div>
          </TabsContent>
          <TabsContent value="leads">
             <div className="space-y-4 pt-4">
              {leads.map((contato) => <ContatoItem key={contato.id} contato={contato} />)}
            </div>
          </TabsContent>
          <TabsContent value="clientes">
             <div className="space-y-4 pt-4">
              {clientes.map((contato) => <ContatoItem key={contato.id} contato={contato} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Contatos;