import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Search, User, Settings, FileText, MapPin, Package, MessageSquare, Plus } from 'lucide-react';
import "./inicioAdmin.css"

// Componente del menú lateral
const SideMenu = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'name', label: 'Name', icon: User },
    { id: 'uppfar', label: 'Uppfar', icon: Settings },
    { id: 'user', label: 'User', icon: User },
    { id: 'aprier', label: 'Aprier', icon: Package },
    { id: 'space', label: 'Space', icon: MapPin },
    { id: 'monly', label: 'Monly', icon: Settings },
    { id: 'onder', label: 'Onder', icon: FileText },
  ];

  return (
    <div className="side-menu">
      <div className="side-menu-header">
        <div className="header-content">
          <div className="admin-icon">
            <Settings className="w-4 h-4" />
          </div>
          <span className="admin-title">Administrator</span>
        </div>
      </div>

      <nav className="side-menu-nav">
        {menuItems.map((item) => {
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
    </div>
  );
};

// Componente principal de la interfaz
const AdminInterface = () => {
  const navigate = useNavigate(); // Hook para navegación
  const [activeMenuItem, setActiveMenuItem] = useState('aprier');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Datos de ejemplo para la tabla
  const users = [
    { id: 1, name: 'Name', email: 'Prormarr', role: 'Tuhoy', status: 2 },
    { id: 2, name: 'Eyelsy', email: 'Vienbiicow', role: 'Tohoy', status: 3 },
    { id: 3, name: 'Erwaris', email: 'Manbur', role: 'Oohoy', status: 2 },
    { id: 4, name: 'Manay', email: 'Hofehrter', role: 'Tuhoy', status: 3 },
    { id: 5, name: 'Darfre', email: 'Darfre-fe', role: 'Oiler', status: 1 },
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

  return (
    <div className="admin-interface">
      <SideMenu activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />

      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-content">
            <h1 className="header-title">User User</h1>
            <div className="header-actions">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Oneyr"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button className="primary-button">
                Spoiny
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-section">
          <div className="content-card">
            <div className="card-header">
              <div className="card-header-content">
                <h2 className="card-title">User Management</h2>
                <div className="header-actions">
                  <div className="search-container">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Soderdom"
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {users.map((user) => (
                    <tr key={user.id} className="table-row">
                      <td className="table-cell">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="checkbox"
                        />
                      </td>
                      <td className="table-cell">
                        <div className="user-info">
                          <div className="user-avatar">
                            <User />
                          </div>
                          <span className="user-name">{user.name}</span>
                        </div>
                      </td>
                      <td className="table-cell user-email">{user.email}</td>
                      <td className="table-cell user-role">{user.role}</td>
                      <td className="table-cell user-status">{user.status}</td>
                      <td className="table-cell user-status">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminInterface;