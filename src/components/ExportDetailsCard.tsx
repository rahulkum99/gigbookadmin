import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { ExportDataset } from '@/data/exportsData';

interface ExportDetailsCardProps {
  dataset: ExportDataset;
}

export function ExportDetailsCard({ dataset }: ExportDetailsCardProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={dataset.id} className="border rounded-lg">
        <AccordionTrigger className="px-6 hover:no-underline">
          <div className="text-left">
            <div className="font-semibold">{dataset.name}</div>
            <div className="text-sm text-muted-foreground mt-1">
              View data inclusions and exclusions
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-4 w-4" />
                Included Data
              </h4>
              <ul className="space-y-2">
                {dataset.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-red-700">
                <XCircle className="h-4 w-4" />
                Explicitly Excluded
              </h4>
              <ul className="space-y-2">
                {dataset.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-600" />
                Intended Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dataset.usageNote}
              </p>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
