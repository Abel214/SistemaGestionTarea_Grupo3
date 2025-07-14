import React, { useState } from 'react';
import {User, ChevronDown, Search, FileText, CheckCircle, Clock, BookOpen} from 'lucide-react';
import { getDashboardConfig } from '../../sidebar/sidebar';
import '../inicio.css';

const DashboardPanelMateria = ({
  userType = '',
  userName = 'Alyce Maldonado',
  userEmail = 'alycemaldonado@uni.com',
  imagenesMateria = {},
  sections = [],
  assignments = [],
  grades = [],
  subjects = []
}) => {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const config = getDashboardConfig(userType);
  const currentSubject = subjects[0] || {}; // Asumiendo que solo mostramos una materia
  const handleMenuClick = (itemId) => {
    if (itemId === 'search') {
      setShowSearch(!showSearch);
    } else {
      setSelectedSection(itemId);
      setShowSearch(false);
    }
  };

  // Tareas específicas para la materia actual
  const subjectAssignments = [
    {
      id: 1,
      title: 'APEI: Laboratorio: Diseño de procesos con herramientas BPMN',
      status: 'pending',
      dueDate: '2025-07-15'
    },
    {
      id: 2,
      title: 'AAI: Investigaciones necesarias para el laboratorio',
      status: 'pending',
      dueDate: '2025-07-17'
    },
    {
      id: 3,
      title: 'ACD: Taller de revisión bibliográfica',
      status: 'pending',
      dueDate: '2025-07-20'
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <User size={24} />
            <h1>{userType === 'studentMateria'}</h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="sidebar-search-section">

            <div className="sidebar-search">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
        </div>

        <nav className="sidebar-nav">
          {config.menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`sidebar-nav-item ${
                selectedSection === item.id ? 'active' : ''
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Items */}
        <div className="sidebar-bottom">
          {config.bottomItems && config.bottomItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedSection(item.id)}
              className={`sidebar-nav-item ${selectedSection === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
       {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="main-title">Gestor de tareas</h1>
            <div className="welcome-section">
              <h2 className="welcome-title">Bienvenido {userName}</h2>
              <p className="welcome-subtitle">{config.welcomeMessage}</p>
            </div>
          </div>

          <div className="user-controls">
            <div className="user-profile">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-info">
                <span className="user-name">{userName}</span>
                <span className="user-email">{userEmail}</span>
              </div>
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
          </div>
        </header>
        {/* Imagen de la materia */}
        {imagenesMateria[currentSubject.id] ? (
        <img
          src={imagenesMateria[currentSubject.id]}
          alt={`Imagen de ${currentSubject.name}`}
          className="student"
        />
        ) : (
        <div className="student">
          <BookOpen size={15} />
        </div>
        )}
        {/* Content Area - Nueva estructura */}
        <div className="content-area materia-view">
          {/* Encabezado de la materia */}
          <div className="materia-header">
            <h2 className="materia-title">{currentSubject.name || 'Procesos de Software'}</h2>
            <div className="materia-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${currentSubject.progress || 75}%` }}
                ></div>
              </div>
              <span className="progress-text">{currentSubject.progress || 75}% Completado</span>
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="tareas-container">
            <h3 className="tareas-title">Tareas Pendientes</h3>

            <div className="tareas-list">
              {subjectAssignments.map(task => (
                <div key={task.id} className="tarea-item">
                  <div className="tarea-icon">
                    <FileText size={18} />
                  </div>
                  <div className="tarea-content">
                    <h4 className="tarea-title">{task.title}</h4>
                    <div className="tarea-meta">
                      <span className="tarea-status">
                        <CheckCircle size={14} /> Pendiente
                      </span>
                      <span className="tarea-date">
                        <Clock size={14} /> Entrega: {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <button className="tarea-button">Ver tarea</button>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default DashboardPanelMateria;