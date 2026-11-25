/* Darsi — groupes à distance : un code, chacun sur son téléphone, le même quiz chaque jour, un classement.
   Serveur : serveur/groupes.sql (fonctions dz_g_*). Chargé après app.js, en_ligne.js, imam.js.
   Sur le téléphone : S.gl = {jeton, code, nom, joue, attente}. Textes : français d'abord (repli automatique ailleurs). */
'use strict';
const NB_GROUPE=10,LIEN_GROUPE='https://solaimanea.github.io/darsi/?groupe=';
Object.assign(I18N.fr,{
 gl_titre:"Quiz à distance",gl_txt:"Chacun sur son téléphone, le même quiz chaque jour.",gl_ouvrir:"Jouer à distance",gl_creer:"Créer un groupe",gl_rejoindre:"Rejoindre un groupe",
 gl_code:"Code d'invitation",gl_pseudo:"Ton pseudo",gl_pseudoInfo:"Visible par le groupe. Un pseudo suffit, pas besoin de ton vrai nom.",gl_nom:"Nom du groupe",gl_inviter:"Inviter sur WhatsApp",gl_copier:"Copier le lien",gl_copie:"Lien copié",
 gl_jouer:"Jouer le quiz du jour",gl_fait:"Quiz du jour terminé. Reviens demain, in shâ' Allâh.",gl_jour:"Aujourd'hui",gl_semaine:"7 jours",gl_total:"Total",gl_pasJoue:"Pas encore joué",
 gl_quitter:"Quitter le groupe",gl_quitterOk:"Quitter le groupe ? Ton pseudo et tes scores y seront effacés.",gl_exclure:"Retirer",gl_exclureOk:"Retirer {n} du groupe ? Le code changera.",gl_nouveau:"Changer le code",
 gl_msg:"Rejoins notre quiz sur Darsi ! Code : {c}\n{l}",gl_membres:"{n} / {m} joueurs",gl_actualiser:"Actualiser",gl_enAttente:"Score gardé sur ton téléphone : il partira dès que tu auras du réseau, aujourd'hui seulement.",gl_perdu:"Le score d'un jour passé n'a pas pu être envoyé.",gl_envoye:"Score envoyé au groupe",gl_dejaEnvoye:"Ton premier score du jour est déjà enregistré",
 gl_garder:"Garder mon accès",gl_garderInfo:"Un nouveau téléphone, ou l'appli effacée ? Ce texte secret te rend ta place. Garde-le pour toi : qui l'a peut jouer, retirer des joueurs ou quitter à ta place.",gl_copierAcces:"Copier mon accès secret",gl_accesCopie:"Accès copié. Garde-le dans un endroit sûr.",
 gl_retrouver:"Retrouver ma place",gl_collerAcces:"Colle ton accès secret",gl_e_acces:"Cet accès ne marche pas. Vérifie que tu as tout copié.",
 gl_ontJoue:["{n} joueur sur {m} a joué aujourd'hui","{n} joueurs sur {m} ont joué aujourd'hui"],gl_tonRang:"Tu es {r} sur {m} pour l'instant",gl_seul:"Tu es la première personne à jouer aujourd'hui. Le classement bougera quand les autres auront joué.",gl_mesRep:"Voir mes réponses",gl_egalite:"Égalité",
 gl_regle:"D'abord les bonnes réponses. À égalité, le plus rapide passe devant. Le chrono tourne aussi si tu quittes l'écran.",gl_regleMoy:"À égalité, le temps moyen par question départage.",gl_parQ:"{s} par question",
 tu_titre:"Comment ça marche ?",tu_q:"{n} questions",tu_qT:"Les mêmes pour tout le groupe. Une seule partie par jour.",tu_qL:"Chacun joue à son tour sur ce téléphone.",tu_juste:"Réponds juste d'abord",tu_justeT:"Chaque bonne réponse vaut 1 point.",
 tu_vite:"Puis réponds vite",tu_viteT:"À égalité de points, le plus rapide passe devant.",tu_chrono:"Le chrono ne s'arrête pas",tu_chronoT:"Il démarre à la première question et continue même si tu quittes l'écran.",tu_chronoL:"Il démarre à chaque première question de ton tour.",
 tu_podium:"Le podium à la fin",tu_podiumT:"Tu découvres ta place et tes corrections.",tu_go:"Bismillâh, je commence",tu_goL:"Bismillâh, on commence",tu_plus:"Plus tard",
 gl_heroT:"Le quiz de la famille",gl_heroS:"Chaque jour, les mêmes questions pour tous. Où que vous soyez.",gl_et1:"Crée un groupe et envoie le lien",gl_et2:"Chacun joue sur son téléphone",gl_et3:"Le podium départage la famille",gl_jaiCode:"J'ai un code",gl_retrouverT:"Nouveau téléphone ? Colle l'accès secret que tu avais gardé.",
 gl_charge:"On retrouve ta famille…",gl_duJour:"Quiz du jour",gl_attend:"10 questions t'attendent",gl_faitT:"C'est fait pour aujourd'hui",gl_faitS:"Reviens demain, in shâ' Allâh.",gl_inviterT:"Inviter la famille",gl_gerer:"Gérer le groupe",gl_vieux:"Sans réseau : derniers scores connus.",gl_reessayer:"Réessayer",
 fq_titre:"Nos questions",fq_sous:"Écris tes propres questions pour la famille.",fq_nouv:["{n} question à découvrir","{n} questions à découvrir"],fq_intro:"Écrites par vous, pour vous. Elles ne comptent pas dans le classement.",fq_ecrire:"Écrire une question",fq_vide:"Aucune question pour l'instant. Lance-toi !",
 fq_non:"Questions écrites par la famille, non vérifiées par Darsi.",fq_de:"De {n}",fq_bonne:"Bonne réponse",fq_rate:"Ce n'était pas ça",fq_tienne:"Ta question",fq_retirer:"Retirer",fq_retirerOk:"Retirer cette question pour tout le groupe ?",fq_q:"Ta question",fq_rep:"Bonne réponse",fq_leurre:"Mauvaise réponse {n}",fq_src:"Source (facultatif)",fq_envoyer:"Envoyer à la famille",fq_ok:"Question envoyée à la famille",fq_source:"Source indiquée : {s}",
 fq_grp:"Crée ou rejoins un groupe pour écrire tes questions.",gl_e_donnees:"Remplis la question et quatre réponses différentes.",gl_e_question:"Cette question n'existe plus.",gl_e_bientot:"Bientôt disponible.",
 gl_e_hors_ligne:"Pas de connexion à Internet.",gl_e_code:"Code inconnu. Vérifie-le avec la personne qui t'a invité.",gl_e_plein:"Ce groupe est complet.",gl_e_pseudo:"Ce pseudo est déjà pris dans le groupe.",gl_e_champs:"Écris au moins 2 lettres.",gl_e_jeton:"Tu ne fais plus partie de ce groupe.",gl_e_trop:"Trop de demandes. Réessaie plus tard.",gl_e_maj:"Mets Darsi à jour pour jouer ce quiz.",gl_e_autre:"Ça n'a pas marché. Réessaie.",
});
const glErreur=e=>{const k='gl_e_'+e.code;toast(t(I18N.fr[k]?k:'gl_e_autre'))};
const GL_FAITES=new Set();   // évite un double appui pendant un envoi
async function glFaire(nom,f){if(GL_FAITES.has(nom))return;GL_FAITES.add(nom);try{return await f()}catch(e){if(e.code==='jeton'){S.gl=null;GL=null;FQ=null;sauver();if(famActive())glFormulaire('choix')}if(nom==='voir'&&e.code==='hors_ligne'){if(famActive())glHorsLigne()}else glErreur(e)}finally{GL_FAITES.delete(nom)}}
/* 2026-11-25 : l'onglet Famille EST le quiz à distance (plus de groupe sur un seul téléphone ; les anciennes données S.groupe restent gardées). */
const famActive=()=>$('e-famille').classList.contains('actif');
let GL_TRI=null;
ouvrirFamille=function(){
  if(!S.gl)return glFormulaire(S.invite?'rejoindre':'choix');
  if(GL&&GL.code===S.gl.code)glDessiner();
  else if(S.gl.vue){GL=S.gl.vue;glDessiner()}
  else $('e-famille').innerHTML=`<div class="fam-charge">${ic('globe','lg')}<p class="doux">${t('gl_charge')}</p></div>`;
  aller('famille');return voirGroupe();
};
const ouvrirGroupes=()=>ouvrirFamille();
function glFormulaire(mode){
  const z=$('e-famille'),tete=boutonRetour('delete S.invite;ouvrirFamille()');
  if(mode==='choix')z.innerHTML=`<div class="fam-hero"><div class="fam-ronds">${['A','Y','N','S','L'].map((x,i)=>`<span class="avatar" style="background:${COULEURS[[0,4,2,5,1][i]]}">${x}</span>`).join('')}</div>
      <h2>${t('gl_heroT')}</h2><p class="doux">${t('gl_heroS')}</p></div>
    <div class="carte fam-etapes">${[['partage','gl_et1'],['telephone','gl_et2'],['trophee','gl_et3']].map(([i,k])=>`<div class="tu-l"><div class="pastille">${ic(i)}</div><b>${t(k)}</b></div>`).join('')}</div>
    <button class="btn" id="gl-creer" onclick="glFormulaire('creer')">${ic('plus')} ${t('gl_creer')}</button><button class="btn sec" id="gl-rejoindre" onclick="glFormulaire('rejoindre')">${t('gl_jaiCode')}</button>
    <button class="fam-lien" id="gl-retrouver" onclick="glFormulaire('retrouver')">${t('gl_retrouver')}</button>
    ${carteQuestions()}<div class="carte">${carteImam()}</div>`;
  else if(mode==='retrouver')z.innerHTML=tete+`<h2>${t('gl_retrouver')}</h2><p class="doux">${t('gl_retrouverT')}</p><label for="gl-acces">${t('gl_collerAcces')}</label><textarea id="gl-acces" dir="ltr" autocomplete="off" spellcheck="false"></textarea>
    <button class="btn" id="gl-ok" onclick="glRetrouver()">${t('gl_retrouver')}</button>`;
  else z.innerHTML=tete+`<h2>${t('gl_'+mode)}</h2>
    ${mode==='creer'?`<label for="gl-nom">${t('gl_nom')}</label><input id="gl-nom" maxlength="30" autocomplete="off" placeholder="${t('maFamilleDefaut')}">`
      :`<label for="gl-code">${t('gl_code')}</label><input id="gl-code" class="fam-code" maxlength="12" autocomplete="off" autocapitalize="characters" dir="ltr" placeholder="XXXX-XXXX" value="${esc(S.invite||'')}">`}
    <label for="gl-pseudo">${t('gl_pseudo')}</label><input id="gl-pseudo" maxlength="20" autocomplete="off" value="${esc(S.prenom)}"><p class="petit">${t('gl_pseudoInfo')}</p>
    <button class="btn" id="gl-ok" onclick="glValider('${mode}')">${t('gl_'+mode)}</button>`;
  aller('famille');
}
function glValider(mode){return glFaire('entrer',async()=>{
  const p=$('gl-pseudo').value.trim(),couleur=COULEURS[Math.random()*COULEURS.length|0],nom=mode==='creer'?($('gl-nom').value.trim()||t('maFamilleDefaut')):'';
  if(p.length<2||(mode==='creer'&&nom.length<2)){toast(t('gl_e_champs'));return}
  const r=mode==='creer'?await rpc('dz_g_creer',{p_nom:nom,p_pseudo:p,p_couleur:couleur}):await rpc('dz_g_rejoindre',{p_code:$('gl-code').value,p_pseudo:p,p_couleur:couleur});
  S.gl={jeton:r.jeton,code:r.code,joue:null,attente:null};delete S.invite;sauver();await glVoir();
})}
// Accès secret = le jeton de ce téléphone. Jamais dans une adresse web ni dans l'invitation.
function glRetrouver(){return glFaire('retrouver',async()=>{
  const j=$('gl-acces').value.replace(/[^0-9a-fA-F-]/g,'').toLowerCase();
  let g;try{g=await rpc('dz_g_voir',{p_jeton:j})}catch(e){if(e.code==='jeton')e.code='acces';throw e}
  S.gl={jeton:j,code:g.code,joue:null,attente:null};delete S.invite;sauver();await glVoir();
})}
function glCopierAcces(){const j=S.gl.jeton;(navigator.clipboard?navigator.clipboard.writeText(j):Promise.reject()).then(()=>toast(t('gl_accesCopie')),()=>prompt(t('gl_copierAcces'),j))}
let GL=null;
function voirGroupe(){return glFaire('voir',glVoir)}
function glHorsLigne(){if(GL){const i=$('fam-info');if(i)i.textContent=t('gl_vieux')}else $('e-famille').innerHTML=`<div class="fam-charge">${ic('globe','lg')}<p class="doux">${t('gl_e_hors_ligne')}</p><button class="btn sec" onclick="voirGroupe()">${t('gl_reessayer')}</button></div>`}
async function glVoir(){
  await glEnvoyer();
  GL=await rpc('dz_g_voir',{p_jeton:S.gl.jeton});
  S.gl.code=GL.code;S.gl.nom=GL.nom;
  FQ=await rpc('dz_g_q_liste',{p_jeton:S.gl.jeton}).catch(()=>FQ);
  const moi=GL.membres.find(m=>m.id===GL.moi);if(moi&&moi.jour!==null)S.gl.joue=GL.jour;
  S.gl.vue=GL;sauver();if(famActive())glDessiner();
}
// Podium : L = [{nom, couleur, score}] déjà trié. À égalité, même rang et même hauteur de marche.
// Ordre : score, puis rapidité (au dixième de seconde, comme affiché ; sans temps connu = après).
const dixieme=ms=>ms==null?Infinity:Math.round(ms/100),compare=(a,b)=>b.score-a.score||(dixieme(a.ms)===dixieme(b.ms)?0:dixieme(a.ms)-dixieme(b.ms));
const rangDe=(L,x)=>L.findIndex(y=>compare(y,x)===0)+1;
function duree(ms){if(ms==null)return '';const d=dixieme(ms);return d<600?(d/10).toLocaleString(S.langue+'-u-nu-latn',{minimumFractionDigits:1,maximumFractionDigits:1})+' s':Math.floor(d/600)+' min '+String(Math.floor(d%600/10)).padStart(2,'0')+' s'}
// Chrono : temps passé sur chaque question, de son affichage à la validation
let CHRONO_MS=0,CHRONO_T0=0;
const _lancerQuiz=lancerQuiz,_enregistrer=enregistrer;
lancerQuiz=function(...a){CHRONO_MS=0;const r=_lancerQuiz(...a);CHRONO_T0=Date.now();return r};
enregistrer=function(){CHRONO_MS+=Math.max(0,Date.now()-CHRONO_T0);CHRONO_T0=Date.now();const r=_enregistrer();CHRONO_T0=Date.now();return r};
function podiumHTML(L,sur){
  const trois=L.slice(0,3);if(!trois.length)return '';
  const place=trois.length===3?[1,0,2]:trois.length===2?[1,0]:[0];
  return `<div class="podium">${place.map(i=>{const x=trois[i],r=rangDe(L,x);return `<div class="pod pod${r}" style="--retard:${[.75,.4,.05][i]+(3-trois.length)*-.05}s">
    <div class="pod-haut">${r===1?`<svg class="pod-couronne" viewBox="0 0 48 30" aria-hidden="true"><path d="M4 26 2 7l12 8L24 2l10 13 12-8-2 19z"/></svg>`:''}${avatar({nom:x.nom,couleur:x.couleur},r===1?'grand':'')}
      <b class="pod-nom">${esc(x.nom)}</b><span class="pod-score">${x.score}${sur?' / '+sur:''}</span>${x.ms!=null?`<span class="pod-temps">${sur?duree(x.ms):t('gl_parQ',{s:duree(x.ms)})}</span>`:''}</div><div class="pod-marche"><span>${r}</span></div></div>`}).join('')}</div>`;
}
let GL_FIN=false;   // vrai juste après un quiz : arrivée animée
function glDessiner(tri){
  const fin=GL_FIN;GL_FIN=false;const joue=S.gl.joue===GL.jour;
  tri=GL_TRI=tri||GL_TRI||(joue?'jour':'semaine');
  const val=m=>({score:m[tri]===null?-1:+m[tri],ms:m['t_'+tri]}),L=GL.membres.slice().sort((a,b)=>compare(val(a),val(b))),V=L.map(val);
  const C=L.filter(m=>tri==='jour'?m.jour!==null:+m[tri]>0).map(m=>({id:m.id,nom:m.pseudo,couleur:m.couleur,score:+m[tri],ms:m['t_'+tri]})),aJoue=GL.membres.filter(m=>m.jour!==null).length,moi=C.find(x=>x.id===GL.moi);
  const rang=moi?t('gl_tonRang',{r:rangDe(C,moi)+(C.filter(x=>compare(x,moi)===0).length>1?' ('+t('gl_egalite').toLowerCase()+')':''),m:GL.membres.length}):'';
  $('e-famille').innerHTML=`<div class="fam-tete"><div><div class="surtitre">${ic('famille','sm')} ${t('gl_membres',{n:L.length,m:GL.max})}</div><h2>${esc(GL.nom)}</h2></div>
      <a class="fam-inv" target="_blank" rel="noopener" href="${glLienWA()}" aria-label="${t('gl_inviter')}">${ic('plus','sm')} ${t('gl_inviterT')}</a></div><p class="petit" id="fam-info"></p>
    ${joue?`<div class="fam-jour fait"><div class="pastille">${ic('check')}</div><div><b>${fin&&moi?(aJoue===1?t('gl_seul'):rang):t('gl_faitT')}</b><p>${S.gl.attente?t('gl_enAttente'):t('gl_faitS')}</p></div></div>`
      :`<div class="fam-jour"><div class="surtitre">${t('gl_duJour')}</div><b class="fam-gros">${t('gl_attend')}</b><p>${t('gl_ontJoue',{n:aJoue,m:L.length})}</p><button class="btn" id="gl-jouer" onclick="glJouer()">${ic('cible')} ${t('gl_jouer')}</button></div>`}
    <div class="filtres">${['jour','semaine','total'].map(k=>`<button class="filtre ${k===tri?'actif':''}" onclick="glDessiner('${k}')">${t('gl_'+k)}</button>`).join('')}</div>
    <div class="${fin?'arrivee':''}">${podiumHTML(C,tri==='jour'?NB_GROUPE:0)}</div>
    ${tri==='jour'&&joue?`<p class="petit" style="text-align:center">${t('gl_ontJoue',{n:aJoue,m:L.length})}</p>`:''}
    ${fin?`<button class="btn sec" id="gl-mesrep" onclick="aller('resultat')">${t('gl_mesRep')}</button>`:''}
    <div class="carte"><h3 class="titre-carte">${t('classement')}</h3><p class="petit">${t(tri==='jour'?'gl_regle':'gl_regleMoy')}</p>${L.map(m=>`<div class="membre ${m.id===GL.moi?'moi':''}" style="cursor:default"><span class="rang">${m[tri]===null?'–':rangDe(V,val(m))}</span>${avatar({nom:m.pseudo,couleur:m.couleur})}
      <div class="nom">${esc(m.pseudo)}${m.id===GL.moi?` <span class="doux">${t('moi')}</span>`:''}${m[tri]===null?`<div class="petit">${t('gl_pasJoue')}</div>`:val(m).ms!=null?`<div class="petit">${tri==='jour'?duree(val(m).ms):t('gl_parQ',{s:duree(val(m).ms)})}</div>`:''}</div><b>${m[tri]===null?'':+m[tri]}</b></div>`).join('')}</div>
    <div class="carte fam-invite"><div class="petit">${t('gl_code')}</div><h2 dir="ltr" id="gl-code-vu">${esc(GL.code.slice(0,4)+'-'+GL.code.slice(4))}</h2>
      <a class="btn" target="_blank" rel="noopener" href="${glLienWA()}">${t('gl_inviter')}</a><button class="btn sec" onclick="glCopier()">${t('gl_copier')}</button></div>
    <details class="carte" id="gl-gerer"><summary>${ic('reglages','sm')} ${t('gl_gerer')}</summary>
      ${GL.chef?`${GL.membres.filter(m=>m.id!==GL.moi).map(m=>`<div class="membre" style="cursor:default">${avatar({nom:m.pseudo,couleur:m.couleur})}<div class="nom">${esc(m.pseudo)}</div><button class="retour" data-exclure="${m.id}">${t('gl_exclure')}</button></div>`).join('')}<button class="btn sec" onclick="glNouveau()">${t('gl_nouveau')}</button>`:''}
      <h3 class="titre-carte" style="margin-top:18px">${t('gl_garder')}</h3><p class="petit">${t('gl_garderInfo')}</p><button class="btn sec" id="gl-acces-copier" onclick="glCopierAcces()">${t('gl_copierAcces')}</button>
      <button class="btn danger" onclick="glQuitter()">${t('gl_quitter')}</button></details>
    ${carteQuestions()}<div class="carte">${carteImam()}</div>`;
  $('e-famille').querySelectorAll('[data-exclure]').forEach(b=>b.onclick=()=>glExclure(b.dataset.exclure));
}
const glLienWA=()=>'https://wa.me/?text='+encodeURIComponent(t('gl_msg',{c:GL.code,l:LIEN_GROUPE+GL.code}));
function glCopier(){const l=LIEN_GROUPE+GL.code;(navigator.clipboard?navigator.clipboard.writeText(l):Promise.reject()).then(()=>toast(t('gl_copie')),()=>prompt(t('gl_copier'),l))}
function glExclure(id){const m=GL.membres.find(x=>x.id===id);if(confirm(t('gl_exclureOk',{n:m.pseudo})))glFaire('exclure',async()=>{await rpc('dz_g_exclure',{p_jeton:S.gl.jeton,p_membre:id});await glVoir()})}
function glNouveau(){glFaire('code',async()=>{await rpc('dz_g_nouveau_code',{p_jeton:S.gl.jeton});await glVoir()})}
function glQuitter(){if(confirm(t('gl_quitterOk')))glFaire('quitter',async()=>{await rpc('dz_g_quitter',{p_jeton:S.gl.jeton});S.gl=null;GL=null;FQ=null;sauver();glFormulaire('choix')})}

