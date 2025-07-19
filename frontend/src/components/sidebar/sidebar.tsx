import {
  Home,
  Book,
  User as UsersIcon,
  FileText,
  CheckSquare,
  MessageCircle,
  Settings,
  UserIcon,
  Layers
} from 'lucide-react';

export const getDashboardConfig = (userType) => {
  const configs = {
    teacher: {
      title: 'Panel del Docente',
      menuItems: [
        { id: 'dashboard', label: 'Menu Principal', icon: Home },
        { id: 'profiles', label: 'Asignaturas', icon: Book },
        { id: 'gradebook', label: 'Paralelos', icon: UsersIcon },
        { id: 'resources', label: 'Documentos', icon: FileText },
        { id: 'assignments', label: 'Calendar', icon: CheckSquare },
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    },
    student: {
      title: 'Panel del Estudiante',
      menuItems: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'subjects', label: 'Mis Materias', icon: Book },
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
        { id: 'dashboard', label: 'Menú Principal', icon: Home },
        { id: 'users', label: 'Usuarios', icon: UserIcon },
        { id: 'subjects', label: 'Asignaturas', icon: Book },
        { id: 'parallels', label: 'Paralelos', icon: FileText },
        { id: 'cicles', label: 'Ciclos', icon: Layers },
      ],
       bottomItems: [
        { id: 'settings', label: 'Configuración', icon: Settings },
      ]
    }
  };

  return configs[userType] || configs.student;
};