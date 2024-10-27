
import  { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';


import './Contact.css';
function Contact() {
  const [state, handleSubmit] = useForm("mnnqjjzw");
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para el token de CAPTCHA
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el envío del formulario

  useEffect(() => {
    grecaptcha.enterprise.ready(() => {
      grecaptcha.enterprise.execute('6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE', { action: 'submit' }).then((token) => {
        // Almacena el token en el estado
        setCaptchaToken(token); // Actualiza el estado con el token
  
        // Llama al backend para verificar el token
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
            // Si la verificación falla, puedes limpiar el token
            setCaptchaToken(null);
          }
        });
      });
    });
  }, []);
  
  
  const handleCaptchaVerification = (e) => {
    e.preventDefault();

    // Solo enviar si el token de CAPTCHA está disponible
    if (captchaToken) {
      setIsSubmitting(true); // Deshabilitar el botón mientras se envía el formulario
      handleSubmit(e); // Enviar el formulario con el token
    }
  };

  if (state.succeeded) {
    return <p className="success-message">¡Gracias por tu mensaje! Te responderemos pronto.</p>;
  }

  return (
    <div className="contact-form-container">
      <form onSubmit={handleCaptchaVerification} className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Tu correo"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tu mensaje"
            rows={5}
            required
          />
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
        </div>

        <button type="submit" className="submit-button" disabled={!captchaToken || isSubmitting}>
  Enviar
</button>
      </form>
    </div>
  );
}

export default Contact;
