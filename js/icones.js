/* Nour — icônes maison (trait, une couleur) et illustrations (croissant, ciel, moucharabieh). */
'use strict';
const ICONS={
  lune:'<path d="M19.5 14.6A8.3 8.3 0 1 1 9.4 4.5a6.6 6.6 0 0 0 10.1 10.1z"/>',
  etoile8:'<path d="M12 2.8l2.7 2.7h3.8v3.8L21.2 12l-2.7 2.7v3.8h-3.8L12 21.2l-2.7-2.7H5.5v-3.8L2.8 12l2.7-2.7V5.5h3.8z"/><circle cx="12" cy="12" r="3.2"/>',
  etoile:'<path d="M12 3.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>',
  livre:'<path d="M12 6.6C10 5 7.2 4.4 4 4.8v13.4c3.2-.4 6 .2 8 1.8 2-1.6 4.8-2.2 8-1.8V4.8c-3.2-.4-6 .2-8 1.8z"/><path d="M12 6.6V20"/>',
  mosquee:'<path d="M3 21h18"/><path d="M8 21v-6.2a5 5 0 0 1 10 0V21"/><path d="M13 9.8V7.6"/><path d="M12.2 5.4a1.4 1.4 0 0 0 1.9 1.6 1.7 1.7 0 1 1-1.9-1.6z"/><path d="M4.5 21v-9.8l1-2.2 1 2.2V21"/><path d="M11 21v-2.6a2 2 0 0 1 4 0V21"/>',
  lanterne:'<path d="M12 2.5v2"/><path d="M9.2 4.5h5.6l1.2 3H8z"/><path d="M8 7.5c-1.3 2.2-1.3 6.8 0 9h8c1.3-2.2 1.3-6.8 0-9"/><path d="M12 9.5v5"/><path d="M9 16.5l-.6 3h7.2l-.6-3"/>',
  parchemin:'<path d="M7.5 4H18a2 2 0 0 1 2 2v1.5h-4"/><path d="M16 7.5v10.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10"/><path d="M7.5 4a2 2 0 0 0-2 2v10.5"/><path d="M9 9h4M9 12.5h4"/>',
  repere:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.2"/>',
  flamme:'<path d="M12 21a6 6 0 0 0 6-6c0-4.2-3-5.6-3.6-9.6-2.5 1.6-4.9 3.8-4.9 6.3-1.4-.5-1.9-1.7-1.9-2.6C6.6 10.4 6 12.4 6 15a6 6 0 0 0 6 6z"/>',
  trophee:'<path d="M8 4h8v5.2a4 4 0 0 1-8 0z"/><path d="M8 6H5.2A3 3 0 0 0 8 10.4M16 6h2.8A3 3 0 0 1 16 10.4"/><path d="M12 13.2V17M9 20.5h6M10 17h4l.5 3.5h-5z"/>',
  graphe:'<path d="M4 20h16"/><rect x="5.5" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="6.5" width="3" height="10.5" rx="1"/><rect x="15.5" y="13" width="3" height="4" rx="1"/>',
  famille:'<circle cx="8" cy="7.2" r="2.6"/><circle cx="16.4" cy="8.2" r="2.1"/><path d="M3.5 19.5a4.5 4.5 0 0 1 9 0"/><path d="M13 19.5a3.7 3.7 0 0 1 7.4 0"/>',
  plume:'<path d="M20 4c-7 .3-12.2 5.6-13.4 13.4L5 20"/><path d="M20 4c-1.4 6-5.6 10.6-13 13.2"/><path d="M10.4 13.6l-2.2-2.2"/>',
  cible:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.3"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  croix:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  ok:'<circle cx="12" cy="12" r="8.5"/><path d="M8.2 12.3l2.6 2.6 5-5.4"/>',
  ko:'<circle cx="12" cy="12" r="8.5"/><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6"/>',
  chrono:'<circle cx="12" cy="13.2" r="7.4"/><path d="M12 9.6v3.6l2.4 1.8M10 2.8h4"/>',
  cadenas:'<rect x="5" y="10.5" width="14" height="10" rx="2.6"/><path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5"/>',
  gauche:'<path d="M14.5 5.5L8 12l6.5 6.5"/>',
  droite:'<path d="M9.5 5.5L16 12l-6.5 6.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  ampoule:'<path d="M9.2 18h5.6M10.2 21h3.6"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1 1.3 1 2.2h5.2c0-.9.3-1.6 1-2.2A6 6 0 0 0 12 3z"/>',
  pousse:'<path d="M12 21v-8.5"/><path d="M12 12.5c0-4 3-6.8 7.2-6.8 0 4-3 6.8-7.2 6.8z"/><path d="M12 15c0-3-2.4-5.2-5.6-5.2 0 3 2.4 5.2 5.6 5.2z"/>',
  medaille:'<circle cx="12" cy="15" r="5.5"/><path d="M8.6 3.5l2 6.2M15.4 3.5l-2 6.2"/><path d="M12 12.6l.9 1.8 2 .3-1.45 1.4.35 2L12 17.2l-1.8.9.35-2-1.45-1.4 2-.3z"/>',
  telephone:'<rect x="6.5" y="2.8" width="11" height="18.4" rx="2.6"/><path d="M10.5 18h3"/>',
  reglages:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  doua:'<path d="M10.2 21c0-2.5.8-4.2.8-6.5v-8c0-1.3-.8-2.1-1.9-2.1-.5-.9-1.5-1.3-2.4-.9C5.6 3.6 5 4.4 5 5.4v5.4L3.6 9.2c-.7-.8-1.9-.3-1.7.8.4 2.4 1.7 5.4 3.5 7.2.5.6.6 1.8.6 3.8"/><path d="M7.1 3.7v5.9M9.1 4.5v5.3"/><path d="M13.8 21c0-2.5-.8-4.2-.8-6.5v-8c0-1.3.8-2.1 1.9-2.1.5-.9 1.5-1.3 2.4-.9 1.1.1 1.7.9 1.7 1.9v5.4l1.4-1.6c.7-.8 1.9-.3 1.7.8-.4 2.4-1.7 5.4-3.5 7.2-.5.6-.6 1.8-.6 3.8"/><path d="M16.9 3.7v5.9M14.9 4.5v5.3"/>',
  i_reveil:'<path d="M3 17h18M6 20.5h12"/><path d="M7.5 17a4.5 4.5 0 0 1 9 0"/><path d="M12 7.5v2M5.6 10.6 7 12M18.4 10.6 17 12M3.5 14h1.6M18.9 14h1.6"/>',
  i_sommeil:'<path d="M3 19.5v-9M3 15.5h18v4M21 15.5V13a2.5 2.5 0 0 0-2.5-2.5H10v5"/><circle cx="6.6" cy="13" r="1.6"/><path d="M17.4 2.8a3 3 0 1 0 3.2 3.9 2.4 2.4 0 1 1-3.2-3.9z"/>',
  i_manger:'<circle cx="12" cy="13" r="5"/><circle cx="12" cy="13" r="2.5"/><path d="M3.2 4v5a1.6 1.6 0 0 0 3.2 0V4M4.8 4v16"/><path d="M20.8 20V4c-1.8.8-2.6 2.6-2.6 5v3.4h2.6"/>',
  i_oubli:'<circle cx="12" cy="14" r="5"/><circle cx="12" cy="14" r="2.4"/><path d="M6.6 5.6A8 8 0 0 1 18 6"/><path d="M18.6 3.2V6h-2.8"/>',
  i_repas:'<path d="M3.5 11h17a8.5 8.5 0 0 1-17 0z"/><path d="M9 20.5h6"/><path d="M8.8 6.6l1.8 1.8 4-4"/>',
  i_toilettes:'<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M3.5 21h17"/><circle cx="14.6" cy="12.5" r=".9"/>',
  i_sortir:'<path d="M13 3.5H6.5A1.5 1.5 0 0 0 5 5v14.5A1.5 1.5 0 0 0 6.5 21H13"/><path d="M10 12.2h10.5M17 8.7l3.5 3.5-3.5 3.5"/>',
  i_wudu:'<path d="M9 3.5c2.8 3.4 4.2 5.9 4.2 7.8a4.2 4.2 0 0 1-8.4 0c0-1.9 1.4-4.4 4.2-7.8z"/><path d="M17 10.5c1.7 2 2.5 3.5 2.5 4.6a2.5 2.5 0 0 1-5 0c0-1.1.8-2.6 2.5-4.6z"/><path d="M7.2 12.4a1.9 1.9 0 0 0 1.7 1.7"/>',
  i_mosquee_in:'<path d="M8 20.5v-7a5 5 0 0 1 10 0v7"/><path d="M13 5.5v3M5 20.5h16"/><path d="M11.4 20.5v-3a1.6 1.6 0 0 1 3.2 0v3"/><path d="M1.5 13.5h4.4M3.9 11.5l2 2-2 2"/>',
  i_mosquee_out:'<path d="M3 20.5v-7a5 5 0 0 1 10 0v7"/><path d="M8 5.5v3M1 20.5h15"/><path d="M6.4 20.5v-3a1.6 1.6 0 0 1 3.2 0v3"/><path d="M17.2 13.5h4.6M19.8 11.5l2 2-2 2"/>',
  i_eternue:'<circle cx="9.5" cy="12" r="6.5"/><path d="M7.4 10.4h.01M11.4 10.4h.01"/><path d="M7.6 14.4c1.2.9 2.6.9 3.8 0"/><path d="M18.6 9.4h.01M20.8 12h.01M18.6 14.6h.01M21.2 7.6h.01M21.2 16.4h.01" stroke-width="2.4"/>',
  i_pluie:'<path d="M7 15.5a4 4 0 0 1-.4-8 5.4 5.4 0 0 1 10.4 1.4 3.3 3.3 0 0 1 .5 6.6z"/><path d="M8 18.5l-1 2M12 18.5l-1 2M16 18.5l-1 2"/>',
  i_rupture:'<ellipse cx="7.4" cy="14.2" rx="3" ry="5" transform="rotate(-22 7.4 14.2)"/><path d="M8.6 5.4c.6 1.2.5 2.4-.2 3.6"/><path d="M13 10.5h7.5l-1 9.2a1.4 1.4 0 0 1-1.4 1.3h-2.7a1.4 1.4 0 0 1-1.4-1.3z"/><path d="M13.4 14h6.7"/>',
  i_qadr:'<path d="M13.5 4a7.6 7.6 0 1 0 6.6 11.4A6 6 0 1 1 13.5 4z"/><path d="M18.4 3.2l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z"/><path d="M21 9.5h.01" stroke-width="2.4"/>',
  i_poisson:'<path d="M2.5 12c3-4.8 9.5-5.6 14-2.4L21.5 7v10l-5-2.6C12 17.6 5.5 16.8 2.5 12z"/><circle cx="7" cy="11" r=".8"/><path d="M10 13.6c1 .5 2 .5 3 0"/>',
  i_detresse:'<path d="M12 20.5s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 8 2.3c0 5.6-8 10.2-8 10.2z"/><path d="M12 8l-1.5 3.4 2.6 1.6-1.6 3.6"/>',
  i_tasbih:'<circle cx="12" cy="4.6" r="1.3"/><circle cx="16.4" cy="6.4" r="1.3"/><circle cx="18.2" cy="10.8" r="1.3"/><circle cx="16.4" cy="15" r="1.3"/><circle cx="7.6" cy="6.4" r="1.3"/><circle cx="5.8" cy="10.8" r="1.3"/><circle cx="7.6" cy="15" r="1.3"/><circle cx="12" cy="16.6" r="1.1"/><path d="M12 17.7v3.6M10.4 21.5h3.2"/>',
  i_monde:'<circle cx="11" cy="13" r="7.5"/><path d="M3.5 13h15M11 5.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5c-2-2-3-4.5-3-7.5s1-5.5 3-7.5z"/><path d="M19.4 2.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/>',
  i_coeur:'<path d="M12 21s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 8.5a4.3 4.3 0 0 1 8 2.3C20 16.4 12 21 12 21z"/><path d="M12 2.5V5M7.4 3.6l1 1.7M16.6 3.6l-1 1.7"/>',
  i_arbre:'<path d="M12 21v-7"/><path d="M12 14c-4.4 0-7-2.4-7-5.6S8 3 12 3s7 2.2 7 5.4-2.6 5.6-7 5.6z"/><path d="M9 21h6M12 14l-2.6-2.6M12 11.4l2.4-2.4"/>',
  i_parents:'<circle cx="8" cy="7" r="2.6"/><circle cx="16" cy="7" r="2.6"/><path d="M3.5 20v-3.5A4.5 4.5 0 0 1 8 12a4.5 4.5 0 0 1 4 2.4A4.5 4.5 0 0 1 16 12a4.5 4.5 0 0 1 4.5 4.5V20"/><path d="M12 19.6l-1.4-1.3a1 1 0 0 1 1.4-1.4 1 1 0 0 1 1.4 1.4z"/>',
  i_foyer:'<path d="M3.6 11.2 12 4.2l8.4 7"/><path d="M5.8 9.6V20h12.4V9.6"/><path d="M12 17.6l-2-1.9a1.3 1.3 0 0 1 2-1.7 1.3 1.3 0 0 1 2 1.7z"/>',
  i_science:'<path d="M12 6.5C10.3 5.2 7.6 4.6 3.5 4.8v13.4c4.1-.2 6.8.4 8.5 1.7 1.7-1.3 4.4-1.9 8.5-1.7V4.8c-4.1-.2-6.8.4-8.5 1.7z"/><path d="M12 6.5v13.4"/><path d="M15.6 9.6l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"/>',
  etoile_v:'<path d="M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.6L12 16.5l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
  liste:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" stroke-width="2.6"/>',
  grille:'<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  loupe:'<circle cx="10.8" cy="10.8" r="6.3"/><path d="M15.4 15.4 20.5 20.5"/>',
  maison:'<path d="M3.6 11.2 12 4.2l8.4 7"/><path d="M5.8 9.6V20h12.4V9.6"/><path d="M10 20v-4.6a2 2 0 0 1 4 0V20"/>',
  boussole:'<circle cx="12" cy="12" r="8.6"/><path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z"/><circle cx="12" cy="12" r=".6"/>',
  kaaba:'<path d="M4.5 8.2 12 4.6l7.5 3.6v8.4L12 20.2l-7.5-3.6z"/><path d="M4.5 8.2 12 11.8l7.5-3.6M12 11.8v8.4"/><path d="M4.5 10.6 12 14.2l7.5-3.6"/>',
  calendrier:'<rect x="3.6" y="5" width="16.8" height="15.4" rx="2.6"/><path d="M3.6 10h16.8M8 3v4M16 3v4"/><path d="M14.6 13.2a2.6 2.6 0 1 0 1.6 4.4 2.1 2.1 0 1 1-1.6-4.4z"/>',
  globe:'<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.4 2.4 3.6 5.3 3.6 8.6s-1.2 6.2-3.6 8.6c-2.4-2.4-3.6-5.3-3.6-8.6S9.6 5.8 12 3.4z"/>',
  // 2026-11-23 : fil Découvrir, partage, chemin
  decouvrir:'<rect x="5.2" y="6.6" width="13.6" height="14.4" rx="2.6"/><path d="M7.6 3.6h8.8"/><path d="M12 10.4l1.1 2.5 2.5 1.1-2.5 1.1-1.1 2.5-1.1-2.5-2.5-1.1 2.5-1.1z"/>',
  partage:'<circle cx="18" cy="5.6" r="2.4"/><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="18.4" r="2.4"/><path d="M8.1 10.9l7.8-4.2M8.1 13.1l7.8 4.2"/>',
  chemin:'<path d="M7 21c0-4 10-4 10-8S7 9 7 5"/><circle cx="7" cy="5" r="1.6"/><circle cx="17" cy="13" r="1.6"/><path d="M15.4 3.4h5.2v4"/>',
  palmier:'<path d="M12.6 21c.4-4 .2-8-.8-11"/><path d="M11.8 10c-2-2.8-5-3.4-7.6-2.2 2.4.2 4.2 1.2 5.4 2.8"/><path d="M11.8 10c1.6-3 4.8-4 7.8-3-2.4.4-4 1.6-5 3.2"/><path d="M11.8 10c-.6-2.8.6-5.4 3-6.6-1 1.8-1.4 3.6-1.2 5.6"/><path d="M11.8 10c-3.2-.4-5.6 1.2-6.6 3.8 1.6-1.4 3.4-2.2 5.2-2.2"/><path d="M8 21h9"/>',
  son:'<path d="M4 9.6h3.4L12 5.6v12.8l-4.6-4H4z"/><path d="M15.4 9a4.2 4.2 0 0 1 0 6M17.8 6.6a7.6 7.6 0 0 1 0 10.8"/>',
  info:'<circle cx="12" cy="12" r="8.6"/><path d="M12 11v5.4M12 7.6v.2"/>',
  muet:'<path d="M4 9.6h3.4L12 5.6v12.8l-4.6-4H4z"/><path d="M15.6 9.6l4.8 4.8M20.4 9.6l-4.8 4.8"/>',
  foi:'<path d="M12 3.2l7.2 3v5.2c0 4.4-3 8-7.2 9.4-4.2-1.4-7.2-5-7.2-9.4V6.2z"/><path d="M14.6 9.4a3.2 3.2 0 1 0 0 4.8 2.6 2.6 0 1 1 0-4.8z"/>',
  coeur:'<path d="M12 20s-7.6-4.6-7.6-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.6 2.6C19.6 15.4 12 20 12 20z"/>',
  cle:'<circle cx="8" cy="15" r="4.2"/><path d="M11 12l8.6-8.6M16.6 6.4l2.4 2.4M14.4 8.6l1.8 1.8"/>'
};
const ETOILE4='<path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor"/>';
function ic(nom,taille=''){
  const sens=(nom==='gauche'||nom==='droite')?' sens':'';
  return `<svg class="ic ${taille}${sens}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[nom]||''}</svg>`;
}

