// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true, // Esto es CRUCIAL para enviar cookies
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      // Manejo específico para errores 403
      error.message = 'Acceso no autorizado. Por favor inicie sesión nuevamente.';
    }
    return Promise.reject(error);
  }
);

export default api;