import { Calendar as CalendarIcon } from 'lucide-react';
import type { LeadData } from '@/types';
import { formatBookingDateTime } from '@/lib/utils';
import { motion } from 'motion/react';

export function CalendarView({ leads }: { leads: LeadData[] }) {
    const getLeadName = (l: LeadData) => l["Full Name"] || l.Name || 'Unknown';
    const bookedLeads = leads.filter(l => (l.Name || l["Full Name"]) && l["Date Booked"]).map((l, i) => ({
        id: i,
        name: getLeadName(l),
        property: l.Interest || 'N/A',
        scheduledFor: formatBookingDateTime(l["Date Booked"], l["Time Booked"]),
    }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">Scheduled Calls</h2>
                <span className="text-xs font-medium text-gray-400">{bookedLeads.length} scheduled</span>
            </div>

            {bookedLeads.length === 0 ? (
                <p className="py-10 text-center text-gray-400 text-sm">No scheduled calls found.</p>
            ) : (
                <div className="space-y-3">
                    {bookedLeads.map((lead) => (
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
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4A72C] whitespace-nowrap shrink-0 pt-0.5">
                                    <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
                                    <span>{lead.scheduledFor}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
