import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Shield, AlertCircle, Ban, CheckCircle, Info } from 'lucide-react';
import { User } from '@/data/usersData';
import { AccountStatus } from '@/data/safetyData';

interface AccountRestrictionControlCardProps {
  users: User[];
}

export function AccountRestrictionControlCard({ users }: AccountRestrictionControlCardProps) {
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedUser = users.find(u => u.id === selectedUserId);

  const handleStatusChange = async (newStatus: AccountStatus) => {
    if (!selectedUser) return;

    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const statusMessages = {
      'Limited': `${selectedUser.fullName}'s account has been moved to Limited Mode. They can no longer create new events but can access existing bookings.`,
      'Active': `Full access restored for ${selectedUser.fullName}. All restrictions have been removed.`,
      'Suspended': `${selectedUser.fullName}'s account has been suspended. They no longer have access to the platform.`,
    };

    toast.success(statusMessages[newStatus]);
    setIsProcessing(false);
  };

  const getStatusIcon = (status: AccountStatus) => {
    switch (status) {
      case 'Active':
        return <Shield className="h-4 w-4" />;
      case 'Limited':
        return <AlertCircle className="h-4 w-4" />;
      case 'Suspended':
        return <Ban className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Limited':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Suspended':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Account Restriction Controls</CardTitle>
        <CardDescription className="text-muted-foreground">
          Apply or remove account restrictions for safety and policy compliance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="user-select" className="text-sm font-medium text-foreground">
            Select User
          </Label>
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger id="user-select" className="w-full border-input">
              <SelectValue placeholder="Search and select a user..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{user.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.fullName}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedUser && (
          <>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{selectedUser.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{selectedUser.fullName}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <Badge variant="outline" className="font-medium">
                  {selectedUser.plan}
                </Badge>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Current Status</span>
                  <Badge className={getStatusColor(selectedUser.accountStatus)} variant="outline">
                    <span className="flex items-center gap-1.5">
                      {getStatusIcon(selectedUser.accountStatus)}
                      {selectedUser.accountStatus}
                    </span>
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">Apply Action</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  onClick={() => handleStatusChange('Limited')}
                  disabled={isProcessing || selectedUser.accountStatus === 'Limited'}
                  className="w-full justify-start bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Move to Limited Mode
                </Button>
                <Button
                  onClick={() => handleStatusChange('Active')}
                  disabled={isProcessing || selectedUser.accountStatus === 'Active'}
                  className="w-full justify-start bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Restore Full Access
                </Button>
                <Button
                  onClick={() => handleStatusChange('Suspended')}
                  disabled={isProcessing || selectedUser.accountStatus === 'Suspended'}
                  variant="destructive"
                  className="w-full justify-start opacity-75 hover:opacity-100"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-900">About Limited Mode</p>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Blocks creation of new events and bookings</li>
                    <li>Existing events and data remain accessible</li>
                    <li>User can view their account and past activity</li>
                    <li>Suitable for investigations and policy violations</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
