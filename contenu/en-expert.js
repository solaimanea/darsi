/* Darsi — EXPERT multiple-answer questions (English). b = list of correct answers.
   You must tick all the correct answers, and only those. 2 per lesson, as a bonus to the 10-question quiz. */
'use strict';
CONTENU.en.experts={
'r-bienvenue':[
 {q:"Which of these months belong to the Muslim (Hijri) calendar?",c:["Shawwal","Rajab","Muharram","Tishrin al-Awwal","Kanun ath-Thani"],b:[0,1,2],e:"Tishrin al-Awwal and Kanun ath-Thani are the Syriac names of Gregorian calendar months, used in the Middle East: they are not Hijri months.",s:['f:mois']},
 {q:"Which statements about the month of Ramadan are correct?",c:["It is the 9th Hijri month","The revelation of the Qur'an began in it","Its start depends on the crescent moon","It always begins on the 1st of Sha'ban","It always lasts exactly 30 days"],b:[0,1,2],e:"A lunar month lasts 29 or 30 days and its date changes every year.",s:['q:2:185','h:croissant']}],
'r-jeuner':[
 {q:"Who may skip fasting during Ramadan, on condition of making up the days later?",c:["Someone who is ill","A traveller","A woman on her period","Someone who studies the Qur'an all day","Someone who is simply thirsty in summer"],b:[0,1,2],e:"These are the temporary exemptions set out in the Qur'an and the Sunnah.",s:['q:2:184','h:regles']},
 {q:"According to the scholars, which conditions make fasting in Ramadan obligatory?",c:["Being Muslim","Having reached puberty","Being of sound mind","Having performed Hajj","Being able to read Arabic"],b:[0,1,2],e:"One must also be able to fast.",s:['f:conditions']}],
'r-rompt':[
 {q:"Which of these acts, done deliberately during a Ramadan day, break the fast?",c:["Eating","Drinking","Having intimate relations","Performing ablution","Smelling musk perfume"],b:[0,1,2],e:"Performing ablution or smelling a perfume does not break the fast.",s:['q:2:187']},
 {q:"Which statements about the Ramadan fast are correct?",c:["It begins at dawn","It ends at sunset","Eating out of forgetfulness does not cancel it","It begins at noon","You may drink after the Asr prayer"],b:[0,1,2],e:"From dawn to sunset; forgetfulness does not cancel the fast.",s:['q:2:187','h:oubli']}],
'r-suhur':[
 {q:"According to the hadith of Anas, what did the Prophet ﷺ break his fast with?",c:["Fresh dates","Dried dates","A few sips of water","Camel's milk","Honey"],b:[0,1,2],e:"In this order of preference: fresh dates, or else dried ones, or else water.",s:['h:dattes']},
 {q:"Which statements about suhur and iftar are correct?",c:["Suhur contains a blessing","It is recommended to hasten iftar","Suhur is eaten before dawn","Iftar is eaten at noon","Suhur is forbidden"],b:[0,1,2],e:"Suhur before dawn, iftar as soon as the sun sets.",s:['h:suhur','h:hater']}],
'r-merites':[
 {q:"Which foods does the hadith of Ibn Umar mention for zakat al-fitr?",c:["Dates","Barley","Rice","Couscous","Camel's milk"],b:[0,1],e:"One sa' of dates or one sa' of barley.",s:['h:fitr']},
 {q:"According to the hadith of Ibn Abbas, what are the purposes of zakat al-fitr?",c:["To purify the fasting person from idle talk","To feed the poor","To replace the Eid prayer","To pay the muezzins","To replace fasting"],b:[0,1],e:"It purifies the fasting person and feeds the poor.",s:['h:fitr_but']}],
'r-nuits':[
 {q:"What did the Prophet ﷺ do during the last ten days and nights of Ramadan?",c:["He stayed up at night in prayer","He woke his family","He performed i'tikaf in the mosque","He went on a trading journey","He stopped fasting"],b:[0,1,2],e:"He strove even harder in worship.",s:['h:dixnuits','h:itikaf']},
 {q:"Which statements about tarawih are correct?",c:["It is the prayer of the nights of Ramadan","It is not obligatory","The Prophet ﷺ prayed it in congregation for a few nights","It is a sixth obligatory prayer","It is prayed only before Fajr"],b:[0,1,2],e:"He stopped leading it in congregation for fear it would become obligatory.",s:['h:tarawih','h:qiyam']}],
'r-qadr':[
 {q:"According to Surah Al-Qadr, which statements about the Night of Decree are correct?",c:["It is better than a thousand months","The angels and the Spirit descend in it","It is peace until dawn","It takes place in the month of Muharram","It takes place on the night of Eid"],b:[0,1,2],e:"These are verses 3, 4 and 5 of Surah Al-Qadr.",s:['q:97:3','q:97:4','q:97:5']},
 {q:"Which of these nights are odd nights among the last ten nights of Ramadan?",c:["The 21st","The 25th","The 27th","The 22nd","The 15th"],b:[0,1,2],e:"The odd nights: the 21st, 23rd, 25th, 27th and 29th.",s:['h:qadr']}],
'r-aid':[
 {q:"What are the two Eid festivals of Islam?",c:["Eid al-Fitr","Eid al-Adha","The day of Arafah","The 1st of Muharram","The 17th of Ramadan"],b:[0,1],e:"The day of Arafah is a great day, but it is not an Eid.",s:['f:aid']},
 {q:"What does the Sunnah recommend around Eid al-Fitr?",c:["Eating a few dates before the prayer","Giving zakat al-fitr before the prayer","Then fasting six days of Shawwal","Fasting on the day of Eid","Giving zakat al-fitr after the prayer"],b:[0,1,2],e:"You do not fast on the day of Eid: it is a day of celebration.",s:['h:aid_dattes','h:fitr','h:shawwal']}],
'p-piliers':[
 {q:"Which of these are among the five pillars of Islam?",c:["The shahada","Zakat","Hajj","Ablution","Visiting Medina"],b:[0,1,2],e:"Ablution is a condition of prayer, not a pillar.",s:['h:piliers']},
 {q:"Which of these are also among the five pillars of Islam?",c:["Prayer (salah)","Fasting in Ramadan","I'tikaf","Tarawih","Sadaqah"],b:[0,1],e:"I'tikaf, tarawih and sadaqah are recommended, but they are not pillars.",s:['h:piliers']}],
'p-shahada':[
 {q:"What does the shahada contain?",c:["The testimony that there is no god but Allah","The testimony that Muhammad ﷺ is the Messenger of Allah","The obligation to perform Hajj","The list of the prophets","The number of prayers"],b:[0,1],e:"The shahada has two parts.",s:['f:shahada']},
 {q:"According to Surah Al-Ikhlas, which statements about Allah are correct?",c:["He is One","He does not beget","He was not begotten","He has an equal","He needs others"],b:[0,1,2],e:"“Nor is there to Him any equivalent.”",s:['q:112:1','q:112:3','q:112:4']}],
'p-priere':[
 {q:"Which obligatory prayers have 4 units (rak'ahs)?",c:["Dhuhr","Asr","Isha","Fajr","Maghrib"],b:[0,1,2],e:"Fajr has 2 and Maghrib has 3.",s:['f:rakat']},
 {q:"Which statements about prayer are correct?",c:["You pray facing the Kaaba","It is prescribed at set times","The adhan announces its time","It is done once a week","You pray facing Medina"],b:[0,1,2],e:"Five times a day, facing the qiblah.",s:['q:2:144','q:4:103']}],
'p-ablutions':[
 {q:"According to verse 6 of Surah Al-Ma'idah, what do you wash during ablution?",c:["The face","The hands and forearms up to the elbows","The feet up to the ankles","The back","The knees"],b:[0,1,2],e:"The head, on the other hand, is wiped with wet hands.",s:['q:5:6']},
 {q:"Which statements about Surah Al-Fatiha are correct?",c:["It has 7 verses","It is recited in every rak'ah","It is the first surah of the Qur'an","It is the longest surah","It is recited only on Fridays"],b:[0,1,2],e:"The longest surah is Al-Baqarah.",s:['q:15:87','h:fatiha']}],
'p-zakat':[
 {q:"According to the Qur'an, who is among the recipients of zakat?",c:["The poor","The needy","The stranded traveller","The richest people in town","Prosperous merchants"],b:[0,1,2],e:"Verse 60 of Surah At-Tawbah lists eight categories.",s:['q:9:60']},
 {q:"Which statements about zakat on money are correct?",c:["Its rate is 2.5%","It is due above the nisab","The savings must be held for a lunar year","It is optional","It is paid every Friday"],b:[0,1,2],e:"Zakat is obligatory; sadaqah is voluntary.",s:['f:zakat']}],
'p-hajj':[
 {q:"Which rites are part of Hajj?",c:["Standing at Arafah","Tawaf around the Kaaba","Sa'y between Safa and Marwa","Ten days of i'tikaf","Thirty days of fasting"],b:[0,1,2],e:"I'tikaf and thirty days of fasting are linked to Ramadan.",s:['f:hajj','q:2:158']},
 {q:"Which statements about Hajj are correct?",c:["It takes place in Dhul-Hijjah","It is obligatory once in a lifetime for those who can afford it","Eid al-Adha takes place during Hajj","It takes place during Ramadan","It is performed in Medina"],b:[0,1,2],e:"Hajj is performed in Mecca and the area around it.",s:['q:3:97','f:hajj']}],
'c-coran':[
 {q:"Which statements about the revelation of the Qur'an are correct?",c:["It began in the cave of Hira","It was conveyed by the angel Jibril","It lasted about 23 years","It began in Medina","It lasted one year"],b:[0,1,2],e:"It began near Mecca, when the Prophet ﷺ was 40 years old.",s:['h:hira','h:vie']},
 {q:"Which figures about the Qur'an are correct?",c:["114 surahs","30 parts (juz')","6,236 verses according to the most widespread count","99 surahs","12 parts"],b:[0,1,2],e:"99 is the traditional number of the most beautiful names of Allah, not of the surahs.",s:['f:coran']}],
'c-sourates':[
 {q:"Which statements about the surahs are correct?",c:["Al-Baqarah is the longest","Al-Kawthar is the shortest","An-Nas is the last","Al-Fatiha is the longest","At-Tawbah begins with the basmala"],b:[0,1,2],e:"At-Tawbah is precisely the only surah without the basmala at its start.",s:['f:coran','f:tawba']},
 {q:"Which of these surahs are named after a prophet or a person?",c:["Yusuf","Maryam","Ibrahim","Al-Baqarah","Al-Kawthar"],b:[0,1,2],e:"Al-Baqarah means “the Cow”, Al-Kawthar “Abundance”.",s:['q:12:3','q:19:16','q:14:39']}],
'c-ikhlas':[
 {q:"According to Ayat al-Kursi, which statements about Allah are correct?",c:["Neither drowsiness nor sleep overtakes Him","He is the Ever-Living","His Throne extends over the heavens and the earth","He needs rest","Creatures encompass all of His knowledge"],b:[0,1,2],e:"They encompass of His knowledge only what He wills.",s:['q:2:255']},
 {q:"Which statements about Surah Al-Ikhlas are correct?",c:["It has 4 verses","It is equal to a third of the Qur'an","It affirms the oneness of Allah","It is the longest surah","It tells the story of the Battle of Badr"],b:[0,1,2],e:"It is one of the shortest and most often recited surahs.",s:['h:ikhlas','q:112:1']}],
'pr-adam':[
 {q:"Which statements about Adam are correct?",c:["He is the first human being","Allah taught him the names of all things","The angels prostrated before him, except Iblis","He built the ark","He was born in Egypt"],b:[0,1,2],e:"It was Nuh who built the ark.",s:['q:2:31','q:2:34']},
 {q:"Which statements about Nuh are correct?",c:["He stayed 950 years among his people","He built the ark","His son refused to board the ark","He was swallowed by a fish","He built the Kaaba"],b:[0,1,2],e:"It was Yunus who was swallowed by the fish.",s:['q:29:14','q:11:37','q:11:43']}],
'pr-ibrahim':[
 {q:"Which statements about Ibrahim are correct?",c:["Allah made the fire cool for him","The Qur'an calls him the friend of Allah","He raised the foundations of the Kaaba with Isma'il","He received the Torah","He was a king of Egypt"],b:[0,1,2],e:"The Torah was revealed to Musa.",s:['q:21:69','q:4:125','q:2:127']},
 {q:"Who are the sons of Ibrahim mentioned in the Qur'an?",c:["Isma'il","Ishaq","Ya'qub","Musa","Yunus"],b:[0,1],e:"Ya'qub is Ibrahim's grandson, the son of Ishaq.",s:['q:14:39']}],
'pr-yunus':[
 {q:"Which statements about these prophets are correct?",c:["Yunus was swallowed by a great fish","Yusuf was thrown into a well by his brothers","Sulayman understood the language of ants","Yusuf built the ark","Sulayman was swallowed by a fish"],b:[0,1,2],e:"Each prophet has his own story in the Qur'an.",s:['q:37:142','q:12:15','q:27:18']},
 {q:"In his childhood dream, what did Yusuf see prostrating to him?",c:["Eleven stars","The sun","The moon","Mountains","Angels"],b:[0,1,2],e:"Eleven stars, the sun and the moon.",s:['q:12:4']}],
'pr-musa':[
 {q:"Which miracles or events are linked to the prophet Musa?",c:["His staff turned into a snake","The sea was parted","Allah spoke to him directly","He spoke in the cradle","He was saved from the fire"],b:[0,1,2],e:"Isa spoke in the cradle; Ibrahim was saved from the fire.",s:['q:20:20','q:26:63','q:4:164']},
 {q:"Which statements about Musa's childhood are correct?",c:["His mother placed him on the river","Pharaoh's household took him in","He was born in Egypt","He was born in Mecca","He was raised by Ibrahim"],b:[0,1,2],e:"Allah had him grow up in Pharaoh's very own house.",s:['q:28:7','q:28:8']}],
'pr-isa':[
 {q:"According to the Qur'an, which statements about Isa are correct?",c:["He was born without a father","He spoke in the cradle","He received the Injil (Gospel)","He is the last prophet","He built the Kaaba"],b:[0,1,2],e:"The last prophet is Muhammad ﷺ.",s:['q:3:59','q:19:30','q:5:46']},
 {q:"Which statements about Maryam are correct?",c:["Allah chose her above the women of the worlds","A surah bears her name","She is the only woman named in the Qur'an","She was Pharaoh's wife","She was the Queen of Sheba"],b:[0,1,2],e:"Pharaoh's wife and the Queen of Sheba are mentioned without being named.",s:['q:3:42','f:maryam']}],
'pr-muhammad':[
 {q:"Which statements about the Prophet's ﷺ childhood are correct?",c:["He was born in Mecca","He lost his mother at the age of 6","He was raised by his uncle Abu Talib","He was born in Medina","His father raised him until the age of 20"],b:[0,1,2],e:"His father died before he was born.",s:['f:sira']},
 {q:"Which ages in the Prophet's ﷺ life are correct?",c:["40 at the first revelation","63 at his death","25 at his marriage to Khadijah","13 at the first revelation","90 at his death"],b:[0,1,2],e:"He then stayed 13 years in Mecca and 10 years in Medina.",s:['h:vie','f:debuts']}],
'pr-livres':[
 {q:"Which pairings of a book and a prophet are correct?",c:["The Tawrat and Musa","The Zabur and Dawud","The Injil and Isa","The Qur'an and Ibrahim","The Injil and Nuh"],b:[0,1,2],e:"The Qur'an was revealed to Muhammad ﷺ.",s:['q:5:44','q:4:163','q:5:46']},
 {q:"Which of these are among the six pillars of faith (iman)?",c:["Believing in the angels","Believing in the revealed books","Believing in the Last Day","Performing Hajj","Paying zakat"],b:[0,1,2],e:"Hajj and zakat are pillars of Islam, not of faith.",s:['h:jibril']}],
'h-khadija':[
 {q:"Who were among the very first Muslims?",c:["Khadijah","Abu Bakr","Ali ibn Abi Talib","Abu Lahab","Abu Jahl"],b:[0,1,2],e:"Abu Lahab and Abu Jahl were among the greatest enemies of Islam.",s:['f:debuts']},
 {q:"Which statements about Khadijah are correct?",c:["She was a businesswoman","She was the first to believe in the message","She took the Prophet ﷺ to Waraqah ibn Nawfal","She was Abu Bakr's daughter","She was the first caliph"],b:[0,1,2],e:"Abu Bakr's daughter is Aisha.",s:['h:hira','f:debuts']}],
'h-hegire':[
 {q:"Which statements about the Hijrah are correct?",c:["It took place in 622","The Prophet ﷺ hid in the cave of Thawr","Abu Bakr was with him","It was towards Jerusalem","It marks the Prophet's ﷺ birth"],b:[0,1,2],e:"The Hijrah led from Mecca to Medina.",s:['f:hegire','q:9:40']},
 {q:"Which definitions are correct?",c:["Ansar: the people of Medina who welcomed the Muslims","Muhajirun: the emigrants who came from Mecca","Yathrib: the old name of Medina","Ansar: the enemies of Mecca","Yathrib: the old name of Mecca"],b:[0,1,2],e:"Ansar means “Helpers”, Muhajirun “Emigrants”.",s:['q:9:100','q:33:13']}],
'h-badr':[
 {q:"Which statements about the Battle of Badr are correct?",c:["It took place in Ramadan","The Muslims numbered about 313","Allah supported them with angels","The Muslims numbered 10,000","It took place in year 8"],b:[0,1,2],e:"10,000 and year 8 refer to the conquest of Mecca.",s:['f:badr','q:8:9']},
 {q:"How does the Qur'an describe Badr?",c:["The Day of the Criterion","A victory while the Muslims were weak and humbled","Reinforcement by a thousand angels","The day of the Hijrah","The festival of sacrifice"],b:[0,1,2],e:"Three different verses speak about Badr.",s:['q:8:41','q:3:123','q:8:9']}],
'h-fath':[
 {q:"Which statements about the conquest of Mecca are correct?",c:["It took place in Ramadan of year 8","About 10,000 Muslims took part","The Prophet ﷺ forgave the people of Mecca","It caused thousands of deaths","It took place in year 2"],b:[0,1,2],e:"It happened almost without fighting.",s:['f:fath']},
 {q:"What does Surah An-Nasr announce or ask for?",c:["The help of Allah and the victory","People entering Islam in crowds","Glorifying Allah and asking His forgiveness","Fasting six days","Building the Kaaba"],b:[0,1,2],e:"These are its three verses.",s:['q:110:1','q:110:2','q:110:3']}],
'h-califes':[
 {q:"Which nicknames of the caliphs are correct?",c:["Abu Bakr: as-Siddiq","Umar: al-Faruq","Uthman: Dhun-Nurayn","Ali: al-Faruq","Abu Bakr: Dhun-Nurayn"],b:[0,1,2],e:"The truthful one, the one who distinguishes truth from falsehood, the man of the two lights.",s:['f:califes']},
 {q:"Which statements about the Qur'an in the time of the caliphs are correct?",c:["Abu Bakr had the Qur'an gathered into one compilation","Zayd ibn Thabit was given this task","Uthman had copies sent to the provinces","The Qur'an was first compiled under the Abbasids","Ali forbade copying the Qur'an"],b:[0,1,2],e:"The Qur'an had already been written down by his scribes during the Prophet's ﷺ lifetime.",s:['h:compilation','h:copies']}]
};
