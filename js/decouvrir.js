/* Darsi — onglet « Découvrir » (fil de cartes à faire défiler, comme un réseau social, mais qui instruit)
   et écran « Mon chemin » (les leçons = les étapes d'un chemin vers le Paradis, d'après le hadith de Muslim 2699).
   Tout est tiré du contenu existant (leçons, questions, versets, invocations) : rien de nouveau à traduire ni à relire,
   sauf contenu/rappels.js. Chargé AVANT js/app.js (les fonctions d'app.js ne sont appelées qu'à l'usage). */
'use strict';
const OBJECTIF_JOUR=10;                 // cartes à « apprendre » par jour
const URL_APP='https://solaimanea.github.io/darsi/';
const MOTIF_FIL=['savoir','eclair','verset','vf','retenir','eclair','inv','vf','rappel'];

/* ---------- Compteur « choses apprises » ---------- */
function apprisDuJour(){const A=S.appris||{};return A.j===dateCle()?A.n:0}
function apprisTotal(){return (S.appris&&S.appris.total)||0}
function apprendre(){
  const A=S.appris=S.appris||{j:null,n:0,total:0};
  if(A.j!==dateCle()){A.j=dateCle();A.n=0}
  A.n++;A.total++;
  if(A.n===1){const b=activite();if(b)S.points+=b}   // la série de jours compte aussi le fil
  sauver();majTeteFil();
  if(A.n===OBJECTIF_JOUR){toast(t('objectifOk'));vibrer([30,40,60]);pluie()}
}

/* ---------- Erreurs à revoir (répétition espacée simple) ---------- */
// Une question ratée revient 2 fois au plus dans le fil, puis on passe à autre chose (2026-11-24)
const RETOURS_ERREUR=2;
function noterErreur(q,juste){
  if(!q||!q.uid)return;const E=S.erreurs=S.erreurs||{};
  if(juste)delete E[q.uid];else if(!E[q.uid]&&nbVues(q)<5)E[q.uid]={r:RETOURS_ERREUR};
}
function consommerErreur(uid){const E=S.erreurs||{},e=E[uid];if(!e)return;const r=(typeof e==='object'?e.r:RETOURS_ERREUR)-1;if(r<=0)delete E[uid];else E[uid]={r}}
// Nombre de fois qu'une question a été posée : on choisit toujours parmi les moins vues → pas de répétition avant d'avoir tout vu
function vue(q){if(!q||!q.uid)return;const V=S.vus=S.vus||{};V[q.uid]=(V[q.uid]||0)+1}
const nbVues=q=>((S.vus||{})[q.uid]||0);
function moinsVues(liste){return melanger(liste).sort((a,b)=>nbVues(a)-nbVues(b))}
function questionParUid(uid){const id=uid.split('#')[0];if(!LECONS.some(l=>l.id===id))return null;return questionsDe(id).find(q=>q.uid===uid)||null}
function aRevoir(){return Object.keys(S.erreurs||{}).map(questionParUid).filter(q=>q&&!q.m&&!FIL.vus.has(q.uid))}

/* ---------- Récompenses : points, niveaux, séries de bonnes réponses, perles rares, sons ---------- */
const GAIN_BONNE=10,GAIN_COMBO=5,GAIN_LECTURE=2,GAIN_PERLE=50,PERLE_CHANCE=.1;
let COMBO=0;
// Niveau n atteint à 50·n·(n−1) points : 100, 300, 600, 1000, 1500…
function niveauDe(p){let n=1;while(50*(n+1)*n<=p)n++;const a=50*n*(n-1),b=50*(n+1)*n;return {n,p:Math.round((p-a)/(b-a)*100),reste:b-p}}
function gagner(n,el){
  const avant=niveauDe(S.points).n;S.points+=n;sauver();
  if(el&&n>=5){const r=el.getBoundingClientRect(),f=document.createElement('div');f.className='gain-vol';f.textContent='+'+n;
    f.style.left=(r.left+r.width/2)+'px';f.style.top=(r.top+8)+'px';document.body.appendChild(f);setTimeout(()=>f.remove(),1100)}
  const apres=niveauDe(S.points).n;
  if(apres>avant){son('niveau');pluie();vibrer([40,60,40,60,80]);celebrerNiveau(apres)}
  majTeteFil();
}
function celebrerNiveau(n){const z=document.createElement('div');z.className='niveau-up';
  z.innerHTML=`<div>${ic('etoile8','lg')}<b>${esc(t('niveauAtteint',{n}))}</b><span>${esc(t('rappelPas'))}</span></div>`;
  z.onclick=()=>z.remove();document.body.appendChild(z);setTimeout(()=>z.classList.add('fin'),2600);setTimeout(()=>z.remove(),3200)}
function montrerCombo(carte){if(COMBO<2||!carte)return;const old=carte.querySelector('.combo');if(old)old.remove();
  carte.insertAdjacentHTML('afterbegin',`<div class="combo c${Math.min(COMBO,6)}">${ic('flamme','sm')} ${esc(t('combo',{n:COMBO}))}</div>`)}
// Petits sons synthétisés (aucun fichier) : la note monte avec la série
const SON={};
function son(type,n=1){
  if(S.son===false)return;
  try{const A=SON.ctx||(SON.ctx=new (window.AudioContext||window.webkitAudioContext)());if(A.state==='suspended')A.resume();const t0=A.currentTime;
    const note=(f,d0,d,vol=.11,forme='sine')=>{const o=A.createOscillator(),g=A.createGain();o.type=forme;o.frequency.value=f;
      g.gain.setValueAtTime(0,t0+d0);g.gain.linearRampToValueAtTime(vol,t0+d0+.012);g.gain.exponentialRampToValueAtTime(.0008,t0+d0+d);
      o.connect(g);g.connect(A.destination);o.start(t0+d0);o.stop(t0+d0+d+.05)};
    if(type==='bon'){const b=587*Math.pow(2,Math.min(n-1,8)/12);note(b,0,.16);note(b*1.5,.07,.32)}
    else if(type==='faux')note(185,0,.28,.09,'triangle');
    else [523,659,784,1047,1319].slice(0,type==='perle'?4:5).forEach((f,i)=>note(f,i*.085,.4,.1));
  }catch(e){}
}

/* ---------- Rappels (hadiths et versets sur le savoir) ---------- */
function phVerset(cle){const v=QURAN[cle.slice(2)];return v?(S.langue==='tr'?v.tl.tr:v.tl.en):''}
const phHTML=ph=>ph&&S.langue!=='ar'?`<p class="ph fc-ph" dir="ltr">${esc(ph)}</p>`:'';
function sensRappel(r){return (RAPPELS_SENS[S.langue]||{})[r.id]||(S.langue==='ar'?'':RAPPELS_SENS.en[r.id])}
function rappelHTML(r,compact=false){
  if(r.v){const v=QURAN[r.v.slice(2)];if(!v)return '';
    return `<p class="ar rap-ar" lang="ar" dir="rtl">${esc(v.ar)}</p>${phHTML(phVerset(r.v))}${S.langue!=='ar'?`<p class="rap-sens">${esc(v.tr[S.langue]||v.tr.en)}</p>`:''}
      <p class="rap-ref">${esc(refCourte(r.v))}</p>${compact?'':`<p class="credit">${esc(t('tradCoran',{t:TRADUCTEURS_CORAN[S.langue]||TRADUCTEURS_CORAN.en}))}</p>`}`}
  const s=sensRappel(r);
  return `<p class="ar rap-ar" lang="ar" dir="rtl">${esc(r.ar)}</p>${phHTML(r.ph)}${s?`<p class="rap-sens">« ${esc(s)} »</p>`:''}
    <p class="rap-ref">${esc(refCourte(r.src))}</p>${compact||!s?'':`<p class="credit">${esc(t('sensEquipe'))}</p>`}`;
}
function rappel(id){return RAPPELS.find(r=>r.id===id)}

/* ---------- Partage : transmettre un bien, c'est en avoir la récompense ---------- */
let TOAST=null;
function toast(msg){let z=$('toast');if(!z){z=document.createElement('div');z.id='toast';document.body.appendChild(z)}
  z.textContent=msg;z.classList.add('vu');clearTimeout(TOAST);TOAST=setTimeout(()=>z.classList.remove('vu'),3800)}

/* ---------- Fil : fabrication des cartes ---------- */
let FIL={n:0,vus:new Set(),cartes:{},obs:null,vue:null,scroll:0};
let INV_RETOUR=null;
const hasard=a=>a[Math.random()*a.length|0];
function versetsLecons(){
  if(FIL.versets)return FIL.versets;const k=new Set();
  LECONS.forEach(l=>{const L=lecon(l.id);(L.sources||[]).forEach(s=>s.startsWith('q:')&&k.add(s));L.quiz.forEach(q=>(q.s||[]).forEach(s=>s.startsWith('q:')&&k.add(s)))});
  return FIL.versets=[...k].filter(x=>QURAN[x.slice(2)]);
}
// Tire un élément pas encore montré dans cette session (sinon accepte une répétition)
function neuf(cle,tirer){for(let i=0;i<12;i++){const x=tirer();if(x!==undefined&&!FIL.vus.has(cle(x))){FIL.vus.add(cle(x));return x}}return tirer()}
function fabriquerCarte(){
  const n=FIL.n++;let type=MOTIF_FIL[n%MOTIF_FIL.length];
  const rev=aRevoir();if(n%4===3&&rev.length)type='revoir';
  if((type==='savoir'||type==='rappel')&&n>2&&Math.random()<PERLE_CHANCE)type='perle';
  // un thème au hasard (tous à égalité), puis une leçon de ce thème : le fil parle de toute la religion
  const cat=hasard(Object.keys(CATS));
  let id=n===0?(prochaineLecon()||hasard(parTheme(cat)).id):hasard(parTheme(cat)).id;
  if(type==='eclair'||type==='vf'){const pool=parTheme(cat).flatMap(l=>questionsDe(l.id)).filter(x=>!x.m&&!FIL.vus.has(x.uid));
    if(pool.length){const q=moinsVues(pool)[0];id=q.uid.split('#')[0]}}
  const L=lecon(id),m=LECONS.find(l=>l.id===id);
  const C={type,id,cat:m.cat};
  if(type==='savoir'){const p=neuf(x=>id+'§'+x,()=>hasard(L.texte.map((_,i)=>i)));C.texte=L.texte[p];C.titre=L.titre}
  else if(type==='retenir'){C.texte=L.retenir;C.titre=L.titre}
  else if(type==='eclair'||type==='vf'){const q=moinsVues(questionsDe(id).filter(x=>!x.m&&!FIL.vus.has(x.uid)))[0]||hasard(questionsDe(id).filter(x=>!x.m));FIL.vus.add(q.uid);C.q=q;
    if(type==='vf')C.prop=Math.random()<.5?q.b:hasard([0,1,2,3].filter(k=>k!==q.b))}
  else if(type==='revoir'){C.q=hasard(rev);FIL.vus.add(C.q.uid);consommerErreur(C.q.uid);C.id=C.q.uid.split('#')[0];C.cat=C.q.cat}
  else if(type==='perle'){C.r=hasard(RAPPELS)}
  else if(type==='verset'){C.v=neuf(x=>x,()=>hasard(versetsLecons()))}
  else if(type==='inv'){C.d=neuf(x=>x.id,()=>hasard(listeInv()))}
  else if(type==='rappel'){C.r=RAPPELS[(n/MOTIF_FIL.length|0)%RAPPELS.length]}
  return C;
}
const ICONE_K={perle:'etoile8',savoir:'ampoule',retenir:'cle',eclair:'chrono',vf:'cible',revoir:'pousse',verset:'livre',inv:'doua',rappel:'chemin'};
function carteHTML(C,k){
  const tete=`<div class="fc-tete"><span class="fc-tag">${ic(ICONE_K[C.type],'sm')} ${t('k_'+C.type)}</span>${C.cat&&!['verset','inv','rappel','perle'].includes(C.type)?`<span class="fc-cat">${ic(CATS[C.cat],'sm')} ${nomCat(C.cat)}</span>`:''}${C.q?boutonSignaler([C.q.uid]):''}@@P@@</div>`;
  let corps='',pied='',txt='';
  if(C.type==='savoir'||C.type==='retenir'){
    corps=`<p class="fc-titre">${esc(C.titre)}</p><p class="fc-texte ${C.type==='retenir'?'gros':''}">${esc(C.texte)}</p>`;txt=C.texte;
    pied=`<button class="fc-lien" onclick="ouvrirLecon('${C.id}',null,'retourFil()')">${t('voirLecon')} ${ic('droite','sm')}</button>`;
  }else if(C.type==='eclair'||C.type==='revoir'){
    const ordre=melanger([0,1,2,3]);
    corps=`<p class="fc-q">${esc(C.q.q)}</p><div class="fc-choix">${ordre.map(o=>`<button class="choix" data-o="${o}" onclick="repondreFil(${k},${o},this)"><span></span></button>`).join('')}</div><div class="fc-explic" id="fx-${k}"></div>`;
  }else if(C.type==='vf'){
    corps=`<p class="fc-q">${esc(C.q.q)}</p><div class="vf-prop"><span>${t('propose')}</span><b></b></div>
      <div class="vf-boutons" dir="ltr"><button class="choix vf-b" data-v="f" onclick="repondreVF(${k},false,this)">${ic('croix')} ${t('faux')}</button><button class="choix vf-b" data-v="v" onclick="repondreVF(${k},true,this)">${ic('check')} ${t('vrai')}</button></div><div class="fc-explic" id="fx-${k}"></div>`;
  }else if(C.type==='verset'){const v=QURAN[C.v.slice(2)];
    corps=`<p class="ar fc-ar" lang="ar" dir="rtl">${esc(v.ar)}</p>${phHTML(phVerset(C.v))}${S.langue!=='ar'?`<p class="fc-texte">${esc(v.tr[S.langue]||v.tr.en)}</p>`:''}<p class="rap-ref">${esc(refCourte(C.v))}</p>`;
    txt=v.ar+(S.langue!=='ar'?'\n('+phVerset(C.v)+')':'')+'\n\n'+(S.langue!=='ar'?(v.tr[S.langue]||v.tr.en)+'\n':'')+refCourte(C.v);
  }else if(C.type==='inv'){const d=C.d,ar=d.v?QURAN[d.v.slice(2)].ar:d.ar,ph=d.v?phVerset(d.v):d.ph;
    corps=`<p class="fc-titre">${esc(d.titre)}</p><p class="ar fc-ar" lang="ar" dir="rtl">${esc(ar).replace(/\n/g,'<br>')}</p>${phHTML(ph)}${S.langue!=='ar'?`<p class="fc-texte">${esc(sensDe(d))}</p>`:''}`;
    txt=d.titre+'\n\n'+ar+(S.langue!=='ar'&&ph?'\n('+ph+')':'')+(S.langue!=='ar'?'\n\n'+sensDe(d):'');
    pied=`<button class="fc-lien" onclick="INV_RETOUR='retourFil()';ouvrirInvocation('${d.id}')">${t('ouvrirInv')} ${ic('droite','sm')}</button>`;
  }else if(C.type==='perle'){
    corps=`<div class="perle-eclat">${ic('etoile8','lg')}</div><div class="fc-rappel">${rappelHTML(C.r)}</div><p class="perle-gain">+${GAIN_PERLE} ${t('points')}</p>`;
    txt=(C.r.v?QURAN[C.r.v.slice(2)].ar:C.r.ar)+'\n\n'+(C.r.v?(QURAN[C.r.v.slice(2)].tr[S.langue]||''):sensRappel(C.r))+'\n'+refCourte(C.r.v||C.r.src);
  }else if(C.type==='rappel'){
    corps=`<div class="fc-rappel">${rappelHTML(C.r)}</div><p class="fc-pas">${t('rappelPas')}</p><p class="fc-total">${ic('ampoule','sm')} <b>${apprisTotal()}</b> ${t('appris',{n:apprisTotal()})}</p>`;
    txt=(C.r.v?QURAN[C.r.v.slice(2)].ar:C.r.ar)+'\n\n'+(C.r.v?(QURAN[C.r.v.slice(2)].tr[S.langue]||''):sensRappel(C.r))+'\n'+refCourte(C.r.v||C.r.src);
  }
  if(txt)FIL.cartes[k].partage=partieCarte(C,txt);
  const share=txt?`<button class="fc-partage" onclick="partager(FIL.cartes[${k}].partage)" aria-label="${t('partager')}">${ic('partage')}</button>`:'';
  return `<article class="fcarte k-${C.type}" data-k="${k}"><div class="fc-in">${tete.replace('@@P@@',()=>share)}${corps}<div class="fc-pied">${pied}</div></div>
    ${k===0?`<div class="fc-glisser">${ic('droite','sm')} ${t('glisser')}</div>`:''}</article>`;
}
function ajouterCartes(nb){
  const z=$('fil');if(!z)return;
  for(let i=0;i<nb;i++){const k=FIL.n,C=fabriquerCarte();FIL.cartes[k]=C;
    z.insertAdjacentHTML('beforeend',carteHTML(C,k));const el=z.lastElementChild;
    // textes des choix posés en textContent (pas d'HTML dans les réponses)
    if(C.q){el.querySelectorAll('.fc-choix .choix').forEach(b=>b.firstChild.textContent=C.q.c[+b.dataset.o]);
      if(C.type==='vf'){const pr=el.querySelector('.vf-prop');pr.querySelector('b').textContent=C.q.c[C.prop];
}}
    FIL.obs.observe(el);}
}
// Retour au fil : on retrouve la carte où l'on était (sinon on ouvre un fil neuf)
function retourFil(){
  if(!$('fil')||!FIL.n){ouvrirDecouvrir();return}
  const y=FIL.scroll||0;aller('decouvrir');majTeteFil();
  const f=$('fil');f.style.scrollSnapType='none';f.scrollTop=y;requestAnimationFrame(()=>{f.scrollTop=y;f.style.scrollSnapType=''});
}
function ouvrirDecouvrir(){
  FIL={n:0,vus:new Set(),cartes:{},obs:null,vue:null,scroll:0};
  $('e-decouvrir').innerHTML=`<div class="fil-tete" id="fil-tete"></div><div class="fil" id="fil"></div>`;
  let minut={};
  FIL.obs=new IntersectionObserver(es=>es.forEach(e=>{const k=+e.target.dataset.k,C=FIL.cartes[k];
    if(e.isIntersecting){
      if(k>=FIL.n-3)ajouterCartes(5);
      // carte à lire : comptée « apprise » après 2,5 s à l'écran
      if(!C.compte&&!C.q)minut[k]=setTimeout(()=>{if(C.compte)return;C.compte=true;
        if(C.type==='perle'){S.perles=(S.perles||0)+1;son('perle');pluie();toast(t('perleTrouvee',{n:S.perles}));gagner(GAIN_PERLE,e.target.querySelector('.perle-gain'))}
        else gagner(GAIN_LECTURE);apprendre()},C.type==='perle'?1200:2500);
    }else clearTimeout(minut[k]);
  }),{threshold:.6});
  aller('decouvrir');ajouterCartes(6);majTeteFil();
}
function majTeteFil(){const z=$('fil-tete');if(!z)return;const n=apprisDuJour(),N=niveauDe(S.points);
  z.innerHTML=`<span class="ft-niv">${t('niveauCourt',{n:N.n})}</span><span class="ft-barre"><i style="width:${N.p}%"></i></span>
    <span class="ft-jour ${n>=OBJECTIF_JOUR?'ok':''}">${ic('ampoule','sm')} ${n}/${OBJECTIF_JOUR}</span>
    <button class="ft-son" onclick="S.son=S.son===false;sauver();majTeteFil()" aria-label="${t('son')}">${ic(S.son===false?'muet':'son','sm')}</button>`}
