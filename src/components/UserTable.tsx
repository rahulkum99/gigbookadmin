import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User } from '@/data/usersData';
import { cn } from '@/lib/utils';

interface UserTableProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

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

const getPlanColor = (plan: User['plan']) => {
  if (plan === 'Pro') {
    return 'bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary border-primary/20';
  }
  return 'bg-secondary text-secondary-foreground border-border';
};

export function UserTable({ users, onUserSelect }: UserTableProps) {
  if (users.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No users found matching your filters.</p>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              onClick={() => onUserSelect(user)}
              className={cn(
                'cursor-pointer group',
                'hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent',
                'transition-all duration-200'
              )}
              style={{
                animation: `fade-in 0.3s ease-out ${index * 30}ms both`,
              }}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary font-medium">
                      {user.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground md:hidden">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div>
                  <p className="text-sm text-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn('font-medium', getPlanColor(user.plan))}>
                  {user.plan}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn('font-medium', getStatusColor(user.accountStatus))}>
                  {user.accountStatus === 'Active' && (
                    <span className="relative flex h-2 w-2 mr-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                  {user.accountStatus}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {formatDistanceToNow(user.lastActive, { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
