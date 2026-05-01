const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { OpenAI } = require("openai");
const { analisarRoda } = require('./iaController');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// =========================
// ROTA DE ANÁLISE DA RODA
// =========================
app.post('/api/analisar-roda', analisarRoda);

// =========================
// ROTA DE TESTE
// =========================
app.get('/health', (req, res) => {
    res.json({ status: "Servidor ENOQUE online e operacional" });
});

// =========================
// ROTA PARA GERAR PERGUNTAS DINÂMICAS
// =========================
app.post('/api/gerar-perguntas', async (req, res) => {
    const { modalidades } = req.body;

    const prompt = `
Você é um consultor de negócios especialista no Método Enoque.

Gere 5 perguntas estratégicas diferentes para cada uma destas modalidades:
${modalidades.join(', ')}

As perguntas devem ser:
- claras
- estratégicas
- fáceis para pequenos e médios empreendedores entenderem
- diferentes entre si
- profundas mas objetivas

Retorne APENAS um JSON válido neste formato:

[
  {
    "modalidade": "Mentalidade",
    "texto": "Pergunta aqui"
  }
]
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: prompt }
            ],
            temperature: 0.8
        });

        let content = completion.choices[0].message.content.trim();

        // Remove markdown se vier com ```json
        content = content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        const perguntas = JSON.parse(content);

        res.json({ perguntas });

    } catch (error) {
        console.error("Erro ao gerar perguntas:", error.message);
        res.status(500).json({ error: "Falha ao gerar perguntas inteligentes." });
    }
});

// =========================
// INICIAR SERVIDOR
// =========================
app.listen(PORT, () => {
    console.log(`### SERVIDOR ENOQUE RODANDO NA PORTA ${PORT} ###`);
});