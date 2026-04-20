export interface EventParticipant {
  id: string;
  name: string;
  accessLevel: 'Basic' | 'Collaborator' | 'Full';
  role: 'Artist' | 'Team Member' | 'Manager' | 'Vendor' | 'Staff';
  avatarFallback: string;
}

export interface EventTimelineItem {
  id: string;
  action: 'created' | 'participant_added' | 'status_changed' | 'updated';
  timestamp: Date;
  description: string;
  details?: string;
}

export interface Event {
  id: string;
  title: string;
  eventType: string;
  eventDate: Date;
  venue: string;
  clientName: string;
  status: 'Inquiry' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdOn: Date;
  owner: {
    name: string;
    avatarFallback: string;
  };
  participantCount: number;
  participants: EventParticipant[];
  timeline: EventTimelineItem[];
}

export interface EventFilterState {
  status: 'All' | 'Inquiry' | 'Confirmed' | 'Completed' | 'Cancelled';
  dateRange: 'All' | 'Recent' | 'Older';
  highParticipants: boolean;
}

const userNames = [
  { name: 'Sarah Mitchell', initials: 'SM' },
  { name: 'James Rodriguez', initials: 'JR' },
  { name: 'Emily Chen', initials: 'EC' },
  { name: 'Michael Thompson', initials: 'MT' },
  { name: 'Jessica Williams', initials: 'JW' },
  { name: 'David Kim', initials: 'DK' },
  { name: 'Amanda Foster', initials: 'AF' },
  { name: 'Robert Garcia', initials: 'RG' },
  { name: 'Lisa Anderson', initials: 'LA' },
  { name: 'Christopher Lee', initials: 'CL' },
];

const participantNames = [
  { name: 'Marcus Johnson', initials: 'MJ', role: 'Artist' as const },
  { name: 'Sophia Martinez', initials: 'SM', role: 'Team Member' as const },
  { name: 'Oliver Brown', initials: 'OB', role: 'Manager' as const },
  { name: 'Emma Wilson', initials: 'EW', role: 'Artist' as const },
  { name: 'Noah Davis', initials: 'ND', role: 'Vendor' as const },
  { name: 'Ava Taylor', initials: 'AT', role: 'Staff' as const },
  { name: 'Liam Anderson', initials: 'LA', role: 'Team Member' as const },
  { name: 'Isabella Thomas', initials: 'IT', role: 'Artist' as const },
  { name: 'Ethan Jackson', initials: 'EJ', role: 'Manager' as const },
  { name: 'Mia White', initials: 'MW', role: 'Staff' as const },
  { name: 'Mason Harris', initials: 'MH', role: 'Vendor' as const },
  { name: 'Charlotte Martin', initials: 'CM', role: 'Team Member' as const },
  { name: 'William Garcia', initials: 'WG', role: 'Artist' as const },
  { name: 'Amelia Robinson', initials: 'AR', role: 'Staff' as const },
  { name: 'James Clark', initials: 'JC', role: 'Manager' as const },
];

