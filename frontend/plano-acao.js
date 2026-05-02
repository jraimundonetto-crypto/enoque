const SUPABASE_URL = 'https://fzlbhvxneemoramlbysn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_PwZyWTjtge6JDurdfu8h1g_KbvbsDpf';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const areas = ['Mentalidade', 'Vendas', 'Marketing', 'Gestão', 'Liderança', 'Financeiro'];

/*
========================================================
BANCO DE AÇÕES
COLE AQUI SUAS AÇÕES DE CADA MODALIDADE
========================================================
*/
const bancoAcoes = {
  Mentalidade: [
    "Definir uma meta clara para a semana",
    "Ler 10 páginas de um livro de mentalidade",
    "Escrever seus objetivos diários",
    "Eliminar uma distração da rotina",
    "Criar uma rotina matinal produtiva",
    "Revisar prioridades antes de começar o dia",
    "Praticar foco por 30 minutos",
    "Identificar um bloqueio mental atual",
    "Visualizar sua meta principal por 5 minutos",
    "Anotar 3 prioridades do dia",
    "Eliminar um hábito improdutivo",
    "Refletir sobre um erro recente",
    "Praticar disciplina em uma tarefa difícil",
    "Definir um novo padrão de comportamento",
    "Analisar seus resultados da semana",
    "Escrever uma meta mensal",
    "Avaliar onde está perdendo tempo",
    "Criar uma frase de motivação pessoal",
    "Fazer uma pausa consciente de 10 minutos",
    "Organizar seu espaço de trabalho",
    "Treinar concentração sem celular",
    "Identificar crenças limitantes",
    "Anotar aprendizados do dia",
    "Planejar o dia seguinte",
    "Criar um compromisso pessoal",
    "Revisar metas trimestrais",
    "Separar tempo para estudar",
    "Criar recompensa por meta cumprida",
    "Analisar hábitos positivos",
    "Definir horário fixo de produtividade",
    "Fazer lista de distrações",
    "Estabelecer um desafio pessoal",
    "Revisar missão pessoal",
    "Praticar gratidão",
    "Definir um limite de redes sociais",
    "Criar uma rotina de revisão",
    "Registrar progresso diário",
    "Escolher uma prioridade máxima",
    "Treinar constância em pequena tarefa",
    "Definir uma meta de superação",
    "Avaliar energia do dia",
    "Criar ritual de início de trabalho",
    "Eliminar pensamentos improdutivos",
    "Definir foco semanal",
    "Anotar vitórias recentes",
    "Criar hábito de leitura",
    "Praticar silêncio produtivo",
    "Fazer revisão de objetivos",
    "Identificar sabotadores mentais",
    "Definir meta de evolução",
    "Planejar melhoria pessoal",
    "Praticar autorresponsabilidade",
    "Avaliar progresso emocional",
    "Criar plano de foco",
    "Definir rotina noturna",
    "Escolher uma meta simples",
    "Treinar atenção plena",
    "Reforçar disciplina diária",
    "Revisar resultados anteriores",
    "Ajustar prioridades",
    "Planejar novos hábitos",
    "Eliminar excesso de tarefas",
    "Anotar desafios atuais",
    "Criar meta semanal clara",
    "Definir horário de descanso",
    "Melhorar organização pessoal",
    "Revisar produtividade",
    "Analisar desempenho diário",
    "Criar rotina sustentável",
    "Fortalecer hábito-chave",
    "Definir propósito do dia",
    "Avaliar foco atual",
    "Registrar conquistas",
    "Treinar autocontrole",
    "Criar rotina de revisão semanal",
    "Definir pequenas metas diárias",
    "Planejar progresso gradual",
    "Reforçar mentalidade positiva",
    "Analisar pontos fortes",
    "Reduzir distrações externas",
    "Criar disciplina de horários",
    "Aumentar tempo produtivo",
    "Melhorar clareza de objetivos",
    "Planejar semana produtiva",
    "Treinar perseverança",
    "Revisar rotina atual",
    "Definir meta de aprendizado",
    "Analisar comportamento produtivo",
    "Criar momento de reflexão",
    "Praticar execução rápida",
    "Eliminar procrastinação em uma tarefa",
    "Reforçar hábito produtivo",
    "Planejar meta prioritária",
    "Melhorar foco matinal",
    "Avaliar consistência",
    "Criar rotina estratégica",
    "Fortalecer autodisciplina",
    "Planejar próximos passos",
    "Registrar evolução semanal"
  ],

  Vendas: [
    "Entrar em contato com 5 clientes",
    "Apresentar oferta para novos leads",
    "Melhorar seu discurso comercial",
    "Registrar objeções mais frequentes",
    "Fazer follow-up com clientes antigos",
    "Criar uma promoção estratégica",
    "Treinar abordagem de vendas",
    "Enviar proposta comercial",
    "Responder clientes rapidamente",
    "Atualizar lista de leads",
    "Analisar taxa de conversão",
    "Criar argumento de valor",
    "Oferecer benefício adicional",
    "Agendar reuniões comerciais",
    "Reativar clientes inativos",
    "Testar nova abordagem",
    "Treinar fechamento de vendas",
    "Criar meta diária de contatos",
    "Mapear objeções comuns",
    "Ajustar oferta principal",
    "Criar roteiro comercial",
    "Monitorar respostas",
    "Analisar propostas enviadas",
    "Melhorar apresentação da oferta",
    "Acompanhar negociações",
    "Definir meta semanal de vendas",
    "Treinar comunicação persuasiva",
    "Revisar funil de vendas",
    "Separar leads quentes",
    "Criar urgência na oferta",
    "Analisar clientes perdidos",
    "Melhorar taxa de resposta",
    "Criar oferta especial",
    "Treinar quebra de objeções",
    "Analisar concorrência",
    "Registrar contatos realizados",
    "Enviar mensagem personalizada",
    "Criar pacote promocional",
    "Revisar preços",
    "Aumentar ticket médio",
    "Criar oferta complementar",
    "Avaliar performance comercial",
    "Testar novos canais",
    "Melhorar atendimento inicial",
    "Criar argumento de autoridade",
    "Treinar negociação",
    "Analisar perfil dos clientes",
    "Revisar metas comerciais",
    "Criar campanha de recuperação",
    "Melhorar proposta de valor",
    "Organizar pipeline",
    "Aumentar frequência de follow-up",
    "Criar bônus temporário",
    "Revisar metas diárias",
    "Treinar rapport",
    "Melhorar argumentação",
    "Definir prioridades comerciais",
    "Testar nova oferta",
    "Criar oferta sazonal",
    "Analisar oportunidades",
    "Criar incentivo de compra",
    "Melhorar funil comercial",
    "Criar script de vendas",
    "Revisar contatos pendentes",
    "Fortalecer relacionamento",
    "Treinar fechamento consultivo",
    "Criar gatilho de urgência",
    "Acompanhar métricas",
    "Revisar conversões",
    "Melhorar tempo de resposta",
    "Analisar funil atual",
    "Criar estratégia de upsell",
    "Testar abordagem personalizada",
    "Melhorar proposta enviada",
    "Acompanhar clientes em aberto",
    "Criar campanha relâmpago",
    "Treinar abordagem direta",
    "Organizar agenda comercial",
    "Criar incentivo limitado",
    "Melhorar comunicação comercial",
    "Revisar objeções recentes",
    "Criar oferta irresistível",
    "Definir meta de fechamento",
    "Analisar desempenho diário",
    "Melhorar abordagem inicial",
    "Acompanhar leads novos",
    "Criar mensagem de retorno",
    "Treinar apresentação rápida",
    "Ajustar estratégia comercial",
    "Reforçar diferenciais",
    "Criar campanha de indicação",
    "Melhorar fechamento",
    "Avaliar resultados comerciais",
    "Testar novo script",
    "Criar meta de faturamento",
    "Aumentar conversão diária",
    "Planejar próximas vendas",
    "Registrar resultados"
  ],

  Marketing: [
    "Criar 2 conteúdos estratégicos",
    "Publicar um story com oferta",
    "Atualizar bio do Instagram",
    "Divulgar oferta no WhatsApp",
    "Testar novo formato de conteúdo",
    "Analisar engajamento da semana",
    "Criar chamada para ação melhor",
    "Planejar calendário de posts",
    "Criar conteúdo educativo",
    "Postar depoimento de cliente",
    "Criar conteúdo com prova social",
    "Melhorar identidade visual",
    "Testar novo horário de postagem",
    "Criar campanha promocional",
    "Atualizar destaques",
    "Publicar bastidores",
    "Criar legenda estratégica",
    "Revisar métricas",
    "Criar conteúdo de autoridade",
    "Planejar sequência de stories",
    "Produzir vídeo curto",
    "Criar oferta atrativa",
    "Melhorar criativos",
    "Criar conteúdo de conexão",
    "Fazer pesquisa com seguidores",
    "Publicar dica rápida",
    "Criar conteúdo para engajar",
    "Atualizar link da bio",
    "Planejar campanha semanal",
    "Criar anúncio simples",
    "Testar novo criativo",
    "Melhorar headline",
    "Criar sequência de posts",
    "Publicar antes e depois",
    "Criar conteúdo persuasivo",
    "Analisar alcance",
    "Criar conteúdo viral",
    "Revisar estratégia",
    "Publicar chamada para ação",
    "Criar conteúdo de valor",
    "Testar novo tema",
    "Criar conteúdo sazonal",
    "Melhorar copy",
    "Criar reels estratégico",
    "Analisar resultados",
    "Planejar conteúdo da semana",
    "Criar campanha de engajamento",
    "Melhorar descrição",
    "Publicar oferta especial",
    "Criar post educativo",
    "Atualizar capa dos destaques",
    "Criar conteúdo inspirador",
    "Analisar retenção",
    "Planejar stories",
    "Criar conteúdo de conversão",
    "Melhorar identidade da marca",
    "Criar chamada de impacto",
    "Testar novo formato",
    "Criar conteúdo com autoridade",
    "Publicar resultado de cliente",
    "Criar campanha rápida",
    "Revisar desempenho",
    "Criar conteúdo simples",
    "Planejar próximos posts",
    "Criar sequência promocional",
    "Melhorar alcance",
    "Criar post de oferta",
    "Publicar conteúdo útil",
    "Criar reels curto",
    "Revisar calendário",
    "Criar conteúdo emocional",
    "Melhorar narrativa",
    "Criar post estratégico",
    "Analisar interação",
    "Criar conteúdo diário",
    "Melhorar CTA",
    "Publicar conteúdo visual",
    "Criar campanha temática",
    "Revisar posicionamento",
    "Criar conteúdo direcionado",
    "Planejar conteúdo mensal",
    "Criar conteúdo relevante",
    "Testar criativo novo",
    "Melhorar engajamento",
    "Criar conteúdo promocional",
    "Analisar métricas principais",
    "Criar sequência de vendas",
    "Melhorar autoridade",
    "Publicar prova social",
    "Criar campanha criativa",
    "Planejar divulgação",
    "Criar conteúdo segmentado",
    "Melhorar presença online",
    "Criar oferta clara",
    "Publicar conteúdo de valor",
    "Analisar performance",
    "Criar nova estratégia"
  ],

   Gestao: [
    "Planejar tarefas da semana",
    "Organizar agenda operacional",
    "Definir prioridades do negócio",
    "Eliminar uma tarefa desnecessária",
    "Revisar processos internos",
    "Criar checklist operacional",
    "Mapear atividades diárias",
    "Definir metas da semana",
    "Organizar documentos importantes",
    "Atualizar cronograma",
    "Acompanhar tarefas pendentes",
    "Delegar atividade operacional",
    "Padronizar um processo",
    "Analisar gargalos",
    "Melhorar fluxo de trabalho",
    "Criar rotina de acompanhamento",
    "Revisar produtividade da equipe",
    "Ajustar planejamento semanal",
    "Criar indicadores básicos",
    "Organizar prioridades do dia",
    "Mapear tarefas repetitivas",
    "Automatizar uma atividade",
    "Definir responsáveis",
    "Criar padrão de execução",
    "Acompanhar prazos",
    "Atualizar lista de tarefas",
    "Organizar processos financeiros",
    "Melhorar comunicação interna",
    "Planejar próximas ações",
    "Criar rotina administrativa",
    "Analisar tempo gasto nas tarefas",
    "Eliminar retrabalho",
    "Definir processos críticos",
    "Organizar informações",
    "Criar plano operacional",
    "Monitorar atividades",
    "Melhorar controle interno",
    "Ajustar prioridades da equipe",
    "Criar fluxo operacional",
    "Padronizar atendimento",
    "Acompanhar resultados diários",
    "Organizar tarefas urgentes",
    "Revisar andamento semanal",
    "Criar agenda produtiva",
    "Melhorar rotina administrativa",
    "Mapear pontos críticos",
    "Criar cronograma semanal",
    "Revisar atividades concluídas",
    "Organizar demandas",
    "Criar modelo de acompanhamento",
    "Avaliar produtividade",
    "Padronizar tarefas recorrentes",
    "Melhorar distribuição de tarefas",
    "Criar plano diário",
    "Acompanhar indicadores",
    "Revisar prioridades operacionais",
    "Organizar recursos",
    "Criar rotina de análise",
    "Planejar ações corretivas",
    "Melhorar execução diária",
    "Definir metas operacionais",
    "Monitorar prazos",
    "Criar lista de prioridades",
    "Organizar processos-chave",
    "Padronizar entregas",
    "Analisar resultados operacionais",
    "Ajustar processos",
    "Criar plano de melhoria",
    "Organizar tarefas estratégicas",
    "Definir fluxo ideal",
    "Melhorar acompanhamento",
    "Criar calendário operacional",
    "Analisar falhas internas",
    "Reforçar organização",
    "Criar método de controle",
    "Revisar metas operacionais",
    "Organizar rotina da equipe",
    "Planejar demandas futuras",
    "Melhorar eficiência",
    "Criar sistema de acompanhamento",
    "Acompanhar produtividade",
    "Definir padrões internos",
    "Revisar processos semanais",
    "Organizar execução",
    "Planejar tarefas prioritárias",
    "Criar rotina de revisão",
    "Melhorar gestão do tempo",
    "Definir etapas de trabalho",
    "Acompanhar resultados semanais",
    "Padronizar rotinas",
    "Criar plano de organização",
    "Analisar desempenho operacional",
    "Melhorar gestão diária",
    "Revisar cronograma",
    "Criar sistema simples de gestão",
    "Planejar melhorias",
    "Monitorar execução",
    "Ajustar fluxo interno",
    "Revisar processos diários"
  ],

  Lideranca: [
    "Delegar uma tarefa da semana",
    "Dar feedback claro ao time",
    "Definir metas para colaboradores",
    "Fazer reunião de alinhamento",
    "Acompanhar desempenho da equipe",
    "Reconhecer resultado positivo",
    "Ouvir sugestões da equipe",
    "Distribuir responsabilidades",
    "Definir prioridade coletiva",
    "Orientar execução de tarefas",
    "Alinhar objetivos",
    "Corrigir falhas com clareza",
    "Motivar equipe",
    "Delegar tarefa estratégica",
    "Acompanhar metas individuais",
    "Fortalecer comunicação interna",
    "Resolver conflito rapidamente",
    "Promover alinhamento",
    "Estabelecer expectativas claras",
    "Analisar desempenho semanal",
    "Desenvolver colaborador",
    "Reforçar responsabilidade",
    "Dar direção objetiva",
    "Estimular comprometimento",
    "Criar rotina de alinhamento",
    "Reforçar metas da equipe",
    "Avaliar desempenho individual",
    "Delegar com clareza",
    "Reconhecer avanços",
    "Promover cooperação",
    "Estimular autonomia",
    "Definir papéis",
    "Melhorar comunicação",
    "Resolver pendências",
    "Dar suporte estratégico",
    "Criar cultura de resultado",
    "Orientar prioridades",
    "Acompanhar progresso",
    "Promover responsabilidade",
    "Reforçar foco coletivo",
    "Definir metas diárias",
    "Acompanhar entregas",
    "Fortalecer liderança ativa",
    "Desenvolver habilidades",
    "Corrigir rota da equipe",
    "Revisar responsabilidades",
    "Estimular produtividade",
    "Melhorar clima interno",
    "Criar rotina de feedback",
    "Fortalecer alinhamento",
    "Delegar novas funções",
    "Estimular proatividade",
    "Acompanhar resultados",
    "Definir metas semanais",
    "Melhorar gestão de pessoas",
    "Reconhecer esforço",
    "Corrigir desvios",
    "Desenvolver liderança interna",
    "Aumentar engajamento",
    "Criar padrão de comunicação",
    "Estabelecer metas claras",
    "Promover integração",
    "Fortalecer confiança",
    "Acompanhar desenvolvimento",
    "Dar feedback rápido",
    "Promover responsabilidade coletiva",
    "Melhorar alinhamento estratégico",
    "Criar rotina de acompanhamento",
    "Reforçar cultura da equipe",
    "Ajustar direcionamento",
    "Estimular evolução",
    "Definir prioridades do time",
    "Melhorar engajamento da equipe",
    "Desenvolver autonomia",
    "Fortalecer disciplina",
    "Promover clareza nas tarefas",
    "Acompanhar indicadores",
    "Estimular foco",
    "Reconhecer pequenas vitórias",
    "Melhorar colaboração",
    "Criar visão de resultado",
    "Orientar com objetividade",
    "Acompanhar desafios",
    "Fortalecer propósito",
    "Melhorar liderança diária",
    "Criar rotina de suporte",
    "Ajustar metas",
    "Desenvolver confiança",
    "Promover crescimento",
    "Revisar alinhamento",
    "Estimular disciplina coletiva",
    "Dar direcionamento claro",
    "Fortalecer comprometimento",
    "Promover evolução da equipe",
    "Acompanhar rotina",
    "Criar cultura de responsabilidade",
    "Melhorar desempenho coletivo",
    "Reforçar alinhamento diário"
  ],

  Financeiro: [
    "Registrar entradas e saídas",
    "Separar lucro e faturamento",
    "Definir limite de gastos",
    "Analisar despesas da semana",
    "Criar meta financeira semanal",
    "Revisar fluxo de caixa",
    "Atualizar planilha financeira",
    "Analisar custos fixos",
    "Identificar gastos desnecessários",
    "Definir orçamento semanal",
    "Separar despesas por categoria",
    "Acompanhar saldo diário",
    "Registrar recebimentos",
    "Planejar reserva financeira",
    "Revisar contas a pagar",
    "Monitorar faturamento",
    "Analisar margem de lucro",
    "Controlar gastos variáveis",
    "Criar meta de economia",
    "Organizar pagamentos",
    "Acompanhar inadimplência",
    "Revisar preços",
    "Calcular lucro da semana",
    "Analisar entradas diárias",
    "Planejar despesas futuras",
    "Reduzir um custo fixo",
    "Criar rotina financeira",
    "Separar capital de giro",
    "Controlar despesas operacionais",
    "Avaliar resultados financeiros",
    "Registrar gastos extras",
    "Planejar investimentos",
    "Definir meta de faturamento",
    "Monitorar lucro diário",
    "Acompanhar custos",
    "Revisar orçamento",
    "Criar plano de redução de custos",
    "Organizar fluxo semanal",
    "Calcular ticket médio",
    "Analisar receita mensal",
    "Separar contas prioritárias",
    "Planejar pagamentos",
    "Criar fundo de reserva",
    "Monitorar despesas fixas",
    "Revisar lucratividade",
    "Controlar entradas diárias",
    "Planejar caixa",
    "Definir teto de gastos",
    "Avaliar desempenho financeiro",
    "Revisar despesas mensais",
    "Criar planejamento financeiro",
    "Controlar saídas diárias",
    "Acompanhar metas financeiras",
    "Analisar custos totais",
    "Separar recursos estratégicos",
    "Planejar lucro mensal",
    "Organizar contas",
    "Controlar orçamento",
    "Reduzir desperdícios",
    "Monitorar indicadores financeiros",
    "Criar reserva semanal",
    "Avaliar fluxo de caixa",
    "Separar despesas essenciais",
    "Revisar resultados financeiros",
    "Planejar entradas futuras",
    "Monitorar rentabilidade",
    "Organizar capital disponível",
    "Criar rotina de análise",
    "Acompanhar evolução financeira",
    "Revisar margem de lucro",
    "Definir prioridades financeiras",
    "Analisar despesas operacionais",
    "Criar meta de caixa",
    "Planejar redução de custos",
    "Controlar pagamentos",
    "Revisar indicadores",
    "Planejar orçamento mensal",
    "Acompanhar metas de lucro",
    "Organizar fluxo de recebimentos",
    "Criar plano de reserva",
    "Avaliar custos fixos",
    "Revisar gastos da semana",
    "Controlar recursos",
    "Planejar investimentos futuros",
    "Analisar rentabilidade semanal",
    "Separar ganhos",
    "Criar meta de economia mensal",
    "Monitorar saldo",
    "Revisar despesas variáveis",
    "Controlar faturamento semanal",
    "Planejar expansão financeira",
    "Avaliar resultados mensais",
    "Ajustar orçamento",
    "Reforçar controle financeiro",
    "Criar estratégia de lucro",
    "Planejar saúde financeira",
    "Acompanhar crescimento financeiro"
  ]

};

/*
========================================================
SORTEAR AÇÕES
========================================================
*/
function sortearAcoes(area, quantidade = 3) {
    const lista = [...(bancoAcoes[area] || [])];
    const selecionadas = [];

    while (selecionadas.length < quantidade && lista.length > 0) {
        const index = Math.floor(Math.random() * lista.length);
        selecionadas.push(lista[index]);
        lista.splice(index, 1);
    }

    return selecionadas;
}

/*
========================================================
GERAR NOVO PLANO
========================================================
*/
function gerarNovoPlano() {
    const scores = JSON.parse(localStorage.getItem('enoque_scores')) || [5,5,5,5,5,5];

    const resultados = areas.map((area, i) => ({
        area,
        nota: scores[i]
    }));

    resultados.sort((a,b) => a.nota - b.nota);

    const prioridades = resultados.slice(0,3).map(item => ({
        area: item.area,
        nota: item.nota,
        tarefas: sortearAcoes(item.area, 3),
        concluido: false
    }));

    localStorage.setItem("plano_acao", JSON.stringify(prioridades));

    renderizarPlano(prioridades);
}

/*
========================================================
RENDERIZAR PLANO
========================================================
*/
function renderizarPlano(prioridades) {
    const container = document.getElementById("plano-grid");

    if (!container) {
        console.error("Elemento plano-grid não encontrado.");
        return;
    }

    container.innerHTML = "";

    prioridades.forEach((item, index) => {
        const tarefasHTML = item.tarefas.map(t => `
            <li style="margin-bottom:10px;color:#d7e8ff;line-height:1.5;">
                ${t}
            </li>
        `).join("");

        const card = document.createElement("div");
        card.className = "plan-mission-card";

        card.innerHTML = `
            <div class="plan-badge">PRIORIDADE ${index + 1}</div>

            <h3 style="margin-top:14px;">
                ${item.area}
            </h3>

            <p style="margin-bottom:12px;">
                Nota atual: <strong style="color:#00e0ff;">${item.nota}</strong>
            </p>

            <ul style="padding-left:18px;margin-bottom:18px;">
                ${tarefasHTML}
            </ul>

            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button onclick="consultarPlano(${index})" style="
                    padding:10px 14px;
                    border:none;
                    border-radius:12px;
                    cursor:pointer;
                    font-weight:600;
                    color:#04111d;
                    background:linear-gradient(135deg,#00e0ff,#00d98b);
                ">
                    Consultar
                </button>

                <button onclick="concluirPlano(${index})" style="
                    padding:10px 14px;
                    border:none;
                    border-radius:12px;
                    cursor:pointer;
                    font-weight:600;
                    color:white;
                    background:${item.concluido ? '#27AE60' : 'rgba(255,255,255,0.15)'};
                ">
                    ${item.concluido ? 'Concluído' : 'Concluir'}
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

/*
========================================================
CONSULTAR DETALHES
========================================================
*/
function consultarPlano(index) {
    const plano = JSON.parse(localStorage.getItem("plano_acao")) || [];
    const item = plano[index];

    if (!item) return;

    const mensagem = `
Plano detalhado para ${item.area}:

1. ${item.tarefas[0]}
→ Execute com foco total.

2. ${item.tarefas[1]}
→ Defina horário para executar.

3. ${item.tarefas[2]}
→ Registre o resultado obtido.
    `;

    alert(mensagem);
}

/*
========================================================
CONCLUIR PRIORIDADE
========================================================
*/
function concluirPlano(index) {
    let plano = JSON.parse(localStorage.getItem("plano_acao")) || [];

    if (!plano[index]) return;

    plano[index].concluido = true;

    localStorage.setItem("plano_acao", JSON.stringify(plano));

    renderizarPlano(plano);

    const todasConcluidas = plano.every(item => item.concluido);

    if (todasConcluidas) {
        setTimeout(() => {
            alert("Parabéns! Plano concluído. Iniciando novo ciclo.");

            localStorage.removeItem("plano_acao");
            localStorage.setItem("enoque_scores", JSON.stringify([0,0,0,0,0,0]));

            location.reload();
        }, 500);
    }
}

/*
========================================================
INICIAR
========================================================
*/
function iniciarPlano() {
    const scores = JSON.parse(localStorage.getItem('enoque_scores'));

    if (!scores || scores.length !== 6) {
        console.error("Scores inválidos:", scores);
        return;
    }

    gerarNovoPlano(scores);
}

window.onload = () => {
    iniciarPlano();
};