import './BankLogos.css';

const BankLogos = () => {
  return (
    <section className="banner banner--banks">
      <div className="container">
        <div className="_blockTitle _blockTitle--small">
          <h3 className="_resetTitle">Negociamos por ti</h3>
        </div>
        <div className="landingText contentStyle _white">
          Trabajamos con todas las entidades bancarias para conseguir el interés más bajo del mercado para tu hipoteca.
        </div>
        <div className="bannerImages">
          {[
            "001-bankinter.png",
            "002-bbva.png",
            "003-caixa-bank-30-px.png",
            "004-sabadell.png",
            "005-santander.png",
            "006-uci.png",
            "007-abanca-2.png",
            "008-kutxabank.png",
            "009-targobank-2.png",
            "010-deutsche-bank-3.png",
            "012-andbank.png",
            "013-banco-caminos-2.png",
            "015-caixa-enginyers.png",
            "016-caja-laboral-popular-kutxa-3.png",
            "017-eurocaja-rural.png",
            "018-globalcaja.png",
            "019-ibercaja.png",
            "021-mediolanum-2.png",
            "023-unicaja.png",
          ].map((logo, index) => (
            <div className="bannerImages__img" key={index}>
              <img loading="lazy" src={`src/assets/banklogos/${logo}`} alt="La mejor hipoteca del mercado" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankLogos;
