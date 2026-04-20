import { Card } from '@/components/ui/card';
import { TrendingUp, Clock, Sparkles, Zap, LucideIcon } from 'lucide-react';
import { Insight } from '@/data/dashboardData';

interface InsightStripProps {
  insights: Insight[];
}

const iconMap: Record<string, LucideIcon> = {
  'trending-up': TrendingUp,
  clock: Clock,
  sparkles: Sparkles,
  zap: Zap,
};

export function InsightStrip({ insights }: InsightStripProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">What's Happening</h3>
        <p className="text-sm text-muted-foreground">Key insights and platform trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => {
          const Icon = iconMap[insight.icon] || Sparkles;
          return (
            <Card
              key={insight.text}
              className="p-4 hover:shadow-md transition-all duration-300 border-l-4 border-l-primary"
              style={{
                animation: `fade-in 0.5s ease-out ${index * 100}ms both`,
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{insight.text}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
