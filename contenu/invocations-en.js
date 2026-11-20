/* {APP} — supplications (English).
   Hadiths: the Arabic text is copied word for word from the cited source (checked by outils/verifier.js).
   "sens" = translation of the meaning by the team, to be reviewed. Verses: Arabic, transliteration and recognised translation taken from js/sources.js. */
'use strict';
CONTENU.en.invocations=[
{cat:'quotidien',liste:[
 {id:'reveil',titre:"On waking up",ar:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ",
  ph:"Al-ḥamdu lillâhi lladhî aḥyânâ baʿda mâ amâtanâ, wa ilayhi n-nushûr.",
  sens:"Praise be to Allah who gave us life after He had caused us to die, and to Him is the resurrection.",src:['h:inv_sommeil']},
 {id:'sommeil',titre:"Before sleeping",ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
  ph:"Bismika llâhumma amûtu wa aḥyâ.",sens:"In Your name, O Allah, I die and I live.",src:['h:inv_sommeil']},
 {id:'manger',titre:"Before eating",ar:"بِسْمِ اللَّهِ",ph:"Bismillâh.",sens:"In the name of Allah.",
  note:"The Prophet ﷺ said to a child: “Mention the name of Allah, eat with your right hand and eat from what is in front of you.”",src:['h:inv_manger','h:inv_oubli_manger']},
 {id:'oubli_manger',titre:"If you forgot to say Bismillah",ar:"بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",ph:"Bismillâhi awwalahu wa âkhirahu.",
  sens:"In the name of Allah, at its beginning and at its end.",src:['h:inv_oubli_manger']},
 {id:'apres_repas',titre:"After eating",ar:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا الطَّعَامَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
  ph:"Al-ḥamdu lillâhi lladhî aṭʿamanî hâdha ṭ-ṭaʿâma wa razaqanîhi min ghayri ḥawlin minnî wa lâ quwwa.",
  sens:"Praise be to Allah who fed me this food and provided it for me, without any might or power on my part.",src:['h:inv_apres_repas']},
 {id:'toilettes',titre:"Before entering the toilet",ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
  ph:"Allâhumma innî aʿûdhu bika mina l-khubuthi wa l-khabâ'ith.",sens:"O Allah, I seek refuge with You from the devils, male and female.",src:['h:inv_toilettes']},
 {id:'sortir',titre:"When leaving the house",ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
  ph:"Bismillâh, tawakkaltu ʿala llâh, lâ ḥawla wa lâ quwwata illâ billâh.",
  sens:"In the name of Allah, I put my trust in Allah; there is no might and no power except with Allah.",src:['h:inv_sortir']},
 {id:'wudu',titre:"After ablution",ar:"أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا عَبْدُ اللَّهِ وَرَسُولُهُ",
  ph:"Ash-hadu an lâ ilâha illa llâhu wa anna Muḥammadan ʿabdu llâhi wa rasûluh.",
  sens:"I bear witness that there is no god but Allah, and that Muhammad is the servant of Allah and His Messenger.",
  note:"According to the hadith, the eight gates of Paradise are opened for whoever performs ablution well and then says these words.",src:['h:inv_wudu']},
 {id:'mosquee_entree',titre:"When entering the mosque",ar:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
  ph:"Allâhumma ftaḥ lî abwâba raḥmatik.",sens:"O Allah, open for me the gates of Your mercy.",src:['h:inv_mosquee']},
 {id:'mosquee_sortie',titre:"When leaving the mosque",ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
  ph:"Allâhumma innî as'aluka min faḍlik.",sens:"O Allah, I ask You of Your bounty.",src:['h:inv_mosquee']},
 {id:'eternuement',titre:"When sneezing",ar:"الْحَمْدُ لِلَّهِ\nيَرْحَمُكَ اللَّهُ\nيَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
  ph:"Al-ḥamdu lillâh. — Yarḥamuka llâh. — Yahdîkumu llâhu wa yuṣliḥu bâlakum.",
  sens:"The person who sneezes says: “Praise be to Allah.” The one who hears it replies: “May Allah have mercy on you.” And the first one answers: “May Allah guide you and set your affairs right.”",src:['h:inv_eternuement']},
 {id:'pluie',titre:"When it rains",ar:"صَيِّبًا نَافِعًا",ph:"Ṣayyiban nâfiʿâ.",sens:"An abundant and beneficial rain.",src:['h:inv_pluie']}
]},
{cat:'ramadan',liste:[
 {id:'rupture',titre:"When breaking the fast",ar:"ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
  ph:"Dhahaba ẓ-ẓama'u wa btallati l-ʿurûqu wa thabata l-ajru in shâ' Allâh.",
  sens:"The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.",src:['h:inv_rupture']},
 {id:'qadr',titre:"During the Night of Decree",ar:"اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
  ph:"Allâhumma innaka ʿafuwwun karîmun tuḥibbu l-ʿafwa fa-ʿfu ʿannî.",
  sens:"O Allah, You are the One who pardons, the Generous, You love to pardon: so pardon me.",
  note:"Aisha had asked the Prophet ﷺ what to say if she knew which night was Laylat al-Qadr.",src:['h:afw']}
]},
{cat:'pardon',liste:[
 {id:'istighfar',titre:"The best way of asking forgiveness",ar:"اللَّهُمَّ أَنْتَ رَبِّي، لاَ إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَىَّ وَأَبُوءُ لَكَ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ",
  ph:"Allâhumma anta rabbî, lâ ilâha illâ ant, khalaqtanî wa ana ʿabduk, wa ana ʿalâ ʿahdika wa waʿdika mâ staṭaʿt, aʿûdhu bika min sharri mâ ṣanaʿt, abû'u laka bi-niʿmatika ʿalayya, wa abû'u laka bi-dhanbî, fa-ghfir lî, fa-innahu lâ yaghfiru dh-dhunûba illâ ant.",
  sens:"O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I keep my covenant and my promise to You as far as I am able. I seek refuge with You from the evil of what I have done. I acknowledge Your favour upon me and I acknowledge my sin: so forgive me, for no one forgives sins except You.",
  note:"According to the hadith, whoever says it during the day with firm belief and dies before evening enters Paradise; and the same for the night.",src:['h:inv_istighfar']},
 {id:'yunus',titre:"The supplication of Yunus (Jonah)",ar:"لاَ إِلَهَ إِلاَّ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
  ph:"Lâ ilâha illâ anta, subḥânaka, innî kuntu mina ẓ-ẓâlimîn.",
  sens:"There is no god but You; glory be to You. Indeed, I have been of the wrongdoers.",coran:true,
  note:"Yunus said it in the belly of the fish. According to the hadith, no Muslim says it asking for something without Allah answering him.",src:['q:21:87','h:inv_yunus']},
 {id:'detresse',titre:"In anxiety or hardship",ar:"لاَ إِلَهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ، وَرَبُّ الأَرْضِ، وَرَبُّ الْعَرْشِ الْكَرِيمِ",
  ph:"Lâ ilâha illa llâhu l-ʿaẓîmu l-ḥalîm, lâ ilâha illa llâhu rabbu l-ʿarshi l-ʿaẓîm, lâ ilâha illa llâhu rabbu s-samâwâti wa rabbu l-arḍi wa rabbu l-ʿarshi l-karîm.",
  sens:"There is no god but Allah, the Magnificent, the Forbearing. There is no god but Allah, Lord of the magnificent Throne. There is no god but Allah, Lord of the heavens, Lord of the earth and Lord of the noble Throne.",src:['h:inv_detresse']},
 {id:'tasbih',titre:"Glory and praise to Allah",ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",ph:"Subḥâna llâhi wa bi-ḥamdih.",sens:"Glory and praise be to Allah.",
  note:"Said a hundred times in a day, it wipes out sins, even if they are as many as the foam of the sea.",src:['h:inv_tasbih']}
]},
{cat:'coran',liste:[
 {id:'c2_201',titre:"Good in this world and in the Hereafter",v:'q:2:201'},
 {id:'c2_127',titre:"That Allah may accept our deeds",v:'q:2:127'},
 {id:'c3_8',titre:"To keep an upright heart",v:'q:3:8'},
 {id:'c7_23',titre:"Asking forgiveness, like Adam and Eve",v:'q:7:23'},
 {id:'c14_41',titre:"For yourself, your parents and the believers",v:'q:14:41'},
 {id:'c17_24',titre:"For your parents",v:'q:17:24'},
 {id:'c20_114',titre:"To grow in knowledge",v:'q:20:114'},
 {id:'c25_74',titre:"For your family",v:'q:25:74'}
]}
];
