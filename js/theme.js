/* Darsi — apparence. « auto » : sable le jour, figue quand le téléphone est en mode sombre. Sinon le thème choisi.
   Chargé en tête de page ; seul le fichier du thème utilisé est lu (css/themes/<nom>.css, fabriqué par outils/themes.mjs). */
'use strict';
var THEME=(function(){
  const CLE='darsi-theme',FOND={sable:'#6f2a15',figue:'#160b18',vert:'#03211a',terracotta:'#1c0b06',cafe:'#150e09',grenade:'#1b060b',terre:'#6a2913',terre2:'#6a2913'};
  const VUE={sable:['#f1e6da','#a8482a'],figue:['#2d1832','#e8be6e'],vert:['#0a5640','#e8be6e'],terracotta:['#5a2413','#e8be6e'],cafe:['#4a3624','#e8be6e'],grenade:['#6b1a2c','#e8be6e'],terre:['#93401f','#f3dfc2'],terre2:['#93401f','#f5e8d6']};
  const mq=matchMedia('(prefers-color-scheme: dark)'),ver=(document.currentScript&&document.currentScript.src.split('?')[1])||'';
  const lire=()=>{try{let v=localStorage.getItem(CLE);if(v==='clair')v='sable';if(v==='sombre')v='figue';return FOND[v]?v:'auto'}catch(e){return 'auto'}};
  let lien=null,actuel=null;
  function appliquer(){
    const c=lire(),n=c==='auto'?(mq.matches?'figue':'sable'):c;if(n===actuel)return;const premier=actuel===null;actuel=n;
    const m=document.querySelector('meta[name=theme-color]');if(m)m.content=FOND[n];
    if(n==='sable'){document.documentElement.removeAttribute('data-theme');return}
    const url='css/themes/'+n+'.css'+(ver?'?'+ver:'');
    if(premier){document.documentElement.setAttribute('data-theme',n);document.write('<link rel="stylesheet" id="lien-theme" href="'+url+'">');return}
    const l=document.createElement('link');l.rel='stylesheet';l.href=url;
    l.onload=()=>{if(actuel!==n){l.remove();return}const v=lien||document.getElementById('lien-theme');document.documentElement.setAttribute('data-theme',n);if(v&&v!==l)v.remove();lien=l};
    l.onerror=()=>{l.remove();if(actuel===n){actuel='sable';document.documentElement.removeAttribute('data-theme')}};
    document.head.appendChild(l);
  }
  if(mq.addEventListener)mq.addEventListener('change',appliquer);else if(mq.addListener)mq.addListener(appliquer);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)appliquer()});
  appliquer();
  return {lire,VUE,noms:['auto',...Object.keys(VUE)],choisir(v){try{v==='auto'?localStorage.removeItem(CLE):localStorage.setItem(CLE,v)}catch(e){}appliquer()}};
})();
