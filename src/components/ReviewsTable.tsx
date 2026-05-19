import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Review } from '@/data/reviewsData';
import { formatDistanceToNow } from 'date-fns';

interface ReviewsTableProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const getStatusBadge = (status: Review['status']) => {
    const variants: Record<Review['status'], string> = {
      Published: 'bg-green-100 text-green-800 hover:bg-green-100',
      Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      Hidden: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
      Flagged: 'bg-red-100 text-red-800 hover:bg-red-100',
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Recent Reviews</CardTitle>
        <CardDescription className="text-gray-600">
          All reviews submitted across events, venues, and user profiles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Reviewer</TableHead>
                <TableHead className="font-semibold text-gray-700">Subject</TableHead>
                <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                <TableHead className="font-semibold text-gray-700">Comment</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900">{review.reviewer.name}</div>
                      <div className="text-sm text-gray-600">{review.reviewer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900">{review.subject.name}</div>
                      <Badge variant="outline" className="text-xs">
                        {review.subject.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-700 truncate" title={review.comment}>
                      {review.comment}
                    </p>
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-gray-600 whitespace-nowrap">
                    {formatDate(review.dateSubmitted)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
