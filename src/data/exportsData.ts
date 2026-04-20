export interface ExportDataset {
  id: string;
  name: string;
  description: string;
  icon: 'Database' | 'Users' | 'DollarSign';
  format: string;
  lastGenerated: string;
  inclusions: string[];
  exclusions: string[];
  usageNote: string;
}

export interface ExportActivity {
  id: string;
  adminName: string;
  adminEmail: string;
  datasetName: string;
  timestamp: string;
  status: 'completed' | 'failed';
  fileSize: string;
}

export const exportDatasets: ExportDataset[] = [
  {
    id: 'users-list',
    name: 'Users List',
    description: 'Export comprehensive user account information and metadata',
    icon: 'Users',
    format: 'CSV',
    lastGenerated: '2026-01-31 09:23 AM',
    inclusions: [
      'User ID and account creation date',
      'Email addresses and verification status',
      'Subscription tier and status',
      'Last login timestamp',
      'Account status (active, suspended, deleted)',
      'Geographic region (country level)',
      'Feature usage statistics',
      'Total session count'
    ],
    exclusions: [
      'Chat history or conversation content',
      'Private user notes or documents',
      'Personal messages between users',
      'Password hashes or authentication tokens',
      'Payment method details',
      'Precise location data (city, coordinates)',
      'Device identifiers or IP addresses',
      'User-generated content or uploads'
    ],
    usageNote: 'This export is intended for operational reporting, user segmentation analysis, and support case investigation. Do not use for marketing purposes without explicit user consent.'
  },
  {
    id: 'subscriptions-list',
    name: 'Subscriptions List',
    description: 'Export subscription data and billing cycle information',
    icon: 'Database',
    format: 'CSV',
    lastGenerated: '2026-01-31 08:45 AM',
    inclusions: [
      'Subscription ID and user reference',
      'Plan name and tier level',
      'Billing cycle (monthly, annual)',
      'Start date and renewal date',
      'Subscription status (active, cancelled, expired)',
      'MRR contribution',
      'Cancellation date (if applicable)',
      'Upgrade/downgrade history count'
    ],
    exclusions: [
      'Full payment transaction history',
      'Credit card numbers or payment tokens',
      'Billing addresses',
      'Invoice line items',
      'Refund details',
      'Discount codes or promotional details',
      'Tax identification numbers',
      'Bank account information'
    ],
    usageNote: 'Use this data for revenue forecasting, churn analysis, and subscription health monitoring. Financial details remain protected in compliance with PCI DSS standards.'
  },
  {
    id: 'revenue-summary',
    name: 'Revenue Summary',
    description: 'Export aggregated revenue metrics and financial performance data',
    icon: 'DollarSign',
    format: 'CSV',
    lastGenerated: '2026-01-31 07:15 AM',
    inclusions: [
      'Daily revenue totals',
      'Monthly recurring revenue (MRR)',
      'Annual recurring revenue (ARR)',
      'New customer revenue',
      'Expansion revenue',
      'Churn amount by cohort',
      'Revenue by plan tier',
      'Conversion rate metrics'
    ],
    exclusions: [
      'Individual transaction amounts',
      'Customer payment methods',
      'Specific customer revenue attribution',
      'Fee structures or processing costs',
      'Tax calculations or filings',
      'Refund transaction details',
      'Payment gateway credentials',
      'Account reconciliation data'
    ],
    usageNote: 'This aggregated data is suitable for board reporting, investor updates, and strategic planning. Individual customer financial data is excluded to protect privacy.'
  }
];

export const recentExportActivity: ExportActivity[] = [
  {
    id: 'exp-001',
    adminName: 'Sarah Chen',
    adminEmail: 'sarah.chen@gigbook.ai',
    datasetName: 'Users List',
    timestamp: '2026-01-31 09:23 AM',
    status: 'completed',
    fileSize: '2.4 MB'
  },
  {
    id: 'exp-002',
    adminName: 'Michael Torres',
    adminEmail: 'michael.torres@gigbook.ai',
    datasetName: 'Subscriptions List',
    timestamp: '2026-01-31 08:45 AM',
    status: 'completed',
    fileSize: '1.8 MB'
  },
  {
    id: 'exp-003',
    adminName: 'Emma Wilson',
    adminEmail: 'emma.wilson@gigbook.ai',
    datasetName: 'Revenue Summary',
    timestamp: '2026-01-31 07:15 AM',
    status: 'completed',
    fileSize: '385 KB'
  },
  {
    id: 'exp-004',
    adminName: 'James Park',
    adminEmail: 'james.park@gigbook.ai',
    datasetName: 'Users List',
    timestamp: '2026-01-30 04:32 PM',
    status: 'completed',
    fileSize: '2.3 MB'
  },
  {
    id: 'exp-005',
    adminName: 'Sarah Chen',
    adminEmail: 'sarah.chen@gigbook.ai',
    datasetName: 'Revenue Summary',
    timestamp: '2026-01-30 02:18 PM',
    status: 'failed',
    fileSize: '-'
  },
  {
    id: 'exp-006',
    adminName: 'Lisa Rodriguez',
    adminEmail: 'lisa.rodriguez@gigbook.ai',
    datasetName: 'Subscriptions List',
    timestamp: '2026-01-30 11:05 AM',
    status: 'completed',
    fileSize: '1.7 MB'
  },
  {
    id: 'exp-007',
    adminName: 'Michael Torres',
    adminEmail: 'michael.torres@gigbook.ai',
    datasetName: 'Users List',
    timestamp: '2026-01-29 03:42 PM',
    status: 'completed',
    fileSize: '2.3 MB'
  },
  {
    id: 'exp-008',
    adminName: 'Emma Wilson',
    adminEmail: 'emma.wilson@gigbook.ai',
    datasetName: 'Revenue Summary',
    timestamp: '2026-01-29 09:20 AM',
    status: 'completed',
    fileSize: '378 KB'
  },
  {
    id: 'exp-009',
    adminName: 'James Park',
    adminEmail: 'james.park@gigbook.ai',
    datasetName: 'Subscriptions List',
    timestamp: '2026-01-28 05:15 PM',
    status: 'completed',
    fileSize: '1.6 MB'
  },
  {
    id: 'exp-010',
    adminName: 'Sarah Chen',
    adminEmail: 'sarah.chen@gigbook.ai',
    datasetName: 'Users List',
    timestamp: '2026-01-28 01:33 PM',
    status: 'completed',
    fileSize: '2.2 MB'
  },
  {
    id: 'exp-011',
    adminName: 'Lisa Rodriguez',
    adminEmail: 'lisa.rodriguez@gigbook.ai',
    datasetName: 'Revenue Summary',
    timestamp: '2026-01-27 10:48 AM',
    status: 'failed',
    fileSize: '-'
  },
  {
    id: 'exp-012',
    adminName: 'Michael Torres',
    adminEmail: 'michael.torres@gigbook.ai',
    datasetName: 'Subscriptions List',
    timestamp: '2026-01-27 08:22 AM',
    status: 'completed',
    fileSize: '1.7 MB'
  }
];
