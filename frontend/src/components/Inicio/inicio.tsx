import React, { useState } from 'react';
import {
  Home, Book, Users as UsersIcon, FileText, CheckSquare,
  MessageCircle, Bell, User, ChevronDown
} from 'lucide-react';
import './inicio.css';

const DashboardPanel = ({
  userType = 'teacher',
  userName = 'Alyce Maldonado',
  userEmail = 'alycemaldonado@uni.com',
  imagenesMateria = {},
  sections = [],
  assignments = [],
  grades = [],
  subjects = []
}) => {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [assignmentName, setAssignmentName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const userConfig = {
    teacher: {
      title: 'Panel del Docente',
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'profiles', label: 'Perfiles de Estudiantes', icon: UsersIcon },
        { id: 'gradebook', label: 'Libro de Calificaciones', icon: Book },
        { id: 'resources', label: 'Recursos del Aula', icon: FileText },
        { id: 'assignments', label: 'Tareas', icon: CheckSquare },
      ]
    },
    student: {
      title: 'Panel del Estudiante',
      welcomeMessage: 'Revisa tus materias y tareas',
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'subjects', label: 'Mis Materias', icon: Book },
        { id: 'assignments', label: 'Tareas', icon: CheckSquare },
        { id: 'grades', label: 'Mis Calificaciones', icon: FileText },
        { id: 'messages', label: 'Mensajes', icon: MessageCircle },
      ]
    }
  };

  const config = userConfig[userType];
  const currentSubjects = subjects || [];

  const SubjectCard = ({ subject, isTeacher }) => {
    const imagenMateria = imagenesMateria[subject.id];

    return (
      <div className="subject-card-large">
        <div className="subject-card-image">
          {imagenMateria ? (
            <img
              src={imagenMateria}
              alt={`Imagen de ${subject.name}`}
              className="subject-image"
            />
          ) : (
            <div className="subject-placeholder">
              <subject.icon size={48} />
            </div>
          )}
        </div>
        <div className="subject-card-content-large">
          <h3 className="subject-name-large">{subject.name}</h3>
          {!isTeacher && subject.progress && (
            <>
              <div className="subject-progress-large">
                <div className={`subject-progress-bar-large ${subject.color}`} style={{ width: `${subject.progress}%` }} />
              </div>
              <p className="subject-progress-text-large">{subject.progress}% Completado</p>
            </>
          )}
          {isTeacher && (
            <p className="subject-description-large">
              {subject.description || 'Se enfoca en la gestión de contenido, estudiantes y evaluaciones de la materia.'}
            </p>
          )}
          <button className="subject-button">
            {isTeacher ? 'Gestionar Materia' : 'Ir a Materia'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">
            <User size={24} />
            <h1>{userType === 'teacher' ? 'Docente' : 'Estudiante'}</h1>
          </div>
        </div>
        <nav className="sidebar-nav">
          {config.menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedSection(item.id)}
              className={`sidebar-nav-item ${selectedSection === item.id ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
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

        {/* Content Area */}
        <div className="content-area">
          {/* Dashboard principal */}
          {selectedSection === 'dashboard' && (
            <div>
              <div className="subjects-section">
                <h2>{userType === 'teacher' ? 'Materias que Impartes' : 'Mis Materias'}</h2>
                <div className="subjects-grid">
                  {currentSubjects.length > 0 ? (
                    currentSubjects.map(subject => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        isTeacher={userType === 'teacher'}
                      />
                    ))
                  ) : (
                    <p className="no-content-message">No hay materias disponibles</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Otras secciones */}
          {selectedSection !== 'dashboard' && (
            <div className="section-content">
              {selectedSection === 'assignments' && userType === 'teacher' && (
                <>
                  <h2>Crear Nueva Tarea</h2>
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
                </>
              )}

              {selectedSection === 'assignments' && userType === 'student' && (
                <>
                  <h2>Mis Tareas</h2>
                  <div className="assignments-list">
                    {assignments.length > 0 ? (
                      assignments.map((assignment, i) => (
                        <div key={assignment.id || i} className="assignment-item">
                          <div className="assignment-info">
                            <h3>{assignment.title}</h3>
                            <p>{assignment.subject} • Entrega: {assignment.dueDate}</p>
                          </div>
                          <span className={`assignment-status ${assignment.status}`}>
                            {assignment.status === 'completed' ? 'Completada' : 'Pendiente'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="no-content-message">No hay tareas disponibles</p>
                    )}
                  </div>
                </>
              )}

              {selectedSection === 'gradebook' && userType === 'teacher' && (
                <>
                  <h2>Libro de Calificaciones</h2>
                  <div>
                    {grades.length > 0 ? (
                      grades.map((subject, i) => (
                        <div key={i} className="gradebook-section">
                          <h3>{subject.subject}</h3>
                          <div className="gradebook-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Estudiante</th>
                                  <th>Calificación</th>
                                </tr>
                              </thead>
                              <tbody>
                                {subject.students.map((student, j) => (
                                  <tr key={j}>
                                    <td className="student-name">{student.name}</td>
                                    <td className="grade">{student.grade}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="no-content-message">No hay calificaciones disponibles</p>
                    )}
                  </div>
                </>
              )}

              {selectedSection === 'grades' && userType === 'student' && (
                <>
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
                                  <subject.icon size={24} color="white" />
                                )}
                              </div>
                              <h3 className="grade-card-title">{subject.name}</h3>
                            </div>
                            <div className="grade-item">
                              <span className="grade-item-label">Tarea 1</span>
                              <span className="grade-item-value">85%</span>
                            </div>
                            <div className="grade-item">
                              <span className="grade-item-label">Tarea 2</span>
                              <span className="grade-item-value">92%</span>
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPanel;