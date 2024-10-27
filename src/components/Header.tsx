import './Header.css';

const Header = () => {
  const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <h1>Asturias: Expertos en Hipotecas al 100%</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/home" onClick={(e) => scrollToSection(e, 'home')}>Inicio</a></li>
            <li><a href="/services" onClick={(e) => scrollToSection(e, 'services')}>Hipotecas</a></li>
            <li><a href="/about" onClick={(e) => scrollToSection(e, 'about')}>Préstamos</a></li>
            <li><a href="/contact" onClick={(e) => scrollToSection(e, 'contact')}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
