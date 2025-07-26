// components/ModalCalificarTarea.jsx
import React from 'react';
import { CheckCircle, X, Star, User, Save } from 'lucide-react';

const ModalCalificarTarea = ({
  isOpen,
  tarea,
  estudiantes,
  onClose,
  onGradeChange,
  onSave
}) => {
  if (!isOpen || !tarea) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <CheckCircle className="w-5 h-5" /> Calificar Tarea: {tarea.title}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="grade-stats">
            <p>Total de entregas: {estudiantes.length}</p>
            <p>Por calificar: {estudiantes.filter(e => !e.calificacion).length}</p>
          </div>

          <div className="students-grade-list">
            {estudiantes.map(estudiante => (
              <div key={estudiante.id} className="student-grade-item">
                <div className="student-info">
                  <User className="w-4 h-4" />
                  <span>{estudiante.nombre}</span>
                </div>

                <div className="grade-input-container">
                  <input
                    type="number"
                    min="0"
                    max={tarea.maxScore || 100}
                    value={estudiante.calificacion || ''}
                    onChange={(e) => onGradeChange(estudiante.id, e.target.value)}
                    placeholder="Calificación"
                    className="grade-input"
                  />
                  <span> / {tarea.maxScore || 100}</span>
                </div>

                <div className="grade-actions">
                  <button
                    className="btn-icon"
                    onClick={() => onGradeChange(estudiante.id, tarea.maxScore || 100)}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="primary-button save-btn" onClick={onSave}>
            <Save className="w-4 h-4" />
            Guardar Calificaciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificarTarea;