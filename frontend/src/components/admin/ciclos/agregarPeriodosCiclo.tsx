import React, { useEffect, useState } from 'react';
import { X, Save, Calendar, GraduationCap } from 'lucide-react';
import axios from 'axios';
import { getCookie } from '../../../utils/cookies';

type Ciclo = { id: number; codigo: string; numero: number };
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // recargar lista
};

const ModalAgregarPeriodo: React.FC<Props> = ({ isOpen, onClose, onSaved }) => {
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [form, setForm] = useState({
    ciclo: '',
    periodo_inicio: '',
    periodo_fin: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const fetchCiclos = async () => {
      try {
        const res = await axios.get<Ciclo[]>('http://127.0.0.1:8000/api/tareas/ciclos/', {
          withCredentials: true,
        });
        setCiclos(res.data);
      } catch (e) {
        console.error('Error cargando ciclos', e);
      }
    };
    fetchCiclos();
  }, [isOpen]);

  const handleChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.ciclo || !form.periodo_inicio || !form.periodo_fin) {
      alert('Completa todos los campos');
      return;
    }
    setSaving(true);
    try {
      const csrf = getCookie('csrftoken');
      await axios.post(
        'http://127.0.0.1:8000/api/tareas/periodos/',
        {
          ciclo: Number(form.ciclo),
          periodo_inicio: form.periodo_inicio,
          periodo_fin: form.periodo_fin,
        },
        {
          withCredentials: true,
          headers: { 'X-CSRFToken': csrf ?? '' },
        }
      );
      onSaved();
      onClose();
    } catch (e) {
      console.error('Error creando periodo', e);
      alert('No se pudo crear el período');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">
            <Calendar className="w-5 h-5" /> Agregar Período del Ciclo
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-body">
          <div className="edit-form">
            <div className="form-group">
              <label className="form-label">
                <GraduationCap className="w-4 h-4" /> Ciclo
              </label>
              <select
                className="form-select"
                value={form.ciclo}
                onChange={e => handleChange('ciclo', e.target.value)}
              >
                <option value="">Seleccione un ciclo</option>
                {ciclos.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.codigo} (#{c.numero})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" /> Inicio
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={form.periodo_inicio}
                  onChange={e => handleChange('periodo_inicio', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar className="w-4 h-4" /> Fin
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={form.periodo_fin}
                  onChange={e => handleChange('periodo_fin', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button className="primary-button save-btn" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarPeriodo;
