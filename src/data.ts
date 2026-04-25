export interface Curriculum {
  [tingkatan: string]: {
    [bidang: string]: {
      [sk: string]: string[];
    };
  };
}

export const kurikulum: Curriculum = {
  "Tingkatan 4": {
    "1.0 PENGUKURAN": {
      "1.1 Kuantiti Fizik": [
        "1.1.1 Menerangkan kuantiti fizik.",
        "1.1.2 Menerangkan dengan contoh kuantiti asas dan kuantiti terbitan.",
        "1.1.3 Memerihalkan kuantiti terbitan dalam sebutan kuantiti asas dan unit asas S.I.",
        "1.1.4 Menerangkan dengan contoh kuantiti skalar dan kuantiti vektor."
      ],
      "1.2 Penyiasatan Saintifik": [
        "1.2.1 Mentafsir bentuk-bentuk graf untuk menentukan hubungan antara dua kuantiti fizik.",
        "1.2.2 Menganalisis graf untuk mendapatkan rumusan siasatan.",
        "1.2.3 Menjalankan penyiasatan saintifik dan menulis laporan lengkap melalui eksperimen bandul ringkas."
      ]
    },
    "2.0 DAYA DAN GERAKAN I": {
      "2.1 Gerakan Linear": [
        "2.1.1 Menghuraikan jenis gerakan linear bagi objek yang berada dalam keadaan pegun, halaju seragam, halaju tidak seragam",
        "2.1.2 Menentukan jarak dan sesaran, laju dan halaju, pecutan/ nyahpecutan",
        "2.1.3 Menyelesaikan masalah gerakan linear dengan menggunakan persamaan gerakan linear"
      ],
      "2.2 Graf Gerakan Linear": [
        "2.2.1 Mentafsir jenis gerakan dari graf (i) sesaran-masa (ii) halaju-masa (iii) pecutan-masa",
        "2.2.2 Menganalisis graf sesaran-masa untuk menentukan jarak, sesaran dan halaju.",
        "2.2.3 Menganalisis graf halaju-masa untuk menentukan jarak, sesaran, halaju dan pecutan.",
        "2.2.4 Menterjemah dan melakar graf sesaran-masa kepada graf halaju-masa serta halaju-masa kepada graf pecutan-masa dan sebaliknya.",
        "2.2.5 Menyelesaikan masalah melibatkan graf gerakan linear."
      ],
      "2.3 Gerakan Jatuh Bebas": [
        "2.3.1 Menjelaskan gerakan jatuh bebas dan pecutan graviti melalui contoh.",
        "2.3.2 Mengeksperimen untuk menentukan nilai pecutan graviti.",
        "2.3.3 Menyelesaikan masalah yang melibatkan pecutan graviti bumi bagi objek yang jatuh bebas."
      ],
      "2.4 Inersia": [
        "2.4.1 Menerangkan konsep inersia melalui contoh.",
        "2.4.2 Mengeksperimen untuk mengenal pasti hubungan antara inersia dan jisim.",
        "2.4.3 Mewajarkan kesan inersia dalam kehidupan harian."
      ],
      "2.5 Momentum": [
        "2.5.1 Menerangkan momentum, p sebagai hasil darab jisim, m dan halaju, v. p = mv",
        "2.5.2 Mengaplikasi Prinsip Keabadian Momentum dalam pelanggaran dan letupan."
      ],
      "2.6 Daya": [
        "2.6.1 Mendefinisikan daya sebagai kadar perubahan momentum.",
        "2.6.2 Menyelesaikan masalah melibatkan rumus F = ma."
      ],
      "2.7 Impuls dan Daya Impuls": [
        "2.7.1 Berkomunikasi untuk menerangkan impuls dan daya impuls.",
        "2.7.2 Menyelesaikan masalah melibatkan impuls dan daya impuls."
      ],
      "2.8 Berat": [
        "2.8.1 Menyatakan berat sebagai daya graviti yang bertindak ke atas suatu objek, W = mg"
      ]
    },
    "3.0 KEGRAVITIAN": {
      "3.1 Hukum Kegravitian Semesta Newton": [
        "3.1.1 Menerangkan Hukum Kegravitian Semesta Newton: F = Gm1m2/r2",
        "3.1.2 Menyelesaikan masalah melibatkan Hukum Kegravitian Semesta Newton bagi: (i)dua jasad pegun di Bumi (ii) jasad di atas permukaan Bumi (iii) Bumi dan satelit (iv) Bumi dan Matahari",
        "3.1.3 Menghubung kait pecutan graviti, g di permukaan Bumi dengan pemalar kegravitian semesta, G.",
        "3.1.4 Mewajarkan kepentingan mengetahui nilai pecutan graviti planet-planet dalam Sistem Suria.",
        "3.1.5 Memerihalkan daya memusat dalam sistem gerakan satelit dan planet. F = mv2/r",
        "3.1.6 Menentukan jisim Bumi dan Matahari menggunakan rumus Hukum Kegravitian Semesta Newton dan daya memusat."
      ],
      "3.2 Hukum Kepler": [
        "3.2.1 Menjelaskan Hukum Kepler I, II dan III",
        "3.2.2 Merumuskan Hukum Kepler III, T2 ∝ r3",
        "3.2.3 Menyelesaikan masalah menggunakan rumus Hukum Kepler III."
      ],
      "3.3 Satelit Buatan Manusia": [
        "3.3.1 Menerangkan bagaimana orbit satu satelit dikekalkan pada ketinggian tertentu dengan menggunakan halaju satelit yang sesuai.",
        "3.3.2 Berkomunikasi untuk menerangkan satelit geopegun dan bukan geopegun.",
        "3.3.3 Mengkonsepsikan halaju lepas.",
        "3.3.4 Menyelesaikan masalah yang melibatkan halaju lepas, v bagi roket dari permukaan Bumi, Bulan dan Marikh dan matahari."
      ]
    },
    "4.0 HABA": {
      "4.1 Keseimbangan Terma": [
        "4.1.1 Menjelaskan melalui contoh keseimbangan terma dalam kehidupan harian.",
        "4.1.2 Menentu ukur sebuah termometer cecair dalam kaca menggunakan dua takat tetap."
      ],
      "4.2 Muatan Haba Tentu": [
        "4.2.1 Menerangkan muatan haba, C",
        "4.2.2 Mendefinisi muatan haba tentu bahan, c. c = Q/m(∆θ)",
        "4.2.3 Mengeksperimen untuk menentukan: (i) Muatan haba tentu air (ii) Muatan haba tentu aluminium",
        "4.2.4 Berkomunikasi untuk menerangkan aplikasi muatan haba tentu dalam kehidupan harian, kejuruteraan bahan dan fenomena alam.",
        "4.2.5 Menyelesaikan masalah yang melibatkan muatan haba tentu menggunakan rumus Q = mc∆θ"
      ],
      "4.3 Haba Pendam Tentu": [
        "4.3.1 Menerangkan haba pendam.",
        "4.3.2 Mendefinisi: (i)haba pendam tentu pelakuran, lf = Q/m (ii)haba pendam tentu pengewapan, lv = Q/m",
        "4.3.3 Mengeksperimen untuk menentukan, (i)haba pendam tentu pelakuran ais, lf (ii)haba pendam tentu pengewapan air, lv",
        "4.3.4 Berkomunikasi untuk menerangkan aplikasi haba pendam tentu dalam kehidupan harian.",
        "4.3.5 Menyelesaikan masalah yang melibatkan haba pendam."
      ],
      "4.4 Hukum Gas": [
        "4.4.1 Menerangkan tekanan, suhu dan isi padu gas dari segi kelakuan molekul gas berdasarkan Teori Kinetik Gas.",
        "4.4.2 Mengeksperimen untuk menentukan hubungan antara tekanan dan isi padu bagi suatu gas berjisim tetap pada suhu malar.",
        "4.4.3 Mengeksperimen untuk menentukan hubungan antara isi padu dan suhu bagi suatu gas berjisim tetap pada tekanan malar.",
        "4.4.4 Mengeksperimen untuk menentukan hubungan antara tekanan dan suhu bagi suatu gas berjisim tetap pada isi padu malar.",
        "4.4.5 Menyelesaikan masalah melibatkan tekanan, suhu dan isi padu suatu gas berjisim tetap dengan menggunakan rumus dari Hukum-hukum Gas."
      ]
    },
    "5.0 GELOMBANG": {
      "5.1 Asas Gelombang": [
        "5.1.1 Memerihalkan gelombang.",
        "5.1.2 Menyatakan jenis gelombang.",
        "5.1.3 Membandingkan gelombang melintang dan gelombang membujur.",
        "5.1.4 Menerangkan ciri-ciri gelombang: (i)Amplitud, A (ii)Tempoh, T (iii)Frekuensi, f (iv)Panjang gelombang, λ (v)Laju gelombang, v",
        "5.1.5 Melakar dan mentafsir graf gelombang: (i)sesaran melawan masa (ii)sesaran melawan jarak",
        "5.1.6 Menentukan panjang gelombang, λ, frekuensi, f dan laju gelombang, v."
      ],
      "5.2 Pelembapan dan Resonans": [
        "5.2.1 Memerihalkan pelembapan dan resonans bagi satu sistem ayunan/ getaran.",
        "5.2.2 Mewajarkan kesan resonans terhadap kehidupan."
      ],
      "5.3 Pantulan Gelombang": [
        "5.3.1 Menghuraikan pantulan gelombang dari aspek: (i)sudut tuju, i (ii)sudut pantulan, r (iii)panjang gelombang, λ (iv) frekuensi, f (v)laju, v (vi)arah perambatan gelombang.",
        "5.3.2 Melukis gambar rajah untuk menunjukkan pantulan gelombang air satah bagi pemantul satah.",
        "5.3.3 Mewajarkan aplikasi pantulan gelombang dalam kehidupan harian",
        "5.3.4 Menyelesaikan masalah melibatkan pantulan gelombang."
      ],
      "5.4 Pembiasan Gelombang": [
        "5.4.1 Menghuraikan pembiasan gelombang dari aspek: (i)sudut tuju, i (ii)sudut pantulan, r (iii)panjang gelombang, λ (iv) frekuensi, f (v)laju, v (vi)arah perambatan gelombang.",
        "5.4.2 Melukis gambar rajah untuk menunjukkan pembiasan gelombang bagi dua kedalaman yang berbeza.",
        "5.4.3 Menjelaskan fenomena semula jadi akibat pembiasan gelombang dalam kehidupan harian.",
        "5.4.4 Menyelesaikan masalah melibatkan pembiasan gelombang."
      ],
      "5.5 Pembelauan Gelombang": [
        "5.5.1 Menghuraikan pembelauan gelombang dari aspek: (i)sudut tuju, i (ii)sudut pantulan, r (iii)panjang gelombang, λ (iv) frekuensi, f (v)laju, v (vi)arah perambatan gelombang.",
        "5.5.2 Menentukan faktor-faktor yang mempengaruhi pembelauan gelombang.",
        "5.5.3 Melukis gambar rajah untuk menunjukkan corak pembelauan gelombang air dan kesan pembelauan cahaya.",
        "5.5.4 Menjelaskan aplikasi pembelauan gelombang dalam kehidupan harian."
      ],
      "5.6 Interferens Gelombang": [
        "5.6.1 Menghuraikan prinsip superposisi gelombang.",
        "5.6.2 Menghuraikan corak gelombang interferens: (i) air (ii) bunyi (iii) cahaya",
        "5.6.3 Menghubung kait λ, a, x dan D berdasarkan corak interferens gelombang.",
        "5.6.4 Menyelesaikan masalah yang melibatkan interferens gelombang.",
        "5.6.5 Berkomunikasi untuk menerangkan aplikasi interferens gelombang dalam kehidupan harian."
      ],
      "5.7 Gelombang Elektromagnet": [
        "5.7.1 Mencirikan gelombang elektromagnet.",
        "5.7.2 Menyatakan komponen-komponen spektrum elektromagnet mengikut urutan dari segi panjang gelombang dan frekuensi.",
        "5.7.3 Berkomunikasi untuk menerangkan aplikasi setiap komponen spektrum elektromagnet dalam kehidupan."
      ]
    },
    "6.0 CAHAYA DAN OPTIK": {
      "6.1 Pembiasan Cahaya": [
        "6.1.1 Memerihalkan fenomena pembiasan cahaya.",
        "6.1.2 Menerangkan indeks biasan, n",
        "6.1.3 Mengkonsepsikan Hukum Snell.",
        "6.1.4 Mengeksperimen untuk menentukan indeks biasan, n bagi blok kaca atau perspeks.",
        "6.1.5 Menerangkan dalam nyata dan dalam ketara. n = H/h",
        "6.1.6 Mengeksperimen untuk menentukan indeks biasan menggunakan dalam nyata dan dalam ketara.",
        "6.1.7 Menyelesaikan masalah yang berkaitan dengan pembiasan cahaya."
      ],
      "6.2 Pantulan Dalam Penuh": [
        "6.2.1 Menerangkan sudut genting dan pantulan dalam penuh.",
        "6.2.2 Menghubung kait sudut genting dengan indeks biasan, n = 1/sin c",
        "6.2.3 Berkomunikasi untuk menerangkan fenomena semula jadi dan aplikasi pantulan dalam penuh dalam kehidupan harian.",
        "6.2.4 Menyelesaikan masalah yang melibatkan pantulan dalam penuh."
      ],
      "6.3 Pembentukan Imej oleh Kanta": [
        "6.3.1 Mengenal pasti kanta cembung sebagai kanta penumpu dan kanta cekung sebagai kanta pencapah.",
        "6.3.2 Mengganggar panjang fokus bagi suatu kanta cembung menggunakan objek jauh.",
        "6.3.3 Menentukan kedudukan imej dan ciri-ciri imej yang dibentuk oleh: (i) kanta cembung (ii) kanta cekung",
        "6.3.4 Menyatakan pembesaran linear, m sebagai: m = v/u"
      ],
      "6.4 Formula Kanta Nipis": [
        "6.4.1 Mengeksperimen untuk : (i) mengkaji hubungan antara jarak objek, u dan jarak imej , v bagi satu kanta cembung. (ii) menentukan panjang fokus kanta nipis dengan menggunakan Formula Kanta: 1/f = 1/u + 1/v",
        "6.4.2 Menyelesaikan masalah yang melibatkan formula kanta nipis bagi kanta cembung dan kanta cekung."
      ],
      "6.5 Peralatan Optik": [
        "6.5.1 Mewajarkan penggunaan kanta dalam peralatan optik iaitu kanta pembesar, mikroskop majmuk dan teleskop.",
        "6.5.2 Mereka bentuk dan membina mikroskop majmuk dan teleskop.",
        "6.5.3 Berkomunikasi untuk menerangkan aplikasi kanta bersaiz kecil dalam teknologi peralatan optik."
      ],
      "6.6 Pembentukan Imej oleh Cermin Sfera": [
        "6.6.1 Menentukan kedudukan imej dan ciri-ciri imej yang dibentuk oleh: (i)cermin cekung (ii)cermin cembung",
        "6.6.2 Berkomunikasi menerangkan aplikasi cermin cekung dan cermin cembung dalam kehidupan."
      ]
    }
  },
  "Tingkatan 5": {
    "1.0 DAYA & GERAKAN II": {
      "1.1 Daya Paduan": [
        "1.1.1 Menyatakan maksud daya paduan.",
        "1.1.2 Menentukan daya paduan.",
        "1.1.3 Berkomunikasi tentang daya paduan, F apabila objek berada dalam keadaan : (i) pegun, F = 0 N (ii) bergerak dengan halaju seragam, F = 0 N (iii) bergerak dengan pecutan seragam, F≠ 0 N",
        "1.1.4 Menyelesaikan masalah yang melibatkan daya paduan, jisim dan pecutan suatu objek."
      ],
      "1.2 Leraian Daya": [
        "1.2.1 Memerihalkan leraian daya.",
        "1.2.2 Menyelesaikan masalah melibatkan daya paduan dan leraian daya."
      ],
      "1.3 Keseimbangan Daya": [
        "1.3.1 Menerangkan maksud daya yang berada dalam keseimbangan.",
        "1.3.2 Melakar segi tiga daya bagi tiga daya yang berada dalam keseimbangan.",
        "1.3.3 Menyelesaikan masalah melibatkan keseimbangan daya."
      ],
      "1.4 Kekenyalan": [
        "1.4.1 Memerihalkan kekenyalan.",
        "1.4.2 Mengeksperimen untuk mencari hubungan antara daya, F & pemanjangan spring, x.",
        "1.4.3 Berkomunikasi tentang hukum yang berkaitan dengan daya, F dan pemanjangan spring, x.",
        "1.4.4 Menyelesaikan masalah melibatkan daya dan pemanjangan spring."
      ]
    },
    "2.0 TEKANAN": {
      "2.1 Tekanan Cecair": [
        "2.1.1 Berkomunikasi tentang konsep tekanan cecair P = hg",
        "2.1.2 Mengeksperimen untuk mengkaji faktor yang mempengaruhi tekanan cecair.",
        "2.1.3 Menyelesaikan masalah yang melibatkan tekanan cecair.",
        "2.1.4 Berkomunikasi tentang aplikasi tekanan cecair dalam kehidupan."
      ],
      "2.2 Tekanan Atmosfera": [
        "2.2.1 Memerihalkan tentang tekanan atmosfera.",
        "2.2.2 Berkomunikasi tentang nilai tekanan atmosfera.",
        "2.2.3 Menyelesaikan masalah dalam kehidupan harian yang melibatkan pelbagai unit tekanan.",
        "2.2.4 Memerihalkan kesan tekanan atmosfera ke atas objek pada altitud tinggi dan aras kedalaman di bawah laut."
      ],
      "2.3 Tekanan Gas": [
        "2.3.1 Menentukan tekanan gas dengan menggunakan manometer.",
        "2.3.2 Menyelesaikan masalah dalam kehidupan harian yang melibatkan tekanan gas."
      ],
      "2.4 Prinsip Pascal": [
        "2.4.1 Memerihalkan prinsip pemindahan tekanan dalam suatu bendalir yang tertutup.",
        "2.4.2 Berkomunikasi mengenai sistem hidraulik sebagai satu sistem pengganda daya.",
        "2.4.3 Berkomunikasi tentang aplikasi prinsip Pascal dalam kehidupan.",
        "2.4.4 Menyelesaikan masalah dalam kehidupan seharian melibatkan prinsip Pascal"
      ],
      "2.5 Prinsip Archimedes": [
        "2.5.1 Memerihalkan perkaitan antara daya apungan dengan perbezaan tekanan cecair pada aras kedalaman yang berbeza bagi objek yang terendam.",
        "2.5.2 Mengaitkan keseimbangan daya dengan keadaan keapungan suatu objek dalam bendalir.",
        "2.5.3 Berkomunikasi tentang aplikasi prinsip Archimedes dalam kehidupan.",
        "2.5.4 Menyelesaikan masalah yang melibatkan prinsip Archimedes dan keapungan."
      ],
      "2.6 Prinsip Bernoulli": [
        "2.6.1 Memerihalkan kesan halaju bendalir kepada tekanan.",
        "2.6.2 Menerangkan bahawa daya angkat terhasil akibat perbezaan tekanan disebabkan oleh halaju bendalir yang berbeza.",
        "2.6.3 Berkomunikasi tentang aplikasi prinsip Bernoulli dalam kehidupan."
      ]
    },
    "3.0 ELEKTRIK": {
      "3.1 Arus dan Beza Keupayaan": [
        "3.1.1 Menerangkan maksud medan elektrik.",
        "3.1.2 Memerihalkan kekuatan medan elektrik, E",
        "3.1.3 Menerangkan kelakuan zarah bercas di dalam suatu medan elektrik",
        "3.1.4 Mendefinisi arus elektrik.",
        "3.1.5 Mendefinisi beza keupayaan, V"
      ],
      "3.2 Rintangan": [
        "3.2.1 Membanding dan membeza konduktor Ohm dan konduktor bukan Ohm.",
        "3.2.2 Menyelesaikan masalah bagi sambungan litar kombinasi bersiri dan selari .",
        "3.2.3 Menerangkan maksud kerintangan dawai, p",
        "3.2.4 Memerihalkan faktor yang mempengaruhi rintangan dawai, melalui eksperimen dan merumuskan R = (rho)l/A",
        "3.2.5 Berkomunikasi tentang aplikasi kerintangan dawai dalam kehidupan harian.",
        "3.2.6 Menyelesaikan masalah melibatkan rumus rintangan dawai, R = (rho)l/A"
      ],
      "3.3 Daya Gerak Elektrik (d.g.e.) dan Rintangan Dalam": [
        "3.3.1 Menerangkan daya gerak elektrik, Ɛ",
        "3.3.2 Menerangkan rintangan dalam, r",
        "3.3.3 Mengeksperimen untuk menentukan d.g.e. dan rintangan dalam sel kering.",
        "3.3.4 Menyelesaikan masalah melibatkan d.g.e. dan rintangan dalam sel kering."
      ],
      "3.4 Tenaga dan Kuasa Elektrik": [
        "3.4.1 Merumuskan hubungan antara tenaga elektrik (E), voltan (V), arus (I) dan masa (t).",
        "3.4.2 Merumuskan hubungan antara kuasa (P), voltan (V) dan arus (I).",
        "3.4.3 Menyelesaikan masalah dalam kehidupan harian yang melibatkan tenaga dan kuasa elektrik.",
        "3.4.4 Membandingkan kuasa dan kadar penggunaan tenaga pelbagai alatan elektrik.",
        "3.4.5 Mencadangkan langkah penjimatan penggunaan tenaga elektrik di rumah."
      ]
    },
    "4.0 KEELEKTROMAGNETAN": {
      "4.1 Daya ke atas Konduktor Pembawa Arus dalam Suatu Medan Magnet": [
        "4.1.1 Menghuraikan kesan suatu konduktor pembawa arus dalam suatu medan magnet.",
        "4.1.2 Melukis corak medan magnet paduan (medan lastik) untuk menentukan arah tindakan daya pada konduktor pembawa arus dalam suatu medan magnet.",
        "4.1.3 Menerangkan faktor yang mempengaruhi magnitud daya yang bertindak ke atas konduktor pembawa arus dalam suatu medan magnet.",
        "4.1.4 Menghuraikan kesan gegelung pembawa arus dalam medan magnet.",
        "4.1.5 Menghuraikan prinsip kerja motor arus terus.",
        "4.1.6 Memerihalkan faktor yang mempengaruhi kelajuan putaran suatu motor elektrik."
      ],
      "4.2 Aruhan Elektromagnet": [
        "4.2.1 Menghuraikan aruhan elektromagnet dalam suatu: (i) dawai lurus (ii) solenoid.",
        "4.2.2 Menerangkan faktor yang mempengaruhi magnitud d.g.e. aruhan.",
        "4.2.3 Menentukan arah arus aruhan dalam: (i) dawai lurus (ii) solenoid",
        "4.2.4 Mereka bentuk penjana arus terus dan penjana arus ulang-alik."
      ],
      "4.3 Transformer": [
        "4.3.1 Menghuraikan prinsip kerja transformer ringkas.",
        "4.3.2 Menghuraikan maksud transformer unggul.",
        "4.3.3 Menghuraikan kehilangan tenaga dan cara untuk meningkatkan kecekapan transformer.",
        "4.3.4 Berkomunikasi tentang kegunaan transformer dalam kehidupan harian."
      ]
    },
    "5.0 ELEKTRONIK": {
      "5.1 Elektron": [
        "5.1.1 Menerangkan pancaran termion dan sinar katod.",
        "5.1.2 Menerangkan kesan sinar katod di bawah pengaruh medan elektrik dan medan magnet.",
        "5.1.3 Menentukan halaju elektron dalam tiub sinar katod."
      ],
      "5.2 Diod Semi Konduktor": [
        "5.2.1 Menghuraikan fungsi diod semi konduktor.",
        "5.2.2 Berkomunikasi tentang kegunaan diod semi konduktor dan kapasitor dalam rektifikasi arus ulang-alik."
      ],
      "5.3 Transistor": [
        "5.3.1 Menghuraikan fungsi dan kegunaan transistor sebagai amplifier arus.",
        "5.3.2 Menghuraikan litar yang mengandungi transistor sebagai suis automatik."
      ]
    },
    "6.0 FIZIK NUKLEAR": {
      "6.1 Reputan Radioaktif": [
        "6.1.1 Menjelaskan dengan contoh persamaan reputan bagi: (i) reputan α, (ii) reputan β, (iii) reputan γ",
        "6.1.2 Menjelaskan dengan contoh maksud separuh hayat.",
        "6.1.3 Menentukan separuh hayat bahan sumber radioaktif daripada lengkung reputan.",
        "6.1.4 Menyelesaikan masalah kehidupan harian yang melibatkan separuh hayat."
      ],
      "6.2 Tenaga Nuklear": [
        "6.2.1 Berkomunikasi tentang tindak balas nuklear: (i) pembelahan nukleus, (ii) pelakuran nukleus",
        "6.2.2 Memerihalkan hubungan antara tenaga yang dibebaskan semasa tindak balas nuklear dengan cacat jisim: E = mc2",
        "6.2.3 Menyelesaikan masalah yang melibatkan tenaga nuklear daripada reputan radioaktif dan tindak balas nuklear.",
        "6.2.4 Memerihalkan penjanaan tenaga elektrik dalam reaktor nuklear.",
        "6.2.5 Mewajarkan penggunaan tenaga nuklear sebagai tenaga alternatif untuk menjana tenaga elektrik."
      ]
    },
    "7.0 FIZIK KUANTUM": {
      "7.1 Teori Kuantum Cahaya": [
        "7.1.1 Menjelaskan latar belakang pencetusan idea teori kuantum",
        "7.1.2 Menyatakan maksud kuantum tenaga.",
        "7.1.3 Menerangkan sifat kedualan gelombang-zarah",
        "7.1.4 Menerangkan konsep foton",
        "7.1.5 Menyelesaikan masalah bagi (i) tenaga foton, E=hf, (ii) kuasa, P=nhf ; n ialah bilangan foton yang dipancar per saat."
      ],
      "7.2 Kesan Fotoelektrik": [
        "7.2.1 Menerangkan kesan fotoelektrik.",
        "7.2.2 Mengenal pasti empat ciri kesan fotoelektrik yang tidak dapat diterangkan menggunakan teori gelombang."
      ],
      "7.3 Teori Fotoelektrik Einstein": [
        "7.3.1 Menyatakan fungsi kerja minimum yang diperlukan oleh suatu logam bagi memancarkan elektron melalui persamaan Einstein. hf=W+(1/2)mv2",
        "7.3.2 Menerangkan frekuensi ambang, fo dan fungsi kerja, W",
        "7.3.3 Menentukan fungsi kerja logam berdasarkan rumus, W=hfo",
        "7.3.4 Menyelesaikan masalah melibatkan persamaan Einstein untuk kesan fotoelektrik hf=W+(1/2)mv2",
        "7.3.5 Menerangkan penghasilan arus fotoelektrik dalam sebuah litar sel foto.",
        "7.3.6 Menghuraikan aplikasi kesan fotoelektrik."
      ]
    }
  }
};
