import React, { useState } from 'react';
import {
  Search, Plus, ChevronDown, ChevronUp, Pencil,
  Trash2, BookOpen, Calendar, User, Clock
} from 'lucide-react';
import ModalAgregarMateria from "./agregarMateria";
import ModalEditarMateria from "./editarmateria";

const AsignaturasManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsignaturas, setSelectedAsignaturas] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [closingDropdowns, setClosingDropdowns] = useState({});
  const [addModal, setAddModal] = useState(false);
const handleEditMateria = (materia) => {
  setCurrentMateria(materia);
  setEditModal(true);
};

const handleChangeMateria = (field, value) => {
  setCurrentMateria(prev => ({ ...prev, [field]: value }));
};

const handleSaveChanges = () => {
  // Aquí iría la lógica para guardar los cambios
  console.log('Guardando cambios:', currentMateria);
  setEditModal(false);
};
  const [editModal, setEditModal] = useState(false);
  const [currentMateria, setCurrentMateria] = useState(null);
  const [newMateria, setNewMateria] = useState({
  nombre: '',
  codigo: '',
  profesor: '',
  ciclo: '',
  paralelo: '',
  duracionUnidad: '',
  horasProgramadas: '',
  modalidad: '',
  horario: '',
  descripcion: ''
});
  // Datos de ejemplo para asignaturas
  const asignaturas = [
    {
      id: 1,
      nombre: 'Matemáticas Básicas',
      codigo: 'MAT101',
      profesor: 'Dr. Juan Pérez',
      ciclo: 1,
      paralelo: 'A',
      duracionUnidad: '16 semanas',
      horasProgramadas: '64 horas',
      modalidad: 'Presencial',
      horario: 'Lun-Mie-Vie 08:00-10:00',
      descripcion: 'Fundamentos de matemáticas para ingeniería'
    },
    {
      id: 2,
      nombre: 'Programación I',
      codigo: 'PRG101',
      profesor: 'Ing. María García',
      ciclo: 1,
      paralelo: 'B',
      duracionUnidad: '16 semanas',
      horasProgramadas: '80 horas',
      modalidad: 'Presencial',
      horario: 'Mar-Jue 10:00-12:00',
      descripcion: 'Introducción a la programación con Python'
    },
    {
      id: 3,
      nombre: 'Base de Datos',
      codigo: 'BDD201',
      profesor: 'Ing. Carlos López',
      ciclo: 3,
      paralelo: 'A',
      duracionUnidad: '16 semanas',
      horasProgramadas: '64 horas',
      modalidad: 'Virtual',
      horario: 'Lun-Mie 14:00-16:00',
      descripcion: 'Diseño y administración de bases de datos relacionales'
    },
    {
      id: 4,
      nombre: 'Redes de Computadores',
      codigo: 'RED301',
      profesor: 'Ing. Ana Martínez',
      ciclo: 5,
      paralelo: 'A',
      duracionUnidad: '16 semanas',
      horasProgramadas: '64 horas',
      modalidad: 'Híbrida',
      horario: 'Mar-Jue 16:00-18:00',
      descripcion: 'Fundamentos de redes y protocolos de comunicación'
    },
    {
      id: 5,
      nombre: 'Ingeniería de Software',
      codigo: 'IDS401',
      profesor: 'Dr. Roberto Silva',
      ciclo: 7,
      paralelo: 'A',
      duracionUnidad: '16 semanas',
      horasProgramadas: '80 horas',
      modalidad: 'Presencial',
      horario: 'Lun-Mie-Vie 10:00-12:00',
      descripcion: 'Metodologías y procesos de desarrollo de software'
    }
  ];

  const toggleDropdown = (asignaturaId) => {
    setOpenDropdowns(prev => ({ ...prev, [asignaturaId]: true }));
    setClosingDropdowns(prev => ({ ...prev, [asignaturaId]: false }));
  };

  const toggleDropup = (asignaturaId) => {
    setClosingDropdowns(prev => ({ ...prev, [asignaturaId]: true }));
    setTimeout(() => {
      setOpenDropdowns(prev => ({ ...prev, [asignaturaId]: false }));
      setClosingDropdowns(prev => ({ ...prev, [asignaturaId]: false }));
    }, 100);
  };

  const handleAsignaturaSelection = (asignaturaId) => {
    setSelectedAsignaturas(prev =>
      prev.includes(asignaturaId) ? prev.filter(id => id !== asignaturaId) : [...prev, asignaturaId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAsignaturas(selectedAsignaturas.length === asignaturas.length ? [] : asignaturas.map(a => a.id));
  };

  const handleEditAsignatura = (asignatura) => {
    console.log('Editar asignatura:', asignatura);
    // Aquí implementarías la lógica para abrir el modal de edición
  };

  const handleDeleteAsignatura = (asignatura) => {
    console.log('Eliminar asignatura:', asignatura);
    // Aquí implementarías la lógica para eliminar la asignatura
  };

  // Filtrar asignaturas basado en la búsqueda
  const filteredAsignaturas = asignaturas.filter(asignatura =>
    asignatura.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asignatura.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asignatura.profesor.toLowerCase().includes(searchQuery.toLowerCase())
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
                        placeholder="Buscar asignaturas..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="primary-button add-user-button" onClick={() => setAddModal(true)}>
                    <Plus className="w-4 h-4"/> Agregar Materia
                </button>
                <ModalAgregarMateria
                    isOpen={addModal}
                    onClose={() => setAddModal(false)}
                    newMateria={newMateria}
                    setNewMateria={setNewMateria}
                    onSave={() => {
                        console.log('Usuario creado:', newMateria);
                        setAddModal(false);
                    }}
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
                      checked={selectedAsignaturas.length === filteredAsignaturas.length}
                      onChange={handleSelectAll}
                      className="checkbox"
                  />
              </th>
              <th>Nombre de Asignatura</th>
              <th>Profesor</th>
              <th>Ciclo</th>
              <th>Paralelo</th>
              <th>Duración Unidad</th>
              <th>Horas Programadas</th>
              <th></th>
          </tr>
          </thead>
          <tbody className="table-body">
            {filteredAsignaturas.map((asignatura) => (
              <React.Fragment key={asignatura.id}>
                <tr className="table-row">
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={selectedAsignaturas.includes(asignatura.id)}
                      onChange={() => handleAsignaturaSelection(asignatura.id)}
                      className="checkbox"
                    />
                  </td>
                  <td className="table-cell user-name">{asignatura.nombre}</td>
                  <td className="table-cell user-email">{asignatura.profesor}</td>
                  <td className="table-cell user-role">{asignatura.ciclo}</td>
                  <td className="table-cell user-status">{asignatura.paralelo}</td>
                  <td className="table-cell user-status">{asignatura.duracionUnidad}</td>
                    <td className="table-cell user-status">{asignatura.horasProgramadas}</td>
                  <td className="table-cell">
                    <button
                      className="user-profile-button"
                      onClick={() => openDropdowns[asignatura.id] ? toggleDropup(asignatura.id) : toggleDropdown(asignatura.id)}
                    >
                      {openDropdowns[asignatura.id] ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </button>
                  </td>
                </tr>
                {openDropdowns[asignatura.id] && (
                  <tr className="expanded-row">
                    <td colSpan="7" className="expanded-cell">
                      <div className={`dropdown-card-inline ${closingDropdowns[asignatura.id] ? 'closing' : ''}`}>
                        <div className="dropdown-header">
                          <div className="user-avatar-large">
                            <BookOpen className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="user-details-single">
                            <h3 className="user-full-name-dropdown">{asignatura.nombre}</h3>
                              <div className="user-info-grid">
                                  <p className="user-email-dropdown">
                                      <span className='label'>Código: </span>{asignatura.codigo}
                                  </p>
                                  <p className="user-role-dropdown">
                                      <span className='label'>Paralelo: </span>{asignatura.paralelo}
                                  </p>
                                  <p className="user-cycle-dropdown">
                                      <span className='label'>Ciclo: </span>{asignatura.ciclo}
                                  </p>
                                  <p className='user-phone-dropdown'>
                                      <span className='label'>Profesor: </span>{asignatura.profesor}
                                  </p>
                                  <p className='user-birthdate-dropdown'>
                                      <span className='label'>Modalidad: </span>{asignatura.modalidad}
                                  </p>
                                  <p className='user-birthdate-dropdown'>
                                      <span className='label'>Horario: </span>{asignatura.horario}
                                  </p>
                                  <p className='user-birthdate-dropdown'>
                                      <span
                                          className='label'>Descripción: </span>{asignatura.descripcion || 'No disponible'}
                                  </p>
                                  <p className='user-birthdate-dropdown'>
                                      <span className='label'>Horas programadas: </span>{asignatura.horasProgramadas}
                                  </p>
                                  <p className='user-birthdate-dropdown'>
                                      <span className='label'>Duracion Unidad: </span>{asignatura.duracionUnidad}
                                  </p>
                              </div>
                          </div>
                        </div>
                        <div className="dropdown-content">
                          <button
                              className="primary-button edit-user-btn"
                              onClick={() => handleEditMateria(asignatura)}
                          >
                            <Pencil className="w-4 h-4"/> Editar
                          </button>
                          <button
                              className="primary-button unsubscribe-user-btn"
                              onClick={() => handleDeleteAsignatura(asignatura)}
                          >
                            <Trash2 className="w-4 h-4"/> Eliminar
                          </button>
                        </div>
                        <ModalEditarMateria
                            isOpen={editModal}
                            materia={currentMateria}
                            onClose={() => setEditModal(false)}
                          onChange={handleChangeMateria}
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
      {filteredAsignaturas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron asignaturas que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
};

export default AsignaturasManager;