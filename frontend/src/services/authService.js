// src/services/authService.js
import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
