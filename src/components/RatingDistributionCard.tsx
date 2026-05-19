import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { RatingDistribution } from '@/data/reviewsData';

interface RatingDistributionCardProps {
  distribution: RatingDistribution[];
}

export function RatingDistributionCard({ distribution }: RatingDistributionCardProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Rating Distribution</CardTitle>
        <CardDescription className="text-gray-600">
          Breakdown of all platform reviews by star rating
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 flex-shrink-0">
                <span className="text-sm font-medium text-gray-700">{item.stars}</span>
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              </div>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-20 text-right flex-shrink-0">
                {item.count.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
