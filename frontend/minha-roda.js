const SUPABASE_URL = 'https://fzlbhvxneemoramlbysn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PwZyWTjtge6JDurdfu8h1g_KbvbsDpf';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


let etapaAtual = 0;

const modalidades = [
    'Mentalidade',
    'Vendas',
    'Marketing',
    'Gestão',
    'Liderança',
    'Financeiro'
];

let respostasUsuario = {};
let perguntasSelecionadas = {};

const perguntasBase = {
    Mentalidade: [
        "Você sente clareza sobre onde quer chegar no seu negócio?",
        "Você mantém constância mesmo sem resultados imediatos?",
        "Você acredita no valor do que oferece?",
        "Você toma decisões com segurança?",
        "Você consegue manter foco nas prioridades?",
        "Você age mesmo diante do medo?",
        "Você sabe qual é sua prioridade agora?",
        "Você confia na sua capacidade de crescer?",
        "Você enfrenta desafios com firmeza?",
        "Você sente motivação para evoluir?",
        "Você acredita que merece alcançar grandes resultados?",
        "Você continua avançando mesmo quando surgem dificuldades?",
        "Você aprende com seus erros ou desanima facilmente?",
        "Você consegue controlar suas emoções ao tomar decisões?",
        "Você se considera resiliente diante dos desafios?",
        "Você tem disciplina para fazer o que precisa ser feito?",
        "Você evita procrastinar tarefas importantes?",
        "Você consegue enxergar oportunidades nos problemas?",
        "Você assume responsabilidade pelos seus resultados?",
        "Você mantém uma postura positiva diante das crises?",
        "Você acredita que pode melhorar continuamente?",
        "Você consegue sair da zona de conforto?",
        "Você age com confiança mesmo sem garantias?",
        "Você sente energia para continuar crescendo?",
        "Você mantém sua mente focada no progresso?",
        "Você consegue se adaptar às mudanças?",
        "Você acredita no potencial do seu negócio?",
        "Você busca evoluir como empreendedor todos os dias?",
        "Você se sente preparado para desafios maiores?",
        "Você mantém a confiança mesmo em momentos difíceis?"
    ],

    Vendas: [
        "Seu processo comercial gera vendas recorrentes?",
        "Você sabe converter interessados em clientes?",
        "Você acompanha oportunidades de venda?",
        "Você apresenta valor com clareza?",
        "Você vende com confiança?",
        "Você sabe negociar sem perder margem?",
        "Você tem metas comerciais definidas?",
        "Você acompanha resultados de vendas?",
        "Você entende seu cliente ideal?",
        "Você consegue fechar vendas com frequência?",
        "Você conhece os motivos que fazem clientes comprarem de você?",
        "Você acompanha seus números de conversão?",
        "Você consegue identificar onde perde vendas?",
        "Você responde rápido aos clientes interessados?",
        "Você sabe lidar com objeções?",
        "Você oferece soluções claras ao cliente?",
        "Você demonstra segurança durante a venda?",
        "Você tem uma abordagem comercial organizada?",
        "Você acompanha clientes que ainda não compraram?",
        "Você cria relacionamento durante a venda?",
        "Você consegue despertar urgência no cliente?",
        "Você mostra claramente os benefícios da sua oferta?",
        "Você entende o processo de decisão do seu cliente?",
        "Você consegue aumentar o valor médio das vendas?",
        "Você identifica oportunidades de novas vendas?",
        "Você mantém consistência nas vendas?",
        "Você avalia o desempenho comercial da empresa?",
        "Você sabe quais estratégias geram mais vendas?",
        "Você sente domínio sobre sua área comercial?",
        "Você consegue transformar interesse em fechamento?"
    ],

    Marketing: [
        "Sua divulgação atrai clientes qualificados?",
        "Você publica conteúdo com frequência?",
        "Sua marca comunica valor claramente?",
        "Você sabe quais canais trazem mais clientes?",
        "Seu marketing gera oportunidades reais?",
        "Você investe em posicionamento?",
        "Você entende o que atrai seu público?",
        "Você tem presença digital consistente?",
        "Seu conteúdo gera interesse?",
        "Sua estratégia digital está funcionando?",
        "Você conhece bem o público que deseja atrair?",
        "Sua comunicação desperta atenção?",
        "Você transmite autoridade no que faz?",
        "Seu cliente entende rapidamente o que você oferece?",
        "Você produz conteúdo com objetivo claro?",
        "Você mede os resultados das ações de marketing?",
        "Você consegue atrair clientes sem depender só de indicação?",
        "Sua marca se destaca da concorrência?",
        "Você utiliza os canais certos para divulgar?",
        "Você cria conexão com seu público?",
        "Você desperta desejo nos clientes?",
        "Você tem uma mensagem clara e objetiva?",
        "Você gera valor antes de vender?",
        "Você mantém consistência na divulgação?",
        "Você sabe o que funciona melhor no seu marketing?",
        "Seu posicionamento transmite confiança?",
        "Você atrai pessoas realmente interessadas?",
        "Você acompanha métricas de divulgação?",
        "Você investe tempo em fortalecer sua marca?",
        "Seu marketing ajuda a aumentar as vendas?"
    ],

    Gestão: [
        "Você controla as operações do negócio com organização?",
        "Você acompanha indicadores importantes?",
        "Você tem processos claros?",
        "Você planeja as próximas ações?",
        "Sua rotina empresarial está organizada?",
        "Você acompanha metas regularmente?",
        "Você consegue priorizar tarefas?",
        "Sua empresa tem planejamento claro?",
        "Você controla bem os processos?",
        "Sua gestão está eficiente?",
        "Você sabe o que precisa ser melhorado na operação?",
        "Você acompanha resultados semanalmente?",
        "Você organiza tarefas com clareza?",
        "Você tem controle sobre as áreas da empresa?",
        "Você consegue identificar gargalos?",
        "Você distribui bem as responsabilidades?",
        "Você define prioridades com facilidade?",
        "Você mantém os processos funcionando bem?",
        "Você planeja antes de executar?",
        "Você acompanha o desempenho da empresa?",
        "Você corrige falhas rapidamente?",
        "Você toma decisões baseadas em dados?",
        "Você evita retrabalho nos processos?",
        "Você consegue manter a operação organizada?",
        "Você revisa seus processos com frequência?",
        "Você monitora a produtividade da empresa?",
        "Você consegue equilibrar rotina e estratégia?",
        "Você sabe onde sua gestão precisa evoluir?",
        "Você acompanha metas operacionais?",
        "Você sente controle sobre a empresa?"
    ],

    Liderança: [
        "Você consegue direcionar pessoas com clareza?",
        "Sua equipe entende o que precisa ser feito?",
        "Você delega tarefas com confiança?",
        "Você mantém alinhamento com o time?",
        "Você lidera pelo exemplo?",
        "Você corrige falhas com clareza?",
        "Sua equipe confia em você?",
        "Você consegue motivar pessoas?",
        "Você comunica objetivos com clareza?",
        "Você lidera com segurança?",
        "Você consegue inspirar sua equipe?",
        "Você mantém o time comprometido?",
        "Você sabe ouvir sua equipe?",
        "Você resolve conflitos com equilíbrio?",
        "Você dá direcionamentos claros?",
        "Você reconhece o esforço das pessoas?",
        "Você mantém a equipe focada?",
        "Você toma decisões pensando no time?",
        "Você acompanha o desempenho das pessoas?",
        "Você consegue desenvolver talentos?",
        "Você fortalece o ambiente da equipe?",
        "Você transmite confiança ao liderar?",
        "Você consegue engajar pessoas?",
        "Você mantém clareza na comunicação?",
        "Você sabe orientar sem controlar demais?",
        "Você incentiva crescimento na equipe?",
        "Você mantém postura firme quando necessário?",
        "Você cria responsabilidade no time?",
        "Você conduz sua equipe com equilíbrio?",
        "Você fortalece a união da equipe?"
    ],

    Financeiro: [
        "Você sabe exatamente quanto faturou no mês?",
        "Você controla custos e despesas?",
        "Você separa lucro de faturamento?",
        "Você tem previsibilidade financeira?",
        "Seu financeiro está sob controle?",
        "Você acompanha fluxo de caixa?",
        "Você sabe onde perde dinheiro?",
        "Você define metas financeiras?",
        "Você analisa resultados financeiros?",
        "Seu caixa é saudável?",
        "Você conhece seus custos fixos?",
        "Você sabe quanto precisa vender para lucrar?",
        "Você acompanha entradas e saídas diariamente?",
        "Você planeja financeiramente os próximos meses?",
        "Você evita gastos desnecessários?",
        "Você sabe qual produto gera mais lucro?",
        "Você acompanha margens de lucro?",
        "Você controla dívidas da empresa?",
        "Você consegue manter equilíbrio financeiro?",
        "Você entende seus números financeiros?",
        "Você reserva capital para emergências?",
        "Você consegue prever períodos de baixa?",
        "Você avalia resultados financeiros regularmente?",
        "Você sabe quais despesas podem ser reduzidas?",
        "Você controla investimentos da empresa?",
        "Você toma decisões financeiras conscientes?",
        "Você acompanha lucro líquido mensal?",
        "Você tem metas claras de faturamento?",
        "Você sente segurança na área financeira?",
        "Você tem domínio sobre o dinheiro da empresa?"
    ]
};

