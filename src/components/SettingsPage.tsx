import { AppVersionControlCard } from './AppVersionControlCard';
import { MaintenanceModeCard } from './MaintenanceModeCard';
import { LegalVersionControlCard } from './LegalVersionControlCard';
import { PlatformRulesSummaryCard } from './PlatformRulesSummaryCard';
import { GovernanceChangeLogTable } from './GovernanceChangeLogTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import {
  appVersionConfig,
  maintenanceConfig,
  legalDocuments,
  platformRules,
  governanceChangeLogs,
} from '@/data/settingsData';

export function SettingsPage() {
  return (
    <div className="space-y-8 pb-8">
      <div
        className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
        style={{
          animation: 'fade-in 0.6s ease-out 50ms both',
        }}
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900">Governance Controls</h3>
            <p className="text-sm text-blue-800 mt-1">
              Settings configured here affect all platform users and are tracked for compliance. All changes are logged and require admin authorization.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          animation: 'fade-in 0.6s ease-out 100ms both',
        }}
      >
        <AppVersionControlCard initialConfig={appVersionConfig} />
      </div>

      <Separator className="my-8" />

      <div
        style={{
          animation: 'fade-in 0.6s ease-out 200ms both',
        }}
      >
        <MaintenanceModeCard initialConfig={maintenanceConfig} />
      </div>

      <Separator className="my-8" />

      <div
        style={{
          animation: 'fade-in 0.6s ease-out 300ms both',
        }}
      >
        <LegalVersionControlCard documents={legalDocuments} />
      </div>

      <Separator className="my-8" />

      <div
        style={{
          animation: 'fade-in 0.6s ease-out 400ms both',
        }}
      >
        <PlatformRulesSummaryCard rules={platformRules} />
      </div>

      <Separator className="my-8" />

      <div
        className="space-y-4"
        style={{
          animation: 'fade-in 0.6s ease-out 500ms both',
        }}
      >
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Governance Change Log</CardTitle>
            <CardDescription className="text-gray-600">
              Complete audit trail of all governance and settings changes made by administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GovernanceChangeLogTable logs={governanceChangeLogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
