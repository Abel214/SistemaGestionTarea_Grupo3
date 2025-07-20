import React from 'react';
import { Layers, X, BookOpen, User, Clock, Home, Users, Save } from 'lucide-react';

const ModalAgregarParalelo = ({ isOpen, onClose, newParalelo, setNewParalelo, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Layers className="w-5 h-5"/>
            Agregar Paralelo
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
                  <Layers className="w-4 h-4"/>
                  Letra del Paralelo
                </label>
                <select
                  className="form-select"
                  value={newParalelo.letra}
                  onChange={(e) => setNewParalelo({...newParalelo, letra: e.target.value})}
                >
                  <option value="">Seleccione letra</option>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(letra => (
                    <option key={letra} value={letra}>{letra}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <BookOpen className="w-4 h-4"/>
                  Materia
                </label>
                <select
                  className="form-select"
                  value={newParalelo.materia}
                  onChange={(e) => setNewParalelo({...newParalelo, materia: e.target.value})}
                >
                  <option value="">Seleccione materia</option>
                  <option value="Matemáticas Básicas">Matemáticas Básicas</option>
                  <option value="Programación I">Programación I</option>
                  <option value="Base de Datos">Base de Datos</option>
                  <option value="Redes de Computadores">Redes de Computadores</option>
                  <option value="Ingeniería de Software">Ingeniería de Software</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Profesor
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newParalelo.profesor}
                  onChange={(e) => setNewParalelo({...newParalelo, profesor: e.target.value})}
                  placeholder="Ingrese el nombre del profesor"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Clock className="w-4 h-4"/>
                  Horario
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newParalelo.horario}
                  onChange={(e) => setNewParalelo({...newParalelo, horario: e.target.value})}
                  placeholder="Ej: Lun-Mie-Vie 08:00-10:00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Home className="w-4 h-4"/>
                  Aula
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newParalelo.aula}
                  onChange={(e) => setNewParalelo({...newParalelo, aula: e.target.value})}
                  placeholder="Ingrese el aula asignada"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Users className="w-4 h-4"/>
                  Cupo Máximo
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={newParalelo.cupo}
                  onChange={(e) => setNewParalelo({...newParalelo, cupo: e.target.value})}
                  placeholder="Ingrese el cupo máximo"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Users className="w-4 h-4"/>
                  Estado
                </label>
                <select
                  className="form-select"
                  value={newParalelo.estado}
                  onChange={(e) => setNewParalelo({...newParalelo, estado: e.target.value})}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  <option value="Completo">Completo</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>Cancelar</button>
          <button className="primary-button save-btn" onClick={onSave}>
            <Save className="w-4 h-4"/>
            Guardar Paralelo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarParalelo;