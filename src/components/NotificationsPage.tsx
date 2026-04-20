import { NotificationTypeControlCard } from './NotificationTypeControlCard';
import { NotificationChannelsCard } from './NotificationChannelsCard';
import { EmergencyBroadcastCard } from './EmergencyBroadcastCard';
import { NotificationActivityTable } from './NotificationActivityTable';
import {
  notificationTypes,
  notificationChannels,
  notificationActivities,
} from '@/data/notificationsData';

export function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
      >
        <NotificationTypeControlCard types={notificationTypes} />
        <NotificationChannelsCard channels={notificationChannels} />
      </div>

      <div style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
        <EmergencyBroadcastCard />
      </div>

      <div style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
        <NotificationActivityTable activities={notificationActivities} />
      </div>
    </div>
  );
}
