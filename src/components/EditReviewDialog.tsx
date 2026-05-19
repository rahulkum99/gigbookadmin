import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AdminReview, ModerationStatus, UpdateReviewRequest } from '@/features/reviews/reviewsApi';

interface EditReviewDialogProps {
  open: boolean;
  review: AdminReview | null;
  isSaving?: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, body: UpdateReviewRequest) => Promise<void>;
}

interface FormState {
  rating: string;
  title: string;
  comment: string;
  would_rebook: boolean;
  moderation_status: ModerationStatus;
  is_flagged: boolean;
}

const emptyForm: FormState = {
  rating: '5',
  title: '',
  comment: '',
  would_rebook: false,
  moderation_status: 'pending',
  is_flagged: false,
};

function reviewToForm(review: AdminReview): FormState {
  return {
    rating: String(review.rating),
    title: review.title ?? '',
    comment: review.comment ?? '',
    would_rebook: review.would_rebook,
    moderation_status: review.moderation_status,
    is_flagged: review.is_flagged,
  };
}

export function EditReviewDialog({
  open,
  review,
  isSaving = false,
  onOpenChange,
  onSave,
}: EditReviewDialogProps) {
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (open && review) {
      setForm(reviewToForm(review));
    }
  }, [open, review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;

    const rating = Number(form.rating);
    if (rating < 1 || rating > 5) return;

    await onSave(review.id, {
      rating,
      title: form.title.trim(),
      comment: form.comment.trim(),
      would_rebook: form.would_rebook,
      moderation_status: form.moderation_status,
      is_flagged: form.is_flagged,
    });
    onOpenChange(false);
  };

  const ownerLabel =
    review?.event_owner?.fullname || review?.event_owner?.email || 'Unknown';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit review</DialogTitle>
          <DialogDescription>
            Update review content and moderation. Changes are saved via PATCH to the admin API.
          </DialogDescription>
        </DialogHeader>

        {review ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Event: </span>
                <span className="font-medium">{review.event_title}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Client: </span>
                <span className="font-medium">{review.client_name || 'Anonymous'}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Photographer: </span>
                <span className="font-medium">{ownerLabel}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-rating">Rating</Label>
              <Select
                value={form.rating}
                onValueChange={(v) => setForm((prev) => ({ ...prev, rating: v }))}
              >
                <SelectTrigger id="review-rating">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r} {r === 1 ? 'star' : 'stars'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-title">Title</Label>
              <Input
                id="review-title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Review headline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-comment">Comment</Label>
              <Textarea
                id="review-comment"
                value={form.comment}
                onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Review text"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="review-would-rebook">Would rebook</Label>
                <p className="text-xs text-muted-foreground">Client would book again</p>
              </div>
              <Switch
                id="review-would-rebook"
                checked={form.would_rebook}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, would_rebook: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-moderation">Moderation status</Label>
              <Select
                value={form.moderation_status}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, moderation_status: v as ModerationStatus }))
                }
              >
                <SelectTrigger id="review-moderation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="space-y-0.5">
                <Label htmlFor="review-flagged">Flagged</Label>
                <p className="text-xs text-muted-foreground">Mark for admin attention</p>
              </div>
              <Switch
                id="review-flagged"
                checked={form.is_flagged}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, is_flagged: checked }))
                }
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
