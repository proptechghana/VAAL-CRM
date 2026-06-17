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

export function ChartArea({ yearData, monthData }: { yearData: ChartData[], monthData: ChartData[] }) {
  const [timeframe, setTimeframe] = useState<'year' | 'month'>('month');

  const dataToUse = timeframe === 'year' ? yearData : monthData;

  const baseData = dataToUse.length > 0 ? dataToUse : [
    { name: 'No Data', budget: 0, leads: 0 },
  ];

  const displayData = baseData;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const rawData = payload[0].payload as ChartData;
      
      const formatCurrency = (amount: number, symbol: string) => {
          return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-[#FCFBF8] px-5 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#F3F3F3]"
        >
          {rawData.budgets && Object.keys(rawData.budgets).length > 0 ? (
             Object.entries(rawData.budgets).map(([symbol, amount]) => (
                <div key={symbol}>
                  <p className="font-bold text-gray-900 text-xl">
                     {formatCurrency(amount, symbol)}
                  </p>
                </div>
             ))
          ) : (
             <div>
                <p className="font-bold text-gray-900 text-xl">
                   {formatCurrency(rawData.budget, 'GH₵')}
                </p>
             </div>
          )}
          <p className="text-[13px] font-medium text-gray-500 mt-1">Target: 15M</p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] h-full flex flex-col group transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 sm:gap-6 w-full sm:w-auto">
          <h2 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">Performance Analytics</h2>
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-gray-500">
             <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#D4A72C] shrink-0"></span>
                <span>Revenue</span>
             </div>
             <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#F28C28] shrink-0"></span>
                <span>Leads</span>
             </div>
          </div>
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'year' | 'month')}
            className="w-full sm:w-auto appearance-none bg-white text-gray-700 text-sm font-medium py-2.5 pl-4 pr-10 rounded-xl outline-none cursor-pointer border border-[#F3F3F3] hover:border-gray-300 transition-colors shadow-sm min-h-[44px]"
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[180px] sm:min-h-[200px] mt-2 sm:mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A72C" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#D4A72C" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F28C28" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#F28C28" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 13, fill: '#6b7280' }} 
              dy={15} 
            />
            <YAxis 
              yAxisId="budget"
              axisLine={false} 
              tickLine={false} 
              width={50}
              tick={{ fontSize: 13, fill: '#6b7280' }} 
              tickFormatter={(value) => {
                 if (value === 0) return '0';
                 if (value >= 1000000) return `${value / 1000000}M`;
                 return `${value / 1000}k`;
              }}
              dx={0}
            />
            <YAxis 
              yAxisId="leads"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              width={0}
              hide={true}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F28C28', strokeWidth: 1.5, strokeDasharray: '3 3' }} />
            <Area 
              yAxisId="budget"
              type="monotone" 
              dataKey="budget" 
              stroke="#D4A72C" 
              fillOpacity={1} 
              fill="url(#colorBudget)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: '#D4A72C' }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
            <Area 
              yAxisId="leads"
              type="monotone" 
              dataKey="leads" 
              stroke="#F28C28" 
              fillOpacity={1} 
              fill="url(#colorLeads)"
              strokeWidth={3}
              activeDot={{ r: 6, strokeWidth: 2, fill: '#fff', stroke: '#F28C28' }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
