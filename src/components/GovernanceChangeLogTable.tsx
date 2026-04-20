import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { GovernanceChangeLog } from '@/data/settingsData';
import { format } from 'date-fns';

interface GovernanceChangeLogTableProps {
  logs: GovernanceChangeLog[];
}

const categoryColors: Record<string, string> = {
  'App Version': 'bg-blue-50 text-blue-700 border-blue-200',
  'System': 'bg-amber-50 text-amber-700 border-amber-200',
  'Legal': 'bg-purple-50 text-purple-700 border-purple-200',
  'Platform Rules': 'bg-green-50 text-green-700 border-green-200',
};

export function GovernanceChangeLogTable({ logs }: GovernanceChangeLogTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-900">Setting Changed</TableHead>
              <TableHead className="font-semibold text-gray-900">Previous Value</TableHead>
              <TableHead className="font-semibold text-gray-900">New Value</TableHead>
              <TableHead className="font-semibold text-gray-900">Admin</TableHead>
              <TableHead className="font-semibold text-gray-900">Timestamp</TableHead>
              <TableHead className="font-semibold text-gray-900">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                <TableCell className="font-medium text-gray-900">{log.settingName}</TableCell>
                <TableCell>
                  <span className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-sm text-gray-700">
                    {log.previousValue}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded text-sm text-blue-900 font-medium">
                    {log.newValue}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7 border border-gray-200">
                      <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        {getInitials(log.adminName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">{log.adminName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={categoryColors[log.category] || 'bg-gray-50 text-gray-700 border-gray-200'}
                  >
                    {log.category}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