function finirCarteQuestion(k,juste,bonne){
  const C=FIL.cartes[k],q=C.q;if(C.compte)return;C.compte=true;
  noter('moi',q.cat,juste);if(juste||C.type!=='revoir')noterErreur(q,juste);vue(q);   // une question déjà « à revoir » n'est pas remise dans la file
  const carte=document.querySelector(`.fcarte[data-k="${k}"] .fc-in`);
  if(juste){COMBO++;const g=GAIN_BONNE+GAIN_COMBO*Math.min(COMBO-1,5);son('bon',COMBO);gagner(g,bonne||carte);montrerCombo(carte);
    if(COMBO===5||COMBO===10||COMBO%15===0){pluie();vibrer([30,40,60])}else vibrer([20,30,20])}
  else{COMBO=0;son('faux');vibrer(40)}
  apprendre();
  const src=(q.s||[]).map(refCourte).filter(Boolean)[0];
  $('fx-'+k).innerHTML=`<b class="${juste?'vert':'rouge'}">${ic(juste?'ok':'ko','sm')} ${juste?t('bienVu'):t('pasToutFil')}</b>
    ${juste?'':`<p class="fc-bonne">${esc(t('bonneRep',{r:q.c[q.b]}))}</p>`}<p>${esc(q.e||'')}</p>${src?`<p class="rap-ref">${esc(src)}</p>`:''}
    <button class="fc-lien" onclick="ouvrirLecon('${C.id}',null,'retourFil()')">${t('voirLecon')} ${ic('droite','sm')}</button>`;
  C.partage={titre:q.q,tr:q.c[q.b]+(q.e?'\n'+q.e:''),ref:src||'',brut:q.q+'\n→ '+q.c[q.b]+(q.e?'\n\n'+q.e:'')};
  const pied=document.querySelector(`.fcarte[data-k="${k}"] .fc-tete`);
  if(pied&&!pied.querySelector('.fc-partage'))pied.insertAdjacentHTML('beforeend',`<button class="fc-partage" onclick="partager(FIL.cartes[${k}].partage)" aria-label="${t('partager')}">${ic('partage')}</button>`);
}
function repondreFil(k,o,b){const C=FIL.cartes[k];if(C.compte)return;const juste=o===C.q.b;
  b.parentNode.querySelectorAll('.choix').forEach(x=>{x.disabled=true;if(+x.dataset.o===C.q.b)x.classList.add('bon')});
  if(!juste)b.classList.add('faux');finirCarteQuestion(k,juste,b)}
