import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConversionMetric } from '@/data/dashboardData';

interface ConversionInsightsProps {
  metrics: ConversionMetric[];
}

export function ConversionInsights({ metrics }: ConversionInsightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const isPositive = metric.change >= 0;
        const isDropOff = metric.title.includes('Drop-off');
        const trendColor = isDropOff
          ? isPositive
            ? 'text-red-600'
            : 'text-emerald-600'
          : isPositive
          ? 'text-emerald-600'
          : 'text-red-600';

        return (
          <Card
            key={metric.title}
            className="p-5 hover:shadow-md transition-all duration-300"
            style={{
              animation: `fade-in 0.6s ease-out ${index * 100}ms both`,
            }}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className={cn('flex items-center gap-1 text-sm font-semibold', trendColor)}>
                  {(isDropOff ? !isPositive : isPositive) ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{metric.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
