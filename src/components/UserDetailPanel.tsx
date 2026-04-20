import { useState } from 'react';
import { format } from 'date-fns';
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  CreditCard,
  Shield,
  LogOut,
  Eye,
  Plus,
  Ban,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User } from '@/data/usersData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UserDetailPanelProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailPanel({ user, isOpen, onClose }: UserDetailPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<User['accountStatus']>(
    user?.accountStatus || 'Active'
  );

  if (!user) return null;

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus as User['accountStatus']);
    toast.success(`User status would be changed to ${newStatus}`, {
      description: 'This is a UI-only demonstration',
    });
  };

  const handleSuspend = () => {
    toast.warning('User account would be suspended', {
      description: 'This action would require admin approval',
    });
  };

  const handleForceLogout = () => {
    toast.success('User would be logged out from all devices', {
      description: 'This is a UI-only demonstration',
    });
  };

  const handleViewEvents = () => {
    toast.info('Opening user events view', {
      description: 'This feature will be available in the Events panel',
    });
  };

  const handleExtendSubscription = () => {
    toast.success('Subscription extension initiated', {
      description: 'This would add 30 days to the current subscription',
    });
  };

  const handleCancelSubscription = () => {
    toast.error('Subscription cancellation requested', {
      description: 'This would require confirmation and admin approval',
    });
  };

  const getStatusColor = (status: User['accountStatus']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Limited':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Suspended':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const getStatusIcon = (status: User['accountStatus']) => {
    switch (status) {
      case 'Active':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Limited':
        return <AlertCircle className="h-4 w-4" />;
      case 'Suspended':
        return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-4 pt-2">
            <Avatar className="h-16 w-16 ring-4 ring-primary/10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-500 text-white text-lg font-semibold">
                {user.avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-2xl">{user.fullName}</SheetTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    user.plan === 'Pro'
                      ? 'bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary border-primary/20'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {user.plan}
                </Badge>
                <Badge variant="outline" className={cn('font-medium', getStatusColor(user.accountStatus))}>
                  {getStatusIcon(user.accountStatus)}
                  <span className="ml-1">{user.accountStatus}</span>
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Basic Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm text-foreground font-medium">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Signup Date</p>
                  <p className="text-sm text-foreground font-medium">
                    {format(user.signupDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Last Active</p>
                  <p className="text-sm text-foreground font-medium">
                    {format(user.lastActive, 'MMM dd, yyyy \'at\' h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Account Status
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
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={handleSuspend}
              >
                <Ban className="h-4 w-4 mr-2" />
                Suspend Account
              </Button>
              <p className="text-xs text-muted-foreground">
                Suspended users cannot log in or access the platform until reactivated.
              </p>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Subscription Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Plan</span>
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium',
                    user.plan === 'Pro'
                      ? 'bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary border-primary/20'
                      : ''
                  )}
                >
                  {user.plan}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm text-foreground font-medium">
                  {format(user.subscription.startDate, 'MMM dd, yyyy')}
                </span>
              </div>
              {user.subscription.expiryDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Expiry Date</span>
                  <span className="text-sm text-foreground font-medium">
                    {format(user.subscription.expiryDate, 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Referral Discount</span>
                <Badge variant={user.subscription.referralDiscount ? 'default' : 'secondary'}>
                  {user.subscription.referralDiscount ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Admin Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleViewEvents}>
                <Eye className="h-4 w-4 mr-2" />
                View User Events
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleForceLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Force Logout User
              </Button>
              {user.plan === 'Pro' && (
                <Button
                  variant="default"
                  className="w-full justify-start"
                  onClick={handleExtendSubscription}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Extend Subscription
                </Button>
              )}
              {user.plan === 'Pro' && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                  onClick={handleCancelSubscription}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </Button>
              )}
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
