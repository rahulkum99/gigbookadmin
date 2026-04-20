import { Card } from '@/components/ui/card';

interface SubscriptionHealthProps {
  free: number;
  pro: number;
  totalUsers: number;
}

export function SubscriptionHealth({ free, pro, totalUsers }: SubscriptionHealthProps) {
  const proPercentage = (pro / totalUsers) * 100;
  const freePercentage = (free / totalUsers) * 100;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Subscription Health</h3>
        <p className="text-sm text-muted-foreground">Current user distribution across plans</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Pro Users</span>
            <span className="text-sm font-semibold text-foreground">{pro.toLocaleString()}</span>
          </div>
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-cyan-500 rounded-full transition-all duration-1000"
              style={{ width: `${proPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{proPercentage.toFixed(1)}% of total users</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Free Users</span>
            <span className="text-sm font-semibold text-foreground">{free.toLocaleString()}</span>
          </div>
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-full transition-all duration-1000"
              style={{ width: `${freePercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">{freePercentage.toFixed(1)}% of total users</p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Active Users</span>
            <span className="text-lg font-bold text-foreground">{totalUsers.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
