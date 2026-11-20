/* Nour — structure commune à toutes les langues (ne contient aucun texte affiché). */
'use strict';

// Nom de l'application : à changer ici seulement
const NOM_APP='Darsi';

// Débuts du Ramadan : estimations astronomiques, à confirmer chaque année selon le croissant
const RAMADANS=[{an:1448,debut:'2027-02-08'},{an:1449,debut:'2028-01-28'},{an:1450,debut:'2029-01-16'}];

const LANGUES=[
  {code:'fr',nom:'Français'},{code:'ar',nom:'العربية',rtl:true},{code:'en',nom:'English'},
  {code:'id',nom:'Bahasa Indonesia'},{code:'tr',nom:'Türkçe'},{code:'de',nom:'Deutsch'},
  {code:'nl',nom:'Nederlands'},{code:'es',nom:'Español'},{code:'it',nom:'Italiano'}
];

// Thèmes : clé → icône
const CATS={ramadan:'lune',piliers:'mosquee',coran:'livre',prophetes:'etoile8',histoire:'parchemin'};

// Leçons : identifiant + thème, dans l'ordre du parcours de chaque thème
const LECONS=[
  ['r-bienvenue','ramadan'],['r-jeuner','ramadan'],['r-rompt','ramadan'],['r-suhur','ramadan'],
  ['r-merites','ramadan'],['r-nuits','ramadan'],['r-qadr','ramadan'],['r-aid','ramadan'],
  ['p-piliers','piliers'],['p-shahada','piliers'],['p-priere','piliers'],['p-ablutions','piliers'],['p-zakat','piliers'],['p-hajj','piliers'],
  ['c-coran','coran'],['c-sourates','coran'],['c-ikhlas','coran'],
  ['pr-adam','prophetes'],['pr-ibrahim','prophetes'],['pr-yunus','prophetes'],['pr-musa','prophetes'],
  ['pr-isa','prophetes'],['pr-muhammad','prophetes'],['pr-livres','prophetes'],
  ['h-khadija','histoire'],['h-hegire','histoire'],['h-badr','histoire'],['h-fath','histoire'],['h-califes','histoire']
].map(([id,cat])=>({id,cat}));

// Ordre de la « leçon du jour » toute l'année (thèmes alternés, ordre interne respecté)
const ORDRE=['r-bienvenue','p-piliers','c-coran','pr-adam','h-khadija','p-shahada','r-jeuner','pr-ibrahim','h-hegire',
  'p-priere','c-sourates','r-rompt','pr-yunus','h-badr','p-ablutions','r-suhur','pr-musa','c-ikhlas','h-fath',
  'p-zakat','r-merites','pr-isa','h-califes','p-hajj','r-nuits','pr-muhammad','r-qadr','pr-livres','r-aid'];

// Programme des 29 premiers jours du Ramadan (jour 30 = Grand Quiz)
const PROG_RAMADAN=['r-bienvenue','r-jeuner','r-rompt','r-suhur','r-merites','p-piliers','p-shahada','p-priere','p-ablutions',
  'c-coran','c-sourates','c-ikhlas','pr-adam','pr-ibrahim','pr-yunus','pr-musa','h-badr','pr-isa','pr-muhammad',
  'r-nuits','r-qadr','h-khadija','h-hegire','p-zakat','p-hajj','h-fath','pr-livres','h-califes','r-aid'];