const generateParticipants = (count: number): EventParticipant[] => {
  const shuffled = [...participantNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((p, idx) => ({
    id: `participant-${idx}`,
    name: p.name,
    accessLevel: idx === 0 ? 'Full' : idx < count / 2 ? 'Collaborator' : 'Basic',
    role: p.role,
    avatarFallback: p.initials,
  }));
};

const generateTimeline = (
  eventId: string,
  createdDate: Date,
  status: Event['status'],
  participantCount: number
): EventTimelineItem[] => {
  const timeline: EventTimelineItem[] = [];

  timeline.push({
    id: `${eventId}-timeline-1`,
    action: 'created',
    timestamp: createdDate,
    description: 'Event created',
    details: 'Initial event setup completed',
  });

  const addParticipantDate = new Date(createdDate);
  addParticipantDate.setDate(addParticipantDate.getDate() + 2);
  timeline.push({
    id: `${eventId}-timeline-2`,
    action: 'participant_added',
    timestamp: addParticipantDate,
    description: `${participantCount} participants added`,
    details: 'Team members invited to collaborate',
  });

  if (status === 'Confirmed' || status === 'Completed') {
    const confirmedDate = new Date(createdDate);
    confirmedDate.setDate(confirmedDate.getDate() + 5);
    timeline.push({
      id: `${eventId}-timeline-3`,
      action: 'status_changed',
      timestamp: confirmedDate,
      description: 'Status changed to Confirmed',
      details: 'Event confirmed by client',
    });
  }

  if (status === 'Completed') {
    const completedDate = new Date(createdDate);
    completedDate.setDate(completedDate.getDate() + 15);
    timeline.push({
      id: `${eventId}-timeline-4`,
      action: 'status_changed',
      timestamp: completedDate,
      description: 'Status changed to Completed',
      details: 'Event successfully finished',
    });
  }

  if (status === 'Cancelled') {
    const cancelledDate = new Date(createdDate);
    cancelledDate.setDate(cancelledDate.getDate() + 3);
    timeline.push({
      id: `${eventId}-timeline-3`,
      action: 'status_changed',
      timestamp: cancelledDate,
      description: 'Status changed to Cancelled',
      details: 'Event cancelled by request',
    });
  }

  return timeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const generateEvent = (
  id: number,
  title: string,
  eventType: string,
  venue: string,
  clientName: string,
  ownerIndex: number,
  daysUntilEvent: number,
  daysAgoCreated: number,
  status: Event['status'],
  participantCount: number
): Event => {
  const createdOn = new Date();
  createdOn.setDate(createdOn.getDate() - daysAgoCreated);

  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + daysUntilEvent);
  eventDate.setHours(19, 0, 0, 0);

  const owner = userNames[ownerIndex % userNames.length];
  const participants = generateParticipants(participantCount);
  const timeline = generateTimeline(`event-${id}`, createdOn, status, participantCount);

  return {
    id: `event-${id}`,
    title,
    eventType,
    eventDate,
    venue,
    clientName,
    status,
    createdOn,
    owner: {
      name: owner.name,
      avatarFallback: owner.initials,
    },
    participantCount,
    participants,
    timeline,
  };
};

export const eventsData: Event[] = [
  generateEvent(1, 'Summer Music Festival 2024', 'Festival', 'Central Park Amphitheater', 'NYC Events Co', 0, 45, 90, 'Confirmed', 18),
  generateEvent(2, 'Corporate Holiday Gala', 'Corporate', 'Grand Ballroom Hotel', 'Tech Innovations Inc', 1, 120, 45, 'Inquiry', 8),
  generateEvent(3, 'Wedding Reception - Smith & Johnson', 'Wedding', 'Riverside Garden Venue', 'Jennifer Smith', 2, -15, 180, 'Completed', 12),
  generateEvent(4, 'Indie Band Tour Kickoff', 'Concert', 'Downtown Music Hall', 'The Wanderers Band', 3, 30, 60, 'Confirmed', 15),
  generateEvent(5, 'Charity Fundraiser Concert', 'Charity', 'City Convention Center', 'Hope Foundation', 4, 60, 75, 'Confirmed', 20),
  generateEvent(6, 'Product Launch Party', 'Corporate', 'Modern Art Gallery', 'StartUp Labs', 5, 15, 30, 'Confirmed', 10),
  generateEvent(7, 'Jazz Night Under Stars', 'Concert', 'Rooftop Lounge', 'Blue Note Events', 6, -45, 200, 'Completed', 6),
  generateEvent(8, 'Annual Company Retreat', 'Corporate', 'Mountain Resort Lodge', 'Global Solutions Ltd', 7, 90, 20, 'Inquiry', 25),
  generateEvent(9, 'Birthday Celebration Concert', 'Private Party', 'Private Estate', 'Michael Anderson', 8, 10, 15, 'Confirmed', 5),
  generateEvent(10, 'Electronic Music Festival', 'Festival', 'Waterfront Arena', 'Bass Productions', 9, -30, 150, 'Completed', 22),
  generateEvent(11, 'Acoustic Showcase Evening', 'Concert', 'Intimate Café Theater', 'Local Artists Collective', 0, 25, 40, 'Confirmed', 8),
  generateEvent(12, 'Wedding Ceremony - Garcia Family', 'Wedding', 'Beach Resort', 'Maria Garcia', 1, 75, 50, 'Confirmed', 14),
  generateEvent(13, 'Rock Band Anniversary Show', 'Concert', 'Stadium Arena', 'Thunder Rock Promotions', 2, -60, 220, 'Completed', 16),
  generateEvent(14, 'Corporate Team Building', 'Corporate', 'Adventure Park', 'Innovate Corp', 3, 40, 25, 'Confirmed', 12),
  generateEvent(15, 'Classical Music Gala', 'Concert', 'Symphony Hall', 'Classical Events Society', 4, 55, 65, 'Confirmed', 18),
  generateEvent(16, 'Food & Music Festival', 'Festival', 'Downtown Plaza', 'Culinary Arts Foundation', 5, -10, 120, 'Completed', 20),
  generateEvent(17, 'DJ Night Extravaganza', 'Concert', 'Club Underground', 'Night Life Productions', 6, 8, 12, 'Confirmed', 7),
  generateEvent(18, 'Engagement Party', 'Private Party', 'Luxury Yacht', 'Thomas & Emma', 7, 35, 28, 'Confirmed', 9),
  generateEvent(19, 'Holiday Concert Series', 'Concert', 'Historic Theater', 'Winter Celebrations Inc', 8, 150, 10, 'Inquiry', 15),
  generateEvent(20, 'Art & Music Fusion Event', 'Festival', 'Contemporary Art Museum', 'Creative Minds Collective', 9, -5, 95, 'Completed', 11),
  generateEvent(21, 'Spring Garden Party', 'Private Party', 'Botanical Gardens', 'Williams Family', 0, 20, 35, 'Confirmed', 6),
  generateEvent(22, 'Country Music Festival', 'Festival', 'Outdoor Fairgrounds', 'Nashville Productions', 1, 70, 55, 'Confirmed', 19),
  generateEvent(23, 'Corporate Awards Ceremony', 'Corporate', 'Luxury Hotel Ballroom', 'Fortune 500 Company', 2, 100, 18, 'Inquiry', 13),
  generateEvent(24, 'Underground Hip Hop Show', 'Concert', 'Urban Warehouse Venue', 'Street Beats Collective', 3, -20, 140, 'Completed', 10),
  generateEvent(25, 'New Year Celebration', 'Festival', 'City Center Plaza', 'Metropolitan Events', 4, -90, 280, 'Completed', 25),
  generateEvent(26, 'Wedding Reception - Lee & Park', 'Wedding', 'Vineyard Estate', 'Christina Lee', 5, 85, 48, 'Confirmed', 16),
  generateEvent(27, 'Opera Performance Evening', 'Concert', 'Grand Opera House', 'Metropolitan Opera Society', 6, 65, 70, 'Confirmed', 14),
  generateEvent(28, 'Tech Conference After Party', 'Corporate', 'Modern Convention Hall', 'Silicon Valley Events', 7, 12, 22, 'Confirmed', 11),
  generateEvent(29, 'Reggae Beach Festival', 'Festival', 'Seaside Pavilion', 'Island Vibes Productions', 8, -35, 165, 'Completed', 17),
  generateEvent(30, 'Anniversary Dinner Concert', 'Private Party', 'Rooftop Restaurant', 'Anderson Family', 9, 18, 26, 'Confirmed', 4),
  generateEvent(31, 'Alternative Rock Showcase', 'Concert', 'Industrial Loft Space', 'Indie Music Promoters', 0, 28, 38, 'Confirmed', 9),
  generateEvent(32, 'Corporate Networking Mixer', 'Corporate', 'Sky Lounge', 'Business Leaders Network', 1, 110, 8, 'Inquiry', 20),
  generateEvent(33, 'Blues & BBQ Festival', 'Festival', 'Riverside Park', 'Southern Music Heritage', 2, -50, 190, 'Completed', 15),
  generateEvent(34, 'Graduation Celebration', 'Private Party', 'University Campus Hall', 'Class of 2024', 3, 5, 42, 'Confirmed', 8),
  generateEvent(35, 'World Music Festival', 'Festival', 'Cultural Center Arena', 'Global Music Foundation', 4, 80, 52, 'Confirmed', 21),
  generateEvent(36, 'Intimate Songwriter Circle', 'Concert', 'Cozy Coffee House', 'Local Musicians Guild', 5, 22, 33, 'Confirmed', 5),
  generateEvent(37, 'Corporate Product Demo', 'Corporate', 'Tech Hub Auditorium', 'Innovation Startups', 6, 95, 15, 'Inquiry', 10),
  generateEvent(38, 'Latin Dance Festival', 'Festival', 'Plaza del Sol', 'Latino Cultural Society', 7, -25, 155, 'Completed', 18),
  generateEvent(39, 'Retirement Celebration', 'Private Party', 'Country Club', 'Thompson Family', 8, 32, 29, 'Confirmed', 7),
  generateEvent(40, 'Metal Concert Night', 'Concert', 'Rock Arena', 'Heavy Music Promotions', 9, 14, 24, 'Confirmed', 12),
  generateEvent(41, 'Fashion Show After Party', 'Corporate', 'Chic Gallery Space', 'Fashion Week Productions', 0, 50, 35, 'Confirmed', 16),
  generateEvent(42, 'Folk Music Heritage Festival', 'Festival', 'Historic Town Square', 'Traditional Arts Council', 1, -40, 175, 'Completed', 13),
  generateEvent(43, 'Sweet Sixteen Party', 'Private Party', 'Event Hall', 'Martinez Family', 2, 38, 31, 'Confirmed', 6),
  generateEvent(44, 'Piano Recital Evening', 'Concert', 'Performing Arts Center', 'Classical Music Academy', 3, 42, 44, 'Confirmed', 8),
  generateEvent(45, 'New Album Release Party', 'Concert', 'Trendy Club Venue', 'Rising Star Records', 4, 16, 20, 'Confirmed', 11),
  generateEvent(46, 'Cancelled Conference', 'Corporate', 'Convention Center', 'Tech Summit Organizers', 5, 60, 70, 'Cancelled', 15),
  generateEvent(47, 'Cancelled Wedding', 'Wedding', 'Garden Venue', 'Cancelled Client', 6, 45, 85, 'Cancelled', 10),
  generateEvent(48, 'Film Premiere Celebration', 'Corporate', 'Movie Theater Complex', 'Independent Film Studios', 7, 26, 36, 'Confirmed', 14),
];
