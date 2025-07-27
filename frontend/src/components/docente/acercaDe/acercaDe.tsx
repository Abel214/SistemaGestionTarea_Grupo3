import React from 'react';
import { GraduationCap, Briefcase, Code, Globe, Mail, MapPin, User, BookOpen } from 'lucide-react';
import './acercaDe.css'
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
const PerfilDocente = ({ docente }) => {
  return (
    <div className="perfil-docente-container">
      {/* Tarjeta de presentación */}
      <div className="perfil-header">
        <div className="perfil-avatar">
          <img
            src={docente.foto || '/images/docente-default.jpg'}
            alt={`${docente.nombre}`}
            className="avatar-img"
          />
        </div>
        <div className="perfil-titulo">
          <h1>{docente.titulo || 'DOCENTE INVESTIGADOR'}</h1>
          <h2>{docente.nombre}</h2>
          <div className="perfil-institucion">
            <span>{docente.institucion || 'Universidad Nacional de Loja'}</span>
            <span className="perfil-departamento">{docente.departamento || 'CIS-UNL'}</span>
          </div>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="perfil-contacto">
        <div className="contacto-item">
          <MapPin size={18} />
          <span>{docente.ubicacion || 'Loja, Ecuador'}</span>
        </div>
        <div className="contacto-item">
          <Mail size={18} />
          <span>{docente.email || 'docente@unl.edu.ec'}</span>
        </div>
      </div>

      {/* Sección de perfil profesional */}
      <div className="perfil-seccion">
        <h3>
          <User size={20} className="icono-seccion" />
          <span>Perfil Profesional</span>
        </h3>
        <p className="perfil-descripcion">
          {docente.descripcion || 'Profesor e investigador de la Universidad Nacional de Loja, Ecuador. Ingeniero en Sistemas (UNL), Máster en Sistemas Informáticos Avanzados mención Sistemas Distribuidos y Web (UPV/EHU). Áreas de interés: Tecnologías Web y móviles, Lenguajes de Programación, Sistemas Distribuidos y Paralelos.'}
        </p>
      </div>

      {/* Experiencia profesional */}
      <div className="perfil-seccion">
        <h3>
          <Briefcase size={20} className="icono-seccion" />
          <span>Experiencia Profesional</span>
        </h3>
        <div className="timeline">
          {docente.experiencia?.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-periodo">{exp.periodo}</div>
              <div className="timeline-content">
                <h4>{exp.institucion}</h4>
                <p className="timeline-departamento">{exp.departamento}</p>
                <p className="timeline-cargo">
                  <em>{exp.cargo}</em>
                </p>
              </div>
            </div>
          )) || (
            <>
              <div className="timeline-item">
                <div className="timeline-periodo">2008 - actual</div>
                <div className="timeline-content">
                  <h4>Universidad Nacional de Loja</h4>
                  <p className="timeline-departamento">Carrera Computación, FERNNR</p>
                  <p className="timeline-cargo">
                    <em>Docente Investigador</em>
                  </p>
                </div>
              </div>
              {/* Puedes agregar más experiencias por defecto aquí */}
            </>
          )}
        </div>
      </div>

      {/* Asignaturas */}
      {docente.asignaturas && docente.asignaturas.length > 0 && (
        <div className="perfil-seccion">
          <h3>
            <BookOpen size={20} className="icono-seccion" />
            <span>Asignaturas</span>
          </h3>
          <div className="asignaturas-grid">
            {docente.asignaturas.map((asignatura, index) => (
              <div key={index} className="asignatura-card">
                <h4>{asignatura.nombre}</h4>
                <p>{asignatura.codigo}</p>
                <div className="asignatura-meta">
                  <span>{asignatura.ciclo}</span>
                  <span>{asignatura.horario}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilDocente;