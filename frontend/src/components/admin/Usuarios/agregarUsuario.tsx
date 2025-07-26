// components/modals/ModalAgregarUsuario.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  UserRoundPlus, X, User, Mail, UserCheck,
  GraduationCap, Phone, Calendar, Save, Lock
} from 'lucide-react';

const ModalAgregarUsuario = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    status: '',
    phone: '',
    birthdate: '',
    dni: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("[1] Iniciando envío de formulario...");

  // Validación rápida
  if (!newUser.name || !newUser.lastname || !newUser.email || !newUser.password || !newUser.role) {
    console.error("[❌] Error: Campos obligatorios faltantes");
    return;
  }

  setLoading(true); // Activar spinner de carga
  console.log("[2] Validación pasada, enviando datos...");

  try {
    const payload = {
      nombre: newUser.name,
      apellido: newUser.lastname,
      email: newUser.email,
      contrasenia: newUser.password,
      dni: newUser.dni,
      rol: newUser.role.toLowerCase(),
      ciclo: newUser.status || null
    };

    const endpoint = newUser.role === "Estudiante"
      ? "/api/register-student/"
      : "/api/register-staff/";

    console.log("[3] Endpoint:", endpoint, "\nDatos:", payload);

    const response = await axios.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });

    console.log("[✅] Usuario creado:", response.data);

    // Éxito → Cerrar modal y actualizar lista
    onSave(response.data); // Guardar en estado padre
    setTimeout(() => {
      onClose(); // Cerrar modal
      console.log("[✓] Modal cerrado después de guardar");
    }, 1000);

  } catch (error) {
    console.error("[❌] Error completo:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      request: error.request
    });
  } finally {
    setLoading(false); // Desactivar spinner
    console.log("[↻] Loading desactivado");
  }
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <UserRoundPlus className="w-5 h-5"/>
            Agregar Usuario
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Nombre*
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ingrese el nombre"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Apellido*
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.lastname}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  placeholder="Ingrese el apellido"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Mail className="w-4 h-4"/>
                  Correo Institucional*
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={newUser.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Ingrese el correo institucional"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Lock className="w-4 h-4"/>
                  Contraseña*
                </label>
                <input
                  type="password"
                  className="form-input"
                  value={newUser.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Ingrese la contraseña"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <UserCheck className="w-4 h-4"/>
                  Rol*
                </label>
                <select
                  className="form-select"
                  value={newUser.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                >
                  <option value="">Seleccione Rol</option>
                  <option value="Estudiante">Estudiante</option>
                  <option value="Docente">Docente</option>
                  <option value="Administrador">Administrativo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <GraduationCap className="w-4 h-4"/>
                  Ciclo
                </label>
                <select
                  className="form-select"
                  value={newUser.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="">Seleccione Ciclo</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Cédula/DNI
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  placeholder="Ingrese la cédula o DNI"
                />
              </div>

            </div>


          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="primary-button save-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : (
                <>
                  <Save className="w-4 h-4"/>
                  Guardar Usuario
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarUsuario;