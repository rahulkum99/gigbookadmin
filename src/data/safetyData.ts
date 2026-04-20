export type AccountStatus = 'Active' | 'Limited' | 'Suspended';
export type FlagSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type FlagCategory = 'Payment Dispute' | 'Policy Violation' | 'Suspicious Activity' | 'Content Complaint' | 'Security Concern' | 'Abuse Report' | 'Spam' | 'Fraud';
export type ActionType = 'Status Change' | 'Restriction Applied' | 'Access Restored' | 'Account Suspended' | 'Case Opened' | 'Case Closed' | 'Note Added';

export interface FlaggedAccount {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  plan: 'Free' | 'Pro';
  flagReason: string;
  flagCategory: FlagCategory;
  severity: FlagSeverity;
  flagDate: Date;
  currentStatus: AccountStatus;
  assignedAdmin: string;
  resolutionDate: Date | null;
  flagCount: number;
}

export interface SafetyCaseNote {
  id: string;
  caseId: string;
  noteContent: string;
  adminName: string;
  adminEmail: string;
  timestamp: Date;
  actionTaken: string | null;
}

export interface SafetyMetric {
  label: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: Date;
  adminName: string;
  adminEmail: string;
  actionType: ActionType;
  targetUserId: string;
  targetUserName: string;
  actionDetails: string;
  outcome: string;
}

const generateFlaggedAccount = (
  id: number,
  userName: string,
  userEmail: string,
  plan: 'Free' | 'Pro',
  flagReason: string,
  flagCategory: FlagCategory,
  severity: FlagSeverity,
  daysAgo: number,
  currentStatus: AccountStatus,
  assignedAdmin: string,
  resolved: boolean = false,
  flagCount: number = 1
): FlaggedAccount => {
  const flagDate = new Date();
  flagDate.setDate(flagDate.getDate() - daysAgo);

  const resolutionDate = resolved ? new Date(flagDate.getTime() + (Math.random() * 7 * 24 * 60 * 60 * 1000)) : null;

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    id: `case-${id}`,
    userId: `user-${id}`,
    userName,
    userEmail,
    userAvatar: initials,
    plan,
    flagReason,
    flagCategory,
    severity,
    flagDate,
    currentStatus,
    assignedAdmin,
    resolutionDate,
    flagCount,
  };
};

const generateCaseNote = (
  id: number,
  caseId: string,
  noteContent: string,
  adminName: string,
  adminEmail: string,
  daysAgo: number,
  hoursOffset: number = 0,
  actionTaken: string | null = null
): SafetyCaseNote => {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - daysAgo);
  timestamp.setHours(timestamp.getHours() - hoursOffset);

  return {
    id: `note-${id}`,
    caseId,
    noteContent,
    adminName,
    adminEmail,
    timestamp,
    actionTaken,
  };
};

const generateAuditLog = (
  id: number,
  daysAgo: number,
  hoursOffset: number,
  adminName: string,
  adminEmail: string,
  actionType: ActionType,
  targetUserName: string,
  actionDetails: string,
  outcome: string
): AdminAuditLog => {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - daysAgo);
  timestamp.setHours(timestamp.getHours() - hoursOffset);

  return {
    id: `audit-${id}`,
    timestamp,
    adminName,
    adminEmail,
    actionType,
    targetUserId: `user-${id}`,
    targetUserName,
    actionDetails,
    outcome,
  };
};

