export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  plan: 'Free' | 'Pro';
  accountStatus: 'Active' | 'Limited' | 'Suspended';
  signupDate: Date;
  lastActive: Date;
  subscription: {
    startDate: Date;
    expiryDate: Date | null;
    referralDiscount: boolean;
  };
  avatarFallback: string;
}

export interface FilterState {
  plan: 'All' | 'Free' | 'Pro';
  status: 'All' | 'Active' | 'Inactive';
  recentlyJoined: boolean;
}

const generateUser = (
  id: number,
  fullName: string,
  email: string,
  phone: string,
  plan: 'Free' | 'Pro',
  accountStatus: 'Active' | 'Limited' | 'Suspended',
  daysAgo: number,
  lastActiveDays: number,
  referralDiscount: boolean = false
): User => {
  const signupDate = new Date();
  signupDate.setDate(signupDate.getDate() - daysAgo);

  const lastActive = new Date();
  lastActive.setDate(lastActive.getDate() - lastActiveDays);

  const subscriptionStart = new Date(signupDate);
  const expiryDate = plan === 'Pro' ? new Date(subscriptionStart) : null;
  if (expiryDate) {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }

  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return {
    id: `user-${id}`,
    fullName,
    email,
    phone,
    plan,
    accountStatus,
    signupDate,
    lastActive,
    subscription: {
      startDate: subscriptionStart,
      expiryDate,
      referralDiscount,
    },
    avatarFallback: initials,
  };
};

export const usersData: User[] = [
  generateUser(1, 'Sarah Mitchell', 'sarah.mitchell@email.com', '+1 (555) 123-4567', 'Pro', 'Active', 180, 0, true),
  generateUser(2, 'James Rodriguez', 'james.r@company.com', '+1 (555) 234-5678', 'Pro', 'Active', 145, 1),
  generateUser(3, 'Emily Chen', 'emily.chen@startup.io', '+1 (555) 345-6789', 'Free', 'Active', 89, 2),
  generateUser(4, 'Michael Thompson', 'michael.t@venue.com', '+1 (555) 456-7890', 'Pro', 'Active', 234, 0, true),
  generateUser(5, 'Jessica Williams', 'jessica.w@events.net', '+1 (555) 567-8901', 'Free', 'Active', 56, 3),
  generateUser(6, 'David Kim', 'david.kim@music.co', '+1 (555) 678-9012', 'Pro', 'Active', 312, 1),
  generateUser(7, 'Amanda Foster', 'amanda.f@artist.com', '+1 (555) 789-0123', 'Free', 'Limited', 23, 15),
  generateUser(8, 'Robert Garcia', 'robert.g@band.fm', '+1 (555) 890-1234', 'Pro', 'Active', 401, 5),
  generateUser(9, 'Lisa Anderson', 'lisa.a@promoter.net', '+1 (555) 901-2345', 'Free', 'Active', 12, 0),
  generateUser(10, 'Christopher Lee', 'chris.lee@shows.io', '+1 (555) 012-3456', 'Pro', 'Active', 267, 2, true),
  generateUser(11, 'Michelle Davis', 'michelle.d@gigs.com', '+1 (555) 123-4568', 'Free', 'Active', 45, 7),
  generateUser(12, 'Daniel Martinez', 'daniel.m@talent.co', '+1 (555) 234-5679', 'Pro', 'Limited', 189, 30),
  generateUser(13, 'Jennifer Brown', 'jennifer.b@agency.net', '+1 (555) 345-6780', 'Free', 'Active', 8, 1),
  generateUser(14, 'Matthew Wilson', 'matthew.w@booking.io', '+1 (555) 456-7891', 'Pro', 'Active', 523, 0),
  generateUser(15, 'Ashley Taylor', 'ashley.t@performer.com', '+1 (555) 567-8902', 'Free', 'Suspended', 67, 45),
  generateUser(16, 'Ryan Moore', 'ryan.m@festival.net', '+1 (555) 678-9013', 'Pro', 'Active', 198, 4),
  generateUser(17, 'Nicole Jackson', 'nicole.j@concert.co', '+1 (555) 789-0124', 'Free', 'Active', 34, 8),
  generateUser(18, 'Brandon White', 'brandon.w@stage.io', '+1 (555) 890-1235', 'Pro', 'Active', 445, 1, true),
  generateUser(19, 'Stephanie Harris', 'stephanie.h@live.com', '+1 (555) 901-2346', 'Free', 'Active', 19, 2),
  generateUser(20, 'Kevin Clark', 'kevin.c@dj.net', '+1 (555) 012-3457', 'Pro', 'Active', 356, 3),
  generateUser(21, 'Rachel Lewis', 'rachel.l@musician.co', '+1 (555) 123-4569', 'Free', 'Limited', 78, 20),
  generateUser(22, 'Justin Robinson', 'justin.r@band.com', '+1 (555) 234-5680', 'Pro', 'Active', 289, 0),
  generateUser(23, 'Megan Walker', 'megan.w@singer.io', '+1 (555) 345-6781', 'Free', 'Active', 5, 0),
  generateUser(24, 'Tyler Young', 'tyler.y@entertainment.net', '+1 (555) 456-7892', 'Pro', 'Suspended', 167, 90),
  generateUser(25, 'Hannah Hall', 'hannah.h@artist.co', '+1 (555) 567-8903', 'Free', 'Active', 41, 5),
  generateUser(26, 'Andrew Allen', 'andrew.a@venue.io', '+1 (555) 678-9014', 'Pro', 'Active', 612, 2, true),
  generateUser(27, 'Samantha King', 'samantha.k@show.com', '+1 (555) 789-0125', 'Free', 'Active', 28, 10),
  generateUser(28, 'Joshua Wright', 'joshua.w@performance.net', '+1 (555) 890-1236', 'Pro', 'Active', 378, 1),
  generateUser(29, 'Elizabeth Scott', 'elizabeth.s@music.io', '+1 (555) 901-2347', 'Free', 'Active', 14, 3),
  generateUser(30, 'Nicholas Green', 'nicholas.g@booking.co', '+1 (555) 012-3458', 'Pro', 'Active', 490, 0),
];
