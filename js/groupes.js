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
 gl_e_hors_ligne:"Pas de connexion à Internet.",gl_e_code:"Code inconnu. Vérifie-le avec la personne qui t'a invité.",gl_e_plein:"Ce groupe est complet.",gl_e_pseudo:"Ce pseudo est déjà pris dans le groupe.",gl_e_champs:"Écris au moins 2 lettres.",gl_e_jeton:"Tu ne fais plus partie de ce groupe.",gl_e_trop:"Trop de demandes. Réessaie plus tard.",gl_e_maj:"Mets Darsi à jour pour jouer ce quiz.",gl_e_autre:"Ça n'a pas marché. Réessaie.",
});
const glErreur=e=>{const k='gl_e_'+e.code;toast(t(I18N.fr[k]?k:'gl_e_autre'))};
const GL_FAITES=new Set();   // évite un double appui pendant un envoi
async function glFaire(nom,f){if(GL_FAITES.has(nom))return;GL_FAITES.add(nom);try{return await f()}catch(e){if(e.code==='jeton'){S.gl=null;sauver();ouvrirGroupes()}glErreur(e)}finally{GL_FAITES.delete(nom)}}
function carteGroupes(){return enLigneOk()?`<div class="carte"><div class="ligne-theme" onclick="ouvrirGroupes()"><div class="pastille">${ic('globe')}</div><div class="milieu"><b>${t('gl_titre')}</b><div class="petit">${t('gl_txt')}</div></div>${ic('droite','sm')}</div></div>`:''}
const _ouvrirFamille=ouvrirFamille;
ouvrirFamille=function(){_ouvrirFamille();$('e-famille').insertAdjacentHTML('afterbegin',carteGroupes())};

function ouvrirGroupes(){if(S.gl)return voirGroupe();glFormulaire(S.invite?'rejoindre':'choix')}
function glFormulaire(mode){
  const z=$('e-groupe'),tete=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('globe','sm')} ${t('gl_titre')}</div>`;
  if(mode==='choix')z.innerHTML=tete+`<h2>${t('apprenezFamille')}</h2><p class="doux">${t('gl_txt')}</p>
    <button class="btn" onclick="glFormulaire('creer')">${t('gl_creer')}</button><button class="btn sec" onclick="glFormulaire('rejoindre')">${t('gl_rejoindre')}</button><button class="btn sec" id="gl-retrouver" onclick="glFormulaire('retrouver')">${t('gl_retrouver')}</button>`;
  else if(mode==='retrouver')z.innerHTML=tete+`<h2>${t('gl_retrouver')}</h2><label for="gl-acces">${t('gl_collerAcces')}</label><textarea id="gl-acces" dir="ltr" autocomplete="off" spellcheck="false"></textarea>
    <button class="btn" id="gl-ok" onclick="glRetrouver()">${t('gl_retrouver')}</button>`;
  else z.innerHTML=tete+`<h2>${t('gl_'+mode)}</h2>
    ${mode==='creer'?`<label for="gl-nom">${t('gl_nom')}</label><input id="gl-nom" maxlength="30" autocomplete="off" placeholder="${t('maFamilleDefaut')}">`
      :`<label for="gl-code">${t('gl_code')}</label><input id="gl-code" maxlength="12" autocomplete="off" autocapitalize="characters" dir="ltr" value="${esc(S.invite||'')}">`}
    <label for="gl-pseudo">${t('gl_pseudo')}</label><input id="gl-pseudo" maxlength="20" autocomplete="off" value="${esc(S.prenom)}"><p class="petit">${t('gl_pseudoInfo')}</p>
    <button class="btn" id="gl-ok" onclick="glValider('${mode}')">${t('gl_'+mode)}</button>`;
  aller('groupe');
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
async function glVoir(){
  await glEnvoyer();
  GL=await rpc('dz_g_voir',{p_jeton:S.gl.jeton});
  S.gl.code=GL.code;S.gl.nom=GL.nom;
  const moi=GL.membres.find(m=>m.id===GL.moi);if(moi&&moi.jour!==null)S.gl.joue=GL.jour;
  sauver();glDessiner('semaine');
}
function glDessiner(tri){
  const L=GL.membres.slice().sort((a,b)=>(b[tri]===null?-1:b[tri])-(a[tri]===null?-1:a[tri])),joue=S.gl.joue===GL.jour;
  $('e-groupe').innerHTML=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('globe','sm')} ${t('gl_membres',{n:L.length,m:GL.max})}</div><h2>${esc(GL.nom)}</h2>
    ${S.gl.attente?`<p class="petit">${t('gl_enAttente')}</p>`:''}
    ${joue?`<p class="doux">${t('gl_fait')}</p>`:`<button class="btn" id="gl-jouer" onclick="glJouer()">${ic('cible')} ${t('gl_jouer')}</button>`}
    <div class="filtres">${['jour','semaine','total'].map(k=>`<button class="filtre ${k===tri?'actif':''}" onclick="glDessiner('${k}')">${t('gl_'+k)}</button>`).join('')}</div>
    <div class="carte">${L.map(m=>`<div class="membre" style="cursor:default"><span class="rang">${m[tri]===null?'–':L.findIndex(x=>x[tri]===m[tri])+1}</span>${avatar({nom:m.pseudo,couleur:m.couleur})}
      <div class="nom">${esc(m.pseudo)}${m.id===GL.moi?` <span class="doux">${t('moi')}</span>`:''}${m[tri]===null?`<div class="petit">${t('gl_pasJoue')}</div>`:''}</div><b>${m[tri]===null?'':+m[tri]}</b>
      ${GL.chef&&m.id!==GL.moi?`<button class="retour" data-exclure="${m.id}">${t('gl_exclure')}</button>`:''}</div>`).join('')}</div>
    <div class="carte" style="text-align:center"><div class="petit">${t('gl_code')}</div><h2 dir="ltr" id="gl-code-vu">${esc(GL.code.slice(0,4)+'-'+GL.code.slice(4))}</h2>
      <a class="btn" style="display:block;text-decoration:none;box-sizing:border-box" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(t('gl_msg',{c:GL.code,l:LIEN_GROUPE+GL.code}))}">${t('gl_inviter')}</a>
      <button class="btn sec" onclick="glCopier()">${t('gl_copier')}</button>${GL.chef?`<button class="btn sec" onclick="glNouveau()">${t('gl_nouveau')}</button>`:''}</div>
    <details class="carte"><summary>${t('gl_garder')}</summary><p class="petit">${t('gl_garderInfo')}</p><button class="btn sec" id="gl-acces-copier" onclick="glCopierAcces()">${t('gl_copierAcces')}</button></details>
    <button class="btn sec" onclick="voirGroupe()">${t('gl_actualiser')}</button><button class="btn danger" onclick="glQuitter()">${t('gl_quitter')}</button>`;
  $('e-groupe').querySelectorAll('[data-exclure]').forEach(b=>b.onclick=()=>glExclure(b.dataset.exclure));
  aller('groupe');
}
function glCopier(){const l=LIEN_GROUPE+GL.code;(navigator.clipboard?navigator.clipboard.writeText(l):Promise.reject()).then(()=>toast(t('gl_copie')),()=>prompt(t('gl_copier'),l))}
function glExclure(id){const m=GL.membres.find(x=>x.id===id);if(confirm(t('gl_exclureOk',{n:m.pseudo})))glFaire('exclure',async()=>{await rpc('dz_g_exclure',{p_jeton:S.gl.jeton,p_membre:id});await glVoir()})}
function glNouveau(){glFaire('code',async()=>{await rpc('dz_g_nouveau_code',{p_jeton:S.gl.jeton});await glVoir()})}
function glQuitter(){if(confirm(t('gl_quitterOk')))glFaire('quitter',async()=>{await rpc('dz_g_quitter',{p_jeton:S.gl.jeton});S.gl=null;sauver();ouvrirFamille()})}

// Leçons communes aux 9 langues seulement (les nouvelles f-* et m-* attendent relecture et traduction)
const glLecons=()=>LECONS.filter(l=>!/^(f|m)-/.test(l.id));
function glProposer(){return melanger(glLecons().flatMap(l=>questionsDe(l.id)).filter(q=>!q.m)).slice(0,NB_GROUPE).map(q=>q.uid)}
function glJouer(){return glFaire('jouer',async()=>{
  const u=await rpc('dz_g_quiz',{p_jeton:S.gl.jeton,p_uids:glProposer()}),tout=new Map(LECONS.flatMap(l=>questionsDe(l.id)).map(q=>[q.uid,q])),qs=u.map(x=>tout.get(x));
  if(qs.some(q=>!q)){const e=new Error('maj');e.code='maj';throw e}
  lancerQuiz(qs,GL.nom,{mode:'groupe',jour:GL.jour});
})}
const _finir=finir;
finir=function(){
  if(CTX.mode!=='groupe')return _finir();
  $('q-barre').style.width='100%';REP.forEach(x=>{noterErreur(x.q,x.juste);vue(x.q)});
  S.gl.attente={jour:CTX.jour,bonnes};S.gl.joue=CTX.jour;S.points+=PTS*POINTS_BONNE+activite();sauver();
  montrerResultat(bonnes,TOT,bonnes===TOT?t('resParfait'):bonnes>=TOT/2?t('resBravo'):t('resProgres'),'','ouvrirGroupes()',REP);
  glEnvoyer().catch(()=>toast(t('gl_enAttente')));
};
// Un score ne part que le jour même (heure de Paris, comme le serveur) : jamais compté pour un autre jour.
const glJourParis=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let GL_ENVOI=null;
function glEnvoyer(){return GL_ENVOI||(GL_ENVOI=glEnvoi().finally(()=>{GL_ENVOI=null}))}
async function glEnvoi(){
  const a=S.gl&&S.gl.attente;if(!a)return;
  if(a.jour!==glJourParis()){S.gl.attente=null;sauver();toast(t('gl_perdu'));return}
  const ok=await rpc('dz_g_score',{p_jeton:S.gl.jeton,p_bonnes:a.bonnes});
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
