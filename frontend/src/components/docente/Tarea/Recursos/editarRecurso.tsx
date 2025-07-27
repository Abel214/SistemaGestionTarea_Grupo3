import React, { useState } from 'react';
import { Edit, X, FileText, File, Save, Trash2 } from 'lucide-react';

const ModalEditarRecurso = ({ isOpen, resource, onClose, onSave, onDelete }) => {
  const [editedResource, setEditedResource] = useState(resource);
  const [newFile, setNewFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editedResource,
      file: newFile || resource.file
    });
    onClose();
  };

  if (!isOpen || !resource) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Edit className="w-5 h-5" /> Editar Recurso
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">
              <FileText className="w-4 h-4" />
              Nombre del Recurso
            </label>
            <input
              type="text"
              className="form-input"
              value={editedResource.name}
              onChange={(e) => setEditedResource({...editedResource, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <File className="w-4 h-4" />
              Reemplazar Archivo (Opcional)
            </label>
            <div className="file-upload">
              <label className="file-upload-label">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
                {newFile ? newFile.name : 'Seleccionar nuevo archivo...'}
              </label>
              {!newFile && (
                <p className="file-info">Archivo actual: {resource.file.name}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Tipo de Archivo
            </label>
            <select
              className="form-select"
              value={editedResource.type}
              onChange={(e) => setEditedResource({...editedResource, type: e.target.value})}
            >
              <option value="pdf">PDF</option>
              <option value="pptx">Presentación</option>
              <option value="image">Imagen</option>
              <option value="video">Video</option>
              <option value="document">Documento</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Descripción
            </label>
            <textarea
              className="form-input"
              value={editedResource.description}
              onChange={(e) => setEditedResource({...editedResource, description: e.target.value})}
              rows="3"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="danger-button"
              onClick={() => {
                if (window.confirm('¿Estás seguro de eliminar este recurso?')) {
                  onDelete(resource.id);
                  onClose();
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarRecurso;