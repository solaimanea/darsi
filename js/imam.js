/* Darsi — questions anonymes (2026-11-20).
   1) Boîte à questions de la famille : sur le téléphone, sans nom, les autres membres répondent.
   2) Demander à l'imam : question anonyme envoyée à la mosquée choisie (serveur Supabase, voir serveur/imam.sql) ;
      l'imam répond (ex. le vendredi) et la réponse est publiée, sans nom, pour les fidèles de la mosquée.
   3) Espace imam : l'imam entre le code secret de sa mosquée, lit les questions en attente et y répond.
   Chargé après app.js (utilise S, t, ic, esc, aller, sauver, boutonRetour, fmt, $). */
'use strict';

/* ---------- Textes (9 langues ; repli sur le français pour une clé absente) ---------- */
const I18N_IMAM={
fr:{boiteTitre:"Boîte à questions",boiteSous:"Pose une question sur la religion sans dire qui tu es.",boiteVide:"Aucune question pour l'instant. Ose demander : personne ne saura que c'est toi.",
 boitePoser:"Poser une question anonyme",boiteAnonyme:"Personne ne saura qui a posé cette question : aucun nom n'est enregistré.",boiteEx:"Ex. Pourquoi prie-t-on vers La Mecque ?",
 boiteRepondre:"Répondre",boiteQui:"Qui répond ?",boiteTaRep:"Ta réponse",boiteSuppr:"Supprimer la question",boiteSupprOk:"Supprimer cette question et ses réponses ?",
 boiteN:["{n} question","{n} questions"],boiteRepN:["{n} réponse","{n} réponses"],versImam:"Demander à l'imam",
 imamTitre:"Demander à l'imam",imamSous:"Pose ta question en anonyme à l'imam de ta mosquée.",imamBientot:"Bientôt disponible : les mosquées partenaires rejoignent Darsi petit à petit, insha'Allah.",
 imamJour:"L'imam répond le {j}.",imamPoser:"Poser une question à l'imam",imamAnonyme:"Ta question part sans ton nom ni aucune information sur toi. Si l'imam y répond, la question et sa réponse seront visibles par les fidèles de la mosquée, toujours sans nom.",
 imamEx:"Écris ta question clairement, en quelques phrases.",imamEnvoyer:"Envoyer à l'imam",imamEnvoye:"Question envoyée. Tu verras ici la réponse de l'imam.",
 imamMes:"Mes questions",imamReponses:"Réponses de l'imam",imamAucune:"Pas encore de réponse publiée.",imamAttente:"En attente de réponse",imamRepondue:"Réponse de l'imam",imamRefusee:"Non retenue par l'imam",
 imamNouvelle:["L'imam a répondu à ta question","L'imam a répondu à {n} de tes questions"],imamChoisir:"Choisis ta mosquée",imamChanger:"Changer de mosquée",imamCherche:"Ville ou mosquée",imamAucuneMosquee:"Aucune mosquée trouvée.",
 imamHorsLigne:"Pas de connexion internet. Réessaie plus tard.",imamTrop:"La mosquée reçoit beaucoup de questions en ce moment. Réessaie plus tard.",imamLongueur:"Ta question doit faire entre 10 et 600 caractères.",imamErreur:"Une erreur est survenue. Réessaie plus tard.",
 espaceImam:"Espace imam",espaceImamSous:"Réservé aux imams des mosquées partenaires",espaceCode:"Code de la mosquée",espaceEntrer:"Se connecter",espaceQuitter:"Se déconnecter",
 espaceCodeFaux:"Code incorrect.",espaceBloque:"Trop d'essais. Réessaie dans une heure.",espaceAttente:"Questions en attente",espaceRien:"Aucune question en attente. Barak Allahu fik.",
 espacePublier:"Publier la réponse",espaceRefuser:"Ne pas retenir",espaceRefuserOk:"Ne pas retenir cette question ? Elle ne sera jamais publiée.",espacePubliees:"Réponses publiées",espaceRetirer:"Retirer",espaceRetirerOk:"Retirer cette réponse ? Elle ne sera plus visible.",
 espaceInfo:"Les questions sont anonymes. Seules celles auxquelles vous répondez sont publiées, avec votre réponse.",recue:"Reçue le {d}",
 j_vendredi:"vendredi",j_samedi:"samedi",j_dimanche:"dimanche",j_lundi:"lundi",j_mardi:"mardi",j_mercredi:"mercredi",j_jeudi:"jeudi"},
en:{boiteTitre:"Question box",boiteSous:"Ask a question about religion without saying who you are.",boiteVide:"No questions yet. Go ahead and ask: nobody will know it was you.",
 boitePoser:"Ask an anonymous question",boiteAnonyme:"Nobody will know who asked this question: no name is saved.",boiteEx:"E.g. Why do we pray towards Mecca?",
 boiteRepondre:"Answer",boiteQui:"Who is answering?",boiteTaRep:"Your answer",boiteSuppr:"Delete the question",boiteSupprOk:"Delete this question and its answers?",
 boiteN:["{n} question","{n} questions"],boiteRepN:["{n} answer","{n} answers"],versImam:"Ask the imam",
 imamTitre:"Ask the imam",imamSous:"Ask the imam of your mosque a question, anonymously.",imamBientot:"Coming soon: partner mosques are joining Darsi step by step, insha'Allah.",
 imamJour:"The imam answers on {j}.",imamPoser:"Ask the imam a question",imamAnonyme:"Your question is sent without your name or any information about you. If the imam answers it, the question and the answer will be visible to the mosque's community, still without any name.",
 imamEx:"Write your question clearly, in a few sentences.",imamEnvoyer:"Send to the imam",imamEnvoye:"Question sent. You will see the imam's answer here.",
 imamMes:"My questions",imamReponses:"The imam's answers",imamAucune:"No answer published yet.",imamAttente:"Waiting for an answer",imamRepondue:"The imam's answer",imamRefusee:"Not selected by the imam",
 imamNouvelle:["The imam answered your question","The imam answered {n} of your questions"],imamChoisir:"Choose your mosque",imamChanger:"Change mosque",imamCherche:"City or mosque",imamAucuneMosquee:"No mosque found.",
 imamHorsLigne:"No internet connection. Please try again later.",imamTrop:"The mosque is receiving many questions right now. Please try again later.",imamLongueur:"Your question must be between 10 and 600 characters.",imamErreur:"Something went wrong. Please try again later.",
 espaceImam:"Imam area",espaceImamSous:"For imams of partner mosques",espaceCode:"Mosque code",espaceEntrer:"Sign in",espaceQuitter:"Sign out",
 espaceCodeFaux:"Wrong code.",espaceBloque:"Too many attempts. Try again in an hour.",espaceAttente:"Pending questions",espaceRien:"No pending questions. Barak Allahu fik.",
 espacePublier:"Publish the answer",espaceRefuser:"Do not keep",espaceRefuserOk:"Do not keep this question? It will never be published.",espacePubliees:"Published answers",espaceRetirer:"Remove",espaceRetirerOk:"Remove this answer? It will no longer be visible.",
 espaceInfo:"Questions are anonymous. Only those you answer are published, with your answer.",recue:"Received on {d}",
 j_vendredi:"Friday",j_samedi:"Saturday",j_dimanche:"Sunday",j_lundi:"Monday",j_mardi:"Tuesday",j_mercredi:"Wednesday",j_jeudi:"Thursday"},
ar:{boiteTitre:"صندوق الأسئلة",boiteSous:"اطرح سؤالًا عن الدين دون أن تذكر من أنت.",boiteVide:"لا توجد أسئلة بعد. اسأل ولن يعرف أحد أنك صاحب السؤال.",
 boitePoser:"اطرح سؤالًا دون اسم",boiteAnonyme:"لن يعرف أحد من طرح هذا السؤال: لا يُحفظ أي اسم.",boiteEx:"مثال: لماذا نصلي نحو مكة؟",
 boiteRepondre:"أجب",boiteQui:"من يجيب؟",boiteTaRep:"جوابك",boiteSuppr:"حذف السؤال",boiteSupprOk:"حذف هذا السؤال وأجوبته؟",
 boiteN:["{n} سؤال","{n} أسئلة"],boiteRepN:["{n} جواب","{n} أجوبة"],versImam:"اسأل الإمام",
 imamTitre:"اسأل الإمام",imamSous:"اطرح سؤالك على إمام مسجدك دون ذكر اسمك.",imamBientot:"قريبًا: تنضم المساجد الشريكة إلى دَرْسي شيئًا فشيئًا، إن شاء الله.",
 imamJour:"يجيب الإمام يوم {j}.",imamPoser:"اطرح سؤالًا على الإمام",imamAnonyme:"يُرسل سؤالك دون اسمك ودون أي معلومة عنك. إذا أجاب الإمام، يظهر السؤال وجوابه لرواد المسجد، دائمًا دون اسم.",
 imamEx:"اكتب سؤالك بوضوح في جمل قليلة.",imamEnvoyer:"أرسل إلى الإمام",imamEnvoye:"أُرسل السؤال. سترى جواب الإمام هنا.",
 imamMes:"أسئلتي",imamReponses:"أجوبة الإمام",imamAucune:"لم يُنشر أي جواب بعد.",imamAttente:"في انتظار الجواب",imamRepondue:"جواب الإمام",imamRefusee:"لم يعتمده الإمام",
 imamNouvelle:["أجاب الإمام عن سؤالك","أجاب الإمام عن {n} من أسئلتك"],imamChoisir:"اختر مسجدك",imamChanger:"تغيير المسجد",imamCherche:"المدينة أو المسجد",imamAucuneMosquee:"لم يُعثر على أي مسجد.",
 imamHorsLigne:"لا يوجد اتصال بالإنترنت. أعد المحاولة لاحقًا.",imamTrop:"يتلقى المسجد أسئلة كثيرة حاليًا. أعد المحاولة لاحقًا.",imamLongueur:"يجب أن يكون سؤالك بين 10 و600 حرف.",imamErreur:"حدث خطأ. أعد المحاولة لاحقًا.",
 espaceImam:"فضاء الإمام",espaceImamSous:"خاص بأئمة المساجد الشريكة",espaceCode:"رمز المسجد",espaceEntrer:"دخول",espaceQuitter:"خروج",
 espaceCodeFaux:"الرمز غير صحيح.",espaceBloque:"محاولات كثيرة. أعد المحاولة بعد ساعة.",espaceAttente:"أسئلة في الانتظار",espaceRien:"لا توجد أسئلة في الانتظار. بارك الله فيك.",
 espacePublier:"نشر الجواب",espaceRefuser:"عدم الاعتماد",espaceRefuserOk:"عدم اعتماد هذا السؤال؟ لن يُنشر أبدًا.",espacePubliees:"الأجوبة المنشورة",espaceRetirer:"سحب",espaceRetirerOk:"سحب هذا الجواب؟ لن يظهر بعد الآن.",
 espaceInfo:"الأسئلة دون أسماء. لا يُنشر إلا ما تجيب عنه، مع جوابك.",recue:"وصل في {d}",
 j_vendredi:"الجمعة",j_samedi:"السبت",j_dimanche:"الأحد",j_lundi:"الاثنين",j_mardi:"الثلاثاء",j_mercredi:"الأربعاء",j_jeudi:"الخميس"},
de:{boiteTitre:"Fragenbox",boiteSous:"Stelle eine Frage zur Religion, ohne zu sagen, wer du bist.",boiteVide:"Noch keine Fragen. Trau dich: Niemand erfährt, dass du es warst.",
 boitePoser:"Anonyme Frage stellen",boiteAnonyme:"Niemand erfährt, wer diese Frage gestellt hat: Es wird kein Name gespeichert.",boiteEx:"Z. B. Warum beten wir in Richtung Mekka?",
 boiteRepondre:"Antworten",boiteQui:"Wer antwortet?",boiteTaRep:"Deine Antwort",boiteSuppr:"Frage löschen",boiteSupprOk:"Diese Frage und ihre Antworten löschen?",
 boiteN:["{n} Frage","{n} Fragen"],boiteRepN:["{n} Antwort","{n} Antworten"],versImam:"Den Imam fragen",
 imamTitre:"Den Imam fragen",imamSous:"Stelle dem Imam deiner Moschee anonym eine Frage.",imamBientot:"Bald verfügbar: Partnermoscheen kommen nach und nach zu Darsi, inschallah.",
 imamJour:"Der Imam antwortet am {j}.",imamPoser:"Dem Imam eine Frage stellen",imamAnonyme:"Deine Frage wird ohne deinen Namen und ohne Angaben über dich gesendet. Wenn der Imam antwortet, sind Frage und Antwort für die Gemeinde der Moschee sichtbar, weiterhin ohne Namen.",
 imamEx:"Schreibe deine Frage klar in wenigen Sätzen.",imamEnvoyer:"An den Imam senden",imamEnvoye:"Frage gesendet. Die Antwort des Imams erscheint hier.",
 imamMes:"Meine Fragen",imamReponses:"Antworten des Imams",imamAucune:"Noch keine Antwort veröffentlicht.",imamAttente:"Wartet auf Antwort",imamRepondue:"Antwort des Imams",imamRefusee:"Vom Imam nicht aufgenommen",
 imamNouvelle:["Der Imam hat deine Frage beantwortet","Der Imam hat {n} deiner Fragen beantwortet"],imamChoisir:"Wähle deine Moschee",imamChanger:"Moschee wechseln",imamCherche:"Stadt oder Moschee",imamAucuneMosquee:"Keine Moschee gefunden.",
 imamHorsLigne:"Keine Internetverbindung. Versuche es später erneut.",imamTrop:"Die Moschee erhält gerade sehr viele Fragen. Versuche es später erneut.",imamLongueur:"Deine Frage muss 10 bis 600 Zeichen lang sein.",imamErreur:"Ein Fehler ist aufgetreten. Versuche es später erneut.",
 espaceImam:"Imam-Bereich",espaceImamSous:"Nur für Imame der Partnermoscheen",espaceCode:"Code der Moschee",espaceEntrer:"Anmelden",espaceQuitter:"Abmelden",
 espaceCodeFaux:"Falscher Code.",espaceBloque:"Zu viele Versuche. Versuche es in einer Stunde erneut.",espaceAttente:"Offene Fragen",espaceRien:"Keine offenen Fragen. Barak Allahu fik.",
 espacePublier:"Antwort veröffentlichen",espaceRefuser:"Nicht aufnehmen",espaceRefuserOk:"Diese Frage nicht aufnehmen? Sie wird nie veröffentlicht.",espacePubliees:"Veröffentlichte Antworten",espaceRetirer:"Entfernen",espaceRetirerOk:"Diese Antwort entfernen? Sie ist dann nicht mehr sichtbar.",
 espaceInfo:"Die Fragen sind anonym. Nur beantwortete Fragen werden mit Ihrer Antwort veröffentlicht.",recue:"Eingegangen am {d}",
 j_vendredi:"Freitag",j_samedi:"Samstag",j_dimanche:"Sonntag",j_lundi:"Montag",j_mardi:"Dienstag",j_mercredi:"Mittwoch",j_jeudi:"Donnerstag"},
nl:{boiteTitre:"Vragenbus",boiteSous:"Stel een vraag over het geloof zonder te zeggen wie je bent.",boiteVide:"Nog geen vragen. Durf te vragen: niemand weet dat jij het was.",
 boitePoser:"Anonieme vraag stellen",boiteAnonyme:"Niemand weet wie deze vraag stelde: er wordt geen naam bewaard.",boiteEx:"Bv. Waarom bidden we richting Mekka?",
 boiteRepondre:"Antwoorden",boiteQui:"Wie antwoordt?",boiteTaRep:"Jouw antwoord",boiteSuppr:"Vraag verwijderen",boiteSupprOk:"Deze vraag en de antwoorden verwijderen?",
 boiteN:["{n} vraag","{n} vragen"],boiteRepN:["{n} antwoord","{n} antwoorden"],versImam:"Vraag het de imam",
 imamTitre:"Vraag het de imam",imamSous:"Stel de imam van je moskee anoniem een vraag.",imamBientot:"Binnenkort beschikbaar: partnermoskeeën sluiten zich stap voor stap aan bij Darsi, insha'Allah.",
 imamJour:"De imam antwoordt op {j}.",imamPoser:"Een vraag stellen aan de imam",imamAnonyme:"Je vraag wordt verstuurd zonder je naam of enige informatie over jou. Als de imam antwoordt, zijn vraag en antwoord zichtbaar voor de gemeenschap van de moskee, nog steeds zonder naam.",
 imamEx:"Schrijf je vraag duidelijk in een paar zinnen.",imamEnvoyer:"Naar de imam sturen",imamEnvoye:"Vraag verstuurd. Het antwoord van de imam verschijnt hier.",
 imamMes:"Mijn vragen",imamReponses:"Antwoorden van de imam",imamAucune:"Nog geen antwoord gepubliceerd.",imamAttente:"Wacht op antwoord",imamRepondue:"Antwoord van de imam",imamRefusee:"Niet opgenomen door de imam",
 imamNouvelle:["De imam heeft je vraag beantwoord","De imam heeft {n} van je vragen beantwoord"],imamChoisir:"Kies je moskee",imamChanger:"Andere moskee",imamCherche:"Stad of moskee",imamAucuneMosquee:"Geen moskee gevonden.",
 imamHorsLigne:"Geen internetverbinding. Probeer het later opnieuw.",imamTrop:"De moskee krijgt nu veel vragen. Probeer het later opnieuw.",imamLongueur:"Je vraag moet tussen 10 en 600 tekens lang zijn.",imamErreur:"Er ging iets mis. Probeer het later opnieuw.",
 espaceImam:"Imam-ruimte",espaceImamSous:"Alleen voor imams van partnermoskeeën",espaceCode:"Code van de moskee",espaceEntrer:"Inloggen",espaceQuitter:"Uitloggen",
 espaceCodeFaux:"Onjuiste code.",espaceBloque:"Te veel pogingen. Probeer het over een uur opnieuw.",espaceAttente:"Openstaande vragen",espaceRien:"Geen openstaande vragen. Barak Allahu fik.",
 espacePublier:"Antwoord publiceren",espaceRefuser:"Niet opnemen",espaceRefuserOk:"Deze vraag niet opnemen? Ze wordt nooit gepubliceerd.",espacePubliees:"Gepubliceerde antwoorden",espaceRetirer:"Verwijderen",espaceRetirerOk:"Dit antwoord verwijderen? Het is dan niet meer zichtbaar.",
 espaceInfo:"De vragen zijn anoniem. Alleen beantwoorde vragen worden gepubliceerd, met uw antwoord.",recue:"Ontvangen op {d}",
 j_vendredi:"vrijdag",j_samedi:"zaterdag",j_dimanche:"zondag",j_lundi:"maandag",j_mardi:"dinsdag",j_mercredi:"woensdag",j_jeudi:"donderdag"},
es:{boiteTitre:"Buzón de preguntas",boiteSous:"Haz una pregunta sobre la religión sin decir quién eres.",boiteVide:"Aún no hay preguntas. Atrévete: nadie sabrá que fuiste tú.",
 boitePoser:"Hacer una pregunta anónima",boiteAnonyme:"Nadie sabrá quién hizo esta pregunta: no se guarda ningún nombre.",boiteEx:"Ej. ¿Por qué rezamos hacia La Meca?",
 boiteRepondre:"Responder",boiteQui:"¿Quién responde?",boiteTaRep:"Tu respuesta",boiteSuppr:"Borrar la pregunta",boiteSupprOk:"¿Borrar esta pregunta y sus respuestas?",
 boiteN:["{n} pregunta","{n} preguntas"],boiteRepN:["{n} respuesta","{n} respuestas"],versImam:"Preguntar al imam",
 imamTitre:"Preguntar al imam",imamSous:"Haz tu pregunta de forma anónima al imam de tu mezquita.",imamBientot:"Próximamente: las mezquitas asociadas se van uniendo a Darsi poco a poco, insha'Allah.",
 imamJour:"El imam responde el {j}.",imamPoser:"Hacer una pregunta al imam",imamAnonyme:"Tu pregunta se envía sin tu nombre ni ningún dato sobre ti. Si el imam responde, la pregunta y la respuesta serán visibles para los fieles de la mezquita, siempre sin nombre.",
 imamEx:"Escribe tu pregunta con claridad, en pocas frases.",imamEnvoyer:"Enviar al imam",imamEnvoye:"Pregunta enviada. Aquí verás la respuesta del imam.",
 imamMes:"Mis preguntas",imamReponses:"Respuestas del imam",imamAucune:"Aún no hay respuestas publicadas.",imamAttente:"Esperando respuesta",imamRepondue:"Respuesta del imam",imamRefusee:"No seleccionada por el imam",
 imamNouvelle:["El imam respondió a tu pregunta","El imam respondió a {n} de tus preguntas"],imamChoisir:"Elige tu mezquita",imamChanger:"Cambiar de mezquita",imamCherche:"Ciudad o mezquita",imamAucuneMosquee:"No se encontró ninguna mezquita.",
 imamHorsLigne:"Sin conexión a internet. Inténtalo más tarde.",imamTrop:"La mezquita recibe muchas preguntas ahora. Inténtalo más tarde.",imamLongueur:"Tu pregunta debe tener entre 10 y 600 caracteres.",imamErreur:"Se produjo un error. Inténtalo más tarde.",
 espaceImam:"Espacio del imam",espaceImamSous:"Reservado a los imames de las mezquitas asociadas",espaceCode:"Código de la mezquita",espaceEntrer:"Entrar",espaceQuitter:"Salir",
 espaceCodeFaux:"Código incorrecto.",espaceBloque:"Demasiados intentos. Inténtalo dentro de una hora.",espaceAttente:"Preguntas pendientes",espaceRien:"No hay preguntas pendientes. Barak Allahu fik.",
 espacePublier:"Publicar la respuesta",espaceRefuser:"No seleccionar",espaceRefuserOk:"¿No seleccionar esta pregunta? Nunca se publicará.",espacePubliees:"Respuestas publicadas",espaceRetirer:"Retirar",espaceRetirerOk:"¿Retirar esta respuesta? Dejará de ser visible.",
 espaceInfo:"Las preguntas son anónimas. Solo se publican las que usted responde, con su respuesta.",recue:"Recibida el {d}",
 j_vendredi:"viernes",j_samedi:"sábado",j_dimanche:"domingo",j_lundi:"lunes",j_mardi:"martes",j_mercredi:"miércoles",j_jeudi:"jueves"},
it:{boiteTitre:"Cassetta delle domande",boiteSous:"Fai una domanda sulla religione senza dire chi sei.",boiteVide:"Ancora nessuna domanda. Chiedi pure: nessuno saprà che sei stato tu.",
 boitePoser:"Fai una domanda anonima",boiteAnonyme:"Nessuno saprà chi ha fatto questa domanda: nessun nome viene salvato.",boiteEx:"Es. Perché preghiamo verso la Mecca?",
 boiteRepondre:"Rispondi",boiteQui:"Chi risponde?",boiteTaRep:"La tua risposta",boiteSuppr:"Elimina la domanda",boiteSupprOk:"Eliminare questa domanda e le sue risposte?",
 boiteN:["{n} domanda","{n} domande"],boiteRepN:["{n} risposta","{n} risposte"],versImam:"Chiedi all'imam",
 imamTitre:"Chiedi all'imam",imamSous:"Fai la tua domanda in forma anonima all'imam della tua moschea.",imamBientot:"Presto disponibile: le moschee partner si uniscono a Darsi poco a poco, insha'Allah.",
 imamJour:"L'imam risponde il {j}.",imamPoser:"Fai una domanda all'imam",imamAnonyme:"La tua domanda parte senza il tuo nome né alcuna informazione su di te. Se l'imam risponde, domanda e risposta saranno visibili ai fedeli della moschea, sempre senza nome.",
 imamEx:"Scrivi la tua domanda in modo chiaro, in poche frasi.",imamEnvoyer:"Invia all'imam",imamEnvoye:"Domanda inviata. Qui vedrai la risposta dell'imam.",
 imamMes:"Le mie domande",imamReponses:"Risposte dell'imam",imamAucune:"Ancora nessuna risposta pubblicata.",imamAttente:"In attesa di risposta",imamRepondue:"Risposta dell'imam",imamRefusee:"Non accolta dall'imam",
 imamNouvelle:["L'imam ha risposto alla tua domanda","L'imam ha risposto a {n} delle tue domande"],imamChoisir:"Scegli la tua moschea",imamChanger:"Cambia moschea",imamCherche:"Città o moschea",imamAucuneMosquee:"Nessuna moschea trovata.",
 imamHorsLigne:"Nessuna connessione internet. Riprova più tardi.",imamTrop:"La moschea riceve molte domande in questo momento. Riprova più tardi.",imamLongueur:"La domanda deve avere tra 10 e 600 caratteri.",imamErreur:"Si è verificato un errore. Riprova più tardi.",
 espaceImam:"Area imam",espaceImamSous:"Riservata agli imam delle moschee partner",espaceCode:"Codice della moschea",espaceEntrer:"Accedi",espaceQuitter:"Esci",
 espaceCodeFaux:"Codice errato.",espaceBloque:"Troppi tentativi. Riprova tra un'ora.",espaceAttente:"Domande in attesa",espaceRien:"Nessuna domanda in attesa. Barak Allahu fik.",
 espacePublier:"Pubblica la risposta",espaceRefuser:"Non accogliere",espaceRefuserOk:"Non accogliere questa domanda? Non sarà mai pubblicata.",espacePubliees:"Risposte pubblicate",espaceRetirer:"Ritira",espaceRetirerOk:"Ritirare questa risposta? Non sarà più visibile.",
 espaceInfo:"Le domande sono anonime. Vengono pubblicate solo quelle a cui rispondete, con la vostra risposta.",recue:"Ricevuta il {d}",
 j_vendredi:"venerdì",j_samedi:"sabato",j_dimanche:"domenica",j_lundi:"lunedì",j_mardi:"martedì",j_mercredi:"mercoledì",j_jeudi:"giovedì"},
tr:{boiteTitre:"Soru kutusu",boiteSous:"Kim olduğunu söylemeden din hakkında bir soru sor.",boiteVide:"Henüz soru yok. Sormaktan çekinme: kimse senin sorduğunu bilmeyecek.",
 boitePoser:"İsimsiz soru sor",boiteAnonyme:"Bu soruyu kimin sorduğunu kimse bilmeyecek: hiçbir isim kaydedilmez.",boiteEx:"Örn. Neden Mekke'ye doğru namaz kılıyoruz?",
 boiteRepondre:"Cevapla",boiteQui:"Kim cevaplıyor?",boiteTaRep:"Cevabın",boiteSuppr:"Soruyu sil",boiteSupprOk:"Bu soru ve cevapları silinsin mi?",
 boiteN:["{n} soru","{n} soru"],boiteRepN:["{n} cevap","{n} cevap"],versImam:"İmama sor",
 imamTitre:"İmama sor",imamSous:"Camiinin imamına sorunu isimsiz olarak sor.",imamBientot:"Yakında: ortak camiler adım adım Darsi'ye katılıyor, inşallah.",
 imamJour:"İmam {j} günü cevaplıyor.",imamPoser:"İmama soru sor",imamAnonyme:"Sorun adın ve hakkında hiçbir bilgi olmadan gönderilir. İmam cevaplarsa soru ve cevabı caminin cemaatine yine isimsiz olarak görünür.",
 imamEx:"Sorunu birkaç cümleyle açıkça yaz.",imamEnvoyer:"İmama gönder",imamEnvoye:"Soru gönderildi. İmamın cevabını burada göreceksin.",
 imamMes:"Sorularım",imamReponses:"İmamın cevapları",imamAucune:"Henüz yayımlanmış cevap yok.",imamAttente:"Cevap bekleniyor",imamRepondue:"İmamın cevabı",imamRefusee:"İmam tarafından alınmadı",
 imamNouvelle:["İmam soruna cevap verdi","İmam {n} soruna cevap verdi"],imamChoisir:"Camini seç",imamChanger:"Camiyi değiştir",imamCherche:"Şehir veya cami",imamAucuneMosquee:"Cami bulunamadı.",
 imamHorsLigne:"İnternet bağlantısı yok. Daha sonra tekrar dene.",imamTrop:"Cami şu anda çok soru alıyor. Daha sonra tekrar dene.",imamLongueur:"Sorun 10 ile 600 karakter arasında olmalı.",imamErreur:"Bir hata oluştu. Daha sonra tekrar dene.",
 espaceImam:"İmam alanı",espaceImamSous:"Yalnızca ortak camilerin imamları için",espaceCode:"Cami kodu",espaceEntrer:"Giriş yap",espaceQuitter:"Çıkış yap",
 espaceCodeFaux:"Kod yanlış.",espaceBloque:"Çok fazla deneme. Bir saat sonra tekrar dene.",espaceAttente:"Bekleyen sorular",espaceRien:"Bekleyen soru yok. Barakallahu fik.",
 espacePublier:"Cevabı yayımla",espaceRefuser:"Alma",espaceRefuserOk:"Bu soru alınmasın mı? Asla yayımlanmayacak.",espacePubliees:"Yayımlanan cevaplar",espaceRetirer:"Kaldır",espaceRetirerOk:"Bu cevap kaldırılsın mı? Artık görünmeyecek.",
 espaceInfo:"Sorular isimsizdir. Yalnızca cevapladığınız sorular, cevabınızla birlikte yayımlanır.",recue:"{d} tarihinde alındı",
 j_vendredi:"cuma",j_samedi:"cumartesi",j_dimanche:"pazar",j_lundi:"pazartesi",j_mardi:"salı",j_mercredi:"çarşamba",j_jeudi:"perşembe"},
id:{boiteTitre:"Kotak pertanyaan",boiteSous:"Ajukan pertanyaan tentang agama tanpa menyebut siapa dirimu.",boiteVide:"Belum ada pertanyaan. Silakan bertanya: tidak ada yang tahu itu kamu.",
 boitePoser:"Ajukan pertanyaan tanpa nama",boiteAnonyme:"Tidak ada yang tahu siapa yang bertanya: tidak ada nama yang disimpan.",boiteEx:"Mis. Mengapa kita salat menghadap Mekah?",
 boiteRepondre:"Jawab",boiteQui:"Siapa yang menjawab?",boiteTaRep:"Jawabanmu",boiteSuppr:"Hapus pertanyaan",boiteSupprOk:"Hapus pertanyaan ini beserta jawabannya?",
 boiteN:["{n} pertanyaan","{n} pertanyaan"],boiteRepN:["{n} jawaban","{n} jawaban"],versImam:"Tanya imam",
 imamTitre:"Tanya imam",imamSous:"Ajukan pertanyaanmu tanpa nama kepada imam masjidmu.",imamBientot:"Segera hadir: masjid mitra bergabung dengan Darsi sedikit demi sedikit, insya Allah.",
 imamJour:"Imam menjawab pada hari {j}.",imamPoser:"Ajukan pertanyaan kepada imam",imamAnonyme:"Pertanyaanmu dikirim tanpa nama dan tanpa informasi apa pun tentangmu. Jika imam menjawab, pertanyaan dan jawabannya dapat dilihat jamaah masjid, tetap tanpa nama.",
 imamEx:"Tulis pertanyaanmu dengan jelas dalam beberapa kalimat.",imamEnvoyer:"Kirim ke imam",imamEnvoye:"Pertanyaan terkirim. Jawaban imam akan muncul di sini.",
 imamMes:"Pertanyaanku",imamReponses:"Jawaban imam",imamAucune:"Belum ada jawaban yang diterbitkan.",imamAttente:"Menunggu jawaban",imamRepondue:"Jawaban imam",imamRefusee:"Tidak dipilih oleh imam",
 imamNouvelle:["Imam telah menjawab pertanyaanmu","Imam telah menjawab {n} pertanyaanmu"],imamChoisir:"Pilih masjidmu",imamChanger:"Ganti masjid",imamCherche:"Kota atau masjid",imamAucuneMosquee:"Masjid tidak ditemukan.",
 imamHorsLigne:"Tidak ada koneksi internet. Coba lagi nanti.",imamTrop:"Masjid sedang menerima banyak pertanyaan. Coba lagi nanti.",imamLongueur:"Pertanyaanmu harus 10 sampai 600 karakter.",imamErreur:"Terjadi kesalahan. Coba lagi nanti.",
 espaceImam:"Ruang imam",espaceImamSous:"Khusus imam masjid mitra",espaceCode:"Kode masjid",espaceEntrer:"Masuk",espaceQuitter:"Keluar",
 espaceCodeFaux:"Kode salah.",espaceBloque:"Terlalu banyak percobaan. Coba lagi satu jam lagi.",espaceAttente:"Pertanyaan menunggu",espaceRien:"Tidak ada pertanyaan menunggu. Barakallahu fik.",
 espacePublier:"Terbitkan jawaban",espaceRefuser:"Tidak dipilih",espaceRefuserOk:"Jangan pilih pertanyaan ini? Pertanyaan ini tidak akan pernah diterbitkan.",espacePubliees:"Jawaban yang diterbitkan",espaceRetirer:"Tarik",espaceRetirerOk:"Tarik jawaban ini? Jawaban tidak akan terlihat lagi.",
 espaceInfo:"Pertanyaan bersifat anonim. Hanya yang Anda jawab yang diterbitkan, bersama jawaban Anda.",recue:"Diterima {d}",
 j_vendredi:"Jumat",j_samedi:"Sabtu",j_dimanche:"Minggu",j_lundi:"Senin",j_mardi:"Selasa",j_mercredi:"Rabu",j_jeudi:"Kamis"}};
for(const l in I18N_IMAM)Object.assign(I18N[l]=I18N[l]||{},I18N_IMAM[l]);

ICONS.bulle='<path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 3.5V16.5h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1z"/><path d="M8.5 10h7M8.5 13h4.5"/>';
ICONS.masque='<path d="M3.5 9.5c2.7-1.6 5.5-2 8.5-2s5.8.4 8.5 2c0 4.6-3.2 7-6 7-1.2 0-1.8-1.3-2.5-1.3s-1.3 1.3-2.5 1.3c-2.8 0-6-2.4-6-7z"/><path d="M7.4 11.4h2.4M14.2 11.4h2.4"/>';

/* ---------- Petits outils ---------- */
function notifier(msg){let n=$('notif');if(!n){n=document.createElement('div');n.id='notif';n.className='notif';document.body.appendChild(n)}
  n.textContent=msg;n.classList.add('vu');clearTimeout(notifier.t);notifier.t=setTimeout(()=>n.classList.remove('vu'),3200)}
function msgErreur(e){const c=e&&e.code;return t(c==='hors_ligne'?'imamHorsLigne':c==='trop'?'imamTrop':c==='longueur'?'imamLongueur':c==='code'?'espaceCodeFaux':c==='bloque'?'espaceBloque':'imamErreur')}
const dateCourte=iso=>fmt(new Date(iso),{weekday:'long',day:'numeric',month:'long'});
const paras=s=>esc(s).split(/\n+/).map(p=>`<p>${p}</p>`).join('');
function imamEtat(){return S.imam=S.imam||{mosquee:null,mesQ:[]}}

