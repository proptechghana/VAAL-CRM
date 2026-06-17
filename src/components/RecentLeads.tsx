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
                <span className="text-xs font-medium text-gray-400">{displayLeads.length} lead{displayLeads.length !== 1 ? 's' : ''}</span>
            </div>

            {displayLeads.length === 0 ? (
                <p className="py-10 text-center text-gray-400 text-sm">No leads found.</p>
            ) : (
                <div className="space-y-3">
                    {displayLeads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            whileHover={{ scale: 1.005 }}
                            className="bg-[#faf8f3] rounded-xl p-4 border border-[#f0ece1] cursor-pointer transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-gray-900 text-sm leading-snug">{lead.name}</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{lead.property}</p>
                                </div>
                                <span className="text-sm font-bold text-[#D4A72C] whitespace-nowrap shrink-0 pt-0.5">{lead.value}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
