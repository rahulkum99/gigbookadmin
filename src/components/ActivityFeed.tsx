import { ArrowUpCircle, RefreshCw, XCircle, ArrowDownCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, formatCurrency } from '@/lib/utils';

interface SubscriptionActivity {
  id: string;
  userName: string;
  userEmail: string;
  action: 'upgraded' | 'renewed' | 'cancelled' | 'downgraded';
  planName: string;
  timestamp: string;
  amount?: number;
}

interface ActivityFeedProps {
  activities: SubscriptionActivity[];
  delay?: number;
}

export function ActivityFeed({ activities, delay = 0 }: ActivityFeedProps) {
  const getActionConfig = (action: string) => {
    switch (action) {
      case 'upgraded':
        return {
          icon: ArrowUpCircle,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          badgeClass: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
          label: 'Upgraded',
        };
      case 'renewed':
        return {
          icon: RefreshCw,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
          badgeClass: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
          label: 'Renewed',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          badgeClass: 'bg-red-100 text-red-700 hover:bg-red-100',
          label: 'Cancelled',
        };
      case 'downgraded':
        return {
          icon: ArrowDownCircle,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          badgeClass: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
          label: 'Downgraded',
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          badgeClass: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
          label: 'Activity',
        };
    }
  };

  return (
    <Card
      className="p-6 border-border bg-card"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest subscription changes</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {activities.length} events
        </Badge>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const config = getActionConfig(activity.action);
            const ActionIcon = config.icon;

            return (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-all duration-200"
                )}
                style={{
                  animation: `fade-in 0.4s ease-out ${delay + (index + 1) * 50}ms both`,
                }}
              >
                <div className={cn("p-2 rounded-lg", config.bg)}>
                  <ActionIcon className={cn("h-4 w-4", config.color)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.userName}
                    </p>
                    <Badge variant="secondary" className={cn("text-xs flex-shrink-0", config.badgeClass)}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {activity.userEmail}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-foreground">
                      {activity.planName}
                    </p>
                    {activity.amount && (
                      <p className="text-xs font-semibold text-primary">
                        {formatCurrency(activity.amount)}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
