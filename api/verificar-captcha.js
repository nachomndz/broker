import express from 'express';
import cors from 'cors';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
require('dotenv').config();

const app = express();
const client = new RecaptchaEnterpriseServiceClient();
const projectID = "my-project-49814-1729980997678";
const recaptchaKey = "6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE"; // Tu Site Key de reCAPTCHA

app.use(express.json());

// Permitir CORS para el dominio de tu frontend
const allowedOrigins = [
    /\.hipotecasinentradas\.com$/, // Permitir cualquier subdominio
    'http://localhost:5173',
    /^https:\/\/.*-ignacios-projects-\w+\.vercel\.app$/, // Permitir cualquier subdominio de Vercel que siga el patrón

    // Para desarrollo local
  ];
  
  app.use(cors({ origin: allowedOrigins }));

app.post('/api/verificar-captcha', async (req, res) => {
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

        const [response] = await client.createAssessment(request);

        if (!response.tokenProperties.valid) {
            return res.status(400).json({ success: false, message: `Token inválido: ${response.tokenProperties.invalidReason}` });
        }

        const recaptchaAction = "submit"; // Asegúrate de que esto coincida con la acción en el frontend
        if (response.tokenProperties.action !== recaptchaAction) {
            return res.status(400).json({ success: false, message: 'La acción no coincide' });
        }

        const score = response.riskAnalysis.score;
        if (score > 0.5) {
            return res.json({ success: true, message: 'Verificación de CAPTCHA exitosa', score: score });
        } else {
            return res.status(400).json({ success: false, message: 'Posible bot', score: score });
        }
    } catch (error) {
        console.error('Error al verificar CAPTCHA:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

// Iniciar el servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
