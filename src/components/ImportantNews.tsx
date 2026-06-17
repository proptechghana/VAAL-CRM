import { MoreVertical, Clock, User } from 'lucide-react';
import type { LeadData } from '@/types';

export function ImportantNews({ leads }: { leads: LeadData[] }) {
    // Filter leads with some date, or fallback to mock data if empty
    const scheduledLeads = leads.filter(l => (l.Name || l["Full Name"]) && l["Date Booked"]).slice(0, 10);
    
    // mapping
    const displayData = scheduledLeads.map((l, i) => {
        const leadName = l["Full Name"] || l.Name || 'Unknown';
        let timeString = '';
        if (l["Time Booked"]) {
             try {
                 timeString = new Date(l["Time Booked"]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
             } catch(e) {
                 timeString = '';
             }
        }

        return {
            id: leadName || String(i),
            title: `Follow up with ${leadName}`,
            subtitle: `Interested in ${l.Interest || 'property'}`,
            time: timeString,
            type: 'follow-up'
        };
    });

    return (
        <div className="bg-gradient-to-br from-white to-[#fdfbf6] p-6 rounded-3xl shadow-sm border border-[#f0ece1] flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Important News</h2>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {displayData.length > 0 ? displayData.map((item, i) => (
                    <div key={item.id + i} className="flex gap-4 p-3 rounded-2xl hover:bg-[#f8f6f0] transition-colors cursor-pointer group">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{item.subtitle}</p>
                        </div>
                        {item.time && (
                            <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 font-medium whitespace-nowrap mt-0.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{item.time}</span>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="text-center text-gray-500 text-sm mt-8">
                        No scheduled follow-ups.
                    </div>
                )}
            </div>
        </div>
    );
}