// Hadiths : références (recueil, numéro officiel). Le premier sert pour le texte affiché.
// Numérotation : Bukhari (Fath al-Bârî), Muslim (Fuad ʿAbd al-Bâqî), Abû Dâwûd et Tirmidhî (numérotation courante).
const HADITHS_REFS={
  piliers:[['bukhari',8],['muslim',16]], croissant:[['bukhari',1909],['muslim',1081]], cinq:[['bukhari',349],['muslim',162]],
  enfants:[['bukhari',1960]], regles:[['muslim',335]], coucher:[['bukhari',1954],['muslim',1100]], oubli:[['bukhari',1933],['muslim',1155]],
  suhur:[['bukhari',1923],['muslim',1095]], dattes:[['abudawud',2356],['tirmidhi',696]], hater:[['bukhari',1957],['muslim',1098]],
  hira:[['bukhari',3]], qadr:[['bukhari',2017]], pardon:[['bukhari',38],['muslim',760]], fitr:[['bukhari',1503],['muslim',984]],
  fitr_but:[['abudawud',1609]], fatiha:[['bukhari',756],['muslim',394]], adhan:[['abudawud',499]],
  qiyam:[['bukhari',37],['muslim',759]], dixnuits:[['bukhari',2024],['muslim',1174]], itikaf:[['bukhari',2026],['muslim',1172]],
  tarawih:[['bukhari',2012],['muslim',761]], aid_dattes:[['bukhari',953]], shawwal:[['muslim',1164]], afw:[['tirmidhi',3513]],
  ikhlas:[['bukhari',5013]], kursi:[['muslim',810]], wudu:[['bukhari',135],['muslim',225]], hajj_une:[['muslim',1337]],
  hajj_pardon:[['bukhari',1521],['muslim',1350]], arafa:[['abudawud',1949],['tirmidhi',889]], jibril:[['muslim',8]],
  vie:[['bukhari',3902]], idoles:[['bukhari',4287],['muslim',1781]], compilation:[['bukhari',4986]], copies:[['bukhari',4987]],
  arafa_achoura:[['muslim',1162]], tasua:[['muslim',1134]], tachriq:[['muslim',1141]], dix_dhulhijja:[['bukhari',969]],
  aid_interdit:[['bukhari',1990]], blancs:[['tirmidhi',761]], lundi_jeudi:[['tirmidhi',747]],
  // Invocations
  inv_manger:[['bukhari',5376]], inv_oubli_manger:[['abudawud',3767]], inv_apres_repas:[['abudawud',4023]], inv_sommeil:[['bukhari',6324]],
  inv_toilettes:[['bukhari',142],['muslim',375]], inv_sortir:[['abudawud',5095]], inv_mosquee:[['muslim',713]], inv_wudu:[['muslim',234]],
  inv_eternuement:[['bukhari',6224]], inv_pluie:[['bukhari',1032]], inv_rupture:[['abudawud',2357]], inv_istighfar:[['bukhari',6306]],
  inv_detresse:[['bukhari',6346]], inv_tasbih:[['bukhari',6405]], inv_yunus:[['tirmidhi',3505]]
};
const RECUEILS={bukhari:'Sahih al-Bukhari',muslim:'Sahih Muslim',abudawud:'Sunan Abî Dâwûd',tirmidhi:'Sunan at-Tirmidhî'};

/* Semaines du défi Ramadan : révision + quiz chaque fin de semaine (jours 1-7, 8-14, 15-21, 22-28) */
const SEMAINES_RAM=[[1,7],[8,14],[15,21],[22,28]];

/* Calendrier : dates hégiriennes {m: mois, j: jour, d: durée en jours}. Calculées selon Umm al-Qura.
   type : jeune (jeûne recommandé), fete, interdit (jeûne interdit), periode (période bénie), repere.
   src : clés de sources ('h:nom' = HADITHS_REFS, 'q:S:V' = verset), comme dans les leçons. */
const FETES=[
  {id:'nouvelAn',m:1,j:1,d:1,type:'repere',ic:'lune'},
  {id:'tasua',m:1,j:9,d:1,type:'jeune',ic:'etoile',src:['h:tasua']},
  {id:'achoura',m:1,j:10,d:1,type:'jeune',ic:'etoile',src:['h:arafa_achoura']},
  {id:'ramadan',m:9,j:1,d:30,type:'periode',ic:'lanterne',src:['q:2:185']},
  {id:'dixNuits',m:9,j:21,d:10,type:'periode',ic:'etoile8',src:['h:qadr']},
  {id:'aidFitr',m:10,j:1,d:1,type:'fete',ic:'trophee',src:['h:aid_interdit']},
  {id:'sixChawwal',m:10,j:2,d:29,type:'jeune',ic:'etoile',src:['h:shawwal']},
  {id:'dixDhulHijja',m:12,j:1,d:10,type:'periode',ic:'etoile8',src:['h:dix_dhulhijja']},
  {id:'tarwiya',m:12,j:8,d:1,type:'repere',ic:'mosquee'},
  {id:'arafa',m:12,j:9,d:1,type:'jeune',ic:'mosquee',src:['h:arafa_achoura']},
  {id:'aidAdha',m:12,j:10,d:1,type:'fete',ic:'trophee',src:['h:aid_interdit']},
  {id:'tachriq',m:12,j:11,d:3,type:'interdit',ic:'cadenas',src:['h:tachriq']},
  // Jours blancs : 13, 14 et 15 de chaque mois, sauf Ramadan (déjà jeûné) et Dhul-Hijja (le 13 est un jour de Tashrîq)
  ...[1,2,3,4,5,6,7,8,10,11].map(m=>({id:'blancs',m,j:13,d:3,type:'jeune',ic:'lune',src:['h:blancs']}))
];
const FETES_SEMAINE=[{id:'lundiJeudi',ic:'etoile',src:['h:lundi_jeudi']},{id:'jumua',ic:'mosquee',src:['q:62:9']}];

// Documents d'information traduits : contenu/legal-<langue>.js remplit DOCS_LG.<langue> (le français est dans DOCS)
const DOCS_LG={};
