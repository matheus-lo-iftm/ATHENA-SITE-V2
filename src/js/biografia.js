(() => {
  'use strict';
  const raiz = document.querySelector('.biografia-page');
  const dados = window.BIOGRAFIA_DADOS;
  if (!raiz || !dados) return;
  const pegar = nome => raiz.querySelector(`#biografia-${nome}`);
  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }
  document.title = `${dados.nome} | A.T.H.E.N.A.`;
  pegar('nome').textContent = dados.nome;
  pegar('subtitulo').textContent = dados.subtitulo;
  pegar('placeholder').textContent = dados.nome.split(' ').map(p => p[0]).slice(0, 2).join('');
  dados.areas.forEach(area => pegar('tags').append(criar('span', 'biografia-tag', area)));
  for (const [titulo, texto] of [['Nome', dados.nomeCompleto], ['Vida', dados.vida], ['Origem', dados.origem], ['Áreas', dados.areas.join(' / ')]]) {
    pegar('ficha').append(criar('dt', '', titulo), criar('dd', '', texto));
  }
  for (const nome of ['fundo', 'personagem']) {
    const caminho = dados.imagens[nome];
    if (!caminho) continue;
    const img = pegar(nome);
    img.addEventListener('load', () => {
      img.hidden = false;
      if (nome === 'personagem') { pegar('placeholder').hidden = true; pegar('credito').hidden = false; }
    });
    img.addEventListener('error', () => { img.hidden = true; });
    img.src = caminho;
  }
  function adicionarNav(id, titulo) {
    const link = criar('a', 'biografia-nav-link', titulo);
    link.href = `#biografia-${id}`;
    pegar('nav').append(link);
  }
  dados.secoes.forEach((secao, indice) => {
    adicionarNav(secao.id, secao.titulo);
    const bloco = criar('section', `biografia-secao biografia-secao-${secao.tipo}`);
    bloco.id = `biografia-${secao.id}`;
    bloco.setAttribute('aria-labelledby', `biografia-titulo-${secao.id}`);
    const topo = criar('header', 'biografia-secao-topo');
    topo.append(criar('span', 'biografia-numero', String(indice + 1).padStart(2, '0')));
    const h = criar('h2', '', secao.titulo); h.id = `biografia-titulo-${secao.id}`;
    topo.append(h, criar('p', '', secao.subtitulo));
    const lista = criar('div', 'biografia-lista');
    secao.itens.forEach(item => {
      const card = criar('article', 'biografia-card');
      card.append(criar('span', 'biografia-marca', item.marca));
      const texto = criar('div', 'biografia-card-texto');
      texto.append(criar('h3', '', item.titulo), criar('p', '', item.texto));
      if (item.fonte) {
        const fonte = criar('a', 'biografia-citacao', `Fonte ${item.fonte} ↗`);
        fonte.href = `#biografia-fonte-${item.fonte}`;
        texto.append(fonte);
      }
      card.append(texto); lista.append(card);
    });
    bloco.append(topo, lista); pegar('conteudo').append(bloco);
  });
  adicionarNav('fontes', 'Fontes');
  const fontes = criar('section', 'biografia-secao biografia-fontes');
  fontes.id = 'biografia-fontes';
  fontes.append(criar('h2', '', 'Fontes e referências'));
  const lista = criar('ol', 'biografia-fontes-lista');
  dados.fontes.forEach((fonte, i) => {
    const li = criar('li', 'biografia-fonte'); li.id = `biografia-fonte-${i + 1}`;
    const link = criar('a', '', `${fonte.titulo} ↗`); link.href = fonte.url;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    li.append(link, criar('p', '', fonte.uso)); lista.append(li);
  });
  fontes.append(lista); pegar('conteudo').append(fontes);

  // Marca a seção atual sem esconder conteúdo nem prender a rolagem.
  const secoes = [...raiz.querySelectorAll('.biografia-secao')];
  const links = [...pegar('nav').querySelectorAll('a')];
  let agendado = false;
  function atualizar() {
    const limite = pegar('nav').offsetHeight + 30;
    let ativa = secoes[0];
    for (const secao of secoes) if (secao.getBoundingClientRect().top <= limite) ativa = secao;
    links.forEach(link => {
      if (link.hash === `#${ativa.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    agendado = false;
  }
  window.addEventListener('scroll', () => {
    if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  atualizar();
})();
