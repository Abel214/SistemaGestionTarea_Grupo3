import React, { memo, useEffect } from 'react';
import Header from '../components/HUD/Header/header';
import Footer from '../components/HUD/Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  // Scroll restoration - importante para UX
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isHomePage = window.location.pathname === '/';

  // Add body class for header spacing
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('transparent-header');
      document.body.classList.remove('with-header');
    } else {
      document.body.classList.add('with-header');
      document.body.classList.remove('transparent-header');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('with-header');
      document.body.classList.remove('transparent-header');
    };
  }, [isHomePage]);

  return (
    <>
      <Header transparent={isHomePage}/>
      <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

// Memoize del layout completo para evitar re-renders innecesarios
export default memo(MainLayout);