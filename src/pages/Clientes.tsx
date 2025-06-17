import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter, MoreVertical, Mail, Phone } from "lucide-react";

const clientesData = [
  {
    id: 1,
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com",
    phone: "(11) 3333-3333",
    status: "Ativo",
    segment: "Tecnologia",
    revenue: "R$ 150.000",
    lastContact: "2024-01-15"
  },
  {
    id: 2,
    name: "Tech Solutions",
    email: "admin@techsolutions.com",
    phone: "(11) 4444-4444",
    status: "Ativo",
    segment: "Software",
    revenue: "R$ 280.000",
    lastContact: "2024-01-12"
  },
  {
    id: 3,
    name: "Inovação Corp",
    email: "info@inovacao.com",
    phone: "(11) 5555-5555",
    status: "Inativo",
    segment: "Consultoria",
    revenue: "R$ 95.000",
    lastContact: "2023-12-20"
  }
];

const Clientes = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground">Gerencie sua base de clientes</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Users className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">248</div>
              <p className="text-muted-foreground text-sm">Total de Clientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">195</div>
              <p className="text-muted-foreground text-sm">Clientes Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">53</div>
              <p className="text-muted-foreground text-sm">Clientes Inativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">R$ 2.1M</div>
              <p className="text-muted-foreground text-sm">Receita Total</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar clientes..."
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
            <CardTitle>Lista de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientesData.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cliente.name}</h3>
                      <p className="text-sm text-muted-foreground">{cliente.segment}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-sm">
                      <div className="text-muted-foreground">Receita</div>
                      <div className="font-medium text-foreground">{cliente.revenue}</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Último Contato</div>
                      <div className="font-medium text-foreground">{cliente.lastContact}</div>
                    </div>
                    <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>
                      {cliente.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CRMLayout>
  );
};

export default Clientes;