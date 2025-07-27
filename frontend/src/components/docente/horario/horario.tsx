import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, BookOpen, Users, Video } from 'lucide-react';
import './horario.css';

const CalendarioDocente = ({ clases = [] }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Datos de ejemplo si no se pasan clases
  const sampleClases = clases.length > 0 ? clases : [
    {
      id: 1,
      materia: "Matemáticas Avanzadas",
      fecha: "2025-07-15",
      horaInicio: "08:00",
      horaFin: "10:00",
      tipo: "presencial",
      aula: "Aula 302",
      tema: "Cálculo Integral"
    },
    {
      id: 2,
      materia: "Literatura Contemporánea",
      fecha: "2025-07-16",
      horaInicio: "10:00",
      horaFin: "12:00",
      tipo: "virtual",
      plataforma: "Zoom",
      enlace: "https://zoom.us/..."
    },
    {
      id: 3,
      materia: "Física Cuántica",
      fecha: "2025-07-17",
      horaInicio: "14:00",
      horaFin: "16:00",
      tipo: "presencial",
      aula: "Laboratorio 4",
      tema: "Principio de Incertidumbre"
    },
    {
      id: 4,
      materia: "Historia del Arte",
      fecha: "2025-07-18",
      horaInicio: "16:00",
      horaFin: "18:00",
      tipo: "virtual",
      plataforma: "Google Meet",
      enlace: "https://meet.google.com/..."
    }
  ];

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getTipoIcon = (tipo) => {
    const iconProps = { size: 16 };
    switch(tipo) {
      case 'virtual': return <Video {...iconProps} className="icon-virtual" />;
      case 'presencial': return <Users {...iconProps} className="icon-presencial" />;
      default: return <BookOpen {...iconProps} className="icon-default" />;
    }
  };

  const renderCalendar = () => {
    const year = new Date().getFullYear();
    const month = currentMonthIndex;

    // Primer día del mes y días en el mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Filtrar clases para este mes
    const monthClases = sampleClases.filter(clase => {
      if (!clase.fecha) return false;
      const claseDate = new Date(clase.fecha);
      return claseDate.getFullYear() === year && claseDate.getMonth() === month;
    });

    const days = [];

    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty-day"></div>
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dayClases = monthClases.filter(clase => {
        const claseDate = new Date(clase.fecha);
        return claseDate.getDate() === day;
      });

      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      const handleDayClick = () => {
        if (dayClases.length > 0) {
          setSelectedDay({
            day,
            clases: dayClases,
            month: months[month]
          });
          setShowPopup(true);
        }
      };

      const dayClasses = [
        'calendar-day',
        dayClases.length > 0 ? 'has-class' : '',
        isToday ? 'today' : ''
      ].filter(Boolean).join(' ');

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={handleDayClick}
        >
          <div className="day-number">
            {day}
            {isToday && <div className="today-indicator"></div>}
          </div>

          {dayClases.length > 0 && (
            <div className="classes-indicators">
              {dayClases.slice(0, 3).map((clase, index) => (
                <div
                  key={index}
                  className={`class-indicator ${clase.tipo}`}
                  title={`${clase.materia} - ${clase.tipo === 'presencial' ? clase.aula : clase.plataforma}`}
                >
                  {getTipoIcon(clase.tipo)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    if (currentMonthIndex < 11) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  return (
    <div className="calendar-container">
      {/* Header Card */}
      <div className="calendar-header-card">
        <div className="header-content">
          <div className="header-title-section">
            <Calendar className="header-icon" size={32} />
            <h2 className="header-title">Calendario de Clases</h2>
          </div>
          <div className="header-period">
            {months[currentMonthIndex]} {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="calendar-card">
        {/* Calendar Header */}
        <div className="calendar-nav-header">
          <div className="nav-controls">
            <button
              onClick={prevMonth}
              disabled={currentMonthIndex === 0}
              className="nav-button"
            >
              <ChevronLeft size={24} />
            </button>

            <h3 className="month-title">
              {months[currentMonthIndex]} {new Date().getFullYear()}
            </h3>

            <button
              onClick={nextMonth}
              disabled={currentMonthIndex === 11}
              className="nav-button"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Week Days */}
        <div className="weekdays-header">
          {weekDays.map(day => (
            <div key={day} className="weekday-cell">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>

      {/* Popup para mostrar clases del día */}
      {showPopup && selectedDay && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">
                Clases del {selectedDay.day} de {selectedDay.month}
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="popup-close"
              >
                ✕
              </button>
            </div>

            <div className="popup-classes">
              {selectedDay.clases.map(clase => (
                <div key={clase.id} className={`popup-class ${clase.tipo}`}>
                  <div className="popup-class-icon">
                    {getTipoIcon(clase.tipo)}
                  </div>
                  <div className="popup-class-details">
                    <h4 className="popup-class-title">{clase.materia}</h4>
                    <p className="popup-class-time">
                      <Clock size={12} />
                      {clase.horaInicio} - {clase.horaFin}
                    </p>
                    <p className="popup-class-location">
                      {clase.tipo === 'presencial' ? (
                        <>Aula: {clase.aula}</>
                      ) : (
                        <>Plataforma: {clase.plataforma}</>
                      )}
                    </p>
                    {clase.tema && (
                      <p className="popup-class-topic">
                        Tema: {clase.tema}
                      </p>
                    )}
                    {clase.tipo === 'virtual' && (
                      <a
                        href={clase.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="popup-class-link"
                      >
                        Unirse a la clase
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarioDocente;