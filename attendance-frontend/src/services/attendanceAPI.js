/**
 * Attendance API service
 * Handles all attendance-related API calls
 */

import axiosInstance from './axios';

// Employee endpoints

/**
 * Check in for the day
 */
export const checkIn = async () => {
    return await axiosInstance.post('/attendance/checkin');
};

/**
 * Check out for the day
 * @param {string} attendanceId - ID of the attendance record
 */
export const checkOut = async (attendanceId) => {
    return await axiosInstance.put(`/attendance/checkout/${attendanceId}`);
};

/**
 * Get my attendance history
 * @param {Object} params - Query parameters (month, year, etc.)
 */
export const getMyHistory = async (params = {}) => {
    return await axiosInstance.get('/attendance/my-history', { params });
};

/**
 * Get my monthly summary
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 */
export const getMySummary = async (month, year) => {
    return await axiosInstance.get('/attendance/my-summary', {
        params: { month, year }
    });
};

/**
 * Get today's attendance status
 */
export const getTodayStatus = async () => {
    return await axiosInstance.get('/attendance/today');
};

// Manager endpoints

/**
 * Get all employees' attendance
 * @param {Object} params - Query parameters (date, employee, status, etc.)
 */
export const getAllAttendance = async (params = {}) => {
    return await axiosInstance.get('/attendance/all', { params });
};

/**
 * Get specific employee's attendance
 * @param {string} employeeId - Employee ID
 * @param {Object} params - Query parameters
 */
export const getEmployeeAttendance = async (employeeId, params = {}) => {
    return await axiosInstance.get(`/attendance/employee/${employeeId}`, { params });
};

/**
 * Get team attendance summary
 * @param {Object} params - Query parameters
 */
export const getTeamSummary = async (params = {}) => {
    return await axiosInstance.get('/attendance/summary', { params });
};

/**
 * Export attendance data to CSV
 * @param {Object} params - Query parameters for filtering
 */
export const exportAttendance = async (params = {}) => {
    return await axiosInstance.get('/attendance/export', {
        params,
        responseType: 'blob' // For file download
    });
};

/**
 * Get today's attendance status for all employees
 */
export const getTodayTeamStatus = async () => {
    return await axiosInstance.get('/attendance/today-status');
};

export default {
    checkIn,
    checkOut,
    getMyHistory,
    getMySummary,
    getTodayStatus,
    getAllAttendance,
    getEmployeeAttendance,
    getTeamSummary,
    exportAttendance,
    getTodayTeamStatus
};
