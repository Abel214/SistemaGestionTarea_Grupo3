import React from 'react';
import Inicio from "../../components/Inicio/inicio";
import Layout from "../../layouts/Main_Layout";
import { GraduationCap, BookOpen, FileText, Calendar } from 'lucide-react';

function DashboardDocente() {
  // Secciones que tendrá el panel del docente
  const sections = [
    { id: 'materias', label: 'Materias' },
    { id: 'tareas', label: 'Tareas' },
    { id: 'calificaciones', label: 'Calificaciones' },
  ];

  const assignments = [
    { id: 1, title: 'Tarea de Álgebra', dueDate: '2025-07-15', status: 'pending' },
    { id: 2, title: 'Laboratorio de Fuerzas', dueDate: '2025-07-17', status: 'completed' },
  ];

  // Solo la imagen para la materia que quieres personalizar
  const imagenesMateria = {
    math: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png'
  };

  const grades = [
    {
      subject: 'Matemáticas',
      description: 'Álgebra, geometría y cálculo básico',
      students: [
        { name: 'Juan Pérez', grade: 18 },
        { name: 'Ana Torres', grade: 19 },
      ],
    },
    {
      subject: 'Física',
      description: 'Mecánica, termodinámica y electricidad',
      students: [
        { name: 'Luis García', grade: 17 },
        { name: 'Sofía Herrera', grade: 20 },
      ],
    },
  ];

  // ✅ AGREGAR ESTE ARRAY DE MATERIAS
  const subjects = [
    {
      id: 'math',
      name: 'Matemáticas',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'Álgebra, geometría y cálculo básico'
    },
    {
      id: 'physics',
      name: 'Física',
      icon: BookOpen,
      color: 'bg-green-500',
      description: 'Mecánica, termodinámica y electricidad'
    },

  ];

  return (
      <Inicio
        userType="teacher"
        imagenesMateria={imagenesMateria}
        sections={sections}
        assignments={assignments}
        grades={grades}
        subjects={subjects}
      />
  );
}

export default DashboardDocente;