/* Darsi — web app (PWA), 2026-11-20.
   - Enregistre le service worker (sw.js) : l'appli s'ouvre et fonctionne SANS réseau après la première visite.
   - Propose l'installation : sur iPhone (Safari) un petit mode d'emploi « Partager → Sur l'écran d'accueil »,
     sur Android/ordinateur (Chrome) un bouton « Installer ».
   Rien de tout ça dans l'appli Android (Capacitor), qui est déjà installée. */
'use strict';
(function(){
  const natif=window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform();
  if(natif)return;
  const securise=location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1';
  if('serviceWorker' in navigator&&securise)
    window.addEventListener('load',()=>{
      const t0=Date.now(),deja=!!navigator.serviceWorker.controller;let fait=false;
      // nouvelle version prête juste après l'ouverture : on recharge une fois (jamais en plein usage)
      navigator.serviceWorker.addEventListener('controllerchange',()=>{if(deja&&!fait&&Date.now()-t0<8000){fait=true;location.reload()}});
      navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).catch(()=>{})});

  const TXT={
    fr:{ios:"Installe Darsi sur ton iPhone : touche {p} Partager, puis « Sur l'écran d'accueil ».",and:"Installe Darsi sur ton téléphone : elle marchera même sans réseau.",ok:"Installer",non:"Plus tard"},
    en:{ios:"Install Darsi on your iPhone: tap {p} Share, then “Add to Home Screen”.",and:"Install Darsi on your phone: it works even offline.",ok:"Install",non:"Later"},
    ar:{ios:"ثبّت دَرْسي على هاتفك: المس {p} مشاركة، ثم «إضافة إلى الشاشة الرئيسية».",and:"ثبّت دَرْسي على هاتفك: يعمل حتى دون إنترنت.",ok:"تثبيت",non:"لاحقًا"},
    de:{ios:"Installiere Darsi auf deinem iPhone: Tippe auf {p} Teilen, dann „Zum Home-Bildschirm“.",and:"Installiere Darsi auf deinem Handy: Sie funktioniert auch offline.",ok:"Installieren",non:"Später"},
    nl:{ios:"Installeer Darsi op je iPhone: tik op {p} Deel en dan op „Zet op beginscherm”.",and:"Installeer Darsi op je telefoon: werkt ook zonder internet.",ok:"Installeren",non:"Later"},
    es:{ios:"Instala Darsi en tu iPhone: toca {p} Compartir y luego «Añadir a pantalla de inicio».",and:"Instala Darsi en tu teléfono: funciona incluso sin conexión.",ok:"Instalar",non:"Más tarde"},
    it:{ios:"Installa Darsi sul tuo iPhone: tocca {p} Condividi, poi «Aggiungi alla schermata Home».",and:"Installa Darsi sul telefono: funziona anche senza rete.",ok:"Installa",non:"Più tardi"},
    tr:{ios:"Darsi'yi iPhone'una yükle: {p} Paylaş'a, sonra « Ana Ekrana Ekle »ye dokun.",and:"Darsi'yi telefonuna yükle: internetsiz de çalışır.",ok:"Yükle",non:"Sonra"},
    id:{ios:"Pasang Darsi di iPhone-mu: ketuk {p} Bagikan, lalu « Tambah ke Layar Utama ».",and:"Pasang Darsi di ponselmu: tetap berfungsi tanpa internet.",ok:"Pasang",non:"Nanti"}};
  const tx=()=>TXT[(window.S&&S.langue)||'fr']||TXT.fr;
  const PARTAGE='<svg class="ic sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3.5M8 7.5l4-4 4 4"/><path d="M7 11H5.5v9.5h13V11H17"/></svg>';
  const installee=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const CLE='darsi_pwa_banniere';
  const masqueeRecemment=()=>{try{return Date.now()-(+localStorage.getItem(CLE)||0)<14*864e5}catch(e){return false}};
  function banniere(html,action){
    if(installee()||masqueeRecemment()||document.getElementById('pwa-banniere'))return;
    if(!(window.S&&(S.demarre||S.prenom))){setTimeout(()=>banniere(html,action),15000);return}   // pas sur l'écran de bienvenue : on attend « Commencer »
    const b=document.createElement('div');b.id='pwa-banniere';b.className='pwa-banniere';
    b.innerHTML=`<p>${html}</p><div class="pwa-btns">${action?`<button class="btn mini" id="pwa-ok">${tx().ok}</button>`:''}<button class="btn mini sec" id="pwa-non">${tx().non}</button></div>`;
    document.body.appendChild(b);requestAnimationFrame(()=>b.classList.add('vu'));
    const fermer=()=>{try{localStorage.setItem(CLE,String(Date.now()))}catch(e){}b.classList.remove('vu');setTimeout(()=>b.remove(),300)};
    b.querySelector('#pwa-non').onclick=fermer;
    if(action)b.querySelector('#pwa-ok').onclick=()=>{action();fermer()};
  }
  // iPhone / iPad (Safari) : pas d'installation automatique possible, on explique le geste
  const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(ios&&!installee())setTimeout(()=>banniere(tx().ios.replace('{p}',PARTAGE)),9000);
  // Android / ordinateur (Chrome, Edge…) : vrai bouton « Installer »
  let invite=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();invite=e;
    setTimeout(()=>banniere(tx().and,()=>{invite.prompt();invite=null}),9000)});
})();
