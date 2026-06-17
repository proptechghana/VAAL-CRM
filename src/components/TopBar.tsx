import { Search } from 'lucide-react';

export function TopBar({ searchQuery, onSearchQueryChange }: { searchQuery: string, onSearchQueryChange: (q: string) => void }) {
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-8">
        <div className="flex-1 max-w-md w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                    type="text"
                    placeholder="Search leads, emails..."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="w-full bg-white pl-9 sm:pl-10 pr-4 py-2.5 rounded-full text-sm shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-[#D4A72C]/50 transition-shadow min-h-[44px]"
                />
            </div>
        </div>
    </div>
  );
}
