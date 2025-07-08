import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Lazy-loaded components
const Home = lazy(() => import('../pages/Home/Home'));

// Componente para rutas protegidas que requieren autenticación
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

      </Routes>
  );
}

export default AppRoutes;