let _uid=0;
/* Croissant doré + halo + étoiles */
function illuLune(taille=180){
  const u=++_uid;
  return `<svg viewBox="0 0 200 200" width="${taille}" height="${taille}" aria-hidden="true" style="position:relative">
   <defs>
    <radialGradient id="halo${u}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f7dca0" stop-opacity=".35"/><stop offset="1" stop-color="#f7dca0" stop-opacity="0"/></radialGradient>
    <linearGradient id="or${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7b8"/><stop offset=".55" stop-color="#e8be6e"/><stop offset="1" stop-color="#a87a2e"/></linearGradient>
    <mask id="cr${u}"><rect width="200" height="200" fill="#fff"/><circle cx="122" cy="82" r="56" fill="#000"/></mask>
   </defs>
   <circle cx="100" cy="100" r="96" fill="url(#halo${u})"/>
   <circle cx="96" cy="104" r="62" fill="url(#or${u})" mask="url(#cr${u})"/>
   <path d="M150 52l3.2 7.8 7.8 3.2-7.8 3.2-3.2 7.8-3.2-7.8-7.8-3.2 7.8-3.2z" fill="#fbe7b8" class="scintille"/>
   <circle cx="168" cy="96" r="2.2" fill="#fbe7b8" class="scintille" style="animation-delay:1.2s"/>
   <circle cx="138" cy="150" r="1.6" fill="#fbe7b8" class="scintille" style="animation-delay:.6s"/>
  </svg>`;
}

