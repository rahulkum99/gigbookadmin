import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { NotificationType } from '@/data/notificationsData';

interface NotificationTypeControlCardProps {
  types: NotificationType[];
}

export function NotificationTypeControlCard({ types }: NotificationTypeControlCardProps) {
  const [notificationStates, setNotificationStates] = useState<Record<string, boolean>>(
    types.reduce((acc, type) => ({ ...acc, [type.id]: type.enabled }), {})
  );

  const handleToggle = (typeId: string, typeName: string, checked: boolean) => {
    setNotificationStates(prev => ({ ...prev, [typeId]: checked }));
    toast.success(
      checked
        ? `${typeName} notifications enabled`
        : `${typeName} notifications disabled`
    );
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Notification Types</CardTitle>
        <CardDescription className="text-gray-600">
          Control which types of notifications are sent to users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {types.map((type) => (
          <div
            key={type.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="space-y-0.5 flex-1">
              <Label
                htmlFor={type.id}
                className="text-base font-medium text-gray-900 cursor-pointer"
              >
                {type.name}
              </Label>
              <p className="text-sm text-gray-600">
                {type.description}
              </p>
            </div>
            <Switch
              id={type.id}
              checked={notificationStates[type.id]}
              onCheckedChange={(checked) => handleToggle(type.id, type.name, checked)}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