export const flaggedAccounts: FlaggedAccount[] = [
  generateFlaggedAccount(1, 'Marcus Chen', 'marcus.chen@email.com', 'Pro', 'Multiple chargebacks reported by payment processor', 'Payment Dispute', 'High', 2, 'Limited', 'Admin Sarah Torres', false, 3),
  generateFlaggedAccount(2, 'Jennifer Walsh', 'jennifer.w@company.com', 'Free', 'Reported for hosting unauthorized commercial events', 'Policy Violation', 'Medium', 5, 'Limited', 'Admin Michael Reeves', false, 1),
  generateFlaggedAccount(3, 'David Park', 'david.park@startup.io', 'Pro', 'Unusual login patterns from multiple countries in 24 hours', 'Security Concern', 'Critical', 1, 'Limited', 'Admin Sarah Torres', false, 2),
  generateFlaggedAccount(4, 'Rachel Morrison', 'rachel.m@venue.com', 'Free', 'User complaints about misleading event descriptions', 'Content Complaint', 'Low', 8, 'Active', 'Admin Jessica Kim', false, 1),
  generateFlaggedAccount(5, 'Thomas Silva', 'thomas.silva@events.net', 'Pro', 'Automated bot-like behavior detected creating bulk events', 'Suspicious Activity', 'High', 3, 'Suspended', 'Admin Michael Reeves', false, 4),
  generateFlaggedAccount(6, 'Amanda Foster', 'amanda.f@artist.com', 'Free', 'Reports of harassment in event communications', 'Abuse Report', 'Medium', 15, 'Limited', 'Admin Jessica Kim', false, 2),
  generateFlaggedAccount(7, 'Robert Yang', 'robert.yang@music.co', 'Pro', 'Mass-created duplicate events flagged as spam', 'Spam', 'Medium', 6, 'Limited', 'Admin Sarah Torres', false, 1),
  generateFlaggedAccount(8, 'Lisa Anderson', 'lisa.a@promoter.net', 'Free', 'Attempting to bypass payment system restrictions', 'Fraud', 'Critical', 4, 'Suspended', 'Admin Michael Reeves', false, 3),
  generateFlaggedAccount(9, 'Christopher Bradley', 'chris.b@shows.io', 'Pro', 'Sharing account credentials with multiple users', 'Policy Violation', 'Medium', 7, 'Active', 'Admin Sarah Torres', true, 1),
  generateFlaggedAccount(10, 'Michelle Davis', 'michelle.d@gigs.com', 'Free', 'Event cancellations without proper refund processing', 'Payment Dispute', 'High', 10, 'Limited', 'Admin Jessica Kim', false, 2),
  generateFlaggedAccount(11, 'Daniel Martinez', 'daniel.m@talent.co', 'Pro', 'Suspicious sudden spike in account activity', 'Suspicious Activity', 'Low', 30, 'Limited', 'Admin Michael Reeves', false, 1),
  generateFlaggedAccount(12, 'Ashley Taylor', 'ashley.t@performer.com', 'Free', 'Multiple users reported threatening messages', 'Abuse Report', 'Critical', 45, 'Suspended', 'Admin Sarah Torres', false, 5),
  generateFlaggedAccount(13, 'Brandon Martinez', 'brandon.m@festival.net', 'Pro', 'Copyright infringement in event promotional materials', 'Content Complaint', 'Medium', 12, 'Active', 'Admin Jessica Kim', true, 1),
  generateFlaggedAccount(14, 'Nicole Stevens', 'nicole.s@concert.co', 'Free', 'Attempting SQL injection in search queries', 'Security Concern', 'Critical', 1, 'Suspended', 'Admin Michael Reeves', false, 1),
  generateFlaggedAccount(15, 'Ryan Thompson', 'ryan.t@stage.io', 'Pro', 'Selling counterfeit tickets through platform', 'Fraud', 'High', 9, 'Suspended', 'Admin Sarah Torres', false, 3),
  generateFlaggedAccount(16, 'Stephanie Harris', 'stephanie.h@live.com', 'Free', 'Repeated violation of community guidelines', 'Policy Violation', 'Medium', 19, 'Limited', 'Admin Jessica Kim', false, 4),
  generateFlaggedAccount(17, 'Kevin Clark', 'kevin.c@dj.net', 'Pro', 'Disputed charges after service delivery', 'Payment Dispute', 'Low', 14, 'Active', 'Admin Michael Reeves', true, 1),
  generateFlaggedAccount(18, 'Rachel Lewis', 'rachel.l@musician.co', 'Free', 'Creating fake reviews and ratings manipulation', 'Policy Violation', 'Medium', 20, 'Limited', 'Admin Sarah Torres', false, 2),
  generateFlaggedAccount(19, 'Tyler Young', 'tyler.y@entertainment.net', 'Pro', 'Account showed signs of being compromised', 'Security Concern', 'High', 90, 'Suspended', 'Admin Michael Reeves', false, 2),
  generateFlaggedAccount(20, 'Samantha King', 'samantha.k@show.com', 'Free', 'Excessive spam messaging to other users', 'Spam', 'High', 11, 'Limited', 'Admin Jessica Kim', false, 3),
  generateFlaggedAccount(21, 'Joshua Wright', 'joshua.w@performance.net', 'Pro', 'Using platform for unauthorized data scraping', 'Suspicious Activity', 'Medium', 16, 'Active', 'Admin Sarah Torres', true, 1),
  generateFlaggedAccount(22, 'Elizabeth Scott', 'elizabeth.s@music.io', 'Free', 'Misrepresenting identity and credentials', 'Fraud', 'High', 18, 'Limited', 'Admin Michael Reeves', false, 2),
  generateFlaggedAccount(23, 'Andrew Carter', 'andrew.c@venue.io', 'Pro', 'Hosting events with discriminatory policies', 'Abuse Report', 'High', 13, 'Limited', 'Admin Jessica Kim', false, 1),
  generateFlaggedAccount(24, 'Hannah Martinez', 'hannah.m@artist.co', 'Free', 'Attempting to phish user credentials', 'Security Concern', 'Critical', 2, 'Suspended', 'Admin Sarah Torres', false, 2),
  generateFlaggedAccount(25, 'Nicholas Green', 'nicholas.g@booking.co', 'Pro', 'Violating artist content usage rights', 'Content Complaint', 'Medium', 21, 'Active', 'Admin Michael Reeves', true, 1),
  generateFlaggedAccount(26, 'Olivia Bennett', 'olivia.b@event.com', 'Free', 'Creating shell accounts to abuse referral system', 'Fraud', 'High', 7, 'Limited', 'Admin Jessica Kim', false, 4),
  generateFlaggedAccount(27, 'Matthew Rivera', 'matthew.r@shows.net', 'Pro', 'Repeated late cancellations affecting platform reputation', 'Policy Violation', 'Low', 25, 'Active', 'Admin Sarah Torres', true, 2),
  generateFlaggedAccount(28, 'Emma Rodriguez', 'emma.r@concert.io', 'Free', 'Suspicious payment reversals pattern', 'Payment Dispute', 'Medium', 17, 'Limited', 'Admin Michael Reeves', false, 3),
];

export const safetyCaseNotes: SafetyCaseNote[] = [
  generateCaseNote(1, 'case-1', 'Initial investigation opened after payment processor flagged account for unusual chargeback patterns. Three separate chargebacks in the past 30 days.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 2, 2, 'Case Opened'),
  generateCaseNote(2, 'case-1', 'Contacted user for explanation. User claims services were not as described, but event hosts dispute this claim with photo evidence.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 1, 14, null),
  generateCaseNote(3, 'case-1', 'Applied Limited Mode restriction to prevent new event bookings while investigation continues. Account can still access existing bookings.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 1, 8, 'Restriction Applied'),
  generateCaseNote(4, 'case-1', 'Awaiting response from payment processor on chargeback legitimacy. Case remains under review.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 0, 6, null),

  generateCaseNote(5, 'case-2', 'Multiple venue owners reported that user is hosting ticketed commercial events without proper licensing.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 5, 4, 'Case Opened'),
  generateCaseNote(6, 'case-2', 'Reviewed event history and confirmed three events with commercial characteristics. User profile lists Free tier but activity suggests business use.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 4, 10, null),
  generateCaseNote(7, 'case-2', 'Placed account in Limited Mode. Sent email explaining platform policy regarding commercial events and upgrade requirements.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 4, 3, 'Restriction Applied'),
  generateCaseNote(8, 'case-2', 'User has not responded to outreach. Reviewing whether to require upgrade or maintain restriction.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 3, 8, null),

  generateCaseNote(9, 'case-3', 'Security alert triggered by login attempts from Tokyo, London, and New York within 24-hour period. Account credentials may be compromised.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 1, 6, 'Case Opened'),
  generateCaseNote(10, 'case-3', 'Immediately restricted account and sent security notification to user email. Awaiting user verification.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 1, 5, 'Restriction Applied'),
  generateCaseNote(11, 'case-3', 'User confirmed account compromise. Password reset initiated and 2FA enabled. Reviewing account activity for unauthorized changes.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 0, 12, null),

  generateCaseNote(12, 'case-4', 'Received complaints from three attendees about misleading event information. Event delivered different content than advertised.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 8, 2, 'Case Opened'),
  generateCaseNote(13, 'case-4', 'Reviewed event descriptions and attendee feedback. Issue appears to be miscommunication rather than intentional fraud. Severity downgraded to Low.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 7, 14, null),
  generateCaseNote(14, 'case-4', 'Sent guidance to user on proper event description best practices. No restriction needed at this time. Monitoring for repeat issues.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 7, 8, null),

  generateCaseNote(15, 'case-5', 'Automated monitoring detected account creating 50+ events in under one hour with identical descriptions. Bot behavior suspected.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 3, 4, 'Case Opened'),
  generateCaseNote(16, 'case-5', 'Account suspended immediately to prevent platform spam. Events created appear to be placeholder/test data rather than legitimate bookings.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 3, 3, 'Account Suspended'),
  generateCaseNote(17, 'case-5', 'User contacted claiming API integration testing. No prior approval for API access on this account. Suspension upheld pending investigation.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 2, 10, null),

  generateCaseNote(18, 'case-6', 'Three separate users reported receiving hostile and inappropriate messages through event communication system.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 15, 6, 'Case Opened'),
  generateCaseNote(19, 'case-6', 'Reviewed message history and confirmed policy violations. Messages contained personal attacks and threats.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 14, 18, null),
  generateCaseNote(20, 'case-6', 'Applied Limited Mode to prevent new event creation. User can complete existing obligations but cannot initiate new bookings.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 14, 12, 'Restriction Applied'),
  generateCaseNote(21, 'case-6', 'Sent final warning to user. Further violations will result in permanent suspension.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 14, 8, null),

  generateCaseNote(22, 'case-10', 'Multiple attendees reported that events were cancelled without refunds being processed as promised.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 10, 4, 'Case Opened'),
  generateCaseNote(23, 'case-10', 'Account placed in Limited Mode. Working with payment team to ensure refunds are processed for affected attendees.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 9, 12, 'Restriction Applied'),
  generateCaseNote(24, 'case-10', 'User claims technical issues prevented refund processing. Provided guidance on proper cancellation procedures.', 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 8, 16, null),

  generateCaseNote(25, 'case-12', 'Multiple users reported receiving threatening and harassing messages. Content violates community standards and potentially involves offline threats.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 45, 2, 'Case Opened'),
  generateCaseNote(26, 'case-12', 'Account suspended immediately due to severity. Law enforcement contacted per company policy for credible threats.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 45, 1, 'Account Suspended'),
  generateCaseNote(27, 'case-12', 'Case escalated to legal team. Suspension remains in effect pending investigation outcome.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 44, 8, null),

  generateCaseNote(28, 'case-14', 'Security team detected SQL injection attempt in event search functionality. Attack patterns logged and source IP tracked.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 1, 3, 'Case Opened'),
  generateCaseNote(29, 'case-14', 'Account suspended immediately. Security vulnerability patched. Incident reported to security team for further investigation.', 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 1, 2, 'Account Suspended'),

  generateCaseNote(30, 'case-15', 'Reports from attendees about receiving counterfeit tickets. User appears to be operating ticket fraud scheme through platform.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 9, 6, 'Case Opened'),
  generateCaseNote(31, 'case-15', 'Account suspended and all active events cancelled. Working with affected users on refunds. Case escalated to legal team.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 9, 4, 'Account Suspended'),
  generateCaseNote(32, 'case-15', 'Law enforcement notified. Permanent ban implemented. Fraud protection measures updated to prevent similar schemes.', 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 8, 14, null),
];

export const safetyMetrics: SafetyMetric[] = [
  {
    label: 'Accounts Limited',
    value: 8,
    change: -2,
    changeLabel: 'vs last week',
    icon: 'Shield',
  },
  {
    label: 'Accounts Suspended',
    value: 3,
    change: 1,
    changeLabel: 'vs last week',
    icon: 'Ban',
  },
  {
    label: 'Flags This Week',
    value: 12,
    change: 4,
    changeLabel: 'vs last week',
    icon: 'Flag',
  },
  {
    label: 'Cases Under Review',
    value: 6,
    change: -1,
    changeLabel: 'vs last week',
    icon: 'AlertTriangle',
  },
];

export const adminAuditLogs: AdminAuditLog[] = [
  generateAuditLog(1, 0, 2, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Case Opened', 'David Park', 'New security concern case opened for unusual login patterns', 'Case under investigation'),
  generateAuditLog(2, 0, 6, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Restriction Applied', 'David Park', 'Account moved to Limited Mode due to security concern', 'Restriction active'),
  generateAuditLog(3, 1, 3, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Account Suspended', 'Nicole Stevens', 'Account suspended for attempted SQL injection attack', 'Suspension active'),
  generateAuditLog(4, 1, 8, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Note Added', 'Marcus Chen', 'Added investigation notes regarding chargeback patterns', 'Note recorded'),
  generateAuditLog(5, 1, 14, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Restriction Applied', 'Marcus Chen', 'Applied Limited Mode restriction pending payment investigation', 'Restriction active'),
  generateAuditLog(6, 2, 4, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Case Opened', 'Marcus Chen', 'Payment dispute case opened for multiple chargebacks', 'Case under investigation'),
  generateAuditLog(7, 2, 10, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Note Added', 'Thomas Silva', 'Documented bot-like behavior patterns in account activity', 'Note recorded'),
  generateAuditLog(8, 3, 3, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Account Suspended', 'Thomas Silva', 'Account suspended for automated spam event creation', 'Suspension active'),
  generateAuditLog(9, 3, 4, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Case Opened', 'Thomas Silva', 'Suspicious activity case opened for bulk event creation', 'Case under investigation'),
  generateAuditLog(10, 4, 8, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Account Suspended', 'Lisa Anderson', 'Account suspended for attempting payment bypass fraud', 'Suspension active'),
  generateAuditLog(11, 4, 10, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Jennifer Walsh', 'Applied Limited Mode for unauthorized commercial event hosting', 'Restriction active'),
  generateAuditLog(12, 5, 4, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Case Opened', 'Jennifer Walsh', 'Policy violation case opened for commercial events on Free tier', 'Case under investigation'),
  generateAuditLog(13, 6, 12, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Restriction Applied', 'Robert Yang', 'Applied Limited Mode for spam event creation', 'Restriction active'),
  generateAuditLog(14, 7, 6, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Access Restored', 'Christopher Bradley', 'Restored full access after resolving credential sharing issue', 'Account active'),
  generateAuditLog(15, 7, 18, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Status Change', 'Christopher Bradley', 'Account status changed from Limited to Active', 'Status updated'),
  generateAuditLog(16, 8, 2, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Note Added', 'Rachel Morrison', 'Added notes from user complaints about event descriptions', 'Note recorded'),
  generateAuditLog(17, 8, 4, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Case Opened', 'Rachel Morrison', 'Content complaint case opened for misleading event info', 'Case under investigation'),
  generateAuditLog(18, 9, 6, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Note Added', 'Ryan Thompson', 'Documented evidence of counterfeit ticket sales', 'Note recorded'),
  generateAuditLog(19, 9, 8, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Account Suspended', 'Ryan Thompson', 'Account suspended for selling counterfeit tickets', 'Suspension active'),
  generateAuditLog(20, 10, 4, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Michelle Davis', 'Applied Limited Mode for refund processing issues', 'Restriction active'),
  generateAuditLog(21, 11, 8, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Samantha King', 'Applied Limited Mode for excessive spam messaging', 'Restriction active'),
  generateAuditLog(22, 12, 4, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Case Closed', 'Brandon Martinez', 'Copyright case resolved after content removal', 'Case closed'),
  generateAuditLog(23, 12, 16, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Access Restored', 'Brandon Martinez', 'Restored full access after copyright issue resolution', 'Account active'),
  generateAuditLog(24, 13, 6, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Andrew Carter', 'Applied Limited Mode for discriminatory event policies', 'Restriction active'),
  generateAuditLog(25, 14, 2, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Case Closed', 'Kevin Clark', 'Payment dispute resolved in user favor', 'Case closed'),
  generateAuditLog(26, 14, 10, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Access Restored', 'Kevin Clark', 'Restored full access after payment dispute resolution', 'Account active'),
  generateAuditLog(27, 15, 6, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Note Added', 'Amanda Foster', 'Documented harassment reports and evidence', 'Note recorded'),
  generateAuditLog(28, 15, 12, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Amanda Foster', 'Applied Limited Mode for harassment violations', 'Restriction active'),
  generateAuditLog(29, 16, 8, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Case Closed', 'Joshua Wright', 'Data scraping case resolved after warning', 'Case closed'),
  generateAuditLog(30, 16, 14, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Access Restored', 'Joshua Wright', 'Restored full access with monitoring enabled', 'Account active'),
  generateAuditLog(31, 18, 4, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Restriction Applied', 'Elizabeth Scott', 'Applied Limited Mode for identity misrepresentation', 'Restriction active'),
  generateAuditLog(32, 19, 8, 'Admin Jessica Kim', 'jessica.kim@gigbookai.com', 'Restriction Applied', 'Stephanie Harris', 'Applied Limited Mode for repeated guideline violations', 'Restriction active'),
  generateAuditLog(33, 20, 6, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Restriction Applied', 'Rachel Lewis', 'Applied Limited Mode for fake reviews and rating manipulation', 'Restriction active'),
  generateAuditLog(34, 21, 12, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Case Closed', 'Nicholas Green', 'Content rights case resolved after license verification', 'Case closed'),
  generateAuditLog(35, 21, 18, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Access Restored', 'Nicholas Green', 'Restored full access after rights issue resolution', 'Account active'),
  generateAuditLog(36, 25, 4, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Case Closed', 'Matthew Rivera', 'Cancellation pattern case resolved with user education', 'Case closed'),
  generateAuditLog(37, 25, 8, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Access Restored', 'Matthew Rivera', 'Maintained Active status after review', 'Account active'),
  generateAuditLog(38, 30, 6, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Restriction Applied', 'Daniel Martinez', 'Applied Limited Mode for suspicious activity spike', 'Restriction active'),
  generateAuditLog(39, 45, 1, 'Admin Sarah Torres', 'sarah.torres@gigbookai.com', 'Account Suspended', 'Ashley Taylor', 'Account suspended for threatening messages and abuse', 'Suspension active'),
  generateAuditLog(40, 90, 4, 'Admin Michael Reeves', 'michael.reeves@gigbookai.com', 'Account Suspended', 'Tyler Young', 'Account suspended for compromise and unauthorized access', 'Suspension active'),
];
