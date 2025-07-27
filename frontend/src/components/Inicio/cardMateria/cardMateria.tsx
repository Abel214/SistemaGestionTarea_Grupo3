// @ts-ignore
import React, { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SubjectCard = ({ subject, isStudent, imagen }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      // Animación inicial con CSS
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1.05)';
      cardRef.current.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'scale(1)';
      cardRef.current.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
  };

  const handleButtonClick = () => {
    // Solo los estudiantes pueden navegar a /materia
    if (!isStudent) {
      navigate(`/materia`);
    }
  };

  return (
    <div
      ref={cardRef}
      className="subject-card-large"
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'scale(1)',
        opacity: '0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease'
      }}
    >
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
      </div>
    </div>
  );
};

export default SubjectCard;