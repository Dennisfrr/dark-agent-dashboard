import { CRMLayout } from "@/components/crm/CRMLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Search, Filter, MoreVertical, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

const contatosData = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
    status: "Lead",
    source: "Website",
    value: "R$ 15.000",
    lastContact: "2024-01-15",
    type: "lead"
  },
  {
    id: 2,
    name: "Empresa ABC Ltda",
    email: "contato@empresaabc.com",
    phone: "(11) 3333-3333",
    status: "Cliente Ativo",
    source: "Indicação",
    value: "R$ 150.000",
    lastContact: "2024-01-14",
    type: "cliente"
  },
  {
    id: 3,
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
    status: "Lead Qualificado",
    source: "LinkedIn",
    value: "R$ 25.000",
    lastContact: "2024-01-13",
    type: "lead"
  }
];

const Contatos = () => {
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
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">324</div>
              <p className="text-muted-foreground text-sm">Total de Contatos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning">176</div>
              <p className="text-muted-foreground text-sm">Leads Ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-success">148</div>
              <p className="text-muted-foreground text-sm">Clientes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">R$ 2.8M</div>
              <p className="text-muted-foreground text-sm">Valor Total</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar contatos..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Contatos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contatosData.map((contato) => (
                    <Link key={contato.id} to={`/contatos/${contato.id}`}>
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
                            <div className="font-medium text-foreground">{contato.value}</div>
                          </div>
                          <div className="text-sm">
                            <div className="text-muted-foreground">Último Contato</div>
                            <div className="font-medium text-foreground">{contato.lastContact}</div>
                          </div>
                          <Badge variant={contato.type === "cliente" ? "default" : "secondary"}>
                            {contato.status}
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
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contatosData.filter(c => c.type === "lead").map((contato) => (
                    <Link key={contato.id} to={`/contatos/${contato.id}`}>
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
                            <div className="font-medium text-foreground">{contato.value}</div>
                          </div>
                          <Badge variant="secondary">{contato.status}</Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clientes">
            <Card>
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contatosData.filter(c => c.type === "cliente").map((contato) => (
                    <Link key={contato.id} to={`/contatos/${contato.id}`}>
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
                            <div className="text-muted-foreground">Receita</div>
                            <div className="font-medium text-foreground">{contato.value}</div>
                          </div>
                          <Badge variant="default">{contato.status}</Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Contatos;