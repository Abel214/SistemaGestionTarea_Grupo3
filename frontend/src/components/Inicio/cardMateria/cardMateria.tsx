import React from 'react';

const SubjectCard = ({ subject, isTeacher, imagen }) => {
  return (
    <div className="subject-card-large">
      <div className="subject-card-image">
        {imagen ? (
          <img
            src={imagen}
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
              <div
                className={`subject-progress-bar-large ${subject.color}`}
                style={{ width: `${subject.progress}%` }}
              />
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

export default SubjectCard;