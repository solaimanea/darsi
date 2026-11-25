/* Darsi — tirer vers le bas pour actualiser (Accueil, Famille, Quiz à distance).
   Une étoile à huit branches se dessine pendant le geste, le logo apparaît, puis l'étoile tourne pendant la mise à jour.
   Pas pendant un quiz, ni dans Découvrir / Qibla (gestes à eux), ni quand un champ est en cours de saisie. */
'use strict';
Object.assign(I18N.fr,{tr_tire:"Tire pour actualiser",tr_lache:"Relâche",tr_cours:"Actualisation…",tr_ok:"À jour",tr_non:"Pas de connexion"});
(function(){
  const SEUIL=108,MAXI=148;
  const z=document.createElement('div');z.id='tirer';z.setAttribute('role','status');
  z.innerHTML=`<div class="tr-rond"><svg viewBox="0 0 100 100" aria-hidden="true"><g class="tr-etoile"><rect x="20" y="20" width="60" height="60" pathLength="100"/><rect x="20" y="20" width="60" height="60" pathLength="100" transform="rotate(45 50 50)"/></g></svg>
    <img src="pwa/logo-darsi.png" alt=""></div><span class="tr-txt"></span>`;
  document.body.appendChild(z);
  const app=document.querySelector('.app'),txt=z.querySelector('.tr-txt');
  let y0=null,x0=0,d=0,tire=false,occupe=false,pret=false;
  const ecran=()=>(document.querySelector('.ecran.actif')||{id:''}).id.slice(2);
  const actions={
    accueil:async()=>{const s=navigator.serviceWorker&&await navigator.serviceWorker.getRegistration();if(s)await s.update();dessinerAccueil()},
    famille:async()=>{await glVoir()},
  };
  const permis=()=>{const e=ecran();if(occupe||!actions[e]||scrollY>2||document.querySelector('dialog[open],#tuto')||document.getElementById('intro'))return false;
    if(e==='famille'&&!(S.gl&&document.getElementById('gl-code-vu')))return false;
    const a=document.activeElement;return !(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))&&![...document.querySelectorAll('#e-famille.actif input')].some(i=>i.value)};
  function placer(v){d=v;z.style.setProperty('--d',v+'px');z.style.setProperty('--p',Math.min(1,v/SEUIL));
    app.style.transform=v?`translateY(${v}px)`:''}
  function rentrer(){z.classList.add('doux-retour');app.classList.add('doux-retour');placer(0);
    setTimeout(()=>{z.className='';app.classList.remove('doux-retour');txt.textContent=''},380)}
  addEventListener('touchstart',e=>{y0=null;if(e.touches.length===1&&permis()){y0=e.touches[0].clientY;x0=e.touches[0].clientX;tire=false;pret=false}},{passive:true});
  addEventListener('touchmove',e=>{
    if(y0===null)return;if(e.touches.length>1){if(tire)rentrer();y0=null;return}
    const dy=e.touches[0].clientY-y0,dx=e.touches[0].clientX-x0;
    if(!tire){if(dy<-6||Math.abs(dx)>Math.max(10,Math.abs(dy))){y0=null;return}if(dy<10)return;if(scrollY>2){y0=null;return}tire=true;z.classList.add('vu')}
    if(e.cancelable)e.preventDefault();
    const v=Math.max(0,Math.min(MAXI,(dy-10)*.55));placer(v);
    const p=v>=SEUIL;if(p!==pret){pret=p;z.classList.toggle('pret',p);if(p)vibrer(14)}
    txt.textContent=t(p?'tr_lache':'tr_tire');
  },{passive:false});
  async function lacher(annule){
    if(y0===null||!tire){y0=null;return}y0=null;tire=false;
    if(annule||!pret){rentrer();return}
    occupe=true;const nom=ecran();z.classList.add('doux-retour','tourne');app.classList.add('doux-retour');placer(SEUIL);txt.textContent=t('tr_cours');
    let ok=true,err=null;
    const limite=new Promise((_,r)=>setTimeout(()=>r(Object.assign(new Error('hors_ligne'),{code:'hors_ligne'})),8000));
    try{await Promise.all([Promise.race([actions[nom](),limite]),new Promise(r=>setTimeout(r,700))])}catch(e){ok=false;err=e}
    if(err&&err.code==='jeton'){S.gl=null;GL=null;FQ=null;sauver();if(famActive())glFormulaire('choix')}
    z.classList.remove('tourne');z.classList.add(ok?'fini':'rate');
    txt.textContent=ok?t('tr_ok'):err.code&&err.code!=='hors_ligne'&&I18N.fr['gl_e_'+err.code]?t('gl_e_'+err.code):t('tr_non');if(ok)vibrer([10,30,10]);
    setTimeout(()=>{rentrer();occupe=false},ok?450:1100);
  }
  addEventListener('touchend',()=>lacher(false));addEventListener('touchcancel',()=>lacher(true));
})();
