// src/services/taskService.js
import api from "./api.js";
export const getTasks = async () => {
  try {
    const response = await api.get('tareas/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('tareas/', taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};