/* Moucharabieh : fenêtre en arc brisé, treillis d'étoiles à 8 branches */
function moucharabieh(largeur=220){
  const u=++_uid, h=Math.round(largeur*1.25);
  const arc='M12 260V122C12 74 58 38 100 10c42 28 88 64 88 112v138';
  return `<svg class="moucharabieh" viewBox="0 0 200 262" width="${largeur}" height="${h}" aria-hidden="true">
   <defs>
    <pattern id="tr${u}" width="22" height="22" patternUnits="userSpaceOnUse">
      <path d="M11 1.5l2.6 6.9 6.9 2.6-6.9 2.6L11 20.5l-2.6-6.9L1.5 11l6.9-2.6z" fill="none" stroke="#e8be6e" stroke-width=".9"/>
      <path d="M0 0l5 5M22 0l-5 5M0 22l5-5M22 22l-5-5" stroke="#e8be6e" stroke-width=".9"/>
      <circle cx="11" cy="11" r="1.6" fill="#e8be6e"/>
    </pattern>
    <clipPath id="cl${u}"><path d="${arc}Z"/></clipPath>
    <linearGradient id="fd${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <mask id="mk${u}"><rect width="200" height="262" fill="url(#fd${u})"/></mask>
   </defs>
   <g mask="url(#mk${u})">
    <g clip-path="url(#cl${u})"><rect width="200" height="262" fill="url(#tr${u})" opacity=".42"/></g>
    <path d="${arc}" fill="none" stroke="#e8be6e" stroke-opacity=".7" stroke-width="2"/>
    <path d="M22 260V124c0-42 40-74 78-100 38 26 78 58 78 100v136" fill="none" stroke="#e8be6e" stroke-opacity=".35" stroke-width="1"/>
   </g>
  </svg>`;
}
/* Croissant posé devant un moucharabieh */
function heros(taille=180){
  return `<div class="heros-scene" style="width:${Math.round(taille*1.25)}px;height:${Math.round(taille*1.4)}px">
    ${moucharabieh(Math.round(taille*1.25))}<div class="heros-lune">${illuLune(taille)}</div></div>`;
}

