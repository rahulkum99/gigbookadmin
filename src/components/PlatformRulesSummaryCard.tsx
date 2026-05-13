import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CreditCard, TrendingDown, Archive, LucideIcon } from 'lucide-react';
import { PlatformRule } from '@/data/settingsData';
import { useGetMaintenanceModeQuery } from '@/features/settings/settingsApi';

interface PlatformRulesSummaryCardProps {
  rules: PlatformRule[];
}

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  CreditCard,
  TrendingDown,
  Archive,
};

function toOrdinal(n: number): string {
  const abs = Math.abs(Math.trunc(n));
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${abs}th`;
  const mod10 = abs % 10;
  if (mod10 === 1) return `${abs}st`;
  if (mod10 === 2) return `${abs}nd`;
  if (mod10 === 3) return `${abs}rd`;
  return `${abs}th`;
}

export function PlatformRulesSummaryCard({ rules }: PlatformRulesSummaryCardProps) {
  const { data } = useGetMaintenanceModeQuery();

  const effectiveRules = rules.map((rule) => {
    if (rule.id === 'free-event-limit' && typeof data?.free_event_limit === 'number') {
      return {
        ...rule,
        value: `${data.free_event_limit} events per user`,
      };
    }
    if (rule.id === 'paywall-trigger' && typeof data?.free_event_limit === 'number') {
      const paywallOn = data.free_event_limit + 1;
      return {
        ...rule,
        value: `On ${toOrdinal(paywallOn)} event creation`,
      };
    }
    return rule;
  });

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
          {effectiveRules.map((rule) => {
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
