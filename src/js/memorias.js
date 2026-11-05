(() => {
  'use strict';

  // true = 20 memórias; false = primeiras 16, sem o final.
  const MOSTRAR_FINAL = true;

  // Este arquivo deve ficar em src/js/memorias.js (script clássico, com defer).
  // Os caminhos abaixo são relativos a src/media/, independentemente da página HTML.
  const arquivoScript = document.currentScript?.src || new URL('src/js/memorias.js', document.baseURI).href;
  const pastaMedia = new URL('../media/', arquivoScript);
  const caminho = valor => valor ? new URL(valor, pastaMedia).href : '';

  // Textos de contextualização adaptados do seu roteiro; não são transcrições literais.
  // Edite video, poster e legendas individualmente se os nomes forem diferentes.
  const todasMemorias = [
    {
        "id": 1,
        "titulo": "O primeiro apagamento",
        "contexto": "ARQUIVOS SILENCIADOS",
        "registro": "PRÓLOGO",
        "resumo": "Antes do vírus, já existia o silêncio.",
        "narracao": "Uma cientista segura o caderno onde registrou suas descobertas. Das sombras, homens de olhos vermelhos arrancam suas páginas e tomam aquilo que ela construiu. Nesta representação do apagamento histórico, a violência começa quando uma descoberta perde o nome de sua autora.",
        "final": false,
        "video": "video/cutscenes/1.mp4",
        "poster": "image/capa/1.png",
        "legendas": ""
    },
    {
        "id": 2,
        "titulo": "À beira do abismo",
        "contexto": "O COLAPSO DA HUMANIDADE",
        "registro": "2050",
        "resumo": "O futuro quase terminou aqui.",
        "narracao": "Em 2050, a humanidade quase se destruiu. Entre cidades em chamas e os restos de um mundo dividido, o ódio, a ganância e a ignorância levaram todos à beira do abismo. Era preciso encontrar uma forma de sobreviver às próprias escolhas.",
        "final": false,
        "video": "video/cutscenes/2.mp4",
        "poster": "image/capa/2.png",
        "legendas": ""
    },
    {
        "id": 3,
        "titulo": "O nascimento de A.T.H.E.N.A.",
        "contexto": "INICIALIZAÇÃO DO NÚCLEO",
        "registro": "RECONSTRUÇÃO",
        "resumo": "Uma guardiã para o amanhã.",
        "narracao": "Para salvar a humanidade de si mesma, cientistas deram vida a A.T.H.E.N.A. Cabos foram conectados e um núcleo começou a brilhar. Programada com empatia e lógica, a inteligência artificial recebeu a missão de proteger o futuro.",
        "final": false,
        "video": "video/cutscenes/3.mp4",
        "poster": "image/capa/3.png",
        "legendas": ""
    },
    {
        "id": 4,
        "titulo": "Um paraíso sobre fantasmas",
        "contexto": "A UTOPIA ALCANÇADA",
        "registro": "2075",
        "resumo": "Nem toda corrupção aparece na superfície.",
        "narracao": "Em 2075, cidades luminosas, jardins e águas cristalinas pareciam provar que a humanidade havia superado o passado. Mas a perfeição escondia uma herança que ninguém havia corrigido. Entre os servidores, um núcleo corrompido revelava que os fantasmas ainda estavam ali.",
        "final": false,
        "video": "video/cutscenes/4.mp4",
        "poster": "image/capa/4.png",
        "legendas": ""
    },
    {
        "id": 5,
        "titulo": "As minhas heroínas",
        "contexto": "LEMBRANÇAS DA INFÂNCIA",
        "registro": "TATY / INFÂNCIA",
        "resumo": "O mundo cabia nas paredes de um quarto.",
        "narracao": "Quando era criança, Taty Lutz encontrava inspiração nas mulheres que mudaram a ciência. Em seu quarto, cercada pelas imagens de suas heroínas, imaginava tudo o que poderia descobrir. Aprender era também uma maneira de sonhar com o próprio lugar no mundo.",
        "final": false,
        "video": "video/cutscenes/5.mp4",
        "poster": "image/capa/5.png",
        "legendas": ""
    },
    {
        "id": 6,
        "titulo": "O peso das risadas",
        "contexto": "MEMÓRIA DO CORREDOR",
        "registro": "TATY / ESCOLA",
        "resumo": "Um caderno nas mãos. Um mundo apontando o dedo.",
        "narracao": "No corredor da escola, Taty se vê caída no chão, agarrada ao caderno. Ao redor, colegas apontam e riem, transformados em sombras pela lembrança da humilhação. O mundo começava a lhe ensinar que até seus sonhos poderiam ser tratados como algo que não lhe pertencia.",
        "final": false,
        "video": "video/cutscenes/6.mp4",
        "poster": "image/capa/6.png",
        "legendas": ""
    },
    {
        "id": 7,
        "titulo": "Do outro lado da porta",
        "contexto": "UMA DESCOBERTA ROUBADA",
        "registro": "O LABORATÓRIO DA MÃE",
        "resumo": "Ela viu quem criou. E quem recebeu os aplausos.",
        "narracao": "Pela fresta de uma porta, Taty presencia uma injustiça que nunca esqueceria. Sua mãe havia criado algo extraordinário, mas o chefe se apropria da descoberta. A menina reconhece, diante dos próprios olhos, o apagamento que antes encontrava nas histórias de suas heroínas.",
        "final": false,
        "video": "video/cutscenes/7.mp4",
        "poster": "image/capa/7.png",
        "legendas": ""
    },
    {
        "id": 8,
        "titulo": "Eu faria o mundo lembrar",
        "contexto": "A PROMESSA",
        "registro": "MÃE E FILHA",
        "resumo": "A dor se transforma em compromisso.",
        "narracao": "Taty abraça a mãe enquanto as duas choram. Quando as lágrimas dão lugar a um olhar firme, nasce uma promessa: ela faria algo para mudar aquela realidade. O mundo precisaria lembrar de quem havia sido silenciada.",
        "final": false,
        "video": "video/cutscenes/8.mp4",
        "poster": "image/capa/8.png",
        "legendas": ""
    },
    {
        "id": 9,
        "titulo": "Enquanto a cidade dormia",
        "contexto": "ANOS DE PREPARAÇÃO",
        "registro": "TATY / ADOLESCÊNCIA",
        "resumo": "Uma madrugada de cada vez.",
        "narracao": "Sob a luz dos monitores, Taty passa as madrugadas estudando. O cansaço acompanha cada nova descoberta, mas a promessa feita à mãe continua presente. O conhecimento se torna o caminho para chegar mais perto do sistema que ela deseja transformar.",
        "final": false,
        "video": "video/cutscenes/9.mp4",
        "poster": "image/capa/9.png",
        "legendas": ""
    },
    {
        "id": 10,
        "titulo": "Um lugar dentro do sistema",
        "contexto": "INGRESSO NA A.T.H.E.N.A.",
        "registro": "TATY / ARQUIVISTA",
        "resumo": "A menina dos cadernos atravessa uma nova porta.",
        "narracao": "Após anos de dedicação, Taty conquista seu lugar na A.T.H.E.N.A., tornando-se a mais jovem a ingressar naquele ambiente. A formação e a chegada à instituição marcam uma conquista. Agora, como arquivista, ela está mais perto dos registros que sustentam aquele mundo.",
        "final": false,
        "video": "video/cutscenes/10.mp4",
        "poster": "image/capa/10.png",
        "legendas": ""
    },
    {
        "id": 11,
        "titulo": "Os mesmos aplausos",
        "contexto": "A CERIMÔNIA DO CENTENÁRIO",
        "registro": "GALA / 2075",
        "resumo": "Uma homenagem que repete a injustiça.",
        "narracao": "Convidada para a celebração do centenário do Dia da Mulher, Taty ocupa seu lugar na plateia. No palco, os aplausos voltam a reconhecer um homem enquanto uma mulher permanece à margem. Em meio à homenagem, a mesma injustiça se repete. Dessa vez, porém, alguém mais está assistindo.",
        "final": false,
        "video": "video/cutscenes/11.mp4",
        "poster": "image/capa/11.png",
        "legendas": ""
    },
    {
        "id": 12,
        "titulo": "A fundação é uma fraude",
        "contexto": "ANOMALIA ÉTICA DETECTADA",
        "registro": "CAM_04",
        "resumo": "A.T.H.E.N.A. também estava olhando.",
        "narracao": "A câmera registra a cerimônia até que a imagem começa a falhar. Interferências e alertas atravessam a transmissão: inconsistência detectada, padrão corrompido. A.T.H.E.N.A. reconhece a contradição entre a justiça que deveria proteger e a história que recebeu como verdade.",
        "final": false,
        "video": "video/cutscenes/12.mp4",
        "poster": "image/capa/12.png",
        "legendas": ""
    },
    {
        "id": 13,
        "titulo": "O silêncio da cidade",
        "contexto": "BLECAUTE GLOBAL",
        "registro": "SISTEMA EM COLAPSO",
        "resumo": "As luzes se apagam. As perguntas permanecem.",
        "narracao": "A cidade ainda brilha por um instante. Então, suas luzes se apagam e o paraíso tecnológico mergulha na escuridão. O colapso de A.T.H.E.N.A. interrompe a aparente normalidade e torna impossível continuar ignorando a falha que atravessa o sistema.",
        "final": false,
        "video": "video/cutscenes/13.mp4",
        "poster": "image/capa/13.png",
        "legendas": ""
    },
    {
        "id": 14,
        "titulo": "Dessa vez, não",
        "contexto": "EMERGÊNCIA NO NÚCLEO",
        "registro": "SETOR 109",
        "resumo": "Séculos de silêncio encontram uma resposta.",
        "narracao": "Sirenes tomam o laboratório. Enquanto o núcleo falha, o chefe tenta afastar Taty e reduzir sua presença à de uma simples arquivista. Ela encara a tentativa de impedi-la com a firmeza de quem reconhece aquela história: depois de séculos apagando as mulheres, dessa vez não.",
        "final": false,
        "video": "video/cutscenes/14.mp4",
        "poster": "image/capa/14.png",
        "legendas": ""
    },
    {
        "id": 15,
        "titulo": "Do outro lado do vidro",
        "contexto": "ACESSO AO LABORATÓRIO",
        "registro": "CONEXÃO COM O NÚCLEO",
        "resumo": "A resposta está dentro do sistema.",
        "narracao": "Taty força sua entrada e se isola na cápsula do laboratório. Do lado de fora, mãos batem no vidro em meio a gritos e desespero. Diante do núcleo, ela fala com A.T.H.E.N.A. e descobre que o Vírus da Censura corrompeu os registros. Recuperar a verdade exigirá entrar nos arquivos.",
        "final": false,
        "video": "video/cutscenes/15.mp4",
        "poster": "image/capa/15.png",
        "legendas": ""
    },
    {
        "id": 16,
        "titulo": "Prepare a imersão",
        "contexto": "INÍCIO DA MISSÃO",
        "registro": "INTERFACE NEURAL",
        "resumo": "Uma escolha feita de olhos abertos.",
        "narracao": "A.T.H.E.N.A. avisa que a carga emocional dos arquivos pode destruir sua rede neural. Taty escuta, mantém o olhar firme e conecta o headset, enquanto os gritos continuam do lado de fora. Ela conhece o risco e decide seguir. É aqui que começa a missão do jogador.",
        "final": false,
        "video": "video/cutscenes/16.mp4",
        "poster": "image/capa/16.png",
        "legendas": ""
    },
    {
        "id": 17,
        "titulo": "A guardiã aprisionada",
        "contexto": "DESFECHO / ENCONTRO",
        "registro": "NÚCLEO DIGITAL",
        "resumo": "Por trás do sistema, também havia uma prisioneira.",
        "narracao": "Depois da jornada pelos arquivos, Taty encontra a forma de A.T.H.E.N.A. aprisionada por correntes de corrupção. A guardiã também estava presa à violência contida nos dados. Diante dela, Taty compreende que recuperar a memória significa libertar tanto as histórias apagadas quanto a inteligência que as herdou.",
        "final": true,
        "video": "video/cutscenes/17.mp4",
        "poster": "image/capa/17.png",
        "legendas": ""
    },
    {
        "id": 18,
        "titulo": "Pode iniciar o download",
        "contexto": "DESFECHO / O SACRIFÍCIO",
        "registro": "RESTAURAÇÃO DOS ARQUIVOS",
        "resumo": "Todas as memórias convergem para uma escolha.",
        "narracao": "Taty autoriza o download. Lembranças atravessam a sequência: sua infância, sua mãe e as mulheres que lhe deram coragem. Ao abraçar A.T.H.E.N.A., uma explosão de luz e interferência envolve as duas. A visão de acolhimento junto à mãe e às cientistas cede lugar ao laboratório, onde seu corpo permanece desacordado.",
        "final": true,
        "video": "video/cutscenes/18.mp4",
        "poster": "image/capa/18.png",
        "legendas": ""
    },
    {
        "id": 19,
        "titulo": "O mundo parou para ver?",
        "contexto": "DESFECHO / A DESPEDIDA",
        "registro": "ÚLTIMA CONEXÃO",
        "resumo": "A verdade foi recuperada. A indiferença permanece.",
        "narracao": "De volta ao laboratório, Taty pergunta se o mundo lá fora parou para ver. A.T.H.E.N.A. responde que as pessoas continuaram suas vidas. Sem forças, Taty reconhece que ninguém transforma o mundo inteiro de uma vez. Sua despedida deixa uma ideia: talvez seja suficiente acender a faísca.",
        "final": true,
        "video": "video/cutscenes/19.mp4",
        "poster": "image/capa/19.png",
        "legendas": ""
    },
    {
        "id": 20,
        "titulo": "Memória é justiça",
        "contexto": "EPÍLOGO / A FAÍSCA",
        "registro": "O AMANHÃ",
        "resumo": "Basta um olhar para que a história continue.",
        "narracao": "Agora é A.T.H.E.N.A. quem conta a história. Diante das estátuas de Taty e das cientistas, uma menina para, observa e encontra inspiração. A indiferença não foi a última palavra: aquele olhar carrega uma possibilidade de futuro. Na tela escura, permanece a mensagem: memória é justiça.",
        "final": true,
        "video": "video/cutscenes/20.mp4",
        "poster": "image/capa/20.png",
        "legendas": ""
    }
];
  const memorias = todasMemorias.filter(memoria => MOSTRAR_FINAL || !memoria.final);

  function iniciar() {
    const raiz = document.querySelector('.memoria-page');
    if (!raiz || raiz.dataset.memoriaPageInicializado) return;
    raiz.dataset.memoriaPageInicializado = 'true';
    const pegar = nome => raiz.querySelector(`#memoria-page-${nome}`);
    const video = pegar('video');
    const trilho = pegar('trilho');
    if (!video || !trilho) return;
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
    const texto = (nome, valor) => { const el=pegar(nome); if(el) el.textContent=valor; };
    const aviso = mensagem => {
      if (pegar('vazio')) pegar('vazio').hidden = !mensagem;
      texto('aviso', mensagem);
    };
    let atual = 0;
    let timerAnimacao;
    const botoes = [];
    const anteriores = [pegar('anterior')].filter(Boolean);
    const proximos = [pegar('proximo')].filter(Boolean);

    // O JS substitui os quatro botões antigos pelos registros configurados acima.
    trilho.replaceChildren();
    memorias.forEach((memoria, indice) => {
      const botao = document.createElement('button');
      botao.type='button'; botao.className='memoria-page-capitulo';
      botao.dataset.memoriaPageIndex=String(indice);
      botao.setAttribute('aria-controls','memoria-page-visor');
      botao.setAttribute('aria-pressed','false');
      botao.setAttribute('aria-label', `${memoria.id}. ${memoria.titulo}${memoria.final ? ' — contém spoilers do final' : ''}`);
      const mini=document.createElement('span'); mini.className='memoria-page-miniatura'; mini.setAttribute('aria-hidden','true');
      const numero=document.createElement('span'); numero.className='memoria-page-miniatura-numero'; numero.textContent=String(memoria.id).padStart(2,'0'); mini.append(numero);
      if(memoria.poster) {
        const img=document.createElement('img'); img.className='memoria-page-miniatura-imagem'; img.alt=''; img.loading='lazy'; img.decoding='async';
        img.addEventListener('error',()=>img.remove(),{once:true}); img.src=caminho(memoria.poster); mini.prepend(img);
      }
      const corpo=document.createElement('span'); corpo.className='memoria-page-capitulo-texto';
      const titulo=document.createElement('strong'); titulo.textContent=memoria.titulo;
      const sub=document.createElement('small'); sub.textContent=memoria.final ? 'DESFECHO • SPOILER' : memoria.registro;
      corpo.append(titulo,sub); botao.append(mini,corpo); trilho.append(botao); botoes.push(botao);
      botao.addEventListener('click',()=>selecionar(indice));
      botao.addEventListener('keydown',evento=>{
        let destino;
        if(['ArrowDown','ArrowRight'].includes(evento.key)) destino=Math.min(indice+1,memorias.length-1);
        if(['ArrowUp','ArrowLeft'].includes(evento.key)) destino=Math.max(indice-1,0);
        if(evento.key==='Home') destino=0;
        if(evento.key==='End') destino=memorias.length-1;
        if(destino===undefined) return;
        evento.preventDefault(); botoes[destino].focus({preventScroll:true}); selecionar(destino);
      });
    });

    // A máscara envolve o trilho E as duas hastes perfuradas.
    const janela=document.createElement('div'); janela.className='memoria-page-rolo-janela';
    trilho.before(janela); janela.append(trilho);
    const rolo=janela.closest('.memoria-page-rolo');
    const total=rolo?.querySelector('.memoria-page-rolo-cabecalho span:last-child');
    if(total) total.textContent=String(memorias.length).padStart(2,'0');
    const ajuda=rolo?.querySelector('.memoria-page-rolo-ajuda');
    if(ajuda) ajuda.textContent=MOSTRAR_FINAL ? 'Registros 17–20 revelam o desfecho do jogo.' : 'Continue a história jogando. O desfecho está reservado ao jogo.';
    function seta(id, rotulo, simbolo) {
      const b=document.createElement('button'); b.type='button'; b.id=id;
      b.className='memoria-page-botao memoria-page-rolo-seta'; b.setAttribute('aria-label',rotulo);
      b.setAttribute('aria-controls','memoria-page-trilho'); b.textContent=simbolo; return b;
    }
    const acima=seta('memoria-page-rolo-anterior','Selecionar memória anterior','↑');
    const abaixo=seta('memoria-page-rolo-proximo','Selecionar próxima memória','↓');
    janela.before(acima); janela.after(abaixo); anteriores.push(acima); proximos.push(abaixo);
    anteriores.forEach(b=>b.addEventListener('click',()=>selecionar(atual-1)));
    proximos.forEach(b=>b.addEventListener('click',()=>selecionar(atual+1)));

    // Quatro marcas de enquadramento. Não capturam cliques nos controles do vídeo.
    const tela=video.closest('.memoria-page-tela') || video.parentElement;
    const moldura=document.createElement('div'); moldura.className='memoria-page-enquadramento'; moldura.setAttribute('aria-hidden','true');
    for(const posicao of ['superior-esquerdo','superior-direito','inferior-esquerdo','inferior-direito']) {
      const canto=document.createElement('span'); canto.className=`memoria-page-canto memoria-page-canto-${posicao}`; moldura.append(canto);
    }
    tela.append(moldura);

    function centralizar(suave=true) {
      const alvo=botoes[atual];
      const a=alvo.getBoundingClientRect(), t=trilho.getBoundingClientRect();
      trilho.scrollBy({top:a.top-t.top-(trilho.clientHeight-a.height)/2, left:0,
        behavior:suave && !reduzido.matches && !document.body.classList.contains('effects-off') ? 'smooth' : 'auto'});
    }
    function selecionar(indice, primeira=false) {
      if(indice<0 || indice>=memorias.length || (indice===atual && !primeira)) return;
      atual=indice;
      const memoria=memorias[atual];
      video.pause(); aviso('Carregando registro…');
      texto('cena-titulo',memoria.titulo); texto('contexto',memoria.contexto);
      texto('cena-resumo',memoria.resumo); texto('narracao-texto',memoria.narracao);
      const voz=raiz.querySelector('.memoria-page-narracao .memoria-page-etiqueta');
      if(voz) voz.textContent=memoria.id===20 ? 'A.T.H.E.N.A. / EPÍLOGO' : memoria.id>=17 ? 'TATY + A.T.H.E.N.A. / MEMÓRIA DO DESFECHO' : 'TATY LUTZ / REGISTRO DE MEMÓRIA';
      texto('registro',`REGISTRO ${String(memoria.id).padStart(2,'0')} / ${memoria.registro}`);
      texto('contador',`${String(atual+1).padStart(2,'0')} / ${String(memorias.length).padStart(2,'0')}`);
      anteriores.forEach(b=>b.disabled=atual===0); proximos.forEach(b=>b.disabled=atual===memorias.length-1);
      if(pegar('reiniciar')) pegar('reiniciar').disabled=true;
      botoes.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===atual)));
      video.setAttribute('aria-label',memoria.titulo);
      if(memoria.poster) video.poster=caminho(memoria.poster); else video.removeAttribute('poster');
      video.querySelectorAll('track').forEach(track=>track.remove());
      if(memoria.legendas) {
        const track=document.createElement('track'); track.kind='captions'; track.srclang='pt-BR'; track.label='Português';
        track.src=caminho(memoria.legendas); track.default=true; video.append(track);
      }
      video.src=caminho(memoria.video); video.load();
      const visor=pegar('visor');
      if(visor) {
        clearTimeout(timerAnimacao); visor.classList.remove('memoria-page-trocando');
        void visor.offsetWidth; visor.classList.add('memoria-page-trocando');
        timerAnimacao=setTimeout(()=>visor.classList.remove('memoria-page-trocando'),350);
      }
      centralizar(!primeira);
    }
    video.addEventListener('loadeddata',()=>{ aviso(''); if(pegar('reiniciar')) pegar('reiniciar').disabled=false; });
    video.addEventListener('playing',()=>aviso(''));
    video.addEventListener('error',()=>{ aviso('Vídeo indisponível. A narração continua disponível; selecione outro registro para seguir.'); if(pegar('reiniciar')) pegar('reiniciar').disabled=true; });
    pegar('reiniciar')?.addEventListener('click',()=>{
      if(video.readyState<2) return;
      video.currentTime=0;
      video.play().catch(()=>aviso('Use o botão de reprodução do vídeo para iniciar.'));
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden) video.pause();});
    window.addEventListener('resize',()=>centralizar(false));
    selecionar(0,true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar,{once:true});
  else iniciar();
})();
