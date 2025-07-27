// @ts-ignore
import React, { useState } from 'react';
import { User, ChevronDown, Search, Bell, Mail, AlertCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'; // Import ChevronLeft and ChevronRight
import { getDashboardConfig } from '../sidebar/sidebar';
import SubjectCard from './cardMateria/cardMateria';
import MateriaDocente from '../docente/docenteCardMateria/docenteCardMateria';
import './inicio.css';
import { useNavigate } from 'react-router-dom';
import MenuDesplegableDocente from "../menuDesplegable/menuDocente";
import MenuDesplegableEstudiante from "../menuDesplegable/menuEstudiante";
import MenuDesplegable from "../menuDesplegable/menu";
import DocenteParalelos from "../docente/Paralelos/paralelos";
import DocenteMateria from "../docente/docenteMateria";
import PerfilDocente from "../docente/acercaDe/acercaDe";
import SGTTABlack from '../../assets/Common/SGTTABlack.png';
const DashboardPanel = ({
  userType = '',
  userName = 'Alyce Maldonado',
  userEmail = 'alycemaldonado@uni.com',
  imagenesMateria = { rural: 'ruta/a/imagen_rural.png' }, // Example for grades section
  sections = [],
  assignments = [],
  grades = [],
  subjects = []
}) => {
  const [selectedSection, setSelectedSection] = useState('profiles');
  const [assignmentName, setAssignmentName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const config = getDashboardConfig(userType);
  const currentSubjects = subjects || [];

  const handleMenuClick = (itemId) => {
    if (itemId === 'search') {
      setShowSearch(!showSearch);
    } else {
      setSelectedSection(itemId);
      setShowSearch(false);
      // Close sidebar on item click for mobile view
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };
  const docenteEjemplo = {
  foto: '/ruta/a/foto.jpg',
  titulo: 'DOCENTE INVESTIGADOR CIS-UNL',
  nombre: 'Dr. Juan Pérez',
  institucion: 'Universidad Nacional de Loja',
  departamento: 'Carrera de Computación',
  ubicacion: 'Loja, Ecuador',
  email: 'j.perez@unl.edu.ec',
  descripcion: 'Profesor e investigador especializado en sistemas distribuidos...',
  experiencia: [
    {
      periodo: '2008 - actual',
      institucion: 'Universidad Nacional de Loja',
      departamento: 'Carrera Computación, FERNNR',
      cargo: 'Docente Investigador'
    },
    // Más experiencias...
  ],
  asignaturas: [
    {
      nombre: 'Sistemas Distribuidos',
      codigo: 'CS-505',
      ciclo: 'Quinto Ciclo',
      horario: 'Lunes 08:00-10:00'
    },
    // Más asignaturas...
  ]
};

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Dummy notification data for demonstration
  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'Nueva Tarea: Análisis de Datos',
      message: 'Se ha publicado una nueva tarea en la materia de Estadística.',
      time: 'Hace 5 minutos',
      read: false,
      icon: <Bell size={20} />,
      status: 'new'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Calificación de Examen Final',
      message: 'Tu calificación del examen final de Matemáticas ha sido publicada.',
      time: 'Hace 1 hora',
      read: false,
      icon: <CheckCircle size={20} />,
      status: 'new'
    },
    {
      type: 'announcement',
      id: 3,
      title: 'Anuncio: Cambio de Horario',
      message: 'La clase de Física se ha movido al aula 301 para este viernes.',
      read: true,
      time: 'Ayer',
      icon: <AlertCircle size={20} />
    },
    { // This was the problematic object, it was improperly closed and opened.
      id: 4,
      type: 'message',
      title: 'Mensaje del Profesor Juan',
      message: 'Revisa el feedback de tu entrega de proyecto.',
      read: true,
      icon: <Mail size={20} />,
      time: 'Hace 2 días',
    }
  ];

  return (
    <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">
            <img src={SGTTABlack} alt="Logo SGTTA" className="sidebar-logo" /> {/* CAMBIO AQUÍ */}
            <div className="sidebar-text-group"> {/* Nuevo contenedor para el texto */}
              <span className="sidebar-main-title">SGTTA</span>
              <h1 className="sidebar-user-role">
                {userType === 'teacher'
                    ? 'Docente'
                    : userType === 'student' || userType === 'studentMateria'
                    ? 'Estudiante'
                    : 'Administrador'}
              </h1>
            </div>
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
              <span className="sidebar-item-label">{item.label}</span> {/* Wrap text in span */}
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
              <span className="sidebar-item-label">{item.label}</span> {/* Wrap text in span */}
            </button>
          ))}
          {/* Toggle button for sidebar at the bottom */}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <>
                <ChevronLeft size={24} />
                <span className="sidebar-toggle-text">Ocultar</span> {/* Added text here */}
              </>
            ) : (
              <ChevronRight size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            {/* The main title that will now also toggle the sidebar */}
            <h1 className="main-title" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>Gestor de tareas</h1>
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
              {userType === 'teacher' || userType === 'docenteMateria' ? (
                <MenuDesplegableDocente />
                ) : userType === 'student' || userType === 'studentMateria' ? (
                <MenuDesplegableEstudiante />
                 ) : (
                  <MenuDesplegable /> // Opcional: un menú por defecto para otros roles como administrador
                  )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="content-area">
          {selectedSection === 'dashboardDocente' && (
          <PerfilDocente docente={docenteEjemplo} />
          )}

         {/* Dashboard principal */}
          {selectedSection === 'dashboard' && (
            <div>
              <div className="subjects-section">
                <h2>{userType === 'teacher' ? 'Materias' : 'Mis Materias'}</h2>
                <div className="subjects-grid">
                  {currentSubjects.length > 0 ? (
                    currentSubjects.map(subject => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        isTeacher={userType === 'teacher'}
                        imagen={imagenesMateria[subject.id]}
                      />
                    ))
                  ) : (
                    <p className="no-content-message">No hay materias disponibles</p>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* Asignaturas/Profiles */}
          {selectedSection === 'profiles' && (
            <div className="section-content">
              <h2>Asignaturas</h2>
              <div className="subjects-grid">
                {currentSubjects.length > 0 ? (
                  currentSubjects.map(subject => (
                    <MateriaDocente
                      key={subject.id}
                      subject={subject}
                      isTeacher={userType === 'teacher'}
                      imagen={imagenesMateria[subject.id]}
                    />
                  ))
                ) : (
                  <p className="no-content-message">No hay asignaturas disponibles</p>
                )}
              </div>
            </div>
          )}

          {/* Mis Materias - Solo para estudiantes */}
          {selectedSection === 'subjects' && userType === 'student' && (
            <div className="section-content">
              <h2>Mis Materias</h2>
              <div className="subjects-grid">
                {currentSubjects.length > 0 ? (
                  currentSubjects.map(subject => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      isTeacher={userType === 'teacher'}
                      imagen={imagenesMateria[subject.id]}
                    />
                  ))
                ) : (
                  <p className="no-content-message">No hay materias disponibles</p>
                )}
              </div>
            </div>
          )}

          {/* Paralelos/Gradebook */}
          {selectedSection === 'gradebook' && userType === 'teacher' && (
          <div className="section-content">
          <DocenteParalelos
            paralelos={grades.map(grade => ({
              id: grade.id,
              materia: grade.subject,
              codigo: grade.code || 'N/A',
              horario: grade.schedule || 'Horario no definido',
              estudiantes: grade.students.map(student => ({
              id: student.id,
              nombre: student.name,
              acd: student.acd || 0,
              aa: student.aa || 0,
              ape: student.ape || 0,
                total: student.grade || 0
              }))
            }))}
          />
        </div>
)}

          {/* Documentos/Resources */}
          {selectedSection === 'resources' && (
            <div className="section-content">
              <h2>Documentos</h2>
              <div className="documents-section">
                <div className="documents-grid">
                  <div className="document-item">
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h3>Syllabus 2024</h3>
                      <p>Documento PDF • 2.5 MB</p>
                    </div>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">📊</div>
                    <div className="document-info">
                      <h3>Presentación Tema 1</h3>
                      <p>PowerPoint • 5.1 MB</p>
                    </div>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">📝</div>
                    <div className="document-info">
                      <h3>Ejercicios Prácticos</h3>
                      <p>Documento Word • 1.2 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calendar/Assignments */}
          {selectedSection === 'assignments' && userType === 'teacher' && (
            <div className="section-content">
              <h2>Calendario de Tareas</h2>
              <div className="assignment-form">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    className="form-input"
                    placeholder="Nombre de la tarea"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Materia</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Seleccionar Materia</option>
                    {currentSubjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Fecha de Entrega</label>
                  <input
                    type="date"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Instrucciones</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Instrucciones de la tarea"
                  />
                </div>
                <button className="btn-primary">Crear Tarea</button>
              </div>
            </div>
          )}

          {/* Assignments for Student */}
          {selectedSection === 'assignments' && userType === 'student' && (
            <div className="section-content">
              <h2>Mis Tareas</h2>

              {/* Área Personal movida aquí */}
              <div className="personal-area">
                {/* Línea de tiempo de tareas */}
                <div className="timeline-section">
                  <h4>Próximas Tareas</h4>
                  <div className="timeline-filter">
                    <select className="filter-select">
                      <option>Próximos 7 días</option>
                      <option>Próximas 2 semanas</option>
                      <option>Todo el mes</option>
                    </select>
                    <select className="filter-select">
                      <option>Ordenar por fecha</option>
                      <option>Ordenar por materia</option>
                      <option>Ordenar por prioridad</option>
                    </select>
                  </div>

                  <div className="timeline-tasks">
                    {assignments.filter(task => task.status === 'pending').map((task, index) => (
                      <div key={task.id} className="timeline-task">
                        <div className="task-date">
                          <div className="task-day">
                            {new Date(task.dueDate).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </div>
                          <div className="task-time">{task.time || '23:59'}</div>
                        </div>

                        <div className="task-content">
                          <div className="task-header">
                            <h4 className="task-title">{task.title}</h4>
                            {/* "Agregar entrega" button/link */}
                          </div>

                          <div className="task-details">
                            <span className="task-subject">{task.subject}</span>
                            <span className="task-course">• {task.course}</span>
                          </div>
                        </div>

                        {/* Moved task-actions outside task-content and made it a column */}
                        <div className="task-actions-vertical">
                          <button className="btn-task-action">Ver detalles</button>
                         {task.status === 'pending' && (
                              <button className="btn-task-primary">Agregar entrega</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grades for Student */}
          {selectedSection === 'grades' && userType === 'student' && (
            <div className="section-content">
              <h2>Mis Calificaciones</h2>
              <div className="grades-grid">
                {currentSubjects.length > 0 ? (
                  currentSubjects.map(subject => {
                    const imagenMateria = imagenesMateria[subject.id];
                    return (
                      <div key={subject.id} className="grade-card">
                        <div className="grade-card-header">
                          <div className="grade-card-icon">
                            {imagenMateria ? (
                              <img
                                src={imagenMateria}
                                alt={`Imagen de ${subject.name}`}
                              />
                            ) : (
                              // Fallback icon if no image
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-book-open-text"
                              >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                <path d="M9 8h6" />
                                <path d="M9 12h6" />
                                <path d="M9 16h6" />
                              </svg>
                            )}
                          </div>
                          <h3 className="grade-card-title">{subject.name}</h3>
                        </div>
                        <div className="grade-content-table">
                          <div className="grade-table-row">
                            <span className="grade-item-label">Tarea 1</span>
                            <span className="grade-item-value">85%</span>
                          </div>
                          <div className="grade-table-row">
                            <span className="grade-item-label">Tarea 2</span>
                            <span className="grade-item-value">92%</span>
                          </div>
                        </div>
                        <div className="grade-total">
                          <span className="grade-total-label">Promedio</span>
                          <span className="grade-total-value">
                            {subject.progress || 88}%
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-content-message">No hay materias disponibles</p>
                )}
              </div>
            </div>
          )}

          {/* Messages/Notifications for Student */}
          {selectedSection === 'messages' && userType === 'student' && (
            <div className="section-content notification-center">
              <h2>Centro de Notificaciones</h2>
              <div className="notification-filters">
                <button className="filter-button active">Todas</button>
                <button className="filter-button">No Leídas</button>
                <button className="filter-button">Importantes</button>
              </div>
              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                      <div className="notification-icon-wrapper">
                        {notification.icon}
                      </div>
                      <div className="notification-content">
                        <div className="notification-header">
                          <h3 className="notification-title">{notification.title}</h3>
                          {notification.status === 'new' && <span className="notification-status-new">Nuevo</span>}
                        </div>
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      <div className="notification-actions">
                        {!notification.read && <button className="mark-as-read-button">Marcar como leído</button>}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-content-message">No hay notificaciones</p>
                )}
              </div>
            </div>
          )}

          {/* Admin sections */}
          {selectedSection === 'users' && userType === 'admin' && (
            <div className="section-content">
              <h2>Gestión de Usuarios</h2>
              <div className="users-section">
                <button className="btn-primary">Agregar Usuario</button>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Juan Pérez</td>
                        <td>juan@example.com</td>
                        <td>Docente</td>
                        <td>
                          <button className="btn-secondary">Editar</button>
                          <button className="btn-danger">Eliminar</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default DashboardPanel;