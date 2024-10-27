import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

const client = new RecaptchaEnterpriseServiceClient();
const projectID = "my-project-49814-1729980997678"; // Tu Project ID de Google Cloud
const recaptchaKey = "6LfHHG0qAAAAAH8ZER3UVuDuCxyDr5OgoYO480cE"; // Tu Site Key de reCAPTCHA

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
