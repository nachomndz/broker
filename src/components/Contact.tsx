import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="main-content text-center">
        <h2>Consulta gratuita: Te ayudamos a tomar la mejor decisión financiera</h2>
        <p>¿Tienes dudas sobre cómo obtener una hipoteca o mejorar las condiciones de tu préstamo actual? Contáctanos hoy mismo y uno de nuestros asesores financieros te ofrecerá una consulta gratuita y sin compromiso.</p>
        <form action="https://formspree.io/f/{your_form_id}" method="POST">
          <input type="text" name="name" placeholder="Tu nombre" required />
          <input type="email" name="email" placeholder="Tu email" required />
          <textarea name="message" rows="5" placeholder="Tu mensaje" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
