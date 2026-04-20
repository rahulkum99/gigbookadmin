import { RevenueMetricCard } from './RevenueMetricCard';
import { PricingPlanCard } from './PricingPlanCard';
import { PaywallControlCard } from './PaywallControlCard';
import { ConversionInsightCard } from './ConversionInsightCard';
import { HealthStatusCard } from './HealthStatusCard';
import { ActivityFeed } from './ActivityFeed';
import { UserDistributionCard } from './UserDistributionCard';
import {
  revenueMetrics,
  subscriptionPlans,
  paywallRules,
  conversionInsights,
  healthStatuses,
  recentActivities,
  userDistribution,
} from '@/data/subscriptionsData';

export function SubscriptionsPage() {
  return (
    <div className="space-y-8 pb-8">
      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">Revenue Overview</h3>
          <p className="text-sm text-muted-foreground">Key financial metrics and performance indicators</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {revenueMetrics.map((metric, index) => (
            <RevenueMetricCard
              key={metric.name}
              name={metric.name}
              value={metric.value}
              change={metric.change}
              changeLabel={metric.changeLabel}
              icon={metric.icon}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">Subscription Plans</h3>
          <p className="text-sm text-muted-foreground">Configure pricing tiers and plan availability</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {subscriptionPlans.map((plan, index) => (
            <PricingPlanCard
              key={plan.id}
              {...plan}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaywallControlCard rules={paywallRules} delay={100} />
        <UserDistributionCard {...userDistribution} delay={200} />
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">Conversion & Upgrade Insights</h3>
          <p className="text-sm text-muted-foreground">Track user behavior and upgrade patterns</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {conversionInsights.map((insight, index) => (
            <ConversionInsightCard
              key={insight.title}
              {...insight}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthStatusCard statuses={healthStatuses} delay={100} />
        <ActivityFeed activities={recentActivities} delay={200} />
      </section>
    </div>
  );
}
