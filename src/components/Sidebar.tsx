import { LayoutDashboard, Users, Calendar, Settings, CreditCard, Bell, Gift, Shield, FileDown, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Users', icon: Users, id: 'users' },
  { name: 'Events', icon: Calendar, id: 'events' },
  { name: 'Subscriptions', icon: CreditCard, id: 'subscriptions' },
  { name: 'Referrals', icon: Gift, id: 'referrals' },
  { name: 'Notifications', icon: Bell, id: 'notifications' },
  { name: 'Support & Safety', icon: Shield, id: 'support-safety' },
  { name: 'Exports', icon: FileDown, id: 'exports' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentPage, onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside className={cn(
        "hidden lg:flex fixed left-0 top-0 h-full border-r border-border bg-card flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className={cn(
          "border-b border-border transition-all duration-300",
          isCollapsed ? "p-4" : "p-6"
        )}>
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "gap-2"
          )}>
            <div className={cn(
              "rounded-lg bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center transition-all duration-300",
              isCollapsed ? "h-10 w-10" : "h-8 w-8"
            )}>
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              <h2 className="font-semibold text-lg text-foreground whitespace-nowrap">GigBook</h2>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className={cn(
          "px-4 py-3 border-b border-border",
          isCollapsed ? "flex justify-center" : ""
        )}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleCollapse}
                className={cn(
                  "flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200",
                  isCollapsed ? "h-10 w-10" : "h-9 w-full gap-2"
                )}
              >
                {isCollapsed ? (
                  <PanelLeft className="h-5 w-5" />
                ) : (
                  <>
                    <PanelLeftClose className="h-5 w-5" />
                    <span className="text-sm font-medium">Collapse</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </TooltipContent>
          </Tooltip>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            const buttonContent = (
              <button
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]',
                  isCollapsed ? 'justify-center h-12 w-12' : 'gap-3 px-3 py-2.5',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground hover:shadow-sm'
                )}
              >
                <Icon className={cn(
                  "transition-all duration-200",
                  isCollapsed ? "h-5 w-5" : "h-5 w-5"
                )} />
                <span className={cn(
                  "transition-all duration-300 whitespace-nowrap",
                  isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
                )}>
                  {item.name}
                </span>
              </button>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    {buttonContent}
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.name}>{buttonContent}</div>;
          })}
        </nav>

        <div className={cn(
          "border-t border-border transition-all duration-300",
          isCollapsed ? "p-4" : "p-4"
        )}>
          <div className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "gap-3 px-3 py-2"
          )}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex-shrink-0" />
            <div className={cn(
              "flex-1 min-w-0 transition-all duration-300 overflow-hidden",
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              <p className="text-sm font-medium text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">admin@gigbook.ai</p>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
