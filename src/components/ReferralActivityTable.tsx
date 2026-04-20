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
import { ReferralActivity } from '@/data/referralsData';
import { formatDistanceToNow } from 'date-fns';

interface ReferralActivityTableProps {
  activities: ReferralActivity[];
}

export function ReferralActivityTable({ activities }: ReferralActivityTableProps) {
  const getStatusBadge = (status: ReferralActivity['status']) => {
    const variants = {
      Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
      Converted: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      Rewarded: 'bg-green-100 text-green-800 hover:bg-green-100',
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Referral Activity</CardTitle>
        <CardDescription className="text-gray-600">
          Recent referral transactions and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Referring User</TableHead>
                <TableHead className="font-semibold text-gray-700">Referred User</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700">Discount</TableHead>
                <TableHead className="font-semibold text-gray-700">Date Referred</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow
                  key={activity.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900">{activity.referringUser.name}</div>
                      <div className="text-sm text-gray-600">{activity.referringUser.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <div className="font-medium text-gray-900">{activity.referredUser.name}</div>
                      <div className="text-sm text-gray-600">{activity.referredUser.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {activity.discountApplied > 0 ? `$${activity.discountApplied}` : '—'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {formatDate(activity.dateReferred)}
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
