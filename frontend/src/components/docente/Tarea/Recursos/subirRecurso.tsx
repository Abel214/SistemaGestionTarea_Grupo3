import React, { useState } from 'react';
import { UploadCloud, X, FileText, File, FileImage, FileVideo, Save } from 'lucide-react';

const ModalSubirRecurso = ({ isOpen, onClose, onSave }) => {
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'pdf',
    file: null,
    description: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[1];
      setNewResource({
        ...newResource,
        file,
        type: fileType === 'pdf' ? 'pdf' :
              fileType.includes('presentation') ? 'pptx' :
              fileType.includes('image') ? 'image' :
              fileType.includes('video') ? 'video' : 'other'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newResource);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <UploadCloud className="w-5 h-5" /> Subir Nuevo Recurso
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
              value={newResource.name}
              onChange={(e) => setNewResource({...newResource, name: e.target.value})}
              placeholder="Ej: Guía de laboratorio 1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <File className="w-4 h-4" />
              Archivo
            </label>
            <div className="file-upload">
              <label className="file-upload-label">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-upload-input"
                  required
                />
                {newResource.file ? newResource.file.name : 'Seleccionar archivo...'}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Tipo de Archivo
            </label>
            <select
              className="form-select"
              value={newResource.type}
              onChange={(e) => setNewResource({...newResource, type: e.target.value})}
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
              Descripción (Opcional)
            </label>
            <textarea
              className="form-input"
              value={newResource.description}
              onChange={(e) => setNewResource({...newResource, description: e.target.value})}
              placeholder="Descripción del recurso..."
              rows="3"
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              <Save className="w-4 h-4" />
              Subir Recurso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSubirRecurso;