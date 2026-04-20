import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReferralMetricCardProps {
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
  delay?: number;
}

export function ReferralMetricCard({ label, value, trend, trendLabel, delay = 0 }: ReferralMetricCardProps) {
  const isPositive = trend >= 0;
  const formattedValue = value.toLocaleString();

  return (
    <Card
      className="hover:shadow-md transition-all duration-300 border-gray-200"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`
      }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-gray-900">{formattedValue}</div>
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span className="text-sm text-gray-500">{trendLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
