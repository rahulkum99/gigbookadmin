import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FlaggedAccount, FlagSeverity, AccountStatus } from '@/data/safetyData';
import { cn } from '@/lib/utils';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlaggedAccountsTableProps {
  accounts: FlaggedAccount[];
  onViewCase: (account: FlaggedAccount) => void;
}

const getSeverityColor = (severity: FlagSeverity) => {
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

export function FlaggedAccountsTable({ accounts, onViewCase }: FlaggedAccountsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.flagReason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'All' || account.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || account.currentStatus === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or flag reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severity</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Limited">Limited</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {filteredAccounts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No flagged accounts found matching your filters.</p>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[240px]">User</TableHead>
                <TableHead className="hidden xl:table-cell">Email</TableHead>
                <TableHead>Flag Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="hidden lg:table-cell">Flagged</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account, index) => (
                <TableRow
                  key={account.id}
                  className={cn(
                    'group',
                    'hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-transparent',
                    'transition-all duration-200'
                  )}
                  style={{
                    animation: `fade-in 0.3s ease-out ${index * 30}ms both`,
                  }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 ring-2 ring-transparent group-hover:ring-amber-200 transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 font-medium">
                          {account.userAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {account.userName}
                        </p>
                        {account.flagCount > 1 && (
                          <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                            {account.flagCount} flags
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <div>
                      <p className="text-sm text-foreground">{account.userEmail}</p>
                      <p className="text-xs text-muted-foreground">{account.flagCategory}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground max-w-[280px] truncate">
                      {account.flagReason}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to {account.assignedAdmin.replace('Admin ', '')}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('font-medium', getSeverityColor(account.severity))}>
                      {account.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {formatDistanceToNow(account.flagDate, { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('font-medium', getStatusColor(account.currentStatus))}>
                      {account.currentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewCase(account)}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
