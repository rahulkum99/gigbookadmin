import { ReferralMetricCard } from './ReferralMetricCard';
import { ProgramControlsCard } from './ProgramControlsCard';
import { PerformanceInsightCard } from './PerformanceInsightCard';
import { ReferralActivityTable } from './ReferralActivityTable';
import { AbuseMonitoringCard } from './AbuseMonitoringCard';
import {
  referralMetrics,
  programConfig,
  performanceInsights,
  referralActivities,
  abuseMonitoring,
} from '@/data/referralsData';

export function ReferralsPage() {
  return (
    <div className="space-y-8">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
      >
          {referralMetrics.map((metric, index) => (
            <ReferralMetricCard
              key={metric.label}
              {...metric}
              delay={index * 100}
            />
          ))}
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
        >
          <div className="lg:col-span-2">
            <ProgramControlsCard config={programConfig} />
          </div>
          <div className="lg:col-span-1">
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-gray-200 p-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {programConfig.isEnabled ? 'Active' : 'Inactive'}
                </div>
                <p className="text-sm text-gray-600 font-medium">Program Status</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceInsights.map((insight, index) => (
              <PerformanceInsightCard
                key={insight.label}
                insight={insight}
                delay={index * 100}
              />
            ))}
          </div>
        </div>

        <div style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
          <ReferralActivityTable activities={referralActivities} />
        </div>

      <div style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
        <AbuseMonitoringCard data={abuseMonitoring} />
      </div>
    </div>
  );
}
