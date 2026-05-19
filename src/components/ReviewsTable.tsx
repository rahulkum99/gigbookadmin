import { useState } from 'react';
import { Pencil, Search, Star, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  AdminReview,
  ModerationStatus,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  type UpdateReviewRequest,
} from '@/features/reviews/reviewsApi';
import { EditReviewDialog } from './EditReviewDialog';

interface ReviewsTableProps {
  reviews: AdminReview[];
  count: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  moderationFilter: ModerationStatus | 'all';
  onModerationFilterChange: (value: ModerationStatus | 'all') => void;
  ratingFilter: number | 'all';
  onRatingFilterChange: (value: number | 'all') => void;
  flaggedOnly: boolean;
  onFlaggedOnlyChange: (value: boolean) => void;
  onPageChange: (page: number) => void;
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

const moderationBadgeClass: Record<ModerationStatus, string> = {
  approved: 'bg-green-100 text-green-800 hover:bg-green-100',
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100',
};

const moderationLabels: Record<ModerationStatus, string> = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
};

export function ReviewsTable({
  reviews,
  count,
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  isLoading,
  isFetching,
  isError,
  searchQuery,
  onSearchChange,
  moderationFilter,
  onModerationFilterChange,
  ratingFilter,
  onRatingFilterChange,
  flaggedOnly,
  onFlaggedOnlyChange,
  onPageChange,
}: ReviewsTableProps) {
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditSave = async (id: string, body: UpdateReviewRequest) => {
    try {
      await updateReview({ id, body }).unwrap();
      toast.success('Review updated');
    } catch {
      toast.error('Failed to update review');
      throw new Error('update failed');
    }
  };

  const openEditDialog = (review: AdminReview) => {
    setEditingReview(review);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteReview(id).unwrap();
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    } finally {
      setDeletingId(null);
    }
  };

  const ownerName = (review: AdminReview) =>
    review.event_owner?.fullname || review.event_owner?.email || 'Unknown';

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Reviews</CardTitle>
        <CardDescription className="text-gray-600">
          Event reviews from clients — search and filter by status, rating, or flag
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events, clients, comments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={moderationFilter}
            onValueChange={(v) => onModerationFilterChange(v as ModerationStatus | 'all')}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={String(ratingFilter)}
            onValueChange={(v) => onRatingFilterChange(v === 'all' ? 'all' : Number(v))}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              {[5, 4, 3, 2, 1].map((r) => (
                <SelectItem key={r} value={String(r)}>
                  {r} stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={flaggedOnly ? 'default' : 'outline'}
            onClick={() => onFlaggedOnlyChange(!flaggedOnly)}
          >
            Flagged only
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {isFetching && !isLoading ? 'Refreshing… ' : null}
          Showing {reviews.length} of {count} reviews
        </p>

        {isLoading ? (
          <p className="text-sm text-muted-foreground py-8 text-center">Loading reviews...</p>
        ) : isError ? (
          <p className="text-sm text-destructive py-8 text-center">
            Failed to load reviews. Please try again.
          </p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No reviews found</p>
        ) : (
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Client</TableHead>
                  <TableHead className="font-semibold text-gray-700">Event</TableHead>
                  <TableHead className="font-semibold text-gray-700">Photographer</TableHead>
                  <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                  <TableHead className="font-semibold text-gray-700">Review</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Submitted</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {review.client_name || 'Anonymous'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 max-w-[180px] truncate" title={review.event_title}>
                        {review.event_title}
                      </div>
                      {review.title ? (
                        <p className="text-xs text-gray-500 truncate max-w-[180px]" title={review.title}>
                          {review.title}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{ownerName(review)}</TableCell>
                    <TableCell>
                      <StarRating rating={review.rating} />
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-gray-700 truncate" title={review.comment ?? ''}>
                        {review.comment || '—'}
                      </p>
                      {review.would_rebook ? (
                        <span className="text-xs text-green-600">Would rebook</span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant="secondary"
                          className={moderationBadgeClass[review.moderation_status]}
                        >
                          {moderationLabels[review.moderation_status]}
                        </Badge>
                        {review.is_flagged ? (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Flagged
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap text-sm">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8"
                          disabled={isUpdating}
                          onClick={() => openEditDialog(review)}
                          aria-label="Edit review"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 text-red-600 hover:text-red-700"
                              disabled={isDeleting && deletingId === review.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete review?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This permanently removes the review for &quot;{review.event_title}&quot;.
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => handleDelete(review.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {totalPages > 1 ? (
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!hasPrevious || isFetching}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!hasNext || isFetching}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>

      <EditReviewDialog
        open={editDialogOpen}
        review={editingReview}
        isSaving={isUpdating}
        onOpenChange={(open) => {
          setEditDialogOpen(open);
          if (!open) setEditingReview(null);
        }}
        onSave={handleEditSave}
      />
    </Card>
  );
}
