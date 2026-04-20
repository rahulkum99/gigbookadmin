import { useEffect, useMemo, useState } from 'react';
import { parse } from 'date-fns';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EventTable } from './EventTable';
import { EventDetailPanel } from './EventDetailPanel';
import { Event, EventFilterState } from '@/data/eventsData';
import { useGetEventsQuery } from '@/features/events/eventsApi';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'EV';

const mapStatus = (status: string): Event['status'] => {
  const normalized = status.toLowerCase();
  if (normalized === 'enquiry' || normalized === 'inquiry' || normalized === 'pending') {
    return 'Inquiry';
  }
  if (normalized === 'confirmed') return 'Confirmed';
  if (normalized === 'completed') return 'Completed';
  if (normalized === 'cancelled') return 'Cancelled';
  return 'Inquiry';
};

const mapAccessLevel = (permission: string): 'Basic' | 'Collaborator' | 'Full' => {
  if (permission === 'full_access') return 'Full';
  if (permission === 'view_only') return 'Basic';
  return 'Collaborator';
};

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<EventFilterState>({
    status: 'All',
    dateRange: 'All',
    highParticipants: false,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useGetEventsQuery({
    search: debouncedSearch,
    page: currentPage,
  });

  const events = useMemo<Event[]>(() => {
    const rawEvents = data?.events ?? [];

    return rawEvents.map((rawEvent) => {
      const ownerName =
        rawEvent.user.fullname ||
        rawEvent.user.username ||
        rawEvent.user.phone ||
        rawEvent.user.email ||
        'Unknown User';

      const eventDate = parse(rawEvent.event_date, 'dd/MM/yyyy hh:mm a', new Date());
      const createdOn = new Date(rawEvent.created_at);

      return {
        id: rawEvent.id,
        title: rawEvent.title || 'Untitled Event',
        eventType:
          typeof rawEvent.category === 'string'
            ? rawEvent.category
            : rawEvent.category?.name || 'General',
        eventDate: Number.isNaN(eventDate.getTime()) ? new Date() : eventDate,
        venue: rawEvent.location || 'N/A',
        clientName: rawEvent.client?.name || 'N/A',
        status: mapStatus(rawEvent.status),
        createdOn: Number.isNaN(createdOn.getTime()) ? new Date() : createdOn,
        owner: {
          name: ownerName,
          avatarFallback: getInitials(ownerName),
        },
        participantCount: rawEvent.team_members.length,
        participants: rawEvent.team_members.map((member) => {
          const memberName =
            member.user.fullname ||
            member.user.username ||
            member.user.phone ||
            member.user.email ||
            'Team Member';

          return {
            id: member.id,
            name: memberName,
            accessLevel: mapAccessLevel(member.permission),
            role: 'Team Member' as const,
            avatarFallback: getInitials(memberName),
          };
        }),
        timeline: [],
      };
    });
  }, [data?.events]);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchQuery === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.owner.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status === 'All' || event.status === filters.status;

    const daysAgoCreated = (new Date().getTime() - event.createdOn.getTime()) / (1000 * 60 * 60 * 24);
    const matchesDateRange =
      filters.dateRange === 'All' ||
      (filters.dateRange === 'Recent' && daysAgoCreated <= 30) ||
      (filters.dateRange === 'Older' && daysAgoCreated > 30);

    const matchesHighParticipants = !filters.highParticipants || event.participantCount >= 15;

    return matchesSearch && matchesStatus && matchesDateRange && matchesHighParticipants;
  });

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by event title or owner name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value as EventFilterState['status'] })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Inquiry">Inquiry</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.dateRange}
            onValueChange={(value) => setFilters({ ...filters, dateRange: value as EventFilterState['dateRange'] })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Dates</SelectItem>
              <SelectItem value="Recent">Recent (Last 30 days)</SelectItem>
              <SelectItem value="Older">Older than 30 days</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => setFilters({ ...filters, highParticipants: !filters.highParticipants })}
            className={`px-4 h-10 rounded-md text-sm font-medium transition-colors ${
              filters.highParticipants
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            High Participants
          </button>
        </div>
      </div>

      {filters.status !== 'All' || filters.dateRange !== 'All' || filters.highParticipants || searchQuery !== '' ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
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
          {filters.dateRange !== 'All' && (
            <Badge variant="secondary" className="gap-1">
              Date: {filters.dateRange === 'Recent' ? 'Last 30 days' : 'Older than 30 days'}
              <button
                onClick={() => setFilters({ ...filters, dateRange: 'All' })}
                className="ml-1 hover:text-foreground"
              >
                ×
              </button>
            </Badge>
          )}
          {filters.highParticipants && (
            <Badge variant="secondary" className="gap-1">
              High Participants (15+)
              <button
                onClick={() => setFilters({ ...filters, highParticipants: false })}
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
              setFilters({ status: 'All', dateRange: 'All', highParticipants: false });
            }}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="text-sm text-muted-foreground">
        Showing {filteredEvents.length} of {data?.count ?? events.length} events
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading events...</div>
      ) : isError ? (
        <div className="text-sm text-destructive">Failed to load events. Please try again.</div>
      ) : (
        <EventTable events={filteredEvents} onEventSelect={handleEventSelect} />
      )}

      {data && data.total_pages > 1 ? (
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Page {data.current_page} of {data.total_pages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!data.previous || isLoading}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!data.next || isLoading}
              onClick={() =>
                setCurrentPage((prev) =>
                  data.total_pages ? Math.min(data.total_pages, prev + 1) : prev + 1
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <EventDetailPanel event={selectedEvent} isOpen={isPanelOpen} onClose={handlePanelClose} />
    </div>
  );
}
