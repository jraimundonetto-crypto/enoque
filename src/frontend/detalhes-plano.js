const dados = JSON.parse(localStorage.getItem('plano_modalidade'));

document.getElementById('titulo-plano').innerText = dados.modalidade;

document.getElementById('detalhes-texto').innerText = `
Durante esta semana, foque em fortalecer ${dados.modalidade}.
Defina metas claras, acompanhe resultados diariamente e execute ações práticas alinhadas ao seu momento atual.
A prioridade agora é aumentar consistência, corrigir falhas e gerar evolução perceptível.
`;