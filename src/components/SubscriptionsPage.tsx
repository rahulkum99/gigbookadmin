import { useMemo } from 'react';
import { RevenueMetricCard } from './RevenueMetricCard';
import { PricingPlanCard } from './PricingPlanCard';
import { PaywallControlCard } from './PaywallControlCard';
import { ConversionInsightCard } from './ConversionInsightCard';
import { ActivityFeed } from './ActivityFeed';
import { UserDistributionCard } from './UserDistributionCard';
import {
  useGetSubscriptionsQuery,
  useUpdatePlatformConfigMutation,
  useUpdateSubscriptionPlanMutation,
  type SubscriptionsResponse,
  type SubscriptionPlan as ApiPlan,
  type PlatformConfig,
  type ConversionInsightMetric,
  type StatMetric,
  type RecentActivity,
  type UpdateSubscriptionPlanRequest,
} from '@/features/subscriptions/subscriptionsApi';
import type { EditablePlanData } from './EditPlanDialog';
import { formatCurrency } from '@/lib/utils';

const PLAN_FEATURE_FALLBACKS: Record<string, string[]> = {
  free: ['Basic booking features', 'Email support'],
  pro: [
    'Unlimited events',
    'Advanced analytics',
    'Priority support',
    'Custom branding',
  ],
};

function formatPlanName(planType: string): string {
  if (!planType) return 'Plan';
  return planType.charAt(0).toUpperCase() + planType.slice(1).toLowerCase();
}

function formatBillingPeriod(plan: ApiPlan): string {
  if (plan.plan_type.toLowerCase() === 'free') return 'forever';
  if (!plan.interval) return 'billed once';
  return plan.interval.toLowerCase();
}

function formatPriceDisplay(plan: ApiPlan): string {
  const numeric = parseFloat(plan.price);
  if (!Number.isFinite(numeric) || numeric === 0) {
    return plan.plan_type.toLowerCase() === 'free' ? '₹0' : formatCurrency(0);
  }
  return formatCurrency(numeric);
}

function getPlanFeatures(plan: ApiPlan, freeLimit: number): string[] {
  if (plan.features && plan.features.length > 0) return plan.features;
  if (plan.plan_type.toLowerCase() === 'free') {
    return [`Up to ${freeLimit} events`, ...PLAN_FEATURE_FALLBACKS.free];
  }
  return PLAN_FEATURE_FALLBACKS.pro;
}

function formatRevenueValue(metric: StatMetric, asCurrency: boolean): string {
  if (asCurrency) return formatCurrency(metric.value);
  return Math.round(metric.value).toLocaleString('en-IN');
}

function normalizeAction(activityType: string): string {
  return (activityType || 'activity').toLowerCase();
}

function activityToFeedItem(activity: RecentActivity) {
  const amount =
    typeof activity.amount === 'number' && activity.amount > 0
      ? activity.amount
      : undefined;

  return {
    id: activity.id,
    userName: activity.user.fullname || 'Unknown user',
    userEmail: activity.user.email || 'No email on file',
    action: normalizeAction(activity.activity_type),
    planName: activity.plan_label,
    timestamp: activity.time_ago,
    amount,
  };
}

function buildPaywallRules(config: PlatformConfig) {
  return [
    {
      id: 'free-event-limit',
      name: 'Free Event Limit',
      description: 'Trigger paywall when free users reach their event creation limit',
      enabled: config.is_active,
      threshold: config.free_monthly_event_limit,
    },
    {
      id: 'advanced-features',
      name: 'Advanced Features Gate',
      description: 'Show upgrade prompt when accessing pro-only features',
      enabled: true,
      threshold: 1,
    },
  ];
}

function buildConversionInsights(insights: SubscriptionsResponse['conversion_upgrade_insights']) {
  const toPercent = (metric: ConversionInsightMetric): string => `${metric.value}%`;
  const toNumber = (metric: ConversionInsightMetric): string =>
    Number.isInteger(metric.value) ? `${metric.value}` : metric.value.toFixed(1);

  return [
    {
      title: 'Users Hitting Free Limit',
      value: toPercent(insights.users_hitting_free_limit),
      change: insights.users_hitting_free_limit.pct_change ?? 0,
      description: insights.users_hitting_free_limit.description,
      isPositive: true,
    },
    {
      title: 'Upgrade Conversion Rate',
      value: toPercent(insights.upgrade_conversion_rate),
      change: insights.upgrade_conversion_rate.pct_change ?? 0,
      description: insights.upgrade_conversion_rate.description,
      isPositive: true,
    },
    {
      title: 'Avg Events Before Upgrade',
      value: toNumber(insights.avg_events_before_upgrade),
      change: insights.avg_events_before_upgrade.pct_change ?? 0,
      description: insights.avg_events_before_upgrade.description,
      isPositive: true,
    },
    {
      title: 'Paywall Drop-off Rate',
      value: toPercent(insights.paywall_dropoff_rate),
      change: insights.paywall_dropoff_rate.pct_change ?? 0,
      description: insights.paywall_dropoff_rate.description,
      isPositive: false,
    },
  ];
}

export function SubscriptionsPage() {
  const { data, isLoading, isError } = useGetSubscriptionsQuery();
  const [updatePlatformConfig] = useUpdatePlatformConfigMutation();
  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();

  const handleUpdateThreshold = async (ruleId: string, threshold: number) => {
    if (ruleId !== 'free-event-limit') return;
    await updatePlatformConfig({ free_monthly_event_limit: threshold }).unwrap();
  };

  const handleEditPlanSave = async (payload: UpdateSubscriptionPlanRequest) => {
    await updateSubscriptionPlan(payload).unwrap();
  };

  const revenueMetrics = useMemo(() => {
    if (!data) return [];
    const { stats } = data;
    return [
      {
        name: 'Total Revenue',
        value: formatRevenueValue(stats.total_revenue, true),
        change: stats.total_revenue.pct_change ?? 0,
        changeLabel: stats.total_revenue.label,
        icon: 'dollar-sign',
      },
      {
        name: 'Active Paid Users',
        value: formatRevenueValue(stats.active_paid_users, false),
        change: stats.active_paid_users.pct_change ?? 0,
        changeLabel: stats.active_paid_users.label,
        icon: 'users',
      },
      {
        name: 'Monthly Recurring Revenue',
        value: formatRevenueValue(stats.monthly_recurring_revenue, true),
        change: stats.monthly_recurring_revenue.pct_change ?? 0,
        changeLabel: stats.monthly_recurring_revenue.label,
        icon: 'trending-up',
      },
      {
        name: 'Failed Payments',
        value: formatRevenueValue(stats.failed_payments, false),
        change: stats.failed_payments.pct_change ?? 0,
        changeLabel: stats.failed_payments.label,
        icon: 'alert-circle',
      },
    ];
  }, [data]);

  const plans = useMemo(() => {
    if (!data) return [];
    const limit = data.platform_config.free_monthly_event_limit;
    return data.plans.map((plan) => ({
      id: plan.id,
      name: plan.title?.trim() || formatPlanName(plan.plan_type),
      priceDisplay: formatPriceDisplay(plan),
      billingPeriod: formatBillingPeriod(plan),
      features: getPlanFeatures(plan, limit),
      enabled: plan.is_active,
      isBestValue: plan.plan_type.toLowerCase() === 'pro' && plan.interval === 'monthly',
      editable: {
        id: plan.id,
        title: plan.title ?? '',
        description: plan.description ?? '',
        price: plan.price ?? '0.00',
        currency: plan.currency ?? 'INR',
        razorpay_plan_id: plan.razorpay_plan_id ?? '',
        is_active: plan.is_active,
        features: plan.features ?? [],
        planLabel:
          plan.title?.trim() ||
          `${formatPlanName(plan.plan_type)}${plan.interval ? ` (${plan.interval})` : ''}`,
      } satisfies EditablePlanData,
    }));
  }, [data]);

  const paywallRules = useMemo(
    () => (data ? buildPaywallRules(data.platform_config) : []),
    [data]
  );

  const userDistribution = useMemo(() => {
    if (!data) {
      return { free: 0, paid: 0, total: 0, conversionRate: 0 };
    }
    const { user_distribution } = data;
    return {
      free: user_distribution.free_users.count,
      paid: user_distribution.pro_users.count,
      total: Math.max(user_distribution.total_active_users, 1),
      conversionRate: user_distribution.conversion_rate,
    };
  }, [data]);

  const conversionInsights = useMemo(
    () => (data ? buildConversionInsights(data.conversion_upgrade_insights) : []),
    [data]
  );

  const activities = useMemo(
    () => (data ? data.recent_activity.map(activityToFeedItem) : []),
    [data]
  );

  if (isLoading) {
    return (
      <div className="space-y-8 pb-8">
        <p className="text-sm text-muted-foreground">Loading subscription data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-8 pb-8">
        <p className="text-sm text-destructive">
          Failed to load subscription data. Please try again.
        </p>
      </div>
    );
  }

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
          {plans.map((plan, index) => (
            <PricingPlanCard
              key={plan.id}
              {...plan}
              delay={index * 100}
              onEditSave={handleEditPlanSave}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaywallControlCard
          rules={paywallRules}
          delay={100}
          onUpdateThreshold={handleUpdateThreshold}
        />
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

      <section className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* <HealthStatusCard statuses={healthStatuses} delay={100} /> */}
        <ActivityFeed activities={activities} delay={200} />
      </section>
    </div>
  );
}
