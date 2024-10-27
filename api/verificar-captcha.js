import express from 'express';
import cors from 'cors';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
require('dotenv').config();

const app = express();
const client = new RecaptchaEnterpriseServiceClient();
const projectID = "my-project-49814-1729980997678";
const recaptchaKey = "6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE";

app.use(express.json());
app.use(cors());

// Ruta para verificar el token de reCAPTCHA
app.post('/api/verificar-captcha', async (req, res) => {
    const token = req.body.token;
console.log("entro por aqui")
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

        const recaptchaAction = "submit";
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
