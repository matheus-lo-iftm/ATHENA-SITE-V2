(() => {
  'use strict';
  const raiz = document.querySelector('.acervo-pagina');
  if (!raiz) return;
  const pegar = nome => raiz.querySelector(`#acervo-${nome}`);
  const dados = window.ACERVO_CIENTISTAS || [];
  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const iniciais = nome => nome.split(' ').filter(Boolean).map(p => p[0]).slice(0, 2).join('');
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)');
  let origem = 'brasileiras', area = 'todas', conexoes = false, pagina = 0;
  let selecionada = '', versao = 0;
  const porPagina = 8;

  // Os três arquivos são independentes. Uma imagem ausente vira um placeholder.
  function carregarImagem(elemento, caminho, token, aoCarregar) {
    elemento.hidden = true;
    elemento.removeAttribute('src');
    if (!caminho) return;
    const imagem = new Image();
    imagem.onload = () => {
      if (token !== versao) return;
      elemento.src = caminho;
      elemento.hidden = false;
      aoCarregar?.();
    };
    imagem.onerror = () => {}; // Mantém o cenário CSS / iniciais.
    imagem.src = caminho;
  }

  function selecionar(cientista) {
    selecionada = cientista?.id || '';
    const token = ++versao;
    pegar('apresentacao').hidden = !cientista;
    pegar('fundo').hidden = true;
    if (!cientista) return;
    pegar('nome').textContent = cientista.nome;
    pegar('area').textContent = `${cientista.areas.join(' / ')} • ${cientista.origem}`;
    pegar('resumo').textContent = cientista.resumo;
    pegar('indice').textContent = `ARQUIVO ${String(dados.indexOf(cientista) + 1).padStart(2, '0')}`;
    pegar('personagem-vazia').textContent = iniciais(cientista.nome);
    pegar('personagem-vazia').hidden = false;
    carregarImagem(pegar('fundo'), cientista.fundo, token);
    carregarImagem(pegar('personagem'), cientista.personagem, token, () => {
      pegar('personagem-vazia').hidden = true;
    });
    const link = pegar('biografia');
    link.hidden = !cientista.biografia;
    pegar('pendente').hidden = Boolean(cientista.biografia);
    if (cientista.biografia) link.href = cientista.biografia;
    else link.removeAttribute('href');
    raiz.querySelectorAll('[data-acervo-cientista]').forEach(botao => {
      botao.setAttribute('aria-pressed', String(botao.dataset.acervoCientista === selecionada));
    });
  }

  function filtrar() {
    const busca = normalizar(pegar('busca').value.trim());
    return dados.filter(c =>
      (origem === 'todas' || c.brasileira) &&
      (area === 'todas' || c.areas.includes(area)) &&
      (!conexoes || c.areas.length > 1) &&
      normalizar(c.nome).includes(busca)
    );
  }

  function renderizar() {
    const lista = filtrar();
    const paginas = Math.max(1, Math.ceil(lista.length / porPagina));
    pagina = Math.min(pagina, paginas - 1);
    const exibidas = lista.slice(pagina * porPagina, (pagina + 1) * porPagina);
    pegar('grade').replaceChildren();
    exibidas.forEach(c => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'acervo-cartao';
      botao.dataset.acervoCientista = c.id;
      botao.setAttribute('aria-label', `Selecionar ${c.nome}`);
      const retrato = document.createElement('span');
      retrato.className = 'acervo-retrato';
      retrato.setAttribute('aria-hidden', 'true');
      retrato.textContent = iniciais(c.nome);
      if (c.miniatura) {
        const imagem = document.createElement('img');
        imagem.alt = '';
        imagem.loading = 'lazy';
        imagem.addEventListener('error', () => imagem.remove(), { once: true });
        imagem.src = c.miniatura;
        retrato.append(imagem);
      }
      const nome = document.createElement('span');
      nome.className = 'acervo-cartao-nome';
      nome.textContent = c.nome;
      botao.append(retrato, nome);
      botao.addEventListener('click', () => selecionar(c));
      pegar('grade').append(botao);
    });
    selecionar(exibidas.find(c => c.id === selecionada) || exibidas[0]);
    pegar('anterior').disabled = pagina === 0;
    pegar('proximo').disabled = pagina === paginas - 1;
    pegar('vazio').hidden = lista.length > 0;
    pegar('resultados').textContent = `${lista.length} cientistas • página ${pagina + 1} de ${paginas}`;
    pegar('grade-titulo').textContent = conexoes ? 'CONEXÕES ENTRE ÁREAS' : origem === 'brasileiras' ? 'CIENTISTAS BRASILEIRAS' : 'TODAS AS CIENTISTAS';
    raiz.querySelectorAll('[data-acervo-origem]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.acervoOrigem === origem)));
    raiz.querySelectorAll('[data-acervo-area]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.acervoArea === area)));
  }

  ['todas', ...new Set(dados.flatMap(c => c.areas))].forEach(valor => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'acervo-chip'; b.dataset.acervoArea = valor;
    b.textContent = valor === 'todas' ? 'Todas as áreas' : valor;
    b.addEventListener('click', () => { area = valor; pagina = 0; renderizar(); });
    pegar('areas').append(b);
  });
  raiz.querySelectorAll('[data-acervo-origem]').forEach(b => b.addEventListener('click', () => {
    origem = b.dataset.acervoOrigem; pagina = 0; renderizar();
  }));
  pegar('filtros').addEventListener('submit', e => e.preventDefault());
  pegar('busca').addEventListener('input', () => { pagina = 0; renderizar(); });
  pegar('anterior').addEventListener('click', () => { pagina = Math.max(0, pagina - 1); renderizar(); });
  pegar('proximo').addEventListener('click', () => { pagina++; renderizar(); });
  function limpar() { origem = 'todas'; area = 'todas'; conexoes = false; pagina = 0; pegar('busca').value = ''; }
  pegar('limpar').addEventListener('click', () => { limpar(); renderizar(); });
  raiz.querySelectorAll('[data-acervo-atalho]').forEach(b => b.addEventListener('click', () => {
    limpar();
    origem = b.dataset.acervoAtalho === 'brasileiras' ? 'brasileiras' : 'todas';
    conexoes = b.dataset.acervoAtalho === 'interdisciplinares';
    renderizar();
    pegar('busca').focus({ preventScroll: true });
    pegar('filtros').scrollIntoView({ behavior: reduzir.matches ? 'auto' : 'smooth', block: 'start' });
  }));

  // Profundidade com duas imagens planas: não requer modelo 3D ou biblioteca.
  const palco = pegar('palco');
  let quadro = 0, x = 0, y = 0;
  function mover() {
    quadro = 0;
    palco.style.setProperty('--acervo-x', `${x}px`);
    palco.style.setProperty('--acervo-y', `${y}px`);
  }
  function resetar() { cancelAnimationFrame(quadro); quadro = 0; x = y = 0; mover(); }
  palco.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || reduzir.matches || document.body.classList.contains('effects-off')) { resetar(); return; }
    const r = palco.getBoundingClientRect();
    x = ((e.clientX - r.left) / r.width - .5) * 20;
    y = ((e.clientY - r.top) / r.height - .5) * 12;
    if (!quadro) quadro = requestAnimationFrame(mover);
  });
  palco.addEventListener('pointerleave', resetar);
  reduzir.addEventListener('change', resetar);
  window.addEventListener('blur', resetar);
  renderizar();
})();
