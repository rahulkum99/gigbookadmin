import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { SystemStatus } from '@/data/dashboardData';

interface SystemHealthProps {
  statuses: SystemStatus[];
}

export function SystemHealth({ statuses }: SystemHealthProps) {
  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'error':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">System Health</h3>
        <p className="text-sm text-muted-foreground">Real-time service status monitoring</p>
      </div>

      <div className="space-y-3">
        {statuses.map((service, index) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            style={{
              animation: `fade-in 0.4s ease-out ${index * 100}ms both`,
            }}
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(service.status)}
              <span className="text-sm font-medium text-foreground">{service.name}</span>
            </div>
            <Badge variant="outline" className={getStatusColor(service.status)}>
              {service.status === 'healthy' && (
                <>
                  <span className="relative flex h-2 w-2 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Healthy
                </>
              )}
              {service.status === 'warning' && 'Warning'}
              {service.status === 'error' && 'Error'}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Last checked: Just now
        </p>
      </div>
    </Card>
  );
}
