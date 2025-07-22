import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  User,
  ChevronDown,
  Search,
  FileText,
  CheckCircle,
  Clock,
  BookOpen,
  GraduationCap,
  ClipboardList,
  UploadCloud,
  MessageSquare,
  Settings,
  ChevronUp
} from 'lucide-react';

import AgregarTarea from './Tarea/agregarTarea';
import './docenteMateria.css';
import '../Inicio/inicio.css';
import './Tarea/tareas.css'
import {getDashboardConfig} from "../sidebar/sidebar";
import ModalEditarTarea from "./Tarea/editarTarea";
import ModalCalificarTarea from "./Tarea/calificarTarea";
import ModalVerEntregas from "./Tarea/verEntregas";
import Horario from "../docente/horario/horario";
import MenuDesplegable from "../menuDesplegable/menuDocente";
import PerfilDocente from "./acercaDe/acercaDe";
import ModalEditarCalificacion from "./Tarea/Calificacion/editarCalificacion";
import ModalEditarRecurso from "./Tarea/Recursos/editarRecurso";
import ModalSubirRecurso from "./Tarea/Recursos/subirRecurso";
const DocenteMateria = ({
  userType = 'docenteMateria',
  userName = 'Docente',
  userEmail = 'profesor@uni.com',
  imagenesMateria = {},
  sections = [],
  assignments = [],
  grades = [],
  subjects = [],
  students = [],
  announcements = [],
  resources = [],
  unidades = []
}) => {
  const { materiaId } = useParams();
  const [selectedSection, setSelectedSection] = useState('assignments');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [closingDropdowns, setClosingDropdowns] = useState({});
  const config = getDashboardConfig(userType);
  // Obtener la materia actual basada en el ID
  const currentSubject = subjects.find(subject => subject.id === materiaId) || subjects[0] || {};
  const [submissionsModal, setSubmissionsModal] = useState({
  isOpen: false,
  tarea: null,
  entregas: [] // Lista de entregas de estudiantes
});
  const handleViewSubmissions = (task) => {
  // Obtener las entregas para esta tarea (ejemplo, adapta a tu API)
  const entregas = [
    {
      id: 1,
      studentId: 101,
      studentName: "Estudiante 1",
      estado: "entregado",
      archivo: { name: "tarea1.pdf", url: "/uploads/tarea1.pdf" },
      fechaEntrega: "2023-05-15 14:30",
      calificacion: 85
    },
    {
      id: 2,
      studentId: 102,
      studentName: "Estudiante 2",
      estado: "pendiente",
      archivo: null,
      fechaEntrega: null,
      calificacion: null
    }
  ];

  setSubmissionsModal({
    isOpen: true,
    tarea: task,
    entregas: entregas
  });
};

const handleDownload = (file) => {
  // Lógica para descargar el archivo
  console.log("Descargando:", file);
  // Ejemplo:
  // const link = document.createElement('a');
  // link.href = file.url;
  // link.download = file.name;
  // link.click();
};
 const [editModal1, setEditModal1] = useState({
    isOpen: false,
    calificacion: null
  });
  const [gradeModal, setGradeModal] = useState({
  isOpen: false,
  tarea: null,
  estudiantes: [] // Lista de estudiantes que han enviado la tarea
});
  const handleGradeTask = (task) => {
  // Aquí deberías obtener las entregas de los estudiantes para esta tarea
  // Esto es un ejemplo, deberías adaptarlo a tu API
  const entregasEstudiantes = [
    { id: 1, nombre: "Estudiante 1", calificacion: null },
    { id: 2, nombre: "Estudiante 2", calificacion: 85 },
    // ...
  ];

  setGradeModal({
    isOpen: true,
    tarea: task,
    estudiantes: entregasEstudiantes
  });
};

const handleGradeChange = (studentId, grade) => {
  setGradeModal(prev => ({
    ...prev,
    estudiantes: prev.estudiantes.map(est =>
      est.id === studentId
        ? { ...est, calificacion: grade === '' ? null : Number(grade) }
        : est
    )
  }));
};

const handleSaveGrades = () => {
  // Aquí iría la lógica para guardar las calificaciones
  console.log('Calificaciones a guardar:', {
    tareaId: gradeModal.tarea.id,
    calificaciones: gradeModal.estudiantes
  });

  // Ejemplo con fetch:
  fetch('/api/calificaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tareaId: gradeModal.tarea.id,
      calificaciones: gradeModal.estudiantes
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Calificaciones guardadas:', data);
    setGradeModal({ isOpen: false, tarea: null, estudiantes: [] });
    // Opcional: Actualizar la lista de tareas
  })
  .catch(error => {
    console.error('Error al guardar calificaciones:', error);
  });
};
  const handleMenuClick = (itemId) => {
    setSelectedSection(itemId);
  };
  const [editModal, setEditModal] = useState({
  isOpen: false,
  tarea: null
});
const [addModal, setAddModal] = useState(false);
const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  type: '',
  priority: 'Normal',
  dueDate: '',
  dueTime: '23:59',
  maxScore: 100,
  allowLateSubmission: false,
  attachments: null
});

