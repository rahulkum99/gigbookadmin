export interface ReviewMetric {
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
}

export interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

export interface Review {
  id: string;
  reviewer: {
    name: string;
    email: string;
  };
  subject: {
    name: string;
    type: 'Event' | 'User' | 'Venue';
  };
  rating: number;
  comment: string;
  status: 'Published' | 'Pending' | 'Hidden' | 'Flagged';
  dateSubmitted: string;
}

export interface FlaggedReview {
  id: string;
  reviewer: {
    name: string;
    email: string;
  };
  subject: {
    name: string;
    type: 'Event' | 'User' | 'Venue';
  };
  rating: number;
  comment: string;
  flagReason: string;
  dateFlagged: string;
}

export const reviewMetrics: ReviewMetric[] = [
  {
    label: 'Total Reviews',
    value: 4821,
    trend: 9.4,
    trendLabel: 'vs last month',
  },
  {
    label: 'Average Rating',
    value: 4.3,
    trend: 0.2,
    trendLabel: 'vs last month',
  },
  {
    label: 'Pending Moderation',
    value: 47,
    trend: -12.5,
    trendLabel: 'vs last week',
  },
  {
    label: 'Flagged Reviews',
    value: 18,
    trend: 3.1,
    trendLabel: 'vs last week',
  },
];

export const ratingDistribution: RatingDistribution[] = [
  { stars: 5, count: 2145, percentage: 44.5 },
  { stars: 4, count: 1523, percentage: 31.6 },
  { stars: 3, count: 687, percentage: 14.2 },
  { stars: 2, count: 312, percentage: 6.5 },
  { stars: 1, count: 154, percentage: 3.2 },
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    reviewer: { name: 'Sarah Mitchell', email: 'sarah.m@email.com' },
    subject: { name: 'Summer Jazz Festival', type: 'Event' },
    rating: 5,
    comment: 'Amazing lineup and great organization. Will definitely attend again next year!',
    status: 'Published',
    dateSubmitted: '2026-05-17T14:30:00Z',
  },
  {
    id: 'rev-2',
    reviewer: { name: 'James Chen', email: 'j.chen@email.com' },
    subject: { name: 'The Blue Note Lounge', type: 'Venue' },
    rating: 4,
    comment: 'Great acoustics and friendly staff. Parking was a bit difficult to find.',
    status: 'Published',
    dateSubmitted: '2026-05-16T09:15:00Z',
  },
  {
    id: 'rev-3',
    reviewer: { name: 'Emily Rodriguez', email: 'emily.r@email.com' },
    subject: { name: 'Marcus Williams', type: 'User' },
    rating: 5,
    comment: 'Professional and responsive throughout the booking process.',
    status: 'Published',
    dateSubmitted: '2026-05-15T18:45:00Z',
  },
  {
    id: 'rev-4',
    reviewer: { name: 'David Park', email: 'd.park@email.com' },
    subject: { name: 'Indie Rock Showcase', type: 'Event' },
    rating: 2,
    comment: 'Sound quality was poor and the event started over an hour late.',
    status: 'Pending',
    dateSubmitted: '2026-05-15T11:20:00Z',
  },
  {
    id: 'rev-5',
    reviewer: { name: 'Lisa Thompson', email: 'lisa.t@email.com' },
    subject: { name: 'Downtown Arts Center', type: 'Venue' },
    rating: 3,
    comment: 'Decent venue but the seating arrangement could be improved.',
    status: 'Published',
    dateSubmitted: '2026-05-14T16:00:00Z',
  },
  {
    id: 'rev-6',
    reviewer: { name: 'Michael Brown', email: 'm.brown@email.com' },
    subject: { name: 'Acoustic Night Live', type: 'Event' },
    rating: 1,
    comment: 'Complete waste of money. Nothing like what was advertised.',
    status: 'Flagged',
    dateSubmitted: '2026-05-13T20:30:00Z',
  },
  {
    id: 'rev-7',
    reviewer: { name: 'Anna Kowalski', email: 'anna.k@email.com' },
    subject: { name: 'Rachel Lewis', type: 'User' },
    rating: 4,
    comment: 'Very helpful with event coordination and quick to respond.',
    status: 'Published',
    dateSubmitted: '2026-05-12T13:10:00Z',
  },
  {
    id: 'rev-8',
    reviewer: { name: 'Tom Wilson', email: 't.wilson@email.com' },
    subject: { name: 'Classical Evening', type: 'Event' },
    rating: 5,
    comment: 'A truly memorable performance. The venue added to the experience.',
    status: 'Published',
    dateSubmitted: '2026-05-11T19:00:00Z',
  },
  {
    id: 'rev-9',
    reviewer: { name: 'Jennifer Lee', email: 'j.lee@email.com' },
    subject: { name: 'Metro Music Hall', type: 'Venue' },
    rating: 4,
    comment: 'Clean facilities and excellent stage setup for live performances.',
    status: 'Pending',
    dateSubmitted: '2026-05-10T10:45:00Z',
  },
  {
    id: 'rev-10',
    reviewer: { name: 'Robert Garcia', email: 'r.garcia@email.com' },
    subject: { name: 'Open Mic Night', type: 'Event' },
    rating: 3,
    comment: 'Fun atmosphere but the sign-up process was confusing.',
    status: 'Hidden',
    dateSubmitted: '2026-05-09T22:15:00Z',
  },
];

export const flaggedReviews: FlaggedReview[] = [
  {
    id: 'flag-1',
    reviewer: { name: 'Michael Brown', email: 'm.brown@email.com' },
    subject: { name: 'Acoustic Night Live', type: 'Event' },
    rating: 1,
    comment: 'Complete waste of money. Nothing like what was advertised.',
    flagReason: 'Potential defamation — organizer disputes factual claims',
    dateFlagged: '2026-05-14T08:00:00Z',
  },
  {
    id: 'flag-2',
    reviewer: { name: 'Chris Adams', email: 'c.adams@email.com' },
    subject: { name: 'DJ Pulse', type: 'User' },
    rating: 1,
    comment: 'Terrible experience, avoid at all costs!!! SCAM ARTIST!!!',
    flagReason: 'Abusive language and spam-like content',
    dateFlagged: '2026-05-13T15:30:00Z',
  },
  {
    id: 'flag-3',
    reviewer: { name: 'Unknown User', email: 'fake.reviews@tempmail.com' },
    subject: { name: 'Premium Events Co.', type: 'User' },
    rating: 5,
    comment: 'Best company ever! Five stars! Amazing amazing amazing!',
    flagReason: 'Suspected fake review — new account, repetitive language',
    dateFlagged: '2026-05-12T11:00:00Z',
  },
];
