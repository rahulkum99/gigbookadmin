import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  useLazyGetSubscriptionPlanByIdQuery,
  type SubscriptionPlan,
  type UpdateSubscriptionPlanRequest,
} from '@/features/subscriptions/subscriptionsApi';

export interface EditablePlanData {
  id: string;
  title: string;
  description: string;
  price: string;
  currency: string;
  razorpay_plan_id: string;
  is_active: boolean;
  features: string[];
  planLabel: string;
}

interface EditPlanDialogProps {
  open: boolean;
  plan: EditablePlanData | null;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: UpdateSubscriptionPlanRequest) => Promise<void>;
}

interface FormState {
  title: string;
  description: string;
  price: string;
  currency: string;
  razorpay_plan_id: string;
  is_active: boolean;
  features: string[];
}

const emptyForm: FormState = {
  title: '',
  description: '',
  price: '0.00',
  currency: 'INR',
  razorpay_plan_id: '',
  is_active: true,
  features: [],
};

function planToForm(plan: EditablePlanData): FormState {
  return {
    title: plan.title ?? '',
    description: plan.description ?? '',
    price: plan.price ?? '0.00',
    currency: plan.currency ?? 'INR',
    razorpay_plan_id: plan.razorpay_plan_id ?? '',
    is_active: plan.is_active,
    features: plan.features.length > 0 ? [...plan.features] : [''],
  };
}

function apiPlanToEditable(plan: SubscriptionPlan): EditablePlanData {
  return {
    id: plan.id,
    title: plan.title ?? '',
    description: plan.description ?? '',
    price: plan.price ?? '0.00',
    currency: plan.currency ?? 'INR',
    razorpay_plan_id: plan.razorpay_plan_id ?? '',
    is_active: plan.is_active,
    features: plan.features ?? [],
    planLabel:
      plan.title?.trim() ||
      `${plan.plan_type ? `${plan.plan_type[0].toUpperCase()}${plan.plan_type.slice(1)}` : 'Plan'}${plan.interval ? ` (${plan.interval})` : ''}`,
  };
}

function buildPatchPayload(
  plan: EditablePlanData,
  form: FormState
): UpdateSubscriptionPlanRequest {
  const payload: UpdateSubscriptionPlanRequest = { id: plan.id };
  const cleanFeatures = form.features.map((f) => f.trim()).filter(Boolean);

  payload.title = form.title;
  payload.description = form.description;
  payload.price = form.price.trim();
  payload.currency = form.currency.trim();
  payload.razorpay_plan_id = form.razorpay_plan_id.trim();
  payload.is_active = form.is_active;
  payload.features = cleanFeatures;

  return payload;
}

export function EditPlanDialog({ open, plan, onOpenChange, onSave }: EditPlanDialogProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchPlanById] = useLazyGetSubscriptionPlanByIdQuery();

  useEffect(() => {
    if (open && plan) {
      setForm(planToForm(plan));
      setError(null);
    }
  }, [open, plan]);

  useEffect(() => {
    let isMounted = true;

    const loadPlanDetails = async () => {
      if (!open || !plan) return;
      setIsFetchingDetails(true);
      try {
        const latest = await fetchPlanById(plan.id, true).unwrap();
        if (!isMounted) return;
        setForm(planToForm(apiPlanToEditable(latest)));
      } catch {
        if (!isMounted) return;
        // Keep fallback values from parent payload if fetch fails.
      } finally {
        if (isMounted) {
          setIsFetchingDetails(false);
        }
      }
    };

    void loadPlanDetails();
    return () => {
      isMounted = false;
    };
  }, [open, plan, fetchPlanById]);

  const handleFieldChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }));
  };

  const handleFeatureRemove = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureAdd = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!plan) return;

    const priceNum = parseFloat(form.price);
    if (!Number.isFinite(priceNum) || priceNum < 0) {
      setError('Enter a valid non-negative price.');
      return;
    }

    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!form.description.trim()) {
      setError('Description is required.');
      return;
    }

    if (!form.currency.trim()) {
      setError('Currency is required.');
      return;
    }

    if (!form.razorpay_plan_id.trim()) {
      setError('Razorpay plan ID is required.');
      return;
    }

    const hasAtLeastOneFeature = form.features.some((feature) => feature.trim().length > 0);
    if (!hasAtLeastOneFeature) {
      setError('At least one feature is required.');
      return;
    }

    const payload = buildPatchPayload(plan, form);

    setIsSaving(true);
    setError(null);
    try {
      await onSave(payload);
      onOpenChange(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to update plan. Please try again.';
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (isSaving) return;
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit subscription plan</DialogTitle>
          <DialogDescription>
            {plan
              ? `Update pricing, availability and features for ${plan.planLabel}.`
              : 'Update pricing, availability and features.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="plan-price">Price</Label>
              <Input
                id="plan-price"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                disabled={isSaving || isFetchingDetails}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="plan-currency">Currency</Label>
              <Input
                id="plan-currency"
                value={form.currency}
                onChange={(e) =>
                  handleFieldChange('currency', e.target.value.toUpperCase())
                }
                disabled={isSaving || isFetchingDetails}
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="plan-title">Title</Label>
            <Input
              id="plan-title"
              value={form.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Display title (optional)"
              disabled={isSaving || isFetchingDetails}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="plan-description">Description</Label>
            <Textarea
              id="plan-description"
              value={form.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Short description shown to users"
              rows={3}
              disabled={isSaving || isFetchingDetails}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="plan-razorpay-id">Razorpay plan ID</Label>
            <Input
              id="plan-razorpay-id"
              value={form.razorpay_plan_id}
              onChange={(e) => handleFieldChange('razorpay_plan_id', e.target.value)}
              placeholder="plan_xxxxxxxxxxxxxx"
              disabled={isSaving || isFetchingDetails}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Features</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleFeatureAdd}
                disabled={isSaving || isFetchingDetails}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add feature
              </Button>
            </div>
            <div className="space-y-2">
              {form.features.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No features yet. Click "Add feature" to create one.
                </p>
              ) : (
                form.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature #${index + 1}`}
                      disabled={isSaving || isFetchingDetails}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleFeatureRemove(index)}
                      disabled={isSaving || isFetchingDetails}
                      aria-label="Remove feature"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="plan-active" className="text-sm font-medium">
                Plan is active
              </Label>
              <p className="text-xs text-muted-foreground">
                Inactive plans are hidden from users and cannot be purchased.
              </p>
            </div>
            <Switch
              id="plan-active"
              checked={form.is_active}
              onCheckedChange={(checked) => handleFieldChange('is_active', checked)}
              disabled={isSaving || isFetchingDetails}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || isFetchingDetails}>
              {isSaving || isFetchingDetails ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isFetchingDetails ? 'Loading details...' : 'Saving...'}
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
