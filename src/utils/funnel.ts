export interface LeadMinimal {
  currentPlanStep?: string;
  currentPlanStatus?: string;
  meetingInterest?: string | number;
  currentStep?: string;
  funnelStage?: string;
}

export const mapLeadToFunnelStage = (lead: LeadMinimal): string => {
  if (lead.funnelStage && typeof lead.funnelStage === 'string' && lead.funnelStage.trim() !== '') {
    const normalized = lead.funnelStage.trim();
    switch (normalized.toLowerCase()) {
      case 'novo lead':
      case 'novo':
      case 'novolead':
        return 'Novo Lead';
      case 'qualificado':
      case 'qualification':
        return 'Qualificado';
      case 'proposta':
      case 'proposal':
      case 'solution':
        return 'Proposta';
      case 'negociação':
      case 'negociacao':
      case 'negotiation':
        return 'Negociação';
      case 'fechado':
      case 'won':
      case 'closed':
        return 'Fechado';
      default:
        break;
    }
  }

  const stepRaw = lead.currentPlanStep || lead.currentStep || "";
  const step = stepRaw.toLowerCase();
  const status = lead.currentPlanStatus?.toLowerCase() || "";
  const meeting = (lead.meetingInterest || "").toString().toLowerCase();

  if (status === "completed" || meeting === "agendado") {
    return "Fechado";
  }
  if (step.includes("negoci") || step.includes("close")) {
    return "Negociação";
  }
  if (step.includes("proposta") || step.includes("solution") || step.includes("proposal")) {
    return "Proposta";
  }
  if (step.includes("qualific") || step.includes("pain") || step.includes("discovery")) {
    return "Qualificado";
  }
  return "Novo Lead";
}; 