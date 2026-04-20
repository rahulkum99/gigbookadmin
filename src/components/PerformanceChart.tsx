import { Card } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, CartesianGrid, Line, XAxis, YAxis, ComposedChart } from 'recharts';
import { ChartDataPoint } from '@/data/dashboardData';

interface PerformanceChartProps {
  data: ChartDataPoint[];
}

const chartConfig = {
  events: {
    label: 'Events Created',
    color: 'hsl(var(--chart-1))',
  },
  activeUsers: {
    label: 'Active Users',
    color: 'hsl(var(--chart-2))',
  },
};

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card className="p-6 col-span-full lg:col-span-2">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Platform Performance</h3>
        <p className="text-sm text-muted-foreground">Events created and user activity over the last 30 days</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis
            dataKey="date"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="events"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            fill="url(#eventsGradient)"
            animationDuration={1000}
            animationBegin={0}
          />
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
            animationDuration={1200}
            animationBegin={200}
          />
        </ComposedChart>
      </ChartContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />
          <span className="text-sm text-muted-foreground">Events Created</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
          <span className="text-sm text-muted-foreground">Active Users</span>
        </div>
      </div>
    </Card>
  );
}
