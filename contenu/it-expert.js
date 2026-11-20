/* Darsi — domande ESPERTO a risposta multipla (italiano). b = elenco delle risposte giuste.
   Bisogna selezionare tutte le risposte giuste, e solo quelle. 2 per lezione, in aggiunta al quiz di 10. */
'use strict';
CONTENU.it.experts={
'r-bienvenue':[
 {q:"Tra questi mesi, quali appartengono al calendario musulmano (dell'Egira)?",c:["Shawwâl","Rajab","Muharram","Tishrîn al-awwal","Kânûn ath-thânî"],b:[0,1,2],e:"Tishrîn al-awwal e Kânûn ath-thânî sono i nomi siriaci di mesi del calendario gregoriano, usati nel Vicino Oriente: non sono mesi dell'Egira.",s:['f:mois']},
 {q:"Quali affermazioni sul mese di Ramadan sono esatte?",c:["È il 9° mese dell'Egira","Vi è iniziata la rivelazione del Corano","Il suo inizio dipende dalla falce di luna","Inizia sempre il 1° di Shaʿbân","Dura sempre esattamente 30 giorni"],b:[0,1,2],e:"Un mese lunare dura 29 o 30 giorni e la sua data cambia ogni anno.",s:['q:2:185','h:croissant']}],
'r-jeuner':[
 {q:"Chi può non digiunare durante il Ramadan, a condizione di recuperare i giorni più tardi?",c:["Il malato","Il viaggiatore","La donna che ha il ciclo mestruale","Chi studia il Corano tutto il giorno","Chi ha semplicemente sete d'estate"],b:[0,1,2],e:"Sono le dispense temporanee previste dal Corano e dalla Sunna.",s:['q:2:184','h:regles']},
 {q:"Secondo i sapienti, quali condizioni rendono obbligatorio il digiuno del Ramadan?",c:["Essere musulmano","Essere pubere","Essere sano di mente","Aver fatto il hajj","Saper leggere l'arabo"],b:[0,1,2],e:"Bisogna anche essere in grado di digiunare.",s:['f:conditions']}],
'r-rompt':[
 {q:"Tra questi atti compiuti volontariamente di giorno durante il Ramadan, quali rompono il digiuno?",c:["Mangiare","Bere","Avere rapporti intimi","Fare l'abluzione","Sentire un profumo di muschio"],b:[0,1,2],e:"Fare l'abluzione o sentire un profumo non rompe il digiuno.",s:['q:2:187']},
 {q:"Quali affermazioni sul digiuno del Ramadan sono esatte?",c:["Inizia all'alba","Termina al tramonto del sole","Mangiare per dimenticanza non lo annulla","Inizia a mezzogiorno","Si può bere dopo la preghiera dell'ʿAsr"],b:[0,1,2],e:"Dall'alba al tramonto del sole; la dimenticanza non annulla il digiuno.",s:['q:2:187','h:oubli']}],
'r-suhur':[
 {q:"Con che cosa il Profeta ﷺ rompeva il digiuno, secondo l'hadith di Anas?",c:["Datteri freschi","Datteri secchi","Qualche sorso d'acqua","Latte di cammella","Miele"],b:[0,1,2],e:"In questo ordine di preferenza: datteri freschi, altrimenti secchi, altrimenti acqua.",s:['h:dattes']},
 {q:"Quali affermazioni sul suhur e sull'iftar sono esatte?",c:["Il suhur contiene una benedizione","È raccomandato affrettare l'iftar","Il suhur si consuma prima dell'alba","L'iftar si consuma a mezzogiorno","Il suhur è proibito"],b:[0,1,2],e:"Il suhur prima dell'alba, l'iftar appena tramonta il sole.",s:['h:suhur','h:hater']}],
'r-merites':[
 {q:"Quali alimenti cita l'hadith di Ibn ʿUmar per la zakat al-fitr?",c:["Datteri","Orzo","Riso","Cuscus","Latte di cammella"],b:[0,1],e:"Un sâʿ di datteri o un sâʿ di orzo.",s:['h:fitr']},
 {q:"Secondo l'hadith di Ibn ʿAbbâs, quali sono gli scopi della zakat al-fitr?",c:["Purificare chi ha digiunato dalle parole futili","Nutrire i poveri","Sostituire la preghiera dell'Eid","Pagare i muezzin","Sostituire il digiuno"],b:[0,1],e:"Purifica chi ha digiunato e nutre i poveri.",s:['h:fitr_but']}],
'r-nuits':[
 {q:"Che cosa faceva il Profeta ﷺ durante gli ultimi dieci giorni e le ultime dieci notti del Ramadan?",c:["Vegliava la notte in preghiera","Svegliava la sua famiglia","Faceva l'iʿtikâf in moschea","Partiva per un viaggio commerciale","Smetteva di digiunare"],b:[0,1,2],e:"Raddoppiava gli sforzi nell'adorazione.",s:['h:dixnuits','h:itikaf']},
 {q:"Quali affermazioni sulle tarâwîh sono esatte?",c:["È la preghiera delle notti del Ramadan","Non è obbligatoria","Il Profeta ﷺ l'ha pregata in gruppo per alcune notti","È una sesta preghiera obbligatoria","Si prega solo prima del Fajr"],b:[0,1,2],e:"Smise di guidarla in gruppo per timore che diventasse obbligatoria.",s:['h:tarawih','h:qiyam']}],
'r-qadr':[
 {q:"Secondo la sura Al-Qadr, quali affermazioni sulla Notte del Destino sono esatte?",c:["È migliore di mille mesi","Gli angeli e lo Spirito vi discendono","È pace fino all'alba","Cade nel mese di Muharram","Cade la notte dell'Eid"],b:[0,1,2],e:"Sono i versetti 3, 4 e 5 della sura Al-Qadr.",s:['q:97:3','q:97:4','q:97:5']},
 {q:"Tra queste notti, quali sono notti dispari delle ultime dieci notti del Ramadan?",c:["La 21ª","La 25ª","La 27ª","La 22ª","La 15ª"],b:[0,1,2],e:"Le notti dispari: 21, 23, 25, 27 e 29.",s:['h:qadr']}],
'r-aid':[
 {q:"Quali sono le due feste (Eid) dell'islam?",c:["L'Eid al-Fitr","L'Eid al-Adha","Il giorno di ʿArafa","Il 1° di Muharram","Il 17 di Ramadan"],b:[0,1],e:"Il giorno di ʿArafa è un grande giorno, ma non è un Eid.",s:['f:aid']},
 {q:"Che cosa raccomanda la Sunna intorno all'Eid al-Fitr?",c:["Mangiare qualche dattero prima della preghiera","Versare la zakat al-fitr prima della preghiera","Digiunare poi sei giorni di Shawwâl","Digiunare il giorno dell'Eid","Versare la zakat al-fitr dopo la preghiera"],b:[0,1,2],e:"Il giorno dell'Eid non si digiuna: è un giorno di festa.",s:['h:aid_dattes','h:fitr','h:shawwal']}],
'p-piliers':[
 {q:"Quali fanno parte dei cinque pilastri dell'islam?",c:["La shahada","La zakat","Il hajj","L'abluzione","La visita di Medina"],b:[0,1,2],e:"L'abluzione è una condizione della preghiera, non un pilastro.",s:['h:piliers']},
 {q:"Quali fanno anche parte dei cinque pilastri dell'islam?",c:["La preghiera (salat)","Il digiuno del Ramadan","L'iʿtikâf","Le tarâwîh","La sadaqa"],b:[0,1],e:"L'iʿtikâf, le tarâwîh e la sadaqa sono raccomandati, ma non sono pilastri.",s:['h:piliers']}],
'p-shahada':[
 {q:"Che cosa contiene la shahada?",c:["L'attestazione che non c'è divinità all'infuori di Allah","L'attestazione che Muhammad ﷺ è il Messaggero di Allah","L'obbligo di fare il hajj","L'elenco dei profeti","Il numero delle preghiere"],b:[0,1],e:"La shahada ha due parti.",s:['f:shahada']},
 {q:"Secondo la sura Al-Ikhlâs, quali affermazioni su Allah sono esatte?",c:["È Unico","Non ha generato","Non è stato generato","Ha un uguale","Ha bisogno degli altri"],b:[0,1,2],e:"«E nessuno è uguale a Lui.»",s:['q:112:1','q:112:3','q:112:4']}],
'p-priere':[
 {q:"Quali preghiere obbligatorie contano 4 unità (rakʿât)?",c:["Il Dhohr","L'ʿAsr","L'ʿIshâ'","Il Fajr","Il Maghrib"],b:[0,1,2],e:"Il Fajr ne conta 2 e il Maghrib 3.",s:['f:rakat']},
 {q:"Quali affermazioni sulla preghiera sono esatte?",c:["Si prega rivolti verso la Kaaba","È prescritta in orari stabiliti","L'adhân ne annuncia l'ora","Si fa una volta alla settimana","Si prega rivolti verso Medina"],b:[0,1,2],e:"Cinque volte al giorno, rivolti verso la qibla.",s:['q:2:144','q:4:103']}],
'p-ablutions':[
 {q:"Secondo il versetto 6 della sura Al-Mâ'ida, che cosa si lava durante l'abluzione?",c:["Il viso","Le mani e gli avambracci fino ai gomiti","I piedi fino alle caviglie","La schiena","Le ginocchia"],b:[0,1,2],e:"La testa, invece, si sfrega con le mani bagnate.",s:['q:5:6']},
 {q:"Quali affermazioni sulla sura Al-Fâtiha sono esatte?",c:["Conta 7 versetti","Si recita in ogni rakʿa","È la prima sura del Corano","È la sura più lunga","Si recita solo il venerdì"],b:[0,1,2],e:"La sura più lunga è Al-Baqara.",s:['q:15:87','h:fatiha']}],
'p-zakat':[
 {q:"Secondo il Corano, chi fa parte dei beneficiari della zakat?",c:["I poveri","I bisognosi","Il viaggiatore in difficoltà","I più ricchi della città","I commercianti prosperi"],b:[0,1,2],e:"Il versetto 60 della sura At-Tawba cita otto categorie.",s:['q:9:60']},
 {q:"Quali affermazioni sulla zakat del denaro sono esatte?",c:["La sua aliquota è del 2,5%","È dovuta oltre il niṣâb","I risparmi devono essere posseduti per un anno lunare","È facoltativa","Si paga ogni venerdì"],b:[0,1,2],e:"La zakat è obbligatoria; la sadaqa è volontaria.",s:['f:zakat']}],
'p-hajj':[
 {q:"Quali riti fanno parte del hajj?",c:["La sosta ad ʿArafa","Il ṭawâf intorno alla Kaaba","Il saʿy tra Ṣafâ e Marwa","L'iʿtikâf di dieci giorni","Il digiuno di trenta giorni"],b:[0,1,2],e:"L'iʿtikâf e il digiuno di trenta giorni sono legati al Ramadan.",s:['f:hajj','q:2:158']},
 {q:"Quali affermazioni sul hajj sono esatte?",c:["Si svolge in Dhul-Hijja","È obbligatorio una volta nella vita per chi ne ha i mezzi","L'Eid al-Adha cade durante il hajj","Si svolge durante il Ramadan","Si fa a Medina"],b:[0,1,2],e:"Il hajj si fa alla Mecca e nei suoi dintorni.",s:['q:3:97','f:hajj']}],
'c-coran':[
 {q:"Quali affermazioni sulla rivelazione del Corano sono esatte?",c:["È iniziata nella grotta di Hira","È stata trasmessa dall'angelo Jibrîl","È durata circa 23 anni","È iniziata a Medina","È durata un anno"],b:[0,1,2],e:"È iniziata vicino alla Mecca, quando il Profeta ﷺ aveva 40 anni.",s:['h:hira','h:vie']},
 {q:"Quali numeri sul Corano sono esatti?",c:["114 sure","30 parti (juz')","6236 versetti secondo il conteggio più diffuso","99 sure","12 parti"],b:[0,1,2],e:"99 è il numero tradizionale dei più bei nomi di Allah, non delle sure.",s:['f:coran']}],
'c-sourates':[
 {q:"Quali affermazioni sulle sure sono esatte?",c:["Al-Baqara è la più lunga","Al-Kawthar è la più corta","An-Nâs è l'ultima","Al-Fâtiha è la più lunga","At-Tawba inizia con la basmala"],b:[0,1,2],e:"At-Tawba è proprio l'unica sura senza basmala all'inizio.",s:['f:coran','f:tawba']},
 {q:"Tra queste sure, quali portano il nome di un profeta o di una persona?",c:["Yûsuf","Maryam","Ibrâhîm","Al-Baqara","Al-Kawthar"],b:[0,1,2],e:"Al-Baqara significa «la Vacca», Al-Kawthar «l'Abbondanza».",s:['q:12:3','q:19:16','q:14:39']}],
'c-ikhlas':[
 {q:"Secondo Âyat al-Kursî, quali affermazioni su Allah sono esatte?",c:["Né sonnolenza né sonno Lo colgono","È il Vivente","Il Suo Trono si estende oltre i cieli e la terra","Ha bisogno di riposo","Le creature abbracciano tutta la Sua scienza"],b:[0,1,2],e:"Della Sua scienza non abbracciano se non ciò che Egli vuole.",s:['q:2:255']},
 {q:"Quali affermazioni sulla sura Al-Ikhlâs sono esatte?",c:["Conta 4 versetti","Equivale a un terzo del Corano","Afferma l'unicità di Allah","È la sura più lunga","Racconta la battaglia di Badr"],b:[0,1,2],e:"È una delle sure più corte e più recitate.",s:['h:ikhlas','q:112:1']}],
'pr-adam':[
 {q:"Quali affermazioni su Adamo sono esatte?",c:["È il primo uomo","Allah gli insegnò il nome di ogni cosa","Gli angeli si prosternarono davanti a lui, tranne Iblîs","Costruì l'arca","Nacque in Egitto"],b:[0,1,2],e:"È Nûh che costruì l'arca.",s:['q:2:31','q:2:34']},
 {q:"Quali affermazioni su Nûh sono esatte?",c:["Restò 950 anni tra il suo popolo","Costruì l'arca","Suo figlio rifiutò di salire sull'arca","Fu inghiottito da un pesce","Costruì la Kaaba"],b:[0,1,2],e:"È Yûnus che fu inghiottito dal pesce.",s:['q:29:14','q:11:37','q:11:43']}],
'pr-ibrahim':[
 {q:"Quali affermazioni su Ibrahim sono esatte?",c:["Allah rese il fuoco fresco per lui","Il Corano lo chiama l'amico di Allah","Innalzò le fondamenta della Kaaba con Ismaʿîl","Ricevette la Torah","Era re d'Egitto"],b:[0,1,2],e:"La Torah fu rivelata a Mûsâ.",s:['q:21:69','q:4:125','q:2:127']},
 {q:"Chi sono i figli di Ibrahim citati nel Corano?",c:["Ismaʿîl","Isḥâq","Yaʿqûb","Mûsâ","Yûnus"],b:[0,1],e:"Yaʿqûb è il nipote di Ibrahim, figlio di Isḥâq.",s:['q:14:39']}],
'pr-yunus':[
 {q:"Quali affermazioni su questi profeti sono esatte?",c:["Yûnus fu inghiottito da un grosso pesce","Yûsuf fu gettato in un pozzo dai suoi fratelli","Sulaymân comprendeva il linguaggio delle formiche","Yûsuf costruì l'arca","Sulaymân fu inghiottito da un pesce"],b:[0,1,2],e:"Ogni profeta ha la sua storia nel Corano.",s:['q:37:142','q:12:15','q:27:18']},
 {q:"Nel suo sogno da bambino, che cosa Yûsuf ha visto prosternarsi davanti a lui?",c:["Undici stelle","Il sole","La luna","Delle montagne","Degli angeli"],b:[0,1,2],e:"Undici stelle, il sole e la luna.",s:['q:12:4']}],
'pr-musa':[
 {q:"Quali miracoli o eventi sono legati al profeta Mûsâ?",c:["Il suo bastone diventò un serpente","Il mare si divise","Allah gli parlò direttamente","Parlò nella culla","Fu salvato dal fuoco"],b:[0,1,2],e:"ʿÎsâ parlò nella culla; Ibrahim fu salvato dal fuoco.",s:['q:20:20','q:26:63','q:4:164']},
 {q:"Quali affermazioni sull'infanzia di Mûsâ sono esatte?",c:["Sua madre lo affidò al fiume","La famiglia del Faraone lo raccolse","Nacque in Egitto","Nacque alla Mecca","Fu cresciuto da Ibrahim"],b:[0,1,2],e:"Allah lo fece crescere proprio nella casa del Faraone.",s:['q:28:7','q:28:8']}],
'pr-isa':[
 {q:"Secondo il Corano, quali affermazioni su ʿÎsâ sono esatte?",c:["È nato senza padre","Parlò nella culla","Ricevette l'Injîl (Vangelo)","È l'ultimo profeta","Costruì la Kaaba"],b:[0,1,2],e:"L'ultimo profeta è Muhammad ﷺ.",s:['q:3:59','q:19:30','q:5:46']},
 {q:"Quali affermazioni su Maryam sono esatte?",c:["Allah l'ha scelta al di sopra delle donne dei mondi","Una sura porta il suo nome","È l'unica donna nominata nel Corano","Era la moglie del Faraone","Era la regina di Saba"],b:[0,1,2],e:"La moglie del Faraone e la regina di Saba sono citate senza essere nominate.",s:['q:3:42','f:maryam']}],
'pr-muhammad':[
 {q:"Quali affermazioni sull'infanzia del Profeta ﷺ sono esatte?",c:["È nato alla Mecca","Perse la madre a 6 anni","Fu cresciuto dallo zio Abû Ṭâlib","È nato a Medina","Suo padre lo crebbe fino a 20 anni"],b:[0,1,2],e:"Suo padre morì prima della sua nascita.",s:['f:sira']},
 {q:"Quali età sono esatte nella vita del Profeta ﷺ?",c:["40 anni alla prima rivelazione","63 anni alla sua morte","25 anni al matrimonio con Khadîja","13 anni alla prima rivelazione","90 anni alla sua morte"],b:[0,1,2],e:"In seguito restò 13 anni alla Mecca e 10 anni a Medina.",s:['h:vie','f:debuts']}],
'pr-livres':[
 {q:"Quali associazioni tra un libro e un profeta sono esatte?",c:["La Tawrât e Mûsâ","Lo Zabûr e Dâwûd","L'Injîl e ʿÎsâ","Il Corano e Ibrahim","L'Injîl e Nûh"],b:[0,1,2],e:"Il Corano è stato rivelato a Muhammad ﷺ.",s:['q:5:44','q:4:163','q:5:46']},
 {q:"Quali fanno parte dei sei pilastri della fede (îmân)?",c:["Credere negli angeli","Credere nei libri rivelati","Credere nell'Ultimo Giorno","Fare il hajj","Versare la zakat"],b:[0,1,2],e:"Il hajj e la zakat sono pilastri dell'islam, non della fede.",s:['h:jibril']}],
'h-khadija':[
 {q:"Chi figura tra i primissimi musulmani?",c:["Khadîja","Abû Bakr","ʿAlî ibn Abî Ṭâlib","Abû Lahab","Abû Jahl"],b:[0,1,2],e:"Abû Lahab e Abû Jahl furono tra i più grandi nemici dell'islam.",s:['f:debuts']},
 {q:"Quali affermazioni su Khadîja sono esatte?",c:["Era una commerciante","Fu la prima a credere nel messaggio","Portò il Profeta ﷺ da Waraqa ibn Nawfal","Era la figlia di Abû Bakr","Fu il primo califfo"],b:[0,1,2],e:"La figlia di Abû Bakr è ʿÂ'isha.",s:['h:hira','f:debuts']}],
'h-hegire':[
 {q:"Quali affermazioni sull'Egira sono esatte?",c:["Avvenne nel 622","Il Profeta ﷺ si nascose nella grotta di Thawr","Abû Bakr lo accompagnava","Si diresse verso Gerusalemme","Segna la nascita del Profeta ﷺ"],b:[0,1,2],e:"L'Egira portò dalla Mecca a Medina.",s:['f:hegire','q:9:40']},
 {q:"Quali definizioni sono esatte?",c:["Anṣâr: gli abitanti di Medina che accolsero i musulmani","Muhâjirûn: gli emigrati venuti dalla Mecca","Yathrib: l'antico nome di Medina","Anṣâr: i nemici della Mecca","Yathrib: l'antico nome della Mecca"],b:[0,1,2],e:"Anṣâr significa «Ausiliari», Muhâjirûn «Emigrati».",s:['q:9:100','q:33:13']}],
'h-badr':[
 {q:"Quali affermazioni sulla battaglia di Badr sono esatte?",c:["Avvenne in Ramadan","I musulmani erano circa 313","Allah li sostenne con degli angeli","I musulmani erano 10 000","Avvenne nell'anno 8"],b:[0,1,2],e:"10 000 e l'anno 8 corrispondono alla conquista della Mecca.",s:['f:badr','q:8:9']},
 {q:"Come descrive il Corano Badr?",c:["Il giorno del Discernimento","Una vittoria quando i musulmani erano umiliati","Un rinforzo di mille angeli","Il giorno dell'Egira","La festa del sacrificio"],b:[0,1,2],e:"Tre versetti diversi parlano di Badr.",s:['q:8:41','q:3:123','q:8:9']}],
'h-fath':[
 {q:"Quali affermazioni sulla conquista della Mecca sono esatte?",c:["Avvenne nel Ramadan dell'anno 8","Vi parteciparono circa 10 000 musulmani","Il Profeta ﷺ perdonò i Meccani","Causò migliaia di morti","Avvenne nell'anno 2"],b:[0,1,2],e:"Avvenne quasi senza combattere.",s:['f:fath']},
 {q:"Che cosa annuncia o chiede la sura An-Naṣr?",c:["Il soccorso di Allah e la vittoria","L'ingresso delle persone in massa nell'islam","Glorificare Allah e implorare il Suo perdono","Digiunare sei giorni","Costruire la Kaaba"],b:[0,1,2],e:"Sono i suoi tre versetti.",s:['q:110:1','q:110:2','q:110:3']}],
'h-califes':[
 {q:"Quali soprannomi di califfi sono esatti?",c:["Abû Bakr: aṣ-Ṣiddîq","ʿUmar: al-Fârûq","ʿUthmân: Dhû n-Nûrayn","ʿAlî: al-Fârûq","Abû Bakr: Dhû n-Nûrayn"],b:[0,1,2],e:"Il veridico, colui che distingue il vero dal falso, l'uomo dalle due luci.",s:['f:califes']},
 {q:"Quali affermazioni sul Corano al tempo dei califfi sono esatte?",c:["Abû Bakr fece raccogliere il Corano in un'unica raccolta","Zayd ibn Thâbit fu incaricato di questo lavoro","ʿUthmân fece inviare delle copie nelle province","Il Corano fu raccolto per la prima volta sotto gli Abbasidi","ʿAlî proibì di copiare il Corano"],b:[0,1,2],e:"Il Corano era già scritto, durante la vita del Profeta ﷺ, dai suoi scribi.",s:['h:compilation','h:copies']}]
};
