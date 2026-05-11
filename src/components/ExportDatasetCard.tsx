import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Database, Users, DollarSign, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  useDownloadExportCsvMutation,
  type ExportDatasetId,
} from '@/features/exports/exportsApi';

interface ExportDatasetCardProps {
  id: ExportDatasetId;
  name: string;
  description: string;
  icon: 'Database' | 'Users' | 'DollarSign';
  format: string;
  lastGenerated: string | null;
  isLastGeneratedLoading?: boolean;
  delay?: number;
}

const formatLastGenerated = (iso: string | null): string => {
  if (!iso) return 'Never';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const iconMap = {
  Database: Database,
  Users: Users,
  DollarSign: DollarSign
};

// Triggers a browser download from an in-memory Blob.
const saveBlobToDisk = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Defer revoke so the browser has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

export function ExportDatasetCard({
  id,
  name,
  description,
  icon,
  format,
  lastGenerated,
  isLastGeneratedLoading = false,
  delay = 0
}: ExportDatasetCardProps) {
  const [downloadExportCsv, { isLoading: isExporting }] = useDownloadExportCsvMutation();
  const IconComponent = iconMap[icon];

  const handleExport = async () => {
    try {
      const result = await downloadExportCsv(id).unwrap();
      saveBlobToDisk(result.blob, result.filename);
      toast.success(`${name} exported`, {
        description: `Downloaded ${result.filename}`,
      });
    } catch (error) {
      const message =
        (error as { data?: { detail?: string } })?.data?.detail ??
        `Failed to export ${name}. Please try again.`;
      toast.error('Export failed', { description: message });
    }
  };

  return (
    <Card
      className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in"
      style={{ animationDelay: `${delay}ms`, animationDuration: '600ms' }}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="p-3 rounded-lg bg-blue-50">
            <IconComponent className="h-6 w-6 text-blue-600" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {format}
          </Badge>
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span>Last generated:</span>
          {isLastGeneratedLoading ? (
            <Skeleton className="h-3 w-32" />
          ) : (
            <span>{formatLastGenerated(lastGenerated)}</span>
          )}
        </div>
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full transition-all duration-300"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
