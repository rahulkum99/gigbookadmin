import { KPICard } from './KPICard';
import { PerformanceChart } from './PerformanceChart';
import { ConversionInsights } from './ConversionInsights';
import { SubscriptionHealth } from './SubscriptionHealth';
import { SystemHealth } from './SystemHealth';
import { InsightStrip } from './InsightStrip';
import {
  kpiMetrics,
  generateChartData,
  conversionMetrics,
  subscriptionData,
  systemStatuses,
  insights,
} from '@/data/dashboardData';

export function Dashboard() {
  const chartData = generateChartData();

  return (
    <div className="space-y-8 pb-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiMetrics.map((metric, index) => (
          <KPICard key={metric.name} {...metric} delay={index * 100} />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceChart data={chartData} />
        <SubscriptionHealth {...subscriptionData} />
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">Conversion & Growth</h3>
          <p className="text-sm text-muted-foreground">Track user journey and monetization metrics</p>
        </div>
        <ConversionInsights metrics={conversionMetrics} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InsightStrip insights={insights} />
        </div>
        <SystemHealth statuses={systemStatuses} />
      </section>
    </div>
  );
}
