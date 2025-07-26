import React from 'react';
import { ClipboardEdit, X, Calendar, BookOpen, AlertTriangle, Save } from 'lucide-react';

const ModalEditarTarea = ({
  isOpen,
  tarea,
  totalEnviados,
  onClose,
  onChange,
  onSave
}) => {
  if (!isOpen || !tarea) return null;

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [pendingChanges, setPendingChanges] = React.useState(null);

  const handleChange = (field, value) => {
    setPendingChanges({ field, value });

    // Mostrar confirmación solo si hay envíos realizados
    if (totalEnviados > 0) {
      setShowConfirm(true);
    } else {
      // Si no hay envíos, aplicar cambios directamente
      onChange(field, value);
      setPendingChanges(null);
    }
  };

  const confirmChange = () => {
    if (pendingChanges) {
      onChange(pendingChanges.field, pendingChanges.value);
    }
    setShowConfirm(false);
    setPendingChanges(null);
  };

  const cancelChange = () => {
    setShowConfirm(false);
    setPendingChanges(null);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <ClipboardEdit className="w-5 h-5" /> Editar Tarea
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          {totalEnviados > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-yellow-700">
                  <strong>Advertencia:</strong> {totalEnviados} estudiante(s) ya han enviado esta tarea.
                  Cualquier modificación podría afectar sus entregas.
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
                    ¿Estás seguro de modificar "{pendingChanges?.field}"?
                  </p>
                  <p className="text-blue-600 text-sm mt-1">
                    Esta acción no se puede deshacer y podría afectar a los estudiantes.
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
                  <BookOpen className="w-4 h-4"/>
                  Nombre de la Tarea
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={tarea.nombre || ''}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  placeholder="Nombre descriptivo de la tarea"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4"/>
                  Fecha de Entrega
                </label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={tarea.fechaEntrega || ''}
                  onChange={(e) => handleChange('fechaEntrega', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <BookOpen className="w-4 h-4"/>
                  Descripción
                </label>
                <textarea
                  className="form-input min-h-[100px]"
                  value={tarea.descripcion || ''}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                  placeholder="Detalles de la tarea..."
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
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarTarea;