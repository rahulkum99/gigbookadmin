import { useState } from 'react';
import { SafetyMetricCard } from './SafetyMetricCard';
import { AccountRestrictionControlCard } from './AccountRestrictionControlCard';
import { FlaggedAccountsTable } from './FlaggedAccountsTable';
import { SafetyCasePanel } from './SafetyCasePanel';
import { AdminAuditLogTable } from './AdminAuditLogTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { safetyMetrics, flaggedAccounts, safetyCaseNotes, adminAuditLogs, FlaggedAccount } from '@/data/safetyData';
import { usersData } from '@/data/usersData';

export function SupportSafetyPage() {
  const [selectedCase, setSelectedCase] = useState<FlaggedAccount | null>(null);
  const [isCasePanelOpen, setIsCasePanelOpen] = useState(false);

  const handleViewCase = (account: FlaggedAccount) => {
    setSelectedCase(account);
    setIsCasePanelOpen(true);
  };

  const handleCloseCasePanel = () => {
    setIsCasePanelOpen(false);
    setTimeout(() => setSelectedCase(null), 300);
  };

  return (
    <div className="space-y-8 pb-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{
          animation: 'fade-in 0.6s ease-out 100ms both',
        }}
      >
        {safetyMetrics.map((metric, index) => (
          <SafetyMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            changeLabel={metric.changeLabel}
            icon={metric.icon}
            delay={100 + index * 100}
          />
        ))}
      </div>

      <div
        style={{
          animation: 'fade-in 0.6s ease-out 200ms both',
        }}
      >
        <AccountRestrictionControlCard users={usersData} />
      </div>

      <div
        className="space-y-4"
        style={{
          animation: 'fade-in 0.6s ease-out 300ms both',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Flagged Accounts Overview</CardTitle>
            <CardDescription className="text-muted-foreground">
              Review and manage accounts that have been flagged for safety concerns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FlaggedAccountsTable accounts={flaggedAccounts} onViewCase={handleViewCase} />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div
        className="space-y-4"
        style={{
          animation: 'fade-in 0.6s ease-out 400ms both',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Admin Audit Log</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete history of all admin actions and safety-related decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminAuditLogTable logs={adminAuditLogs} />
          </CardContent>
        </Card>
      </div>

      <SafetyCasePanel
        account={selectedCase}
        caseNotes={safetyCaseNotes}
        isOpen={isCasePanelOpen}
        onClose={handleCloseCasePanel}
      />
    </div>
  );
}
