export interface ReferralMetric {
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
}

export interface ProgramConfig {
  isEnabled: boolean;
  maxDiscountPerReferral: number;
  validityWindowDays: number;
}

export interface PerformanceInsight {
  label: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface ReferralActivity {
  id: string;
  referringUser: {
    name: string;
    email: string;
    avatar?: string;
  };
  referredUser: {
    name: string;
    email: string;
    avatar?: string;
  };
  status: 'Pending' | 'Converted' | 'Rewarded';
  discountApplied: number;
  dateReferred: string;
  dateConverted?: string;
}

export interface AbuseMonitoring {
  flaggedCount: number;
  highActivityUsers: {
    name: string;
    email: string;
    referralCount: number;
    flagReason: string;
  }[];
}

export const referralMetrics: ReferralMetric[] = [
  {
    label: 'Total Referral Links',
    value: 2847,
    trend: 12.5,
    trendLabel: 'vs last month'
  },
  {
    label: 'Successful Referrals',
    value: 1243,
    trend: 8.3,
    trendLabel: 'vs last month'
  },
  {
    label: 'Pending Referrals',
    value: 384,
    trend: -3.2,
    trendLabel: 'vs last month'
  },
  {
    label: 'Discounts Applied',
    value: 18650,
    trend: 15.7,
    trendLabel: 'total value ($)'
  }
];

export const programConfig: ProgramConfig = {
  isEnabled: true,
  maxDiscountPerReferral: 20,
  validityWindowDays: 30
};

export const performanceInsights: PerformanceInsight[] = [
  {
    label: 'Referral-to-Signup Rate',
    value: '68.4%',
    description: 'Percentage of referral links that result in signups',
    trend: 'up',
    trendValue: '+5.2%'
  },
  {
    label: 'Referral-to-Paid Rate',
    value: '43.7%',
    description: 'Percentage of referred users who become paying customers',
    trend: 'up',
    trendValue: '+3.8%'
  },
  {
    label: 'Avg Referrals per User',
    value: '2.3',
    description: 'Average number of successful referrals per active user',
    trend: 'neutral',
    trendValue: '0.0%'
  }
];

export const referralActivities: ReferralActivity[] = [
  {
    id: 'REF-001',
    referringUser: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com'
    },
    referredUser: {
      name: 'James Chen',
      email: 'james.chen@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-28T14:23:00Z',
    dateConverted: '2026-01-28T15:45:00Z'
  },
  {
    id: 'REF-002',
    referringUser: {
      name: 'Michael Rodriguez',
      email: 'michael.r@example.com'
    },
    referredUser: {
      name: 'Emily Thompson',
      email: 'emily.thompson@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-27T09:15:00Z',
    dateConverted: '2026-01-28T11:20:00Z'
  },
  {
    id: 'REF-003',
    referringUser: {
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com'
    },
    referredUser: {
      name: 'David Park',
      email: 'david.park@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-30T16:42:00Z'
  },
  {
    id: 'REF-004',
    referringUser: {
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com'
    },
    referredUser: {
      name: 'Jennifer Lee',
      email: 'jennifer.lee@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-25T13:30:00Z',
    dateConverted: '2026-01-26T10:15:00Z'
  },
  {
    id: 'REF-005',
    referringUser: {
      name: 'Amanda Foster',
      email: 'amanda.foster@example.com'
    },
    referredUser: {
      name: 'Christopher Wang',
      email: 'chris.wang@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-26T08:20:00Z',
    dateConverted: '2026-01-27T14:30:00Z'
  },
  {
    id: 'REF-006',
    referringUser: {
      name: 'Kevin Martinez',
      email: 'kevin.martinez@example.com'
    },
    referredUser: {
      name: 'Michelle Brown',
      email: 'michelle.brown@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-29T11:05:00Z'
  },
  {
    id: 'REF-007',
    referringUser: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com'
    },
    referredUser: {
      name: 'Daniel Kim',
      email: 'daniel.kim@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-24T15:50:00Z',
    dateConverted: '2026-01-25T09:20:00Z'
  },
  {
    id: 'REF-008',
    referringUser: {
      name: 'Brian Wilson',
      email: 'brian.wilson@example.com'
    },
    referredUser: {
      name: 'Ashley Davis',
      email: 'ashley.davis@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-23T10:25:00Z',
    dateConverted: '2026-01-24T16:40:00Z'
  },
  {
    id: 'REF-009',
    referringUser: {
      name: 'Jessica Turner',
      email: 'jessica.turner@example.com'
    },
    referredUser: {
      name: 'Matthew Johnson',
      email: 'matthew.j@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-31T09:30:00Z'
  },
  {
    id: 'REF-010',
    referringUser: {
      name: 'Michael Rodriguez',
      email: 'michael.r@example.com'
    },
    referredUser: {
      name: 'Nicole Garcia',
      email: 'nicole.garcia@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-22T14:15:00Z',
    dateConverted: '2026-01-23T11:30:00Z'
  },
  {
    id: 'REF-011',
    referringUser: {
      name: 'Thomas Wright',
      email: 'thomas.wright@example.com'
    },
    referredUser: {
      name: 'Rachel Moore',
      email: 'rachel.moore@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-21T16:45:00Z',
    dateConverted: '2026-01-22T13:20:00Z'
  },
  {
    id: 'REF-012',
    referringUser: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com'
    },
    referredUser: {
      name: 'Andrew Phillips',
      email: 'andrew.phillips@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-30T13:20:00Z'
  },
  {
    id: 'REF-013',
    referringUser: {
      name: 'Jennifer Adams',
      email: 'jennifer.adams@example.com'
    },
    referredUser: {
      name: 'Steven Clark',
      email: 'steven.clark@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-20T11:10:00Z',
    dateConverted: '2026-01-21T15:25:00Z'
  },
  {
    id: 'REF-014',
    referringUser: {
      name: 'Patricia Lewis',
      email: 'patricia.lewis@example.com'
    },
    referredUser: {
      name: 'Ryan Hall',
      email: 'ryan.hall@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-19T09:35:00Z',
    dateConverted: '2026-01-20T14:50:00Z'
  },
  {
    id: 'REF-015',
    referringUser: {
      name: 'Michael Rodriguez',
      email: 'michael.r@example.com'
    },
    referredUser: {
      name: 'Stephanie Allen',
      email: 'stephanie.allen@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-29T15:55:00Z'
  },
  {
    id: 'REF-016',
    referringUser: {
      name: 'Charles Baker',
      email: 'charles.baker@example.com'
    },
    referredUser: {
      name: 'Laura Martinez',
      email: 'laura.martinez@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-18T12:40:00Z',
    dateConverted: '2026-01-19T10:15:00Z'
  },
  {
    id: 'REF-017',
    referringUser: {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com'
    },
    referredUser: {
      name: 'Joshua Young',
      email: 'joshua.young@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-17T14:25:00Z',
    dateConverted: '2026-01-18T16:30:00Z'
  },
  {
    id: 'REF-018',
    referringUser: {
      name: 'Karen White',
      email: 'karen.white@example.com'
    },
    referredUser: {
      name: 'Brandon Scott',
      email: 'brandon.scott@example.com'
    },
    status: 'Pending',
    discountApplied: 0,
    dateReferred: '2026-01-31T10:45:00Z'
  },
  {
    id: 'REF-019',
    referringUser: {
      name: 'Richard Green',
      email: 'richard.green@example.com'
    },
    referredUser: {
      name: 'Megan Hill',
      email: 'megan.hill@example.com'
    },
    status: 'Rewarded',
    discountApplied: 20,
    dateReferred: '2026-01-16T13:15:00Z',
    dateConverted: '2026-01-17T11:40:00Z'
  },
  {
    id: 'REF-020',
    referringUser: {
      name: 'Michael Rodriguez',
      email: 'michael.r@example.com'
    },
    referredUser: {
      name: 'Katherine Evans',
      email: 'katherine.evans@example.com'
    },
    status: 'Converted',
    discountApplied: 20,
    dateReferred: '2026-01-15T15:30:00Z',
    dateConverted: '2026-01-16T09:55:00Z'
  }
];

export const abuseMonitoring: AbuseMonitoring = {
  flaggedCount: 7,
  highActivityUsers: [
    {
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com',
      referralCount: 47,
      flagReason: 'Unusually high referral volume in 30 days'
    },
    {
      name: 'Michael Rodriguez',
      email: 'michael.r@example.com',
      referralCount: 38,
      flagReason: 'Multiple referrals from same IP addresses'
    },
    {
      name: 'Anonymous User #3421',
      email: 'user3421@example.com',
      referralCount: 29,
      flagReason: 'Rapid sequential referrals detected'
    }
  ]
};
