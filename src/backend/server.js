const express = require('express');
require('dotenv').config();

const { RecaptchaEnterpriseServiceClient } = require('@google-cloud/recaptcha-enterprise');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = "./config/credentials.json";
const app = express();
console.log('Entorno:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_CREDENTIALS; // Usar variable de entorno en producción
} else {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "./config/credentials.json"; // Usar ruta local en desarrollo
}

console.log('Ruta de credenciales:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

const port = 3001;
const cors = require('cors');

// Permitir manejo de JSON
app.use(express.json());
app.use(cors());

// Configura el cliente de reCAPTCHA
const client = new RecaptchaEnterpriseServiceClient();
const projectID = "my-project-49814-1729980997678"; // Tu Project ID de Google Cloud
const recaptchaKey = "6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE"; // Tu Site Key de reCAPTCHA

// Ruta para verificar el token de reCAPTCHA
app.post('/verificar-captcha', async (req, res) => {
  const token = req.body.token;

  try {
    const projectPath = client.projectPath(projectID);
    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    };

    // Llamada a la API de Google reCAPTCHA Enterprise
    const [response] = await client.createAssessment(request);

    // Verifica si el token es válido
    if (!response.tokenProperties.valid) {
      return res.status(400).json({ success: false, message: `Token inválido: ${response.tokenProperties.invalidReason}` });
    }

    // Verifica si la acción coincide
    const recaptchaAction = "submit"; // Debes asegurarte de que esto coincida con la acción en el frontend
    if (response.tokenProperties.action !== recaptchaAction) {
      return res.status(400).json({ success: false, message: 'La acción no coincide' });
    }

    // Evaluar la puntuación de riesgo
    const score = response.riskAnalysis.score;
    if (score > 0.5) {
      // Si la puntuación es mayor a 0.5, es considerado un humano
      return res.json({ success: true, message: 'Verificación de CAPTCHA exitosa', score: score });
    } else {
      // Si la puntuación es baja, es probable que sea un bot
      return res.status(400).json({ success: false, message: 'Posible bot', score: score });
    }
  } catch (error) {
    console.error('Error al verificar CAPTCHA:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
