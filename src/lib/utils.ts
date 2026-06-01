import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBookingDateTime(dateStr: string, timeStr?: string) {
    if (!dateStr) return '';
    let parsedDate = dateStr;
    if (dateStr.includes('T') || dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            parsedDate = new Intl.DateTimeFormat('en-GB', { 
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            }).format(d);
        }
    } else {
        // Handle textual dates like "Thursday 4th June 2026"
        const cleaned = dateStr.replace(/\b(\d+)(?:st|nd|rd|th)\b/g, '$1');
        const d = new Date(cleaned);
        if (!isNaN(d.getTime())) {
            parsedDate = new Intl.DateTimeFormat('en-GB', { 
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            }).format(d);
        }
    }

    let parsedTime = '';
    if (timeStr) {
        let t = new Date(timeStr);
        if (!isNaN(t.getTime())) {
            // Check if it's the 1899 fake date from Google Sheets, effectively it gives a time.
            parsedTime = t.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
        } else {
            parsedTime = timeStr; // fallback
        }
    }

    if (parsedTime) {
        return `${parsedDate} at ${parsedTime}`;
    }
    return parsedDate;
}
