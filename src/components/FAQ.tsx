import React, { useState } from 'react';
import './FAQ.css'; // Asegúrate de tener este archivo CSS

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Me puedo financiar al 100%?",
      answer: "Sí, podemos conseguir hasta un 100% de financiación en tu hipoteca siempre y cuando cumplas con algunos requisitos. Nuestro equipo de profesionales estudiará de manera gratuita todas las opciones y te ofrecerá la que mejor se adapte a ti."
    },
    {
      question: "¿Por qué elegirnos?",
      answer: "Contamos con más de 15 años de experiencia en el sector hipotecario y conseguimos las hipotecas más difíciles. Realizamos estudios hipotecarios gratis en 24-48 h, personalizados y sin ningún compromiso. Nuestros gestores negociarán por ti con los bancos las mejores condiciones del mercado."
    },
    {
      question: "¿Qué es un bróker hipotecario?",
      answer: "Un bróker hipotecario es un profesional o una empresa que se encarga de buscar la mejor hipoteca para sus clientes. Somos un bróker hipotecario de referencia con más de 15 años de experiencia."
    },
    {
      question: "¿Cómo es el proceso?",
      answer: "Fácil y sencillo: en todo momento contarás con el acompañamiento de nuestro equipo profesional."
    },
    {
      question: "¿Cuánto cuesta?",
      answer: "Realizamos el estudio de tu hipoteca de manera gratuita y personalizada. Únicamente hacemos efectivos nuestros honorarios si conseguimos ofrecerte las mejores condiciones del mercado."
    },
    // Agrega más preguntas y respuestas según sea necesario
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-faqs _section _section--pad">
      <div className="container _container--max800px">
        <h3 className="faq-title">Preguntas frecuentes</h3>
        <div className="dropdownBlocks">
          {faqs.map((faq, index) => (
            <div key={index} className="dropdownBlock">
              <div className="dropdownBlock__title" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
              </div>
              {activeIndex === index && (
                <div className="dropdownBlock__content">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
