import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface ChartData {
  name: string;
  budget: number;
  leads: number;
}

export function ChartArea({ data }: { data: ChartData[] }) {
  // Empty state handler
  const baseData = data.length > 0 ? data : [
    { name: 'Jan', budget: 0, leads: 0 },
    { name: 'Feb', budget: 0, leads: 0 },
    { name: 'Mar', budget: 0, leads: 0 },
    { name: 'Apr', budget: 0, leads: 0 },
    { name: 'May', budget: 0, leads: 0 },
    { name: 'Jun', budget: 0, leads: 0 },
    { name: 'Jul', budget: 0, leads: 0 },
    { name: 'Aug', budget: 0, leads: 0 },
    { name: 'Sep', budget: 0, leads: 0 },
    { name: 'Oct', budget: 0, leads: 0 },
    { name: 'Nov', budget: 0, leads: 0 },
    { name: 'Dec', budget: 0, leads: 0 },
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
      const rawData = payload[0].payload;
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F3F3F3]">
          <p className="font-semibold text-gray-900 text-lg">${rawData.budget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
              type="monotone" 
              dataKey="budgetPercent" 
              stroke="#D4A72C" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#D4A72C' }}
            />
            <Line 
              type="monotone" 
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
