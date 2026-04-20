import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExportDatasetCard } from './ExportDatasetCard';
import { ExportActivityTable } from './ExportActivityTable';
import { ExportDetailsCard } from './ExportDetailsCard';
import { exportDatasets, recentExportActivity } from '@/data/exportsData';
import { Info } from 'lucide-react';

export function ExportsPage() {
  return (
    <div className="space-y-8 animate-in fade-in" style={{ animationDuration: '600ms' }}>
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            Data Export Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Exports contain operational data only. Sensitive user content, private messages, and payment details are never included.
            Use exported data in accordance with privacy policies and compliance requirements. All export activities are logged for audit purposes.
          </p>
        </CardContent>
      </Card>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Available Exports</h2>
          <p className="text-muted-foreground mt-1">
            Select a dataset to download operational data
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {exportDatasets.map((dataset, index) => (
            <ExportDatasetCard
              key={dataset.id}
              name={dataset.name}
              description={dataset.description}
              icon={dataset.icon}
              format={dataset.format}
              lastGenerated={dataset.lastGenerated}
              delay={index * 100}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Export Details & Warnings</h2>
          <p className="text-muted-foreground mt-1">
            Review what data is included and excluded in each export
          </p>
        </div>
        <div className="space-y-4">
          {exportDatasets.map((dataset) => (
            <ExportDetailsCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </section>

      <section
        className="animate-in fade-in"
        style={{ animationDelay: '400ms', animationDuration: '600ms' }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Export Activity</CardTitle>
            <CardDescription>
              View the history of data exports performed by administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExportActivityTable activities={recentExportActivity} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
