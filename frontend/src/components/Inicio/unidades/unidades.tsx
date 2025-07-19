import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, User, FileText, Calendar, CheckCircle, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import './unidades.css'; // Importar estilos CSS
const UnidadesMenu = ({
  unidades = [],
  participants = [],
  announcements = [],
  onTaskSelect = () => {},
  onSectionSelect = () => {}
}) => {
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('contenidos');

  // Datos por defecto si no se proporcionan
  const defaultUnidades = [
    {
      id: 1,
      name: "Unidad 1",
      title: "Introducción a las metodologías para el proceso de software",
      description: "Conceptos fundamentales sobre procesos de software, modelos de desarrollo y metodologías ágiles.",
      progress: 85,
      completedTasks: 4,
      totalTasks: 5,
      temas: [
        {
          id: '1.1',
          title: 'Introducción a las metodologías de desarrollo',
          subtemas: [
            { id: '1.1.1', title: 'Definición de metodología' },
            { id: '1.1.2', title: 'Tipos de metodologías' }
          ]
        },
        {
          id: '1.2',
          title: 'Modelos de proceso de software',
          subtemas: [
            { id: '1.2.1', title: 'Modelo en cascada' },
            { id: '1.2.2', title: 'Modelo ágil' }
          ]
        }
      ],
      tasks: [
        {
          id: 1,
          title: "APEI: Laboratorio: Diseño de procesos con herramientas BPMN",
          description: "Crear diagramas BPMN para modelar procesos de negocio",
          status: 'completed',
          priority: 'high',
          dueDate: '2025-07-15',
          time: '23:59'
        },
        {
          id: 2,
          title: "AAI: Investigación necesaria para el desarrollo del proyecto final",
          description: "Investigar metodologías de desarrollo de software",
          status: 'pending',
          priority: 'medium',
          dueDate: '2025-07-17',
          time: '11:30'
        },
        {
          id: 3,
          title: "ACD: Taller de revisión bibliográfica para determinar actividades del modelo general del proceso",
          description: "Revisar literatura especializada",
          status: 'pending',
          priority: 'high',
          dueDate: '2025-07-20',
          time: '14:00'
        }
      ],
      recursos: [
        { id: 1, title: 'Diapositivas Capitulo 1', type: 'pdf' }
      ],
      evaluaciones: [
        { id: 1, title: 'Autoevaluación de notas unidad I', type: 'quiz' }
      ],
      docente: {
      id: 1,
      nombre: "Dr. Juan Carlos Mendoza",
      titulo: "Doctor en Ingeniería de Software",
      especialidad: "Metodologías Ágiles y Gestión de Proyectos",
      experiencia: "15 años de experiencia en desarrollo de software",
      foto: "/api/placeholder/150/150", // URL de la imagen
      descripcion: "Especialista en metodologías de desarrollo de software con amplia experiencia en la industria. Ha trabajado en proyectos de gran escala utilizando metodologías ágiles como Scrum y Kanban. Actualmente se dedica a la investigación en procesos de software y la enseñanza universitaria.",
      contacto: {
        email: "juan.mendoza@universidad.edu",
        oficina: "Edificio A - Oficina 301",
        horario: "Lunes a Viernes 9:00-12:00"
      },
      formacion: [
        "Ph.D. en Ingeniería de Software - Universidad Técnica (2015)",
        "M.Sc. en Ciencias de la Computación - Universidad Nacional (2009)",
        "Ing. en Sistemas - Universidad Regional (2005)"
      ],
      areas_interes: [
        "Metodologías Ágiles",
        "Gestión de Proyectos",
        "Calidad de Software",
        "DevOps"
      ]
    },
    },
    {
      id: 2,
      name: "Unidad 2",
      title: "Metodologías Ágiles y Gestión de Proyectos",
      description: "Estudio de metodologías ágiles como Scrum, Kanban y XP para la gestión efectiva de proyectos.",
      progress: 45,
      completedTasks: 2,
      totalTasks: 4,
      temas: [
        {
          id: '2.1',
          title: 'Scrum',
          subtemas: [
            { id: '2.1.1', title: 'Roles en Scrum' },
            { id: '2.1.2', title: 'Eventos de Scrum' }
          ]
        },
        {
          id: '2.2',
          title: 'Kanban',
          subtemas: [
            { id: '2.2.1', title: 'Principios de Kanban' },
            { id: '2.2.2', title: 'Implementación de Kanban' }
          ]
        }
      ],
      tasks: [
        {
          id: 4,
          title: "APEI: Implementación de Scrum en proyecto simulado",
          description: "Aplicar framework Scrum en un proyecto de desarrollo",
          status: 'pending',
          priority: 'high',
          dueDate: '2025-07-25',
          time: '23:59'
        },
        {
          id: 5,
          title: "AAI: Análisis comparativo de metodologías ágiles",
          description: "Comparar Scrum, Kanban y XP",
          status: 'pending',
          priority: 'medium',
          dueDate: '2025-07-30',
          time: '11:30'
        }
      ],
      recursos: [
        { id: 2, title: 'Guía Scrum Master', type: 'pdf' },
        { id: 3, title: 'Templates Kanban', type: 'excel' }
      ],
      evaluaciones: [
        { id: 2, title: 'Evaluación metodologías ágiles', type: 'exam' }
      ],
      docente: {
      id: 1,
      nombre: "Dr. Juan Carlos Mendoza",
      titulo: "Doctor en Ingeniería de Software",
      especialidad: "Metodologías Ágiles y Gestión de Proyectos",
      experiencia: "15 años de experiencia en desarrollo de software",
      foto: "/api/placeholder/150/150", // URL de la imagen
      descripcion: "Especialista en metodologías de desarrollo de software con amplia experiencia en la industria. Ha trabajado en proyectos de gran escala utilizando metodologías ágiles como Scrum y Kanban. Actualmente se dedica a la investigación en procesos de software y la enseñanza universitaria.",
      contacto: {
        email: "juan.mendoza@universidad.edu",
        oficina: "Edificio A - Oficina 301",
        horario: "Lunes a Viernes 9:00-12:00"
      },
      formacion: [
        "Ph.D. en Ingeniería de Software - Universidad Técnica (2015)",
        "M.Sc. en Ciencias de la Computación - Universidad Nacional (2009)",
        "Ing. en Sistemas - Universidad Regional (2005)"
      ],
      areas_interes: [
        "Metodologías Ágiles",
        "Gestión de Proyectos",
        "Calidad de Software",
        "DevOps"
      ]
    },
    },
    {
      id: 3,
      name: "Unidad 3",
      title: "Calidad de Software y Testing",
      description: "Principios de calidad de software, estrategias de testing y aseguramiento de calidad.",
      progress: 20,
      completedTasks: 1,
      totalTasks: 5,
      temas: [
        {
          id: '3.1',
          title: 'Introducción a la calidad de software',
          subtemas: [
            { id: '3.1.1', title: 'Definición de calidad' },
            { id: '3.1.2', title: 'Importancia de la calidad en software' }
          ]
        },
        {
          id: '3.2',
          title: 'Estrategias de testing',
          subtemas: [
            { id: '3.2.1', title: 'Tipos de testing' },
            { id: '3.2.2', title: 'Herramientas de testing automatizado' }
          ]
        }
      ],
      tasks: [
        {
          id: 6,
          title: "APEI: Plan de testing para aplicación web",
          description: "Desarrollar estrategia integral de testing",
          status: 'pending',
          priority: 'high',
          dueDate: '2025-08-05',
          time: '23:59'
        },
        {
          id: 7,
          title: "AAI: Investigación sobre herramientas de testing",
          description: "Comparar herramientas de testing automatizado",
          status: 'pending',
          priority: 'medium',
          dueDate: '2025-08-10',
          time: '11:30'
        }
      ],
      recursos: [
        { id: 4, title: 'Manual de Testing', type: 'pdf' }
      ],
      evaluaciones: [
        { id: 3, title: 'Examen de calidad y testing', type: 'exam' }
      ],
      docente: {
      id: 1,
      nombre: "Dr. Juan Carlos Mendoza",
      titulo: "Doctor en Ingeniería de Software",
      especialidad: "Metodologías Ágiles y Gestión de Proyectos",
      experiencia: "15 años de experiencia en desarrollo de software",
      foto: "/api/placeholder/150/150", // URL de la imagen
      descripcion: "Especialista en metodologías de desarrollo de software con amplia experiencia en la industria. Ha trabajado en proyectos de gran escala utilizando metodologías ágiles como Scrum y Kanban. Actualmente se dedica a la investigación en procesos de software y la enseñanza universitaria.",
      contacto: {
        email: "juan.mendoza@universidad.edu",
        oficina: "Edificio A - Oficina 301",
        horario: "Lunes a Viernes 9:00-12:00"
      },
      formacion: [
        "Ph.D. en Ingeniería de Software - Universidad Técnica (2015)",
        "M.Sc. en Ciencias de la Computación - Universidad Nacional (2009)",
        "Ing. en Sistemas - Universidad Regional (2005)"
      ],
      areas_interes: [
        "Metodologías Ágiles",
        "Gestión de Proyectos",
        "Calidad de Software",
        "DevOps"
      ]
    },
    }
  ];

  const currentUnit = defaultUnidades[currentUnitIndex];

  const nextUnit = () => {
    if (currentUnitIndex < defaultUnidades.length - 1) {
      setCurrentUnitIndex(currentUnitIndex + 1);
    }
  };

  const prevUnit = () => {
    if (currentUnitIndex > 0) {
      setCurrentUnitIndex(currentUnitIndex - 1);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-orange-500" size={16} />;
      case 'overdue':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'high-priority';
      case 'medium':
        return 'medium-priority';
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  };
  const renderTemas = () => (
      <div className="card">
        <div className="card-header">
          <h3>TEMAS</h3>
        </div>
        <div className="card-body">
          {currentUnit.temas?.map((tema) => (
              <div key={tema.id} className="tema-item">
                <h4 className="tema-title">
                  {tema.id} - {tema.title}
                </h4>

                <ul className="subtemas-list">
                  {tema.subtemas?.map((subtema) => (
                      <li key={subtema.id} className="subtema-item">
                        {subtema.id} - {subtema.title}
                      </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <h3>CONOCE AL DOCENTE</h3>
          </div>
          <div className="card-body">
            {currentUnit.docente ? (
                <div className="docente-container">
                  {/* Información principal del docente */}
                  <div className="docente-main-info">
                    <div className="docente-photo">
                      <img
                          src={currentUnit.docente.foto}
                          alt={currentUnit.docente.nombre}
                          className="docente-imagen"
                      />
                    </div>

                    <div className="docente-details">
                      <h4 className="docente-nombre">{currentUnit.docente.nombre}</h4>
                      <p className="docente-titulo">{currentUnit.docente.titulo}</p>
                      <p className="docente-especialidad">{currentUnit.docente.especialidad}</p>
                      <p className="docente-experiencia">{currentUnit.docente.experiencia}</p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="docente-description">
                    <h5>Acerca del profesor</h5>
                    <p>{currentUnit.docente.descripcion}</p>
                  </div>

                  {/* Información de contacto */}
                  <div className="docente-contact">
                    <h5>Información de contacto</h5>
                    <div className="contact-info">
                      <div className="contact-item">
                        <strong>Email:</strong>
                        <a href={`mailto:${currentUnit.docente.contacto.email}`}>
                          {currentUnit.docente.contacto.email}
                        </a>
                      </div>
                      <div className="contact-item">
                        <strong>Oficina:</strong> {currentUnit.docente.contacto.oficina}
                      </div>
                      <div className="contact-item">
                        <strong>Horario de atención:</strong> {currentUnit.docente.contacto.horario}
                      </div>
                    </div>
                  </div>

                  {/* Formación académica */}
                  <div className="docente-education">
                    <h5>Formación académica</h5>
                    <ul className="education-list">
                      {currentUnit.docente.formacion.map((titulo, index) => (
                          <li key={index} className="education-item">{titulo}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Áreas de interés */}
                  <div className="docente-interests">
                    <h5>Áreas de investigación</h5>
                    <div className="interests-tags">
                      {currentUnit.docente.areas_interes.map((area, index) => (
                          <span key={index} className="interest-tag">{area}</span>
                      ))}
                    </div>
                  </div>
                </div>
            ) : (
                <div className="empty-state">
                  <User size={48}/>
                  <p>Información del docente no disponible</p>
                </div>
            )}
          </div>
        </div>
      </div>
  );

  const renderActividades = () => (
      <div className="card">
        <div className="card-header">
          <h3>ACTIVIDADES</h3>
        </div>
        <div className="card-body">
          {currentUnit.tasks?.map((task) => (
              <div
                  key={task.id}
                  className={`actividad-item ${getPriorityClass(task.priority)}`}
                  onClick={() => onTaskSelect(task)}
              >
                <div className="actividad-header">
                  {getStatusIcon(task.status)}
                  <h4 className="actividad-title">{task.title}</h4>
                </div>
                <p className="actividad-description">{task.description}</p>
                <div className="actividad-meta">
              <span className="actividad-meta-item">
                <Calendar size={12}/>
                <span>Fecha para {task.dueDate} de {task.time}</span>
              </span>
                </div>
              </div>
          ))}
        </div>
        <div className="unit-navigation">
          <button
              onClick={prevUnit}
              disabled={currentUnitIndex === 0}
              className="nav-button"
          >
            <ChevronLeft size={20}/>
          </button>
          <div className="progress-track">
            <div
                className="progress-bar"
                style={{width: `${(currentUnitIndex + 1) / defaultUnidades.length * 100}%`}}
            />
          </div>
          <button
              onClick={nextUnit}
              disabled={currentUnitIndex === defaultUnidades.length - 1}
              className="nav-button"
          >
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>
  );

  const renderParticipantes = () => (
      <div className="card">
        <div className="card-header">
          <h3>PARTICIPANTES</h3>
        </div>
        <div className="card-body">
          <div className="participantes-list">
            {participants.map((participant) => (
                <div key={participant.id} className="participante-item">
                  <div className="participante-avatar">
                    <User size={16}/>
                  </div>
                  <div className="participante-info">
                    <div className="participante-name">{participant.name}</div>
                    <div className="participante-email">{participant.email}</div>
                    <div className="participante-role">{participant.role}</div>
                  </div>
                  <div className="participante-last-active">
                    {participant.lastActive}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );

  const renderAnuncios = () => {
    // Filtrar anuncios por la unidad actual
    const unitAnnouncements = announcements.filter(announcement =>
        announcement.unitId === currentUnit.id || !announcement.unitId
    );

    return (
        <div className="card">
          <div className="card-header">
          <h3>ANUNCIOS - {currentUnit.name.toUpperCase()}</h3>
        </div>
        <div className="card-body">
          {unitAnnouncements.length > 0 ? (
            unitAnnouncements.map((announcement) => (
              <div key={announcement.id} className="anuncio-item">
                <div className="anuncio-header">
                  <MessageSquare className="anuncio-icon" size={16} />
                  <div className="anuncio-content">
                    <h4 className="anuncio-title">{announcement.title}</h4>
                    <p className="anuncio-text">{announcement.content}</p>
                    <div className="anuncio-meta">
                      <span>{announcement.author}</span>
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <MessageSquare size={48} />
              <p>No hay anuncios para {currentUnit.name}</p>
            </div>
          )}
        </div>
        <div className="unit-navigation">
          <button
            onClick={prevUnit}
            disabled={currentUnitIndex === 0}
            className="nav-button"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${(currentUnitIndex + 1) / defaultUnidades.length * 100}%` }}
            />
          </div>
          <button
            onClick={nextUnit}
            disabled={currentUnitIndex === defaultUnidades.length - 1}
            className="nav-button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
  switch (activeTab) {
    case 'contenidos':
      return (
        <div className="contenidos-container">
          {/* Sección de Temas */}
          {renderTemas()}

        </div>
      );
    case 'actividades':
      return renderActividades();
    case 'participantes':
      return renderParticipantes();
    case 'annuncios':
      return renderAnuncios();
    default:
      return renderTemas();
  }
};

  return (
    <div className="unidades-container">
      {/* Nuevo Header con Navegación Integrada */}
      <div className="unit-header">
        <div className="unit-header-content">
          <div className="unit-title-container">
            <h1 className="unit-title">{currentUnit.name}</h1>
            <p className="unit-subtitle">{currentUnit.title}</p>
            <p className="unit-description">{currentUnit.description}</p>
          </div>
        </div>

        <div className="unit-selector">
          {defaultUnidades.map((unidad, index) => (
            <button
              key={unidad.id}
              className={`unit-selector-button ${index === currentUnitIndex ? 'active' : ''}`}
              onClick={() => setCurrentUnitIndex(index)}
            >
              {unidad.name}
            </button>
          ))}
        </div>
      </div>

      {/* Navegación de pestañas */}
      <div className="tabs-container">
        <nav className="tabs-nav">
          {[
            {id: 'contenidos', label: 'Contenidos', icon: BookOpen},
            {id: 'actividades', label: 'Actividades', icon: FileText},
            {id: 'participantes', label: 'Participantes', icon: User},
            {id: 'annuncios', label: 'Anuncios', icon: MessageSquare}
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Grid layout para el contenido principal y sidebar */}
      <div className="content-grid">
        {/* Contenido principal */}
        <div>
          {renderTabContent()}
        </div>
      </div>

    </div>
  );
};

export default UnidadesMenu;