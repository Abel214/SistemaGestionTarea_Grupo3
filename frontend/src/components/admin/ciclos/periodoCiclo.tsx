import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {getCookie} from '../../../utils/cookies';
import {Plus, Save, X} from 'lucide-react';

type Ciclo = { id: number; nombre: string; codigo: string };
type Periodo = { id: number; ciclo: number; periodo_inicio: string; periodo_fin: string };

const PeriodosManager: React.FC = () => {
    const [periodos, setPeriodos] = useState<Periodo[]>([]);
    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nuevo, setNuevo] = useState<{ ciclo: string; inicio: string; fin: string }>({
        ciclo: '',
        inicio: '',
        fin: ''
    });

    const loadData = async () => {
        try {
            setLoading(true);
            // Asegura la cookie CSRF y sesión
            await axios.get('http://localhost:8000/api/tareas/csrf-cookie/', {withCredentials: true}).catch(() => {
            });
            const [pRes, cRes] = await Promise.all([
                axios.get('http://localhost:8000/api/tareas/periodos/', {withCredentials: true}),
                axios.get('http://localhost:8000/api/tareas/ciclos/', {withCredentials: true})
            ]);
            setPeriodos(pRes.data);
            setCiclos(cRes.data);
        } catch (e) {
            console.error('Error cargando periodos/ciclos:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async () => {
        try {
            const csrf = getCookie('csrftoken') ?? '';
            await axios.post(
                'http://localhost:8000/api/tareas/periodos/',
                {
                    ciclo: Number(nuevo.ciclo),
                    periodo_inicio: nuevo.inicio,
                    periodo_fin: nuevo.fin
                },
                {headers: {'X-CSRFToken': csrf}, withCredentials: true}
            );
            setShowModal(false);
            setNuevo({ciclo: '', inicio: '', fin: ''});
            loadData();
        } catch (e) {
            console.error('Error creando período:', e);
            alert('No se pudo crear el período');
        }
    };

    const cicloNombre = (id: number) => ciclos.find(c => c.id === id)?.nombre ?? '-';

    return (
        <div className="content-card">
            <div className="card-header">
                <div className="card-header-content">
                    <h2>Gestor de Períodos</h2>
                    <div>
                        <button className="primary-button add-user-button" onClick={() => setShowModal(true)}>
                            <Plus className="w-4 h-4"/> Nuevo Período
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <table className="user-table">
                        <thead className="table-header">
                        <tr>
                            <th>ID</th>
                            <th>Ciclo</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {periodos.map(p => (
                            <tr className="table-row" key={p.id}>
                                <td className="table-cell">{p.id}</td>
                                <td className="table-cell">{cicloNombre(p.ciclo)}</td>
                                <td className="table-cell">{p.periodo_inicio}</td>
                                <td className="table-cell">{p.periodo_fin}</td>
                            </tr>
                        ))}
                        {!periodos.length && (
                            <tr>
                                <td colSpan={4} style={{textAlign: 'center', padding: '1rem'}}>
                                    No hay períodos
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 className="modal-title">
                                <Plus className="w-5 h-5"/> Nuevo Período
                            </h2>
                            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Ciclo</label>
                                        <select
                                            className="form-select"
                                            value={nuevo.ciclo}
                                            onChange={e => setNuevo({...nuevo, ciclo: e.target.value})}
                                        >
                                            <option value="">Seleccione ciclo</option>
                                            {ciclos.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.nombre} ({c.codigo})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Inicio</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={nuevo.inicio}
                                            onChange={e => setNuevo({...nuevo, inicio: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Fin</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={nuevo.fin}
                                            onChange={e => setNuevo({...nuevo, fin: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="secondary-button" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button className="primary-button save-btn" onClick={handleSave}>
                                <Save className="w-4 h-4"/> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeriodosManager;
