import { cn } from '@/lib/utils';
import { DollarSign, Users, Phone, Handshake, CheckCircle } from 'lucide-react';
import type { StatData } from '@/types';

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
        <div className="bg-white p-5 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3]">
            <div className="flex items-center gap-2 mb-4">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", colorMap[data.type])}>
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-gray-600 text-sm font-medium">{data.title}</span>
            </div>
            
            <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-gray-900">{data.value}</span>
            </div>
        </div>
    );
}
