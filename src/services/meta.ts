import { 
  MetaLead, 
  MetaContact, 
  MetaCampaign, 
  MetaMessage, 
  MetaPost, 
  MetaOpportunity,
  MetaInsights,
  MetaDashboardStats 
} from '@/types/meta';

// Configuração das APIs da Meta
const META_CONFIG = {
  baseUrl: 'https://graph.facebook.com/v19.0',
  accessToken: process.env.META_ACCESS_TOKEN || 'demo_token',
  appId: process.env.META_APP_ID || 'demo_app_id',
  appSecret: process.env.META_APP_SECRET || 'demo_secret'
};

class MetaGraphAPI {
  private baseUrl = META_CONFIG.baseUrl;
  private accessToken = META_CONFIG.accessToken;

  async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('access_token', this.accessToken);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Meta API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Meta API Request failed:', error);
      // Retornar dados simulados em caso de erro
      return this.getFallbackData(endpoint);
    }
  }

  private getFallbackData(endpoint: string) {
    // Dados simulados para desenvolvimento
    if (endpoint.includes('leadgen_forms')) {
      return { data: this.generateMockLeads() };
    }
    if (endpoint.includes('conversations')) {
      return { data: this.generateMockMessages() };
    }
    if (endpoint.includes('campaigns')) {
      return { data: this.generateMockCampaigns() };
    }
    if (endpoint.includes('posts')) {
      return { data: this.generateMockPosts() };
    }
    return { data: [] };
  }

  private generateMockLeads(): MetaLead[] {
    return [
      {
        id: 'lead_1',
        created_at: new Date(Date.now() - 3600000).toISOString(),
        ad_id: 'ad_123',
        campaign_id: 'camp_456',
        form_id: 'form_789',
        platform: 'facebook',
        field_data: [
          { name: 'full_name', values: ['João Silva'] },
          { name: 'email', values: ['joao@email.com'] },
          { name: 'phone_number', values: ['+5511999999999'] }
        ],
        status: 'new'
      },
      {
        id: 'lead_2',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        ad_id: 'ad_124',
        campaign_id: 'camp_456',
        form_id: 'form_789',
        platform: 'instagram',
        field_data: [
          { name: 'full_name', values: ['Maria Santos'] },
          { name: 'email', values: ['maria@email.com'] }
        ],
        status: 'contacted'
      }
    ];
  }

  private generateMockCampaigns(): MetaCampaign[] {
    return [
      {
        id: 'camp_456',
        name: 'Campanha Geração de Leads Q1',
        status: 'active',
        objective: 'LEAD_GENERATION',
        budget_remaining: 1500,
        spend: 2500,
        impressions: 125000,
        clicks: 3500,
        cpc: 0.71,
        cpl: 12.50,
        leads_count: 200,
        conversions: 45,
        created_time: new Date(Date.now() - 86400000 * 30).toISOString(),
        updated_time: new Date().toISOString()
      }
    ];
  }

  private generateMockMessages(): MetaMessage[] {
    return [
      {
        id: 'msg_1',
        conversation_id: 'conv_123',
        contact_id: 'contact_1',
        platform: 'messenger',
        message: 'Olá! Gostaria de saber mais sobre seus produtos.',
        from: { id: 'user_123', name: 'João Silva' },
        to: { id: 'page_456', name: 'Minha Empresa' },
        created_time: new Date(Date.now() - 1800000).toISOString(),
        message_type: 'text',
        read: false,
        replied: false
      }
    ];
  }

  private generateMockPosts(): MetaPost[] {
    return [
      {
        id: 'post_1',
        message: 'Confira nossa nova promoção! 🎉',
        created_time: new Date(Date.now() - 86400000).toISOString(),
        platform: 'facebook',
        post_type: 'photo',
        likes_count: 45,
        comments_count: 12,
        shares_count: 8,
        reach: 2500,
        engagement_rate: 2.6,
        comments: []
      }
    ];
  }
}

class MetaMarketingAPI extends MetaGraphAPI {
  async getCampaigns(): Promise<MetaCampaign[]> {
    const response = await this.makeRequest('/me/campaigns', {
      fields: 'id,name,status,objective,budget_remaining,spend'
    });
    return response.data;
  }

  async getCampaignInsights(campaignId: string): Promise<MetaInsights> {
    const response = await this.makeRequest(`/${campaignId}/insights`, {
      fields: 'impressions,reach,clicks,spend,cpc,cpm,ctr'
    });
    return response.data[0] || this.generateMockInsights();
  }

  private generateMockInsights(): MetaInsights {
    return {
      date_start: new Date(Date.now() - 86400000 * 30).toISOString().split('T')[0],
      date_stop: new Date().toISOString().split('T')[0],
      impressions: 125000,
      reach: 98000,
      clicks: 3500,
      spend: 2500,
      cpc: 0.71,
      cpm: 25.51,
      ctr: 2.8,
      leads: 200,
      cost_per_lead: 12.50,
      conversions: 45,
      conversion_rate: 22.5
    };
  }
}

class MetaMessengerAPI extends MetaGraphAPI {
  async getConversations(): Promise<MetaMessage[]> {
    const response = await this.makeRequest('/me/conversations', {
      fields: 'participants,messages{message,from,to,created_time}'
    });
    return response.data;
  }

  async sendMessage(recipientId: string, message: string): Promise<any> {
    return this.makeRequest('/me/messages', {
      recipient: { id: recipientId },
      message: { text: message }
    });
  }
}

class MetaWebhookHandler {
  static handleWebhook(event: any) {
    console.log('Webhook recebido:', event);
    
    // Processar diferentes tipos de webhook
    if (event.object === 'page') {
      event.entry?.forEach((entry: any) => {
        // Processar mensagens
        if (entry.messaging) {
          entry.messaging.forEach((message: any) => {
            this.processMessage(message);
          });
        }
        
        // Processar leads
        if (entry.changes) {
          entry.changes.forEach((change: any) => {
            if (change.field === 'leadgen') {
              this.processLead(change.value);
            }
          });
        }
      });
    }
  }

  private static processMessage(message: any) {
    console.log('Nova mensagem:', message);
    // Aqui você processaria a mensagem e salvaria no banco
  }

  private static processLead(leadData: any) {
    console.log('Novo lead:', leadData);
    // Aqui você processaria o lead e salvaria no banco
  }
}

// Serviço principal que orquestra todas as APIs
class MetaService {
  private graphAPI = new MetaGraphAPI();
  private marketingAPI = new MetaMarketingAPI();
  private messengerAPI = new MetaMessengerAPI();

  async getLeads(): Promise<MetaLead[]> {
    const response = await this.graphAPI.makeRequest('/me/leadgen_forms', {
      fields: 'leads{id,created_time,ad_id,campaign_id,form_id,field_data}'
    });
    return response.data;
  }

  async getContacts(): Promise<MetaContact[]> {
    // Combinar dados de diferentes fontes para criar perfis de contato
    const leads = await this.getLeads();
    const conversations = await this.messengerAPI.getConversations();
    
    // Gerar contatos inteligentes a partir de leads e mensagens
    return this.generateContactsFromLeadsAndMessages(leads, conversations);
  }

  async getOpportunities(): Promise<MetaOpportunity[]> {
    // Inferir oportunidades a partir de leads e interações
    const leads = await this.getLeads();
    return this.generateOpportunitiesFromLeads(leads);
  }

  async getDashboardStats(): Promise<MetaDashboardStats> {
    const [leads, campaigns, conversations] = await Promise.all([
      this.getLeads(),
      this.marketingAPI.getCampaigns(),
      this.messengerAPI.getConversations()
    ]);

    return {
      total_leads: leads.length,
      new_leads_today: leads.filter(lead => 
        new Date(lead.created_at).toDateString() === new Date().toDateString()
      ).length,
      total_contacts: await this.getContacts().then(contacts => contacts.length),
      active_conversations: conversations.filter(msg => !msg.read).length,
      total_spend: campaigns.reduce((sum, camp) => sum + camp.spend, 0),
      total_campaigns: campaigns.length,
      active_campaigns: campaigns.filter(camp => camp.status === 'active').length,
      avg_response_time: 15, // minutos
      conversion_rate: 22.5,
      total_revenue: 125000
    };
  }

  private generateMockContacts(): MetaContact[] {
    return [
      {
        id: 'contact_1',
        name: 'João Silva',
        email: 'joao@email.com',
        phone: '+5511999999999',
        platform: 'messenger',
        first_interaction: new Date(Date.now() - 86400000 * 5).toISOString(),
        last_interaction: new Date(Date.now() - 1800000).toISOString(),
        total_interactions: 8,
        tags: ['lead-qualificado', 'interessado'],
        status: 'active'
      },
      {
        id: 'contact_2',
        name: 'Maria Santos',
        email: 'maria@email.com',
        platform: 'instagram',
        first_interaction: new Date(Date.now() - 86400000 * 3).toISOString(),
        last_interaction: new Date(Date.now() - 7200000).toISOString(),
        total_interactions: 3,
        tags: ['novo-lead'],
        status: 'active'
      }
    ];
  }

  // Método principal para gerar contatos inteligentes
  private generateContactsFromLeadsAndMessages(leads: MetaLead[], messages: MetaMessage[]): MetaContact[] {
    const contactsMap = new Map<string, MetaContact>();
    
    // 1. Mapear leads para contatos iniciais
    leads.forEach(lead => {
      const fullName = lead.field_data.find(f => f.name === 'full_name')?.values[0];
      const email = lead.field_data.find(f => f.name === 'email')?.values[0];
      const phone = lead.field_data.find(f => f.name === 'phone_number')?.values[0];
      
      if (fullName) {
        const contactId = this.generateContactId(lead.id, fullName, email);
        const contact: MetaContact = {
          id: contactId,
          name: fullName,
          email,
          phone,
          platform: lead.platform,
          first_interaction: lead.created_at,
          last_interaction: lead.created_at,
          total_interactions: 1,
          tags: ['novo-lead'],
          status: 'active'
        };
        contactsMap.set(contactId, contact);
      }
    });
    
    // 2. Enriquecer contatos com mensagens
    messages.forEach(message => {
      const existingContact = this.findContactByMessage(contactsMap, message);
      
      if (existingContact) {
        // Atualizar contato existente
        this.enrichContactWithMessage(existingContact, message);
      } else {
        // Criar novo contato a partir da mensagem
        const newContact = this.createContactFromMessage(message);
        if (newContact) {
          contactsMap.set(newContact.id, newContact);
        }
      }
    });
    
    return Array.from(contactsMap.values());
  }

  // Gerar ID único e consistente para contato
  private generateContactId(leadId: string, name: string, email?: string): string {
    const identifier = email || name.toLowerCase().replace(/\s+/g, '');
    return `contact_${leadId}_${identifier.substring(0, 10)}`;
  }

  // Encontrar contato existente baseado na mensagem
  private findContactByMessage(contactsMap: Map<string, MetaContact>, message: MetaMessage): MetaContact | undefined {
    // Buscar por contact_id da mensagem
    if (message.contact_id) {
      for (const contact of contactsMap.values()) {
        if (contact.id === message.contact_id) {
          return contact;
        }
      }
    }
    
    // Buscar por nome ou ID do remetente
    for (const contact of contactsMap.values()) {
      if (contact.name === message.from.name || 
          contact.email === message.from.id ||
          contact.id.includes(message.from.id)) {
        return contact;
      }
    }
    
    return undefined;
  }

  // Enriquecer contato existente com dados da mensagem
  private enrichContactWithMessage(contact: MetaContact, message: MetaMessage): void {
    // Atualizar última interação
    if (new Date(message.created_time) > new Date(contact.last_interaction)) {
      contact.last_interaction = message.created_time;
    }
    
    // Incrementar total de interações
    contact.total_interactions += 1;
    
    // Análise de sentimento e extração de intenções
    const messageAnalysis = this.analyzeMessage(message.message);
    
    // Adicionar tags baseadas na análise
    if (messageAnalysis.sentiment && !contact.tags.includes(messageAnalysis.sentiment)) {
      contact.tags.push(messageAnalysis.sentiment);
    }
    
    messageAnalysis.intentions.forEach(intention => {
      if (!contact.tags.includes(intention)) {
        contact.tags.push(intention);
      }
    });
    
    // Atualizar status baseado na atividade
    const daysSinceLastInteraction = Math.floor(
      (Date.now() - new Date(contact.last_interaction).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastInteraction <= 1) {
      contact.status = 'active';
    } else if (daysSinceLastInteraction <= 7) {
      contact.status = 'active';
    } else {
      contact.status = 'inactive';
    }
  }

  // Criar novo contato a partir de mensagem
  private createContactFromMessage(message: MetaMessage): MetaContact | null {
    if (!message.from.name) return null;
    
    const messageAnalysis = this.analyzeMessage(message.message);
    
    return {
      id: `contact_msg_${message.from.id}`,
      name: message.from.name,
      platform: message.platform,
      first_interaction: message.created_time,
      last_interaction: message.created_time,
      total_interactions: 1,
      tags: ['conversa-iniciada', ...messageAnalysis.intentions, messageAnalysis.sentiment].filter(Boolean),
      status: 'active'
    };
  }

  // Análise de sentimento e extração de intenções (PNL básica)
  private analyzeMessage(message: string): { sentiment: string; intentions: string[] } {
    const lowerMessage = message.toLowerCase();
    
    // Análise de sentimento
    let sentiment = 'neutral';
    
    const positiveWords = ['obrigado', 'ótimo', 'excelente', 'perfeito', 'adorei', 'maravilhoso', 'gostei'];
    const negativeWords = ['ruim', 'péssimo', 'horrível', 'reclamação', 'problema', 'insatisfeito', 'decepcionado'];
    
    if (positiveWords.some(word => lowerMessage.includes(word))) {
      sentiment = 'positive';
    } else if (negativeWords.some(word => lowerMessage.includes(word))) {
      sentiment = 'negative';
    }
    
    // Extração de intenções
    const intentions: string[] = [];
    
    const intentionPatterns = [
      { keywords: ['preço', 'valor', 'custo', 'orçamento'], tag: 'interessado-preco' },
      { keywords: ['demo', 'demonstração', 'teste', 'experimentar'], tag: 'solicitou-demo' },
      { keywords: ['comprar', 'adquirir', 'contratar', 'fechar'], tag: 'intencao-compra' },
      { keywords: ['informação', 'detalhe', 'saber mais', 'explicar'], tag: 'pediu-informacao' },
      { keywords: ['suporte', 'ajuda', 'problema', 'dúvida'], tag: 'precisa-suporte' },
      { keywords: ['reclamação', 'insatisfeito', 'cancelar'], tag: 'reclamacao' },
      { keywords: ['agendar', 'reunião', 'conversar', 'ligar'], tag: 'quer-agendar' }
    ];
    
    intentionPatterns.forEach(pattern => {
      if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
        intentions.push(pattern.tag);
      }
    });
    
    return { sentiment, intentions };
  }

  private generateOpportunitiesFromLeads(leads: MetaLead[]): MetaOpportunity[] {
    return leads.map((lead, index) => ({
      id: `opp_${lead.id}`,
      contact_id: `contact_${index + 1}`,
      source_type: 'lead_form' as const,
      source_id: lead.id,
      stage: 'prospect' as const,
      value: Math.floor(Math.random() * 10000) + 1000,
      probability: 25,
      created_date: lead.created_at,
      expected_close_date: new Date(Date.now() + 86400000 * 30).toISOString(),
      last_activity: lead.created_at,
      notes: [`Lead gerado via ${lead.platform}`, 'Aguardando primeira abordagem']
    }));
  }
}

export const metaService = new MetaService();
export { MetaWebhookHandler };