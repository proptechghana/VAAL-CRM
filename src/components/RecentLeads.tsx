import type { LeadData } from '@/types';
import { User } from 'lucide-react';

export function RecentLeads({ leads, title = "Recent Leads" }: { leads: LeadData[], title?: string }) {
    const displayLeads = leads.filter(l => l.Name).map((l, i) => ({
        id: i,
        name: l.Name || 'Unknown',
        property: l.Interest || 'N/A',
        value: l.Budget && l.Budget !== "Not Specified" ? `${l.Budget}` : '-',
    }));

    return (
        <div className="bg-white p-4 sm:p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] mt-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 tracking-tight">{title}</h2>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                            <th className="p-4 rounded-tl-2xl">Lead Name</th>
                            <th className="p-4">Property</th>
                            <th className="p-4 rounded-tr-2xl">Value</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-800 divide-y divide-[#f0ece1]/50">
                        {displayLeads.length > 0 ? displayLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <span className="break-words">{lead.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 break-words">{lead.property}</td>
                                <td className="p-4 font-semibold">{lead.value}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">No leads found in data.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile card list */}
            <div className="sm:hidden space-y-3">
                {displayLeads.length > 0 ? displayLeads.map((lead) => (
                    <div key={lead.id} className="bg-[#f8f6f0] rounded-2xl p-4 flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                            <User className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{lead.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{lead.property}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 shrink-0 ml-2">{lead.value}</span>
                    </div>
                )) : (
                    <p className="text-center text-gray-500 text-sm py-8">No leads found in data.</p>
                )}
            </div>
        </div>
    );
}
