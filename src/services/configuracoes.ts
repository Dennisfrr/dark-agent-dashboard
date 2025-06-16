import { api } from './api';

// Tipos para os dados de configuração. Adicione mais conforme necessário.
export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  settings: Record<string, any>;
}

export interface AgentTool {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface AgentSettings {
  id: string;
  key: string;
  value: any;
  description: string;
}

export const configuracoesService = {
  async getAgentConfig(): Promise<AgentConfig> {
    const response = await api.get('/api/agent/config');
    return response.data;
  },

  async updateAgentConfig(config: Partial<AgentConfig>): Promise<AgentConfig> {
    const response = await api.patch('/api/agent/config', config);
    return response.data;
  },

  async getSystemStatus() {
    const response = await api.get('/api/system/status');
    return response.data;
  },

  async getAgentTools(): Promise<AgentTool[]> {
    const response = await api.get('/api/agent/tools');
    return response.data;
  },

  async getAgentSettings(): Promise<AgentSettings[]> {
    const response = await api.get('/api/agent/settings');
    return response.data;
  },

  async updateAgentSettings(settings: AgentSettings[]): Promise<AgentSettings[]> {
    const response = await api.put('/api/agent/settings', settings);
    return response.data;
  }
}; 