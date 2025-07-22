// components/modals/ModalAgregarUsuario.jsx
import React from 'react';
import {
  UserRoundPlus, X, User, Mail, UserCheck,
  GraduationCap, Phone, Calendar, Save
} from 'lucide-react';

const ModalAgregarUsuario = ({ isOpen, onClose, newUser, setNewUser, onSave }) => {
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

            <div className="modal-body">
                <div className="edit-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <User className="w-4 h-4"/>
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                placeholder="Ingrese el nombre"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <User className="w-4 h-4"/>
                                Apellido
                            </label>
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
                            <label className="form-label">
                                <Mail className="w-4 h-4"/>
                                Correo Institucional
                            </label>
                            <input
                                type="email"
                                className="form-input"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                placeholder="Ingrese el correo institucional"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <UserCheck className="w-4 h-4"/>
                                Rol
                            </label>
                            <select
                                className="form-select"
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
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
                                onChange={(e) => setNewUser({...newUser, status: e.target.value})}
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
                                <Phone className="w-4 h-4"/>
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                className="form-input"
                                value={newUser.phone}
                                onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                                placeholder="Ingrese el número de teléfono"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <Calendar className="w-4 h-4"/>
                                Fecha de Nacimiento
                            </label>
                            <input
                                type="date"
                                className="form-input"
                                value={newUser.birthdate}
                                onChange={(e) => setNewUser({...newUser, birthdate: e.target.value})}
                                placeholder="Ingrese la fecha de nacimiento"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <button className="secondary-button" onClick={onClose}>Cancelar</button>
                <button className="primary-button save-btn" onClick={onSave}>
                    <Save className="w-4 h-4"/>
                    Guardar Usuario
                </button>
            </div>
        </div>
    </div>
  );
};

export default ModalAgregarUsuario;
