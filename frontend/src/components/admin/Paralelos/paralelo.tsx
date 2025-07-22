import React, { useState } from 'react';
import {
  Search, Plus, ChevronDown, ChevronUp, Pencil,
  Trash2, Layers, BookOpen, User, Users, GraduationCap
} from 'lucide-react';
import ModalAgregarParalelo from "./agregarParalelo";
import ModalEditarParalelo from "./editarParalelo";

const ParalelosManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParalelos, setSelectedParalelos] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [closingDropdowns, setClosingDropdowns] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentParalelo, setCurrentParalelo] = useState(null);

  // Datos de ejemplo para materias (deberían venir del componente Materia)
  const materias = [
    { id: 1, nombre: 'Matemáticas Básicas', codigo: 'MAT101', ciclo: 1 },
    { id: 2, nombre: 'Programación I', codigo: 'PRG101', ciclo: 1 },
    { id: 3, nombre: 'Base de Datos', codigo: 'BDD201', ciclo: 3 },
    { id: 4, nombre: 'Redes de Computadores', codigo: 'RED301', ciclo: 5 },
    { id: 5, nombre: 'Ingeniería de Software', codigo: 'IDS401', ciclo: 7 }
  ];

  // Datos de ejemplo para docentes (deberían venir del componente Usuarios con rol docente)
  const docentes = [
    { id: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Matemáticas' },
    { id: 2, nombre: 'Ing. María García', especialidad: 'Programación' },
    { id: 3, nombre: 'Ing. Carlos López', especialidad: 'Bases de Datos' },
    { id: 4, nombre: 'Ing. Ana Martínez', especialidad: 'Redes' },
    { id: 5, nombre: 'Dr. Roberto Silva', especialidad: 'Ingeniería de Software' }
  ];

  // Datos de ejemplo para paralelos
  const [paralelos, setParalelos] = useState([
    {
      id: 1,
      codigo: 'PAR-2023-001',
      letra: 'A',
      ciclo: 1,
      cupoTotal: 30,
      cupoOcupado: 28,
      materias: [1, 2], // IDs de materias
      docentes: [1, 2], // IDs de docentes
      estado: 'Activo'
    },
    {
      id: 2,
      codigo: 'PAR-2023-002',
      letra: 'B',
      ciclo: 1,
      cupoTotal: 25,
      cupoOcupado: 22,
      materias: [1, 2],
      docentes: [1, 2],
      estado: 'Activo'
    },
    {
      id: 3,
      codigo: 'PAR-2023-003',
      letra: 'A',
      ciclo: 3,
      cupoTotal: 20,
      cupoOcupado: 18,
      materias: [3],
      docentes: [3],
      estado: 'Activo'
    },
    {
      id: 4,
      codigo: 'PAR-2023-004',
      letra: 'A',
      ciclo: 5,
      cupoTotal: 25,
      cupoOcupado: 20,
      materias: [4],
      docentes: [4],
      estado: 'Activo'
    },
    {
      id: 5,
      codigo: 'PAR-2023-005',
      letra: 'A',
      ciclo: 7,
      cupoTotal: 30,
      cupoOcupado: 25,
      materias: [5],
      docentes: [5],
      estado: 'Activo'
    }
  ]);

  // Funciones auxiliares para obtener nombres de materias y docentes
  const getNombresMaterias = (ids) => {
    return materias
      .filter(materia => ids.includes(materia.id))
      .map(materia => `${materia.codigo} - ${materia.nombre}`);
  };

  const getNombresDocentes = (ids) => {
    return docentes
      .filter(docente => ids.includes(docente.id))
      .map(docente => docente.nombre);
  };

  const toggleDropdown = (paraleloId) => {
    setOpenDropdowns(prev => ({ ...prev, [paraleloId]: true }));
    setClosingDropdowns(prev => ({ ...prev, [paraleloId]: false }));
  };

  const toggleDropup = (paraleloId) => {
    setClosingDropdowns(prev => ({ ...prev, [paraleloId]: true }));
    setTimeout(() => {
      setOpenDropdowns(prev => ({ ...prev, [paraleloId]: false }));
      setClosingDropdowns(prev => ({ ...prev, [paraleloId]: false }));
    }, 100);
  };

  const handleParaleloSelection = (paraleloId) => {
    setSelectedParalelos(prev =>
      prev.includes(paraleloId) ? prev.filter(id => id !== paraleloId) : [...prev, paraleloId]
    );
  };

  const handleSelectAll = () => {
    setSelectedParalelos(selectedParalelos.length === paralelos.length ? [] : paralelos.map(p => p.id));
  };

  const handleEditParalelo = (paralelo) => {
    setCurrentParalelo(paralelo);
    setEditModal(true);
  };

  const handleChangeParalelo = (field, value) => {
    setCurrentParalelo(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Actualizar el paralelo en el estado
    setParalelos(prev =>
      prev.map(p => p.id === currentParalelo.id ? currentParalelo : p)
    );
    setEditModal(false);
  };

  const handleDeleteParalelo = (paralelo) => {
    setParalelos(prev => prev.filter(p => p.id !== paralelo.id));
  };

  const handleAddParalelo = (newParalelo) => {
    const newId = Math.max(...paralelos.map(p => p.id), 0) + 1;
    setParalelos(prev => [...prev, { ...newParalelo, id: newId }]);
    setAddModal(false);
  };

  // Filtrar paralelos basado en la búsqueda
  const filteredParalelos = paralelos.filter(paralelo =>
    paralelo.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paralelo.letra.toLowerCase().includes(searchQuery.toLowerCase()) ||
    materias.some(m =>
      paralelo.materias.includes(m.id) &&
      m.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="content-card">
      <div className="card-header">
        <div className="card-header-content">
          <div className="header-table-actions">
            <div className="search-container">
              <Search className="search-icon"/>
              <input
                type="text"
                placeholder="Buscar paralelos..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="primary-button add-user-button" onClick={() => setAddModal(true)}>
              <Plus className="w-4 h-4"/> Agregar Paralelo
            </button>
            <ModalAgregarParalelo
              isOpen={addModal}
              onClose={() => setAddModal(false)}
              materias={materias}
              docentes={docentes}
              onSave={handleAddParalelo}
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
                  checked={selectedParalelos.length === filteredParalelos.length}
                  onChange={handleSelectAll}
                  className="checkbox"
                />
              </th>
              <th>Código Paralelo</th>
              <th>Letra</th>
              <th>Ciclo</th>
              <th>Cupo Total</th>
              <th>Cupo Ocupado</th>
              <th>Disponibilidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredParalelos.map((paralelo) => (
              <React.Fragment key={paralelo.id}>
                <tr className="table-row">
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedParalelos.includes(paralelo.id)}
                      onChange={() => handleParaleloSelection(paralelo.id)}
                      className="checkbox"
                    />
                  </td>
                  <td className="table-cell user-name">{paralelo.codigo}</td>
                  <td className="table-cell user-email">{paralelo.letra}</td>
                  <td className="table-cell user-role">{paralelo.ciclo}</td>
                  <td className="table-cell user-status">{paralelo.cupoTotal}</td>
                  <td className="table-cell user-status">{paralelo.cupoOcupado}</td>
                  <td className="table-cell user-status">
                    {paralelo.cupoTotal - paralelo.cupoOcupado} disponibles
                  </td>
                  <td className="table-cell">
                    <button
                      className="user-profile-button"
                      onClick={() => openDropdowns[paralelo.id] ? toggleDropup(paralelo.id) : toggleDropdown(paralelo.id)}
                    >
                      {openDropdowns[paralelo.id] ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </button>
                  </td>
                </tr>
                {openDropdowns[paralelo.id] && (
                  <tr className="expanded-row">
                    <td colSpan="7" className="expanded-cell">
                      <div className={`dropdown-card-inline ${closingDropdowns[paralelo.id] ? 'closing' : ''}`}>
                        <div className="dropdown-header">
                          <div className="user-avatar-large">
                            <Layers className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="user-details-single">
                            <h3 className="user-full-name-dropdown">
                              Paralelo {paralelo.letra} - Código: {paralelo.codigo}
                            </h3>
                            <div className="user-info-grid">
                              <p className="user-email-dropdown">
                                <span className='label'>Ciclo: </span>{paralelo.ciclo}
                              </p>
                              <p className="user-role-dropdown">
                                <span className='label'>Estado: </span>{paralelo.estado}
                              </p>
                              <p className="user-cycle-dropdown">
                                <span className='label'>Cupo Total: </span>{paralelo.cupoTotal}
                              </p>
                              <p className='user-phone-dropdown'>
                                <span className='label'>Cupo Ocupado: </span>{paralelo.cupoOcupado}
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Disponibilidad: </span>
                                {paralelo.cupoTotal - paralelo.cupoOcupado} cupos disponibles
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Letra: </span>
                                {paralelo.letra}
                              </p>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  <User className="inline w-4 h-4 mr-1"/>
                                  Docentes asignados:
                                </h4>
                                <ul className="list-disc pl-5">
                                  {getNombresDocentes(paralelo.docentes).map((docente, index) => (
                                      <li key={index} className="text-sm">{docente}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                  <BookOpen className="inline w-4 h-4 mr-1"/>
                                  Materias en este paralelo:
                                </h4>
                                <ul className="list-disc pl-5">
                                  {getNombresMaterias(paralelo.materias).map((materia, index) => (
                                      <li key={index} className="text-sm">{materia}</li>
                                  ))}
                                </ul>
                              </div>


                            </div>
                          </div>
                        </div>
                        <div className="dropdown-content">
                          <button
                              className="primary-button edit-user-btn"
                              onClick={() => handleEditParalelo(paralelo)}
                          >
                            <Pencil className="w-4 h-4"/> Editar
                          </button>
                          <button
                              className="primary-button unsubscribe-user-btn"
                              onClick={() => handleDeleteParalelo(paralelo)}
                          >
                            <Trash2 className="w-4 h-4"/> Eliminar
                          </button>
                        </div>
                        <ModalEditarParalelo
                          isOpen={editModal}
                          paralelo={currentParalelo}
                          materias={materias}
                          docentes={docentes}
                          onClose={() => setEditModal(false)}
                          onChange={handleChangeParalelo}
                          onSave={handleSaveChanges}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredParalelos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron paralelos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
};

export default ParalelosManager;