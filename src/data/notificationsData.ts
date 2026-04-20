export interface NotificationType {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'system' | 'user' | 'business';
}

export interface NotificationChannel {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  description: string;
}

export interface EmergencyBroadcast {
  message: string;
  ctaText: string;
}

export interface NotificationActivity {
  id: string;
  type: string;
  targetAudience: 'All users' | 'Segment' | 'Individual';
  segmentName?: string;
  timestamp: string;
  status: 'Sent' | 'Failed' | 'Scheduled';
  deliveryCount: number;
  failureReason?: string;
}

export const notificationTypes: NotificationType[] = [
  {
    id: 'event-reminders',
    name: 'Event Reminders',
    description: 'Notify users about upcoming events and bookings',
    enabled: true,
    category: 'user'
  },
  {
    id: 'collaboration-invites',
    name: 'Collaboration Invites',
    description: 'Alert users when they are invited to collaborate on projects',
    enabled: true,
    category: 'user'
  },
  {
    id: 'subscription-updates',
    name: 'Subscription Status Updates',
    description: 'Inform users about subscription changes, renewals, and expirations',
    enabled: true,
    category: 'business'
  },
  {
    id: 'system-alerts',
    name: 'System Alerts',
    description: 'Critical system notifications and platform maintenance updates',
    enabled: false,
    category: 'system'
  }
];

export const notificationChannels: NotificationChannel[] = [
  {
    id: 'push',
    name: 'Push Notifications',
    status: 'active',
    description: 'Mobile and browser push notifications'
  },
  {
    id: 'in-app',
    name: 'In-App Notifications',
    status: 'active',
    description: 'Notifications displayed within the application'
  },
  {
    id: 'email',
    name: 'Email',
    status: 'inactive',
    description: 'Email notification delivery (currently disabled)'
  }
];

export const emergencyBroadcast: EmergencyBroadcast = {
  message: '',
  ctaText: ''
};

export const notificationActivities: NotificationActivity[] = [
  {
    id: 'NOTIF-001',
    type: 'Event Reminder',
    targetAudience: 'Segment',
    segmentName: 'Premium Users',
    timestamp: '2026-01-31T10:30:00Z',
    status: 'Sent',
    deliveryCount: 1247
  },
  {
    id: 'NOTIF-002',
    type: 'Subscription Renewal',
    targetAudience: 'Segment',
    segmentName: 'Monthly Subscribers',
    timestamp: '2026-01-31T08:15:00Z',
    status: 'Sent',
    deliveryCount: 3842
  },
  {
    id: 'NOTIF-003',
    type: 'System Alert',
    targetAudience: 'All users',
    timestamp: '2026-01-30T22:45:00Z',
    status: 'Sent',
    deliveryCount: 12847
  },
  {
    id: 'NOTIF-004',
    type: 'Collaboration Invite',
    targetAudience: 'Individual',
    timestamp: '2026-01-30T16:20:00Z',
    status: 'Sent',
    deliveryCount: 1
  },
  {
    id: 'NOTIF-005',
    type: 'Event Reminder',
    targetAudience: 'Segment',
    segmentName: 'Event Attendees',
    timestamp: '2026-01-30T14:00:00Z',
    status: 'Failed',
    deliveryCount: 0,
    failureReason: 'Service temporarily unavailable'
  },
  {
    id: 'NOTIF-006',
    type: 'Subscription Expiration',
    targetAudience: 'Segment',
    segmentName: 'Expiring Soon',
    timestamp: '2026-01-30T09:30:00Z',
    status: 'Sent',
    deliveryCount: 284
  },
  {
    id: 'NOTIF-007',
    type: 'Event Reminder',
    targetAudience: 'Segment',
    segmentName: 'Today\'s Events',
    timestamp: '2026-01-29T07:00:00Z',
    status: 'Sent',
    deliveryCount: 892
  },
  {
    id: 'NOTIF-008',
    type: 'Collaboration Invite',
    targetAudience: 'Individual',
    timestamp: '2026-01-29T13:45:00Z',
    status: 'Sent',
    deliveryCount: 1
  },
  {
    id: 'NOTIF-009',
    type: 'System Maintenance',
    targetAudience: 'All users',
    timestamp: '2026-01-28T18:00:00Z',
    status: 'Sent',
    deliveryCount: 12847
  },
  {
    id: 'NOTIF-010',
    type: 'Subscription Upgrade',
    targetAudience: 'Segment',
    segmentName: 'Free Users',
    timestamp: '2026-01-28T11:20:00Z',
    status: 'Sent',
    deliveryCount: 5621
  },
  {
    id: 'NOTIF-011',
    type: 'Event Reminder',
    targetAudience: 'Individual',
    timestamp: '2026-01-27T15:30:00Z',
    status: 'Sent',
    deliveryCount: 1
  },
  {
    id: 'NOTIF-012',
    type: 'Collaboration Invite',
    targetAudience: 'Segment',
    segmentName: 'Team Leaders',
    timestamp: '2026-01-27T10:15:00Z',
    status: 'Sent',
    deliveryCount: 147
  },
  {
    id: 'NOTIF-013',
    type: 'System Alert',
    targetAudience: 'All users',
    timestamp: '2026-01-26T20:30:00Z',
    status: 'Failed',
    deliveryCount: 0,
    failureReason: 'Rate limit exceeded'
  },
  {
    id: 'NOTIF-014',
    type: 'Subscription Renewal',
    targetAudience: 'Segment',
    segmentName: 'Annual Subscribers',
    timestamp: '2026-01-26T08:00:00Z',
    status: 'Sent',
    deliveryCount: 1264
  },
  {
    id: 'NOTIF-015',
    type: 'Event Cancellation',
    targetAudience: 'Segment',
    segmentName: 'Affected Attendees',
    timestamp: '2026-01-25T16:45:00Z',
    status: 'Sent',
    deliveryCount: 43
  },
  {
    id: 'NOTIF-016',
    type: 'Collaboration Invite',
    targetAudience: 'Individual',
    timestamp: '2026-01-25T12:30:00Z',
    status: 'Sent',
    deliveryCount: 1
  },
  {
    id: 'NOTIF-017',
    type: 'Subscription Status',
    targetAudience: 'Segment',
    segmentName: 'Trial Users',
    timestamp: '2026-01-24T09:00:00Z',
    status: 'Sent',
    deliveryCount: 736
  },
  {
    id: 'NOTIF-018',
    type: 'Event Reminder',
    targetAudience: 'Segment',
    segmentName: 'Weekend Events',
    timestamp: '2026-01-23T18:00:00Z',
    status: 'Sent',
    deliveryCount: 1542
  },
  {
    id: 'NOTIF-019',
    type: 'System Update',
    targetAudience: 'All users',
    timestamp: '2026-01-22T14:20:00Z',
    status: 'Sent',
    deliveryCount: 12847
  },
  {
    id: 'NOTIF-020',
    type: 'Collaboration Invite',
    targetAudience: 'Individual',
    timestamp: '2026-01-21T11:15:00Z',
    status: 'Sent',
    deliveryCount: 1
  }
];
