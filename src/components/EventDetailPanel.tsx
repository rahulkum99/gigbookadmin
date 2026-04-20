import { format, formatDistanceToNow } from 'date-fns';
import {
  Calendar,
  MapPin,
  User,
  Clock,
  Users,
  Shield,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  Edit,
  Music,
  Briefcase,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Event, EventParticipant } from '@/data/eventsData';
import { cn } from '@/lib/utils';

interface EventDetailPanelProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailPanel({ event, isOpen, onClose }: EventDetailPanelProps) {
  if (!event) return null;

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

  const getStatusIcon = (status: Event['status']) => {
    switch (status) {
      case 'Inquiry':
        return <AlertCircle className="h-4 w-4" />;
      case 'Confirmed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getAccessLevelColor = (level: EventParticipant['accessLevel']) => {
    switch (level) {
      case 'Full':
        return 'bg-primary text-primary-foreground border-primary';
      case 'Collaborator':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Basic':
        return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const getRoleIcon = (role: EventParticipant['role']) => {
    switch (role) {
      case 'Artist':
        return <Music className="h-3 w-3" />;
      case 'Manager':
        return <Briefcase className="h-3 w-3" />;
      case 'Team Member':
        return <Users className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getTimelineIcon = (action: Event['timeline'][0]['action']) => {
    switch (action) {
      case 'created':
        return <Plus className="h-4 w-4" />;
      case 'participant_added':
        return <Users className="h-4 w-4" />;
      case 'status_changed':
        return <RefreshCw className="h-4 w-4" />;
      case 'updated':
        return <Edit className="h-4 w-4" />;
    }
  };

  const getTimelineColor = (action: Event['timeline'][0]['action']) => {
    switch (action) {
      case 'created':
        return 'bg-primary/10 text-primary';
      case 'participant_added':
        return 'bg-blue-50 text-blue-600';
      case 'status_changed':
        return 'bg-amber-50 text-amber-600';
      case 'updated':
        return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="pt-2">
            <SheetTitle className="text-2xl mb-3">{event.title}</SheetTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={cn('font-medium', getStatusColor(event.status))}>
                {getStatusIcon(event.status)}
                <span className="ml-1">{event.status}</span>
              </Badge>
              <Badge variant="secondary" className="font-medium">
                {event.eventType}
              </Badge>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Event Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Event Date & Time</p>
                  <p className="text-sm text-foreground font-medium">
                    {format(event.eventDate, 'MMMM dd, yyyy \'at\' h:mm a')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="text-sm text-foreground font-medium">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Client Name</p>
                  <p className="text-sm text-foreground font-medium">{event.clientName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="outline" className={cn('font-medium mt-1', getStatusColor(event.status))}>
                    {getStatusIcon(event.status)}
                    <span className="ml-1">{event.status}</span>
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Created On</p>
                  <p className="text-sm text-foreground font-medium">
                    {format(event.createdOn, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Event Owner & Participants
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-500 text-white font-semibold">
                    {event.owner.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Event Owner</p>
                  <p className="text-sm font-semibold text-foreground">{event.owner.name}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  {event.participantCount} Participant{event.participantCount !== 1 ? 's' : ''}
                </p>
                {event.participants.length > 0 ? (
                  <ScrollArea className="max-h-[300px] pr-4">
                    <div className="space-y-3">
                      {event.participants.map((participant) => (
                        <div key={participant.id} className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary font-medium text-xs">
                              {participant.avatarFallback}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {participant.name}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getRoleIcon(participant.role)}
                              <span>{participant.role}</span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn('text-xs', getAccessLevelColor(participant.accessLevel))}
                          >
                            {participant.accessLevel}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <p className="text-sm text-muted-foreground">No participants added yet</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Event Timeline
            </h3>
            {event.timeline.length > 0 ? (
              <div className="space-y-4">
                {event.timeline.slice(0, 8).map((item, index) => (
                  <div key={item.id} className="flex gap-3 relative">
                    {index < event.timeline.length - 1 && index < 7 && (
                      <div className="absolute left-4 top-8 bottom-0 w-px bg-border" />
                    )}
                    <div
                      className={cn(
                        'flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center',
                        getTimelineColor(item.action)
                      )}
                    >
                      {getTimelineIcon(item.action)}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-medium text-foreground">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </p>
                      {item.details && (
                        <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
                {event.timeline.length > 8 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {event.timeline.length - 8} more timeline items
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No timeline events yet</p>
            )}
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
