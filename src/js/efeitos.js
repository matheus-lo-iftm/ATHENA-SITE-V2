(() => {
  "use strict";

  // ===== ARQUIVOS E VOLUMES =====
  const musica = new Audio("../src/audio/Half-Life-Music.m4a");
  const somHover = new Audio("../src/audio/hover-pointer.m4a");
  const somClique = new Audio("../src/audio/active-click.wav");

  musica.loop = true;
  musica.volume = 0.38;
  musica.preload = "none";

  somHover.volume = 0.12;
  somClique.volume = 0.18;
const checkboxMusica = document.querySelector(".background-sound-eff-button-container.musica .background-sound-eff-button-play-btn");
const checkboxSons = document.querySelector(".background-sound-eff-button-container.efeitos .background-sound-eff-button-play-btn");

// Força o estado inicial marcado no carregamento do script
if (checkboxMusica) checkboxMusica.checked = true;
if (checkboxSons) checkboxSons.checked = true;
  const orbita = document.querySelector(".cursor-orbita");

  let siteAberto = false;
  let musicaAtivada = true;
  let sonsAtivados = true;
  let ultimoHover = 0;

  // ===== MÚSICA =====
  function atualizarBotaoMusica() {
  const tocando = !musica.paused;
  if (checkboxMusica) {
    checkboxMusica.checked = tocando;
  }
}

  async function tocarMusica() {
    if (!siteAberto || !musicaAtivada || document.hidden) return;

    try {
      await musica.play();

      // A pessoa pode ter saído enquanto o arquivo carregava.
      if (!siteAberto || !musicaAtivada || document.hidden) {
        musica.pause();
      }
    } catch {
      // Se houver bloqueio ou arquivo ausente, o site continua funcionando.
    }

    atualizarBotaoMusica();
  }

  musica.addEventListener("play", atualizarBotaoMusica);
  musica.addEventListener("pause", atualizarBotaoMusica);
  musica.addEventListener("error", atualizarBotaoMusica);

 checkboxMusica?.addEventListener("change", () => {
  if (checkboxMusica.checked) {
    musicaAtivada = true;
    tocarMusica();
  } else {
    musicaAtivada = false;
    musica.pause();
  }
});

// ===== SONS DA INTERFACE =====
function tocarEfeito(audio) {
  if (!siteAberto || !sonsAtivados || document.hidden) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
}

checkboxSons?.addEventListener("change", () => {
  sonsAtivados = checkboxSons.checked;

  if (!sonsAtivados) {
    somHover.pause();
    somClique.pause();
  }
});

  // Links, botões e elementos marcados manualmente.
  const seletorHover = 'a[href], button, [data-som-hover]';

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse") return;
    if (!(event.target instanceof Element)) return;

    const elemento = event.target.closest(seletorHover);

    if (!elemento || elemento.matches(":disabled")) return;
    if (elemento.closest("[data-sem-som]")) return;

    // Evita repetir ao passar entre o ícone e o texto do mesmo botão.
    if (
      event.relatedTarget instanceof Node &&
      elemento.contains(event.relatedTarget)
    ) return;

    // Evita uma sequência excessiva ao atravessar o menu.
    const agora = performance.now();
    if (agora - ultimoHover < 100) return;

    ultimoHover = agora;
    tocarEfeito(somHover);
  });

  // Clique em qualquer parte do site, como você pediu.
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("[data-sem-som], :disabled")) return;

    tocarEfeito(somClique);
  });

  // ===== AURAS DO MOUSE =====

// Adicione data-aura em qualquer outro elemento que deva ativar o brilho.
const elementosComAura =
  'a[href], button, input, select, textarea, [data-aura]';

const movimentoReduzido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function efeitosPermitidos() {
  return (
    !movimentoReduzido.matches &&
    !document.body.classList.contains("effects-off")
  );
}

document.addEventListener("pointermove", (event) => {
  if (!orbita || event.pointerType !== "mouse") return;

  orbita.style.left = `${event.clientX}px`;
  orbita.style.top = `${event.clientY}px`;
  orbita.classList.add("is-visible");
});

document.addEventListener("pointerover", (event) => {
  if (!orbita || event.pointerType !== "mouse") return;
  if (!(event.target instanceof Element)) return;

  const alvo = event.target.closest(elementosComAura);

  orbita.classList.toggle(
    "is-hover",
    Boolean(alvo && !alvo.matches(":disabled"))
  );
});

// Aura no ponto exato do clique.
document.addEventListener("click", (event) => {
  // Ignora cliques gerados pelo teclado.
  if (event.detail === 0 || !efeitosPermitidos()) return;

  const aura = document.createElement("span");

  aura.className = "aura-clique";
  aura.setAttribute("aria-hidden", "true");
  aura.style.left = `${event.clientX}px`;
  aura.style.top = `${event.clientY}px`;

  document.body.appendChild(aura);

  // Remove o elemento depois que o efeito termina.
  window.setTimeout(() => aura.remove(), 650);
});

function esconderOrbita() {
  orbita?.classList.remove("is-visible", "is-hover");
}

document.documentElement.addEventListener(
  "pointerleave",
  esconderOrbita
);

window.addEventListener("blur", esconderOrbita);

  // Pausa ao trocar de aba.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      musica.pause();
      somHover.pause();
      somClique.pause();
      esconderOrbita();
    } else {
      tocarMusica();
    }
  });

  // ===== CONEXÃO COM SUA INTRODUÇÃO =====
  window.AthenaFX = {
    iniciar() {
      siteAberto = true;
      tocarMusica();
    },

    parar() {
      siteAberto = false;
      musica.pause();
      somHover.pause();
      somClique.pause();
      esconderOrbita();
    }
  };
})();