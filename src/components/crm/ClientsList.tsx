import { useState } from "react";
import { MoreHorizontal, Phone, Mail, Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const clients = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria@empresa.com",
    phone: "(11) 99999-9999",
    company: "TechCorp",
    status: "Ativo",
    value: "R$ 25.000",
    lastContact: "2 dias atrás",
    stage: "Negociação"
  },
  {
    id: 2,
    name: "João Silva",
    email: "joao@startup.com",
    phone: "(11) 88888-8888",
    company: "StartupXYZ",
    status: "Lead",
    value: "R$ 15.000",
    lastContact: "1 semana atrás",
    stage: "Qualificação"
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana@inovacao.com",
    phone: "(11) 77777-7777",
    company: "Inovação Ltd",
    status: "Cliente",
    value: "R$ 50.000",
    lastContact: "Hoje",
    stage: "Fechamento"
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    email: "pedro@digital.com",
    phone: "(11) 66666-6666",
    company: "Digital Agency",
    status: "Prospect",
    value: "R$ 8.000",
    lastContact: "3 dias atrás",
    stage: "Prospecção"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Cliente": return "success";
    case "Ativo": return "primary";
    case "Lead": return "warning";
    case "Prospect": return "secondary";
    default: return "secondary";
  }
};

export function ClientsList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Clientes & Leads</CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Último Contato</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-2">
                        <Mail className="w-3 h-3" />
                        <span>{client.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{client.company}</div>
                  <div className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>{client.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(client.status) as any}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{client.value}</TableCell>
                <TableCell className="text-muted-foreground">{client.lastContact}</TableCell>
                <TableCell>
                  <Badge variant="outline">{client.stage}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" />
                        Enviar E-mail
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}