/* Darsi — service worker de la web app (généré par outils/preparer_web.sh à partir de outils/sw-modele.js).
   - À l'installation : met en cache TOUS les fichiers de l'appli → elle s'ouvre et fonctionne sans réseau.
   - Fichiers de l'appli : servis depuis le cache (instantané, hors ligne) ; page d'accueil et manifeste : en ligne d'abord.
   - Polices Google : gardées en cache après le premier chargement.
   - Serveur « Demander à l'imam » (Supabase) : toujours en direct, jamais mis en cache.
   - Vidéo d'ouverture : servie depuis le cache avec gestion des « plages » (Safari/iPhone l'exige pour les vidéos).
   - Nouvelle version mise en ligne → nouveau cache, l'ancien est supprimé. */
'use strict';
const VERSION = '899dba60d0cd';
const CACHE = 'darsi-' + VERSION, POLICES = 'darsi-polices';
const FICHIERS = ["./", "apple-touch-icon.png", "contenu/ar-expert.js", "contenu/ar.js", "contenu/calendrier-ar.js", "contenu/calendrier-de.js", "contenu/calendrier-en.js", "contenu/calendrier-es.js", "contenu/calendrier-fr.js", "contenu/calendrier-id.js", "contenu/calendrier-it.js", "contenu/calendrier-nl.js", "contenu/calendrier-tr.js", "contenu/de-expert.js", "contenu/de.js", "contenu/en-expert.js", "contenu/en.js", "contenu/es-expert.js", "contenu/es.js", "contenu/fr-expert.js", "contenu/fr-plus.js", "contenu/fr.js", "contenu/id-expert.js", "contenu/id.js", "contenu/invocations-ar.js", "contenu/invocations-de.js", "contenu/invocations-en.js", "contenu/invocations-es.js", "contenu/invocations-fr.js", "contenu/invocations-id.js", "contenu/invocations-it.js", "contenu/invocations-nl.js", "contenu/invocations-tr.js", "contenu/it-expert.js", "contenu/it.js", "contenu/legal-ar.js", "contenu/legal-de.js", "contenu/legal-en.js", "contenu/legal-es.js", "contenu/legal-fr.js", "contenu/legal-id.js", "contenu/legal-it.js", "contenu/legal-nl.js", "contenu/legal-tr.js", "contenu/nl-expert.js", "contenu/nl.js", "contenu/rappels.js", "contenu/tr-expert.js", "contenu/tr.js", "css/nour.css", "favicon.png", "index.html", "js/app.js", "js/decouvrir.js", "js/en_ligne.js", "js/geomag.js", "js/i18n.js", "js/icones.js", "js/imam.js", "js/pwa.js", "js/signaler.js", "js/sources.js", "js/structure.js", "media/intro-debut.jpg", "pwa/apple-touch-icon.png", "pwa/icone-192.png", "pwa/icone-512.png", "pwa/index.html", "pwa/logo-darsi.png", "pwa/manifest.webmanifest"];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(FICHIERS);
    try { await c.add('media/intro.mp4'); } catch (x) { /* la vidéo n'est pas indispensable */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('darsi-') && k !== CACHE && k !== POLICES) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function plage(req) {   // réponse 206 pour la vidéo (Safari demande la vidéo par morceaux)
  const r = await caches.match('media/intro.mp4');
  if (!r) return fetch(req);
  const b = await r.blob(), m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return new Response(b, { headers: { 'Content-Type': 'video/mp4', 'Content-Length': b.size, 'Accept-Ranges': 'bytes' } });
  const debut = m[1] ? +m[1] : 0, fin = m[2] ? Math.min(+m[2], b.size - 1) : b.size - 1;
  return new Response(b.slice(debut, fin + 1), { status: 206, headers: {
    'Content-Type': 'video/mp4', 'Content-Range': `bytes ${debut}-${fin}/${b.size}`, 'Content-Length': fin - debut + 1, 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;                                   // envois au serveur : jamais interceptés
  if (url.hostname.endsWith('supabase.co')) return;                   // questions à l'imam : toujours en direct
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith((async () => {
      const c = await caches.open(POLICES), r = await c.match(req);
      const frais = fetch(req).then(n => { if (n.ok || n.type === 'opaque') c.put(req, n.clone()); return n; }).catch(() => r);
      return r || frais;
    })());
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('/media/intro.mp4')) { e.respondWith(plage(req)); return; }
  // Page d'accueil, manifeste et pages de secours : TOUJOURS en ligne d'abord (versions à jour, adresse de démarrage juste),
  // le cache ne sert que sans réseau.
  if (req.mode === 'navigate' || url.pathname.endsWith('.webmanifest')) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try { const n = await fetch(req, { cache: 'no-store' }); if (n.ok && req.mode !== 'navigate') c.put(req, n.clone()); return n; }
      catch (x) { return (req.mode === 'navigate' ? ((await c.match('./')) || (await c.match('index.html'))) : (await c.match(req, { ignoreSearch: true }))) || new Response('', { status: 504 }); }
    })());
    return;
  }
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const r = await c.match(req, { ignoreSearch: true });
    if (r) return r;
    try { const n = await fetch(req); if (n.ok) c.put(req, n.clone()); return n; }
    catch (x) { return new Response('', { status: 504 }); }
  })());
});
