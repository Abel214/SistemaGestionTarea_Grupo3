import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { 
  Search, 
  User, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Pencil, 
  UserRoundMinus,
  X,
  Mail,
  UserCheck,
  GraduationCap,
  Phone,
  Calendar,
  Save,
  Check
} from 'lucide-react';
import { getDashboardConfig } from '../../components/sidebar/sidebar';
import "./inicioAdmin.css"

// Componente principal de la interfaz
const AdminInterface = () => {
  const navigate = useNavigate(); // Hook para navegación
  const [activeMenuItem, setActiveMenuItem] = useState('aprier');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [closingDropdowns, setClosingDropdowns] = useState({});
  
  type User = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    status: number;
    phone?: string;
    birthdate?: string;
  };
  
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    user: User | null;
  }>({
    isOpen: false,
    user: null,
  });  

 const toggleDropdown = (userId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [userId]: true
    }));
    setClosingDropdowns(prev => ({
      ...prev,
      [userId]: false
    }));
  };

  const toggleDropup = (userId) => {
    setClosingDropdowns(prev => ({
      ...prev,
      [userId]: true
    }));
    
    setTimeout(() => {
      setOpenDropdowns(prev => ({
        ...prev,
        [userId]: false
      }));
      setClosingDropdowns(prev => ({
        ...prev,
        [userId]: false
      }));
    }, 100); 
  };

  const SideMenu = ({ activeItem, onItemClick }) => {
    const adminConfig = getDashboardConfig('admin');

    return (
      <div className="side-menu">
        <div className="side-menu-header">
          <div className="header-content">
            <div className='admin-icon'>
              <User className="w-4 h-4" />
            </div>
            <span className='admin-title'>Administrador</span>
          </div>
        </div>

        <nav className="side-menu-nav">
          {adminConfig.menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <Icon />
                <span>{item.label}</span>
              </button>
            ); 
          })}
        </nav>
        <div className="side-menu-bottom">
          {adminConfig.bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`menu-item bottom-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ); 
          })}
        </div>
      </div>
    );
  };

  // Datos de ejemplo para la tabla
  const users = [
    { id: 1, name: 'Abel Alejandro', lastname: 'Mora Lopez', email: 'abel@uni.com', role: 'Estudiante', status: 2, phone: '0000000000', birthdate: '0000-00-00' },
    { id: 2, name: 'Alyce', lastname: 'Smith', email: 'alyce@uni.com', role: 'Estudiante', status: 3 },
    { id: 3, name: 'Steven', lastname: 'Johnson', email: 'steven@uni.com', role: 'Estudiante', status: 2 },
    { id: 4, name: 'Gerardo', lastname: 'Martinez', email: 'gerardo@uni.com', role: 'Estudiante', status: 3 },
    { id: 5, name: 'Bayron', lastname: 'Gonzalez', email: 'bayron@uni.com', role: 'Estudiante', status: 1 },
  ];

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id));
  };

  // Función para navegar a la página de usuarios
  const handleAddUser = () => {
    navigate('/usuarios');
  };

  // Función para abrir el modal de edición
  const handleEditUser = (user) => {
    setEditModal({
      isOpen: true,
      user: { ...user } // Copia del usuario para editar
    });
  };

  // Función para cerrar el modal
  const handleCloseEditModal = () => {
    setEditModal({
      isOpen: false,
      user: null
    });
  };

  // Función para actualizar datos del usuario en el modal
  const handleInputChange = (field, value) => {
    setEditModal({
      ...editModal,
      user: {
        ...editModal.user,
        [field]: value
      }
    });
  };  

  return (
    <div className="admin-interface">
    <SideMenu activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />

      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-content">
            <h1 className="header-title">Gestor de Usuarios</h1>
            <div className="header-actions">
              <div className="user-profile-container">
                <div className='user-profile-info'>
                  <p className='user-profile-name'>Luis Medina</p>
                  <p className='user-profile-email'>admin@uni.com</p>
                </div>
                <div className='user-profile-icon'>
                  <User className="w-4 h-4" />
                </div>
                <button className="user-profile-button">
                  <ChevronDown className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-section">
          <div className="content-card">
            <div className="card-header">
              <div className="card-header-content">
                <h2 className="card-title"></h2>
                <div className="header-table-actions">
                  <div className="search-container">
                    {/* Barra de búsqueda */}
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="search-input"
                    />
                  </div>                  
                  {/* Botón para agregar usuario */}
                  <button
                    onClick={handleAddUser}
                    className="primary-button add-user-btn"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Usuario
                  </button>
                </div>
              </div>
            </div>
            {/* User Table */}
            <div className="table-container">
              <table className="user-table">
                <thead className="table-header">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === users.length}
                        onChange={handleSelectAll}
                        className="checkbox"
                      />
                    </th>
                    <th>Nombres Completos</th>
                    <th>Correo Institucional</th>
                    <th>Rol</th>
                    <th>Ciclo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {users.map((user) => (
                    <React.Fragment key={user.id}>
                      {/* Fila principal del usuario */}
                      <tr className="table-row">
                        <td className="table-cell">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelection(user.id)}
                            className="checkbox"
                          />
                        </td>
                        <td className="table-cell user-name">{user.name} {user.lastname}</td>
                        <td className="table-cell user-email">{user.email}</td>
                        <td className="table-cell user-role">{user.role}</td>
                        <td className="table-cell user-status">{user.status}</td>
                        <td className="table-cell">
                          <button 
                            className="user-profile-button"
                            onClick={() => openDropdowns[user.id] ? toggleDropup(user.id) : toggleDropdown(user.id)}
                          >
                            {openDropdowns[user.id] ? 
                              <ChevronUp className='w-4 h-4' /> : 
                              <ChevronDown className='w-4 h-4' />
                            }
                          </button>
                        </td>
                      </tr>
                      {/* Fila expandible para el dropdown */}
                      {openDropdowns[user.id] && (
                        <tr className="expanded-row">
                          <td colSpan="6" className="expanded-cell">
                            <div className={`dropdown-card-inline ${closingDropdowns[user.id] ? 'closing' : ''}`}>
                              <div className="dropdown-header">
                                <div className="user-avatar-large">
                                  <span className="element-symbol">User Photo</span>
                                </div>
                                <div className="user-details-single">
                                  <h3 className="user-full-name-dropdown">{user.name} {user.lastname}</h3>
                                  <div className="user-info-grid">
                                    <p className="user-email-dropdown">
                                      <span className='label'>Correo Institucional: </span>
                                      {user.email}
                                    </p>
                                    <p className="user-role-dropdown">
                                      <span className='label'>Rol: </span> 
                                      {user.role}
                                    </p>
                                    <p className="user-cycle-dropdown">
                                      <span className='label'>Ciclo: </span> 
                                      {user.status}
                                    </p>
                                    <p className='user-phone-dropdown'>
                                      <span className='label'>Teléfono: </span>
                                      {user.phone || 'No disponible'}
                                    </p>
                                    <p className='user-birthdate-dropdown'>
                                      <span className='label'>Fecha de Nacimiento: </span>
                                      {user.birthdate || 'No disponible'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="dropdown-content">
                                {/* Botón para editar usuario */}
                                <button
                                className="primary-button edit-user-btn"
                                onClick={() => handleEditUser(user)}
                                >
                                  <Pencil className="w-4 h-4" />
                                  Editar
                                </button>
                                {/* Botón para dar de baja usuario */}
                                <button
                                className="primary-button unsubscribe-user-btn"
                                >
                                  <UserRoundMinus className="w-4 h-4" />
                                  Dar de baja
                                </button>                                
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modal de edición de usuario */}
        {editModal.isOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">
                <h2 className="modal-title">
                  <User className="w-5 h-5" />
                  Editar Usuario
                </h2>
                <button 
                  className="modal-close-btn"
                  onClick={handleCloseEditModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="edit-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <User className="w-4 h-4" />
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={editModal.user?.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ingrese el nombre"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <User className="w-4 h-4" />
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value={editModal.user?.lastname || ''}
                        onChange={(e) => handleInputChange('lastname', e.target.value)}
                        placeholder="Ingrese el apellido"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Mail className="w-4 h-4" />
                        Correo Institucional
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={editModal.user?.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Ingrese el correo institucional"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <UserCheck className="w-4 h-4" />
                        Rol
                      </label>
                      <select
                        className="form-select"
                        value={editModal.user?.role || ''}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                      >
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesor">Docente</option>
                        <option value="Administrador">Administrativo</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <GraduationCap className="w-4 h-4" />
                        Ciclo
                      </label>
                      <select
                        className="form-select"
                        value={editModal.user?.status || ''}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <Phone className="w-4 h-4" />
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        className="form-input"
                        value={editModal.user?.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Ingrese el número de teléfono"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <Calendar className="w-4 h-4" />
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        className="form-input"
                        value={editModal.user?.birthdate || ''}
                        onChange={(e) => handleInputChange('birthdate', e.target.value)}
                        placeholder="Ingrese la fecha de nacimiento"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="secondary-button"
                  onClick={handleCloseEditModal}
                >
                  Cancelar
                </button>
                <button 
                  className="primary-button save-btn"
                  onClick={() => setMessageModal({ ...messageModal, confirmation: true })}
                >
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminInterface;