import React, { useState } from 'react';
import {
  Search, Plus, ChevronDown, ChevronUp, Pencil,
  Trash2, Layers, Calendar, User, Clock, BookOpen
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

  const [newParalelo, setNewParalelo] = useState({
    letra: '',
    materia: '',
    profesor: '',
    horario: '',
    aula: '',
    cupo: '',
    estudiantesInscritos: '',
    estado: 'Activo'
  });

  // Datos de ejemplo para paralelos
  const paralelos = [
    {
      id: 1,
      letra: 'A',
      materia: 'Matemáticas Básicas',
      codigoMateria: 'MAT101',
      profesor: 'Dr. Juan Pérez',
      horario: 'Lun-Mie-Vie 08:00-10:00',
      aula: 'Aula 101',
      cupo: 30,
      estudiantesInscritos: 28,
      estado: 'Activo'
    },
    {
      id: 2,
      letra: 'B',
      materia: 'Programación I',
      codigoMateria: 'PRG101',
      profesor: 'Ing. María García',
      horario: 'Mar-Jue 10:00-12:00',
      aula: 'Lab. Computación 1',
      cupo: 25,
      estudiantesInscritos: 22,
      estado: 'Activo'
    },
    {
      id: 3,
      letra: 'A',
      materia: 'Base de Datos',
      codigoMateria: 'BDD201',
      profesor: 'Ing. Carlos López',
      horario: 'Lun-Mie 14:00-16:00',
      aula: 'Lab. Computación 2',
      cupo: 20,
      estudiantesInscritos: 18,
      estado: 'Activo'
    },
    {
      id: 4,
      letra: 'A',
      materia: 'Redes de Computadores',
      codigoMateria: 'RED301',
      profesor: 'Ing. Ana Martínez',
      horario: 'Mar-Jue 16:00-18:00',
      aula: 'Aula 205',
      cupo: 25,
      estudiantesInscritos: 20,
      estado: 'Activo'
    },
    {
      id: 5,
      letra: 'A',
      materia: 'Ingeniería de Software',
      codigoMateria: 'IDS401',
      profesor: 'Dr. Roberto Silva',
      horario: 'Lun-Mie-Vie 10:00-12:00',
      aula: 'Aula 302',
      cupo: 30,
      estudiantesInscritos: 25,
      estado: 'Activo'
    }
  ];

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
    console.log('Guardando cambios:', currentParalelo);
    setEditModal(false);
  };

  const handleDeleteParalelo = (paralelo) => {
    console.log('Eliminar paralelo:', paralelo);
  };

  // Filtrar paralelos basado en la búsqueda
  const filteredParalelos = paralelos.filter(paralelo =>
    paralelo.materia.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paralelo.codigoMateria.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paralelo.profesor.toLowerCase().includes(searchQuery.toLowerCase())
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
              newParalelo={newParalelo}
              setNewParalelo={setNewParalelo}
              onSave={() => {
                console.log('Paralelo creado:', newParalelo);
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
                  checked={selectedParalelos.length === filteredParalelos.length}
                  onChange={handleSelectAll}
                  className="checkbox"
                />
              </th>
              <th>Materia</th>
              <th>Código</th>
              <th>Paralelo</th>
              <th>Profesor</th>
              <th>Horario</th>
              <th>Inscritos/Cupo</th>
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
                  <td className="table-cell user-name">{paralelo.materia}</td>
                  <td className="table-cell user-email">{paralelo.codigoMateria}</td>
                  <td className="table-cell user-role">{paralelo.letra}</td>
                  <td className="table-cell user-status">{paralelo.profesor}</td>
                  <td className="table-cell user-status">{paralelo.horario}</td>
                  <td className="table-cell user-status">
                    {paralelo.estudiantesInscritos}/{paralelo.cupo}
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
                              {paralelo.materia} - Paralelo {paralelo.letra}
                            </h3>
                            <div className="user-info-grid">
                              <p className="user-email-dropdown">
                                <span className='label'>Código: </span>{paralelo.codigoMateria}
                              </p>
                              <p className="user-role-dropdown">
                                <span className='label'>Aula: </span>{paralelo.aula}
                              </p>
                              <p className="user-cycle-dropdown">
                                <span className='label'>Estado: </span>{paralelo.estado}
                              </p>
                              <p className='user-phone-dropdown'>
                                <span className='label'>Profesor: </span>{paralelo.profesor}
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Horario: </span>{paralelo.horario}
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Cupo: </span>{paralelo.cupo}
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Inscritos: </span>{paralelo.estudiantesInscritos}
                              </p>
                              <p className='user-birthdate-dropdown'>
                                <span className='label'>Disponibilidad: </span>
                                {paralelo.cupo - paralelo.estudiantesInscritos} cupos disponibles
                              </p>
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