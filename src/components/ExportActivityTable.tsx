import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { ExportHistoryItem } from '@/features/exports/exportsApi';

interface ExportActivityTableProps {
  activities: ExportHistoryItem[];
  isLoading?: boolean;
}

const formatTimestamp = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatRowCount = (count: number): string =>
  `${count.toLocaleString()} row${count === 1 ? '' : 's'}`;

export function ExportActivityTable({ activities, isLoading = false }: ExportActivityTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Admin</TableHead>
            <TableHead>Dataset</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Rows</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                </TableCell>
              </TableRow>
            ))
          ) : activities.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-sm text-muted-foreground py-8"
              >
                No exports have been generated yet.
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity, index) => (
              <TableRow
                key={activity.id}
                className="transition-colors duration-200 animate-in fade-in"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationDuration: '400ms'
                }}
              >
                <TableCell>
                  <div className="font-medium">{activity.downloaded_by_email}</div>
                </TableCell>
                <TableCell className="font-medium">
                  {activity.export_type_label}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatTimestamp(activity.generated_at)}
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Completed
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-sm">
                  {formatRowCount(activity.row_count)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
