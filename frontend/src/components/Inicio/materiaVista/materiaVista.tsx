import React, { useState } from 'react';
import {User, ChevronDown, Search, FileText, CheckCircle, Clock, BookOpen} from 'lucide-react';
import { getDashboardConfig } from '../../sidebar/sidebar';

import '../inicio.css';
import '../calendario/calendario.css'
import '../materiaVista/materiaVista.css';
import AcademicCalendar from "../calendario/calendario";
import UnidadesMenu from "../unidades/unidades";
import MenuDesplegable from "../../menuDesplegable/menuEstudiante";
const DashboardPanelMateria = ({
  userType = 'studentMateria',
  userName = 'Estudiante',
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
  const [showCalendar, setShowCalendar] = useState(false);

  const config = getDashboardConfig(userType);
  const currentSubject = subjects[0] || {};

  const handleMenuClick = (itemId) => {
    if (itemId === 'search') {
      setShowSearch(!showSearch);
    } else {
      setSelectedSection(itemId);
      setShowSearch(false);
    }
  };

  // Datos de ejemplo para las unidades (normalmente vendrían como props)
  const unidadesMockData = [
    {
      id: 1,
      name: "Unidad 1",
      title: "Introducción a los Procesos de Software",
      description: "Conceptos fundamentales sobre procesos de software, modelos de desarrollo y metodologías ágiles.",
      progress: 85,
      completedTasks: 4,
      totalTasks: 5,
      tasks: [
        {
          id: 1,
          title: "Laboratorio: Diseño de procesos con herramientas BPMN",
          description: "Crear diagramas BPMN para modelar procesos de negocio",
          status: 'completed',
          priority: 'high',
          dueDate: '2025-07-15',
          time: '23:59',
          subject: 'PROCESOS DE SOFTWARE'
        },
        {
          id: 2,
          title: "Investigaciones necesarias para el laboratorio",
          description: "Investigar metodologías de desarrollo de software",
          status: 'pending',
          priority: 'medium',
          dueDate: '2025-07-17',
          time: '11:30',
          subject: 'PROCESOS DE SOFTWARE'
        }
      ]
    },
    {
      id: 2,
      name: "Unidad 2",
      title: "Metodologías Ágiles",
      description: "Estudio de metodologías ágiles como Scrum, Kanban y XP.",
      progress: 45,
      completedTasks: 2,
      totalTasks: 4,
      tasks: [
        {
          id: 3,
          title: "Taller de revisión bibliográfica",
          description: "Revisar literatura sobre metodologías ágiles",
          status: 'pending',
          priority: 'medium',
          dueDate: '2025-07-20',
          time: '14:00',
          subject: 'PROCESOS DE SOFTWARE'
        }
      ]
    }
  ];

  const participantsMockData = [
    {
      id: 1,
      name: "Francisco Alvarez Pineda",
      email: "francisco.alvarez@uni.edu",
      role: "Docente",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      lastActive: "2025-07-18"
    },
    {
      id: 2,
      name: "Alyce Maldonado",
      email: "alycemaldonado@uni.com",
      role: "Estudiante",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      lastActive: "2025-07-18"
    },
    {
      id: 3,
      name: "Carlos Rodriguez",
      email: "carlos.rodriguez@uni.com",
      role: "Estudiante",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      lastActive: "2025-07-17"
    }
  ];

  const announcementsMockData = [
    {
      id: 1,
      title: "Cambio de fecha para el examen parcial",
      content: "El examen parcial se ha movido del 25 de julio al 30 de julio debido a ajustes en el cronograma académico.",
      priority: 'high',
      author: "Francisco Alvarez Pineda",
      subject: "PROCESOS DE SOFTWARE",
      date: "2025-07-17"
    },
    {
      id: 2,
      title: "Material adicional disponible",
      content: "Se ha subido material complementario sobre metodologías ágiles en la sección de recursos.",
      priority: 'medium',
      author: "Francisco Alvarez Pineda",
      subject: "PROCESOS DE SOFTWARE",
      date: "2025-07-16"
    }
  ];

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

  const handleTaskSelect = (task) => {
    console.log('Tarea seleccionada:', task);
    // Aquí puedes agregar la lógica para mostrar detalles de la tarea
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'calendar':
        return <AcademicCalendar assignments={subjectAssignments} />;

      case 'unidades':
        // Solo mostrar para estudiantes
        if (userType === 'studentMateria') {
          return (
            <UnidadesMenu
                unidades={unidadesMockData}
                participants={participantsMockData}
                announcements={announcementsMockData}
                onTaskSelect={handleTaskSelect} onSectionSelect={undefined}            />
          );
        }
        return <div>Sección no disponible</div>;

      default:
        return (
          <div className="tareas-container">
            <h3 className="tareas-title">Tareas Pendientes</h3>
            <div className="tareas-list">
              {subjectAssignments.map(task => (
                <div key={task.id} className="tarea-item">
                  <div className="tarea-icon">
                    <FileText size={18}/>
                  </div>
                  <div className="tarea-content">
                    <h4 className="tarea-title">{task.title}</h4>
                    <div className="tarea-meta">
                      <span className="tarea-status">
                        <CheckCircle size={14}/> Pendiente
                      </span>
                      <span className="tarea-date">
                        <Clock size={14}/> Entrega: {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <button className="tarea-button">Ver tarea</button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <User size={24}/>
            <h1>
              {userType === 'teacher'
                  ? 'Docente'
                  : userType === 'student' || userType === 'studentMateria'
                      ? 'Estudiante'
                      : 'Administrador'}
            </h1>

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

          {/* Solo mostrar el menú de Unidades para estudiantes */}
          {userType === 'studentMateria' && (
            <button
              onClick={() => handleMenuClick('unidades')}
              className={`sidebar-nav-item ${
                selectedSection === 'unidades' ? 'active' : ''
              }`}
            >
              <BookOpen size={18} />
              Unidades
            </button>
          )}
        </nav>

        {/* Bottom Items */}
        <div className="sidebar-bottom">
          {config.bottomItems && config.bottomItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
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

              <div className="user-info">
                <span className="user-name">{userName}</span>
                <span className="user-email">{userEmail}</span>
              </div>
               <MenuDesplegable />
            </div>
          </div>
        </header>

        {/* Banner de la materia */}
        <div className="materia-banner-container">
          <div className="materia-banner">
            <div className="materia-icon-section">
              <div className="materia-icon-circle">
                <span className="materia-initials">PS</span>
              </div>
            </div>
            <div className="materia-info-section">
              <h2 className="materia-banner-title">PROCESOS DE SOFTWARE</h2>
              <p className="materia-banner-subtitle">APLICADA A LA COMPUTACIÓN</p>
              <p className="materia-banner-instructor">FRANCISCO ALVAREZ PINEDA</p>
            </div>
            <div className="materia-progress-section">
              <div className="circular-progress">
                <div className="progress-circle">
                  <span className="progress-percentage">{currentSubject.progress || 75}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area materia-view">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanelMateria;