import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UsersPage } from './components/UsersPage';
import { EventsPage } from './components/EventsPage';
import { SubscriptionsPage } from './components/SubscriptionsPage';
import { ReferralsPage } from './components/ReferralsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SupportSafetyPage } from './components/SupportSafetyPage';
import { ExportsPage } from './components/ExportsPage';
import { SettingsPage } from './components/SettingsPage';
import { LoginPage } from './components/LoginPage';
import { useAppSelector } from './store/hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const getPageConfig = () => {
    switch (currentPage) {
      case 'users':
        return {
          title: 'Users',
          subtitle: 'Manage and monitor platform users',
          component: <UsersPage />,
        };
      case 'events':
        return {
          title: 'Events',
          subtitle: 'Platform-wide event visibility',
          component: <EventsPage />,
        };
      case 'subscriptions':
        return {
          title: 'Subscriptions',
          subtitle: 'Plans, pricing, and monetization overview',
          component: <SubscriptionsPage />,
        };
      case 'referrals':
        return {
          title: 'Referrals',
          subtitle: 'Referral program performance and control',
          component: <ReferralsPage />,
        };
      case 'notifications':
        return {
          title: 'Notifications',
          subtitle: 'Manage system notifications and alerts',
          component: <NotificationsPage />,
        };
      case 'support-safety':
        return {
          title: 'Support & Safety',
          subtitle: 'Account safety, restrictions, and internal oversight',
          component: <SupportSafetyPage />,
        };
      case 'exports':
        return {
          title: 'Exports',
          subtitle: 'Download operational data',
          component: <ExportsPage />,
        };
      case 'settings':
        return {
          title: 'Settings',
          subtitle: 'Platform governance and system rules',
          component: <SettingsPage />,
        };
      case 'dashboard':
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Platform overview',
          component: <Dashboard />,
        };
    }
  };

  const pageConfig = getPageConfig();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Header title={pageConfig.title} subtitle={pageConfig.subtitle} />
        <main className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {pageConfig.component}
        </main>
      </div>
    </div>
  );
}

export default App;
