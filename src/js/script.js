const cursor = document.querySelector('.cursor-customizado');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

'use strict';

// EDITE AQUI. Vídeos opcionais ficam vazios até você fornecer os arquivos.
const CONFIG = {
  introVideo: 'src/media/video/background/entrance.mp4',
  backgroundVideo: 'src/media/video/background/background.mp4',
  filterVideo: 'src/media/video/background/VHS.mp4',
  fadeDuration: 1400,  // Altere também os 1.4s de transição no CSS.
  filterOpacity: 0.25
};

const $ = (id) => document.getElementById(id);
const intro = $('intro');
const introVideo = $('introVideo');
const site = $('site');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let state = 'ready';
let soundEnabled = true;
let effectsEnabled = !motionQuery.matches;
let revealTimer;

introVideo.src = CONFIG.introVideo;
document.documentElement.style.setProperty('--filter-opacity', CONFIG.filterOpacity);

// Nenhuma requisição para arquivos opcionais que ainda não existem.
for (const [id, path] of [['backgroundVideo', CONFIG.backgroundVideo], ['filterVideo', CONFIG.filterVideo]]) {
  if (!path) continue;
  const video = $(id);
  video.src = path;
  video.hidden = false;
  video.addEventListener('error', () => { video.hidden = true; });
}

function updateAmbientVideos() {
  for (const id of ['backgroundVideo', 'filterVideo']) {
    const video = $(id);
    const shouldPlay = state === 'site' && effectsEnabled && !document.hidden && !video.hidden;
    if (shouldPlay) video.play().catch(() => { /* O fundo CSS continua disponível. */ });
    else video.pause();
  }
}

function updateEffects() {
  document.body.classList.toggle('effects-off', !effectsEnabled);

  const controle = $('effectsButton');

  if (controle) {
    controle.checked = effectsEnabled;
  }

  updateAmbientVideos();
}
async function connect() {
  if (state !== 'ready' || !$('powerSwitch').checked) return;
  state = 'playing';
  $('connectScreen').hidden = true;
  $('playbackControls').hidden = false;
  $('introStatus').textContent = 'CARREGANDO TRANSMISSÃO…';
  intro.classList.add('is-playing');
  introVideo.muted = !soundEnabled;
  $('skipButton').focus();
  try {
    // Executado diretamente após o clique para permitir áudio no navegador.
    await introVideo.play();
  } catch (error) {
    if (state !== 'playing') return;
    if (error.name === 'AbortError') return;
    $('introStatus').textContent = 'Não foi possível reproduzir. Tente novamente ou pule a introdução.';
    $('pauseButton').textContent = 'TENTAR REPRODUZIR';
  }
}

function revealSite() {
  if (state === 'revealing' || state === 'site') return;
  state = 'revealing';
  sessionStorage.setItem('athena-intro-vista', 'sim');
  introVideo.pause();
  $('introStatus').textContent = '';
  $('playbackControls').hidden = true;
  site.classList.add('is-visible');
  intro.classList.add('is-leaving');
  // Aguarda o fade antes de liberar foco e rolagem no site.
  clearTimeout(revealTimer);
  revealTimer = window.setTimeout(() => {
    intro.hidden = true;
    site.inert = false;
    site.removeAttribute('aria-hidden');
    document.body.classList.remove('is-locked');
    state = 'site';
    $('main').focus({ preventScroll: true });
    updateAmbientVideos();
     window.AthenaFX?.iniciar();
  }, motionQuery.matches ? 0 : CONFIG.fadeDuration);
}

function replay() {
  if (state !== 'site') return;
  state = 'ready';
   window.AthenaFX?.parar();

  updateAmbientVideos();
  site.inert = true;
  site.setAttribute('aria-hidden', 'true');
  site.classList.remove('is-visible');
  document.body.classList.add('is-locked');
  intro.hidden = false;
  intro.classList.remove('is-leaving', 'is-playing');
  introVideo.currentTime = 0;
  $('connectScreen').hidden = false;
  $('playbackControls').hidden = true;
  $('introStatus').textContent = '';
  $('pauseButton').textContent = 'PAUSAR';
  $('powerSwitch').checked = false;
  updatePower();
  $('powerSwitch').focus();
}

