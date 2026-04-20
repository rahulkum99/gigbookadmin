export interface AppVersionConfig {
  ios: string;
  android: string;
  web: string;
}

export interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  expectedDowntime: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  status: 'Active' | 'Draft' | 'Archived';
}

export interface PlatformRule {
  id: string;
  name: string;
  value: string;
  description: string;
  icon: string;
}

export interface GovernanceChangeLog {
  id: string;
  settingName: string;
  previousValue: string;
  newValue: string;
  adminName: string;
  timestamp: string;
  category: string;
}

export const appVersionConfig: AppVersionConfig = {
  ios: '2.4.0',
  android: '2.4.1',
  web: '1.8.2',
};

export const maintenanceConfig: MaintenanceConfig = {
  enabled: false,
  message: 'GigBookAI is currently undergoing scheduled maintenance to improve your experience. We apologize for any inconvenience.',
  expectedDowntime: '30-45 minutes',
};

export const legalDocuments: LegalDocument[] = [
  {
    id: 'tos',
    name: 'Terms of Service',
    version: '3.2',
    lastUpdated: '2026-01-15',
    status: 'Active',
  },
  {
    id: 'privacy',
    name: 'Privacy Policy',
    version: '2.8',
    lastUpdated: '2026-01-10',
    status: 'Active',
  },
];

export const platformRules: PlatformRule[] = [
  {
    id: 'free-event-limit',
    name: 'Free Event Limit',
    value: '3 events per user',
    description: 'Maximum number of free events a user can create before hitting paywall',
    icon: 'Calendar',
  },
  {
    id: 'paywall-trigger',
    name: 'Paywall Trigger',
    value: 'On 4th event creation',
    description: 'Point at which subscription prompt is displayed to free users',
    icon: 'CreditCard',
  },
  {
    id: 'subscription-downgrade',
    name: 'Subscription Downgrade Policy',
    value: 'Retain data, limit features',
    description: 'When users downgrade, their data is preserved but feature access is restricted to free tier limits',
    icon: 'TrendingDown',
  },
  {
    id: 'data-retention',
    name: 'Data Retention Policy',
    value: '90 days after account deletion',
    description: 'User data is retained for 90 days after account deletion request for recovery purposes, then permanently deleted',
    icon: 'Archive',
  },
];

export const governanceChangeLogs: GovernanceChangeLog[] = [
  {
    id: 'log-12',
    settingName: 'iOS Minimum Version',
    previousValue: '2.3.5',
    newValue: '2.4.0',
    adminName: 'Sarah Chen',
    timestamp: '2026-01-28T14:22:00Z',
    category: 'App Version',
  },
  {
    id: 'log-11',
    settingName: 'Maintenance Mode',
    previousValue: 'Enabled',
    newValue: 'Disabled',
    adminName: 'Michael Roberts',
    timestamp: '2026-01-25T09:15:00Z',
    category: 'System',
  },
  {
    id: 'log-10',
    settingName: 'Privacy Policy Version',
    previousValue: '2.7',
    newValue: '2.8',
    adminName: 'Sarah Chen',
    timestamp: '2026-01-10T16:45:00Z',
    category: 'Legal',
  },
  {
    id: 'log-9',
    settingName: 'Free Event Limit',
    previousValue: '2 events',
    newValue: '3 events',
    adminName: 'David Park',
    timestamp: '2026-01-08T11:30:00Z',
    category: 'Platform Rules',
  },
  {
    id: 'log-8',
    settingName: 'Terms of Service Version',
    previousValue: '3.1',
    newValue: '3.2',
    adminName: 'Sarah Chen',
    timestamp: '2026-01-15T13:20:00Z',
    category: 'Legal',
  },
  {
    id: 'log-7',
    settingName: 'Android Minimum Version',
    previousValue: '2.3.8',
    newValue: '2.4.1',
    adminName: 'Michael Roberts',
    timestamp: '2026-01-22T10:05:00Z',
    category: 'App Version',
  },
  {
    id: 'log-6',
    settingName: 'Data Retention Policy',
    previousValue: '60 days after deletion',
    newValue: '90 days after deletion',
    adminName: 'David Park',
    timestamp: '2026-01-05T15:40:00Z',
    category: 'Platform Rules',
  },
  {
    id: 'log-5',
    settingName: 'Maintenance Mode',
    previousValue: 'Disabled',
    newValue: 'Enabled',
    adminName: 'Michael Roberts',
    timestamp: '2026-01-24T23:00:00Z',
    category: 'System',
  },
  {
    id: 'log-4',
    settingName: 'Web Minimum Version',
    previousValue: '1.7.5',
    newValue: '1.8.2',
    adminName: 'Sarah Chen',
    timestamp: '2026-01-20T14:10:00Z',
    category: 'App Version',
  },
  {
    id: 'log-3',
    settingName: 'Paywall Trigger',
    previousValue: 'On 3rd event creation',
    newValue: 'On 4th event creation',
    adminName: 'David Park',
    timestamp: '2026-01-08T11:35:00Z',
    category: 'Platform Rules',
  },
  {
    id: 'log-2',
    settingName: 'Maintenance Message',
    previousValue: 'System update in progress...',
    newValue: 'GigBookAI is currently undergoing scheduled maintenance...',
    adminName: 'Michael Roberts',
    timestamp: '2026-01-24T22:55:00Z',
    category: 'System',
  },
  {
    id: 'log-1',
    settingName: 'Subscription Downgrade Policy',
    previousValue: 'Retain data, no feature access',
    newValue: 'Retain data, limit features',
    adminName: 'David Park',
    timestamp: '2026-01-03T09:20:00Z',
    category: 'Platform Rules',
  },
];
