import type { LeadData } from '@/types';
import { motion } from 'motion/react';

export function RecentLeads({ leads, title = "Recent Leads" }: { leads: LeadData[], title?: string }) {
    const displayLeads = leads.filter(l => l.Name || l["Full Name"]).map((l, i) => ({
        id: i,
        name: l["Full Name"] || l.Name || 'Unknown',
        property: l.Interest || 'N/A',
        value: l.Budget && l.Budget !== "Not Specified" ? `GH₵${Number(l.Budget).toLocaleString()}` : '-',
    }));

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

            {displayLeads.length === 0 ? (
                <p className="p-6 text-center text-gray-500 text-sm">No leads found in data.</p>
            ) : (
                <>
                    {/* Mobile card list — visible below sm */}
                    <div className="sm:hidden space-y-3">
                        {displayLeads.map((lead) => (
                            <div
                                key={lead.id}
                                className="bg-[#faf8f3] rounded-xl p-4 border border-[#f0ece1]"
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="font-semibold text-gray-900 text-sm leading-snug">{lead.name}</p>
                                    <span className="text-sm font-bold text-[#D4A72C] whitespace-nowrap shrink-0">{lead.value}</span>
                                </div>
                                <p className="text-xs text-gray-500">{lead.property}</p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop table — visible from sm up */}
                    <div className="hidden sm:block overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                                    <th className="p-3 sm:p-4 whitespace-nowrap rounded-tl-2xl">Lead Name</th>
                                    <th className="p-3 sm:p-4 whitespace-nowrap">Property</th>
                                    <th className="p-3 sm:p-4 whitespace-nowrap rounded-tr-2xl">Value</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium text-gray-800 divide-y divide-[#f0ece1]/50">
                                {displayLeads.map((lead) => (
                                    <motion.tr
                                        key={lead.id}
                                        whileHover={{ backgroundColor: 'rgba(249,250,251,1)' }}
                                        className="transition-colors group cursor-pointer"
                                    >
                                        <td className="p-3 sm:p-4 font-medium text-gray-900 group-hover:text-[#D4A72C] transition-colors">{lead.name}</td>
                                        <td className="p-3 sm:p-4 text-gray-600 group-hover:text-gray-900 transition-colors">{lead.property}</td>
                                        <td className="p-3 sm:p-4 font-semibold whitespace-nowrap">{lead.value}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </motion.div>
    );
}
