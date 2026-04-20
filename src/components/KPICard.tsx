import { TrendingUp, TrendingDown, Users, Activity, Calendar, CalendarPlus, CreditCard, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  name: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: string;
  delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  activity: Activity,
  calendar: Calendar,
  'calendar-plus': CalendarPlus,
  'credit-card': CreditCard,
};

export function KPICard({ name, value, change, changeLabel, icon, delay = 0 }: KPICardProps) {
  const Icon = iconMap[icon] || Users;
  const isPositive = change >= 0;

  return (
    <Card
      className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full',
            isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{name}</p>
        <p className="text-3xl font-bold text-foreground tracking-tight">
          {value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">{changeLabel}</p>
      </div>
    </Card>
  );
}
