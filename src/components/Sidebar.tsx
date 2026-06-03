import { 
    LayoutDashboard, 
    Users,
    Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
];

export function Sidebar({ className, currentView, onViewChange }: { className?: string, currentView: string, onViewChange: (view: string) => void }) {
    return (
        <div className={cn("w-64 bg-[#FAF8F3] h-full flex flex-col border-r border-[#F3F3F3] p-6", className)}>
            <div className="flex items-center gap-2 mb-12">
                <div className="flex -space-x-1">
                     <div className="w-4 h-4 rounded-full bg-[#D4A72C]" />
                     <div className="w-4 h-4 rounded-full bg-[#D4A72C] opacity-60" />
                     <div className="w-4 h-4 rounded-full bg-[#D4A72C] opacity-30" />
                </div>
                <span className="text-xl font-semibold text-gray-900 tracking-tight">VAAL REAL ESTATE AGENCY</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            currentView === item.id 
                                ? "bg-gradient-to-r from-[#D4A72C]/20 to-[#D4A72C]/10 text-gray-900 shadow-sm" 
                                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
