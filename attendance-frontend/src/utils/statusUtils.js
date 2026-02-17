/**
 * Status utility functions for attendance status handling
 */

// Attendance status constants
export const STATUS = {
    PRESENT: 'present',
    ABSENT: 'absent',
    LATE: 'late',
    HALF_DAY: 'half-day'
};

// Status colors for UI
export const STATUS_COLORS = {
    [STATUS.PRESENT]: '#4caf50',    // Green
    [STATUS.ABSENT]: '#f44336',     // Red
    [STATUS.LATE]: '#ff9800',       // Orange/Yellow
    [STATUS.HALF_DAY]: '#ff9800'    // Orange
};

// Status background colors (lighter versions)
export const STATUS_BG_COLORS = {
    [STATUS.PRESENT]: '#e8f5e9',
    [STATUS.ABSENT]: '#ffebee',
    [STATUS.LATE]: '#fff3e0',
    [STATUS.HALF_DAY]: '#fff3e0'
};

// Status labels for display
export const STATUS_LABELS = {
    [STATUS.PRESENT]: 'Present',
    [STATUS.ABSENT]: 'Absent',
    [STATUS.LATE]: 'Late',
    [STATUS.HALF_DAY]: 'Half Day'
};

/**
 * Get status color
 * @param {string} status - Attendance status
 * @returns {string} Color code
 */
export const getStatusColor = (status) => {
    return STATUS_COLORS[status] || '#9e9e9e';
};

/**
 * Get status background color
 * @param {string} status - Attendance status
 * @returns {string} Color code
 */
export const getStatusBgColor = (status) => {
    return STATUS_BG_COLORS[status] || '#f5f5f5';
};

/**
 * Get status label
 * @param {string} status - Attendance status
 * @returns {string} Display label
 */
export const getStatusLabel = (status) => {
    return STATUS_LABELS[status] || status;
};

/**
 * Determine status based on check-in time
 * Standard work time: 9:00 AM
 * Late if after 9:30 AM
 * @param {string} checkInTime - Check-in timestamp
 * @param {string} checkOutTime - Check-out timestamp (optional)
 * @returns {string} Status
 */
export const determineStatus = (checkInTime, checkOutTime) => {
    if (!checkInTime) return STATUS.ABSENT;

    const checkIn = new Date(checkInTime);
    const hours = checkIn.getHours();
    const minutes = checkIn.getMinutes();

    // Check if late (after 9:30 AM)
    const isLate = hours > 9 || (hours === 9 && minutes > 30);

    // Check if half day (less than 4 hours worked)
    if (checkOutTime) {
        const checkOut = new Date(checkOutTime);
        const hoursWorked = (checkOut - checkIn) / (1000 * 60 * 60);
        if (hoursWorked < 4) {
            return STATUS.HALF_DAY;
        }
    }

    return isLate ? STATUS.LATE : STATUS.PRESENT;
};

/**
 * Get status icon/emoji
 * @param {string} status - Attendance status
 * @returns {string} Icon/emoji
 */
export const getStatusIcon = (status) => {
    const icons = {
        [STATUS.PRESENT]: '✓',
        [STATUS.ABSENT]: '✗',
        [STATUS.LATE]: '⚠',
        [STATUS.HALF_DAY]: '◐'
    };
    return icons[status] || '?';
};

/**
 * Get status badge class
 * @param {string} status - Attendance status
 * @returns {string} CSS class name
 */
export const getStatusBadgeClass = (status) => {
    return `status-badge status-${status}`;
};

/**
 * Check if status is considered present (present or late)
 * @param {string} status - Attendance status
 * @returns {boolean}
 */
export const isPresent = (status) => {
    return status === STATUS.PRESENT || status === STATUS.LATE || status === STATUS.HALF_DAY;
};

/**
 * Calculate attendance percentage
 * @param {number} presentDays - Number of present days
 * @param {number} totalDays - Total number of days
 * @returns {number} Percentage (0-100)
 */
export const calculateAttendancePercentage = (presentDays, totalDays) => {
    if (totalDays === 0) return 0;
    return ((presentDays / totalDays) * 100).toFixed(1);
};
