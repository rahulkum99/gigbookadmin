import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Smartphone, Mail } from 'lucide-react';
import { NotificationChannel } from '@/data/notificationsData';
import { cn } from '@/lib/utils';

interface NotificationChannelsCardProps {
  channels: NotificationChannel[];
}

export function NotificationChannelsCard({ channels }: NotificationChannelsCardProps) {
  const getChannelIcon = (channelId: string) => {
    switch (channelId) {
      case 'push':
        return Smartphone;
      case 'in-app':
        return Bell;
      case 'email':
        return Mail;
      default:
        return Bell;
    }
  };

  const getStatusConfig = (status: 'active' | 'inactive') => {
    if (status === 'active') {
      return {
        badgeClass: 'bg-emerald-500 hover:bg-emerald-500',
        dotColor: 'bg-emerald-500',
        label: 'Active'
      };
    }
    return {
      badgeClass: 'bg-gray-400 hover:bg-gray-400',
      dotColor: 'bg-gray-400',
      label: 'Inactive'
    };
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Notification Channels</CardTitle>
        <CardDescription className="text-gray-600">
          Available delivery channels for notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {channels.map((channel) => {
          const Icon = getChannelIcon(channel.id);
          const statusConfig = getStatusConfig(channel.status);

          return (
            <div
              key={channel.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-medium text-gray-900">
                    {channel.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {channel.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn('w-2 h-2 rounded-full', statusConfig.dotColor)} />
                <Badge className={statusConfig.badgeClass}>
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
