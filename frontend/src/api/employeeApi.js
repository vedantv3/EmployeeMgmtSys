import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://employeemgmtsys-2.onrender.com/api', // updated to deployed backend
});

// Auth APIs
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

// Employee APIs
export const fetchEmployees = (token) => api.get('/employees', { headers: { Authorization: `Bearer ${token}` } });
export const createEmployee = (data, token) => api.post('/employees', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateEmployee = (id, data, token) => api.put(`/employees/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
export const deleteEmployee = (id, token) => api.delete(`/employees/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export default api;
