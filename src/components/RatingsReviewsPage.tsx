import { useEffect, useMemo, useState } from 'react';
import { RatingMetricCard } from './RatingMetricCard';
import { ReviewsTable } from './ReviewsTable';
import {
  useGetReviewsQuery,
  type ModerationStatus,
} from '@/features/reviews/reviewsApi';

export function RatingsReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moderationFilter, setModerationFilter] = useState<ModerationStatus | 'all'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [flaggedOnly, setFlaggedOnly] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, moderationFilter, ratingFilter, flaggedOnly]);

  const listParams = useMemo(
    () => ({
      search: debouncedSearch,
      page: currentPage,
      ...(moderationFilter !== 'all' ? { moderation_status: moderationFilter } : {}),
      ...(ratingFilter !== 'all' ? { rating: ratingFilter } : {}),
      ...(flaggedOnly ? { is_flagged: true } : {}),
    }),
    [debouncedSearch, currentPage, moderationFilter, ratingFilter, flaggedOnly]
  );

  const { data, isLoading, isError, isFetching } = useGetReviewsQuery(listParams);

  const stats = data?.stats;
  const reviewMetrics = useMemo(
    () => [
      {
        label: 'Total Reviews',
        value: stats?.total_reviews.value ?? 0,
        trend: stats?.total_reviews.trend ?? null,
        trendLabel: stats?.total_reviews.comparisonPeriod ?? 'vs last month',
        trendIsPercent: stats?.total_reviews.trendIsPercent ?? true,
        isAverage: false,
      },
      {
        label: 'Average Rating',
        value: stats?.average_rating.value ?? 0,
        trend: stats?.average_rating.trend ?? null,
        trendLabel: stats?.average_rating.comparisonPeriod ?? 'vs last month',
        trendIsPercent: stats?.average_rating.trendIsPercent ?? false,
        isAverage: true,
      },
      {
        label: 'Pending Moderation',
        value: stats?.pending_moderation.value ?? 0,
        trend: stats?.pending_moderation.trend ?? null,
        trendLabel: stats?.pending_moderation.comparisonPeriod ?? 'vs last week',
        trendIsPercent: stats?.pending_moderation.trendIsPercent ?? true,
        isAverage: false,
      },
      {
        label: 'Flagged Reviews',
        value: stats?.flagged_reviews.value ?? 0,
        trend: stats?.flagged_reviews.trend ?? null,
        trendLabel: stats?.flagged_reviews.comparisonPeriod ?? 'vs last week',
        trendIsPercent: stats?.flagged_reviews.trendIsPercent ?? true,
        isAverage: false,
      },
    ],
    [stats]
  );

  return (
    <div className="space-y-8 pb-8">
      <section
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
      >
        {reviewMetrics.map((metric, index) => (
          <RatingMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            trend={metric.trend}
            trendLabel={metric.trendLabel}
            trendIsPercent={metric.trendIsPercent}
            isAverage={metric.isAverage}
            delay={index * 100}
            isLoading={isLoading && !data}
          />
        ))}
      </section>

      <section style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
        <ReviewsTable
          reviews={data?.reviews ?? []}
          count={data?.count ?? 0}
          currentPage={data?.current_page ?? 1}
          totalPages={data?.total_pages ?? 1}
          hasNext={Boolean(data?.next)}
          hasPrevious={Boolean(data?.previous)}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          moderationFilter={moderationFilter}
          onModerationFilterChange={setModerationFilter}
          ratingFilter={ratingFilter}
          onRatingFilterChange={setRatingFilter}
          flaggedOnly={flaggedOnly}
          onFlaggedOnlyChange={setFlaggedOnly}
          onPageChange={setCurrentPage}
        />
      </section>
    </div>
  );
}
