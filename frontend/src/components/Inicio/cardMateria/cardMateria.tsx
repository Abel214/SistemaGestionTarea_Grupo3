import React from 'react';
import {useNavigate} from "react-router-dom";

const SubjectCard = ({ subject, isStudent, imagen }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Solo los estudiantes pueden navegar a /materia
    if (!isStudent) {
      navigate(`/materia`);
    }
  };

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
        {!isStudent && subject.progress && (
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
        {isStudent && (
          <p className="subject-description-large">
            {subject.description || 'Se enfoca en la gestión de contenido, estudiantes y evaluaciones de la materia.'}
          </p>
        )}
        <button
          className="subject-button"
          onClick={handleButtonClick}
          disabled={isStudent} // Opcional: deshabilitar el botón para profesores
        >
          Ir a Materia
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;