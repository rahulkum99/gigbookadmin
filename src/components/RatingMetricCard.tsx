import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface RatingMetricCardProps {
  label: string;
  value: number;
  trend: number | null;
  trendLabel: string;
  trendIsPercent?: boolean;
  isAverage?: boolean;
  delay?: number;
  isLoading?: boolean;
}

export function RatingMetricCard({
  label,
  value,
  trend,
  trendLabel,
  trendIsPercent = true,
  isAverage = false,
  delay = 0,
  isLoading = false,
}: RatingMetricCardProps) {
  const showTrend = trend !== null && trend !== 0;
  const isPositive = (trend ?? 0) >= 0;
  const formattedValue = isAverage ? value.toFixed(1) : value.toLocaleString();

  return (
    <Card
      className="hover:shadow-md transition-all duration-300 border-gray-200"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
          {isAverage && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-3xl font-semibold text-gray-900">{formattedValue}</div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {showTrend ? (
                <>
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}
                    {trend}
                    {trendIsPercent ? '%' : ''}
                  </span>
                </>
              ) : null}
              <span className="text-sm text-gray-500">{trendLabel}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
