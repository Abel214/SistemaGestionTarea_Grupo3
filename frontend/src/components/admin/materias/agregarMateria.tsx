import React, {useEffect, useState} from 'react';
import {BookOpen, X, Calendar, Clock, Save, ToggleLeft} from 'lucide-react';
import axios from 'axios';
import {message} from 'antd';
import {getCookie} from '../../../utils/cookies';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void; // para refrescar la lista en el padre
};

type Periodo = {
    id: number;
    ciclo: string;          // ajusta según lo que devuelva tu API
    periodo_inicio: string; // ISO date
    periodo_fin: string;    // ISO date
};

type FormState = {
    codigo: string;
    nombre: string;
    descripcion: string;
    periodo: number | '';
    unidades_totales: number | '';
    horas_programadas: number | '';
    is_activa: boolean;
};

const ModalAgregarAsignatura: React.FC<Props> = ({isOpen, onClose, onCreated}) => {
    const [form, setForm] = useState<FormState>({
        codigo: '',
        nombre: '',
        descripcion: '',
        periodo: '',
        unidades_totales: '',
        horas_programadas: '',
        is_activa: true,
    });

    const [periodos, setPeriodos] = useState<Periodo[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const loadPeriodos = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tareas/periodos/', {
                    withCredentials: true,
                    headers: {'X-CSRFToken': getCookie('csrftoken') ?? ''},
                });
                setPeriodos(res.data);
            } catch (e) {
                console.error(e);
                message.error('No se pudieron cargar los períodos');
            }
        };

        loadPeriodos();
    }, [isOpen]);

    const handleChange = (key: keyof FormState, value: any) =>
        setForm(prev => ({...prev, [key]: value}));

    const handleSave = async () => {
        if (!form.codigo || !form.nombre || !form.periodo) {
            message.warning('Código, Nombre y Período son obligatorios');
            return;
        }

        const payload = {
            codigo: form.codigo,
            nombre: form.nombre,
            descripcion: form.descripcion,
            periodo: form.periodo, // id del PeriodoCiclo
            unidades_totales: form.unidades_totales === '' ? null : Number(form.unidades_totales),
            horas_programadas: form.horas_programadas === '' ? null : Number(form.horas_programadas),
            is_activa: form.is_activa,
        };

        try {
            setSaving(true);
            await axios.post('http://127.0.0.1:8000/api/tareas/asignaturas/', payload, {
                withCredentials: true,
                headers: {'X-CSRFToken': getCookie('csrftoken') ?? ''},
            });
            message.success('Asignatura creada');
            // limpiar y cerrar
            setForm({
                codigo: '',
                nombre: '',
                descripcion: '',
                periodo: '',
                unidades_totales: '',
                horas_programadas: '',
                is_activa: true,
            });
            onCreated();
            onClose();
        } catch (e: any) {
            console.error(e);
            message.error('Error al crear la asignatura');
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
                        <BookOpen className="w-5 h-5"/> Agregar Asignatura
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
                                    <BookOpen className="w-4 h-4"/> Código *
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={form.codigo}
                                    onChange={e => handleChange('codigo', e.target.value)}
                                    placeholder="Código único"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <BookOpen className="w-4 h-4"/> Nombre *
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={form.nombre}
                                    onChange={e => handleChange('nombre', e.target.value)}
                                    placeholder="Nombre de la asignatura"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    <Calendar className="w-4 h-4"/> Período *
                                </label>
                                <select
                                    className="form-select"
                                    value={form.periodo}
                                    onChange={e => handleChange('periodo', Number(e.target.value))}
                                >
                                    <option value="">Seleccione período</option>
                                    {periodos.map(p => (
                                        <option key={p.id} value={p.id}>
                                            {p.ciclo} ({p.periodo_inicio} - {p.periodo_fin})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <ToggleLeft className="w-4 h-4"/> Activa
                                </label>
                                <input
                                    type="checkbox"
                                    checked={form.is_activa}
                                    onChange={e => handleChange('is_activa', e.target.checked)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    <Clock className="w-4 h-4"/> Unidades totales
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    className="form-input"
                                    value={form.unidades_totales}
                                    onChange={e => handleChange('unidades_totales', e.target.value)}
                                    placeholder="Ej: 5"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Clock className="w-4 h-4"/> Horas programadas
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    className="form-input"
                                    value={form.horas_programadas}
                                    onChange={e => handleChange('horas_programadas', e.target.value)}
                                    placeholder="Ej: 64"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group full-width">
                                <label className="form-label">
                                    <BookOpen className="w-4 h-4"/> Descripción
                                </label>
                                <textarea
                                    className="form-textarea"
                                    rows={3}
                                    value={form.descripcion}
                                    onChange={e => handleChange('descripcion', e.target.value)}
                                    placeholder="Descripción de la asignatura"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="secondary-button" onClick={onClose}>Cancelar</button>
                    <button className="primary-button save-btn" onClick={handleSave} disabled={saving}>
                        <Save className="w-4 h-4"/> {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarAsignatura;
