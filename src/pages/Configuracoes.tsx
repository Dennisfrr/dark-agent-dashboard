import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  Mail,
  Phone,
  Key,
  Download
} from "lucide-react";

const Configuracoes = () => {
  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="integracao">Integração</TabsTrigger>
            <TabsTrigger value="aparencia">Aparência</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="Carlos Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="carlos@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="(11) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input id="cargo" defaultValue="Gerente de Vendas" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="assinatura">Assinatura de E-mail</Label>
                  <textarea 
                    id="assinatura"
                    className="w-full p-3 border border-border rounded-md bg-background text-foreground"
                    rows={4}
                    defaultValue="Carlos Silva&#10;Gerente de Vendas&#10;Empresa CRM Pro&#10;(11) 99999-9999"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Novos Leads</div>
                    <div className="text-sm text-muted-foreground">
                      Receber notificações quando novos leads forem criados
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Vendas Fechadas</div>
                    <div className="text-sm text-muted-foreground">
                      Notificações sobre vendas fechadas pela equipe
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Lembretes de Tarefas</div>
                    <div className="text-sm text-muted-foreground">
                      Lembretes automáticos para tarefas pendentes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Reuniões Agendadas</div>
                    <div className="text-sm text-muted-foreground">
                      Notificações 15 minutos antes das reuniões
                    </div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Relatórios Semanais</div>
                    <div className="text-sm text-muted-foreground">
                      Receber relatórios automáticos toda segunda-feira
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Segurança da Conta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="senha-atual">Senha Atual</Label>
                    <Input id="senha-atual" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nova-senha">Nova Senha</Label>
                    <Input id="nova-senha" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                    <Input id="confirmar-senha" type="password" />
                  </div>
                  <Button>Alterar Senha</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Autenticação de Dois Fatores</div>
                    <div className="text-sm text-muted-foreground">
                      Adicionar uma camada extra de segurança à sua conta
                    </div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-base font-medium">Sessões Ativas</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Chrome - Windows</div>
                        <div className="text-sm text-muted-foreground">Último acesso: agora</div>
                      </div>
                      <Badge variant="default">Atual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">Safari - iPhone</div>
                        <div className="text-sm text-muted-foreground">Último acesso: 2 horas atrás</div>
                      </div>
                      <Button variant="outline" size="sm">Encerrar</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integracao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Integrações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Mail className="w-6 h-6 mr-3 text-blue-500" />
                        <div>
                          <div className="font-medium">Gmail</div>
                          <div className="text-sm text-muted-foreground">Sincronização de e-mails</div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Configurar
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Phone className="w-6 h-6 mr-3 text-green-500" />
                        <div>
                          <div className="font-medium">WhatsApp Business</div>
                          <div className="text-sm text-muted-foreground">Mensagens automáticas</div>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Conectar
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Key className="w-6 h-6 mr-3 text-purple-500" />
                        <div>
                          <div className="font-medium">Zapier</div>
                          <div className="text-sm text-muted-foreground">Automações avançadas</div>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Configurar
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Database className="w-6 h-6 mr-3 text-orange-500" />
                        <div>
                          <div className="font-medium">API Personalizada</div>
                          <div className="text-sm text-muted-foreground">Integração customizada</div>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Documentação
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aparencia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Personalização da Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Modo Escuro</div>
                    <div className="text-sm text-muted-foreground">
                      Usar tema escuro para reduzir cansaço visual
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label>Cor Principal</Label>
                  <div className="flex space-x-2">
                    {[
                      'bg-blue-500',
                      'bg-purple-500', 
                      'bg-green-500',
                      'bg-red-500',
                      'bg-yellow-500',
                      'bg-pink-500'
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-foreground ${color}`}
                      />
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label>Densidade da Interface</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="compacta" name="densidade" />
                      <Label htmlFor="compacta">Compacta</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="normal" name="densidade" defaultChecked />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="espaçosa" name="densidade" />
                      <Label htmlFor="espaçosa">Espaçosa</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sistema" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuso">Fuso Horário</Label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option>GMT-3 (Brasília)</option>
                      <option>GMT-5 (Nova York)</option>
                      <option>GMT+0 (Londres)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moeda">Moeda Padrão</Label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option>BRL (Real)</option>
                      <option>USD (Dólar)</option>
                      <option>EUR (Euro)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idioma">Idioma</Label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formato-data">Formato de Data</Label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option>DD/MM/AAAA</option>
                      <option>MM/DD/AAAA</option>
                      <option>AAAA-MM-DD</option>
                    </select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="text-base font-medium">Backup e Exportação</div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Manual
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Backup Automático</div>
                    <div className="text-sm text-muted-foreground">
                      Backup diário dos dados às 02:00
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Configuracoes;