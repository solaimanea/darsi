/* {APP} — documents d'information (français).
   ⚠️ Projets de textes : les mentions [à compléter] doivent être remplies, et l'ensemble relu
   par un professionnel du droit avant publication sur l'App Store et le Play Store. */
'use strict';
const VERSION_APP='1.0 (prototype)';
const DOCS={
apropos:{titre:"À propos de {APP}",maj:"2026-11-18",sections:[
 {p:["{APP} aide chaque musulman à apprendre sa religion un peu chaque jour : une leçon courte, un quiz, et des sources vérifiables pour chaque réponse.",
     "L'application fonctionne toute l'année. Chaque Ramadan, un défi de 30 jours et un Grand Quiz final permettent de vivre le mois sacré en apprenant, seul ou en famille."]},
 {h:"Notre engagement",p:["Chaque verset est cité en arabe, avec sa phonétique et une traduction reconnue. Chaque hadith est cité avec son recueil et son numéro.",
     "Le contenu est pédagogique et grand public. Il ne remplace pas l'enseignement d'un savant ni un avis religieux (fatwa) sur une situation personnelle."]},
 {h:"Éditeur",p:["{APP} est une application de JINA Studios."]}
]},
methode:{titre:"Sources et méthode",maj:"2026-11-19",sections:[
 {h:"Le Coran",p:["Le texte arabe est celui de l'édition uthmanie (données Tanzil). Les traductions sont des traductions reconnues, une par langue : {CORAN}."]},
 {h:"Les hadiths",p:["Les hadiths sont cités avec leur recueil et leur numéro : Sahih al-Bukhari (numérotation de Fath al-Bârî), Sahih Muslim (numérotation de Muhammad Fuad ʿAbd al-Bâqî), Sunan Abî Dâwûd et Sunan at-Tirmidhî.",
     "Traductions : anglais — Muhsin Khan (al-Bukhari), Abdul Hamid Siddiqui (Muslim), Ahmad Hasan (Abû Dâwûd) ; indonésien — Lidwa Pusaka. Pour le français et le turc, le traducteur n'est pas indiqué par la source : ces textes sont signalés « à vérifier ». Dans les autres langues, la traduction anglaise de référence est affichée.",
     "Pour les hadiths longs, un résumé est proposé ; le texte complet et le texte arabe restent accessibles."]},
 {h:"Les invocations",p:["Le texte arabe de chaque invocation est recopié mot pour mot depuis le hadith ou le verset cité, puis vérifié automatiquement. Pour les versets, la traduction est la traduction reconnue indiquée ci-dessus. Pour les hadiths, la traduction du sens est rédigée par l'équipe de {APP} et signalée comme telle, en attendant sa relecture ; le texte du hadith et sa traduction de référence restent accessibles sous « Voir la source »."]},
 {h:"Les leçons et les questions",p:["Les leçons et les questions sont rédigées par l'équipe de {APP} à partir de ces sources, en s'en tenant aux points qui font consensus.",
     "[À compléter : nom et qualité de la personne ou de l'institution qui a relu et validé le contenu religieux.]"]},
 {h:"Les dates",p:["La date hégirienne affichée est calculée selon le calendrier Umm al-Qura. Elle peut différer d'un jour de la date annoncée localement, qui dépend de l'observation du croissant. Les dates du Ramadan sont des estimations et ne remplacent pas l'annonce de votre mosquée ou de votre pays."]},
  {h:"Signaler une erreur",p:["Une erreur, une source à préciser, une traduction à améliorer ? Écrivez-nous : [adresse e-mail de contact à compléter]. Chaque signalement est vérifié."]}
]},
cgu:{titre:"Conditions générales d'utilisation",maj:"2026-11-18",sections:[
 {h:"1. Objet",p:["Les présentes conditions encadrent l'utilisation de l'application {APP}, éditée par JINA Studios (ci-après « l'Éditeur »). Utiliser l'application vaut acceptation de ces conditions."]},
 {h:"2. Accès",p:["L'application est accessible gratuitement, sans création de compte. Une connexion à Internet peut être nécessaire pour certaines fonctions. L'Éditeur peut faire évoluer, suspendre ou interrompre tout ou partie de l'application, notamment pour la maintenance."]},
 {h:"3. Contenu religieux",p:["Le contenu a une vocation pédagogique et générale. Il ne constitue pas un avis religieux personnalisé. Pour toute question qui vous concerne directement, adressez-vous à un imam ou à un savant qualifié.",
     "L'Éditeur apporte le plus grand soin à l'exactitude du contenu et à la citation des sources, et corrige toute erreur signalée dans les meilleurs délais."]},
 {h:"4. Utilisation",p:["Vous vous engagez à utiliser l'application de manière respectueuse. Les questions écrites dans un groupe familial restent sur votre appareil : vous en êtes responsable et veillez à ce qu'elles respectent la religion et les personnes."]},
 {h:"5. Mineurs",p:["L'application convient à toute la famille. L'utilisation par un enfant se fait sous la responsabilité d'un parent ou d'un représentant légal."]},
 {h:"6. Propriété intellectuelle",p:["La structure de l'application, ses textes, ses illustrations et ses icônes sont la propriété de l'Éditeur, sauf les éléments de tiers cités dans la page « Crédits ». Toute reproduction sans autorisation est interdite. Le texte du Coran et les traductions restent soumis aux conditions de leurs auteurs et éditeurs."]},
 {h:"7. Responsabilité",p:["L'application est fournie en l'état. L'Éditeur ne saurait être tenu responsable d'une perte de progression liée à la suppression de l'application, au changement d'appareil ou à l'effacement des données du téléphone."]},
 {h:"8. Grand Quiz et récompenses",p:["La participation au Grand Quiz du Ramadan est gratuite et sans obligation d'achat. Lorsque des récompenses sont proposées, les modalités sont fixées par un règlement disponible dans l'application."]},
 {h:"9. Modification et droit applicable",p:["Ces conditions peuvent évoluer ; la date de mise à jour figure en haut de cette page. Elles sont soumises au droit français. [À compléter : juridiction compétente.]"]}
]},
confidentialite:{titre:"Politique de confidentialité",maj:"2026-11-19",sections:[
 {h:"En bref",p:["{APP} ne demande ni compte, ni e-mail, ni numéro de téléphone. Votre progression reste sur votre appareil. Nous ne vendons aucune donnée et l'application ne contient pas de publicité."]},
 {h:"Données enregistrées sur votre appareil",p:["Votre prénom (facultatif), la langue choisie, vos scores, votre série de jours, vos statistiques par thème et, si vous l'utilisez, votre groupe familial (prénoms, couleurs et questions écrites). Ces données sont stockées uniquement dans la mémoire de votre appareil et ne nous sont pas transmises."]},
 {h:"Position (Qibla)",p:["Si vous touchez « Utiliser ma position », l'application demande l'accès à votre position pour calculer la direction de La Mecque. Ce calcul se fait sur votre appareil. La position, arrondie à environ 1 km, est enregistrée uniquement sur votre téléphone et n'est jamais transmise. Vous pouvez aussi choisir une ville dans la liste, sans partager votre position.","La boussole utilise le capteur d'orientation du téléphone, avec votre accord ; aucune donnée n'est enregistrée."]},
 {h:"Vos droits",p:["Vous pouvez modifier votre prénom à tout moment dans les Paramètres, et effacer toute votre progression avec le bouton « Réinitialiser ma progression ». Supprimer l'application efface aussi toutes ces données."]},
 {h:"Services tiers",p:["Dans cette version, les polices de caractères sont chargées depuis Google Fonts, ce qui transmet votre adresse IP à Google. Elles seront intégrées à l'application dans la version publiée, afin que plus rien ne soit transmis."]},
 {h:"Évolutions",p:["Si des fonctions en ligne sont ajoutées (groupes à distance, classement), cette politique sera mise à jour avant leur lancement et votre accord sera demandé lorsque la loi l'exige."]},
 {h:"Signalement d'une question",p:["Si vous signalez une question, nous recevons son numéro, son texte, la langue, le motif et votre commentaire. Selon la version, l'envoi se fait par votre application e-mail (votre adresse nous est alors visible) ou par notre serveur, sans nom ni compte. Ces informations servent uniquement à corriger le contenu. N'y écrivez pas de données personnelles."]},
 {h:"Contact",p:["Responsable du traitement : JINA Studios, [adresse à compléter]. Contact : [adresse e-mail à compléter]. Vous pouvez aussi saisir la CNIL (cnil.fr)."]}
]},
mentions:{titre:"Mentions légales",maj:"2026-11-18",sections:[
 {h:"Éditeur",p:["JINA Studios — [forme juridique, adresse, numéro SIREN/SIRET à compléter].","Directeur de la publication : [nom à compléter].","Contact : [adresse e-mail à compléter]."]},
 {h:"Hébergement et distribution",p:["Application distribuée via l'App Store (Apple) et Google Play (Google). [À compléter : hébergeur, si des fonctions en ligne sont ajoutées.]"]}
]},
reglement:{titre:"Règlement du Grand Quiz",maj:"2026-11-18",sections:[
 {p:["[Projet de règlement — à finaliser et à faire relire avant toute remise de récompense.]"]},
 {h:"1. Organisateur",p:["JINA Studios organise un jeu gratuit et sans obligation d'achat : le Grand Quiz du Ramadan, accessible le 30ᵉ jour du défi Ramadan dans l'application {APP}."]},
 {h:"2. Participation",p:["Le jeu est ouvert à toute personne disposant de l'application. Les mineurs participent avec l'accord d'un parent. Une seule participation par personne et par Ramadan est prise en compte."]},
 {h:"3. Déroulement",p:["Le Grand Quiz compte 40 questions portant sur les leçons du mois, avec 20 secondes par question. Le score final est enregistré à la fin de la partie."]},
 {h:"4. Récompenses",p:["[À compléter : nature et valeur des récompenses, nombre de gagnants, mode de désignation (meilleurs scores, tirage au sort parmi les bonnes réponses…), date et modalités de remise.]"]},
 {h:"5. Données",p:["Les données nécessaires à la remise des récompenses ne sont collectées qu'avec l'accord du gagnant et uniquement pour cette remise."]}
]},
credits:{titre:"Crédits",maj:"2026-11-19",sections:[
 {h:"Textes sacrés",p:["Texte coranique et traductions : données Tanzil, servies par AlQuran.cloud. Traductions : {CORAN}.","Hadiths : recueils al-Bukhari, Muslim, Abû Dâwûd et at-Tirmidhî, via la base ouverte hadith-api (fawazahmed0)."]},
  {h:"Typographie",p:["Amiri, Fraunces, Inter et Tajawal — polices sous licence libre SIL Open Font License."]},
 {h:"Conception",p:["Illustrations, icônes et motifs (croissant, moucharabieh, frises) : créations originales de JINA Studios."]}
]}
};