/* Ciel étoilé + silhouette de mosquée (fond fixe) */
function dessinerCiel(){
  let etoiles='';
  for(let i=0;i<70;i++){
    const x=(Math.sin(i*12.9898)*43758.5453%1+1)%1*400, y=(Math.sin(i*78.233)*12345.678%1+1)%1*520;
    const r=i%9===0?1.4:i%3===0?.9:.6;
    // 2026-11-20 : seule 1 étoile sur 5 scintille (moins de travail pour les téléphones modestes)
    etoiles+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#fff"${i%5===0?` class="scintille" style="animation-delay:${(i%7)*.5}s"`:''} opacity=".5"/>`;
  }
  document.getElementById('ciel').innerHTML=`<svg viewBox="0 0 400 860" preserveAspectRatio="xMidYMin slice">
   <defs><linearGradient id="silh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#042b21"/><stop offset="1" stop-color="#03211a"/></linearGradient></defs>
   ${etoiles}
   <g opacity=".95" fill="url(#silh)" transform="translate(0,700)">
     <rect x="30" y="20" width="12" height="140"/><path d="M28 22l8-22 8 22z"/><rect x="27" y="55" width="18" height="5"/>
     <path d="M80 160V95a30 30 0 0 1 60 0v65z"/>
     <path d="M130 160V80a70 70 0 0 1 140 0v80z"/><rect x="198" y="-8" width="4" height="20"/>
     <path d="M260 160V95a30 30 0 0 1 60 0v65z"/>
     <rect x="356" y="20" width="12" height="140"/><path d="M354 22l8-22 8 22z"/><rect x="353" y="55" width="18" height="5"/>
     <rect x="0" y="140" width="400" height="20"/>
   </g>
  </svg>`;
}

