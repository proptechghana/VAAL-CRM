import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { StatCard } from '@/components/StatCard';
import { ChartArea } from '@/components/ChartArea';
import { RecentLeads } from '@/components/RecentLeads';
import { CalendarView } from '@/components/CalendarView';
import type { LeadData, StatData } from '@/types';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLiveLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        const data = await res.json();
        if (Array.isArray(data)) {
            setLeads(data);
        } else {
            console.error("API did not return an array", data);
            setLeads([]);
        }
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLiveLeads();
  }, []);

  // Support both "Name" and "Full Name" key changes from the API
  const validLeads = leads.filter(l => l.Name || l["Full Name"]);
  const totalLeads = validLeads.length;

  const recentLeads = [...validLeads].sort((a, b) => {
      const timeA = a["Log Date"] ? new Date(a["Log Date"]).getTime() : 0;
      const timeB = b["Log Date"] ? new Date(b["Log Date"]).getTime() : 0;
      return timeB - timeA;
  }).slice(0, 10);

  const budgetTotals: Record<string, number> = {};

  validLeads.forEach(lead => {
      if (lead.Budget && lead.Budget !== "Not Specified") {
          const budgetStr = String(lead.Budget);
          const match = budgetStr.match(/\d+(?:,\d+)*(?:\.\d+)?/);
          if (match) {
             const budgetVal = parseFloat(match[0].replace(/,/g, ''));
             let currSymbol = budgetStr.replace(/[\d,\.\s-]/g, '').trim();
             if (!currSymbol) currSymbol = 'GH₵';
             budgetTotals[currSymbol] = (budgetTotals[currSymbol] || 0) + budgetVal;
          }
      }
  });
  
  const formattedBudgets = Object.entries(budgetTotals)
    .filter(([_, val]) => val > 0)
    .map(([cur, val]) => `${cur}${val.toLocaleString()}`);
  
  const budgetFormatted = formattedBudgets.length > 0 ? formattedBudgets.join(' | ') : 'GH₵0';

  const stats: StatData[] = [
    { title: 'Total Budget', value: budgetFormatted, trend: 0, trendUp: true, type: 'budget' },
    { title: 'Total Leads', value: String(totalLeads), trend: 0, trendUp: true, type: 'leads' },
    { title: 'New Leads', value: String(recentLeads.length), trend: 0, trendUp: true, type: 'leads' },
  ];

  const monthsData = Array.from({ length: 12 }, (_, i) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return {
          name: monthNames[i],
          budget: 0,
          budgets: {} as Record<string, number>,
          leads: 0
      };
  });

  const now = new Date();
  const currentMonthData: {name: string, budget: number, budgets: Record<string, number>, leads: number}[] = [];
  
  validLeads.forEach(l => {
      let leadVal = 1;
      let budgetVal = 0;
      let currSymbol = 'GH₵';
      if (l.Budget && l.Budget !== "Not Specified") {
          const budgetStr = String(l.Budget);
          const match = budgetStr.match(/\d+(?:,\d+)*(?:\.\d+)?/);
          if (match) {
             budgetVal = parseFloat(match[0].replace(/,/g, ''));
             currSymbol = budgetStr.replace(/[\d,\.\s-]/g, '').trim();
             if (!currSymbol) currSymbol = 'GH₵';
          }
      }

      if (l["Log Date"]) {
          const d = new Date(l["Log Date"]);
          if (!isNaN(d.getTime())) {
              const monthIndex = d.getMonth();
              monthsData[monthIndex].leads += leadVal;
              monthsData[monthIndex].budget += budgetVal;
              if (budgetVal > 0) {
                 monthsData[monthIndex].budgets[currSymbol] = (monthsData[monthIndex].budgets[currSymbol] || 0) + budgetVal;
              }

              if (monthIndex === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                  const dayName = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
                  const existingDay = currentMonthData.find(m => m.name === dayName);
                  if (existingDay) {
                      existingDay.leads += leadVal;
                      existingDay.budget += budgetVal;
                      if (budgetVal > 0) {
                          existingDay.budgets[currSymbol] = (existingDay.budgets[currSymbol] || 0) + budgetVal;
                      }
                  } else {
                      currentMonthData.push({
                          name: dayName,
                          budget: budgetVal,
                          budgets: budgetVal > 0 ? { [currSymbol]: budgetVal } : {},
                          leads: leadVal
                      });
                  }
              }
          }
      }
  });

  // Sort chronologically based on the day number
  currentMonthData.sort((a, b) => {
      const dayA = parseInt(a.name.split(' ')[0]);
      const dayB = parseInt(b.name.split(' ')[0]);
      return dayA - dayB;
  });

  const searchedLeads = validLeads.filter(l => {
     if (!searchQuery) return true;
     const q = searchQuery.toLowerCase();
     const nameToSearch = l["Full Name"] || l.Name || '';
     return nameToSearch.toLowerCase().includes(q) || 
            (l.Email && l.Email.toLowerCase().includes(q)) || 
            (l.Interest && l.Interest.toLowerCase().includes(q));
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
        <div className="flex items-center gap-3 p-3 sm:p-4 lg:hidden bg-[#f8f6f0] border-b border-[#e8e4db]">
           <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg shrink-0" aria-label="Open menu">
             <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
           </button>
           <div className="flex items-center gap-2 min-w-0 flex-1">
             <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#D4A72C] shrink-0" />
             <span className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight truncate">AKKA KAPPA GHANA</span>
           </div>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto xl:px-4">
            {currentView !== 'dashboard' && (
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <TopBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {currentView === 'dashboard' && (
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight mb-4 sm:mb-6">Dashboard Overview</h1>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {stats.map((stat, i) => (
                              <StatCard key={i} data={stat} />
                            ))}
                          </div>
                        </div>

                        <div className="h-[280px] sm:h-[300px] lg:h-[400px]">
                          <ChartArea yearData={monthsData} monthData={currentMonthData} />
                        </div>

                        <RecentLeads leads={recentLeads} title="Recent Leads" />
                    </div>
                )}

                {currentView === 'leads' && (
                    <div>
                       <RecentLeads leads={searchedLeads} title="All Leads" />
                    </div>
                )}

                {currentView === 'calendar' && (
                    <div>
                        <CalendarView leads={searchedLeads} />
                    </div>
                )}
              </motion.div>
            </AnimatePresence>

          </div>
        </main>
      </div>
    </div>
  );
}
