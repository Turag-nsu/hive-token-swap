import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { cn } from '@/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  className?: string | undefined;
}

export function AppLayout({ 
  children, 
  showSidebar = false, 
  sidebarCollapsed = false,
  className 
}: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar collapsed={sidebarCollapsed} />
        )}
        
        <main className={cn(
          "flex-1 flex flex-col",
          showSidebar && !sidebarCollapsed && "ml-64",
          showSidebar && sidebarCollapsed && "ml-16",
          className
        )}>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

// Convenience wrapper for pages that don't need sidebar
export function SimpleLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AppLayout showSidebar={false} className={className}>
      {children}
    </AppLayout>
  );
}

// Convenience wrapper for dashboard-style pages
export function DashboardLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <AppLayout showSidebar={true} className={className}>
      {children}
    </AppLayout>
  );
}