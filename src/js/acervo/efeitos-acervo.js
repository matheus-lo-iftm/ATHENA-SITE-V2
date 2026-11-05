(() => {
  "use strict";

  // ===== ARQUIVOS E VOLUMES =====
  const musica = new Audio("/src/audio/Half-Life-Music.m4a");
  const somHover = new Audio("/src/audio/hover-pointer.m4a");
  const somClique = new Audio("/src/audio/active-click.wav");

  musica.loop = true;
  musica.volume = 0.38;
  musica.preload = "none";

  somHover.volume = 0.12;
  somClique.volume = 0.18;

  // ===== VÍDEO DE BACKGROUND E FILTRO =====
  const backgroundVideo = document.getElementById("backgroundVideo");
  if (backgroundVideo) {
    // ⚠️ Confirme se o nome e extensão do arquivo são exatamente estes na sua pasta src/media/video/
    backgroundVideo.src = "/src/media/video/background.m4v"; 
    backgroundVideo.removeAttribute("hidden");
    backgroundVideo.play().catch(() => {});
  }

  const filterVideo = document.getElementById("filterVideo");
  if (filterVideo) {
    // ⚠️ Confirme se o arquivo VHS.mp4 existe na pasta src/media/video/
    filterVideo.src = "/src/media/video/VHS.mp4"; 
    filterVideo.removeAttribute("hidden");
    filterVideo.play().catch(() => {});
  }

  // ===== CONTROLES DA INTERFACE =====
  const checkboxMusica = document.querySelector(".background-sound-eff-button-container.musica .background-sound-eff-button-play-btn");
  const checkboxSons = document.querySelector(".background-sound-eff-button-container.efeitos .background-sound-eff-button-play-btn");
  const effectsButton = document.getElementById("effectsButton");

  // Força o estado inicial marcado no carregamento
  if (checkboxMusica) checkboxMusica.checked = true;
  if (checkboxSons) checkboxSons.checked = true;
  if (effectsButton) effectsButton.checked = true;

  const orbita = document.querySelector(".cursor-orbita");

  let siteAberto = true;
  let musicaAtivada = true;
  let sonsAtivados = true;
  let ultimoHover = 0;

  // ===== BOTÃO DE LIGAR/DESLIGAR EFEITOS (Auras/Sparkles) =====
  effectsButton?.addEventListener("change", () => {
    if (effectsButton.checked) {
      document.body.classList.remove("effects-off");
    } else {
      document.body.classList.add("effects-off");
    }
  });

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
      if (!siteAberto || !musicaAtivada || document.hidden) {
        musica.pause();
      }
    } catch {}

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

  const seletorHover = 'a[href], button, [data-som-hover]';

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse") return;
    if (!(event.target instanceof Element)) return;

    const elemento = event.target.closest(seletorHover);
    if (!elemento || elemento.matches(":disabled")) return;
    if (elemento.closest("[data-sem-som]")) return;

    if (
      event.relatedTarget instanceof Node &&
      elemento.contains(event.relatedTarget)
    ) return;

    const agora = performance.now();
    if (agora - ultimoHover < 100) return;

    ultimoHover = agora;
    tocarEfeito(somHover);
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("[data-sem-som], :disabled")) return;
    tocarEfeito(somClique);
  });

  // ===== AURAS DO MOUSE =====
  const elementosComAura = 'a[href], button, input, select, textarea, [data-aura]';
  const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");

  function efeitosPermitidos() {
    return (
      !movimentoReduzido.matches &&
      !document.body.classList.contains("effects-off")
    );
  }

  document.addEventListener("pointermove", (event) => {
    if (!orbita || event.pointerType !== "mouse" || !efeitosPermitidos()) return;

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
      Boolean(alvo && !alvo.matches(":disabled") && efeitosPermitidos())
    );
  });

  document.addEventListener("click", (event) => {
    if (event.detail === 0 || !efeitosPermitidos()) return;

    const aura = document.createElement("span");
    aura.className = "aura-clique";
    aura.setAttribute("aria-hidden", "true");
    aura.style.left = `${event.clientX}px`;
    aura.style.top = `${event.clientY}px`;

    document.body.appendChild(aura);
    window.setTimeout(() => aura.remove(), 650);
  });

  function esconderOrbita() {
    orbita?.classList.remove("is-visible", "is-hover");
  }

  document.documentElement.addEventListener("pointerleave", esconderOrbita);
  window.addEventListener("blur", esconderOrbita);

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