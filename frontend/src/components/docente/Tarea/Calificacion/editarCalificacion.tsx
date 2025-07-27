import React from 'react';
import { ClipboardList, X, User, Star, Save, AlertTriangle } from 'lucide-react';

const ModalEditarCalificacion = ({
  isOpen,
  calificacion,
  onClose,
  onChange,
  onSave
}) => {
  if (!isOpen || !calificacion) return null;

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [pendingGrade, setPendingGrade] = React.useState('');

  const handleGradeChange = (e) => {
    const value = e.target.value;
    setPendingGrade(value);

    // Mostrar confirmación si ya existe una calificación
    if (calificacion.grade) {
      setShowConfirm(true);
    }
  };

  const confirmChange = () => {
    onChange('grade', pendingGrade);
    setShowConfirm(false);
  };

  const cancelChange = () => {
    setShowConfirm(false);
    setPendingGrade('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <ClipboardList className="w-5 h-5" /> Editar Calificación
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          {calificacion.grade && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-yellow-700">
                  <strong>Advertencia:</strong> Este estudiante ya tiene una calificación registrada.
                </p>
              </div>
            </div>
          )}

          {showConfirm && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-blue-700 font-medium">
                    ¿Estás seguro de modificar esta calificación?
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Cambiando de {calificacion.grade} a {pendingGrade}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={confirmChange}
                      className="text-xs bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Confirmar Cambio
                    </button>
                    <button
                      onClick={cancelChange}
                      className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="edit-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Estudiante
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={calificacion.studentName || ''}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Star className="w-4 h-4"/>
                  Calificación
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="form-input"
                  value={pendingGrade || calificacion.grade || ''}
                  onChange={handleGradeChange}
                  placeholder="Ingrese la calificación (0-100)"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <ClipboardList className="w-4 h-4"/>
                  Comentarios
                </label>
                <textarea
                  className="form-input min-h-[100px]"
                  value={calificacion.comments || ''}
                  onChange={(e) => onChange('comments', e.target.value)}
                  placeholder="Comentarios adicionales..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="primary-button save-btn"
            onClick={onSave}
            disabled={showConfirm}
          >
            <Save className="w-4 h-4" />
            Guardar Calificación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarCalificacion;