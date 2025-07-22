import React from 'react';
import Inicio from "../../components/Inicio/inicio";
import { GraduationCap, BookOpen, FileText, Calendar, Clock, CheckCircle } from 'lucide-react';

function DashboardEstudiante() {
  // Configuración específica para estudiante
  const sections = [
    { id: 'dashboard', label: 'Área Personal' },
    { id: 'subjects', label: 'Mis Materias' },
    { id: 'assignments', label: 'Mis Tareas' },
    { id: 'grades', label: 'Calificaciones' },
    { id: 'messages', label: 'Mensajes' }
  ];

  // Tareas del estudiante con más detalle
  const assignments = [
    {
      id: 1,
      title: 'TAREA DE SEGURIDAD. Respaldo de contraseña y configuración',
      subject: 'Gestión de Redes y Comunicaciones',
      dueDate: '2025-07-13',
      status: 'pending',
      priority: 'high',
      course: 'MAR25-AGO25 GRADO',
      time: '23:59'
    },
    {
      id: 2,
      title: 'AAB. Avance del TFA',
      subject: 'Teoría de Automatas y Computabilidad Avanzada',
      dueDate: '2025-07-15',
      status: 'pending',
      priority: 'medium',
      course: 'MAR25-AGO25 GRADO',
      time: '23:59'
    },
    {
      id: 3,
      title: 'APEB. Programa Analizador Sintáctico de Lenguaje de Programación- Grupal',
      subject: 'Teoría de Automatas y Computabilidad Avanzada',
      dueDate: '2025-07-17',
      status: 'pending',
      priority: 'medium',
      course: 'MAR25-AGO25 GRADO',
      time: '23:59'
    }
  ];

  // Materias del estudiante
  const subjects = [
    {
      id: 'redes',
      name: 'Gestión de Redes y Comunicaciones',
      code: 'MAR25-AGO25',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Administración y configuración de redes',
      progress: 85,
      nextClass: 'Lunes 14 de Julio'
    },
    {
      id: 'automatas',
      name: 'Teoría de Automatas y Computabilidad Avanzada',
      code: 'MAR25-AGO25',
      icon: GraduationCap,
      color: 'bg-green-500',
      description: 'Lenguajes formales y compiladores',
      progress: 78,
      nextClass: 'Martes 15 de Julio'
    },
    {
      id: 'computo',
      name: 'Computación en la Nube',
      code: 'MAR25-AGO25',
      icon: FileText,
      color: 'bg-purple-500',
      description: 'Servicios y arquitecturas cloud',
      progress: 92,
      nextClass: 'Miércoles 16 de Julio'
    },
    {
      id: 'laborales',
      name: 'Laborales',
      code: 'MAR25-AGO25',
      icon: Calendar,
      color: 'bg-orange-500',
      description: 'Derecho laboral y relaciones industriales',
      progress: 88,
      nextClass: 'Jueves 17 de Julio'
    },
    {
      id: 'software',
      name: 'Procesos de Software',
      code: 'MAR25-AGO25',
      icon: BookOpen,
      color: 'bg-red-500',
      description: 'Metodologías de desarrollo de software',
      progress: 75,
      nextClass: 'Viernes 18 de Julio'
    },
    {
      id: 'distribuidos',
      name: 'Sistemas Distribuidos',
      code: 'MAR25-AGO25',
      icon: GraduationCap,
      color: 'bg-teal-500',
      description: 'Arquitecturas y protocolos distribuidos',
      progress: 90,
      nextClass: 'Lunes 21 de Julio'
    }
  ];

  // Calificaciones específicas del estudiante
  const grades = [
    {
      subject: 'Gestión de Redes y Comunicaciones',
      students: [
        { name: 'Mi Calificación', grade: 18.5 }
      ],
      assignments: [
        { name: 'Configuración de Router', grade: 19, weight: 30 },
        { name: 'Análisis de Protocolos', grade: 18, weight: 25 },
        { name: 'Proyecto Final', grade: 18.5, weight: 45 }
      ]
    },
    {
      subject: 'Teoría de Automatas',
      students: [
        { name: 'Mi Calificación', grade: 17.8 }
      ],
      assignments: [
        { name: 'Autómata Finito', grade: 18, weight: 35 },
        { name: 'Gramáticas Formales', grade: 17, weight: 30 },
        { name: 'Analizador Sintáctico', grade: 18.5, weight: 35 }
      ]
    }
  ];

  // Imágenes para las materias
  const imagenesMateria = {
    redes: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png',
    automatas: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png',
    computo: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png'
  };

  // Configuración específica para el área personal del estudiante
  const personalAreaConfig = {
    upcomingTasks: assignments.filter(task => task.status === 'pending').slice(0, 3),
    recentGrades: [
      { subject: 'Gestión de Redes', assignment: 'Configuración Router', grade: 19 },
      { subject: 'Automatas', assignment: 'Gramáticas Formales', grade: 17 }
    ],
    schedule: [
      { day: 'Lunes', time: '08:00-10:00', subject: 'Gestión de Redes' },
      { day: 'Martes', time: '10:00-12:00', subject: 'Automatas' },
      { day: 'Miércoles', time: '14:00-16:00', subject: 'Computación en la Nube' }
    ]
  };

  return (

      <Inicio
        userType="student"
        userName="Estudiante"
        userEmail="estudiante@uni.com"
        imagenesMateria={imagenesMateria}
        sections={sections}
        assignments={assignments}
        grades={grades}
        subjects={subjects}

      />

  );
}

export default DashboardEstudiante;