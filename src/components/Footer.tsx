import './Footer.css';
// import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-content text-center">
        <p>&copy; - Expertos en Hipotecas al 100%</p>
        <p>Teléfono: 640062523 | Email: email@gmail.com</p>
        <nav>
          <a href="#aviso-legal">Aviso Legal</a>
          <a href="#privacidad">Política de Privacidad</a>
          <a href="#cookies">Política de Cookies</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
