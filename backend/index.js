const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { OpenAI } = require("openai");
const { analisarRoda } = require('./iaController');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================
// CONFIGURAÇÃO DO OPENAI
// =========================
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// =========================
// CORS CONFIGURADO
// =========================
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:5500",
    "https://SEU-FRONTEND.netlify.app" // ⬅️ depois você troca pela URL real
];

app.use(cors({
    origin: function (origin, callback) {
        // permite requisições sem origin (Postman, etc)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Não permitido pelo CORS"));
        }
    },
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// =========================
// ROTA DE ANÁLISE DA RODA
// =========================
app.post('/api/analisar-roda', analisarRoda);

// =========================
// ROTA DE TESTE (IMPORTANTE)
// =========================
app.get('/health', (req, res) => {
    res.json({ status: "Servidor ENOQUE online e operacional" });
});

// =========================
// GERAR PERGUNTAS DINÂMICAS
// =========================
app.post('/api/gerar-perguntas', async (req, res) => {
    const { modalidades } = req.body;

    // VALIDAÇÃO
    if (!modalidades || !Array.isArray(modalidades)) {
        return res.status(400).json({ error: "Modalidades inválidas." });
    }

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

        // Limpeza de markdown
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
