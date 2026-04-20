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
import { NotificationActivity } from '@/data/notificationsData';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';

interface NotificationActivityTableProps {
  activities: NotificationActivity[];
}

export function NotificationActivityTable({ activities }: NotificationActivityTableProps) {
  const getStatusBadge = (status: NotificationActivity['status']) => {
    const variants = {
      Sent: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
      Failed: 'bg-red-100 text-red-800 hover:bg-red-100',
      Scheduled: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  const getAudienceBadge = (
    audience: NotificationActivity['targetAudience'],
    segmentName?: string
  ) => {
    if (audience === 'All users') {
      return (
        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
          All users
        </Badge>
      );
    }
    if (audience === 'Segment' && segmentName) {
      return (
        <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-200">
          {segmentName}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-gray-600">
        Individual
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Notification Activity</CardTitle>
        <CardDescription className="text-gray-600">
          Recent notification broadcasts and their delivery status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Type</TableHead>
                <TableHead className="font-semibold text-gray-700">Target Audience</TableHead>
                <TableHead className="font-semibold text-gray-700">Sent</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Delivered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow
                  key={activity.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <div className="font-medium text-gray-900">{activity.type}</div>
                  </TableCell>
                  <TableCell>
                    {getAudienceBadge(activity.targetAudience, activity.segmentName)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(activity.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                      {activity.status === 'Failed' && activity.failureReason && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">{activity.failureReason}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 text-right">
                    {activity.status === 'Sent' ? formatNumber(activity.deliveryCount) : '—'}
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
