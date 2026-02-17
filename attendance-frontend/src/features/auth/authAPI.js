import axiosInstance from '../../services/axios';

export const loginAPI = async (email, password) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const registerAPI = async (userData) => {
  return axiosInstance.post('/auth/register', userData);
};

export const logoutAPI = async () => {
  return axiosInstance.post('/auth/logout');
};

export const getCurrentUser = async () => {
  return axiosInstance.get('/auth/me');
};
