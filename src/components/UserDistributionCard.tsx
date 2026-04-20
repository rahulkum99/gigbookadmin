import { Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UserDistributionCardProps {
  free: number;
  paid: number;
  total: number;
  conversionRate: number;
  delay?: number;
}

export function UserDistributionCard({
  free,
  paid,
  total,
  conversionRate,
  delay = 0,
}: UserDistributionCardProps) {
  const paidPercentage = (paid / total) * 100;
  const freePercentage = (free / total) * 100;

  return (
    <Card
      className="p-6 border-border bg-card"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">User Distribution</h3>
          <p className="text-sm text-muted-foreground">Free vs Pro breakdown</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Pro Users</p>
              <p className="text-2xl font-bold text-foreground">{paid.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">of total</p>
              <p className="text-xl font-bold text-primary">{paidPercentage.toFixed(1)}%</p>
            </div>
          </div>
          <Progress value={paidPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Free Users</p>
              <p className="text-2xl font-bold text-foreground">{free.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">of total</p>
              <p className="text-xl font-bold text-muted-foreground">{freePercentage.toFixed(1)}%</p>
            </div>
          </div>
          <Progress value={freePercentage} className="h-2 [&>div]:bg-muted-foreground" />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Conversion Rate</span>
            </div>
            <span className="text-lg font-bold text-primary">{conversionRate}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
