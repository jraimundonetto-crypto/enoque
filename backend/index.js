const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { OpenAI } = require("openai");
const { analisarRoda } = require('./iaController');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// OPENAI
// =========================
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// =========================
// 🔥 CORS LIBERADO (TEMPORÁRIO PRA FUNCIONAR)
// =========================
app.use(cors());

// =========================
// MIDDLEWARE
// =========================
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
// GERAR PERGUNTAS
// =========================
app.post('/api/gerar-perguntas', async (req, res) => {
    const { modalidades } = req.body;

    // 🔥 VALIDAÇÃO
    if (!modalidades || !Array.isArray(modalidades)) {
        return res.status(400).json({
            error: "Modalidades inválidas"
        });
    }

    const prompt = `
Você é um consultor de negócios especialista no Método Enoque.

Gere 5 perguntas estratégicas diferentes para cada uma destas modalidades:
${modalidades.join(', ')}

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

        // limpa markdown
        content = content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        let perguntas;

        try {
            perguntas = JSON.parse(content);
        } catch (e) {
            console.error("❌ ERRO AO PARSEAR JSON:", content);
            return res.status(500).json({
                error: "Resposta inválida da IA"
            });
        }

        res.json({ perguntas });

    } catch (error) {
        console.error("🔥 ERRO COMPLETO:", error);
        res.status(500).json({
            error: "Falha ao gerar perguntas inteligentes."
        });
    }
});

// =========================
// START
// =========================
app.listen(PORT, () => {
    console.log(`### SERVIDOR ENOQUE RODANDO NA PORTA ${PORT} ###`);
});
