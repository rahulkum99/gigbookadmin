import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export interface StatMetric {
  value: number;
  label: string;
  pct_change: number | null;
}

export interface SubscriptionStats {
  total_revenue: StatMetric;
  active_paid_users: StatMetric;
  monthly_recurring_revenue: StatMetric;
  failed_payments: StatMetric;
}

export interface UserSegment {
  count: number;
  percentage: number;
}

export interface UserDistribution {
  total_active_users: number;
  pro_users: UserSegment;
  free_users: UserSegment;
  conversion_rate: number;
}

export interface ConversionInsightMetric {
  value: number;
  pct_change: number | null;
  description: string;
}

export interface ConversionUpgradeInsights {
  users_hitting_free_limit: ConversionInsightMetric;
  upgrade_conversion_rate: ConversionInsightMetric;
  avg_events_before_upgrade: ConversionInsightMetric;
  paywall_dropoff_rate: ConversionInsightMetric;
}

export interface SubscriptionUser {
  id: string;
  fullname: string | null;
  email: string | null;
}

export type SubscriptionActivityType =
  | 'Active'
  | 'Created'
  | 'Cancelled'
  | 'Upgraded'
  | 'Downgraded'
  | 'Renewed';

export interface RecentActivity {
  id: string;
  user: SubscriptionUser;
  activity_type: SubscriptionActivityType | string;
  plan_label: string;
  plan_type: string;
  interval: string | null;
  amount: number | null;
  currency: string;
  activity_at: string;
  time_ago: string;
}

export interface SubscriptionPlan {
  id: string;
  plan_type: string;
  interval: string | null;
  price: string;
  currency: string;
  is_active: boolean;
  title: string;
  description: string;
  features: string[];
  razorpay_plan_id?: string;
}

export interface PlatformConfig {
  id: string;
  free_monthly_event_limit: number;
  is_active: boolean;
  updated_at: string;
}

export interface SubscriptionRecord {
  id: string;
  razorpay_subscription_id: string;
  plan_type: string;
  interval: string | null;
  price: string;
  currency: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  current_period_end: string | null;
  discount_amount: string;
  discount_applied: boolean;
  amount: string;
  final_amount: string;
  razorpay_payment_id: string | null;
  razorpay_order_id: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface SubscriptionsPage {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: SubscriptionRecord[];
}

export interface SubscriptionsResponse {
  stats: SubscriptionStats;
  user_distribution: UserDistribution;
  conversion_upgrade_insights: ConversionUpgradeInsights;
  recent_activity: RecentActivity[];
  plans: SubscriptionPlan[];
  platform_config: PlatformConfig;
  subscriptions: SubscriptionsPage;
}

export interface UpdatePlatformConfigRequest {
  free_monthly_event_limit?: number;
  is_active?: boolean;
}

export interface UpdateSubscriptionPlanRequest {
  id: string;
  price?: string;
  currency?: string;
  razorpay_plan_id?: string;
  is_active?: boolean;
  title?: string;
  description?: string;
  features?: string[];
}

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Subscriptions', 'PlatformConfig', 'SubscriptionPlan'],
  endpoints: (builder) => ({
    getSubscriptions: builder.query<SubscriptionsResponse, void>({
      query: () => ({
        url: '/api/v1/admin/subscriptions/',
        method: 'GET',
      }),
      providesTags: ['Subscriptions', 'PlatformConfig', 'SubscriptionPlan'],
    }),
    updatePlatformConfig: builder.mutation<PlatformConfig, UpdatePlatformConfigRequest>({
      query: (body) => ({
        url: '/api/v1/admin/platform-config/',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['PlatformConfig'],
    }),
    updateSubscriptionPlan: builder.mutation<SubscriptionPlan, UpdateSubscriptionPlanRequest>({
      query: ({ id, ...body }) => ({
        url: `/api/v1/admin/subscription-plans/${id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['SubscriptionPlan'],
    }),
    getSubscriptionPlanById: builder.query<SubscriptionPlan, string>({
      query: (id) => ({
        url: `/api/v1/admin/subscription-plans/${id}/`,
        method: 'GET',
      }),
      providesTags: ['SubscriptionPlan'],
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useLazyGetSubscriptionPlanByIdQuery,
  useUpdatePlatformConfigMutation,
  useUpdateSubscriptionPlanMutation,
} = subscriptionsApi;
