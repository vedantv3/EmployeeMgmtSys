import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_BASE_URL = 'https://employeemgmtsys-2.onrender.com/api'; // deployed backend

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const register = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
    setToken(res.data.token);
    setUser({ name: res.data.name, email: res.data.email });
  };

  const login = async (data) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
    setToken(res.data.token);
    setUser({ name: res.data.name, email: res.data.email });
  };

  const logout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
