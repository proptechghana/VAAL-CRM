import type { LeadData } from '@/types';
import { cn, formatBookingDateTime } from '@/lib/utils';
import { User } from 'lucide-react';
import { motion } from 'motion/react';

export function RecentLeads({ leads, title = "Recent Leads" }: { leads: LeadData[], title?: string }) {
    // Mapping from live leads
    const displayLeads = leads.filter(l => l.Name || l["Full Name"]).map((l, i) => {
        return {
            id: i,
            name: l["Full Name"] || l.Name || 'Unknown',
            property: l.Interest || 'N/A',
            value: l.Budget && l.Budget !== "Not Specified" ? `GH₵${Number(l.Budget).toLocaleString()}` : '-',
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] mt-4 sm:mt-6 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">{title}</h2>
            </div>

            <div className="overflow-x-auto custom-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px]">
                    <thead>
                        <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                            <th className="p-3 sm:p-4 whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl">Lead Name</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Property</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap first:rounded-tl-2xl last:rounded-tr-2xl">Value</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-800 divide-y divide-[#f0ece1]/50">
                        {displayLeads.length > 0 ? displayLeads.map((lead) => (
                            <motion.tr
                                key={lead.id}
                                whileHover={{ backgroundColor: "rgba(249,250,251,1)" }}
                                className="transition-colors group cursor-pointer"
                            >
                                <td className="p-3 sm:p-4 font-medium text-gray-900 group-hover:text-[#D4A72C] transition-colors whitespace-nowrap max-w-[150px] truncate">{lead.name}</td>
                                <td className="p-3 sm:p-4 text-gray-600 group-hover:text-gray-900 transition-colors max-w-[200px] truncate">{lead.property}</td>
                                <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">{lead.value}</td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-6 sm:p-8 text-center text-gray-500">No leads found in data.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
