import {
    Home,
    Book,
    User as UsersIcon,
    FileText,
    CheckSquare,
    MessageCircle,
    Settings,
    Calendar,
    UserIcon,
    Layers
} from 'lucide-react';

export const getDashboardConfig = (userType) => {
  const configs = {
    teacher: {
      title: 'Panel del Docente',
      menuItems: [
        { id: 'dashboardDocente', label: 'Acerca De', icon: Home },
        { id: 'profiles', label: 'Asignaturas', icon: Book },
        { id: 'gradebook', label: 'Paralelos', icon: UsersIcon },

      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },
    student: {
      title: 'Panel del Estudiante',
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'assignments', label: 'Tareas', icon: CheckSquare },
        { id: 'grades', label: 'Mis Calificaciones', icon: FileText },
        { id: 'messages', label: 'Mensajes', icon: MessageCircle },
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },
    admin: {
      title: 'Panel del Administrador',
      menuItems: [
        { id: 'users', label: 'Usuarios', icon: UserIcon },
        { id: 'subjects', label: 'Asignaturas', icon: Book },
        { id: 'parallels', label: 'Paralelos', icon: FileText },
        { id: 'cicles', label: 'Ciclos', icon: Layers },
          {id: 'periods',label: 'Periodos', icon:Layers}
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },
    studentMateria: {
      title: 'Panel Materia Del Estudiante',
      menuItems: [
        { id: 'dashboard', label: 'Menu Principal', icon: Home },
        { id: 'calendar', label: 'Calendario', icon: Calendar },
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },
    docenteMateria: {
      title: 'Panel Materia Del Docente',
      menuItems: [
          { id: 'resources', label: 'Documentos', icon: FileText },
        { id: 'assignments', label: 'Tareas', icon: CheckSquare },
        { id: 'grades', label: 'Calificaciones', icon: FileText },
        { id: 'messages', label: 'Mensajes', icon: MessageCircle },
        {id : 'students', label: 'Estudiantes', icon: UsersIcon },
         { id: 'calendar', label: 'Calendario', icon: Calendar },
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },

    };


    return configs[userType] || configs.student;
};