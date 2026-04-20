import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PerformanceInsight } from '@/data/referralsData';

interface PerformanceInsightCardProps {
  insight: PerformanceInsight;
  delay?: number;
}

export function PerformanceInsightCard({ insight, delay = 0 }: PerformanceInsightCardProps) {
  const getTrendIcon = () => {
    switch (insight.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (insight.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
    }
  };

  return (
    <Card
      className="hover:shadow-md transition-all duration-300 border-gray-200"
      style={{
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600">{insight.label}</h3>
          </div>
          {insight.trendValue && (
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`text-xs font-medium ${getTrendColor()}`}>
                {insight.trendValue}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-gray-900">{insight.value}</div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {insight.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
