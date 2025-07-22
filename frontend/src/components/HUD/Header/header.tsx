import React, { memo, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Avatar, Dropdown, Layout } from 'antd';
import { MenuOutlined, UserOutlined, CloseOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import { createPortal } from 'react-dom';
import './header.css';
import headerImg from '../../../assets/Common/UNL_logo.svg';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll events to adjust header transparency
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30; // Threshold for when to start showing background
      setScrolled(isScrolled);
    };

    if (transparent) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial scroll position
    } else {
      setScrolled(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [transparent]);

  // Aplicar/quitar clase al body según si el header es transparente
  useEffect(() => {
    if (transparent) {
      document.body.classList.add('transparent-header');
    } else {
      document.body.classList.remove('transparent-header');
    }

    // Cleanup para asegurarnos de quitar la clase cuando el componente se desmonte
    return () => {
      document.body.classList.remove('transparent-header');
    };
  }, [transparent]);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Prevenir scroll cuando el menú está abierto
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Opciones de usuario para dropdown
  const userMenuItems = [
    {
      key: 'profile',
      label: 'Perfil',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile')
    },
    {
      key: 'logout',
      label: 'Cerrar Sesión',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  // Determinar clase CSS según la prop transparent y estado de scroll
  const headerClass = `main-header${transparent ? ' transparent' : ''}${scrolled && transparent ? ' scrolled' : ''}`;

  // Mobile menu portal element
  const mobileMenuPortal = (
    <>
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />
      <nav
        ref={mobileMenuRef}
        className={`mobile-side-menu ${mobileMenuOpen ? 'open' : ''}`}
        style={{ zIndex: 9999 }} // Inline style to ensure proper z-index
      >
        <div className="mobile-menu-header">
          <span>Menú</span>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={closeMobileMenu}
            className="mobile-menu-close"
          />
        </div>

        {isAuthenticated && (
          <div className="mobile-user-section">
            <Avatar
              icon={<UserOutlined />}
              className="mobile-user-avatar"
              style={{ backgroundColor: 'var(--color-blue-light)' }}
            />
            <span className="mobile-username">
              {user?.first_name} {user?.last_name}
            </span>
          </div>
        )}

        <div className="mobile-menu-items">
          <Link
            to="/"
            className={`mobile-menu-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >

          </Link>
          <Link
            to="/usuarios"
            className={`mobile-menu-item ${location.pathname.includes('/usuarios') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >

          </Link>

            <Link
              to="/docente"
              className={`mobile-menu-item ${location.pathname.includes('/docente') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >

            </Link>

          <Link
            to="/about"
            className={`mobile-menu-item ${location.pathname.includes('/about') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >

          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={`mobile-menu-item ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >

              </Link>
              <div
                className="mobile-menu-item"
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <LogoutOutlined /> Cerrar Sesión
              </div>
            </>
          ) : (
            <>
              <Link
                to="/estudiante"
                className={`mobile-menu-item ${location.pathname === '/estudiante' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >

              </Link>
              <Link
                to="/materia"
                className={`mobile-menu-item ${location.pathname === '/materia' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >

              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );

  return (
    <>
      <AntHeader
        className={headerClass}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000
        }}
      >
        <div className="header-container">
          {/* Logo y nombre */}
          <div className="logo-section">
            <a
              href="https://unl.edu.ec/"
              className="logo-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={headerImg} className="logo-img" alt="Logo UNL" />
            </a>
            <Link to="/" className="app-name-link">
              <span className="app-name">Gestion De Tareas</span>
            </Link>
          </div>

          {/* Menú de navegación */}
          <div className="menu-section">
            {/* Menú desktop */}
            <nav className="desktop-menu">
              <Link
                to="/"
                className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
              >

              </Link>
              <Link
                to="/usuarios"
                className={`menu-item ${location.pathname.includes('/usuarios') ? 'active' : ''}`}
              >
                
              </Link>

              <Link
                to="/docente"
                className={`menu-item ${location.pathname.includes('/docente') ? 'active' : ''}`}
              >

              </Link>

              <Link
                to="/about"
                className={`menu-item ${location.pathname.includes('/about') ? 'active' : ''}`}
              >

              </Link>

              {/* Usuario o botones de autenticación */}
              {isAuthenticated ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow
                  trigger={['click']}
                >
                  <div className="user-profile-menu">
                    <Avatar
                      size="small"
                      icon={<UserOutlined />}
                      className="user-avatar"
                      style={{ backgroundColor: 'var(--color-blue-light)' }}
                    />
                    <span className="username-display">
                      {user?.first_name || 'Usuario'}
                    </span>
                  </div>
                </Dropdown>
              ) : (
                <>
                  <Link
                    to="/estudiante"
                    className={`menu-item ${location.pathname === '/estudiante' ? 'active' : ''}`}
                  >

                  </Link>
                  <Link
                    to="/materia"
                    className={`menu-item ${location.pathname === '/materia' ? 'active' : ''}`}
                  >

                  </Link>
                </>
              )}
            </nav>

            {/* Botón menú móvil */}
            <Button
              className="mobile-menu-button"
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMobileMenu}
              aria-label="Menu"
            />
          </div>
        </div>

        {/* Render mobile menu using portal to ensure it's at the root level */}
        {createPortal(mobileMenuPortal, document.body)}
      </AntHeader>
    </>
  );
};

// Memoizamos el componente para evitar re-renderizados innecesarios
export default memo(Header);