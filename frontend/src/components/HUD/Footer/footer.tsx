import React, { memo } from 'react';
import './footer.css';
import { Link } from "react-router-dom";
// Importamos las imágenes con import para que webpack las procese correctamente
import unlLogo from "/src/assets/Common/UNL_logo.svg";
import computacionLogo from "/src/assets/Common/logo_computacion.png";

// SVG componentes optimizados como funciones
const MailIcon = () => (
  <svg width="20" height="20" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: 6 }} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 7 8-7V18z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: 6 }} viewBox="0 0 24 24">
    <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.11 4.9a4.28 4.28 0 0 0 1.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 0 0 3.43 4.19c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: 6 }} viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      {/* Plant Decorations */}
      
      <div className="footer-content footer-columns">
        <div className="footer-col">
          <div className="footer-title">GESTOR DE TAREAS</div>
          <div className="footer-line">Sistema De Gestión De Tareas</div>
          <div className="footer-line"><strong>Gestion de tareas haciendo uso del proceso Kanban</strong></div>
          <div className="footer-line">
            Universidad Nacional de Loja, Ciudadela Universitaria La Argelia.
          </div>
          <div className="footer-line">
            (Facultad De Los Recursos Naturales o Renovables, Edificio (). Código postal 110101, Loja – Ecuador.)
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-title">Contacto</div>

          <div className="footer-line">
            <a href="mailto:citiab@unl.edu.ec" style={{ color: "#fff", textDecoration: "underline", display: "inline-flex", alignItems: "center" }}>
              <MailIcon />gestor.tareas@unl.edu.ec
            </a>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-title">Síguenos</div>
          <div className="footer-socials">
            <a href="https://twitter.com/citiab_unl?s=21&t=6LcXtSRd8VLYI5uPsiI2Ag" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline", display: "inline-flex", alignItems: "center" }}>
              <TwitterIcon />Twitter
            </a>
            <a href="https://www.facebook.com/citabunl/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline", display: "inline-flex", alignItems: "center" }}>
              <FacebookIcon />Facebook
            </a>
          </div>
        </div>
        <div className="footer-col footer-col-logos">
          <div className="footer-title">Instituciones</div>
          <div className="footer-logos">
            <a href="https://unl.edu.ec/" target="_blank" rel="noopener noreferrer">
              <img
                src={unlLogo}
                alt="UNL Logo"
                className="footer-logo"
                width="70"
                height="70"
              />
            </a>
            
            <a href="https://computacion.unl.edu.ec/" target="_blank" rel="noopener noreferrer">
              <img
                src={computacionLogo}
                alt="CITIAB Logo"
                className="footer-logo"
                width="80"
                height="70"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {currentYear} Gestor De Tareas Académicas. Todos los derechos reservados.
      </div>
    </footer>
  );
}

// Memoizamos el componente para evitar re-renderizados innecesarios
export default memo(Footer);
