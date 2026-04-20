import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConversionInsightCardProps {
  title: string;
  value: string;
  change: number;
  description: string;
  isPositive: boolean;
  delay?: number;
}

export function ConversionInsightCard({
  title,
  value,
  change,
  description,
  isPositive,
  delay = 0,
}: ConversionInsightCardProps) {
  const changeIsPositive = change >= 0;

  return (
    <Card
      className="p-6 hover:shadow-md transition-all duration-300 border-border bg-card"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
            changeIsPositive && isPositive
              ? 'bg-emerald-50 text-emerald-700'
              : changeIsPositive && !isPositive
              ? 'bg-red-50 text-red-700'
              : !changeIsPositive && isPositive
              ? 'bg-red-50 text-red-700'
              : 'bg-emerald-50 text-emerald-700'
          )}
        >
          {((changeIsPositive && isPositive) || (!changeIsPositive && !isPositive)) ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