function sortearPerguntas(lista, quantidade = 5) {
    return [...lista]
        .sort(() => Math.random() - 0.5)
        .slice(0, quantidade);
}

function carregarPerguntasEtapa() {
    const modalidadeAtual = modalidades[etapaAtual];

    if (!perguntasSelecionadas[etapaAtual]) {
        perguntasSelecionadas[etapaAtual] = sortearPerguntas(perguntasBase[modalidadeAtual]);
    }

    renderizarEtapa();
}

function renderizarEtapa() {
    const container = document.getElementById('questionario-container');
    container.innerHTML = "";

    const modalidadeAtual = modalidades[etapaAtual];

    document.getElementById('progresso-texto').innerText =
        `Modalidade: ${modalidadeAtual} (${etapaAtual + 1} de ${modalidades.length})`;

    perguntasSelecionadas[etapaAtual].forEach((texto, i) => {
        const valorAtual = respostasUsuario[etapaAtual]?.[i] || 5;

        const card = document.createElement('div');
        card.className = 'mini-card';
        card.style.marginBottom = '15px';

        card.innerHTML = `
            <p style="font-size:14px; color:#9cc7ff; margin-bottom:10px;">
                Questão ${i + 1}
            </p>

            <h3 style="font-size:16px; margin-bottom:15px;">
                ${texto}
            </h3>

            <input
                type="range"
                min="1"
                max="10"
                value="${valorAtual}"
                class="enoque-slider"
                oninput="atualizarNota(${etapaAtual}, ${i}, this.value, 'lbl-${i}')"
            >

            <div
                id="lbl-${i}"
                style="text-align:right; color:#00e0ff; font-weight:bold;"
            >
                ${valorAtual}
            </div>
        `;

        container.appendChild(card);
    });

    document.getElementById('btn-voltar').style.display =
        etapaAtual > 0 ? 'block' : 'none';

    const btnProximo = document.getElementById('btn-proximo');
    btnProximo.style.display = 'block';

    if (etapaAtual === modalidades.length - 1) {
        btnProximo.innerText = 'FINALIZAR DIAGNÓSTICO';
    } else {
        btnProximo.innerText = 'Próxima Modalidade';
    }
}

