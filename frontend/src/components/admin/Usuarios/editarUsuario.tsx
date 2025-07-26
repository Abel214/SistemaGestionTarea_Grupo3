// components/modals/ModalEditarUsuario.jsx
import React, { useState } from 'react';
import {
  User, X, Mail, UserCheck,
  GraduationCap, Phone, Calendar, Save
} from 'lucide-react';
import axios from 'axios';
const ModalEditarUsuario = ({ isOpen, user, onClose, onChange, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <User className="w-5 h-5" /> Editar Usuario
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="edit-form">

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4" /> Nombre
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.name || ''}
                  onChange={(e) => onChange('name', e.target.value)}
                  placeholder="Ingrese el nombre"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4" /> Apellido
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.lastname || ''}
                  onChange={(e) => onChange('lastname', e.target.value)}
                  placeholder="Ingrese el apellido"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Mail className="w-4 h-4" /> Correo Institucional
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={user?.email || ''}
                  onChange={(e) => onChange('email', e.target.value)}
                  placeholder="Ingrese el correo institucional"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <UserCheck className="w-4 h-4" /> Rol
                </label>
                <select
                  className="form-select"
                  value={user?.role || ''}
                  onChange={(e) => onChange('role', e.target.value)}
                >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Profesor">Docente</option>
                  <option value="Administrador">Administrativo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <GraduationCap className="w-4 h-4" /> Ciclo
                </label>
                <select
                  className="form-select"
                  value={user?.status || ''}
                  onChange={(e) => onChange('status', e.target.value)}
                >
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
                  <Phone className="w-4 h-4" /> Teléfono
                </label>
                <input
                  type="tel"
                  className="form-input"
                  value={user?.phone || ''}
                  onChange={(e) => onChange('phone', e.target.value)}
                  placeholder="Ingrese el número de teléfono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" /> Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={user?.birthdate || ''}
                  onChange={(e) => onChange('birthdate', e.target.value)}
                  placeholder="Ingrese la fecha de nacimiento"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary-button save-btn" onClick={onSave}>
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
