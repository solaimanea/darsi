/* Nour — logique de l'application. Chargé après icones.js, i18n.js, structure.js, sources.js et contenu/*.js */
'use strict';
const DEMO=location.search.includes('demo');            // ?demo = tout débloqué
const DEMO_RAMADAN=location.search.includes('ramadan'); // ?ramadan = simule le jour 5 du Ramadan
const MAX_MEMBRES=12,POINTS_BONNE=10,BONUS_SERIE=5,NB_FINAL=40,SECONDES_FINAL=20,NB_REVISION=5,NB_BILAN_THEME=3,NB_DEFI=5,NB_SEMAINE=14,NB_HEBDO=10;
const COULEURS=['#e8be6e','#4cc7a0','#7d9bff','#e48aa8','#b896ff','#f2a066','#6fd0e0','#d9d4c7'];

/* ---------- Sauvegarde ---------- */
const CLE='nour-v3';
let S={prenom:'',demarre:false,langue:null,lecons:{},ram:{},points:0,serie:0,dernier:null,revision:null,stats:{},groupe:null,datesLecons:{},hebdo:null};
try{const x=JSON.parse(localStorage.getItem(CLE));if(x)S=Object.assign(S,x)}catch(e){}
function sauver(){try{localStorage.setItem(CLE,JSON.stringify(S))}catch(e){}}
if(!S.langue){const n=(navigator.language||'fr').slice(0,2);S.langue=LANGUES.some(l=>l.code===n)?n:'fr'}

/* ---------- Langue ---------- */
function t(cle,v={}){
  v={app:NOM_APP,...v};
  let s=(I18N[S.langue]||{})[cle];if(s===undefined)s=I18N.fr[cle];
  if(Array.isArray(s))s=s[v.n===1?0:1];
  return String(s).replace(/\{(\w+)\}/g,(m,k)=>v[k]!==undefined?v[k]:m);
}
function nomCat(k){return (I18N[S.langue].cats||I18N.fr.cats)[k]}
function niveau(p){const n=t('niv');const L=(I18N[S.langue].niv||I18N.fr.niv);return p===null?L[0]:p<40?L[1]:p<70?L[2]:p<90?L[3]:L[4]}
function appliquerLangue(){
  const L=LANGUES.find(l=>l.code===S.langue);
  document.documentElement.lang=S.langue;document.documentElement.dir=L&&L.rtl?'rtl':'ltr';
}
function contenu(){return CONTENU[S.langue]||{}}
// Leçon dans la langue choisie, sinon en français (avec drapeau « repli »)
function lecon(id){
  const c=contenu().lecons&&contenu().lecons[id];
  if(c)return {...c,repli:false};
  return {...CONTENU.fr.lecons[id],repli:S.langue!=='fr'};
}
// Questions expert (réponses multiples) : celles de la langue si la leçon est traduite, sinon le français
function expertsDe(id){const tr=contenu().lecons&&contenu().lecons[id];return ((tr?contenu().experts:CONTENU.fr.experts)||{})[id]||[]}
function questionsDe(id){const meta=LECONS.find(l=>l.id===id);
  return lecon(id).quiz.map((q,i)=>({...q,cat:meta.cat,uid:id+'#'+i})).concat(expertsDe(id).map((q,i)=>({...q,m:true,cat:meta.cat,uid:id+'#x'+i})))}
function toutesQuestions(){return LECONS.flatMap(l=>questionsDe(l.id)).concat(S.groupe?S.groupe.questions:[])}

/* ---------- Outils ---------- */
const $=id=>document.getElementById(id);
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function melanger(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function aujourdhui(){const d=new Date();d.setHours(0,0,0,0);return d}
function dateCle(d=aujourdhui()){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function dateLoc(iso){return new Intl.DateTimeFormat(S.langue+'-u-ca-gregory-nu-latn',{day:'numeric',month:'long',year:'numeric'}).format(new Date(iso+'T00:00:00'))}
// Date du jour dans les deux calendriers (grégorien et hégirien Umm al-Qura, calculé)
function dateGreg(){const s=new Intl.DateTimeFormat(S.langue+'-u-ca-gregory-nu-latn',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());return s.charAt(0).toUpperCase()+s.slice(1)}
function dateHijri(){try{return hijriTexte(new Date())}catch(e){return ''}}   // 2026-11-20 : noms des mois à nous (Android)
function fait(id){return S.lecons[id]!==undefined}
function parTheme(cat){return LECONS.filter(l=>l.cat===cat)}
function ouverte(id){const m=LECONS.find(l=>l.id===id),arr=parTheme(m.cat),i=arr.indexOf(m);return DEMO||i===0||fait(arr[i-1].id)}
function vibrer(p){try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}}
function pluie(){for(let i=0;i<26;i++){const s=document.createElement('div');s.className='etincelle';
  s.innerHTML=`<svg viewBox="0 0 24 24" width="14" height="14">${ETOILE4}</svg>`;
  s.style.left=Math.random()*100+'vw';s.style.animationDelay=Math.random()*.7+'s';s.style.opacity=.5+Math.random()*.5;
  document.body.appendChild(s);setTimeout(()=>s.remove(),2900)}}
function pliable(html,long){ // bloc repliable pour les textes longs
  if(!long)return html;
  return `<div class="pliable">${html}</div><button class="lien" onclick="plier(this)">${t('lireSuite')}</button>`;
}
function plier(b){const p=b.previousElementSibling;p.classList.toggle('ouvert');b.textContent=p.classList.contains('ouvert')?t('reduire'):t('lireSuite')}

/* ---------- Sources ---------- */
function refsHadith(refs){return refs.map(([c,n])=>RECUEILS[c]+' '+t('num',{n})).join(' · ')}
function rendreSource(cle){
  const [type,a,b]=cle.split(':');
  if(type==='q'){
    const v=QURAN[a+':'+b];if(!v)return'';
    const nom=S.langue==='ar'?v.nom.ar:v.nom.lat;
    const tr=v.tr[S.langue]||v.tr.en, tl=S.langue==='tr'?v.tl.tr:v.tl.en;
    const corps=`<p class="ar" lang="ar" dir="rtl">${esc(v.ar)}</p>`+
      (S.langue!=='ar'?`<p class="ph" dir="ltr">${esc(tl)}</p>`:'')+`<p class="tr">${esc(tr)}</p>`;
    return `<div class="source"><div class="src-tete">${ic('livre','sm')} ${t('coran')} · ${esc(t('refVerset',{nom,s:v.s,v:v.v}))}</div>
      ${pliable(corps,(v.ar.length+tr.length)>420)}<div class="credit">${esc(t('tradCoran',{t:TRADUCTEURS_CORAN[S.langue]||TRADUCTEURS_CORAN.en}))}</div></div>`;
  }
  if(type==='h'){
    const h=HADITHS[a];if(!h)return'';
    const coll=h.refs[0][0];
    const resume=(contenu().resumes||{})[a];
    let lg=S.langue==='ar'?null:(h.txt[S.langue]?S.langue:'en');
    const credit=lg===null?'':lg==='en'&&S.langue!=='en'?t('tradAnglaise',{t:TRAD_HADITHS.en[coll]}):
      t('tradHadith',{t:(TRAD_HADITHS[lg]&&TRAD_HADITHS[lg][coll])||t('tradInconnue')});
    const texte=lg?(h.txt[lg]||''):'';   // traduction absente : on garde l'arabe et la référence
    const arabe=`<p class="ar petit-ar" lang="ar" dir="rtl">${esc(h.txt.ar||'')}</p>`;
    let corps;
    if(S.langue==='ar') corps=pliable(arabe,(h.txt.ar||'').length>380);
    else if(resume) corps=`<p class="tr"><b>${t('resume')} :</b> ${esc(resume)}</p>
      <details><summary>${t('lireHadith')}</summary><p class="tr">${esc(texte)}</p><div class="credit">${esc(credit)}</div>${arabe}</details>`;
    else corps=pliable(`<p class="tr">${esc(texte)}</p>`,texte.length>420)+`<div class="credit">${esc(credit)}</div>
      <details><summary>${t('texteArabe')}</summary>${arabe}</details>`;
    return `<div class="source h"><div class="src-tete">${ic('parchemin','sm')} ${t('hadith')} · ${esc(refsHadith(h.refs))}</div>${corps}</div>`;
  }
  if(type==='f'){
    const f=(contenu().faits||{})[a]||CONTENU.fr.faits[a];if(!f)return'';
    return `<div class="source f"><div class="src-tete">${ic('repere','sm')} ${esc(f.titre)}</div><p class="tr">${esc(f.texte)}</p></div>`;
  }
  return '';
}
function rendreSources(liste){return liste&&liste.length?'<div class="sources">'+liste.map(rendreSource).join('')+'</div>':''}

/* ---------- Ramadan (événement annuel) ---------- */
function ramadanCourant(){
  const tj=aujourdhui();
  for(const R of RAMADANS){
    let j=Math.floor((tj-new Date(R.debut+'T00:00:00'))/864e5)+1;
    if(DEMO_RAMADAN&&R===RAMADANS[0])j=5;
    if(j<=40){const etat=j<1?(1-j>40?'loin':'bientot'):j<=30?'pendant':'fini';return{...R,jour:j,etat,reste:1-j}}
  }
  return null;
}
function ramDonnees(an){const D=S.ram[an]=S.ram[an]||{jours:{},final:null};D.semaines=D.semaines||{};return D}
function ramOuvert(R,n){return DEMO||(R.etat==='pendant'&&n<=R.jour)||R.etat==='fini'}

/* ---------- Navigation ---------- */
let RETOUR='accueil';
function aller(nom){
  clearInterval(T);
  if($('e-decouvrir').classList.contains('actif')&&$('fil'))FIL.scroll=$('fil').scrollTop;   // on retrouvera la même carte
  document.querySelectorAll('.ecran').forEach(e=>e.classList.remove('actif'));
  $('e-'+nom).classList.add('actif');scrollTo(0,0);majOnglets(nom);
  document.body.classList.toggle('ecran-qibla',nom==='qibla');document.body.classList.toggle('ecran-fil',nom==='decouvrir');document.body.classList.toggle('ecran-accueil',nom==='accueil');if(nom!=='qibla'&&typeof arreterBoussole==='function')arreterBoussole();
  if(nom==='accueil')dessinerAccueil();
}
function boutonRetour(action,cle='retour'){return `<button class="retour" onclick="${action}">${ic('gauche','sm')} ${t(cle)}</button>`}
function selecteurLangue(compact=false){
  if(compact)return `<label class="langue compacte">${ic('globe','sm')}<span>${S.langue.toUpperCase()}</span><select onchange="changerLangue(this.value)" aria-label="${t('langue')}">
    ${LANGUES.map(l=>`<option value="${l.code}"${l.code===S.langue?' selected':''}>${l.nom}</option>`).join('')}</select></label>`;
  return `<label class="langue">${ic('globe','sm')}<select onchange="changerLangue(this.value)" aria-label="${t('langue')}">
    ${LANGUES.map(l=>`<option value="${l.code}"${l.code===S.langue?' selected':''}>${l.nom}</option>`).join('')}</select></label>`;
}
function changerLangue(code){S.langue=code;FIL.n=0;$('e-decouvrir').innerHTML='';sauver();appliquerLangue();dessinerOnglets();
  if($('e-parametres').classList.contains('actif'))ouvrirParametres();else if(S.demarre||S.prenom)aller('accueil');else dessinerBienvenue()}

/* ---------- Bienvenue ---------- */
function dessinerBienvenue(){
  const saisi=$('prenom')?$('prenom').value:'';   // changer de langue ne doit pas effacer le prénom tapé
  $('e-bienvenue').innerHTML=`<div class="heros">${heros(104)}</div>   <!-- 2026-11-20 : plus petit, pour que toute la page tienne à l'écran -->
    <h1 class="logo-titre"><img src="pwa/logo-darsi.png" alt="${NOM_APP} — درسي" class="logo-darsi"></h1>   <!-- logo Grok, arabe corrigé (identite/) -->
    <p class="doux" style="text-align:center;margin-top:8px;line-height:1.6">${t('sousTitre')}</p>
    <div class="carte etapes">${[['livre','e1t','e1s'],['cible','e2t','e2s'],['famille','e3t','e3s'],['lanterne','e4t','e4s']]
      .map(x=>`<div class="etape"><div class="pastille">${ic(x[0])}</div><div><b>${t(x[1])}</b><span>${t(x[2])}</span></div></div>`).join('')}</div>
    <div class="langue-bienvenue">${selecteurLangue()}</div>   <!-- 2026-11-25 : la langue se choisit ici puis dans Paramètres, plus sur l'accueil -->
    <input id="prenom" placeholder="${t('prenom')}" maxlength="20" autocomplete="off" value="${esc(saisi)}">
    <button class="btn" onclick="commencer()">${t('commencer')}</button>`;
  $('prenom').addEventListener('keydown',e=>{if(e.key==='Enter')commencer()});
  aller('bienvenue');
}
function commencer(){S.prenom=$('prenom').value.trim();S.demarre=true;sauver();aller('accueil')}

/* ---------- Compte à rebours : un seul carré, la prochaine grande date (Ramadan, puis l'Aïd…). Les petites dates sont dans le bandeau. ---------- */
const MAJEURS=['ramadan','aidFitr','arafa','aidAdha','nouvelAn','achoura','dixNuits','dixDhulHijja'];
function aVenir(){const auj=aujourdhui(),vus=new Set();return evenements().filter(e=>e.d>auj&&!vus.has(e.f.id)&&vus.add(e.f.id))}
function joursAvant(e){return Math.round((e.d-aujourdhui())/864e5)}
function carteNiveau(){const N=niveauDe(S.points);
  return `<div class="carte niveau-carte" onclick="retourFil()"><div class="nv-rond"><b>${N.n}</b><span>${esc(t('niveauMot'))}</span></div>
    <div class="nv-texte"><div class="surtitre">${ic('etoile8','sm')} ${esc(t('monNiveau'))}</div><div class="barre"><i style="width:${N.p}%"></i></div>
    <p class="petit">${esc(t('avantNiveau',{n:N.reste,m:N.n+1}))}</p><b class="nv-go">${ic('decouvrir','sm')} ${t('continuerFil')}</b></div></div>`}
function blocDecompte(){
  const L=aVenir();if(!L.length)return '';
  const M=L.find(e=>MAJEURS.includes(e.f.id))||L[0],n=joursAvant(M),ram=M.f.id==='ramadan';
  if(n>30)return carteNiveau();   // 2026-11-24 : l'appli ne tourne plus autour du Ramadan (la date reste dans le bandeau et la tuile)
  return `<div class="carte decompte2" onclick="${ram?'ouvrirRamadan()':'ouvrirCalendrier()'}"><div class="illu">${moucharabieh(150)}</div>
      <div class="carre"><b>${n}</b><span>${t('uJours',{n})}</span></div>
      <div class="dc-texte"><div class="surtitre">${ic(M.f.ic,'sm')} ${t('decompteTitre')}</div><h2>${t('cal_'+M.f.id)}${ram?' '+hijriDe(M.d).year:''}</h2>
        <p class="petit">${esc(fmt(M.d,{weekday:'long',day:'numeric',month:'long'}))}<br>${esc(hijriTexte(M.d))}</p>
</div></div>
`;
}

/* ---------- Accueil ---------- */
function prochaineLecon(){return ORDRE.find(id=>!fait(id))||null}
function dessinerAccueil(){
  const R=ramadanCourant();
  let h=`<div class="marque"><h1><img src="pwa/logo-darsi.png" alt="${NOM_APP} — درسي" class="logo-darsi petit"></h1><span class="lunette">${illuLune(46)}</span></div>
    <div class="ligne-salam"><div class="salam">${esc(S.prenom?t('salam',{n:S.prenom}):t('salamSeul'))}</div>
      <div class="entete-boutons"><button class="rond" onclick="ouvrirParametres()" aria-label="${t('parametres')}">${ic('reglages')}</button></div></div>`+bandeau();
  if(R&&(R.etat==='pendant'||R.etat==='fini')){
    const D=ramDonnees(R.an),nbJ=Object.keys(D.jours).length;
    h+=`<div class="carte ramadan-grand"><div class="illu">${moucharabieh(150)}</div>
      <div class="surtitre">${ic('lanterne','sm')} ${t('defiRam',{an:R.an})}</div>
      <h2>${R.etat==='pendant'?t('ramJourDu',{n:Math.min(R.jour,30)}):t('ramTermine')}</h2>
      <p class="doux">${t('ramValides',{n:nbJ})}${D.final!==null?' · '+t('ramGQ',{s:D.final+'/'+NB_FINAL}):''}</p>
      <button class="btn" onclick="ouvrirRamadan()">${t('ouvrirDefi')} ${ic('droite','sm')}</button></div>`;
  }
  h+=blocDecompte();
  // Leçon du jour : carte courte avec un gros bouton
  const id=prochaineLecon();
  if(id){const m=LECONS.find(l=>l.id===id);
    h+=`<div class="carte jour-court" onclick="ouvrirLecon('${id}')"><div class="pastille grande">${ic(CATS[m.cat],'lg')}</div>
      <div class="milieu"><div class="surtitre">${t('leconDuJour')}</div><b>${esc(lecon(id).titre)}</b><div class="petit">${nomCat(m.cat)}</div></div>
      <span class="jouer">${ic('droite')}</span></div>`;
  }else h+=`<div class="carte jour-court"><div class="pastille grande">${ic('medaille','lg')}</div><div class="milieu"><div class="surtitre">${t('parcoursFini')}</div><b>${t('toutesFaites')}</b></div></div>`;
  // Grille d'icônes : tout est à un toucher
  const R2=ramadanCourant(),nbB=badges().filter(b=>b[2]).length,revOk=S.revision===dateCle(),semN=leconsSemaine().length;
  const T=[
    ['chemin','or',t('cheminTitre'),"ouvrirChemin()",Object.keys(S.lecons).length+'/'+LECONS.length],
    ['cible','vert',t('t_revision'),"lancerRevision()",revOk?'ok':''],
    ['calendrier','azur',t('t_semaine'),semN>=2?"ouvrirHebdo()":"",semN>=2?(S.hebdo===cleSemaine()?'ok':''):'verrou'],
    ['lanterne','rose',t('t_ramadan'),"ouvrirRamadan()",R2&&R2.etat==='pendant'?t('jourN',{n:Math.min(R2.jour,30)}):R2&&R2.reste>0?t('jMoins',{n:R2.reste}):''],
    ['graphe','violet',t('t_bilan'),"RETOUR='accueil';afficherBilan('moi')",''],
    ['medaille','orange',t('distinctions'),"ouvrirDistinctions()",nbB+'/6']];
  h+=`<div class="grille-ic">${T.map(([i2,c,lib,act,pastille])=>`<button class="tuile-ic t-${c} ${pastille==='verrou'?'verrou':''}" ${act?`onclick="${act}"`:'disabled'}>
      <span class="rond-ic">${ic(pastille==='verrou'?'cadenas':i2,'lg')}</span><span class="lib">${lib}</span>
      ${pastille&&pastille!=='verrou'?`<span class="pastille-num ${pastille==='ok'?'ok':''}">${pastille==='ok'?ic('check','sm'):esc(pastille)}</span>`:''}</button>`).join('')}</div>
    <div class="mini-stats"><span>${ic('etoile','sm')} <b>${S.points}</b> ${t('points')}</span><span>${ic('flamme','sm')} <b>${S.serie}</b> ${t('serie',{n:S.serie})}</span><span>${ic('ampoule','sm')} <b>${apprisTotal()}</b> ${t('appris',{n:apprisTotal()})}</span></div>`;
  $('e-accueil').innerHTML=h;
}

function badges(){
  const nbF=Object.keys(S.lecons).length,parfaits=LECONS.filter(l=>S.lecons[l.id]===questionsDe(l.id).length).length;
  const themeFini=Object.keys(CATS).some(k=>parTheme(k).every(l=>fait(l.id))),ramFini=Object.values(S.ram).some(d=>d.final!==null);
  return [['pousse','b1',nbF>=1],['flamme','b2',S.serie>=7],['etoile','b3',parfaits>=1],['livre','b4',themeFini],['lune','b5',S.serie>=30],['trophee','b6',ramFini]];
}
function ouvrirParcours(){ouvrirChemin();return;   // 2026-11-23 : remplacé par « Mon chemin » (js/decouvrir.js)
  $('e-parcours').innerHTML=boutonRetour("aller('accueil')")+`<div class="surtitre">${ic('livre','sm')} ${t('parcours')}</div><h2>${t('monParcours')}</h2>
    <div class="grille-ic themes">${Object.keys(CATS).map((k,n)=>{const arr=parTheme(k),f=arr.filter(l=>fait(l.id)).length,p=Math.round(f/arr.length*100);
      return `<button class="tuile-ic t-${['or','vert','azur','rose','violet'][n%5]}" onclick="ouvrirTheme('${k}')"><span class="rond-ic">${ic(CATS[k],'lg')}</span>
        <span class="lib">${nomCat(k)}</span><span class="petit">${t('nLecons',{f,t:arr.length})}</span><span class="barre"><i style="width:${p}%"></i></span></button>`}).join('')}</div>`;
  aller('parcours');
}
function ouvrirDistinctions(){
  $('e-distinctions').innerHTML=boutonRetour("aller('accueil')")+`<div class="surtitre">${ic('medaille','sm')} ${t('distinctions')}</div><h2>${t('distinctions')}</h2>
    <div class="carte"><div class="badges">${badges().map(x=>`<div class="badge ${x[2]?'':'non'}"><div class="medaillon">${ic(x[0],'lg')}</div>${t(x[1])}</div>`).join('')}</div></div>`;
  aller('distinctions');
}

/* ---------- Thème ---------- */
function ouvrirTheme(k){
  const arr=parTheme(k),f=arr.filter(l=>fait(l.id)).length;
  $('e-theme').innerHTML=boutonRetour("ouvrirParcours()")+`<div class="surtitre">${ic(CATS[k],'sm')} ${t('parcours')}</div><h2>${nomCat(k)}</h2>
    <p class="doux">${t('themeInfo',{f,t:arr.length})}</p>`+
    arr.map((l,i)=>{const fa=fait(l.id),o=ouverte(l.id);
      return `<button class="ligne-lecon ${fa?'fait':''} ${o?'':'verrou'}" ${o?`onclick="ouvrirLecon('${l.id}')"`:''}>
        <span class="num">${fa?ic('check','sm'):o?i+1:ic('cadenas','sm')}</span><span style="flex:1">${esc(lecon(l.id).titre)}${fa?`<div class="petit">${t('score',{s:S.lecons[l.id],t:questionsDe(l.id).length})}</div>`:''}</span>${o?ic('droite','sm'):''}</button>`}).join('');
  aller('theme');
}

/* ---------- Défi Ramadan ---------- */
function ouvrirRamadan(){
  const R=ramadanCourant();if(!R){aller('accueil');return}
  const D=ramDonnees(R.an);
  $('e-ramadan').innerHTML=boutonRetour("aller('accueil')")+`<div class="heros" style="padding-top:0">${heros(130)}</div>
    <div class="surtitre" style="justify-content:center">${ic('lanterne','sm')} ${t('defiRam',{an:R.an})}</div>
    <h1 style="text-align:center;margin-top:6px">${R.etat==='pendant'?t('jourSur',{n:Math.min(R.jour,30)}):R.etat==='fini'?t('ramFini'):t('jMoins',{n:R.reste})}</h1>
    <p class="doux" style="text-align:center;margin-top:8px;line-height:1.6">${R.etat==='pendant'?t('ramPendant',{q:NB_FINAL}):R.etat==='fini'?t('ramApres'):t('ramAvant',{d:dateLoc(R.debut)})}</p>
    <div class="carte"><div class="grille" id="grille"></div>
    <div class="legende"><span><svg viewBox="0 0 24 24" width="10" height="10" style="color:#a94e2d">${ETOILE4}</svg> ${t('nuitsImpaires')}</span></div></div>`;
  const g=$('grille');
  for(let n=1;n<=30;n++){
    const b=document.createElement('button'),ok=ramOuvert(R,n),f=n===30?D.final!==null:D.jours[n]!==undefined;
    b.className='case'+(n===30?' final':'')+(f?' ok':ok?' ouvert':'')+(ok?'':' verrou');
    b.setAttribute('aria-label',t('jourN',{n}));
    b.innerHTML=n===30?ic('trophee','sm'):f?ic('check','sm'):(ok?n:ic('cadenas','sm'));
    if([21,23,25,27,29].includes(n))b.innerHTML+=`<svg class="nuit" viewBox="0 0 24 24">${ETOILE4}</svg>`;
    b.onclick=()=>{if(!ok)return;if(n===30)ouvrirRevisionFinale();else ouvrirLecon(PROG_RAMADAN[n-1],{an:R.an,jour:n})};
    g.appendChild(b);
  }
  $('e-ramadan').insertAdjacentHTML('beforeend',`<div class="carte"><h3 class="titre-carte">${t('revSemaines')}</h3><p class="petit">${t('revSemInfo',{n:NB_SEMAINE})}</p>`+
    SEMAINES_RAM.map(([a,b],w)=>{const ok=ramOuvert(R,b),sc=D.semaines[w];
      return `<div class="ligne-theme ${ok?'':'verrou'}" ${ok?`onclick="ouvrirSemaine(${w})"`:''}><div class="pastille">${ic(!ok?'cadenas':sc!==undefined?'check':'calendrier')}</div>
      <div class="milieu"><b>${t('semaine',{n:w+1})}</b><div class="petit">${t('joursAB',{a,b})} · ${sc!==undefined?t('semFaite',{s:sc+' / '+NB_SEMAINE}):ok?t('quizSemaine'):t('ouvertJour',{n:b})}</div></div>${ok?ic('droite','sm'):''}</div>`}).join('')+
    `<div class="ligne-theme ${ramOuvert(R,30)?'':'verrou'}" ${ramOuvert(R,30)?'onclick="ouvrirRevisionFinale()"':''}><div class="pastille">${ic(ramOuvert(R,30)?'trophee':'cadenas')}</div>
      <div class="milieu"><b>${t('revFinale')}</b><div class="petit">${ramOuvert(R,30)?t('revFinaleInfo',{n:NB_FINAL}):t('ouvertJour',{n:30})}</div></div>${ramOuvert(R,30)?ic('droite','sm'):''}</div></div>`);
  aller('ramadan');
}

/* ---------- Leçon ---------- */
function ouvrirLecon(id,ram=null,retour=null){
  const L=lecon(id),m=LECONS.find(l=>l.id===id);
  $('e-lecon').innerHTML=boutonRetour(retour||(ram?'ouvrirRamadan()':"aller('accueil')"))+`<div class="lecon">
    <div class="surtitre">${ram?ic('lanterne','sm')+' '+t('ramJour',{n:ram.jour}):ic(CATS[m.cat],'sm')+' '+nomCat(m.cat)}</div><h2>${esc(L.titre)}</h2>
    <div class="frise"></div>
    ${L.repli?`<p class="avis">${t('contenuFr')}</p>`:S.langue!=='fr'?`<p class="avis">${t('aRelire')}</p>`:''}
    ${L.texte.map(p=>`<p class="txt">${esc(p)}</p>`).join('')}
    <div class="retenir">${ic('ampoule')}<div>${t('aRetenir')}<br><span style="font-weight:500">${esc(L.retenir)}</span></div></div>
    <div class="surtitre" style="margin-top:22px">${ic('parchemin','sm')} ${t('sources')}</div>${rendreSources(L.sources)}</div>
    <div class="bas"><button class="btn" id="btn-quiz">${t('passerQuiz')} · ${questionsDe(id).length}</button></div>`;
  $('btn-quiz').onclick=()=>lancerQuiz(questionsDe(id),L.titre,{mode:'lecon',id,ram});
  aller('lecon');
}

/* ---------- Quiz : on répond à tout, la correction s'affiche à la fin ---------- */
let Q=[],qi=0,bonnes=0,PTS=0,CTX={},T=null,reste=0,JOUEUR='moi',ORDRE_CHOIX=[],SEL=new Set(),REP=[],CORR=null,TOT=0,PAIRES=null;
/* 2026-11-23 : dans une leçon, les questions ne se ressemblent plus : 3 deviennent « vrai ou faux » (une réponse proposée,
   juste ou fausse) et 3 à réponse courte deviennent un écran « relie les paires ». Même nombre de questions, même score. */
const NB_PAIRES=4;
const poids=it=>it.paires?it.paires.length:1;
function varier(qs){
  const simples=qs.filter(q=>!q.m),courtes=melanger(simples.filter(q=>q.c[q.b].length<=42&&q.q.length<=130));
  // 2026-11-24 : 4 questions à relier + 4 réponses pièges (une mauvaise réponse de chaque question, donc du même genre :
  // un nombre parmi des nombres, un nom parmi des noms) → on ne peut plus deviner par élimination
  const paire=[];for(const q of courtes){if(paire.length<NB_PAIRES&&!paire.some(p=>p.c[p.b]===q.c[q.b]))paire.push(q)}
  const prises=paire.length>=3?paire:[];
  let pieces=prises.map((q,k)=>({txt:q.c[q.b],k}));
  for(const q of prises){const piege=melanger(q.c.filter((c,i)=>i!==q.b&&c.length<=50&&!pieces.some(x=>x.txt===c)))[0];if(piege)pieces.push({txt:piege,k:-1})}
  const vf=melanger(simples.filter(q=>!prises.includes(q))).slice(0,3);
  const out=[];let place=false;
  for(const q of qs){
    if(prises.includes(q)){if(!place){out.push({paires:prises,pieces});place=true}continue}
    out.push(vf.includes(q)?{...q,vf:Math.random()<.5?q.b:melanger([0,1,2,3].filter(k=>k!==q.b))[0]}:q);
  }
  return out;
}
function lancerQuiz(questions,titre,ctx){
  if(ctx.mode==='lecon')questions=varier(questions);
  Q=questions;TOT=Q.reduce((a,it)=>a+poids(it),0);qi=0;bonnes=0;PTS=0;CTX=ctx;JOUEUR=ctx.joueur||'moi';REP=[];
  const icone={defi:'cible',bilan:'graphe',revision:'cible',final:'trophee',semaine:'calendrier',hebdo:'calendrier'}[ctx.mode]||'livre';
  $('e-quiz').innerHTML=`<div class="quiz-tete">${boutonRetour("aller('accueil')",'quitter')}<span class="chrono" id="chrono"></span></div>
    <div class="surtitre">${ic(icone,'sm')} ${esc(titre)}</div><div class="barre"><i id="q-barre"></i></div>
    <div class="compteur" id="q-compteur"></div><div class="question" id="q-texte"></div><p class="consigne" id="q-consigne"></p><div id="q-choix"></div>
    <p class="note-fin">${ic('ampoule','sm')} ${t('reponsesFin')}</p>
    <div class="bas"><button class="btn" id="q-suivant" onclick="enregistrer()"></button></div>`;
  aller('quiz');afficherQuestion();
}
// Une question par leçon (pour tout couvrir), puis complément au hasard jusqu'à n
function tirage(ids,n){
  const parLecon=ids.map(id=>melanger(questionsDe(id))[0]);
  const reste=melanger(ids.flatMap(id=>questionsDe(id)).filter(q=>!parLecon.includes(q)));
  return melanger(parLecon.slice(0,n).concat(reste.slice(0,Math.max(0,n-parLecon.length))));
}
function lancerFinal(R){
  const D=ramDonnees(R.an);
  if(D.final!==null&&!DEMO){montrerResultat(D.final,NB_FINAL,t('gqDeja'),t('gqEnreg'),'ouvrirRamadan()');return}
  lancerQuiz(tirage(PROG_RAMADAN,NB_FINAL),t('gqTitre'),{mode:'final',an:R.an});
}
function lancerRevision(){
  const faites=LECONS.filter(l=>fait(l.id)).flatMap(l=>questionsDe(l.id));
  const base=faites.length>=NB_REVISION?faites:LECONS.flatMap(l=>questionsDe(l.id));
  const faibles=Object.keys(CATS).filter(k=>pct('moi',k)!==null).sort((a,b)=>pct('moi',a)-pct('moi',b)).slice(0,2);
  const prio=moinsVues(base.filter(q=>faibles.includes(q.cat))).slice(0,3);
  lancerQuiz(melanger(prio.concat(moinsVues(base.filter(q=>!prio.includes(q))).slice(0,NB_REVISION-prio.length))),t('revision'),{mode:'revision'});
}
function afficherQuestion(){
  const q=Q[qi],pos=Q.slice(0,qi).reduce((a,it)=>a+poids(it),0);
  $('q-barre').style.width=(pos/TOT*100)+'%';
  $('q-compteur').textContent=t('question',{i:pos+1,n:TOT});
  const sv0=$('q-suivant');sv0.textContent=qi===Q.length-1?t('voirScore'):t('suivante');
  // signaler : pas pendant le Grand Quiz chronométré (possible dans sa correction)
  if(CTX.mode!=='final')$('q-compteur').innerHTML+=boutonSignaler(q.paires?q.paires.map(x=>x.uid):[q.uid]);
  if(q.paires)return afficherPaires(q);
  if(q.vf!==undefined)return afficherVF(q);
  if(q.m)$('q-compteur').innerHTML+=` <span class="tag-expert">${ic('etoile','sm')} ${t('expert')}</span>`;
  $('q-texte').textContent=q.q;
  $('q-consigne').textContent=q.m?t('consigneMulti'):'';
  ORDRE_CHOIX=melanger([...Array(q.c.length).keys()]);SEL=new Set();  // réponses mélangées à chaque affichage
  const z=$('q-choix');z.innerHTML='';
  ORDRE_CHOIX.forEach((orig,i)=>{const b=document.createElement('button');b.className='choix';
    b.innerHTML=`<span class="lettre">${'ABCDE'[i]}</span><span></span>`;b.lastChild.textContent=q.c[orig];
    b.onclick=()=>choisir(i,b,q.m);z.appendChild(b)});
  const sv=$('q-suivant');sv.disabled=true;
  const ch=$('chrono');clearInterval(T);ch.innerHTML='';
  if(CTX.mode==='final'){reste=SECONDES_FINAL;ch.innerHTML=ic('chrono','sm')+' '+reste+' s';
    T=setInterval(()=>{reste--;ch.innerHTML=ic('chrono','sm')+' '+reste+' s';if(reste<=0)enregistrer()},1000);}
}
// Choix unique : un seul sélectionné (modifiable). Réponses multiples : on coche/décoche.
function choisir(i,b,multi){
  if(!multi){SEL.clear();document.querySelectorAll('#q-choix .choix').forEach(x=>x.classList.remove('sel'))}
  if(SEL.has(i)){SEL.delete(i);b.classList.remove('sel')}else{SEL.add(i);b.classList.add('sel')}
  $('q-suivant').disabled=SEL.size===0;vibrer(10);
}
function afficherVF(q){
  $('q-texte').textContent='';$('q-consigne').textContent=t('consigneVF');SEL=new Set();
  // Une carte (question + réponse proposée), puis Faux / Vrai à toucher (balayage retiré le 2026-11-24 à la demande)
  $('q-choix').innerHTML=`<div class="vf-carte arrive"><p class="vf-q"></p><div class="vf-prop"><span>${t('propose')}</span><b></b></div></div>
    <div class="vf-boutons" dir="ltr"><button class="choix vf-b" data-v="f">${ic('croix')} ${t('faux')}</button><button class="choix vf-b" data-v="v">${ic('check')} ${t('vrai')}</button></div>`;
  $('q-choix').querySelector('.vf-q').textContent=q.q;
  $('q-choix').querySelector('.vf-prop b').textContent=q.c[q.vf];
  $('q-choix').querySelectorAll('.vf-b').forEach(b=>b.onclick=()=>{SEL=new Set([b.dataset.v]);
    $('q-choix').querySelectorAll('.vf-b').forEach(x=>x.classList.toggle('sel',x===b));$('q-suivant').disabled=false;vibrer(10)});
  $('q-suivant').disabled=true;
}
function afficherPaires(it){
  $('q-texte').textContent='';$('q-consigne').textContent=t('consignePaires');
  PAIRES={sel:0,lien:{},ordre:melanger(it.pieces.map((_,i)=>i))};dessinerPaires(it);
}
function dessinerPaires(it){
  const P=PAIRES,coul=k=>COULEURS[[1,2,3,4][k]];
  const pris=r=>Object.keys(P.lien).find(k=>P.lien[k]===r);
  $('q-choix').innerHTML=`<div class="paires-q">${it.paires.map((q,k)=>`<button class="paire-q ${P.sel===k?'sel':''} ${P.lien[k]!==undefined?'liee':''}" data-k="${k}" style="--pc:${coul(k)}">
      <span class="pq-pt"></span><span class="pq-txt"></span>${P.lien[k]!==undefined?`<span class="pq-rep"></span>`:''}</button>`).join('')}</div>
    <div class="paires-r">${P.ordre.map(r=>{const k=pris(r);return `<button class="paire-r ${k!==undefined?'prise':''}" data-r="${r}" ${k!==undefined?`style="--pc:${coul(+k)}"`:''}><span></span></button>`}).join('')}</div>`;
  $('q-choix').querySelectorAll('.paire-q').forEach(b=>{const k=+b.dataset.k,q=it.paires[k];b.querySelector('.pq-txt').textContent=q.q;
    if(P.lien[k]!==undefined)b.querySelector('.pq-rep').textContent=it.pieces[P.lien[k]].txt;
    b.onclick=()=>{P.sel=k;dessinerPaires(it)}});
  $('q-choix').querySelectorAll('.paire-r').forEach(b=>{const r=+b.dataset.r;b.firstChild.textContent=it.pieces[r].txt;
    b.onclick=()=>{if(P.sel===null)P.sel=it.paires.findIndex((_,k)=>P.lien[k]===undefined);if(P.sel<0)return;
      for(const k of Object.keys(P.lien))if(P.lien[k]===r)delete P.lien[k];
      P.lien[P.sel]=r;vibrer(10);const libre=it.paires.findIndex((_,k)=>P.lien[k]===undefined);P.sel=libre<0?null:libre;dessinerPaires(it)}});
  $('q-suivant').disabled=Object.keys(P.lien).length<it.paires.length;
}
function enregistrer(){
  clearInterval(T);
  if(Q[qi].paires){const it=Q[qi];
    it.paires.forEach((q,k)=>{const r=PAIRES.lien[k],juste=r!==undefined&&it.pieces[r].k===k;if(juste){bonnes++;PTS++}if(q.cat)noter(JOUEUR,q.cat,juste);
      REP.push({q,choisis:juste?[q.b]:[],juste,paire:juste?null:(r!==undefined?it.pieces[r].txt:'')})});
    qi++;if(qi<Q.length){afficherQuestion();scrollTo({top:0,behavior:'smooth'})}else finir();return}
  if(Q[qi].vf!==undefined){const q=Q[qi],dit=[...SEL][0],juste=(dit==='v')===(q.vf===q.b);
    if(juste){bonnes++;PTS++}if(q.cat)noter(JOUEUR,q.cat,juste);
    REP.push({q,choisis:dit==='v'?[q.vf]:[],juste,vfDit:dit});
    qi++;if(qi<Q.length){afficherQuestion();scrollTo({top:0,behavior:'smooth'})}else finir();return}
  const q=Q[qi],choisis=[...SEL].map(k=>ORDRE_CHOIX[k]).sort((a,b)=>a-b);
  const bons=(q.m?q.b:[q.b]).slice().sort((a,b)=>a-b);   // multiple : toutes les bonnes, et seulement elles
  const juste=choisis.length===bons.length&&bons.every((x,k)=>x===choisis[k]);
  if(juste){bonnes++;PTS+=q.m?2:1}
  if(q.cat)noter(JOUEUR,q.cat,juste);
  REP.push({q,choisis,juste});
  qi++;if(qi<Q.length){afficherQuestion();scrollTo({top:0,behavior:'smooth'})}else finir();
}
function activite(){
  const k=dateCle();if(S.dernier===k)return 0;
  const hier=dateCle(new Date(aujourdhui()-864e5));
  S.serie=(S.dernier===hier)?S.serie+1:1;S.dernier=k;
  return S.serie>1?BONUS_SERIE*Math.min(S.serie,10):0;
}
function finir(){
  $('q-barre').style.width='100%';
  if(CTX.mode==='defi'){DEFI.rep=DEFI.rep.concat(REP);sauver();finTour();return}
  REP.forEach(x=>{noterErreur(x.q,x.juste);vue(x.q)});   // erreurs à revoir dans Découvrir
  const r=bonnes/TOT,titreRes=r===1?t('resParfait'):r>=.5?t('resBravo'):t('resProgres');
  if(CTX.mode==='bilan'){sauver();montrerResultat(bonnes,TOT,titreRes,'',"RETOUR='accueil';afficherBilan('moi')",REP);return}
  let gagnes=0,texte='',suite="aller('accueil')";const gainTxt=()=>t('gain',{p:gagnes,j:t('jours',{n:S.serie})});
  if(CTX.mode==='lecon'){
    const nouvelle=!fait(CTX.id),nouveauJour=CTX.ram&&ramDonnees(CTX.ram.an).jours[CTX.ram.jour]===undefined;
    if(nouvelle||nouveauJour)gagnes=PTS*POINTS_BONNE+activite();
    if(nouvelle)(S.datesLecons=S.datesLecons||{})[CTX.id]=dateCle();
    S.lecons[CTX.id]=nouvelle?bonnes:Math.max(S.lecons[CTX.id],bonnes);
    if(nouveauJour)ramDonnees(CTX.ram.an).jours[CTX.ram.jour]=bonnes;
    texte=gagnes?gainTxt():t('dejaValide');if(CTX.ram)suite='ouvrirRamadan()';
  }else if(CTX.mode==='revision'){
    if(S.revision!==dateCle()){gagnes=PTS*POINTS_BONNE+activite();S.revision=dateCle();texte=gainTxt()}else texte=t('entrLibre');
  }else if(CTX.mode==='hebdo'){
    if(S.hebdo!==cleSemaine()){gagnes=PTS*POINTS_BONNE+activite();S.hebdo=cleSemaine();texte=gainTxt()}else texte=t('dejaValide');
  }else if(CTX.mode==='semaine'){
    const D=ramDonnees(CTX.an);
    if(D.semaines[CTX.w]===undefined){gagnes=PTS*POINTS_BONNE+activite();D.semaines[CTX.w]=bonnes;texte=gainTxt()}
    else{D.semaines[CTX.w]=Math.max(D.semaines[CTX.w],bonnes);texte=t('dejaValide')}
    suite='ouvrirRamadan()';
  }else if(CTX.mode==='final'){
    const D=ramDonnees(CTX.an);if(D.final===null){gagnes=PTS*POINTS_BONNE*2+activite();D.final=bonnes}
    texte=t('gqGain',{p:gagnes,an:CTX.an});suite='ouvrirRamadan()';
  }
  S.points+=gagnes;sauver();
  montrerResultat(bonnes,TOT,CTX.mode==='final'?t('gqFini'):titreRes,texte,suite,REP);
  document.querySelector('#e-resultat .resultat').insertAdjacentHTML('afterend',blocFinQuiz(REP.filter(x=>!x.juste).length));
  if(r>=.75)pluie();
}
function montrerResultat(b,total,titre,texte,suite="aller('accueil')",rep=null){
  CORR=rep;const nbErr=rep?rep.filter(r=>!r.juste).length:0;
  $('e-resultat').innerHTML=`<div class="resultat"><div class="heros" style="padding:0">${heros(130)}</div>
    <h2>${esc(titre)}</h2><div class="gros">${b} / ${total}</div>${texte?`<p class="doux">${esc(texte)}</p>`:''}</div>
    ${rep?blocCorrection(rep,nbErr):''}
    <div class="bas"><button class="btn" onclick="${suite}">${t('continuer')}</button></div>`;
  aller('resultat');
}
function blocCorrection(rep,nbErr){
  const filtres=nbErr===undefined?'':`<div class="filtres"><button class="filtre actif" onclick="filtrer(this,'')">${t('filtreToutes',{n:rep.length})}</button>
    <button class="filtre" onclick="filtrer(this,'erreurs')">${t('filtreErreurs',{n:nbErr})}</button></div>`;
  return `<div class="surtitre" style="margin-top:28px">${ic('check','sm')} ${t('correction')}</div>${filtres}<div id="corrige">${correctionHTML(rep,'')}</div>`;
}
function filtrer(b,f){document.querySelectorAll('.filtre').forEach(x=>x.classList.toggle('actif',x===b));$('corrige').innerHTML=correctionHTML(CORR,f)}
// Correction détaillée : ta réponse, la bonne réponse, l'explication et les sources (repliées)
function correctionHTML(rep,filtre){
  const L=rep.map((r,i)=>({...r,i})).filter(r=>filtre!=='erreurs'||!r.juste);
  if(!L.length)return `<p class="doux" style="text-align:center;margin-top:16px">${t('aucuneErreur')}</p>`;
  return L.map(r=>{const q=r.q,bons=q.m?q.b:[q.b],neutre=r.juste===undefined;
    const choix=q.c.map((c,k)=>{const bon=bons.includes(k),pris=!neutre&&r.choisis.includes(k);
      const cls=bon?(pris||neutre||!q.m?'bon':'manque'):pris?'faux':'';   // « manque » : bonne réponse oubliée d'une question multiple
      return `<div class="cor-choix ${cls}">${bon?ic('check','sm'):pris?ic('croix','sm'):'<i></i>'}<span>${esc(c)}</span>${pris?`<em>${t('tonChoix')}</em>`:''}</div>`}).join('');
    let src=rendreSources(q.s);
    if(!q.s&&q.src)src=`<div class="sources"><div class="source f"><div class="src-tete">${ic('repere','sm')} ${esc(t('sourceDonnee',{n:membre(q.auteur).nom}))}</div><p class="tr">${esc(q.src)}</p></div></div>`;
    return `<div class="carte corrige ${neutre?'':r.juste?'ok':'ko'}"><div class="cor-tete">${neutre?ic('livre','sm'):ic(r.juste?'ok':'ko','sm')} ${t('question',{i:r.i+1,n:rep.length})}${q.m?` <span class="tag-expert">${ic('etoile','sm')} ${t('expert')}</span>`:''}</div>
      <p class="cor-q">${esc(q.q)} ${boutonSignaler([q.uid])}</p>${choix}${r.vfDit?`<p class="petit">${esc(t('propose'))} : « ${esc(q.c[q.vf])} » · ${esc(t('tuAsDit',{r:t(r.vfDit==='v'?'vrai':'faux')}))}</p>`
        :r.paire?`<p class="petit">${esc(t('tuAsRelie',{r:r.paire}))}</p>`:!neutre&&!r.choisis.length&&r.paire===undefined?`<p class="petit">${t('sansReponse')}</p>`:''}
      <p class="explic">${esc(q.e||t('poseePar',{n:membre(q.auteur).nom}))}</p>${src?`<details><summary>${t('voirSources')}</summary>${src}</details>`:''}</div>`}).join('');
}

/* ---------- Récapitulatifs : révision de la semaine (Ramadan et toute l'année), révision finale ---------- */
let RECAP=null;
function ouvrirRecap(o){
  RECAP=o;
  $('e-recap').innerHTML=boutonRetour(o.retour)+`<div class="surtitre">${ic(o.ic,'sm')} ${esc(o.surtitre)}</div><h2>${esc(o.titre)}</h2>
    <p class="doux">${esc(o.intro)}</p>`+o.groupes.map(g=>(g.titre?`<h3 class="titre-groupe">${esc(g.titre)}</h3>`:'')+g.ids.map(x=>{
      const L=lecon(x.id),m=LECONS.find(l=>l.id===x.id);
      return `<div class="carte recap"><div class="surtitre">${x.jour?ic('lanterne','sm')+' '+t('ramJour',{n:x.jour}):ic(CATS[m.cat],'sm')+' '+nomCat(m.cat)}</div>
        <b class="recap-titre">${esc(L.titre)}</b><div class="retenir">${ic('ampoule')}<div style="font-weight:500">${esc(L.retenir)}</div></div>
        <button class="lien" onclick="ouvrirLecon('${x.id}',null,'ouvrirRecap(RECAP)')">${t('relire')} ${ic('droite','sm')}</button></div>`}).join('')).join('')+
    `<div class="bas"><button class="btn" onclick="${o.action}">${esc(o.bouton)}</button></div>`;
  aller('recap');
}
function idsJours(a,b){const L=[];for(let n=a;n<=b;n++)L.push({id:PROG_RAMADAN[n-1],jour:n});return L}
function ouvrirSemaine(w){
  const R=ramadanCourant(),[a,b]=SEMAINES_RAM[w];
  ouvrirRecap({ic:'calendrier',surtitre:t('defiRam',{an:R.an})+' · '+t('revSemaines'),titre:t('semaine',{n:w+1})+' · '+t('joursAB',{a,b}),
    intro:t('recapIntro'),groupes:[{ids:idsJours(a,b)}],bouton:t('lancerQuizN',{n:NB_SEMAINE}),action:`lancerSemaine(${w})`,retour:'ouvrirRamadan()'});
}
function lancerSemaine(w){
  const R=ramadanCourant(),[a,b]=SEMAINES_RAM[w];ramDonnees(R.an);
  lancerQuiz(tirage(idsJours(a,b).map(x=>x.id),NB_SEMAINE),t('quizSemaine')+' · '+t('semaine',{n:w+1}),{mode:'semaine',an:R.an,w});
}
function ouvrirRevisionFinale(){
  const R=ramadanCourant();
  const groupes=SEMAINES_RAM.map(([a,b],w)=>{const fin=w===SEMAINES_RAM.length-1?29:b;
    return {titre:t('semaine',{n:w+1})+' · '+t('joursAB',{a,b:fin}),ids:idsJours(a,fin)}});
  ouvrirRecap({ic:'trophee',surtitre:t('defiRam',{an:R.an}),titre:t('revFinale'),intro:t('revFinaleInfo',{n:NB_FINAL}),groupes,
    bouton:t('lancerGQ'),action:'lancerFinal(ramadanCourant())',retour:'ouvrirRamadan()'});
}
// Toute l'année : les leçons faites ces 7 derniers jours
function cleSemaine(){const d=aujourdhui();d.setDate(d.getDate()-((d.getDay()+6)%7));return dateCle(d)}
function leconsSemaine(){const lim=dateCle(new Date(aujourdhui()-6*864e5)),D=S.datesLecons||{};return ORDRE.filter(id=>D[id]&&D[id]>=lim)}
function ouvrirHebdo(){
  const ids=leconsSemaine(),n=Math.min(NB_HEBDO,ids.flatMap(questionsDe).length);
  ouvrirRecap({ic:'calendrier',surtitre:t('revHebdo'),titre:t('revHebdoInfo',{n:ids.length}),intro:t('recapIntro'),groupes:[{ids:ids.map(id=>({id}))}],
    bouton:t('lancerQuizN',{n}),action:'lancerHebdo()',retour:"aller('accueil')"});
}
function lancerHebdo(){lancerQuiz(tirage(leconsSemaine(),NB_HEBDO),t('revHebdo'),{mode:'hebdo'})}

/* ---------- Calendrier des dates importantes (calcul Umm al-Qura) ---------- */
const FMT_HN=(()=>{try{return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{day:'numeric',month:'numeric',year:'numeric'})}catch(e){return null}})();
/* Calcul de secours, sans Intl : calendrier hégirien tabulaire (arithmétique « koweïtien »).
   Peut différer d'Umm al-Qura d'un jour, mais ne dépend pas du téléphone. */
function hijriTab(d){
  const F=Math.floor,jd=F(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)+2440588;
  let l=jd-1948440+10632;const n=F((l-1)/10631);l=l-10631*n+354;
  const j=F((10985-l)/5316)*F(50*l/17719)+F(l/5670)*F(43*l/15238);
  l=l-F((30-j)/15)*F(17719*j/50)-F(j/16)*F(15238*j/43)+29;
  const m=F(24*l/709);return {day:l-F(709*m/24),month:m,year:30*n+j-30};
}
/* 2026-11-20 (2) : on ne fait confiance à Intl que s'il calcule VRAIMENT en Umm al-Qura et que le résultat est
   plausible (à 2 jours près du calcul de secours). Sinon (moteur Android réduit, repli silencieux sur le
   grégorien, année « avant J.-C. »…) on prend le calcul de secours. */
const HN_OK=(()=>{try{return /islamic/.test(FMT_HN.resolvedOptions().calendar)}catch(e){return false}})();
const nbJ=p=>p.year*354.367+(p.month-1)*29.53+p.day;
/* 2026-11-20 (3) : table Umm al-Qura INTÉGRÉE à l'appli (1 Mouharram 1440 = 11/09/2018 → fin 1480, soit 2018-2059).
   Un chiffre hexadécimal = 4 mois ; bit 1 = mois de 30 jours, bit 0 = 29 jours. Tirée du calendrier Umm al-Qura
   officiel (ICU complet) : la date hégirienne est donc exacte sur TOUS les téléphones, sans dépendre d'Intl. */
const UQ_BASE=17785,UQ_MOIS='5d4ada55aaab595749764baa5b52b6a56e4db25b52b6a5ad2ae92f49764b6a56acad655d49da4dd16d955aa5b52da95b4ad5956ca6e4aea4f52b6956aaa';
function hijriUQ(d){
  let n=Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5)-UQ_BASE;if(n<0)return null;
  for(let i=0;i<492;i++){const len=29+((parseInt(UQ_MOIS[i>>2],16)>>(3-(i&3)))&1);
    if(n<len)return {year:1440+Math.floor(i/12),month:i%12+1,day:n+1};n-=len}
  return null;
}
function hijriDe(d){
  const uq=hijriUQ(d);if(uq)return uq;   // cas normal : table intégrée
  const tab=hijriTab(d);if(!HN_OK)return tab;
  const p={};try{FMT_HN.formatToParts(d).forEach(x=>{if(x.type==='day'||x.type==='month'||x.type==='year')p[x.type]=+x.value})}catch(e){return tab}
  if(!(p.day>=1&&p.day<=30&&p.month>=1&&p.month<=12&&p.year>1300&&p.year<1700)||Math.abs(nbJ(p)-nbJ(tab))>2)return tab;
  return p;
}
function fmt(d,o,cal='gregory'){try{return new Intl.DateTimeFormat(S.langue+'-u-ca-'+cal+'-nu-latn',o).format(d)}catch(e){return ''}}
/* 2026-11-20 : noms des mois hégiriens À NOUS, dans les 9 langues. Le moteur web d'Android (ICU réduit) ne connaît
   les mois hégiriens qu'en arabe : il affichait « 10 juin 1448 av. J.-C. » (mois grégorien + ère « avant J.-C. »).
   On ne prend donc à Intl que les CHIFFRES (jour, mois, année Umm al-Qura, justes partout) et on écrit le reste. */
const MOIS_H={
  fr:['Mouharram','Safar','Rabiʿ al-Awwal','Rabiʿ ath-Thani','Joumada al-Oula','Joumada ath-Thania','Rajab','Chaʿbane','Ramadan','Chawwal','Dhou al-Qiʿda','Dhou al-Hijja'],
  en:['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Thani','Rajab','Shaban','Ramadan','Shawwal','Dhu al-Qadah','Dhu al-Hijjah'],
  // 2026-11-21 : « الثاني / الثانية » (Maghreb, comme le français « ath-Thania ») plutôt que « الآخر / الآخرة » d'Umm al-Qura — mêmes mois
  ar:['محرم','صفر','ربيع الأول','ربيع الثاني','جمادى الأولى','جمادى الثانية','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة'],
  de:['Muharram','Safar','Rabīʿ al-awwal','Rabīʿ ath-thānī','Dschumādā l-ūlā','Dschumādā th-thāniya','Radschab','Schaʿbān','Ramadan','Schawwāl','Dhū l-Qaʿda','Dhū l-Hiddscha'],
  es:['Muharram','Safar','Rabí al-Awal','Rabí al-Thani','Yumada al-Ula','Yumada al-Thani','Rayab','Shabán','Ramadán','Shawwal','Dhu al-Qada','Dhu al-Hiyya'],
  it:['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Ula','Jumada al-Thani','Rajab','Shaban','Ramadan','Shawwal','Dhu al-Qada','Dhu al-Hijja'],
  tr:['Muharrem','Safer','Rebiülevvel','Rebiülahir','Cemaziyelevvel','Cemaziyelahir','Recep','Şaban','Ramazan','Şevval','Zilkade','Zilhicce'],
  id:['Muharram','Safar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir','Rajab','Syaban','Ramadan','Syawal','Zulkaidah','Zulhijah'],
  nl:['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Djoemada al-Oela','Djoemada al-Thani','Radjab','Sjaban','Ramadan','Sjawwal','Dhoe al-Qada','Dhoe al-Hiddja'],
};
const ERE_H={fr:'H',en:'AH',ar:'هـ',de:'n. H.',es:'H',it:'AH',tr:'H.',id:'H',nl:'AH'};
const moisH=(m,lg=S.langue)=>(MOIS_H[lg]||MOIS_H.en)[m-1]||'';
const chiffresAr=n=>String(n).replace(/[0-9]/g,c=>'٠١٢٣٤٥٦٧٨٩'[c]);
/** « 10 Joumada ath-Thania 1448 H » (sans jour : « Joumada ath-Thania 1448 H » ; sans année : « Joumada ath-Thania »). */
function hijriTexte(d,o={},lg=S.langue){
  const p=hijriDe(d);if(!p.month)return '';
  const n=x=>o.arabes?chiffresAr(x):String(x);   // chiffres arabes seulement pour la ligne en arabe du bandeau (comme avant)
  const jour=o.jour===false?'':(lg==='de'?n(p.day)+'.':n(p.day));
  const an=o.annee===false?'':n(p.year)+' '+(ERE_H[lg]||'AH');
  return [jour,moisH(p.month,lg),an].filter(Boolean).join(' ');
}
let EVTS=null,EVTS_JOUR=null;
function evenements(){
  if(EVTS&&EVTS_JOUR===dateCle())return EVTS;
  const auj=aujourdhui(),L=[],jour=k=>{const d=new Date(auj);d.setDate(d.getDate()+k);return d};
  for(let k=-31;k<=390;k++){const d=jour(k),h=hijriDe(d);
    FETES.forEach(f=>{if(f.m!==h.month||f.j!==h.day)return;
      let fin=d;for(let x=1;x<f.d;x++){const n=jour(k+x),hn=hijriDe(n);if(hn.month!==f.m)break;fin=n}   // s'arrête à la fin du mois lunaire
      if(fin>=auj)L.push({f,d,fin})});}
  EVTS_JOUR=dateCle();return EVTS=L.sort((a,b)=>a.d-b.d);
}
function quand(e){const auj=aujourdhui(),n=Math.round((e.d-auj)/864e5);
  return n<=0&&e.fin>=auj&&e.fin>e.d?t('enCours'):n<=0?t('aujourdhuiJ'):n===1?t('demainJ'):t('dansN',{n})}
function texteFete(id){return ((contenu().calendrier)||CONTENU.fr.calendrier)[id]}
function plage(e){const o={day:'numeric',month:'short'};return e.fin>e.d?fmt(e.d,o)+' – '+fmt(e.fin,o):fmt(e.d,{weekday:'long',day:'numeric',month:'long'})}
function ligneFete(e){const f=e.f;
  return `<details class="evt"><summary><div class="evt-date"><b>${fmt(e.d,{day:'numeric'})}</b><span>${fmt(e.d,{month:'short'})}</span></div>
    <div class="milieu"><b>${t('cal_'+f.id)}</b><div class="petit">${esc(hijriTexte(e.d))}</div><span class="tag-cal t-${f.type}">${t('tag_'+f.type)}</span></div>
    <span class="quand">${quand(e)}</span></summary>
    <p class="petit" style="margin-top:10px">${esc(plage(e))}</p><p class="explic">${esc(texteFete(f.id))}</p>${rendreSources(f.src)}</details>`;
}
function prochaineFete(){return evenements()[0]||null}
/* Calendrier mensuel : jours blancs en case blanche, fêtes en or, jeûnes en vert, jeûne interdit en rouge */
let MOIS_CAL=null,JOUR_CAL=null;
function evtsDuJour(d){return evenements().filter(e=>e.d<=d&&e.fin>=d)}
function classeJour(L){const ty=L.map(e=>e.f.id==='blancs'?'blanc':e.f.type);for(const k of ['fete','interdit','blanc','jeune','periode','repere'])if(ty.includes(k))return 'c-'+k;return ''}
function ouvrirCalendrier(dec){
  const auj=aujourdhui(),debut=new Date(auj.getFullYear(),auj.getMonth(),1);
  if(!MOIS_CAL||dec===undefined&&!$('e-calendrier').classList.contains('actif')){MOIS_CAL=new Date(debut);JOUR_CAL=dateCle(auj)}
  if(dec){const m=new Date(MOIS_CAL.getFullYear(),MOIS_CAL.getMonth()+dec,1),ecart=(m.getFullYear()-debut.getFullYear())*12+m.getMonth()-debut.getMonth();
    if(ecart>=0&&ecart<=12){MOIS_CAL=m;JOUR_CAL=dateCle(ecart?m:auj)}}
  const M=MOIS_CAL,ecart=(M.getFullYear()-debut.getFullYear())*12+M.getMonth()-debut.getMonth();
  const nbJ=new Date(M.getFullYear(),M.getMonth()+1,0).getDate(),dernier=new Date(M.getFullYear(),M.getMonth(),nbJ),decal=(M.getDay()+6)%7;
  const titre=fmt(M,{month:'long',year:'numeric'}),hm=[hijriTexte(M,{jour:false,annee:false}),hijriTexte(dernier,{jour:false})];
  const jours=[...Array(7).keys()].map(i=>fmt(new Date(2024,0,1+i),{weekday:'narrow'}));   // 1er janvier 2024 = lundi
  let cases='';for(let i=0;i<decal;i++)cases+='<span></span>';
  for(let n=1;n<=nbJ;n++){const d=new Date(M.getFullYear(),M.getMonth(),n),k=dateCle(d),L=evtsDuJour(d);
    cases+=`<button class="jour ${classeJour(L)} ${k===dateCle(auj)?'auj':''} ${k===JOUR_CAL?'sel':''}" onclick="JOUR_CAL='${k}';ouvrirCalendrier(0)" aria-label="${esc(fmt(d,{day:'numeric',month:'long'}))}">
      <b>${n}</b><span>${hijriDe(d).day||''}</span></button>`}
  const dj=new Date(JOUR_CAL+'T00:00:00'),LJ=evtsDuJour(dj);
  const leg=[['c-blanc',t('cal_blancs')],['c-jeune',t('tag_jeune')],['c-fete',t('tag_fete')],['c-interdit',t('tag_interdit')],['c-periode',t('tag_periode')]];
  $('e-calendrier').innerHTML=boutonRetour("aller('accueil')")+`<div class="surtitre">${ic('calendrier','sm')} ${t('calendrier')}</div>
    <div class="carte mois">
      <div class="mois-tete"><button class="rond" ${ecart>0?'onclick="ouvrirCalendrier(-1)"':'disabled'} aria-label="${t('precedente')}">${ic('gauche','sm')}</button>
        <div><h2>${esc(titre.charAt(0).toUpperCase()+titre.slice(1))}</h2><div class="or petit">${esc((hijriDe(M).month===hijriDe(dernier).month?hm[1]:hm[0]+' – '+hm[1]))}</div></div>
        <button class="rond" ${ecart<12?'onclick="ouvrirCalendrier(1)"':'disabled'} aria-label="${t('suivante')}">${ic('droite','sm')}</button></div>
      <div class="sem">${jours.map(j=>`<span>${esc(j)}</span>`).join('')}</div>
      <div class="grille-mois">${cases}</div>
      <div class="legende-cal">${leg.map(([c,l])=>`<span><i class="${c}"></i>${l}</span>`).join('')}</div></div>
    <div class="carte jour-detail"><div class="surtitre">${ic('lune','sm')} ${esc(fmt(dj,{weekday:'long',day:'numeric',month:'long'}))}</div>
      <p class="or" style="margin-top:4px">${esc(hijriTexte(dj))}</p>
      ${LJ.length?LJ.map(e=>`<div class="evt-jour"><b>${t('cal_'+e.f.id)}</b> <span class="tag-cal t-${e.f.type}">${t('tag_'+e.f.type)}</span>
        <p class="explic">${esc(texteFete(e.f.id))}</p>${e.f.src?`<details><summary>${t('voirSource')}</summary>${rendreSources(e.f.src)}</details>`:''}</div>`).join('')
        :`<p class="petit">${t('aucunEvt')}</p>`}</div>
    <div class="carte"><h3 class="titre-carte">${t('chaqueSemaine')}</h3>${FETES_SEMAINE.map(f=>`<details class="evt"><summary><div class="pastille">${ic(f.ic)}</div>
      <div class="milieu"><b>${t('cal_'+f.id)}</b></div>${ic('droite','sm')}</summary><p class="explic">${esc(texteFete(f.id))}</p>${rendreSources(f.src)}</details>`).join('')}</div>
    <p class="petit" style="text-align:center;margin-top:12px">${t('calIntro')}</p>${S.langue==='fr'?'':!contenu().calendrier?`<p class="avis">${t('docFr')}</p>`:`<p class="avis">${t('aRelire')}</p>`}`;
  if(!$('e-calendrier').classList.contains('actif'))aller('calendrier');
}

/* ---------- Bilan ---------- */
function noter(id,cat,ok){S.stats[id]=S.stats[id]||{};const c=S.stats[id][cat]=S.stats[id][cat]||{ok:0,n:0};c.n++;if(ok)c.ok++}
function nb(id,cat){return((S.stats[id]||{})[cat]||{}).n||0}
function pct(id,cat){const s=(S.stats[id]||{})[cat];return s&&s.n?Math.round(s.ok/s.n*100):null}
function pctGlobal(id){let o=0,n=0;Object.values(S.stats[id]||{}).forEach(s=>{o+=s.ok;n+=s.n});return n?Math.round(o/n*100):null}
function couleurBarre(p){return p===null?'transparent':p<40?'var(--rouge)':p<70?'var(--or)':'var(--vert)'}
function membre(id){return(S.groupe&&S.groupe.membres.find(m=>m.id===id))||{id,nom:S.prenom,couleur:COULEURS[0]}}
function avatar(m,cls=''){return `<div class="avatar ${cls}" style="background:${m.couleur||COULEURS[0]}">${esc((m.nom||'?').trim().charAt(0).toUpperCase())}</div>`}
function barreCat(k,p,sous){return `<div class="ligne-cat"><div class="haut"><span>${ic(CATS[k])} ${nomCat(k)}</span><b>${p===null?'—':p+' %'}</b></div>
  <div class="barre"><i style="width:${p||0}%;background:${couleurBarre(p)}"></i></div><div class="petit">${sous}</div></div>`}
function afficherBilan(id){
  const m=membre(id),g=pctGlobal(id);
  let h=boutonRetour('retourBilan()')+`<div class="surtitre">${ic('graphe','sm')} ${t('bilanTitre')}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-top:10px">${avatar(m)}<div><h2 style="margin:0">${esc(m.nom)}</h2>
    <div class="doux">${t('niveauGen')} <b class="or">${niveau(g)}</b>${g!==null?' · '+g+' %':''}</div></div></div>`;
  const L=Object.keys(CATS).map(k=>({k,p:pct(id,k),n:nb(id,k)}));
  h+='<div class="carte">'+L.map(l=>barreCat(l.k,l.p,`${niveau(l.p)} · ${t('nRep',{n:l.n})}`)).join('')+'</div>';
  const ev=L.filter(l=>l.n>=2);
  if(ev.length>=2){const fort=ev.reduce((a,b)=>b.p>a.p?b:a),faible=ev.reduce((a,b)=>b.p<a.p?b:a);
    h+=`<div class="carte"><div class="ligne-fort"><div class="pastille">${ic('medaille')}</div><div><div class="petit" style="margin:0">${t('pointFort')}</div><b>${nomCat(fort.k)}</b></div></div>
      <div class="ligne-fort"><div class="pastille">${ic('cible')}</div><div><div class="petit" style="margin:0">${t('aTravailler')}</div><b>${nomCat(faible.k)}</b></div></div></div>`;
  }else h+=`<div class="carte doux">${t('bilanVide')}</div>`;
  if(id==='moi')h+=`<button class="btn" onclick="lancerBilan()">${t('faireBilan',{n:NB_BILAN_THEME*Object.keys(CATS).length})}</button>`;
  $('e-bilan').innerHTML=h;aller('bilan');
}
function retourBilan(){RETOUR==='famille'?ouvrirFamille():aller('accueil')}
function lancerBilan(){
  const tout=toutesQuestions();let liste=[];
  Object.keys(CATS).forEach(k=>{liste=liste.concat(melanger(tout.filter(q=>q.cat===k)).slice(0,NB_BILAN_THEME))});
  lancerQuiz(melanger(liste),t('bilanTitre'),{mode:'bilan'});
}

/* ---------- Famille (sur un même téléphone) ---------- */
let couleurChoisie=COULEURS[1],DEFI=null;
function ouvrirFamille(){
  const z=$('e-famille');
  if(!S.groupe){
    z.innerHTML=`<div class="heros" style="padding:10px 0 0"><div class="pastille" style="width:84px;height:84px;border-radius:26px;margin:0 auto">${ic('famille','xl')}</div></div>
      <h2 style="text-align:center;margin-top:16px">${t('apprenezFamille')}</h2>
      <p class="doux" style="text-align:center;line-height:1.6">${t('familleTxt')}</p>
      <input id="g-nom" placeholder="${t('nomGroupe')}" maxlength="30" autocomplete="off">
      <button class="btn" onclick="creerGroupe()">${t('creerGroupe')}</button>
      <div class="carte">${carteImam()}</div>`;
    aller('famille');return;
  }
  const G=S.groupe;
  z.innerHTML=`<div class="surtitre">${ic('famille','sm')} ${t('groupe')}</div><h2>${esc(G.nom)}</h2>
    <div class="carte">${G.membres.map(m=>{const p=pctGlobal(m.id);return `<div class="membre" onclick="RETOUR='famille';afficherBilan('${m.id}')">
      ${avatar(m)}<div class="nom">${esc(m.nom)}${m.id==='moi'?` <span class="doux" style="font-weight:400">${t('moi')}</span>`:''}<div class="petit">${niveau(p)}${p!==null?' · '+p+' %':''}</div></div><span class="doux">${ic('droite','sm')}</span></div>`}).join('')}
    <button class="btn sec" onclick="ouvrirAjout()">${ic('plus')} ${t('ajouterMembre')}</button></div>
    <button class="btn" onclick="lancerDefi()">${ic('cible')} ${t('defiFamille')}</button>
    <button class="btn sec" onclick="ouvrirQuestion()">${ic('plume')} ${t('poserQ',{n:G.questions.length})}</button>
    <button class="btn sec" onclick="bilanGroupe()">${ic('graphe')} ${t('bilanGroupe')}</button>
    <div class="carte">${carteBoite()}${carteImam()}</div>`;
  aller('famille');
}
function creerGroupe(){S.groupe={nom:$('g-nom').value.trim()||t('maFamilleDefaut'),membres:[{id:'moi',nom:S.prenom,couleur:COULEURS[0]}],questions:[]};sauver();ouvrirFamille()}
function ouvrirAjout(){
  if(S.groupe.membres.length>=MAX_MEMBRES){alert(t('groupePlein',{n:MAX_MEMBRES}));return}
  couleurChoisie=COULEURS[S.groupe.membres.length%COULEURS.length];
  $('e-ajout').innerHTML=boutonRetour('ouvrirFamille()')+`<h2>${t('ajouterMembre')}</h2>
    <input id="m-nom" placeholder="${t('prenomEx')}" maxlength="20" autocomplete="off"><label>${t('saCouleur')}</label><div class="couleurs" id="m-couleurs"></div>
    <button class="btn" onclick="ajouterMembre()">${t('ajouter')}</button>`;
  const z=$('m-couleurs');
  COULEURS.forEach(c=>{const b=document.createElement('button');b.style.background=c;if(c===couleurChoisie)b.className='sel';
    b.onclick=()=>{couleurChoisie=c;z.querySelectorAll('button').forEach(x=>x.className='');b.className='sel'};z.appendChild(b)});
  aller('ajout');
}
function ajouterMembre(){if(S.groupe.membres.length>=MAX_MEMBRES){alert(t('groupePlein',{n:MAX_MEMBRES}));ouvrirFamille();return}
  const n=$('m-nom').value.trim();if(!n){$('m-nom').focus();return}
  S.groupe.membres.push({id:'m'+Date.now(),nom:n,couleur:couleurChoisie});sauver();ouvrirFamille()}
function ouvrirQuestion(){
  $('e-question').innerHTML=boutonRetour('ouvrirFamille()')+`<h2>${t('qTitre')}</h2><p class="doux" style="line-height:1.5">${t('qTxt')}</p>
    <label>${t('quiPose')}</label><select id="w-auteur">${S.groupe.membres.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}</select>
    <label>${t('theme')}</label><select id="w-cat">${Object.keys(CATS).map(k=>`<option value="${k}">${nomCat(k)}</option>`).join('')}</select>
    <label>${t('laQuestion')}</label><textarea id="w-q" maxlength="200" placeholder="${t('qEx')}"></textarea>
    <label>${t('les4')}</label>${[0,1,2,3].map(i=>`<input id="w-c${i}" placeholder="${t('reponse',{l:'ABCD'[i]})}" maxlength="80">`).join('')}
    <label>${t('laBonneRep')}</label><select id="w-b">${[0,1,2,3].map(i=>`<option value="${i}">${t('reponse',{l:'ABCD'[i]})}</option>`).join('')}</select>
    <label>${t('sourceFac')}</label><input id="w-e" maxlength="200" placeholder="${t('sourceEx')}">
    <button class="btn" onclick="enregistrerQuestion()">${t('envoyer')}</button>`;
  aller('question');
}
function enregistrerQuestion(){
  const v=i=>$(i).value.trim(),c=[0,1,2,3].map(i=>v('w-c'+i));
  if(!v('w-q')||c.some(x=>!x)){alert(t('erreurQ'));return}
  S.groupe.questions.push({q:v('w-q'),c,b:+v('w-b'),cat:v('w-cat'),auteur:v('w-auteur'),src:v('w-e')||''});
  sauver();pluie();ouvrirFamille();
}
function lancerDefi(){
  const G=S.groupe;if(G.membres.length<2){alert(t('erreurMembres'));return}
  DEFI={ordre:melanger(G.membres.map(m=>m.id)),i:0,scores:{},rep:[],base:melanger(G.questions).concat(melanger(LECONS.flatMap(l=>questionsDe(l.id))))};
  relais();
}
function relais(){
  const m=membre(DEFI.ordre[DEFI.i]);
  $('e-relais').innerHTML=`<div style="padding-top:60px;text-align:center">${avatar(m,'grand')}
    <div class="surtitre" style="justify-content:center;margin-top:24px">${ic('telephone','sm')} ${t('passeTel')}</div>
    <h1 style="margin-top:8px">${esc(t('auTour',{n:m.nom}))}</h1><p class="doux" style="margin-top:10px">${t('cinqQ')}</p></div>
    <button class="btn" style="margin-top:40px" onclick="jouerTour()">${t('pret')}</button>`;
  aller('relais');
}
function jouerTour(){const id=DEFI.ordre[DEFI.i];lancerQuiz(DEFI.base.filter(q=>q.auteur!==id).slice(0,NB_DEFI),t('defi')+' · '+membre(id).nom,{mode:'defi',joueur:id})}
function finTour(){DEFI.scores[DEFI.ordre[DEFI.i]]=bonnes;DEFI.i++;if(DEFI.i<DEFI.ordre.length)relais();else classement()}
function classement(){
  const L=DEFI.ordre.map(id=>({m:membre(id),s:DEFI.scores[id]})).sort((a,b)=>b.s-a.s);
  $('e-classement').innerHTML=`<div class="heros" style="padding:0">${heros(110)}</div>
    <div class="surtitre" style="justify-content:center">${ic('trophee','sm')} ${t('defiTermine')}</div><h2 style="text-align:center">${t('classement')}</h2>
    <div class="carte">${L.map(x=>{const r=L.findIndex(y=>y.s===x.s)+1;return `<div class="membre" style="cursor:default">
      <span class="rang">${r}</span>${avatar(x.m)}<div class="nom">${esc(x.m.nom)}</div><b>${x.s} / ${NB_DEFI}</b></div>`}).join('')}</div>
    <button class="btn" onclick="bilanGroupe()">${t('voirBilanGroupe')}</button><button class="btn sec" onclick="correctionDefi()">${ic('check')} ${t('voirCorrection')}</button><button class="btn sec" onclick="ouvrirFamille()">${t('retourGroupe')}</button>`;
  aller('classement');pluie();
}
function correctionDefi(){ // chaque question jouée, une seule fois, avec la bonne réponse
  const vues=new Set(),L=DEFI.rep.filter(r=>!vues.has(r.q.q)&&vues.add(r.q.q)).map(r=>({q:r.q}));
  CORR=L;$('e-resultat').innerHTML=`<div class="surtitre">${ic('cible','sm')} ${t('defiTermine')}</div><h2>${t('voirCorrection')}</h2>`+blocCorrection(L)+
    `<div class="bas"><button class="btn" onclick="aller('classement')">${t('retour')}</button></div>`;
  aller('resultat');
}
function bilanGroupe(){
  const G=S.groupe;let h=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('graphe','sm')} ${t('bilanGroupe')}</div><h2>${esc(G.nom)}</h2><div class="carte">`,moys=[];
  Object.keys(CATS).forEach(k=>{
    const v=G.membres.map(m=>({m,p:pct(m.id,k)})).filter(x=>x.p!==null);
    const moy=v.length?Math.round(v.reduce((a,x)=>a+x.p,0)/v.length):null;if(moy!==null)moys.push({k,moy});
    const top=v.length?v.reduce((a,b)=>b.p>a.p?b:a):null;
    h+=barreCat(k,moy,top&&top.p>=50?esc(t('specialiste',{n:top.m.nom})):t('pasSpecialiste'))+`<div class="puces">${v.map(x=>`<span class="puce">${avatar(x.m)} ${x.p} %</span>`).join('')}</div>`;
  });
  h+='</div>';
  if(moys.length){const f=moys.reduce((a,b)=>b.moy<a.moy?b:a);
    h+=`<div class="carte"><div class="ligne-fort"><div class="pastille">${ic(CATS[f.k])}</div><div><div class="petit" style="margin:0">${t('aReviser')}</div><b>${nomCat(f.k)}</b></div></div></div>`;}
  $('e-bilan').innerHTML=h;aller('bilan');
}

/* ---------- Paramètres & documents ---------- */
const DOCS_LISTE=[['apropos','lune'],['methode','livre'],['cgu','parchemin'],['confidentialite','cadenas'],['mentions','repere'],['reglement','trophee'],['credits','plume']];
function ouvrirParametres(section){
  $('e-parametres').innerHTML=boutonRetour("aller('accueil')")+`<div class="surtitre">${ic('reglages','sm')} ${NOM_APP}</div><h2>${t('parametres')}</h2>
    <div class="carte"><h3 class="titre-carte">${t('profil')}</h3>
      <label for="p-prenom">${t('prenom')}</label>
      <div class="rangee"><input id="p-prenom" value="${esc(S.prenom)}" maxlength="20" placeholder="${t('prenom')}" autocomplete="off">
      <button class="btn mini" id="p-ok" onclick="enregistrerPrenom()">${t('enregistrer')}</button></div>
      <label>${t('langue')}</label>${selecteurLangue()}
      <label>${t('th_titre')}</label><div class="themes-grille" id="choix-theme" role="radiogroup" aria-label="${t('th_titre')}">${THEME.noms.map(k=>{const [a,b]=THEME.VUE[k]||['',''];return `<button role="radio" aria-checked="${THEME.lire()===k}" data-th="${k}" onclick="choisirTheme('${k}')"><span class="th-rond" style="background:${k==='auto'?'linear-gradient(120deg,#f1e6da 50%,#2d1832 50%)':a}"><i style="background:${k==='auto'?'#c98f5a':b}"></i></span><small>${t('th_'+k)}</small></button>`}).join('')}</div><p class="petit">${t('th_info')}</p></div>
    <div class="carte"><h3 class="titre-carte">${t('informations')}</h3>${DOCS_LISTE.map(([k,i])=>`<div class="ligne-theme" onclick="ouvrirDoc('${k}')">
      <div class="pastille">${ic(i)}</div><div class="milieu"><b>${t('doc_'+k)}</b></div>${ic('droite','sm')}</div>`).join('')}</div>
    ${carteEspaceImam()}
    <div class="carte"><h3 class="titre-carte">${t('progression')}</h3><p class="petit">${t('reinitInfo')}</p>
      <button class="btn danger" onclick="reinitialiser()">${t('reinit')}</button></div>
    <p class="pied">${NOM_APP} · ${t('version',{v:VERSION_APP})}<br>JINA Studios</p>`;
  $('p-prenom').addEventListener('keydown',e=>{if(e.key==='Enter')enregistrerPrenom()});
  aller('parametres');
  if(section)setTimeout(()=>{const e=$('p-'+section);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})},60);
}
function choisirTheme(k){THEME.choisir(k);vibrer(12);document.querySelectorAll('#choix-theme button').forEach(b=>b.setAttribute('aria-checked',b.dataset.th===k))}
function enregistrerPrenom(){
  S.prenom=$('p-prenom').value.trim();
  if(S.groupe){const m=S.groupe.membres.find(x=>x.id==='moi');if(m&&S.prenom)m.nom=S.prenom}
  sauver();const b=$('p-ok');b.innerHTML=ic('check','sm')+' '+t('enregistre');setTimeout(()=>{if(b.isConnected)b.textContent=t('enregistrer')},1600);
}
function reinitialiser(){
  if(!confirm(t('reinitConfirm')))return;
  Object.assign(S,{lecons:{},ram:{},points:0,serie:0,dernier:null,revision:null,stats:{},datesLecons:{},hebdo:null});
  sauver();aller('accueil');
}
function ouvrirDoc(k){
  const D=(DOCS_LG[S.langue]||{})[k]||DOCS[k],trad=S.langue!=='fr'&&!!(DOCS_LG[S.langue]||{})[k],coran=Object.entries(TRADUCTEURS_CORAN).map(([l,n])=>(LANGUES.find(x=>x.code===l)||{nom:l}).nom+' — '+n).join(' ; ');
  $('e-doc').innerHTML=boutonRetour('ouvrirParametres()')+`<div class="doc"><div class="surtitre">${ic('parchemin','sm')} ${t('informations')}</div>
    <h2>${esc(D.titre.replace(/\{APP\}/g,NOM_APP))}</h2><p class="maj">${t('majLe',{d:dateLoc(D.maj)})}</p>
    ${S.langue==='fr'?'':trad?`<p class="avis">${t('aRelire')}</p>`:`<p class="avis">${t('docFr')}</p>`}<div class="frise"></div>
    ${D.sections.map(s=>(s.h?`<h3>${esc(s.h)}</h3>`:'')+s.p.map(p=>`<p>${esc(p.replace('{CORAN}',coran).replace(/\{APP\}/g,NOM_APP))}</p>`).join('')).join('')}</div>`;
  if(k==='credits')$('e-doc').insertAdjacentHTML('beforeend',`<div class="carte"><h3>${esc(t('pf_credits'))}</h3>${FONDS.map(z=>{const c=FOND_CREDITS[z[0]],l=c[1].startsWith('CC0')?'https://creativecommons.org/publicdomain/zero/1.0/':'https://creativecommons.org/licenses/by/'+c[1].split(' ')[2]+'/';
    return `<p class="petit">${esc(S.langue==='fr'?z[2]:z[3])} — <a href="${esc(c[2])}" target="_blank" rel="noopener">${esc(c[0])}</a>, <a href="${l}" target="_blank" rel="noopener">${esc(c[1])}</a></p>`}).join('')}</div>`);
  aller('doc');
}

/* ---------- Barre d'onglets (en bas) ---------- */
const ONGLETS=[['accueil','maison',"aller('accueil')"],['invocations','doua','ouvrirInvocations()'],['decouvrir','decouvrir','retourFil()'],
  ['qibla','boussole','ouvrirQibla()'],['famille','famille','ouvrirFamille()']];   // 2026-11-23 : Découvrir au centre, le calendrier s'ouvre depuis le bandeau
function dessinerOnglets(){
  $('onglets').innerHTML=ONGLETS.map(([k,i,a])=>`<button class="onglet" data-o="${k}" onclick="${a}">${ic(i)}<span>${t('tab_'+k)}</span></button>`).join('');
}
function majOnglets(nom){
  const vis=ONGLETS.some(o=>o[0]===nom);
  document.body.classList.toggle('avec-onglets',vis);
  document.querySelectorAll('.onglet').forEach(b=>b.classList.toggle('actif',b.dataset.o===nom));
}

/* ---------- Bandeau du jour (accueil) ---------- */
function dateHijriAr(){try{return hijriTexte(new Date(),{arabes:true},'ar')}catch(e){return ''}}
function infosDuJour(){
  const auj=aujourdhui(),enCours=evenements().filter(e=>e.d<=auj&&e.fin>=auj);
  const L=enCours.map(e=>({ic:e.f.ic,txt:t('cal_'+e.f.id),tag:t('tag_'+e.f.type)}));
  const j=auj.getDay(),sansJeune=enCours.some(e=>['ramadan','fete','interdit'].includes(e.f.type)||e.f.id==='ramadan');
  if((j===1||j===4)&&!sansJeune)L.push({ic:'etoile',txt:t(j===1?'jourLundi':'jourJeudi'),tag:t('tag_jeune')});
  if(j===5)L.push({ic:'mosquee',txt:t('cal_jumua'),tag:''});
  return L;
}
function bandeau(){
  const L=infosDuJour(),P=L.length?null:prochaineFete();
  const info=L.length?L.map(x=>`<span class="bd-pilule">${ic(x.ic,'sm')} <b>${t('auj')}</b> · ${x.txt}${x.tag?` <em>${x.tag}</em>`:''}</span>`).join('')
    :P?`<span class="bd-pilule">${ic(P.f.ic,'sm')} ${t('calProchain')} : <b>${t('cal_'+P.f.id)}</b> · ${quand(P).toLowerCase()}</span>`:'';
  return `<div class="bandeau" id="bandeau" onclick="ouvrirCalendrier()" role="button" aria-label="${t('calendrier')}">
    <div class="bd-haut"><span>${ic('calendrier','sm')} ${esc(dateGreg())}</span>${ic('droite','sm')}</div>
    <div class="bd-hijri"><span class="or">${esc(dateHijri())}</span>${S.langue!=='ar'?`<span class="bd-ar" lang="ar" dir="rtl">${esc(dateHijriAr())}</span>`:''}</div>
    ${info?`<div class="bd-info">${info}</div>`:''}</div>`;
}

/* ---------- Qibla ---------- */
const KAABA=[21.4225,39.8262];
const VILLES=[['Paris',48.857,2.352],['Grenoble',45.188,5.725],['Lyon',45.764,4.836],['Marseille',43.297,5.37],['Lille',50.629,3.057],['Toulouse',43.605,1.444],['Strasbourg',48.573,7.752],
  ['Bruxelles',50.85,4.352],['Genève',46.204,6.143],['Londres',51.507,-0.128],['Amsterdam',52.368,4.904],['Berlin',52.52,13.405],['Madrid',40.417,-3.704],
  ['Rome',41.903,12.496],['Istanbul',41.008,28.978],['Alger',36.754,3.059],['Casablanca',33.573,-7.59],['Tunis',36.807,10.182],['Dakar',14.717,-17.468],
  ['Le Caire',30.044,31.236,'v_caire'],['Jakarta',-6.209,106.846],['Montréal',45.502,-73.567],['New York',40.713,-74.006]];
const rad=x=>x*Math.PI/180,deg=x=>x*180/Math.PI;
function directionQibla(lat,lon){ // cap initial du grand cercle vers la Kaaba, en degrés depuis le nord
  const [p2,l2]=[rad(KAABA[0]),rad(KAABA[1])],p1=rad(lat),dl=l2-rad(lon);
  return (deg(Math.atan2(Math.sin(dl)*Math.cos(p2),Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl)))+360)%360;
}
function distanceKaaba(lat,lon){const p1=rad(lat),p2=rad(KAABA[0]),a=Math.sin((p2-p1)/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(rad(KAABA[1]-lon)/2)**2;return Math.round(6371*2*Math.asin(Math.sqrt(a)))}
function nomDir(d){const L=I18N[S.langue].dirs||I18N.fr.dirs;return L[Math.round(d/45)%8]}
let CAP=null,ALIGNE=false,ECOUTE=false;
/* Styles de boussole au choix (S.qibla) ; la couleur d'accent passe par la variable CSS --qa */
const QSTYLES=['classique','calligraphie','arabesque','mihrab','nuit','zellige','etoile','aiguille','minimal'];
let NSVG=0;   // identifiants uniques des tracés de texte (plusieurs cadrans sur la page)
const QCOULEURS={or:'var(--q-or)',emeraude:'var(--q-em)',argent:'var(--q-ar)',rose:'var(--q-ro)',azur:'var(--q-az)'};
function reglageQibla(){return Object.assign({style:'classique',couleur:'or'},S.qibla||{})}
function marqueKaaba(y,r=19){return `<g transform="translate(${150-r+3} ${y-r+3})"><circle cx="${r-3}" cy="${r-3}" r="${r}" class="kaaba-fond"/><svg x="${r-15}" y="${r-15}" width="24" height="24" viewBox="0 0 24 24" class="kaaba-ic">${ICONS.kaaba}</svg></g>`}
function graduations(r,pas,long,court){let g='';for(let a=0;a<360;a+=pas){const l=a%90===0?long:a%30===0?long*.65:court;
  g+=`<line x1="150" y1="${150-r}" x2="150" y2="${150-r+l}" transform="rotate(${a} 150 150)" class="${a%90===0?'grad-fort':'grad'}"/>`}return g}
function cardinaux(y,cls=''){const C=I18N[S.langue].cardinaux||I18N.fr.cardinaux;
  return C.map((c,i)=>`<text x="150" y="${y}" transform="rotate(${i*90} 150 150)" text-anchor="middle" class="${i===0?'nord':''} ${cls}">${c}</text>`).join('')}
function cadranSVG(q,style){
  style=style||reglageQibla().style;let fond='',dir='';
  if(style==='etoile'){   // rose à 8 branches, motif islamique
    fond=`<circle cx="150" cy="150" r="142" class="anneau"/><circle cx="150" cy="150" r="134" class="anneau2"/>
      <rect x="68" y="68" width="164" height="164" class="etoile-g"/><rect x="68" y="68" width="164" height="164" transform="rotate(45 150 150)" class="etoile-g"/>
      <rect x="96" y="96" width="108" height="108" class="etoile-l"/><rect x="96" y="96" width="108" height="108" transform="rotate(45 150 150)" class="etoile-l"/>
      <circle cx="150" cy="150" r="40" class="anneau2"/>${[...Array(32).keys()].map(i=>`<circle cx="150" cy="${150-126}" r="${i%4?1.2:2.4}" transform="rotate(${i*11.25} 150 150)" class="point"/>`).join('')}${cardinaux(76,'petit-c')}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><polygon points="150,46 158,150 150,166 142,150" class="fleche"/>${marqueKaaba(30,17)}</g>`;
  }else if(style==='aiguille'){   // aiguille de boussole marine
    let nums='';for(let a=0;a<360;a+=30)nums+=`<text x="150" y="44" transform="rotate(${a} 150 150)" text-anchor="middle" class="num">${a}</text>`;
    fond=`<circle cx="150" cy="150" r="142" class="anneau"/>${graduations(140,5,12,6)}${nums}<circle cx="150" cy="150" r="100" class="anneau2"/>${cardinaux(78)}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><polygon points="150,58 163,150 137,150" class="fleche"/><polygon points="150,242 163,150 137,150" class="fleche-dos"/></g>
      <circle cx="150" cy="150" r="22" class="kaaba-fond"/><svg x="138" y="138" width="24" height="24" viewBox="0 0 24 24" class="kaaba-ic">${ICONS.kaaba}</svg>`;
  }else if(style==='minimal'){   // un cercle, un arc, la Kaaba
    fond=`<circle cx="150" cy="150" r="128" class="anneau-fin"/><circle cx="150" cy="18" r="4" class="nord-point"/>`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><path d="M${(150-128*Math.sin(rad(14))).toFixed(1)} ${(150-128*Math.cos(rad(14))).toFixed(1)} A128 128 0 0 1 ${(150+128*Math.sin(rad(14))).toFixed(1)} ${(150-128*Math.cos(rad(14))).toFixed(1)}" class="arc"/>
      <line x1="150" y1="150" x2="150" y2="62" class="rayon-plein"/>${marqueKaaba(64,22)}</g>`;
  }else if(style==='calligraphie'){   // anneau de dhikr en calligraphie arabe, lettres cardinales arabes
    const id='qc'+(NSVG++),dhikr='سُبْحَانَ ٱللَّٰهِ ۞ ٱلْحَمْدُ لِلَّٰهِ ۞ ٱللَّٰهُ أَكْبَرُ ۞ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ ۞ ';
    fond=`<circle cx="150" cy="150" r="144" class="anneau"/><circle cx="150" cy="150" r="111" class="anneau2"/><circle cx="150" cy="150" r="139" class="anneau2"/>
      <path id="${id}" d="M150 22 a128 128 0 1 1 -0.01 0" fill="none"/><text class="calli"><textPath href="#${id}">${dhikr+dhikr+dhikr}</textPath></text>
      ${['ش','ق','ج','غ'].map((c,i)=>`<text x="150" y="64" transform="rotate(${i*90} 150 150)" text-anchor="middle" class="calli-c ${i===0?'nord':''}">${c}</text>`).join('')}
      <text x="150" y="196" text-anchor="middle" class="calli-centre">ٱلْقِبْلَة</text>`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><path d="M150 52 C153 90 155 120 150 150 C145 120 147 90 150 52Z" class="fleche"/>${marqueKaaba(46,18)}</g>`;
  }else if(style==='arabesque'){   // étoile à 12 branches (girih) et couronne de losanges
    const pts=[...Array(24).keys()].map(i=>{const r=i%2?84:120,a=rad(i*15);return (150+r*Math.sin(a)).toFixed(1)+','+(150-r*Math.cos(a)).toFixed(1)}).join(' ');
    const pts2=[...Array(24).keys()].map(i=>{const r=i%2?58:80,a=rad(i*15+7.5);return (150+r*Math.sin(a)).toFixed(1)+','+(150-r*Math.cos(a)).toFixed(1)}).join(' ');
    fond=`<circle cx="150" cy="150" r="144" class="anneau"/>${[...Array(36).keys()].map(i=>`<polygon points="150,8 154,16 150,24 146,16" transform="rotate(${i*10} 150 150)" class="${i%9?'losange':'losange fort'}"/>`).join('')}
      <circle cx="150" cy="150" r="128" class="anneau2"/><polygon points="${pts}" class="etoile-g"/><polygon points="${pts2}" class="etoile-l"/>
      ${['ش','ق','ج','غ'].map((c,i)=>`<text x="150" y="${150-100}" transform="rotate(${i*90} 150 150)" text-anchor="middle" class="calli-c petit ${i===0?'nord':''}" dy="6">${c}</text>`).join('')}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><polygon points="150,40 157,150 150,160 143,150" class="fleche"/>${marqueKaaba(34,17)}</g>`;
  }else if(style==='mihrab'){   // petites niches de mihrab tout autour ; la Qibla dans un grand mihrab
    const niche=(y,h,w)=>`M${150-w} ${y+h} V${y+h*.45} Q${150-w} ${y+h*.12} 150 ${y} Q${150+w} ${y+h*.12} ${150+w} ${y+h*.45} V${y+h} Z`;
    fond=`<circle cx="150" cy="150" r="144" class="anneau"/>${[...Array(12).keys()].map(i=>`<path d="${niche(12,22,6)}" transform="rotate(${i*30} 150 150)" class="${i%3?'niche':'niche fort'}"/>`).join('')}
      <circle cx="150" cy="150" r="112" class="anneau2"/>${cardinaux(64,'petit-c')}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><path d="${niche(28,74,27)}" class="mihrab"/><svg x="138" y="62" width="24" height="24" viewBox="0 0 24 24" class="kaaba-ic">${ICONS.kaaba}</svg>
      <line x1="150" y1="102" x2="150" y2="150" class="rayon-plein"/></g>`;
  }else if(style==='nuit'){   // ciel de nuit : étoiles, croissant au nord
    let et='';for(let i=0;i<46;i++){const a=(i*137.5)%360,r=30+((i*53)%104);et+=`<circle cx="${(150+r*Math.sin(rad(a))).toFixed(1)}" cy="${(150-r*Math.cos(rad(a))).toFixed(1)}" r="${i%7?0.9:1.7}" class="etoile-ciel"/>`}
    fond=`<circle cx="150" cy="150" r="144" class="ciel-nuit"/>${et}<circle cx="150" cy="150" r="144" class="anneau-fin"/>
      <path d="M150 20 a11 11 0 1 0 9 17 a8.5 8.5 0 1 1 -9 -17Z" class="croissant"/>${graduations(140,30,8,8)}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><line x1="150" y1="150" x2="150" y2="64" class="rayon-lueur"/><line x1="150" y1="150" x2="150" y2="64" class="rayon-plein"/>${marqueKaaba(42,19)}</g>`;
  }else if(style==='zellige'){   // couronne de carreaux de zellige et étoile à 8 branches au centre
    const c8=[...Array(16).keys()].map(i=>{const r=i%2?16:30,a=rad(i*22.5);return (150+r*Math.sin(a)).toFixed(1)+','+(150-r*Math.cos(a)).toFixed(1)}).join(' ');
    fond=`<circle cx="150" cy="150" r="144" class="anneau"/>${[...Array(48).keys()].map(i=>`<polygon points="150,8 156,19 150,30 144,19" transform="rotate(${i*7.5} 150 150)" class="zel z${i%3}"/>`).join('')}
      <circle cx="150" cy="150" r="112" class="anneau2"/>${cardinaux(62,'petit-c')}<polygon points="${c8}" class="etoile-g"/>`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><line x1="150" y1="120" x2="150" y2="66" class="rayon"/>${marqueKaaba(46)}</g>`;
  }else{   // classique
    fond=`<circle cx="150" cy="150" r="140" class="anneau"/><circle cx="150" cy="150" r="104" class="anneau2"/>${graduations(132,10,14,5)}${cardinaux(56)}`;
    if(q!==null)dir=`<g transform="rotate(${q} 150 150)"><line x1="150" y1="150" x2="150" y2="62" class="rayon"/>${marqueKaaba(38)}</g>`;
  }
  return `<svg viewBox="0 0 300 300" class="cadran-svg s-${style}">${fond}${dir}<circle cx="150" cy="150" r="5" class="centre"/></svg>`;
}
function reglerQibla(k,v){S.qibla=Object.assign(reglageQibla(),{[k]:v});sauver();ouvrirQibla()}
/* 2026-11-20 : Qibla AUTOMATIQUE, sans réseau et sans rien saisir.
   1) Position immédiate : dernière position GPS gardée sur le téléphone, sinon position approchée d'après
      le fuseau horaire du téléphone (table ci-dessous, tirée de la base officielle des fuseaux, ~1-2° d'écart sur la Qibla).
   2) Le GPS du téléphone affine la position (il fonctionne sans internet : seuls les satellites servent).
   3) La boussole démarre seule à l'ouverture (sur iPhone, au premier toucher, car iOS l'exige). */
const TZ_POS=(()=>{const o={};'Europe/Andorra:42.5,1.52;Asia/Dubai:25.3,55.3;Asia/Kabul:34.52,69.2;America/Antigua:17.05,-61.8;America/Anguilla:18.2,-63.07;Europe/Tirane:41.33,19.83;Asia/Yerevan:40.18,44.5;Africa/Luanda:-8.8,13.23;Antarctica/McMurdo:-77.83,166.6;Antarctica/Casey:-66.28,110.52;Antarctica/Davis:-68.58,77.97;Antarctica/DumontDUrville:-66.67,140.02;Antarctica/Mawson:-67.6,62.88;Antarctica/Palmer:-64.8,-64.1;Antarctica/Rothera:-67.57,-68.13;Antarctica/Syowa:-69.01,39.59;Antarctica/Troll:-72.01,2.53;Antarctica/Vostok:-78.4,106.9;America/Argentina/Buenos_Aires:-34.6,-58.45;America/Argentina/Cordoba:-31.4,-64.18;America/Argentina/Salta:-24.78,-65.42;America/Argentina/Jujuy:-24.18,-65.3;America/Argentina/Tucuman:-26.82,-65.22;America/Argentina/Catamarca:-28.47,-65.78;America/Argentina/La_Rioja:-29.43,-66.85;America/Argentina/San_Juan:-31.53,-68.52;America/Argentina/Mendoza:-32.88,-68.82;America/Argentina/San_Luis:-33.32,-66.35;America/Argentina/Rio_Gallegos:-51.63,-69.22;America/Argentina/Ushuaia:-54.8,-68.3;Pacific/Pago_Pago:-14.27,-170.7;Europe/Vienna:48.22,16.33;Australia/Lord_Howe:-31.55,159.08;Antarctica/Macquarie:-54.5,158.95;Australia/Hobart:-42.88,147.32;Australia/Melbourne:-37.82,144.97;Australia/Sydney:-33.87,151.22;Australia/Broken_Hill:-31.95,141.45;Australia/Brisbane:-27.47,153.03;Australia/Lindeman:-20.27,149.0;Australia/Adelaide:-34.92,138.58;Australia/Darwin:-12.47,130.83;Australia/Perth:-31.95,115.85;Australia/Eucla:-31.72,128.87;America/Aruba:12.5,-69.97;Europe/Mariehamn:60.1,19.95;Asia/Baku:40.38,49.85;Europe/Sarajevo:43.87,18.42;America/Barbados:13.1,-59.62;Asia/Dhaka:23.72,90.42;Europe/Brussels:50.83,4.33;Africa/Ouagadougou:12.37,-1.52;Europe/Sofia:42.68,23.32;Asia/Bahrain:26.38,50.58;Africa/Bujumbura:-3.38,29.37;Africa/Porto-Novo:6.48,2.62;America/St_Barthelemy:17.88,-62.85;Atlantic/Bermuda:32.28,-64.77;Asia/Brunei:4.93,114.92;America/La_Paz:-16.5,-68.15;America/Kralendijk:12.15,-68.28;America/Noronha:-3.85,-32.42;America/Belem:-1.45,-48.48;America/Fortaleza:-3.72,-38.5;America/Recife:-8.05,-34.9;America/Araguaina:-7.2,-48.2;America/Maceio:-9.67,-35.72;America/Bahia:-12.98,-38.52;America/Sao_Paulo:-23.53,-46.62;America/Campo_Grande:-20.45,-54.62;America/Cuiaba:-15.58,-56.08;America/Santarem:-2.43,-54.87;America/Porto_Velho:-8.77,-63.9;America/Boa_Vista:2.82,-60.67;America/Manaus:-3.13,-60.02;America/Eirunepe:-6.67,-69.87;America/Rio_Branco:-9.97,-67.8;America/Nassau:25.08,-77.35;Asia/Thimphu:27.47,89.65;Africa/Gaborone:-24.65,25.92;Europe/Minsk:53.9,27.57;America/Belize:17.5,-88.2;America/St_Johns:47.57,-52.72;America/Halifax:44.65,-63.6;America/Glace_Bay:46.2,-59.95;America/Moncton:46.1,-64.78;America/Goose_Bay:53.33,-60.42;America/Blanc-Sablon:51.42,-57.12;America/Toronto:43.65,-79.38;America/Iqaluit:63.73,-68.47;America/Atikokan:48.76,-91.62;America/Winnipeg:49.88,-97.15;America/Resolute:74.7,-94.83;America/Rankin_Inlet:62.82,-92.08;America/Regina:50.4,-104.65;America/Swift_Current:50.28,-107.83;America/Edmonton:53.55,-113.47;America/Cambridge_Bay:69.11,-105.05;America/Inuvik:68.35,-133.72;America/Vancouver:49.27,-123.12;America/Creston:49.1,-116.52;America/Dawson_Creek:55.77,-120.23;America/Fort_Nelson:58.8,-122.7;America/Whitehorse:60.72,-135.05;America/Dawson:64.07,-139.42;Indian/Cocos:-12.17,96.92;Africa/Kinshasa:-4.3,15.3;Africa/Lubumbashi:-11.67,27.47;Africa/Bangui:4.37,18.58;Africa/Brazzaville:-4.27,15.28;Europe/Zurich:47.38,8.53;Africa/Abidjan:5.32,-4.03;Pacific/Rarotonga:-21.23,-159.77;America/Santiago:-33.45,-70.67;America/Coyhaique:-45.57,-72.07;America/Punta_Arenas:-53.15,-70.92;Pacific/Easter:-27.15,-109.43;Africa/Douala:4.05,9.7;Asia/Shanghai:31.23,121.47;Asia/Urumqi:43.8,87.58;America/Bogota:4.6,-74.08;America/Costa_Rica:9.93,-84.08;America/Havana:23.13,-82.37;Atlantic/Cape_Verde:14.92,-23.52;America/Curacao:12.18,-69.0;Indian/Christmas:-10.42,105.72;Asia/Nicosia:35.17,33.37;Asia/Famagusta:35.12,33.95;Europe/Prague:50.08,14.43;Europe/Berlin:52.5,13.37;Europe/Busingen:47.7,8.68;Africa/Djibouti:11.6,43.15;Europe/Copenhagen:55.67,12.58;America/Dominica:15.3,-61.4;America/Santo_Domingo:18.47,-69.9;Africa/Algiers:36.78,3.05;America/Guayaquil:-2.17,-79.83;Pacific/Galapagos:-0.9,-89.6;Europe/Tallinn:59.42,24.75;Africa/Cairo:30.05,31.25;Africa/El_Aaiun:27.15,-13.2;Africa/Asmara:15.33,38.88;Europe/Madrid:40.4,-3.68;Africa/Ceuta:35.88,-5.32;Atlantic/Canary:28.1,-15.4;Africa/Addis_Ababa:9.03,38.7;Europe/Helsinki:60.17,24.97;Pacific/Fiji:-18.13,178.42;Atlantic/Stanley:-51.7,-57.85;Pacific/Chuuk:7.42,151.78;Pacific/Pohnpei:6.97,158.22;Pacific/Kosrae:5.32,162.98;Atlantic/Faroe:62.02,-6.77;Europe/Paris:48.87,2.33;Africa/Libreville:0.38,9.45;Europe/London:51.51,-0.13;America/Grenada:12.05,-61.75;Asia/Tbilisi:41.72,44.82;America/Cayenne:4.93,-52.33;Europe/Guernsey:49.45,-2.54;Africa/Accra:5.55,-0.22;Europe/Gibraltar:36.13,-5.35;America/Nuuk:64.18,-51.73;America/Danmarkshavn:76.77,-18.67;America/Scoresbysund:70.48,-21.97;America/Thule:76.57,-68.78;Africa/Banjul:13.47,-16.65;Africa/Conakry:9.52,-13.72;America/Guadeloupe:16.23,-61.53;Africa/Malabo:3.75,8.78;Europe/Athens:37.97,23.72;Atlantic/South_Georgia:-54.27,-36.53;America/Guatemala:14.63,-90.52;Pacific/Guam:13.47,144.75;Africa/Bissau:11.85,-15.58;America/Guyana:6.8,-58.17;Asia/Hong_Kong:22.28,114.15;America/Tegucigalpa:14.1,-87.22;Europe/Zagreb:45.8,15.97;America/Port-au-Prince:18.53,-72.33;Europe/Budapest:47.5,19.08;Asia/Jakarta:-6.17,106.8;Asia/Pontianak:-0.03,109.33;Asia/Makassar:-5.12,119.4;Asia/Jayapura:-2.53,140.7;Europe/Dublin:53.33,-6.25;Asia/Jerusalem:31.78,35.22;Europe/Isle_of_Man:54.15,-4.47;Asia/Kolkata:22.53,88.37;Indian/Chagos:-7.33,72.42;Asia/Baghdad:33.35,44.42;Asia/Tehran:35.67,51.43;Atlantic/Reykjavik:64.15,-21.85;Europe/Rome:41.9,12.48;Europe/Jersey:49.18,-2.11;America/Jamaica:17.97,-76.79;Asia/Amman:31.95,35.93;Asia/Tokyo:35.65,139.74;Africa/Nairobi:-1.28,36.82;Asia/Bishkek:42.9,74.6;Asia/Phnom_Penh:11.55,104.92;Pacific/Tarawa:1.42,173.0;Pacific/Kanton:-2.78,-171.72;Pacific/Kiritimati:1.87,-157.33;Indian/Comoro:-11.68,43.27;America/St_Kitts:17.3,-62.72;Asia/Pyongyang:39.02,125.75;Asia/Seoul:37.55,126.97;Asia/Kuwait:29.33,47.98;America/Cayman:19.3,-81.38;Asia/Almaty:43.25,76.95;Asia/Qyzylorda:44.8,65.47;Asia/Qostanay:53.2,63.62;Asia/Aqtobe:50.28,57.17;Asia/Aqtau:44.52,50.27;Asia/Atyrau:47.12,51.93;Asia/Oral:51.22,51.35;Asia/Vientiane:17.97,102.6;Asia/Beirut:33.88,35.5;America/St_Lucia:14.02,-61.0;Europe/Vaduz:47.15,9.52;Asia/Colombo:6.93,79.85;Africa/Monrovia:6.3,-10.78;Africa/Maseru:-29.47,27.5;Europe/Vilnius:54.68,25.32;Europe/Luxembourg:49.6,6.15;Europe/Riga:56.95,24.1;Africa/Tripoli:32.9,13.18;Africa/Casablanca:33.65,-7.58;Europe/Monaco:43.7,7.38;Europe/Chisinau:47.0,28.83;Europe/Podgorica:42.43,19.27;America/Marigot:18.07,-63.08;Indian/Antananarivo:-18.92,47.52;Pacific/Majuro:7.15,171.2;Pacific/Kwajalein:9.08,167.33;Europe/Skopje:41.98,21.43;Africa/Bamako:12.65,-8.0;Asia/Yangon:16.78,96.17;Asia/Ulaanbaatar:47.92,106.88;Asia/Hovd:48.02,91.65;Asia/Macau:22.2,113.54;Pacific/Saipan:15.2,145.75;America/Martinique:14.6,-61.08;Africa/Nouakchott:18.1,-15.95;America/Montserrat:16.72,-62.22;Europe/Malta:35.9,14.52;Indian/Mauritius:-20.17,57.5;Indian/Maldives:4.17,73.5;Africa/Blantyre:-15.78,35.0;America/Mexico_City:19.4,-99.15;America/Cancun:21.08,-86.77;America/Merida:20.97,-89.62;America/Monterrey:25.67,-100.32;America/Matamoros:25.83,-97.5;America/Chihuahua:28.63,-106.08;America/Ciudad_Juarez:31.73,-106.48;America/Ojinaga:29.57,-104.42;America/Mazatlan:23.22,-106.42;America/Bahia_Banderas:20.8,-105.25;America/Hermosillo:29.07,-110.97;America/Tijuana:32.53,-117.02;Asia/Kuala_Lumpur:3.17,101.7;Asia/Kuching:1.55,110.33;Africa/Maputo:-25.97,32.58;Africa/Windhoek:-22.57,17.1;Pacific/Noumea:-22.27,166.45;Africa/Niamey:13.52,2.12;Pacific/Norfolk:-29.05,167.97;Africa/Lagos:6.45,3.4;America/Managua:12.15,-86.28;Europe/Amsterdam:52.37,4.9;Europe/Oslo:59.92,10.75;Asia/Kathmandu:27.72,85.32;Pacific/Nauru:-0.52,166.92;Pacific/Niue:-19.02,-169.92;Pacific/Auckland:-36.87,174.77;Pacific/Chatham:-43.95,-176.55;Asia/Muscat:23.6,58.58;America/Panama:8.97,-79.53;America/Lima:-12.05,-77.05;Pacific/Tahiti:-17.53,-149.57;Pacific/Marquesas:-9.0,-139.5;Pacific/Gambier:-23.13,-134.95;Pacific/Port_Moresby:-9.5,147.17;Pacific/Bougainville:-6.22,155.57;Asia/Manila:14.59,120.97;Asia/Karachi:24.87,67.05;Europe/Warsaw:52.25,21.0;America/Miquelon:47.05,-56.33;Pacific/Pitcairn:-25.07,-130.08;America/Puerto_Rico:18.47,-66.11;Asia/Gaza:31.5,34.47;Asia/Hebron:31.53,35.09;Europe/Lisbon:38.72,-9.13;Atlantic/Madeira:32.63,-16.9;Atlantic/Azores:37.73,-25.67;Pacific/Palau:7.33,134.48;America/Asuncion:-25.27,-57.67;Asia/Qatar:25.28,51.53;Indian/Reunion:-20.87,55.47;Europe/Bucharest:44.43,26.1;Europe/Belgrade:44.83,20.5;Europe/Kaliningrad:54.72,20.5;Europe/Moscow:55.76,37.62;Europe/Simferopol:44.95,34.1;Europe/Kirov:58.6,49.65;Europe/Volgograd:48.73,44.42;Europe/Astrakhan:46.35,48.05;Europe/Saratov:51.57,46.03;Europe/Ulyanovsk:54.33,48.4;Europe/Samara:53.2,50.15;Asia/Yekaterinburg:56.85,60.6;Asia/Omsk:55.0,73.4;Asia/Novosibirsk:55.03,82.92;Asia/Barnaul:53.37,83.75;Asia/Tomsk:56.5,84.97;Asia/Novokuznetsk:53.75,87.12;Asia/Krasnoyarsk:56.02,92.83;Asia/Irkutsk:52.27,104.33;Asia/Chita:52.05,113.47;Asia/Yakutsk:62.0,129.67;Asia/Khandyga:62.66,135.55;Asia/Vladivostok:43.17,131.93;Asia/Ust-Nera:64.56,143.23;Asia/Magadan:59.57,150.8;Asia/Sakhalin:46.97,142.7;Asia/Srednekolymsk:67.47,153.72;Asia/Kamchatka:53.02,158.65;Asia/Anadyr:64.75,177.48;Africa/Kigali:-1.95,30.07;Asia/Riyadh:24.63,46.72;Pacific/Guadalcanal:-9.53,160.2;Indian/Mahe:-4.67,55.47;Africa/Khartoum:15.6,32.53;Europe/Stockholm:59.33,18.05;Asia/Singapore:1.28,103.85;Atlantic/St_Helena:-15.92,-5.7;Europe/Ljubljana:46.05,14.52;Arctic/Longyearbyen:78.0,16.0;Europe/Bratislava:48.15,17.12;Africa/Freetown:8.5,-13.25;Europe/San_Marino:43.92,12.47;Africa/Dakar:14.67,-17.43;Africa/Mogadishu:2.07,45.37;America/Paramaribo:5.83,-55.17;Africa/Juba:4.85,31.62;Africa/Sao_Tome:0.33,6.73;America/El_Salvador:13.7,-89.2;America/Lower_Princes:18.05,-63.05;Asia/Damascus:33.5,36.3;Africa/Mbabane:-26.3,31.1;America/Grand_Turk:21.47,-71.13;Africa/Ndjamena:12.12,15.05;Indian/Kerguelen:-49.35,70.22;Africa/Lome:6.13,1.22;Asia/Bangkok:13.75,100.52;Asia/Dushanbe:38.58,68.8;Pacific/Fakaofo:-9.37,-171.23;Asia/Dili:-8.55,125.58;Asia/Ashgabat:37.95,58.38;Africa/Tunis:36.8,10.18;Pacific/Tongatapu:-21.13,-175.2;Europe/Istanbul:41.02,28.97;America/Port_of_Spain:10.65,-61.52;Pacific/Funafuti:-8.52,179.22;Asia/Taipei:25.05,121.5;Africa/Dar_es_Salaam:-6.8,39.28;Europe/Kyiv:50.43,30.52;Africa/Kampala:0.32,32.42;Pacific/Midway:28.22,-177.37;Pacific/Wake:19.28,166.62;America/New_York:40.71,-74.01;America/Detroit:42.33,-83.05;America/Kentucky/Louisville:38.25,-85.76;America/Kentucky/Monticello:36.83,-84.85;America/Indiana/Indianapolis:39.77,-86.16;America/Indiana/Vincennes:38.68,-87.53;America/Indiana/Winamac:41.05,-86.6;America/Indiana/Marengo:38.38,-86.34;America/Indiana/Petersburg:38.49,-87.28;America/Indiana/Vevay:38.75,-85.07;America/Chicago:41.85,-87.65;America/Indiana/Tell_City:37.95,-86.76;America/Indiana/Knox:41.3,-86.62;America/Menominee:45.11,-87.61;America/North_Dakota/Center:47.12,-101.3;America/North_Dakota/New_Salem:46.84,-101.41;America/North_Dakota/Beulah:47.26,-101.78;America/Denver:39.74,-104.98;America/Boise:43.61,-116.2;America/Phoenix:33.45,-112.07;America/Los_Angeles:34.05,-118.24;America/Anchorage:61.22,-149.9;America/Juneau:58.3,-134.42;America/Sitka:57.18,-135.3;America/Metlakatla:55.13,-131.58;America/Yakutat:59.55,-139.73;America/Nome:64.5,-165.41;America/Adak:51.88,-176.66;Pacific/Honolulu:21.31,-157.86;America/Montevideo:-34.91,-56.21;Asia/Samarkand:39.67,66.8;Asia/Tashkent:41.33,69.3;Europe/Vatican:41.9,12.45;America/St_Vincent:13.15,-61.23;America/Caracas:10.5,-66.93;America/Tortola:18.45,-64.62;America/St_Thomas:18.35,-64.93;Asia/Ho_Chi_Minh:10.75,106.67;Pacific/Efate:-17.67,168.42;Pacific/Wallis:-13.3,-176.17;Pacific/Apia:-13.83,-171.73;Asia/Aden:12.75,45.2;Indian/Mayotte:-12.78,45.23;Africa/Johannesburg:-26.25,28.0;Africa/Lusaka:-15.42,28.28;Africa/Harare:-17.83,31.05;Asia/Calcutta:22.53,88.37;Asia/Saigon:10.75,106.67;Asia/Katmandu:27.72,85.32;Asia/Rangoon:16.78,96.17;Europe/Kiev:50.43,30.52;America/Buenos_Aires:-34.6,-58.45;Atlantic/Faeroe:62.02,-6.77;Pacific/Ponape:6.97,158.22;Pacific/Truk:7.42,151.78;Africa/Asmera:15.33,38.88;Asia/Ulan_Bator:47.92,106.88;America/Godthab:64.18,-51.73'.split(';').forEach(x=>{const [k,v]=x.split(':');const [a,b]=v.split(',');o[k]=[+a,+b]});return o})();
function lieuFuseau(){
  try{const z=Intl.DateTimeFormat().resolvedOptions().timeZone,p=TZ_POS[z];
    if(p)return {lat:p[0],lon:p[1],nom:z.split('/').pop().replace(/_/g,' '),approx:true}}catch(e){}
  return null;
}
function lieuQibla(){return S.lieu&&S.lieu.gps?S.lieu:(S.lieu||lieuFuseau()||null)}   // GPS > ancienne ville choisie > fuseau horaire
let GEO_ID=null,GEO_FIN=null,GPS_ECHEC=false;
/* Avant de prier : rappel de l'invocation d'après les ablutions (texte complet, phonétique et source dans sa page) */
function rappelAblutions(){
  const d=listeInv().find(x=>x.id==='wudu');if(!d)return '';
  return `<button class="q-wudu" id="q-wudu" onclick="INV_RETOUR='ouvrirQibla()';ouvrirInvocation('wudu')"><span class="pastille">${ic(ICONE_INV.wudu||'doua')}</span><span class="milieu"><b>${esc(d.titre)}</b><small>${t('q_wudu')}</small></span>${ic('droite','sm')}</button>`;
}
function ouvrirQibla(){
  const L=lieuQibla(),q=L?directionQibla(L.lat,L.lon):null,RQ=reglageQibla();
  // Mise en page inspirée des applis de prière : infos en haut, boussole, consigne, styles à faire glisser en bas (sans défiler)
  $('e-qibla').innerHTML=`<div class="q-ecran" style="--qa:${QCOULEURS[RQ.couleur]}">
    <div class="q-tete"><div class="surtitre" onclick="tapDiag()">${ic('boussole','sm')} ${t('tab_qibla')}</div></div>
    <pre class="q-diag" id="q-diag" hidden></pre>
    <div class="q-puces" id="q-info">${infoQibla(L,q)}</div>
    ${rappelAblutions()}
    <div class="boussole-zone" id="q-zone"><div class="repere-haut"></div><div class="cadran" id="cadran">${cadranSVG(q)}</div></div>
    <p class="q-etat" id="q-etat">${CAP===null?'':t('tourne')}</p>
    <div class="q-bas"><div class="q-styles" id="q-styles">${QSTYLES.map(st=>`<button class="style-q ${st===RQ.style?'sel':''}" data-st="${st}" onclick="choisirStyleQ('${st}')" aria-label="${t('qs_'+st)}">
      <span class="vignette">${cadranSVG(135,st)}</span><span class="nom">${t('qs_'+st)}</span></button>`).join('')}</div>
    <div class="q-couleurs">${Object.entries(QCOULEURS).map(([k,c])=>`<button class="${k===RQ.couleur?'sel':''}" data-c="${k}" style="background:${c}" aria-label="${t('coul_'+k)}" onclick="choisirCouleurQ('${k}')"></button>`).join('')}</div></div>
    </div>`;
  aller('qibla');tailleQibla();
  const sel=document.querySelector('#q-styles .sel');if(sel){const z=$('q-styles');z.scrollLeft=sel.offsetLeft-(z.clientWidth-sel.clientWidth)/2}
  ETAT_Q='';PREC_AFF='';majDeclinaison();activerBoussole();suivreGPS();majBoussole();
  // toujours pas de mesure : soit le téléphone exige un toucher (iPhone), soit il n'a pas de boussole
  setTimeout(()=>{const e=$('q-etat');if(e&&CAP===null){e.textContent=t(BOUSSOLE_TOUCHER?'qToucher':'sansCapteur');e.classList.add('long')}},2500);
}
/* Changer de style ou de couleur SANS recharger l'écran (la boussole et la rangée de styles restent en place) */
function choisirStyleQ(st){
  S.qibla=Object.assign(reglageQibla(),{style:st});sauver();
  const L=lieuQibla(),c=$('cadran');if(c)c.innerHTML=cadranSVG(L?directionQibla(L.lat,L.lon):null);ETAT_Q='';majBoussole();
  document.querySelectorAll('#q-styles .style-q').forEach(b=>b.classList.toggle('sel',b.dataset.st===st));vibrer(10);
}
function choisirCouleurQ(k){
  S.qibla=Object.assign(reglageQibla(),{couleur:k});sauver();
  const z=document.querySelector('.q-ecran');if(z)z.style.setProperty('--qa',QCOULEURS[k]);
  document.querySelectorAll('.q-couleurs button').forEach(b=>b.classList.toggle('sel',b.dataset.c===k));
}
function reglerQibla(k,v){k==='style'?choisirStyleQ(v):choisirCouleurQ(v)}
/* Écran Qibla VERROUILLÉ : il occupe exactement l'espace entre le haut et la barre d'onglets, sans défilement ;
   la boussole prend la place restante. Rien ne peut monter ni descendre, quelle que soit la façon de tenir le téléphone. */
function tailleQibla(){
  const e=$('e-qibla'),o=$('onglets'),z=$('q-zone'),c=$('cadran');if(!e||!z||!c)return;
  e.style.bottom=(o?o.offsetHeight:0)+'px';
  const tz=Math.max(120,Math.min(z.clientWidth*0.9,z.clientHeight-22,380));
  c.style.width=c.style.height=Math.floor(tz)+'px';
}
window.addEventListener('resize',()=>{if($('e-qibla')&&$('e-qibla').classList.contains('actif'))tailleQibla()});
let TAPS=0,TAP_T=0,DIAG_T=0;
function tapDiag(){const n=Date.now();TAPS=n-TAP_T<600?TAPS+1:1;TAP_T=n;if(TAPS>=5){TAPS=0;const d=$('q-diag');if(d){d.hidden=!d.hidden;majDiag(true)}}}
function majDiag(force){
  const d=$('q-diag');if(!d||d.hidden)return;const n=Date.now();if(!force&&n-DIAG_T<300)return;DIAG_T=n;
  const L=lieuQibla(),f=x=>typeof x==='number'?x.toFixed(1):x;
  d.textContent=DIAG?Object.entries(DIAG).map(([k,v])=>k+': '+f(v)).join('  ')+`\naffiché: ${f(CAP)}  qibla: ${L?f(directionQibla(L.lat,L.lon)):'-'}  lieu: ${L?L.lat+','+L.lon:'-'}`:'aucune mesure du capteur';
}
function textePrecision(){
  if(CAP===null)return `${ic('boussole','sm')} ${t('qPrecAttente')}`;
  const cle=(NIVEAU>=0&&NIVEAU<=1)||PRECISION>20?'qPrecFaible':NIVEAU===2||PRECISION>10?'qPrecMoyenne':'qPrecBonne';
  return `${ic('boussole','sm')} ${t(cle)}`;
}
let PREC_AFF='';
function majPrecision(){const p=$('q-prec');if(!p)return;const h=textePrecision();if(h!==PREC_AFF){PREC_AFF=h;p.innerHTML=h}}
function infoQibla(L,q){
  if(!L)return `<span class="puce">${ic('repere','sm')} ${t('qPosCourt')}</span>`;
  const lieu=L.gps?t('maPositionNom'):L.nom+(L.approx?' ('+t('qEnviron')+')':'');
  return `<span class="puce">${ic('repere','sm')} ${esc(lieu)}</span>
    <span class="puce ${L.gps?'ok':''}">${ic(L.gps?'check':'chrono','sm')} ${t(L.gps?'qGpsCourt':GPS_ECHEC?'qSansGpsCourt':'qApproxCourt')}</span>
    <span class="puce">${ic('kaaba','sm')} ${Math.round(q)}° ${esc(nomDir(q))}</span>
    <span class="puce" id="q-prec">${textePrecision()}</span>
    <span class="puce discrete">${t('qiblaDist',{km:distanceKaaba(L.lat,L.lon).toLocaleString(S.langue)})}</span>`;
}
/** GPS en continu tant que l'écran Qibla est ouvert (2 min au plus) ; marche sans internet. */
function suivreGPS(){
  if(!navigator.geolocation||GEO_ID!==null)return;
  const stop=()=>{if(GEO_ID!==null)navigator.geolocation.clearWatch(GEO_ID);GEO_ID=null;clearTimeout(GEO_FIN)};
  GEO_ID=navigator.geolocation.watchPosition(p=>{
    if(!$('e-qibla').classList.contains('actif')){stop();return}
    const co=p.coords;if((co.latitude===0&&co.longitude===0)||!(co.accuracy<50000))return;   // position absurde ou trop imprécise : ignorée
    // arrondi à 0,01° (~1 km) : suffisant pour la Qibla, et plus discret
    S.lieu={lat:Math.round(p.coords.latitude*100)/100,lon:Math.round(p.coords.longitude*100)/100,gps:true,le:Date.now()};sauver();
    majDeclinaison();if(ECOUTE_NAT){const B=BOUSSOLE_NAT();if(B)B.demarrer({lat:S.lieu.lat,lon:S.lieu.lon}).catch(()=>{})}   // déclinaison du lieu exact
    const L=S.lieu,q=directionQibla(L.lat,L.lon);
    const c=$('cadran');if(c)c.innerHTML=cadranSVG(q);
    $('q-info').innerHTML=infoQibla(L,q);ETAT_Q='';majBoussole();
    if(p.coords.accuracy<2000)stop();
  },()=>{GPS_ECHEC=true;const L=lieuQibla(),z=$('q-info');if(z&&!(S.lieu&&S.lieu.gps))z.innerHTML=infoQibla(L,L?directionQibla(L.lat,L.lon):null);stop()},
  {enableHighAccuracy:true,timeout:60000,maximumAge:300000});
  GEO_FIN=setTimeout(stop,120000);
}
let BOUSSOLE_TOUCHER=false,EVT_BOUSSOLE=null,CIBLE=null,ROT=null,RAF=0,ETAT_Q='';
/* 2026-11-20 : boussole fluide sur TOUS les téléphones, y compris modestes.
   - un seul type d'événement écouté (« absolute » si le téléphone le connaît, sinon le classique) ;
   - le capteur ne fait que noter la mesure ; l'affichage se fait au plus une fois par image (requestAnimationFrame) ;
   - la mesure est lissée (le capteur tremble) et l'angle est « déroulé » : plus de tour complet en passant de 359° à 0° ;
   - pas de transition CSS (elle se relançait à chaque mesure et faisait saccader) ; texte et classes changés seulement si besoin ;
   - la boussole s'arrête dès qu'on quitte l'écran Qibla (batterie). */
/* Boussole native (Android) : module BoussolePlugin.java = capteur fusionné compensé en inclinaison, nord VRAI
   (déclinaison magnétique corrigée hors ligne), niveau de précision. Sinon : capteur du navigateur, compensé en inclinaison. */
const BOUSSOLE_NAT=()=>window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform()&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Boussole;
let ECOUTE_NAT=null,NIVEAU=-1,PRECISION=-1,DEBOUT=false,DIAG=null,DECL_WEB=0;
/** Déclinaison magnétique du lieu (WMM-2025, hors ligne) pour la boussole du navigateur, qui donne le nord MAGNÉTIQUE. */
function majDeclinaison(){const L=lieuQibla();try{DECL_WEB=L&&typeof declinaisonWMM==='function'?declinaisonWMM(L.lat,L.lon):0}catch(e){DECL_WEB=0}}
function activerBoussole(){
  const B=BOUSSOLE_NAT();
  if(B){
    if(ECOUTE_NAT)return;
    ECOUTE=true;ECOUTE_NAT=B.addListener('cap',d=>{NIVEAU=d.niveau;PRECISION=d.precision;DEBOUT=d.debout;CIBLE=d.cap;DIAG={src:'natif',...d};if(!RAF)RAF=requestAnimationFrame(anime)});
    const L=lieuQibla();B.demarrer(L?{lat:L.lat,lon:L.lon}:{}).catch(()=>{arreterBoussole();activerBoussoleWeb()});
    return;
  }
  activerBoussoleWeb();
}
function activerBoussoleWeb(){
  if(!ECOUTE){ECOUTE=true;EVT_BOUSSOLE='ondeviceorientationabsolute' in window?'deviceorientationabsolute':'deviceorientation';
    window.addEventListener(EVT_BOUSSOLE,orientation,{passive:true})}
  if(typeof DeviceOrientationEvent==='undefined'||typeof DeviceOrientationEvent.requestPermission!=='function')return;
  DeviceOrientationEvent.requestPermission().then(r=>{BOUSSOLE_TOUCHER=r!=='granted'}).catch(()=>{
    BOUSSOLE_TOUCHER=true;   // refusé sans toucher (iPhone) : on réessaie au premier toucher
    const z=$('e-qibla');if(z)z.addEventListener('click',()=>DeviceOrientationEvent.requestPermission().then(r=>{BOUSSOLE_TOUCHER=r!=='granted'}).catch(()=>{}),{once:true});
  });
}
function arreterBoussole(){
  if(ECOUTE_NAT){try{ECOUTE_NAT.remove();const B=BOUSSOLE_NAT();if(B)B.arreter()}catch(e){}ECOUTE_NAT=null}
  if(EVT_BOUSSOLE){window.removeEventListener(EVT_BOUSSOLE,orientation,{passive:true});EVT_BOUSSOLE=null}
  ECOUTE=false;cancelAnimationFrame(RAF);RAF=0;
}
/** Cap à partir des angles du navigateur : direction « devant » = horizontale et perpendiculaire à l'axe
    gauche-droite du téléphone (même formule que le module Android ; juste à plat, penché, debout, incliné de côté). */
function capDepuisAngles(alpha,beta,gamma){
  const a=rad(alpha),b=rad(beta||0),g=rad(gamma||0);
  const xE=Math.cos(a)*Math.cos(g)-Math.sin(a)*Math.sin(b)*Math.sin(g),   // axe X du téléphone dans le monde (Est, Nord)
        xN=Math.sin(a)*Math.cos(g)+Math.cos(a)*Math.sin(b)*Math.sin(g);
  if(Math.hypot(xE,xN)<0.25)return null;   // téléphone sur la tranche : direction indéfinie
  return ((deg(Math.atan2(-xN,xE)))%360+360)%360;
}
function orientation(e){
  let h=null;
  if(typeof e.webkitCompassHeading==='number'){h=e.webkitCompassHeading;PRECISION=typeof e.webkitCompassAccuracy==='number'?e.webkitCompassAccuracy:-1;DIAG={src:'iphone',magnetique:h,declinaison:DECL_WEB,precision:PRECISION}}   // iPhone (déjà compensé en inclinaison)
  else if((e.absolute||e.type==='deviceorientationabsolute')&&typeof e.alpha==='number'){h=capDepuisAngles(e.alpha,e.beta,e.gamma);DIAG={src:'web',a:e.alpha,b:e.beta,g:e.gamma}}   // Android navigateur
  if(h===null)return;
  h=(h+DECL_WEB+360)%360;   // nord magnétique → nord vrai
  if(DIAG)DIAG.cap=h;
  CIBLE=h;if(!RAF)RAF=requestAnimationFrame(anime);
}
function anime(){
  RAF=0;if(CIBLE===null)return;
  if(ROT===null)ROT=CIBLE;
  const d=((CIBLE-ROT)%360+540)%360-180;   // plus court chemin
  ROT+=Math.abs(d)<0.4?d:d*0.22;          // lissage
  CAP=((ROT%360)+360)%360;majBoussole();
  if(Math.abs(d)>=0.4)RAF=requestAnimationFrame(anime);   // continue tant que l'aiguille n'est pas arrivée
}
function majBoussole(){
  const c=$('cadran'),L=lieuQibla();if(!c||!L||!$('e-qibla').classList.contains('actif'))return;
  if(CAP===null){c.style.transform='';return}
  c.style.transform=`rotate(${(-ROT).toFixed(1)}deg)`;
  const q=directionQibla(L.lat,L.lon),delta=((q-CAP)%360+540)%360-180,ok=Math.abs(delta)<5;   // delta > 0 : la Qibla est à droite
  // SÉCURITÉ : capteur non étalonné (niveau 0-1) ou marge d'erreur > 20° → on demande l'étalonnage, on ne dit jamais « face à la Qibla »
  const peuFiable=(NIVEAU>=0&&NIVEAU<=1)||PRECISION>20;
  const etat=peuFiable?'qEtalonner':ok?'aligne':(delta>0?'qDroite':'qGauche'),okSur=ok&&!peuFiable;
  if(etat!==ETAT_Q){ETAT_Q=etat;c.parentNode.classList.toggle('aligne',okSur);c.parentNode.classList.toggle('a-etalonner',peuFiable);
    const e=$('q-etat');if(e){e.textContent=t(etat);e.classList.toggle('long',peuFiable)}
    if(okSur&&!ALIGNE)vibrer(60);ALIGNE=okSur}
  majPrecision();majDiag();
}

// Le bandeau se met à jour toutes les 30 s (date, informations du jour)
setInterval(()=>{const b=$('bandeau');if(b&&$('e-accueil').classList.contains('actif'))b.outerHTML=bandeau()},30000);
function rafraichirLieu(){if($('e-qibla').classList.contains('actif'))ouvrirQibla()}

/* ---------- Sélecteur de langue : globe + drapeau, liste déroulante ---------- */
function menuLangues(){
  return `<div class="langue-menu"><button class="langue compacte" onclick="basculerLangues(event)" aria-label="${t('langue')}">${ic('globe','sm')}${drapeau(S.langue)}</button>
    <div class="liste-langues">${LANGUES.map(l=>`<button class="${l.code===S.langue?'sel':''}" onclick="changerLangue('${l.code}')">${drapeau(l.code,22)}<span>${l.nom}</span>${l.code===S.langue?ic('check','sm'):''}</button>`).join('')}</div></div>`;
}
function basculerLangues(e){e.stopPropagation();const L=e.currentTarget.nextElementSibling,o=!L.classList.contains('ouvert');fermerLangues();L.classList.toggle('ouvert',o)}
function fermerLangues(){document.querySelectorAll('.liste-langues.ouvert').forEach(x=>x.classList.remove('ouvert'))}
document.addEventListener('click',fermerLangues);

/* ---------- Invocations : grille ou liste, recherche, favoris, page de détail avec compteur ---------- */
const ICONE_INV={reveil:'i_reveil',sommeil:'i_sommeil',manger:'i_manger',oubli_manger:'i_oubli',apres_repas:'i_repas',toilettes:'i_toilettes',sortir:'i_sortir',
  wudu:'i_wudu',mosquee_entree:'i_mosquee_in',mosquee_sortie:'i_mosquee_out',eternuement:'i_eternue',pluie:'i_pluie',rupture:'i_rupture',qadr:'i_qadr',
  istighfar:'doua',yunus:'i_poisson',detresse:'i_detresse',tasbih:'i_tasbih',c2_201:'i_monde',c2_127:'kaaba',c3_8:'i_coeur',c7_23:'i_arbre',
  c14_41:'famille',c17_24:'i_parents',c20_114:'i_science',c25_74:'i_foyer'};
const REPET={tasbih:100};
let RECH='',COMPTE={},LISTE_VUE=[];
function groupesInv(){return contenu().invocations||CONTENU.fr.invocations}
function listeInv(){return groupesInv().flatMap(g=>g.liste.map(d=>({...d,cat:g.cat})))}
function favoris(){return S.favInv||(S.favInv=[])}
function sansAccent(x){return String(x).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[ʿʾ'’]/g,'').toLowerCase()}
function sensDe(d){if(d.v){const v=QURAN[d.v.slice(2)];return v.tr[S.langue]||v.tr.en}return d.sens}
function ouvrirInvocations(){INV_RETOUR=null;   // 2026-11-23 : ouverte depuis Découvrir → le retour y ramène (INV_RETOUR)
  $('e-invocations').innerHTML=`<div class="tete-inv"><div><div class="surtitre">${ic('doua','sm')} ${t('tab_invocations')}</div><h2>${t('invTitre')}</h2></div>
      <button class="rond" onclick="S.vueInv=S.vueInv==='liste'?'grille':'liste';sauver();ouvrirInvocations()" aria-label="${t('changerVue')}">${ic(S.vueInv==='liste'?'grille':'liste')}</button></div>
    <label class="recherche">${ic('loupe','sm')}<input id="inv-q" type="search" placeholder="${t('rechercheInv')}" value="${esc(RECH)}" autocomplete="off" enterkeyhint="search"></label>
    ${S.langue==='fr'?'':!contenu().invocations?`<p class="avis">${t('docFr')}</p>`:`<p class="avis">${t('aRelire')}</p>`}<div id="inv-res"></div>`;
  $('inv-q').addEventListener('input',e=>{RECH=e.target.value;dessinerInv()});
  dessinerInv();aller('invocations');
}
function dessinerInv(){
  const L=listeInv(),q=sansAccent(RECH.trim()),sections=[];
  if(q){const R=L.filter(d=>sansAccent(d.titre+' '+sensDe(d)+' '+(d.ph||'')+' '+t('inv_cat_'+d.cat)).includes(q));sections.push([t('resultats',{n:R.length}),R])}
  else{const F=L.filter(d=>favoris().includes(d.id));if(F.length)sections.push([t('favoris'),F]);
    groupesInv().forEach(g=>sections.push([t('inv_cat_'+g.cat),L.filter(d=>d.cat===g.cat)]))}
  LISTE_VUE=sections.flatMap(s=>s[1]).filter((d,i,a)=>a.findIndex(x=>x.id===d.id)===i).map(d=>d.id);   // ordre suivi par les flèches
  $('inv-res').innerHTML=sections.map(([titre,R])=>`<h3 class="titre-groupe">${esc(titre)}</h3>`+
    (R.length?`<div class="${S.vueInv==='liste'?'inv-liste':'inv-grille'}">${R.map(tuileInv).join('')}</div>`:`<p class="doux" style="margin-top:8px">${t('aucunResultat')}</p>`)).join('');
}
function tuileInv(d){const fav=favoris().includes(d.id);
  return `<div class="tuile" role="button" tabindex="0" onclick="ouvrirInvocation('${d.id}')"><div class="tuile-ic">${ic(ICONE_INV[d.id]||'doua')}</div>
    <span class="tuile-titre">${esc(d.titre)}</span><button class="fav ${fav?'on':''}" onclick="event.stopPropagation();basculerFavori('${d.id}')" aria-label="${t('favori')}">${ic('etoile_v','sm')}</button></div>`}
function basculerFavori(id,detail){const F=favoris(),i=F.indexOf(id);i<0?F.push(id):F.splice(i,1);sauver();detail?ouvrirInvocation(id):dessinerInv()}
function refCourte(cle){const [ty,a,b]=cle.split(':');
  if(ty==='q'){const v=QURAN[a+':'+b];return v?t('coran')+' · '+t('refVerset',{nom:S.langue==='ar'?v.nom.ar:v.nom.lat,s:v.s,v:v.v}):''}
  if(ty==='h'){const h=HADITHS[a];return h?refsHadith(h.refs):''}return ''}
function rosace(){const p=(r1,r2)=>[...Array(16).keys()].map(i=>{const a=i*Math.PI/8,r=i%2?r2:r1;return (60+r*Math.sin(a)).toFixed(1)+','+(60-r*Math.cos(a)).toFixed(1)}).join(' ');
  return `<svg viewBox="0 0 120 120" class="rosace"><polygon points="${p(58,46)}"/><rect x="22" y="22" width="76" height="76"/><rect x="22" y="22" width="76" height="76" transform="rotate(45 60 60)"/><circle cx="60" cy="60" r="34"/></svg>`}
function ouvrirInvocation(id){
  if(!LISTE_VUE.includes(id))LISTE_VUE=listeInv().map(d=>d.id);
  const d=listeInv().find(x=>x.id===id),i=LISTE_VUE.indexOf(id),n=REPET[id]||1,c=COMPTE[id]||0,fav=favoris().includes(id);
  let ar,ph,credit;
  if(d.v){const v=QURAN[d.v.slice(2)];ar=v.ar;ph=S.langue==='tr'?v.tl.tr:v.tl.en;credit=t('tradCoran',{t:TRADUCTEURS_CORAN[S.langue]||TRADUCTEURS_CORAN.en})}
  else{ar=d.ar;ph=d.ph;credit=d.coran?t('tradCoran',{t:TRADUCTEURS_CORAN.fr}):t('sensEquipe')}
  const srcs=d.v?[d.v]:d.src||[];
  $('e-invocation').innerHTML=`<div class="quiz-tete">${boutonRetour(INV_RETOUR||'ouvrirInvocations()')}
      <button class="fav grand ${fav?'on':''}" onclick="basculerFavori('${id}',1)" aria-label="${t('favori')}">${ic('etoile_v')}</button></div>
    <div class="inv-tete"><div class="pastille">${ic(ICONE_INV[id]||'doua')}</div><div><div class="surtitre">${t('inv_cat_'+d.cat)}</div><h2>${esc(d.titre)}</h2></div></div>
    <div class="carte invocation detail">${ar.split('\n').map(l=>`<p class="ar inv-ar" lang="ar" dir="rtl">${esc(l)}</p>`).join('')}
      ${S.langue!=='ar'?`<p class="ph" dir="ltr">(${esc(ph)})</p>`:''}
      <p class="tr">${esc(sensDe(d))}</p>${d.note?`<p class="petit">${esc(d.note)}</p>`:''}<div class="credit">${esc(credit)}</div>
      <div class="ornement"><span></span><svg viewBox="0 0 24 24" class="orn">${ETOILE4}</svg><span></span></div>
      <p class="ref-inv">${srcs.map(s=>esc(refCourte(s))).join('<br>')}</p>
      <div class="ornement"><span></span><svg viewBox="0 0 24 24" class="orn">${ETOILE4}</svg><span></span></div>
      <details><summary>${t('voirSource')}</summary>${rendreSources(srcs)}</details></div>
    <button class="compteur-inv ${c>=n?'fini':''}" id="cpt" onclick="compter('${id}')" aria-label="${t('toucherCompter')}">${rosace()}<span id="cpt-n">${c} / ${n}</span></button>
    <p class="petit" style="text-align:center">${t('toucherCompter')}</p>
    <div class="pagination"><button class="rond" ${i>0?`onclick="ouvrirInvocation('${LISTE_VUE[i-1]}')"`:'disabled'} aria-label="${t('precedente')}">${ic('gauche','sm')}</button>
      <span>${i+1} / ${LISTE_VUE.length}</span>
      <button class="rond" ${i<LISTE_VUE.length-1?`onclick="ouvrirInvocation('${LISTE_VUE[i+1]}')"`:'disabled'} aria-label="${t('suivante')}">${ic('droite','sm')}</button></div>`;
  aller('invocation');
}
function compter(id){
  const n=REPET[id]||1,c=COMPTE[id]=((COMPTE[id]||0)>=n?0:(COMPTE[id]||0))+1;
  $('cpt-n').textContent=c+' / '+n;$('cpt').classList.toggle('fini',c>=n);vibrer(c>=n?[30,40,60]:12);
}

/* ---------- Démarrage ---------- */
/* Téléphones modestes (≤ 4 Go de mémoire ou ≤ 4 cœurs) : effets coûteux coupés (flou, étoiles qui scintillent, animations d'écran). */
if((navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4))document.documentElement.classList.add('leger');
/* Animation d'ouverture (media/intro.mp4, 6 s) : se joue en entier puis s'efface ; un appui la passe.
   Si la vidéo ne peut pas se lire, on entre tout de suite dans l'appli. */
(function(){
  const z=$('intro'),v=$('intro-v');if(!z)return;
  const sk=z.querySelector('.op-skip');if(sk)sk.textContent=t('touchePasser');   // « Touche pour passer » dans la langue choisie
  let fini=false;
  const finIntro=()=>{if(fini)return;fini=true;z.classList.add('fin');setTimeout(()=>z.remove(),650)};
  v.addEventListener('ended',finIntro);v.addEventListener('error',finIntro);z.addEventListener('click',finIntro);
  const p=v.play();if(p&&p.catch)p.catch(finIntro);
  setTimeout(finIntro,9000);   // sécurité
  let lance=false;v.addEventListener('playing',()=>{lance=true});setTimeout(()=>{if(!lance)finIntro()},2500);   // vidéo qui ne démarre pas : pas d'écran noir
})();
dessinerCiel();appliquerLangue();dessinerOnglets();
if(S.demarre||S.prenom)aller('accueil');else dessinerBienvenue();
