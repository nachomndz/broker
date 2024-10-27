
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="main-content text-center">
        <h2>Nuestros Servicios: Soluciones a tu medida</h2>
        <p>Ofrecemos soluciones personalizadas para cada cliente. Desde la financiación total de tu vivienda hasta la refinanciación de hipotecas existentes, estamos aquí para garantizar que consigas las mejores condiciones financieras.</p>
        <ul className="services-list">
          <li><strong>Hipotecas 100% financiadas</strong>: Para quienes desean acceder a una vivienda sin necesidad de ahorro inicial.</li>
          <li><strong>Refinanciación de préstamos</strong>: Te ayudamos a renegociar tu hipoteca actual para obtener mejores condiciones.</li>
          <li><strong>Asesoría integral</strong>: Nuestro equipo de expertos analiza tu situación económica y te ofrece las mejores soluciones financieras.</li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
