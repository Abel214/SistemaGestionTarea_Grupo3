// src/components/admin/Ciclos/ciclos.tsx
import React, {useEffect, useState} from 'react';
import {
    Search, Plus, ChevronDown, ChevronUp, Pencil, Trash2, GraduationCap
} from 'lucide-react';
import axios from 'axios';
import {getCookie} from '../../../utils/cookies';
import ModalAgregarCiclo from './agregarCiclo';
import ModalEditarCiclo from './editarCiclo';

type Ciclo = {
    id: number;
    codigo: string;
    numero: number;
    is_activo: boolean;
    estudiantes_totales: number;
};

const CiclosManager: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCiclos, setSelectedCiclos] = useState<number[]>([]);
    const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({});
    const [closingDropdowns, setClosingDropdowns] = useState<Record<number, boolean>>({});
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentCiclo, setCurrentCiclo] = useState<Ciclo | null>(null);

    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1) Cargar ciclos desde el backend
    useEffect(() => {
        const fetchCiclos = async () => {
            try {
                const csrf = getCookie('csrftoken'); // no hace falta para GET, pero no molesta
                const res = await axios.get<Ciclo[]>('http://localhost:8000/api/tareas/ciclos/', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf ?? '',
                    },
                });
                setCiclos(res.data);
            } catch (e: any) {
                console.error('Error al cargar ciclos:', e);
                setError(e?.response?.data?.detail || 'No se pudieron cargar los ciclos');
            } finally {
                setLoading(false);
            }
        };
        fetchCiclos();
    }, []);

    // Helpers UI
    const toggleDropdown = (id: number) => {
        setOpenDropdowns(prev => ({...prev, [id]: true}));
        setClosingDropdowns(prev => ({...prev, [id]: false}));
    };

    const toggleDropup = (id: number) => {
        setClosingDropdowns(prev => ({...prev, [id]: true}));
        setTimeout(() => {
            setOpenDropdowns(prev => ({...prev, [id]: false}));
            setClosingDropdowns(prev => ({...prev, [id]: false}));
        }, 100);
    };

    const handleCicloSelection = (id: number) => {
        setSelectedCiclos(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        setSelectedCiclos(
            selectedCiclos.length === filteredCiclos.length
                ? []
                : filteredCiclos.map(c => c.id)
        );
    };

    const handleEditCiclo = (ciclo: Ciclo) => {
        setCurrentCiclo(ciclo);
        setEditModal(true);
    };

    const handleChangeCiclo = (field: keyof Ciclo, value: any) => {
        setCurrentCiclo(prev => (prev ? {...prev, [field]: value} : prev));
    };

    const handleSaveChanges = async () => {
        if (!currentCiclo) return;
        try {
            const csrf = getCookie('csrftoken');
            await axios.put(
                `http://localhost:8000/api/tareas/ciclos/${currentCiclo.id}/`,
                currentCiclo,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf ?? '',
                    },
                }
            );
            setCiclos(prev => prev.map(c => (c.id === currentCiclo.id ? currentCiclo : c)));
            setEditModal(false);
        } catch (e) {
            console.error('Error al actualizar ciclo:', e);
            alert('No se pudo actualizar el ciclo');
        }
    };

    const handleDeleteCiclo = async (ciclo: Ciclo) => {
        try {
            const csrf = getCookie('csrftoken');
            await axios.delete(`http://localhost:8000/api/tareas/ciclos/${ciclo.id}/`, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrf ?? '',
                },
            });
            setCiclos(prev => prev.filter(c => c.id !== ciclo.id));
        } catch (e) {
            console.error('Error al eliminar ciclo:', e);
            alert('No se pudo eliminar');
        }
    };

    const handleAddCiclo = async (newCiclo: Omit<Ciclo, 'id'>) => {
        try {
            const csrf = getCookie('csrftoken');
            const res = await axios.post<Ciclo>(
                'http://localhost:8000/api/tareas/ciclos/',
                newCiclo,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrf ?? '',
                    },
                }
            );
            setCiclos(prev => [...prev, res.data]);
            setAddModal(false);
        } catch (e) {
            console.error('Error al crear ciclo:', e);
            alert('No se pudo crear el ciclo');
        }
    };

    // Filtro de búsqueda
    const filteredCiclos = ciclos.filter(c =>
        (c.codigo?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        String(c.numero ?? '').includes(searchQuery)
    );

    if (loading) {
        return <div className="content-card p-6 text-gray-500">Cargando ciclos...</div>;
    }

    if (error) {
        return <div className="content-card p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="content-card">
            <div className="card-header">
                <div className="card-header-content">
                    <div className="header-table-actions">
                        <div className="search-container">
                            <Search className="search-icon"/>
                            <input
                                type="text"
                                placeholder="Buscar ciclos..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="primary-button add-user-button" onClick={() => setAddModal(true)}>
                            <Plus className="w-4 h-4"/> Agregar Ciclo
                        </button>

                        <ModalAgregarCiclo
                            isOpen={addModal}
                            onClose={() => setAddModal(false)}
                            onSave={handleAddCiclo}
                        />
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="user-table">
                    <thead className="table-header">
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedCiclos.length === filteredCiclos.length && filteredCiclos.length > 0}
                                onChange={handleSelectAll}
                                className="checkbox"
                            />
                        </th>
                        <th>Código</th>
                        <th>Número de estudiantes</th>
                        <th>Activo</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    {filteredCiclos.map((ciclo) => (
                        <React.Fragment key={ciclo.id}>
                            <tr className="table-row">
                                <td className="table-cell">
                                    <input
                                        type="checkbox"
                                        checked={selectedCiclos.includes(ciclo.id)}
                                        onChange={() => handleCicloSelection(ciclo.id)}
                                        className="checkbox"
                                    />
                                </td>
                                <td className="table-cell user-name">{ciclo.codigo}</td>
                                <td className="table-cell user-email">{ciclo.estudiantes_totales}</td>
                                <td className="table-cell user-role">{ciclo.is_activo ? 'Sí' : 'No'}</td>
                                <td className="table-cell">
                                    <button
                                        className="user-profile-button"
                                        onClick={() =>
                                            openDropdowns[ciclo.id] ? toggleDropup(ciclo.id) : toggleDropdown(ciclo.id)
                                        }
                                    >
                                        {openDropdowns[ciclo.id] ? (
                                            <ChevronUp className="w-4 h-4"/>
                                        ) : (
                                            <ChevronDown className="w-4 h-4"/>
                                        )}
                                    </button>
                                </td>
                            </tr>

                            {openDropdowns[ciclo.id] && (
                                <tr className="expanded-row">
                                    <td colSpan={5} className="expanded-cell">
                                        <div
                                            className={`dropdown-card-inline ${closingDropdowns[ciclo.id] ? 'closing' : ''}`}>
                                            <div className="dropdown-header">
                                                <div className="user-avatar-large">
                                                    <GraduationCap className="w-8 h-8 text-blue-600"/>
                                                </div>
                                                <div className="user-details-single">
                                                    <h3 className="user-full-name-dropdown">
                                                        Ciclo {ciclo.numero} - {ciclo.codigo}
                                                    </h3>
                                                    <div className="user-info-grid">
                                                        <p className="user-email-dropdown">
                                                            <span className="label">Código: </span>{ciclo.codigo}
                                                        </p>
                                                        <p className="user-role-dropdown">
                                                            <span className="label">Número de estudiantes: </span>{ciclo.estudiantes_totales}
                                                        </p>
                                                        <p className="user-cycle-dropdown">
                                                            <span
                                                                className="label">Activo: </span>{ciclo.is_activo ? 'Sí' : 'No'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="dropdown-content">
                                                <button
                                                    className="primary-button edit-user-btn"
                                                    onClick={() => handleEditCiclo(ciclo)}
                                                >
                                                    <Pencil className="w-4 h-4"/> Editar
                                                </button>
                                                <button
                                                    className="primary-button unsubscribe-user-btn"
                                                    onClick={() => handleDeleteCiclo(ciclo)}
                                                >
                                                    <Trash2 className="w-4 h-4"/> Eliminar
                                                </button>
                                            </div>

                                            <ModalEditarCiclo
                                                isOpen={editModal}
                                                ciclo={currentCiclo}
                                                onClose={() => setEditModal(false)}
                                                onChange={handleChangeCiclo}
                                                onSave={handleSaveChanges} paralelos={undefined}                                            />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredCiclos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No se encontraron ciclos que coincidan con la búsqueda.
                </div>
            )}
        </div>
    );
};

export default CiclosManager;
