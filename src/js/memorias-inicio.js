/* Apenas index.html. A página memorias.html continua usando memorias.js. */
(() => {
'use strict';
const registros = [
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
  }
];
function iniciar() {
 const raiz = document.querySelector('#memorias');
 if (!raiz || raiz.dataset.carouselPronto) return;
 const trilho = raiz.querySelector('#memoria-page-trilho');
 const visor = raiz.querySelector('.memorias-main-card');
 if (!trilho || !visor) return;
 raiz.dataset.carouselPronto = 'true';
 const anterior = raiz.querySelector('#memoria-page-rolo-anterior');
 const proximo = raiz.querySelector('#memoria-page-rolo-proximo');
 const reduzido = matchMedia('(prefers-reduced-motion: reduce)');
 const caminho = valor => new URL('src/media/' + valor, document.baseURI).href;
 let atual = -1;
 const botoes = registros.map((registro, indice) => {
   const botao = document.createElement('button');
   botao.type = 'button'; botao.className = 'memoria-page-capitulo';
   botao.setAttribute('aria-controls', 'inicio-memoria-visor');
   botao.setAttribute('aria-label', `${registro.id}. ${registro.titulo}`);
   const mini = document.createElement('span'); mini.className = 'memoria-page-miniatura';
   const img = document.createElement('img'); img.src = caminho(registro.poster);
   img.alt = ''; img.loading = 'lazy'; img.className = 'memoria-page-miniatura-imagem';
   const numero = document.createElement('span'); numero.className = 'memoria-page-miniatura-numero';
   numero.textContent = String(registro.id).padStart(2, '0');
   mini.append(img, numero); botao.append(mini);
   botao.addEventListener('click', () => selecionar(indice));
   botao.addEventListener('keydown', e => {
     let alvo;
     if(e.key === 'ArrowRight') alvo = Math.min(indice+1, registros.length-1);
     if(e.key === 'ArrowLeft') alvo = Math.max(indice-1, 0);
     if(e.key === 'Home') alvo = 0;
     if(e.key === 'End') alvo = registros.length-1;
     if(alvo === undefined) return;
     e.preventDefault(); selecionar(alvo); botoes[alvo].focus({preventScroll:true});
   });
   return botao;
 });
 trilho.replaceChildren(...botoes);
 const total = raiz.querySelector('.memoria-page-rolo-cabecalho span:last-child');
 if(total) total.textContent = String(registros.length).padStart(2,'0');
 const ajuda = raiz.querySelector('.memoria-page-rolo-ajuda');
 if(ajuda) { ajuda.textContent = 'Selecione uma memória para visualizar.'; ajuda.setAttribute('aria-live','polite'); }
 function centralizar(suave) {
   if(atual < 0) return;
   const b = botoes[atual].getBoundingClientRect(), t = trilho.getBoundingClientRect();
   trilho.scrollBy({left:b.left-t.left-(trilho.clientWidth-b.width)/2, top:0,
     behavior:suave && !reduzido.matches && !document.body.classList.contains('effects-off') ? 'smooth' : 'auto'});
 }
 function selecionar(indice, suave=true) {
   if(indice < 0 || indice >= registros.length) return;
   atual = indice; const r = registros[indice];
   visor.style.backgroundImage = `linear-gradient(90deg,rgba(0,8,16,.86),rgba(0,8,16,.22)),url("${caminho(r.poster)}")`;
   raiz.querySelector('.memorias-badge').textContent = r.contexto + ' / ' + r.registro;
   raiz.querySelector('.memorias-main-title').textContent = r.titulo;
   raiz.querySelector('.memorias-main-desc').textContent = r.resumo;
   botoes.forEach((b,i) => b.setAttribute('aria-pressed',String(i === atual)));
   if(anterior) anterior.disabled = atual === 0;
   if(proximo) proximo.disabled = atual === registros.length-1;
   if(ajuda) ajuda.textContent = `${String(atual+1).padStart(2,'0')} / ${registros.length} — ${r.titulo}`;
   centralizar(suave);
 }
 if(anterior) { anterior.textContent='‹'; anterior.addEventListener('click',()=>selecionar(atual-1)); }
 if(proximo) { proximo.textContent='›'; proximo.addEventListener('click',()=>selecionar(atual+1)); }
 const atalhos=raiz.querySelectorAll('.memorias-small-card');
 atalhos.forEach((el,i)=>{
   el.tabIndex=0; el.setAttribute('role','button');
   el.setAttribute('aria-controls','inicio-memoria-visor');
   el.addEventListener('click',()=>selecionar(i===0 ? 5 : 15));
   el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
 });
 window.addEventListener('resize',()=>centralizar(false));
 selecionar(12,false);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',iniciar,{once:true}); else iniciar();
})();
