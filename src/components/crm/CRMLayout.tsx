import { useState } from "react";
import { CRMSidebar } from "./CRMSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsCards } from "./MetricsCards";
import { SalesChart } from "./SalesChart";
import { ClientsList } from "./ClientsList";
import { SupportChat } from "./SupportChat";
import { RecentActivities } from "./RecentActivities";
import { SalesPipeline } from "./SalesPipeline";

export function CRMLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <CRMSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onToggleChat={() => setIsChatOpen(!isChatOpen)} />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <MetricsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesChart />
            <SalesPipeline />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ClientsList />
            </div>
            <div>
              <RecentActivities />
            </div>
          </div>
        </main>
      </div>
      
      <SupportChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}