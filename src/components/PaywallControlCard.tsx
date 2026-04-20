import { Shield, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaywallRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold: number;
}

interface PaywallControlCardProps {
  rules: PaywallRule[];
  delay?: number;
}

export function PaywallControlCard({ rules, delay = 0 }: PaywallControlCardProps) {
  const [localRules, setLocalRules] = useState(rules);

  const handleToggle = (ruleId: string, checked: boolean) => {
    setLocalRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: checked } : rule
      )
    );
    const rule = localRules.find(r => r.id === ruleId);
    toast.success(
      checked
        ? `${rule?.name} enabled`
        : `${rule?.name} disabled`
    );
  };

  const handleThresholdChange = (ruleId: string, value: string) => {
    const numValue = parseInt(value);
    if (numValue > 0 && numValue <= 100) {
      setLocalRules(prev =>
        prev.map(rule =>
          rule.id === ruleId ? { ...rule, threshold: numValue } : rule
        )
      );
    }
  };

  return (
    <Card
      className="p-6 border-border bg-card"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Paywall Rules</h3>
          <p className="text-sm text-muted-foreground">Configure monetization triggers</p>
        </div>
      </div>

      <div className="space-y-6">
        {localRules.map((rule, index) => (
          <div
            key={rule.id}
            className="space-y-3"
            style={{
              animation: `fade-in 0.4s ease-out ${delay + (index + 1) * 100}ms both`,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Label htmlFor={`rule-${rule.id}`} className="text-sm font-medium text-foreground">
                  {rule.name}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">{rule.description}</p>
              </div>
              <Switch
                id={`rule-${rule.id}`}
                checked={rule.enabled}
                onCheckedChange={(checked) => handleToggle(rule.id, checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {rule.id === 'free-event-limit' && rule.enabled && (
              <div className="pl-0 space-y-2">
                <Label htmlFor={`threshold-${rule.id}`} className="text-xs text-muted-foreground">
                  Event limit threshold
                </Label>
                <Input
                  id={`threshold-${rule.id}`}
                  type="number"
                  value={rule.threshold}
                  onChange={(e) => handleThresholdChange(rule.id, e.target.value)}
                  className="w-24 h-8 text-sm"
                  min="1"
                  max="100"
                />
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700">
                    Setting this too low may frustrate users. Recommended: 3-5 events.
                  </p>
                </div>
              </div>
            )}

            {index < localRules.length - 1 && (
              <div className="border-t border-border pt-6 -mb-3" />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
