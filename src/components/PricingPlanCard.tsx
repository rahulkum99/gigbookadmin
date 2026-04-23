import { Check, Edit2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { EditPlanDialog, type EditablePlanData } from './EditPlanDialog';
import type { UpdateSubscriptionPlanRequest } from '@/features/subscriptions/subscriptionsApi';

interface PricingPlanCardProps {
  id: string;
  name: string;
  priceDisplay: string;
  billingPeriod: string;
  features: string[];
  enabled: boolean;
  isBestValue: boolean;
  savings?: string;
  delay?: number;
  editable?: EditablePlanData;
  onEditSave?: (payload: UpdateSubscriptionPlanRequest) => Promise<void>;
}

export function PricingPlanCard({
  id,
  name,
  priceDisplay,
  billingPeriod,
  features,
  enabled: initialEnabled,
  isBestValue,
  savings,
  delay = 0,
  editable,
  onEditSave,
}: PricingPlanCardProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const isFree = id === 'free' || (editable?.id && editable.planLabel.toLowerCase().includes('free'));
  const canEdit = !isFree && !!editable && !!onEditSave;

  useEffect(() => {
    setEnabled(initialEnabled);
  }, [initialEnabled]);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    toast.success(
      checked
        ? `${name} plan enabled`
        : `${name} plan disabled`
    );
  };

  const handleEditPrice = () => {
    if (canEdit) {
      setIsEditOpen(true);
      return;
    }
    toast.info('This plan cannot be edited');
  };

  return (
    <>
      <Card
        className={cn(
          "p-6 hover:shadow-lg transition-all duration-300 relative border-border bg-card",
          isBestValue && "ring-2 ring-primary shadow-md"
        )}
        style={{
          animation: `fade-in 0.6s ease-out ${delay}ms both`,
        }}
      >
        {isBestValue && (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-cyan-500 text-white border-0 px-4 py-1">
            Best Value
          </Badge>
        )}

        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground capitalize">{billingPeriod}</p>
          </div>
          {!isFree && (
            <Switch
              checked={enabled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary"
            />
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-bold text-foreground">{priceDisplay}</span>
            {!isFree && <span className="text-sm text-muted-foreground">/{billingPeriod}</span>}
          </div>
          {savings && (
            <Badge variant="outline" className="mt-2 text-emerald-600 border-emerald-200 bg-emerald-50">
              {savings}
            </Badge>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {!isFree && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleEditPrice}
            disabled={!canEdit}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Plan
          </Button>
        )}
      </Card>

      {canEdit && editable && onEditSave && (
        <EditPlanDialog
          open={isEditOpen}
          plan={editable}
          onOpenChange={setIsEditOpen}
          onSave={onEditSave}
        />
      )}
    </>
  );
}
