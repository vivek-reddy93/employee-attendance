import axiosInstance from '../../services/axios';

export const getDashboardData = async () => {
  return axiosInstance.get('/dashboard');
};

export const getWeeklyTrends = async () => {
  return axiosInstance.get('/dashboard/weekly-trends');
};

export const getDepartmentStats = async () => {
  return axiosInstance.get('/dashboard/department-stats');
};

export const getEmployeeStats = async (userId) => {
  return axiosInstance.get(`/dashboard/employee/${userId}`);
};
