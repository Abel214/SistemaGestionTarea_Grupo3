import React, { useState } from 'react';
import { GraduationCap, X, Hash, List, Users, Save } from 'lucide-react';

const ModalAgregarCiclo = ({ isOpen, onClose, paralelos, onSave }) => {
  const [newCiclo, setNewCiclo] = useState({
    codigo: '',
    numero: '',
    estudiantesTotales: '',
    paralelos: []
  });

  if (!isOpen) return null;

  const handleParaleloChange = (paraleloId) => {
    setNewCiclo(prev => {
      if (prev.paralelos.includes(paraleloId)) {
        return {
          ...prev,
          paralelos: prev.paralelos.filter(id => id !== paraleloId)
        };
      } else {
        return {
          ...prev,
          paralelos: [...prev.paralelos, paraleloId]
        };
      }
    });
  };

  const handleSubmit = () => {
    onSave(newCiclo);
    setNewCiclo({
      codigo: '',
      numero: '',
      estudiantesTotales: '',
      paralelos: []
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <GraduationCap className="w-5 h-5"/>
            Agregar Ciclo
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
                  <Hash className="w-4 h-4"/>
                  Código Ciclo
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newCiclo.codigo}
                  onChange={(e) => setNewCiclo({...newCiclo, codigo: e.target.value})}
                  placeholder="Ej: CIC-2023-01"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <List className="w-4 h-4"/>
                  Número
                </label>
                <select
                  className="form-select"
                  value={newCiclo.numero}
                  onChange={(e) => setNewCiclo({...newCiclo, numero: e.target.value})}
                >
                  <option value="">Seleccione número</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Users className="w-4 h-4"/>
                  Estudiantes Totales
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={newCiclo.estudiantesTotales}
                  onChange={(e) => setNewCiclo({...newCiclo, estudiantesTotales: e.target.value})}
                  placeholder="Ingrese el total de estudiantes"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label className="form-label">
                  <List className="w-4 h-4"/>
                  Paralelos
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {paralelos.map(paralelo => (
                    <div key={paralelo.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`paralelo-${paralelo.id}`}
                        checked={newCiclo.paralelos.includes(paralelo.id)}
                        onChange={() => handleParaleloChange(paralelo.id)}
                        className="checkbox"
                      />
                      <label htmlFor={`paralelo-${paralelo.id}`} className="ml-2 text-sm">
                        {paralelo.codigo} ({paralelo.letra}) - Ciclo {paralelo.ciclo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>Cancelar</button>
          <button className="primary-button save-btn" onClick={handleSubmit}>
            <Save className="w-4 h-4"/>
            Guardar Ciclo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarCiclo;