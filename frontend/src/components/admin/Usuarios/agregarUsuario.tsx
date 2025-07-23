import React from 'react';
import {
    UserRoundPlus, X, User, Mail, UserCheck,
    Save, KeySquare, Contact
} from 'lucide-react';

import {getCookie} from '../../../utils/cookies';

const ModalAgregarUsuario = ({isOpen, onClose, newUser, setNewUser, onUserCreated}) => {
        if (!isOpen) return null;

        const handleSave = async () => {
            try {
                const csrfToken = getCookie('csrftoken');
                const response = await fetch('http://localhost:8000/api/tareas/register-staff/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken ?? ''
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        nombre: newUser.name,
                        apellido: newUser.lastname,
                        dni: newUser.dni,
                        correo: newUser.email,
                        contraseña: newUser.password,
                        rol: newUser.role

                    })
                });

                console.log('Estado HTTP:', response.status);

                let data;
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error('❌ No se pudo convertir la respuesta a JSON:', jsonError);
                    const text = await response.text();
                    console.error('Respuesta cruda del backend:', text);
                    alert('Respuesta inválida del servidor:\n' + text);
                    return;
                }

                if (!response.ok) {
                    console.error('❌ Error al crear usuario:', data);
                    const errorMessages = Object.entries(data)
                        .map(([key, val]) => {
                            const mensaje = Array.isArray(val) ? val.join(', ') : val;
                            return `${key}: ${mensaje}`;
                        })
                        .join('\n');
                    alert('Error al crear usuario:\n' + errorMessages);
                    return;
                }

                alert('✅ Usuario creado correctamente');
                onClose();
                if (onUserCreated) onUserCreated();
            } catch (error) {
                console.error('❌ Error en la petición fetch:', error);
                alert('Error inesperado al crear usuario');
            }

        };

        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-header">
                        <h2 className="modal-title">
                            <UserRoundPlus className="w-5 h-5"/> Agregar Usuario
                        </h2>
                        <button className="modal-close-btn" onClick={onClose}>
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
                        <button className="secondary-button" onClick={onClose}>Cancelar</button>
                        <button className="primary-button save-btn" onClick={handleSave}>
                            <Save className="w-4 h-4"/> Guardar Usuario
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default ModalAgregarUsuario;
