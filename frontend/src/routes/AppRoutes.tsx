import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// Lazy-loaded components
const Home = lazy(() => import('../pages/Home/Home'));
const InicioDocente = lazy (() => import('../pages/InicioDocente/inicioDocente'));
const InicioAdmin = lazy(() => import('../pages/InicioAdmin/inicioAdmin'));
const InicioEstudiante = lazy(() => import('../pages/InicioEstudiante/inicioEstudiante'));
const InicioMateria = lazy(() => import('../pages/InicioEstudiante/InicioMateria/inicioMateria'));
const InicioMateriaDocente = lazy(() => import('../pages/InicioDocente/InicioDocenteMateria/inicioDocenteMateria'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/docente" element={<InicioDocente />} />
        <Route path="/admin" element={<InicioAdmin />} />
          <Route path="/estudiante" element={<InicioEstudiante />} />
        <Route path="/materia" element={<InicioMateria />} />
        <Route path="/materiaDocente" element={<InicioMateriaDocente />} />
        <Route path="/register" element={<Register />} />
        {/* Rutas protegidas */}
        {/* Otras rutas */}
      </Routes>
  );
}

export default AppRoutes;