
import React from 'react';

import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a 
            href="https://www.facebook.com/EmausSD?mibextid=ZbWKwL" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" 
              alt="Facebook" 
            />
          </a>
          <a 
            href="https://www.instagram.com/emaus_santo_domingo?igsh=MTM1NzVhdjd4aDNhNQ==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
              alt="Instagram" 
            />
          </a>
        </div>

        <div className="footer-info">
          <p>&copy; 2025 Emaús. Todos los derechos reservados.</p>
          <ul className="footer-links">
            <li><a href="/terms" target="_blank" rel="noopener noreferrer">Términos y condiciones</a></li>
            <li><a href="/privacy" target="_blank" rel="noopener noreferrer">Política de privacidad</a></li>
            <li><a href="/contact" target="_blank" rel="noopener noreferrer">Contacto</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
