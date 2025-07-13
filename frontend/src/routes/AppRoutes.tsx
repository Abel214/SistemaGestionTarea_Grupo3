import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


// Lazy-loaded components
const Home = lazy(() => import('../pages/Home/Home'));
const Usuarios = lazy(() => import('../pages/Usuarios/usuarios'));
const InicioDocente = lazy (() => import('../pages/InicioDocente/inicioDocente'));
const InicioAdmin = lazy(() => import('../pages/InicioAdmin/inicioAdmin'));
const InicioEstudiante = lazy(() => import('../pages/InicioEstudiante/inicioEstudiante'));
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
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/docente" element={<InicioDocente />} />
        <Route path="/admin" element={<InicioAdmin />} />
          <Route path="/estudiante" element={<InicioEstudiante />} />
        {/* Otras rutas */}
      </Routes>
  );
}

export default AppRoutes;