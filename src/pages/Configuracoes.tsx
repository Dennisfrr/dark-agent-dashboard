import React from "react";
import { CRMLayout } from "@/components/crm/CRMLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, User, Bell, Shield, Database, Palette, Save, Key, Download, Loader2, AlertCircle } from "lucide-react";
import { configuracoesService, AgentConfig, AgentTool, AgentSettings } from "@/services/configuracoes";
import { useToast } from "@/hooks/use-toast";

const Configuracoes = () => {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [agentConfig, setAgentConfig] = React.useState<Partial<AgentConfig>>({});
  const [agentTools, setAgentTools] = React.useState<AgentTool[]>([]);
  const [agentSettings, setAgentSettings] = React.useState<Partial<AgentSettings>>({});

  React.useEffect(() => {
    const fetchConfigData = async () => {
      try {
        setLoading(true);
        const [config, tools, settings] = await Promise.all([
          configuracoesService.getAgentConfig(),
          configuracoesService.getAgentTools(),
          configuracoesService.getAgentSettings()
        ]);
        setAgentConfig(config);
        setAgentTools(tools);
        setAgentSettings(settings);
      } catch (err) {
        setError("Falha ao carregar as configurações do agente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfigData();
  }, []);
  
  const handleSettingsChange = (field: keyof AgentSettings, value: any) => {
    setAgentSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await configuracoesService.updateAgentSettings(agentSettings as AgentSettings);
      toast({
        title: "Sucesso!",
        description: "Configurações salvas com sucesso.",
        variant: "default",
      });
    } catch (error) {
       toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <CRMLayout><div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div></CRMLayout>;
  }

  if (error) {
    return <CRMLayout><div className="p-6 text-center text-red-500 flex items-center justify-center"><AlertCircle className="w-4 h-4 mr-2"/> {error}</div></CRMLayout>;
  }

  return (
    <CRMLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações do sistema e do agente de IA</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground" onClick={handleSaveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <Tabs defaultValue="sistema" className="space-y-6">
           <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="sistema">Sistema IA</TabsTrigger>
            <TabsTrigger value="ferramentas">Ferramentas IA</TabsTrigger>
            <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="integracao">Integração</TabsTrigger>
          </TabsList>

          <TabsContent value="perfil" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center"><User className="w-5 h-5 mr-2" />Configurações do Agente</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Personalidade</Label>
                    <Input value={agentSettings.personality} onChange={e => handleSettingsChange('personality', e.target.value)} />
                  </div>
                   <div className="space-y-2">
                    <Label>Estilo de Resposta</Label>
                    <Input value={agentSettings.responseStyle} onChange={e => handleSettingsChange('responseStyle', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Idioma</Label>
                    <Input value={agentSettings.language} onChange={e => handleSettingsChange('language', e.target.value)} />
                  </div>
                   <div className="space-y-2">
                    <Label>Tempo Máx. de Resposta (segundos)</Label>
                    <Input type="number" value={agentSettings.maxResponseTime} onChange={e => handleSettingsChange('maxResponseTime', parseInt(e.target.value, 10))} />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  <Switch id="auto-reply" checked={agentSettings.autoReply} onCheckedChange={checked => handleSettingsChange('autoReply', checked)} />
                  <Label htmlFor="auto-reply">Habilitar resposta automática</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sistema" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Settings className="w-5 h-5 mr-2" />Configuração do Sistema de IA</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Estes valores são definidos no backend e exibidos aqui apenas para referência.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Nome do Agente</Label><Input value={agentConfig.agentName} readOnly /></div>
                  <div className="space-y-2"><Label>Modelo LLM</Label><Input value={agentConfig.llmModel} readOnly /></div>
                  <div className="space-y-2"><Label>Temperatura</Label><Input type="number" value={agentConfig.temperature} readOnly /></div>
                  <div className="space-y-2"><Label>Delay (ms)</Label><Input type="number" value={agentConfig.debounceDelayMs} readOnly /></div>
                  <div className="space-y-2"><Label>Máx. Iterações de Ferramenta</Label><Input type="number" value={agentConfig.maxToolIterations} readOnly /></div>
                </div>
                 <div className="space-y-2 pt-4">
                    <Label>Prompt Base do Sistema</Label>
                    <textarea className="w-full p-3 border border-border rounded-md bg-background/50 text-foreground" rows={8} value={agentConfig.systemPromptBase} readOnly />
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ferramentas" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Key className="w-5 h-5 mr-2" />Ferramentas do Agente de IA</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {agentTools.map(tool => (
                  <div key={tool.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`tool-switch-${tool.id}`} className="text-sm">Ativa</Label>
                      <Switch id={`tool-switch-${tool.id}`} checked={tool.isActive} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outras abas permanecem estáticas por enquanto */}
          <TabsContent value="notificacoes">...</TabsContent>
          <TabsContent value="seguranca">...</TabsContent>
          <TabsContent value="integracao">...</TabsContent>

        </Tabs>
      </div>
    </CRMLayout>
  );
};

export default Configuracoes;