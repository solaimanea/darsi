/* Darsi — partager une carte en image : 20 fonds (photos CC BY / CC0, outils/fonds.json), story 9:16 ou carré.
   Le texte n'est jamais coupé : il rétrécit, et si même la plus petite taille ne suffit pas, l'image est refusée. */
'use strict';
// [clé, départ du carré (part de la hauteur), nom français, nom anglais]
const FONDS=[["kaaba", 0.12, "Kaaba, La Mecque", "Kaaba, Makkah"], ["medine", 0.14, "Mosquée du Prophète, Médine", "Prophet's Mosque, Madinah"], ["nabawi", 0.05, "Mosquée du Prophète (intérieur), Médine", "Prophet's Mosque (interior), Madinah"], ["minaret", 0.02, "Minaret, Médine", "Minaret, Madinah"], ["qaboos", 0.02, "Mosquée Sultan Qabous, Mascate", "Sultan Qaboos Mosque, Muscat"], ["lustre", 0.05, "Lustre, mosquée Sultan Qabous", "Chandelier, Sultan Qaboos Mosque"], ["arcade", 0.02, "Arcades, mosquée Sultan Qabous", "Arcade, Sultan Qaboos Mosque"], ["nizwa", 0.16, "Mosquée de Nizwa, Oman", "Nizwa mosque, Oman"], ["jumeirah", 0.1, "Mosquée de Jumeirah, Dubaï", "Jumeirah Mosque, Dubai"], ["bahrein", 0.0, "Grande mosquée, Bahreïn", "Grand mosque, Bahrain"], ["isa", 0.02, "Mosquée d'Isa Town, Bahreïn", "Isa Town mosque, Bahrain"], ["doha", 0.14, "Mosquée Imam Abd al-Wahhab, Doha", "Imam Abd al-Wahhab Mosque, Doha"], ["koweit", 0.12, "Grande Mosquée, Koweït", "Grand Mosque, Kuwait"], ["ortakoy", 0.1, "Mosquée d’Ortaköy, Istanbul", "Ortaköy Mosque, Istanbul"], ["suleymaniye", 0.03, "Süleymaniye, Istanbul", "Süleymaniye, Istanbul"], ["camlica", 0.06, "Mosquée de Çamlıca, Istanbul", "Çamlıca Mosque, Istanbul"], ["putra", 0.12, "Mosquée Putra, Malaisie", "Putra Mosque, Malaysia"], ["coupole", 0.12, "Coupole, mosquée Putra", "Dome, Putra Mosque"], ["kinabalu", 0.2, "Mosquée de Kota Kinabalu, Malaisie", "Kota Kinabalu Mosque, Malaysia"], ["brunei", 0.03, "Mosquée Omar Ali Saifuddien, Brunei", "Omar Ali Saifuddien Mosque, Brunei"]];
// Teintes fumées au choix (posées sur la photo), intensité réglable
const TEINTES={noir:[8,8,10],nuit:[8,20,48],vert:[3,33,26],brun:[46,26,12],bordeaux:[52,8,22],ardoise:[38,48,58]};
function partieCarte(C,brut){
  const v=k=>{const x=QURAN[k.slice(2)];return{ar:x.ar,ph:phVerset(k),tr:S.langue==='ar'?'':(x.tr[S.langue]||x.tr.en),ref:refCourte(k),credit:S.langue==='ar'?'':t('tradCoran',{t:TRADUCTEURS_CORAN[S.langue]||TRADUCTEURS_CORAN.en}),brut}};
  if(C.type==='verset')return v(C.v);
  if(C.r){if(C.r.v)return v(C.r.v);const s=sensRappel(C.r);return{ar:C.r.ar,ph:C.r.ph,tr:s&&'« '+s+' »',ref:refCourte(C.r.src),credit:s?t('sensEquipe'):'',brut}}
  if(C.type==='inv'){const d=C.d;if(d.v)return{...v(d.v),titre:d.titre};
    return{titre:d.titre,ar:d.ar,ph:d.ph,tr:S.langue==='ar'?'':sensDe(d),ref:(d.src||[]).map(refCourte).filter(Boolean)[0]||'',credit:S.langue==='ar'?'':d.coran?t('tradCoran',{t:TRADUCTEURS_CORAN.fr}):t('sensEquipe'),brut}}
  return{titre:C.titre,tr:C.texte,ref:lecon(C.id).titre===C.titre?'':lecon(C.id).titre,brut};
}
const chargerImg=u=>new Promise((ok,ko)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=ko;i.src=u});
const FOND_IMG={};
function fondImage(k){
  return FOND_IMG[k]||(FOND_IMG[k]=(FOND_DATA[k]?Promise.resolve():new Promise((ok,ko)=>{const s=document.createElement('script');s.src='media/fonds/'+k+'.js';s.onload=ok;s.onerror=()=>{s.remove();ko()};document.head.appendChild(s)}))
    .then(()=>chargerImg(FOND_DATA[k])).catch(e=>{delete FOND_IMG[k];throw e}));
}
// Un signe de pause du Coran reste collé à son mot (le texte n'est pas modifié, seulement l'espace devant le signe)
function lignes(x,texte,larg){const out=[];
  for(const par of String(texte).replace(/[ \u00A0]+(?=[\u06D6-\u06ED])/g,'').split('\n')){let l='';
    for(const m of par.split(/\s+/)){const e=l?l+' '+m:m;if(l&&x.measureText(e).width>larg){out.push(l);l=m}else l=e}
    if(l)out.push(l)}
  return out}
function mettreEnPage(x,P,larg,haut,f,M){
  const rtl=S.langue==='ar',corps=rtl?'Tajawal':'Inter',ar=P.ar&&M.ar,tr=P.tr&&(!P.ar||M.tr),ph=P.ph&&!rtl&&M.ph;
  const defs=[['titre',P.ar?'':P.titre,`700 ${40*f}px ${rtl?'Tajawal':'Fraunces'},serif`,1.32,'#f7dca0'],['ar',ar?P.ar:'',`700 ${62*f}px Amiri,"Geeza Pro",serif`,2.25,'#fff6dc'],
    ['ph',ph?P.ph:'',`italic 400 ${30*f}px ${corps},sans-serif`,1.4,'#f7dca0'],['tr',tr?P.tr:'',`500 ${39*f}px ${corps},sans-serif`,1.42,'#ffffff'],
    ['ref',P.ref,`600 ${25*f}px ${corps},sans-serif`,1.4,'#f0cf88'],['credit',tr&&P.ar?P.credit:'',`400 ${19*f}px ${corps},sans-serif`,1.4,'#e4e4e0']];   // la référence reste toujours : on ne partage pas un verset sans sa source
  let h=0;const L=[];
  for(const [k,txt,font,lh,coul] of defs){if(!txt)continue;x.font=font;x.direction=k==='ar'||rtl?'rtl':'ltr';const px=parseFloat(font.match(/([\d.]+)px/)[1]),ll=lignes(x,txt,larg);
    if(L.length)h+=22*f;L.push({k,font,coul,px,lh:px*lh,ll,y:h});h+=ll.length*px*lh}
  return{L,h,ok:h<=haut};
}
// Rend la carte. O = {cle, format, teinte, force (0 à 1), montre:{ar,tr,ph}}. ok=false si le texte ne tient pas.
async function dessinerCarte(cv,P,O){
  const W=1080,story=O.format==='story',H=story?1920:1080,logo=await chargerImg(LOGO_CARTE),[r,v,b]=TEINTES[O.teinte]||TEINTES.noir,rgba=a=>`rgba(${r},${v},${b},${a})`;
  await Promise.all(['700 58px Amiri','italic 400 29px Inter','500 36px Inter','600 25px Inter','700 38px Fraunces','500 36px Tajawal'].map(f=>document.fonts.load(f,f.includes('Amiri')||f.includes('Tajawal')?'سلام':'Aé').catch(()=>0)));
  const img=O.cle?await fondImage(O.cle):null,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');let g;
  if(img){const e=W/img.width,sh=H/e,dec=story?0:(FONDS.find(z=>z[0]===O.cle)||[])[1]||0;x.imageSmoothingQuality='high';x.drawImage(img,0,Math.min(dec*img.height,img.height-sh),img.width,sh,0,0,W,H)}
  else{g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,`rgb(${r+44},${v+44},${b+44})`);g.addColorStop(1,`rgb(${r},${v},${b})`);x.fillStyle=g;x.fillRect(0,0,W,H)}
  const marge=story?56:44,bas=story?270:120,haut=story?230:60,larg=W-2*(story?84:72),dispo=H-bas-haut;
  let M=null,f=story?1.15:.95;for(;f>=.5;f-=.03){M=mettreEnPage(x,P,larg,f>(story?.8:.66)?dispo*.7:dispo,f,O.montre);if(M.ok)break}
  if(!M.ok)return{ok:false};
  const y0=H-bas-M.h;
  if(img){x.fillStyle=rgba(O.force*.1);x.fillRect(0,0,W,H);
    const d=Math.max(0,y0-(story?360:220));g=x.createLinearGradient(0,d,0,H);const k=Math.max(.05,Math.min(.9,(y0-d)/(H-d)));
    g.addColorStop(0,rgba(0));g.addColorStop(k,rgba(O.force*.8));g.addColorStop(1,rgba(Math.min(1,O.force*1.05)));x.fillStyle=g;x.fillRect(0,d,W,H-d)}
  x.textAlign='center';x.textBaseline='middle';x.shadowColor='rgba(0,0,0,.85)';x.shadowBlur=14;x.shadowOffsetY=2;
  for(const q of M.L){x.font=q.font;x.fillStyle=q.coul;x.direction=q.k==='ar'||S.langue==='ar'?'rtl':'ltr';q.ll.forEach((l,i)=>x.fillText(l,W/2,y0+q.y+q.lh*(i+.5)))}
  // logo discret : le coin le plus uni et le plus sombre (les coins du bas sont sous le texte)
  const lw=story?138:118,lh=lw*logo.height/logo.width,yh=story?170:marge,yb=story?H-marge-lh-70:H-32-lh;
  let best=null;[[W-marge-lw,yb],[marge,yb],[W-marge-lw,yh],[marge,yh]].forEach(([cx,cy],i)=>{if(i>1&&cy+lh>y0-20)return;const d=x.getImageData(cx,cy,lw,lh).data;let s=0,s2=0,n=0;
    for(let p=0;p<d.length;p+=16){const l=.3*d[p]+.59*d[p+1]+.11*d[p+2];s+=l;s2+=l*l;n++}
    const m=s/n,note=Math.sqrt(Math.max(0,s2/n-m*m))*1.6+m*.5;if(!best||note<best.note-6)best={i,note,cx,cy}});
  x.globalAlpha=.92;x.shadowBlur=12;x.drawImage(logo,best.cx,best.cy,lw,lh);
  // crédit du photographe (exigé par CC BY), petit mais lisible, à l'opposé du logo
  const K=FOND_CREDITS[O.cle];if(img&&K){x.font='400 17px Inter,sans-serif';x.direction='ltr';x.globalAlpha=.8;x.shadowBlur=6;x.fillStyle='#fff';const g1=best.i===1;x.textAlign=g1?'right':'left';x.fillText('Photo : '+K[0]+' · '+K[1],g1?W-marge:marge,story?H-80:H-40)}
  cv.width=W;cv.height=H;cv.getContext('2d').drawImage(c,0,0);
  return{ok:true,coin:['bd','bg','hd','hg'][best.i],f,y0};
}
function texteComplet(P){return P.brut+'\n\n— '+t('partageVia',{app:NOM_APP})+'\n'+URL_APP}
function partagerTexte(P){const tout=texteComplet(P),fini=()=>toast(t('partageFin'));
  if(navigator.share)navigator.share({text:tout}).then(fini).catch(()=>{});
  else if(navigator.clipboard)navigator.clipboard.writeText(tout).then(()=>toast(t('copie')+' '+t('partageFin'))).catch(()=>{})}
function partager(P){
  if(!P)return;if(typeof P==='string')P={tr:P,brut:P};
  const d=document.createElement('dialog');d.className='pf';const O=Object.assign({cle:FONDS[0][0],format:'story',teinte:'noir',force:.75,montre:{ar:true,tr:true,ph:false}},S.partage||{});O.montre={ar:true,tr:true,ph:false,...O.montre};let fichier=null,tour=0;
  if(O.cle&&!FOND_MINI[O.cle])O.cle=FONDS[0][0];
  const PARTS=P.ar?['ar','tr','ph'].filter(k=>k==='ar'||S.langue!=='ar'&&P[k]):[];
  if(PARTS.length&&!PARTS.some(k=>O.montre[k]))O.montre.ar=true;
  d.innerHTML=`<div class="pf-tete"><h2>${esc(t('pf_titre'))}</h2><button class="rond" data-f aria-label="${esc(t('pf_fermer'))}">${ic('croix','sm')}</button></div>
    <div class="pf-formats"><button data-fmt="story">${esc(t('pf_story'))}</button><button data-fmt="carre">${esc(t('pf_carre'))}</button></div>
    ${PARTS.length>1?`<div class="pf-parts">${PARTS.map(k=>`<button data-m="${k}">${esc(t('pf_'+k))}</button>`).join('')}</div>`:''}
    <canvas width="1080" height="1920"></canvas><div class="pf-nom" aria-live="polite"></div>
    <div class="pf-fonds">${FONDS.map(z=>`<button data-k="${z[0]}" aria-label="${esc(S.langue==='fr'?z[2]:z[3])}"><img src="${FOND_MINI[z[0]]}" alt=""></button>`).join('')}<button data-k="" aria-label="${esc(t('pf_vert'))}"></button></div>
    <div class="pf-teintes"><span>${esc(t('pf_teinte'))}</span>${Object.entries(TEINTES).map(([k,c])=>`<button data-c="${k}" style="background:rgb(${c.map(n=>n+26)})" aria-label="${esc(t('pf_c_'+k))}"></button>`).join('')}<input type="range" min="0" max="100" value="${Math.round(O.force*100)}" aria-label="${esc(t('pf_force'))}"></div>
    <button class="btn" data-p disabled>${ic('partage','sm')} ${esc(t('partager'))}</button>
    <div class="pf-duo"><button class="btn secondaire" data-e disabled>${esc(t('pf_enregistrer'))}</button><button class="btn secondaire" data-t>${esc(t('pf_texte'))}</button></div>`;
  const $d=s=>d.querySelector(s),cv=$d('canvas'),bP=$d('[data-p]'),bE=$d('[data-e]'),nom=$d('.pf-nom');
  const maj=async()=>{const n=++tour;fichier=null;bP.disabled=bE.disabled=true;nom.textContent=t('pf_attente');
    d.querySelectorAll('[data-fmt]').forEach(b=>b.classList.toggle('on',b.dataset.fmt===O.format));d.querySelectorAll('[data-k]').forEach(b=>b.classList.toggle('on',b.dataset.k===O.cle));d.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',b.dataset.c===O.teinte));d.querySelectorAll('[data-m]').forEach(b=>{b.classList.toggle('on',O.montre[b.dataset.m]);b.setAttribute('aria-pressed',O.montre[b.dataset.m])});
    const tmp=document.createElement('canvas');let r;try{r=await dessinerCarte(tmp,P,O)}catch(e){if(O.cle){O.cle='';return n===tour&&maj()}r={ok:false}}
    if(n!==tour)return;
    if(!r.ok){nom.textContent=t('pf_long');cv.width=cv.height=1;return}
    cv.width=tmp.width;cv.height=tmp.height;cv.getContext('2d').drawImage(tmp,0,0);const z=FONDS.find(y=>y[0]===O.cle);nom.textContent=z?(S.langue==='fr'?z[2]:z[3]):t('pf_vert');
    tmp.toBlob(b=>{if(n!==tour||!b)return;fichier=new File([b],'darsi.jpg',{type:'image/jpeg'});bP.disabled=bE.disabled=false},'image/jpeg',.92)};
  const garder=()=>{S.partage=O;sauver();maj()};
  const enregistrer_=()=>{const a=document.createElement('a'),u=URL.createObjectURL(fichier);a.href=u;a.download='darsi.jpg';a.click();setTimeout(()=>URL.revokeObjectURL(u),5000);toast(t('partageFin'))};
  d.querySelectorAll('[data-fmt]').forEach(b=>b.onclick=()=>{O.format=b.dataset.fmt;garder()});
  d.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{O.cle=b.dataset.k;garder()});
  d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{O.teinte=b.dataset.c;garder()});
  d.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const k=b.dataset.m,n={...O.montre,[k]:!O.montre[k]};if(PARTS.some(y=>n[y])){O.montre=n;garder()}});   // toujours au moins un texte
  $d('input[type=range]').onchange=e=>{O.force=e.target.value/100;garder()};
  bP.onclick=()=>{if(navigator.canShare&&navigator.canShare({files:[fichier]}))navigator.share({files:[fichier],text:t('partageVia',{app:NOM_APP})+'\n'+URL_APP}).then(()=>{d.close();toast(t('partageFin'))}).catch(e=>{if(e.name!=='AbortError')enregistrer_()});else enregistrer_()};
  bE.onclick=enregistrer_;$d('[data-t]').onclick=()=>{d.close();partagerTexte(P)};$d('[data-f]').onclick=()=>d.close();
  d.onclick=e=>{if(e.target===d)d.close()};d.onclose=()=>{tour++;d.remove()};
  document.body.appendChild(d);d.showModal();const on=d.querySelector(`[data-k="${O.cle}"]`);if(on)on.scrollIntoView({inline:'center',block:'nearest'});maj();
}
