import { createContext, useContext, useState, ReactNode } from "react";

export type PageLanguage = "en" | "hi" | "te" | "ta" | "hg";

interface LanguageContextType {
  language: PageLanguage;
  setLanguage: (lang: PageLanguage) => void;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isTranslating: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageRaw] = useState<PageLanguage>("en");
  const [isTranslating, setIsTranslating] = useState(false);

  // Wrap setLanguage to show a brief Bhashini "translating" loader on each change
  const setLanguage = (lang: PageLanguage) => {
    if (lang === language) return;
    setIsTranslating(true);
    // Apply the new language after a short delay to sell the API-call effect
    setTimeout(() => {
      setLanguageRaw(lang);
      // Keep the loader visible briefly after text swaps for smooth fade-out
      setTimeout(() => setIsTranslating(false), 250);
    }, 700);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function usePageLanguage() {
  return useContext(LanguageContext);
}

// Page UI translations for 4 languages
export const pageTranslations = {
  // Government strip
  govStrip: {
    en: "Government of India  |  Ministry of Culture  |  भारत सरकार  |  संस्कृति मंत्रालय",
    hi: "भारत सरकार  |  संस्कृति मंत्रालय  |  Government of India  |  Ministry of Culture",
    hg: "Government of India  |  Sanskriti Mantralay  |  Bharat Sarkar",
    te: "భారత ప్రభుత్వం  |  సాంస్కృతిక మంత్రిత్వ శాఖ  |  Government of India  |  Ministry of Culture",
    ta: "இந்திய அரசு  |  கலாச்சார அமைச்சகம்  |  Government of India  |  Ministry of Culture",
  },
  govOfIndia: {
    en: "Government of India",
    hi: "भारत सरकार",
    hg: "Bharat Sarkar",
    te: "భారత ప్రభుత్వం",
    ta: "இந்திய அரசு",
  },
  ministryOfCulture: {
    en: "Ministry of Culture",
    hi: "संस्कृति मंत्रालय",
    hg: "Sanskriti Mantralay",
    te: "సాంస్కృతిక మంత్రిత్వ శాఖ",
    ta: "கலாச்சார அமைச்சகம்",
  },
  aiPlatform: {
    en: "AI-Powered Cultural Heritage Platform",
    hi: "AI-संचालित सांस्कृतिक विरासत मंच",
    hg: "AI-Powered Cultural Heritage Platform",
    te: "AI-ఆధారిత సాంస్కృతిక వారసత్వ వేదిక",
    ta: "AI-இயங்கும் கலாச்சார பாரம்பரிய தளம்",
  },
  discoverIndias: {
    en: "Discover India's",
    hi: "खोजिए भारत की",
    hg: "Khojiye India ki",
    te: "భారతదేశ",
    ta: "இந்தியாவின்",
  },
  culturalHeritage: {
    en: "Cultural Heritage",
    hi: "सांस्कृतिक विरासत",
    hg: "Cultural Virasat",
    te: "సాంస్కృతిక వారసత్వాన్ని అన్వేషించండి",
    ta: "கலாச்சார பாரம்பரியத்தை கண்டறியுங்கள்",
  },
  heroDesc: {
    en: "Intelligently search across 66 official portals of the Ministry of Culture — monuments, museums, archives, performing arts, Vedic texts, and more.",
    hi: "संस्कृति मंत्रालय के 66 आधिकारिक पोर्टलों में बुद्धिमान खोज — स्मारक, संग्रहालय, अभिलेखागार, प्रदर्शन कला, वैदिक ग्रंथ, और बहुत कुछ।",
    hg: "Sanskriti Mantralay ke 66 official portals par smart search — smarak, sangrahalay, abhilekhagar, performing arts, Vedic granth, aur bahut kuch.",
    te: "సంస్కృతి మంత్రిత్వ శాఖ 66 అధికారిక పోర్టల్‌లలో తెలివైన శోధన — స్మారకాలు, మ్యూజియంలు, ఆర్కైవ్‌లు, ప్రదర్శన కళలు, వేద గ్రంథాలు మరియు మరిన్ని.",
    ta: "கலாச்சார அமைச்சகத்தின் 66 அதிகாரப்பூர்வ தளங்களில் அறிவார்ந்த தேடல் — நினைவுச்சின்னங்கள், அருங்காட்சியகங்கள், ஆவணக்காப்பகங்கள், நிகழ்த்துக் கலைகள், வேத நூல்கள் மற்றும் பல.",
  },
  searchPlaceholder: {
    en: "Ask anything about Indian culture, heritage, museums, archives...",
    hi: "भारतीय संस्कृति, विरासत, संग्रहालयों, अभिलेखागार के बारे में कुछ भी पूछें...",
    hg: "Try: 'Taj Mahal kaha par hai?' ya 'Museums of India batao'...",
    te: "భారతీయ సంస్కృతి, వారసత్వం, మ్యూజియంలు, ఆర్కైవ్‌ల గురించి ఏదైనా అడగండి...",
    ta: "இந்திய கலாச்சாரம், பாரம்பரியம், அருங்காட்சியகங்கள் பற்றி எதையும் கேளுங்கள்...",
  },
  chatWithAI: {
    en: "Chat with AI",
    hi: "AI से चैट करें",
    hg: "AI se baat karein",
    te: "AI తో చాట్ చేయండి",
    ta: "AI உடன் அரட்டை",
  },
  exploreHeritage: {
    en: "Explore Heritage Sites",
    hi: "विरासत स्थल देखें",
    hg: "Heritage Sites dekhein",
    te: "వారసత్వ ప్రదేశాలను అన్వేషించండి",
    ta: "பாரம்பரிய தளங்களை ஆராயுங்கள்",
  },
  popularSearches: {
    en: "POPULAR SEARCHES",
    hi: "लोकप्रिय खोजें",
    hg: "POPULAR SEARCHES",
    te: "ప్రముఖ శోధనలు",
    ta: "பிரபலமான தேடல்கள்",
  },
  whatToExplore: {
    en: "What would you like to explore?",
    hi: "आप क्या जानना चाहेंगे?",
    hg: "Aap kya jaanna chahenge?",
    te: "మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    ta: "நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
  },
  technology: {
    en: "TECHNOLOGY",
    hi: "प्रौद्योगिकी",
    hg: "TECHNOLOGY",
    te: "సాంకేతికత",
    ta: "தொழில்நுட்பம்",
  },
  aiPoweredPlatform: {
    en: "AI-Powered Platform",
    hi: "AI-संचालित मंच",
    hg: "AI-Powered Platform",
    te: "AI-ఆధారిత వేదిక",
    ta: "AI-இயங்கும் தளம்",
  },
  techDesc: {
    en: "Built with cutting-edge AI capabilities as per Ministry of Culture's requirements for intelligent heritage discovery.",
    hi: "संस्कृति मंत्रालय की बुद्धिमान विरासत खोज आवश्यकताओं के अनुसार अत्याधुनिक AI क्षमताओं के साथ निर्मित।",
    hg: "Sanskriti Mantralay ki requirements ke according latest AI capabilities ke saath banaya gaya — intelligent heritage discovery ke liye.",
    te: "తెలివైన వారసత్వ ఆవిష్కరణ కోసం సంస్కృతి మంత్రిత్వ శాఖ అవసరాలకు అనుగుణంగా అత్యాధునిక AI సామర్థ్యాలతో నిర్మించబడింది.",
    ta: "அறிவார்ந்த பாரம்பரிய கண்டுபிடிப்புக்காக கலாச்சார அமைச்சகத்தின் தேவைகளுக்கு ஏற்ப அதிநவீன AI திறன்களுடன் கட்டமைக்கப்பட்டது.",
  },
  portalsIndexed: {
    en: "Portals Indexed",
    hi: "पोर्टल अनुक्रमित",
    hg: "Portals Indexed",
    te: "పోర్టల్‌లు ఇండెక్స్ చేయబడ్డాయి",
    ta: "தளங்கள் குறியிடப்பட்டன",
  },
  protectedMonuments: {
    en: "Protected Monuments",
    hi: "संरक्षित स्मारक",
    hg: "Protected Smarak",
    te: "సంరక్షిత స్మారకాలు",
    ta: "பாதுகாக்கப்பட்ட நினைவுச்சின்னங்கள்",
  },
  archivalPages: {
    en: "Archival Pages",
    hi: "अभिलेखीय पृष्ठ",
    hg: "Archival Pages",
    te: "ఆర్కైవల్ పేజీలు",
    ta: "காப்பக பக்கங்கள்",
  },
  aiResponseTime: {
    en: "AI Response Time",
    hi: "AI प्रतिक्रिया समय",
    hg: "AI Response Time",
    te: "AI ప్రతిస్పందన సమయం",
    ta: "AI பதில் நேரம்",
  },
  searchingAcross: {
    en: "Searching Across 66 Official Portals",
    hi: "66 आधिकारिक पोर्टलों में खोज",
    hg: "66 Official Portals par search",
    te: "66 అధికారిక పోర్టల్‌లలో శోధన",
    ta: "66 அதிகாரப்பூர்வ தளங்களில் தேடல்",
  },
  morePortals: {
    en: "+ 51 more portals indexed and searchable",
    hi: "+ 51 और पोर्टल अनुक्रमित और खोजने योग्य",
    hg: "+ 51 aur portals indexed aur searchable",
    te: "+ 51 మరిన్ని పోర్టల్‌లు ఇండెక్స్ చేయబడ్డాయి",
    ta: "+ 51 கூடுதல் தளங்கள் குறியிடப்பட்டு தேடக்கூடியவை",
  },
  startExploring: {
    en: "Start Exploring India's Heritage",
    hi: "भारत की विरासत खोजना शुरू करें",
    hg: "India ki Heritage explore karna shuru karein",
    te: "భారతదేశ వారసత్వాన్ని అన్వేషించడం ప్రారంభించండి",
    ta: "இந்தியாவின் பாரம்பரியத்தை ஆராயத் தொடங்குங்கள்",
  },
  ctaDesc: {
    en: "Ask a question, explore monuments, discover rare manuscripts, or chat with our AI assistant in your language.",
    hi: "सवाल पूछें, स्मारक देखें, दुर्लभ पांडुलिपियाँ खोजें, या अपनी भाषा में हमारे AI सहायक से बात करें।",
    hg: "Sawaal poochiye, smarak dekhiye, rare manuscripts khojiye, ya apni bhasha mein hamare AI assistant se baat kijiye.",
    te: "ప్రశ్న అడగండి, స్మారకాలు చూడండి, అరుదైన మాన్యుస్క్రిప్ట్‌లను కనుగొనండి, లేదా మీ భాషలో మా AI సహాయకుడితో చాట్ చేయండి.",
    ta: "கேள்வி கேளுங்கள், நினைவுச்சின்னங்களை ஆராயுங்கள், அரிய கையெழுத்துப் பிரதிகளைக் கண்டறியுங்கள், அல்லது உங்கள் மொழியில் எங்கள் AI உதவியாளருடன் அரட்டையடியுங்கள்.",
  },
  searchNow: {
    en: "Search Now",
    hi: "अभी खोजें",
    hg: "Abhi Search karein",
    te: "ఇప్పుడు శోధించండి",
    ta: "இப்போது தேடுங்கள்",
  },
  aiChatbot: {
    en: "AI Chatbot",
    hi: "AI चैटबॉट",
    hg: "AI Chatbot",
    te: "AI చాట్‌బాట్",
    ta: "AI சாட்பாட்",
  },
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    hg: "Dashboard",
    te: "డాష్‌బోర్డ్",
    ta: "டாஷ்போர்டு",
  },
  search: {
    en: "Search",
    hi: "खोजें",
    hg: "Search",
    te: "శోధించు",
    ta: "தேடு",
  },
  // Quick access cards
  ourMinistry: {
    en: "Our Ministry",
    hi: "हमारा मंत्रालय",
    hg: "Hamara Mantralay",
    te: "మా మంత్రిత్వ శాఖ",
    ta: "எங்கள் அமைச்சகம்",
  },
  ourMinistryDesc: {
    en: "Leadership, organisation, mission",
    hi: "नेतृत्व, संगठन, मिशन",
    hg: "Leadership, organisation, mission",
    te: "నాయకత్వం, సంస్థ, లక్ష్యం",
    ta: "தலைமை, அமைப்பு, பணி",
  },
  ourOrganisations: {
    en: "Our Organisations",
    hi: "हमारे संगठन",
    hg: "Hamare Sangathan",
    te: "మా సంస్థలు",
    ta: "எங்கள் அமைப்புகள்",
  },
  ourOrganisationsDesc: {
    en: "Subordinate offices, autonomous bodies",
    hi: "अधीनस्थ कार्यालय, स्वायत्त निकाय",
    hg: "Adhinasth karyalay, swayatt nikay",
    te: "అధీన కార్యాలయాలు, స్వయంప్రతిపత్తి సంస్థలు",
    ta: "துணை அலுவலகங்கள், தன்னாட்சி அமைப்புகள்",
  },
  ourPerformance: {
    en: "Our Performance",
    hi: "हमारा प्रदर्शन",
    hg: "Hamara Performance",
    te: "మా పనితీరు",
    ta: "எங்கள் செயல்திறன்",
  },
  ourPerformanceDesc: {
    en: "Annual reports, dashboards, statistics",
    hi: "वार्षिक रिपोर्ट, डैशबोर्ड, आँकड़े",
    hg: "Annual reports, dashboards, statistics",
    te: "వార్షిక నివేదికలు, డాష్‌బోర్డ్‌లు, గణాంకాలు",
    ta: "ஆண்டு அறிக்கைகள், டாஷ்போர்டுகள், புள்ளிவிவரங்கள்",
  },
  // Section headers
  keyOfferings: {
    en: "Key Offerings",
    hi: "मुख्य प्रस्ताव",
    hg: "Key Offerings",
    te: "ముఖ్య సేవలు",
    ta: "முக்கிய சேவைகள்",
  },
  whatsNew: {
    en: "What's New",
    hi: "नया क्या है",
    hg: "Kya Naya Hai",
    te: "కొత్తగా ఏముంది",
    ta: "புதியது என்ன",
  },
  recentDocuments: {
    en: "Recent Documents",
    hi: "हाल के दस्तावेज़",
    hg: "Recent Documents",
    te: "ఇటీవలి పత్రాలు",
    ta: "சமீபத்திய ஆவணங்கள்",
  },
  exploreUser: {
    en: "Explore User",
    hi: "उपयोगकर्ता खोजें",
    hg: "Explore karein User",
    te: "వినియోగదారుని అన్వేషించండి",
    ta: "பயனரை ஆராயுங்கள்",
  },
  importantLinks: {
    en: "Important Links",
    hi: "महत्वपूर्ण लिंक",
    hg: "Important Links",
    te: "ముఖ్యమైన లింకులు",
    ta: "முக்கியமான இணைப்புகள்",
  },
  announcements: {
    en: "Announcements",
    hi: "घोषणाएँ",
    hg: "Announcements",
    te: "ప్రకటనలు",
    ta: "அறிவிப்புகள்",
  },
  // Tabs
  schemes: {
    en: "Schemes",
    hi: "योजनाएँ",
    hg: "Schemes",
    te: "పథకాలు",
    ta: "திட்டங்கள்",
  },
  vacancies: {
    en: "Vacancies",
    hi: "रिक्तियाँ",
    hg: "Vacancies",
    te: "ఖాళీలు",
    ta: "காலியிடங்கள்",
  },
  tenders: {
    en: "Tenders",
    hi: "निविदाएँ",
    hg: "Tenders",
    te: "టెండర్లు",
    ta: "டெண்டர்கள்",
  },
  viewMore: {
    en: "VIEW MORE",
    hi: "और देखें",
    hg: "AUR DEKHEIN",
    te: "మరిన్ని చూడండి",
    ta: "மேலும் காண்க",
  },
  // User types
  researcher: { en: "Researcher", hi: "शोधकर्ता", hg: "Researcher", te: "పరిశోధకుడు", ta: "ஆராய்ச்சியாளர்" },
  artist: { en: "Artist", hi: "कलाकार", hg: "Kalakar", te: "కళాకారుడు", ta: "கலைஞர்" },
  student: { en: "Student", hi: "विद्यार्थी", hg: "Student", te: "విద్యార్థి", ta: "மாணவர்" },
  tourist: { en: "Tourist", hi: "पर्यटक", hg: "Tourist", te: "పర్యాటకుడు", ta: "சுற்றுலா பயணி" },
  institution: { en: "Institution", hi: "संस्था", hg: "Sanstha", te: "సంస్థ", ta: "நிறுவனம்" },
  citizen: { en: "Citizen", hi: "नागरिक", hg: "Nagrik", te: "పౌరుడు", ta: "குடிமகன்" },
  // Nav
  home: { en: "Home", hi: "होम", hg: "Home", te: "హోమ్", ta: "முகப்பு" },
  ministry: { en: "Ministry", hi: "मंत्रालय", hg: "Mantralay", te: "మంత్రిత్వ శాఖ", ta: "அமைச்சகம்" },
  offerings: { en: "Offerings", hi: "प्रस्ताव", hg: "Offerings", te: "సేవలు", ta: "சேவைகள்" },
  documents: { en: "Documents", hi: "दस्तावेज़", hg: "Documents", te: "పత్రాలు", ta: "ஆவணங்கள்" },
  media: { en: "Media", hi: "मीडिया", hg: "Media", te: "మీడియా", ta: "ஊடகம்" },
  connect: { en: "Connect", hi: "जुड़ें", hg: "Connect", te: "కనెక్ట్", ta: "இணை" },
  // Translating overlay
  translating: {
    en: "Translating via Bhashini...",
    hi: "भाषिणी के माध्यम से अनुवाद हो रहा है...",
    hg: "Bhashini ke through translate ho raha hai...",
    te: "భాషిణి ద్వారా అనువదిస్తోంది...",
    ta: "பாஷிணி வழியாக மொழிபெயர்க்கப்படுகிறது...",
  },
} as const;

// Helper to get translation
export function t(key: keyof typeof pageTranslations, lang: PageLanguage): string {
  return pageTranslations[key][lang] || pageTranslations[key].en;
}
