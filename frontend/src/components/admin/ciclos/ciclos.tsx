import React, { useState } from 'react';
import {
  Search, Plus, ChevronDown, ChevronUp, Pencil,
  Trash2, List, GraduationCap, Users, Save
} from 'lucide-react';
import ModalAgregarCiclo from "./agregarCiclo";
import ModalEditarCiclo from "./editarCiclo";

const CiclosManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCiclos, setSelectedCiclos] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [closingDropdowns, setClosingDropdowns] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentCiclo, setCurrentCiclo] = useState(null);
    const [paralelos] = useState([
    { id: 1, codigo: 'PAR-2023-A', letra: 'A' },
    { id: 2, codigo: 'PAR-2023-B', letra: 'B' },
    { id: 3, codigo: 'PAR-2023-C', letra: 'C' },
    { id: 4, codigo: 'PAR-2023-D', letra: 'D' },
    { id: 5, codigo: 'PAR-2023-E', letra: 'E' }
  ]);
  // Datos de ejemplo para ciclos
  const [ciclos, setCiclos] = useState([
    {
      id: 1,
      codigo: 'CIC-2023-01',
      numero: 1,
      estudiantesTotales: 150,
      paralelos: [1, 2] // IDs de paralelos
    },
    {
      id: 2,
      codigo: 'CIC-2023-03',
      numero: 3,
      estudiantesTotales: 80,
      paralelos: [3]
    },
    {
      id: 3,
      codigo: 'CIC-2023-05',
      numero: 5,
      estudiantesTotales: 60,
      paralelos: [4]
    },
    {
      id: 4,
      codigo: 'CIC-2023-07',
      numero: 7,
      estudiantesTotales: 45,
      paralelos: [5]
    }
  ]);

  // Función auxiliar para obtener información de paralelos
  const getInfoParalelos = (ids) => {
    return paralelos
      .filter(paralelo => ids.includes(paralelo.id))
      .map(paralelo => `${paralelo.codigo} (${paralelo.letra})`);
  };

  const toggleDropdown = (cicloId) => {
    setOpenDropdowns(prev => ({ ...prev, [cicloId]: true }));
    setClosingDropdowns(prev => ({ ...prev, [cicloId]: false }));
  };

  const toggleDropup = (cicloId) => {
    setClosingDropdowns(prev => ({ ...prev, [cicloId]: true }));
    setTimeout(() => {
      setOpenDropdowns(prev => ({ ...prev, [cicloId]: false }));
      setClosingDropdowns(prev => ({ ...prev, [cicloId]: false }));
    }, 100);
  };

  const handleCicloSelection = (cicloId) => {
    setSelectedCiclos(prev =>
      prev.includes(cicloId) ? prev.filter(id => id !== cicloId) : [...prev, cicloId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCiclos(selectedCiclos.length === ciclos.length ? [] : ciclos.map(c => c.id));
  };

  const handleEditCiclo = (ciclo) => {
    setCurrentCiclo(ciclo);
    setEditModal(true);
  };

  const handleChangeCiclo = (field, value) => {
    setCurrentCiclo(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    setCiclos(prev =>
      prev.map(c => c.id === currentCiclo.id ? currentCiclo : c)
    );
    setEditModal(false);
  };

  const handleDeleteCiclo = (ciclo) => {
    setCiclos(prev => prev.filter(c => c.id !== ciclo.id));
  };

  const handleAddCiclo = (newCiclo) => {
    const newId = Math.max(...ciclos.map(c => c.id), 0) + 1;
    setCiclos(prev => [...prev, { ...newCiclo, id: newId }]);
    setAddModal(false);
  };

  // Filtrar ciclos basado en la búsqueda
  const filteredCiclos = ciclos.filter(ciclo =>
    ciclo.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ciclo.numero.toString().includes(searchQuery.toLowerCase())
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
                placeholder="Buscar ciclos..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="primary-button add-user-button" >onClick={() => setAddModal(true)}
              <Plus className="w-4 h-4"/> Agregar Ciclo
            </button>
            <ModalAgregarCiclo
              isOpen={addModal}
              onClose={() => setAddModal(false)}
              paralelos={paralelos}
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
                  checked={selectedCiclos.length === filteredCiclos.length}
                  onChange={handleSelectAll}
                  className="checkbox"
                />
              </th>
              <th>Código Ciclo</th>
              <th>Número</th>
              <th>Estudiantes Totales</th>
              <th>Cant. Paralelos</th>
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
                  <td className="table-cell user-email">{ciclo.numero}</td>
                  <td className="table-cell user-role">{ciclo.estudiantesTotales}</td>
                  <td className="table-cell user-status">{ciclo.paralelos.length}</td>
                  <td className="table-cell">
                    <button
                      className="user-profile-button"
                      onClick={() => openDropdowns[ciclo.id] ? toggleDropup(ciclo.id) : toggleDropdown(ciclo.id)}
                    >
                      {openDropdowns[ciclo.id] ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                    </button>
                  </td>
                </tr>
                {openDropdowns[ciclo.id] && (
                  <tr className="expanded-row">
                    <td colSpan="5" className="expanded-cell">
                      <div className={`dropdown-card-inline ${closingDropdowns[ciclo.id] ? 'closing' : ''}`}>
                        <div className="dropdown-header">
                          <div className="user-avatar-large">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                          </div>
                          <div className="user-details-single">
                            <h3 className="user-full-name-dropdown">
                              Ciclo {ciclo.numero} - {ciclo.codigo}
                            </h3>
                            <div className="user-info-grid">
                              <p className="user-email-dropdown">
                                <span className='label'>Código: </span>{ciclo.codigo}
                              </p>
                              <p className="user-role-dropdown">
                                <span className='label'>Número: </span>{ciclo.numero}
                              </p>
                              <p className="user-cycle-dropdown">
                                <span className='label'>Estudiantes Totales: </span>{ciclo.estudiantesTotales}
                              </p>
                              <p className='user-phone-dropdown'>
                                <span className='label'>Cantidad de Paralelos: </span>{ciclo.paralelos.length}
                              </p>

                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">

                                  Paralelos en este ciclo:
                                </h4>
                                <ul className="list-disc pl-5">
                                  {getInfoParalelos(ciclo.paralelos).map((paralelo, index) => (
                                    <li key={index} className="text-sm">{paralelo}</li>
                                  ))}
                                </ul>
                              </div>
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
                          paralelos={paralelos}
                          onClose={() => setEditModal(false)}
                          onChange={handleChangeCiclo}
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
      {filteredCiclos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron ciclos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  );
};

export default CiclosManager;