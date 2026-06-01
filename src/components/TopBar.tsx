import { Search } from 'lucide-react';

export function TopBar() {
  return (
    <div className="flex items-center justify-between mb-8">
        <div className="flex-1 max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full bg-white pl-10 pr-4 py-2.5 rounded-full text-sm border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                />
            </div>
        </div>
    </div>
  );
}
