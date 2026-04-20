import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CreditCard, TrendingDown, Archive, LucideIcon } from 'lucide-react';
import { PlatformRule } from '@/data/settingsData';

interface PlatformRulesSummaryCardProps {
  rules: PlatformRule[];
}

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  CreditCard,
  TrendingDown,
  Archive,
};

export function PlatformRulesSummaryCard({ rules }: PlatformRulesSummaryCardProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Platform Rules Summary</CardTitle>
        <CardDescription className="text-gray-600">
          Key system rules and policies that govern platform behavior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule) => {
            const IconComponent = iconMap[rule.icon] || Calendar;
            return (
              <div
                key={rule.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100/50 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white border border-gray-200 rounded-lg flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{rule.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{rule.description}</p>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-md flex-shrink-0">
                        <span className="text-sm font-medium text-blue-900">{rule.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-gray-100 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-700">
            These rules are read-only summaries. Rule modifications require engineering team involvement and are tracked in the governance change log.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