function atualizarNota(etapa, indice, valor, labelId) {
    if (!respostasUsuario[etapa]) {
        respostasUsuario[etapa] = {};
    }

    respostasUsuario[etapa][indice] = Number(valor);
    document.getElementById(labelId).innerText = valor;
}

function mudarPagina(direcao) {
    etapaAtual += direcao;

    if (etapaAtual >= modalidades.length) {
        finalizarTudo();
        return;
    }

    carregarPerguntasEtapa();
}

async function finalizarTudo() {
    const medias = modalidades.map((_, etapa) => {
        const respostas = Object.values(respostasUsuario[etapa] || {});
        if (respostas.length === 0) return 5;
        const soma = respostas.reduce((acc, val) => acc + val, 0);
        return Number((soma / respostas.length).toFixed(1));
    });

    // salva local (rápido)
    localStorage.setItem('enoque_scores', JSON.stringify(medias));

    // 🔥 PEGA USUÁRIO LOGADO
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        alert("Usuário não autenticado.");
        return;
    }

    // 🔥 SALVA NO SUPABASE
  const { data, error } = await supabaseClient
    .from('diagnosticos')
    .insert([
        {
            user_id: session.user.id,
            scores: medias
        }
    ])
    .select();

if (error) {
    console.error("ERRO DETALHADO:", error);
    alert("Erro ao salvar: " + error.message);
    return;
}

console.log("SALVO COM SUCESSO:", data);

    window.location.href = 'dashboard.html';

}

carregarPerguntasEtapa();