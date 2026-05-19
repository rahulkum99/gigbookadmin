import { RatingMetricCard } from './RatingMetricCard';
import { RatingDistributionCard } from './RatingDistributionCard';
import { ReviewsTable } from './ReviewsTable';
import { FlaggedReviewsCard } from './FlaggedReviewsCard';
import {
  reviewMetrics,
  ratingDistribution,
  reviews,
  flaggedReviews,
} from '@/data/reviewsData';

export function RatingsReviewsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
      >
        {reviewMetrics.map((metric, index) => (
          <RatingMetricCard
            key={metric.label}
            {...metric}
            isAverage={metric.label === 'Average Rating'}
            delay={index * 100}
          />
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
      >
        <div className="lg:col-span-1">
          <RatingDistributionCard distribution={ratingDistribution} />
        </div>
        <div className="lg:col-span-2">
          <FlaggedReviewsCard reviews={flaggedReviews} />
        </div>
      </div>

      <div style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
        <ReviewsTable reviews={reviews} />
      </div>
    </div>
  );
}