// Leçons communes aux 9 langues seulement (les nouvelles f-* et m-* attendent relecture et traduction)
const glLecons=()=>LECONS.filter(l=>!/^(f|m)-/.test(l.id));
function glProposer(){return melanger(glLecons().flatMap(l=>questionsDe(l.id)).filter(q=>!q.m)).slice(0,NB_GROUPE).map(q=>q.uid)}
/* ---------- Questions écrites par la famille (serveur/questions_famille.sql) ---------- */
let FQ=null;
const fqRep=()=>(S.gl.qr=S.gl.qr||{});
function carteQuestions(){
  const n=S.gl&&FQ?FQ.filter(x=>!x.moi&&fqRep()[x.id]===undefined).length:0;
  return `<div class="carte" id="carte-questions"><div class="ligne-theme" onclick="${S.gl?'ouvrirQuestions()':"toast(t('fq_grp'))"}"><div class="pastille">${ic('plume')}</div><div class="milieu"><b>${t('fq_titre')}</b><div class="petit">${n?t('fq_nouv',{n}):t('fq_sous')}</div></div>${n?`<span class="pastille-nb">${n}</span>`:''}${ic('droite','sm')}</div></div>`;
}
const fqErreur=e=>{if(/Could not find the function/.test(e.code||''))e.code='bientot';throw e};
function ouvrirQuestions(){return glFaire('questions',async()=>{FQ=await rpc('dz_g_q_liste',{p_jeton:S.gl.jeton}).catch(fqErreur);if(S.gl)fqDessiner()})}
function fqDessiner(){
  $('e-question').innerHTML=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('plume','sm')} ${esc(GL.nom)}</div><h2>${t('fq_titre')}</h2><p class="doux">${t('fq_intro')}</p>
    <button class="btn" id="fq-ecrire" onclick="fqFormulaire()">${ic('plus')} ${t('fq_ecrire')}</button>
    ${FQ.length?`<p class="petit">${t('fq_non')}</p>`:`<p class="doux" style="text-align:center;margin-top:30px">${t('fq_vide')}</p>`}
    ${FQ.map((x,k)=>{const rep=fqRep()[x.id],vu=x.moi||rep!==undefined;return `<div class="carte fq" data-k="${k}"><div class="fq-tete">${avatar({nom:x.auteur,couleur:x.couleur})}<span class="doux">${x.moi?t('fq_tienne'):esc(t('fq_de',{n:x.auteur}))}</span>${x.suppr?`<button class="retour" data-suppr="${k}">${t('fq_retirer')}</button>`:''}</div>
      <p class="fq-q">${esc(x.q)}</p>${fqOrdre(x).map(i=>vu?`<div class="cor-choix ${i===x.b?'bon':i===rep?'faux':''}">${i===x.b?ic('check','sm'):i===rep?ic('croix','sm'):'<i></i>'}<span>${esc(x.c[i])}</span></div>`:`<button class="choix" data-k="${k}" data-i="${i}"><span>${esc(x.c[i])}</span></button>`).join('')}
      ${rep!==undefined?`<p class="petit"><b>${t(rep===x.b?'fq_bonne':'fq_rate')}</b></p>`:''}${vu&&x.src?`<p class="petit">${esc(t('fq_source',{s:x.src}))}</p>`:''}</div>`}).join('')}`;
  const z=$('e-question');
  z.querySelectorAll('.choix').forEach(b=>b.onclick=()=>{const x=FQ[+b.dataset.k],y=scrollY;fqRep()[x.id]=+b.dataset.i;sauver();vibrer(+b.dataset.i===x.b?[12,40,12]:30);fqDessiner();scrollTo(0,y)});
  z.querySelectorAll('[data-suppr]').forEach(b=>b.onclick=()=>{if(confirm(t('fq_retirerOk')))glFaire('fqsuppr',async()=>{await rpc('dz_g_q_retirer',{p_jeton:S.gl.jeton,p_id:FQ[+b.dataset.suppr].id});await ouvrirQuestions()})});
  aller('question');
}
// Ordre des réponses propre à chaque question, stable d'un affichage à l'autre (la bonne est toujours envoyée en premier)
function fqOrdre(x){let h=0;for(const c of x.id)h=(h*31+c.charCodeAt(0))>>>0;const a=[0,1,2,3];for(let i=3;i>0;i--){h=(h*1103515245+12345)>>>0;const j=(h>>>8)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function fqFormulaire(){
  $('e-question').innerHTML=boutonRetour('fqDessiner()')+`<h2>${t('fq_ecrire')}</h2><p class="petit">${t('fq_non')}</p><label for="fq-q">${t('fq_q')}</label><textarea id="fq-q" maxlength="200"></textarea>
    <label for="fq-0">${t('fq_rep')}</label><input id="fq-0" class="fq-juste" maxlength="80" autocomplete="off">${[1,2,3].map(n=>`<label for="fq-${n}">${t('fq_leurre',{n})}</label><input id="fq-${n}" maxlength="80" autocomplete="off">`).join('')}
    <label for="fq-src">${t('fq_src')}</label><input id="fq-src" maxlength="200" autocomplete="off"><button class="btn" id="fq-ok" onclick="fqEnvoyer()">${t('fq_envoyer')}</button>`;
  aller('question');
}
function fqEnvoyer(){return glFaire('fqenvoi',async()=>{
  const v=i=>$(i).value.trim();
  await rpc('dz_g_q_ajouter',{p_jeton:S.gl.jeton,p_q:v('fq-q'),p_c:[0,1,2,3].map(n=>v('fq-'+n)),p_b:0,p_src:v('fq-src')}).catch(fqErreur);
  toast(t('fq_ok'));await ouvrirQuestions();
})}
// Tutoriel avant chaque quiz de famille ; le chrono ne part qu'après le décompte.
function tutoQuiz(local,nb,go){
  const L=[['livre',t('tu_q',{n:nb}),t(local?'tu_qL':'tu_qT')],['check',t('tu_juste'),t('tu_justeT')],['flamme',t('tu_vite'),t('tu_viteT')],['chrono',t('tu_chrono'),t(local?'tu_chronoL':'tu_chronoT')],['trophee',t('tu_podium'),t('tu_podiumT')]];
  const z=document.createElement('div');z.id='tuto';z.setAttribute('role','dialog');z.setAttribute('aria-modal','true');
  z.innerHTML=`<div class="tu-in"><h2>${t('tu_titre')}</h2>${L.map(([i,a,b],k)=>`<div class="tu-l" style="--k:${k}"><div class="pastille">${ic(i)}</div><div><b>${a}</b><p class="petit">${b}</p></div></div>`).join('')}
    <button class="btn" id="tu-go">${t(local?'tu_goL':'tu_go')}</button><button class="btn sec" id="tu-non">${t('tu_plus')}</button></div>`;
  document.body.appendChild(z);
  z.querySelector('#tu-non').onclick=()=>z.remove();
  z.querySelector('#tu-go').onclick=()=>{if(local){z.remove();go();return}
    let n=3;const pas=()=>{if(!n){z.remove();go();return}z.innerHTML=`<div class="tu-dec" aria-live="assertive">${n}</div>`;vibrer(12);n--;setTimeout(pas,700)};pas()};
}
const _lancerDefi=lancerDefi;
lancerDefi=function(){if(S.groupe.membres.length<2)return _lancerDefi();tutoQuiz(true,NB_DEFI,_lancerDefi)};
function glJouer(){return glFaire('jouer',async()=>{
  const u=await rpc('dz_g_quiz',{p_jeton:S.gl.jeton,p_uids:glProposer()}),tout=new Map(LECONS.flatMap(l=>questionsDe(l.id)).map(q=>[q.uid,q])),qs=u.map(x=>tout.get(x));
  if(qs.some(q=>!q)){const e=new Error('maj');e.code='maj';throw e}
  const jour=GL.jour,nom=GL.nom;
  tutoQuiz(false,qs.length,()=>{
    if(!S.gl)return;
    // premier départ du jour gardé : quitter puis relancer ne remet pas le chrono à zéro
    if(!S.gl.debut||S.gl.debut.jour!==jour){S.gl.debut={jour,t:Date.now()};sauver()}
    lancerQuiz(qs,nom,{mode:'groupe',jour});
  });
})}
const _finir=finir;
finir=function(){
  if(CTX.mode!=='groupe')return _finir();
  $('q-barre').style.width='100%';REP.forEach(x=>{noterErreur(x.q,x.juste);vue(x.q)});
  S.gl.attente={jour:CTX.jour,bonnes,ms:Math.round(S.gl.debut&&S.gl.debut.jour===CTX.jour?Math.max(CHRONO_MS,Date.now()-S.gl.debut.t):CHRONO_MS)};S.gl.joue=CTX.jour;S.points+=PTS*POINTS_BONNE+activite();sauver();
  montrerResultat(bonnes,TOT,bonnes===TOT?t('resParfait'):bonnes>=TOT/2?t('resBravo'):t('resProgres'),'','ouvrirGroupes()',REP);
  // score envoyé → podium du groupe ; sans réseau, on reste sur le résultat et le score partira plus tard
  glVoirFin();
};
async function glVoirFin(){
  try{await glEnvoyer();const g=await rpc('dz_g_voir',{p_jeton:S.gl.jeton});
    if(!$('e-resultat').classList.contains('actif'))return;   // déjà parti ailleurs
    GL=g;S.gl.code=g.code;S.gl.nom=g.nom;S.gl.vue=g;sauver();GL_FIN=true;GL_TRI='jour';glDessiner();aller('famille');pluie();vibrer([20,60,20]);
  }catch(e){if(e.code==='jeton'){S.gl=null;GL=null;FQ=null;sauver();glErreur(e)}else toast(t('gl_enAttente'))}
}
// Même podium pour le défi sur un seul téléphone
const _finTour=finTour;
finTour=function(){(DEFI.ms=DEFI.ms||{})[DEFI.ordre[DEFI.i]]=CHRONO_MS;_finTour()};
const _classement=classement;
classement=function(){
  _classement();
  const L=DEFI.ordre.map(id=>({nom:membre(id).nom,couleur:membre(id).couleur,score:DEFI.scores[id],ms:(DEFI.ms||{})[id]})).sort(compare);
  $('e-classement').querySelector('.carte').innerHTML=L.map(x=>`<div class="membre" style="cursor:default"><span class="rang">${rangDe(L,x)}</span>${avatar(x)}<div class="nom">${esc(x.nom)}<div class="petit">${duree(x.ms)}</div></div><b>${x.score} / ${NB_DEFI}</b></div>`).join('');
  const h=$('e-classement').querySelector('.heros');if(h)h.remove();
  $('e-classement').querySelector('h2').insertAdjacentHTML('beforebegin',`<div class="arrivee">${podiumHTML(L,NB_DEFI)}</div>`);
};
// Un score ne part que le jour même (heure de Paris, comme le serveur) : jamais compté pour un autre jour.
const glJourParis=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let GL_ENVOI=null;
function glEnvoyer(){return GL_ENVOI||(GL_ENVOI=glEnvoi().finally(()=>{GL_ENVOI=null}))}
async function glEnvoi(){
  const a=S.gl&&S.gl.attente;if(!a)return;
  if(a.jour!==glJourParis()){S.gl.attente=null;sauver();toast(t('gl_perdu'));return}
  const base={p_jeton:S.gl.jeton,p_bonnes:a.bonnes};let ok;
  try{ok=await rpc('dz_g_score',{...base,p_ms:a.ms||null})}
  catch(e){if(!/Could not find the function/.test(e.code||''))throw e;ok=await rpc('dz_g_score',base)}   // serveur pas encore à jour
  if(S.gl){S.gl.attente=null;sauver()}toast(t(ok?'gl_envoye':'gl_dejaEnvoye'));
}
addEventListener('online',()=>{glEnvoyer().catch(()=>{})});
glEnvoyer().catch(()=>{});

// Lien d'invitation ?groupe=CODE : proposé dès l'accueil (après l'écran de bienvenue pour un nouveau joueur)
(function(){
  const c=(new URLSearchParams(location.search).get('groupe')||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);
  if(c){S.invite=c;sauver();history.replaceState(null,'',location.pathname)}
  if(!S.invite||!enLigneOk())return;
  if(S.gl){delete S.invite;sauver();return}
  if(S.demarre||S.prenom){glFormulaire('rejoindre');return}
  const _commencer=commencer;commencer=function(){_commencer();if(S.invite)glFormulaire('rejoindre')};
})();
