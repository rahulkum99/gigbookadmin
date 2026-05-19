import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Mail,
  Phone,
  Calendar,
  Clock,
  CreditCard,
  Shield,
  Ban,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User } from '@/data/usersData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/features/users/usersApi';

interface UserDetailPanelProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

type ConfirmAction = 'suspend' | 'reactivate' | null;

export function UserDetailPanel({ user, isOpen, onClose }: UserDetailPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<User['accountStatus']>(
    user?.accountStatus || 'Active'
  );
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setSelectedStatus(user.accountStatus);
    }
  }, [user?.id, user?.accountStatus]);

  if (!user) return null;

  const isSuspended = user.accountStatus === 'Suspended';

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus as User['accountStatus']);
    toast.success(`User status would be changed to ${newStatus}`, {
      description: 'This is a UI-only demonstration',
    });
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    const action = confirmAction;

    try {
      if (action === 'suspend') {
        const result = await updateUser({
          id: user.id,
          body: { is_active: false },
        }).unwrap();
        setSelectedStatus('Suspended');
        toast.success(result.message || 'User suspended and logged out from all devices.');
      } else if (action === 'reactivate') {
        const result = await updateUser({
          id: user.id,
          body: { is_active: true },
        }).unwrap();
        setSelectedStatus('Active');
        toast.success(result.message || 'User account reactivated.');
      }
    } catch {
      const actionLabel = action === 'suspend' ? 'suspend user' : 'reactivate user';
      toast.error(`Failed to ${actionLabel}`, {
        description: 'Please try again or check your permissions.',
      });
    } finally {
      setConfirmAction(null);
    }
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

  const confirmCopy = {
    suspend: {
      title: 'Suspend account?',
      description: `${user.fullName} will be suspended and logged out from all devices. They cannot log in until the account is reactivated.`,
      action: 'Suspend account',
    },
    reactivate: {
      title: 'Reactivate account?',
      description: `${user.fullName} will regain full access and be able to log in again.`,
      action: 'Reactivate account',
    },
  };

  return (
    <>
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
                  <Badge
                    variant="outline"
                    className={cn('font-medium', getStatusColor(user.accountStatus))}
                  >
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
                      {format(user.lastActive, "MMM dd, yyyy 'at' h:mm a")}
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
                  <Select
                    value={selectedStatus}
                    onValueChange={handleStatusChange}
                    disabled={isSuspended || isUpdating}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                     
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                {isSuspended ? (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    disabled={isUpdating}
                    onClick={() => setConfirmAction('reactivate')}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                    )}
                    Reactivate Account
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    disabled={isUpdating}
                    onClick={() => setConfirmAction('suspend')}
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Suspend Account
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">
                  {isSuspended
                    ? 'Reactivate to allow this user to log in and access the platform again.'
                    : 'Suspending logs the user out from all devices. They cannot log in until reactivated.'}
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
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmAction !== null} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          {confirmAction ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{confirmCopy[confirmAction].title}</AlertDialogTitle>
                <AlertDialogDescription>{confirmCopy[confirmAction].description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={confirmAction === 'reactivate' ? undefined : 'bg-red-600 hover:bg-red-700'}
                  disabled={isUpdating}
                  onClick={(e) => {
                    e.preventDefault();
                    void handleConfirmAction();
                  }}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    confirmCopy[confirmAction].action
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : null}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
