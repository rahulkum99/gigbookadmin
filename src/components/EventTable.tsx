import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Event } from '@/data/eventsData';
import { cn } from '@/lib/utils';

interface EventTableProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
}

const getStatusColor = (status: Event['status']) => {
  switch (status) {
    case 'Inquiry':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Confirmed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Completed':
      return 'bg-slate-50 text-slate-700 border-slate-200';
    case 'Cancelled':
      return 'bg-red-50 text-red-700 border-red-200';
  }
};

export function EventTable({ events, onEventSelect }: EventTableProps) {
  if (events.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No events found matching your filters.</p>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Event Title</TableHead>
            <TableHead>Event Owner</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Created On</TableHead>
            <TableHead className="hidden lg:table-cell">Participants</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow
              key={event.id}
              onClick={() => onEventSelect(event)}
              className={cn(
                'cursor-pointer group',
                'hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent',
                'transition-all duration-200'
              )}
              style={{
                animation: `fade-in 0.3s ease-out ${index * 30}ms both`,
              }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.eventType}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary font-medium text-xs">
                      {event.owner.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{event.owner.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="text-sm text-foreground font-medium">
                    {format(event.eventDate, 'MMM dd, yyyy')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(event.eventDate, 'h:mm a')}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn('font-medium', getStatusColor(event.status))}>
                  {event.status === 'Confirmed' && (
                    <span className="relative flex h-2 w-2 mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                  {event.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {formatDistanceToNow(event.createdOn, { addSuffix: true })}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    event.participantCount >= 15
                      ? 'bg-primary/10 text-primary border-primary/20'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  <Users className="h-3 w-3 mr-1" />
                  {event.participantCount}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
