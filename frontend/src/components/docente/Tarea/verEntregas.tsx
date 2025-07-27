// components/ModalVerEntregas.jsx
import React from 'react';
import { Download, FileText, X, User, CheckCircle, Clock, Star } from 'lucide-react';

const ModalVerEntregas = ({
  isOpen,
  tarea,
  entregas,
  onClose,
  onDownload,
  onGradeChange,
  onSaveGrade
}) => {
  if (!isOpen || !tarea) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container wide-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            <FileText className="w-5 h-5" /> Entregas: {tarea.title}
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="submission-stats">
            <div className="stat-item">
              <CheckCircle className="w-4 h-4" />
              <span>Entregas: {entregas.length}/{tarea.totalStudents || 'N/A'}</span>
            </div>
            <div className="stat-item">
              <Clock className="w-4 h-4" />
              <span>Fecha límite: {tarea.dueDate} {tarea.time}</span>
            </div>
          </div>

          <div className="submissions-list">
            <div className="submissions-header">
              <span>Estudiante</span>
              <span>Estado</span>
              <span>Archivo</span>
              <span>Calificación</span>
              <span>Acciones</span>
            </div>

            {entregas.map(entrega => (
              <div key={entrega.id} className="submission-item">
                <div className="student-info">
                  <User className="w-4 h-4" />
                  <span>{entrega.studentName}</span>
                </div>

                <div className={`status-badge ${entrega.estado}`}>
                  {entrega.estado === 'entregado' ? 'Entregado' : 'Pendiente'}
                </div>

                <div className="file-info">
                  {entrega.archivo ? (
                    <button
                      onClick={() => onDownload(entrega.archivo)}
                      className="file-link"
                    >
                      <FileText className="w-4 h-4" />
                      {entrega.archivo.name}
                    </button>
                  ) : (
                    <span className="no-file">Sin archivo</span>
                  )}
                </div>

                <div className="grade-input-container">
                  <input
                    type="number"
                    min="0"
                    max={tarea.maxScore || 100}
                    value={entrega.calificacion || ''}
                    onChange={(e) => onGradeChange(entrega.id, e.target.value)}
                    placeholder="0"
                    className="grade-input"
                  />
                  <span>/ {tarea.maxScore || 100}</span>
                </div>

                <div className="submission-actions">
                  <button
                    className="btn-icon"
                    onClick={() => onGradeChange(entrega.id, tarea.maxScore || 100)}
                    title="Dar máxima calificación"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    className="btn-small primary"
                    onClick={() => onSaveGrade(entrega.id)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Cerrar
          </button>
          <button className="primary-button" onClick={onClose}>
            <Download className="w-4 h-4" />
            Descargar Todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerEntregas;