/* Darsi — lien d'invitation ?groupe=CODE (WhatsApp) : le code se remplit tout seul, sur le web comme dans l'appli Android.
   Android : InvitationPlugin.java donne l'adresse touchée. Chargé après groupes.js et ramadan-soir.js. */
'use strict';
const INV_TXT={
 fr:{inv_ok:"Ton invitation est prête. Vérifie ton pseudo, puis touche le bouton.",inv_autre:"Saisir un autre code",inv_deja:"Tu es déjà dans ce groupe.",inv_autreGroupe:"Tu es déjà dans le groupe « {n} ». Pour rejoindre l'autre, quitte d'abord celui-ci (Gérer le groupe), puis touche à nouveau le lien.",inv_apres:"Invitation reçue. Tu la retrouveras dans l'onglet Famille."},
 en:{gl_msg:"Join our quiz on Darsi! Tap this link:\n{l}",gl_rejoindre:"Join a group",gl_code:"Invitation code",gl_pseudo:"Your nickname",gl_pseudoInfo:"Visible to the group. A nickname is enough, no need for your real name.",inv_ok:"Your invitation is ready. Check your nickname, then tap the button.",inv_autre:"Enter another code",inv_deja:"You are already in this group.",inv_autreGroupe:"You are already in the group “{n}”. To join the other one, leave this one first, then tap the link again.",inv_apres:"Invitation received. You'll find it in the Family tab."},
 ar:{gl_msg:"انضم إلى اختبارنا على Darsi! اضغط على هذا الرابط:\n{l}",gl_rejoindre:"الانضمام إلى مجموعة",gl_code:"رمز الدعوة",gl_pseudo:"اسمك المستعار",gl_pseudoInfo:"يظهر للمجموعة. يكفي اسم مستعار، لا حاجة إلى اسمك الحقيقي.",inv_ok:"دعوتك جاهزة. تحقق من اسمك المستعار ثم اضغط على الزر.",inv_autre:"إدخال رمز آخر",inv_deja:"أنت بالفعل في هذه المجموعة.",inv_autreGroupe:"أنت بالفعل في مجموعة «{n}». للانضمام إلى الأخرى، غادر هذه أولًا ثم اضغط على الرابط مجددًا.",inv_apres:"وصلت الدعوة. ستجدها في تبويب العائلة."},
 id:{gl_msg:"Ikuti kuis kami di Darsi! Ketuk tautan ini:\n{l}",gl_rejoindre:"Gabung grup",gl_code:"Kode undangan",gl_pseudo:"Nama panggilanmu",gl_pseudoInfo:"Terlihat oleh grup. Nama panggilan saja cukup, tidak perlu nama asli.",inv_ok:"Undanganmu siap. Periksa nama panggilanmu, lalu ketuk tombolnya.",inv_autre:"Masukkan kode lain",inv_deja:"Kamu sudah ada di grup ini.",inv_autreGroupe:"Kamu sudah ada di grup “{n}”. Untuk bergabung dengan yang lain, keluar dulu dari grup ini, lalu ketuk tautannya lagi.",inv_apres:"Undangan diterima. Lihat di tab Keluarga."},
 tr:{gl_msg:"Darsi'deki testimize katıl! Bu bağlantıya dokun:\n{l}",gl_rejoindre:"Gruba katıl",gl_code:"Davet kodu",gl_pseudo:"Takma adın",gl_pseudoInfo:"Grup tarafından görülür. Takma ad yeterli, gerçek adına gerek yok.",inv_ok:"Davetin hazır. Takma adını kontrol et, sonra düğmeye dokun.",inv_autre:"Başka bir kod gir",inv_deja:"Zaten bu gruptasın.",inv_autreGroupe:"Zaten “{n}” grubundasın. Diğerine katılmak için önce bu gruptan ayrıl, sonra bağlantıya tekrar dokun.",inv_apres:"Davet alındı. Aile sekmesinde bulabilirsin."},
 de:{gl_msg:"Mach bei unserem Quiz auf Darsi mit! Tippe auf diesen Link:\n{l}",gl_rejoindre:"Gruppe beitreten",gl_code:"Einladungscode",gl_pseudo:"Dein Spitzname",gl_pseudoInfo:"Für die Gruppe sichtbar. Ein Spitzname genügt, dein echter Name ist nicht nötig.",inv_ok:"Deine Einladung ist bereit. Prüfe deinen Spitznamen und tippe auf den Button.",inv_autre:"Anderen Code eingeben",inv_deja:"Du bist schon in dieser Gruppe.",inv_autreGroupe:"Du bist schon in der Gruppe „{n}“. Um der anderen beizutreten, verlasse zuerst diese und tippe dann erneut auf den Link.",inv_apres:"Einladung erhalten. Du findest sie im Tab Familie."},
 nl:{gl_msg:"Doe mee met onze quiz op Darsi! Tik op deze link:\n{l}",gl_rejoindre:"Lid worden van een groep",gl_code:"Uitnodigingscode",gl_pseudo:"Je bijnaam",gl_pseudoInfo:"Zichtbaar voor de groep. Een bijnaam is genoeg, je echte naam is niet nodig.",inv_ok:"Je uitnodiging staat klaar. Controleer je bijnaam en tik op de knop.",inv_autre:"Andere code invoeren",inv_deja:"Je zit al in deze groep.",inv_autreGroupe:"Je zit al in de groep ‘{n}’. Verlaat eerst deze groep om lid te worden van de andere en tik dan opnieuw op de link.",inv_apres:"Uitnodiging ontvangen. Je vindt die in het tabblad Familie."},
 es:{gl_msg:"¡Únete a nuestro quiz en Darsi! Toca este enlace:\n{l}",gl_rejoindre:"Unirse a un grupo",gl_code:"Código de invitación",gl_pseudo:"Tu apodo",gl_pseudoInfo:"Visible para el grupo. Basta un apodo, no hace falta tu nombre real.",inv_ok:"Tu invitación está lista. Revisa tu apodo y toca el botón.",inv_autre:"Introducir otro código",inv_deja:"Ya estás en este grupo.",inv_autreGroupe:"Ya estás en el grupo «{n}». Para unirte al otro, sal primero de este y vuelve a tocar el enlace.",inv_apres:"Invitación recibida. La encontrarás en la pestaña Familia."},
 it:{gl_msg:"Partecipa al nostro quiz su Darsi! Tocca questo link:\n{l}",gl_rejoindre:"Unisciti a un gruppo",gl_code:"Codice d'invito",gl_pseudo:"Il tuo soprannome",gl_pseudoInfo:"Visibile al gruppo. Basta un soprannome, non serve il tuo vero nome.",inv_ok:"Il tuo invito è pronto. Controlla il soprannome, poi tocca il pulsante.",inv_autre:"Inserisci un altro codice",inv_deja:"Sei già in questo gruppo.",inv_autreGroupe:"Sei già nel gruppo «{n}». Per unirti all'altro, esci prima da questo, poi tocca di nuovo il link.",inv_apres:"Invito ricevuto. Lo trovi nella scheda Famiglia."},
};
Object.keys(INV_TXT).forEach(l=>Object.assign(I18N[l],INV_TXT[l]));

const invCode=adresse=>{try{return (new URL(adresse,location.href).searchParams.get('groupe')||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8)}catch(e){return ''}};
function invMontrerCode(){const z=$('gl-code-zone');if(!z)return;z.hidden=false;['inv-ok','inv-autre'].forEach(i=>{const x=$(i);if(x)x.remove()})}
function invTraiter(){
  if(!S.invite||!enLigneOk())return;
  const occupe=['e-quiz','e-relais','e-question'].some(i=>$(i)&&$(i).classList.contains('actif'));   // jamais couper un quiz en cours
  if(S.gl){
    const meme=S.gl.code===S.invite,nom=S.gl.nom||'';delete S.invite;sauver();
    if(!occupe)ouvrirFamille();
    if(meme)toast(t('inv_deja'));else invFenetre(t('inv_autreGroupe',{n:nom}));
    return;
  }
  if(!S.demarre&&!S.prenom)return;   // nouveau joueur : après l'écran de bienvenue
  if(occupe){toast(t('inv_apres'));return}
  glFormulaire('rejoindre');
}
function invFenetre(texte){setTimeout(()=>alert(texte),60)}   // reste à l'écran jusqu'à ce qu'on l'ait lu
function invRecevoir(adresse){const c=invCode(adresse);if(!c)return;S.invite=c;sauver();invTraiter()}

const _invCommencer=commencer;
commencer=function(){_invCommencer();if(S.invite)invTraiter()};
(function(){
  const c=invCode(location.href);
  if(c){S.invite=c;sauver();history.replaceState(null,'',location.pathname)}
  invTraiter();
  const P=window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.Plugins&&Capacitor.Plugins.Invitation;
  if(!P)return;
  const lire=()=>P.lire().then(r=>{if(r&&r.url)invRecevoir(r.url)}).catch(()=>{});
  P.addListener('lien',lire);lire();
})();
