import React from 'react';
import MateriaVista from "../../../components/Inicio/materiaVista/materiaVista";
import { GraduationCap, BookOpen, FileText, Calendar, Clock, CheckCircle, Users, MessageSquare } from 'lucide-react';

function DashboardEstudiante() {
  // Configuración de secciones con unidades
  const sections = [
    { id: 'dashboard', label: 'Área Personal' },
    { id: 'unidades', label: 'Unidades', hasSubsections: true },
    { id: 'subjects', label: 'Mis Materias' },
    { id: 'participants', label: 'Participantes' },
    { id: 'announcements', label: 'Anuncios' },
    { id: 'grades', label: 'Calificaciones' },
    { id: 'messages', label: 'Mensajes' }
  ];

  // Definición de unidades con sus respectivas tareas
  const unidades = [
    {
      id: 'unidad1',
      name: 'Unidad I',
      title: 'Fundamentos y Conceptos Básicos',
      description: 'Introducción a los conceptos fundamentales del software',
      progress: 85,
      totalTasks: 4,
      completedTasks: 3,
      tasks: [
        {
          id: 1,
          title: 'APEI: Laboratorio: Diseño de procesos con herramientas BPMN',
          subject: 'Procesos de Software',
          dueDate: '2025-07-15',
          status: 'pending',
          priority: 'high',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Diseñar procesos empresariales utilizando notación BPMN'
        },
        {
          id: 2,
          title: 'AAI: Investigaciones necesarias para el laboratorio',
          subject: 'Procesos de Software',
          dueDate: '2025-07-17',
          status: 'pending',
          priority: 'medium',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Investigación previa para el desarrollo del laboratorio'
        },
        {
          id: 3,
          title: 'ACD: Taller de revisión bibliográfica',
          subject: 'Procesos de Software',
          dueDate: '2025-07-20',
          status: 'completed',
          priority: 'low',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Revisión de literatura especializada'
        }
      ]
    },
    {
      id: 'unidad2',
      name: 'Unidad II',
      title: 'Metodologías y Procesos',
      description: 'Estudio de metodologías de desarrollo de software',
      progress: 60,
      totalTasks: 5,
      completedTasks: 2,
      tasks: [
        {
          id: 4,
          title: 'TAREA DE SEGURIDAD. Respaldo de contraseña y configuración',
          subject: 'Gestión de Redes y Comunicaciones',
          dueDate: '2025-07-13',
          status: 'pending',
          priority: 'high',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Configuración de seguridad y respaldos'
        },
        {
          id: 5,
          title: 'AAB. Avance del TFA',
          subject: 'Teoría de Automatas y Computabilidad Avanzada',
          dueDate: '2025-07-15',
          status: 'pending',
          priority: 'medium',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Avance del trabajo final de asignatura'
        }
      ]
    },
    {
      id: 'unidad3',
      name: 'Unidad III',
      title: 'Implementación y Evaluación',
      description: 'Aplicación práctica y evaluación de procesos',
      progress: 40,
      totalTasks: 3,
      completedTasks: 1,
      tasks: [
        {
          id: 6,
          title: 'APEB. Programa Analizador Sintáctico de Lenguaje de Programación- Grupal',
          subject: 'Teoría de Automatas y Computabilidad Avanzada',
          dueDate: '2025-07-17',
          status: 'pending',
          priority: 'high',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Desarrollo grupal de analizador sintáctico'
        },
        {
          id: 7,
          title: 'Proyecto Final - Implementación',
          subject: 'Procesos de Software',
          dueDate: '2025-07-25',
          status: 'pending',
          priority: 'high',
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Implementación del proyecto final de la materia'
        }
      ]
    }
  ];

  // Participantes del curso
  const participants = [
    {
      id: 1,
      name: 'Luis Medina',
      email: 'estudiante@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Luis+Medina&background=0ea5e9&color=fff',
      status: 'active',
      lastActive: '2025-07-18'
    },
    {
      id: 2,
      name: 'Francisco Alvarez Pineda',
      email: 'profesor@uni.com',
      role: 'Docente',
      avatar: 'https://ui-avatars.com/api/?name=Francisco+Alvarez&background=10b981&color=fff',
      status: 'active',
      lastActive: '2025-07-18'
    },
    {
      id: 3,
      name: 'María González',
      email: 'maria.gonzalez@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=f59e0b&color=fff',
      status: 'active',
      lastActive: '2025-07-17'
    },
    {
      id: 4,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=ef4444&color=fff',
      status: 'active',
      lastActive: '2025-07-16'
    }
  ];

  // Anuncios del docente
  const announcements = [
    {
      id: 1,
      title: 'Recordatorio: Entrega de Tarea de Seguridad',
      content: 'Estimados estudiantes, les recuerdo que la tarea de seguridad debe ser entregada antes del 13 de julio a las 23:59. Por favor, asegúrense de incluir todos los archivos de configuración requeridos.',
      author: 'Francisco Alvarez Pineda',
      date: '2025-07-12',
      priority: 'high',
      subject: 'Gestión de Redes y Comunicaciones'
    },
    {
      id: 2,
      title: 'Material Adicional - Unidad II',
      content: 'He subido material adicional para la Unidad II en la sección de recursos. Este material les ayudará con el desarrollo del analizador sintáctico.',
      author: 'Francisco Alvarez Pineda',
      date: '2025-07-10',
      priority: 'medium',
      subject: 'Teoría de Automatas y Computabilidad Avanzada'
    },
    {
      id: 3,
      title: 'Horario de Consultas',
      content: 'Estaré disponible para consultas los días martes y jueves de 14:00 a 16:00 horas en mi oficina. También pueden escribirme por el sistema de mensajes.',
      author: 'Francisco Alvarez Pineda',
      date: '2025-07-08',
      priority: 'low',
      subject: 'General'
    }
  ];

  // Todas las tareas combinadas (para mantener compatibilidad)
  const allAssignments = unidades.flatMap(unidad => unidad.tasks);

  // Materias del estudiante (mantener estructura original)
  const subjects = [
    {
      id: 'software',
      name: 'Procesos de Software',
      code: 'MAR25-AGO25',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Metodologías de desarrollo de software',
      progress: 75,
      nextClass: 'Viernes 18 de Julio'
    },
    {
      id: 'redes',
      name: 'Gestión de Redes y Comunicaciones',
      code: 'MAR25-AGO25',
      icon: GraduationCap,
      color: 'bg-green-500',
      description: 'Administración y configuración de redes',
      progress: 85,
      nextClass: 'Lunes 14 de Julio'
    },
    {
      id: 'automatas',
      name: 'Teoría de Automatas y Computabilidad Avanzada',
      code: 'MAR25-AGO25',
      icon: FileText,
      color: 'bg-purple-500',
      description: 'Lenguajes formales y compiladores',
      progress: 78,
      nextClass: 'Martes 15 de Julio'
    }
  ];

  // Calificaciones (mantener estructura original)
  const grades = [
    {
      subject: 'Procesos de Software',
      students: [
        { name: 'Mi Calificación', grade: 18.2 }
      ],
      assignments: [
        { name: 'Taller Bibliográfico', grade: 19, weight: 20 },
        { name: 'Laboratorio BPMN', grade: 17.5, weight: 35 },
        { name: 'Proyecto Final', grade: 18, weight: 45 }
      ]
    },
    {
      subject: 'Gestión de Redes y Comunicaciones',
      students: [
        { name: 'Mi Calificación', grade: 18.5 }
      ],
      assignments: [
        { name: 'Configuración de Router', grade: 19, weight: 30 },
        { name: 'Tarea de Seguridad', grade: 18, weight: 25 },
        { name: 'Proyecto Final', grade: 18.5, weight: 45 }
      ]
    }
  ];

  // Imágenes para las materias
  const imagenesMateria = {
    software: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png',
    redes: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png',
    automatas: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png'
  };

  return (
    <MateriaVista
      userType="studentMateria"
      userName="Luis Medina"
      userEmail="estudiante@uni.com"
      imagenesMateria={imagenesMateria}
      sections={sections}
      assignments={allAssignments}
      grades={grades}
      subjects={subjects}
      // Nuevas propiedades para las unidades

    />
  );
}

export default DashboardEstudiante;