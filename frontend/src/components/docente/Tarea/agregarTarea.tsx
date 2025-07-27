// components/modals/ModalCrearTarea.jsx
import React, {useState} from 'react';
import {
  FileText, X, Calendar, Clock, BookOpen,
  ClipboardList, UploadCloud, Save, AlertCircle
} from 'lucide-react';

const ModalCrearTarea = ({ isOpen, onClose, newTask, setNewTask, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <FileText className="w-5 h-5"/>
            Crear Nueva Tarea
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
                  <FileText className="w-4 h-4"/>
                  Nombre de la Tarea
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Ej: Ensayo sobre historia del arte"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <ClipboardList className="w-4 h-4"/>
                  Descripción
                </label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Detalles de la tarea, requisitos, formato esperado..."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <BookOpen className="w-4 h-4"/>
                  Tipo de Tarea
                </label>
                <select
                  className="form-select"
                  value={newTask.type}
                  onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                >
                  <option value="">Seleccione tipo</option>
                  <option value="Ensayo">Ensayo</option>
                  <option value="Proyecto">Proyecto</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Examen">Examen</option>
                  <option value="Presentación">Presentación</option>
                  <option value="Práctica">Práctica</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <AlertCircle className="w-4 h-4"/>
                  Prioridad
                </label>
                <select
                  className="form-select"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="Normal">Normal</option>
                  <option value="Alta">Alta</option>
                  <option value="Urgente">Urgente</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4"/>
                  Fecha de Entrega
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock className="w-4 h-4"/>
                  Hora Límite
                </label>
                <input
                  type="time"
                  className="form-input"
                  value={newTask.dueTime}
                  onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <UploadCloud className="w-4 h-4"/>
                  Archivos Adjuntos (Opcional)
                </label>
                <input
                  type="file"
                  className="form-input-file"
                  onChange={(e) => setNewTask({...newTask, attachments: e.target.files})}
                  multiple
                />
                <p className="form-hint">Formatos aceptados: PDF, DOCX, PPT, ZIP</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <ClipboardList className="w-4 h-4"/>
                  Puntaje Máximo
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={newTask.maxScore}
                  onChange={(e) => setNewTask({...newTask, maxScore: e.target.value})}
                  placeholder="Ej: 100"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label checkbox-label">
                  <input
                    type="checkbox"
                    checked={newTask.allowLateSubmission || false}
                    onChange={(e) => setNewTask({...newTask, allowLateSubmission: e.target.checked})}
                  />
                  Permitir entregas tardías
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>Cancelar</button>
          <button className="primary-button save-btn" onClick={onSave}>
            <Save className="w-4 h-4"/>
            Publicar Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearTarea;