// Tipos para dados das APIs da Meta

export interface MetaLead {
  id: string;
  created_at: string;
  ad_id: string;
  campaign_id: string;
  form_id: string;
  platform: 'facebook' | 'instagram';
  field_data: {
    name: string;
    values: string[];
  }[];
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
}

export interface MetaContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  profile_pic?: string;
  platform: 'facebook' | 'instagram' | 'messenger' | 'whatsapp';
  first_interaction: string;
  last_interaction: string;
  total_interactions: number;
  tags: string[];
  status: 'active' | 'inactive' | 'blocked';
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'deleted';
  objective: string;
  budget_remaining: number;
  spend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  cpl: number;
  leads_count: number;
  conversions: number;
  created_time: string;
  updated_time: string;
}

export interface MetaMessage {
  id: string;
  conversation_id: string;
  contact_id: string;
  platform: 'messenger' | 'whatsapp' | 'instagram';
  message: string;
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
  created_time: string;
  message_type: 'text' | 'image' | 'video' | 'file' | 'audio';
  read: boolean;
  replied: boolean;
}

export interface MetaPost {
  id: string;
  message?: string;
  created_time: string;
  platform: 'facebook' | 'instagram';
  post_type: 'photo' | 'video' | 'status' | 'link';
  likes_count: number;
  comments_count: number;
  shares_count: number;
  reach: number;
  engagement_rate: number;
  comments: MetaComment[];
}

export interface MetaComment {
  id: string;
  post_id: string;
  message: string;
  from: {
    id: string;
    name: string;
  };
  created_time: string;
  like_count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface MetaOpportunity {
  id: string;
  contact_id: string;
  source_type: 'lead_form' | 'messenger' | 'comment' | 'post_engagement';
  source_id: string;
  stage: 'prospect' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  value: number;
  probability: number;
  created_date: string;
  expected_close_date: string;
  last_activity: string;
  notes: string[];
}

export interface MetaWebhookEvent {
  object: string;
  entry: {
    id: string;
    time: number;
    changes?: any[];
    messaging?: any[];
    leadgen?: any[];
  }[];
}

export interface MetaInsights {
  date_start: string;
  date_stop: string;
  impressions: number;
  reach: number;
  clicks: number;
  spend: number;
  cpc: number;
  cpm: number;
  ctr: number;
  leads: number;
  cost_per_lead: number;
  conversions: number;
  conversion_rate: number;
}

export interface MetaDashboardStats {
  total_leads: number;
  new_leads_today: number;
  total_contacts: number;
  active_conversations: number;
  total_spend: number;
  total_campaigns: number;
  active_campaigns: number;
  avg_response_time: number;
  conversion_rate: number;
  total_revenue: number;
}