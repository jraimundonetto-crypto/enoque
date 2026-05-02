// CONFIGURAÇÃO SUPABASE
const SUPABASE_URL = 'https://fzlbhvxneemoramlbysn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PwZyWTjtge6JDurdfu8h1g_KbvbsDpf';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// VARIÁVEIS GLOBAIS
let myChart;
const areas = ['Mentalidade', 'Vendas', 'Marketing', 'Gestão', 'Liderança', 'Financeiro'];
let scores = [5, 6, 5, 4, 5, 6];

const scoresLocal = localStorage.getItem('enoque_scores');
if (scoresLocal) {
    scores = JSON.parse(scoresLocal);
}

// 1. VERIFICAÇÃO DE USUÁRIO
async function checkUser() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();

    if (error || !session) {
        window.location.replace('index.html');
        return null;
    }

    const emailElement = document.getElementById('user-email');
    if (emailElement) {
        emailElement.innerText = session.user.email;
    }

    return session;
}

// 2. BUSCAR ÚLTIMO DIAGNÓSTICO SALVO
async function carregarDiagnosticoSalvo() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) return;

   // Verifique se a tabela se chama 'diagnosticos' (com 's') ou 'diagnostico' (sem 's') no seu banco
const { data, error } = await supabaseClient
    .from('diagnosticos')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(1);

if (!error && data && data.length > 0 && data[0].scores) {
    scores = Array.isArray(data[0].scores)
        ? data[0].scores
        : Object.values(data[0].scores);

    localStorage.setItem('enoque_scores', JSON.stringify(scores));
}
}

// 3. LOGOUT
async function handleLogout() {
    try {
        await supabaseClient.auth.signOut();
        window.location.replace('index.html');
    } catch (error) {
        console.error("Erro ao sair:", error.message);
        window.location.replace('index.html');
    }
}

// 4. TROCA DE SEÇÕES
function mostrarSecao(secao, event) {
    const items = document.querySelectorAll('.dock-item');
    items.forEach(item => item.classList.remove('active'));

    const alvo = event.target.closest('.dock-item');
    if (alvo) {
        alvo.classList.add('active');
    }
}

// 5. INICIALIZAÇÃO DO GRÁFICO
function initChart() {
    const canvas = document.getElementById('enoqueChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: areas,
            datasets: [{
                label: '',
                data: scores,
                fill: true,
                backgroundColor: 'rgba(0, 224, 255, 0.18)',
                borderColor: '#c00bf7',
                borderWidth: 3,
                pointBackgroundColor: '#00e0ff',
                pointBorderColor: '#ffffff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: { display: false },
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    angleLines: { color: 'rgba(255,255,255,0.08)' },
                    pointLabels: {
                        color: '#9cc7ff',
                        font: { size: 12, weight: 'bold' }
                    }
                }
            }
        }
    });
}

// 6. CONTROLES DINÂMICOS
function initControls() {
    const container = document.getElementById('controls-container');
    if (!container) return;

    container.innerHTML = '';

    areas.forEach((area, index) => {
        const div = document.createElement('div');
        div.style.marginBottom = "12px";

        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:12px; color:#9cc7ff; margin-bottom:4px;">
                <span>${area}</span>
                <span id="val-${index}" style="color:#00e0ff; font-weight:bold;">${scores[index]}</span>
            </div>
            <input type="range" min="0" max="10" value="${scores[index]}" 
                style="width:100%; accent-color:#00e0ff; cursor:pointer;"
                oninput="updateScore(${index}, this.value)">
        `;

        container.appendChild(div);
    });
}

function updateScore(index, value) {
    scores[index] = Number(value);

    const label = document.getElementById(`val-${index}`);
    if (label) {
        label.innerText = value;
    }

    if (myChart) {
        myChart.data.datasets[0].data = [...scores];
        myChart.update();
    }

    localStorage.setItem('enoque_scores', JSON.stringify(scores));

}

// 7. ANÁLISE IA
async function gerarAnalise() {
    const btn = document.getElementById('btn-analisar');
    const box = document.getElementById('resultado-ia');
    const texto = document.getElementById('analise-texto');

    if (!btn) return;

    btn.innerText = "Consultando Mentor...";
    btn.disabled = true;

    const scoresObj = {};
    areas.forEach((area, i) => scoresObj[area] = scores[i]);

    try {
        const response = await fetch('http://localhost:3000/api/analisar-roda', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores: scoresObj })
        });

        const data = await response.json();

        if (box && texto) {
            box.style.display = 'block';
            texto.innerText = data.analise;
            box.scrollIntoView({ behavior: 'smooth' });
        }

    } catch (err) {
        alert("Erro: Certifique-se que o backend está rodando!");
    } finally {
        btn.innerText = "Analisar com IA";
        btn.disabled = false;
    }
}

// 8. INICIALIZAÇÃO GERAL
async function start() {
    const session = await checkUser();
    if (!session) return;

   if (!localStorage.getItem('enoque_scores')) {
    await carregarDiagnosticoSalvo();
}

    initChart();
    initControls();
}

start();