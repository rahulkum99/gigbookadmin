import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Ban, CheckCircle } from 'lucide-react';
import { AbuseMonitoring } from '@/data/referralsData';
import { toast } from 'sonner';

interface AbuseMonitoringCardProps {
  data: AbuseMonitoring;
}

export function AbuseMonitoringCard({ data }: AbuseMonitoringCardProps) {
  const handleDisableAccess = (email: string) => {
    toast.success(`Referral access disabled for ${email}`);
  };

  const handleMarkReviewed = (email: string) => {
    toast.success(`User ${email} marked as reviewed`);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Abuse & Control
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1.5">
              Monitor and manage suspicious referral activity
            </CardDescription>
          </div>
          {data.flaggedCount > 0 && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              {data.flaggedCount} Flagged
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.highActivityUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <p className="font-medium">No suspicious activity detected</p>
              <p className="text-sm mt-1">All referral patterns appear normal</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">High Activity Users</h4>
              {data.highActivityUsers.map((user, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700 border border-orange-200">
                      {user.referralCount} referrals
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{user.flagReason}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 hover:border-red-300"
                      onClick={() => handleDisableAccess(user.email)}
                    >
                      <Ban className="h-3.5 w-3.5 mr-1.5" />
                      Disable Access
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleMarkReviewed(user.email)}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      Mark Reviewed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
