/**
 * Dashboard API service
 * Handles dashboard-related API calls
 */

import axiosInstance from './axios';

/**
 * Get employee dashboard data
 * Includes stats, recent attendance, and trends
 */
export const getEmployeeDashboard = async () => {
    return await axiosInstance.get('/dashboard/employee');
};

/**
 * Get manager dashboard data
 * Includes team stats, charts, and summaries
 */
export const getManagerDashboard = async () => {
    return await axiosInstance.get('/dashboard/manager');
};

/**
 * Get weekly trends data
 * @param {Object} params - Query parameters
 */
export const getWeeklyTrends = async (params = {}) => {
    return await axiosInstance.get('/dashboard/weekly-trends', { params });
};

/**
 * Get department statistics
 */
export const getDepartmentStats = async () => {
    return await axiosInstance.get('/dashboard/department-stats');
};

/**
 * Get specific employee dashboard data (for managers)
 * @param {string} userId - User ID
 */
export const getEmployeeDashboardById = async (userId) => {
    return await axiosInstance.get(`/dashboard/employee/${userId}`);
};

export default {
    getEmployeeDashboard,
    getManagerDashboard,
    getWeeklyTrends,
    getDepartmentStats,
    getEmployeeDashboardById
};
