// components/modals/ModalEditarMateria.jsx
import React from 'react';
import {
  BookOpen, X, User, Hash, Clock,
  Calendar, Save, List, Layers, Bookmark
} from 'lucide-react';

const ModalEditarMateria = ({ isOpen, materia, onClose, onChange, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <BookOpen className="w-5 h-5" /> Editar Materia
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
                  <BookOpen className="w-4 h-4" /> Nombre de la Materia
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.nombre || ''}
                  onChange={(e) => onChange('nombre', e.target.value)}
                  placeholder="Ingrese el nombre de la materia"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Hash className="w-4 h-4" /> Código
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.codigo || ''}
                  onChange={(e) => onChange('codigo', e.target.value)}
                  placeholder="Ingrese el código de la materia"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4" /> Profesor
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.profesor || ''}
                  onChange={(e) => onChange('profesor', e.target.value)}
                  placeholder="Ingrese el nombre del profesor"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <List className="w-4 h-4" /> Paralelo
                </label>
                <select
                  className="form-select"
                  value={materia?.paralelo || ''}
                  onChange={(e) => onChange('paralelo', e.target.value)}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Layers className="w-4 h-4" /> Ciclo
                </label>
                <select
                  className="form-select"
                  value={materia?.ciclo || ''}
                  onChange={(e) => onChange('ciclo', e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Bookmark className="w-4 h-4" /> Modalidad
                </label>
                <select
                  className="form-select"
                  value={materia?.modalidad || ''}
                  onChange={(e) => onChange('modalidad', e.target.value)}
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Híbrida">Híbrida</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Clock className="w-4 h-4" /> Duración por Unidad
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.duracionUnidad || ''}
                  onChange={(e) => onChange('duracionUnidad', e.target.value)}
                  placeholder="Ej: 16 semanas"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock className="w-4 h-4" /> Horas Programadas
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.horasProgramadas || ''}
                  onChange={(e) => onChange('horasProgramadas', e.target.value)}
                  placeholder="Ej: 64 horas"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" /> Horario
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={materia?.horario || ''}
                  onChange={(e) => onChange('horario', e.target.value)}
                  placeholder="Ej: Lun-Mie-Vie 08:00-10:00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <BookOpen className="w-4 h-4" /> Descripción
                </label>
                <textarea
                  className="form-textarea"
                  value={materia?.descripcion || ''}
                  onChange={(e) => onChange('descripcion', e.target.value)}
                  placeholder="Ingrese una descripción de la materia"
                  rows="3"
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

export default ModalEditarMateria;