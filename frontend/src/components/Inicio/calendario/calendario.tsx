import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Calendar, ChevronLeft, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';
import './calendario.css';

const AcademicCalendar = ({ assignments = [] }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4); // Empezar en Julio (índice 4)
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Datos de ejemplo para demostrar funcionalidad
  const sampleAssignments = assignments.length > 0 ? assignments : [
    {
      id: 1,
      title: "Ensayo de Literatura",
      dueDate: "2025-07-18",
      status: "pending",
      subject: "Literatura",
      type: "essay"
    },
    {
      id: 2,
      title: "Examen de Matemáticas",
      dueDate: "2025-07-22",
      status: "pending",
      subject: "Matemáticas",
      type: "exam"
    },
    {
      id: 3,
      title: "Proyecto de Ciencias",
      dueDate: "2025-07-25",
      status: "completed",
      subject: "Ciencias",
      type: "project"
    },
    {
      id: 4,
      title: "Presentación Historia",
      dueDate: "2025-08-05",
      status: "pending",
      subject: "Historia",
      type: "presentation"
    },
    {
      id: 5,
      title: "Examen de Física",
      dueDate: "2025-07-18",
      status: "pending",
      subject: "Física",
      type: "exam"
    },
    {
      id: 6,
      title: "Informe de Química",
      dueDate: "2025-07-22",
      status: "completed",
      subject: "Química",
      type: "essay"
    },
  ];

  const academicMonths = [
    { name: 'Marzo', year: 2025, number: 3 },
    { name: 'Abril', year: 2025, number: 4 },
    { name: 'Mayo', year: 2025, number: 5 },
    { name: 'Junio', year: 2025, number: 6 },
    { name: 'Julio', year: 2025, number: 7 },
    { name: 'Agosto', year: 2025, number: 8 }
  ];

  const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const getTypeIcon = (type) => {
    const iconProps = { size: 16 };
    switch(type) {
      case 'exam': return <AlertCircle {...iconProps} className="icon-exam" />;
      case 'essay': return <FileText {...iconProps} className="icon-essay" />;
      case 'project': return <BookOpen {...iconProps} className="icon-project" />;
      case 'presentation': return <Calendar {...iconProps} className="icon-presentation" />;
      default: return <FileText {...iconProps} className="icon-default" />;
    }
  };

  const renderCalendar = (month) => {
    const year = month.year;
    const monthNumber = month.number;

    // Primer día del mes y días en el mes
    const firstDay = new Date(year, monthNumber - 1, 1);
    const lastDay = new Date(year, monthNumber, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Filtrar tareas para este mes
    const monthTasks = sampleAssignments.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getFullYear() === year && taskDate.getMonth() === monthNumber - 1;
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
      const dayTasks = monthTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === day;
      });

      const isToday = new Date().toDateString() === new Date(year, monthNumber - 1, day).toDateString();

      const handleDayClick = () => {
        if (dayTasks.length > 0) {
          setSelectedDay({ day, tasks: dayTasks, month: month.name });
          setShowPopup(true);
        }
      };

      const dayClasses = [
        'calendar-day',
        dayTasks.length > 0 ? 'clickable' : '',
        isToday ? 'today' : ''
      ].filter(Boolean).join(' ');

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={handleDayClick}
        >
          <div className={`day-number ${isToday ? 'today' : ''}`}>
            {day}
          </div>

          {dayTasks.length > 0 && (
            <div className="tasks-container">
              <div className="tasks-list">
                {dayTasks.slice(0, 2).map((task, index) => (
                  <div
                    key={index}
                    className={`task-item ${task.status}`}
                    title={`${task.title} - ${task.subject}`}
                  >
                    <div className="task-icon">
                      {getTypeIcon(task.type)}
                    </div>
                    <span className="task-title">{task.title}</span>
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="more-tasks">
                    +{dayTasks.length - 2} más
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const currentMonth = academicMonths[currentMonthIndex];

  const nextMonth = () => {
    if (currentMonthIndex < academicMonths.length - 1) {
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
              {currentMonth.name} {currentMonth.year}
            </h3>

            <button
              onClick={nextMonth}
              disabled={currentMonthIndex === academicMonths.length - 1}
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
          {renderCalendar(currentMonth)}
        </div>
      </div>

      {/* Popup para mostrar tareas del día */}
      {showPopup && selectedDay && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">
                Tareas del {selectedDay.day} de {selectedDay.month}
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="popup-close"
              >
                ✕
              </button>
            </div>

            <div className="popup-tasks">
              {selectedDay.tasks.map(task => (
                <div key={task.id} className={`popup-task ${task.status}`}>
                  <div className="popup-task-content">
                    <div className="popup-task-info">
                      <h4 className="popup-task-title">
                        {getTypeIcon(task.type)}
                        <span style={{ marginLeft: '0.5rem' }}>{task.title}</span>
                      </h4>
                      <p className="popup-task-subject">{task.subject}</p>
                      <p className="popup-task-date">
                        <Clock size={12} style={{ marginRight: '0.25rem' }} />
                        {new Date(task.dueDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    {task.status === 'completed' && (
                      <CheckCircle size={16} className="popup-completed-icon" />
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

export default AcademicCalendar;
