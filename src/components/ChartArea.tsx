import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export interface ChartData {
  name: string;
  budget: number;
  budgets?: Record<string, number>;
  leads: number;
}

interface NormalizedData {
  name: string;
  budgetPct: number;
  leadsPct: number;
  rawBudget: number;
  rawLeads: number;
  rawBudgets?: Record<string, number>;
}

function normalize(data: ChartData[]): NormalizedData[] {
  const maxBudget = Math.max(...data.map(d => d.budget), 1);
  const maxLeads = Math.max(...data.map(d => d.leads), 1);
  return data.map(d => ({
    name: d.name,
    budgetPct: Math.round((d.budget / maxBudget) * 100),
    leadsPct: Math.round((d.leads / maxLeads) * 100),
    rawBudget: d.budget,
    rawLeads: d.leads,
    rawBudgets: d.budgets,
  }));
}

export function ChartArea({ yearData, monthData }: { yearData: ChartData[], monthData: ChartData[] }) {
  const [timeframe, setTimeframe] = useState<'year' | 'month'>('month');

  const dataToUse = timeframe === 'year' ? yearData : monthData;
  const baseData = dataToUse.length > 0 ? dataToUse : [{ name: 'No Data', budget: 0, leads: 0 }];
  const displayData = normalize(baseData);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload as NormalizedData;

      const formatCurrency = (amount: number, symbol: string) =>
        `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-[#FCFBF8] px-4 py-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#F3F3F3]"
        >
          {d.rawBudgets && Object.keys(d.rawBudgets).length > 0 ? (
            Object.entries(d.rawBudgets).map(([symbol, amount]) => (
              <p key={symbol} className="font-bold text-gray-900 text-lg">
                {formatCurrency(amount, symbol)}
              </p>
            ))
          ) : (
            <p className="font-bold text-gray-900 text-lg">
              {formatCurrency(d.rawBudget, 'GH₵')}
            </p>
          )}
          <p className="text-xs font-medium text-gray-500 mt-0.5">Target: 15M</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] h-full flex flex-col group transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Header — always a single row */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <h2 className="text-base sm:text-xl font-medium text-gray-900 tracking-tight whitespace-nowrap">Performance Analytics</h2>
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4A72C] shrink-0"></span>
              <span className="whitespace-nowrap">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] shrink-0"></span>
              <span className="whitespace-nowrap">Leads</span>
            </div>
          </div>
        </div>
        <div className="relative shrink-0">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'year' | 'month')}
            className="appearance-none bg-[#f8f6f0] text-gray-700 text-xs sm:text-sm font-semibold py-1.5 pl-3 pr-7 rounded-lg outline-none cursor-pointer border-0 focus:ring-2 focus:ring-[#D4A72C]/30 transition-all"
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown className="w-3 h-3 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[160px] sm:min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 4, left: -8, bottom: 20 }}>
            <defs>
              <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A72C" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#D4A72C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F28C28" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F28C28" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              dy={12}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={40}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F28C28', strokeWidth: 1.5, strokeDasharray: '3 3' }} />
            <Area
              type="monotone"
              dataKey="budgetPct"
              stroke="#D4A72C"
              fillOpacity={1}
              fill="url(#colorBudget)"
              strokeWidth={2.5}
              activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#D4A72C' }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
            <Area
              type="monotone"
              dataKey="leadsPct"
              stroke="#F28C28"
              fillOpacity={1}
              fill="url(#colorLeads)"
              strokeWidth={2.5}
              activeDot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#F28C28' }}
              animationDuration={1200}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
