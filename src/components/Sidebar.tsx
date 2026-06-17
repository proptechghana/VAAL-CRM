import {
    LayoutDashboard,
    Users,
    Calendar,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
];

export function Sidebar({ className, currentView, onViewChange }: { className?: string, currentView: string, onViewChange: (view: string) => void }) {
    return (
        <div className={cn("w-64 max-w-[85vw] bg-[#FAF8F3] h-full flex flex-col border-r border-[#F3F3F3] p-4 sm:p-6", className)}>
            <div className="flex items-center justify-between mb-8 sm:mb-12">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className="flex -space-x-1 shrink-0">
                         <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4A72C]" />
                         <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4A72C] opacity-60" />
                         <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#D4A72C] opacity-30" />
                    </div>
                    <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 tracking-tight truncate">AKKA KAPPA GHANA</span>
                </div>
                <button
                    onClick={() => onViewChange(currentView)}
                    className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 shrink-0"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 space-y-1 sm:space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl transition-all duration-200 min-h-[44px]",
                            currentView === item.id
                                ? "bg-gradient-to-r from-[#D4A72C]/20 to-[#D4A72C]/10 text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                        )}
                    >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className="font-medium text-sm truncate">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
