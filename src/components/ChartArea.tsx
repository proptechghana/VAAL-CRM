import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

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

  const maxBudget = Math.max(...baseData.map(d => d.budget), 1);
  const maxLeads = Math.max(...baseData.map(d => d.leads), 1);

  const displayData = baseData.map(d => ({
    ...d,
    budgetPercent: (d.budget / maxBudget) * 100,
    leadsPercent: (d.leads / maxLeads) * 100,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const rawData = payload[0].payload as ChartData;
      
      const formatCurrency = (amount: number, symbol: string) => {
          return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      };

      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3]">
          {rawData.budgets && Object.keys(rawData.budgets).length > 0 ? (
             Object.entries(rawData.budgets).map(([symbol, amount]) => (
                <p key={symbol} className="font-semibold text-gray-900 text-lg">
                   {formatCurrency(amount, symbol)}
                </p>
             ))
          ) : (
             <p className="font-semibold text-gray-900 text-lg">
                {formatCurrency(rawData.budget, '$')}
             </p>
          )}
          <p className="text-[13px] font-medium text-gray-500 mt-0.5">Leads: {rawData.leads}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3] h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <h2 className="text-lg font-medium text-gray-900 tracking-tight">Performance Analytics</h2>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A72C]"></span>
                Budget
             </div>
             <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F28C28]"></span>
                Leads
             </div>
          </div>
        </div>
        <div className="relative">
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value as 'year' | 'month')}
            className="appearance-none bg-[#FAF8F3] text-gray-700 text-sm font-medium py-2 pl-4 pr-10 rounded-lg outline-none cursor-pointer border border-[#F3F3F3]"
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F0F0F0', strokeWidth: 1 }} />
            <Line 
              type="linear" 
              dataKey="budgetPercent" 
              stroke="#D4A72C" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#D4A72C' }}
            />
            <Line 
              type="linear" 
              dataKey="leadsPercent" 
              stroke="#F28C28" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#F28C28' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
