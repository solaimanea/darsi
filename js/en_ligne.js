/* Darsi — connexion au serveur « Demander à l'imam » (Supabase → Project Settings → API).
   La clé « publishable / anon » est faite pour être dans une appli : elle ne donne accès qu'aux fonctions dz_*.
   Ne JAMAIS mettre ici la clé « secret / service_role ».
   Tant que url et key sont vides, l'écran « Demander à l'imam » affiche « bientôt disponible ». */
'use strict';
const DARSI_EN_LIGNE={
  url:'',   // ex. 'https://xxxxxxxx.supabase.co'
  key:'',   // ex. 'sb_publishable_…'
};
const enLigneOk=()=>!!(DARSI_EN_LIGNE.url&&DARSI_EN_LIGNE.key);

/** Appelle une fonction dz_* du serveur. Rejette avec une erreur dont .code vaut :
 *  'hors_ligne' (pas de réseau), 'config' (serveur pas branché) ou le message SQL ('code', 'bloque', 'trop'…). */
async function rpc(fn,args={}){
  if(!enLigneOk()){const e=new Error('config');e.code='config';throw e}
  let r;
  try{
    r=await fetch(DARSI_EN_LIGNE.url.replace(/\/$/,'')+'/rest/v1/rpc/'+fn,{method:'POST',
      headers:{'Content-Type':'application/json',apikey:DARSI_EN_LIGNE.key,Authorization:'Bearer '+DARSI_EN_LIGNE.key},
      body:JSON.stringify(args)});
  }catch(x){const e=new Error('hors_ligne');e.code='hors_ligne';throw e}
  const txt=await r.text();let d=null;try{d=txt?JSON.parse(txt):null}catch(x){}
  if(!r.ok){const m=(d&&(d.message||d.hint))||'erreur';const e=new Error(m);e.code=m;throw e}
  return d;
}
