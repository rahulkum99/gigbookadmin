export interface RevenueMetric {
  name: string;
  value: string;
  numericValue: number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: string;
  priceDisplay: string;
  features: string[];
  enabled: boolean;
  isBestValue: boolean;
  savings?: string;
}

export interface PaywallRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold: number;
}

export interface ConversionInsight {
  title: string;
  value: string;
  change: number;
  description: string;
  isPositive: boolean;
}

export interface HealthStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  lastChecked: string;
  uptime?: string;
}

export interface SubscriptionActivity {
  id: string;
  userName: string;
  userEmail: string;
  action: 'upgraded' | 'renewed' | 'cancelled' | 'downgraded';
  planName: string;
  timestamp: string;
  amount?: number;
}

export const revenueMetrics: RevenueMetric[] = [
  {
    name: 'Total Revenue',
    value: '₹4,04,47,560',
    numericValue: 40447560,
    change: 18.4,
    changeLabel: 'All time',
    icon: 'dollar-sign',
  },
  {
    name: 'Active Paid Users',
    value: '2,156',
    numericValue: 2156,
    change: 23.8,
    changeLabel: 'Last 30 days',
    icon: 'users',
  },
  {
    name: 'Monthly Recurring Revenue',
    value: '₹27,25,720',
    numericValue: 2725720,
    change: 15.2,
    changeLabel: 'This month',
    icon: 'trending-up',
  },
  {
    name: 'Failed Payments',
    value: '12',
    numericValue: 12,
    change: -34.2,
    changeLabel: 'Last 7 days',
    icon: 'alert-circle',
  },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'forever',
    priceDisplay: '₹0',
    features: ['Up to 3 events', 'Basic booking features', 'Email support'],
    enabled: true,
    isBestValue: false,
  },
  {
    id: 'pro-monthly',
    name: 'Pro',
    price: 1659,
    billingPeriod: 'month',
    priceDisplay: '₹1,659/mo',
    features: ['Unlimited events', 'Advanced analytics', 'Priority support', 'Custom branding'],
    enabled: true,
    isBestValue: false,
  },
  {
    id: 'pro-3-months',
    name: 'Pro',
    price: 4149,
    billingPeriod: '3 months',
    priceDisplay: '₹4,149',
    features: ['Unlimited events', 'Advanced analytics', 'Priority support', 'Custom branding'],
    enabled: true,
    isBestValue: false,
    savings: 'Save 17%',
  },
  {
    id: 'pro-6-months',
    name: 'Pro',
    price: 7469,
    billingPeriod: '6 months',
    priceDisplay: '₹7,469',
    features: ['Unlimited events', 'Advanced analytics', 'Priority support', 'Custom branding'],
    enabled: true,
    isBestValue: true,
    savings: 'Save 25%',
  },
];

export const paywallRules: PaywallRule[] = [
  {
    id: 'free-event-limit',
    name: 'Free Event Limit',
    description: 'Trigger paywall when free users reach their event creation limit',
    enabled: true,
    threshold: 3,
  },
  {
    id: 'advanced-features',
    name: 'Advanced Features Gate',
    description: 'Show upgrade prompt when accessing pro-only features',
    enabled: true,
    threshold: 1,
  },
];

export const conversionInsights: ConversionInsight[] = [
  {
    title: 'Users Hitting Free Limit',
    value: '38.4%',
    change: 8.2,
    description: 'Percentage of active free users reaching their 3-event limit',
    isPositive: true,
  },
  {
    title: 'Upgrade Conversion Rate',
    value: '24.7%',
    change: 12.5,
    description: 'Free users who upgrade to Pro after hitting limits',
    isPositive: true,
  },
  {
    title: 'Avg Events Before Upgrade',
    value: '5.8',
    change: 3.2,
    description: 'Average number of events created before users upgrade',
    isPositive: true,
  },
  {
    title: 'Paywall Drop-off Rate',
    value: '18.3%',
    change: -5.4,
    description: 'Users who abandon after seeing upgrade prompt',
    isPositive: true,
  },
];

export const healthStatuses: HealthStatus[] = [
  {
    name: 'Payment Gateway',
    status: 'healthy',
    lastChecked: '2 minutes ago',
    uptime: '99.98%',
  },
  {
    name: 'Subscription Service',
    status: 'healthy',
    lastChecked: '1 minute ago',
    uptime: '99.95%',
  },
  {
    name: 'Billing System',
    status: 'healthy',
    lastChecked: '3 minutes ago',
    uptime: '99.99%',
  },
];

export const recentActivities: SubscriptionActivity[] = [
  {
    id: '1',
    userName: 'Sarah Chen',
    userEmail: 'sarah.chen@email.com',
    action: 'upgraded',
    planName: 'Pro (6 months)',
    timestamp: '2 minutes ago',
    amount: 7469,
  },
  {
    id: '2',
    userName: 'Marcus Rodriguez',
    userEmail: 'marcus.r@email.com',
    action: 'renewed',
    planName: 'Pro (Monthly)',
    timestamp: '15 minutes ago',
    amount: 1659,
  },
  {
    id: '3',
    userName: 'Emily Watson',
    userEmail: 'emily.watson@email.com',
    action: 'upgraded',
    planName: 'Pro (3 months)',
    timestamp: '1 hour ago',
    amount: 4149,
  },
  {
    id: '4',
    userName: 'David Kim',
    userEmail: 'david.kim@email.com',
    action: 'cancelled',
    planName: 'Pro (Monthly)',
    timestamp: '2 hours ago',
  },
  {
    id: '5',
    userName: 'Lisa Anderson',
    userEmail: 'lisa.a@email.com',
    action: 'upgraded',
    planName: 'Pro (Monthly)',
    timestamp: '3 hours ago',
    amount: 1659,
  },
  {
    id: '6',
    userName: 'James Park',
    userEmail: 'james.park@email.com',
    action: 'renewed',
    planName: 'Pro (6 months)',
    timestamp: '5 hours ago',
    amount: 7469,
  },
  {
    id: '7',
    userName: 'Maria Garcia',
    userEmail: 'maria.garcia@email.com',
    action: 'upgraded',
    planName: 'Pro (3 months)',
    timestamp: '6 hours ago',
    amount: 4149,
  },
  {
    id: '8',
    userName: 'Tom Wilson',
    userEmail: 'tom.wilson@email.com',
    action: 'cancelled',
    planName: 'Pro (Monthly)',
    timestamp: '8 hours ago',
  },
];

export const userDistribution = {
  free: 10691,
  paid: 2156,
  total: 12847,
  conversionRate: 16.8,
};
