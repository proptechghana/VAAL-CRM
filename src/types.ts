export interface LeadData {
  "Log Date"?: string;
  Name?: string;
  "Full Name"?: string;
  Email: string;
  Budget: string;
  Interest: string;
  "Date Booked": string;
  "Time Booked"?: string;
}

export interface StatData {
  title: string;
  value: string;
  trend: number; // e.g. 12 for +12%
  trendUp: boolean;
  type: 'budget' | 'revenue' | 'leads' | 'contacted' | 'negotiation' | 'closed';
}
