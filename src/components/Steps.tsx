import './Steps.css'; // Asegúrate de tener este archivo CSS

const Steps = () => {
  const stepsData = [
    {
      title: "Solicitud",
      description: "Solicita un estudio gratuito para analizar el tipo de financiación más adecuada a tus necesidades.",
      image: "/src/assets/numbers/number_1.png", // Ruta correcta de la imagen de fondo
    },
    {
      title: "Viabilidad",
      description: "Nuestro gestor te indicará la viabilidad de la operación y la documentación necesaria.",
      image: "/src/assets/numbers/number_2.png",
    },
    {
      title: "Tramitación",
      description: "Nos encargamos de realizar todas las gestiones necesarias para poder formalizar la hipoteca.",
      image: "/src/assets/numbers/number_3.png",
    },
    {
      title: "Firma",
      description: "Te acompañamos en todo el proceso hasta la firma en la notaría.",
      image: "/src/assets/numbers/number_4.png",
    },
  ];

  return (
    <div className="steps-home _section _section--pad bgWhite">
      <div className="container">
        <h3 className="steps-home__title _blockTitle _blockTitle--small _textCenter">¿Cuáles son los pasos?</h3>
        <div className="steps-container">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className="block-item"
              style={{ backgroundImage: `url(${step.image})` }}
            >
              <div className="block-item__inner">
                <div className="block-item__text">
                  <div className="block-title">
                    <p>{step.title}</p>
                  </div>
                  <div className="block-description">
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Steps;
