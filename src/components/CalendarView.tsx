import { Calendar as CalendarIcon, User } from 'lucide-react';
import type { LeadData } from '@/types';
import { formatBookingDateTime } from '@/lib/utils';

export function CalendarView({ leads }: { leads: LeadData[] }) {
    const bookedLeads = leads
      .filter(l => l.Name && l["Date Booked"])
      .map((l, i) => ({
        id: i,
        name: l.Name,
        property: l.Interest || 'N/A',
        scheduledFor: formatBookingDateTime(l["Date Booked"], l["Time Booked"])
      }));

    return (
        <div className="bg-white p-4 sm:p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight">Scheduled Calls</h2>
            </div>

            {/* Desktop table view */}
            <div className="hidden sm:block overflow-x-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                            <th className="p-4 rounded-tl-2xl">Lead Name</th>
                            <th className="p-4">Property Interest</th>
                            <th className="p-4 rounded-tr-2xl">Scheduled For</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-800 divide-y divide-[#f0ece1]/50">
                        {bookedLeads.length > 0 ? bookedLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <span className="truncate">{lead.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 truncate">{lead.property}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="truncate">{lead.scheduledFor}</span>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">No scheduled calls found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile card view */}
            <div className="sm:hidden space-y-3">
                {bookedLeads.length > 0 ? bookedLeads.map((lead) => (
                    <div key={lead.id} className="bg-[#f8f6f0] rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                <User className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                        </div>
                        <p className="text-xs text-gray-500 mb-1.5 truncate">{lead.property}</p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium min-w-0">
                            <CalendarIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{lead.scheduledFor}</span>
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 text-sm py-8">No scheduled calls found.</p>
                )}
            </div>
        </div>
    );
}
