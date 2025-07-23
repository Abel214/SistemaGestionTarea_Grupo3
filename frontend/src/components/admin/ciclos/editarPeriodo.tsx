import React, {useEffect, useState} from 'react';
import {X, Save, Calendar, GraduationCap} from 'lucide-react';
import axios from 'axios';
import {getCookie} from '../../../utils/cookies';

type Ciclo = { id: number; codigo: string; numero: number };
type Periodo = {
    id: number;
    ciclo: number;
    periodo_inicio: string;
    periodo_fin: string;
};
type Props = {
    isOpen: boolean;
    periodo: Periodo | null;
    onClose: () => void;
    onSaved: (p: Periodo) => void;
};

const ModalEditarPeriodo: React.FC<Props> = ({isOpen, periodo, onClose, onSaved}) => {
    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [form, setForm] = useState<Periodo | null>(periodo);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setForm(periodo);
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
    }, [isOpen, periodo]);

    const handleChange = (field: keyof Periodo, value: any) =>
        setForm(prev => (prev ? {...prev, [field]: value} : prev));

    const handleSave = async () => {
        if (!form) return;
        setSaving(true);
        try {
            const csrf = getCookie('csrftoken');
            const res = await axios.put<Periodo>(
                `http://127.0.0.1:8000/api/tareas/periodos/${form.id}/`,
                form,
                {
                    withCredentials: true,
                    headers: {'X-CSRFToken': csrf ?? ''},
                }
            );
            onSaved(res.data);
            onClose();
        } catch (e) {
            console.error('Error actualizando periodo', e);
            alert('No se pudo actualizar');
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen || !form) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">
                        <Calendar className="w-5 h-5"/> Editar Período
                    </h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="edit-form">
                        <div className="form-group">
                            <label className="form-label">
                                <GraduationCap className="w-4 h-4"/> Ciclo
                            </label>
                            <select
                                className="form-select"
                                value={form.ciclo}
                                onChange={e => handleChange('ciclo', Number(e.target.value))}
                            >
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
                                    <Calendar className="w-4 h-4"/> Inicio
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
                                    <Calendar className="w-4 h-4"/> Fin
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
                        <Save className="w-4 h-4"/> Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarPeriodo;
