import React from 'react';
import MateriaVista from "../../../components/docente/docenteMateria";
import { GraduationCap, BookOpen, FileText, Calendar, Clock, CheckCircle, Users, MessageSquare, ClipboardList, UploadCloud } from 'lucide-react';

function DashboardDocente() {
  // Configuración de secciones específicas para docentes
  const sections = [
    { id: 'dashboard', label: 'Panel de Control' },
    { id: 'unidades', label: 'Unidades', hasSubsections: true },
    { id: 'students', label: 'Estudiantes' },
    { id: 'assignments', label: 'Tareas' },
    { id: 'announcements', label: 'Anuncios' },
    { id: 'grades', label: 'Calificaciones' },
    { id: 'resources', label: 'Recursos' },
    { id: 'messages', label: 'Mensajes' }
  ];

  // Definición de unidades con tareas (vista docente)
  const unidades = [
    {
      id: 'unidad1',
      name: 'Unidad I',
      title: 'Fundamentos y Conceptos Básicos',
      description: 'Introducción a los conceptos fundamentales del software',
      totalStudents: 25,
      submittedTasks: 20,
      tasks: [
        {
          id: 1,
          title: 'Laboratorio: Diseño de procesos con BPMN',
          subject: 'Procesos de Software',
          dueDate: '2025-07-15',
          status: 'grading', // Estado diferente para docente
          submissions: 18,
          totalStudents: 25,
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Diseñar procesos empresariales utilizando notación BPMN'
        },
        {
          id: 2,
          title: 'Investigaciones para el laboratorio',
          subject: 'Procesos de Software',
          dueDate: '2025-07-17',
          status: 'submitted',
          submissions: 22,
          totalStudents: 25,
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Investigación previa para el desarrollo del laboratorio'
        }
      ]
    },
    {
      id: 'unidad2',
      name: 'Unidad II',
      title: 'Metodologías y Procesos',
      description: 'Estudio de metodologías de desarrollo de software',
      totalStudents: 25,
      submittedTasks: 15,
      tasks: [
        {
          id: 3,
          title: 'Tarea de Seguridad: Configuración',
          subject: 'Gestión de Redes y Comunicaciones',
          dueDate: '2025-07-13',
          status: 'pending',
          submissions: 10,
          totalStudents: 25,
          course: 'MAR25-AGO25 GRADO',
          time: '23:59',
          description: 'Configuración de seguridad y respaldos'
        }
      ]
    }
  ];

  // Lista de estudiantes
  const students = [
    {
      id: 1,
      name: 'Luis Medina',
      email: 'estudiante@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Luis+Medina&background=0ea5e9&color=fff',
      status: 'active',
      lastActive: '2025-07-18',
      progress: 85,
      averageGrade: 18.2
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=f59e0b&color=fff',
      status: 'active',
      lastActive: '2025-07-17',
      progress: 72,
      averageGrade: 17.5
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@uni.com',
      role: 'Estudiante',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Rodriguez&background=ef4444&color=fff',
      status: 'active',
      lastActive: '2025-07-16',
      progress: 68,
      averageGrade: 16.8
    }
  ];

  // Anuncios creados por el docente
  const announcements = [
    {
      id: 1,
      title: 'Recordatorio: Entrega de Tarea de Seguridad',
      content: 'Estimados estudiantes, les recuerdo que la tarea de seguridad debe ser entregada antes del 13 de julio a las 23:59. No se aceptarán entregas tardías.',
      author: 'Usted',
      date: '2025-07-12',
      priority: 'high',
      subject: 'Gestión de Redes y Comunicaciones',
      status: 'published'
    },
    {
      id: 2,
      title: 'Material Adicional - Unidad II',
      content: 'He subido material adicional para la Unidad II en la sección de recursos. Este material les ayudará con el desarrollo del analizador sintáctico.',
      author: 'Usted',
      date: '2025-07-10',
      priority: 'medium',
      subject: 'Teoría de Automatas y Computabilidad Avanzada',
      status: 'published'
    },
    {
      id: 3,
      title: 'Borrador: Cambio en fechas de evaluación',
      content: 'Estoy considerando cambiar las fechas de evaluación para la Unidad III. Por favor denme su opinión.',
      author: 'Usted',
      date: '2025-07-08',
      priority: 'low',
      subject: 'Procesos de Software',
      status: 'draft'
    }
  ];

  // Todas las tareas combinadas
  const allAssignments = unidades.flatMap(unidad => unidad.tasks);

  // Materias que imparte el docente
  const subjects = [
    {
      id: 'software',
      name: 'Procesos de Software',
      code: 'MAR25-AGO25',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Metodologías de desarrollo de software',
      totalStudents: 25,
      activeAssignments: 3,
      nextClass: 'Viernes 18 de Julio'
    },
    {
      id: 'redes',
      name: 'Gestión de Redes y Comunicaciones',
      code: 'MAR25-AGO25',
      icon: GraduationCap,
      color: 'bg-green-500',
      description: 'Administración y configuración de redes',
      totalStudents: 30,
      activeAssignments: 2,
      nextClass: 'Lunes 14 de Julio'
    }
  ];

  // Calificaciones (vista docente)
  const grades = [
    {
      subject: 'Procesos de Software',
      students: [
        { name: 'Luis Medina', grade: 18.2 },
        { name: 'María González', grade: 17.5 },
        { name: 'Carlos Rodríguez', grade: 16.8 }
      ],
      assignments: [
        { name: 'Taller Bibliográfico', average: 17.8, weight: 20 },
        { name: 'Laboratorio BPMN', average: 16.5, weight: 35 },
        { name: 'Proyecto Final', average: 18.2, weight: 45 }
      ],
      classAverage: 17.5
    },
    {
      subject: 'Gestión de Redes y Comunicaciones',
      students: [
        { name: 'Luis Medina', grade: 18.5 },
        { name: 'María González', grade: 17.0 },
        { name: 'Carlos Rodríguez', grade: 16.3 }
      ],
      assignments: [
        { name: 'Configuración de Router', average: 18.2, weight: 30 },
        { name: 'Tarea de Seguridad', average: 17.5, weight: 25 },
        { name: 'Proyecto Final', average: 17.8, weight: 45 }
      ],
      classAverage: 17.6
    }
  ];

  // Recursos/subidas del docente
  const resources = [
    {
      id: 1,
      name: 'Syllabus Procesos de Software',
      type: 'pdf',
      size: '2.5 MB',
      uploadDate: '2025-06-01',
      downloads: 25
    },
    {
      id: 2,
      name: 'Presentación Unidad I',
      type: 'pptx',
      size: '15.2 MB',
      uploadDate: '2025-06-05',
      downloads: 23
    },
    {
      id: 3,
      name: 'Ejemplos BPMN',
      type: 'zip',
      size: '8.7 MB',
      uploadDate: '2025-06-10',
      downloads: 18
    }
  ];

  // Imágenes para las materias
  const imagenesMateria = {
    software: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png',
    redes: 'https://i.postimg.cc/mkD9Cxk4/Procesos.png'
  };

  return (
    <MateriaVista
      userType="docenteMateria"
      userName="Francisco Alvarez Pineda"
      userEmail="profesor@uni.com"
      imagenesMateria={imagenesMateria}
      sections={sections}
      assignments={allAssignments}
      grades={grades}
      subjects={subjects}
      students={students}
      announcements={announcements}
      resources={resources}
      unidades={unidades}
    />
  );
}

export default DashboardDocente;