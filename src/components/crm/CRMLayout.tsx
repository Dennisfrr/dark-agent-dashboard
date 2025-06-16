import { useState } from "react";
import { CRMSidebar } from "./CRMSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { ClientsList } from "./ClientsList";
import { SupportChat } from "./SupportChat";
import { RecentActivities } from "./RecentActivities";

interface CRMLayoutProps {
  children?: React.ReactNode;
  showDashboard?: boolean;
}

export function CRMLayout({ children, showDashboard = false }: CRMLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <CRMSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleChat={() => setIsChatOpen(!isChatOpen)} />
        
        <main className="flex-1 overflow-y-auto">
          {showDashboard ? (
            <div className="p-6 space-y-6">
              <MetricsCards />
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <ClientsList />
                </div>
                <div>
                  <RecentActivities />
                </div>
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
      
      <SupportChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}