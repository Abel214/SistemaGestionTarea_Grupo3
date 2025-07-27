import React, { useState } from 'react';
import {
  UserRoundPlus, X, User, Mail, UserCheck,
  Save, KeySquare, Contact
} from 'lucide-react';
import {getCookie} from '../../../utils/cookies';
import { authService } from '../../../services/authService'

const ModalAgregarUsuario = ({ isOpen, onClose, newUser, setNewUser, onUserCreated }) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Validación básica
      if (!newUser.name || !newUser.lastname || !newUser.dni ||
          !newUser.email || !newUser.password || !newUser.role) {
        alert('Todos los campos son requeridos');
        return;
      }

      const response = await authService.registerStaff(newUser);

      if (!response.success) {
        // Manejar errores
        if (response.error && typeof response.error === 'object') {
          const errorMessages = Object.entries(response.error)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join('\n');
          alert('Error al crear usuario:\n' + errorMessages);
        } else {
          alert(response.error || 'Error al crear usuario');
        }
        return;
      }

      alert('✅ Usuario creado correctamente');
      onClose();
      setNewUser({
        name: '', lastname: '', email: '', role: '',
        status: '', phone: '', birthdate: ''
      });

      if (onUserCreated) onUserCreated(response.data);

    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Error inesperado al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  // Función mejorada para cerrar el modal
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Cerrando modal...'); // Para debug
    onClose();
  };

  // Manejar click en el overlay
  const handleOverlayClick = (e) => {
    // Solo cerrar si se hace click en el overlay, no en el contenido del modal
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  // Prevenir cierre si no está visible
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <UserRoundPlus className="w-5 h-5"/> Agregar Usuario
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Cerrar modal"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X className="w-5 h-5"/>
          </button>
        </div>

        <div className="modal-body">
          <div className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><User className="w-4 h-4"/> Nombre</label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div className="form-group">
                <label className="form-label"><User className="w-4 h-4"/> Apellido</label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.lastname}
                  onChange={(e) => setNewUser({...newUser, lastname: e.target.value})}
                  placeholder="Ingrese el apellido"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><Contact className="w-4 h-4"/> DNI</label>
                <input
                  type="text"
                  className="form-input"
                  value={newUser.dni}
                  onChange={(e) => setNewUser({...newUser, dni: e.target.value})}
                  placeholder="Ingrese el DNI"
                />
              </div>
              <div className="form-group">
                <label className="form-label"><Mail className="w-4 h-4"/> Correo</label>
                <input
                  type="email"
                  className="form-input"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Correo institucional"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><KeySquare className="w-4 h-4"/> Contraseña</label>
                <input
                  type="password"
                  className="form-input"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Ingrese una contraseña"
                />
              </div>
              <div className="form-group">
                <label className="form-label"><UserCheck className="w-4 h-4"/> Rol</label>
                <select
                  className="form-select"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="">Seleccione Rol</option>
                  <option value="EST">Estudiante</option>
                  <option value="DOC">Docente</option>
                  <option value="ADM">Administrador</option>
                  <option value="OBS">Observador</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="primary-button save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              'Guardando...'
            ) : (
              <>
                <Save className="w-4 h-4"/> Guardar Usuario
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarUsuario;