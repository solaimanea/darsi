/* Nour — questions EXPERT à réponses multiples (français). b = liste des bonnes réponses.
   Il faut cocher toutes les bonnes réponses, et seulement elles. 2 par leçon, en bonus du quiz de 10. */
'use strict';
CONTENU.fr.experts={
'r-bienvenue':[
 {q:"Parmi ces mois, lesquels appartiennent au calendrier musulman (hégirien) ?",c:["Shawwâl","Rajab","Muharram","Tishrîn al-awwal","Kânûn ath-thânî"],b:[0,1,2],e:"Tishrîn al-awwal et Kânûn ath-thânî sont les noms syriaques de mois du calendrier grégorien, utilisés au Proche-Orient : ce ne sont pas des mois hégiriens.",s:['f:mois']},
 {q:"Quelles affirmations sur le mois de Ramadan sont exactes ?",c:["C'est le 9ᵉ mois hégirien","La révélation du Coran y a commencé","Son début dépend du croissant de lune","Il commence toujours le 1ᵉʳ Shaʿbân","Il dure toujours exactement 30 jours"],b:[0,1,2],e:"Un mois lunaire dure 29 ou 30 jours et sa date change chaque année.",s:['q:2:185','h:croissant']}],
'r-jeuner':[
 {q:"Qui peut ne pas jeûner pendant le Ramadan, à condition de rattraper les jours plus tard ?",c:["Le malade","Le voyageur","La femme qui a ses règles","Celui qui étudie le Coran toute la journée","Celui qui a simplement soif en été"],b:[0,1,2],e:"Ce sont les dispenses temporaires prévues par le Coran et la Sunna.",s:['q:2:184','h:regles']},
 {q:"Selon les savants, quelles conditions rendent le jeûne du Ramadan obligatoire ?",c:["Être musulman","Être pubère","Être sain d'esprit","Avoir fait le hajj","Savoir lire l'arabe"],b:[0,1,2],e:"Il faut aussi être capable de jeûner.",s:['f:conditions']}],
'r-rompt':[
 {q:"Parmi ces actes faits volontairement en journée de Ramadan, lesquels rompent le jeûne ?",c:["Manger","Boire","Avoir des rapports intimes","Faire ses ablutions","Sentir un parfum de musc"],b:[0,1,2],e:"Faire ses ablutions ou sentir un parfum ne rompt pas le jeûne.",s:['q:2:187']},
 {q:"Quelles affirmations sur le jeûne du Ramadan sont exactes ?",c:["Il commence à l'aube","Il se termine au coucher du soleil","Manger par oubli ne l'annule pas","Il commence à midi","On peut boire après la prière de l'ʿAsr"],b:[0,1,2],e:"De l'aube au coucher du soleil ; l'oubli n'annule pas le jeûne.",s:['q:2:187','h:oubli']}],
'r-suhur':[
 {q:"Avec quoi le Prophète ﷺ rompait-il son jeûne, selon le hadith d'Anas ?",c:["Des dattes fraîches","Des dattes sèches","Quelques gorgées d'eau","Du lait de chamelle","Du miel"],b:[0,1,2],e:"Dans cet ordre de préférence : dattes fraîches, sinon sèches, sinon de l'eau.",s:['h:dattes']},
 {q:"Quelles affirmations sur le suhur et l'iftar sont exactes ?",c:["Le suhur contient une bénédiction","Il est recommandé de hâter l'iftar","Le suhur se prend avant l'aube","L'iftar se prend à midi","Le suhur est interdit"],b:[0,1,2],e:"Le suhur avant l'aube, l'iftar dès le coucher du soleil.",s:['h:suhur','h:hater']}],
'r-merites':[
 {q:"Quels aliments le hadith d'Ibn ʿUmar cite-t-il pour la zakat al-fitr ?",c:["Des dattes","De l'orge","Du riz","Du couscous","Du lait de chamelle"],b:[0,1],e:"Un sâʿ de dattes ou un sâʿ d'orge.",s:['h:fitr']},
 {q:"Selon le hadith d'Ibn ʿAbbâs, quels sont les buts de la zakat al-fitr ?",c:["Purifier le jeûneur des paroles futiles","Nourrir les pauvres","Remplacer la prière de l'Aïd","Payer les muezzins","Remplacer le jeûne"],b:[0,1],e:"Elle purifie le jeûneur et nourrit les pauvres.",s:['h:fitr_but']}],
'r-nuits':[
 {q:"Que faisait le Prophète ﷺ pendant les dix derniers jours et les dix dernières nuits du Ramadan ?",c:["Il veillait la nuit en prière","Il réveillait sa famille","Il faisait l'iʿtikâf à la mosquée","Il partait en voyage commercial","Il arrêtait de jeûner"],b:[0,1,2],e:"Il redoublait d'efforts dans l'adoration.",s:['h:dixnuits','h:itikaf']},
 {q:"Quelles affirmations sur les tarâwîh sont exactes ?",c:["C'est la prière des nuits du Ramadan","Elle n'est pas obligatoire","Le Prophète ﷺ l'a priée en groupe quelques nuits","C'est une sixième prière obligatoire","Elle se prie avant le Fajr seulement"],b:[0,1,2],e:"Il cessa de la diriger en groupe de peur qu'elle ne devienne obligatoire.",s:['h:tarawih','h:qiyam']}],
'r-qadr':[
 {q:"Selon la sourate Al-Qadr, quelles affirmations sur la Nuit du Destin sont exactes ?",c:["Elle est meilleure que mille mois","Les anges et l'Esprit y descendent","Elle est paix jusqu'à l'aube","Elle a lieu au mois de Muharram","Elle a lieu la nuit de l'Aïd"],b:[0,1,2],e:"Ce sont les versets 3, 4 et 5 de la sourate Al-Qadr.",s:['q:97:3','q:97:4','q:97:5']},
 {q:"Parmi ces nuits, lesquelles sont des nuits impaires des dix dernières nuits du Ramadan ?",c:["La 21ᵉ","La 25ᵉ","La 27ᵉ","La 22ᵉ","La 15ᵉ"],b:[0,1,2],e:"Les nuits impaires : 21, 23, 25, 27 et 29.",s:['h:qadr']}],
'r-aid':[
 {q:"Quelles sont les deux fêtes (Aïd) de l'islam ?",c:["L'Aïd al-Fitr","L'Aïd al-Adhâ","Le jour de ʿArafa","Le 1ᵉʳ Muharram","Le 17 Ramadan"],b:[0,1],e:"Le jour de ʿArafa est un grand jour, mais ce n'est pas un Aïd.",s:['f:aid']},
 {q:"Que recommande la Sunna autour de l'Aïd al-Fitr ?",c:["Manger quelques dattes avant la prière","Verser la zakat al-fitr avant la prière","Jeûner ensuite six jours de Shawwâl","Jeûner le jour de l'Aïd","Verser la zakat al-fitr après la prière"],b:[0,1,2],e:"Le jour de l'Aïd, on ne jeûne pas : c'est un jour de fête.",s:['h:aid_dattes','h:fitr','h:shawwal']}],
'p-piliers':[
 {q:"Lesquels font partie des cinq piliers de l'islam ?",c:["La shahada","La zakat","Le hajj","Les ablutions","La visite de Médine"],b:[0,1,2],e:"Les ablutions sont une condition de la prière, pas un pilier.",s:['h:piliers']},
 {q:"Lesquels font aussi partie des cinq piliers de l'islam ?",c:["La prière (salât)","Le jeûne du Ramadan","L'iʿtikâf","Les tarâwîh","La sadaqa"],b:[0,1],e:"L'iʿtikâf, les tarâwîh et la sadaqa sont recommandés, mais pas des piliers.",s:['h:piliers']}],
'p-shahada':[
 {q:"Que contient la shahada ?",c:["L'attestation qu'il n'y a de divinité qu'Allah","L'attestation que Muhammad ﷺ est le Messager d'Allah","L'obligation de faire le hajj","La liste des prophètes","Le nombre de prières"],b:[0,1],e:"La shahada a deux parties.",s:['f:shahada']},
 {q:"Selon la sourate Al-Ikhlâs, quelles affirmations sur Allah sont exactes ?",c:["Il est Unique","Il n'a pas engendré","Il n'a pas été engendré","Il a un égal","Il a besoin des autres"],b:[0,1,2],e:"« Et nul n'est égal à Lui. »",s:['q:112:1','q:112:3','q:112:4']}],
'p-priere':[
 {q:"Quelles prières obligatoires comptent 4 unités (rakʿât) ?",c:["Le Dhohr","L'ʿAsr","L'ʿIshâ'","Le Fajr","Le Maghrib"],b:[0,1,2],e:"Le Fajr en compte 2 et le Maghrib 3.",s:['f:rakat']},
 {q:"Quelles affirmations sur la prière sont exactes ?",c:["On prie tourné vers la Kaaba","Elle est prescrite à des heures déterminées","L'adhân annonce son heure","Elle se fait une fois par semaine","On prie tourné vers Médine"],b:[0,1,2],e:"Cinq fois par jour, tourné vers la qibla.",s:['q:2:144','q:4:103']}],
'p-ablutions':[
 {q:"Selon le verset 6 de la sourate Al-Mâ'ida, que lave-t-on pendant les ablutions ?",c:["Le visage","Les mains et avant-bras jusqu'aux coudes","Les pieds jusqu'aux chevilles","Le dos","Les genoux"],b:[0,1,2],e:"La tête, elle, est essuyée avec les mains mouillées.",s:['q:5:6']},
 {q:"Quelles affirmations sur la sourate Al-Fâtiha sont exactes ?",c:["Elle compte 7 versets","Elle est récitée dans chaque rakʿa","C'est la première sourate du Coran","C'est la plus longue sourate","On la récite seulement le vendredi"],b:[0,1,2],e:"La plus longue sourate est Al-Baqara.",s:['q:15:87','h:fatiha']}],
'p-zakat':[
 {q:"Selon le Coran, qui fait partie des bénéficiaires de la zakat ?",c:["Les pauvres","Les nécessiteux","Le voyageur en difficulté","Les plus riches de la ville","Les commerçants prospères"],b:[0,1,2],e:"Le verset 60 de la sourate At-Tawba cite huit catégories.",s:['q:9:60']},
 {q:"Quelles affirmations sur la zakat de l'argent sont exactes ?",c:["Son taux est de 2,5 %","Elle est due au-delà du niṣâb","L'épargne doit être possédée une année lunaire","Elle est facultative","Elle se paie chaque vendredi"],b:[0,1,2],e:"La zakat est obligatoire ; la sadaqa est volontaire.",s:['f:zakat']}],
'p-hajj':[
 {q:"Quels rites font partie du hajj ?",c:["La station à ʿArafa","Le ṭawâf autour de la Kaaba","Le saʿy entre Ṣafâ et Marwa","L'iʿtikâf de dix jours","Le jeûne de trente jours"],b:[0,1,2],e:"L'iʿtikâf et le jeûne de trente jours sont liés au Ramadan.",s:['f:hajj','q:2:158']},
 {q:"Quelles affirmations sur le hajj sont exactes ?",c:["Il a lieu en Dhû l-Hijja","Il est obligatoire une fois dans la vie pour qui en a les moyens","L'Aïd al-Adhâ a lieu pendant le hajj","Il a lieu pendant le Ramadan","Il se fait à Médine"],b:[0,1,2],e:"Le hajj se fait à La Mecque et dans ses environs.",s:['q:3:97','f:hajj']}],
'c-coran':[
 {q:"Quelles affirmations sur la révélation du Coran sont exactes ?",c:["Elle a commencé dans la grotte de Hira","Elle a été transmise par l'ange Jibrîl","Elle a duré environ 23 ans","Elle a commencé à Médine","Elle a duré un an"],b:[0,1,2],e:"Elle a commencé près de La Mecque, quand le Prophète ﷺ avait 40 ans.",s:['h:hira','h:vie']},
 {q:"Quels chiffres sur le Coran sont exacts ?",c:["114 sourates","30 parties (juz')","6 236 versets selon le décompte le plus répandu","99 sourates","12 parties"],b:[0,1,2],e:"99 est le nombre traditionnel des plus beaux noms d'Allah, pas des sourates.",s:['f:coran']}],
'c-sourates':[
 {q:"Quelles affirmations sur les sourates sont exactes ?",c:["Al-Baqara est la plus longue","Al-Kawthar est la plus courte","An-Nâs est la dernière","Al-Fâtiha est la plus longue","At-Tawba commence par la basmala"],b:[0,1,2],e:"At-Tawba est justement la seule sourate sans basmala au début.",s:['f:coran','f:tawba']},
 {q:"Parmi ces sourates, lesquelles portent le nom d'un prophète ou d'une personne ?",c:["Yûsuf","Maryam","Ibrâhîm","Al-Baqara","Al-Kawthar"],b:[0,1,2],e:"Al-Baqara signifie « la Vache », Al-Kawthar « l'Abondance ».",s:['q:12:3','q:19:16','q:14:39']}],
'c-ikhlas':[
 {q:"Selon Âyat al-Kursî, quelles affirmations sur Allah sont exactes ?",c:["Ni somnolence ni sommeil ne Le saisissent","Il est le Vivant","Son Trône déborde les cieux et la terre","Il a besoin de repos","Les créatures embrassent toute Sa science"],b:[0,1,2],e:"Elles n'embrassent de Sa science que ce qu'Il veut.",s:['q:2:255']},
 {q:"Quelles affirmations sur la sourate Al-Ikhlâs sont exactes ?",c:["Elle compte 4 versets","Elle équivaut à un tiers du Coran","Elle affirme l'unicité d'Allah","C'est la plus longue sourate","Elle raconte la bataille de Badr"],b:[0,1,2],e:"C'est l'une des sourates les plus courtes et les plus récitées.",s:['h:ikhlas','q:112:1']}],
'pr-adam':[
 {q:"Quelles affirmations sur Adam sont exactes ?",c:["Il est le premier homme","Allah lui apprit le nom de toute chose","Les anges se prosternèrent devant lui, sauf Iblîs","Il construisit l'arche","Il naquit en Égypte"],b:[0,1,2],e:"C'est Nûh qui construisit l'arche.",s:['q:2:31','q:2:34']},
 {q:"Quelles affirmations sur Nûh sont exactes ?",c:["Il resta 950 ans parmi son peuple","Il construisit l'arche","Son fils refusa de monter dans l'arche","Il fut avalé par un poisson","Il bâtit la Kaaba"],b:[0,1,2],e:"C'est Yûnus qui fut avalé par le poisson.",s:['q:29:14','q:11:37','q:11:43']}],
'pr-ibrahim':[
 {q:"Quelles affirmations sur Ibrahim sont exactes ?",c:["Allah rendit le feu frais pour lui","Le Coran l'appelle l'ami d'Allah","Il éleva les fondations de la Kaaba avec Ismaʿîl","Il reçut la Torah","Il était roi d'Égypte"],b:[0,1,2],e:"La Torah fut révélée à Mûsâ.",s:['q:21:69','q:4:125','q:2:127']},
 {q:"Qui sont les fils d'Ibrahim cités dans le Coran ?",c:["Ismaʿîl","Isḥâq","Yaʿqûb","Mûsâ","Yûnus"],b:[0,1],e:"Yaʿqûb est le petit-fils d'Ibrahim, fils d'Isḥâq.",s:['q:14:39']}],
'pr-yunus':[
 {q:"Quelles affirmations sur ces prophètes sont exactes ?",c:["Yûnus fut avalé par un gros poisson","Yûsuf fut jeté dans un puits par ses frères","Sulaymân comprenait le langage des fourmis","Yûsuf construisit l'arche","Sulaymân fut avalé par un poisson"],b:[0,1,2],e:"Chaque prophète a son histoire propre dans le Coran.",s:['q:37:142','q:12:15','q:27:18']},
 {q:"Dans son rêve d'enfant, qu'est-ce que Yûsuf a vu se prosterner devant lui ?",c:["Onze étoiles","Le soleil","La lune","Des montagnes","Des anges"],b:[0,1,2],e:"Onze étoiles, le soleil et la lune.",s:['q:12:4']}],
'pr-musa':[
 {q:"Quels miracles ou événements sont liés au prophète Mûsâ ?",c:["Son bâton devint un serpent","La mer se fendit","Allah lui parla directement","Il parla dans son berceau","Il fut sauvé du feu"],b:[0,1,2],e:"ʿÎsâ parla dans son berceau ; Ibrahim fut sauvé du feu.",s:['q:20:20','q:26:63','q:4:164']},
 {q:"Quelles affirmations sur l'enfance de Mûsâ sont exactes ?",c:["Sa mère le déposa sur le fleuve","La famille de Pharaon le recueillit","Il naquit en Égypte","Il naquit à La Mecque","Il fut élevé par Ibrahim"],b:[0,1,2],e:"Allah le fit grandir dans la maison même de Pharaon.",s:['q:28:7','q:28:8']}],
'pr-isa':[
 {q:"Selon le Coran, quelles affirmations sur ʿÎsâ sont exactes ?",c:["Il est né sans père","Il parla dans son berceau","Il reçut l'Injîl (Évangile)","Il est le dernier prophète","Il construisit la Kaaba"],b:[0,1,2],e:"Le dernier prophète est Muhammad ﷺ.",s:['q:3:59','q:19:30','q:5:46']},
 {q:"Quelles affirmations sur Maryam sont exactes ?",c:["Allah l'a choisie au-dessus des femmes des mondes","Une sourate porte son nom","C'est la seule femme nommée dans le Coran","Elle était l'épouse de Pharaon","Elle était reine de Saba"],b:[0,1,2],e:"L'épouse de Pharaon et la reine de Saba sont citées sans être nommées.",s:['q:3:42','f:maryam']}],
'pr-muhammad':[
 {q:"Quelles affirmations sur l'enfance du Prophète ﷺ sont exactes ?",c:["Il est né à La Mecque","Il perdit sa mère à 6 ans","Il fut élevé par son oncle Abû Ṭâlib","Il est né à Médine","Son père l'éleva jusqu'à 20 ans"],b:[0,1,2],e:"Son père mourut avant sa naissance.",s:['f:sira']},
 {q:"Quels âges sont exacts dans la vie du Prophète ﷺ ?",c:["40 ans à la première révélation","63 ans à sa mort","25 ans à son mariage avec Khadîja","13 ans à la première révélation","90 ans à sa mort"],b:[0,1,2],e:"Il resta ensuite 13 ans à La Mecque et 10 ans à Médine.",s:['h:vie','f:debuts']}],
'pr-livres':[
 {q:"Quelles associations entre un livre et un prophète sont exactes ?",c:["La Tawrât et Mûsâ","Le Zabûr et Dâwûd","L'Injîl et ʿÎsâ","Le Coran et Ibrahim","L'Injîl et Nûh"],b:[0,1,2],e:"Le Coran a été révélé à Muhammad ﷺ.",s:['q:5:44','q:4:163','q:5:46']},
 {q:"Lesquels font partie des six piliers de la foi (îmân) ?",c:["Croire aux anges","Croire aux livres révélés","Croire au Jour dernier","Faire le hajj","Verser la zakat"],b:[0,1,2],e:"Le hajj et la zakat sont des piliers de l'islam, pas de la foi.",s:['h:jibril']}],
'h-khadija':[
 {q:"Qui figure parmi les tout premiers musulmans ?",c:["Khadîja","Abû Bakr","ʿAlî ibn Abî Ṭâlib","Abû Lahab","Abû Jahl"],b:[0,1,2],e:"Abû Lahab et Abû Jahl furent parmi les plus grands ennemis de l'islam.",s:['f:debuts']},
 {q:"Quelles affirmations sur Khadîja sont exactes ?",c:["Elle était commerçante","Elle fut la première à croire au message","Elle emmena le Prophète ﷺ chez Waraqa ibn Nawfal","Elle était la fille d'Abû Bakr","Elle fut le premier calife"],b:[0,1,2],e:"La fille d'Abû Bakr est ʿÂ'icha.",s:['h:hira','f:debuts']}],
'h-hegire':[
 {q:"Quelles affirmations sur l'Hégire sont exactes ?",c:["Elle eut lieu en 622","Le Prophète ﷺ se cacha dans la grotte de Thawr","Abû Bakr l'accompagnait","Elle se fit vers Jérusalem","Elle marque la naissance du Prophète ﷺ"],b:[0,1,2],e:"L'Hégire mena de La Mecque à Médine.",s:['f:hegire','q:9:40']},
 {q:"Quelles définitions sont exactes ?",c:["Anṣâr : les habitants de Médine qui accueillirent les musulmans","Muhâjirûn : les émigrés venus de La Mecque","Yathrib : l'ancien nom de Médine","Anṣâr : les ennemis de La Mecque","Yathrib : l'ancien nom de La Mecque"],b:[0,1,2],e:"Anṣâr signifie « Auxiliaires », Muhâjirûn « Émigrés ».",s:['q:9:100','q:33:13']}],
'h-badr':[
 {q:"Quelles affirmations sur la bataille de Badr sont exactes ?",c:["Elle eut lieu en Ramadan","Les musulmans étaient environ 313","Allah les soutint par des anges","Les musulmans étaient 10 000","Elle eut lieu en l'an 8"],b:[0,1,2],e:"10 000 et l'an 8 correspondent à la conquête de La Mecque.",s:['f:badr','q:8:9']},
 {q:"Comment le Coran décrit-il Badr ?",c:["Le jour du Discernement","Une victoire alors que les musulmans étaient humiliés","Un renfort d'un millier d'anges","Le jour de l'Hégire","La fête du sacrifice"],b:[0,1,2],e:"Trois versets différents parlent de Badr.",s:['q:8:41','q:3:123','q:8:9']}],
'h-fath':[
 {q:"Quelles affirmations sur la conquête de La Mecque sont exactes ?",c:["Elle eut lieu en Ramadan de l'an 8","Environ 10 000 musulmans y participèrent","Le Prophète ﷺ pardonna aux Mecquois","Elle fit des milliers de morts","Elle eut lieu en l'an 2"],b:[0,1,2],e:"Elle se fit presque sans combat.",s:['f:fath']},
 {q:"Qu'annonce ou que demande la sourate An-Naṣr ?",c:["Le secours d'Allah et la victoire","L'entrée des gens en foule dans l'islam","Glorifier Allah et implorer Son pardon","Jeûner six jours","Construire la Kaaba"],b:[0,1,2],e:"Ce sont ses trois versets.",s:['q:110:1','q:110:2','q:110:3']}],
'h-califes':[
 {q:"Quels surnoms de califes sont exacts ?",c:["Abû Bakr : aṣ-Ṣiddîq","ʿUmar : al-Fârûq","ʿUthmân : Dhû n-Nûrayn","ʿAlî : al-Fârûq","Abû Bakr : Dhû n-Nûrayn"],b:[0,1,2],e:"Le véridique, celui qui distingue le vrai du faux, l'homme aux deux lumières.",s:['f:califes']},
 {q:"Quelles affirmations sur le Coran au temps des califes sont exactes ?",c:["Abû Bakr fit rassembler le Coran en un recueil","Zayd ibn Thâbit fut chargé de ce travail","ʿUthmân fit envoyer des copies dans les provinces","Le Coran fut rassemblé pour la première fois sous les Abbassides","ʿAlî interdit de copier le Coran"],b:[0,1,2],e:"Le Coran était déjà écrit du vivant du Prophète ﷺ par ses scribes.",s:['h:compilation','h:copies']}]
};
