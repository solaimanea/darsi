/* Darsi — « i » sur chaque question : signaler un problème (réponse douteuse, source insuffisante…).
   Serveur branché (js/en_ligne.js) : envoi anonyme par dz_signaler (serveur/signalements.sql) ; sans réseau, gardé puis renvoyé.
   Serveur non branché : e-mail prérempli, que l'utilisateur relit et envoie lui-même. */
'use strict';
const EMAIL_SIGNALEMENT='jinastudios.support@gmail.com';
const MOTIFS=['faux','source','formulation','difficile','facile','langue','autre'];
function boutonSignaler(uids){
  const L=uids.filter(Boolean);
  return L.length?`<button type="button" class="btn-sig" data-sig="${L.join(' ')}" onclick="event.stopPropagation();ouvrirSignalement(this.dataset.sig.split(' '))" aria-label="${esc(t('sig_titre'))}">${ic('info','sm')}</button>`:'';
}
function ouvrirSignalement(uids){
  const qs=uids.map(questionParUid).filter(Boolean);if(!qs.length)return;
  const d=document.createElement('dialog');d.className='sig';
  d.innerHTML=`<form method="dialog"><h2>${esc(t('sig_titre'))}</h2><p class="doux">${esc(t('sig_intro'))}</p>
    ${qs.length>1?`<label class="sig-q">${esc(t('sig_question'))}<select>${qs.map((q,i)=>`<option value="${i}">${esc(q.q)}</option>`).join('')}</select></label>`:`<p class="sig-txt">${esc(qs[0].q)}</p>`}
    <div class="sig-motifs">${MOTIFS.map(m=>`<label><input type="radio" name="motif" value="${m}"><span>${esc(t('sig_'+m))}</span></label>`).join('')}</div>
    <textarea maxlength="500" rows="3" aria-label="${esc(t('sig_detail'))}" placeholder="${esc(t('sig_detail'))}"></textarea>
    <p class="petit">${esc(t(enLigneOk()?'sig_anonyme':'sig_mail'))}</p>
    <button type="button" class="btn" disabled>${esc(t('sig_envoyer'))}</button><button class="btn secondaire">${esc(t('sig_annuler'))}</button></form>`;
  const ok=d.querySelector('.btn');
  d.querySelectorAll('[name=motif]').forEach(x=>x.onchange=()=>{ok.disabled=false});
  ok.onclick=()=>{const q=qs[+(d.querySelector('select')||{value:0}).value],motif=d.querySelector('[name=motif]:checked').value,detail=d.querySelector('textarea').value.trim();
    d.close();envoyerSignalement({uid:q.uid,langue:S.langue,motif,detail,question:q.q.slice(0,400)})};
  d.onclose=()=>d.remove();d.onclick=e=>{if(e.target===d)d.close()};
  document.body.appendChild(d);d.showModal();
}
function adresseMail(x){
  const corps=[t('sig_titre'),'',x.question,'',t('sig_'+x.motif),x.detail,'','['+x.uid+' · '+x.langue+']'].join('\n');
  return 'mailto:'+EMAIL_SIGNALEMENT+'?subject='+encodeURIComponent(NOM_APP+' – '+x.uid+' – '+x.motif)+'&body='+encodeURIComponent(corps);
}
function envoyerSignalement(x){
  if(!enLigneOk()){const a=document.createElement('a');a.href=adresseMail(x);a.click();return}
  (S.signalements=S.signalements||[]).push(x);S.signalements=S.signalements.slice(-30);sauver();
  viderSignalements().then(ok=>toast(t(ok?'sig_merci':'sig_garde')));
}
let SIG_ENVOI=false;
async function viderSignalements(){
  if(SIG_ENVOI||!enLigneOk())return false;SIG_ENVOI=true;
  try{while((S.signalements||[]).length){const x=S.signalements[0];
      try{await rpc('dz_signaler',{p_uid:x.uid,p_langue:x.langue,p_motif:x.motif,p_detail:x.detail,p_question:x.question})}
      catch(e){if(e.code!=='donnees')return false}   // refusé pour de bon : on n'insiste pas
      S.signalements.shift();sauver()}
    return true;
  }finally{SIG_ENVOI=false}
}
addEventListener('online',()=>{viderSignalements()});
viderSignalements();
