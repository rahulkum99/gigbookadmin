import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserTable } from './UserTable';
import { UserDetailPanel } from './UserDetailPanel';
import { usersData, User, FilterState } from '@/data/usersData';

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    plan: 'All',
    status: 'All',
    recentlyJoined: false,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      searchQuery === '' ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);

    const matchesPlan = filters.plan === 'All' || user.plan === filters.plan;

    const matchesStatus =
      filters.status === 'All' ||
      (filters.status === 'Active' && user.accountStatus === 'Active') ||
      (filters.status === 'Inactive' && user.accountStatus !== 'Active');

    const matchesRecent = !filters.recentlyJoined ||
      (new Date().getTime() - user.signupDate.getTime()) / (1000 * 60 * 60 * 24) <= 30;

    return matchesSearch && matchesPlan && matchesStatus && matchesRecent;
  });

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select
            value={filters.plan}
            onValueChange={(value) => setFilters({ ...filters, plan: value as FilterState['plan'] })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Plans</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Pro">Pro</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value as FilterState['status'] })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setFilters({ ...filters, recentlyJoined: !filters.recentlyJoined })}
            className={`px-4 h-10 rounded-md text-sm font-medium transition-colors ${
              filters.recentlyJoined
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Recently Joined
          </button>
        </div>
      </div>

      {filters.plan !== 'All' || filters.status !== 'All' || filters.recentlyJoined || searchQuery !== '' ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.plan !== 'All' && (
            <Badge variant="secondary" className="gap-1">
              Plan: {filters.plan}
              <button
                onClick={() => setFilters({ ...filters, plan: 'All' })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.status !== 'All' && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <button
                onClick={() => setFilters({ ...filters, status: 'All' })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.recentlyJoined && (
            <Badge variant="secondary" className="gap-1">
              Recently Joined
              <button
                onClick={() => setFilters({ ...filters, recentlyJoined: false })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {searchQuery !== '' && (
            <Badge variant="secondary" className="gap-1">
              Search: &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-foreground">
                ×
              </button>
            </Badge>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setFilters({ plan: 'All', status: 'All', recentlyJoined: false });
            }}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {usersData.length} users
      </div>

      <UserTable users={filteredUsers} onUserSelect={handleUserSelect} />

      <UserDetailPanel user={selectedUser} isOpen={isPanelOpen} onClose={handlePanelClose} />
    </div>
  );
}
