import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { EventTable } from './EventTable';
import { EventDetailPanel } from './EventDetailPanel';
import { eventsData, Event, EventFilterState } from '@/data/eventsData';

export function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<EventFilterState>({
    status: 'All',
    dateRange: 'All',
    highParticipants: false,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  const filteredEvents = eventsData.filter((event) => {
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
        Showing {filteredEvents.length} of {eventsData.length} events
      </div>

      <EventTable events={filteredEvents} onEventSelect={handleEventSelect} />

      <EventDetailPanel event={selectedEvent} isOpen={isPanelOpen} onClose={handlePanelClose} />
    </div>
  );
}
