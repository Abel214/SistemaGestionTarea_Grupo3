// src/components/admin/Ciclos/agregarCiclo.tsx
import React, {useState} from 'react';
import axios from 'axios';
import {X, Save, Hash, ListOrdered, Users, CheckCircle} from 'lucide-react';
import {getCookie} from '../../../utils/cookies';

interface ModalAgregarCicloProps {
    isOpen: boolean;
    onClose: () => void;
    onCicloCreated?: () => void; // callback para refrescar la lista en el padre
}

interface CicloForm {
    codigo: string;
    numero: string;
    nombre: string;
    estudiantes_totales: string;
    is_activo: boolean;
}

const ModalAgregarCiclo: React.FC<ModalAgregarCicloProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onCicloCreated,
                                                             }) => {
    if (!isOpen) return null;

    const [form, setForm] = useState<CicloForm>({
        codigo: '',
        numero: '',
        nombre: '',
        estudiantes_totales: '',
        is_activo: false,
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (field: keyof CicloForm, value: string | boolean) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSave = async () => {
        try {
            // Validaciones básicas
            if (!form.codigo.trim() || !form.numero.trim() || !form.nombre.trim()) {
                alert('Código, número y nombre son obligatorios.');
                return;
            }

            setSaving(true);

            const csrfToken = getCookie('csrftoken');

            await axios.post(
                'http://localhost:8000/api/tareas/ciclos/',
                {
                    codigo: form.codigo.trim(),
                    numero: Number(form.numero),
                    nombre: form.nombre.trim(),
                    estudiantes_totales: form.estudiantes_totales
                        ? Number(form.estudiantes_totales)
                        : null,
                    is_activo: form.is_activo,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken ?? '',
                    },
                    withCredentials: true,
                }
            );

            alert('✅ Ciclo creado correctamente');
            onClose();
            onCicloCreated && onCicloCreated();
        } catch (error: any) {
            console.error('❌ Error al crear ciclo:', error);
            let msg = 'Error inesperado al crear el ciclo.';
            if (error.response?.data) {
                const data = error.response.data;
                msg =
                    Object.entries(data)
                        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
                        .join('\n') || msg;
            }
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">
                        <Hash className="w-5 h-5"/> Agregar Ciclo
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
                                    <Hash className="w-4 h-4"/> Código
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={form.codigo}
                                    onChange={(e) => handleChange('codigo', e.target.value)}
                                    placeholder="Ej: C1-2025A"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <ListOrdered className="w-4 h-4"/> Número
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={form.numero}
                                    onChange={(e) => handleChange('numero', e.target.value)}
                                    placeholder="1"
                                    min={1}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    <CheckCircle className="w-4 h-4"/> Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={form.nombre}
                                    onChange={(e) => handleChange('nombre', e.target.value)}
                                    placeholder="Primer Ciclo"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Users className="w-4 h-4"/> Estudiantes Totales (opcional)
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={form.estudiantes_totales}
                                    onChange={(e) =>
                                        handleChange('estudiantes_totales', e.target.value)
                                    }
                                    placeholder="100"
                                    min={0}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label className="form-label">
                                    <CheckCircle className="w-4 h-4"/> Activo
                                </label>
                                <input
                                    type="checkbox"
                                    checked={form.is_activo}
                                    onChange={(e) => handleChange('is_activo', e.target.checked)}
                                    className="checkbox"
                                    style={{width: '18px', height: '18px'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="secondary-button" onClick={onClose} disabled={saving}>
                        Cancelar
                    </button>
                    <button
                        className="primary-button save-btn"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        <Save className="w-4 h-4"/> {saving ? 'Guardando...' : 'Guardar Ciclo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAgregarCiclo;
