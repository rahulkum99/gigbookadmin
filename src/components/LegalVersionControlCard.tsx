import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { LegalDocument } from '@/data/settingsData';
import { format } from 'date-fns';

interface LegalVersionControlCardProps {
  documents: LegalDocument[];
}

export function LegalVersionControlCard({ documents }: LegalVersionControlCardProps) {
  const handleUpdateVersion = (docName: string) => {
    toast.success(`${docName} version update dialog would open here`);
  };

  const handleMarkActive = (docName: string) => {
    toast.success(`${docName} marked as active`);
  };

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Legal & Policy Version Control</CardTitle>
        <CardDescription className="text-gray-600">
          Manage version numbers and status of legal documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                      <FileText className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{doc.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Legal Document</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {doc.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current Version</span>
                    <span className="font-semibold text-gray-900">v{doc.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Last Updated
                    </span>
                    <span className="text-gray-700">
                      {format(new Date(doc.lastUpdated), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateVersion(doc.name)}
                    className="flex-1 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                  >
                    Update Version
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkActive(doc.name)}
                    className="flex-1 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                  >
                    Mark Active
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            Version updates are for tracking purposes only. Actual document editing happens in the legal content management system.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
