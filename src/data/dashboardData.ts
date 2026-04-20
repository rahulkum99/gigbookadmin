export interface KPIMetric {
  name: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface ChartDataPoint {
  date: string;
  events: number;
  usersRegistered: number;
}

export interface ConversionMetric {
  title: string;
  value: string;
  change: number;
  description: string;
}

export interface SystemStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
}

export interface Insight {
  text: string;
  icon: string;
}

export const kpiMetrics: KPIMetric[] = [
  {
    name: 'Total Users',
    value: 12847,
    change: 12.5,
    changeLabel: 'Last 30 days',
    icon: 'users',
  },
  {
    name: 'Active Users',
    value: 8234,
    change: 8.2,
    changeLabel: 'Last 30 days',
    icon: 'activity',
  },
  {
    name: 'Total Events',
    value: 3891,
    change: 15.3,
    changeLabel: 'All time',
    icon: 'calendar',
  },
  {
    name: 'Events Today',
    value: 47,
    change: -3.1,
    changeLabel: 'vs yesterday',
    icon: 'calendar-plus',
  },
  {
    name: 'Active Subscriptions',
    value: 2156,
    change: 23.8,
    changeLabel: 'Last 30 days',
    icon: 'credit-card',
  },
];

export const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const baseEvents = 85 + Math.sin(i / 5) * 20;
    const variance = Math.random() * 30 - 15;
    const events = Math.round(baseEvents + variance);

    const baseUsers = 200 + Math.sin(i / 4) * 40;
    const userVariance = Math.random() * 40 - 20;
    const usersRegistered = Math.round(baseUsers + userVariance);

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      events,
      usersRegistered,
    });
  }

  return data;
};

export const conversionMetrics: ConversionMetric[] = [
  {
    title: 'Free Limit Reached',
    value: '342',
    change: 18.4,
    description: 'Users who hit their free event limit',
  },
  {
    title: 'Upgraded to Pro',
    value: '127',
    change: 34.2,
    description: 'Free to Pro conversions this month',
  },
  {
    title: 'Paywall Drop-off',
    value: '24.3%',
    change: -8.5,
    description: 'Users leaving at upgrade prompt',
  },
];

export const subscriptionData = {
  free: 10691,
  pro: 2156,
  totalUsers: 12847,
};

export const systemStatuses: SystemStatus[] = [
  {
    name: 'OTP Service',
    status: 'healthy',
  },
  {
    name: 'Payment Gateway',
    status: 'healthy',
  },
  {
    name: 'Notifications',
    status: 'healthy',
  },
];

export const insights: Insight[] = [
  {
    text: 'Most users upgrade after creating 5-6 events',
    icon: 'trending-up',
  },
  {
    text: 'Peak booking activity happens between 6-9 PM',
    icon: 'clock',
  },
  {
    text: 'Pro conversions increased 34% this week',
    icon: 'sparkles',
  },
  {
    text: 'Average event creation time: 8 minutes',
    icon: 'zap',
  },
];
