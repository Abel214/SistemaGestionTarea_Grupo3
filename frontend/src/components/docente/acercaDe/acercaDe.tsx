import React from 'react';
import { GraduationCap, Briefcase, Code, Globe, Mail, MapPin, User, BookOpen } from 'lucide-react';
import './acercaDe.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta o la ruta sea correcta

const docenteEjemplo = {
  // Usar la imagen subida por el usuario
  foto: 'http://googleusercontent.com/file_content/0',
  titulo: 'DOCENTE INVESTIGADOR CIS-UNL',
  nombre: 'Dr. Juan Pérez',
  institucion: 'Universidad Nacional de Loja',
  departamento: 'Carrera de Computación',
  ubicacion: 'Loja, Ecuador',
  email: 'j.perez@unl.edu.ec',
  descripcion: 'Profesor e investigador especializado en sistemas distribuidos, con un enfoque en el desarrollo de soluciones innovadoras para la educación y la investigación. Apasionado por la inteligencia artificial, el aprendizaje automático y la computación en la nube. Mi objetivo es formar a la próxima generación de ingenieros y científicos de la computación, fomentando la creatividad y el pensamiento crítico.',
  experiencia: [
    {
      periodo: '2008 - actual',
      institucion: 'Universidad Nacional de Loja',
      departamento: 'Carrera Computación, FERNNR',
      cargo: 'Docente Investigador'
    },
    {
      periodo: '2005 - 2008',
      institucion: 'Universidad Politécnica Salesiana',
      departamento: 'Ingeniería de Sistemas',
      cargo: 'Profesor Asistente'
    },
    {
      periodo: '2003 - 2005',
      institucion: 'Empresa de Software "Innovatech"',
      departamento: 'Desarrollo de Software',
      cargo: 'Ingeniero de Software Senior'
    }
  ],
  asignaturas: [
    {
      nombre: 'Sistemas Distribuidos',
      codigo: 'CS-505',
      ciclo: 'Quinto Ciclo',
      horario: 'Lunes 08:00-10:00'
    },
    {
      nombre: 'Inteligencia Artificial',
      codigo: 'IA-601',
      ciclo: 'Sexto Ciclo',
      horario: 'Martes 10:00-12:00'
    },
    {
      nombre: 'Programación Web Avanzada',
      codigo: 'PW-702',
      ciclo: 'Séptimo Ciclo',
      horario: 'Miércoles 14:00-16:00'
    },
    {
      nombre: 'Bases de Datos II',
      codigo: 'BD-403',
      ciclo: 'Cuarto Ciclo',
      horario: 'Jueves 16:00-18:00'
    }
  ]
};

const PerfilDocente = ({ docente = docenteEjemplo }) => { // Usar docenteEjemplo como valor por defecto
  return (
    <div className="perfil-docente-container">
      {/* Tarjeta de presentación (Header) */}
      <div className="perfil-header">
        <div className="perfil-avatar">
          <img
            src={docente.foto || 'https://placehold.co/120x120/E0E0E0/333333?text=Docente'} // Fallback con placeholder
            alt={`${docente.nombre}`}
            className="avatar-img"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/120x120/E0E0E0/333333?text=Docente'; }} // Fallback en caso de error de carga
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

      {/* Sección de perfil profesional como tarjeta */}
      <div className="perfil-seccion section-card">
        <h3>
          <User size={20} className="icono-seccion" />
          <span>Perfil Profesional</span>
        </h3>
        <p className="perfil-descripcion">
          {docente.descripcion || 'Profesor e investigador de la Universidad Nacional de Loja, Ecuador. Ingeniero en Sistemas (UNL), Máster en Sistemas Informáticos Avanzados mención Sistemas Distribuidos y Web (UPV/EHU). Áreas de interés: Tecnologías Web y móviles, Lenguajes de Programación, Sistemas Distribuidos y Paralelos.'}
        </p>
      </div>

      {/* Experiencia profesional como tarjetas individuales */}
      <div className="perfil-seccion section-card">
        <h3>
          <Briefcase size={20} className="icono-seccion" />
          <span>Experiencia Profesional</span>
        </h3>
        <div className="experiencia-grid">
          {docente.experiencia?.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="periodo">{exp.periodo}</div>
              <h4>{exp.institucion}</h4>
              <p className="departamento">{exp.departamento}</p>
              <p className="cargo">
                <em>{exp.cargo}</em>
              </p>
            </div>
          )) || (
            <>
              {/* Experiencias por defecto si no hay datos */}
              <div className="experience-card">
                <div className="periodo">2008 - actual</div>
                <h4>Universidad Nacional de Loja</h4>
                <p className="departamento">Carrera Computación, FERNNR</p>
                <p className="cargo">
                  <em>Docente Investigador</em>
                </p>
              </div>
              <div className="experience-card">
                <div className="periodo">2005 - 2008</div>
                <h4>Universidad Politécnica Salesiana</h4>
                <p className="departamento">Ingeniería de Sistemas</p>
                <p className="cargo">
                  <em>Profesor Asistente</em>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Asignaturas como tarjeta */}
      {docente.asignaturas && docente.asignaturas.length > 0 && (
        <div className="perfil-seccion section-card">
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