/* ---------- 1) Boîte à questions de la famille ---------- */
function boite(){return S.groupe.boite=S.groupe.boite||[]}
function carteBoite(){
  const n=S.groupe?boite().length:0;
  return `<div class="ligne-theme" onclick="ouvrirBoite()"><div class="pastille">${ic('masque')}</div>
    <div class="milieu"><b>${t('boiteTitre')}</b><div class="petit">${n?t('boiteN',{n}):t('boiteSous')}</div></div>${ic('droite','sm')}</div>`;
}
function ouvrirBoite(){
  const B=boite().slice().reverse();
  $('e-boite').innerHTML=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('masque','sm')} ${esc(S.groupe.nom)}</div><h2>${t('boiteTitre')}</h2>
    <p class="doux" style="line-height:1.5">${t('boiteSous')}</p>
    <button class="btn" onclick="poserBoite()">${ic('plume')} ${t('boitePoser')}</button>
    ${B.length?B.map(q=>`<div class="carte question-boite"><p class="q-texte">${esc(q.q)}</p><div class="petit">${esc(dateCourte(q.le))} · ${t('boiteRepN',{n:q.rep.length})}</div>
      ${q.rep.map(r=>{const m=membre(r.m)||{nom:'?',couleur:'#888'};return `<div class="rep-boite">${avatar(m)}<div><b>${esc(m.nom)}</b><div>${esc(r.txt)}</div></div></div>`}).join('')}
      <div class="rangee-btn"><button class="btn mini" onclick="repondreBoite('${q.id}')">${t('boiteRepondre')}</button>
      <button class="btn mini sec" onclick="ouvrirPoserImam(${esc(JSON.stringify(q.q))})">${ic('mosquee','sm')} ${t('versImam')}</button>
      </div><button class="suppr-q" aria-label="${t('boiteSuppr')}" onclick="supprimerBoite('${q.id}')">${ic('croix','sm')}</button></div>`).join('')
      :`<div class="carte"><p class="doux" style="line-height:1.5">${t('boiteVide')}</p></div>`}`;
  aller('boite');
}
function poserBoite(){
  $('e-boite-poser').innerHTML=boutonRetour('ouvrirBoite()')+`<h2>${t('boitePoser')}</h2>
    <div class="carte info-anonyme">${ic('masque')}<p>${t('boiteAnonyme')}</p></div>
    <textarea id="bx-q" maxlength="300" placeholder="${t('boiteEx')}"></textarea>
    <button class="btn" onclick="enregistrerBoite()">${t('envoyer')}</button>`;
  aller('boite-poser');setTimeout(()=>$('bx-q').focus(),80);
}
function enregistrerBoite(){
  const q=$('bx-q').value.trim();if(q.length<3){$('bx-q').focus();return}
  boite().push({id:'b'+Date.now(),q,le:new Date().toISOString(),rep:[]});   // aucun auteur enregistré
  sauver();ouvrirBoite();
}
function repondreBoite(id){
  const q=boite().find(x=>x.id===id);if(!q)return;
  $('e-boite-poser').innerHTML=boutonRetour('ouvrirBoite()')+`<h2>${t('boiteRepondre')}</h2>
    <div class="carte"><p class="q-texte">${esc(q.q)}</p></div>
    <label>${t('boiteQui')}</label><select id="bx-m">${S.groupe.membres.map(m=>`<option value="${m.id}">${esc(m.nom)}</option>`).join('')}</select>
    <label>${t('boiteTaRep')}</label><textarea id="bx-r" maxlength="600"></textarea>
    <button class="btn" onclick="enregistrerRepBoite('${id}')">${t('envoyer')}</button>`;
  aller('boite-poser');
}
function enregistrerRepBoite(id){
  const q=boite().find(x=>x.id===id),txt=$('bx-r').value.trim();if(!q)return;if(!txt){$('bx-r').focus();return}
  q.rep.push({m:$('bx-m').value,txt,le:new Date().toISOString()});sauver();ouvrirBoite();
}
function supprimerBoite(id){if(!confirm(t('boiteSupprOk')))return;S.groupe.boite=boite().filter(x=>x.id!==id);sauver();ouvrirBoite()}

/* ---------- 2) Demander à l'imam ---------- */
function nouvellesReponses(){return imamEtat().mesQ.filter(q=>q.statut==='repondue'&&!q.vu).length}
function carteImam(){
  const M=imamEtat().mosquee,n=nouvellesReponses();
  return `<div class="ligne-theme" onclick="ouvrirImam()"><div class="pastille">${ic('mosquee')}</div>
    <div class="milieu"><b>${t('imamTitre')}</b><div class="petit">${M?esc(M.nom+' · '+M.ville):t('imamSous')}</div></div>
    ${n?`<span class="pastille-nb">${n}</span>`:''}${ic('droite','sm')}</div>`;
}
async function ouvrirImam(){
  const z=$('e-imam'),I=imamEtat();
  if(!enLigneOk()){z.innerHTML=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('mosquee','sm')} ${t('imamTitre')}</div><h2>${t('imamTitre')}</h2>
    <div class="carte"><p class="doux" style="line-height:1.6">${t('imamSous')}</p><p style="line-height:1.6;margin-top:10px">${t('imamBientot')}</p></div>`;aller('imam');return}
  if(!I.mosquee){choisirMosquee();return}
  const M=I.mosquee;
  const mes=I.mesQ.slice().reverse().map(q=>`<div class="carte question-imam"><div class="etat etat-${q.statut}">${t(q.statut==='repondue'?'imamRepondue':q.statut==='refusee'?'imamRefusee':'imamAttente')}</div>
    <p class="q-texte">${esc(q.texte)}</p>${q.reponse?`<div class="reponse-imam">${paras(q.reponse)}</div>`:''}<div class="petit">${t('recue',{d:esc(dateCourte(q.le))})}</div></div>`).join('');
  z.innerHTML=boutonRetour('ouvrirFamille()')+`<div class="surtitre">${ic('mosquee','sm')} ${esc(M.ville)}</div><h2>${esc(M.nom)}</h2>
    <p class="doux">${t('imamJour',{j:t('j_'+M.jour_reponse)||M.jour_reponse})}</p>
    <button class="btn" onclick="ouvrirPoserImam()">${ic('plume')} ${t('imamPoser')}</button>
    ${mes?`<h3 class="titre-section">${t('imamMes')}</h3>${mes}`:''}
    <h3 class="titre-section">${t('imamReponses')}</h3><div id="imam-pub"><div class="carte"><p class="doux">…</p></div></div>
    <button class="btn sec" style="margin-top:18px" onclick="choisirMosquee()">${t('imamChanger')}</button>`;
  aller('imam');
  I.mesQ.forEach(q=>{if(q.statut==='repondue')q.vu=true});sauver();majPastilleFamille();
  majMesQuestions().then(n=>{if(n)ouvrirImam()}).catch(()=>{});
  try{
    const L=await rpc('dz_reponses',{p_mosquee:M.id});
    $('imam-pub').innerHTML=L&&L.length?L.map(r=>`<details class="carte reponse-pub"><summary><p class="q-texte">${esc(r.texte)}</p>
      <div class="petit">${esc(dateCourte(r.repondu_le))}</div></summary><div class="reponse-imam">${paras(r.reponse)}</div></details>`).join('')
      :`<div class="carte"><p class="doux">${t('imamAucune')}</p></div>`;
  }catch(e){const p=$('imam-pub');if(p)p.innerHTML=`<div class="carte"><p class="doux">${msgErreur(e)}</p></div>`}
}
let MOSQUEES=[];
async function choisirMosquee(pour='fidele'){
  const z=$('e-mosquees');
  z.innerHTML=boutonRetour(pour==='imam'?'ouvrirParametres()':'ouvrirFamille()')+`<h2>${t('imamChoisir')}</h2>
    <input id="mq-cherche" placeholder="${t('imamCherche')}" autocomplete="off" oninput="listeMosquees('${pour}')"><div id="mq-liste"><div class="carte"><p class="doux">…</p></div></div>`;
  aller('mosquees');
  try{MOSQUEES=await rpc('dz_mosquees_liste')||[];listeMosquees(pour)}
  catch(e){$('mq-liste').innerHTML=`<div class="carte"><p class="doux">${msgErreur(e)}</p></div>`}
}
function listeMosquees(pour){
  const n=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase(),q=n(($('mq-cherche')||{}).value||'');
  const L=MOSQUEES.filter(m=>n(m.nom+' '+m.ville).includes(q));
  $('mq-liste').innerHTML=L.length?`<div class="carte">${L.map(m=>`<div class="ligne-theme" onclick="prendreMosquee('${m.id}','${pour}')"><div class="pastille">${ic('mosquee')}</div>
    <div class="milieu"><b>${esc(m.nom)}</b><div class="petit">${esc(m.ville)}</div></div>${ic('droite','sm')}</div>`).join('')}</div>`
    :`<div class="carte"><p class="doux">${t('imamAucuneMosquee')}</p></div>`;
}
function prendreMosquee(id,pour){
  const m=MOSQUEES.find(x=>x.id===id);if(!m)return;
  if(pour==='imam'){ouvrirEspaceImam(m);return}
  imamEtat().mosquee=m;sauver();ouvrirImam();
}
function ouvrirPoserImam(texte=''){
  if(!enLigneOk()||!imamEtat().mosquee){ouvrirImam();return}
  const M=imamEtat().mosquee;
  $('e-imam-poser').innerHTML=boutonRetour('ouvrirImam()')+`<div class="surtitre">${ic('mosquee','sm')} ${esc(M.nom)}</div><h2>${t('imamPoser')}</h2>
    <div class="carte info-anonyme">${ic('masque')}<p>${t('imamAnonyme')}</p></div>
    <textarea id="im-q" maxlength="600" placeholder="${t('imamEx')}">${esc(texte)}</textarea>
    <button class="btn" id="im-ok" onclick="envoyerImam()">${ic('bulle')} ${t('imamEnvoyer')}</button>`;
  aller('imam-poser');
}
async function envoyerImam(){
  const txt=$('im-q').value.trim(),b=$('im-ok');
  if(txt.length<10||txt.length>600){notifier(t('imamLongueur'));$('im-q').focus();return}
  b.disabled=true;
  try{
    const id=await rpc('dz_poser',{p_mosquee:imamEtat().mosquee.id,p_texte:txt,p_langue:S.langue});
    imamEtat().mesQ.push({id,texte:txt,le:new Date().toISOString(),statut:'attente',reponse:null});
    imamEtat().mesQ=imamEtat().mesQ.slice(-50);sauver();pluie();notifier(t('imamEnvoye'));ouvrirImam();
  }catch(e){notifier(msgErreur(e));b.disabled=false}
}
/** Met à jour l'état de MES questions en attente ; renvoie le nombre de nouvelles réponses. */
async function majMesQuestions(){
  const I=imamEtat(),att=I.mesQ.filter(q=>q.statut==='attente');
  if(!att.length||!enLigneOk())return 0;
  const L=await rpc('dz_mes_questions',{p_ids:att.map(q=>q.id)})||[];let n=0;
  L.forEach(r=>{const q=I.mesQ.find(x=>x.id===r.id);if(q&&r.statut!=='attente'&&q.statut!==r.statut){q.statut=r.statut;q.reponse=r.reponse;if(r.statut==='repondue'){q.vu=false;n++}}});
  if(n){sauver();majPastilleFamille()}
  return n;
}
function majPastilleFamille(){const b=document.querySelector('.onglet[data-o="famille"]');if(b)b.classList.toggle('nouveau',nouvellesReponses()>0)}

