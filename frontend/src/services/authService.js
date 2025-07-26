// src/services/authService.js


import api from "./api.js";

export const authService = {
  async getCsrfToken() {
     try {
    console.log('[1/3] Obteniendo token CSRF...');
    const response = await api.get('csrf-cookie/');

    // Extrae el token CSRF de la cookie
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    if (!csrfToken) {
      throw new Error('No se pudo obtener el token CSRF de las cookies');
    }
      console.log('[✓] Token CSRF obtenido');
    return csrfToken;
  } catch (error) {
    console.error('[X] Error CSRF:', error);
    throw new Error(`Error al obtener CSRF: ${error.message}`);
  }
},


  async login(email, password) {
    try {
      console.group('🔐 Proceso de autenticación');

      // Paso 1: Obtener CSRF Token
      console.log('[1/3] Iniciando proceso CSRF...');
       const csrfToken = await this.getCsrfToken();

      // Paso 2: Enviar credenciales
       console.log('[2/3] Enviando credenciales...', { email });
    const response = await api.post('login/', { email, password }, {
      headers: {
        'X-CSRFToken': csrfToken,
      }
    });


      // Paso 3: Verificar respuesta
      console.log('[3/3] Respuesta del servidor:', {
        status: response.status,
        data: response.data,
        cookies: response.headers['set-cookie']
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Credenciales incorrectas');
      }

      console.groupEnd();
      return {
        success: true,
        email: response.data.email,
        rol: response.data.rol,
        cookies: response.headers['set-cookie']
      };
    } catch (error) {
      console.groupEnd();
      console.error('🔥 Error completo:', {
        message: error.message,
        response: error.response?.data,
        config: error.config,
        stack: error.stack
      });

      return {
        success: false,
        error: error.response?.data?.error ||
              error.message ||
              'Error desconocido durante autenticación'
      };
    }
  },

  async logout() {
    try {
      const response = await api.post('logout/');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },


async registerStaff(userData) {
  try {
    console.group('👨‍💼 Registro de nuevo staff');

    // 1. Obtener token CSRF
    const csrfToken = await this.getCsrfToken();

    // 2. Preparar datos para coincidir con el backend
    const formattedData = {
      nombre: userData.name,
      apellido: userData.lastname,
      dni: userData.dni,
      correo: userData.email,
      contraseña: userData.password,
      rol: userData.role
    };

    // 3. Configurar headers
    const config = {
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    };

    // 4. Enviar solicitud
    console.log('Enviando datos de registro:', formattedData);
    const response = await api.post('register-staff/', formattedData, config);

    // 5. Validar respuesta
    if (!response.data.success) {
      throw new Error(response.data.errors || 'Error al registrar usuario');
    }

    console.groupEnd();
    return {
      success: true,
      data: response.data.data
    };

  } catch (error) {
    console.groupEnd();
    console.error('Error en registerStaff:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    return {
      success: false,
      error: error.response?.data?.errors ||
            error.response?.data?.error ||
            error.message ||
            'Error desconocido durante el registro'
    };
  }
}
};