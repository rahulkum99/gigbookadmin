import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/features/auth/authApi';

export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface ReviewOwner {
  id: string;
  fullname: string | null;
  email: string | null;
}

export interface AdminReview {
  id: string;
  event: string;
  event_title: string;
  event_owner: ReviewOwner | null;
  client: string | null;
  client_name: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  would_rebook: boolean;
  moderation_status: ModerationStatus;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface RatingDistributionItem {
  stars: number;
  count: number;
  percentage: number;
}

export interface ReviewStatMetric {
  value: number;
  trend: number | null;
  trendIsPercent: boolean;
  comparisonPeriod: string;
}

export interface ReviewStats {
  total_reviews: ReviewStatMetric;
  average_rating: ReviewStatMetric;
  pending_moderation: ReviewStatMetric;
  flagged_reviews: ReviewStatMetric;
  rating_distribution: RatingDistributionItem[];
}

export interface ReviewsListResponse {
  stats: ReviewStats;
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  reviews: AdminReview[];
}

export interface GetReviewsParams {
  search?: string;
  page?: number;
  moderation_status?: ModerationStatus;
  is_flagged?: boolean;
  rating?: number;
}

export interface CreateReviewRequest {
  event: string;
  client?: string;
  rating: number;
  title?: string;
  comment?: string;
  would_rebook?: boolean;
  moderation_status?: ModerationStatus;
  is_flagged?: boolean;
}

export interface UpdateReviewRequest {
  event?: string;
  client?: string;
  rating?: number;
  title?: string;
  comment?: string;
  would_rebook?: boolean;
  moderation_status?: ModerationStatus;
  is_flagged?: boolean;
}

interface RawReviewStat {
  value?: number;
  pct_change?: number | null;
  change?: number | null;
  comparison_period?: string;
}

interface RawReviewsPage {
  count?: number;
  total_pages?: number;
  current_page?: number;
  next?: string | null;
  previous?: string | null;
  results?: AdminReview[];
}

interface RawReviewsListResponse {
  stats?: {
    total_reviews?: RawReviewStat;
    average_rating?: RawReviewStat;
    pending_moderation?: RawReviewStat;
    flagged_reviews?: RawReviewStat;
    rating_distribution?: RatingDistributionItem[];
  };
  reviews?: RawReviewsPage | AdminReview[];
  count?: number;
  total_pages?: number;
  current_page?: number;
  next?: string | null;
  previous?: string | null;
}

const defaultComparisonPeriods = {
  total_reviews: 'vs last month',
  average_rating: 'vs last month',
  pending_moderation: 'vs last week',
  flagged_reviews: 'vs last week',
} as const;

function normalizeStat(
  stat: RawReviewStat | undefined,
  defaultPeriod: string,
  trendIsPercent: boolean
): ReviewStatMetric {
  const trend = trendIsPercent
    ? (stat?.pct_change ?? null)
    : (stat?.change ?? stat?.pct_change ?? null);

  return {
    value: stat?.value ?? 0,
    trend,
    trendIsPercent,
    comparisonPeriod: stat?.comparison_period ?? defaultPeriod,
  };
}

function normalizeReview(raw: AdminReview): AdminReview {
  return {
    ...raw,
    title: raw.title || null,
    comment: raw.comment || null,
  };
}

function normalizeReviewsListResponse(response: RawReviewsListResponse): ReviewsListResponse {
  const reviewsPage = response.reviews;
  const isNestedPage =
    reviewsPage !== null &&
    reviewsPage !== undefined &&
    !Array.isArray(reviewsPage) &&
    typeof reviewsPage === 'object';

  const results = isNestedPage
    ? (reviewsPage.results ?? [])
    : Array.isArray(reviewsPage)
      ? reviewsPage
      : [];

  return {
    stats: {
      total_reviews: normalizeStat(
        response.stats?.total_reviews,
        defaultComparisonPeriods.total_reviews,
        true
      ),
      average_rating: normalizeStat(
        response.stats?.average_rating,
        defaultComparisonPeriods.average_rating,
        false
      ),
      pending_moderation: normalizeStat(
        response.stats?.pending_moderation,
        defaultComparisonPeriods.pending_moderation,
        true
      ),
      flagged_reviews: normalizeStat(
        response.stats?.flagged_reviews,
        defaultComparisonPeriods.flagged_reviews,
        true
      ),
      rating_distribution: response.stats?.rating_distribution ?? [],
    },
    count: isNestedPage ? (reviewsPage.count ?? results.length) : (response.count ?? results.length),
    total_pages: isNestedPage
      ? (reviewsPage.total_pages ?? 1)
      : (response.total_pages ?? 1),
    current_page: isNestedPage
      ? (reviewsPage.current_page ?? 1)
      : (response.current_page ?? 1),
    next: isNestedPage ? (reviewsPage.next ?? null) : (response.next ?? null),
    previous: isNestedPage ? (reviewsPage.previous ?? null) : (response.previous ?? null),
    reviews: results.map(normalizeReview),
  };
}

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Reviews', 'Review'],
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewsListResponse, GetReviewsParams | void>({
      query: ({
        search = '',
        page = 1,
        moderation_status,
        is_flagged,
        rating,
      } = {}) => ({
        url: '/api/v1/admin/reviews/',
        method: 'GET',
        params: {
          page,
          ...(search ? { search } : {}),
          ...(moderation_status ? { moderation_status } : {}),
          ...(typeof is_flagged === 'boolean' ? { is_flagged } : {}),
          ...(rating ? { rating } : {}),
        },
      }),
      transformResponse: (response: RawReviewsListResponse) => normalizeReviewsListResponse(response),
      providesTags: (result) =>
        result
          ? [
              { type: 'Reviews', id: 'LIST' },
              ...result.reviews.map((review) => ({ type: 'Review' as const, id: review.id })),
            ]
          : [{ type: 'Reviews', id: 'LIST' }],
    }),
    getReview: builder.query<AdminReview, string>({
      query: (id) => ({
        url: `/api/v1/admin/reviews/${id}/`,
        method: 'GET',
      }),
      transformResponse: (response: AdminReview) => normalizeReview(response),
      providesTags: (_result, _error, id) => [{ type: 'Review', id }],
    }),
    createReview: builder.mutation<AdminReview, CreateReviewRequest>({
      query: (body) => ({
        url: '/api/v1/admin/reviews/',
        method: 'POST',
        body,
      }),
      transformResponse: (response: AdminReview) => normalizeReview(response),
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
    updateReview: builder.mutation<AdminReview, { id: string; body: UpdateReviewRequest }>({
      query: ({ id, body }) => ({
        url: `/api/v1/admin/reviews/${id}/`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: AdminReview) => normalizeReview(response),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Review', id },
        { type: 'Reviews', id: 'LIST' },
      ],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/admin/reviews/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Review', id },
        { type: 'Reviews', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
