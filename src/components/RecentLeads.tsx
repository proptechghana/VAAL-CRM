import type { LeadData } from '@/types';
import { cn, formatBookingDateTime } from '@/lib/utils';
import { User } from 'lucide-react';

export function RecentLeads({ leads, title = "Recent Leads" }: { leads: LeadData[], title?: string }) {
    // Mapping from live leads
    const displayLeads = leads.filter(l => l.Name).map((l, i) => {
        return {
            id: i,
            name: l.Name || 'Unknown',
            property: l.Interest || 'N/A',
            value: l.Budget && l.Budget !== "Not Specified" ? `${l.Budget}` : '-',
        };
    });

    return (
        <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] mt-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 tracking-tight">{title}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                            <th className="p-4 first:rounded-tl-2xl last:rounded-tr-2xl">Lead Name</th>
                            <th className="p-4">Property</th>
                            <th className="p-4 first:rounded-tl-2xl last:rounded-tr-2xl">Value</th>
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
                                        <span>{lead.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600">{lead.property}</td>
                                <td className="p-4 font-semibold whitespace-nowrap">{lead.value}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-8 text-center text-gray-500">No leads found in data.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
