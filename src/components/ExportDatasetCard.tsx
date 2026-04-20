import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Users, DollarSign, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExportDatasetCardProps {
  name: string;
  description: string;
  icon: 'Database' | 'Users' | 'DollarSign';
  format: string;
  lastGenerated: string;
  delay?: number;
}

const iconMap = {
  Database: Database,
  Users: Users,
  DollarSign: DollarSign
};

export function ExportDatasetCard({
  name,
  description,
  icon,
  format,
  lastGenerated,
  delay = 0
}: ExportDatasetCardProps) {
  const [isExporting, setIsExporting] = useState(false);
  const IconComponent = iconMap[icon];

  const handleExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      toast.success(`Exporting ${name}...`, {
        description: 'This is a UI demonstration. No file will be downloaded.'
      });
      setIsExporting(false);
    }, 800);
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
        <div className="text-xs text-muted-foreground">
          Last generated: {lastGenerated}
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