const handleAddTask = () => {
  console.log('Tarea creada:', newTask);
  // Aquí iría la lógica para guardar la tarea en tu backend
  setAddModal(false);
  // Resetear el formulario
  setNewTask({
    title: '',
    description: '',
    type: '',
    priority: 'Normal',
    dueDate: '',
    dueTime: '23:59',
    maxScore: 100,
    allowLateSubmission: false,
    attachments: null
  });
};
  const handleTaskSelect = (task) => {
    console.log('Tarea seleccionada:', task);
    // Lógica para mostrar detalles de la tarea
  };
  const [uploadModalOpen2, setUploadModalOpen2] = useState(false);
  const [editModal2, setEditModal2] = useState({
    isOpen: false,
    resource: null
  });

  const handleUploadResource = (newResource) => {
    // Lógica para subir el recurso
    console.log('Subiendo recurso:', newResource);
    // setResources([...resources, newResource]);
  };

  const handleUpdateResource = (updatedResource) => {
    // Lógica para actualizar el recurso
    console.log('Actualizando recurso:', updatedResource);
    // setResources(resources.map(r => r.id === updatedResource.id ? updatedResource : r));
  };

  const handleDeleteResource = (resourceId) => {
    // Lógica para eliminar el recurso
    console.log('Eliminando recurso:', resourceId);
    // setResources(resources.filter(r => r.id !== resourceId));
  };

  const renderContent = () => {
    switch (selectedSection) {


      case 'students':
        return (
          <div className="students-container">
            <h2>Lista de Estudiantes</h2>
            <div className="students-list">
              {students.map(student => (
                <div key={student.id} className="student-card">
                  <div className="student-avatar">
                    <img src={student.avatar} alt={student.name} />
                  </div>
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <div className="student-progress">
                      <span>Progreso: {student.progress}%</span>
                      <span>Promedio: {student.averageGrade}</span>
                    </div>
                  </div>
                  <button className="btn-secondary">Ver detalles</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'assignments':
        return (
          <div className="assignments-container">
            <div className="assignments-header">
              <h2>Tareas de {currentSubject.name}</h2>
              <button className="btn-primary" onClick={() => setAddModal(true)}>Crear Nueva Tarea</button>
              <AgregarTarea
              isOpen={addModal}
              onClose={() => setAddModal(false)}
              newTask={newTask}
              setNewTask={setNewTask}
              onSave={handleAddTask}
              />
            </div>
            <div className="assignments-list">
              {assignments.map(task => (
                <div key={task.id} className="assignment-card">
                  <div className="assignment-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="assignment-meta">
                      <span>Entrega: {task.dueDate} {task.time}</span>
                      <span>Entregas: {task.submissions}/{task.totalStudents}</span>
                    </div>
                  </div>
                  <div className="assignment-actions">
                    <button
                        className="btn-primary"
                        onClick={() => setEditModal({
                          isOpen: true,
                          tarea: task
                        })}
                    >
                      Editar Tarea
                    </button>


                    <ModalCalificarTarea
                        isOpen={gradeModal.isOpen}
                        tarea={gradeModal.tarea}
                        estudiantes={gradeModal.estudiantes}
                        onClose={() => setGradeModal({isOpen: false, tarea: null, estudiantes: []})}
                        onGradeChange={handleGradeChange}
                        onSave={handleSaveGrades}
                    />
                    <button
                        className="btn-secondary"
                        onClick={() => handleViewSubmissions(task)}
                    >
                      Ver Entregas
                    </button>
                    <ModalVerEntregas
                    isOpen={submissionsModal.isOpen}
                    tarea={submissionsModal.tarea}
                    entregas={submissionsModal.entregas}
                    onClose={() => setSubmissionsModal({ isOpen: false, tarea: null, entregas: [] })}
                    onDownload={handleDownload}
                    onGradeChange={handleGradeChange}
                    onSaveGrade={handleSaveGrades}
                    />
                  </div>
                  <ModalEditarTarea
                      isOpen={editModal.isOpen}
                      tarea={editModal.tarea}
                      totalEnviados={editModal.tarea?.envios?.length || 0}
                  onClose={() => setEditModal({ isOpen: false, tarea: null })}
                  onChange={(field, value) => {
                  setEditModal(prev => ({
                  ...prev,
                  tarea: { ...prev.tarea, [field]: value }
                  }));
                  }}
                  onSave={() => {
                  // Lógica para guardar los cambios
                  console.log('Guardando cambios:', editModal.tarea);
                  setEditModal({ isOpen: false, tarea: null });
                  }}
                />
                </div>
              ))}
            </div>
          </div>
        );

      case 'grades':
        return (
    <div className="grades-container">
      <h2>Calificaciones - {currentSubject.name}</h2>
      <div className="grades-grid">
        <div className="grades-summary">
          <h3>Resumen de Calificaciones</h3>
          <p>Promedio del grupo: {grades[0]?.classAverage || 'N/A'}</p>
        </div>
        <div className="grades-list">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Calificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {grades[0]?.students?.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grade || 'Sin calificar'}</td>
                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => setEditModal1({
                        isOpen: true,
                        calificacion: student
                      })}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalEditarCalificacion
        isOpen={editModal1.isOpen}
        calificacion={editModal1.calificacion}
        onClose={() => setEditModal1({ isOpen: false, calificacion: null })}
        onChange={(field, value) => {
          setEditModal1(prev => ({
            ...prev,
            calificacion: { ...prev.calificacion, [field]: value }
          }));
        }}
        onSave={() => {
          // Aquí iría la lógica para guardar en tu backend
          console.log('Guardando calificación:', editModal1.calificacion);
          setEditModal1({ isOpen: false, calificacion: null });

          // Opcional: Actualizar el estado de las calificaciones
          // fetchGrades();
        }}
      />
    </div>
  );
      case 'calendar':
        return (
    <div className="calendar-section">
      <div className="section-header">
        <h2>Calendario Académico</h2>
        <p>Visualiza todas tus clases y eventos programados</p>
      </div>

      <Horario
        assignments={[
          ...assignments.map(a => ({
            id: a.id,
            title: a.title,
            dueDate: a.dueDate,
            status: a.status,
            subject: currentSubject.name,
            type: a.type
          })),

        ]}
      />
    </div>
  );
     case 'resources':
  return (
    <div className="resources-container">
      <div className="resources-header">
        <h2>Recursos de {currentSubject.name}</h2>
        <button
          className="btn-primary"
          onClick={() => setUploadModalOpen2(true)}
        >
          <UploadCloud size={16}/> Subir Recurso
        </button>
      </div>

      <div className="resources-list">
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-icon">
              {resource.type === 'pdf' ? '📄' :
               resource.type === 'pptx' ? '📊' :
               resource.type === 'image' ? '🖼️' :
               resource.type === 'video' ? '🎬' : '📁'}
            </div>
            <div className="resource-info">
              <h3>{resource.name}</h3>
              <p>Tipo: {resource.type.toUpperCase()} • {resource.size}</p>
              <p>Subido: {resource.uploadDate} • Descargas: {resource.downloads}</p>
              {resource.description && (
                <p className="resource-description">{resource.description}</p>
              )}
            </div>
            <div className="resource-actions">

              <button
                  type="button" // ← Esto es crucial
                  className="btn-danger"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de eliminar este recurso?')) {
                      handleDeleteResource(resource.id);
                    }
                  }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ModalSubirRecurso
          isOpen={uploadModalOpen2}
          onClose={() => setUploadModalOpen2(false)}
          onSave={handleUploadResource}
      />

      <ModalEditarRecurso
          isOpen={editModal2.isOpen}
          resource={editModal2.resource}
          onClose={() => setEditModal2({isOpen: false, resource: null})}
          onSave={handleUpdateResource}
        onDelete={handleDeleteResource}
      />
    </div>
  );
      case 'messages':
        return (
          <div className="dashboard-overview">
            <h2>Resumen de {currentSubject.name}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Estudiantes</h3>
                <p>{currentSubject.totalStudents || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Tareas Activas</h3>
                <p>{currentSubject.activeAssignments || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Promedio del Grupo</h3>
                <p>{grades[0]?.classAverage || 'N/A'}</p>
              </div>
            </div>

            <div className="recent-announcements">
              <h3>Tus últimos anuncios</h3>
              {announcements.slice(0, 3).map(announcement => (
                <div key={announcement.id} className="announcement-card">
                  <h4>{announcement.title}</h4>
                  <p>{announcement.content.substring(0, 100)}...</p>
                  <span className="announcement-meta">
                    {announcement.date} • {announcement.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
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
                  : userType === 'student' || userType === 'docenteMateria'
                      ? 'Docente'
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
        </nav>
      </div>


      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="main-title">{currentSubject.name || 'Materia'}</h1>
            <div className="welcome-section">
              <h2 className="welcome-title">Panel del Docente</h2>
              <p className="welcome-subtitle">Gestión de la materia {currentSubject.name}</p>
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
                {currentSubject.icon ? (
                    <currentSubject.icon size={24} />
                ) : (
                  <span className="materia-initials">
                    {currentSubject.name?.substring(0, 2).toUpperCase() || 'MA'}
                  </span>
                )}
              </div>
            </div>
            <div className="materia-info-section">
              <h2 className="materia-banner-title">{currentSubject.name?.toUpperCase() || 'MATERIA'}</h2>
              <p className="materia-banner-subtitle">{currentSubject.description || 'Descripción de la materia'}</p>
              <p className="materia-banner-meta">
                {currentSubject.code} • {currentSubject.totalStudents || 0} estudiantes
              </p>
            </div>
            <div className="materia-progress-section">
              <div className="next-class-info">
                <Clock size={16} />
                <span>Próxima clase: {currentSubject.nextClass || 'No programada'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area docente-view">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DocenteMateria;