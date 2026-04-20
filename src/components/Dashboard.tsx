import { KPICard } from './KPICard';
import { PerformanceChart } from './PerformanceChart';
import { ConversionInsights } from './ConversionInsights';
import { SubscriptionHealth } from './SubscriptionHealth';
import { useGetDashboardQuery } from '@/features/dashboard/dashboardApi';

export function Dashboard() {
  const { data, isLoading, isError } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="space-y-8 pb-8">
        <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-8 pb-8">
        <p className="text-sm text-destructive">
          Failed to load dashboard data. Please try again.
        </p>
      </div>
    );
  }

  const kpiMetrics = [
    {
      name: 'Total Users',
      value: data.stats.total_users,
      change: 0,
      changeLabel: 'Live total',
      icon: 'users',
    },
    {
      name: 'Active Users',
      value: data.stats.active_users,
      change: 0,
      changeLabel: 'Current active',
      icon: 'activity',
    },
    {
      name: 'Total Events',
      value: data.stats.total_events,
      change: 0,
      changeLabel: 'All time',
      icon: 'calendar',
    },
    {
      name: 'Events Today',
      value: data.stats.events_today,
      change: 0,
      changeLabel: 'Today',
      icon: 'calendar-plus',
    },
    {
      name: 'Active Subscriptions',
      value: data.stats.active_subscriptions,
      change: 0,
      changeLabel: 'Current active',
      icon: 'credit-card',
    },
  ];

  const chartData = data.platform_performance.activity.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    events: item.events_created,
    usersRegistered: item.users_registered,
  }));

  const conversionMetrics = [
    {
      title: 'Free Limit Reached',
      value: data.conversion_growth.subscription_free_limit_reached.count.toString(),
      change: data.conversion_growth.subscription_free_limit_reached.percentage,
      description: 'Users who hit their free event limit',
    },
    {
      title: 'Upgraded to Pro',
      value: data.conversion_growth.upgraded_to_pro.count.toString(),
      change: data.conversion_growth.upgraded_to_pro.percentage,
      description: 'Users who upgraded to Pro',
    },
    {
      title: 'Paywall Drop-off',
      value: `${data.conversion_growth.paywell_dropoff_rate.percentage}%`,
      change: data.conversion_growth.paywell_dropoff_rate.percentage,
      description: 'Users leaving at upgrade prompt',
    },
  ];

  const subscriptionData = {
    free: data.subscription_health.free_users.count,
    pro: data.subscription_health.pro_users.count,
    totalUsers: data.subscription_health.total_active_users,
  };

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

      {/* <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InsightStrip insights={insights} />
        </div>
        <SystemHealth statuses={systemStatuses} />
      </section> */}
    </div>
  );
}
