import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { toast } from 'sonner';
import { useLogoutUserMutation } from '@/features/auth/authApi';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    if (!refreshToken) {
      dispatch(logout());
      toast.success('Logged out');
      return;
    }

    try {
      await logoutUser({ refresh: refreshToken }).unwrap();
      toast.success('Logged out', {
        description: 'You have been signed out successfully.',
      });
    } catch {
      dispatch(logout());
      toast.error('Logout failed on server', {
        description: 'Session cleared locally. Please sign in again.',
      });
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all hover:scale-105">
                <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-500 text-white text-sm font-medium">
                  AD
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-semibold">{user?.fullname || 'Admin User'}</span>
                <span className="text-xs text-muted-foreground font-normal">{user?.email || 'admin@gigbook.ai'}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
                disabled={isLoggingOut}
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
