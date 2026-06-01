import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { StatCard } from '@/components/StatCard';
import { ChartArea } from '@/components/ChartArea';
import { RecentLeads } from '@/components/RecentLeads';
import { CalendarView } from '@/components/CalendarView';
import type { LeadData, StatData } from '@/types';
import { Menu } from 'lucide-react';

export default function App() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    const fetchLiveLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveLeads();
  }, []);

  const validLeads = leads.filter(l => l.Name);
  const totalLeads = validLeads.length;

  const totalBudget = validLeads.reduce((sum, lead) => {
      if (lead.Budget && lead.Budget !== "Not Specified") {
          const match = lead.Budget.match(/\d+(?:,\d+)*(?:\.\d+)?/);
          if (match) {
             return sum + parseFloat(match[0].replace(/,/g, ''));
          }
      }
      return sum;
  }, 0);
  
  const budgetFormatted = totalBudget > 0 ? `$${totalBudget.toLocaleString()}` : '$0';

  const stats: StatData[] = [
    { title: 'Total Budget', value: budgetFormatted, trend: 0, trendUp: true, type: 'budget' },
    { title: 'New Leads', value: String(totalLeads), trend: 0, trendUp: true, type: 'leads' },
  ];

  const monthsData = Array.from({ length: 12 }, (_, i) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
          name: monthNames[i],
          budget: 0,
          leads: 0
      };
  });

  validLeads.forEach(l => {
      let monthIndex = new Date().getMonth();
      if (l["Date Booked"]) {
          const m = l["Date Booked"].toLowerCase();
          const foundIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].findIndex(mn => m.includes(mn));
          if (foundIndex !== -1) monthIndex = foundIndex;
      }

      monthsData[monthIndex].leads += 1;
      if (l.Budget && l.Budget !== "Not Specified") {
          const match = l.Budget.match(/\d+(?:,\d+)*(?:\.\d+)?/);
          if (match) {
             monthsData[monthIndex].budget += parseFloat(match[0].replace(/,/g, ''));
          }
      }
  });

  const recentLeads24h = validLeads.filter(l => {
      if (!l["Log Date"]) return false;
      const logDateMs = new Date(l["Log Date"]).getTime();
      const nowMs = new Date().getTime();
      return (nowMs - logDateMs) <= 24 * 60 * 60 * 1000;
  });

  return (
    <div className="flex h-screen bg-[#FAF8F3] font-sans selection:bg-[#d4a72c]/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar 
            className="w-64" 
            currentView={currentView}
            onViewChange={(v) => { setCurrentView(v); setSidebarOpen(false); }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="flex items-center gap-4 p-4 lg:hidden bg-[#f8f6f0] border-b border-[#e8e4db]">
           <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
             <Menu className="w-6 h-6" />
           </button>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 rounded-full bg-[#D4A72C]" />
             <span className="text-lg font-semibold text-gray-900 tracking-tight">VAAL CRM</span>
           </div>
        </div>
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto xl:px-4">
            <div className="hidden lg:block">
              <TopBar />
            </div>

            {currentView === 'dashboard' && (
                <>
                    <div className="mb-8">
                      <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6">Dashboard Overview</h1>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                        {stats.map((stat, i) => (
                          <StatCard key={i} data={stat} />
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 h-[400px]">
                      <ChartArea data={monthsData} />
                    </div>

                    <RecentLeads leads={recentLeads24h} title="Recent Leads (Last 24 Hours)" />
                </>
            )}

            {currentView === 'leads' && (
                <div>
                   <RecentLeads leads={validLeads} title="All Leads" />
                </div>
            )}

            {currentView === 'calendar' && (
                <div>
                    <CalendarView leads={validLeads} />
                </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}
