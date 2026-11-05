/* VLibras 7: mantém o acionador próprio no fluxo do menu. */
(() => {
 'use strict';
 const botao = document.getElementById('menu-vlibras');
 const status = document.getElementById('menu-vlibras-status');
 if (!botao) return;
 let nativo = null;
 function conectar() {
   // API pública documentada: botão dentro da shadow root do VLibras 7.
   const candidato = window.VLibrasWidget?.initBtn;
   if (!candidato || typeof candidato.click !== 'function') return false;
   nativo = candidato;
   const host = nativo.getRootNode().host;
   if (host) host.style.setProperty('display','none','important');
   nativo.style.setProperty('display','none','important');
   nativo.setAttribute('aria-hidden','true');
   nativo.setAttribute('tabindex','-1');
   botao.disabled=false; botao.textContent='Abrir tradutor de Libras';
   status.textContent='VLibras • Português para Libras';
   return true;
 }
 botao.addEventListener('click',()=>{
   if(nativo) nativo.click();
 });
 let tentativas=0;
 const timer=setInterval(()=>{
   if(conectar()) {clearInterval(timer); return;}
   if(++tentativas >= 120) {
     clearInterval(timer);
     botao.disabled=true; botao.textContent='VLibras indisponível';
     status.textContent='Confira a conexão e recarregue a página.';
   }
 },250);
 // O script oficial atual inicializa automaticamente. Não instanciar duas vezes.
 if(!document.querySelector('script[src*="vlibras-plugin.js"]')) {
   const script=document.createElement('script');
   script.src='https://vlibras.gov.br/app/vlibras-plugin.js'; script.async=true;
   script.onerror=()=>{clearInterval(timer);botao.textContent='VLibras indisponível';status.textContent='Não foi possível carregar o serviço. Confira a conexão.';};
   document.body.append(script);
 }
 conectar();
})();