/* Drapeaux ronds des langues (SVG). Arabe : pastille verte avec la lettre ʿayn, langue commune à plusieurs pays. */
let NUM_DRAPEAU=0;
function drapeau(code,taille=20){
  const u='dr'+(NUM_DRAPEAU++),bandesH=c=>c.map((x,i)=>`<rect y="${i*24/c.length}" width="24" height="${24/c.length+.2}" fill="${x}"/>`).join(''),
    bandesV=c=>c.map((x,i)=>`<rect x="${i*8}" width="8.2" height="24" fill="${x}"/>`).join('');
  const D={
    fr:bandesV(['#2b4fa8','#fff','#e43d4a']),
    it:bandesV(['#1e9a55','#fff','#d93a3f']),
    de:bandesH(['#1c1c1c','#d93a3f','#f2c230']),
    nl:bandesH(['#c5303a','#fff','#2e4f9c']),
    id:bandesH(['#d93a3f','#fff']),
    es:'<rect width="24" height="24" fill="#c8303a"/><rect y="6" width="24" height="12" fill="#f5c330"/>',
    tr:'<rect width="24" height="24" fill="#d8323c"/><circle cx="10" cy="12" r="5.6" fill="#fff"/><circle cx="11.4" cy="12" r="4.5" fill="#d8323c"/><path d="M16.6 12l-2.6.85 1.6-2.2v2.7l-1.6-2.2z" fill="#fff"/>',
    en:'<rect width="24" height="24" fill="#2b3f8f"/><path d="M0 0l24 24M24 0L0 24" stroke="#fff" stroke-width="4.4"/><path d="M0 0l24 24M24 0L0 24" stroke="#d7323e" stroke-width="1.6"/><path d="M12 0v24M0 12h24" stroke="#fff" stroke-width="6.4"/><path d="M12 0v24M0 12h24" stroke="#d7323e" stroke-width="3.6"/>',
    ar:'<rect width="24" height="24" fill="#16794f"/><text x="12" y="17.6" text-anchor="middle" font-family="Amiri,serif" font-size="15" fill="#fff">ع</text>'
  };
  return `<svg class="drapeau" viewBox="0 0 24 24" width="${taille}" height="${taille}" aria-hidden="true"><defs><clipPath id="${u}"><circle cx="12" cy="12" r="12"/></clipPath></defs>
    <g clip-path="url(#${u})">${D[code]||''}</g><circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(255,255,255,.35)"/></svg>`;
}
