import React from 'react';
import { Layers, X, Hash, BookOpen, User, Users, GraduationCap, Save } from 'lucide-react';

const ModalEditarParalelo = ({ isOpen, paralelo, materias, docentes, onClose, onChange, onSave }) => {
  if (!isOpen || !paralelo) return null;

  const handleMateriaChange = (materiaId) => {
    if (paralelo.materias.includes(materiaId)) {
      onChange('materias', paralelo.materias.filter(id => id !== materiaId));
    } else {
      onChange('materias', [...paralelo.materias, materiaId]);
    }
  };

  const handleDocenteChange = (docenteId) => {
    if (paralelo.docentes.includes(docenteId)) {
      onChange('docentes', paralelo.docentes.filter(id => id !== docenteId));
    } else {
      onChange('docentes', [...paralelo.docentes, docenteId]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Layers className="w-5 h-5" /> Editar Paralelo
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
                  <Hash className="w-4 h-4"/>
                  Código Paralelo
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={paralelo.codigo || ''}
                  onChange={(e) => onChange('codigo', e.target.value)}
                  placeholder="Ej: PAR-2023-001"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Layers className="w-4 h-4"/>
                  Letra
                </label>
                <select
                  className="form-select"
                  value={paralelo.letra || ''}
                  onChange={(e) => onChange('letra', e.target.value)}
                >
                  {['A', 'B', 'C', 'D', 'E', 'F'].map(letra => (
                    <option key={letra} value={letra}>{letra}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <GraduationCap className="w-4 h-4"/>
                  Ciclo
                </label>
                <select
                  className="form-select"
                  value={paralelo.ciclo || ''}
                  onChange={(e) => onChange('ciclo', e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  <Users className="w-4 h-4"/>
                  Cupo Total
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={paralelo.cupoTotal || ''}
                  onChange={(e) => onChange('cupoTotal', e.target.value)}
                  placeholder="Ingrese el cupo total"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Users className="w-4 h-4"/>
                  Cupo Ocupado
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={paralelo.cupoOcupado || ''}
                  onChange={(e) => onChange('cupoOcupado', e.target.value)}
                  placeholder="Ingrese el cupo ocupado"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Estado
                </label>
                <select
                  className="form-select"
                  value={paralelo.estado || ''}
                  onChange={(e) => onChange('estado', e.target.value)}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <BookOpen className="w-4 h-4"/>
                  Materias
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {materias.map(materia => (
                    <div key={materia.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`materia-${materia.id}`}
                        checked={paralelo.materias?.includes(materia.id)}
                        onChange={() => handleMateriaChange(materia.id)}
                        className="checkbox"
                      />
                      <label htmlFor={`materia-${materia.id}`} className="ml-2 text-sm">
                        {materia.codigo} - {materia.nombre} (Ciclo {materia.ciclo})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <User className="w-4 h-4"/>
                  Docentes
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {docentes.map(docente => (
                    <div key={docente.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`docente-${docente.id}`}
                        checked={paralelo.docentes?.includes(docente.id)}
                        onChange={() => handleDocenteChange(docente.id)}
                        className="checkbox"
                      />
                      <label htmlFor={`docente-${docente.id}`} className="ml-2 text-sm">
                        {docente.nombre} ({docente.especialidad})
                      </label>
                    </div>
                  ))}
                </div>
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

export default ModalEditarParalelo;