import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, BookOpen, FileText, ClipboardList, Edit, Save } from 'lucide-react';
import './paralelo.css';

const DocenteParalelos = () => {
  // Datos de ejemplo para paralelos y estudiantes
  const [paralelos, setParalelos] = useState([
    {
      id: 1,
      materia: 'Matemáticas',
      codigo: 'MAT-101',
      horario: 'Lunes y Miércoles 10:00-12:00',
      estudiantes: [
        { id: 1, nombre: 'Juan Pérez', acd: 18, aa: 17, ape: 19, total: 18 },
        { id: 2, nombre: 'Ana Torres', acd: 19, aa: 18, ape: 20, total: 19 },
        { id: 3, nombre: 'Carlos Ruiz', acd: 15, aa: 16, ape: 17, total: 16 },
        // ... más estudiantes
      ]
    },
    {
      id: 2,
      materia: 'Física',
      codigo: 'FIS-201',
      horario: 'Martes y Jueves 14:00-16:00',
      estudiantes: [
        { id: 4, nombre: 'María Gómez', acd: 17, aa: 18, ape: 19, total: 18 },
        { id: 5, nombre: 'Luis Mendoza', acd: 16, aa: 15, ape: 17, total: 16 },
        // ... más estudiantes
      ]
    }
  ]);

  const [currentParaleloIndex, setCurrentParaleloIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('estudiantes');
  const [editing, setEditing] = useState(false);
  const [tempGrades, setTempGrades] = useState({});

  const currentParalelo = paralelos[currentParaleloIndex];

  // Calcular promedio del paralelo
  const promedioParalelo = currentParalelo.estudiantes.reduce(
    (sum, estudiante) => sum + estudiante.total, 0) / currentParalelo.estudiantes.length;

  const nextParalelo = () => {
    if (currentParaleloIndex < paralelos.length - 1) {
      setCurrentParaleloIndex(currentParaleloIndex + 1);
      setEditing(false);
    }
  };

  const prevParalelo = () => {
    if (currentParaleloIndex > 0) {
      setCurrentParaleloIndex(currentParaleloIndex - 1);
      setEditing(false);
    }
  };

  const handleGradeChange = (estudianteId, type, value) => {
    const numericValue = Math.min(20, Math.max(0, parseInt(value) || 0));
    setTempGrades(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        [type]: numericValue,
        total: type === 'acd' || type === 'aa' || type === 'ape'
          ? Math.round((
              (numericValue * (type === 'acd' ? 0.3 : type === 'aa' ? 0.3 : 0.4)) +
              ((prev[estudianteId]?.acd || currentParalelo.estudiantes.find(e => e.id === estudianteId).acd) * (type !== 'acd' ? 0.3 : 0)) +
              ((prev[estudianteId]?.aa || currentParalelo.estudiantes.find(e => e.id === estudianteId).aa) * (type !== 'aa' ? 0.3 : 0)) +
              ((prev[estudianteId]?.ape || currentParalelo.estudiantes.find(e => e.id === estudianteId).ape) * (type !== 'ape' ? 0.4 : 0))
            ))
          : prev[estudianteId]?.total
      }
    }));
  };

  const saveGrades = () => {
    const updatedParalelos = paralelos.map(paralelo => {
      if (paralelo.id === currentParalelo.id) {
        return {
          ...paralelo,
          estudiantes: paralelo.estudiantes.map(estudiante => ({
            ...estudiante,
            ...(tempGrades[estudiante.id] || {})
          }))
        };
      }
      return paralelo;
    });

    setParalelos(updatedParalelos);
    setTempGrades({});
    setEditing(false);
  };

  const renderEstudiantes = () => (
    <div className="card">
      <div className="card-header">
        <h3>ESTUDIANTES - {currentParalelo.materia}</h3>
        <div className="header-actions">
          {editing ? (
            <button className="action-button save" onClick={saveGrades}>
              <Save size={16} /> Guardar
            </button>
          ) : (
            <button className="action-button edit" onClick={() => setEditing(true)}>
              <Edit size={16} /> Editar Calificaciones
            </button>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="grades-summary">
          <div className="summary-item">
            <span className="summary-label">Promedio del paralelo:</span>
            <span className="summary-value">{promedioParalelo.toFixed(1)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total estudiantes:</span>
            <span className="summary-value">{currentParalelo.estudiantes.length}</span>
          </div>
        </div>

        <div className="table-container">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>ACD (30%)</th>
                <th>AA (30%)</th>
                <th>APE (40%)</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {currentParalelo.estudiantes.map(estudiante => {
                const editedEstudiante = tempGrades[estudiante.id] || {};
                const displayEstudiante = { ...estudiante, ...editedEstudiante };

                return (
                  <tr key={estudiante.id}>
                    <td>{estudiante.nombre}</td>
                    <td>
                      {editing ? (
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={displayEstudiante.acd}
                          onChange={(e) => handleGradeChange(estudiante.id, 'acd', e.target.value)}
                          className="grade-input"
                        />
                      ) : (
                        displayEstudiante.acd
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={displayEstudiante.aa}
                          onChange={(e) => handleGradeChange(estudiante.id, 'aa', e.target.value)}
                          className="grade-input"
                        />
                      ) : (
                        displayEstudiante.aa
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={displayEstudiante.ape}
                          onChange={(e) => handleGradeChange(estudiante.id, 'ape', e.target.value)}
                          className="grade-input"
                        />
                      ) : (
                        displayEstudiante.ape
                      )}
                    </td>
                    <td className="total-grade">{displayEstudiante.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderParaleloInfo = () => (
    <div className="card">
      <div className="card-header">
        <h3>INFORMACIÓN DEL PARALELO</h3>
      </div>
      <div className="card-body">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Materia:</span>
            <span className="info-value">{currentParalelo.materia}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Código:</span>
            <span className="info-value">{currentParalelo.codigo}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Horario:</span>
            <span className="info-value">{currentParalelo.horario}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total estudiantes:</span>
            <span className="info-value">{currentParalelo.estudiantes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'estudiantes':
        return renderEstudiantes();
      case 'informacion':
        return renderParaleloInfo();
      default:
        return renderEstudiantes();
    }
  };

  return (
    <div className="docente-container">
      {/* Header con navegación de paralelos */}
      <div className="paralelo-header">
        <div className="header-content">

        </div>

        <div className="paralelo-selector">
          <button
            onClick={prevParalelo}
            disabled={currentParaleloIndex === 0}
            className="nav-button"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="paralelo-info">
            <h2>{currentParalelo.materia} - {currentParalelo.codigo}</h2>
            <p>{currentParalelo.horario}</p>
          </div>

          <button
            onClick={nextParalelo}
            disabled={currentParaleloIndex === paralelos.length - 1}
            className="nav-button"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Navegación de pestañas */}
      <div className="tabs-container">
        <nav className="tabs-nav">
          {[
            { id: 'estudiantes', label: 'Estudiantes', icon: Users },
            { id: 'informacion', label: 'Información', icon: BookOpen }
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

      {/* Contenido principal */}
      <div className="main-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DocenteParalelos;