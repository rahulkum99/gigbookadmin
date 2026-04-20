import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Flag,
  AlertTriangle,
  Shield,
  Ban,
  CheckCircle,
  AlertCircle,
  User as UserIcon,
  Clock,
  Calendar,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FlaggedAccount, SafetyCaseNote, AccountStatus } from '@/data/safetyData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SafetyCasePanelProps {
  account: FlaggedAccount | null;
  caseNotes: SafetyCaseNote[];
  isOpen: boolean;
  onClose: () => void;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Low':
      return 'bg-gray-50 text-gray-700 border-gray-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'High':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Critical':
      return 'bg-red-50 text-red-700 border-red-200';
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

export function SafetyCasePanel({ account, caseNotes, isOpen, onClose }: SafetyCasePanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<AccountStatus>(
    account?.currentStatus || 'Active'
  );

  if (!account) return null;

  const relevantNotes = caseNotes.filter(note => note.caseId === account.id);

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus as AccountStatus);
    toast.success(`Status changed to ${newStatus}`, {
      description: `${account.userName}'s account status has been updated.`,
    });
  };

  const handleMoveToLimited = () => {
    toast.success('Account moved to Limited Mode', {
      description: `${account.userName} can no longer create new events.`,
    });
  };

  const handleRestoreAccess = () => {
    toast.success('Full access restored', {
      description: `${account.userName} now has complete platform access.`,
    });
  };

  const handleSuspendAccount = () => {
    toast.warning('Account suspended', {
      description: `${account.userName} no longer has platform access.`,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-4 pt-2">
            <Avatar className="h-16 w-16 ring-4 ring-amber-100">
              <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 text-lg font-semibold">
                {account.userAvatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-2xl">{account.userName}</SheetTitle>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    account.plan === 'Pro'
                      ? 'bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary border-primary/20'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {account.plan}
                </Badge>
                <Badge variant="outline" className={cn('font-medium', getStatusColor(account.currentStatus))}>
                  {getStatusIcon(account.currentStatus)}
                  <span className="ml-1">{account.currentStatus}</span>
                </Badge>
                <Badge variant="outline" className={cn('font-medium', getSeverityColor(account.severity))}>
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {account.severity}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <Card className="p-5 border-amber-200 bg-amber-50/30">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Flag className="h-4 w-4 text-amber-600" />
              Flag Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Flag Reason</p>
                  <p className="text-sm text-foreground font-medium">{account.flagReason}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm text-foreground font-medium">{account.flagCategory}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Flagged</p>
                  <p className="text-sm text-foreground font-medium">
                    {format(account.flagDate, 'MMM dd, yyyy')} ({formatDistanceToNow(account.flagDate, { addSuffix: true })})
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <UserIcon className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Assigned Admin</p>
                  <p className="text-sm text-foreground font-medium">{account.assignedAdmin}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Case Notes Timeline
            </h3>
            {relevantNotes.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No case notes available</p>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {relevantNotes.map((note, index) => (
                    <div key={note.id} className="relative pl-6 pb-4">
                      {index !== relevantNotes.length - 1 && (
                        <div className="absolute left-2 top-6 bottom-0 w-px bg-border" />
                      )}
                      <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-primary/20 border-2 border-primary" />
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-foreground">{note.adminName}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(note.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        {note.actionTaken && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 mb-1">
                            {note.actionTaken}
                          </Badge>
                        )}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {note.noteContent}
                        </p>
                        <p className="text-xs text-muted-foreground pt-1">
                          {format(note.timestamp, 'MMM dd, yyyy \'at\' h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Account Status Controls
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Change Status</label>
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-amber-300 hover:bg-amber-50"
                  onClick={handleMoveToLimited}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Move to Limited Mode
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-emerald-300 hover:bg-emerald-50"
                  onClick={handleRestoreAccess}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Restore Full Access
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-red-300 hover:bg-red-50 opacity-75"
                  onClick={handleSuspendAccount}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-secondary/30">
            <h3 className="text-sm font-semibold text-foreground mb-3">Case Metadata</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Case ID</span>
                <span className="font-mono text-xs">{account.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs">{account.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Flags</span>
                <span className="font-medium">{account.flagCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Case Status</span>
                <span className="font-medium">
                  {account.resolutionDate ? 'Resolved' : 'Under Review'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
