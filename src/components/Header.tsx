// import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <h1>Asturias: Expertos en Hipotecas al 100%</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#services">Hipotecas</a></li>
            <li><a href="#about">Préstamos</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
