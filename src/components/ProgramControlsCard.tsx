import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ProgramConfig } from '@/data/referralsData';

interface ProgramControlsCardProps {
  config: ProgramConfig;
}

export function ProgramControlsCard({ config }: ProgramControlsCardProps) {
  const [isEnabled, setIsEnabled] = useState(config.isEnabled);
  const [maxDiscount, setMaxDiscount] = useState(config.maxDiscountPerReferral);
  const [validityDays, setValidityDays] = useState(config.validityWindowDays);

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    toast.success(checked ? 'Referral program enabled' : 'Referral program disabled');
  };

  const handleMaxDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMaxDiscount(value);
  };

  const handleMaxDiscountBlur = () => {
    toast.success(`Max discount updated to $${maxDiscount}`);
  };

  const handleValidityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setValidityDays(value);
  };

  const handleValidityBlur = () => {
    toast.success(`Validity window updated to ${validityDays} days`);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Program Controls</CardTitle>
        <CardDescription className="text-gray-600">
          Manage referral program settings and policies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-0.5">
            <Label htmlFor="program-status" className="text-base font-medium text-gray-900">
              Program Status
            </Label>
            <p className="text-sm text-gray-600">
              Enable or disable the entire referral program
            </p>
          </div>
          <Switch
            id="program-status"
            checked={isEnabled}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-discount" className="text-sm font-medium text-gray-900">
            Maximum Discount per Referral
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">$</span>
            <Input
              id="max-discount"
              type="number"
              value={maxDiscount}
              onChange={handleMaxDiscountChange}
              onBlur={handleMaxDiscountBlur}
              className="max-w-[120px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="5"
            />
          </div>
          <p className="text-sm text-gray-500">
            Maximum discount amount that can be applied per successful referral
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="validity-window" className="text-sm font-medium text-gray-900">
            Referral Validity Window
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="validity-window"
              type="number"
              value={validityDays}
              onChange={handleValidityChange}
              onBlur={handleValidityBlur}
              className="max-w-[120px] border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              step="1"
            />
            <span className="text-gray-600">days</span>
          </div>
          <p className="text-sm text-gray-500">
            Number of days a referral link remains valid after generation
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
