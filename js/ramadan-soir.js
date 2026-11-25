/* Darsi — Ramadan : quiz pour soi dans la journée, quiz de la famille le soir, rappel avant le coucher du soleil (2026-11-25).
   - Pour soi : leçon du jour + son quiz (inchangé).
   - Famille (onglet Famille, groupes.js) : pendant le Ramadan, 7 questions de la leçon du jour + 3 des jours passés.
     Le premier joueur fixe la liste pour tout le groupe ; à égalité de points, le plus rapide passe devant.
   - Rappel : appli Android seulement (une web app ne sait pas programmer une notification sans serveur).
     L'heure du coucher est calculée sur le téléphone et n'est JAMAIS affichée : avec une position approximative,
     personne ne doit s'en servir pour rompre le jeûne. Chargé après groupes.js. */
'use strict';
const RS_AVANT=45,RS_ID=71000,RS_JOUR=7,RS_PASSE=3;
const RS_TXT={
 fr:{nf_titre:"Ne rate pas le quiz",nf_txt:"Pendant le Ramadan, {app} peut te prévenir un peu avant la rupture du jeûne : c'est l'heure du quiz en famille. Tu peux changer d'avis à tout moment.",nf_oui:"Autoriser les notifications",nf_non:"Plus tard",gl_e_date:"Vérifie la date et l'heure de ton téléphone.",rs_soi:"Pour toi",rs_soiT:"La leçon du jour et son quiz, à ton rythme.",rs_fam:"En famille, le soir",rs_famT:"Les questions de la leçon du jour. Réponds juste, puis vite.",rs_rappel:"Rappel avant la rupture du jeûne",rs_rappelT:"Une notification environ 45 minutes avant le coucher du soleil, pendant le Ramadan.",rs_titre:"Le quiz du soir t'attend",rs_corps:"Jour {n} : retrouve ta famille autour des questions du jour.",rs_corps30:"C'est le jour du Grand Quiz.",rs_duSoir:"Quiz du soir · Ramadan",rs_refus:"Autorise les notifications de {app} dans les réglages du téléphone."},
 en:{nf_titre:"Don't miss the quiz",nf_txt:"During Ramadan, {app} can remind you shortly before breaking the fast: it's family quiz time. You can change your mind at any time.",nf_oui:"Allow notifications",nf_non:"Later",gl_e_date:"Check your phone's date and time.",rs_soi:"For you",rs_soiT:"Today's lesson and its quiz, at your own pace.",rs_fam:"With family, in the evening",rs_famT:"Questions from today's lesson. Answer right, then fast.",rs_rappel:"Reminder before breaking the fast",rs_rappelT:"A notification about 45 minutes before sunset, during Ramadan.",rs_titre:"The evening quiz is waiting",rs_corps:"Day {n}: join your family for today's questions.",rs_corps30:"It's Grand Quiz day.",rs_duSoir:"Evening quiz · Ramadan",rs_refus:"Allow notifications for {app} in your phone settings."},
 ar:{nf_titre:"لا تفوّت الاختبار",nf_txt:"خلال رمضان، يمكن لـ{app} تذكيرك قبيل الإفطار: إنه وقت اختبار العائلة. يمكنك تغيير رأيك في أي وقت.",nf_oui:"السماح بالإشعارات",nf_non:"لاحقًا",gl_e_date:"تحقق من تاريخ هاتفك ووقته.",rs_soi:"لك",rs_soiT:"درس اليوم واختباره، على مهلك.",rs_fam:"مع العائلة مساءً",rs_famT:"أسئلة من درس اليوم. أجب صوابًا ثم بسرعة.",rs_rappel:"تذكير قبل الإفطار",rs_rappelT:"إشعار قبل غروب الشمس بنحو 45 دقيقة خلال رمضان.",rs_titre:"اختبار المساء بانتظارك",rs_corps:"اليوم {n}: اجتمع مع عائلتك حول أسئلة اليوم.",rs_corps30:"اليوم هو يوم الاختبار الكبير.",rs_duSoir:"اختبار المساء · رمضان",rs_refus:"اسمح بإشعارات {app} في إعدادات الهاتف."},
 id:{nf_titre:"Jangan lewatkan kuisnya",nf_txt:"Selama Ramadan, {app} bisa mengingatkanmu menjelang berbuka: waktunya kuis keluarga. Kamu bisa berubah pikiran kapan saja.",nf_oui:"Izinkan notifikasi",nf_non:"Nanti",gl_e_date:"Periksa tanggal dan jam ponselmu.",rs_soi:"Untukmu",rs_soiT:"Pelajaran hari ini dan kuisnya, sesuai kecepatanmu.",rs_fam:"Bersama keluarga, sore hari",rs_famT:"Pertanyaan dari pelajaran hari ini. Jawab benar, lalu cepat.",rs_rappel:"Pengingat sebelum berbuka",rs_rappelT:"Notifikasi sekitar 45 menit sebelum matahari terbenam, selama Ramadan.",rs_titre:"Kuis sore menantimu",rs_corps:"Hari {n}: kumpul bersama keluarga untuk pertanyaan hari ini.",rs_corps30:"Hari ini Kuis Besar.",rs_duSoir:"Kuis sore · Ramadan",rs_refus:"Izinkan notifikasi {app} di pengaturan ponsel."},
 tr:{nf_titre:"Testi kaçırma",nf_txt:"Ramazan boyunca {app}, iftardan kısa süre önce seni uyarabilir: aile testi zamanı. Fikrini istediğin zaman değiştirebilirsin.",nf_oui:"Bildirimlere izin ver",nf_non:"Daha sonra",gl_e_date:"Telefonunun tarih ve saatini kontrol et.",rs_soi:"Senin için",rs_soiT:"Günün dersi ve testi, kendi hızında.",rs_fam:"Akşam aileyle",rs_famT:"Günün dersinden sorular. Önce doğru, sonra hızlı cevapla.",rs_rappel:"İftardan önce hatırlatma",rs_rappelT:"Ramazan boyunca gün batımından yaklaşık 45 dakika önce bildirim.",rs_titre:"Akşam testi seni bekliyor",rs_corps:"{n}. gün: günün soruları için ailenle buluş.",rs_corps30:"Bugün Büyük Test günü.",rs_duSoir:"Akşam testi · Ramazan",rs_refus:"Telefon ayarlarında {app} bildirimlerine izin ver."},
 de:{nf_titre:"Verpass das Quiz nicht",nf_txt:"Im Ramadan kann dich {app} kurz vor dem Fastenbrechen erinnern: Zeit für das Familienquiz. Du kannst es jederzeit ändern.",nf_oui:"Benachrichtigungen erlauben",nf_non:"Später",gl_e_date:"Prüfe Datum und Uhrzeit deines Handys.",rs_soi:"Für dich",rs_soiT:"Die Lektion des Tages mit Quiz, in deinem Tempo.",rs_fam:"Abends mit der Familie",rs_famT:"Fragen aus der Lektion des Tages. Erst richtig, dann schnell antworten.",rs_rappel:"Erinnerung vor dem Fastenbrechen",rs_rappelT:"Eine Benachrichtigung etwa 45 Minuten vor Sonnenuntergang, im Ramadan.",rs_titre:"Das Abendquiz wartet",rs_corps:"Tag {n}: Triff deine Familie bei den Fragen des Tages.",rs_corps30:"Heute ist das große Quiz.",rs_duSoir:"Abendquiz · Ramadan",rs_refus:"Erlaube Benachrichtigungen von {app} in den Telefoneinstellungen."},
 nl:{nf_titre:"Mis de quiz niet",nf_txt:"Tijdens de ramadan kan {app} je kort voor het verbreken van het vasten herinneren: tijd voor de familiequiz. Je kunt dit altijd wijzigen.",nf_oui:"Meldingen toestaan",nf_non:"Later",gl_e_date:"Controleer de datum en tijd van je telefoon.",rs_soi:"Voor jou",rs_soiT:"De les van vandaag met de quiz, in je eigen tempo.",rs_fam:"'s Avonds met het gezin",rs_famT:"Vragen uit de les van vandaag. Eerst juist, dan snel.",rs_rappel:"Herinnering voor het verbreken van het vasten",rs_rappelT:"Een melding ongeveer 45 minuten voor zonsondergang, tijdens de ramadan.",rs_titre:"De avondquiz wacht op je",rs_corps:"Dag {n}: kom met je familie samen rond de vragen van vandaag.",rs_corps30:"Vandaag is de Grote Quiz.",rs_duSoir:"Avondquiz · Ramadan",rs_refus:"Sta meldingen van {app} toe in de telefooninstellingen."},
 es:{nf_titre:"No te pierdas el quiz",nf_txt:"Durante el Ramadán, {app} puede avisarte un poco antes de romper el ayuno: es la hora del quiz en familia. Puedes cambiar de opinión cuando quieras.",nf_oui:"Permitir notificaciones",nf_non:"Más tarde",gl_e_date:"Comprueba la fecha y la hora de tu teléfono.",rs_soi:"Para ti",rs_soiT:"La lección del día y su quiz, a tu ritmo.",rs_fam:"En familia, por la tarde",rs_famT:"Preguntas de la lección del día. Responde bien y luego rápido.",rs_rappel:"Recordatorio antes de romper el ayuno",rs_rappelT:"Una notificación unos 45 minutos antes de la puesta del sol, durante el Ramadán.",rs_titre:"El quiz de la tarde te espera",rs_corps:"Día {n}: reúnete con tu familia en torno a las preguntas del día.",rs_corps30:"Hoy es el Gran Quiz.",rs_duSoir:"Quiz de la tarde · Ramadán",rs_refus:"Permite las notificaciones de {app} en los ajustes del teléfono."},
 it:{nf_titre:"Non perdere il quiz",nf_txt:"Durante il Ramadan, {app} può avvisarti poco prima di rompere il digiuno: è l'ora del quiz in famiglia. Puoi cambiare idea quando vuoi.",nf_oui:"Consenti le notifiche",nf_non:"Più tardi",gl_e_date:"Controlla la data e l'ora del telefono.",rs_soi:"Per te",rs_soiT:"La lezione del giorno e il suo quiz, al tuo ritmo.",rs_fam:"In famiglia, la sera",rs_famT:"Domande dalla lezione del giorno. Rispondi bene, poi in fretta.",rs_rappel:"Promemoria prima di rompere il digiuno",rs_rappelT:"Una notifica circa 45 minuti prima del tramonto, durante il Ramadan.",rs_titre:"Il quiz della sera ti aspetta",rs_corps:"Giorno {n}: ritrova la famiglia attorno alle domande del giorno.",rs_corps30:"Oggi è il giorno del Grande Quiz.",rs_duSoir:"Quiz della sera · Ramadan",rs_refus:"Consenti le notifiche di {app} nelle impostazioni del telefono."}
};
Object.keys(RS_TXT).forEach(l=>Object.assign(I18N[l],RS_TXT[l]));

/* Coucher du soleil (formule NOAA) : renvoie une Date, ou null (nuit/jour polaire). */
function rsCoucher(d,lat,lon){
  const rad=Math.PI/180,n=Math.round((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(d.getFullYear(),0,1))/864e5)+1;
  const g=2*Math.PI/365*(n-1+.5);
  const eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g));
  const dec=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g);
  const c=Math.cos(90.833*rad)/(Math.cos(lat*rad)*Math.cos(dec))-Math.tan(lat*rad)*Math.tan(dec);
  if(!(Math.abs(c)<=1))return null;
  const min=720-4*lon+4*Math.acos(c)/rad-eq;   // minutes UTC
  let c2=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())+min*6e4);
  // près de la ligne de changement de date (Kiribati, Samoa…) : on garde le coucher du bon jour local
  const ec=Math.round((new Date(c2.getFullYear(),c2.getMonth(),c2.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/864e5);
  return new Date(c2.getTime()-ec*864e5);
}
function rsHeure(d){
  const L=lieuQibla(),c=L?rsCoucher(d,L.lat,L.lon):null;
  return c?new Date(c.getTime()-RS_AVANT*6e4):new Date(d.getFullYear(),d.getMonth(),d.getDate(),17,30);
}

/* ---------- Quiz de la famille pendant le Ramadan ---------- */
const rsJour=()=>{const R=ramadanCourant();return R&&R.etat==='pendant'?Math.min(R.jour,30):0};
function rsQuestions(j){
  const simples=id=>melanger(questionsDe(id).filter(q=>!q.m));
  const duJour=j<=29?simples(PROG_RAMADAN[j-1]).slice(0,j===1?NB_GROUPE:RS_JOUR):[];
  const passes=melanger(PROG_RAMADAN.slice(0,j-1)).map(id=>simples(id)[0]).filter(Boolean).slice(0,NB_GROUPE-duJour.length);
  const manque=NB_GROUPE-duJour.length-passes.length,prises=new Set(duJour.concat(passes).map(q=>q.uid));
  const reste=manque>0?melanger(PROG_RAMADAN.slice(0,j).flatMap(simples).filter(q=>!prises.has(q.uid))).slice(0,manque):[];
  return melanger(duJour.concat(passes,reste));
}
const _rsProposer=glProposer;
glProposer=function(){const j=rsJour();return j?rsQuestions(j).map(q=>q.uid):_rsProposer()};
const _rsDessiner=glDessiner;
glDessiner=function(...a){const r=_rsDessiner(...a);
  if(rsJour()){const s=document.querySelector('#e-famille .fam-jour:not(.fait) .surtitre');
    if(s){s.textContent=t('rs_duSoir');s.parentNode.querySelector('.fam-gros').insertAdjacentHTML('afterend',`<p>${t('rs_famT')}</p>`)}}
  return r};

/* ---------- Écran Ramadan : pour soi / en famille / rappel ---------- */
const rsPlugin=()=>window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform()&&Capacitor.Plugins&&Capacitor.Plugins.LocalNotifications;
const rsCase=()=>rsPlugin()?`<div class="ligne-theme" role="switch" aria-checked="${!!S.rappelRam}" id="rs-rappel" onclick="rsBasculer()"><div class="pastille">${ic('chrono')}</div>
  <div class="milieu"><b>${t('rs_rappel')}</b><div class="petit">${t('rs_rappelT')}</div></div><span class="rs-inter${S.rappelRam?' oui':''}"><i></i></span></div>`:'';
const _rsRamadan=ouvrirRamadan;
ouvrirRamadan=function(){
  _rsRamadan();const R=ramadanCourant(),z=document.querySelector('#e-ramadan .carte');if(!R||!z||R.etat==='fini')return;
  const j=rsJour(),D=ramDonnees(R.an),fait1=j&&(j===30?D.final!==null:D.jours[j]!==undefined);
  const soi=j?`onclick="${j===30?'ouvrirRevisionFinale()':`ouvrirLecon(PROG_RAMADAN[${j-1}],{an:${R.an},jour:${j}})`}"`:'';
  z.insertAdjacentHTML('beforebegin',`<div class="carte" id="rs-carte">
    <div class="ligne-theme" ${soi}><div class="pastille">${ic(fait1?'check':'livre')}</div><div class="milieu"><b>${t('rs_soi')}</b><div class="petit">${t('rs_soiT')}</div></div>${j?ic('droite','sm'):''}</div>
    <div class="ligne-theme" onclick="ouvrirFamille()"><div class="pastille">${ic('famille')}</div><div class="milieu"><b>${t('rs_fam')}</b><div class="petit">${t('rs_famT')}</div></div>${ic('droite','sm')}</div>${rsCase()}</div>`);
};
async function rsBasculer(){
  const P=rsPlugin();if(!P)return;
  if(!S.rappelRam){let p={};try{p=await P.requestPermissions()}catch(e){}
    if(p.display!=='granted'){toast(t('rs_refus'));return}}
  S.rappelRam=!S.rappelRam;sauver();rsProgrammer();   // sans attendre : programmer 30 rappels prend plusieurs secondes

  const z=$('rs-rappel');if(z)z.outerHTML=rsCase();
}
/** Liste des rappels à venir (30 au plus), sans ceux d'aujourd'hui si tout est déjà fait. */
function rsListe(maintenant=new Date()){
  const R=ramadanCourant();if(!R||R.etat==='fini')return [];
  const D=ramDonnees(R.an),[a,m,d]=R.debut.split('-').map(Number),L=[];
  for(let n=1;n<=30;n++){
    const jour=new Date(a,m-1,d+n-1),at=rsHeure(jour);if(at<=maintenant)continue;
    const soi=n===30?D.final!==null:D.jours[n]!==undefined,fam=!S.gl||S.gl.joue===dateCle(jour);
    if(soi&&fam&&dateCle(jour)===dateCle())continue;
    L.push({id:RS_ID+n,isExactNotification:false,title:t('rs_titre'),body:n===30?t('rs_corps30'):t('rs_corps',{n}),schedule:{at,allowWhileIdle:true}});
  }
  return L;
}
let RS_FILE=Promise.resolve();
function rsProgrammer(){return RS_FILE=RS_FILE.then(async()=>{
  const P=rsPlugin();if(!P)return;
  try{await P.cancel({notifications:Array.from({length:30},(_,k)=>({id:RS_ID+k+1}))});
    if(S.rappelRam){const L=rsListe();if(L.length)await P.schedule({notifications:L})}}catch(e){}
})}
if(rsPlugin()){
  setTimeout(rsProgrammer,3000);   // à chaque ouverture : date, position et langue à jour
  document.addEventListener('visibilitychange',()=>{if(S.rappelRam)rsProgrammer()});
  rsPlugin().addListener('localNotificationActionPerformed',()=>{if(S.demarre)ouvrirRamadan()});
}

/* ---------- Demande d'autorisation : juste après le prénom et la langue (une fois ; les joueurs déjà inscrits, à l'ouverture) ---------- */
function rsDemander(){
  if(!rsPlugin()||S.demandeNotif||document.getElementById('tuto'))return;
  const z=document.createElement('div');z.id='tuto';z.setAttribute('role','dialog');z.setAttribute('aria-modal','true');
  z.innerHTML=`<div class="tu-in" style="text-align:center"><div class="pastille" style="width:84px;height:84px;border-radius:26px;margin:0 auto 20px">${ic('lanterne','xl')}</div>
    <h2>${t('nf_titre')}</h2><p class="doux" style="line-height:1.6;margin-bottom:26px">${t('nf_txt')}</p>
    <button class="btn" id="nf-oui">${t('nf_oui')}</button><button class="btn sec" id="nf-non">${t('nf_non')}</button></div>`;
  document.body.appendChild(z);
  const fin=()=>{S.demandeNotif=1;sauver();z.remove()};
  z.querySelector('#nf-non').onclick=fin;
  z.querySelector('#nf-oui').onclick=async()=>{z.querySelector('#nf-oui').disabled=true;if(!S.rappelRam)await rsBasculer();fin()};
}
const _rsCommencer=commencer;
commencer=function(){_rsCommencer();setTimeout(rsDemander,350)};
(function attendre(n){if(!rsPlugin()||!(S.demarre||S.prenom)||n>30)return;
  if(document.querySelector('.op-skip'))return setTimeout(()=>attendre(n+1),1000);   // l'animation d'ouverture d'abord
  rsDemander()})(0);
