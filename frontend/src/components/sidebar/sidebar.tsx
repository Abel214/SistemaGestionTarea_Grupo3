import React from 'react';
import "./sidebar.css"

const Sidebar = () => {
  const menuItems = [
    { id: 1, name: 'Inicio', icon: '🏠' },
    { id: 2, name: 'Perfil', icon: '👤' },
    { id: 3, name: 'Configuración', icon: '⚙️' }
  ];

  return (
    <div className="sidebar">
      {/* Título de la app */}
      <div className="appTitle">
        <h1>Mi App</h1>
      </div>

      {/* Imagen de usuario */}
      <div className="userSection">
        <img
          src={'https://via.placeholder.com/50'} // Placeholder image
          alt="Usuario"
          className="userImage"
        />
        <p className="userName">Usuario</p>
      </div>

      {/* Opciones de menú */}
      <nav className="menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="menuItem">
              <span className="icon">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;