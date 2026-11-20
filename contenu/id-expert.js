/* Darsi — soal EXPERT dengan jawaban ganda (bahasa Indonesia). b = daftar jawaban yang benar.
   Pilih semua jawaban yang benar, dan hanya itu. 2 per pelajaran, sebagai bonus dari kuis 10 soal. */
'use strict';
CONTENU.id.experts={
'r-bienvenue':[
 {q:"Di antara bulan-bulan berikut, mana yang termasuk kalender Islam (Hijriah)?",c:["Syawal","Rajab","Muharram","Tishrîn al-awwal","Kânûn ath-thânî"],b:[0,1,2],e:"Tishrîn al-awwal dan Kânûn ath-thânî adalah nama Suryani untuk bulan-bulan kalender Masehi yang dipakai di Timur Tengah: keduanya bukan bulan Hijriah.",s:['f:mois']},
 {q:"Pernyataan mana yang benar tentang bulan Ramadan?",c:["Ramadan adalah bulan Hijriah ke-9","Wahyu Al-Qur'an mulai turun pada bulan ini","Awalnya bergantung pada hilal","Selalu dimulai pada 1 Syakban","Selalu berlangsung tepat 30 hari"],b:[0,1,2],e:"Satu bulan lunar berlangsung 29 atau 30 hari dan tanggalnya berubah setiap tahun.",s:['q:2:185','h:croissant']}],
'r-jeuner':[
 {q:"Siapa yang boleh tidak berpuasa selama Ramadan, dengan syarat menggantinya di hari lain?",c:["Orang sakit","Musafir","Perempuan yang sedang haid","Orang yang belajar Al-Qur'an sepanjang hari","Orang yang sekadar haus di musim panas"],b:[0,1,2],e:"Inilah keringanan sementara yang ditetapkan Al-Qur'an dan Sunah.",s:['q:2:184','h:regles']},
 {q:"Menurut para ulama, syarat apa saja yang membuat puasa Ramadan menjadi wajib?",c:["Beragama Islam","Sudah balig","Berakal sehat","Sudah berhaji","Bisa membaca bahasa Arab"],b:[0,1,2],e:"Selain itu, harus mampu berpuasa.",s:['f:conditions']}],
'r-rompt':[
 {q:"Di antara perbuatan berikut yang dilakukan dengan sengaja pada siang hari Ramadan, mana yang membatalkan puasa?",c:["Makan","Minum","Berhubungan suami istri","Berwudu","Mencium wangi kesturi"],b:[0,1,2],e:"Berwudu atau mencium wewangian tidak membatalkan puasa.",s:['q:2:187']},
 {q:"Pernyataan mana yang benar tentang puasa Ramadan?",c:["Dimulai saat fajar","Berakhir saat matahari terbenam","Makan karena lupa tidak membatalkannya","Dimulai tengah hari","Boleh minum setelah salat Asar"],b:[0,1,2],e:"Dari fajar sampai matahari terbenam; lupa tidak membatalkan puasa.",s:['q:2:187','h:oubli']}],
'r-suhur':[
 {q:"Menurut hadis Anas, dengan apa Nabi ﷺ berbuka puasa?",c:["Kurma segar","Kurma kering","Beberapa teguk air","Susu unta","Madu"],b:[0,1,2],e:"Dengan urutan pilihan ini: kurma segar, jika tidak ada kurma kering, jika tidak ada air.",s:['h:dattes']},
 {q:"Pernyataan mana yang benar tentang sahur dan berbuka?",c:["Dalam sahur ada keberkahan","Dianjurkan menyegerakan berbuka","Sahur dilakukan sebelum fajar","Berbuka dilakukan tengah hari","Sahur itu dilarang"],b:[0,1,2],e:"Sahur sebelum fajar, berbuka begitu matahari terbenam.",s:['h:suhur','h:hater']}],
'r-merites':[
 {q:"Makanan apa yang disebutkan hadis Ibnu Umar untuk zakat fitrah?",c:["Kurma","Jelai","Beras","Couscous","Susu unta"],b:[0,1],e:"Satu sha' kurma atau satu sha' jelai.",s:['h:fitr']},
 {q:"Menurut hadis Ibnu Abbas, apa saja tujuan zakat fitrah?",c:["Menyucikan orang yang berpuasa dari perkataan sia-sia","Memberi makan orang miskin","Menggantikan salat Id","Memberi upah para muazin","Menggantikan puasa"],b:[0,1],e:"Zakat fitrah menyucikan orang yang berpuasa dan memberi makan orang miskin.",s:['h:fitr_but']}],
'r-nuits':[
 {q:"Apa yang dilakukan Nabi ﷺ pada sepuluh hari dan sepuluh malam terakhir Ramadan?",c:["Beliau menghidupkan malam dengan salat","Beliau membangunkan keluarganya","Beliau beriktikaf di masjid","Beliau pergi berdagang","Beliau berhenti berpuasa"],b:[0,1,2],e:"Beliau semakin bersungguh-sungguh dalam ibadah.",s:['h:dixnuits','h:itikaf']},
 {q:"Pernyataan mana yang benar tentang tarawih?",c:["Tarawih adalah salat malam-malam Ramadan","Tarawih tidak wajib","Nabi ﷺ mengerjakannya berjamaah beberapa malam","Tarawih adalah salat wajib keenam","Tarawih hanya dikerjakan sebelum Subuh"],b:[0,1,2],e:"Beliau berhenti memimpinnya berjamaah karena khawatir salat itu menjadi wajib.",s:['h:tarawih','h:qiyam']}],
'r-qadr':[
 {q:"Menurut surah Al-Qadr, pernyataan mana yang benar tentang Malam Kemuliaan?",c:["Lebih baik daripada seribu bulan","Para malaikat dan Ruh turun pada malam itu","Malam itu penuh kesejahteraan sampai fajar","Terjadi pada bulan Muharram","Terjadi pada malam Idulfitri"],b:[0,1,2],e:"Inilah ayat 3, 4, dan 5 surah Al-Qadr.",s:['q:97:3','q:97:4','q:97:5']},
 {q:"Di antara malam-malam berikut, mana yang termasuk malam ganjil di sepuluh malam terakhir Ramadan?",c:["Malam ke-21","Malam ke-25","Malam ke-27","Malam ke-22","Malam ke-15"],b:[0,1,2],e:"Malam-malam ganjil: 21, 23, 25, 27, dan 29.",s:['h:qadr']}],
'r-aid':[
 {q:"Apa dua hari raya (Id) dalam Islam?",c:["Idulfitri","Iduladha","Hari Arafah","1 Muharram","17 Ramadan"],b:[0,1],e:"Hari Arafah adalah hari yang agung, tetapi bukan hari raya Id.",s:['f:aid']},
 {q:"Apa yang dianjurkan Sunah seputar Idulfitri?",c:["Makan beberapa butir kurma sebelum salat","Menunaikan zakat fitrah sebelum salat","Berpuasa enam hari Syawal sesudahnya","Berpuasa pada hari Idulfitri","Menunaikan zakat fitrah sesudah salat"],b:[0,1,2],e:"Pada hari Idulfitri, kita tidak berpuasa: itu adalah hari raya.",s:['h:aid_dattes','h:fitr','h:shawwal']}],
'p-piliers':[
 {q:"Mana yang termasuk lima rukun Islam?",c:["Syahadat","Zakat","Haji","Wudu","Ziarah ke Madinah"],b:[0,1,2],e:"Wudu adalah syarat sah salat, bukan rukun Islam.",s:['h:piliers']},
 {q:"Mana lagi yang juga termasuk lima rukun Islam?",c:["Salat","Puasa Ramadan","Iktikaf","Tarawih","Sedekah"],b:[0,1],e:"Iktikaf, tarawih, dan sedekah dianjurkan, tetapi bukan rukun.",s:['h:piliers']}],
'p-shahada':[
 {q:"Apa isi syahadat?",c:["Persaksian bahwa tiada tuhan selain Allah","Persaksian bahwa Muhammad ﷺ adalah utusan Allah","Kewajiban berhaji","Daftar para nabi","Jumlah salat"],b:[0,1],e:"Syahadat terdiri dari dua bagian.",s:['f:shahada']},
 {q:"Menurut surah Al-Ikhlas, pernyataan mana yang benar tentang Allah?",c:["Dia Maha Esa","Dia tidak beranak","Dia tidak diperanakkan","Dia memiliki tandingan","Dia membutuhkan yang lain"],b:[0,1,2],e:"“Dan tidak ada sesuatu pun yang setara dengan Dia.”",s:['q:112:1','q:112:3','q:112:4']}],
'p-priere':[
 {q:"Salat wajib mana yang terdiri dari 4 rakaat?",c:["Zuhur","Asar","Isya","Subuh","Magrib"],b:[0,1,2],e:"Subuh terdiri dari 2 rakaat dan Magrib 3.",s:['f:rakat']},
 {q:"Pernyataan mana yang benar tentang salat?",c:["Salat dilakukan menghadap Kakbah","Salat diwajibkan pada waktu-waktu tertentu","Azan mengumumkan masuknya waktu salat","Salat dilakukan sekali seminggu","Salat dilakukan menghadap Madinah"],b:[0,1,2],e:"Lima kali sehari, menghadap kiblat.",s:['q:2:144','q:4:103']}],
'p-ablutions':[
 {q:"Menurut ayat 6 surah Al-Maidah, apa yang dibasuh saat berwudu?",c:["Wajah","Tangan dan lengan sampai siku","Kaki sampai mata kaki","Punggung","Lutut"],b:[0,1,2],e:"Adapun kepala, diusap dengan tangan yang basah.",s:['q:5:6']},
 {q:"Pernyataan mana yang benar tentang surah Al-Fatihah?",c:["Terdiri dari 7 ayat","Dibaca dalam setiap rakaat","Merupakan surah pertama Al-Qur'an","Merupakan surah terpanjang","Hanya dibaca pada hari Jumat"],b:[0,1,2],e:"Surah terpanjang adalah Al-Baqarah.",s:['q:15:87','h:fatiha']}],
'p-zakat':[
 {q:"Menurut Al-Qur'an, siapa saja yang termasuk penerima zakat?",c:["Orang fakir","Orang miskin","Musafir yang kesulitan (ibnu sabil)","Orang-orang terkaya di kota","Para pedagang yang makmur"],b:[0,1,2],e:"Ayat 60 surah At-Taubah menyebutkan delapan golongan.",s:['q:9:60']},
 {q:"Pernyataan mana yang benar tentang zakat uang?",c:["Kadarnya 2,5%","Wajib jika mencapai nisab","Tabungan harus dimiliki selama satu tahun lunar","Zakat itu tidak wajib","Dibayar setiap hari Jumat"],b:[0,1,2],e:"Zakat itu wajib; sedekah bersifat sukarela.",s:['f:zakat']}],
'p-hajj':[
 {q:"Ritual apa saja yang termasuk ibadah haji?",c:["Wukuf di Arafah","Tawaf mengelilingi Kakbah","Sai antara Safa dan Marwah","Iktikaf sepuluh hari","Puasa tiga puluh hari"],b:[0,1,2],e:"Iktikaf dan puasa tiga puluh hari berkaitan dengan Ramadan.",s:['f:hajj','q:2:158']},
 {q:"Pernyataan mana yang benar tentang haji?",c:["Dilaksanakan pada bulan Zulhijah","Wajib sekali seumur hidup bagi yang mampu","Iduladha jatuh pada musim haji","Dilaksanakan pada bulan Ramadan","Dilaksanakan di Madinah"],b:[0,1,2],e:"Haji dilaksanakan di Mekah dan sekitarnya.",s:['q:3:97','f:hajj']}],
'c-coran':[
 {q:"Pernyataan mana yang benar tentang pewahyuan Al-Qur'an?",c:["Dimulai di Gua Hira","Disampaikan oleh Malaikat Jibril","Berlangsung sekitar 23 tahun","Dimulai di Madinah","Berlangsung satu tahun"],b:[0,1,2],e:"Pewahyuan dimulai di dekat Mekah, ketika Nabi ﷺ berusia 40 tahun.",s:['h:hira','h:vie']},
 {q:"Angka mana yang benar tentang Al-Qur'an?",c:["114 surah","30 bagian (juz)","6.236 ayat menurut hitungan yang paling umum","99 surah","12 bagian"],b:[0,1,2],e:"99 adalah jumlah tradisional Asmaul Husna (nama-nama Allah yang terindah), bukan jumlah surah.",s:['f:coran']}],
'c-sourates':[
 {q:"Pernyataan mana yang benar tentang surah-surah Al-Qur'an?",c:["Al-Baqarah adalah yang terpanjang","Al-Kautsar adalah yang terpendek","An-Nas adalah yang terakhir","Al-Fatihah adalah yang terpanjang","At-Taubah diawali dengan basmalah"],b:[0,1,2],e:"At-Taubah justru satu-satunya surah yang tidak diawali basmalah.",s:['f:coran','f:tawba']},
 {q:"Di antara surah-surah berikut, mana yang dinamai dengan nama seorang nabi atau seseorang?",c:["Yusuf","Maryam","Ibrahim","Al-Baqarah","Al-Kautsar"],b:[0,1,2],e:"Al-Baqarah berarti “Sapi Betina”, Al-Kautsar “Nikmat yang Banyak”.",s:['q:12:3','q:19:16','q:14:39']}],
'c-ikhlas':[
 {q:"Menurut Ayat Kursi, pernyataan mana yang benar tentang Allah?",c:["Dia tidak mengantuk dan tidak tidur","Dia Maha Hidup","Kursi-Nya meliputi langit dan bumi","Dia membutuhkan istirahat","Makhluk mengetahui seluruh ilmu-Nya"],b:[0,1,2],e:"Mereka tidak mengetahui sesuatu dari ilmu-Nya melainkan apa yang Dia kehendaki.",s:['q:2:255']},
 {q:"Pernyataan mana yang benar tentang surah Al-Ikhlas?",c:["Terdiri dari 4 ayat","Setara dengan sepertiga Al-Qur'an","Menegaskan keesaan Allah","Merupakan surah terpanjang","Menceritakan Perang Badar"],b:[0,1,2],e:"Surah ini termasuk yang paling pendek dan paling sering dibaca.",s:['h:ikhlas','q:112:1']}],
'pr-adam':[
 {q:"Pernyataan mana yang benar tentang Adam?",c:["Ia manusia pertama","Allah mengajarinya nama segala sesuatu","Para malaikat sujud kepadanya, kecuali Iblis","Ia membangun bahtera","Ia lahir di Mesir"],b:[0,1,2],e:"Nuh-lah yang membangun bahtera.",s:['q:2:31','q:2:34']},
 {q:"Pernyataan mana yang benar tentang Nuh?",c:["Ia tinggal 950 tahun bersama kaumnya","Ia membangun bahtera","Putranya menolak naik ke bahtera","Ia ditelan seekor ikan","Ia membangun Kakbah"],b:[0,1,2],e:"Yunus-lah yang ditelan ikan.",s:['q:29:14','q:11:37','q:11:43']}],
'pr-ibrahim':[
 {q:"Pernyataan mana yang benar tentang Ibrahim?",c:["Allah menjadikan api dingin baginya","Al-Qur'an menyebutnya kekasih Allah","Ia meninggikan fondasi Kakbah bersama Ismail","Ia menerima Taurat","Ia adalah raja Mesir"],b:[0,1,2],e:"Taurat diturunkan kepada Musa.",s:['q:21:69','q:4:125','q:2:127']},
 {q:"Siapa putra-putra Ibrahim yang disebut dalam Al-Qur'an?",c:["Ismail","Ishaq","Yakub","Musa","Yunus"],b:[0,1],e:"Yakub adalah cucu Ibrahim, putra Ishaq.",s:['q:14:39']}],
'pr-yunus':[
 {q:"Pernyataan mana yang benar tentang para nabi ini?",c:["Yunus ditelan seekor ikan besar","Yusuf dilemparkan ke dalam sumur oleh saudara-saudaranya","Sulaiman memahami bahasa semut","Yusuf membangun bahtera","Sulaiman ditelan seekor ikan"],b:[0,1,2],e:"Setiap nabi memiliki kisahnya sendiri dalam Al-Qur'an.",s:['q:37:142','q:12:15','q:27:18']},
 {q:"Dalam mimpinya semasa kecil, apa yang dilihat Yusuf bersujud kepadanya?",c:["Sebelas bintang","Matahari","Bulan","Gunung-gunung","Para malaikat"],b:[0,1,2],e:"Sebelas bintang, matahari, dan bulan.",s:['q:12:4']}],
'pr-musa':[
 {q:"Mukjizat atau peristiwa apa yang berkaitan dengan Nabi Musa?",c:["Tongkatnya berubah menjadi ular","Laut terbelah","Allah berbicara langsung kepadanya","Ia berbicara dari buaiannya","Ia diselamatkan dari api"],b:[0,1,2],e:"Isa-lah yang berbicara dari buaian; Ibrahim-lah yang diselamatkan dari api.",s:['q:20:20','q:26:63','q:4:164']},
 {q:"Pernyataan mana yang benar tentang masa kecil Musa?",c:["Ibunya menghanyutkannya di sungai","Keluarga Firaun memungutnya","Ia lahir di Mesir","Ia lahir di Mekah","Ia diasuh oleh Ibrahim"],b:[0,1,2],e:"Allah membesarkannya di dalam rumah Firaun sendiri.",s:['q:28:7','q:28:8']}],
'pr-isa':[
 {q:"Menurut Al-Qur'an, pernyataan mana yang benar tentang Isa?",c:["Ia lahir tanpa ayah","Ia berbicara dari buaiannya","Ia menerima Injil","Ia adalah nabi terakhir","Ia membangun Kakbah"],b:[0,1,2],e:"Nabi terakhir adalah Muhammad ﷺ.",s:['q:3:59','q:19:30','q:5:46']},
 {q:"Pernyataan mana yang benar tentang Maryam?",c:["Allah memilihnya di atas seluruh perempuan di semesta alam","Sebuah surah dinamai dengan namanya","Ia satu-satunya perempuan yang disebut namanya dalam Al-Qur'an","Ia adalah istri Firaun","Ia adalah ratu negeri Saba"],b:[0,1,2],e:"Istri Firaun dan ratu negeri Saba disebutkan tanpa disebut namanya.",s:['q:3:42','f:maryam']}],
'pr-muhammad':[
 {q:"Pernyataan mana yang benar tentang masa kecil Nabi ﷺ?",c:["Beliau lahir di Mekah","Beliau kehilangan ibunya pada usia 6 tahun","Beliau diasuh oleh pamannya Abu Thalib","Beliau lahir di Madinah","Ayahnya membesarkannya sampai usia 20 tahun"],b:[0,1,2],e:"Ayahnya wafat sebelum beliau lahir.",s:['f:sira']},
 {q:"Usia mana yang benar dalam kehidupan Nabi ﷺ?",c:["40 tahun saat wahyu pertama","63 tahun saat wafat","25 tahun saat menikah dengan Khadijah","13 tahun saat wahyu pertama","90 tahun saat wafat"],b:[0,1,2],e:"Setelah itu beliau tinggal 13 tahun di Mekah dan 10 tahun di Madinah.",s:['h:vie','f:debuts']}],
'pr-livres':[
 {q:"Pasangan kitab dan nabi mana yang benar?",c:["Taurat dan Musa","Zabur dan Daud","Injil dan Isa","Al-Qur'an dan Ibrahim","Injil dan Nuh"],b:[0,1,2],e:"Al-Qur'an diturunkan kepada Muhammad ﷺ.",s:['q:5:44','q:4:163','q:5:46']},
 {q:"Mana yang termasuk enam rukun iman?",c:["Beriman kepada malaikat","Beriman kepada kitab-kitab yang diturunkan","Beriman kepada hari akhir","Berhaji","Menunaikan zakat"],b:[0,1,2],e:"Haji dan zakat adalah rukun Islam, bukan rukun iman.",s:['h:jibril']}],
'h-khadija':[
 {q:"Siapa saja yang termasuk orang-orang paling awal masuk Islam?",c:["Khadijah","Abu Bakar","Ali bin Abi Thalib","Abu Lahab","Abu Jahal"],b:[0,1,2],e:"Abu Lahab dan Abu Jahal termasuk musuh terbesar Islam.",s:['f:debuts']},
 {q:"Pernyataan mana yang benar tentang Khadijah?",c:["Ia seorang pedagang","Ia orang pertama yang beriman kepada risalah","Ia membawa Nabi ﷺ menemui Waraqah bin Naufal","Ia putri Abu Bakar","Ia khalifah pertama"],b:[0,1,2],e:"Putri Abu Bakar adalah Aisyah.",s:['h:hira','f:debuts']}],
'h-hegire':[
 {q:"Pernyataan mana yang benar tentang Hijrah?",c:["Terjadi pada tahun 622","Nabi ﷺ bersembunyi di Gua Tsur","Abu Bakar menemaninya","Hijrah dilakukan ke Yerusalem","Hijrah menandai kelahiran Nabi ﷺ"],b:[0,1,2],e:"Hijrah dilakukan dari Mekah ke Madinah.",s:['f:hegire','q:9:40']},
 {q:"Definisi mana yang benar?",c:["Anshar: penduduk Madinah yang menyambut kaum muslimin","Muhajirin: orang-orang yang berhijrah dari Mekah","Yatsrib: nama lama Madinah","Anshar: musuh-musuh Mekah","Yatsrib: nama lama Mekah"],b:[0,1,2],e:"Anshar berarti “para Penolong”, Muhajirin “orang-orang yang berhijrah”.",s:['q:9:100','q:33:13']}],
'h-badr':[
 {q:"Pernyataan mana yang benar tentang Perang Badar?",c:["Terjadi pada bulan Ramadan","Kaum muslimin berjumlah sekitar 313 orang","Allah menolong mereka dengan para malaikat","Kaum muslimin berjumlah 10.000 orang","Terjadi pada tahun ke-8"],b:[0,1,2],e:"10.000 dan tahun ke-8 berkaitan dengan penaklukan Mekah.",s:['f:badr','q:8:9']},
 {q:"Bagaimana Al-Qur'an menggambarkan Badar?",c:["Hari Furqan","Kemenangan ketika kaum muslimin dalam keadaan lemah","Bala bantuan seribu malaikat","Hari Hijrah","Hari raya kurban"],b:[0,1,2],e:"Tiga ayat yang berbeda membicarakan Badar.",s:['q:8:41','q:3:123','q:8:9']}],
'h-fath':[
 {q:"Pernyataan mana yang benar tentang penaklukan Mekah?",c:["Terjadi pada bulan Ramadan tahun ke-8","Sekitar 10.000 muslim ikut serta","Nabi ﷺ memaafkan penduduk Mekah","Menelan ribuan korban jiwa","Terjadi pada tahun ke-2"],b:[0,1,2],e:"Penaklukan ini terjadi hampir tanpa pertempuran.",s:['f:fath']},
 {q:"Apa yang dikabarkan atau diperintahkan surah An-Nasr?",c:["Pertolongan Allah dan kemenangan","Manusia masuk Islam berbondong-bondong","Bertasbih kepada Allah dan memohon ampunan-Nya","Berpuasa enam hari","Membangun Kakbah"],b:[0,1,2],e:"Itulah isi ketiga ayatnya.",s:['q:110:1','q:110:2','q:110:3']}],
'h-califes':[
 {q:"Julukan khalifah mana yang benar?",c:["Abu Bakar: Ash-Shiddiq","Umar: Al-Faruq","Utsman: Dzun Nurain","Ali: Al-Faruq","Abu Bakar: Dzun Nurain"],b:[0,1,2],e:"Yang membenarkan, yang membedakan antara benar dan salah, pemilik dua cahaya.",s:['f:califes']},
 {q:"Pernyataan mana yang benar tentang Al-Qur'an pada masa para khalifah?",c:["Abu Bakar memerintahkan agar Al-Qur'an dikumpulkan dalam satu mushaf","Zaid bin Tsabit ditugaskan untuk pekerjaan ini","Utsman memerintahkan pengiriman salinan ke berbagai wilayah","Al-Qur'an pertama kali dikumpulkan pada masa Abbasiyah","Ali melarang penyalinan Al-Qur'an"],b:[0,1,2],e:"Al-Qur'an sudah ditulis semasa Nabi ﷺ masih hidup oleh para penulis wahyu.",s:['h:compilation','h:copies']}]
};
