import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

function Contact() {
  const [state, handleSubmit] = useForm("mnnqjjzw");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    precio: '',
    comentarios: '',
    aceptaPolitica: false,
    aceptaComunicaciones: false
  });

  useEffect(() => {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.execute('6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE', { action: 'submit' }).then((token) => {
        setCaptchaToken(token);
        fetch('http://localhost:3001/verificar-captcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Verificación de CAPTCHA exitosa');
          } else {
            setCaptchaToken(null);
          }
        });
      });
    });
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCaptchaVerification = (e) => {
    e.preventDefault();
    if (captchaToken) {
      setIsSubmitting(true);
      handleSubmit(e);
    }
  };

  if (state.succeeded) {
    return <p className="success-message">¡Gracias por tu mensaje! Te responderemos pronto.</p>;
  }

  return (
    <div className="contact-form-container">
      <form onSubmit={handleCaptchaVerification} className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            id="apellidos"
            type="text"
            name="apellidos"
            placeholder="Tus apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            placeholder="Tu teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio de la vivienda</label>
          <input
            id="precio"
            type="number"
            name="precio"
            placeholder="Precio de la vivienda"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            id="comentarios"
            name="comentarios"
            placeholder="Tus comentarios"
            rows={5}
            value={formData.comentarios}
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="aceptaPolitica"
              checked={formData.aceptaPolitica}
              onChange={handleChange}
            />
            He leído y acepto la <a href="/politica-privacidad">política de privacidad y condiciones de uso</a>
          </label>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="aceptaComunicaciones"
              checked={formData.aceptaComunicaciones}
              onChange={handleChange}
            />
            Acepto recibir comunicaciones comerciales
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={!captchaToken || isSubmitting}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Contact;
