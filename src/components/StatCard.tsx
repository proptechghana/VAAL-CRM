import { cn } from '@/lib/utils';
import { DollarSign, Users, Phone, Handshake, CircleCheck as CheckCircle } from 'lucide-react';
import type { StatData } from '@/types';
import { motion } from 'motion/react';

const iconMap = {
    budget: DollarSign,
    revenue: DollarSign,
    leads: Users,
    contacted: Phone,
    negotiation: Handshake,
    closed: CheckCircle,
};

const colorMap = {
    budget: "bg-[#fdf9ef] text-[#D4A72C]",
    revenue: "bg-[#fdf9ef] text-[#D4A72C]",
    leads: "bg-[#fff8ea] text-[#f59e0b]",
    contacted: "bg-[#eaf5ff] text-[#3b82f6]",
    negotiation: "bg-[#fef2f2] text-[#ef4444]",
    closed: "bg-[#f0fdf4] text-[#22c55e]",
};

export function StatCard({ data }: { data: StatData }) {
    const Icon = iconMap[data.type];

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className={cn("w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0", colorMap[data.type])}>
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="text-gray-600 text-xs sm:text-sm font-medium truncate">{data.title}</span>
            </div>

            <div className="flex items-end justify-between min-h-[2rem]">
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 truncate pr-2 leading-tight">{data.value}</span>
            </div>
        </motion.div>
    );
}