function repondreVF(k,dit,b){const C=FIL.cartes[k];if(C.compte)return;const vrai=C.prop===C.q.b,juste=dit===vrai;
  b.parentNode.querySelectorAll('.choix').forEach(x=>x.disabled=true);b.classList.add(juste?'bon':'faux');finirCarteQuestion(k,juste,b)}

/* ---------- Mon chemin : une étape par leçon, au bout le jardin ---------- */
function ouvrirChemin(){
  const N=ORDRE.length,proch=prochaineLecon(),pas=74,H=N*pas+40,W=340;
  const P=ORDRE.map((id,i)=>({id,x:W/2+105*Math.sin(i*.85),y:40+i*pas}));
  const seg=(a,b)=>`C${a.x},${(a.y+b.y)/2} ${b.x},${(a.y+b.y)/2} ${b.x},${b.y}`;
  let tout=`M${P[0].x},${P[0].y}`,fait_=`M${P[0].x},${P[0].y}`;const nf=ORDRE.filter(fait).length;
  for(let i=1;i<N;i++){tout+=seg(P[i-1],P[i]);if(fait(ORDRE[i])&&fait(ORDRE[i-1]))fait_+=seg(P[i-1],P[i])}
  const noeuds=P.map((p,i)=>{const f=fait(p.id),c=p.id===proch,o=f||c||DEMO,m=LECONS.find(l=>l.id===p.id);
    return `<button class="ch-etape ${f?'faite':''} ${c?'courante':''}" style="left:${p.x/W*100}%;top:${p.y}px" ${o?`onclick="ouvrirLecon('${p.id}',null,'ouvrirChemin()')"`:'disabled'} aria-label="${esc(lecon(p.id).titre)}">
      ${f?ic(CATS[m.cat],'sm'):c?ic('droite','sm'):i+1}${c?`<span class="ch-bulle">${esc(lecon(p.id).titre)}</span>`:''}</button>`}).join('');
  $('e-parcours').innerHTML=boutonRetour("aller('accueil')")+`<div class="surtitre">${ic('chemin','sm')} ${t('cheminTitre')}</div>
    <h2>${t('cheminEtape',{n:nf,t:N})}</h2>
    <div class="carte rappel-chemin">${rappelHTML(rappel('chemin'),true)}</div>
    <div class="chemin" style="height:${H+150}px"><svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" preserveAspectRatio="none">
      <path d="${tout}" class="ch-tout"/><path d="${fait_}" class="ch-fait"/></svg>${noeuds}
      <div class="jardin" style="top:${H}px">${ic('palmier','lg')}${ic('palmier','lg')}${ic('palmier','lg')}<p>${t('cheminBout')}</p></div></div>
    <h3 class="titre-groupe">${t('parcours')}</h3>
    <div class="grille-ic themes">${Object.keys(CATS).map((k,n)=>{const arr=parTheme(k),f=arr.filter(l=>fait(l.id)).length,p=Math.round(f/arr.length*100);
      return `<button class="tuile-ic t-${['or','vert','azur','rose','violet'][n%5]}" onclick="ouvrirTheme('${k}')"><span class="rond-ic">${ic(CATS[k],'lg')}</span>
        <span class="lib">${nomCat(k)}</span><span class="petit">${t('nLecons',{f,t:arr.length})}</span><span class="barre"><i style="width:${p}%"></i></span></button>`}).join('')}</div>`;
  aller('parcours');
  const cur=document.querySelector('.ch-etape.courante');if(cur)setTimeout(()=>cur.scrollIntoView({block:'center',behavior:'smooth'}),350);
}

/* ---------- Fin de quiz : le chemin avance, les erreurs reviendront ---------- */
function blocFinQuiz(nbErr){
  let h='';
  if(CTX.mode==='lecon'){const N=ORDRE.length,nf=ORDRE.filter(fait).length,proch=prochaineLecon();
    h+=`<div class="carte fin-chemin" onclick="ouvrirChemin()"><div class="surtitre">${ic('chemin','sm')} ${t('cheminAvance')}</div>
      <b>${t('cheminEtape',{n:nf,t:N})}</b><div class="barre"><i style="width:${nf/N*100}%"></i></div>
      <div class="rappel-mini">${rappelHTML(rappel('chemin'),true)}</div>
      ${proch?`<p class="petit">${ic('droite','sm')} ${esc(t('demain',{t:lecon(proch).titre}))}</p>`:''}</div>`}
  if(nbErr)h+=`<p class="petit centre">${ic('pousse','sm')} ${t('erreursReviennent',{n:nbErr})}</p>`;
  h+=`<button class="btn secondaire" onclick="retourFil()">${ic('decouvrir','sm')} ${t('continuerFil')}</button>`;
  return h;
}
