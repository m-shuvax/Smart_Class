// src/services/userService.js
import api from './api';

export const getUser = async (email) => {
  try {
    const response = await api.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (email, userData) => {
  try {
    const response = await api.put(`/users/${email}`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (email) => {
  try {
    const response = await api.delete(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Similarly, you can create functions for other routes like createUser, createFile, etc.
