import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

interface DashboardStats {
  total_users: number;
  active_users: number;
  total_events: number;
  events_today: number;
  active_subscriptions: number;
}

interface DashboardSubscriptionSegment {
  count: number;
  percentage: number;
}

interface DashboardSubscriptionHealth {
  total_active_users: number;
  pro_users: DashboardSubscriptionSegment;
  free_users: DashboardSubscriptionSegment;
}

interface DashboardActivityPoint {
  date: string;
  events_created: number;
  users_registered: number;
  active_users: number;
}

interface DashboardPerformance {
  period_start: string;
  period_end: string;
  activity: DashboardActivityPoint[];
}

interface DashboardConversionMetric {
  count: number;
  percentage: number;
}

interface DashboardConversionGrowth {
  subscription_free_limit_reached: DashboardConversionMetric;
  upgraded_to_pro: DashboardConversionMetric;
  paywell_dropoff_rate: DashboardConversionMetric;
}

export interface DashboardResponse {
  stats: DashboardStats;
  subscription_health: DashboardSubscriptionHealth;
  platform_performance: DashboardPerformance;
  conversion_growth: DashboardConversionGrowth;
}

type RawDashboardResponse = Partial<DashboardResponse>;

const defaultMetric: DashboardConversionMetric = {
  count: 0,
  percentage: 0,
};

const defaultResponse: DashboardResponse = {
  stats: {
    total_users: 0,
    active_users: 0,
    total_events: 0,
    events_today: 0,
    active_subscriptions: 0,
  },
  subscription_health: {
    total_active_users: 0,
    pro_users: { count: 0, percentage: 0 },
    free_users: { count: 0, percentage: 0 },
  },
  platform_performance: {
    period_start: '',
    period_end: '',
    activity: [],
  },
  conversion_growth: {
    subscription_free_limit_reached: defaultMetric,
    upgraded_to_pro: defaultMetric,
    paywell_dropoff_rate: defaultMetric,
  },
};

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: '/api/v1/admin/dashboard/',
        method: 'GET',
      }),
      transformResponse: (response: RawDashboardResponse): DashboardResponse => ({
        // Normalize partial payloads from backend so UI remains resilient.
        stats: {
          ...defaultResponse.stats,
          ...(response.stats ?? {}),
        },
        subscription_health: {
          ...defaultResponse.subscription_health,
          ...(response.subscription_health ?? {}),
          pro_users: {
            ...defaultResponse.subscription_health.pro_users,
            ...(response.subscription_health?.pro_users ?? {}),
          },
          free_users: {
            ...defaultResponse.subscription_health.free_users,
            ...(response.subscription_health?.free_users ?? {}),
          },
        },
        platform_performance: {
          ...defaultResponse.platform_performance,
          ...(response.platform_performance ?? {}),
          activity: (response.platform_performance?.activity ?? []).map((point) => ({
            date: point.date ?? '',
            events_created: point.events_created ?? 0,
            users_registered: point.users_registered ?? 0,
            active_users:
              point.active_users ?? response.subscription_health?.total_active_users ?? 0,
          })),
        },
        conversion_growth: {
          ...defaultResponse.conversion_growth,
          ...(response.conversion_growth ?? {}),
          subscription_free_limit_reached: {
            ...defaultResponse.conversion_growth.subscription_free_limit_reached,
            ...(response.conversion_growth?.subscription_free_limit_reached ?? {}),
          },
          upgraded_to_pro: {
            ...defaultResponse.conversion_growth.upgraded_to_pro,
            ...(response.conversion_growth?.upgraded_to_pro ?? {}),
          },
          paywell_dropoff_rate: {
            ...defaultResponse.conversion_growth.paywell_dropoff_rate,
            ...(response.conversion_growth?.paywell_dropoff_rate ?? {}),
          },
        },
      }),
    }),
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
