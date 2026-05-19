import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
  useGetMaintenanceModeQuery,
  useUpdateMaintenanceModeMutation,
  type UpdateMaintenanceModeRequest,
} from '@/features/settings/settingsApi';

export function MaintenanceModeCard() {
  const { data, isLoading, isError, refetch } = useGetMaintenanceModeQuery();
  const [updateMaintenanceMode, { isLoading: isUpdating }] = useUpdateMaintenanceModeMutation();

  const [isEnabled, setIsEnabled] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTimeLocal, setStartTimeLocal] = useState('');
  const [endTimeLocal, setEndTimeLocal] = useState('');
  const [downtime, setDowntime] = useState('');

  useEffect(() => {
    if (!data) return;
    setIsEnabled(data.is_enabled);
    setTitle(data.title ?? '');
    setDescription(data.description ?? '');
    setStartTimeLocal(isoToLocalDateTimeInput(data.start_time));
    setEndTimeLocal(isoToLocalDateTimeInput(data.end_time));
    setDowntime(fromApiExpectedDowntime(data.expected_downtime));
  }, [data]);

  const handleUpdate = async (patch: UpdateMaintenanceModeRequest, successMessage?: string) => {
    try {
      await updateMaintenanceMode(patch).unwrap();
      if (successMessage) {
        toast.success(successMessage);
      }
    } catch {
      toast.error('Failed to update maintenance settings. Please try again.');
      // Best-effort refresh to keep UI in sync with server.
      refetch();
    }
  };

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    handleUpdate(
      { is_enabled: checked },
      checked
        ? 'Maintenance mode enabled - all users will see maintenance screen'
        : 'Maintenance mode disabled - platform is live'
    );
  };

  const handleMessageUpdate = () => {
    handleUpdate(
      {
        title: title || 'Maintenance in progress',
        description: description || null,
      },
      'Maintenance message updated'
    );
  };

  const handleDowntimeUpdate = () => {
    handleUpdate(
      {
        expected_downtime: toApiExpectedDowntime(downtime),
      },
      'Expected downtime updated'
    );
  };

  const handleStartTimeUpdate = () => {
    handleUpdate(
      {
        start_time: toIsoUtc(startTimeLocal),
      },
      'Maintenance start time updated'
    );
  };

  const handleEndTimeUpdate = () => {
    handleUpdate(
      {
        end_time: toIsoUtc(endTimeLocal),
      },
      'Maintenance end time updated'
    );
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
        {isError && (
          <p className="mt-2 text-sm text-red-600">
            Failed to load current maintenance settings.{' '}
            <button
              type="button"
              onClick={() => refetch()}
              className="underline font-medium hover:text-red-700"
            >
              Retry
            </button>
          </p>
        )}
        {data?.updated_at && (
          <p className="mt-1 text-xs text-gray-500">
            Last updated at {new Date(data.updated_at).toLocaleString()}
          </p>
        )}
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
            disabled={isLoading || isUpdating}
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="maintenance-title" className="text-sm font-medium text-gray-900">
            Maintenance Title
          </Label>
          <Input
            id="maintenance-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleMessageUpdate}
            disabled={isLoading || isUpdating}
            placeholder="e.g., Maintenance in progress"
            className="max-w-md border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="maintenance-description" className="text-sm font-medium text-gray-900">
            Maintenance Description
          </Label>
          <Textarea
            id="maintenance-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleMessageUpdate}
            disabled={isLoading || isUpdating}
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
            type="time"
            step={60}
            value={downtime}
            onChange={(e) => setDowntime(e.target.value)}
            onBlur={handleDowntimeUpdate}
            disabled={isLoading || isUpdating}
            className="max-w-md border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">
            Optional: Provide an estimate of how long maintenance will last (HH:MM, 24-hour format)
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="maintenance-start-time" className="text-sm font-medium text-gray-900">
              Maintenance Start Time
            </Label>
            <Input
              id="maintenance-start-time"
              type="datetime-local"
              value={startTimeLocal}
              onChange={(e) => setStartTimeLocal(e.target.value)}
              onBlur={handleStartTimeUpdate}
              disabled={isLoading || isUpdating}
              className="border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Optional: When maintenance is scheduled to begin (in your local timezone)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="maintenance-end-time" className="text-sm font-medium text-gray-900">
              Maintenance End Time
            </Label>
            <Input
              id="maintenance-end-time"
              type="datetime-local"
              value={endTimeLocal}
              onChange={(e) => setEndTimeLocal(e.target.value)}
              onBlur={handleEndTimeUpdate}
              disabled={isLoading || isUpdating}
              className="max-w-md border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">
              Optional: When maintenance is expected to end (in your local timezone)
          </p>
        </div>
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

function isoToLocalDateTimeInput(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
}

function toIsoUtc(localValue: string): string | null {
  if (!localValue) return null;
  const date = new Date(localValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function fromApiExpectedDowntime(value: string | null): string {
  if (!value) return '';
  // Backend sends HH:MM:SS; datetime-local only needs HH:MM.
  return value.slice(0, 5);
}

function toApiExpectedDowntime(value: string): string | null {
  if (!value) return null;
  return value.length === 5 ? `${value}:00` : value;
}