/* ---------- 3) Espace imam (code secret de la mosquée, gardé sur le téléphone de l'imam) ---------- */
function carteEspaceImam(){
  return `<div class="carte"><h3 class="titre-carte">${t('espaceImam')}</h3><div class="ligne-theme" onclick="ouvrirEspaceImam()"><div class="pastille">${ic('cadenas')}</div>
    <div class="milieu"><b>${t('espaceImam')}</b><div class="petit">${S.espaceImam?esc(S.espaceImam.mosquee.nom):t('espaceImamSous')}</div></div>${ic('droite','sm')}</div></div>`;
}
async function ouvrirEspaceImam(mosquee){
  const z=$('e-espace-imam');
  if(!enLigneOk()){notifier(t('imamBientot'));return}
  if(!S.espaceImam){
    if(!mosquee){choisirMosquee('imam');return}
    z.innerHTML=boutonRetour('ouvrirParametres()')+`<div class="surtitre">${ic('cadenas','sm')} ${t('espaceImam')}</div><h2>${esc(mosquee.nom)}</h2>
      <p class="doux">${esc(mosquee.ville)}</p><label for="ei-code">${t('espaceCode')}</label>
      <input id="ei-code" type="password" autocomplete="off" autocapitalize="off"><button class="btn" id="ei-ok">${t('espaceEntrer')}</button>`;
    aller('espace-imam');
    $('ei-ok').onclick=async()=>{const code=$('ei-code').value.trim();if(!code)return;$('ei-ok').disabled=true;
      try{if(!await rpc('dz_imam_connexion',{p_mosquee:mosquee.id,p_code:code})){const e=new Error('code');e.code='code';throw e}
        S.espaceImam={mosquee,code};sauver();ouvrirEspaceImam()}
      catch(e){notifier(msgErreur(e));$('ei-ok').disabled=false}};
    return;
  }
  const E=S.espaceImam,A={p_mosquee:E.mosquee.id,p_code:E.code};
  z.innerHTML=boutonRetour('ouvrirParametres()')+`<div class="surtitre">${ic('cadenas','sm')} ${t('espaceImam')}</div><h2>${esc(E.mosquee.nom)}</h2>
    <p class="doux" style="line-height:1.5">${t('espaceInfo')}</p>
    <h3 class="titre-section">${t('espaceAttente')}</h3><div id="ei-att"><div class="carte"><p class="doux">…</p></div></div>
    <h3 class="titre-section">${t('espacePubliees')}</h3><div id="ei-pub"><div class="carte"><p class="doux">…</p></div></div>
    <button class="btn sec" style="margin-top:18px" onclick="quitterEspaceImam()">${t('espaceQuitter')}</button>`;
  aller('espace-imam');
  try{
    if(!await rpc('dz_imam_connexion',A)){const e=new Error('code');e.code='code';throw e}   // code changé par JINA Studios ?
    const att=await rpc('dz_imam_attente',A)||[];
    $('ei-att').innerHTML=att.length?att.map(q=>`<div class="carte question-imam" id="eq-${q.id}"><div class="petit">${t('recue',{d:esc(dateCourte(q.cree_le))})} · ${esc(q.langue.toUpperCase())}</div>
      <p class="q-texte">${esc(q.texte)}</p><textarea id="er-${q.id}" maxlength="4000"></textarea>
      <div class="rangee-btn"><button class="btn mini" onclick="imamAction('repondre','${q.id}')">${t('espacePublier')}</button>
      <button class="btn mini sec" onclick="imamAction('refuser','${q.id}')">${t('espaceRefuser')}</button></div></div>`).join('')
      :`<div class="carte"><p class="doux">${t('espaceRien')}</p></div>`;
    const pub=await rpc('dz_reponses',{p_mosquee:E.mosquee.id})||[];
    $('ei-pub').innerHTML=pub.length?pub.map(r=>`<details class="carte reponse-pub"><summary><p class="q-texte">${esc(r.texte)}</p><div class="petit">${esc(dateCourte(r.repondu_le))}</div></summary>
      <div class="reponse-imam">${paras(r.reponse)}</div><button class="btn mini sec" onclick="imamAction('retirer','${r.id}')">${t('espaceRetirer')}</button></details>`).join('')
      :`<div class="carte"><p class="doux">${t('imamAucune')}</p></div>`;
  }catch(e){
    if(e.code==='code'){S.espaceImam=null;sauver()}   // code changé par JINA Studios : on redemande
    $('ei-att').innerHTML=`<div class="carte"><p class="doux">${msgErreur(e)}</p></div>`;
  }
}
async function imamAction(quoi,id){
  const E=S.espaceImam;if(!E)return;const A={p_mosquee:E.mosquee.id,p_code:E.code,p_id:id};let ok;
  try{
    if(quoi==='repondre'){const r=$('er-'+id).value.trim();if(r.length<2){$('er-'+id).focus();return}ok=await rpc('dz_imam_repondre',{...A,p_reponse:r})}
    else if(quoi==='refuser'){if(!confirm(t('espaceRefuserOk')))return;ok=await rpc('dz_imam_refuser',A)}
    else{if(!confirm(t('espaceRetirerOk')))return;ok=await rpc('dz_imam_retirer',A)}
    if(ok===false){S.espaceImam=null;sauver();notifier(t('espaceCodeFaux'))}
    ouvrirEspaceImam(ok===false?E.mosquee:undefined);
  }catch(e){notifier(msgErreur(e))}
}
function quitterEspaceImam(){S.espaceImam=null;sauver();ouvrirParametres()}

/* Au démarrage : vérifie en silence si l'imam a répondu à mes questions. */
setTimeout(()=>{majMesQuestions().then(n=>{if(n)notifier(t('imamNouvelle',{n}))}).catch(()=>{});majPastilleFamille()},2500);
