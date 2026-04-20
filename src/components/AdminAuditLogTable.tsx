import { useState } from 'react';
import { format } from 'date-fns';
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
import { AdminAuditLog, ActionType } from '@/data/safetyData';
import { cn } from '@/lib/utils';
import { Search, Shield, Lock, Unlock, Ban, FileText, CheckCircle } from 'lucide-react';

interface AdminAuditLogTableProps {
  logs: AdminAuditLog[];
}

const getActionIcon = (actionType: ActionType) => {
  switch (actionType) {
    case 'Status Change':
      return <Shield className="h-4 w-4" />;
    case 'Restriction Applied':
      return <Lock className="h-4 w-4" />;
    case 'Access Restored':
      return <Unlock className="h-4 w-4" />;
    case 'Account Suspended':
      return <Ban className="h-4 w-4" />;
    case 'Case Opened':
      return <FileText className="h-4 w-4" />;
    case 'Case Closed':
      return <CheckCircle className="h-4 w-4" />;
    case 'Note Added':
      return <FileText className="h-4 w-4" />;
    default:
      return <Shield className="h-4 w-4" />;
  }
};

const getActionColor = (actionType: ActionType) => {
  switch (actionType) {
    case 'Status Change':
      return 'text-blue-600';
    case 'Restriction Applied':
      return 'text-amber-600';
    case 'Access Restored':
      return 'text-emerald-600';
    case 'Account Suspended':
      return 'text-red-600';
    case 'Case Opened':
      return 'text-purple-600';
    case 'Case Closed':
      return 'text-emerald-600';
    case 'Note Added':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export function AdminAuditLogTable({ logs }: AdminAuditLogTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('All');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionDetails.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = actionFilter === 'All' || log.actionType === actionFilter;

    return matchesSearch && matchesAction;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by admin, user, or action details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Actions</SelectItem>
              <SelectItem value="Status Change">Status Change</SelectItem>
              <SelectItem value="Restriction Applied">Restriction Applied</SelectItem>
              <SelectItem value="Access Restored">Access Restored</SelectItem>
              <SelectItem value="Account Suspended">Account Suspended</SelectItem>
              <SelectItem value="Case Opened">Case Opened</SelectItem>
              <SelectItem value="Case Closed">Case Closed</SelectItem>
              <SelectItem value="Note Added">Note Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {sortedLogs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No audit logs found matching your filters.</p>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead className="w-[160px]">Admin</TableHead>
                <TableHead className="w-[180px]">Action Type</TableHead>
                <TableHead className="hidden lg:table-cell">Target User</TableHead>
                <TableHead>Action Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLogs.map((log, index) => (
                <TableRow
                  key={log.id}
                  className={cn(
                    'hover:bg-muted/30',
                    'transition-colors duration-150'
                  )}
                  style={{
                    animation: `fade-in 0.3s ease-out ${index * 30}ms both`,
                  }}
                >
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {format(log.timestamp, 'MMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(log.timestamp, 'h:mm a')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {log.adminName.replace('Admin ', '')}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                        {log.adminEmail.split('@')[0]}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={cn('flex items-center gap-2', getActionColor(log.actionType))}>
                      {getActionIcon(log.actionType)}
                      <span className="text-sm font-medium">{log.actionType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <p className="text-sm text-foreground font-medium">
                      {log.targetUserName}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">
                        {log.actionDetails}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Outcome: {log.outcome}
                      </p>
                    </div>
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
