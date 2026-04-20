import { Activity, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface HealthStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  lastChecked: string;
  uptime?: string;
}

interface HealthStatusCardProps {
  statuses: HealthStatus[];
  delay?: number;
}

export function HealthStatusCard({ statuses, delay = 0 }: HealthStatusCardProps) {
  const getStatusConfig = (status: 'healthy' | 'warning' | 'error') => {
    switch (status) {
      case 'healthy':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-600',
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          badgeVariant: 'default' as const,
          badgeClass: 'bg-emerald-500 hover:bg-emerald-500',
          pulse: false,
        };
      case 'warning':
        return {
          icon: AlertCircle,
          color: 'text-amber-600',
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          badgeVariant: 'secondary' as const,
          badgeClass: 'bg-amber-500 text-white hover:bg-amber-500',
          pulse: true,
        };
      case 'error':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
          badgeVariant: 'destructive' as const,
          badgeClass: 'bg-red-500 hover:bg-red-500',
          pulse: true,
        };
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
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Health</h3>
          <p className="text-sm text-muted-foreground">Real-time service monitoring</p>
        </div>
      </div>

      <div className="space-y-4">
        {statuses.map((status, index) => {
          const config = getStatusConfig(status.status);
          const StatusIcon = config.icon;

          return (
            <div
              key={status.name}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
                config.bg,
                config.border
              )}
              style={{
                animation: `fade-in 0.4s ease-out ${delay + (index + 1) * 100}ms both`,
              }}
            >
              <div className="flex items-center gap-3">
                <StatusIcon className={cn("h-5 w-5", config.color)} />
                <div>
                  <p className="text-sm font-medium text-foreground">{status.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {status.lastChecked}
                    {status.uptime && ` • ${status.uptime} uptime`}
                  </p>
                </div>
              </div>
              <Badge
                className={cn(
                  config.badgeClass,
                  config.pulse && "animate-pulse"
                )}
              >
                {status.status}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
