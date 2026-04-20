import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { MaintenanceConfig } from '@/data/settingsData';

interface MaintenanceModeCardProps {
  initialConfig: MaintenanceConfig;
}

export function MaintenanceModeCard({ initialConfig }: MaintenanceModeCardProps) {
  const [isEnabled, setIsEnabled] = useState(initialConfig.enabled);
  const [message, setMessage] = useState(initialConfig.message);
  const [downtime, setDowntime] = useState(initialConfig.expectedDowntime);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    if (checked) {
      toast.error('Maintenance mode enabled - all users will see maintenance screen');
    } else {
      toast.success('Maintenance mode disabled - platform is live');
    }
  };

  const handleMessageUpdate = () => {
    toast.success('Maintenance message updated');
  };

  const handleDowntimeUpdate = () => {
    toast.success('Expected downtime updated');
  };

  return (
    <Card className="border-amber-200 bg-amber-50/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <CardTitle className="text-lg font-semibold text-gray-900">Maintenance Mode</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Enable system-wide maintenance mode to temporarily restrict platform access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-300 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="maintenance-toggle" className="text-base font-medium text-gray-900">
              Maintenance Status
            </Label>
            <p className="text-sm text-gray-600">
              When enabled, all users will see a maintenance screen
            </p>
          </div>
          <Switch
            id="maintenance-toggle"
            checked={isEnabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-amber-500"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="maintenance-message" className="text-sm font-medium text-gray-900">
            Maintenance Message
          </Label>
          <Textarea
            id="maintenance-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={handleMessageUpdate}
            disabled={!isEnabled}
            placeholder="Enter the message users will see during maintenance..."
            className="min-h-[100px] border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            maxLength={500}
          />
          <p className="text-xs text-gray-500">
            This message will be displayed to all users attempting to access the platform
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="expected-downtime" className="text-sm font-medium text-gray-900">
            Expected Downtime
          </Label>
          <Input
            id="expected-downtime"
            type="text"
            value={downtime}
            onChange={(e) => setDowntime(e.target.value)}
            onBlur={handleDowntimeUpdate}
            disabled={!isEnabled}
            placeholder="e.g., 30-45 minutes"
            className="max-w-md border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">
            Optional: Provide an estimate of how long maintenance will last
          </p>
        </div>

        {isEnabled && (
          <div className="p-4 bg-amber-100 border border-amber-300 rounded-lg">
            <p className="text-sm font-medium text-amber-900">
              Warning: Maintenance mode is currently active. Users cannot access the platform.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
