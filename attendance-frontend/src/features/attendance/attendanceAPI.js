import axiosInstance from '../../services/axios';

export const checkInAPI = async (attendanceData) => {
  return axiosInstance.post('/attendance/check-in', attendanceData);
};

export const checkOutAPI = async (attendanceId) => {
  return axiosInstance.put(`/attendance/check-out/${attendanceId}`, {});
};

export const getAttendanceHistory = async (userId, startDate, endDate) => {
  return axiosInstance.get('/attendance/history', {
    params: { userId, startDate, endDate },
  });
};

export const getTeamAttendance = async (startDate, endDate) => {
  return axiosInstance.get('/attendance/team', {
    params: { startDate, endDate },
  });
};
