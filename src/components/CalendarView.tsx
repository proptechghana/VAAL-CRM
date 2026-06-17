import { Calendar as CalendarIcon, User } from 'lucide-react';
import type { LeadData } from '@/types';
import { formatBookingDateTime } from '@/lib/utils';
import { motion } from 'motion/react';

export function CalendarView({ leads }: { leads: LeadData[] }) {
    const getLeadName = (l: LeadData) => l["Full Name"] || l.Name || 'Unknown';
    const bookedLeads = leads.filter(l => (l.Name || l["Full Name"]) && l["Date Booked"]).map((l, i) => {
        return {
            id: i,
            name: getLeadName(l),
            property: l.Interest || 'N/A',
            scheduledFor: formatBookingDateTime(l["Date Booked"], l["Time Booked"])
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">Scheduled Calls</h2>
            </div>

            <div className="overflow-x-auto custom-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
                <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-[600px]">
                    <thead>
                        <tr className="bg-[#f8f6f0] text-gray-600 text-xs font-semibold tracking-wide border-b border-[#ebdcb3]/30">
                            <th className="p-3 sm:p-4 whitespace-nowrap rounded-tl-2xl">Lead Name</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap">Property Interest</th>
                            <th className="p-3 sm:p-4 whitespace-nowrap rounded-tr-2xl">Scheduled For</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-gray-800 divide-y divide-[#f0ece1]/50">
                        {bookedLeads.length > 0 ? bookedLeads.map((lead) => (
                            <motion.tr
                                key={lead.id}
                                whileHover={{ backgroundColor: "rgba(249,250,251,1)" }}
                                className="transition-colors group cursor-pointer"
                            >
                                <td className="p-3 sm:p-4 font-medium text-gray-900 group-hover:text-[#D4A72C] transition-colors whitespace-nowrap max-w-[150px] truncate">
                                    {lead.name}
                                </td>
                                <td className="p-3 sm:p-4 text-gray-600 group-hover:text-gray-900 transition-colors max-w-[200px] truncate">{lead.property}</td>
                                <td className="p-3 sm:p-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 sm:gap-2 group-hover:text-gray-900 transition-colors">
                                        <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-[#D4A72C] transition-colors shrink-0" />
                                        <span className="truncate max-w-[200px]">{lead.scheduledFor}</span>
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="p-6 sm:p-8 text-center text-gray-500">No scheduled calls found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
