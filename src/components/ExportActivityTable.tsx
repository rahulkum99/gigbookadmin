import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ExportActivity } from '@/data/exportsData';

interface ExportActivityTableProps {
  activities: ExportActivity[];
}

export function ExportActivityTable({ activities }: ExportActivityTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Admin</TableHead>
            <TableHead>Dataset</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">File Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow
              key={activity.id}
              className="transition-colors duration-200 animate-in fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
                animationDuration: '400ms'
              }}
            >
              <TableCell>
                <div>
                  <div className="font-medium">{activity.adminName}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.adminEmail}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {activity.datasetName}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {activity.timestamp}
              </TableCell>
              <TableCell>
                <Badge
                  variant={activity.status === 'completed' ? 'default' : 'destructive'}
                  className={
                    activity.status === 'completed'
                      ? 'bg-green-500 hover:bg-green-600'
                      : ''
                  }
                >
                  {activity.status === 'completed' ? 'Completed' : 'Failed'}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm">
                {activity.fileSize}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