$('connectButton').addEventListener('click', connect);
$('skipButton').addEventListener('click', revealSite);
$('replayButton')?.addEventListener('click', replay);
introVideo.addEventListener('ended', revealSite);
introVideo.addEventListener('playing', () => {
  if (state !== 'playing') return;
  $('introStatus').textContent = '';
  $('pauseButton').textContent = 'PAUSAR';
});
introVideo.addEventListener('waiting', () => {
  if (state === 'playing') $('introStatus').textContent = 'CARREGANDO TRANSMISSÃO…';
});
introVideo.addEventListener('error', () => {
  if (state === 'playing') $('introStatus').textContent = 'Vídeo indisponível. Use PULAR INTRODUÇÃO para acessar o site.';
});
$('pauseButton').addEventListener('click', async () => {
  if (state !== 'playing') return;
  if (!introVideo.paused) {
    introVideo.pause();
    $('pauseButton').textContent = 'CONTINUAR';
  } else {
    try { await introVideo.play(); }
    catch { $('introStatus').textContent = 'Não foi possível reproduzir. Você pode pular a introdução.'; }
  }
});
$('soundButton').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  introVideo.muted = !soundEnabled;
  $('soundButton').textContent = `SOM DA INTRODUÇÃO: ${soundEnabled ? 'ATIVADO' : 'DESATIVADO'}`;
  $('soundButton').setAttribute('aria-pressed', String(soundEnabled));
});
$('effectsButton')?.addEventListener('change', (event) => {
  effectsEnabled = event.target.checked;
  updateEffects();
});
motionQuery.addEventListener('change', () => { effectsEnabled = !motionQuery.matches; updateEffects(); });
document.addEventListener('visibilitychange', () => {
  updateAmbientVideos();
  if (document.hidden && state === 'playing' && !introVideo.paused) {
    introVideo.pause(); $('pauseButton').textContent = 'CONTINUAR';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state === 'playing') revealSite();
});

function updatePower() {
  const powered = $('powerSwitch').checked;
  $('connectButton').disabled = !powered;
  $('powerHint').textContent = powered
    ? 'Terminal ligado. Pressione conectar.'
    : 'Ligue o interruptor para conectar.';
}
$('powerSwitch').addEventListener('change', updatePower);
$('powerSwitch').checked = false;
updatePower();
updateEffects();


// A intro só aparece no primeiro acesso à Home nesta aba.
const nomePagina = window.location.pathname.split('/').pop();
const paginaInicial = nomePagina === '' || nomePagina === 'index.html';

if (
  !paginaInicial ||
  sessionStorage.getItem('athena-intro-vista') === 'sim'
) {
  clearTimeout(revealTimer);

  introVideo.pause();
  intro.hidden = true;

  site.classList.add('is-visible');
  site.inert = false;
  site.removeAttribute('aria-hidden');

  document.body.classList.remove('is-locked');

  state = 'site';
  updateAmbientVideos();

  // Aguarda os outros scripts para iniciar a música, se disponível.
  if (document.readyState === 'complete') {
    window.AthenaFX?.iniciar();
  } else {
    window.addEventListener('load', () => {
      if (state === 'site') window.AthenaFX?.iniciar();
    }, { once: true });
  }
}


// Projeção de um anel inclinado.
(() => {
  const palco = document.querySelector('.core-scene');

  // Nas páginas sem órbitas, encerra somente este bloco.
  if (!palco) return;

  const orbes = [...palco.querySelectorAll('.orb-node')];
  const raios = palco.querySelectorAll('line');
  const legenda = document.querySelector('#orb-readout');

  let angulo = 0;
  let anterior = 0;
  let quadro = 0;
  let visivel = true;

  function desenhar() {
    orbes.forEach((orbe, i) => {
      const fase = angulo + i * 2 * Math.PI / orbes.length;
      const profundidade = Math.sin(fase);
      const x = 50 + 40 * Math.cos(fase);
      const y = 50 + 31 * profundidade - 6 * Math.cos(fase);

      orbe.style.left = x + '%';
      orbe.style.top = y + '%';
      orbe.style.setProperty('--escala', 1 + profundidade * 0.12);
      orbe.style.zIndex = profundidade < 0 ? 2 : 5;

      if (raios[i]) {
        raios[i].setAttribute('x1', x);
        raios[i].setAttribute('y1', y);
      }
    });
  }

  function animar(agora) {
    if (anterior) {
      angulo += Math.min(agora - anterior, 64) * 0.00007;
    }

    anterior = agora;
    desenhar();
    quadro = requestAnimationFrame(animar);
  }

  function atualizar() {
    cancelAnimationFrame(quadro);
    anterior = 0;

    const selecionada = palco.querySelector(
      '.orb-node:focus, .orb-node:hover'
    );

    if (legenda) {
      legenda.textContent =
        selecionada?.dataset.description ||
        'Selecione uma órbita para explorar.';
    }

    if (
      visivel &&
      !document.hidden &&
      !selecionada &&
      !document.body.matches('.effects-off, .is-locked')
    ) {
      quadro = requestAnimationFrame(animar);
    }
  }

  for (const orbe of orbes) {
    for (const evento of ['pointerenter', 'pointerleave', 'focus', 'blur']) {
      orbe.addEventListener(evento, () => queueMicrotask(atualizar));
    }
  }

  new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    atualizar();
  }).observe(palco);

  new MutationObserver(atualizar).observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });

  document.addEventListener('visibilitychange', atualizar);

  desenhar();
})();