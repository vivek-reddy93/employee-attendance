// Format date to display format (e.g., "Jan 15, 2024")
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format date and time together
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US');
};

// Format time to display format (e.g., "09:30 AM")
export const getFormattedTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

// Get day name (e.g., "Monday")
export const getDayOfWeek = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(date).getDay()];
};

// Get short day name (e.g., "Mon")
export const getShortDayName = (date) => {
  if (!date) return '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(date).getDay()];
};

export const getStartOfDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getEndOfDay = () => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
};

export const getWeekStart = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

// Calculate total hours between two timestamps
export const calculateHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const hours = (end - start) / (1000 * 60 * 60);
  return Math.max(0, hours).toFixed(2);
};

// Format hours to display (e.g., "8.5 hrs")
export const formatHours = (hours) => {
  if (!hours) return '0 hrs';
  return `${parseFloat(hours).toFixed(1)} hrs`;
};

// Get current date in YYYY-MM-DD format
export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Check if a date is today
export const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

// Check if two dates are the same day
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
};

// Get start of month
export const getMonthStart = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

// Get end of month
export const getMonthEnd = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

// Get days in month
export const getDaysInMonth = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
};

// Get month name
export const getMonthName = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

// Get date range for last N days
export const getLastNDays = (n) => {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Get calendar grid for a month (including padding days)
export const getCalendarGrid = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPadding = firstDay.getDay(); // 0 = Sunday
  const endPadding = 6 - lastDay.getDay();

  const grid = [];

  // Add padding days from previous month
  for (let i = startPadding - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    grid.push({ date, isCurrentMonth: false });
  }

  // Add current month days
  const daysInMonth = lastDay.getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    grid.push({ date, isCurrentMonth: true });
  }

  // Add padding days from next month
  for (let i = 1; i <= endPadding; i++) {
    const date = new Date(year, month + 1, i);
    grid.push({ date, isCurrentMonth: false });
  }

  return grid;
};
