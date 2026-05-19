import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, EyeOff, Star } from 'lucide-react';
import { FlaggedReview } from '@/data/reviewsData';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface FlaggedReviewsCardProps {
  reviews: FlaggedReview[];
}

export function FlaggedReviewsCard({ reviews }: FlaggedReviewsCardProps) {
  const handleApprove = (id: string) => {
    toast.success(`Review ${id} approved and published`);
  };

  const handleHide = (id: string) => {
    toast.success(`Review ${id} hidden from public view`);
  };

  const handleDismiss = (id: string) => {
    toast.success(`Flag dismissed for review ${id}`);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Flagged Reviews
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1.5">
              Reviews reported for moderation — take action to approve, hide, or dismiss
            </CardDescription>
          </div>
          {reviews.length > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              {reviews.length} Pending
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p className="font-medium">No flagged reviews</p>
              <p className="text-sm mt-1">All reviews have been moderated</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{review.reviewer.name}</div>
                    <div className="text-sm text-gray-600">{review.reviewer.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {review.subject.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800 mb-1">{review.subject.name}</p>
                <p className="text-sm text-gray-700 mb-3 italic">&ldquo;{review.comment}&rdquo;</p>
                <p className="text-sm text-gray-700 flex items-start gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>{review.flagReason}</span>
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Flagged {formatDistanceToNow(new Date(review.dateFlagged), { addSuffix: true })}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 hover:border-green-300"
                    onClick={() => handleApprove(review.id)}
                  >
                    <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    onClick={() => handleHide(review.id)}
                  >
                    <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                    Hide
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleDismiss(review.id)}
                  >
                    Dismiss Flag
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
