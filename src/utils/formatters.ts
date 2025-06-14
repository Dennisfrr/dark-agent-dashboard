// Utility functions for data formatting

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seg atrás`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min atrás`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
};

export const formatDate = (timestamp: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(timestamp));
};

export const formatDateTime = (timestamp: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getActivityIcon = (type: string) => {
  const iconMap = {
    call: 'Phone',
    email: 'Mail',
    meeting: 'Calendar',
    proposal: 'FileText',
    lead: 'UserPlus',
    sale: 'DollarSign',
  };
  return iconMap[type as keyof typeof iconMap] || 'Activity';
};

export const getStatusColor = (status: string) => {
  const colorMap = {
    completed: 'success',
    closed: 'success',
    sent: 'info',
    scheduled: 'warning',
    pending: 'muted',
    new: 'primary',
  };
  return colorMap[status as keyof typeof colorMap] || 'secondary';
};

export const getStatusLabel = (status: string) => {
  const labelMap = {
    completed: 'Concluído',
    closed: 'Concluído',
    sent: 'Enviado',
    scheduled: 'Agendado',
    pending: 'Pendente',
    new: 'Novo',
  };
  return labelMap[status as keyof typeof labelMap] || status;
};