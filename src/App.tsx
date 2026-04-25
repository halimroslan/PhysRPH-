import { GoogleGenAI } from "@google/genai";
import { 
  AlertCircle, 
  Check, 
  Copy, 
  Printer, 
  Sparkles,
  ChevronDown,
  X,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { marked } from "marked";
import { saveAs } from "file-saver";
import { auth, db, signInWithGoogle, logout } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  increment, 
  serverTimestamp,
  getDocFromServer
} from "firebase/firestore";
import { kurikulum } from "./data";
import { kurikulumEn } from "./dataEn";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    const testDoc = doc(db, 'stats', 'survey'); // Use an existing doc to test
    await getDocFromServer(testDoc);
    console.log("Firebase connection validated.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    } else {
      console.error("Firebase connection test failed:", error);
    }
  }
}

function AccordionSelect({ 
  label, subtitle, value, options, onChange, emptyText
}: { 
  label: string;
  subtitle?: string;
  value: string;
  options: { value: string, label: string }[];
  onChange: (val: string) => void;
  emptyText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="border-b border-[#d2d2d7] py-4 last:border-b-0 w-full relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between text-left group outline-none"
      >
        <div className="pr-4 py-1">
          <span className="block text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-tight">
            {label}
            {subtitle && <span className="text-[12px] italic font-normal text-[#86868b] ml-2">{subtitle}</span>}
          </span>
          {value && !isOpen && (
            <span className="block text-[15px] font-medium text-[#0071e3] mt-2 line-clamp-1">{selectedOption?.label || value}</span>
          )}
        </div>
        <ChevronDown 
          size={20} 
          className={`text-[#86868b] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1d1d1f]' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-1">
              {emptyText && (
                <label 
                  className={`flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-colors ${value === "" ? 'bg-[#f5f5f7]' : 'hover:bg-[#f5f5f7]'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onChange("");
                    setIsOpen(false);
                  }}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${value === "" ? 'border-[#0071e3] bg-[#0071e3]' : 'border-[#d2d2d7] bg-white'}`}>
                    {value === "" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className={`text-[15px] ${value === "" ? 'font-medium text-[#1d1d1f]' : 'font-normal text-[#1d1d1f]'}`}>
                    {emptyText}
                  </span>
                </label>
              )}
              {options.length === 0 && !emptyText ? (
                 <div className="text-[14px] text-[#86868b] pl-3 py-2">Tiada pilihan / No options</div>
              ) : options.map((opt, i) => (
                <label 
                  key={i} 
                  className={`flex items-center gap-3 p-3 rounded-[12px] cursor-pointer transition-colors ${value === opt.value ? 'bg-[#f5f5f7]' : 'hover:bg-[#f5f5f7]'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${value === opt.value ? 'border-[#0071e3] bg-[#0071e3]' : 'border-[#d2d2d7] bg-white'}`}>
                    {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className={`text-[15px] ${value === opt.value ? 'font-medium text-[#1d1d1f]' : 'font-normal text-[#1d1d1f]'}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const SURVEY_ITEMS = [
  { id: "q1", textBm: "PhysRPH+ menjimatkan masa saya", textEn: "PhysRPH+ saves my time" },
  { id: "q2", textBm: "Antaramuka web mudah digunakan", textEn: "The web interface is easy to use" },
  { id: "q3", textBm: "Kualiti RPH dijana memuaskan", textEn: "Generated RPH quality is satisfactory" },
  { id: "q4", textBm: "Struktur RPH tersusun baik", textEn: "RPH structure is well-organized" },
  { id: "q5", textBm: "Mengurangkan beban kerja", textEn: "Reduces workload" },
  { id: "q6", textBm: "Cadangan aktiviti menarik", textEn: "Creative activity suggestions" },
  { id: "q7", textBm: "Akan mengesyorkan PhysRPH+", textEn: "Will recommend PhysRPH+" },
  { id: "q8", textBm: "Janaan kelajuan yang pantas", textEn: "Fast generation speed" },
  { id: "q9", textBm: "Pilihan tetapan komprehensif", textEn: "Comprehensive RPH settings" },
  { id: "q10", textBm: "Membantu capai standard", textEn: "Helps achieve standards" }
];

interface UserData {
  generationCount: number;
  hasCompletedSurvey: boolean;
}

export const PRODUCTS_DATA = [
  {
    title: "CheatNoteXTasfiz 4",
    badge: "BUKU FIZIK",
    subtitle: "Inklusif, Menyeluruh.",
    desc: "Kuasai keseluruhan konsep Fizik Tingkatan 4 dengan cepat.",
    bgClass: "bg-[#2a1b54]",
    textClass: "text-white",
    imgSrc: "/cheatnote4.jpg",
    link: "https://my.shp.ee/Z9NxEZss",
    buyText: "Dapatkan di Shopee"
  },
  {
    title: "CheatNoteXTasfiz 5",
    badge: "BUKU FIZIK",
    subtitle: "Rahsia Skor A+",
    desc: "Kuasai formula, definisi dan ruang catatan nota Fizik Tingkatan 5.",
    bgClass: "bg-[#e56b1f]",
    textClass: "text-white",
    imgSrc: "/cheatnote5.jpg",
    link: "https://my.shp.ee/Z9NxEZss",
    buyText: "Dapatkan di Shopee"
  },
  {
    title: "[NILAM] Modul Konstruk Fizik T4",
    badge: "BUKU LATIHAN",
    subtitle: "Konstruk Asas ke Format SPM",
    desc: "Dilengkapi modul digital & eksperimen berpandu.",
    bgClass: "bg-[#0f4c81]",
    textClass: "text-white",
    imgSrc: "/nilam4.jpg",
    link: "https://my.shp.ee/GxHgPKAq",
    buyText: "Dapatkan di Shopee"
  },
  {
    title: "[NILAM] Modul Konstruk Fizik T5",
    badge: "BUKU LATIHAN",
    subtitle: "Pembelajaran Tersusun Terarah",
    desc: "Latihan format terkini untuk cemerlang SPM.",
    bgClass: "bg-[#b31b1b]",
    textClass: "text-white",
    imgSrc: "/nilam5.jpg",
    link: "https://my.shp.ee/GxHgPKAq",
    buyText: "Dapatkan di Shopee"
  },
  {
    title: "Bunting Fizik",
    badge: "BBM VISUAL",
    subtitle: "Rujukan Visual Dalam Kelas.",
    desc: "Peta konsep yang menarik dan berwarna-warni.",
    bgClass: "bg-[#f5f5f7]",
    textClass: "text-[#1d1d1f]",
    imgSrc: "/bunting.jpg",
    link: "https://t.me/halimroslan",
    buyText: "Dapatkan di Telegram"
  },
  {
    title: "MyPhysicsTutor",
    badge: "WEB APP SIMULASI",
    subtitle: "Eksperimen Secara Maya.",
    desc: "Jalankan simulasi dan eksperimen Fizik wajib secara interaktif.",
    bgClass: "bg-[#0f0c29]",
    textClass: "text-white",
    imgSrc: "/myphysicstutor.jpg",
    link: "https://my-physics-tutor.vercel.app/",
    buyText: "Guna Aplikasi Web"
  },
  {
    title: "CikguScan",
    badge: "AI SCAN TOOL",
    subtitle: "Semakan Pantas Tanpa Had!",
    desc: "Analisis item pantas dengan kamera bimbit anda.",
    bgClass: "bg-white border border-[#d2d2d7]",
    textClass: "text-[#1d1d1f]",
    imgSrc: "/cikguscan.jpg",
    link: "https://cikgu-scan.vercel.app",
    buyText: "Guna Aplikasi Web"
  },
  {
    title: "Wowhoot!",
    badge: "KUIZ INTERAKTIF",
    subtitle: "Platform Pembelajaran Seronok.",
    desc: "Uji kefahaman murid dengan cara yang menyeronokkan.",
    bgClass: "bg-[#4cc9f0]",
    textClass: "text-[#1d1d1f]",
    imgSrc: "/wowhoot.jpg",
    link: "https://wowhoot.vercel.app",
    buyText: "Guna Aplikasi Web"
  }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState<any[]>([]);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, number>>({});
  const [surveyStats, setSurveyStats] = useState<Record<string, number>>({});
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false);
  const [language, setLanguage] = useState<"Bahasa Melayu" | "English (DLP)">("Bahasa Melayu");
  const [tingkatan, setTingkatan] = useState("Tingkatan 4");
  const [bp, setBp] = useState("");
  const [sk, setSk] = useState("");
  const [selectedSps, setSelectedSps] = useState<string[]>(["", "", "", "", ""]);
  const [customSp, setCustomSp] = useState("");
  const [pdpActivity, setPdpActivity] = useState<"Tanpa Eksperimen" | "Eksperimen">("Tanpa Eksperimen");
  const [pdpTime, setPdpTime] = useState("30 minit");
  const [suggestedActivity, setSuggestedActivity] = useState("");
  const [showSupport, setShowSupport] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(PRODUCTS_DATA[0]);

  const [bpOptions, setBpOptions] = useState<string[]>([]);
  const [skOptions, setSkOptions] = useState<string[]>([]);
  const [spOptions, setSpOptions] = useState<string[]>([]);

  const [bbm, setBbm] = useState({
    Nota: false,
    "Kertas A4": true,
    Projector: true,
    Modul: false,
    "Lain-lain": false,
  });
  const [lainLainText, setLainLainText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [rphOutput, setRphOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showCurriculumModal, setShowCurriculumModal] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    testConnection();

    const fetchSurveyStats = async () => {
      const statsPath = "stats/survey";
      try {
        const statsRef = doc(db, "stats", "survey");
        const statsSnap = await getDoc(statsRef);
        if (statsSnap.exists()) {
          const data = statsSnap.data();
          const scores = data.itemScores || {};
          const counts = data.itemCounts || {};
          const averageStats: Record<string, number> = {};
          Object.keys(scores).forEach(key => {
            if (counts[key] > 0) {
              averageStats[key] = scores[key] / counts[key];
            }
          });
          setSurveyStats(averageStats);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, statsPath);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userPath = `users/${currentUser.uid}`;
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data() as UserData);
          } else {
            const newUserData = {
              uid: currentUser.uid,
              email: currentUser.email || "",
              generationCount: 0,
              hasCompletedSurvey: false,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };
            await setDoc(userRef, newUserData);
            setUserData(newUserData as any);
          }
          fetchSurveyStats();
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userPath);
        }
      } else {
        setUserData(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const bOptions = Object.keys(kurikulum[tingkatan] || {});
    setBpOptions(bOptions);
    setBp(bOptions[0] || "");
  }, [tingkatan]);

  useEffect(() => {
    if (bp && kurikulum[tingkatan]?.[bp]) {
      const sOptions = Object.keys(kurikulum[tingkatan][bp]);
      setSkOptions(sOptions);
      setSk(sOptions[0] || "");
    } else {
      setSkOptions([]);
      setSk("");
    }
  }, [bp, tingkatan]);

  useEffect(() => {
    if (sk && kurikulum[tingkatan]?.[bp]?.[sk]) {
      const pOptions = kurikulum[tingkatan][bp][sk];
      setSpOptions(pOptions);
      setSelectedSps([pOptions[0] || "", "", "", "", ""]);
    } else {
      setSpOptions([]);
      setSelectedSps(["", "", "", "", ""]);
    }
  }, [sk, bp, tingkatan]);

  const handleGenerateRPH = async () => {
    if (userData && userData.generationCount >= 5 && !userData.hasCompletedSurvey) {
      if (surveyQuestions.length === 0) {
        const shuffled = [...SURVEY_ITEMS].sort(() => 0.5 - Math.random());
        setSurveyQuestions(shuffled.slice(0, 5));
      }
      setShowSurvey(true);
      return;
    }

    const hasSp = selectedSps.some(sp => sp !== "") || customSp.trim() !== "";
    if (!bp || !sk || !hasSp) {
      setError("Sila pilih Bidang Pembelajaran, Standard Kandungan dan sekurang-kurangnya satu Standard Pembelajaran terlebih dahulu.");
      return;
    }

    let currentGenerationCount = 0;
    if (userData) {
      currentGenerationCount = userData.generationCount + 1;
      setUserData({ ...userData, generationCount: currentGenerationCount });
      const userPath = `users/${userData.uid}`;
      try {
        const userRef = doc(db, "users", userData.uid);
        await updateDoc(userRef, { 
          generationCount: increment(1),
          updatedAt: serverTimestamp()
        });
      } catch(err) {
        handleFirestoreError(err, OperationType.UPDATE, userPath);
      }
    }

    const randomProduct = PRODUCTS_DATA[Math.floor(Math.random() * PRODUCTS_DATA.length)];
    setFeaturedProduct(randomProduct);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    setIsLoading(true);
    setError(null);
    setRphOutput("");
    setIsCopied(false);

    const selectedBBMs = Object.entries(bbm)
      .filter(([key, value]) => value && key !== "Lain-lain")
      .map(([key]) => {
        if (key === "Nota") return language === "English (DLP)" ? "Notes" : "Nota";
        if (key === "Kertas A4") return language === "English (DLP)" ? "A4 Paper" : "Kertas A4";
        if (key === "Projector") return language === "English (DLP)" ? "Projector" : "Projektor";
        if (key === "Modul") return language === "English (DLP)" ? "Module" : "Modul";
        return key;
      });
    if (bbm["Lain-lain"] && lainLainText.trim()) {
      selectedBBMs.push(lainLainText.trim());
    }
    const bbmString = selectedBBMs.length > 0 ? selectedBBMs.join(", ") : language === "English (DLP)" ? "Not specified" : "Tidak spesifik";

    const bpIndex = bpOptions.indexOf(bp);
    const skIndex = skOptions.indexOf(sk);
    
    const enBpName = Object.keys(kurikulumEn[tingkatan] || {})[bpIndex];
    const enSkName = Object.keys(kurikulumEn[tingkatan]?.[enBpName] || {})[skIndex];
    
    const usedBp = language === "English (DLP)" ? enBpName : bp;
    const usedSk = language === "English (DLP)" ? enSkName : sk;

    const usedSpsList = selectedSps.filter(s => s !== "").map(s => {
        const spIndex = spOptions.indexOf(s);
        return language === "English (DLP)" ? kurikulumEn[tingkatan]?.[enBpName]?.[enSkName]?.[spIndex] : s;
    });
    if (customSp.trim() !== "") {
      usedSpsList.push(customSp.trim());
    }
    
    const usedSpString = usedSpsList.map((s, i) => `${i + 1}. ${s}`).join("\n");
    const usedTingkatan = language === "English (DLP)" ? (tingkatan === 'Tingkatan 4' ? 'Form 4' : 'Form 5') : tingkatan;

    const systemInstruction = language === "English (DLP)" 
      ? "Anda ialah pakar pendidikan Fizik yang mereka bentuk Rancangan Pengajaran Harian (RPH) profesional untuk guru-guru Malaysia mengikut format KSSM (Dual Language Programme)."
      : "Anda ialah pakar pendidikan Fizik yang mereka bentuk Rancangan Pengajaran Harian (RPH) profesional untuk guru-guru Malaysia mengikut format KSSM.";
      
    const pdpInstruction = language === "English (DLP)" 
      ? (pdpActivity === "Eksperimen" ? "- IMPORTANT: This lesson MUST be an Experiment-based class. You MUST include a specific list of APPARATUS & MATERIALS (Radas & Bahan) before or within the Explore phase. The detailed experiment procedures must be included in the phase activities." : "- This lesson does NOT include full-scale experiments. Focus on light hands-on activities, discussions, or theory.")
      : (pdpActivity === "Eksperimen" ? "- PENTING: Aktiviti PdP ini MESTI berkonsepkan Eksperimen penuh. Jadi, anda WAJIB memasukkan senarai RADAS & BAHAN eksperimen yang spesifik dan tepat. Bahagian langkah/prosedur eksperimen wajib diintegrasikan dalam fasa yang bersesuaian (contoh: Fasa Penerokaan)." : "- Aktiviti PdP ini adalah secara teori / hands-on ringan sahaja tanpa eksperimen berskala penuh.");
    
    const timeInEng = pdpTime === "30 minit" ? "30 minutes" : pdpTime === "1 jam" ? "1 hour" : "1 hour 30 minutes";
    const usedPdpTime = language === "English (DLP)" ? timeInEng : pdpTime;

    const suggestedActivityInstruction = suggestedActivity.trim() !== ""
      ? `- Terdapat cadangan aktiviti khusus dari pengguna: "${suggestedActivity}". WAJIB integrasikan cadangan ini ke dalam aktiviti PdP. / There is a specific activity suggestion from the user: "${suggestedActivity}". MUST integrate this suggestion into the PdP activities.`
      : "";

    const userPrompt = `Create a 5E instructional lesson plan (Engage-Pelibatan, Explore-Penerokaan, Explain-Penerangan, Elaborate-Pengembangan, Evaluate-Penilaian) based on with fun hands-on activities (duration about ${usedPdpTime}) based on these ${usedTingkatan} Physics topics:

Bidang Pembelajaran ${language === "English (DLP)" ? "(Learning Area)" : ""}:
${usedBp}

Standard Kandungan ${language === "English (DLP)" ? "(Content Standard)" : ""}:
${usedSk}

Standard Pembelajaran ${language === "English (DLP)" ? "(Learning Standard)" : ""}:
${usedSpString}

PENTING: Format output mestilah tepat seperti berikut:

1. BAHAGIAN ATAS (Maklumat Asas):
Mesti tulis dalam baris yang berasingan (one line for each). Gunakan jarak 2 baris (double newline) antara setiap maklumat supaya nampak kemas:

${language === "English (DLP)" ? "Physics" : "Fizik"}: ${usedTingkatan}

${language === "English (DLP)" ? "Learning Area" : "Bidang Pembelajaran"}: ${usedBp}

${language === "English (DLP)" ? "Content Standard" : "Standard Kandungan"}: ${usedSk}

${language === "English (DLP)" ? "Learning Standard" : "Standard Pembelajaran"}: 
${usedSpString}

JANGAN letak maklumat masa atau tempoh pembelajaran (cth: 30 minit / 1 jam) di bahagian ini.

2. OBJEKTIF PEMBELAJARAN / LEARNING OBJECTIVES:
Sediakan objektif pembelajaran berdasarkan kriteria ABCD (Audien, Behaviour, Condition, Degree).
Keep in memory to not write the output of these words in the objective: "(tingkah laku)", "(situasi)", "(aras)", "(behaviour)", "(condition)", "(degree)".

3. FASA 5E / 5E PHASES (Pelibatan/Engage, Penerokaan/Explore, Penerangan/Explain, Pengembangan/Elaborate, Penilaian/Evaluate):
- Setiap fasa MESTI dimulakan dengan header "Fasa [Nama Fasa]:" atau "Phase [Phase Name]:" jika dalam BI.
- Aktiviti di dalam setiap fasa MESTI ditulis dalam bentuk senarai bernombor (1. 2. 3. ...).

ARAHAN TAMBAHAN:
- RPH yang dijana WAJIB menggunakan KESEMUA yang diinput dari bahagian Standard Pembelajaran di atas. / The generated lesson plan MUST use ALL of the inputted Learning Standards above.
${pdpInstruction}
${suggestedActivityInstruction}
- DO NOT provide minutes for each phase.
- Make sure the activities are centred using these teaching aids (Bahan Bantu Mengajar): ${bbmString}. YOU MUST USE THESE TOOLS IN THE ACTIVITIES.
- Any equation just used normal font instead math font.
- Do not include "Tujuan" or "Purpose" for each phase.
- Make sure all the phrases are in Simple Future Tense.
- Start each activity with "Murid...." / "Students will..." (Contoh: 1. Murid akan memerhatikan... / 1. Students will observe...).
- Untuk Fasa Penilaian (Evaluate), sediakan bilangan soalan yang spesifik dan boleh diukur (contoh: "Murid menjawab 5 soalan tentang..."). Jangan gunakan perkataan "beberapa" atau "some".
- ALL in ${language === "English (DLP)" ? "English" : "Bahasa Melayu (Malaysia)"}.
- Jangan letak "────────────────────────────" atau "======".
- Jangan sesekali guna "4 in 1 RayRuler Interactive Simulation".
- Semua simbol matematik guna font biasa.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text;
      if (text) {
        setRphOutput(text);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        if (userData && currentGenerationCount === 5 && !userData.hasCompletedSurvey) {
          setTimeout(() => {
            if (surveyQuestions.length === 0) {
              const shuffled = [...SURVEY_ITEMS].sort(() => 0.5 - Math.random());
              setSurveyQuestions(shuffled.slice(0, 5));
            }
            setShowSurvey(true);
          }, 1500);
        }
      } else {
        throw new Error("Respons API tidak sah. Tiada data dikembalikan.");
      }
    } catch (err: any) {
      setError(err?.message || "Ralat tidak dijangka berlaku.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rphOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleSurveySubmit = async () => {
    if (!user || !userData) return;
    setIsSubmittingSurvey(true);
    const surveyPath = `surveys/${user.uid}`;
    const userPath = `users/${user.uid}`;
    const statsPath = "stats/survey";
    
    try {
      const surveyDocRef = doc(db, "surveys", user.uid);
      await setDoc(surveyDocRef, {
        userId: user.uid,
        responses: surveyAnswers,
        createdAt: serverTimestamp()
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { hasCompletedSurvey: true, updatedAt: serverTimestamp() });

      const statsRef = doc(db, "stats", "survey");
      const statsSnap = await getDoc(statsRef);
      if (statsSnap.exists()) {
        const statsData = statsSnap.data();
        const newScores = { ...(statsData.itemScores || {}) };
        const newCounts = { ...(statsData.itemCounts || {}) };
        
        Object.entries(surveyAnswers).forEach(([itemId, rating]) => {
          newScores[itemId] = (newScores[itemId] || 0) + rating;
          newCounts[itemId] = (newCounts[itemId] || 0) + 1;
        });

        await updateDoc(statsRef, {
          itemScores: newScores,
          itemCounts: newCounts,
          updatedAt: serverTimestamp()
        });

        // Update local stats
        const avgStats: Record<string, number> = {};
        Object.keys(newScores).forEach(k => {
          avgStats[k] = newScores[k] / newCounts[k];
        });
        setSurveyStats(avgStats);
      } else {
        const newScores: Record<string, number> = {};
        const newCounts: Record<string, number> = {};
        Object.entries(surveyAnswers).forEach(([itemId, rating]) => {
          newScores[itemId] = rating;
          newCounts[itemId] = 1;
        });
        await setDoc(statsRef, {
          itemScores: newScores,
          itemCounts: newCounts,
          updatedAt: serverTimestamp()
        });
        setSurveyStats(surveyAnswers);
      }

      setUserData({ ...userData, hasCompletedSurvey: true });
      setShowSurvey(false);
    } catch (err) {
      // Logic to determine which path failed if needed, but handleFirestoreError takes the most likely path
      // Practically, we can just log the error with the relevant context
      handleFirestoreError(err, OperationType.WRITE, surveyPath);
    }
    setIsSubmittingSurvey(false);
  };

  const handlePrint = () => {
    if (!rphOutput) return;

    // Parse markdown to HTML
    const htmlContent = marked.parse(rphOutput);
    
    // Create full HTML document string required by html-docx-js
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>PhysRPH+</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              font-size: 11pt;
            }
            h1 { font-size: 18pt; font-weight: bold; margin-bottom: 12pt; }
            h2 { font-size: 14pt; font-weight: bold; margin-top: 16pt; margin-bottom: 8pt; border-bottom: 1px solid #ccc; padding-bottom: 4pt; }
            h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; }
            p { margin-bottom: 10pt; }
            ul, ol { margin-bottom: 10pt; padding-left: 20pt; }
            li { margin-bottom: 4pt; }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin-bottom: 15pt; 
            }
            th, td { 
              border: 1px solid #000; 
              padding: 6pt; 
              text-align: left; 
            }
            th { background-color: #f0f0f0; font-weight: bold; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
    
    // Convert to docx blob
    // @ts-ignore
    const docxBlob = window.htmlDocx.asBlob(fullHtml);
    
    // Format date string for filename (e.g., 25-04-2026)
    const dt = new Date();
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    const dateStr = `${day}-${month}-${year}`;
    
    // Save file
    saveAs(docxBlob, `PhysRPH+ (${dateStr}).docx`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
      {/* Apple-style Global Nav */}
      <nav className="sticky top-0 z-50 h-[44px] w-full bg-[rgba(255,255,255,0.72)] backdrop-blur-md backdrop-saturate-150 border-b border-[rgba(0,0,0,0.16)] flex items-center justify-center px-4 no-print text-xs font-normal">
        <div className="flex w-full max-w-[1000px] items-center justify-between gap-6 px-2 text-[rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-70">
            <span className="font-bold tracking-tight text-[16px] flex items-center">
              PhysRPH<span className="text-[#0071e3]">+</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <span onClick={() => setShowCurriculumModal('Tingkatan 4')} className="cursor-pointer transition-opacity hover:opacity-70 flex flex-col items-center">
              <span>Tingkatan 4</span>
              <span className="text-[9px] italic text-[#86868b] leading-none">Form 4</span>
            </span>
            <span onClick={() => setShowCurriculumModal('Tingkatan 5')} className="cursor-pointer transition-opacity hover:opacity-70 flex flex-col items-center">
              <span>Tingkatan 5</span>
              <span className="text-[9px] italic text-[#86868b] leading-none">Form 5</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span 
              onClick={() => setShowSupport(true)}
              className="cursor-pointer transition-opacity hover:opacity-70 flex items-center justify-center p-1"
              aria-label="Bantuan / Support"
            >
              <HelpCircle size={20} className="text-[#1d1d1f]" />
            </span>
            {user && (
              <span onClick={logout} className="cursor-pointer transition-opacity hover:opacity-70 flex flex-col items-center ml-2 border-l border-[rgba(0,0,0,0.2)] pl-4">
                <span>Log Keluar</span>
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 md:pt-[100px] md:pb-[80px] no-print">
        <div className="mx-auto max-w-5xl text-center flex flex-col items-center">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-[48px] md:text-[68px] font-bold tracking-tight leading-[1.05] mb-2 flex flex-col items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-[#1d1d1f] via-[#3d3d40] to-[#5a5a5e]">
                PhysRPH<span className="text-[#0071e3] font-black">+</span>
              </span>
            </h1>
            <p className="text-[16px] md:text-[18px] font-semibold text-[#8a2be2] uppercase tracking-[0.2em] mt-1 mb-2">
              <span className="text-[#0071e3] font-bold">Supercharge</span> Physics Lesson Plan with AI
            </p>
          </div>
          
          <div className="w-full mt-6 mb-10 text-left">
            <h2 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f] mb-6 px-4 md:px-0">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e55d04] to-[#ff3b5c]">The latest.</span> Recommended by Sir Halim.
            </h2>
            
            <div className="flex overflow-x-auto pb-8 pt-4 px-4 md:px-0 gap-5 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {PRODUCTS_DATA.map(p => (
                <a href={p.link} target="_blank" rel="noopener noreferrer" key={p.title} className={`snap-always snap-start block shrink-0 w-[280px] h-[380px] rounded-[24px] overflow-hidden relative shadow-[2px_4px_12px_rgba(0,0,0,0.08)] ${p.bgClass} flex flex-col hover:scale-[1.02] transition-transform duration-300 cursor-pointer group`}>
                  <div className="p-6 relative z-10 flex flex-col items-start w-full text-left pb-4">
                    {p.badge && <span className="text-[10px] font-bold tracking-widest uppercase mb-3 text-white mix-blend-overlay">{p.badge}</span>}
                    <h3 className={`text-[22px] font-bold tracking-tight leading-tight mb-2 ${p.textClass}`}>{p.title}</h3>
                  </div>
                  <div className="flex-1 w-full pb-6 px-6 flex items-center justify-center pointer-events-none relative z-10">
                    {p.imgSrc ? (
                      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                        <img 
                          src={p.imgSrc} 
                          alt={p.title} 
                          className="w-full h-full object-contain rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)]" 
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }} 
                        />
                      </div>
                    ) : null}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {authLoading ? (
        <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
          <div className="w-10 h-10 border-4 border-[#0071e3] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#86868b] font-medium">Memuatkan... / Loading...</p>
        </div>
      ) : !user ? (
        <div className="mx-auto max-w-xl px-4 py-16 mb-24 text-center bg-white rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e8e8ed]">
          <h2 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-4">
            Log Masuk untuk Mula
          </h2>
          <p className="text-[17px] text-[#86868b] mb-10 max-w-md mx-auto">
            Log masuk menggunakan akaun Google untuk mencipta RPH Fizik yang pantas, mudah dan tepat.
          </p>
          <button
            onClick={signInWithGoogle}
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#1d1d1f] text-white text-[17px] font-medium hover:bg-[#333336] transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Log Masuk dengan Google
          </button>
        </div>
      ) : (
      <main className="mx-auto max-w-[1200px] px-4 pb-24" id="config-section">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Configuration Column */}
          <div className="w-full lg:w-[45%] flex-shrink-0 space-y-6 no-print lg:sticky lg:top-[80px]">
            <div className="mb-6">
              <h2 className="text-[32px] md:text-[38px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-2">
                Reka Bentuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#8a2be2]">RPH</span> Fizik Anda
              </h2>
              <p className="text-[16px] md:text-[18px] font-medium text-[#86868b]">
                Design Your Physics Lesson Plan
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.02)] space-y-0 relative overflow-hidden">
              {/* Pilihan Bahasa RPH */}
              <AccordionSelect 
                label="Pilihan Bahasa RPH"
                subtitle="Language Preference"
                value={language}
                options={[
                  { value: "Bahasa Melayu", label: "Bahasa Melayu" },
                  { value: "English (DLP)", label: "English (DLP)" }
                ]}
                onChange={(val) => setLanguage(val as "Bahasa Melayu" | "English (DLP)")}
              />

              {/* Tingkatan */}
              <AccordionSelect 
                label="Tingkatan"
                subtitle="Form"
                value={tingkatan}
                options={[
                  { value: "Tingkatan 4", label: "Tingkatan 4 / Form 4" },
                  { value: "Tingkatan 5", label: "Tingkatan 5 / Form 5" }
                ]}
                onChange={(val) => setTingkatan(val)}
              />

              {/* Bidang Pembelajaran */}
              <AccordionSelect 
                label="Bidang Pembelajaran"
                subtitle="Learning Area"
                value={bp}
                options={bpOptions.map((option, idx) => ({
                  value: option,
                  label: `${option} / ${Object.keys(kurikulumEn[tingkatan] || {})[idx]}`
                }))}
                onChange={(val) => setBp(val)}
              />

              {/* Standard Kandungan */}
              <AccordionSelect 
                label="Standard Kandungan"
                subtitle="Content Standard"
                value={sk}
                options={skOptions.map((option, idx) => {
                  const bpIndex = bpOptions.indexOf(bp);
                  const enBp = Object.keys(kurikulumEn[tingkatan] || {})[bpIndex];
                  const enOpt = Object.keys(kurikulumEn[tingkatan]?.[enBp] || {})[idx];
                  return {
                    value: option,
                    label: `${option} / ${enOpt}`
                  };
                })}
                onChange={(val) => setSk(val)}
              />

              {/* Standard Pembelajaran */}
              <div className="w-full">
                {[0, 1, 2, 3, 4].map((index) => {
                  return (
                    <AccordionSelect 
                      key={index}
                      label={`Standard Pembelajaran ${index + 1}`}
                      subtitle={`Learning Standard ${index + 1}`}
                      value={selectedSps[index]}
                      emptyText="- Tiada / None -"
                      options={spOptions.map((option, idx) => {
                        const bpIndex = bpOptions.indexOf(bp);
                        const skIndex = skOptions.indexOf(sk);
                        const enBp = Object.keys(kurikulumEn[tingkatan] || {})[bpIndex];
                        const enSk = Object.keys(kurikulumEn[tingkatan]?.[enBp] || {})[skIndex];
                        const enOpt = kurikulumEn[tingkatan]?.[enBp]?.[enSk]?.[idx];
                        return {
                          value: option,
                          label: `${option} / ${enOpt}`
                        };
                      })}
                      onChange={(val) => {
                        const newSps = [...selectedSps];
                        newSps[index] = val;
                        setSelectedSps(newSps);
                      }}
                    />
                  );
                })}
                
                <div className="relative group mt-6 border-b border-[#d2d2d7] pb-6">
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-tight text-[#1d1d1f]">Tuliskan Standard Pembelajaran <span className="text-[10px] italic font-normal text-[#86868b]">Write Learning Standard</span></label>
                  <textarea
                    className="w-full rounded-[12px] border border-[#d2d2d7] bg-[rgba(255,255,255,0.8)] py-3 px-4 text-[15px] font-normal text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none hover:border-[#1d1d1f] placeholder-[#86868b]"
                    placeholder={language === "English (DLP)" ? "Type your custom Learning Standard here..." : "Taipkan Standard Pembelajaran tambahan anda di sini..."}
                    value={customSp}
                    onChange={(e) => setCustomSp(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#d2d2d7]/40 w-full">
                <AccordionSelect 
                  label="Aktiviti PdP"
                  subtitle="PdP Activity"
                  value={pdpActivity}
                  options={[
                    { value: "Tanpa Eksperimen", label: "Tanpa Eksperimen / Without Experiment" },
                    { value: "Eksperimen", label: "Eksperimen / Experiment" }
                  ]}
                  onChange={(val) => setPdpActivity(val as "Tanpa Eksperimen" | "Eksperimen")}
                />

                <AccordionSelect 
                  label="Pilihan Masa PdP"
                  subtitle="PdP Duration"
                  value={pdpTime}
                  options={[
                    { value: "30 minit", label: "30 minit" },
                    { value: "1 jam", label: "1 jam" },
                    { value: "1 jam 30 minit", label: "1 jam 30 minit" }
                  ]}
                  onChange={(val) => setPdpTime(val)}
                />

                <div className="border-b border-[#d2d2d7] py-4 w-full">
                  <div className="pr-4 py-1 mb-3 block">
                    <span className="block text-[17px] font-semibold text-[#1d1d1f] leading-tight">
                      Bahan Bantu Mengajar
                      <span className="text-[12px] italic font-normal text-[#86868b] ml-2">Teaching Aids</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-1">
                    {(["Nota", "Kertas A4", "Projector", "Modul", "Lain-lain"] as const).map((item) => {
                      const labelText = item === "Nota" ? "Nota" : 
                                       item === "Kertas A4" ? "Kertas A4" : 
                                       item === "Projector" ? "Projektor" : 
                                       item === "Modul" ? "Modul" : "Lain-lain";
                      const subtitleText = item === "Nota" ? "Notes" : 
                                       item === "Kertas A4" ? "A4 Paper" : 
                                       item === "Projector" ? "Projector" : 
                                       item === "Modul" ? "Module" : "Others";
                      return (
                      <label key={item} className="flex items-center gap-3 p-3 rounded-[12px] cursor-pointer group hover:bg-[#f5f5f7] transition-colors -ml-3">
                        <div className="relative flex items-center justify-center shrink-0">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-[20px] h-[20px] rounded-[6px] border border-[#d2d2d7] bg-white checked:bg-[#0071e3] checked:border-[#0071e3] transition-colors cursor-pointer outline-none ring-offset-1 focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                            checked={bbm[item as keyof typeof bbm]}
                            onChange={(e) => setBbm(prev => ({ ...prev, [item]: e.target.checked }))}
                          />
                          <Check size={14} className="absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                        </div>
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className={`text-[15px] select-none ${bbm[item as keyof typeof bbm] ? 'font-medium text-[#1d1d1f]' : 'font-normal text-[#1d1d1f]'}`}>{labelText}</span>
                          <span className="text-[12px] italic font-normal text-[#86868b] select-none">{subtitleText}</span>
                        </div>
                      </label>
                    )})}
                </div>
                {bbm["Lain-lain"] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Sila nyatakan... (Please specify...)"
                      value={lainLainText}
                      onChange={(e) => setLainLainText(e.target.value)}
                      className="w-full rounded-[12px] border border-[#d2d2d7] bg-[rgba(255,255,255,0.8)] p-3 text-[15px] font-normal transition-all focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none"
                    />
                  </motion.div>
                )}
                </div>

                <div className="mt-6 border-t border-[#d2d2d7]/40 pt-4">
                  <label className="mb-1.5 block text-[12px] font-semibold tracking-tight text-[#1d1d1f]">
                    Cadangan aktiviti untuk diintegrasikan <span className="text-[10px] italic font-normal text-[#86868b]">Suggested activities to integrate</span>
                  </label>
                  <textarea
                    className="w-full rounded-[12px] border border-[#d2d2d7] bg-[rgba(255,255,255,0.8)] py-3 px-4 text-[15px] font-normal text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] outline-none hover:border-[#1d1d1f] placeholder-[#86868b]"
                    placeholder={language === "English (DLP)" ? "Type your activity suggestions here..." : "Taipkan cadangan aktiviti anda di sini..."}
                    value={suggestedActivity}
                    onChange={(e) => setSuggestedActivity(e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleGenerateRPH}
                disabled={isLoading}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-[14px] px-6 text-[15px] font-normal tracking-[-0.01em] transition-all ${
                  isLoading 
                    ? 'bg-[#e8e8ed] text-[#86868b] cursor-not-allowed' 
                    : 'bg-[#0071e3] text-white hover:bg-[#0077ED] active:bg-[#0060C0] shadow-sm'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
                    <div className="flex flex-col items-center px-2">
                       <span>Menjana...</span>
                       <span className="text-[10px] italic font-normal opacity-80 leading-tight">Generating...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <div className="flex flex-col items-center">
                       <span>Jana Rancangan Pengajaran</span>
                       <span className="text-[10px] italic font-normal opacity-80 leading-tight">Generate Lesson Plan</span>
                    </div>
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-3 rounded-[12px] bg-[#fff5f5] p-4 border border-[#ffcfcf]"
                >
                  <AlertCircle size={18} className="text-[#e30000] mt-0.5 shrink-0" />
                  <p className="text-[13px] leading-relaxed text-[#8a0000]">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Result Column */}
          <div className="w-full lg:w-[55%] flex-grow" ref={resultRef}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[600px] flex-col rounded-[24px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[rgba(0,0,0,0.02)] overflow-hidden print:shadow-none print:border-none"
            >
              <div className="flex items-center justify-between border-b border-[#f5f5f7] px-8 py-5 bg-[rgba(255,255,255,0.8)] backdrop-blur-md sticky top-[44px] z-40 no-print">
                <div>
                  <h3 className="text-[19px] font-semibold tracking-tight">Draf RPH Fizik Anda <span className="text-[14px] italic font-normal text-[#86868b]">Your Physics Lesson Plan Draft</span></h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopy}
                    disabled={!rphOutput}
                    className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-all hover:bg-[#e8e8ed] active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Copy"
                  >
                    {isCopied ? <Check size={16} className="text-[#0071e3]" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={handlePrint}
                    disabled={!rphOutput}
                    className="flex items-center justify-center w-[36px] h-[36px] rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-all hover:bg-[#e8e8ed] active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Print"
                  >
                    <Printer size={16} />
                  </button>
                </div>
              </div>

              <div className="grow p-8 md:p-12 text-[#1d1d1f] print:p-0">
                {!rphOutput && !isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center text-center space-y-4 text-[#86868b] min-h-[400px] no-print">
                     <Sparkles size={40} className="mb-2 opacity-50" strokeWidth={1.5} />
                    <p className="text-[17px] font-medium text-[#1d1d1f]">Sedia apabila anda sedia. <br/><span className="text-[14px] italic font-normal text-[#86868b]">Ready when you are.</span></p>
                    <p className="text-[14px]">Sila buat tetapan di panel sebelah kiri dan jana draf RPH Fizik anda. <br/><span className="text-[12px] italic text-[#86868b]">Please configure options on the left and generate your Physics lesson plan draft.</span></p>
                  </div>
                ) : isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center space-y-8 text-[#86868b] min-h-[400px] no-print py-10">
                    <div className="flex flex-col items-center justify-center space-y-5">
                       <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-16 h-16 rounded-full border-2 border-[#e8e8ed] bg-[#f5f5f7] flex items-center justify-center"
                       >
                         <Sparkles size={24} className="text-[#0071e3]" />
                       </motion.div>
                      <p className="text-[14px] font-medium text-center">Membentuk kecemerlangan... <br/><span className="text-[12px] italic font-normal text-[#86868b]">Crafting brilliance...</span></p>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="w-full max-w-xl bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#e8e8ed] relative overflow-hidden mt-4"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#8a2be2]/10 to-transparent rounded-bl-full pointer-events-none" />
                      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8 relative z-10">
                        <div className="w-[140px] h-[186px] bg-[#f5f5f7] rounded-[12px] shadow-md border border-[#d2d2d7] overflow-hidden flex-shrink-0">
                          <img src={featuredProduct.imgSrc} alt={featuredProduct.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center text-center sm:text-left">
                          <div className="mb-5">
                            <div className="text-[12px] font-bold tracking-wider text-[#8a2be2] mb-2 uppercase">PILIHAN SIR HALIM</div>
                            <h4 className="text-[22px] font-semibold text-[#1d1d1f] leading-tight mb-3 line-clamp-2" title={featuredProduct.title}>{featuredProduct.title}</h4>
                            <p className="text-[15px] text-[#424245] leading-relaxed line-clamp-3" title={featuredProduct.desc}>{featuredProduct.desc}</p>
                          </div>
                          <a href={featuredProduct.link} target="_blank" rel="noopener noreferrer" className="inline-block text-[15px] font-medium text-white bg-[#1d1d1f] px-6 py-3 rounded-full hover:bg-[#424245] transition-colors self-center sm:self-start shadow-sm">
                            {featuredProduct.buyText}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="prose prose-neutral max-w-none text-justify print:prose-sm">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ ...props }) => <h1 className="mb-8 mt-2 text-[32px] md:text-[40px] font-semibold tracking-[-0.005em] leading-[1.1] text-[#1d1d1f]" {...props} />,
                        h2: ({ ...props }) => <h2 className="mb-4 mt-12 border-b border-[#f5f5f7] pb-2 text-[24px] font-semibold tracking-tight text-[#1d1d1f]" {...props} />,
                        h3: ({ ...props }) => <h3 className="mb-3 mt-8 text-[19px] font-semibold tracking-tight text-[#1d1d1f]" {...props} />,
                        strong: ({ ...props }) => <strong className="font-semibold text-[#1d1d1f]" {...props} />,
                        li: ({ ...props }) => <li className="mb-2 ml-4 text-[15px] leading-relaxed" {...props} />,
                        ol: ({ ...props }) => <ol className="list-decimal mb-6 pl-4" {...props} />,
                        ul: ({ ...props }) => <ul className="list-disc mb-6 pl-4" {...props} />,
                        p: ({ ...props }) => <p className="mb-5 text-[15px] leading-[1.47059] font-normal text-[#1d1d1f]" {...props} />,
                      }}
                    >
                      {rphOutput}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      )}

      {/* Footer Section */}
      <footer className="relative mt-20 pb-10 w-full overflow-hidden">
        {/* Transparent World Map Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] opacity-[0.15] pointer-events-none z-0" style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(surveyStats).length > 0 && (
            <div className="max-w-xl mx-auto mb-16 px-4">
              <h3 className="text-center text-[18px] font-semibold text-[#1d1d1f] mb-8">
                Maklum Balas Pengguna <span className="text-[#86868b] font-normal italic text-[14px]">User Feedback</span>
              </h3>
              <div className="space-y-5">
                {SURVEY_ITEMS.slice(0, 5).map(item => {
                  const score = surveyStats[item.id] || 0;
                  const percentage = Math.min((score / 5) * 100, 100);
                  return (
                    <div key={item.id} className="w-full">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[14px] font-medium text-[#1d1d1f]">{language === "English (DLP)" ? item.textEn : item.textBm}</span>
                        <span className="text-[13px] font-bold text-[#0071e3]">{score > 0 ? score.toFixed(1) : '-'} <span className="text-[#86868b] font-normal text-[11px]">/ 5</span></span>
                      </div>
                      <div className="h-2 w-full bg-[#f5f5f7] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0071e3] transition-all duration-1000 ease-out rounded-full" 
                          style={{ width: `${score > 0 ? percentage : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center mb-10">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[rgba(0,0,0,0.1)] max-w-[150px]"></div>
            <h3 className="px-6 text-[13px] font-bold tracking-[0.2em] text-[#1d1d1f] uppercase flex items-center gap-2">
              Statistik Pelawat <span className="font-medium italic text-[#86868b] normal-case tracking-normal text-[14px]">Visitor Stats</span>
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[rgba(0,0,0,0.1)] max-w-[150px]"></div>
          </div>

          <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e8e8ed] relative overflow-hidden">
            {/* Subtle map pattern using radial gradients to mimic world map dots inside the card as well */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="flex flex-col items-center relative z-10 text-center">
            <div className="flex items-center justify-center gap-2.5 mb-6 bg-[#f0fdf4] px-4 py-1.5 rounded-full border border-[#bbf7d0]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              <span className="text-[11px] font-bold tracking-widest text-[#059669] uppercase">Sedang Aktif</span>
            </div>
            
            <div className="text-[96px] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-br from-[#0071e3] via-[#8a2be2] to-[#ff3b5c] mb-2 tracking-tighter" style={{ textShadow: '0 10px 30px rgba(138,43,226,0.15)' }}>
              8
            </div>
            <div className="text-[15px] font-medium text-[#1d1d1f] mb-10 flex items-center gap-1.5">
              Jumlah Akses <span className="italic font-normal text-[#86868b]">Total Access</span>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8e8ed] to-transparent mb-10"></div>

            <div className="text-[12px] font-bold tracking-[0.2em] text-[#86868b] uppercase mb-6 flex items-center gap-2">
              Lokasi Pelawat <span className="italic font-medium normal-case tracking-normal">Visitor Locations</span>
            </div>

            {/* Flag counter */}
            <a href="https://info.flagcounter.com/Y3h1" target="_blank" rel="noopener noreferrer" className="block rounded-[12px] overflow-hidden border border-[#e8e8ed] shadow-sm hover:shadow-md transition-shadow bg-white p-2 group">
              <img src="https://s11.flagcounter.com/count2/Y3h1/bg_FFFFFF/txt_1d1d1f/border_FFFFFF/columns_2/maxflags_10/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" className="w-full max-w-[200px] opacity-90 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        <div className="mt-16 text-center space-y-1.5">
          <p className="text-[15px] font-semibold text-[#1d1d1f]">
            © {new Date().getFullYear()} PhysRPH+ by Sir Halim.
          </p>
          <p className="text-[13px] text-[#86868b] italic">
            Hak Cipta Terpelihara (All Rights Reserved).
          </p>
        </div>
        </div>
      </footer>

      {/* Curriculum Modal */}
      {/* Modals Support / Curriculum */}
      <AnimatePresence>
        {showSurvey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-[#f5f5f7] bg-[rgba(255,255,255,0.9)] backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-[24px] font-bold tracking-tight text-[#1d1d1f]">Maklum Balas PhysRPH+</h3>
                  <p className="text-[14px] text-[#86868b] mt-1">Sila lengkapkan soal selidik ringkas ini untuk meneruskan / Please complete this brief survey to continue</p>
                </div>
              </div>
              <div className="p-8 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                <div className="space-y-8">
                  {surveyQuestions.map((q, idx) => (
                    <div key={q.id} className="space-y-3">
                      <p className="text-[15px] font-semibold text-[#1d1d1f]">
                        {idx + 1}. {language === "English (DLP)" ? q.textEn : q.textBm}
                      </p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setSurveyAnswers(prev => ({ ...prev, [q.id]: rating }))}
                            className={`flex-1 h-12 rounded-[12px] border font-medium text-[15px] transition-all ${
                              surveyAnswers[q.id] === rating 
                                ? 'bg-[#0071e3] border-[#0071e3] text-white shadow-sm' 
                                : 'bg-white border-[#d2d2d7] text-[#1d1d1f] hover:border-[#0071e3]/50 hover:bg-[#f5f5f7]'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-[11px] text-[#86868b] uppercase tracking-wider font-semibold">
                        <span>{language === "English (DLP)" ? "Strongly Disagree" : "Sangat Tidak Bersetuju"}</span>
                        <span>{language === "English (DLP)" ? "Strongly Agree" : "Sangat Bersetuju"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-[#f5f5f7] bg-[#f5f5f7] flex justify-end">
                <button
                  onClick={handleSurveySubmit}
                  disabled={surveyQuestions.some(q => !surveyAnswers[q.id]) || isSubmittingSurvey}
                  className="px-8 py-3 bg-[#1d1d1f] text-white text-[15px] font-medium rounded-full hover:bg-[#333336] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmittingSurvey ? "Menghantar... / Submitting..." : "Hantar Maklum Balas / Submit Feedback"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showSupport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowSupport(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm overflow-hidden bg-[rgba(255,255,255,0.95)] backdrop-blur-xl rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/50 p-6 text-center"
            >
              <div className="mx-auto w-12 h-12 bg-[#e8f2fc] rounded-full flex items-center justify-center mb-4">
                <HelpCircle size={24} className="text-[#0071e3]" />
              </div>
              <h3 className="text-[19px] font-semibold text-[#1d1d1f] tracking-tight mb-2">Bantuan & Cadangan</h3>
              <p className="text-[15px] font-normal text-[#424245] leading-relaxed mb-6">
                Sebarang masalah atau cadangan sila ajukan kepada Sir Halim melalui Telegram.
              </p>
              <a 
                href="https://t.me/halimroslan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-[12px] bg-[#0071e3] px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-[#0077ED] mb-3"
                onClick={() => setShowSupport(false)}
              >
                @halimroslan (Telegram)
              </a>
              <button
                onClick={() => setShowSupport(false)}
                className="w-full py-3 text-[15px] font-medium text-[#0071e3] transition-all hover:bg-[#f5f5f7] rounded-[12px]"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}

        {showCurriculumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setShowCurriculumModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#f5f5f7] w-full max-w-4xl max-h-[90vh] rounded-[24px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-[#d2d2d7]/50 bg-[rgba(255,255,255,0.8)] backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-[24px] font-semibold tracking-tight text-[#1d1d1f] leading-tight">
                  Bidang Pembelajaran, Standard Kandungan, Standard Pembelajaran {showCurriculumModal} <br />
                  <span className="text-[16px] italic font-normal text-[#86868b]">Learning Area, Content Standard, Learning Standard {showCurriculumModal === 'Tingkatan 4' ? 'Form 4' : 'Form 5'}</span>
                </h2>
                <button
                  onClick={() => setShowCurriculumModal(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e8e8ed] text-[#1d1d1f] hover:bg-[#d2d2d7] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto p-6 md:p-8 flex-1" style={{ scrollbarWidth: 'none' }}>
                {Object.entries(kurikulum[showCurriculumModal] || {}).map(([bpName, skObj], bpIdx) => {
                  const enBpName = Object.keys(kurikulumEn[showCurriculumModal] || {})[bpIdx];
                  return (
                  <div key={bpName} className="mb-8 last:mb-0">
                    <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-4 pb-2 border-b border-[#d2d2d7]/40">
                      {bpName} <span className="text-[16px] italic text-[#86868b] font-normal">/ {enBpName}</span>
                    </h3>
                    <div className="space-y-6">
                      {Object.entries(skObj).map(([skName, spList], skIdx) => {
                        const enSkName = Object.keys(kurikulumEn[showCurriculumModal]?.[enBpName] || {})[skIdx];
                        return (
                        <div key={skName} className="pl-4 md:pl-6 border-l-2 border-[#0071e3]/30">
                          <h4 className="text-[16px] font-medium text-[#1d1d1f] mb-3">
                            {skName} <span className="text-[14px] italic text-[#86868b] font-normal">/ {enSkName}</span>
                          </h4>
                          <ul className="space-y-2">
                            {spList.map((spItem, spIdx) => {
                              const enSpItem = kurikulumEn[showCurriculumModal]?.[enBpName]?.[enSkName]?.[spIdx];
                              return (
                              <li key={spIdx} className="text-[14px] text-[#424245] flex items-start">
                                <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-[#86868b] flex-shrink-0"></span>
                                <div>
                                  <span>{spItem}</span>
                                  {enSpItem && <div className="italic text-[#86868b] text-[13px] mt-0.5">{enSpItem}</div>}
                                </div>
                              </li>
                              );
                            })}
                          </ul>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

