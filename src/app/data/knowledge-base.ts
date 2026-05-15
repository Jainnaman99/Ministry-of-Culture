export interface KBEntry {
  keywords: string[];
  text: string;
  textHi: string;
  textTe: string;
  textTa: string;
  textHinglish?: string;
  confidence: "High" | "Medium" | "Low";
  sources: { title: string; url: string }[];
  followUps: string[];
}

// Hinglish detection — common romanized Hindi words
const HINGLISH_MARKERS = [
  "hai", "kya", "kaha", "kahan", "kahaan", "kaise", "kyu", "kyun", "kyon",
  "mein", "ka", "ke", "ki", "ko", "se", "par", "pe",
  "kaun", "kaunsa", "kab", "kitna", "kitne", "kitni",
  "bata", "batao", "bataiye", "btao", "muje", "mujhe",
  "humare", "hamara", "hamari", "tumhara", "uska", "uski",
  "kahan par", "kaha par", "kahan he", "kaha he", "kaha hai",
  "matlab", "arth", "samjhao", "samajh", "jaankari",
  "accha", "achha", "theek", "bahut", "bohot", "bahot",
  "naam", "naam kya", "kab tha", "kab hai",
  "wala", "wali", "wale", "kaun sa", "kaunsi",
  "bana", "banaya", "banaye", "banaya tha",
  "kis ne", "kisne", "kisko",
  "kya hai", "kya he", "kahaan hai", "kaisa hai", "kaise hai",
];

export function detectHinglish(query: string): boolean {
  const lowerQuery = query.toLowerCase();
  // Check if at least 2 Hinglish markers are present, OR a strong combo
  let hits = 0;
  const strongMarkers = ["kaha par", "kaha hai", "kaha he", "kahan par", "kya hai", "kya he", "kab tha", "kaise hai", "kaisa hai", "batao", "bataiye", "bata do", "kaun hai"];
  for (const marker of strongMarkers) {
    if (lowerQuery.includes(marker)) return true;
  }
  for (const marker of HINGLISH_MARKERS) {
    // Match as whole word (with word boundaries)
    const regex = new RegExp(`\\b${marker}\\b`, "i");
    if (regex.test(lowerQuery)) hits++;
    if (hits >= 2) return true;
  }
  return false;
}

// Generate a generic Hinglish response when specific translation isn't available
export function generateGenericHinglish(entry: KBEntry): string {
  // Extract first 2-3 sentences from English text and convert to Hinglish-style
  const firstPara = entry.text.split("\n\n")[0].replace(/\*\*/g, "");
  return `${firstPara}\n\n_Iske baare mein aur jaankari ke liye ${entry.sources[0]?.title || "official portal"} dekh sakte hain._`;
}

export const knowledgeBase: KBEntry[] = [
  // ============ MONUMENTS & HERITAGE ============
  {
    keywords: ["ajanta", "ajantha", "ajanta caves", "ajantha caves"],
    text: `The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, located in Aurangabad district of Maharashtra. They are a UNESCO World Heritage Site (inscribed 1983).

**Key Highlights:**
• Caves 9, 10, 12, 13 and 15A belong to the early Satavahana period (2nd–1st century BCE)
• The remaining caves were built during the Vakataka dynasty period (5th–6th century CE)
• The murals depict Jataka tales — stories of the Buddha's past lives
• Cave 1 features the iconic painting of **Padmapani** (Bodhisattva holding a lotus)
• Cave 26 contains the famous **Mahaparinirvana** sculpture of the reclining Buddha (7 metres long)
• The complex consists of two types: **Chaitya Grihas** (prayer halls) and **Viharas** (monasteries)

**Discovery:**
The caves were accidentally discovered in 1819 by British officer John Smith during a tiger hunt. He first spotted the horseshoe-shaped entrance of Cave 10 from a cliff across the ravine.

**Conservation:**
The Archaeological Survey of India (ASI) maintains the site. Scientific conservation includes micro-climate monitoring, bio-deterioration control, and chemical treatment to prevent water seepage.`,
    textHi: `अजंता गुफाएँ महाराष्ट्र के औरंगाबाद जिले में स्थित 30 शैलकृत बौद्ध गुफा स्मारक हैं, जो दूसरी शताब्दी ईसा पूर्व से लगभग 480 ईस्वी तक की हैं। ये 1983 से यूनेस्को विश्व धरोहर स्थल हैं।

**प्रमुख विशेषताएँ:**
• गुफा 1 में प्रसिद्ध **पद्मपाणि** (कमल धारण किए बोधिसत्व) की चित्रकारी है
• गुफा 26 में **महापरिनिर्वाण** की 7 मीटर लंबी मूर्ति है
• भित्ति चित्र जातक कथाओं को दर्शाते हैं — बुद्ध के पूर्व जन्मों की कहानियाँ
• परिसर में दो प्रकार की गुफाएँ हैं: **चैत्य गृह** (प्रार्थना हॉल) और **विहार** (मठ)

इन गुफाओं की खोज 1819 में ब्रिटिश अधिकारी जॉन स्मिथ ने बाघ के शिकार के दौरान की थी।`,
    textTe: `అజంతా గుహలు మహారాష్ట్రలోని ఔరంగాబాద్ జిల్లాలో ఉన్న 30 రాతిలో చెక్కిన బౌద్ధ గుహా స్మారకాలు. క్రీ.పూ. 2వ శతాబ్దం నుండి క్రీ.శ. 480 వరకు నిర్మించబడ్డాయి. 1983 నుండి యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం.

**ముఖ్య విశేషాలు:**
• గుహ 1లో ప్రసిద్ధ **పద్మపాణి** చిత్రం ఉంది
• గుహ 26లో 7 మీటర్ల **మహాపరినిర్వాణ** శిల్పం ఉంది
• జాతక కథలను చిత్రించే భిత్తి చిత్రాలు
• 1819లో బ్రిటిష్ అధికారి జాన్ స్మిత్ కనుగొన్నారు`,
    textTa: `அஜந்தா குகைகள் மகாராஷ்டிராவின் ஔரங்காபாத் மாவட்டத்தில் உள்ள 30 பாறையில் செதுக்கப்பட்ட புத்த குகை நினைவுச்சின்னங்கள். கி.மு. 2ம் நூற்றாண்டு முதல் கி.பி. 480 வரை கட்டப்பட்டவை. 1983 முதல் யுனெஸ்கோ உலக பாரம்பரிய தளம்.

**முக்கிய அம்சங்கள்:**
• குகை 1ல் புகழ்பெற்ற **பத்மபாணி** ஓவியம் உள்ளது
• குகை 26ல் 7 மீட்டர் **மகாபரிநிர்வாண** சிற்பம் உள்ளது
• ஜாதகக் கதைகளை சித்தரிக்கும் சுவர் ஓவியங்கள்
• 1819ல் பிரிட்டிஷ் அதிகாரி ஜான் ஸ்மித் கண்டுபிடித்தார்`,
    textHinglish: `**Ajanta Caves** Maharashtra ke Aurangabad district mein hain. Yeh 30 chattan-katai (rock-cut) Buddhist gufa smarak hain jo 2nd century BCE se 480 CE tak banaye gaye the. 1983 se yeh **UNESCO World Heritage Site** hai.

**Khaas baatein:**
• Caves 9, 10, 12, 13 aur 15A purane Satavahana period ke hain (2nd–1st century BCE)
• Baaki gufayein Vakataka dynasty ke time mein bani (5th–6th century CE)
• Gufa 1 mein famous **Padmapani** ki painting hai (Bodhisattva jo kamal pakde hain)
• Gufa 26 mein **Mahaparinirvana** ki 7 meter lambi murti hai (Buddha ki letne wali murti)
• Murals mein **Jataka kathayein** dikhayi gayi hain — Buddha ke poorv janmon ki kahaniyan
• Do prakar ki gufayein hain: **Chaitya Grihas** (prayer halls) aur **Viharas** (monasteries)

**Khoj kaise hui:**
1819 mein British officer **John Smith** ne tiger hunt ke dauran by-chance dekhi thi. Cave 10 ka horseshoe-shaped entrance use cliff par se dikha tha.

**Sanrakshan:**
ASI iska maintenance karta hai — climate monitoring, bio-deterioration control aur water seepage prevention ke through.`,
    confidence: "High",
    sources: [
      { title: "ASI – Ajanta Caves (Protected Monument)", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Ajanta Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Ajanta Gallery", url: "https://museumsofindia.gov.in" },
    ],
    followUps: ["Tell me about Ellora Caves", "Tell me about Ellora Caves", "UNESCO World Heritage Sites in India"],
  },
  {
    keywords: ["ellora", "ellora caves", "kailasa", "kailash temple"],
    text: `The Ellora Caves are a UNESCO World Heritage Site located in Aurangabad, Maharashtra. Unlike Ajanta (purely Buddhist), Ellora represents the religious harmony of ancient India with **34 caves** spanning three religions:

**Buddhist Caves (1–12):** Built during 600–800 CE. Multi-storied monasteries with prayer halls. Cave 10 (Vishvakarma) features a large Buddha statue and a cathedral-like prayer hall.

**Hindu Caves (13–29):** Built during 600–900 CE.
• **Cave 16 — Kailasa Temple** is the crown jewel. Carved top-down from a single basalt rock, it is the largest monolithic rock excavation in the world. It represents Mount Kailash, the abode of Lord Shiva.
• Estimated 2,00,000 tonnes of rock were removed over decades
• Features sculptures of Ravana shaking Mount Kailash, Shiva-Parvati, and scenes from the Ramayana and Mahabharata

**Jain Caves (30–34):** Built during 800–1000 CE. Known for detailed carvings and austere beauty. Cave 32 (Indra Sabha) has exquisite paintings on the ceiling.

The site demonstrates the tolerant and harmonious co-existence of Buddhism, Hinduism, and Jainism in ancient India.`,
    textHi: `एलोरा गुफाएँ महाराष्ट्र के औरंगाबाद में स्थित यूनेस्को विश्व धरोहर स्थल हैं। अजंता (शुद्ध बौद्ध) के विपरीत, एलोरा तीन धर्मों की **34 गुफाओं** के साथ प्राचीन भारत के धार्मिक सद्भाव का प्रतिनिधित्व करती हैं:

**बौद्ध गुफाएँ (1-12), हिंदू गुफाएँ (13-29), जैन गुफाएँ (30-34)**

**गुफा 16 — कैलास मंदिर** सबसे महत्वपूर्ण है। एक ही बेसाल्ट चट्टान से ऊपर से नीचे तक तराशा गया, यह विश्व की सबसे बड़ी एकाश्म शैल खुदाई है।`,
    textTe: `ఎల్లోరా గుహలు మహారాష్ట్రలోని ఔరంగాబాద్‌లో ఉన్న యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం. బౌద్ధ, హిందూ, జైన మతాల **34 గుహలు** ఉన్నాయి.

**గుహ 16 — కైలాస ఆలయం** ఒకే బసాల్ట్ రాయి నుండి పైనుండి క్రింద వరకు చెక్కబడింది — ప్రపంచంలో అతిపెద్ద ఏకశిలా శిల్పం.`,
    textTa: `எல்லோரா குகைகள் மகாராஷ்டிராவின் ஔரங்காபாத்தில் உள்ள யுனெஸ்கோ உலக பாரம்பரிய தளம். புத்த, இந்து, சமண மதங்களின் **34 குகைகள்** உள்ளன.

**குகை 16 — கைலாச கோவில்** ஒரே பாறையில் மேலிருந்து கீழாக செதுக்கப்பட்டது — உலகின் மிகப்பெரிய ஒற்றைக்கல் சிற்பம்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Ellora Caves", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Ellora", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Ajanta Caves", "Tell me about Hampi", "Tell me about Konark Sun Temple"],
  },
  {
    keywords: ["taj mahal", "taj", "agra", "shah jahan", "mumtaz"],
    text: `The **Taj Mahal** is a white marble mausoleum in Agra, Uttar Pradesh — one of the New Seven Wonders of the World and a UNESCO World Heritage Site (1983).

**Key Facts:**
• Built by Mughal Emperor **Shah Jahan** in memory of his wife **Mumtaz Mahal** who died in 1631
• Construction began in 1632 and was completed around 1653 — took approximately 21 years
• Designed by **Ustad Ahmad Lahauri** (principal architect)
• Over **20,000 artisans** from India, Persia, the Ottoman Empire, and Europe worked on it
• The white marble was sourced from Makrana, Rajasthan
• **28 types of precious and semi-precious stones** were inlaid using the pietra dura technique
• The four minarets are slightly tilted outward so they would fall away from the tomb in case of an earthquake
• The calligraphy on the Taj Mahal was designed by **Amanat Khan**
• The complex includes a mosque, guest house, and the charbagh (four-part) garden with reflecting pools

**Conservation:**
The ASI has undertaken extensive restoration including mud-pack treatment to remove yellowing caused by air pollution. The Supreme Court of India has established a Taj Trapezium Zone to control industrial pollution around the monument.`,
    textHi: `**ताज महल** आगरा, उत्तर प्रदेश में एक सफेद संगमरमर का मकबरा है — दुनिया के नए सात अजूबों में से एक और यूनेस्को विश्व धरोहर स्थल (1983)।

• मुगल सम्राट **शाहजहाँ** ने अपनी पत्नी **मुमताज महल** की याद में बनवाया
• निर्माण 1632 में शुरू हुआ और लगभग 1653 में पूरा हुआ — लगभग 21 वर्ष लगे
• **20,000 से अधिक कारीगरों** ने काम किया
• सफेद संगमरमर राजस्थान के मकराना से लाया गया
• **28 प्रकार के बहुमूल्य पत्थर** पिएत्रा ड्यूरा तकनीक से जड़े गए`,
    textTe: `**తాజ్ మహల్** ఆగ్రా, ఉత్తరప్రదేశ్‌లోని తెల్ల పాలరాతి సమాధి — ప్రపంచ కొత్త ఏడు అద్భుతాలలో ఒకటి, యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం (1983).

• మొఘల్ చక్రవర్తి **షాజహాన్** తన భార్య **ముమ్తాజ్ మహల్** జ్ఞాపకార్థం నిర్మించారు
• 1632–1653 మధ్య నిర్మాణం — సుమారు 21 సంవత్సరాలు
• **20,000+ కళాకారులు** పనిచేశారు`,
    textTa: `**தாஜ்மஹால்** ஆக்ரா, உத்தரப்பிரதேசத்தில் உள்ள வெண்ணிற பளிங்கு கல்லறை — உலகின் புதிய ஏழு அதிசயங்களில் ஒன்று, யுனெஸ்கோ உலக பாரம்பரிய தளம் (1983).

• முகலாய பேரரசர் **ஷாஜஹான்** தன் மனைவி **மும்தாஜ் மஹால்** நினைவாகக் கட்டினார்
• 1632–1653 கட்டுமானம் — சுமார் 21 ஆண்டுகள்
• **20,000+ கலைஞர்கள்** பணியாற்றினர்`,
    textHinglish: `**Taj Mahal** Agra mein hai, jo Uttar Pradesh state mein sthit hai. Delhi se roughly 230–250 km door hai (route ke hisaab se).

**Important baatein:**
• Mughal emperor **Shah Jahan** ne apni patni **Mumtaz Mahal** ki yaad mein banwaya tha
• Construction 1632 mein shuru hui aur 1653 ke aas-paas poori hui — lagbhag 21 saal lage
• Principal architect **Ustad Ahmad Lahauri** the
• **20,000 se zyada karigaron** ne kaam kiya — India, Persia, Ottoman Empire, aur Europe se aaye the
• White marble Makrana, Rajasthan se laaya gaya tha
• **28 prakar ke kimti aur ardh-kimti pathar** pietra dura technique se laga gaye
• Char minar thode bahar ki taraf jhuke hain — agar earthquake aaye toh tomb par na gire
• Calligraphy **Amanat Khan** ne design ki
• Yeh **UNESCO World Heritage Site** hai (1983 se) aur duniya ke **New Seven Wonders** mein se ek hai

**Visit karne ki jaankari:**
ASI dwara maintain hota hai. Friday ko band rehta hai. Online ticket asi.payumoney.com ya official ASI portal se book kar sakte hain.`,
    confidence: "High",
    sources: [
      { title: "ASI – Taj Mahal", url: "https://asi.nic.in" },
      { title: "Indian Culture – Mughal Architecture", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Red Fort", "Tell me about Qutub Minar", "Tell me about Agra Fort"],
  },
  {
    keywords: ["red fort", "lal qila", "lal kila", "red fort delhi"],
    text: `The **Red Fort (Lal Qila)** is a historic fortification in Old Delhi, built by Mughal Emperor Shah Jahan in 1639 when he shifted his capital from Agra to Delhi (then Shahjahanabad). It is a UNESCO World Heritage Site (2007).

**Architecture:**
• Built with red sandstone — giving it the name "Lal Qila"
• Walls extend 2.5 km, rising 18 metres on the river side and 33 metres on the city side
• Key structures: Diwan-i-Aam (Hall of Public Audience), Diwan-i-Khas (Hall of Private Audience), Rang Mahal, Moti Masjid, Hammams (royal baths)
• The Diwan-i-Khas once housed the legendary **Peacock Throne** (Takht-e-Taus)

**Historical Significance:**
• Served as the main residence of Mughal emperors for nearly 200 years (1648–1857)
• On **15 August 1947**, India's first Prime Minister Jawaharlal Nehru unfurled the national flag here
• Every Independence Day, the Prime Minister of India hoists the flag and delivers a national address from its ramparts

The fort is maintained by ASI and houses the **Indian War Memorial Museum** and **Museum on 1857** (India's First War of Independence).`,
    textHi: `**लाल किला** पुरानी दिल्ली में एक ऐतिहासिक किला है, जिसे मुगल सम्राट शाहजहाँ ने 1639 में बनवाया था। यह 2007 से यूनेस्को विश्व धरोहर स्थल है।

• लाल बलुआ पत्थर से निर्मित — इसलिए "लाल किला" नाम पड़ा
• दीवारें 2.5 किमी तक फैली हैं
• **15 अगस्त 1947** को प्रथम प्रधानमंत्री जवाहरलाल नेहरू ने यहाँ तिरंगा फहराया
• हर स्वतंत्रता दिवस पर प्रधानमंत्री यहाँ से राष्ट्रीय संबोधन करते हैं`,
    textTe: `**ఎర్రకోట** పాత ఢిల్లీలో చారిత్రక కోట — మొఘల్ చక్రవర్తి షాజహాన్ 1639లో నిర్మించారు. 2007 నుండి యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం. ప్రతి స్వాతంత్ర్య దినోత్సవం నాడు ప్రధానమంత్రి ఇక్కడ జాతీయ జెండాను ఎగురవేస్తారు.`,
    textTa: `**செங்கோட்டை** பழைய டெல்லியில் உள்ள வரலாற்றுக் கோட்டை — முகலாய பேரரசர் ஷாஜஹான் 1639ல் கட்டினார். 2007 முதல் யுனெஸ்கோ உலக பாரம்பரிய தளம். ஒவ்வொரு சுதந்திர தினத்திலும் பிரதமர் இங்கு தேசியக் கொடி ஏற்றுவார்.`,
    textHinglish: `**Red Fort (Lal Qila)** Purani Dilli mein ek historic kila hai. Mughal emperor **Shah Jahan** ne 1639 mein banwaya tha jab unhone apni rajdhani Agra se Delhi (tab Shahjahanabad) shift ki. Yeh **UNESCO World Heritage Site** hai (2007 se).

**Architecture:**
• Lal balua pathar (red sandstone) se bana hai — isiliye naam "Lal Qila" pada
• Walls 2.5 km tak phaili hain, river side se 18 meter aur city side se 33 meter unchi
• Key structures: **Diwan-i-Aam** (Hall of Public Audience), **Diwan-i-Khas** (Hall of Private Audience), **Rang Mahal**, **Moti Masjid**, **Hammams** (royal baths)
• Diwan-i-Khas mein famous **Peacock Throne** (Takht-e-Taus) rakha tha

**Itihasik mahatva:**
• Mughal emperors ka mukhya nivas tha lagbhag 200 saal tak (1648–1857)
• **15 August 1947** ko Pandit Jawaharlal Nehru ne yahaan tiranga lehraya tha
• Har Independence Day par Pradhan Mantri yahin se desh ko sambodhit karte hain

Fort ka maintenance ASI karta hai aur ismein **Indian War Memorial Museum** aur **1857 Museum** bhi hai.`,
    confidence: "High",
    sources: [
      { title: "ASI – Red Fort Complex", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Qutub Minar", "Tell me about Taj Mahal", "Tell me about Qutub Minar"],
  },
  {
    keywords: ["qutub", "qutab", "qutb", "minar", "qutub minar"],
    text: `The **Qutub Minar** is a 72.5-metre tall minaret in the Mehrauli area of Delhi. It is the tallest brick minaret in the world and a UNESCO World Heritage Site (1993).

**Construction:**
• Foundation laid by **Qutb-ud-din Aibak** in 1193 after the defeat of Delhi's last Hindu kingdom
• Completed by his successor **Iltutmish** in 1220
• The topmost storey was added by **Firoz Shah Tughlaq** in 1368 after lightning damage
• The tower has **5 storeys** with projecting balconies
• First three storeys: red sandstone; fourth and fifth: marble and sandstone

**Qutub Complex includes:**
• **Iron Pillar** — a 7-metre metallurgical marvel from the Gupta period (~402 CE) that has resisted corrosion for 1,600+ years
• Ruins of Quwwat-ul-Islam Mosque — the first mosque built in India after Islamic conquest
• Alai Darwaza — a masterpiece of Indo-Islamic architecture built by Alauddin Khalji in 1311
• Alai Minar — an unfinished minar intended to be twice the height of Qutub Minar`,
    textHi: `**कुतुब मीनार** दिल्ली के महरौली क्षेत्र में 72.5 मीटर ऊँची मीनार है। यह दुनिया की सबसे ऊँची ईंट की मीनार है और 1993 से यूनेस्को विश्व धरोहर स्थल है।

• नींव **कुतुबुद्दीन ऐबक** ने 1193 में रखी
• **इल्तुतमिश** ने 1220 में पूरा किया
• **5 मंजिलें** हैं — पहली तीन लाल बलुआ पत्थर की, चौथी और पाँचवीं संगमरमर की
• **लौह स्तंभ** — गुप्त काल (~402 ई.) का 7 मीटर का धातु स्तंभ जो 1,600+ वर्षों से जंग नहीं लगी`,
    textTe: `**కుతుబ్ మినార్** ఢిల్లీలోని మెహ్రౌలీలో 72.5 మీ. ఎత్తు గల మినార్. ప్రపంచంలో అత్యంత ఎత్తైన ఇటుకల మినార్. 1993 నుండి యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం.`,
    textTa: `**குதுப் மினார்** டெல்லியின் மெஹ்ரௌலியில் 72.5 மீ. உயரமான கோபுரம். உலகின் உயரமான செங்கல் கோபுரம். 1993 முதல் யுனெஸ்கோ உலக பாரம்பரிய தளம்.`,
    textHinglish: `**Qutub Minar** Delhi ke **Mehrauli** area mein hai — 72.5 meter unchi minar. Yeh duniya ki sabse unchi brick minaret hai aur **UNESCO World Heritage Site** hai (1993 se).

**Kaise bani:**
• Neev **Qutb-ud-din Aibak** ne 1193 mein rakhi (Delhi ke last Hindu kingdom ki haar ke baad)
• Unke successor **Iltutmish** ne 1220 mein poori ki
• Sabse upri manzil **Firoz Shah Tughlaq** ne 1368 mein add ki (jab bijli girne se damage hua tha)
• Tower mein **5 manzilein** hain projecting balconies ke saath
• Pehli teen manzilein lal balua pathar (red sandstone) ki, chauthi aur paanchvi marble aur sandstone ki

**Qutub Complex mein aur kya hai:**
• **Iron Pillar (Loh Stambh)** — Gupta period (~402 CE) ka 7 meter ka metallurgical marvel jo 1,600+ saalon se rust nahi laga
• **Quwwat-ul-Islam Mosque** ke khandhar — Islamic conquest ke baad India mein bani pehli masjid
• **Alai Darwaza** — Indo-Islamic architecture ka masterpiece, Alauddin Khalji ne 1311 mein banwaya
• **Alai Minar** — adhura minar jo Qutub se double unchaai ka banaya jaana tha`,
    confidence: "High",
    sources: [
      { title: "ASI – Qutub Minar Complex", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Red Fort", "Tell me about Qutub Minar", "Tell me about Red Fort"],
  },
  {
    keywords: ["konark", "sun temple", "konark sun temple", "surya"],
    text: `The **Konark Sun Temple** is a 13th-century CE temple in Konark, Odisha, dedicated to the Hindu Sun God **Surya**. It is a UNESCO World Heritage Site (1984).

**Architecture:**
• Designed as a massive chariot of the Sun God with **24 elaborately carved stone wheels** (each 3 metres in diameter) and pulled by **7 horses**
• Built by King **Narasimhadeva I** of the Eastern Ganga dynasty around 1250 CE
• The main sanctum (vimana) was reportedly over 60 metres tall but collapsed — the surviving **Jagamohana** (audience hall) stands at about 30 metres
• Known as the **"Black Pagoda"** by European sailors who used it as a navigation landmark

**Sculptural Wonders:**
• The 24 wheels function as accurate sundials — they can tell time to the minute based on the shadow cast
• Intricate carvings depict daily life, celestial beings, mythological narratives, erotic sculptures, musicians, dancers, flora and fauna
• Three images of the Sun God positioned to catch rays at dawn, noon and sunset

Rabindranath Tagore said about Konark: *"Here the language of stone surpasses the language of man."*`,
    textHi: `**कोणार्क सूर्य मंदिर** ओडिशा में 13वीं शताब्दी का मंदिर है, जो हिंदू सूर्य देव **सूर्य** को समर्पित है। यह 1984 से यूनेस्को विश्व धरोहर स्थल है।

• सूर्य देव के विशाल रथ के रूप में डिज़ाइन किया गया — **24 पत्थर के पहिये** और **7 घोड़े**
• राजा **नरसिम्हदेव प्रथम** ने लगभग 1250 ई. में बनवाया
• 24 पहिये सटीक सूर्यघड़ी के रूप में काम करते हैं
• रवींद्रनाथ टैगोर ने कहा: *"यहाँ पत्थर की भाषा मनुष्य की भाषा को पार कर जाती है।"*`,
    textTe: `**కోణార్క్ సూర్య దేవాలయం** ఒడిశాలో 13వ శతాబ్దపు ఆలయం, హిందూ సూర్యదేవుడికి అంకితం. 1984 నుండి యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం. విశాలమైన రథం ఆకారంలో నిర్మించబడింది — 24 చక్రాలు మరియు 7 గుర్రాలతో.`,
    textTa: `**கோணார்க் சூரிய கோவில்** ஒடிசாவில் 13ம் நூற்றாண்டு கோவில், இந்து சூரிய கடவுளுக்கு அர்ப்பணிக்கப்பட்டது. 1984 முதல் யுனெஸ்கோ உலக பாரம்பரிய தளம். மிகப்பெரிய தேர் வடிவத்தில் கட்டப்பட்டது — 24 சக்கரங்கள் மற்றும் 7 குதிரைகளுடன்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Konark Sun Temple", url: "https://asi.nic.in" },
      { title: "Indian Culture – Odisha Heritage", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Hampi", "Tell me about UNESCO World Heritage Sites", "Tell me about Mahabalipuram"],
  },
  {
    keywords: ["hampi", "vijayanagara", "vijayanagar"],
    text: `**Hampi** is a UNESCO World Heritage Site in Karnataka — the ruins of the **Vijayanagara Empire** (1336–1646 CE), once one of the richest and largest cities in the world.

**Key Monuments:**
• **Virupaksha Temple** — Still an active place of worship, dedicated to Lord Shiva. The main gopuram is 50 metres tall
• **Vittala Temple** — Famous for its stone chariot and 56 **musical pillars** that produce musical notes when tapped
• **Lotus Mahal** — A fusion of Hindu and Islamic architecture in the Zenana Enclosure
• **Elephant Stables** — A grand structure that housed the royal elephants
• **Hazara Rama Temple** — Walls covered with bas-relief panels depicting scenes from the Ramayana

**Historical Context:**
• The Vijayanagara Empire was founded in 1336 by **Harihara I and Bukka Raya I**
• At its peak under **Krishnadevaraya** (r. 1509–1529), the city had an estimated population of 5,00,000
• Portuguese traveller Domingo Paes described it as "large as Rome" and "the best-provided city in the world"
• The city was destroyed in the **Battle of Talikota** (1565) by a coalition of Deccan sultanates`,
    textHi: `**हम्पी** कर्नाटक में यूनेस्को विश्व धरोहर स्थल है — **विजयनगर साम्राज्य** (1336-1646 ई.) के खंडहर, जो कभी दुनिया के सबसे अमीर और बड़े शहरों में से एक था।

• **विरूपाक्ष मंदिर** — आज भी सक्रिय पूजा स्थल
• **विट्ठल मंदिर** — पत्थर के रथ और 56 **संगीत स्तंभों** के लिए प्रसिद्ध
• **कृष्णदेवराय** (1509-1529) के शासन में चरम पर — अनुमानित जनसंख्या 5,00,000`,
    textTe: `**హంపి** కర్ణాటకలో యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం — **విజయనగర సామ్రాజ్యం** (1336-1646) శిథిలాలు. విరూపాక్ష ఆలయం, విఠల ఆలయంలోని రాతి రథం ముఖ్య ఆకర్షణలు.`,
    textTa: `**ஹம்பி** கர்நாடகாவில் யுனெஸ்கோ உலக பாரம்பரிய தளம் — **விஜயநகர பேரரசின்** (1336-1646) இடிபாடுகள். விரூபாட்சி கோவில், விட்டல கோவிலின் கல் தேர் முக்கிய அம்சங்கள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Hampi Ruins", url: "https://asi.nic.in" },
      { title: "Indian Culture – Vijayanagara", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Konark Sun Temple", "Tell me about Hampi", "Tell me about Ellora Caves"],
  },

  // ============ MUSEUMS ============
  {
    keywords: ["museum", "museums", "national museum", "delhi museum", "gallery", "exhibition"],
    text: `India has a vast network of museums under the Ministry of Culture. Here are the major ones:

**1. National Museum, New Delhi**
• One of India's largest — over **2,00,000 works of art** spanning 5,000 years
• Key galleries: Harappan Civilization, Maurya-Sunga-Satavahana, Gupta period, Medieval art, Miniature Paintings, Arms & Armour, Decorative Arts, Pre-Columbian Art, Tanka collection
• Houses the famous **Dancing Girl** bronze from Mohenjo-daro (c. 2500 BCE)

**2. Indian Museum, Kolkata** (Founded 1814)
• Oldest and largest multipurpose museum in the Asia-Pacific
• Notable: Egyptian mummy, Gandhara sculptures, Ashoka pillar relics, meteorite collection

**3. Salar Jung Museum, Hyderabad**
• One of three National Museums — largest one-man collection in the world (43,000+ objects)
• Famous for the **Veiled Rebecca** marble sculpture and musical clock

**4. National Gallery of Modern Art (NGMA)**
• Branches in Delhi, Mumbai, Bengaluru
• Works by Raja Ravi Varma, Amrita Sher-Gil, Rabindranath Tagore, M.F. Husain, S.H. Raza

**5. Victoria Memorial, Kolkata**
• Built 1906–1921 in memory of Queen Victoria
• Houses 28,394 artefacts including rare paintings of the Calcutta school

**6. Allahabad Museum** | **7. IGRMS Bhopal** | **8. BITM Kolkata** | **9. Nehru Science Centre Mumbai**

Virtual tours available at **museumsofindia.gov.in**`,
    textHi: `भारत में संस्कृति मंत्रालय के अधीन संग्रहालयों का विशाल नेटवर्क है:

**1. राष्ट्रीय संग्रहालय, नई दिल्ली** — 5,000 वर्षों की **2,00,000+ कलाकृतियाँ**
**2. भारतीय संग्रहालय, कोलकाता** (1814) — एशिया-प्रशांत का सबसे पुराना
**3. सालार जंग संग्रहालय, हैदराबाद** — विश्व का सबसे बड़ा एक-व्यक्ति संग्रह
**4. राष्ट्रीय आधुनिक कला गैलरी (NGMA)** — दिल्ली, मुंबई, बेंगलुरु में शाखाएँ
**5. विक्टोरिया मेमोरियल, कोलकाता**

आभासी भ्रमण **museumsofindia.gov.in** पर उपलब्ध`,
    textTe: `భారతదేశంలో సంస్కృతి మంత్రిత్వ శాఖ ఆధ్వర్యంలో విస్తృత మ్యూజియం నెట్‌వర్క్ ఉంది — జాతీయ మ్యూజియం (న్యూ ఢిల్లీ), ఇండియన్ మ్యూజియం (కోల్‌కతా), సాలార్ జంగ్ మ్యూజియం (హైదరాబాద్), విక్టోరియా మెమోరియల్ మరియు ఇతరాలు.`,
    textTa: `இந்தியாவில் கலாச்சார அமைச்சகத்தின் கீழ் விரிவான அருங்காட்சியக வலையமைப்பு உள்ளது — தேசிய அருங்காட்சியகம் (புது டெல்லி), இந்திய அருங்காட்சியகம் (கொல்கத்தா), சலார் ஜங் அருங்காட்சியகம் (ஹைதராபாத்), விக்டோரியா நினைவகம் மற்றும் பிற.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – Official Directory", url: "https://museumsofindia.gov.in" },
      { title: "National Museum – Collections", url: "https://nationalmuseumindia.gov.in" },
      { title: "Indian Culture – Museum Archives", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about museums in India", "Tell me about museums in India", "Tell me about Indian Culture Portal"],
  },

  // ============ PERFORMING ARTS ============
  {
    keywords: ["dance", "classical dance", "bharatanatyam", "kathak", "odissi", "kathakali", "manipuri", "kuchipudi", "mohiniyattam", "sattriya", "performing arts"],
    text: `India has **8 classical dance forms** recognized by the Sangeet Natak Akademi:

**1. Bharatanatyam** (Tamil Nadu)
Oldest classical form, originating in temple traditions. Known for **aramandi** (bent-knee posture), intricate footwork, and expressive **abhinaya** (storytelling). Key artists: Rukmini Devi Arundale, Balasaraswati.

**2. Kathak** (North India)
Known for spinning turns (**chakkars**), rhythmic footwork, and expressive storytelling. Evolved with both Hindu and Mughal court influences. Key artists: Birju Maharaj, Sitara Devi.

**3. Kathakali** (Kerala)
Dance-drama with elaborate costumes, vivid face paint (**chutti**), and larger-than-life characters from epics. Performances can last all night.

**4. Odissi** (Odisha)
Characterized by the **tribhanga** (three-bend) posture and fluid grace. Origins traced to 2nd century BCE temple sculptures. Key artist: Kelucharan Mohapatra.

**5. Kuchipudi** (Andhra Pradesh)
Combines dance and acting, traditionally performed by male Brahmin dancers. Known for the **tarangam** — dancing on the edge of a brass plate.

**6. Manipuri** (Manipur)
Graceful, lyrical form depicting **Raas Leela** of Radha-Krishna. Gentle swaying movements without loud footwork.

**7. Mohiniyattam** (Kerala)
"Dance of the enchantress" — characterized by swaying body movements (**lasya**) and subtle facial expressions. Performed in white and gold costume.

**8. Sattriya** (Assam)
Originated in 15th century Vaishnavite monasteries (**sattras**). Recognized as classical dance form by Sangeet Natak Akademi in 2000.

All forms trace theoretical roots to **Bharata Muni's Natyashastra** (c. 200 BCE – 200 CE).`,
    textHi: `भारत में **8 शास्त्रीय नृत्य** रूप संगीत नाटक अकादमी द्वारा मान्यता प्राप्त हैं:

1. **भरतनाट्यम** (तमिलनाडु) — सबसे प्राचीन शास्त्रीय नृत्य
2. **कथक** (उत्तर भारत) — चक्कर और ताल के लिए प्रसिद्ध
3. **कथकली** (केरल) — विस्तृत वेशभूषा और मुखपेंट वाला नृत्य-नाटक
4. **ओडिसी** (ओडिशा) — त्रिभंग मुद्रा और प्रवाहपूर्ण गति
5. **कुचिपुड़ी** (आंध्र प्रदेश) — नृत्य और अभिनय का संयोजन
6. **मणिपुरी** (मणिपुर) — रास लीला का सुंदर चित्रण
7. **मोहिनीअट्टम** (केरल) — "मोहिनी का नृत्य"
8. **सत्त्रिय** (असम) — वैष्णव मठों से उत्पन्न

सभी रूप **भरत मुनि के नाट्यशास्त्र** से प्रेरित हैं।`,
    textTe: `భారతదేశంలో సంగీత నాటక అకాడమీ గుర్తించిన **8 శాస్త్రీయ నృత్య** రూపాలు ఉన్నాయి: భరతనాట్యం (తమిళనాడు), కథక్ (ఉత్తర భారతం), కథాకళి (కేరళ), ఒడిస్సీ (ఒడిశా), కూచిపూడి (ఆంధ్రప్రదేశ్), మణిపురి, సత్త్రియా (అసోం), మోహినీఅట్టం (కేరళ).`,
    textTa: `இந்தியாவில் சங்கீத நாடக அகாடமி அங்கீகரித்த **8 செவ்வியல் நடன** வடிவங்கள் உள்ளன: பரதநாட்டியம் (தமிழ்நாடு), கதக் (வட இந்தியா), கதகளி (கேரளா), ஒடிசி (ஒடிசா), குச்சிப்புடி (ஆந்திரா), மணிப்புரி, சத்திரியா (அசாம்), மோகினியாட்டம் (கேரளா).`,
    confidence: "High",
    sources: [
      { title: "Sangeet Natak Akademi – Classical Dance", url: "https://sangeetnatak.gov.in" },
      { title: "Indian Culture Portal – Performing Arts", url: "https://indianculture.gov.in" },
      { title: "IGNCA – Dance Archives", url: "https://ignca.gov.in" },
    ],
    followUps: ["Tell me about classical dance forms", "Tell me about classical music", "Tell me about classical dance forms"],
  },
  {
    keywords: ["music", "classical music", "raga", "raag", "hindustani", "carnatic", "sitar", "tabla", "veena"],
    text: `India has two major systems of classical music:

**Hindustani Classical Music** (North India)
• Based on **ragas** (melodic frameworks) and **talas** (rhythmic cycles)
• Key instruments: Sitar, Sarod, Tabla, Santoor, Bansuri, Shehnai, Sarangi
• Major gharanas: Gwalior, Agra, Jaipur-Atrauli, Kirana, Patiala
• Legendary musicians: Tansen (Mughal court), Ravi Shankar, Zakir Hussain, Bismillah Khan, Hariprasad Chaurasia

**Carnatic Classical Music** (South India)
• Structured around the **72 Melakarta raga** system
• Trinity of Carnatic Music: **Tyagaraja, Muthuswami Dikshitar, Shyama Shastri**
• Key instruments: Veena, Mridangam, Violin, Ghatam, Nadaswaram
• Notable artists: M.S. Subbulakshmi, Balamuralikrishna

**Common Elements:**
• Both systems share the concept of **shruti** (microtones), **swara** (notes — Sa Re Ga Ma Pa Dha Ni), and **tala**
• UNESCO has recognized several Indian musical traditions as Intangible Cultural Heritage

The **Sangeet Natak Akademi** promotes both traditions through fellowships, awards, and documentation.`,
    textHi: `भारत में शास्त्रीय संगीत की दो प्रमुख पद्धतियाँ हैं:

**हिंदुस्तानी शास्त्रीय संगीत** (उत्तर भारत) — राग और ताल पर आधारित
**कर्नाटक शास्त्रीय संगीत** (दक्षिण भारत) — 72 मेलकर्ता राग पद्धति

दोनों में **स्वर** (सा रे गा मा पा धा नि) और **ताल** की अवधारणा समान है।`,
    textTe: `భారతదేశంలో రెండు ప్రధాన శాస్త్రీయ సంగీత సంప్రదాయాలు: **హిందుస్తానీ** (ఉత్తర భారతం) మరియు **కర్ణాటక** (దక్షిణ భారతం). సంగీత నాటక అకాడమీ రెండింటినీ ప్రోత్సహిస్తుంది.`,
    textTa: `இந்தியாவில் இரண்டு முக்கிய செவ்வியல் இசை மரபுகள்: **இந்துஸ்தானி** (வட இந்தியா) மற்றும் **கர்நாடக** (தென் இந்தியா). சங்கீத நாடக அகாடமி இரண்டையும் ஊக்குவிக்கிறது.`,
    confidence: "High",
    sources: [
      { title: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in" },
      { title: "Indian Culture – Music Archives", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about classical music", "Tell me about classical music", "Tell me about classical music"],
  },

  // ============ VEDIC & TEXTS ============
  {
    keywords: ["vedic", "vedas", "veda", "upanishad", "sanskrit", "scripture", "ancient text", "rigveda", "rig veda", "yajurveda", "samaveda", "atharvaveda"],
    text: `The **Vedic Heritage Portal** (vedicheritage.gov.in) preserves India's most ancient knowledge traditions:

**The Four Vedas:**
1. **Rigveda** (c. 1500–1200 BCE) — Oldest Veda with 1,028 hymns (suktas) in 10 books (mandalas). Contains the famous Gayatri Mantra and Purusha Sukta. Primarily hymns to Agni, Indra, Varuna.

2. **Yajurveda** — Prose mantras for rituals and sacrifices. Two versions: Shukla (White) and Krishna (Black) Yajurveda.

3. **Samaveda** — "Veda of melodies" with 1,875 verses set to musical notations. Considered the root of Indian classical music.

4. **Atharvaveda** — Hymns, spells and incantations on everyday life, medicine, philosophy. Contains early references to Ayurveda.

**Associated Literature:**
• **Brahmanas** — Prose commentaries explaining Vedic rituals
• **Aranyakas** — "Forest texts" on meditation and symbolism
• **Upanishads** — Philosophical texts (108 principal ones). Core concepts: Brahman (ultimate reality), Atman (self), Karma, Moksha
• **Vedangas** — Six auxiliary disciplines: Shiksha, Chandas, Vyakarana, Nirukta, Jyotisha, Kalpa

**UNESCO Recognition:**
The tradition of **Vedic Chanting** was proclaimed a Masterpiece of Oral and Intangible Heritage of Humanity in 2003.`,
    textHi: `**वैदिक विरासत पोर्टल** भारत की प्राचीनतम ज्ञान परंपराओं को संरक्षित करता है:

**चार वेद:**
1. **ऋग्वेद** (~1500-1200 ई.पू.) — 1,028 सूक्त, गायत्री मंत्र
2. **यजुर्वेद** — यज्ञ मंत्र
3. **सामवेद** — संगीतबद्ध मंत्र
4. **अथर्ववेद** — दैनिक जीवन, चिकित्सा

**उपनिषद** — 108 प्रमुख — ब्रह्म, आत्मा, कर्म, मोक्ष की अवधारणाएँ

यूनेस्को ने 2003 में **वैदिक पाठ** को मौखिक विरासत घोषित किया।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "Indian Culture – Manuscripts", url: "https://indianculture.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
    ],
    followUps: ["Tell me about Rigveda", "Tell me about Upanishads", "Tell me about Bhagavad Gita"],
  },

  // ============ DEEP VEDIC HERITAGE CONTENT ============
  {
    keywords: ["rigveda", "rig veda", "rg veda", "rgveda", "oldest veda", "gayatri mantra"],
    text: `The **Rigveda** is the oldest of the four Vedas and one of the oldest religious texts in continuous use. Composed in **Vedic Sanskrit between 1500–1200 BCE** in the Indus-Sarasvati region, it is humanity's most ancient surviving text.

**Structure:**
• **10 Mandalas** (books) containing **1,028 hymns (suktas)** with **10,600 verses**
• Total of **40,000+ words** memorized for 3,500+ years through oral tradition (Shruti)
• Composed in **archaic Vedic Sanskrit** — predates Classical Sanskrit by 800+ years

**The Ten Mandalas:**
• **Mandalas 2–7** ("Family Books") — Oldest core, composed by seven priestly families
  - Mandala 2: Gritsamada
  - Mandala 3: Vishwamitra (contains the **Gayatri Mantra**)
  - Mandala 4: Vamadeva
  - Mandala 5: Atri
  - Mandala 6: Bharadwaja
  - Mandala 7: Vasishtha
• **Mandala 8** — Kanvas and Angirases
• **Mandala 9** — All 114 hymns dedicated to Soma (sacred plant/drink)
• **Mandalas 1 & 10** — Latest additions; Mandala 10 contains Purusha Sukta, Nasadiya Sukta (Creation Hymn), and the famous "marriage hymn"

**Key Hymns:**
• **Gayatri Mantra** (3.62.10) — most sacred Hindu mantra
• **Purusha Sukta** (10.90) — creation through cosmic person
• **Nasadiya Sukta** (10.129) — "Creation Hymn" — earliest philosophical inquiry into origin of universe
• **Hiranyagarbha Sukta** (10.121) — "Golden Womb"

**Deities:**
• **Indra** (king of gods, ~250 hymns) — most invoked
• **Agni** (fire god, ~200 hymns) — second most invoked
• **Soma** (sacred plant) — all of Mandala 9
• **Varuna** (cosmic order)
• Other: Vayu, Mitra, Surya, Usha (dawn), Ashvins, Rudra, Vishnu, Prithvi

**UNESCO Heritage:**
• **Vedic Chanting** declared a Masterpiece of the Oral and Intangible Heritage of Humanity (2003, inscribed 2008)
• Continuous unbroken oral transmission across **108+ generations**

**Manuscripts:**
• Earliest surviving manuscripts date to 11th century CE
• Oldest preserved Rigveda manuscript at **Bhandarkar Oriental Research Institute (BORI), Pune**
• **UNESCO Memory of the World** register since 2007`,
    textHi: `**ऋग्वेद** चार वेदों में सबसे प्राचीन है। **1500-1200 ई.पू.** में रचित।

**संरचना:**
• **10 मंडल**, **1,028 सूक्त**, **10,600 ऋचाएँ**
• मौखिक परंपरा (श्रुति) से 3,500+ वर्षों से सुरक्षित

**प्रमुख सूक्त:**
• **गायत्री मंत्र** (3.62.10)
• **पुरुष सूक्त** (10.90) — सृष्टि
• **नासदीय सूक्त** (10.129) — सृष्टि का प्रथम दार्शनिक विवरण

**प्रमुख देवता:**
• **इंद्र** (250 सूक्त), **अग्नि** (200), **सोम** (मंडल 9)

यूनेस्को ने **वैदिक पाठ** को मौखिक विरासत घोषित किया (2003) — 108+ पीढ़ियों से अखंड परंपरा।

प्राचीनतम पांडुलिपि **भांडारकर प्राच्य शोध संस्थान, पुणे** में, **यूनेस्को मेमोरी ऑफ द वर्ल्ड** (2007)।`,
    textTe: `**ఋగ్వేదం** నాలుగు వేదాలలో అత్యంత ప్రాచీనమైనది. **క్రీ.పూ. 1500–1200** మధ్య రచించబడింది. **10 మండలాలు, 1,028 సూక్తాలు, 10,600 ఋక్కులు** ఉన్నాయి. **గాయత్రి మంత్రం** (3.62.10), **పురుష సూక్తం** (10.90), **నాసదీయ సూక్తం** (10.129) ముఖ్యమైనవి. **ఇంద్రుడు, అగ్ని, సోముడు** ప్రధాన దేవతలు. **వేద పఠనం** యునెస్కో ద్వారా **మౌఖిక వారసత్వం** గా గుర్తింపు పొందింది (2003).`,
    textTa: `**ரிக் வேதம்** நான்கு வேதங்களில் மிகப் பழமையானது. **கி.மு. 1500–1200** ல் இயற்றப்பட்டது. **10 மண்டலங்கள், 1,028 சூக்தங்கள், 10,600 ருக்குகள்** உள்ளன. **காயத்ரி மந்திரம்** (3.62.10), **புருஷ சூக்தம்** (10.90), **நாசதீய சூக்தம்** (10.129) முக்கியமானவை. **இந்திரன், அக்னி, சோமன்** முக்கிய தெய்வங்கள். **வேத ஓதுதல்** யுனெஸ்கோவால் **வாய்மொழி பாரம்பரியம்** என அறிவிக்கப்பட்டது (2003).`,
    textHinglish: `**Rigveda** chaaron Vedon mein sabse purana hai aur duniya ke sabse purane religious texts mein se ek. **1500–1200 BCE** ke beech mein **Vedic Sanskrit** mein Indus-Sarasvati region mein racha gaya.

**Structure:**
• **10 Mandalas** (books) jismein **1,028 suktas (bhajans)** aur **10,600 verses** hain
• 40,000+ shabd jo 3,500+ saalon se oral tradition (Shruti) ke through yaad rakhe gaye hain

**Das Mandalas:**
• **Mandalas 2–7** ("Family Books") — sabse purane, 7 brahmin parivaron ne rache:
  - Mandala 3: Vishwamitra (ismein **Gayatri Mantra** hai)
  - Mandala 7: Vasishtha
• **Mandala 9** — sab 114 hymns Soma (sacred plant) ko samarpit
• **Mandalas 1 & 10** — baad mein add hue; Mandala 10 mein **Purusha Sukta** aur **Nasadiya Sukta** (Creation Hymn) hai

**Famous Hymns:**
• **Gayatri Mantra** (3.62.10) — sabse pavitra Hindu mantra
• **Purusha Sukta** (10.90) — cosmic purush se srishti
• **Nasadiya Sukta** (10.129) — "Creation Hymn" — sabse purana philosophical inquiry universe ki shuruaat ke baare mein

**Devta:**
• **Indra** (devon ka raja, ~250 hymns) — sabse zyada invoke kiya
• **Agni** (~200 hymns)
• **Soma** — pure Mandala 9 mein
• **Varuna** (cosmic order)

**UNESCO Status:**
• **Vedic Chanting** ko 2003 mein UNESCO ne **Masterpiece of Oral and Intangible Heritage** declare kiya
• 108+ peedhiyon ki **akhand oral parampara**

**Manuscripts:**
• Sabse purani surviving manuscript **Bhandarkar Oriental Research Institute (BORI), Pune** mein hai
• **UNESCO Memory of the World** register mein 2007 se`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Manuscripts", url: "https://gyanbharatam.com" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Yajurveda", "Tell me about Samaveda", "Tell me about Upanishads"],
  },
  {
    keywords: ["yajurveda", "yajur veda", "shukla yajurveda", "krishna yajurveda", "yajna mantra"],
    text: `The **Yajurveda** ("Knowledge of Sacrifice/Worship") is the second of the four Vedas — a compilation of **ritual offering formulas (yajus)** to be chanted by the Adhvaryu priest during Vedic sacrifices.

**Composition:**
• Composed approximately **1200–800 BCE**, after Rigveda but before later Vedas
• Primarily in prose form (unlike Rigveda's verse), with some hymns drawn from Rigveda
• Used by **Adhvaryu priests** who performed physical actions during yajnas

**Two Major Recensions (Shakhas):**

**1. Shukla Yajurveda (White/Vajasaneyi)**
• Contains only **mantras** (verses for chanting)
• **Vajasaneyi Samhita** with 40 chapters (adhyayas), 1,975 mantras
• Two surviving sub-recensions: **Madhyandina** and **Kanva**
• Brahmana attached: **Shatapatha Brahmana** (one of the largest Brahmanas)
• Contains the famous **Isha Upanishad** (40th chapter)

**2. Krishna Yajurveda (Black)**
• Mixes mantras with prose commentary
• Four surviving recensions: **Taittiriya, Maitrayani, Katha, Kapishthala**
• Most widely used in South India

**Content & Themes:**
• Procedures for **Agnihotra** (daily fire ritual)
• **Soma Yajna**, **Rajasuya** (royal consecration), **Ashwamedha** (horse sacrifice)
• **Vajasaneyi Samhita 40** = **Isha Upanishad** — one of the principal Upanishads
• Detailed altar construction (Agni-chayana)
• Cosmological speculations and proto-philosophical ideas

**Connection to Modern India:**
• The chant **"Om Tryambakam Yajamahe..."** (Mahamrityunjaya Mantra) is from Yajurveda
• National motto **"Satyameva Jayate"** is from Mundaka Upanishad (associated with Atharvaveda but also chanted in Vedic tradition)
• Modern Hindu rituals (marriage, upanayana) draw heavily on Yajurveda mantras

**Manuscripts & Preservation:**
• Earliest Yajurveda manuscripts at Pune (BORI), Mysore Oriental Research Institute
• Continuous oral tradition through Yajurvedi families across India
• UNESCO Memory of the World register`,
    textHi: `**यजुर्वेद** ("यज्ञ का ज्ञान") चार वेदों में दूसरा है। **1200-800 ई.पू.** में रचित।

**दो प्रमुख शाखाएँ:**
1. **शुक्ल यजुर्वेद (वाजसनेयी)** — केवल मंत्र; **शतपथ ब्राह्मण**; अध्याय 40 = **ईश उपनिषद**
2. **कृष्ण यजुर्वेद** — मंत्र + गद्य; **तैत्तिरीय, मैत्रायणी, काठ, कपिष्ठल** शाखाएँ

**विषय-वस्तु:**
• **अग्निहोत्र, सोम यज्ञ, राजसूय, अश्वमेध**
• **महामृत्युंजय मंत्र** ("ॐ त्र्यंबकम् यजामहे") यजुर्वेद से
• **अध्वर्यु पुरोहित** यज्ञ कर्म करते थे
• विवाह, उपनयन — सभी आधुनिक हिंदू कर्मकांड यजुर्वेद पर आधारित`,
    textTe: `**యజుర్వేదం** ("యజ్ఞ జ్ఞానం") నాలుగు వేదాలలో రెండవది. **క్రీ.పూ. 1200–800** మధ్య రచించబడింది.

**రెండు ప్రధాన శాఖలు:**
1. **శుక్ల యజుర్వేదం** — కేవలం మంత్రాలు; **శతపథ బ్రాహ్మణం**; 40వ అధ్యాయం = **ఈశ ఉపనిషత్**
2. **కృష్ణ యజుర్వేదం** — మంత్రాలు + గద్యం; **తైత్తిరీయ, మైత్రాయణి, కఠ, కపిష్ఠల** శాఖలు

**ముఖ్య విషయాలు:**
• **అగ్నిహోత్రం, సోమ యజ్ఞం, రాజసూయం, అశ్వమేధం**
• **మహామృత్యుంజయ మంత్రం** యజుర్వేదం నుండి
• **అధ్వర్యు పురోహితులు** యజ్ఞాలు చేసేవారు`,
    textTa: `**யஜுர் வேதம்** ("யாக அறிவு") நான்கு வேதங்களில் இரண்டாவது. **கி.மு. 1200–800** ல் இயற்றப்பட்டது.

**இரண்டு முக்கிய சாகைகள்:**
1. **சுக்ல யஜுர் வேதம்** — மந்திரங்கள் மட்டுமே; **சதபத பிராமணம்**; 40வது அத்தியாயம் = **ஈஷ உபநிடதம்**
2. **கிருஷ்ண யஜுர் வேதம்** — மந்திரம் + உரைநடை; **தைத்திரீய, மைத்ராயணி, கட, கபிஷ்டல** சாகைகள்

**முக்கிய தலைப்புகள்:**
• **அக்னிஹோத்ரம், சோம யாகம், ராஜசூயம், அஸ்வமேதம்**
• **மகாமிருத்யுஞ்சய மந்திரம்** யஜுர் வேதத்திலிருந்து`,
    textHinglish: `**Yajurveda** ("Yajna ka Gyan") chaaron Vedon mein doosra hai — **yagna ke mantra** jo Adhvaryu purohit yajna ke time chant karte the.

**Rachna:**
• **1200–800 BCE** ke beech racha gaya
• Mostly prose mein (Rigveda verse mein tha)

**Do Major Shakhayein:**

**1. Shukla Yajurveda (White/Vajasaneyi)**
• Sirf **mantra** hain (verses)
• **Vajasaneyi Samhita** mein 40 chapters, 1,975 mantras
• Do sub-shakhayein: **Madhyandina** aur **Kanva**
• Brahmana: **Shatapatha Brahmana** (sabse bade Brahmanas mein se ek)
• 40th chapter = famous **Isha Upanishad**

**2. Krishna Yajurveda (Black)**
• Mantra ke saath prose commentary bhi
• 4 shakhayein: **Taittiriya, Maitrayani, Katha, Kapishthala**
• South India mein zyada use hota hai

**Content:**
• **Agnihotra** (daily fire ritual)
• **Soma Yajna, Rajasuya** (raja banane ki ceremony), **Ashwamedha** (ghoda yajna)
• Detailed altar (Agni-chayana) banane ke instructions

**Aaj ke India se connection:**
• **"Om Tryambakam Yajamahe..."** (Mahamrityunjaya Mantra) Yajurveda se hai
• National motto **"Satyameva Jayate"** Mundaka Upanishad se hai
• Modern Hindu rituals (shaadi, upanayana) — sab Yajurveda mantras par based hain

**Manuscripts:**
• Sabse purani manuscripts Pune (BORI) mein hain
• UNESCO Memory of the World register mein hai`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Yajurveda", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
      { title: "Indian Culture – Manuscripts", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Rigveda", "Tell me about Samaveda", "Tell me about Upanishads"],
  },
  {
    keywords: ["samaveda", "sama veda", "samaveda music", "vedic music", "sama gana"],
    text: `The **Samaveda** ("Veda of Melodies") is the third Veda and is considered the **fountainhead of Indian classical music**. It contains hymns set to **specific melodies (saman)** chanted by the Udgatri priest during Soma sacrifices.

**Composition:**
• Composed approximately **1200–1000 BCE**
• Has **1,875 verses** in total
• **95% of verses are borrowed from the Rigveda** — but set to specific musical notations
• Only **75 unique verses** not found in Rigveda

**Structure:**
• **Two main parts:**
  - **Purvarchika** (first 6 chapters) — 585 melodies
  - **Uttararchika** (later books) — additional 1,290 melodies
• **Three surviving recensions (Shakhas):**
  - **Kauthuma** (most widespread, Gujarat & elsewhere)
  - **Ranayaniya** (Maharashtra)
  - **Jaiminiya** (Tamil Nadu and Kerala — preserves the oldest melodies)

**Musical Significance:**
• Foundation of **Indian classical music tradition**
• Introduced the **7 svaras (notes)**: Krushta (Ni), Prathama (Sa), Dvitiya (Re), Tritiya (Ga), Chaturtha (Ma), Mandra (Pa), Atisvarya (Dha)
• Used **3-tone (samik) chanting** initially, evolved to 7 notes
• Considered the origin of **raga** system

**Sama Gana (Chanting Style):**
• Stretching of syllables (vikara, vipruva, anukara)
• Insertion of stobha syllables (haa, hau, hoyi, hu, vaa)
• Rhythm and modulation through tones
• Performed during **Soma Yajnas** — most elaborate Vedic rituals

**UNESCO Recognition:**
• Samaveda chanting is part of the UNESCO **Masterpiece of Intangible Heritage** (2003)
• **Jaiminiya** chanting tradition is the rarest and most archaic — preserved by only a few families

**Connection to Modern Music:**
• Music theorists like **Bharata Muni** in the Natyashastra trace musical theory to Samaveda
• Ancient texts state: "Of the Vedas, I am Samaveda" — Krishna in Bhagavad Gita (10.22)
• Tradition lives in **Vedic chanting schools (pathasalas)** across India`,
    textHi: `**सामवेद** ("मधुर गायन का वेद") तीसरा वेद है और भारतीय शास्त्रीय संगीत का स्रोत माना जाता है। **1200-1000 ई.पू.** में रचित।

**संरचना:**
• कुल **1,875 ऋचाएँ** — 95% ऋग्वेद से
• **पूर्वार्चिक** (585 गान) + **उत्तरार्चिक** (1,290 गान)
• तीन शाखाएँ: **कौथुम, राणायनीय, जैमिनीय**

**संगीत महत्व:**
• **7 स्वर**: क्रुष्ट, प्रथम, द्वितीय, तृतीय, चतुर्थ, मंद्र, अतिस्वार्य
• **राग प्रणाली** का मूल
• **सोम यज्ञों** में उद्गाता पुरोहित द्वारा गाया जाता था

**भगवद गीता:** "वेदों में मैं सामवेद हूँ" — श्रीकृष्ण (10.22)

यूनेस्को ने 2003 में सामवेद गायन को मौखिक विरासत घोषित किया।`,
    textTe: `**సామవేదం** ("మధుర గానం వేదం") మూడవ వేదం, **భారతీయ శాస్త్రీయ సంగీత మూలం** గా పరిగణించబడుతుంది. **క్రీ.పూ. 1200–1000** మధ్య రచించబడింది. **1,875 ఋక్కులు** ఉన్నాయి — 95% ఋగ్వేదం నుండి. **కౌథుమ, రాణాయనీయ, జైమినీయ** మూడు శాఖలు. **7 స్వరాలు** ఉన్నాయి. **సోమ యజ్ఞాలలో** ఉద్గాత పురోహితులు గానం చేసేవారు. భగవద్గీతలో శ్రీకృష్ణుడు: "వేదాలలో నేను సామవేదాన్ని" (10.22). యునెస్కో మౌఖిక వారసత్వం (2003).`,
    textTa: `**சாமவேதம்** ("இனிய இசை வேதம்") மூன்றாவது வேதம், **இந்திய பாரம்பரிய இசையின் மூலம்** என்று கருதப்படுகிறது. **கி.மு. 1200–1000** ல் இயற்றப்பட்டது. **1,875 ருக்குகள்** உள்ளன — 95% ரிக் வேதத்திலிருந்து. **கௌதும, ராணாயனீய, ஜைமினீய** மூன்று சாகைகள். **7 ஸ்வரங்கள்** உள்ளன. **சோம யாகங்களில்** உத்காதா புரோகிதர்கள் பாடினர். யுனெஸ்கோ வாய்மொழி பாரம்பரியம் (2003).`,
    textHinglish: `**Samaveda** ("Melodies ka Veda") teesra Veda hai aur **Indian classical music ka source** mana jata hai. Ismein hymns specific dhunon (saman) mein set hain jo Udgatri purohit Soma yajna ke time gaate the.

**Rachna:**
• **1200–1000 BCE** ke beech
• Total **1,875 verses** hain
• **95% verses Rigveda se liye gaye** — bas specific musical notations mein set kiye
• Sirf **75 unique verses** Rigveda mein nahi hain

**Structure:**
• **2 parts:**
  - **Purvarchika** (pehle 6 chapters) — 585 melodies
  - **Uttararchika** — 1,290 melodies
• **3 surviving shakhayein:**
  - **Kauthuma** (sabse popular, Gujarat)
  - **Ranayaniya** (Maharashtra)
  - **Jaiminiya** (Tamil Nadu, Kerala — sabse purani aur rare)

**Musical Mahatva:**
• Indian classical music ki neev
• **7 svaras (notes)** introduce kiye — Sa, Re, Ga, Ma, Pa, Dha, Ni (Krushta, Prathama, Dvitiya, Tritiya, Chaturtha, Mandra, Atisvarya)
• Pehle 3 notes ka chanting tha, baad mein 7 notes hue
• **Raga system** ki shuruaat yahin se

**Sama Gana (Chanting):**
• Syllables ko stretch karna (vikara)
• Stobha syllables daalna (haa, hau, hoyi, hu, vaa)
• Soma Yajna (sabse elaborate Vedic ritual) mein gaaya jata tha

**Bhagavad Gita (10.22):** Shri Krishna bolte hain: **"Vedon mein main Samaveda hoon"**

**UNESCO Status:**
• 2003 mein UNESCO **Masterpiece of Intangible Heritage**
• **Jaiminiya** tradition sabse archaic — sirf kuch parivar isse sambhal rahe hain`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Samaveda", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
      { title: "Sangeet Natak Akademi", url: "https://sangeetnatak.gov.in" },
    ],
    followUps: ["Tell me about classical music", "Tell me about Rigveda", "Tell me about Atharvaveda"],
  },
  {
    keywords: ["atharvaveda", "atharva veda", "atharvan", "magic mantras", "healing veda"],
    text: `The **Atharvaveda** ("Knowledge of Atharvan") is the fourth and most pragmatic of the Vedas. While the other three Vedas focus on ritual sacrifice, the Atharvaveda contains hymns about **everyday life — healing, family, prosperity, magic, statecraft, and philosophy**.

**Composition:**
• Composed approximately **1200–1000 BCE** but possibly later additions
• Named after sage **Atharvan**, an ancient seer
• **730 hymns** with **5,987 mantras** in 20 books (kandas)
• About **1/6th of verses** are borrowed from Rigveda

**Two Surviving Recensions:**
• **Shaunaka Shakha** — most widespread, primary source today
• **Paippalada Shakha** — preserves older variants, recently rediscovered in Odisha and Kashmir

**Unique Content:**

**1. Medicine & Healing (Ayurveda's roots)**
• Hymns to cure fevers, jaundice, eye disease, poison
• Earliest references to **medicinal plants and herbs**
• Considered the **proto-text of Ayurveda**
• Source of **Charaka Samhita** influences

**2. Family Life & Domestic Rituals**
• Marriage hymns, childbirth rituals
• Prayers for long life, harmony, children
• Building a new house, agriculture

**3. Statecraft & Political**
• **King's coronation** mantras
• Mantras for victory in battle
• Diplomacy and governance

**4. Spells & Counter-Spells**
• Protective mantras (Mantras to repel evil)
• Spells against enemies, witchcraft
• Talismans and amulets

**5. Philosophy**
• Contains the famous **Prashna, Mundaka, and Mandukya Upanishads**
• **Mundaka Upanishad** is the source of India's national motto: **"Satyameva Jayate"** (Truth Alone Triumphs)
• Early speculations on the Atman, Brahman

**Modern Relevance:**
• Source of national motto from Mundaka Upanishad (3.1.6)
• Foundation of Ayurveda's branch of toxicology and pediatrics
• UNESCO Memory of the World — Paippalada manuscripts inscribed in 2007
• Considered the most "people-oriented" Veda for its focus on everyday concerns`,
    textHi: `**अथर्ववेद** चार वेदों में चौथा और सबसे व्यावहारिक है। **दैनिक जीवन, चिकित्सा, परिवार, राजनीति** पर केंद्रित।

• **1200-1000 ई.पू.** में रचित, ऋषि **अथर्वा** के नाम पर
• **730 सूक्त, 5,987 मंत्र, 20 कांड**
• दो शाखाएँ: **शौनक** और **पैप्पलाद**

**अनूठा विषय-वस्तु:**
• **औषधि और चिकित्सा** — आयुर्वेद का स्रोत
• **पारिवारिक अनुष्ठान** — विवाह, संतान, नया घर
• **राजनीति** — राजा का राज्याभिषेक
• **मंत्र-तंत्र** — रक्षात्मक, शत्रुनाश

**दर्शन:**
• **प्रश्न, मुंडक, माण्डूक्य उपनिषद** अथर्ववेद से
• **मुंडक उपनिषद (3.1.6)** से भारत का राष्ट्रीय आदर्श वाक्य: **"सत्यमेव जयते"**`,
    textTe: `**అథర్వవేదం** నాలుగు వేదాలలో నాల్గవది, అత్యంత ఆచరణాత్మకమైనది. **రోజువారీ జీవితం, వైద్యం, కుటుంబం, రాజనీతి** పై దృష్టి సారిస్తుంది. **క్రీ.పూ. 1200–1000** మధ్య రచించబడింది. **అథర్వన్ ఋషి** పేరిట. **730 సూక్తాలు, 5,987 మంత్రాలు, 20 కాండలు**. **శౌనక, పైప్పలాద** రెండు శాఖలు. **ఆయుర్వేదానికి మూలం**. **ముండక ఉపనిషత్తు (3.1.6)** నుండి భారత జాతీయ నినాదం: **"సత్యమేవ జయతే"**.`,
    textTa: `**அதர்வ வேதம்** நான்கு வேதங்களில் நான்காவது, மிக நடைமுறையானது. **அன்றாட வாழ்க்கை, மருத்துவம், குடும்பம், அரசியல்** மீது கவனம். **கி.மு. 1200–1000** ல் இயற்றப்பட்டது. **அதர்வன் முனிவர்** பெயரில். **730 சூக்தங்கள், 5,987 மந்திரங்கள், 20 காண்டங்கள்**. **சௌனக, பைப்பலாத** இரண்டு சாகைகள். **ஆயுர்வேதத்தின் மூலம்**. **முண்டக உபநிடதம் (3.1.6)** ல் இருந்து இந்திய தேசிய குறிக்கோள்: **"சத்யமேவ ஜயதே"**.`,
    textHinglish: `**Atharvaveda** chaaron Vedon mein chautha aur sabse practical Veda hai. Doosre Vedas yajna par focused hain, lekin Atharvaveda **roz ki zindagi par** — healing, parivar, prosperity, jaadu-tona, rajneeti, philosophy.

**Rachna:**
• **1200–1000 BCE** ke beech racha gaya
• Rishi **Atharvan** ke naam par
• **730 hymns** mein **5,987 mantras**, 20 kandas (books)
• 1/6 verses Rigveda se hain

**Do Surviving Shakhayein:**
• **Shaunaka Shakha** — sabse popular
• **Paippalada Shakha** — purani version, recently Odisha aur Kashmir mein dhundi gayi

**Unique Content:**

**1. Chikitsa aur Healing (Ayurveda ki neev)**
• Bukhar, peelia, aankh ki bimari, zeher utarne ke mantra
• **Aushdhi (medicinal plants)** ki sabse purani references
• Ayurveda ka proto-text mana jata hai

**2. Parivarik Jeevan**
• Shaadi ke mantra, bachche ke janm ke mantra
• Lambi umar, ghar mein khushi ke prayers
• Naya ghar banane, kheti karne ke mantra

**3. Rajneeti (Statecraft)**
• Raja ka **rajyabhishek** ke mantra
• Yudh mein jeet ke mantra

**4. Mantra-Tantra**
• Rakshatmak mantras (evil se bachne ke liye)
• Talisman aur taveez

**5. Darshan (Philosophy)**
• **Prashna, Mundaka, Mandukya Upanishads** isi se aaye hain
• **Mundaka Upanishad (3.1.6)** se India ka **national motto: "Satyameva Jayate"** (Sach hi jeetta hai)

**Aaj ka mahatva:**
• National motto ka source
• Ayurveda ki toxicology aur pediatrics ki neev
• UNESCO Memory of the World mein Paippalada manuscripts (2007)`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Atharvaveda", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Manuscripts", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Rigveda", "Tell me about Ayurveda", "Tell me about Upanishads"],
  },
  {
    keywords: ["upanishads", "upanishad", "vedanta", "principal upanishads", "brahman atman", "108 upanishads"],
    text: `The **Upanishads** are the philosophical, mystical, and spiritual portions of the Vedas — also called **Vedanta** ("end/culmination of Vedas"). Composed approximately **800–200 BCE**, they form the foundation of Hindu philosophy.

**Number & Structure:**
• Tradition says there are **108 Upanishads** (Muktika Canon)
• **13 are considered "Principal" (Mukhya) Upanishads** — accepted as authoritative by Adi Shankaracharya
• Each Upanishad is attached to one of the four Vedas

**The 13 Principal Upanishads:**
1. **Isha** (Yajurveda) — "He who pervades all"
2. **Kena** (Samaveda) — "By whom?"
3. **Katha** (Yajurveda) — Story of Nachiketa and Yama, Lord of Death
4. **Prashna** (Atharvaveda) — Six questions on creation, Brahman
5. **Mundaka** (Atharvaveda) — Two birds metaphor; source of "Satyameva Jayate"
6. **Mandukya** (Atharvaveda) — Shortest; analyzes "Om" (only 12 verses)
7. **Taittiriya** (Yajurveda) — Five sheaths (pancha kosha) theory
8. **Aitareya** (Rigveda) — Cosmogony
9. **Chandogya** (Samaveda) — "Tat Tvam Asi" (Thou Art That)
10. **Brihadaranyaka** (Yajurveda) — Largest; conversations of Yajnavalkya
11. **Svetasvatara** (Yajurveda) — Theistic philosophy
12. **Kaushitaki** (Rigveda) — Self-realization
13. **Maitri / Maitrayaniya** (Yajurveda) — Meditative practices

**Core Concepts:**
• **Brahman** — Ultimate Reality, infinite consciousness
• **Atman** — The Self / individual soul
• **Tat Tvam Asi** ("Thou Art That") — Atman = Brahman; one of the Mahavakyas
• **Aham Brahmasmi** ("I am Brahman")
• **Karma** — Law of cause and effect
• **Samsara** — Cycle of birth and death
• **Moksha** — Liberation from samsara
• **Maya** — Cosmic illusion

**The Four Mahavakyas (Great Sayings):**
1. **"Prajnanam Brahma"** (Aitareya) — Consciousness is Brahman
2. **"Aham Brahmasmi"** (Brihadaranyaka) — I am Brahman
3. **"Tat Tvam Asi"** (Chandogya) — Thou Art That
4. **"Ayam Atma Brahma"** (Mandukya) — This Self is Brahman

**Global Impact:**
• Translated into Persian by **Dara Shikoh** (1657) as "Sirr-e-Akbar" (Greatest Mystery)
• **Arthur Schopenhauer** called Upanishads "the consolation of my life and my death"
• Inspired Henry David Thoreau, Ralph Waldo Emerson (American Transcendentalism)
• **Yoga, Vedanta, Advaita philosophy** trace their roots here`,
    textHi: `**उपनिषद** वेदों के दार्शनिक भाग हैं — **वेदांत** ("वेदों का अंत/शिखर") भी कहलाते हैं। **800-200 ई.पू.** में रचित।

**संख्या:** परंपरा में **108 उपनिषद** हैं — **13 प्रमुख** आदि शंकराचार्य द्वारा प्रमाणित।

**13 प्रमुख उपनिषद:** ईश, केन, कठ, प्रश्न, मुंडक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छांदोग्य, बृहदारण्यक, श्वेताश्वतर, कौषीतकी, मैत्रायणी।

**मूल अवधारणाएँ:**
• **ब्रह्म** — परम सत्य
• **आत्मा** — व्यक्तिगत आत्मा
• **तत् त्वम् असि** — "तू वही है"
• **कर्म, संसार, मोक्ष, माया**

**चार महावाक्य:**
1. प्रज्ञानम् ब्रह्म
2. अहम् ब्रह्मास्मि
3. तत् त्वम् असि
4. अयम् आत्मा ब्रह्म

**मुंडक उपनिषद (3.1.6)** से भारत का राष्ट्रीय आदर्श: **"सत्यमेव जयते"**`,
    textTe: `**ఉపనిషత్తులు** వేదాల తాత్విక భాగాలు — **వేదాంతం** (వేదాల ముగింపు) అని కూడా అంటారు. **క్రీ.పూ. 800–200** మధ్య రచించబడ్డాయి. **108 ఉపనిషత్తులు** ఉన్నాయి, **13 ప్రధానమైనవి**. ముఖ్యమైనవి: **ఈశ, కేన, కఠ, ప్రశ్న, ముండక, మాండూక్య, తైత్తిరీయ, ఛాందోగ్య, బృహదారణ్యక**. **బ్రహ్మం, ఆత్మ, తత్ త్వం అసి, మోక్షం, మాయ** ముఖ్య భావనలు. **4 మహావాక్యాలు**: ప్రజ్ఞానం బ్రహ్మ, అహం బ్రహ్మాస్మి, తత్ త్వం అసి, అయం ఆత్మ బ్రహ్మ.`,
    textTa: `**உபநிடதங்கள்** வேதங்களின் தத்துவ பகுதிகள் — **வேதாந்தம்** (வேதங்களின் முடிவு) என்றும் அழைக்கப்படுகின்றன. **கி.மு. 800–200** ல் இயற்றப்பட்டன. **108 உபநிடதங்கள்** உள்ளன, **13 முக்கியமானவை**. முக்கியமானவை: **ஈஷ, கேன, கட, பிரஸ்ன, முண்டக, மாண்டூக்ய, தைத்திரீய, சாந்தோக்ய, பிருஹதாரண்யக**. **பிரம்மன், ஆத்மா, தத் த்வம் அஸி, மோக்ஷம், மாயா** முக்கிய கருத்துக்கள்.`,
    textHinglish: `**Upanishads** Vedon ke philosophical, mystical, aur spiritual hisse hain — **Vedanta** ("Vedon ka ant/shikhar") bhi kehte hain. **800–200 BCE** ke beech rache gaye, Hindu philosophy ki neev.

**Sankhya aur Structure:**
• Parampara mein **108 Upanishads** hain (Muktika Canon)
• **13 "Principal (Mukhya) Upanishads"** hain — Adi Shankaracharya ne authoritative mana
• Har Upanishad chaaron Vedas mein se kisi ek se attached hai

**13 Pramukh Upanishads:**
1. **Isha** (Yajurveda) — "Sab mein vyapt hai"
2. **Kena** (Samaveda) — "Kiske dwara?"
3. **Katha** (Yajurveda) — Nachiketa aur Yama (Mrityu) ki katha
4. **Prashna** (Atharvaveda) — Srishti par 6 sawaal
5. **Mundaka** (Atharvaveda) — "Satyameva Jayate" ka source
6. **Mandukya** (Atharvaveda) — sabse chota; "Om" ka vishleshan (sirf 12 shlokas)
7. **Taittiriya** (Yajurveda) — Pancha Kosha theory
8. **Aitareya** (Rigveda) — Srishti
9. **Chandogya** (Samaveda) — "Tat Tvam Asi"
10. **Brihadaranyaka** (Yajurveda) — sabse bada; Yajnavalkya ki baatein
11. **Svetasvatara** (Yajurveda) — Theistic darshan
12. **Kaushitaki** (Rigveda)
13. **Maitri** (Yajurveda)

**Mool Avdharnayein:**
• **Brahman** — Param Satya, anant chetna
• **Atman** — Vyaktigat aatma
• **Tat Tvam Asi** ("Tu hi wo hai") — Atman = Brahman
• **Aham Brahmasmi** ("Main Brahman hoon")
• **Karma, Samsara, Moksha, Maya**

**Chaar Mahavakya:**
1. **"Prajnanam Brahma"** — Chetna hi Brahman hai
2. **"Aham Brahmasmi"** — Main Brahman hoon
3. **"Tat Tvam Asi"** — Tu wo hi hai
4. **"Ayam Atma Brahma"** — Yeh atma hi Brahman hai

**Vishva par Prabhav:**
• **Dara Shikoh** ne 1657 mein Persian mein anuvad kiya — "Sirr-e-Akbar"
• **Arthur Schopenhauer** ne kaha: "Upanishads meri zindagi aur maut ka sahara hain"
• American Transcendentalism (Thoreau, Emerson) ko inspire kiya
• Yoga, Vedanta, Advaita darshan ki neev`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Upanishads", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Studies", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Knowledge Systems", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Bhagavad Gita", "Tell me about Rigveda", "Tell me about Yoga"],
  },
  {
    keywords: ["bhagavad gita", "gita", "bhagvad gita", "bhagavadgita", "krishna arjuna", "gita teachings"],
    text: `The **Bhagavad Gita** ("Song of the Lord") is a 700-verse Sanskrit dialogue between Prince **Arjuna** and his charioteer **Lord Krishna**, set on the battlefield of Kurukshetra. It is part of the **Bhishma Parva** of the Mahabharata (chapters 23–40) and one of the most influential spiritual texts in world history.

**Composition:**
• Composed approximately **400 BCE – 200 CE**
• **700 verses (shlokas)** in **18 chapters**
• Part of the **Mahabharata** (longest epic in the world)
• Attributed to sage **Vyasa**

**Setting:**
• On the eve of the **Kurukshetra War** (between Pandavas and Kauravas)
• Arjuna, faced with fighting his own relatives and gurus, drops his weapons and refuses to fight
• Krishna delivers the Gita to remove his doubts — a discourse on duty (dharma), karma, devotion (bhakti), and self-realization

**18 Chapters (Yogas):**
1. **Arjuna Vishada Yoga** — Arjuna's despair
2. **Sankhya Yoga** — Eternal soul
3. **Karma Yoga** — Selfless action
4. **Jnana Karma Sanyasa Yoga** — Wisdom and action
5. **Karma Sanyasa Yoga** — Renunciation
6. **Dhyana Yoga** — Meditation
7. **Jnana Vijnana Yoga** — Knowledge of God
8. **Akshara Brahma Yoga** — Imperishable Brahman
9. **Raja Vidya Raja Guhya Yoga** — Royal knowledge
10. **Vibhuti Yoga** — Divine glories ("I am Samaveda among Vedas")
11. **Vishvarupa Darshana Yoga** — Cosmic form
12. **Bhakti Yoga** — Devotion
13. **Kshetra Kshetragna Vibhaga Yoga** — Field and knower
14. **Gunatraya Vibhaga Yoga** — Three gunas
15. **Purushottama Yoga** — Supreme Person
16. **Daivasura Sampad Vibhaga Yoga** — Divine and demonic
17. **Shraddha Traya Vibhaga Yoga** — Three faiths
18. **Moksha Sanyasa Yoga** — Liberation through renunciation

**Famous Verses:**
• **"Karmanye Vadhikaraste Ma Phaleshu Kadachana"** (2.47) — "You have right to action, never to its fruits"
• **"Yada Yada Hi Dharmasya..."** (4.7) — "Whenever dharma declines, I incarnate"
• **"Sarva Dharman Parityajya..."** (18.66) — "Abandon all dharmas, surrender to Me alone"
• **"Vasamsi Jirnani..."** (2.22) — "As worn-out clothes are cast off, so the soul takes new bodies"

**Three Paths (Yoga):**
• **Karma Yoga** — Path of selfless action
• **Bhakti Yoga** — Path of devotion
• **Jnana Yoga** — Path of knowledge

**Global Impact:**
• **Mahatma Gandhi** called it his "spiritual dictionary"
• **J. Robert Oppenheimer** quoted it after the atomic test: "Now I am become Death, the destroyer of worlds"
• Translated into **75+ languages**, with **300+ English translations**
• **Adi Shankara, Ramanuja, Madhva** wrote major commentaries
• **Aldous Huxley, Henry David Thoreau, Albert Einstein, Carl Jung** — all influenced

**Annual Celebration:**
• **Gita Jayanti** observed on Shukla Ekadashi of Margashirsha month (December)`,
    textHi: `**भगवद गीता** ("भगवान का गीत") महाभारत के भीष्म पर्व का भाग है — कुरुक्षेत्र युद्ध की पूर्व संध्या पर **श्रीकृष्ण और अर्जुन** का संवाद।

• **700 श्लोक, 18 अध्याय**
• **400 ई.पू. – 200 ई.** के बीच रचित

**तीन मार्ग:**
• **कर्म योग** — निष्काम कर्म
• **भक्ति योग** — समर्पण
• **ज्ञान योग** — ज्ञान

**प्रसिद्ध श्लोक:**
• **"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"** (2.47)
• **"यदा यदा हि धर्मस्य..."** (4.7)
• **"सर्वधर्मान् परित्यज्य..."** (18.66)

**प्रभाव:**
• **गांधीजी** ने इसे "आध्यात्मिक शब्दकोश" कहा
• **75+ भाषाओं** में अनुवादित
• **गीता जयंती** — मार्गशीर्ष शुक्ल एकादशी`,
    textTe: `**భగవద్గీత** ("భగవంతుని గీతం") మహాభారతంలోని భీష్మ పర్వంలోని భాగం — కురుక్షేత్ర యుద్ధానికి ముందు **శ్రీకృష్ణుడు మరియు అర్జునుని** మధ్య సంభాషణ. **700 శ్లోకాలు, 18 అధ్యాయాలు**. **క్రీ.పూ. 400 – క్రీ.శ. 200** మధ్య రచించబడింది. **3 మార్గాలు**: కర్మ, భక్తి, జ్ఞాన యోగాలు. ప్రసిద్ధ శ్లోకం: **"కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన"** (2.47). మహాత్మా గాంధీ దీన్ని **"ఆధ్యాత్మిక శబ్దకోశం"** అని పిలిచారు. **75+ భాషల్లోకి అనువదించబడింది**.`,
    textTa: `**பகவத் கீதை** ("பகவானின் பாடல்") மகாபாரதத்தின் பீஷ்ம பர்வத்தின் பகுதி — குருக்ஷேத்ர போருக்கு முன் **ஸ்ரீ கிருஷ்ணரும் அர்ஜுனரும்** உரையாடல். **700 ஸ்லோகங்கள், 18 அத்தியாயங்கள்**. **கி.மு. 400 – கி.பி. 200** ல் இயற்றப்பட்டது. **3 பாதைகள்**: கர்ம, பக்தி, ஞான யோகம். புகழ்பெற்ற ஸ்லோகம்: **"கர்மண்யேவாதிகாரஸ்தே மா பலேஷு கதாசன"** (2.47). மகாத்மா காந்தி இதை **"ஆன்மீக அகராதி"** என்று அழைத்தார்.`,
    textHinglish: `**Bhagavad Gita** ("Bhagwan ka Geet") Mahabharat ke Bhishma Parva ka hissa hai — Kurukshetra ke maidan par **Shri Krishna aur Arjun ka samvaad**. Yeh duniya ke sabse influential spiritual texts mein se ek hai.

**Rachna:**
• **400 BCE – 200 CE** ke beech racha gaya
• **700 verses (shlok)** mein **18 adhyay (chapters)**
• **Mahabharata** ka hissa (duniya ka sabse bada epic)
• **Rishi Vyasa** ne racha

**Setting:**
• **Kurukshetra Yudh** se pehle
• Arjun apne hi rishtedaaron aur guruon ke against ladne se mana karte hain
• Krishna ne unhe **dharma, karma, bhakti, aur self-realization** ka updesh diya

**18 Adhyay (Yogas):**
1. **Arjuna Vishada Yoga** — Arjun ki niraasha
2. **Sankhya Yoga** — Atma ki amartata
3. **Karma Yoga** — Nishkam karm
4. **Jnana Karma Sanyasa Yoga** — Gyaan aur karm
5. **Karma Sanyasa Yoga** — Tyaag
6. **Dhyana Yoga** — Meditation
7. **Jnana Vijnana Yoga** — Bhagwan ka gyaan
8. **Akshara Brahma Yoga** — Anashvar Brahman
9. **Raja Vidya Yoga** — Raja vidya
10. **Vibhuti Yoga** — Bhagwan ki vibhutiyan
11. **Vishvarupa Darshana** — Cosmic form
12. **Bhakti Yoga** — Bhakti ka maarg
13. **Kshetra Kshetragna** — Kshetra aur knower
14. **Gunatraya Vibhaga** — 3 gunas
15. **Purushottama Yoga** — Supreme Person
16. **Daivasura Sampad** — Divine aur demonic
17. **Shraddha Traya** — 3 prakar ki shraddha
18. **Moksha Sanyasa** — Moksh aur sanyaas

**Famous Shlok:**
• **"Karmanye Vadhikaraste Ma Phaleshu Kadachana"** (2.47) — "Karm karne ka adhikar hai, phal par nahi"
• **"Yada Yada Hi Dharmasya..."** (4.7) — "Jab jab dharma ki haani hoti hai, main aata hoon"
• **"Sarva Dharman Parityajya..."** (18.66) — "Sab dharmon ko chodkar mujhe sharan mein aao"

**Teen Maarg (3 Paths):**
• **Karma Yoga** — Nishkam karm
• **Bhakti Yoga** — Samarpan
• **Jnana Yoga** — Gyaan

**Duniya par Prabhav:**
• **Mahatma Gandhi** ne ise apna **"spiritual dictionary"** kaha
• **Robert Oppenheimer** ne atom bomb test ke baad kaha: "Ab main Maut ban gaya hoon, duniya ka vinashak"
• **75+ bhashayon mein anuvad** (300+ English translations)
• **Aldous Huxley, Albert Einstein, Carl Jung** — sab influence hue

**Tyohaar:**
• **Gita Jayanti** — Margashirsh Shukla Ekadashi (December mein)`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Bhagavad Gita", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Bhagavad Gita Studies", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Sanskrit Texts", url: "https://gyanbharatam.com" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahabharata", "Tell me about Krishna", "Tell me about Upanishads"],
  },
  {
    keywords: ["vedangas", "shiksha", "chandas", "vyakarana", "nirukta", "jyotisha", "kalpa", "panini"],
    text: `The **Vedangas** ("Limbs of the Vedas") are **six auxiliary disciplines** essential for the correct understanding, recitation, and ritual application of the Vedas. They form a complete system of education in ancient India.

**The Six Vedangas:**

**1. Shiksha (Phonetics & Pronunciation)**
• Science of correct pronunciation and chanting of Vedic mantras
• Topics: svara (accent), matra (duration), bala (force), sama (rhythm), santana (continuity)
• Key text: **Pratisakhya** of each Veda
• Considered the "nose" of the Vedas (smell — first sense)

**2. Chandas (Prosody/Meter)**
• Science of Vedic poetic meters
• Famous meters: **Gayatri** (24 syllables), **Anushtubh** (32), **Trishtubh** (44), **Jagati** (48)
• Key text: **Chandahsutra of Pingala** (also gave the world the first description of binary numbers!)
• Considered the "feet" of the Vedas

**3. Vyakarana (Grammar)**
• Science of grammar and word formation
• Key text: **Ashtadhyayi of Panini** (~400 BCE) — the most comprehensive grammar ever written for any language
• Contains 3,959 rules in 8 chapters
• Frits Staal called it "one of the greatest monuments of human intelligence"
• Considered the "mouth" of the Vedas

**4. Nirukta (Etymology)**
• Science of word origins and meanings
• Key text: **Nirukta of Yaska** (~500 BCE)
• Explains obscure Vedic words and their philosophical meanings
• Considered the "ear" of the Vedas

**5. Jyotisha (Astronomy & Astrology)**
• Science of celestial bodies and time
• Determining auspicious times for yajnas (rituals)
• Key text: **Vedanga Jyotisha of Lagadha** (~1400 BCE) — oldest astronomical text
• Foundation of Indian astronomy, calendar, mathematics
• Later: Aryabhata, Brahmagupta, Varahamihira built on this
• Considered the "eye" of the Vedas

**6. Kalpa (Ritual Procedures)**
• Science of ritual procedure
• Four divisions:
  - **Shrauta Sutras** — solemn yajnas
  - **Grihya Sutras** — domestic rituals (marriage, naming, sacred thread)
  - **Dharma Sutras** — law and ethics (later expanded into Dharmashastras like Manusmriti)
  - **Shulba Sutras** — geometry for altar construction (contains Pythagorean theorem in 800 BCE!)
• Considered the "hands" of the Vedas

**Why Six?**
The Vedangas form a complete person — Shiksha (smell/nose), Chandas (feet), Vyakarana (mouth), Nirukta (ear), Jyotisha (eye), Kalpa (hands). Together, they enable accurate Vedic transmission and ritual practice.

**Modern Relevance:**
• **Panini's grammar** — basis of generative grammar (Noam Chomsky acknowledged influence)
• **Pingala's prosody** — first binary description in world history
• **Shulba Sutras** — earliest mathematical text with geometric theorems
• **Vedic astronomy** — basis of Hindu calendar still used today`,
    textHi: `**वेदांग** ("वेदों के अंग") **छह सहायक विद्याएँ** हैं जो वेदों की समझ और प्रयोग के लिए आवश्यक हैं।

**छह वेदांग:**
1. **शिक्षा** — उच्चारण विज्ञान (नाक)
2. **छंद** — काव्यगत मीटर (पैर) — **पिंगल का छंदसूत्र**
3. **व्याकरण** — भाषा विज्ञान (मुख) — **पाणिनि की अष्टाध्यायी** (~400 ई.पू.) — 3,959 सूत्र
4. **निरुक्त** — व्युत्पत्ति (कान) — **यास्क का निरुक्त**
5. **ज्योतिष** — खगोल विज्ञान (आँख) — **लगध का वेदांग ज्योतिष**
6. **कल्प** — कर्मकांड (हाथ) — श्रौत, गृह्य, धर्म, **शुल्ब सूत्र** (पाइथागोरस से 1300 वर्ष पहले!)

**आधुनिक प्रभाव:**
• **पाणिनि की व्याकरण** — चॉमस्की ने प्रभाव माना
• **पिंगल** — बाइनरी संख्याओं का पहला वर्णन
• **शुल्ब सूत्र** — प्राचीनतम गणितीय पाठ`,
    textTe: `**వేదాంగాలు** ("వేదాల అంగాలు") **6 సహాయక శాస్త్రాలు** — వేదాల అవగాహన మరియు ఉపయోగానికి అవసరం. 1. **శిక్ష** (ఉచ్చారణ) 2. **ఛందస్సు** (కావ్య మీటర్) 3. **వ్యాకరణం** (పాణిని అష్టాధ్యాయి) 4. **నిరుక్తం** (యాస్క నిరుక్తం) 5. **జ్యోతిష్యం** (ఖగోళశాస్త్రం) 6. **కల్పం** (కర్మకాండ - శుల్బ సూత్రాలలో పైథాగరస్ సిద్ధాంతం). **పాణిని వ్యాకరణం** ఆధునిక భాషాశాస్త్రాన్ని ప్రభావితం చేసింది.`,
    textTa: `**வேதாங்கங்கள்** ("வேதங்களின் உறுப்புகள்") **6 துணை அறிவியல்கள்** — வேதங்களை புரிந்துகொள்ள தேவை. 1. **சிக்ஷா** (உச்சரிப்பு) 2. **சந்தஸ்** (கவிதை யாப்பு) 3. **வ்யாகரணம்** (பாணினியின் அஷ்டாத்யாயி) 4. **நிருக்தம்** (யாஸ்கரின் நிருக்தம்) 5. **ஜ்யோதிஷ்யம்** (வானியல்) 6. **கல்பம்** (சடங்குகள் - சுல்ப சூத்திரங்களில் பித்தாகரஸ் தேற்றம்).`,
    textHinglish: `**Vedangas** ("Vedon ke ang") **6 sahaayak vidyayein** hain jo Vedon ki samajh aur use ke liye zaroori hain.

**6 Vedang:**

**1. Shiksha (Phonetics)**
• Vedic mantra ki sahi ucharan ki vidya
• Svara, matra, bala, sama, santana
• Veda ka "naak" mana jata hai

**2. Chandas (Meter)**
• Vedic kavya ke meters ki vidya
• Famous meters: Gayatri (24 akshar), Anushtubh (32), Trishtubh (44), Jagati (48)
• Key text: **Pingala ka Chandahsutra** — duniya mein **binary numbers ka pehla description** isi mein hai!
• Veda ke "pair"

**3. Vyakarana (Grammar)**
• Bhasha aur shabd ki vidya
• **Panini ki Ashtadhyayi** (~400 BCE) — duniya ki sabse comprehensive grammar
• 3,959 sutra, 8 chapters
• Veda ka "mukh"

**4. Nirukta (Etymology)**
• Shabd ki utpatti ki vidya
• **Yaska ka Nirukta** (~500 BCE)
• Veda ka "kaan"

**5. Jyotisha (Astronomy)**
• Khagol vidya — yajna ke liye sahi samay nirdharit karne ke liye
• **Lagadha ka Vedanga Jyotisha** (~1400 BCE) — sabse purana astronomical text
• Aryabhata, Brahmagupta, Varahamihira ki neev
• Veda ki "aankh"

**6. Kalpa (Ritual)**
• Kriya kalap ki vidya — 4 divisions:
  - **Shrauta Sutras** — bade yajna
  - **Grihya Sutras** — gharelu rituals (shaadi, namkaran, janeu)
  - **Dharma Sutras** — kanoon aur naitikta
  - **Shulba Sutras** — yajna vedi ki geometry — **Pythagoras se 1300 saal pehle** Pythagorean theorem!
• Veda ke "haath"

**Aaj ka mahatva:**
• **Panini ki grammar** — Noam Chomsky ne influence maana modern linguistics ke liye
• **Pingala** — binary numbers ka inventor (3,000 saal pehle)
• **Shulba Sutras** — sabse purana mathematical text geometry ke saath
• Indian calendar abhi bhi Vedic astronomy par based hai`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Vedangas", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Sciences", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Sanskrit & Astronomy", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Sanskrit", "Tell me about ancient mathematics", "Tell me about Upanishads"],
  },
  {
    keywords: ["yajna", "yagna", "havan", "vedic ritual", "fire ritual", "homa", "agnihotra"],
    text: `**Yajna** (also spelled Yagna, Yagya) is the **central Vedic ritual** involving offerings to **Agni (Sacred Fire)** as the conduit to the gods. It is the practical application of Vedic knowledge — connecting the human, natural, and divine worlds.

**Etymology:** From Sanskrit "yaj" — "to worship, sacrifice, honor"

**Three Aspects of Yajna (Tripath):**
1. **Deva Pujan** — Honoring the divine
2. **Sangatikaran** — Building community / unity
3. **Daan** — Charity / giving

**Major Types of Yajnas:**

**Daily Rituals (Nitya Karma):**
• **Agnihotra** — Daily fire ritual at sunrise/sunset, lasting 5–10 minutes
• **Sandhya Vandanam** — Three daily prayers (dawn, noon, dusk)
• **Pancha Mahayajna** — Five great daily duties for householders

**Sacred Fires (Tretagni):**
• **Garhapatya** — Household/cooking fire
• **Ahavaniya** — Eastern fire for offerings
• **Dakshinagni** — Southern fire for ancestors

**Major Yajnas:**
• **Soma Yajna** — Most elaborate, lasting up to a year, involving Soma plant juice
• **Ashvamedha** — Royal "horse sacrifice" for imperial sovereignty
• **Rajasuya** — Royal consecration ceremony
• **Vajapeya** — "Drink of strength" — royal yajna
• **Putrakameshti** — For progeny (King Dasharatha performed this for Rama's birth)
• **Atiratra** — All-night ritual (recently performed at Kerala in 2011 — Athirathram)

**Householder Rituals (Grihya):**
• **Vivaha** — Marriage with seven steps (Saptapadi) around fire
• **Namakarana** — Naming ceremony
• **Upanayana** — Sacred thread investiture
• **Antyeshti** — Funeral rites
• **Griha Pravesh** — Housewarming

**Components of a Yajna:**
• **Yajamana** — Patron/host
• **Ritviks** — Priests (Hotar, Adhvaryu, Udgatri, Brahman)
• **Mantra** — Sacred chants
• **Havya** — Offerings (ghee, grains, soma, herbs)
• **Yajnavedi** — Fire altar (geometric — squares, triangles, eagle-shapes)
• **Dakshina** — Gift to priests

**Modern Practice:**
• Athirathram performed in **Kerala (2011)** with international scientific observers
• Studies suggest yajnas may **purify air** — reduce bacteria and pollutants
• Practiced daily in temples, ashrams, homes across India
• **Maha Kumbh** and other major events feature large public yajnas

**Spiritual Meaning:**
• Inner yajna (manas yajna) — meditation/self-discipline as offering
• Bhagavad Gita devotes Chapter 4 to discussing types of yajnas (knowledge-yajna, meditation-yajna, etc.)`,
    textHi: `**यज्ञ** (यज्ञ, होम, हवन) वैदिक धर्म का केंद्रीय अनुष्ठान है — **अग्नि** को साक्षी मानकर देवताओं को आहुति।

**तीन पक्ष:** देव पूजन, संगतिकरण, दान

**प्रमुख यज्ञ:**
• **अग्निहोत्र** — दैनिक
• **सोम यज्ञ, अश्वमेध, राजसूय, वाजपेय**
• **पुत्रकामेष्टि** — दशरथ ने राम के लिए किया

**तीन अग्नि:** गार्हपत्य, आहवनीय, दक्षिणाग्नि

**गृह्य संस्कार:** विवाह (सप्तपदी), नामकरण, उपनयन, अंत्येष्टि

**आधुनिक:** केरल में 2011 में **अतिरात्रम** अंतरराष्ट्रीय वैज्ञानिक प्रेक्षण के साथ; अध्ययन सुझाते हैं कि यज्ञ वायु को शुद्ध करते हैं।`,
    textTe: `**యజ్ఞం** (యజ్ఞ, హోమ, హవన) వేద ధర్మంలో కేంద్ర అనుష్ఠానం — **అగ్నిని సాక్షిగా** దేవతలకు ఆహుతి. **3 పక్షాలు**: దేవ పూజన, సంగతీకరణ, దానం. **ముఖ్య యజ్ఞాలు**: అగ్నిహోత్రం, సోమ యజ్ఞం, అశ్వమేధం, రాజసూయం, వాజపేయం, పుత్రకామేష్టి. **3 అగ్నులు**: గార్హపత్యం, ఆహవనీయం, దక్షిణాగ్ని. **గృహ్య సంస్కారాలు**: వివాహం (సప్తపది), నామకరణం, ఉపనయనం, అంత్యేష్టి. **2011లో కేరళలో అతిరాత్రం** అంతర్జాతీయ శాస్త్రవేత్తల పరిశీలనతో నిర్వహించబడింది.`,
    textTa: `**யாகம்** (யக்ஞா, ஹோம, ஹவன) வேத மதத்தின் மைய சடங்கு — **அக்னியை சாட்சியாக** வைத்து தெய்வங்களுக்கு ஆகுதி. **3 அம்சங்கள்**: தேவ பூஜனம், சங்கதிகரணம், தானம். **முக்கிய யாகங்கள்**: அக்னிஹோத்ரம், சோம யாகம், அஸ்வமேதம், ராஜசூயம், வாஜபேயம், புத்திரகாமேஷ்டி. **3 அக்னிகள்**: கார்ஹபத்யம், ஆஹவனீயம், தக்ஷிணாக்னி.`,
    textHinglish: `**Yajna** (Havan, Homa bhi kehte hain) Vedic dharma ka **central ritual** hai — **Agni (sacred fire)** ko sakshi maan kar devtaon ko aahuti dena.

**Etymology:** Sanskrit "yaj" se — "puja karna, daan dena, samarpit karna"

**Yajna ke 3 Aspects:**
1. **Deva Pujan** — bhagwan ki puja
2. **Sangatikaran** — sangha banana, ekta
3. **Daan** — daan dena

**Major Yajnas:**

**Daily (Nitya Karma):**
• **Agnihotra** — sabse simple, daily fire ritual subah/shaam 5-10 min ka
• **Pancha Mahayajna** — grihasthi ke 5 daily duties

**3 Sacred Fires (Tretagni):**
• **Garhapatya** — gharelu/cooking fire
• **Ahavaniya** — purab ki aag (offerings ke liye)
• **Dakshinagni** — dakshin ki aag (purvajon ke liye)

**Bade Yajna:**
• **Soma Yajna** — sabse elaborate, 1 saal tak chalta tha
• **Ashvamedha** — "ghoda yajna", samrajya ke liye
• **Rajasuya** — raja banane ki ceremony
• **Vajapeya** — "shakti ka peya"
• **Putrakameshti** — santaan ke liye (Dasharatha ne Ram ke liye kiya)
• **Atiratra** — raat bhar chalta hai (2011 mein Kerala mein hua)

**Grihya Sanskar (Gharelu):**
• **Vivah** — shaadi mein Saptapadi (7 phere aag ke around)
• **Namakarana** — naam rakhne ki rasm
• **Upanayana** — janeu pehnane ki rasm
• **Antyeshti** — antim sanskar
• **Griha Pravesh** — naye ghar mein praves

**Components:**
• **Yajamana** — yajna karwane wala
• **Ritviks** — purohit (Hotar, Adhvaryu, Udgatri, Brahman)
• **Mantra** — Vedic chants
• **Havya** — ghee, anaaj, jadi-bootiyan
• **Yajnavedi** — fire altar (geometric shapes mein)
• **Dakshina** — purohit ko daan

**Aaj ki sthiti:**
• **2011 mein Kerala mein Athirathram** international scientists ke saath hua
• Studies bolti hain yajna **hawa ko shudhh** karte hain — bacteria aur pollutants kam karte hain

**Aadhyatmik arth:**
• **Manas yajna** — meditation, self-discipline bhi ek yajna hai
• **Bhagavad Gita Chapter 4** mein alag-alag yajnas ka varnan hai (gyan-yajna, dhyan-yajna, etc.)`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Yajnas", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Vedic Rituals", url: "https://ignca.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Vedas", "Tell me about Yajurveda", "Tell me about Sanskrit"],
  },
  {
    keywords: ["sanskrit", "samskrit", "samskrita", "sanskrit language", "panini grammar", "classical language"],
    text: `**Sanskrit** (Samskrita — "refined, perfected") is the **classical language of ancient India** — the primary liturgical language of Hinduism, Buddhism, Jainism, and the foundation of Indian thought, literature, and science. It is one of the **22 Scheduled Languages of India** and one of six **Classical Languages**.

**History & Periods:**
• **Vedic Sanskrit** (~1500–500 BCE) — Language of the Vedas
• **Classical Sanskrit** (~500 BCE onwards) — Standardized by Panini
• Sister to Avestan (Old Iranian); both descend from **Proto-Indo-European** along with Greek, Latin, Germanic, Slavic languages

**Panini's Ashtadhyayi (~400 BCE):**
• "Eight chapters" — the most complete grammar ever composed for any language
• **3,959 sutras (rules)** describing every grammatical phenomenon
• Uses **algebraic-like meta-notation** — predated modern formal logic by 2,500 years
• **Frits Staal** called it "one of the greatest monuments of human intelligence"
• **Noam Chomsky** acknowledged influence on generative grammar
• NASA scientist **Rick Briggs** (1985) suggested Sanskrit as natural language for AI

**Linguistic Features:**
• **8 cases** (vibhakti) — most languages have 4–6
• **3 genders, 3 numbers** (singular, dual, plural)
• **10 verb tenses/moods**
• Highly **inflected** — word forms convey grammatical info
• **Sandhi** rules — phonetic combination at word junctions
• **Compound words (samasa)** — multiple words form a single complex word

**Script:**
• Traditionally written in **Devanagari script** (also used for Hindi, Marathi)
• Originally oral — preserved through chanting before being written down
• Has been written in **Brahmi, Sharada, Grantha, Bengali, Telugu, Tamil-Grantha** scripts

**Literature (vast and diverse):**
• **Vedas, Upanishads, Brahmanas, Aranyakas**
• **Two Epics**: Mahabharata (1.8 lakh verses), Ramayana (24,000 verses)
• **18 Puranas**: Vishnu, Bhagavata, Shiva, etc.
• **Six schools of philosophy**: Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta
• **Kavya** (classical poetry): Kalidasa's Meghaduta, Shakuntalam
• **Natya** (drama): Bhasa, Bhavabhuti, Shudraka
• **Science**: Aryabhatiya (mathematics/astronomy), Sushruta Samhita (medicine), Arthashastra (economics)

**Modern Status:**
• **One of 22 Scheduled Languages** of India
• Declared **Classical Language** (2005)
• Official language of **Uttarakhand** (alongside Hindi)
• Spoken by ~25,000 native speakers (mostly in **Mattur** village, Karnataka — entire village speaks Sanskrit)
• Taught in **Sanskrit universities**: Banaras Hindu University, Sampurnanand Sanskrit University, Rashtriya Sanskrit Sansthan

**Sanskrit Today:**
• Cultivated in **gurukulas** and traditional schools
• Daily news broadcast: **All India Radio's Sanskrit news bulletin**
• Active scholarly community publishing original works
• Significant influence on **40%+ of Hindi vocabulary**
• Inscribed on **Indian currency, official emblems, mottos**`,
    textHi: `**संस्कृत** (संस्कृता — "परिष्कृत") **प्राचीन भारत की शास्त्रीय भाषा** है। **22 अनुसूचित भाषाओं** में से एक, **6 शास्त्रीय भाषाओं** में से एक (2005 से)।

**इतिहास:**
• **वैदिक संस्कृत** (~1500-500 ई.पू.)
• **शास्त्रीय संस्कृत** — पाणिनि से मानकीकृत

**पाणिनि की अष्टाध्यायी (~400 ई.पू.):**
• **3,959 सूत्र** — किसी भी भाषा की सर्वोत्तम व्याकरण
• **नोम चॉम्स्की** ने प्रभाव माना
• **NASA वैज्ञानिक** ने AI के लिए संस्कृत सुझाया (1985)

**विशेषताएँ:**
• **8 कारक, 3 लिंग, 3 वचन**
• अत्यधिक विभक्तियुक्त भाषा

**साहित्य:** वेद, उपनिषद, महाभारत (1.8 लाख श्लोक), रामायण, 18 पुराण, कालिदास की कविताएँ, आर्यभट्ट का गणित

**आज:**
• ~25,000 मूल वक्ता — **मत्तूर गाँव** (कर्नाटक) में पूरा गाँव संस्कृत बोलता है
• **उत्तराखंड की आधिकारिक भाषा** (हिंदी के साथ)
• AIR की दैनिक संस्कृत समाचार`,
    textTe: `**సంస్కృతం** (సంస్కృత — "శుద్ధీకరించబడిన") **ప్రాచీన భారత శాస్త్రీయ భాష**. **22 భారత షెడ్యూల్డ్ భాషల్లో ఒకటి**, **6 శాస్త్రీయ భాషల్లో ఒకటి** (2005 నుండి). **పాణిని అష్టాధ్యాయి** (~క్రీ.పూ. 400) — 3,959 సూత్రాలు — ఏ భాషకైనా అత్యుత్తమ వ్యాకరణం. **8 విభక్తులు, 3 లింగాలు, 3 వచనాలు**. వేదాలు, ఉపనిషత్తులు, మహాభారతం (1.8 లక్షల శ్లోకాలు), రామాయణం, 18 పురాణాలు. **కర్ణాటకలోని మత్తూర్ గ్రామంలో** అందరూ సంస్కృతం మాట్లాడతారు. **ఉత్తరాఖండ్ అధికార భాష**.`,
    textTa: `**சமஸ்கிருதம்** (சம்ஸ்க்ருத — "சுத்திகரிக்கப்பட்ட") **பண்டைய இந்தியாவின் கிளாசிக்கல் மொழி**. **22 இந்திய அட்டவணை மொழிகளில் ஒன்று**, **6 செம்மொழிகளில் ஒன்று** (2005 முதல்). **பாணினியின் அஷ்டாத்யாயி** (~கி.மு. 400) — 3,959 சூத்திரங்கள் — எந்த மொழிக்கும் சிறந்த இலக்கணம். **8 வேற்றுமைகள், 3 பால், 3 எண்கள்**. வேதங்கள், உபநிடதங்கள், மகாபாரதம் (1.8 லட்சம் சுலோகங்கள்), ராமாயணம், 18 புராணங்கள். **கர்நாடகாவின் மத்தூர் கிராமத்தில்** அனைவரும் சமஸ்கிருதம் பேசுகின்றனர். **உத்தராகண்ட் அரசு மொழி**.`,
    textHinglish: `**Sanskrit** (Samskrita — "refined, parishkrit") **prachin Bharat ki classical bhasha** hai. Hindu dharm, Buddhism, Jainism ki liturgical bhasha. Indian thought, literature, aur science ki neev.

**Itihaas:**
• **Vedic Sanskrit** (~1500–500 BCE) — Vedon ki bhasha
• **Classical Sanskrit** (~500 BCE se) — Panini ne standardize ki
• Greek, Latin, Germanic se related — sab Proto-Indo-European se aayi

**Panini ki Ashtadhyayi (~400 BCE):**
• "8 chapters" — kisi bhi bhasha ki sabse complete grammar
• **3,959 sutra** har grammatical phenomenon ka description
• **Algebraic-like meta-notation** — modern formal logic se 2,500 saal pehle
• **Noam Chomsky** ne influence maana modern linguistics ke liye
• **NASA scientist Rick Briggs (1985)** ne kaha Sanskrit AI ke liye sabse acchi natural language hai

**Bhasha ki visheshtayein:**
• **8 cases (vibhakti)** — zyaadatar bhashayein 4-6 mein hoti hain
• **3 gender, 3 number** (ek-vachan, dwi-vachan, bahu-vachan)
• **10 verb tenses/moods**
• **Sandhi** rules — shabd judne par phonetic changes
• **Samasa** — kai shabd ek complex shabd banate hain

**Script:**
• Mukhya roop se **Devanagari** mein likhi jati hai (Hindi, Marathi ki bhi)
• Pehle sirf zubaan se preserve hoti thi (chanting)

**Sahitya:**
• **Veda, Upanishad, Brahmana, Aranyaka**
• **Mahabharata** (1.8 lakh shlok), **Ramayana** (24,000 shlok)
• **18 Purana**: Vishnu, Bhagavata, Shiva
• **6 Darshan**: Nyaya, Vaisheshika, Sankhya, Yoga, Mimamsa, Vedanta
• **Kalidasa** ki kavitayein: Meghaduta, Shakuntalam
• **Aryabhatiya** (maths/astronomy), **Sushruta Samhita** (chikitsa), **Arthashastra** (economics)

**Aaj ki sthiti:**
• **22 Scheduled Languages mein se ek**
• **Classical Language** declared (2005)
• **Uttarakhand** ki official bhasha (Hindi ke saath)
• ~25,000 native speakers — Karnataka ke **Mattur gaon** mein poora gaon Sanskrit mein baat karta hai!
• Sanskrit universities: BHU, Sampurnanand, Rashtriya Sanskrit Sansthan
• **All India Radio** daily Sanskrit news prasaarit karta hai
• **Hindi ki 40%+ vocabulary** Sanskrit se aayi`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal – Sanskrit", url: "https://vedicheritage.gov.in" },
      { title: "IGNCA – Sanskrit Studies", url: "https://ignca.gov.in" },
      { title: "Gyan Bharatam – Sanskrit Manuscripts", url: "https://gyanbharatam.com" },
      { title: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in" },
    ],
    followUps: ["Tell me about Vedas", "Tell me about Sahitya Akademi", "Tell me about ancient mathematics"],
  },

  // ============ GANDHI ============
  {
    keywords: ["gandhi", "mahatma", "freedom", "independence", "smriti", "dandi", "quit india", "non-violence", "ahimsa"],
    text: `The Ministry of Culture maintains several institutions preserving **Mahatma Gandhi's** legacy:

**Gandhi Smriti & Darshan Samiti (GSDS):**
Located at 5, Tees January Marg, New Delhi — formerly Birla House — where Gandhi spent his last 144 days and was assassinated on **30 January 1948**.
• Preserves the room where Gandhi stayed, his prayer ground, and the Martyrs' Column
• **Eternal Gandhi** — permanent multimedia exhibition
• Photo gallery of the freedom movement

**Key Events in Gandhi's Life:**
• 1893–1915: Fought racial discrimination in **South Africa**; developed Satyagraha
• 1920: Launched **Non-Cooperation Movement**
• 1930: Led the **Dandi March** (Salt March) — 388 km walk from Sabarmati to Dandi
• 1942: Launched **Quit India Movement** with the call "Do or Die"
• 15 Aug 1947: India gains independence
• 30 Jan 1948: Assassinated by Nathuram Godse

**Digital Resources:**
• **Gandhi Heritage Portal** (gandhiheritageportal.org) — 1,00,000+ pages of collected works
• Letters, photographs, audio recordings of speeches
• Complete 100 volumes of Collected Works of Mahatma Gandhi (CWMG)`,
    textHi: `संस्कृति मंत्रालय **महात्मा गांधी** की विरासत को संरक्षित करने वाली कई संस्थाएँ चलाता है:

**गांधी स्मृति एवं दर्शन समिति:**
5, तीस जनवरी मार्ग, नई दिल्ली — जहाँ गांधीजी ने अंतिम 144 दिन बिताए और **30 जनवरी 1948** को उनकी हत्या हुई।

**प्रमुख घटनाएँ:**
• 1930: **दांडी मार्च** — 388 किमी पैदल यात्रा
• 1942: **भारत छोड़ो आंदोलन** — "करो या मरो"

**डिजिटल संसाधन:** गांधी हेरिटेज पोर्टल पर 1,00,000+ पृष्ठ उपलब्ध`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "Gandhi Smriti & Darshan Samiti", url: "https://gandhismriti.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture – Gandhi Archives", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Mahatma Gandhi", "Tell me about Mahatma Gandhi"],
  },

  // ============ ARCHIVES ============
  {
    keywords: ["archive", "archives", "national archives", "document", "record", "abhilekh", "abhilekh patal"],
    text: `**National Archives of India (NAI)** — the largest archival repository in South Asia:

• Established in 1891 in Kolkata, moved to New Delhi in 1926
• Holdings: Records from 1748 onwards, **50 million+ pages** of public records
• Collections include: Private papers of national leaders, Cartographic records, Maps, Microfilm, Oriental records, Post-Mutiny records

**Abhilekh Patal (abhilekh-patal.in):**
The flagship digital platform providing **free online access** to:
• Scanned archival records searchable by keywords
• Freedom struggle documents (1857–1947)
• Administrative records of British India
• Treaties, agreements, and correspondence
• Census records, gazetteers, and survey reports
• Over **3 crore pages** digitized and available

**Key Collections:**
• Files related to the **Indian Independence Movement**
• Proceedings of the **Constituent Assembly**
• Records of the **East India Company**
• Personal papers of leaders like Sardar Patel, Rajendra Prasad, C. Rajagopalachari

The NAI also conducts a one-year **Diploma Course in Archival Studies** and organizes exhibitions and outreach programs.`,
    textHi: `**भारतीय राष्ट्रीय अभिलेखागार (NAI)** — दक्षिण एशिया का सबसे बड़ा अभिलेखीय भंडार:

• 1891 में कोलकाता में स्थापित, 1926 में नई दिल्ली में स्थानांतरित
• **5 करोड़+ पृष्ठ** सार्वजनिक अभिलेख

**अभिलेख पाटल (abhilekh-patal.in):**
• स्वतंत्रता संग्राम के दस्तावेज़
• ब्रिटिश भारत के प्रशासनिक अभिलेख
• **3 करोड़+ पृष्ठ** डिजिटलीकृत और ऑनलाइन उपलब्ध`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "National Archives of India", url: "https://nationalarchives.nic.in" },
      { title: "Abhilekh Patal", url: "https://abhilekh-patal.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about National Archives", "Tell me about National Archives", "Tell me about National Archives"],
  },

  // ============ PORTALS ============
  {
    keywords: ["indianculture", "indian culture", "portal", "digital", "library", "culture portal"],
    text: `**Indian Culture Portal** (indianculture.gov.in) is the Ministry of Culture's flagship digital repository:

**Content Categories:**
• **Arts** — Paintings, sculptures, textiles, crafts from museums across India
• **Books & Manuscripts** — Rare texts, palm-leaf manuscripts, birch-bark scrolls
• **Museums** — Virtual collections from national museums
• **Performing Arts** — Classical music, dance, theatre recordings
• **Photographs** — Historical and archival images
• **Stories** — Curated narratives on cultural themes
• **Maps & Gazetteers** — Historical cartographic records

**Aggregated From:**
National Museum, ASI, IGNCA, Sangeet Natak Akademi, Sahitya Akademi, Lalit Kala Akademi, National Archives, Anthropological Survey of India, and 50+ other institutions.

**Features:**
• Full-text search across collections
• High-resolution image viewing
• Curated virtual exhibitions
• Downloadable content for research
• Multi-lingual interface

The portal serves as a single-window access to India's cultural heritage in digital form.`,
    textHi: `**इंडियन कल्चर पोर्टल** (indianculture.gov.in) संस्कृति मंत्रालय का प्रमुख डिजिटल भंडार है:

• कला, पुस्तकें, पांडुलिपियाँ, संग्रहालय संग्रह, प्रदर्शन कला, फोटोग्राफ
• 50+ संस्थानों से एकत्रित सामग्री
• पूर्ण-पाठ खोज, उच्च-रिज़ॉल्यूशन छवियाँ, आभासी प्रदर्शनियाँ`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
      { title: "Ministry of Culture", url: "https://culture.gov.in" },
    ],
    followUps: ["Tell me about Indian Culture Portal", "Tell me about Indian Culture Portal", "Tell me about museums in India"],
  },

  // ============ SCHEMES ============
  {
    keywords: ["scheme", "scholarship", "fellowship", "grant", "funding", "financial", "award"],
    text: `The Ministry of Culture offers various schemes and financial support:

**Fellowships:**
• **Senior Fellowship** — ₹30,000/month for 2 years for outstanding persons in culture
• **Junior Fellowship** — ₹20,000/month for 2 years
• Fields: Literature, Performing Arts, Visual Arts, Photography, Theatre

**Scholarships:**
• **Award of Scholarships to Young Artists** — ₹5,000/month for 2 years in music, dance, theatre, visual arts, literary arts (ages 18–25)
• **Scheme for Financial Assistance for Veteran Artists** — One-time grant for artists above 58 years in poor financial condition

**Grants:**
• **Cultural Function & Production Grant** — For organizing cultural events, festivals, seminars
• **Scheme for Financial Assistance to Cultural Organizations** — Grants to NGOs for cultural activities
• **Repertory Grant** — Support for theatre groups and performing arts organizations
• **Scheme for Safeguarding Intangible Cultural Heritage** — Documentation of endangered art forms

**Awards:**
• Sangeet Natak Akademi Awards & Fellowships
• Sahitya Akademi Awards (24 Indian languages)
• Lalit Kala Akademi Awards for visual arts

Applications processed at **culturescheme.dashboard.nic.in**`,
    textHi: `संस्कृति मंत्रालय की प्रमुख योजनाएँ:

• **वरिष्ठ अध्येतावृत्ति** — ₹30,000/माह, 2 वर्ष
• **कनिष्ठ अध्येतावृत्ति** — ₹20,000/माह, 2 वर्ष
• **युवा कलाकार छात्रवृत्ति** — ₹5,000/माह, 2 वर्ष
• **सांस्कृतिक संगठनों को वित्तीय सहायता**
• संगीत नाटक अकादमी, साहित्य अकादमी, ललित कला अकादमी पुरस्कार

आवेदन: culturescheme.dashboard.nic.in`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Culture Schemes Dashboard", url: "https://culturescheme.dashboard.nic.in" },
      { title: "Ministry of Culture – Schemes", url: "https://culture.gov.in" },
    ],
    followUps: ["Tell me about cultural schemes", "Tell me about classical dance forms", "Tell me about cultural schemes"],
  },

  // ============ UNESCO ============
  {
    keywords: ["unesco", "world heritage", "heritage site", "heritage sites"],
    text: `India has **42 UNESCO World Heritage Sites** (as of 2024) — 34 cultural, 7 natural, 1 mixed:

**Notable Cultural Sites:**
• Taj Mahal, Agra (1983) • Ajanta Caves (1983) • Ellora Caves (1983)
• Red Fort Complex, Delhi (2007) • Qutub Minar (1993) • Humayun's Tomb (1993)
• Fatehpur Sikri (1986) • Sun Temple, Konark (1984)
• Group of Monuments at Hampi (1986) • Khajuraho (1986)
• Mahabalipuram (1984) • Great Living Chola Temples (1987)
• Sanchi Stupa (1989) • Bodh Gaya (2002)
• Rani ki Vav, Patan (2014) • Dholavira (2021)
• Historic City of Ahmedabad (2017) • Jaipur City (2019)
• Kakatiya Rudreshwara Temple (2021) • Shantiniketan (2023)

**Natural Sites:**
• Kaziranga National Park • Manas Wildlife Sanctuary
• Sundarbans • Nanda Devi & Valley of Flowers
• Western Ghats • Great Himalayan National Park

**Mixed:** Khangchendzonga National Park (2016)

India also has **15 Intangible Cultural Heritage** inscriptions including Yoga, Vedic Chanting, Kumbh Mela, Durga Puja, and Garba.`,
    textHi: `भारत में **42 यूनेस्को विश्व धरोहर स्थल** हैं (2024 तक) — 34 सांस्कृतिक, 7 प्राकृतिक, 1 मिश्रित।

प्रमुख: ताज महल, अजंता, एलोरा, लाल किला, कुतुब मीनार, हम्पी, कोणार्क, खजुराहो, महाबलीपुरम, शांतिनिकेतन।

भारत के **15 अमूर्त सांस्कृतिक विरासत** शिलालेख भी हैं — योग, वैदिक पाठ, कुंभ मेला, दुर्गा पूजा, गरबा।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – World Heritage Sites", url: "https://asi.nic.in" },
      { title: "Indian Culture – UNESCO Heritage", url: "https://indianculture.gov.in" },
    ],
    followUps: ["UNESCO World Heritage Sites in India", "Tell me about Indus Valley Civilization", "UNESCO World Heritage Sites in India"],
  },

  // ============ YOGA & TRADITIONAL ============
  {
    keywords: ["yoga", "ayurveda", "traditional", "wellness", "meditation", "patanjali"],
    text: `India's traditional knowledge systems are preserved through Ministry of Culture portals:

**Yoga:**
• UNESCO inscribed Yoga as Intangible Cultural Heritage in 2016
• Originates from **Patanjali's Yoga Sutras** (c. 200 BCE) — 196 aphorisms on the eight limbs of yoga (Ashtanga)
• International Day of Yoga: **21 June** (declared by UN in 2014 on India's initiative)
• IGNCA maintains archives on Hatha Yoga, Raja Yoga, Kundalini Yoga traditions

**Ayurveda:**
• Ancient Indian system of medicine dating back to the Vedic period
• Key texts: **Charaka Samhita** (internal medicine), **Sushruta Samhita** (surgery)
• Based on three doshas: Vata, Pitta, Kapha
• References in the Atharvaveda

**Other Traditional Knowledge:**
• **Gyan Bharatam** (gyanbharatam.com) — Access to traditional Indian knowledge systems
• **Vedic Heritage Portal** — Documents Vedic sciences including astronomy (Jyotisha), mathematics, grammar
• IGNCA's **Kalanidhi** division preserves manuscripts on traditional arts and sciences`,
    textHi: `भारत की पारंपरिक ज्ञान पद्धतियाँ:

**योग:** यूनेस्को ने 2016 में अमूर्त सांस्कृतिक विरासत के रूप में मान्यता दी। **पतंजलि के योग सूत्र** (~200 ई.पू.)।
**अंतर्राष्ट्रीय योग दिवस:** 21 जून

**आयुर्वेद:** प्राचीन भारतीय चिकित्सा पद्धति — **चरक संहिता**, **सुश्रुत संहिता**।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "Gyan Bharatam", url: "https://gyanbharatam.com" },
      { title: "IGNCA", url: "https://ignca.gov.in" },
    ],
    followUps: ["Tell me about Yoga", "Tell me about Yoga and Ayurveda", "Tell me about Vedic heritage"],
  },

  // ============ MGMD ============
  {
    keywords: ["mgmd", "gandhi memorial", "gandhi museum", "mahatma gandhi memorial"],
    text: `The **Mahatma Gandhi Memorial and Digital Museum** (mgmd.gov.in) preserves and presents Gandhi's legacy digitally:

**Digital Collections:**
• Digitized manuscripts and letters written by Gandhi
• Photographs spanning his life — South Africa to India
• Audio recordings of speeches and prayer meetings
• Personal belongings and memorabilia
• Documentary films and newsreels
• Publications: Harijan, Young India, Indian Opinion journals

**Features:**
• Searchable database of Gandhi's **Collected Works** (100 volumes, 50,000+ pages)
• Interactive timeline of freedom movement events
• Virtual exhibitions: Dandi March, Quit India Movement, Champaran Satyagraha
• Multi-lingual content in English and Hindi

The portal complements the **Gandhi Heritage Portal** (gandhiheritageportal.org) which provides even more extensive archival access.`,
    textHi: `**महात्मा गांधी स्मारक एवं डिजिटल संग्रहालय** (mgmd.gov.in):

• गांधीजी की पांडुलिपियाँ, पत्र, फोटो, भाषणों की ऑडियो रिकॉर्डिंग
• **संपूर्ण गांधी वाङ्मय** (100 खंड) का खोज योग्य डेटाबेस
• दांडी मार्च, भारत छोड़ो आंदोलन पर आभासी प्रदर्शनियाँ`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD Portal", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Sabarmati Ashram", "Tell me about Dandi March"],
  },

  // ============ DEEP MGMD / GANDHI CONTENT ============
  {
    keywords: ["dandi march", "salt march", "salt satyagraha", "namak satyagraha", "dandi"],
    text: `The **Dandi March (Salt Satyagraha)** was Mahatma Gandhi's iconic 24-day march from **March 12 to April 6, 1930**, against the British salt tax. It became the spark that ignited mass civil disobedience across India.

**Route & Distance:**
• Started from **Sabarmati Ashram, Ahmedabad** with 78 chosen satyagrahis
• Walked **390 km (240 miles)** to the coastal village of **Dandi** in Gujarat
• Crossed 4 districts and 48 villages on foot
• On **April 6, 1930**, at 6:30 AM, Gandhi picked up a fistful of natural salt from the seashore, breaking the British salt monopoly law

**Significance:**
• Triggered nation-wide civil disobedience — over 80,000 Indians were arrested in the following months
• Marked the launch of the broader **Civil Disobedience Movement (1930–1934)**
• Brought international attention to India's freedom struggle — Time magazine declared Gandhi "Man of the Year" in 1930
• Inspired Martin Luther King Jr.'s civil rights movement decades later

**Legacy:**
• The route is now memorialized as the **Dandi Heritage Route**
• Statues of the 79 marchers have been installed along the route
• **National Salt Satyagraha Memorial** at Dandi (inaugurated 2019) commemorates the march
• PM's "Dandi Yatra" walks are held annually on Salt March anniversaries

**Famous quote (after picking up salt):** *"With this, I am shaking the foundations of the British Empire."*`,
    textHi: `**दांडी मार्च (नमक सत्याग्रह)** महात्मा गांधी का 12 मार्च से 6 अप्रैल 1930 तक का 24-दिवसीय मार्च था, जो ब्रिटिश नमक कर के विरुद्ध था।

• **साबरमती आश्रम, अहमदाबाद** से 78 सत्याग्रहियों के साथ शुरू
• तटीय गाँव **दांडी** तक **390 किमी** पैदल चले
• 6 अप्रैल 1930 को गांधीजी ने समुद्र तट से एक मुट्ठी नमक उठाया
• 80,000+ भारतीय गिरफ्तार हुए, **सविनय अवज्ञा आंदोलन** की शुरुआत
• 2019 में दांडी में **राष्ट्रीय नमक सत्याग्रह स्मारक** का उद्घाटन`,
    textTe: `**దండి యాత్ర (ఉప్పు సత్యాగ్రహం)** మహాత్మా గాంధీ నేతృత్వంలో 1930 మార్చి 12 నుండి ఏప్రిల్ 6 వరకు సాగిన 24 రోజుల యాత్ర. అహ్మదాబాద్‌లోని సబర్మతి ఆశ్రమం నుండి దండి వరకు 390 కిమీ నడిచారు. ఏప్రిల్ 6న గాంధీజీ సముద్ర తీరంలో ఉప్పు తీసుకొని బ్రిటిష్ ఉప్పు చట్టాన్ని ఉల్లంఘించారు. ఇది శాసన ఉల్లంఘన ఉద్యమానికి నాంది.`,
    textTa: `**தண்டி யாத்திரை (உப்பு சத்தியாகிரகம்)** மகாத்மா காந்தி தலைமையில் 1930 மார்ச் 12 முதல் ஏப்ரல் 6 வரை நடந்த 24 நாள் யாத்திரை. அகமதாபாத் சபர்மதி ஆசிரமத்திலிருந்து தண்டி வரை 390 கி.மீ. நடந்தனர். ஏப்ரல் 6 அன்று காந்தி கடற்கரையில் உப்பெடுத்து பிரிட்டிஷ் உப்பு வரிச் சட்டத்தை மீறினார். இது சட்ட மறுப்பு இயக்கத்தின் தொடக்கம்.`,
    textHinglish: `**Dandi March (Salt Satyagraha)** Mahatma Gandhi ka iconic 24-din ka march tha — **12 March se 6 April 1930** tak. British salt tax ke khilaf shuru hua tha.

**Route aur Distance:**
• **Sabarmati Ashram, Ahmedabad** se 78 chune hue satyagrahiyon ke saath shuru hua
• **390 km (240 miles)** paidal chalkar **Dandi** (Gujarat ka coastal village) tak gaye
• 4 districts aur 48 gaon paidal cross kiye
• **6 April 1930** ko subah 6:30 baje Gandhi ji ne samudr ke kinare se ek muthi namak uthaya — British salt monopoly law toda

**Mahatva:**
• Pure desh mein civil disobedience shuru hui — 80,000+ Indians arrest hue
• **Civil Disobedience Movement (1930–1934)** ka launch hua
• 1930 mein Gandhi ji ko Time magazine ne "Man of the Year" declared kiya
• Martin Luther King Jr. ko inspire kiya

**Famous quote:** *"Iske saath, main British Empire ki neev hila raha hoon."*

**Aaj ki sthiti:**
• Route ko **Dandi Heritage Route** banaya gaya hai
• 79 marchers ki statues lagayi gayi hain
• 2019 mein Dandi mein **National Salt Satyagraha Memorial** ka uddhatan hua`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Dandi March Archives", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture – Freedom Movement", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Sabarmati Ashram", "Tell me about Quit India Movement", "Tell me about Mahatma Gandhi"],
  },
  {
    keywords: ["sabarmati ashram", "harijan ashram", "satyagraha ashram", "ashram"],
    text: `The **Sabarmati Ashram** (also known as Gandhi Ashram, Harijan Ashram, or Satyagraha Ashram) is located on the banks of the Sabarmati River in Ahmedabad, Gujarat. It was Mahatma Gandhi's home from **1917 to 1930** and the launching pad for the Dandi March.

**History:**
• Founded by Gandhi on **June 17, 1917**, with 25 inmates
• Originally established at Kochrab; moved to its present 36-acre location in 1917
• Gandhi declared he would not return until India was free — and indeed never lived there again after Dandi March

**Key Buildings:**
• **Hriday Kunj** ("Heart's Cottage") — Gandhi's personal residence (1918–1930), preserved with original spinning wheel, writing desk, and three monkeys
• **Vinoba-Mira Kutir** — where Vinoba Bhave and Mirabehn (Madeleine Slade) stayed
• **Magan Niwas** — first manager Maganlal Gandhi's residence
• **Upasana Mandir** — open-air prayer ground where Gandhi held daily prayers
• **Nandini** — guest house for visitors like Tagore

**Major Events Launched from Here:**
• **Salt Satyagraha / Dandi March** — March 12, 1930
• **Quit India Movement preparation** (1942)
• **Champaran Satyagraha** planning (1917)
• Hand-spinning (charkha) and khadi movement

**Today:**
• Open daily 8:30 AM – 6:30 PM (free entry)
• Houses **Gandhi Memorial Museum** designed by architect Charles Correa (1963) — winner of Padma Shri for architecture
• Recently renovated under "Gandhi Ashram Memorial and Precinct Development Project" (2022)
• 36-acre campus along the Sabarmati River with charkha demonstrations and library`,
    textHi: `**साबरमती आश्रम** अहमदाबाद, गुजरात में साबरमती नदी के तट पर स्थित है। यह **1917 से 1930 तक** महात्मा गांधी का घर था और दांडी मार्च की शुरुआत यहीं से हुई।

• **17 जून 1917** को 25 निवासियों के साथ गांधी द्वारा स्थापित
• **हृदय कुंज** — गांधीजी का व्यक्तिगत निवास, उनका मूल चरखा और लेखन डेस्क संरक्षित
• **दांडी मार्च** की शुरुआत 12 मार्च 1930 को यहीं से हुई
• **गांधी स्मारक संग्रहालय** चार्ल्स कोरिया द्वारा डिज़ाइन (1963)
• 36 एकड़ का परिसर, रोज़ाना सुबह 8:30 से शाम 6:30 तक खुला (निःशुल्क प्रवेश)`,
    textTe: `**సబర్మతి ఆశ్రమం** అహ్మదాబాద్, గుజరాత్‌లో సబర్మతి నది ఒడ్డున ఉంది. మహాత్మా గాంధీ 1917 నుండి 1930 వరకు ఇక్కడ నివసించారు. **దండి యాత్ర** ఇక్కడ నుండే ప్రారంభమైంది. **హృదయ కుంజ్** గాంధీజీ నివాసం. **గాంధీ స్మారక మ్యూజియం** ప్రఖ్యాత ఆర్కిటెక్ట్ చార్లెస్ కొరియా రూపొందించారు.`,
    textTa: `**சபர்மதி ஆசிரமம்** அகமதாபாத், குஜராத்தில் சபர்மதி நதிக் கரையில் உள்ளது. 1917 முதல் 1930 வரை மகாத்மா காந்தியின் வசிப்பிடம். **தண்டி யாத்திரை** இங்கிருந்தே தொடங்கியது. **ஹ்ருதய் குஞ்ச்** காந்தியின் வீடு. **காந்தி நினைவு அருங்காட்சியகம்** சார்ல்ஸ் கொரியா வடிவமைத்தார்.`,
    textHinglish: `**Sabarmati Ashram** (Gandhi Ashram bhi kehte hain) Ahmedabad mein Sabarmati nadi ke kinare hai. Yeh **1917 se 1930 tak** Mahatma Gandhi ka ghar tha aur **Dandi March** yahin se shuru hua tha.

**Itihas:**
• **17 June 1917** ko Gandhi ne 25 logon ke saath shuru kiya
• Pehle Kochrab mein tha, baad mein 36-acre ke vartman jagah par shift hua
• Dandi March ke baad Gandhi ji wapas nahi aaye — kaha tha jab tak India azaad nahi hota wapas nahi aaunga

**Important Buildings:**
• **Hriday Kunj** ("Dil ka Kutir") — Gandhi ji ka personal residence (1918–1930). Original charkha, writing desk, aur teen bandar (3 monkeys) abhi bhi rakhe hain
• **Vinoba-Mira Kutir** — Vinoba Bhave aur Mirabehn yahaan rehte the
• **Upasana Mandir** — open-air prayer ground jahaan Gandhi rozaana prarthana karte the
• **Magan Niwas** — pehle manager Maganlal Gandhi ka ghar

**Yahaan se launch hue major events:**
• **Salt Satyagraha / Dandi March** — 12 March 1930
• **Quit India Movement** preparation (1942)
• Charkha aur khadi movement

**Aaj ka status:**
• Rozaana subah 8:30 se shaam 6:30 tak khula (free entry)
• **Gandhi Memorial Museum** Charles Correa ne design kiya (1963)
• 2022 mein "Gandhi Ashram Memorial Project" ke under renovation hua hai`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Sabarmati Ashram Archives", url: "https://mgmd.gov.in" },
      { title: "Sabarmati Ashram Official", url: "https://gandhiashramsabarmati.org" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Dandi March", "Tell me about Mahatma Gandhi", "Tell me about Aga Khan Palace"],
  },
  {
    keywords: ["aga khan palace", "aga khan", "kasturba samadhi", "gandhi pune"],
    text: `The **Aga Khan Palace** in Pune, Maharashtra, is a Gandhi National Memorial managed by the Gandhi Smarak Nidhi. Built in **1892 by Sultan Muhammad Shah Aga Khan III** as a charity work during a famine, it became a key site in India's freedom movement.

**Gandhi & Quit India Movement:**
• On **August 9, 1942**, Mahatma Gandhi, Kasturba Gandhi, Mahadev Desai, Sarojini Naidu, and others were imprisoned here after launching the Quit India Movement
• Gandhi was held captive for **21 months** (until May 6, 1944)
• His personal secretary **Mahadev Desai** died here on August 15, 1942
• His wife **Kasturba Gandhi** died here on **February 22, 1944** at age 74

**Memorials on the Grounds:**
• **Samadhis (memorials)** of Kasturba Gandhi and Mahadev Desai — black marble structures
• Gandhi's room preserved with original photographs, writings, and possessions
• Charkha (spinning wheel), letters, books, and clothes used by Gandhi during imprisonment
• Marble urn containing some of Gandhi's ashes after his assassination (1948)

**Architecture:**
• **Italian-Indo-Saracenic style** with Italian arches and ornamental gardens
• 19 acres of grounds with fountains and lawns
• Donated to the **Gandhi Smarak Samiti** in 1969 by Aga Khan IV as a tribute

**Today:**
• Designated as a **monument of national importance** by ASI (2003)
• Houses a museum with photos, letters, and memorabilia of Gandhi's stay
• Open daily 9 AM – 5:30 PM, nominal entry fee
• Located in Yerwada, Pune — 6 km from Pune railway station`,
    textHi: `**आगा खान पैलेस** पुणे में स्थित गांधी राष्ट्रीय स्मारक है। 1892 में सुल्तान मुहम्मद शाह आगा खान III ने अकाल राहत के लिए बनवाया।

• **9 अगस्त 1942** को भारत छोड़ो आंदोलन के बाद महात्मा गांधी, कस्तूरबा, महादेव देसाई यहाँ कैद किए गए
• **21 महीने** गांधीजी की कैद (मई 1944 तक)
• **महादेव देसाई** का देहांत 15 अगस्त 1942 को यहीं हुआ
• **कस्तूरबा गांधी** का देहांत 22 फरवरी 1944 को यहीं हुआ
• कस्तूरबा और महादेव देसाई की **समाधियाँ** यहाँ स्थित हैं
• 2003 से ASI द्वारा संरक्षित राष्ट्रीय महत्व का स्मारक`,
    textTe: `**ఆగాఖాన్ ప్యాలెస్** పూణే, మహారాష్ట్రలో ఉన్న గాంధీ జాతీయ స్మారకం. 1892లో సుల్తాన్ ముహమ్మద్ షా ఆగాఖాన్ III నిర్మించారు. క్విట్ ఇండియా ఉద్యమం తర్వాత 1942 ఆగస్టు 9న గాంధీజీ, కస్తూర్బా, మహదేవ్ దేశాయ్ ఇక్కడ ఖైదు చేయబడ్డారు. కస్తూర్బా 1944 ఫిబ్రవరి 22న ఇక్కడే మరణించారు.`,
    textTa: `**ஆகா கான் அரண்மனை** புனே, மகாராஷ்டிராவில் உள்ள காந்தி தேசிய நினைவிடம். 1892ல் சுல்தான் முகமது ஷா ஆகா கான் III கட்டினார். வெள்ளையனே வெளியேறு இயக்கத்திற்குப் பிறகு 1942 ஆகஸ்ட் 9ல் காந்தி, கஸ்தூர்பா, மகாதேவ் தேசாய் இங்கு சிறையில் அடைக்கப்பட்டனர். கஸ்தூர்பா 1944 பிப்ரவரி 22ல் இங்கேயே மறைந்தார்.`,
    textHinglish: `**Aga Khan Palace** Pune, Maharashtra mein Gandhi National Memorial hai. **1892 mein Sultan Muhammad Shah Aga Khan III** ne akaal (famine) ke time charity ke liye banwaya tha.

**Gandhi aur Quit India Movement:**
• **9 August 1942** ko Quit India Movement ke baad Mahatma Gandhi, Kasturba Gandhi, Mahadev Desai, Sarojini Naidu yahaan kaid kiye gaye the
• Gandhi ji **21 mahine** kaid mein rahe (May 1944 tak)
• **Mahadev Desai** ka dehant 15 August 1942 ko yahin hua
• **Kasturba Gandhi** ka dehant 22 February 1944 ko yahin hua (74 saal ki umar mein)

**Yahaan ke Smarak:**
• Kasturba aur Mahadev Desai ki **samadhis** (kaala marble)
• Gandhi ji ka kamra preserve hai — original photos, writings, possessions ke saath
• Charkha, letters, books, kapde — sab kaid ke time ke
• Gandhi ji ki kuch asthiyan (ashes) marble urn mein rakhi hain

**Aaj:**
• 2003 se ASI dwara protected national monument
• Rozaana 9 AM se 5:30 PM tak khula
• Pune railway station se 6 km dur, Yerwada mein hai`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Aga Khan Palace", url: "https://mgmd.gov.in" },
      { title: "ASI – Protected Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Sabarmati Ashram", "Tell me about Kasturba Gandhi", "Tell me about Quit India Movement"],
  },
  {
    keywords: ["gandhi smriti", "birla house", "gandhi assassination", "30 january", "shaheed sthal"],
    text: `**Gandhi Smriti** (formerly Birla House) at 5 Tees January Marg, New Delhi, is the place where **Mahatma Gandhi spent the last 144 days of his life** (September 9, 1947 – January 30, 1948) and was assassinated.

**The Assassination:**
• On **January 30, 1948**, at 5:17 PM, Gandhi was walking to his daily prayer meeting at the rear lawn
• He was shot three times at point-blank range by **Nathuram Godse**
• His last words were "**Hey Ram**" (हे राम)
• He died at age 78

**Memorials Within the House:**
• **Martyr's Column (Shaheed Sthal)** — black stone obelisk marking the exact spot of assassination
• Gandhi's room preserved exactly as he left it on his last morning — including spectacles, walking stick, watch (stopped at 5:17), wooden sandals (paduka), and clothes
• **Last Steps Memorial** — concrete imprint of Gandhi's last 79 footsteps from the house to the prayer ground, marked in stone
• **Multimedia Museum** with eternal Gandhi exhibits, holograms, and interactive displays
• Three rare audio recordings of Gandhi's voice

**Architecture:**
• Built by industrialist **G.D. Birla** in 1928
• Donated to the Government of India in 1971
• Renovated and converted into Gandhi Smriti National Memorial
• Sprawling lawns where evening prayer meetings still take place

**Today:**
• Open Tue–Sun 10 AM – 5 PM (closed Mondays and 2nd Saturday of every month)
• Free entry, free guided tours
• "Eternal Gandhi" multimedia museum opened in 2005
• Sister memorial: **Gandhi Darshan** (across the road) — outdoor exhibition`,
    textHi: `**गांधी स्मृति** (पूर्व बिड़ला हाउस), 5 तीस जनवरी मार्ग, नई दिल्ली — वह स्थान जहाँ महात्मा गांधी ने अपने जीवन के अंतिम 144 दिन बिताए और 30 जनवरी 1948 को **नाथूराम गोडसे** द्वारा शाम 5:17 बजे उनकी हत्या कर दी गई।

• अंतिम शब्द: **"हे राम"**
• **शहीद स्तंभ** — हत्या के स्थान पर काला पत्थर का स्तंभ
• गांधीजी के कमरे में चश्मा, घड़ी (5:17 पर रुकी), लाठी, खड़ाऊँ संरक्षित
• **अंतिम चरण स्मारक** — गांधीजी के अंतिम 79 कदमों के निशान पत्थर में
• "Eternal Gandhi" मल्टीमीडिया संग्रहालय (2005)
• मंगल–रवि सुबह 10 बजे से शाम 5 बजे तक खुला`,
    textTe: `**గాంధీ స్మృతి** (గతంలో బిర్లా హౌస్), 5 తీస్ జనవరి మార్గ్, న్యూఢిల్లీ — మహాత్మా గాంధీ తన జీవితంలోని చివరి 144 రోజులు ఇక్కడ గడిపారు. **1948 జనవరి 30** న సాయంత్రం 5:17 గంటలకు **నాథూరామ్ గాడ్సే** వారిని కాల్చి చంపాడు. చివరి మాటలు: **"హే రామ్"**. ప్రాంగణంలో **శహీద్ స్థల్** స్తంభం ఉంది. ప్రతి సాయంత్రం ఇక్కడ ప్రార్థన సమావేశం జరుగుతుంది.`,
    textTa: `**காந்தி ஸ்மிருதி** (முன்பு பிர்லா ஹவுஸ்), 5 தீஸ் ஜனவரி மார்க், புது டெல்லி — மகாத்மா காந்தி தனது வாழ்க்கையின் கடைசி 144 நாட்களை இங்கு கழித்தார். **1948 ஜனவரி 30** அன்று மாலை 5:17 மணிக்கு **நாதுராம் கோட்சே** சுட்டுக் கொன்றார். கடைசி வார்த்தைகள்: **"ஹே ராம்"**. **ஷாஹீத் ஸ்தல்** நினைவுத் தூண் இங்குள்ளது.`,
    textHinglish: `**Gandhi Smriti** (pehle Birla House tha), 5 Tees January Marg, New Delhi — yahaan **Mahatma Gandhi ne apne jeevan ke aakhri 144 din** bitaye (9 September 1947 se 30 January 1948 tak) aur yahin unki hatya hui.

**Hatya:**
• **30 January 1948** ko shaam **5:17 baje**
• Daily prayer meeting ke liye ja rahe the back lawn par
• **Nathuram Godse** ne point-blank range se 3 goliyan maari
• Aakhri shabd: **"Hey Ram"** (हे राम)
• Umar 78 saal thi

**Smarak (Memorials):**
• **Shaheed Sthal** — kala pathar ka stambh, hatya ke exact spot par
• Gandhi ji ka kamra waisa hi rakha hai jaise unke aakhri din par tha — chashma, lathi, ghadi (5:17 par ruki), khadau, kapde sab original
• **Last Steps Memorial** — Gandhi ji ke aakhri 79 kadam pathar mein chhape hain
• "Eternal Gandhi" multimedia museum (2005 mein open hua) — holograms, interactive displays, voice recordings

**Itihas:**
• Industrialist **G.D. Birla** ne 1928 mein banwaya
• 1971 mein Government of India ko daan kiya
• 5:17 PM par har shaam yahaan prayer meeting hoti hai

**Aaj:**
• Tue–Sun 10 AM se 5 PM tak khula (Monday aur 2nd Saturday band)
• Free entry, free guided tours`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Gandhi Smriti", url: "https://mgmd.gov.in" },
      { title: "Gandhi Smriti & Darshan Samiti", url: "https://gandhismriti.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Aga Khan Palace", "Tell me about Sabarmati Ashram"],
  },
  {
    keywords: ["kasturba gandhi", "ba", "kasturba", "kasturba ba"],
    text: `**Kasturba Gandhi** (April 11, 1869 – February 22, 1944), affectionately known as "**Ba**" (Mother), was Mahatma Gandhi's wife, political partner, and India's first political prisoner woman. Her contribution to the freedom movement is celebrated as one of the most significant in modern Indian history.

**Early Life:**
• Born **Kasturbai Makhanji Kapadia** in Porbandar, Gujarat
• Married Mohandas Karamchand Gandhi at age 13 (1882) — child marriage common at the time
• Bore four sons: Harilal, Manilal, Ramdas, and Devdas

**Freedom Struggle Contributions:**
• Joined Gandhi's first satyagraha in **South Africa (1913)** — was imprisoned for 3 months
• Led women's groups in the **Champaran (1917), Ahmedabad mill strike (1918), and Kheda (1918)** satyagrahas
• Active in **Salt Satyagraha (1930)** and **Quit India Movement (1942)**
• Imprisoned multiple times by both British and South African governments

**Last Years:**
• Arrested with Gandhi after Quit India Movement in August 1942
• Imprisoned at **Aga Khan Palace, Pune** for 21 months
• Suffered from chronic bronchitis and heart attacks during imprisonment
• Died at Aga Khan Palace on **February 22, 1944**, with Gandhi by her side
• Cremated within the palace grounds — her samadhi (memorial) is here

**Legacy:**
• **National Women's Day** in India is observed on her birthday — February 22
• **Kasturba Gandhi National Memorial Trust** established 1944
• **Kasturba Gandhi Balika Vidyalaya (KGBV)** scheme — over 5,600 residential schools for girls from disadvantaged communities
• Featured on Indian postage stamps and the ₹100 note design proposals

**Famous quote:** *"I willingly suffered for him, with him, and through him."*`,
    textHi: `**कस्तूरबा गांधी** (11 अप्रैल 1869 – 22 फरवरी 1944), प्यार से "**बा**" कहलाती थीं — महात्मा गांधी की पत्नी और स्वतंत्रता संग्राम की महान सेनानी।

• **पोरबंदर, गुजरात** में जन्म, 13 वर्ष की उम्र में गांधीजी से विवाह
• चार पुत्र — हरिलाल, मणिलाल, रामदास, देवदास
• **दक्षिण अफ्रीका (1913)** में पहले सत्याग्रह में शामिल — 3 महीने जेल
• **चंपारण, अहमदाबाद, खेड़ा** सत्याग्रहों में महिलाओं का नेतृत्व
• **22 फरवरी 1944** को आगा खान पैलेस, पुणे में देहांत
• **राष्ट्रीय महिला दिवस** उनके जन्मदिन (22 फरवरी) पर मनाया जाता है
• **कस्तूरबा गांधी बालिका विद्यालय (KGBV)** — 5,600+ आवासीय बालिका विद्यालय`,
    textTe: `**కస్తూర్బా గాంధీ** (1869 ఏప్రిల్ 11 – 1944 ఫిబ్రవరి 22), ప్రేమగా "**బా**" అని పిలువబడేవారు — మహాత్మా గాంధీ భార్య మరియు స్వాతంత్ర్య సమరయోధురాలు. **1944 ఫిబ్రవరి 22** న ఆగాఖాన్ ప్యాలెస్‌లో మరణించారు. **జాతీయ మహిళా దినోత్సవం** ఆమె పుట్టినరోజు ఫిబ్రవరి 22న జరుగుతుంది. **కస్తూర్బా గాంధీ బాలికా విద్యాలయ (KGBV)** పథకం — 5,600+ బాలికా పాఠశాలలు.`,
    textTa: `**கஸ்தூர்பா காந்தி** (1869 ஏப்ரல் 11 – 1944 பிப்ரவரி 22), அன்போடு "**பா**" என்று அழைக்கப்பட்டார் — மகாத்மா காந்தியின் மனைவி மற்றும் சுதந்திர போராட்ட வீராங்கனை. **1944 பிப்ரவரி 22** ல் ஆகா கான் அரண்மனையில் மறைந்தார். **தேசிய மகளிர் தினம்** அவரது பிறந்த நாளான பிப்ரவரி 22 அன்று கொண்டாடப்படுகிறது.`,
    textHinglish: `**Kasturba Gandhi** (11 April 1869 – 22 February 1944), pyaar se "**Ba**" (Maa) kehte the — Mahatma Gandhi ki patni aur freedom struggle ki great leader thi.

**Pehle ki zindagi:**
• **Porbandar, Gujarat** mein paida hui
• 13 saal ki umr mein Gandhi se shaadi (1882) — us zamane mein child marriage common tha
• 4 bete: Harilal, Manilal, Ramdas, aur Devdas

**Azadi ki ladaai mein yogdan:**
• **South Africa (1913)** mein pehle satyagraha mein shamil — 3 mahine jail mein rahi
• **Champaran (1917), Ahmedabad mill strike (1918), Kheda (1918)** satyagrahas mein mahilaon ka netrutva kiya
• **Salt Satyagraha (1930)** aur **Quit India Movement (1942)** mein active rahi

**Aakhri saal:**
• Quit India ke baad August 1942 mein Gandhi ke saath arrest
• **Aga Khan Palace, Pune** mein 21 mahine kaid
• **22 February 1944** ko Aga Khan Palace mein dehant — Gandhi ji unke saath the
• Wahin palace grounds mein samadhi banaayi gayi

**Virasat:**
• **National Women's Day** unke birthday (22 February) ko manaya jata hai
• **Kasturba Gandhi Balika Vidyalaya (KGBV)** scheme — 5,600+ residential girls' schools
• Indian postage stamps par feature hui

**Famous quote:** *"Maine khushi se unke liye, unke saath, aur unke through dukh sehe."*`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Kasturba Gandhi", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture – Freedom Movement", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Aga Khan Palace", "Tell me about Dandi March"],
  },
  {
    keywords: ["champaran satyagraha", "champaran", "indigo", "tinkathia", "champaran movement"],
    text: `The **Champaran Satyagraha (1917)** was Mahatma Gandhi's **first satyagraha (civil resistance) in India** — a transformative protest in Champaran, Bihar, against the exploitative indigo cultivation system imposed by British landlords on poor Indian peasants.

**Background:**
• Indian farmers in Champaran were forced under the **"Tinkathia system"** to cultivate indigo on **3/20th (15%)** of their land
• They were paid extremely low prices and subjected to violence by British planters
• Decline of European indigo demand (1900s) made the system even more brutal — planters squeezed farmers further
• Local activist **Raj Kumar Shukla** persistently invited Gandhi to investigate

**The Satyagraha (1917):**
• Gandhi arrived in Champaran on **April 10, 1917**
• Began documenting peasant testimonies — collected statements from 8,000+ farmers
• British administration ordered him to leave; Gandhi refused and was arrested
• Massive support poured in — magistrate had to release him
• Government appointed **Champaran Agrarian Inquiry Committee** with Gandhi as member

**Outcome:**
• **Champaran Agrarian Act 1918** abolished the Tinkathia system
• Refunded 25% of illegally collected dues to farmers
• First major political victory for Gandhi in India
• Established the **template of Indian satyagraha** — non-violent civil resistance, fact-finding, and constructive engagement
• Brought Rabindranath Tagore's recognition of Gandhi as "Mahatma" (great soul)

**Legacy:**
• Marks the beginning of **Gandhi's leadership in India's freedom movement**
• 100 years celebrated in 2017 with national commemorations
• **Bhitiharwa Ashram** at Bettiah and **Gandhi Sangrahalaya** at Motihari preserve the memory
• Gave India its first generation of Gandhian leaders: Rajendra Prasad, Brajkishore Prasad, Anugrah Narayan Sinha`,
    textHi: `**चंपारण सत्याग्रह (1917)** महात्मा गांधी का **भारत में पहला सत्याग्रह** था — बिहार के चंपारण में नील किसानों के शोषण के विरुद्ध।

• किसानों को **तिनकठिया प्रथा** के तहत अपनी भूमि के **3/20वें भाग (15%)** पर नील की खेती करनी पड़ती थी
• स्थानीय कार्यकर्ता **राज कुमार शुक्ला** ने गांधीजी को आमंत्रित किया
• **10 अप्रैल 1917** को गांधीजी चंपारण पहुँचे
• **चंपारण कृषि अधिनियम 1918** ने तिनकठिया प्रथा को समाप्त किया
• रवींद्रनाथ टैगोर ने इसके बाद गांधीजी को **"महात्मा"** की उपाधि दी
• 100 वर्ष 2017 में मनाए गए`,
    textTe: `**చంపారణ్ సత్యాగ్రహం (1917)** మహాత్మా గాంధీ **భారతదేశంలో నిర్వహించిన మొదటి సత్యాగ్రహం**. బీహార్‌లోని చంపారణ్‌లో నీలిమందు రైతుల దోపిడీకి వ్యతిరేకంగా జరిగింది. **తీన్‌కఠియా** విధానం ప్రకారం రైతులు తమ భూమిలో 15% నీలిమందు సాగు చేయాలి. **1918 చంపారణ్ వ్యవసాయ చట్టం** ఈ విధానాన్ని రద్దు చేసింది. ఈ తర్వాత రవీంద్రనాథ టాగూర్ గాంధీజీని **"మహాత్మా"** అని సంబోధించారు.`,
    textTa: `**சம்பாரண் சத்தியாகிரகம் (1917)** மகாத்மா காந்தியின் **இந்தியாவில் முதல் சத்தியாகிரகம்**. பீகாரின் சம்பாரண்-ல் இண்டிகோ விவசாயிகளின் சுரண்டலுக்கு எதிராக நடந்தது. **திங்கதியா** முறை மூலம் விவசாயிகள் தங்கள் நிலத்தில் 15% இண்டிகோ பயிரிட வேண்டும். **1918 சம்பாரண் விவசாய சட்டம்** இந்த முறையை ஒழித்தது. இதற்குப் பிறகு ரவீந்திரநாத் தாகூர் காந்தியை **"மகாத்மா"** என்று அழைத்தார்.`,
    textHinglish: `**Champaran Satyagraha (1917)** Mahatma Gandhi ka **India mein pehla satyagraha** tha — Bihar ke Champaran mein **indigo (neel) kisanon ke shoshan ke khilaf**.

**Background:**
• Champaran ke kisanon ko **"Tinkathia system"** ke under apni zameen ke **3/20 (yaani 15%) hisse par neel** ki kheti karni padti thi
• Bahut kam keemat milti thi aur British planters maar-peet karte the
• 1900s mein Europe mein neel ki demand kam hone ke baad shoshan aur badh gaya
• Local activist **Raj Kumar Shukla** ne baar-baar Gandhi ji ko bulaya investigation ke liye

**Satyagraha (1917):**
• **10 April 1917** ko Gandhi ji Champaran pahunche
• 8,000+ kisanon ke statements collect kiye
• British prashasan ne unhe jaane ko kaha — Gandhi ji ne mana kar diya
• Magistrate ko unhe release karna pada
• Government ne **Champaran Agrarian Inquiry Committee** banayi — Gandhi ji bhi member the

**Pariname (Outcome):**
• **Champaran Agrarian Act 1918** ne Tinkathia system khatam kar diya
• Kisanon ko 25% rakam wapas mili
• Gandhi ji ki India mein pehli badi political jeet
• Iske baad **Rabindranath Tagore** ne Gandhi ji ko **"Mahatma"** (great soul) ki upadhi di

**Virasat:**
• **2017 mein 100 saal manaye gaye**
• **Bhitiharwa Ashram** (Bettiah) aur **Gandhi Sangrahalaya** (Motihari) abhi bhi yaad sambhalte hain
• India ko pehli generation ke Gandhian leaders mile: Rajendra Prasad, Brajkishore Prasad, Anugrah Narayan Sinha`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Champaran Satyagraha", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture – Freedom Movement", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Dandi March", "Tell me about Quit India Movement"],
  },
  {
    keywords: ["quit india", "bharat chodo", "august kranti", "1942 movement", "do or die"],
    text: `The **Quit India Movement** (Bharat Chodo Andolan) was launched by Mahatma Gandhi on **August 8, 1942**, at the Bombay session of the All-India Congress Committee at Gowalia Tank Maidan (now August Kranti Maidan, Mumbai). It was a mass civil disobedience movement demanding **immediate independence from British rule**.

**Famous Slogan:**
• Gandhi gave India the iconic call: **"Do or Die"** (करो या मरो)
• "We shall either free India or die in the attempt; we shall not live to see the perpetuation of our slavery."

**Key Events:**
• **August 8, 1942** — Gandhi delivered the historic speech at Gowalia Tank, Bombay
• **August 9, 1942** — at dawn, all top Congress leaders arrested under Operation Zero Hour:
  - Gandhi → Aga Khan Palace, Pune
  - Nehru, Patel → Ahmednagar Fort
  - Maulana Azad, Rajendra Prasad → other prisons
• **Underground movement** led by Jayaprakash Narayan, Aruna Asaf Ali, Ram Manohar Lohia, Usha Mehta (operated underground Congress Radio)
• **Aruna Asaf Ali** unfurled the Indian flag at Gowalia Tank on August 9, becoming the "Heroine of 1942"

**Government Response:**
• Mass arrests — over **100,000 people imprisoned**
• Public floggings, mass killings — over 10,000 killed in police firing
• 538 villages were destroyed by British forces
• Press blackout, banned political activities

**Significance:**
• Last major mass movement before Independence
• Demonstrated that British rule had become unsustainable
• United India across class, religion, region
• Convinced Britain that India could no longer be held by force
• Direct precursor to the **transfer of power in 1947**

**Memorials:**
• **August Kranti Maidan** (formerly Gowalia Tank) in Mumbai
• **Quit India Memorial Pillar** at the Maidan
• Annual commemoration on August 9 — observed as **August Kranti Diwas**`,
    textHi: `**भारत छोड़ो आंदोलन** (Quit India Movement) महात्मा गांधी ने **8 अगस्त 1942** को बंबई के ग्वालिया टैंक मैदान (अब अगस्त क्रांति मैदान) पर शुरू किया।

• प्रसिद्ध नारा: **"करो या मरो"** (Do or Die)
• 9 अगस्त 1942 — सभी प्रमुख कांग्रेस नेता गिरफ्तार
• गांधीजी आगा खान पैलेस, नेहरू-पटेल अहमदनगर किले में
• **अरुणा आसफ अली** ने ग्वालिया टैंक पर तिरंगा फहराया — "1942 की वीरांगना"
• **उषा मेहता** ने भूमिगत कांग्रेस रेडियो चलाया
• 1,00,000+ लोग गिरफ्तार, 10,000+ शहीद
• 1947 में स्वतंत्रता का सीधा मार्ग बना`,
    textTe: `**క్విట్ ఇండియా ఉద్యమం** (భారత్ ఛోడో ఆందోళన్) మహాత్మా గాంధీ **1942 ఆగస్టు 8** న ముంబై గోవాలియా టాంక్ మైదానంలో ప్రారంభించారు. ప్రసిద్ధ నినాదం: **"చేయండి లేదా చనిపోండి"** (Do or Die). ఆగస్టు 9న కాంగ్రెస్ నాయకులందరూ అరెస్ట్ అయ్యారు. **అరుణా ఆసఫ్ అలీ** గోవాలియా టాంక్‌లో జెండా ఎగురవేశారు. 1,00,000+ మంది అరెస్ట్, 10,000+ మంది అమరులయ్యారు.`,
    textTa: `**வெள்ளையனே வெளியேறு இயக்கம்** (Quit India Movement) மகாத்மா காந்தி **1942 ஆகஸ்ட் 8** ல் மும்பை கோவாலியா டாங்க் மைதானத்தில் தொடங்கினார். புகழ்பெற்ற முழக்கம்: **"செய் அல்லது செத்து மடி"** (Do or Die). ஆகஸ்ட் 9 அன்று காங்கிரஸ் தலைவர்கள் அனைவரும் கைது செய்யப்பட்டனர். **அருணா ஆசஃப் அலி** கோவாலியா டாங்கில் கொடி ஏற்றினார். 1,00,000+ பேர் கைது, 10,000+ பேர் கொல்லப்பட்டனர்.`,
    textHinglish: `**Quit India Movement (Bharat Chodo Andolan)** Mahatma Gandhi ne **8 August 1942** ko Bombay ke Gowalia Tank Maidan (ab August Kranti Maidan, Mumbai) par shuru kiya tha. Yeh **immediate independence** ki maang ke saath ek mass civil disobedience movement tha.

**Famous Slogan:**
• Gandhi ji ne diya iconic naara: **"Karo ya Maro"** (Do or Die)
• "Hum ya toh India ko azaad karenge ya marenge — apni gulami nahi dekhenge."

**Important Events:**
• **8 August 1942** — Gandhi ji ka historic bhashan Gowalia Tank par
• **9 August 1942** — subah Operation Zero Hour ke under sab Congress leaders arrest:
  - Gandhi → Aga Khan Palace, Pune
  - Nehru, Patel → Ahmednagar Fort
  - Maulana Azad, Rajendra Prasad → doosri jails
• **Underground movement** chalaya — Jayaprakash Narayan, Aruna Asaf Ali, Ram Manohar Lohia, Usha Mehta (jisne underground Congress Radio chalaya)
• **Aruna Asaf Ali** ne Gowalia Tank par tiranga fahraya — "1942 ki Veerangana" kahalayi

**Government ka response:**
• Mass arrests — **1,00,000+ log gireftar**
• Public flogging, killings — 10,000+ shaheed hue
• 538 gaon British forces ne nasht kiye

**Mahatva:**
• Azaadi se pehle ka aakhri bada mass movement
• British rule ki samapti ka direct karan bana
• 1947 ki **transfer of power** ka seedha rasta

**Smarak:**
• **August Kranti Maidan** Mumbai mein
• Har saal **9 August** ko **August Kranti Diwas** manaya jata hai`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Quit India Movement", url: "https://mgmd.gov.in" },
      { title: "Indian Culture – Freedom Movement", url: "https://indianculture.gov.in" },
      { title: "Gandhi Heritage Portal", url: "https://www.gandhiheritageportal.org" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Aga Khan Palace", "Tell me about Dandi March"],
  },
  {
    keywords: ["gandhi quotes", "gandhi philosophy", "gandhian thought", "ahimsa", "satya", "satyagraha philosophy", "swaraj"],
    text: `**Gandhian Philosophy** is a body of ideas centered on truth, non-violence, and self-reliance, developed by Mahatma Gandhi over five decades of political and spiritual practice.

**Core Principles:**

**1. Satya (Truth)**
• "Truth is God, and God is Truth"
• Searching for truth (satya) is the highest pursuit of life
• Gandhi's autobiography is titled "**The Story of My Experiments with Truth**"

**2. Ahimsa (Non-Violence)**
• Not just absence of physical violence — but absence of harm in thought, word, and action
• "Non-violence is the greatest force at the disposal of mankind"
• Drawn from Jain, Buddhist, and Hindu traditions

**3. Satyagraha (Truth-Force)**
• Gandhi's coined term combining satya (truth) + agraha (insistence)
• Not "passive resistance" — but active, fearless non-violent resistance
• Method of conflict resolution and political action

**4. Sarvodaya (Welfare of All)**
• Inspired by Ruskin's "Unto This Last"
• A society where the welfare of all (including the lowliest) is the goal
• Foundation of his **Constructive Programme**

**5. Swaraj (Self-Rule)**
• Not just political freedom from Britain — but **self-mastery, self-reliance**
• Includes economic self-sufficiency through khadi
• "True swaraj will not come by the acquisition of authority by a few but by the acquisition of capacity by all to resist authority when abused"

**Famous Gandhi Quotes:**
• *"Be the change you wish to see in the world."*
• *"An eye for an eye only ends up making the whole world blind."*
• *"The weak can never forgive. Forgiveness is the attribute of the strong."*
• *"Live as if you were to die tomorrow. Learn as if you were to live forever."*
• *"In a gentle way, you can shake the world."*
• *"Where there is love there is life."*
• *"The best way to find yourself is to lose yourself in the service of others."*

**Influence on World Leaders:**
• **Martin Luther King Jr.** — adopted satyagraha for US Civil Rights Movement
• **Nelson Mandela** — referred to Gandhi as inspiration for South African struggle
• **Dalai Lama** — invokes Gandhi in Tibetan freedom movement
• **Albert Einstein** — "Generations to come will scarcely believe that such a one as this ever in flesh and blood walked upon this earth."`,
    textHi: `**गांधी दर्शन** सत्य, अहिंसा और स्वावलंबन के विचारों पर आधारित है।

**मुख्य सिद्धांत:**
• **सत्य** — "सत्य ही ईश्वर है"
• **अहिंसा** — विचार, वचन, कर्म में अहिंसा
• **सत्याग्रह** — सत्य + आग्रह; सक्रिय अहिंसक प्रतिरोध
• **सर्वोदय** — सभी का कल्याण
• **स्वराज** — आत्मनिर्भरता, खादी से आर्थिक स्वतंत्रता

**प्रसिद्ध उद्धरण:**
• *"वह बदलाव बनो जो दुनिया में देखना चाहते हो।"*
• *"आँख के बदले आँख पूरी दुनिया को अंधा बना देगी।"*
• *"प्रेम है, वहीं जीवन है।"*

**प्रभाव:** मार्टिन लूथर किंग, नेल्सन मंडेला, दलाई लामा सब गांधीवाद से प्रेरित।`,
    textTe: `**గాంధీ సిద్ధాంతం** సత్యం, అహింస, స్వావలంబన ఆధారంగా ఉంది.

**ముఖ్య సూత్రాలు:**
• **సత్యం** — "సత్యమే దేవుడు"
• **అహింస** — ఆలోచన, మాట, చర్యలో
• **సత్యాగ్రహం** — సత్యం + ఆగ్రహం = క్రియాశీల అహింస ప్రతిఘటన
• **సర్వోదయ** — అందరి సంక్షేమం
• **స్వరాజ్యం** — స్వావలంబన

**ప్రసిద్ధ కోట్:** *"ప్రపంచంలో మీరు చూడాలనుకునే మార్పు మీరే అవ్వండి."*`,
    textTa: `**காந்தி தத்துவம்** உண்மை, அஹிம்சை, தன்னம்பிக்கை அடிப்படையில் உள்ளது.

**முக்கிய கொள்கைகள்:**
• **சத்யம்** — "உண்மையே கடவுள்"
• **அஹிம்சை** — எண்ணம், சொல், செயலில்
• **சத்தியாகிரகம்** — உண்மை + பற்று = செயலூக்கமான அஹிம்சை எதிர்ப்பு
• **சர்வோதயம்** — அனைவரின் நலன்
• **ஸ்வராஜ்யம்** — தன்னிறைவு

**புகழ் வாக்கு:** *"உலகில் நீங்கள் காண விரும்பும் மாற்றமாக நீங்களே ஆகுங்கள்."*`,
    textHinglish: `**Gandhian Philosophy** sach (truth), ahimsa (non-violence), aur swavalamban (self-reliance) par based hai. Gandhi ji ne 50 saal ke political aur spiritual practice mein develop kiya.

**Mool Siddhant (Core Principles):**

**1. Satya (Truth/Sach)**
• "Sach hi Bhagwan hai, aur Bhagwan hi Sach hai"
• Gandhi ji ki autobiography ka naam: **"The Story of My Experiments with Truth"**

**2. Ahimsa (Non-Violence)**
• Sirf physical violence nahi — vichar, vachan, karm mein bhi ahimsa
• "Ahimsa manushya ke paas sabse badi shakti hai"

**3. Satyagraha (Truth-Force)**
• Gandhi ji ne ye shabd banaya: Satya + Agraha
• "Passive resistance" nahi — active, nirbhay non-violent resistance

**4. Sarvodaya (Sab ka Welfare)**
• Aisa samaaj jahaan sabse chote ka bhi welfare ho
• Constructive Programme ka adhaar

**5. Swaraj (Self-Rule)**
• Sirf British se azaadi nahi — apne aap par control
• Khadi se aarthik swatantrata

**Famous Gandhi Quotes:**
• *"Wahi badlaav bano jo aap duniya mein dekhna chahte ho."*
• *"Aankh ke badle aankh poori duniya ko andha bana degi."*
• *"Kamzor kabhi maaf nahi kar sakta. Maafi taaqatwar ki khoobi hai."*
• *"Aaj ke din maro aur kal ke din jiyo."*
• *"Jahaan pyaar hai, wahan zindagi hai."*

**Duniya par prabhav:**
• **Martin Luther King Jr.** — US Civil Rights Movement mein satyagraha apnaya
• **Nelson Mandela** — South Africa ki azaadi ke liye Gandhi se prerana li
• **Dalai Lama** — Tibet ki azaadi mein Gandhi ka invocation
• **Albert Einstein** ne kaha: "Aane wali peedhiyan vishwas nahi karengi ki aisa koi insaan kabhi is dharti par chala tha."`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Gandhian Thought", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal – Collected Works", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "Tell me about Sabarmati Ashram", "Tell me about Champaran Satyagraha"],
  },
  {
    keywords: ["gandhi life", "gandhi biography", "gandhi early life", "porbandar", "south africa gandhi", "mohandas gandhi"],
    text: `**Mahatma Gandhi (Mohandas Karamchand Gandhi)** lived from **October 2, 1869 to January 30, 1948** — leader of India's freedom movement, apostle of non-violence, and one of the most influential figures of the 20th century.

**Early Life (1869–1888):**
• Born **October 2, 1869** in **Porbandar, Gujarat** to Karamchand Gandhi (diwan/chief minister of Porbandar) and Putlibai
• Raised in a religious Vaishnava Hindu family with Jain influences
• Married **Kasturba Makhanji** at age 13 (1882) — child marriage
• Influenced by stories of **Shravana Kumar** and **Raja Harishchandra** (truth-keeper)
• Sailed to London in 1888 to study law at **Inner Temple** — became barrister in 1891

**South Africa Years (1893–1914):**
• Sailed to South Africa as legal counsel for Gujarati merchant Dada Abdullah in 1893
• Faced racial discrimination — famous **Pietermaritzburg incident** (June 7, 1893): thrown off train despite valid first-class ticket
• Spent **21 years** organizing Indian community against discriminatory laws
• Developed **Satyagraha** — first used in 1906 against the Asiatic Registration Act (Black Act)
• Founded **Phoenix Settlement (1904)** and **Tolstoy Farm (1910)** — early ashrams
• Earned title **"Mahatma"** (Great Soul) from Rabindranath Tagore upon return

**India's Freedom Movement (1915–1947):**
• Returned to India January 9, 1915 (now celebrated as **Pravasi Bharatiya Divas**)
• **Champaran Satyagraha (1917)** — first satyagraha in India
• **Kheda & Ahmedabad Mill Strike (1918)** — first labor satyagrahas
• **Khilafat & Non-Cooperation Movement (1920–22)** — first nation-wide movement
• **Salt Satyagraha / Dandi March (1930)** — international fame
• **Quit India Movement (1942)** — final mass movement before independence
• **August 15, 1947** — India's independence; he was in Calcutta calming Hindu-Muslim riots

**Death:**
• **January 30, 1948** — Assassinated by Nathuram Godse at Birla House, Delhi
• Last words: **"Hey Ram"**
• Cremated at Raj Ghat (now memorialized)
• Albert Einstein wrote: "Generations to come will scarcely believe that such a one as this ever in flesh and blood walked upon this earth."

**Honors & Legacy:**
• **Time magazine "Man of the Year" 1930**
• Father of the Nation (Rashtrapita) — title given by Subhas Chandra Bose
• **October 2** observed as **International Day of Non-Violence** by UN (2007)
• His face on Indian rupee currency since 1996
• Over 25 countries have Gandhi statues; 80+ biographical films`,
    textHi: `**महात्मा गांधी (मोहनदास करमचंद गांधी)** — 2 अक्टूबर 1869 से 30 जनवरी 1948 तक।

• **पोरबंदर, गुजरात** में जन्म
• 13 वर्ष की उम्र में कस्तूरबा से विवाह
• 1888 में लंदन में कानून की पढ़ाई
• **दक्षिण अफ्रीका (1893–1914)** — पीटरमारिट्जबर्ग की ट्रेन घटना
• 1915 में भारत वापसी, **रवींद्रनाथ टैगोर** ने "महात्मा" उपाधि दी
• **चंपारण (1917), असहयोग (1920), दांडी मार्च (1930), भारत छोड़ो (1942)**
• **30 जनवरी 1948** — नाथूराम गोडसे ने हत्या कर दी
• अंतिम शब्द: **"हे राम"**
• 2 अक्टूबर — संयुक्त राष्ट्र का **अंतर्राष्ट्रीय अहिंसा दिवस**`,
    textTe: `**మహాత్మా గాంధీ (మోహన్‌దాస్ కరమ్‌చంద్ గాంధీ)** — 1869 అక్టోబర్ 2 నుండి 1948 జనవరి 30 వరకు. **పోర్‌బందర్, గుజరాత్** లో జన్మించారు. 1893–1914లో దక్షిణాఫ్రికాలో సత్యాగ్రహం అభివృద్ధి చేశారు. 1915లో భారత్‌కి తిరిగి వచ్చారు. **చంపారణ్ (1917), దండి యాత్ర (1930), క్విట్ ఇండియా (1942)** ఉద్యమాలు నడిపారు. **1948 జనవరి 30** న ఢిల్లీలో నాథూరామ్ గాడ్సే హత్య చేశాడు. ఐరాస అక్టోబర్ 2ని **అంతర్జాతీయ అహింసా దినోత్సవం** గా ప్రకటించింది.`,
    textTa: `**மகாத்மா காந்தி (மோகன்தாஸ் கரம்சந்த் காந்தி)** — 1869 அக்டோபர் 2 முதல் 1948 ஜனவரி 30 வரை. **போர்பந்தர், குஜராத்** ல் பிறந்தார். 1893–1914 தென் ஆப்பிரிக்காவில் சத்தியாகிரகத்தை உருவாக்கினார். 1915ல் இந்தியா திரும்பினார். **சம்பாரண் (1917), தண்டி யாத்திரை (1930), வெள்ளையனே வெளியேறு (1942)** இயக்கங்கள் வழிநடத்தினார். **1948 ஜனவரி 30** ல் டெல்லியில் நாதுராம் கோட்சே சுட்டுக் கொன்றார். ஐ.நா. அக்டோபர் 2ஐ **சர்வதேச அஹிம்சை தினம்** ஆக அறிவித்தது.`,
    textHinglish: `**Mahatma Gandhi (Mohandas Karamchand Gandhi)** — **2 October 1869 se 30 January 1948** tak jiye. India ke freedom movement ke leader, ahimsa ke pujari, aur 20th century ke sabse influential logon mein se ek the.

**Pehle ki zindagi (1869–1888):**
• **2 October 1869** ko **Porbandar, Gujarat** mein janm
• Pita Karamchand Gandhi (Porbandar ke diwan), Maa Putlibai
• Religious Vaishnava Hindu family mein Jain influence ke saath bade hue
• 13 saal ki umr mein **Kasturba Makhanji** se shaadi (1882)
• 1888 mein London gaye law padhne — 1891 mein barrister bane

**South Africa ke saal (1893–1914):**
• 1893 mein South Africa gaye legal counsel ke roop mein
• **Pietermaritzburg incident** (7 June 1893) — first-class ticket hone ke baad bhi train se phenk diye gaye
• **21 saal** wahaan rahe Indian community ke liye ladne
• **Satyagraha** wahin develop hua — 1906 mein Black Act ke khilaf
• **Phoenix Settlement (1904)** aur **Tolstoy Farm (1910)** ashram banaye
• Vapas aane par **Rabindranath Tagore** ne **"Mahatma"** ki upadhi di

**India ka freedom movement (1915–1947):**
• **9 January 1915** — India wapas (ab **Pravasi Bharatiya Divas**)
• **Champaran Satyagraha (1917)** — India mein pehla satyagraha
• **Khilafat & Non-Cooperation (1920–22)** — pehla nationwide movement
• **Salt Satyagraha/Dandi March (1930)** — international fame
• **Quit India (1942)** — aakhri mass movement
• **15 August 1947** — Independence ke din Gandhi ji Calcutta mein riots roakne mein lage the

**Maut:**
• **30 January 1948** — Nathuram Godse ne Birla House, Delhi mein hatya ki
• Aakhri shabd: **"Hey Ram"**
• Albert Einstein ne kaha: "Aane wali peedhiyan vishwas nahi karengi ki aisa insaan kabhi is dharti par tha."

**Sammaan aur Virasat:**
• **Time magazine "Man of the Year" 1930**
• **Rashtrapita (Father of the Nation)** — Subhas Chandra Bose ne diya
• 2 October — UN ne **International Day of Non-Violence** ghoshit kiya (2007)
• Indian rupee par unka chehra 1996 se hai`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "MGMD – Gandhi Biography", url: "https://mgmd.gov.in" },
      { title: "Gandhi Heritage Portal – Complete Works", url: "https://www.gandhiheritageportal.org" },
      { title: "Indian Culture – Freedom Movement", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Sabarmati Ashram", "Tell me about Dandi March", "Tell me about Gandhi Smriti"],
  },

  // ============ IGNCA ============
  {
    keywords: ["ignca", "indira gandhi", "national centre for arts", "kalakshetra", "kalanidhi"],
    text: `The **Indira Gandhi National Centre for the Arts (IGNCA)** is an autonomous institution under the Ministry of Culture, established in 1987 as a premier centre for research, documentation, and dissemination of India's arts and cultural heritage.

**Divisions:**
• **Kalanidhi** — Reference library with 1,50,000+ books, 40,000+ slides, manuscripts, rare photographs
• **Sutradhara** — Cultural informatics lab for digitization and multimedia
• **Janapada Sampada** — Lifestyle and folk arts documentation
• **Cultural Informatics** — Digital preservation of rare cultural resources

**Key Initiatives:**
• Rock Art database of India
• Encyclopaedic Dictionary of Indian Culture
• International conferences and seminars on arts
• Publications on Indian art, architecture, philosophy

**Sub-portals:**
• sengol1947.ignca.gov.in — History of the Sengol
• sansadkikala.ignca.gov.in — Art in Parliament
• bharatmotherofdemocracy.ignca.gov.in — India's democratic traditions

Located at Janpath, New Delhi (Central Vista area).`,
    textHi: `**इंदिरा गांधी राष्ट्रीय कला केंद्र (IGNCA)** संस्कृति मंत्रालय का स्वायत्त संस्थान है, 1987 में स्थापित।

• **कलानिधि** — 1,50,000+ पुस्तकों का संदर्भ पुस्तकालय
• **सूत्रधार** — डिजिटलीकरण प्रयोगशाला
• **जनपद संपदा** — लोक कला प्रलेखन
• शैल कला डेटाबेस, भारतीय संस्कृति विश्वकोश`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "IGNCA – Official", url: "https://ignca.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about IGNCA", "Tell me about IGNCA", "Tell me about Indian Culture Portal"],
  },

  // ============ KHAJURAHO ============
  {
    keywords: ["khajuraho", "chandela"],
    text: `The **Khajuraho Group of Monuments** in Madhya Pradesh is a UNESCO World Heritage Site (1986) — a complex of Hindu and Jain temples built by the **Chandela dynasty** between 950–1050 CE.

**Key Facts:**
• Originally 85 temples were built; **25 survive today**
• Known for exquisite **nagara-style architecture** and intricate **erotic sculptures** (only about 10% of total carvings)
• The temples celebrate all aspects of life — prayer, contemplation, love, and the divine
• **Kandariya Mahadeva Temple** — the largest and most ornate, dedicated to Shiva (31 metres tall)
• **Lakshmana Temple** — dedicated to Vishnu, with the finest preserved sculptures
• **Parsvanath Temple** — largest Jain temple in the complex

The temples remained hidden in dense forests for centuries until rediscovered by British engineer T.S. Burt in 1838.`,
    textHi: `**खजुराहो स्मारक समूह** मध्य प्रदेश में यूनेस्को विश्व धरोहर स्थल (1986) है — **चंदेल वंश** द्वारा 950-1050 ई. में निर्मित।

• मूल 85 मंदिरों में से **25 आज बचे हैं**
• **कंदरिया महादेव मंदिर** — सबसे बड़ा और अलंकृत
• मंदिर जीवन के सभी पहलुओं का उत्सव मनाते हैं`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Khajuraho", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Khajuraho", "Tell me about Khajuraho", "Tell me about Sanchi Stupa"],
  },

  // ============ LITERARY ============
  {
    keywords: ["sahitya", "literature", "literary", "akademi", "writer", "poetry", "book"],
    text: `**Sahitya Akademi** — India's National Academy of Letters, established in 1954:

• Recognizes literary excellence in **24 Indian languages** including English
• Publishes the journal **Indian Literature** (bimonthly)
• Maintains a library of 1,50,000+ books in various Indian languages
• Annual **Sahitya Akademi Award** — one of India's most prestigious literary honours
• **Sahitya Akademi Fellowship** (highest literary honour) — limited to 21 living writers at a time

**Award Winners (notable):**
• R.K. Narayan, Amitav Ghosh, Jnanpith awardees
• The Award carries a casket, citation, and ₹1,00,000 prize money

**Activities:**
• Literary meets, festivals, seminars across India
• Translation program between Indian languages
• Publications of Indian classics in translation
• Young Writers' Festivals and workshops`,
    textHi: `**साहित्य अकादमी** — भारत की राष्ट्रीय साहित्य अकादमी, 1954 में स्थापित:

• **24 भारतीय भाषाओं** में साहित्यिक उत्कृष्टता को मान्यता
• वार्षिक **साहित्य अकादमी पुरस्कार** — सबसे प्रतिष्ठित साहित्यिक सम्मानों में से एक`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Sahitya Akademi", "Tell me about languages of India", "Tell me about Sahitya Akademi"],
  },

  // ============ GREETINGS & META ============
  {
    keywords: ["hello", "hi", "hey", "namaste", "good morning", "good evening", "good afternoon"],
    text: `Namaste! 🙏 Welcome to the **Ministry of Culture AI Assistant**.

I can help you explore India's rich cultural heritage across **66 official portals**. Here's what you can ask me about:

• **Monuments & Heritage Sites** — Taj Mahal, Ajanta, Ellora, Red Fort, Qutub Minar, Hampi, Konark, Khajuraho, and 3,696+ ASI-protected sites
• **Museums** — National Museum, Salar Jung, NGMA, Indian Museum, Victoria Memorial
• **Performing Arts** — 8 classical dance forms, Hindustani & Carnatic music
• **Vedic Heritage** — The four Vedas, Upanishads, Sanskrit literature
• **Archives** — National Archives of India, Abhilekh Patal digital records
• **Freedom Movement** — Gandhi, Dandi March, Quit India Movement
• **Cultural Schemes** — Fellowships, scholarships, grants
• **UNESCO Heritage** — 42 World Heritage Sites, Intangible Cultural Heritage

Just type your question and I'll search across all Ministry portals to find the best answer!`,
    textHi: `नमस्ते! 🙏 **संस्कृति मंत्रालय AI सहायक** में आपका स्वागत है।

मैं **66 आधिकारिक पोर्टलों** पर भारत की समृद्ध सांस्कृतिक विरासत की खोज में आपकी मदद कर सकता हूँ:

• **स्मारक** — ताज महल, अजंता, एलोरा, लाल किला, कुतुब मीनार
• **संग्रहालय** — राष्ट्रीय संग्रहालय, सालार जंग
• **प्रदर्शन कला** — 8 शास्त्रीय नृत्य, शास्त्रीय संगीत
• **वैदिक विरासत** — चार वेद, उपनिषद
• **अभिलेखागार** — राष्ट्रीय अभिलेखागार

अपना प्रश्न टाइप करें!`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    textHinglish: `Namaste! 🙏 **Sanskriti Mantralay AI Sahayak** mein aapka swagat hai.

Main **66 official portals** par India ki rich cultural heritage dhundne mein aapki madad kar sakta hoon:

• **Smarak** — Taj Mahal, Ajanta, Ellora, Lal Qila, Qutub Minar
• **Sangrahalay** — National Museum, Salar Jung, Indian Museum Kolkata
• **Pradarshan Kala** — 8 classical dances, classical sangeet
• **Vedic Virasat** — 4 Ved, Upanishad, Sanskrit granth
• **Abhilekhagar** — National Archives, Abhilekh Patal

Bas apna sawaal type kijiye, main aapki madad karunga!`,
    confidence: "High",
    sources: [],
    followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
  },
  {
    keywords: ["thank", "thanks", "thank you", "dhanyavaad", "shukriya"],
    text: `You're welcome! I'm glad I could help. 🙏

Feel free to ask me anything else about India's cultural heritage — monuments, museums, performing arts, ancient texts, archives, or cultural schemes. I'm here to help you explore!`,
    textHi: `आपका स्वागत है! मुझे खुशी है कि मैं मदद कर सका। 🙏

भारत की सांस्कृतिक विरासत के बारे में कुछ भी पूछें!`,
    textTe: `మీకు స్వాగతం! నేను సహాయపడగలిగినందుకు సంతోషం. 🙏 భారతదేశ సాంస్కృతిక వారసత్వం గురించి ఏదైనా అడగండి!`,
    textTa: `நன்றி! உதவ முடிந்ததில் மகிழ்ச்சி. 🙏 இந்தியாவின் கலாச்சார பாரம்பரியம் பற்றி எதையும் கேளுங்கள்!`,
    textHinglish: `Aapka swagat hai! 🙏 Khushi hui ki main madad kar saka.

India ki cultural virasat ke baare mein aur kuch bhi poochna ho — smarak, museum, dance, sangeet, abhilekhagar — aap puch sakte hain. Main yahaan aapki madad karne ke liye hoon!`,
    confidence: "High",
    sources: [],
    followUps: ["UNESCO World Heritage Sites in India", "Tell me about classical dance forms", "Tell me about cultural schemes"],
  },
  // ============ MORE MONUMENTS ============
  {
    keywords: ["mahabalipuram", "mamallapuram", "pallava", "shore temple"],
    text: `**Mahabalipuram** (Mamallapuram) in Tamil Nadu is a UNESCO World Heritage Site (1984) — a collection of 7th–8th century monuments built by the **Pallava dynasty**.

**Key Monuments:**
• **Shore Temple** — One of the oldest structural stone temples in South India, overlooking the Bay of Bengal
• **Pancha Rathas** (Five Rathas) — Five monolithic rock-cut temples, each carved from a single granite boulder, named after the Pandavas
• **Arjuna's Penance / Descent of the Ganges** — A giant open-air rock relief (27m × 9m), one of the largest in the world
• **Krishna's Butter Ball** — A giant natural balancing rock (6m diameter) on a slope that has remained in place for centuries
• **Varaha Cave Temple** — Features exquisite panels of Vishnu's Varaha avatar rescuing the Earth

The Pallava king **Narasimhavarman I** (630–668 CE), also known as "Mamalla" (Great Wrestler), is credited with founding many of these monuments.`,
    textHi: `**महाबलीपुरम** तमिलनाडु में यूनेस्को विश्व धरोहर स्थल है — **पल्लव वंश** के 7वीं-8वीं शताब्दी के स्मारक।

• **शोर मंदिर**, **पंच रथ**, **अर्जुन की तपस्या** (27m × 9m की विशाल शैल नक्काशी)
• पल्लव राजा **नरसिम्हवर्मन प्रथम** ने इन्हें बनवाया`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Mahabalipuram", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Mahabalipuram", "Tell me about Mahabalipuram", "Tell me about Konark Sun Temple"],
  },
  {
    keywords: ["sanchi", "stupa", "sanchi stupa", "buddhist stupa", "ashoka"],
    text: `**Sanchi** in Madhya Pradesh is home to the oldest surviving Buddhist stupas in India — a UNESCO World Heritage Site (1989).

**The Great Stupa (Stupa 1):**
• Originally commissioned by Emperor **Ashoka** in the 3rd century BCE
• Enlarged during the Shunga dynasty (2nd century BCE)
• Features four magnificent **toranas** (gateways) with intricate carvings of Jataka tales, the life of Buddha, and scenes of daily life
• The Buddha is never depicted in human form — only through symbols (Bodhi tree, footprints, wheel, empty throne)

**Other Structures:**
• **Stupa 2** — The oldest of the surviving gateways, with medallion decorations
• **Stupa 3** — Contains relics of two of Buddha's foremost disciples, Sariputra and Mahamoggallana
• **Ashoka Pillar** — With the famous four-lion capital (the design adopted as India's national emblem)
• Monasteries, temples, and a museum housing antiquities

Emperor Ashoka sent his son **Mahendra** and daughter **Sanghamitra** from Sanchi to Sri Lanka to spread Buddhism.`,
    textHi: `**सांची** मध्य प्रदेश में भारत के सबसे पुराने बौद्ध स्तूपों का स्थल है — यूनेस्को विश्व धरोहर (1989)।

• सम्राट **अशोक** ने तीसरी शताब्दी ई.पू. में बनवाया
• चार **तोरण** (द्वार) जातक कथाओं की नक्काशी से सुसज्जित
• **अशोक स्तंभ** — चार सिंह शीर्ष (भारत का राष्ट्रीय प्रतीक)`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Sanchi", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Sanchi Stupa", "Tell me about Bodh Gaya", "Tell me about Sanchi Stupa"],
  },
  {
    keywords: ["bodh gaya", "bodhgaya", "buddha", "buddhism", "mahabodhi", "enlightenment"],
    text: `**Bodh Gaya** in Bihar is the most sacred Buddhist pilgrimage site — where **Siddhartha Gautama** attained enlightenment (Bodhi) under the Bodhi Tree around 528 BCE, becoming the **Buddha**.

**Mahabodhi Temple Complex** (UNESCO World Heritage Site, 2002):
• The present temple dates to the 5th–6th century CE (Gupta period)
• 55 metres tall with a pyramidal shikhara
• The **Bodhi Tree** in the temple complex is said to be a direct descendant of the original tree
• The **Vajrasana** (Diamond Throne) — the exact spot where Buddha sat during meditation

**Other Features:**
• Animeshlocha Stupa — Where Buddha stood gazing at the Bodhi Tree for a week
• Jewel Walk (Chankramana) — Where Buddha walked in meditation
• Lotus Pond — Where Buddha meditated in the 6th week
• Monasteries from Thailand, Japan, Sri Lanka, Tibet, Myanmar, Bhutan surround the temple

Emperor **Ashoka** was one of the first to build a shrine here in the 3rd century BCE. The Chinese pilgrims **Faxian** (5th century) and **Xuanzang** (7th century) documented the temple in detail.`,
    textHi: `**बोध गया** बिहार में सबसे पवित्र बौद्ध तीर्थस्थल है — जहाँ **सिद्धार्थ गौतम** ने बोधि वृक्ष के नीचे ज्ञान प्राप्त किया।

**महाबोधि मंदिर** (यूनेस्को विश्व धरोहर, 2002):
• 55 मीटर ऊँचा, गुप्त काल का मंदिर
• **वज्रासन** — बुद्ध के ध्यान का सटीक स्थान
• **बोधि वृक्ष** — मूल वृक्ष का वंशज`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Mahabodhi Temple", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Bodh Gaya", "Tell me about Bodh Gaya", "Tell me about Sanchi Stupa"],
  },
  {
    keywords: ["agra fort", "agra", "mughal fort"],
    text: `**Agra Fort** is a UNESCO World Heritage Site (1983) — a massive red sandstone fortification on the banks of the Yamuna River in Agra.

• Built by Emperor **Akbar** beginning in 1565, with additions by Shah Jahan and Aurangzeb
• Served as the main residence of the Mughal emperors until 1638 (capital shifted to Delhi)
• **2.5 km perimeter** with double walls and four gates; the Delhi Gate and Amar Singh Gate survive
• Shah Jahan was **imprisoned here by his son Aurangzeb** for 8 years until his death in 1666 — from his chambers, he could see the Taj Mahal he built for Mumtaz

**Key Structures:**
• **Jahangir's Palace** — Largest residential building, blend of Hindu and Islamic styles
• **Khas Mahal** — Shah Jahan's private palace with marble pavilions
• **Sheesh Mahal** — Glass palace with mirror-work walls
• **Diwan-i-Am & Diwan-i-Khas** — Public and private audience halls
• **Musamman Burj** — The octagonal tower where Shah Jahan spent his last years gazing at the Taj Mahal
• **Nagina Masjid** — Private mosque for court ladies`,
    textHi: `**आगरा किला** यूनेस्को विश्व धरोहर (1983) — यमुना नदी के किनारे लाल बलुआ पत्थर का विशाल किला।

• सम्राट **अकबर** ने 1565 में बनवाया
• **शाहजहाँ को औरंगजेब ने यहीं 8 वर्ष कैद** रखा — मुसम्मन बुर्ज से ताज महल दिखता था`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Agra Fort", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Fatehpur Sikri", "Tell me about Taj Mahal", "Tell me about Red Fort"],
  },
  {
    keywords: ["fatehpur sikri", "fatehpur", "sikri", "akbar capital"],
    text: `**Fatehpur Sikri** is a UNESCO World Heritage Site (1986) — the short-lived capital city built by Mughal Emperor **Akbar** between 1571–1585 in Uttar Pradesh.

**Why Built:** Akbar built it in honour of Sufi saint **Sheikh Salim Chishti**, who predicted the birth of Akbar's son (later Emperor Jahangir).

**Key Structures:**
• **Buland Darwaza** (Gate of Magnificence) — 54 metres tall, the highest gateway in the world. Built in 1601 to commemorate Akbar's victory in Gujarat
• **Tomb of Salim Chishti** — White marble tomb with exquisite jali (lattice) screens
• **Panch Mahal** — A five-storey palatial structure with 176 columns, each unique
• **Diwan-i-Khas** — Features a central pillar with elaborate carvings connected by walkways
• **Jodha Bai Palace** — Largest palace, built for Akbar's Hindu wife
• **Birbal's House** — Richly carved residence

**Why Abandoned:** The city was abandoned around 1585, possibly due to water scarcity. It remains remarkably well-preserved.`,
    textHi: `**फतेहपुर सीकरी** यूनेस्को विश्व धरोहर (1986) — मुगल सम्राट **अकबर** ने 1571-1585 में बनवाया।

• **बुलंद दरवाज़ा** — 54 मीटर ऊँचा, विश्व का सबसे ऊँचा द्वार
• सूफी संत **शेख सलीम चिश्ती** के सम्मान में बनाया गया
• पानी की कमी के कारण ~1585 में छोड़ दिया गया`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Fatehpur Sikri", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Fatehpur Sikri", "Tell me about Fatehpur Sikri", "Tell me about the Mughal Empire"],
  },

  // ============ ARTS & CRAFTS ============
  {
    keywords: ["painting", "miniature", "rajput", "mughal painting", "art", "visual art", "madhubani", "warli", "pattachitra", "folk art"],
    text: `India has a rich tradition of both classical and folk painting styles:

**Classical/Court Painting Schools:**
• **Mughal Miniature Painting** — Evolved under Akbar, Jahangir, Shah Jahan. Known for realistic portraiture, nature studies, and court scenes. Jahangir's atelier produced some of the finest animal paintings.
• **Rajput Painting** — Schools of Mewar, Bundi, Kishangarh, Kangra, Basohli. Themes from Ramayana, Krishna Leela, Ragamala. The **Bani Thani** painting from Kishangarh is called "India's Mona Lisa."
• **Deccan Painting** — From Bijapur, Golconda, Ahmednagar courts.
• **Pahari Painting** — Hill schools of Kangra, Basohli, Guler. Known for lyrical depictions of Radha-Krishna.

**Folk Art Traditions:**
• **Madhubani** (Bihar) — Geometric patterns using natural dyes, originally painted on mud walls
• **Warli** (Maharashtra) — Tribal art using white on mud-brown, depicting daily life and festivals
• **Pattachitra** (Odisha/Bengal) — Cloth scroll paintings on mythological themes
• **Kalamkari** (Andhra Pradesh) — Hand-painted or block-printed fabric art
• **Gond Art** (Madhya Pradesh) — Tribal art with intricate dot-and-dash patterns
• **Phad Painting** (Rajasthan) — Long cloth scrolls narrating folk epics
• **Tanjore Painting** (Tamil Nadu) — Rich gold foil work on religious themes

The **Lalit Kala Akademi** and **NGMA** promote contemporary and traditional visual arts.`,
    textHi: `भारत की समृद्ध चित्रकला परंपरा:

**शास्त्रीय:** मुगल लघु चित्र, राजपूत चित्रकला (बनी ठनी — "भारत की मोनालिसा"), पहाड़ी चित्रकला
**लोक कला:** मधुबनी (बिहार), वार्ली (महाराष्ट्र), पट्टचित्र (ओडिशा), कलमकारी (आंध्र), गोंड कला, तंजौर चित्रकला

**ललित कला अकादमी** और **NGMA** दृश्य कलाओं को बढ़ावा देते हैं।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Mera Gaon Meri Dharohar (MGMD)", url: "https://mgmd.gov.in" },
      { title: "Indian Culture – Visual Arts", url: "https://indianculture.gov.in" },
      { title: "Lalit Kala Akademi", url: "https://lalitkala.gov.in" },
      { title: "NGMA", url: "https://ngmaindia.gov.in" },
    ],
    followUps: ["Tell me about Indian paintings", "Tell me about Indian paintings", "Tell me about Indian paintings"],
  },
  {
    keywords: ["textile", "handloom", "weaving", "silk", "saree", "sari", "khadi", "craft", "handicraft"],
    text: `India's textile and handicraft traditions are among the oldest and most diverse in the world:

**Handloom Textiles:**
• **Banarasi Silk** (Varanasi) — Gold and silver brocade (zari) weaving, a GI-tagged product
• **Kanjeevaram Silk** (Tamil Nadu) — Heavy silk sarees with temple borders and rich colours
• **Pashmina** (Kashmir) — Fine cashmere wool from Changthangi goats, known for shahtoosh and ring shawls
• **Ikat** (Odisha/Telangana/Gujarat) — Tie-dye weaving technique producing geometric patterns
• **Chanderi** (Madhya Pradesh) — Sheer fabric with gold zari motifs
• **Pochampally** (Telangana) — Double ikat weaving, GI-tagged
• **Muga/Eri Silk** (Assam) — Golden silk unique to Assam

**Handicrafts:**
• **Bidriware** (Karnataka) — Silver inlay on blackened zinc-copper alloy
• **Blue Pottery** (Jaipur) — Persian-influenced glazed pottery
• **Chikankari** (Lucknow) — Delicate white-on-white hand embroidery
• **Zardozi** — Gold thread embroidery from Mughal tradition
• **Dhokra** (Chhattisgarh/Bengal) — Lost-wax metal casting, one of the oldest techniques (4,000+ years)

The **Ministry of Textiles** and **Development Commissioner of Handicrafts** support these traditions through schemes and GI tagging.`,
    textHi: `भारत की वस्त्र और हस्तशिल्प परंपराएँ:

• **बनारसी सिल्क**, **कांजीवरम**, **पश्मीना**, **इकत**, **चंदेरी**, **मूगा सिल्क**
• **बीदरी वेयर**, **ब्लू पॉटरी**, **चिकनकारी**, **ज़रदोज़ी**, **ढोकरा**`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture – Textiles", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Craft Gallery", url: "https://museumsofindia.gov.in" },
    ],
    followUps: ["Tell me about Indian textiles and crafts", "Tell me about Indian textiles and crafts", "Tell me about Indian textiles and crafts"],
  },

  // ============ HISTORY ============
  {
    keywords: ["mughal", "mughal empire", "akbar", "jahangir", "shah jahan", "aurangzeb", "babur", "humayun"],
    text: `The **Mughal Empire** (1526–1857) was one of the greatest empires in Indian history:

**Major Emperors:**
1. **Babur** (1526–1530) — Founded the Mughal dynasty; won the First Battle of Panipat (1526)
2. **Humayun** (1530–1556) — Lost and regained the empire; his tomb in Delhi is a UNESCO site
3. **Akbar** (1556–1605) — Greatest Mughal ruler; established Din-i-Ilahi, Mansabdari system, built Fatehpur Sikri, promoted art and religious tolerance
4. **Jahangir** (1605–1627) — Patron of art, especially miniature painting; built Shalimar Bagh
5. **Shah Jahan** (1628–1658) — Built the Taj Mahal, Red Fort, Jama Masjid; Golden Age of Mughal architecture
6. **Aurangzeb** (1658–1707) — Expanded empire to its largest extent but faced revolts; imprisoned Shah Jahan

**Cultural Legacy:**
• Architecture: Taj Mahal, Red Fort, Humayun's Tomb, Fatehpur Sikri, Agra Fort
• Art: Mughal miniature painting school
• Language: Urdu evolved as a fusion language
• Music: Patronage of classical music (Tansen at Akbar's court)
• Gardens: Charbagh (four-part) garden design
• Cuisine: Mughlai cuisine (biryani, kebabs, korma)`,
    textHi: `**मुगल साम्राज्य** (1526-1857) भारतीय इतिहास के सबसे महान साम्राज्यों में से एक:

बाबर → हुमायूँ → **अकबर** (महानतम) → जहाँगीर → **शाहजहाँ** (ताज महल) → औरंगज़ेब

विरासत: ताज महल, लाल किला, मुगल चित्रकला, उर्दू भाषा, मुगलई व्यंजन`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture – Mughal Era", url: "https://indianculture.gov.in" },
      { title: "National Museum – Mughal Gallery", url: "https://nationalmuseumindia.gov.in" },
    ],
    followUps: ["Tell me about the Mughal Empire", "Tell me about Taj Mahal", "Tell me about the Mughal Empire"],
  },
  {
    keywords: ["chola", "chola dynasty", "chola temple", "brihadeeswarar", "thanjavur", "tanjore", "rajendra"],
    text: `The **Chola Dynasty** (3rd century BCE – 1279 CE) was one of the longest-ruling and most powerful dynasties in South Indian history.

**Great Living Chola Temples** (UNESCO World Heritage Site, 1987):
1. **Brihadeeswarar Temple, Thanjavur** — Built by **Rajaraja I** (1003–1010 CE)
   • 66 metres tall — one of the tallest temples in India
   • The massive **Nandi** (bull) at the entrance is carved from a single rock
   • The **shadow of the vimana** (tower) never falls on the ground at noon
   • Over 81 dance poses of Bharatanatyam carved on the walls

2. **Gangaikondacholapuram Temple** — Built by **Rajendra I** to commemorate his victories up to the Ganges
3. **Airavatesvara Temple, Darasuram** — Built by Rajaraja II, known for intricate Dravidian architecture

**Chola Achievements:**
• Greatest **naval power** of ancient India — conquered Sri Lanka, Maldives, parts of Southeast Asia
• **Chola Bronze sculptures** — among the finest metal sculptures ever made (Nataraja, Parvati)
• Advanced **irrigation system** using Grand Anicut (Kallanai) dam — one of the oldest in the world
• Influenced art and architecture of Southeast Asia (Cambodia, Indonesia, Thailand)`,
    textHi: `**चोल वंश** दक्षिण भारत के सबसे शक्तिशाली राजवंशों में से एक:

• **बृहदीश्वर मंदिर, तंजावुर** — राजराज प्रथम द्वारा निर्मित, 66 मीटर ऊँचा
• **चोल कांस्य मूर्तियाँ** — नटराज, सबसे उत्कृष्ट धातु मूर्तियाँ
• प्राचीन भारत की सबसे बड़ी **नौसेना शक्ति**`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Chola Temples", url: "https://asi.nic.in" },
      { title: "Indian Culture – South Indian Heritage", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about the Chola dynasty", "Tell me about the Chola dynasty", "Tell me about Mahabalipuram"],
  },
  {
    keywords: ["indus", "harappa", "mohenjo", "mohenjo-daro", "indus valley", "harappan", "saraswati"],
    text: `The **Indus Valley Civilization** (c. 3300–1300 BCE) was one of the three earliest urban civilizations in the world, along with Mesopotamia and Egypt.

**Major Sites:**
• **Harappa** (Punjab, Pakistan) — First discovered site; gave its name to the civilization
• **Mohenjo-daro** (Sindh, Pakistan) — "Mound of the Dead"; largest known Indus city
• **Dholavira** (Gujarat, India) — UNESCO World Heritage Site (2021); remarkable water management system
• **Lothal** (Gujarat) — World's oldest known dockyard
• **Kalibangan** (Rajasthan) — Evidence of earliest ploughed agricultural field
• **Rakhigarhi** (Haryana) — Largest Indus Valley site in India

**Key Features:**
• Advanced urban planning — grid-pattern streets, brick houses, drainage systems
• **Great Bath** of Mohenjo-daro — earliest known public water tank
• **Standardized weights and measures** — remarkable precision
• **Indus Script** — remains undeciphered (~400 symbols)
• Famous artefacts: **Dancing Girl** (bronze, National Museum), **Priest-King** statue, **Pashupati Seal**
• Trade links with Mesopotamia, Central Asia, Persian Gulf

The **National Museum, New Delhi** houses the largest collection of Indus Valley artefacts in India.`,
    textHi: `**सिंधु घाटी सभ्यता** (लगभग 3300-1300 ई.पू.) विश्व की तीन प्राचीनतम शहरी सभ्यताओं में से एक:

• **धोलावीरा** (गुजरात) — यूनेस्को विश्व धरोहर (2021)
• **लोथल** (गुजरात) — विश्व का सबसे पुराना ज्ञात गोदी
• **नर्तकी** (कांस्य), **पशुपति मुहर** — राष्ट्रीय संग्रहालय में

उन्नत नगर नियोजन, ग्रिड सड़कें, जल निकासी प्रणाली, मानकीकृत माप`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Dholavira", url: "https://asi.nic.in" },
      { title: "National Museum – Harappan Gallery", url: "https://nationalmuseumindia.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Indus Valley Civilization", "Tell me about Indus Valley Civilization", "Tell me about museums in India"],
  },

  // ============ FESTIVALS & TRADITIONS ============
  {
    keywords: ["festival", "festivals", "diwali", "holi", "durga puja", "pongal", "onam", "navratri", "eid", "christmas", "baisakhi", "bihu", "kumbh"],
    text: `India celebrates a remarkable diversity of festivals reflecting its cultural plurality:

**Pan-Indian Festivals:**
• **Diwali** — Festival of Lights, celebrates the return of Lord Rama to Ayodhya. Oil lamps, fireworks, rangoli, sweets
• **Holi** — Festival of Colors, celebrates spring and the legend of Prahlada-Holika. Color play, music, bonfires
• **Navratri/Durga Puja** — 9 nights celebrating the divine feminine. Garba (Gujarat), Durga Puja (Bengal — UNESCO Intangible Heritage 2021)
• **Kumbh Mela** — Largest religious gathering in the world (UNESCO Intangible Heritage 2017). Held at Prayagraj, Haridwar, Ujjain, Nashik in rotation

**Regional Festivals:**
• **Pongal/Makar Sankranti** — Harvest festival (Tamil Nadu/pan-India)
• **Onam** — Kerala's harvest festival with Kathakali, boat races, Onam Sadya
• **Baisakhi** — Sikh New Year and harvest festival (Punjab)
• **Bihu** — Assamese harvest festival (three times a year)
• **Chhath Puja** — Sun worship festival (Bihar/UP)
• **Ganesh Chaturthi** — Celebration of Lord Ganesha (Maharashtra/pan-India)
• **Eid-ul-Fitr & Eid-ul-Adha** — Islamic festivals celebrated widely
• **Christmas** — Celebrated especially in Goa, Kerala, Northeast India

The Ministry of Culture supports festival documentation through **IGNCA** and **Sangeet Natak Akademi**.`,
    textHi: `भारत विविध त्योहार मनाता है:

• **दीवाली** — रोशनी का त्योहार  • **होली** — रंगों का त्योहार
• **नवरात्रि/दुर्गा पूजा** — यूनेस्को अमूर्त विरासत (2021)
• **कुंभ मेला** — विश्व का सबसे बड़ा धार्मिक आयोजन (यूनेस्को 2017)
• **पोंगल**, **ओणम**, **बैसाखी**, **बिहू**, **छठ पूजा**, **गणेश चतुर्थी**`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture – Festivals", url: "https://indianculture.gov.in" },
      { title: "IGNCA – Festival Documentation", url: "https://ignca.gov.in" },
    ],
    followUps: ["Tell me about Indian festivals", "Tell me about Indian festivals", "Tell me about Indian festivals"],
  },

  // ============ LANGUAGES ============
  {
    keywords: ["language", "languages", "hindi", "bengali", "tamil", "telugu", "marathi", "urdu", "scheduled", "official language", "script"],
    text: `India is one of the most linguistically diverse countries in the world:

**Constitutional Languages:**
• **22 Scheduled Languages** under the 8th Schedule of the Constitution
• **Hindi** (in Devanagari script) — Official language of the Union
• **English** — Subsidiary official language for central government
• 6 languages designated as **Classical Languages**: Tamil (2004), Sanskrit (2005), Kannada (2008), Telugu (2008), Malayalam (2013), Odia (2014)

**Language Families:**
• **Indo-Aryan** — Hindi, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, Urdu (~74% of population)
• **Dravidian** — Tamil, Telugu, Kannada, Malayalam (~24%)
• **Austroasiatic** — Santali, Mundari, Khasi
• **Tibeto-Burman** — Bodo, Manipuri, Lepcha

**Key Facts:**
• India has **19,500+ mother tongues** (Census 2011)
• **121 languages** spoken by 10,000+ people
• India's banknotes feature **17 languages**
• The **Sahitya Akademi** gives annual awards in 24 languages

**Digital Initiatives:**
• **Bhashini** (bhashini.gov.in) — Government's AI-based translation platform supporting Indian languages
• The Ministry of Culture's AI platform integrates Bhashini for multi-lingual search`,
    textHi: `भारत विश्व के सबसे भाषाई विविध देशों में से एक:

• **22 अनुसूचित भाषाएँ**, **6 शास्त्रीय भाषाएँ**
• **19,500+ मातृभाषाएँ** (जनगणना 2011)
• **भाषिणी** — सरकार का AI अनुवाद मंच`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture – Languages", url: "https://indianculture.gov.in" },
      { title: "Sahitya Akademi", url: "https://sahitya-akademi.gov.in" },
    ],
    followUps: ["Tell me about languages of India", "Tell me about languages of India", "Sahitya Akademi awards"],
  },

  // ============ SPECIFIC QUESTION PATTERNS ============
  {
    keywords: ["how many", "count", "number", "total", "list all"],
    text: `Here are key numbers related to India's cultural heritage:

**Monuments & Sites:**
• **42 UNESCO World Heritage Sites** (34 cultural, 7 natural, 1 mixed)
• **3,696 ASI-protected monuments** of national importance
• **15 UNESCO Intangible Cultural Heritage** inscriptions

**Ministry of Culture Portals:** **66 websites/portals** (as per Annexure XI of the RFP)

**Arts & Culture:**
• **8 classical dance forms** recognized by Sangeet Natak Akademi
• **22 Scheduled Languages** in the Constitution
• **6 Classical Languages**: Tamil, Sanskrit, Kannada, Telugu, Malayalam, Odia

**Institutions:**
• **National Museum** — 2,00,000+ artefacts
• **National Archives** — 50 million+ pages
• **IGNCA Kalanidhi** — 1,50,000+ books
• **800+ museums** across India

**Key Organizations under Ministry of Culture:**
ASI, National Museum, IGNCA, Sangeet Natak Akademi, Sahitya Akademi, Lalit Kala Akademi, National Archives, National Library, CCRT, and many more.`,
    textHi: `भारत की सांस्कृतिक विरासत के प्रमुख आँकड़े:

• **42 यूनेस्को विश्व धरोहर स्थल** • **3,696 ASI-संरक्षित स्मारक**
• **8 शास्त्रीय नृत्य** • **22 अनुसूचित भाषाएँ**
• **66 मंत्रालय पोर्टल** • **800+ संग्रहालय**`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Ministry of Culture", url: "https://culture.gov.in" },
      { title: "ASI", url: "https://asi.nic.in" },
    ],
    followUps: ["UNESCO World Heritage Sites in India", "Tell me about classical dance forms", "Tell me about Indian Culture Portal"],
  },
  {
    keywords: ["who built", "who made", "who created", "when was", "where is", "what is the history", "how old"],
    text: `I can answer questions about specific monuments, temples, and heritage sites! Here are some popular ones:

• **Taj Mahal** — Built by Shah Jahan (1632–1653) in Agra, for his wife Mumtaz Mahal
• **Red Fort** — Built by Shah Jahan (1639) in Delhi
• **Qutub Minar** — Built by Qutb-ud-din Aibak (1193) and Iltutmish (1220) in Delhi
• **Konark Sun Temple** — Built by Narasimhadeva I (~1250 CE) in Odisha
• **Ajanta Caves** — 2nd century BCE to 480 CE, Maharashtra
• **Ellora Caves** — 600–1000 CE, Maharashtra
• **Hampi** — Vijayanagara Empire (1336–1565), Karnataka
• **Khajuraho** — Chandela dynasty (950–1050 CE), Madhya Pradesh
• **Sanchi Stupa** — Emperor Ashoka (3rd century BCE), Madhya Pradesh
• **Mahabalipuram** — Pallava dynasty (7th–8th century), Tamil Nadu
• **Brihadeeswarar Temple** — Rajaraja Chola I (1003–1010 CE), Thanjavur

Ask me about any specific site for detailed information!`,
    textHi: `मैं विशिष्ट स्मारकों के बारे में उत्तर दे सकता हूँ:

• **ताज महल** — शाहजहाँ (1632–1653), आगरा
• **लाल किला** — शाहजहाँ (1639), दिल्ली
• **कुतुब मीनार** — कुतुबुद्दीन ऐबक (1193), दिल्ली
• **कोणार्क सूर्य मंदिर** — नरसिम्हदेव प्रथम (~1250), ओडिशा

किसी विशेष स्थल के बारे में पूछें!`,
    textTe: `**తాజ్ మహల్** ఆగ్రా, ఉత్తరప్రదేశ్‌లోని తెల్ల పాలరాతి సమాధి — ప్రపంచ కొత్త ఏడు అద్భుతాలలో ఒకటి, యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం (1983).

• మొఘల్ చక్రవర్తి **షాజహాన్** తన భార్య **ముమ్తాజ్ మహల్** జ్ఞాపకార్థం నిర్మించారు
• 1632–1653 మధ్య నిర్మాణం — సుమారు 21 సంవత్సరాలు
• **20,000+ కళాకారులు** పనిచేశారు`,
    textTa: `**தாஜ்மஹால்** ஆக்ரா, உத்தரப்பிரதேசத்தில் உள்ள வெண்ணிற பளிங்கு கல்லறை — உலகின் புதிய ஏழு அதிசயங்களில் ஒன்று, யுனெஸ்கோ உலக பாரம்பரிய தளம் (1983).

• முகலாய பேரரசர் **ஷாஜஹான்** தன் மனைவி **மும்தாஜ் மஹால்** நினைவாகக் கட்டினார்
• 1632–1653 கட்டுமானம் — சுமார் 21 ஆண்டுகள்
• **20,000+ கலைஞர்கள்** பணியாற்றினர்`,
    confidence: "Medium",
    sources: [
      { title: "ASI", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Taj Mahal", "Tell me about Qutub Minar", "Tell me about Konark Sun Temple"],
  },
  {
    keywords: ["access", "how to access", "how to visit", "how to use", "visit", "timings", "ticket", "entry fee", "open"],
    text: `**How to access Ministry of Culture resources:**

**Online Portals (Free Access):**
• **indianculture.gov.in** — Digital heritage repository (free, no login required)
• **abhilekh-patal.in** — Digitized archival records (free, registration required for downloads)
• **museumsofindia.gov.in** — Virtual museum tours (free)
• **vedicheritage.gov.in** — Vedic manuscripts and audio (free)

**Physical Visits to ASI Monuments:**
• Most ASI monuments are open **sunrise to sunset**
• **Entry fees:** Indian citizens ₹40, Foreign tourists ₹600 (varies by site)
• **Free entry** on these days: Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct), World Heritage Day (18 Apr), World Tourism Day (27 Sep)
• **Online tickets:** Available at asi.payumoney.com for major sites
• Photography is generally allowed; videography may require separate permission

**Museum Visits:**
• National Museum, Delhi — Open 10 AM–6 PM (closed Mondays); Entry ₹20 (Indians)
• Most national museums are closed on **Mondays and national holidays**

**Apply for Schemes:**
• Visit **culturescheme.dashboard.nic.in** for fellowships, grants, and scholarships`,
    textHi: `**संस्कृति मंत्रालय संसाधनों तक पहुँच:**

**ऑनलाइन (निःशुल्क):** indianculture.gov.in, abhilekh-patal.in, museumsofindia.gov.in
**ASI स्मारक:** सूर्योदय से सूर्यास्त तक, भारतीय ₹40, विदेशी ₹600
**निःशुल्क प्रवेश दिवस:** 26 जनवरी, 15 अगस्त, 2 अक्टूबर
**योजनाओं के लिए आवेदन:** culturescheme.dashboard.nic.in`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Visit Information", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
      { title: "Culture Schemes", url: "https://culturescheme.dashboard.nic.in" },
    ],
    followUps: ["Tell me about ASI", "Tell me about cultural schemes", "Tell me about ASI ticketing"],
  },

  {
    keywords: ["help", "what can you do", "capabilities", "features", "how to use"],
    text: `I'm the **Ministry of Culture AI Assistant**, powered by semantic search across **66 official portals**. Here's what I can help with:

**Monuments & Heritage Sites:**
• ASI-protected monuments (3,693+), UNESCO World Heritage Sites (40)
• Detailed info on Taj Mahal, Ajanta, Ellora, Red Fort, Konark, Hampi, Khajuraho, and more

**Museums & Collections:**
• National Museum (New Delhi), Indian Museum (Kolkata), Victoria Memorial Hall
• Salar Jung Museum, NGMA, site museums, virtual galleries

**Archives & Records:**
• National Archives of India, Abhilekh Patal digital portal
• 20 million+ digitized pages, Mughal farmans, cartographic records

**Arts & Culture:**
• Classical dance (8 forms), music (Hindustani & Carnatic), paintings, textiles
• Rare manuscripts, inscriptions, gazetteers on Indian Culture Portal

**Schemes & Services:**
• Cultural fellowships, scholarships, grants
• ASI ticketing, photography permissions, monument visit info
• Adopt a Heritage, Swachh Smarak initiatives

**History & Civilization:**
• Indus Valley, Maurya, Gupta, Chola, Mughal dynasties
• Vedic heritage, freedom movement, Indian languages

Ask me anything! I search across indianculture.gov.in, asi.nic.in, museumsofindia.gov.in, nationalarchives.nic.in, and 62 more portals.`,
    textHi: `मैं **संस्कृति मंत्रालय AI सहायक** हूँ। **66 आधिकारिक पोर्टलों** पर सिमैंटिक सर्च द्वारा संचालित।

मैं इन विषयों पर मदद कर सकता हूँ: स्मारक, संग्रहालय, अभिलेखागार, कला व संस्कृति, योजनाएँ, वेद, नृत्य, संगीत, यूनेस्को विरासत, और बहुत कुछ।

कुछ भी पूछें!`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Ministry of Culture", url: "https://culture.gov.in" },
      { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about ASI", "List museums in India", "What is Abhilekh Patal?"],
  },

  // ============ ASI (asi.nic.in) ============
  {
    keywords: ["asi", "archaeological survey", "archaeological survey of india", "asi india", "asi monuments"],
    text: `The **Archaeological Survey of India (ASI)** is the premier organization for archaeological research, exploration, and conservation of cultural heritage in India, functioning under the Ministry of Culture.

**Key Facts:**
• **Established:** 1861 by Alexander Cunningham (first Director General)
• **Headquarters:** New Delhi
• **Protected Monuments:** 3,693+ centrally protected monuments, sites, and remains across India
• **UNESCO Sites:** Manages most of India's 40 UNESCO World Heritage Sites
• **Regional Circles:** ~30 circles across India, each headed by a Superintending Archaeologist
• **Governing Law:** Ancient Monuments and Archaeological Sites and Remains (AMASR) Act, 1958

**Key Divisions:**
• **Exploration & Excavation Branch** — Conducts archaeological digs at sites like Rakhigarhi, Dholavira, Sanauli
• **Epigraphy Branch** (Mysore & Nagpur) — Studies inscriptions in Sanskrit, Dravidian, Arabic/Persian scripts
• **Science Branch** (Dehradun) — Central hub for conservation science
• **Underwater Archaeology Wing** — Explores submerged heritage (Dwarka, Poompuhar)
• **Horticulture Branch** — Maintains gardens at monument sites
• **Conservation Laboratories** — Chemical treatment, mural restoration at Agra, Bhopal, Mysore, Lucknow

**Publications:**
• *Indian Archaeology – A Review* (annual)
• *Epigraphia Indica* (inscriptions journal)
• *Ancient India* (research journal)
• Monument guide books

**Website:** asi.nic.in`,
    textHi: `**भारतीय पुरातत्व सर्वेक्षण (ASI)** भारत में पुरातात्विक अनुसंधान और सांस्कृतिक विरासत के संरक्षण के लिए प्रमुख संगठन है।

**प्रमुख तथ्य:**
• **स्थापना:** 1861, अलेक्जेंडर कनिंघम द्वारा
• **संरक्षित स्मारक:** 3,693+ केंद्रीय संरक्षित स्मारक
• **यूनेस्को स्थल:** भारत के 40 विश्व धरोहर स्थलों का प्रबंधन
• **क्षेत्रीय मंडल:** ~30 मंडल पूरे भारत में
• **शासी कानून:** AMASR अधिनियम, 1958

प्रमुख शाखाएँ: अन्वेषण व उत्खनन, पुरालेख, विज्ञान शाखा (देहरादून), जलीय पुरातत्व, संरक्षण प्रयोगशालाएँ`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI Official Website", url: "https://asi.nic.in" },
      { title: "Ministry of Culture – ASI", url: "https://culture.gov.in" },
    ],
    followUps: ["Tell me about ASI", "Tell me about ASI", "Tell me about ASI ticketing"],
  },
  {
    keywords: ["asi ticket", "ticket", "entry fee", "monument fee", "booking", "online ticket", "monument ticket", "asi booking"],
    text: `**ASI Ticketing & Entry Fees for Monuments:**

ASI manages ticketing for India's most visited heritage sites. Tickets can be booked online or purchased at the counter.

**Fee Categories:**
• **Indian Citizens:** ₹15–₹50 per monument (some are free)
• **SAARC/BIMSTEC Nationals:** Same as Indian citizens at most sites
• **Foreign Nationals:** ₹200–₹750+ depending on the monument

**Popular Monument Fees (Foreign/Indian):**
• **Taj Mahal:** ₹1,100 / ₹50 (+ ₹200 for main mausoleum)
• **Red Fort:** ₹500 / ₹35
• **Qutub Minar:** ₹500 / ₹35
• **Humayun's Tomb:** ₹500 / ₹35
• **Ajanta Caves:** ₹500 / ₹35
• **Ellora Caves:** ₹500 / ₹35
• **Konark Sun Temple:** ₹300 / ₹40
• **Hampi (group):** ₹500 / ₹40

**Timings:** Most monuments are open sunrise to sunset. Taj Mahal night viewing available on full moon nights (limited tickets).

**How to Book Online:**
1. Visit the ASI e-ticketing portal
2. Select the monument and date
3. Choose ticket category (Indian/Foreign)
4. Pay via UPI, debit/credit card, or net banking
5. Download your e-ticket

**Photography:** Still photography is generally free. Videography and commercial shoots require prior permission from the respective ASI circle office.`,
    textHi: `**ASI टिकट और प्रवेश शुल्क:**

**शुल्क श्रेणियाँ:**
• **भारतीय नागरिक:** ₹15–₹50 प्रति स्मारक
• **विदेशी नागरिक:** ₹200–₹750+

**लोकप्रिय स्मारक शुल्क (विदेशी/भारतीय):**
• ताज महल: ₹1,100 / ₹50
• लाल किला: ₹500 / ₹35
• कुतुब मीनार: ₹500 / ₹35
• अजंता गुफाएँ: ₹500 / ₹35

**समय:** अधिकांश स्मारक सूर्योदय से सूर्यास्त तक खुले रहते हैं।

**ऑनलाइन बुकिंग:** ASI ई-टिकटिंग पोर्टल पर जाएँ, स्मारक और तिथि चुनें, UPI/कार्ड से भुगतान करें।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI e-Ticketing Portal", url: "https://asi.nic.in" },
      { title: "ASI – Visitor Information", url: "https://asi.nic.in" },
    ],
    followUps: ["Taj Mahal timings", "Photography rules at monuments", "How to visit Ajanta caves?"],
  },
  {
    keywords: ["amasr", "amasr act", "monument act", "monument law", "protected monument", "prohibited area", "regulated area", "noc", "construction near monument"],
    text: `**AMASR Act — Ancient Monuments and Archaeological Sites and Remains Act, 1958 (Amended 2010):**

This is the primary legislation governing protection and conservation of monuments and archaeological sites in India.

**Key Provisions:**
• Defines **centrally protected monuments** (currently 3,693+)
• Establishes **prohibited areas** (100 metres around a protected monument) — no construction, mining, or building activity allowed
• Establishes **regulated areas** (200 metres beyond prohibited area) — construction requires prior permission from the National Monuments Authority (NMA)
• Unauthorized construction in prohibited/regulated areas is punishable with imprisonment up to 2 years and/or fine up to ₹1 lakh

**National Monuments Authority (NMA):**
• Created under the 2010 amendment
• Grants or denies NOCs (No Objection Certificates) for construction in regulated areas
• Considers heritage impact assessment for proposed construction
• Recommends heritage bylaws for each protected monument

**How to Apply for NOC:**
1. Apply through the NMA or the respective ASI circle office
2. Submit site plans, proposed construction details, and heritage impact assessment
3. NMA reviews and may conduct site inspection
4. Permission granted or denied within a stipulated timeframe

**Penalties:**
• Defacing/destroying a protected monument: imprisonment up to 2 years + fine
• Unauthorized construction: imprisonment up to 2 years + fine up to ₹1 lakh`,
    textHi: `**AMASR अधिनियम — प्राचीन स्मारक और पुरातत्वीय स्थल और अवशेष अधिनियम, 1958 (संशोधित 2010):**

यह भारत में स्मारकों की सुरक्षा और संरक्षण का प्रमुख कानून है।

**मुख्य प्रावधान:**
• **निषिद्ध क्षेत्र** (100 मीटर) — कोई निर्माण/खनन गतिविधि नहीं
• **विनियमित क्षेत्र** (200 मीटर) — NMA से NOC आवश्यक
• अनधिकृत निर्माण पर 2 वर्ष तक कारावास और/या ₹1 लाख जुर्माना

**राष्ट्रीय स्मारक प्राधिकरण (NMA):** 2010 के संशोधन में स्थापित, विनियमित क्षेत्र में निर्माण के लिए NOC प्रदान करता है।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "ASI – AMASR Act", url: "https://asi.nic.in" },
      { title: "National Monuments Authority", url: "https://nma.gov.in" },
    ],
    followUps: ["Tell me about ASI", "Tell me about ASI", "Tell me about ASI conservation"],
  },
  {
    keywords: ["excavation", "excavations", "rakhigarhi", "dholavira", "lothal", "sanauli", "keeladi", "adichanallur", "archaeological dig", "asi excavation"],
    text: `**Major Archaeological Excavations by ASI:**

The Archaeological Survey of India conducts excavations at sites of historical significance across India. Key sites include:

**Indus Valley / Harappan Sites:**
• **Rakhigarhi** (Haryana) — Largest Indus Valley Civilization site in India. Recent DNA analysis revealed insights about Harappan ancestry and migration patterns.
• **Dholavira** (Gujarat) — UNESCO World Heritage Site (2021). One of the five largest Harappan cities. Features sophisticated water management system and a unique signboard with Indus script.
• **Lothal** (Gujarat) — Ancient Harappan port city with the world's earliest known tidal dock. Bead-making factory and warehouse discovered here.

**Recent Significant Excavations:**
• **Sanauli** (Uttar Pradesh) — Discovery of **chariot burials** (2018) dating to 2000-1800 BCE, challenging previous assumptions about chariot use in ancient India.
• **Keeladi / Sivakalai** (Tamil Nadu) — Sangam-era site (6th century BCE), proving urban settlement existed in Tamil Nadu much earlier than previously thought.
• **Adichanallur** (Tamil Nadu) — Iron Age burial site with urn burials, iron implements, bronze objects dating to 1000 BCE.

**Historical Excavations:**
• **Nalanda** (Bihar) — Ancient Mahavihara (university), extensive monastery and temple ruins
• **Sarnath** (UP) — Where Buddha gave his first sermon, Ashoka's Lion Capital found here
• **Purana Qila** (Delhi) — Revealed layers from Mauryan to Mughal periods

All excavation findings are published in ASI's annual *Indian Archaeology – A Review*.`,
    textHi: `**ASI द्वारा प्रमुख पुरातात्विक उत्खनन:**

**सिंधु घाटी स्थल:**
• **राखीगढ़ी** (हरियाणा) — भारत का सबसे बड़ा सिंधु सभ्यता स्थल
• **धोलावीरा** (गुजरात) — यूनेस्को विश्व धरोहर (2021), उन्नत जल प्रबंधन प्रणाली
• **लोथल** (गुजरात) — विश्व का प्राचीनतम ज्ञात टाइडल डॉक

**हाल के महत्वपूर्ण उत्खनन:**
• **सनौली** (UP) — रथ दफ़न की खोज (2018)
• **कीलाडी** (तमिलनाडु) — संगम युग का स्थल, छठी शताब्दी ईसा पूर्व
• **अदिचनल्लूर** (तमिलनाडु) — लौह युग का कलश दफ़न स्थल`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Mera Gaon Meri Dharohar (MGMD)", url: "https://mgmd.gov.in" },
      { title: "ASI – Excavation Branch", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Archaeology", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Indus Valley Civilization", "Tell me about ASI excavations", "Tell me about ASI conservation"],
  },
  {
    keywords: ["adopt a heritage", "adopt heritage", "swachh smarak", "clean monument", "monument scheme", "asi scheme"],
    text: `**Adopt a Heritage & Swachh Smarak — ASI's Monument Care Initiatives:**

**Adopt a Heritage (Apni Dharohar, Apni Pehchaan):**
• Launched in 2017 by the Ministry of Tourism in collaboration with Ministry of Culture and ASI
• Allows private/public sector companies and individuals to adopt monuments and heritage sites
• "Monument Mitras" (adopters) provide amenities like toilets, drinking water, signage, Wi-Fi, lighting, and accessibility features
• Does **not** allow any commercial activity or branding inside the monument premises
• Aims to enhance visitor experience while preserving heritage character
• Notable adoptions include various ASI-protected monuments across India

**Swachh Smarak (Clean Monument):**
• Part of the Swachh Bharat Mission applied to heritage sites
• ASI conducts annual **Swachh Smarak** rankings of its monuments
• Criteria: cleanliness, waste management, sanitation facilities, landscaping, visitor amenities
• Winners receive recognition and additional maintenance support
• Encourages community participation in monument upkeep

**Other ASI Initiatives:**
• **ePermission Portal** — Online applications for filming, photography, events at monuments
• **Digital Monument Signage** — QR codes at monuments linking to detailed historical information
• **Night Viewing Programs** — Taj Mahal and select monuments open for moonlit visits`,
    textHi: `**एडॉप्ट ए हेरिटेज और स्वच्छ स्मारक:**

**एडॉप्ट ए हेरिटेज:** 2017 में शुरू। निजी/सार्वजनिक कंपनियाँ स्मारकों को गोद ले सकती हैं और शौचालय, पेयजल, साइनेज, वाई-फाई जैसी सुविधाएँ प्रदान कर सकती हैं।

**स्वच्छ स्मारक:** स्वच्छ भारत मिशन के तहत विरासत स्थलों की स्वच्छता रैंकिंग। ASI वार्षिक रैंकिंग करता है।

**अन्य पहल:** ईपरमिशन पोर्टल, डिजिटल QR कोड साइनेज, ताज महल रात्रि दर्शन कार्यक्रम।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Adopt a Heritage – Ministry of Tourism", url: "https://adoptaheritage.in" },
      { title: "ASI – Swachh Smarak", url: "https://asi.nic.in" },
    ],
    followUps: ["Tell me about ASI ticketing", "Tell me about ASI ticketing", "Tell me about ASI"],
  },
  {
    keywords: ["asi conservation", "conservation", "monument repair", "restoration", "heritage conservation", "preservation"],
    text: `**ASI Conservation & Preservation of Monuments:**

ASI operates a comprehensive conservation program to protect India's 3,693+ centrally protected monuments.

**Conservation Laboratories:**
• **Science Branch, Dehradun** — Central hub for conservation science and research
• **Chemical Conservation Labs** at Agra, Bhopal, Mysore, Lucknow — Treatment of stone, paintings, antiquities
• **Regional Labs** across all ASI circles for routine maintenance

**Key Conservation Activities:**
• **Stone Conservation** — Chemical treatment, consolidation, waterproofing of stone structures
• **Mural & Painting Restoration** — Cleaning, stabilization, and retouching of ancient wall paintings (e.g., Ajanta murals)
• **Structural Repairs** — Underpinning, grouting, re-pointing of masonry, dome stabilization
• **Bio-deterioration Control** — Removal of vegetation, lichen, moss; pest control
• **Chemical Treatment** — De-salination, mud-pack therapy (used on Taj Mahal to remove yellowing)
• **Micro-climate Monitoring** — Sensors tracking humidity, temperature, and pollutants inside monument chambers

**Notable Conservation Projects:**
• **Taj Mahal** — Mud-pack treatment, Taj Trapezium Zone for pollution control
• **Ajanta Cave Murals** — Climate-controlled chambers, anti-fungal treatment
• **Konark Sun Temple** — Sand core stabilization, structural strengthening
• **Hampi Monuments** — Flood damage repair, vegetation management

**Antiquities & Art Treasures Act, 1972:**
Regulates export and trade of antiquities. Any object over 100 years old is classified as an antiquity and requires registration with ASI.`,
    textHi: `**ASI संरक्षण और स्मारकों का परिरक्षण:**

ASI 3,693+ स्मारकों की सुरक्षा के लिए व्यापक संरक्षण कार्यक्रम चलाता है।

**संरक्षण प्रयोगशालाएँ:** विज्ञान शाखा (देहरादून), रासायनिक संरक्षण लैब (आगरा, भोपाल, मैसूर, लखनऊ)

**प्रमुख गतिविधियाँ:** पत्थर संरक्षण, भित्ति चित्र पुनर्स्थापन, संरचनात्मक मरम्मत, जैव-क्षरण नियंत्रण, रासायनिक उपचार, सूक्ष्म-जलवायु निगरानी

**उल्लेखनीय परियोजनाएँ:** ताज महल मड-पैक उपचार, अजंता गुफा भित्ति चित्र, कोणार्क सूर्य मंदिर स्थिरीकरण`,
    textTe: `**కోణార్క్ సూర్య దేవాలయం** ఒడిశాలో 13వ శతాబ్దపు ఆలయం, హిందూ సూర్యదేవుడికి అంకితం. 1984 నుండి యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం. విశాలమైన రథం ఆకారంలో నిర్మించబడింది — 24 చక్రాలు మరియు 7 గుర్రాలతో.`,
    textTa: `**கோணார்க் சூரிய கோவில்** ஒடிசாவில் 13ம் நூற்றாண்டு கோவில், இந்து சூரிய கடவுளுக்கு அர்ப்பணிக்கப்பட்டது. 1984 முதல் யுனெஸ்கோ உலக பாரம்பரிய தளம். மிகப்பெரிய தேர் வடிவத்தில் கட்டப்பட்டது — 24 சக்கரங்கள் மற்றும் 7 குதிரைகளுடன்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Conservation", url: "https://asi.nic.in" },
      { title: "ASI – Science Branch", url: "https://asi.nic.in" },
    ],
    followUps: ["Tell me about ASI conservation", "Tell me about ASI", "Tell me about ASI excavations"],
  },

  // ============ MUSEUMS OF INDIA (museumsofindia.gov.in) ============
  {
    keywords: ["indian museum", "indian museum kolkata", "kolkata museum", "oldest museum", "asia museum"],
    text: `The **Indian Museum, Kolkata** is the oldest and largest museum in Asia, established in **1814**.

**Key Facts:**
• **Location:** 27 Jawaharlal Nehru Road, Kolkata
• **Founder:** Dr. Nathaniel Wallich (Danish botanist)
• **Collection:** 100,000+ objects across 35 galleries in 6 sections

**Six Sections:**
1. **Archaeology** — Gandhara sculptures, Bharhut Stupa railings, Mauryan and Gupta art
2. **Anthropology** — Tribal artifacts, ethnographic collections from across India
3. **Art** — Mughal miniatures, Bengali art, textiles, decorative arts
4. **Geology** — Meteorites, fossils, minerals, Siwalik fossil collection
5. **Zoology** — Taxidermied specimens, skeleton gallery, marine life
6. **Economic Botany** — Plant specimens, timber, fibers, gums

**Must-See Galleries:**
• **Bharhut Gallery** — 2nd century BCE Buddhist stupa railings (finest in the world)
• **Gandhara Gallery** — Greco-Buddhist sculptures from ancient Gandhara
• **Egyptian Gallery** — Including a real Egyptian mummy
• **Coin Gallery** — Coins from Punch-marked to British period
• **Mask Gallery** — Masks from tribal communities across India
• **Musical Instrument Gallery** — Traditional instruments from all regions

The museum is available on the **Museums of India Portal** (museumsofindia.gov.in) with digitized collections.`,
    textHi: `**भारतीय संग्रहालय, कोलकाता** एशिया का सबसे पुराना और सबसे बड़ा संग्रहालय है, **1814** में स्थापित।

• **संग्रह:** 35 दीर्घाओं में 1,00,000+ वस्तुएँ, 6 खंडों में
• **छह खंड:** पुरातत्व, मानवविज्ञान, कला, भूविज्ञान, प्राणिविज्ञान, आर्थिक वनस्पति विज्ञान
• **अवश्य देखें:** भरहुत दीर्घा, गांधार दीर्घा, मिस्र की ममी, सिक्का दीर्घा, मुखौटा दीर्घा

museumsofindia.gov.in पर डिजिटल संग्रह उपलब्ध है।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – Indian Museum", url: "https://museumsofindia.gov.in" },
      { title: "Indian Museum Official", url: "https://indianmuseumkolkata.org" },
    ],
    followUps: ["Tell me about museums in India", "Tell me about museums in India", "Tell me about museums in India"],
  },
  {
    keywords: ["victoria memorial", "victoria memorial hall", "victoria hall", "kolkata memorial"],
    text: `**Victoria Memorial Hall, Kolkata** — India's most-visited museum, a stunning white marble building blending British and Mughal architectural styles.

**Key Facts:**
• **Established:** Conceived by Lord Curzon in 1901, opened in 1921
• **Location:** Queens Way, Kolkata (set in 64 acres of gardens)
• **Architecture:** Indo-Saracenic style with white Makrana marble (same as Taj Mahal)
• **Collection:** 28,394 artifacts across 9 galleries covering 350 years of history

**Major Collections:**
• **Royal Gallery** — Oil paintings of British monarchs and Indian rulers
• **Portrait Gallery** — Paintings of historical figures by European and Indian artists
• **National Leaders Gallery** — Portraits and memorabilia of Indian freedom fighters
• **Calcutta Gallery** — History of Kolkata from Job Charnock to Independence
• **Arms & Armory Gallery** — Weapons from Mughal and colonial periods

**Notable Artifacts:**
• **Aurangzeb's hand-written Quran**
• **Tipu Sultan's war diary and sword**
• **Maharaja Ranjit Singh's throne and sword**
• **Kalighat paintings** (19th-century folk art from Bengal)
• **Bengal School paintings** by Abanindranath Tagore and Nandalal Bose
• **Death mask of Tipu Sultan**

**Visitor Info:**
• Open: Tuesday to Sunday, 10 AM to 5 PM (closed Mondays & national holidays)
• Light and Sound show in the evenings
• Beautiful gardens with lakes and statues — ideal for photography`,
    textHi: `**विक्टोरिया मेमोरियल हॉल, कोलकाता** — भारत का सबसे अधिक देखा जाने वाला संग्रहालय।

• **स्थापना:** 1901 (लॉर्ड कर्जन), 1921 में खोला गया
• **वास्तुकला:** भारत-सारासेनिक शैली, मकराना संगमरमर
• **संग्रह:** 9 दीर्घाओं में 28,394 कलाकृतियाँ

**उल्लेखनीय:** औरंगजेब का हस्तलिखित कुरान, टीपू सुल्तान की युद्ध डायरी, कालीघाट चित्रकारी, बंगाल स्कूल पेंटिंग

• मंगलवार से रविवार, सुबह 10 से शाम 5 बजे तक खुला`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – Victoria Memorial", url: "https://museumsofindia.gov.in" },
      { title: "Victoria Memorial Hall Official", url: "https://victoriamemorial-cal.org" },
    ],
    followUps: ["Tell me about museums in India", "Tell me about museums in India", "Tell me about Indian paintings"],
  },
  {
    keywords: ["salar jung", "salar jung museum", "hyderabad museum", "salar jung collection"],
    text: `**Salar Jung Museum, Hyderabad** — One of the world's largest one-man collections of art and antiques, built by **Nawab Mir Yousuf Ali Khan (Salar Jung III)**.

**Key Facts:**
• **Location:** Dar-ul-Shifa, Hyderabad (on the banks of Musi River)
• **Established:** 1951 (declared National Museum by Act of Parliament, 1961)
• **Collection:** 43,000+ art objects, 50,000+ books, 8,000+ manuscripts spanning civilizations

**Major Collections:**
• **Indian Art** — Mughal miniatures, Tanjore paintings, jade carvings, ivory carvings, bidriware
• **European Art** — Oil paintings, porcelain, clocks, marble statues
• **Middle Eastern Art** — Persian carpets, calligraphy, arms & armor, metalwork
• **Far Eastern Art** — Chinese porcelain, Japanese lacquerware, silk paintings
• **Textiles** — Brocades, embroidered fabrics, Kashmiri shawls

**Star Attraction — "Veiled Rebecca":**
A 19th-century marble statue by Italian sculptor **Giovanni Maria Benzoni** depicting the biblical Rebecca with a translucent marble veil — the marble appears to be see-through fabric.

**Other Highlights:**
• **World's largest collection of Bidri ware** (metalwork from Bidar, Karnataka)
• **Musical clock** that plays at the stroke of every hour
• **Library:** 8,000 manuscripts in Arabic, Persian, Urdu, Turkish, Hindi, Sanskrit, English
• **Quran collection** — Some of the finest illuminated Qurans

**Visitor Info:** Open Saturday to Thursday, 10 AM to 5 PM (closed Fridays)`,
    textHi: `**सालार जंग संग्रहालय, हैदराबाद** — दुनिया के सबसे बड़े एक-व्यक्ति संग्रहों में से एक।

• **संस्थापक:** नवाब मीर यूसुफ अली खान (सालार जंग III)
• **संग्रह:** 43,000+ कला वस्तुएँ, 50,000+ पुस्तकें, 8,000+ पांडुलिपियाँ

**प्रमुख आकर्षण:** "वेल्ड रेबेका" — इतालवी मूर्तिकार बेन्जोनी की पारदर्शी संगमरमर प्रतिमा
• विश्व का सबसे बड़ा बिदरी वेयर संग्रह
• हर घंटे बजने वाली संगीत घड़ी
• अरबी, फ़ारसी, उर्दू में 8,000 पांडुलिपियाँ

शनिवार से गुरुवार, सुबह 10 से शाम 5 बजे (शुक्रवार बंद)`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – Salar Jung", url: "https://museumsofindia.gov.in" },
      { title: "Salar Jung Museum Official", url: "https://salarjungmuseum.in" },
    ],
    followUps: ["Tell me about Indian textiles and crafts", "Tell me about museums in India", "Tell me about museums in India"],
  },
  {
    keywords: ["ngma", "national gallery", "modern art", "contemporary art", "ngma delhi", "ngma mumbai", "ngma bangalore"],
    text: `**National Gallery of Modern Art (NGMA)** — India's premier institution for modern and contemporary art, under the Ministry of Culture.

**Three Locations:**
1. **NGMA New Delhi** (est. 1954) — Jaipur House, India Gate. Main campus with 14,000+ works
2. **NGMA Mumbai** (est. 1996) — Sir Cowasji Jehangir Public Hall, Fort area
3. **NGMA Bengaluru** (est. 2009) — Manikyavelu Mansion, Palace Road

**Collection Highlights (14,000+ works):**
• **Raja Ravi Varma** — India's most celebrated painter; mythological scenes, portraits
• **Abanindranath Tagore** — Founder of Bengal School; "Bharat Mata" painting
• **Rabindranath Tagore** — Nobel laureate's paintings and sketches
• **Amrita Sher-Gil** — "The Three Girls", "Bride's Toilet" — pioneer of modern Indian art
• **M.F. Husain** — Contemporary works, vibrant horse and figure paintings
• **Nandalal Bose** — Artist who illustrated the original Constitution of India
• **Jamini Roy** — Folk-inspired modern art from Bengal
• **S.H. Raza** — Abstract works with bindu motif
• **F.N. Souza** — Progressive Artists' Group founder member

**Key Features:**
• Rotating exhibitions and retrospectives
• Art conservation laboratory
• Art reference library with 18,000+ books
• Educational programs, lectures, and workshops
• Virtual exhibitions available online

**Visitor Info:** Open Tuesday to Sunday, 10 AM to 5 PM (closed Mondays)`,
    textHi: `**राष्ट्रीय आधुनिक कला संग्रहालय (NGMA)** — भारत की आधुनिक और समकालीन कला का प्रमुख संस्थान।

**तीन स्थान:** नई दिल्ली (1954), मुंबई (1996), बेंगलुरु (2009)

**प्रमुख कलाकार:**
• राजा रवि वर्मा — पौराणिक चित्रकारी
• अवनींद्रनाथ टैगोर — "भारत माता" चित्र
• अमृता शेर-गिल — आधुनिक भारतीय कला की अग्रदूत
• एम.एफ. हुसैन, नंदलाल बोस, जामिनी रॉय, एस.एच. राजा

14,000+ कलाकृतियों का संग्रह। मंगलवार-रविवार, सुबह 10-शाम 5 बजे।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – NGMA", url: "https://museumsofindia.gov.in" },
      { title: "NGMA Official", url: "https://ngmaindia.gov.in" },
    ],
    followUps: ["Tell me about Indian paintings", "Tell me about Indian paintings", "Tell me about museums in India"],
  },
  {
    keywords: ["dancing girl", "mohenjo daro artifact", "pashupati seal", "museum artifact", "famous artifact", "national museum artifact", "bronze statue"],
    text: `**Iconic Artifacts in Indian Museums:**

**1. Dancing Girl (Bronze, c. 2500 BCE):**
• Found at **Mohenjo-daro** (Indus Valley Civilization)
• Located at **National Museum, New Delhi**
• A 10.5 cm bronze statuette of a young girl in a confident, hand-on-hip pose
• Wearing bangles on her left arm — one of the earliest known examples of lost-wax casting technique
• Described by archaeologist **Mortimer Wheeler** as "a girl perfectly confident of herself and the world"

**2. Pashupati Seal (Steatite, c. 2600–1900 BCE):**
• Found at **Mohenjo-daro**
• Located at **National Museum, New Delhi**
• Depicts a seated figure in a yogic posture surrounded by animals
• Often identified as **Proto-Shiva** (Pashupati — Lord of Animals)
• One of the most significant seals of the Indus Valley Civilization

**3. Sacred Relics of Buddha (5th–4th century BCE):**
• Discovered at **Piprahwa** stupa
• Housed at **National Museum, New Delhi**
• Crystal casket containing bone relics attributed to the Buddha
• Inscription in Brahmi script confirms association with the Shakya clan

**4. Didarganj Yakshi (3rd century BCE):**
• Found at Didarganj, Patna (Bihar)
• Polished Mauryan sandstone, one of the finest examples of Mauryan art
• Originally at Patna Museum

**5. Lion Capital of Ashoka (3rd century BCE):**
• Found at Sarnath — India's **National Emblem**
• Four Asiatic lions on a circular abacus with Ashoka Chakra
• Located at Sarnath Museum

These artifacts are available in high-resolution on **museumsofindia.gov.in** with 3D viewing options.`,
    textHi: `**भारतीय संग्रहालयों की प्रतिष्ठित कलाकृतियाँ:**

**1. नर्तकी (कांस्य, ~2500 ईसा पूर्व):**
• मोहनजोदड़ो से प्राप्त, राष्ट्रीय संग्रहालय, नई दिल्ली में
• लॉस्ट-वैक्स तकनीक का सबसे प्रारंभिक उदाहरण

**2. पशुपति मुहर (~2600 ईसा पूर्व):**
• योग मुद्रा में बैठी आकृति, जानवरों से घिरी — प्रोटो-शिव

**3. बुद्ध के पवित्र अवशेष:**
• पिपरहवा स्तूप से खोजे गए, ब्राह्मी लिपि अभिलेख

**4. दीदारगंज यक्षी (तीसरी शताब्दी ईसा पूर्व):**
• मौर्य कला का सर्वश्रेष्ठ उदाहरण

**5. अशोक का सिंह स्तंभशीर्ष:**
• सारनाथ से प्राप्त — भारत का **राष्ट्रीय प्रतीक**`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Museums of India – 3D Gallery", url: "https://museumsofindia.gov.in" },
      { title: "National Museum – Collections", url: "https://nationalmuseumindia.gov.in" },
    ],
    followUps: ["Tell me about Indus Valley Civilization", "Tell me about museums in India", "Tell me about museums in India"],
  },
  {
    keywords: ["jatan", "virtual museum", "digital museum", "museum portal", "museum technology", "cdac", "c-dac"],
    text: `**JATAN — Virtual Museum Builder Software:**

**JATAN** is a digital collection management and virtual museum creation software developed by **C-DAC Pune** (Centre for Development of Advanced Computing) for the Ministry of Culture.

**Key Features:**
• Powers the **Museums of India Portal** (museumsofindia.gov.in)
• Enables 10 national museums to digitize and publish their collections online
• Supports **high-resolution zoomable images**, **3D anaglyph views**, and **360° panoramic galleries**
• Cross-museum search with automatic keyword suggestions
• Parameter-based filtering (by object type, material, artist, museum, period)
• Automatic timeline mapping of objects
• Mobile app available for on-the-go access

**Museums Using JATAN:**
1. National Museum, New Delhi
2. Indian Museum, Kolkata
3. Victoria Memorial Hall, Kolkata
4. Salar Jung Museum, Hyderabad
5. NGMA New Delhi, Mumbai, Bengaluru
6. Allahabad Museum, Prayagraj
7. ASI Museum, Goa
8. ASI Museum, Nagarjunakonda

**Digital Collections Available:**
• **Sculptures** — Stone, bronze, terracotta, stucco, wood
• **Paintings** — Miniatures, Thanjavur, Warli, oil paintings, modern art
• **Manuscripts** — Persian, Sanskrit, illuminated
• **Arms & Weapons, Coins, Pottery, Textiles, Decorative Arts**

**Awards:** Won the **Grand Jury Manthan Special Mentions Award** in e-Culture and Heritage Category (2015).

The portal was launched on **21 October 2014** and is a key component of India's digital heritage infrastructure.`,
    textHi: `**JATAN — वर्चुअल संग्रहालय बिल्डर:**

C-DAC पुणे द्वारा विकसित डिजिटल संग्रह प्रबंधन सॉफ्टवेयर। Museums of India पोर्टल को संचालित करता है।

**विशेषताएँ:** उच्च-रिज़ॉल्यूशन छवियाँ, 3D एनाग्लिफ़ दृश्य, 360° पैनोरमिक गैलरी, क्रॉस-म्यूज़ियम सर्च

**10 राष्ट्रीय संग्रहालय** इस प्लेटफ़ॉर्म का उपयोग करते हैं।

21 अक्टूबर 2014 को लॉन्च किया गया। मंथन अवार्ड (2015) विजेता।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "Museums of India Portal", url: "https://museumsofindia.gov.in" },
      { title: "C-DAC – JATAN", url: "https://cdac.in" },
    ],
    followUps: ["Tell me about museums in India", "Tell me about museums in India", "Tell me about Indian Culture Portal"],
  },

  // ============ INDIAN CULTURE PORTAL (indianculture.gov.in) ============
  {
    keywords: ["rare book", "rare books", "digitized book", "old book", "historical book", "manuscript", "manuscripts", "palm leaf", "birch bark"],
    text: `**Rare Books & Manuscripts on Indian Culture Portal:**

The **indianculture.gov.in** portal hosts one of India's largest digital repositories of rare books and manuscripts, aggregated from libraries, museums, and archives across the country.

**Rare Books Collection:**
• Digitized rare books spanning the **16th to 19th centuries**
• Topics: history, religion, philosophy, science, arts, literature, law, governance
• Available in multiple languages: Sanskrit, Hindi, Bengali, Tamil, Telugu, Urdu, Persian, English
• Includes colonial-era publications, princely state documents, and early Indian press works
• Searchable PDFs and high-resolution page images

**Manuscripts Collection:**
• **Palm leaf manuscripts** — From Odisha, Kerala, and South India; written on dried palm leaves with iron stylus
• **Birch bark manuscripts** — From Kashmir and North India; ancient Sanskrit texts on birch bark (bhojpatra)
• **Paper manuscripts** — Mughal-era, Persian, and Sanskrit manuscripts on handmade paper
• Languages: Sanskrit, Pali, Prakrit, Persian, Arabic, Tamil, Kannada, Malayalam, Telugu, Odia

**Key Manuscript Highlights:**
• **Vedic manuscripts** — Rigveda, Yajurveda, Samaveda, Atharvaveda hymns
• **Ayurvedic texts** — Charaka Samhita, Sushruta Samhita
• **Astronomical treatises** — Aryabhatiya, Surya Siddhanta
• **Mathematical texts** — Lilavati by Bhaskaracharya
• **Poetic works** — Kalidasa's Meghadutam, Abhijnanashakuntalam

**Partner:** National Mission for Manuscripts (NMM) — Catalogued 5+ million manuscripts from across India.`,
    textHi: `**भारतीय संस्कृति पोर्टल पर दुर्लभ पुस्तकें और पांडुलिपियाँ:**

**दुर्लभ पुस्तकें:** 16वीं-19वीं शताब्दी, इतिहास, धर्म, दर्शन, विज्ञान, कला विषयों पर

**पांडुलिपि संग्रह:**
• **ताड़ पत्र पांडुलिपियाँ** — ओडिशा, केरल से
• **भोजपत्र पांडुलिपियाँ** — कश्मीर, उत्तर भारत से
• **कागज़ पांडुलिपियाँ** — मुगल काल, फ़ारसी, संस्कृत

**प्रमुख:** वैदिक पांडुलिपियाँ, आयुर्वेदिक ग्रंथ, खगोलीय संधियाँ, गणितीय ग्रंथ

**भागीदार:** राष्ट्रीय पांडुलिपि मिशन (NMM) — 50 लाख+ पांडुलिपियों की सूची`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in" },
      { title: "Indian Culture Portal – Rare Books", url: "https://indianculture.gov.in" },
      { title: "National Mission for Manuscripts", url: "https://namami.gov.in" },
    ],
    followUps: ["Tell me about the Vedas", "Tell me about Indian Culture Portal", "Tell me about Indian Culture Portal"],
  },
  {
    keywords: ["inscription", "inscriptions", "epigraphy", "epigraphic", "ashoka edict", "copper plate", "brahmi", "rock edict", "pillar inscription"],
    text: `**Inscriptions & Epigraphy on Indian Culture Portal:**

The portal hosts digitized inscriptions from the ASI Epigraphy Branch, covering thousands of years of Indian history.

**Types of Inscriptions:**
• **Rock Edicts** — Carved on natural rock surfaces (e.g., Ashoka's edicts)
• **Pillar Inscriptions** — On stone pillars (e.g., Ashoka's pillar edicts at Lauriya, Allahabad)
• **Copper Plate Grants** — Land grants by kings, recording donations to temples and Brahmins
• **Stone Inscriptions** — On temple walls, fort gates, wells, and other structures
• **Cave Inscriptions** — Inside Buddhist and Jain caves (Ajanta, Ellora, Udayagiri)

**Key Highlights:**
• **Ashoka's Rock Edicts (3rd century BCE)** — 14 major and several minor rock edicts promoting Dhamma, non-violence, and welfare. Found at Shahbazgarhi, Girnar, Dhauli, Erragudi, and more.
• **Ashoka's Pillar Edicts** — Delhi-Topra pillar, Allahabad pillar (Prayagraj)
• **Hathigumpha Inscription** — King Kharavela of Kalinga (2nd century BCE), Udayagiri caves
• **Aihole Inscription** — Pulakeshin II's victory record (634 CE)
• **Chola Inscriptions** — Thousands of Tamil inscriptions across South India recording temple administration
• **Allahabad Pillar Inscription** — Samudragupta's military conquests (Gupta period)

**Scripts Documented:**
Brahmi, Kharosthi, Devanagari, Tamil-Brahmi, Grantha, Telugu-Kannada, Nagari, Arabic, Persian

**ASI Epigraphy Branches:**
• **Mysore** — South Indian inscriptions (Dravidian languages)
• **Nagpur** — Sanskrit and Arabic-Persian inscriptions

Published in *Epigraphia Indica*, *South Indian Inscriptions* series, and *Corpus Inscriptionum Indicarum*.`,
    textHi: `**भारतीय संस्कृति पोर्टल पर अभिलेख और पुरालेख:**

**अभिलेख के प्रकार:** शिलालेख, स्तंभ लेख, ताम्रपत्र, गुहा लेख

**प्रमुख अभिलेख:**
• **अशोक के शिलालेख** (तीसरी शताब्दी ईसा पूर्व) — धम्म, अहिंसा, कल्याण
• **हाथीगुम्फा अभिलेख** — कलिंग के राजा खारवेल
• **ऐहोल अभिलेख** — पुलकेशिन II
• **चोल अभिलेख** — दक्षिण भारत में हज़ारों तमिल अभिलेख
• **इलाहाबाद स्तंभ लेख** — समुद्रगुप्त

**लिपियाँ:** ब्राह्मी, खरोष्ठी, देवनागरी, तमिल-ब्राह्मी, ग्रंथ, तेलुगु-कन्नड़, अरबी, फ़ारसी`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture Portal – Inscriptions", url: "https://indianculture.gov.in" },
      { title: "ASI – Epigraphy Branch", url: "https://asi.nic.in" },
    ],
    followUps: ["Tell me about Ashoka", "Tell me about Sanchi Stupa", "Tell me about the Chola dynasty"],
  },
  {
    keywords: ["gazetteer", "gazetteers", "imperial gazetteer", "district gazetteer", "indian gazetteer"],
    text: `**Indian Gazetteers on Indian Culture Portal:**

The portal hosts digitized gazetteers — comprehensive reference works containing geographical, historical, economic, and cultural data for every district of India.

**Imperial Gazetteers of India (British Era):**
• Originally compiled by **W.W. Hunter** (1881), later updated by the British government
• 26 volumes covering every province, district, and princely state
• Contains population data, land revenue, administrative structure, historical events, natural resources
• Invaluable resource for colonial-era Indian history research

**Post-Independence State Gazetteers:**
• Published by individual state governments after 1947
• Updated district gazetteers with post-independence data
• Cover demographics, industries, education, cultural life, infrastructure

**What Gazetteers Contain:**
• **Geography** — Rivers, mountains, climate, soil, flora & fauna
• **History** — Ancient, medieval, and modern history of each district
• **Administration** — Revenue divisions, tehsils, municipal bodies
• **Economy** — Agriculture, industries, trade, markets
• **Culture** — Festivals, temples, languages, castes, social customs
• **Infrastructure** — Roads, railways, post offices, hospitals

**Research Value:**
Gazetteers are primary sources for historians, geographers, and policy researchers. They provide the most detailed local-level documentation available for Indian districts, especially for the 19th and early 20th centuries.

All digitized gazetteers are freely searchable on indianculture.gov.in.`,
    textHi: `**भारतीय संस्कृति पोर्टल पर गज़ेटियर:**

**इम्पीरियल गज़ेटियर ऑफ इंडिया:** W.W. हंटर (1881) द्वारा संकलित, 26 खंड, हर प्रांत और ज़िले का विवरण

**स्वतंत्रता के बाद:** राज्य सरकारों द्वारा अपडेटेड ज़िला गज़ेटियर

**विषय:** भूगोल, इतिहास, प्रशासन, अर्थव्यवस्था, संस्कृति, बुनियादी ढाँचा

इतिहासकारों, भूगोलवेत्ताओं और नीति शोधकर्ताओं के लिए प्राथमिक स्रोत। indianculture.gov.in पर निःशुल्क उपलब्ध।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "Indian Culture Portal – Gazetteers", url: "https://indianculture.gov.in" },
    ],
    followUps: ["What is Indian Culture Portal?", "Tell me about Indian Culture Portal", "Tell me about National Archives"],
  },
  {
    keywords: ["freedom movement", "freedom struggle", "independence movement", "quit india", "dandi march", "civil disobedience", "freedom fighter", "indian independence"],
    text: `**Freedom Movement Collection on Indian Culture Portal:**

The portal hosts a rich collection of documents, photographs, and narratives related to India's independence struggle (1857–1947).

**Key Collections:**
• **Photographs** — Historical images of leaders, protests, mass movements, Congress sessions
• **Documents** — Letters, speeches, pamphlets, newspaper clippings from the freedom era
• **Personal Papers** — Manuscripts and correspondence of freedom fighters
• **Government Records** — British administrative files on nationalist movements (from National Archives)

**Major Events Documented:**
• **Revolt of 1857** — First War of Independence, Rani Lakshmibai, Mangal Pandey
• **Swadeshi Movement (1905)** — Boycott of British goods, Bengal partition protests
• **Jallianwala Bagh Massacre (1919)** — General Dyer's attack on unarmed civilians in Amritsar
• **Non-Cooperation Movement (1920–22)** — Gandhi's first mass civil disobedience
• **Dandi March / Salt Satyagraha (1930)** — Gandhi's 240-mile march to make salt
• **Quit India Movement (1942)** — "Do or Die" call by Gandhi, mass arrests
• **Indian National Army (INA)** — Subhas Chandra Bose's armed resistance
• **Transfer of Power (1947)** — Mountbatten Plan, Partition, Independence

**Freedom Fighters Featured:**
Mahatma Gandhi, Jawaharlal Nehru, Sardar Patel, Subhas Chandra Bose, Bhagat Singh, Rani Lakshmibai, Bal Gangadhar Tilak, Lala Lajpat Rai, Sarojini Naidu, Maulana Azad

Available across indianculture.gov.in and nationalarchives.nic.in`,
    textHi: `**भारतीय स्वतंत्रता आंदोलन संग्रह:**

**प्रमुख घटनाएँ:** 1857 का विद्रोह, स्वदेशी आंदोलन, जलियाँवाला बाग, असहयोग आंदोलन, दांडी मार्च, भारत छोड़ो आंदोलन, INA

**स्वतंत्रता सेनानी:** महात्मा गांधी, नेहरू, सरदार पटेल, सुभाष चंद्र बोस, भगत सिंह, रानी लक्ष्मीबाई, तिलक

indianculture.gov.in और nationalarchives.nic.in पर तस्वीरें, दस्तावेज़, पत्र उपलब्ध`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "Indian Culture Portal – Freedom Movement", url: "https://indianculture.gov.in" },
      { title: "National Archives – Freedom Struggle Records", url: "https://nationalarchives.nic.in" },
    ],
    followUps: ["Tell me about Mahatma Gandhi", "What is Abhilekh Patal?", "Tell me about Mahatma Gandhi"],
  },
  {
    keywords: ["indian knowledge", "knowledge system", "ancient science", "ancient india science", "aryabhata", "charaka", "sushruta", "lilavati", "ancient math", "ancient medicine"],
    text: `**Indian Knowledge Systems on Indian Culture Portal:**

The portal showcases India's contributions to science, mathematics, medicine, and philosophy through its digitized manuscripts and publications.

**Mathematics:**
• **Aryabhata (476 CE)** — Aryabhatiya: value of pi (3.1416), Earth's rotation, algebraic equations
• **Brahmagupta (598 CE)** — First to use zero as a number, negative numbers, Brahmasphutasiddhanta
• **Bhaskara II (1114 CE)** — Lilavati (arithmetic), Bijaganita (algebra), calculus concepts predating Newton
• **Madhava of Sangamagrama (14th century)** — Kerala School: infinite series for pi and trigonometric functions

**Medicine (Ayurveda):**
• **Charaka Samhita** — Foundational text of internal medicine (compiled ~300 BCE–200 CE)
• **Sushruta Samhita** — World's earliest surgical text; describes 300+ surgical procedures, 120+ surgical instruments, rhinoplasty (nose reconstruction)
• **Ashtanga Hridayam** — Vagbhata's comprehensive medical treatise

**Astronomy:**
• **Surya Siddhanta** — Ancient astronomical text, calculated Earth's diameter, planetary positions
• **Aryabhatiya** — Heliocentric hints, eclipses explained by shadow of Earth/Moon
• **Jantar Mantar observatories** (Jaipur, Delhi) — Jai Singh II's 18th-century astronomical instruments

**Philosophy & Logic:**
• **Nyaya Sutras** — Formal logic and epistemology
• **Vaisheshika** — Atomic theory (Kanada, 6th century BCE)
• **Yoga Sutras of Patanjali** — Systematic framework for meditation and consciousness

All documented through manuscripts, rare books, and scholarly articles on indianculture.gov.in.`,
    textHi: `**भारतीय ज्ञान प्रणालियाँ:**

**गणित:** आर्यभट (pi का मान, पृथ्वी का घूर्णन), ब्रह्मगुप्त (शून्य का आविष्कार), भास्कर II (लीलावती, बीजगणित)

**चिकित्सा:** चरक संहिता (आंतरिक चिकित्सा), सुश्रुत संहिता (विश्व का प्रथम शल्य चिकित्सा ग्रंथ — 300+ शल्य प्रक्रियाएँ)

**खगोल विज्ञान:** सूर्य सिद्धांत, आर्यभटीय, जंतर मंतर वेधशालाएँ

**दर्शन:** न्याय सूत्र (तर्कशास्त्र), वैशेषिक (परमाणु सिद्धांत), पतंजलि योग सूत्र

indianculture.gov.in पर पांडुलिपियों और दुर्लभ पुस्तकों में उपलब्ध`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture Portal – Knowledge Systems", url: "https://indianculture.gov.in" },
      { title: "Indian Culture Portal – Manuscripts", url: "https://indianculture.gov.in" },
    ],
    followUps: ["Tell me about Vedas", "What is Ayurveda?", "Ancient Indian mathematics"],
  },
  {
    keywords: ["intangible heritage", "intangible cultural heritage", "ich", "living heritage", "oral tradition", "folk tradition"],
    text: `**Intangible Cultural Heritage (ICH) of India:**

India has a rich repository of intangible cultural heritage recognized by UNESCO and documented on the Indian Culture Portal.

**UNESCO-Recognized ICH of India:**
• **Yoga** (2016) — Ancient physical, mental, and spiritual practice
• **Kumbh Mela** (2017) — World's largest peaceful gathering, held every 12 years at 4 sacred river sites
• **Ramlila** (2008) — Traditional performance of the Ramayana epic
• **Ramman** (2009) — Religious festival and ritual theatre of Garhwal Himalayas
• **Mudiyettu** (2010) — Ritual theatre of Kerala
• **Kalbelia** (2010) — Folk songs and dances of Rajasthan
• **Chhau Dance** (2010) — Martial dance form of eastern India (Seraikella, Purulia, Mayurbhanj)
• **Buddhist Chanting of Ladakh** (2012)
• **Sankirtana** (2013) — Ritual singing, drumming, and dancing of Manipur
• **Nawrouz** (2016) — Persian New Year celebration
• **Durga Puja** (2021) — Grand festival of Kolkata
• **Garba** (2023) — Traditional dance of Gujarat
• **Sowa-Rigpa** (2024) — Traditional Tibetan/Himalayan medical system

**Other Living Heritage Traditions:**
• **Warli painting** — Tribal art of Maharashtra
• **Madhubani painting** — Folk art of Bihar/Mithila
• **Pattachitra** — Scroll painting of Odisha
• **Theyyam** — Ritual dance of Kerala
• **Yakshagana** — Traditional theatre of Karnataka
• **Bihu** — Dance and music of Assam

Documented through audio, video, and photography on indianculture.gov.in.`,
    textHi: `**भारत की अमूर्त सांस्कृतिक विरासत (ICH):**

**यूनेस्को मान्यता प्राप्त:**
• योग (2016), कुंभ मेला (2017), रामलीला (2008), छऊ नृत्य (2010), कालबेलिया (2010), दुर्गा पूजा (2021), गरबा (2023)

**अन्य जीवित परंपराएँ:** वारली चित्रकारी, मधुबनी, पट्टचित्र, थेय्यम, यक्षगान, बिहू

indianculture.gov.in पर ऑडियो, वीडियो और फ़ोटो में प्रलेखित`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Mera Gaon Meri Dharohar (MGMD)", url: "https://mgmd.gov.in" },
      { title: "Indian Culture Portal – ICH", url: "https://indianculture.gov.in" },
      { title: "UNESCO – India ICH", url: "https://ich.unesco.org" },
    ],
    followUps: ["Tell me about Indian festivals", "Tell me about classical dance forms", "UNESCO World Heritage Sites in India"],
  },

  // ============ NATIONAL ARCHIVES (nationalarchives.nic.in) ============
  {
    keywords: ["national archives detail", "archives history", "nai", "national archives india", "janpath", "archive collection", "public records", "imperial record"],
    text: `**National Archives of India (NAI) — Detailed Overview:**

**Establishment & History:**
• Founded in **1891** as the **Imperial Record Department** under the British government
• Renamed **National Archives of India** after independence in 1947
• Located at **Janpath, New Delhi** — a heritage building in Lutyens' Delhi

**Holdings (one of Asia's largest archival repositories):**
• **17+ crore pages** of public records
• Records from **1748 onwards** (pre-Mutiny East India Company era to present)
• **Private papers** of prominent leaders and public figures
• **Oriental records** — Mughal farmans, akhbarat, Persian/Urdu documents
• **Cartographic records** — Historical maps, town plans, boundary maps, architectural drawings
• **Microfilm collection** — Records from UK, France, Portugal, Netherlands archives relating to India
• **Photographs** — Historical images of monuments, events, and personalities

**Record Groups:**
1. **Pre-Mutiny Records (before 1857)** — East India Company administration
2. **Post-Mutiny Records (after 1860)** — British India government departments
3. **Home, Foreign, Defence, Finance Department** files
4. **Princely States Records** — Documents from former Indian kingdoms
5. **Freedom Movement Records** — Documents related to the independence struggle

**Governing Law:** Public Records Act, 1993 & Public Records Rules, 1997
**Research Room:** Monday–Friday, 9:00 AM – 5:30 PM (Reader's ticket required)

**Regional Offices:** Bhopal, Jaipur, Puducherry (French-era records)`,
    textHi: `**भारतीय राष्ट्रीय अभिलेखागार (NAI):**

• **स्थापना:** 1891 (इम्पीरियल रिकॉर्ड डिपार्टमेंट), 1947 में पुनर्नामित
• **स्थान:** जनपथ, नई दिल्ली
• **संग्रह:** 17+ करोड़ पृष्ठ, 1748 से वर्तमान तक
• **रिकॉर्ड:** सार्वजनिक रिकॉर्ड, निजी पत्र, मुगल फ़रमान, मानचित्र, माइक्रोफ़िल्म

**शासी कानून:** लोक अभिलेख अधिनियम, 1993
**शोध कक्ष:** सोमवार-शुक्रवार, सुबह 9 - शाम 5:30

**क्षेत्रीय कार्यालय:** भोपाल, जयपुर, पुदुचेरी`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "National Archives of India", url: "https://nationalarchives.nic.in" },
      { title: "Abhilekh Patal", url: "https://abhilekhpatal.in" },
    ],
    followUps: ["What is Abhilekh Patal?", "Tell me about National Archives", "Tell me about National Archives"],
  },
  {
    keywords: ["public records act", "records act", "records law", "archival law", "record management"],
    text: `**Public Records Act, 1993 & Public Records Rules, 1997:**

This legislation governs the management, administration, and preservation of public records across all central government offices in India.

**Key Provisions:**
• **Definition:** Public records include any documents, manuscripts, files, microfilms, or machine-readable records created by a government body
• **NAI as Nodal Agency:** The National Archives of India is the nodal body for record management across all central ministries and departments
• **Mandatory Transfer:** Government departments must transfer non-current records (25+ years old) to NAI for permanent preservation
• **Appraisal:** NAI conducts periodic appraisal to determine which records have permanent historical value
• **Destruction:** No government record can be destroyed without NAI's approval
• **Access:** Records over 30 years old are generally available for public research (with some exceptions for classified/sensitive documents)

**Records Officer:**
Every government department must appoint a **Records Officer** responsible for:
• Maintaining record rooms and filing systems
• Conducting periodic review and weeding of non-essential records
• Facilitating transfer of permanent records to NAI
• Ensuring compliance with the Act

**Penalties:**
Unauthorized destruction, removal, or tampering with public records is punishable under the Act.

**NAI Services for Government Departments:**
• Training courses in records management
• Inspection of departmental record rooms
• Technical guidance on preservation and digitization
• Annual report compilation on record management compliance`,
    textHi: `**लोक अभिलेख अधिनियम, 1993:**

केंद्र सरकार के सभी कार्यालयों में सार्वजनिक अभिलेखों के प्रबंधन और संरक्षण का कानून।

**मुख्य प्रावधान:**
• NAI नोडल एजेंसी है
• 25+ वर्ष पुराने रिकॉर्ड NAI को स्थानांतरित करने अनिवार्य
• NAI की मंजूरी के बिना कोई रिकॉर्ड नष्ट नहीं किया जा सकता
• 30+ वर्ष पुराने रिकॉर्ड सार्वजनिक शोध के लिए उपलब्ध

हर विभाग में **अभिलेख अधिकारी** की नियुक्ति अनिवार्य।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "National Archives – Public Records Act", url: "https://nationalarchives.nic.in" },
      { title: "Ministry of Culture – NAI", url: "https://culture.gov.in" },
    ],
    followUps: ["National Archives collections", "Tell me about National Archives", "What is Abhilekh Patal?"],
  },
  {
    keywords: ["mughal farman", "farman", "akhbarat", "oriental record", "persian record", "mughal document", "mughal record"],
    text: `**Oriental Records at the National Archives of India:**

The NAI holds a priceless collection of **Mughal-era and pre-colonial documents** in Persian, Urdu, and Arabic.

**Farmans (Royal Decrees):**
• Official orders issued by Mughal emperors
• Land grants (jagirs), trade permissions, appointments, administrative directives
• Feature imperial seals (tughra), calligraphy, and sometimes gilded decoration
• Collection spans from **Babur to Bahadur Shah Zafar** (16th–19th century)

**Akhbarat (Newsletters):**
• Intelligence reports and news dispatches sent by local officials to the Mughal court
• Provide detailed accounts of daily life, court proceedings, military campaigns, local events
• One of the most valuable primary sources for Mughal social and political history
• Cover regions across the Mughal Empire — Delhi, Agra, Deccan, Bengal, Rajputana

**Other Oriental Records:**
• **Nishans** — Orders by Mughal princes
• **Hasb-ul-Hukm** — Administrative orders by governors
• **Parwanas** — Orders by lesser officials
• **Sanads** — Documents confirming rights, privileges, or appointments
• **Waqf documents** — Endowments for mosques, madrasas, and charitable institutions
• **Revenue records** — Land tax assessments, village-level records in Persian

**Research Value:**
These documents are primary sources for studying Mughal administration, economy, social life, art, and culture. Many have been calendared and catalogued by NAI scholars.

Digitized documents available on **Abhilekh Patal** (abhilekhpatal.in).`,
    textHi: `**राष्ट्रीय अभिलेखागार में प्राच्य अभिलेख:**

**फ़रमान (शाही आदेश):** मुगल सम्राटों द्वारा जारी, भूमि अनुदान, व्यापार अनुमति, नियुक्तियाँ। बाबर से बहादुर शाह ज़फ़र तक।

**अख़बारात (समाचार पत्र):** स्थानीय अधिकारियों से मुगल दरबार को भेजी गई ख़ुफ़िया रिपोर्ट।

**अन्य:** निशान, हस्ब-उल-हुक्म, परवाने, सनद, वक़्फ़ दस्तावेज़, राजस्व रिकॉर्ड

अभिलेख पटल (abhilekhpatal.in) पर डिजिटल रूप में उपलब्ध।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "National Archives – Oriental Records", url: "https://nationalarchives.nic.in" },
      { title: "Abhilekh Patal", url: "https://abhilekhpatal.in" },
    ],
    followUps: ["Tell me about the Mughal Empire", "What is Abhilekh Patal?", "National Archives collections"],
  },
  {
    keywords: ["cartographic", "historical map", "old map", "map collection", "survey map", "boundary map", "archive map"],
    text: `**Cartographic Records at the National Archives of India:**

The NAI houses an extensive collection of historical maps, plans, and atlases spanning the colonial and post-colonial periods.

**Collection Highlights:**
• **Town Plans** — Detailed layouts of cities like Delhi, Calcutta, Bombay, Madras, Lucknow from the 18th–19th centuries
• **Architectural Drawings** — Plans of government buildings, palaces, forts, cantonments
• **Boundary Maps** — Provincial boundaries, princely state borders, international frontiers
• **Survey of India Maps** — Topographical surveys, revenue maps, trigonometrical survey sheets
• **Railway Maps** — Route plans of India's railway network development
• **Military Maps** — Campaign maps, garrison locations, strategic positions
• **Revenue Maps** — Village-level land records, settlement maps

**Historical Significance:**
• Maps showing the evolution of Indian cities over 200+ years
• Pre-Partition maps showing undivided India, Burma, and Ceylon
• Maps documenting the Great Trigonometrical Survey of India (1802–1871)
• Architectural plans of iconic buildings — Rashtrapati Bhavan, Parliament House, India Gate

**Access:**
• Available for research at NAI's map room
• Select maps being digitized and uploaded to Abhilekh Patal
• High-resolution scans available on request (reprographic services)

These maps are invaluable primary sources for urban history, military history, and understanding India's geographical and administrative evolution.`,
    textHi: `**राष्ट्रीय अभिलेखागार में मानचित्र संग्रह:**

**संग्रह:** शहर योजनाएँ, वास्तुकला चित्र, सीमा मानचित्र, सर्वेक्षण मानचित्र, रेलवे मानचित्र, सैन्य मानचित्र, राजस्व मानचित्र

**ऐतिहासिक महत्व:**
• 200+ वर्षों में भारतीय शहरों का विकास
• विभाजन पूर्व अविभाजित भारत के मानचित्र
• राष्ट्रपति भवन, संसद भवन की वास्तुकला योजनाएँ

अभिलेख पटल पर कुछ मानचित्र डिजिटल रूप में उपलब्ध।`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "National Archives – Cartographic Records", url: "https://nationalarchives.nic.in" },
      { title: "Abhilekh Patal", url: "https://abhilekhpatal.in" },
    ],
    followUps: ["National Archives overview", "What is Abhilekh Patal?", "Tell me about ASI"],
  },
  {
    keywords: ["archive conservation", "document preservation", "lamination", "deacidification", "fumigation", "archival conservation"],
    text: `**Conservation & Preservation at the National Archives of India:**

NAI operates an in-house **Conservation Laboratory** for the repair, restoration, and preservation of historical documents.

**Conservation Techniques:**
• **Lamination** — Strengthening fragile documents with tissue paper and adhesive
• **De-acidification** — Neutralizing acid in old paper to prevent further deterioration
• **Fumigation** — Pest control using fumigation chambers to protect against insects and fungi
• **Leaf Casting** — Filling holes and tears in manuscripts using pulp
• **Encapsulation** — Sealing fragile documents between polyester sheets for protection
• **Binding & Rebinding** — Repairing damaged book bindings

**Digitization Program:**
• Over **2 crore (20 million+) pages** digitized and made available on Abhilekh Patal
• High-resolution scanning of maps, documents, photographs
• OCR (Optical Character Recognition) applied to select English-language documents
• Ongoing digitization continues to expand the online collection

**Preservation Infrastructure:**
• Climate-controlled storage vaults (temperature and humidity monitored)
• Fire suppression systems
• Acid-free boxes and folders for document storage
• Microfilming as backup preservation method

**Training:**
NAI conducts the **Short-Term Certificate Course in Archives and Records Management** for government officials, librarians, and archivists — covering preservation, cataloguing, and digitization techniques.`,
    textHi: `**राष्ट्रीय अभिलेखागार में संरक्षण:**

**तकनीकें:** लैमिनेशन, डी-एसिडिफिकेशन, फ्यूमिगेशन, लीफ कास्टिंग, एनकैप्सुलेशन, बाइंडिंग

**डिजिटलीकरण:** 2 करोड़+ (20 मिलियन+) पृष्ठ डिजिटल, अभिलेख पटल पर उपलब्ध

**संरक्षण बुनियादी ढाँचा:** जलवायु-नियंत्रित भंडारण, अग्नि शमन प्रणाली, एसिड-मुक्त भंडारण

**प्रशिक्षण:** अभिलेख और रिकॉर्ड प्रबंधन में अल्पकालिक प्रमाणपत्र पाठ्यक्रम`,
    textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
    textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
    confidence: "High",
    sources: [
      { title: "Abhilekh Patal — National Archives", url: "https://abhilekh-patal.in" },
      { title: "National Archives – Conservation", url: "https://nationalarchives.nic.in" },
      { title: "Abhilekh Patal", url: "https://abhilekhpatal.in" },
    ],
    followUps: ["What is Abhilekh Patal?", "Tell me about National Archives", "National Archives collections"],
  },

  // ============ CULTURE OF CITIES — CAPITALS & METROS ============
  {
    keywords: ["delhi", "new delhi", "delhi culture", "delhi heritage", "capital city", "shahjahanabad", "lutyens"],
    text: `**Delhi — Cultural Capital of India**

Delhi, India's capital territory, is a living museum of over 1,000 years of history. It has served as the seat of power for the Delhi Sultanate, the Mughal Empire, and modern India.

**Key Heritage Sites (ASI-Protected):**
• **Red Fort (Lal Qila)** — UNESCO World Heritage Site (2007), Mughal emperor Shah Jahan's palace complex built 1639–1648. Diwan-i-Aam, Diwan-i-Khas (where the Peacock Throne once stood), Rang Mahal, and Nahr-i-Behisht (Stream of Paradise). PM hoists the tricolour here every Independence Day
• **Qutub Minar** — UNESCO site (1993), 72.5m victory tower (tallest brick minaret in the world) built by Qutb-ud-din Aibak in 1193. The Qutub Complex includes the Iron Pillar (1,600 years, rust-free), Alai Darwaza, Alai Minar (incomplete), and Quwwat-ul-Islam Mosque (first mosque in India after Islamic conquest)
• **Humayun's Tomb** — UNESCO site (1993), precursor to the Taj Mahal, first garden-tomb on the Indian subcontinent (1570). Char Bagh (four-fold garden), 150+ Mughal-era tombs in the complex including Isa Khan's Tomb
• **Purana Qila (Old Fort)** — One of Delhi's oldest forts, site believed to be the legendary Indraprastha of Mahabharata. Excavations reveal Painted Grey Ware (1000 BCE). Sher Mandal (Humayun's library tower where he fell and died) and Qila-i-Kuhna Mosque inside
• **Jantar Mantar** — Astronomical observatory built by Maharaja Jai Singh II in 1724. Misra Yantra (hybrid instrument) unique to Delhi
• **Safdarjung's Tomb** — Last Mughal garden tomb in Delhi (1754), marking the end of the Mughal architectural tradition
• **India Gate** — 42m war memorial (1931) designed by Lutyens, commemorating 82,000 soldiers who died in WWI. Eternal flame (Amar Jawan Jyoti) and the National War Memorial (2019) nearby
• **Jama Masjid** — India's largest mosque (1656), built by Shah Jahan. 25,000 capacity, 40m-high minarets, courtyard of 100 sq m. Three gates, four towers, two 41m minarets
• **Lotus Temple (Bahai)** — 27-petal lotus-shaped marble temple (1986), winner of numerous architectural awards, open to all faiths. Over 100 million visitors since opening
• **Rashtrapati Bhavan** — Presidential residence designed by Edwin Lutyens (1929), 340-room palace with Mughal Gardens (now Amrit Udyan). Largest residence of any head of state in the world
• **Agrasen ki Baoli** — Ancient stepwell (14th century, possibly older) in central Delhi with 108 steps and three levels. Atmospheric architectural marvel rediscovered in modern times
• **Hauz Khas Complex** — 13th-century reservoir, madrasa, and tomb of Firoz Shah Tughlaq. Now surrounded by a vibrant urban village with art galleries and cafés
• **Tughlaqabad Fort** — Massive 13th-century fort of Ghiyasuddin Tughlaq with 52 gates, largely in ruins but atmospheric. Linked to a legendary curse by Sufi saint Nizamuddin Auliya
• **Nizamuddin Dargah** — Shrine of Sufi saint Hazrat Nizamuddin Auliya (1325). Evening qawwali sessions are legendary. Poet Amir Khusro's tomb is adjacent

**Museums & Institutions:**
• **National Museum** — India's largest museum with 2,00,000+ artefacts spanning 5,000 years. Highlights include Indus Valley artefacts, Mauryan art, Chola bronzes, Mughal miniatures, and the Tanjore paintings gallery
• **National Gallery of Modern Art (NGMA)** — 17,000+ works by masters like Amrita Sher-Gil, Rabindranath Tagore, MF Husain, Jamini Roy, and Raja Ravi Varma. Housed in the former residence of the Maharaja of Jaipur
• **National Archives of India** — 5+ crore pages of public records, Mughal farmans, maps, and private papers dating back to 1748
• **Crafts Museum** — Living crafts village with 33,000+ objects showcasing India's textile, woodwork, metalwork, and tribal art traditions. Artisans demonstrate live crafts
• **IGNCA (Indira Gandhi National Centre for the Arts)** — Premier arts research centre with rare manuscripts, cultural archives, and Kalanidhi (art reference library)
• **National Rail Museum** — 160+ years of Indian railway history with 100+ real-size exhibits including a 1855 steam locomotive and the Fairy Queen (world's oldest working steam engine)
• **National Science Centre** — Interactive science museum on Bhairon Marg
• **Gandhi Smriti** — Museum at Birla House where Mahatma Gandhi spent his last 144 days and was assassinated (Jan 30, 1948). Personal effects, photographs, and multimedia exhibits
• **Nehru Memorial Museum (Teen Murti Bhavan)** — Jawaharlal Nehru's residence, now a museum with his personal library, study, and bedroom preserved as they were
• **Air Force Museum (Palam)** — Vintage aircraft, medals, uniforms, and war memorabilia
• **Shankar's International Dolls Museum** — 6,500+ dolls from 85 countries

**Cultural Life:**
• Shahjahanabad (Old Delhi) — Chandni Chowk, Jama Masjid, spice market, and centuries-old havelis
• Delhi's street food culture: chole bhature, paranthas (Paranthe Wali Gali), chaat, kebabs at Jama Masjid
• Annual events: Republic Day Parade (Jan 26), International Trade Fair, Surajkund Crafts Mela
• Dilli Haat — open-air bazaar for handicrafts from all Indian states
• Lit-fest circuit: host to multiple literary and cultural festivals

**Performing Arts Heritage:**
• Delhi Gharana of Kathak dance (Birju Maharaj lineage)
• Major venues: Kamani Auditorium, Siri Fort, India Habitat Centre, Triveni Kala Sangam`,
    textHi: `**दिल्ली — भारत की सांस्कृतिक राजधानी**

दिल्ली 1,000+ वर्षों के इतिहास का जीवित संग्रहालय है। यह दिल्ली सल्तनत, मुगल साम्राज्य और आधुनिक भारत की सत्ता का केंद्र रहा है।

**प्रमुख विरासत स्थल:** लाल किला (यूनेस्को), कुतुब मीनार (यूनेस्को), हुमायूँ का मकबरा (यूनेस्को), पुराना किला, जंतर मंतर
**संग्रहालय:** राष्ट्रीय संग्रहालय, NGMA, राष्ट्रीय अभिलेखागार, शिल्प संग्रहालय, गांधी स्मृति
**सांस्कृतिक जीवन:** शाहजहानाबाद (पुरानी दिल्ली), चांदनी चौक, दिल्ली हाट, गणतंत्र दिवस परेड`,
    textTe: `**ఢిల్లీ — భారతదేశ సాంస్కృతిక రాజధాని**

ఢిల్లీ 1,000+ సంవత్సరాల చరిత్ర కలిగిన సజీవ మ్యూజియం. ఎర్రకోట, కుతుబ్ మినార్, హుమాయూన్ సమాధి (యునెస్కో ప్రదేశాలు), జాతీయ మ్యూజియం, NGMA, జాతీయ ఆర్కైవ్స్ ఇక్కడ ఉన్నాయి.`,
    textTa: `**டெல்லி — இந்தியாவின் கலாச்சார தலைநகரம்**

டெல்லி 1,000+ ஆண்டுகள் வரலாறு கொண்ட உயிர்ப்புள்ள அருங்காட்சியகம். செங்கோட்டை, குதுப் மினார், ஹுமாயுன் கல்லறை (யுனெஸ்கோ தளங்கள்), தேசிய அருங்காட்சியகம், NGMA, தேசிய ஆவணக்காப்பகம் இங்கே உள்ளன.`,
    confidence: "High",
    sources: [
      { title: "ASI – Delhi Circle Protected Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Delhi Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Delhi Museums", url: "https://museumsofindia.gov.in" },
      { title: "MGMD – Gandhi Smriti & Nehru Memorial", url: "https://mgmd.gov.in" },
      { title: "Abhilekh Patal – Delhi Archives", url: "https://abhilekh-patal.in" },
    ],
    followUps: ["Tell me about Red Fort", "Tell me about Qutub Minar", "List museums in India"],
  },
  {
    keywords: ["mumbai", "bombay", "mumbai culture", "mumbai heritage", "gateway of india", "elephanta"],
    text: `**Mumbai — India's Cultural & Commercial Capital**

Mumbai (formerly Bombay), the capital of Maharashtra, blends colonial-era grandeur with vibrant contemporary culture. It is India's financial hub, the home of Bollywood, and a UNESCO Creative City.

**Key Heritage Sites:**
• **Elephanta Caves** — UNESCO World Heritage Site (1987), 5th–8th century rock-cut temples on Elephanta Island featuring the iconic 6m-high Trimurti (three-headed Shiva)
• **Chhatrapati Shivaji Maharaj Terminus (CSMT)** — UNESCO site (2004), Victorian Gothic Revival railway station built 1878–1888 by Frederick William Stevens
• **Victorian Gothic & Art Deco Ensembles** — UNESCO site (2018), the grand buildings along the Oval Maidan and Marine Drive's Art Deco seafront
• **Gateway of India** — Built 1911–1924 to commemorate King George V's visit, Indo-Saracenic style. Last British troops departed from here in 1948
• **Haji Ali Dargah** — 15th-century mosque and dargah on an islet in the Arabian Sea, accessible only at low tide
• **Rajabai Clock Tower** — 85m Gothic-style clock tower (1878) at Mumbai University, modelled on London's Big Ben, with 16 musical chimes
• **Bombay High Court** — Stunning Victorian Gothic building (1878) with stained glass windows, one of the finest judicial buildings in the world
• **Mount Mary Basilica (Bandra)** — 18th-century church, one of Mumbai's most visited places of worship, with annual Bandra Fair
• **Kanheri Caves** — 109 rock-cut caves (1st–10th century CE) inside Sanjay Gandhi National Park, largest Buddhist cave complex in Mumbai
• **Banganga Tank** — Ancient Hindu water tank (12th century) in Walkeshwar, believed to have been created by Lord Rama's arrow
• **Mahalaxmi Temple** — 18th-century temple dedicated to Goddess Mahalaxmi, major pilgrimage site
• **Worli Fort** — 17th-century Portuguese sea-fort, now an ASI-protected monument with views of the Bandra-Worli Sea Link
• **Flora Fountain (Hutatma Chowk)** — Ornamental stone fountain (1864) at the heart of Fort area, memorial to Samyukta Maharashtra martyrs

**Museums & Institutions:**
• **Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (CSMVS)** (formerly Prince of Wales Museum) — Mumbai's premier museum with 50,000+ artefacts spanning pre-history to modern art. Sections include Art, Archaeology, and Natural History. The building itself is an Indo-Saracenic masterpiece (1922)
• **Dr. Bhau Daji Lad Museum** — Mumbai's oldest museum (est. 1857, restored 2008). Winner of UNESCO Asia-Pacific Heritage Award. Collections include maps of old Bombay, clay models, decorative arts, and industrial arts of the 19th century
• **NGMA Mumbai** — National Gallery of Modern Art branch at Sir Cowasji Jehangir Hall, housing works by MF Husain, SH Raza, Amrita Sher-Gil, and Tyeb Mehta
• **Mani Bhavan** — Mahatma Gandhi's Mumbai residence (1917–1934). Now a museum with his personal effects, letters, and a library of 50,000+ books
• **Nehru Science Centre** — India's largest interactive science museum
• **RBI Monetary Museum** — History of Indian currency from ancient punch-marked coins to modern notes
• **Maritime Heritage Museum (upcoming)** — Proposed at the iconic Raj Bhavan dockyard
• **Jehangir Art Gallery** — India's first modern art gallery (1952), hosts ~300 exhibitions/year at Kala Ghoda
• **National Museum of Indian Cinema** — India's first museum dedicated to cinema (est. 2019), covering 100+ years of Indian film history from Dadasaheb Phalke to modern Bollywood

**Cultural Life:**
• Bollywood — world's largest film industry by output (~1,500+ films/year), centred in Film City, Goregaon
• **Kala Ghoda Arts Festival** — annual 9-day multicultural festival (Feb)
• Ganesh Chaturthi — Mumbai's iconic 10-day festival with elaborate pandals and immersion procession at Girgaon Chowpatty
• **Dabbawalas** — UNESCO-recognized lunch delivery system (Six Sigma efficiency)
• Theatre tradition: Prithvi Theatre, NCPA (National Centre for Performing Arts)
• Street food: vada pav, pav bhaji, bhel puri at Chowpatty Beach`,
    textHi: `**मुंबई — भारत की सांस्कृतिक और वाणिज्यिक राजधानी**

मुंबई औपनिवेशिक भव्यता और समकालीन संस्कृति का मिश्रण है। यह बॉलीवुड का घर और यूनेस्को क्रिएटिव सिटी है।

**विरासत:** एलीफैंटा गुफाएँ (यूनेस्को), CSMT (यूनेस्को), गेटवे ऑफ इंडिया, विक्टोरियन गॉथिक और आर्ट डेको (यूनेस्को)
**संग्रहालय:** छत्रपति शिवाजी महाराज वास्तु संग्रहालय (CSMVS, 50,000+ कलाकृतियाँ), भाऊ दाजी लाड संग्रहालय (1857, यूनेस्को पुरस्कार विजेता), NGMA मुंबई, मणि भवन (गांधी संग्रहालय), जहांगीर आर्ट गैलरी, भारतीय सिनेमा राष्ट्रीय संग्रहालय (2019), RBI मौद्रिक संग्रहालय
**सांस्कृतिक जीवन:** बॉलीवुड, गणेश चतुर्थी, काला घोड़ा महोत्सव, डब्बावाला`,
    textTe: `**ముంబై — భారతదేశ సాంస్కృతిక & వాణిజ్య రాజధాని**

ముంబై బాలీవుడ్ నిలయం, యునెస్కో క్రియేటివ్ సిటీ. ఎలిఫెంటా గుహలు, CSMT, గేట్‌వే ఆఫ్ ఇండియా, విక్టోరియన్ గోథిక్ & ఆర్ట్ డెకో (యునెస్కో ప్రదేశాలు) ఇక్కడ ఉన్నాయి.`,
    textTa: `**மும்பை — இந்தியாவின் கலாச்சார & வணிக தலைநகரம்**

மும்பை பாலிவுட் இல்லம், யுனெஸ்கோ படைப்பாற்றல் நகரம். எலிபண்டா குகைகள், CSMT, கேட்வே ஆஃப் இந்தியா, விக்டோரியன் கோதிக் & ஆர்ட் டெகோ (யுனெஸ்கோ தளங்கள்) இங்கே உள்ளன.`,
    confidence: "High",
    sources: [
      { title: "ASI – Mumbai Circle", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Mumbai Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Mumbai Museums", url: "https://museumsofindia.gov.in" },
      { title: "MGMD – Mani Bhavan Gandhi Museum", url: "https://mgmd.gov.in" },
    ],
    followUps: ["Tell me about Elephanta Caves", "Tell me about Ajanta caves", "Tell me about classical dance"],
  },
  {
    keywords: ["kolkata", "calcutta", "kolkata culture", "kolkata heritage", "city of joy", "bengal culture"],
    text: `**Kolkata — The Cultural Capital of India**

Kolkata (formerly Calcutta), capital of West Bengal, is celebrated as India's intellectual and cultural capital. It was the capital of British India until 1911 and the cradle of the Bengali Renaissance.

**Key Heritage Sites:**
• **Howrah Bridge (Rabindra Setu)** — Cantilever bridge over the Hooghly, symbol of Kolkata (1943). No nuts or bolts — entirely riveted, carries 100,000+ vehicles daily
• **Marble Palace** — 19th-century neoclassical mansion with European art, mirrors, rare paintings by Rubens, Reynolds, and Murillo, and a private zoo
• **Jorasanko Thakurbari** — Ancestral home of Rabindranath Tagore (now Rabindra Bharati University museum), where he was born and wrote Gitanjali
• **Writers' Building** — 1780 East India Company HQ, iconic seat of Bengal governance for 230+ years, recently restored
• **St. Paul's Cathedral** — Gothic-revival cathedral (1847), stained glass by Edward Burne-Jones, first Episcopal church in Asia
• **Fort William** — 18th-century star-shaped fort, HQ of Eastern Command of the Indian Army, with a church, museum, and parade ground
• **Dakshineswar Kali Temple** — 1855 temple complex on the Hooghly where Ramakrishna Paramahamsa lived and attained spiritual realisation. Nine-spired Navaratna architecture
• **Belur Math** — Headquarters of Ramakrishna Mission, founded by Swami Vivekananda (1897). Architecture blends Hindu, Christian, and Islamic motifs symbolising unity of religions
• **College Street (Boi Para)** — World's largest second-hand book market, with Presidency University, Sanskrit College, and the iconic Coffee House
• **Kalighat Temple** — One of 51 Shakti Peethas, one of Kolkata's oldest pilgrimage sites. The city's name derives from "Kalikshetra"
• **South Park Street Cemetery** — One of the earliest non-church cemeteries in the world (1767), Gothic-Indo-Saracenic tombs of British-era figures
• **Princep Ghat** — Palladian-style monument (1843) on the Hooghly riverbank, built in memory of scholar James Prinsep who deciphered Brahmi script
• **Nakhoda Mosque** — Largest mosque in Kolkata (1926), modelled on Akbar's tomb at Sikandra, can host 10,000 worshippers

**Museums & Institutions:**
• **Indian Museum** — Oldest and largest museum in Asia (est. 1814). 1 lakh+ artefacts across 35 galleries: Egyptian mummy, Gandhara sculptures, Bharhut Stupa railing, Ashoka Pillar capital, meteorite collection, and fossil gallery including a 200-million-year-old plant fossil
• **Victoria Memorial Hall** — Iconic white marble museum built 1906–1921 with 28,394 artefacts. Galleries include: Royal Gallery (Raj-era oil paintings), Calcutta Gallery (city history), National Leaders Gallery, arms and armour, rare books and manuscripts. The building itself is an Indo-Saracenic masterpiece with 25 surrounding galleries
• **Science City Kolkata** — Largest science centre in the Indian subcontinent with Space Odyssey, Dynamotion Hall, and Evolution Park
• **Birla Industrial & Technological Museum** — India's first science museum (1959) under NCSM
• **Asiatic Society Museum** — Founded 1784 by Sir William Jones. Rare manuscripts, coins, and antiquarian collection including Ashoka's rock edicts
• **Academy of Fine Arts** — Art gallery with textile, modern art, and archaeological sections
• **Netaji Bhawan** — Subhas Chandra Bose's residence, preserved as museum with INA artefacts, his 1937 Wanderer car, and personal memorabilia
• **Mother Teresa's House (Mother House)** — Missionaries of Charity HQ with her tomb, personal effects, and chapel

**Cultural Powerhouse:**
• **Bengali literature** — Tagore (Nobel 1913), Bankim Chandra, Sarat Chandra, Satyajit Ray
• **Durga Puja** — UNESCO Intangible Cultural Heritage (2021), 10-day citywide festival with 3,000+ community pandals, acclaimed for artistic innovation
• **Kolkata International Film Festival (KIFF)** — one of India's oldest film festivals
• **Satyajit Ray** — father of Indian art-house cinema (Pather Panchali, Apu Trilogy)
• **Coffee House culture** — Adda (intellectual conversation) tradition at Indian Coffee House, College Street

**Performing Arts:**
• Rabindra Sangeet (Tagore songs) — integral to Bengali identity
• Baul music tradition of Bengal
• Kolkata's theatre tradition (Jatra, Group Theatre movement)
• Venues: Nandan, Rabindra Sadan, Academy of Fine Arts

**Cuisine:** Rosogolla (GI tag), mishti doi, kosha mangsho, macher jhol, phuchka`,
    textHi: `**कोलकाता — भारत की सांस्कृतिक राजधानी**

कोलकाता (कलकत्ता) पश्चिम बंगाल की राजधानी है और बंगाल पुनर्जागरण का केंद्र रहा है।

**विरासत:** विक्टोरिया मेमोरियल, भारतीय संग्रहालय (एशिया का सबसे पुराना, 1814), हावड़ा ब्रिज, जोड़ासांको ठाकुरबाड़ी
**सांस्कृतिक जीवन:** दुर्गा पूजा (यूनेस्को अमूर्त विरासत 2021), रबींद्र संगीत, सत्यजित रे सिनेमा, बंगाली साहित्य, कॉफी हाउस संस्कृति`,
    textTe: `**కోల్‌కతా — భారతదేశ సాంస్కృతిక రాజధాని**

కోల్‌కతా బెంగాల్ పునరుజ్జీవనం కేంద్రం. విక్టోరియా మెమోరియల్, ఇండియన్ మ్యూజియం (ఆసియాలో అతి పురాతనం), దుర్గాపూజ (యునెస్కో ICH 2021), రబీంద్ర సంగీతం, సత్యజిత్ రే సినిమా ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**கொல்கத்தா — இந்தியாவின் கலாச்சார தலைநகரம்**

கொல்கத்தா வங்காள மறுமலர்ச்சியின் மையம். விக்டோரியா நினைவுமண்டபம், இந்திய அருங்காட்சியகம் (ஆசியாவின் பழமையானது), துர்கா பூஜை (யுனெஸ்கோ ICH 2021), ரவீந்திர சங்கீதம், சத்யஜித் ரே திரைப்படம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "Victoria Memorial – Official Site", url: "https://victoriamemorial-cal.org" },
      { title: "Indian Museum – Official Site", url: "https://indianmuseumkolkata.org" },
      { title: "Museums of India – Kolkata Museums", url: "https://museumsofindia.gov.in" },
      { title: "Indian Culture Portal – Bengali Heritage", url: "https://indianculture.gov.in" },
      { title: "Gyan Bharatam – Kolkata Knowledge Heritage", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Victoria Memorial", "Tell me about Indian Museum Kolkata", "Tell me about Durga Puja"],
  },
  {
    keywords: ["chennai", "madras", "chennai culture", "chennai heritage", "tamil culture", "marina beach"],
    text: `**Chennai — Gateway to South Indian Culture**

Chennai (formerly Madras), capital of Tamil Nadu, is the cultural hub of South India and the cradle of Carnatic music, Bharatanatyam, and Tamil literary tradition — one of the world's oldest living literary cultures (2,000+ years).

**Key Heritage Sites:**
• **Mahabalipuram (Mamallapuram)** — UNESCO World Heritage Site (1984), 40 km from Chennai. 7th-century Pallava rock-cut temples, Shore Temple, Arjuna's Penance (world's largest open-air bas-relief, 27m × 9m), and Five Rathas
• **Kapaleeshwarar Temple** — 7th-century Dravidian temple in Mylapore, dedicated to Lord Shiva, with a 37m-high gopuram adorned with colourful stucco figures
• **San Thome Basilica** — Built over the tomb of Apostle St. Thomas (one of only three basilicas in the world built over an apostle's tomb). Neo-Gothic architecture (1896)
• **Fort St. George** — Built 1644, first English fortress in India, now houses the Tamil Nadu Legislature and Fort Museum
• **Parthasarathy Temple** — 8th-century Pallava-era temple dedicated to Lord Krishna, one of the oldest structures in Chennai
• **Marina Beach** — World's second-longest urban beach (13 km). Along the promenade: statues of Thiruvalluvar, Gandhi, Bharathiar, Kannagi, and the Labour Statue
• **Ripon Building** — 1913 Indo-Saracenic civic building, headquarters of the Chennai Corporation — one of the oldest municipal bodies in the world
• **Theosophical Society Campus (Adyar)** — 260-acre heritage campus (est. 1882) with a 450-year-old banyan tree (one of the largest in the world), Adyar Library with 250,000+ rare books and palm-leaf manuscripts
• **Guindy National Park** — One of the few national parks within a city, home to blackbuck, spotted deer, and rare jackal species
• **Arignar Anna Zoological Park (Vandalur Zoo)** — India's largest zoo by area (1,500 acres)
• **Santhome Church (Our Lady of Light)** — 16th-century Portuguese church, one of the earliest European structures in Chennai
• **Connemara Public Library** — One of four National Depository Libraries in India (est. 1896), Indo-Saracenic building

**Museums & Institutions:**
• **Government Museum, Egmore** — India's second oldest museum (est. 1851) with 46 galleries. The **Bronze Gallery** is world-famous, housing the finest collection of Chola bronzes including the iconic Nataraja. Also features the Anthropology Gallery, Children's Museum, and Contemporary Art Gallery
• **Fort Museum (inside Fort St. George)** — Military artefacts, coins, medals, Robert Clive's memorabilia, portraits of colonial governors, and the original letters of the East India Company
• **DakshinaChitra Heritage Museum** — Living-history museum (25 km south) showcasing traditional architecture, crafts, and performing arts of the four South Indian states. 18 authentic heritage houses relocated and reconstructed
• **Birla Planetarium** — One of the largest planetariums in Asia, housed in a Rajasthani-style building
• **Vivekananda House (Ice House)** — 19th-century mansion where Swami Vivekananda stayed in 1897, now a museum with his personal artefacts and interactive exhibits
• **Kalakshetra Museum** — On-campus museum at Kalakshetra Foundation displaying handloom textiles, traditional jewellery, and rare musical instruments
• **Rail Museum, Chennai** — Outdoor museum with vintage locomotives, coaches, and railway memorabilia
• **Valluvar Kottam** — Memorial to Thiruvalluvar with a 39m-high temple chariot replica and all 1,330 Thirukkural couplets inscribed on granite

**Cultural Life:**
• **Margazhi Music & Dance Season (Dec–Jan)** — world's largest cultural festival, 2,000+ concerts and dance recitals across 50+ sabhas (venues) over 6 weeks
• **Bharatanatyam** — originated in Tamil Nadu temples, revived in modern form by Rukmini Devi Arundale at Kalakshetra
• **Carnatic music** — Trinity of Carnatic music (Tyagaraja, Muthuswami Dikshitar, Syama Sastri) tradition thrives here
• **Kalakshetra Foundation** — internationally renowned institution for Bharatanatyam and Carnatic music (est. 1936)
• **Madras Day (Aug 22)** — annual celebration of the city's founding

**Tamil Literary Heritage:**
• Sangam literature (3rd century BCE – 3rd century CE) — oldest extant Tamil literature
• Thirukkural by Thiruvalluvar — universal ethical text translated into 80+ languages
• Tamil — one of the longest-surviving classical languages, official Classical Language of India (2004)

**Cuisine:** Filter coffee, idli-sambar, dosa, Chettinad cuisine, Madras biryani`,
    textHi: `**चेन्नई — दक्षिण भारतीय संस्कृति का प्रवेशद्वार**

चेन्नई तमिलनाडु की राजधानी है और कर्नाटक संगीत, भरतनाट्यम और तमिल साहित्य परंपरा का केंद्र है।

**विरासत:** महाबलीपुरम (यूनेस्को), कपालीश्वरर मंदिर, फोर्ट सेंट जॉर्ज, सरकारी संग्रहालय (चोल कांस्य)
**सांस्कृतिक जीवन:** मार्गज़ी संगीत उत्सव (दुनिया का सबसे बड़ा सांस्कृतिक उत्सव), कलाक्षेत्र, भरतनाट्यम, संगम साहित्य, तिरुक्कुरल`,
    textTe: `**చెన్నై — దక్షిణ భారత సంస్కృతి ద్వారం**

చెన్నై తమిళనాడు రాజధాని, కర్ణాటక సంగీతం, భరతనాట్యం, తమిళ సాహిత్య సంప్రదాయం కేంద్రం. మహాబలిపురం (యునెస్కో), మార్గళి సంగీతోత్సవం, కళాక్షేత్ర ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**சென்னை — தென்னிந்திய கலாச்சாரத்தின் நுழைவாயில்**

சென்னை தமிழ்நாட்டின் தலைநகரம், கர்நாடக இசை, பரதநாட்டியம், தமிழ் இலக்கிய மரபின் மையம்.

**பாரம்பரியம்:** மாமல்லபுரம் (யுனெஸ்கோ), கபாலீசுவரர் கோவில், செயிண்ட் ஜார்ஜ் கோட்டை, அரசு அருங்காட்சியகம் (சோழ வெண்கலங்கள்)
**கலாச்சார வாழ்வு:** மார்கழி இசை விழா (உலகின் மிகப்பெரிய கலாச்சார விழா), கலாக்ஷேத்திரா, சங்க இலக்கியம், திருக்குறள்`,
    confidence: "High",
    sources: [
      { title: "ASI – Chennai Circle", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Tamil Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Chennai Museums", url: "https://museumsofindia.gov.in" },
      { title: "Vedic Heritage Portal – Sangam Literature", url: "https://vedicheritage.gov.in" },
    ],
    followUps: ["Tell me about Mahabalipuram", "Tell me about classical dance", "Tell me about classical music"],
  },
  {
    keywords: ["bengaluru", "bangalore", "bengaluru culture", "bangalore heritage", "karnataka capital"],
    text: `**Bengaluru — Garden City & Innovation Hub**

Bengaluru, capital of Karnataka, is known as India's Silicon Valley but also carries a rich cultural heritage spanning the Ganga, Chola, Hoysala, Vijayanagara, and Wodeyar dynasties.

**Key Heritage Sites:**
• **Bangalore Palace** — Tudor-style palace built 1878, inspired by Windsor Castle. 45,000 sq ft palace with fortified towers, Gothic windows, and wooden carvings. Now hosts cultural events and concerts
• **Tipu Sultan's Summer Palace (Daria Daulat Bagh)** — Indo-Islamic architecture (1791), built entirely of teak wood with ornate frescoes depicting Tipu's battles and court life
• **Lalbagh Botanical Garden** — 240-acre garden (est. 1760 by Hyder Ali, expanded by Tipu Sultan). Glass House modelled on London's Crystal Palace, a 3,000-million-year-old peninsular gneiss outcrop, and 1,854+ plant species
• **Cubbon Park** — 300-acre Victorian-era green lung (est. 1870) with the Attara Kacheri (High Court), State Library, and Seshadri Iyer Memorial
• **Bull Temple (Dodda Basavana Gudi)** — Houses one of the largest Nandi monoliths (4.5m high, 6.5m long), built by Kempe Gowda I in the 16th century
• **ISKCON Temple (Hare Krishna Hill)** — One of the largest ISKCON temples in the world, blending Dravidian and modern architecture
• **Bangalore Fort (Kempegowda Fort)** — 16th-century mud fort built by Kempegowda I (1537), later rebuilt in stone by Hyder Ali. Delhi Gate and two bastions survive. Tipu Sultan's armoury was once housed here
• **Devanahalli Fort** — Birthplace of Tipu Sultan (1750), 15 km from Bengaluru airport. Well-preserved stone fort with Tipu-era mosque
• **Nandi Hills** — Hilltop fortress (60 km from city) used by Tipu Sultan as a summer retreat. Tipu's Drop (a 600m cliff), Tipu's summer residence, and ancient Nandi temple
• **Vidhana Soudha** — Neo-Dravidian granite building (1956), seat of the Karnataka Legislature, one of the largest legislative buildings in India. Inscription reads "Government's Work is God's Work"
• **Someshwara Temple (Ulsoor)** — Chola-era temple (12th century) with Dravidian architecture, one of the oldest surviving temples in Bengaluru
• **St. Mary's Basilica** — One of the oldest churches in Bengaluru (1818), Gothic-style architecture

**Museums & Institutions:**
• **Government Museum (est. 1865)** — One of the oldest museums in India. Houses Neolithic artefacts, Vijayanagara sculptures, numismatic collection, and geological specimens. Adjoining **Venkatappa Art Gallery** showcases works by court painter K. Venkatappa
• **NGMA Bangalore** — National Gallery of Modern Art branch in the heritage Manikyavelu Mansion, featuring works by modern Indian masters and rotating exhibitions
• **Visvesvaraya Industrial and Technological Museum (VITM)** — Premier science museum under NCSM with interactive galleries on engines, space, electronics, and biotechnology. Named after Sir M. Visvesvaraya (Bharat Ratna)
• **HAL Heritage Centre and Aerospace Museum** — India's first aerospace museum (2001). Vintage aircraft (Pushpak, Marut HF-24, Ajeet), aero engines, flight simulators, and history of Indian aviation from 1940
• **Indian Music Experience Museum** — India's first interactive music museum (2019). Covers Indian music history from Vedic chants to Bollywood, with sound gardens, instrument galleries, and recording studios
• **Kempegowda Museum** — Museum dedicated to Bengaluru's founder Kempegowda (16th century), inside the iconic KR Market area
• **National Law School Museum** — Legal history and jurisprudence artefacts

**Cultural Life:**
• **Kannada literature & theatre** — Kuvempu, DVG, Girish Karnad (Jnanpith awardees)
• **Yakshagana** — traditional theatre form of Karnataka with elaborate costumes and dance
• Bengaluru's vibrant music scene: both Carnatic and Hindustani traditions, plus India's biggest indie/rock scene
• Karaga Festival — oldest festival of Bengaluru (over 800 years), celebrated by the Thigala community
• **Mysore Dasara** connection — Bengaluru was historically part of the Kingdom of Mysore`,
    textHi: `**बेंगलुरु — गार्डन सिटी और इनोवेशन हब**

बेंगलुरु कर्नाटक की राजधानी, भारत की सिलिकॉन वैली होने के साथ-साथ समृद्ध सांस्कृतिक विरासत का केंद्र है।

**विरासत:** बैंगलोर पैलेस, टीपू सुल्तान का ग्रीष्मकालीन महल, लालबाग, कब्बन पार्क, बुल टेम्पल
**संग्रहालय:** NGMA बेंगलुरु, विश्वेश्वरैया संग्रहालय, सरकारी संग्रहालय
**सांस्कृतिक जीवन:** कन्नड साहित्य (कुवेंपु, गिरीश कर्नाड), यक्षगान, करगा उत्सव`,
    textTe: `**బెంగళూరు — గార్డెన్ సిటీ & ఇన్నోవేషన్ హబ్**

బెంగళూరు కర్ణాటక రాజధాని. బెంగళూరు ప్యాలెస్, టిప్పు సుల్తాన్ వేసవి భవనం, లాల్‌బాగ్, NGMA, యక్షగానం, కన్నడ సాహిత్యం ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**பெங்களூர் — தோட்ட நகரம் & புதுமை மையம்**

பெங்களூர் கர்நாடகா தலைநகரம். பெங்களூர் அரண்மனை, திப்பு சுல்தான் கோடை மாளிகை, லால்பாக், NGMA, யக்ஷகானம், கன்னட இலக்கியம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Bengaluru Heritage", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Karnataka", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Bengaluru Museums", url: "https://museumsofindia.gov.in" },
      { title: "Gyan Bharatam – Kannada Knowledge", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Hampi", "Tell me about classical dance", "Tell me about museums in India"],
  },
  {
    keywords: ["hyderabad", "hyderabad culture", "hyderabad heritage", "nizam", "charminar", "golconda", "telangana capital"],
    text: `**Hyderabad — City of Pearls & Nawabi Heritage**

Hyderabad, capital of Telangana, was founded in 1591 by Muhammad Quli Qutb Shah. Under the Qutb Shahi and Nizam dynasties, it became a centre of Indo-Islamic art, architecture, and cuisine.

**Key Heritage Sites:**
• **Charminar** — Iconic 1591 monument with four grand arches and minarets, symbol of Hyderabad. Built by Muhammad Quli Qutb Shah to mark the end of a plague epidemic. Laad Bazaar (bangle market) surrounds it
• **Golconda Fort** — 13th-century fortress known for its acoustic engineering (a handclap at the entrance is heard at the citadel, 1 km away). Original source of the Koh-i-Noor, Hope, and Darya-i-Noor diamonds. 8 gates, 87 bastions, 4 drawbridges, and a royal cemetery
• **Qutb Shahi Tombs** — Necropolis of the Qutb Shahi kings (7 royal tombs), considered among the finest Indo-Islamic architecture. Recently restored with Aga Khan Trust collaboration
• **Mecca Masjid** — One of the largest mosques in India (10,000 capacity), built over 77 years (1617–1694) with bricks made from soil brought from Mecca
• **Chowmahalla Palace** — Nizam's palace (Four Palaces) with Durbar Hall, vintage car collection including Rolls-Royces of the Nizam. UNESCO Asia-Pacific Heritage Award (2010)
• **Falaknuma Palace** — Nizam's 1893 Italian marble palace, scorpion-shaped layout, now a Taj luxury hotel. Houses the world's largest dining table (seating 101) and Venetian chandeliers
• **Paigah Tombs** — Ornate necropolis of the Paigah nobles, blending Mughal, Rajputana, and Deccani styles in marble latticework (jali). Hidden gem, often called Hyderabad's "mini Taj"
• **Taramati Baradari** — 17th-century open pavilion built for Taramati, a renowned dancer in the Qutb Shahi court. Now a cultural performance venue
• **Warangal Fort (nearby)** — Kakatiya-era fort (13th century) with famous Kakatiya Kala Thoranam (ornamental gateway), proposed for UNESCO tentative list
• **Thousand Pillar Temple (Warangal)** — 1163 CE Kakatiya temple with star-shaped platform, Nandi monolith, and exquisite carvings
• **Birla Mandir** — White marble hillside temple (1976) offering panoramic city views, built from Rajasthani marble with Dravidian motifs

**Museums & Institutions:**
• **Salar Jung Museum** — One of India's three National Museums with 43,000+ artefacts from across the world. Highlights: the **Veiled Rebecca** marble sculpture (Benzoni, 1876), Aurangzeb's sword, Tipu Sultan's wardrobe, a 300-year-old Quran written in microscopic calligraphy, European clocks, Japanese lacquerware, and Indian miniature paintings. 38 galleries across 2 floors
• **Nizam Museum (Purani Haveli)** — Displays the legendary wealth of the Nizams: a gold burnished throne, diamond-studded jewellery, Nizam VII's 150-piece gold dinner set, a wardrobe walk-in closet the size of a room, and a model of the Eiffel Tower in diamonds
• **Telangana State Museum (Hyderabad Museum)** — Archaeological artefacts from Kakatiya, Chalukya, and Satavahana periods. Includes Buddhist relics, Bidri ware, arms gallery, and Ajanta painting reproductions
• **Birla Science Museum & Planetarium** — Interactive science centre with dinosaurium (life-size models), archaeology museum, and one of India's largest planetariums
• **CCMB Heritage Centre** — Centre for Cellular and Molecular Biology, showcases DNA science and biodiversity of the Deccan Plateau
• **Nehru Zoological Park** — One of India's largest zoos with Natural History Museum on premises
• **HEH The Nizam's Museum (Falaknuma)** — Royal artefacts, vintage car collection, and Nizam-era photography

**Cultural Life:**
• **Hyderabadi Biryani** — GI-tagged, world-famous Dum Biryani tradition
• **Pearl trade** — Hyderabad has been the pearl processing capital of India for centuries
• Hyderabadi Deccani language — unique Urdu dialect blending Telugu, Marathi, and Arabic influences
• **Bonalu & Bathukamma** — iconic Telangana festivals
• **Ramoji Film City** — world's largest integrated film studio complex (Guinness Record)`,
    textHi: `**हैदराबाद — मोतियों का शहर और नवाबी विरासत**

हैदराबाद तेलंगाना की राजधानी, 1591 में मुहम्मद कुली कुतुब शाह द्वारा स्थापित। कुतुबशाही और निजाम शासन ने इसे इंडो-इस्लामिक कला का केंद्र बनाया।

**विरासत:** चारमीनार, गोलकोंडा किला, कुतुबशाही मकबरे, मक्का मस्जिद, चौमहल्ला पैलेस
**संग्रहालय:** सालार जंग संग्रहालय (43,000+ कलाकृतियाँ), निजाम संग्रहालय
**सांस्कृतिक जीवन:** हैदराबादी बिरयानी (जीआई टैग), मोती व्यापार, बोनालु, बतुकम्मा, रामोजी फिल्म सिटी`,
    textTe: `**హైదరాబాద్ — ముత్యాల నగరం & నవాబీ వారసత్వం**

హైదరాబాద్ తెలంగాణ రాజధాని, 1591లో మహమ్మద్ కులీ కుతుబ్ షా స్థాపించారు.

**వారసత్వం:** చార్మినార్, గోల్కొండ కోట (కోహినూర్ వజ్రం మూలస్థానం), కుతుబ్ షాహీ సమాధులు, మక్కా మసీదు, చౌమహల్లా ప్యాలెస్
**మ్యూజియంలు:** సాలార్ జంగ్ మ్యూజియం (43,000+ కళాఖండాలు), నిజాం మ్యూజియం
**సాంస్కృతిక జీవితం:** హైదరాబాదీ బిర్యానీ (GI ట్యాగ్), ముత్యాల వ్యాపారం, బోనాలు, బతుకమ్మ, రామోజీ ఫిల్మ్ సిటీ (గిన్నిస్ రికార్డ్)`,
    textTa: `**ஹைதராபாத் — முத்து நகரம் & நவாப் பாரம்பரியம்**

ஹைதராபாத் தெலங்கானா தலைநகரம், 1591ல் முஹம்மது குலி குதுப் ஷா நிறுவினார். சார்மினார், கோல்கொண்டா கோட்டை, சாலார் ஜங் அருங்காட்சியகம், ஹைதராபாதி பிரியாணி, போனாலு, பதுகம்மா இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "Salar Jung Museum – Official Site", url: "https://salarjungmuseum.in" },
      { title: "Indian Culture Portal – Deccan Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Hyderabad Museums", url: "https://museumsofindia.gov.in" },
      { title: "ASI – Hyderabad Circle", url: "https://asi.nic.in" },
      { title: "Abhilekh Patal – Nizam-era Records", url: "https://abhilekh-patal.in" },
    ],
    followUps: ["Tell me about Salar Jung Museum", "Tell me about Golconda Fort", "Tell me about classical dance"],
  },
  {
    keywords: ["jaipur", "jaipur culture", "jaipur heritage", "pink city", "rajasthan capital", "hawa mahal", "amber fort", "amer"],
    text: `**Jaipur — The Pink City**

Jaipur, capital of Rajasthan, was founded in 1727 by Maharaja Sawai Jai Singh II. It is one of India's first planned cities and was inscribed as a UNESCO World Heritage Site in 2019.

**Key Heritage Sites:**
• **Amber (Amer) Fort** — Magnificent Rajput-Mughal fort-palace complex with Sheesh Mahal (Mirror Palace with thousands of convex mirrors), Ganesh Pol (painted gateway), Diwan-i-Khas, and Sukh Mahal (water-cooled rooms). Part of UNESCO "Hill Forts of Rajasthan" (2013)
• **Hawa Mahal** — "Palace of Winds" (1799), iconic pink sandstone façade with 953 small windows (jharokhas) designed so royal women could observe street festivals unseen
• **City Palace** — Still partly residence of the royal family. Mubarak Mahal (welcome palace), Pritam Niwas Chowk with four ornate gates representing four seasons, and the largest silver vessels in the world (Gangajali)
• **Jantar Mantar** — UNESCO World Heritage Site (2010), world's largest stone sundial (Samrat Yantra, 27m), built by Jai Singh II. 19 astronomical instruments still used for celestial calculations
• **Nahargarh Fort** — "Abode of Tigers" hilltop fort (1734) with panoramic views of the Pink City. Madhavendra Palace inside features interconnected suites for the king's queens
• **Jaigarh Fort** — "Fort of Victory" (1726) houses the **Jaivana** — largest wheeled cannon in the world (20 tonnes, 6m barrel). Connected to Amber Fort by underground passages
• **Jal Mahal** — "Water Palace" (18th century) floating in Man Sagar Lake, a stunning five-storey Rajput palace (four storeys submerged). Recently restored, illuminated beautifully at night
• **Galta Ji (Monkey Temple)** — 18th-century temple complex in a narrow crevice of the Aravalli Hills with natural freshwater kunds (pools), ancient architecture, and a panoramic view of Jaipur
• **Birla Mandir (Lakshmi Narayan Temple)** — White marble temple (1988) visible from anywhere in Jaipur, with stained glass panels and mythological reliefs
• **Govind Dev Ji Temple** — 18th-century temple in the palace gardens, one of the most revered Krishna temples in India. Originally from Vrindavan, idol was moved here for protection during Aurangzeb's rule
• **Sisodia Rani Garden** — Terraced Mughal-style garden (1728) with painted pavilions, fountains, and murals depicting the love story of Radha-Krishna
**Museums & Institutions:**
• **Albert Hall Museum (Government Central Museum)** — Rajasthan's oldest museum (1887) in stunning Indo-Saracenic architecture. Collections include Egyptian mummy, Mughal miniatures, marble sculptures, natural history specimens, musical instruments, and the world's largest Persian carpet
• **City Palace Museum** — Still a royal residence. Museum section has rare manuscripts, Rajput and Mughal miniature paintings, textiles, royal costumes, and an armoury with ceremonial swords and daggers
• **Hawa Mahal Museum** — Inside the Palace of Winds, displays miniature paintings, ceremonial armour, and the history of the pink city
• **Jantar Mantar Museum** — UNESCO site with astronomical instruments. Samrat Yantra (27m sundial), Jai Prakash Yantra, and Ram Yantra — built by Jai Singh II (1734)
• **Nahargarh Fort Museum (Madhavendra Palace)** — Wax museum and sculpture park inside the hilltop fort
• **Anokhi Museum of Hand Printing** — Dedicated to Rajasthan's traditional hand block-printing craft, in a restored 16th-century haveli in Amber. Live demonstrations of the printing process
• **SRC Museum of Indology** — 5,25,000+ artefacts: rare manuscripts, tantric art, folk art, gemstones, and a letter written on a grain of rice
• **Dolls Museum** — Traditional dolls from all Indian states in Rajasthani costumes

**Cultural Life:**
• The entire old city was painted pink in 1876 to welcome the Prince of Wales (hence "Pink City")
• **Block printing** — Jaipur is a world centre for hand block-printed textiles (Sanganer and Bagru styles)
• **Blue pottery** — Unique Turko-Persian ceramic craft exclusive to Jaipur
• **Gemstone cutting & jewellery** — Jaipur processes 90% of the world's gemstones
• Jaipur Literature Festival — world's largest free literary festival
• **Festivals:** Teej, Gangaur, International Kite Festival (Makar Sankranti), Elephant Festival`,
    textHi: `**जयपुर — गुलाबी शहर**

जयपुर राजस्थान की राजधानी, 1727 में महाराजा सवाई जय सिंह II द्वारा स्थापित। यह 2019 में यूनेस्को विश्व धरोहर शहर बना।

**विरासत:** आमेर किला (यूनेस्को), हवा महल (953 झरोखे), सिटी पैलेस, जंतर मंतर (यूनेस्को), नाहरगढ़, जयगढ़, अल्बर्ट हॉल संग्रहालय
**सांस्कृतिक जीवन:** ब्लॉक प्रिंटिंग, ब्लू पॉटरी, रत्न कटाई (विश्व का 90%), जयपुर साहित्य उत्सव, तीज, गणगौर`,
    textTe: `**జైపూర్ — పింక్ సిటీ**

జైపూర్ రాజస్థాన్ రాజధాని, 2019 యునెస్కో ప్రపంచ వారసత్వ నగరం. ఆమేర్ కోట, హవా మహల్, సిటీ ప్యాలెస్, జంతర్ మంతర్, బ్లాక్ ప్రింటింగ్, బ్లూ పాటరీ, రత్నాల పరిశ్రమ ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**ஜெய்ப்பூர் — இளஞ்சிவப்பு நகரம்**

ஜெய்ப்பூர் ராஜஸ்தான் தலைநகரம், 2019 யுனெஸ்கோ உலக பாரம்பரிய நகரம். ஆமேர் கோட்டை, ஹவா மஹால், சிட்டி பேலஸ், ஜந்தர் மந்தர், பிளாக் பிரிண்டிங், ப்ளூ பாட்டரி, ரத்தினத் தொழில் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Jaipur Circle", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Rajput Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Jaipur Museums", url: "https://museumsofindia.gov.in" },
      { title: "Vedic Heritage Portal – Jantar Mantar Astronomy", url: "https://vedicheritage.gov.in" },
    ],
    followUps: ["Tell me about UNESCO World Heritage Sites in India", "Tell me about Mughal Empire", "Tell me about handicrafts"],
  },
  {
    keywords: ["lucknow", "lucknow culture", "lucknow heritage", "nawab", "awadh", "awadhi", "uttar pradesh capital"],
    text: `**Lucknow — City of Nawabs & Tehzeeb**

Lucknow, capital of Uttar Pradesh, is renowned for its Nawabi culture, refined etiquette (tehzeeb), literary traditions, and culinary excellence. It was the seat of the Nawabs of Awadh (Oudh) from 1722 to 1856.

**Key Heritage Sites:**
• **Bara Imambara** — Massive 1784 structure by Nawab Asaf-ud-Daula, featuring the world-famous **Bhool Bhulaiya** (labyrinth) with 1,000+ passages and the largest hall in Asia without external beam support (50m × 16m vaulted ceiling)
• **Chhota Imambara (Hussainabad Imambara)** — "Palace of Lights" (1838) with ornate gilded interiors, Belgian chandeliers, and silver throne. Tombs of Muhammad Ali Shah and his mother
• **Rumi Darwaza** — 60-foot Awadhi gateway (1784) modelled on Istanbul's Sublime Porte, considered one of the most beautiful gateways in India
• **British Residency** — Ruins from the 1857 Siege of Lucknow, now an ASI-protected monument. Cannonball marks still visible on walls. Cemetery and memorial chapel on grounds
• **Husainabad Clock Tower** — Tallest clock tower in India (67m), Victorian-Gothic style (1881), with a 14-foot pendulum
• **La Martiniere College** — Only school in the world to be awarded battle honours (for defending during the 1857 siege). French-Baroque architecture by Claude Martin
• **Chattar Manzil (Umbrella Palace)** — Imposing riverfront palace with umbrella-shaped domes, former residence of the Nawabs of Awadh. Now houses the Central Drug Research Institute
• **Kaiserbagh Palace** — Grand palace complex (1850) built by Wajid Ali Shah, with Baradari (12-doored pavilion) and ornamental gardens
• **Dilkusha Kothi** — English country-house style hunting lodge (1800s) of the Nawabs. Played a key role in the 1857 recapture of Lucknow. Atmospheric ruins surrounded by gardens
• **Jama Masjid (Husainabad)** — Grand mosque built by Muhammad Ali Shah (1845), twin minarets, ornamental façade, and large courtyard
• **Constantia (La Martiniere Main Building)** — Palatial 18th-century structure combining European Baroque with Awadhi architectural elements, tomb of Claude Martin in the basement

**Museums & Institutions:**
• **State Museum, Lucknow** — Largest museum in UP with collections spanning Gandhara, Mathura, and Gupta sculptures, Nawabi-era artefacts, natural history gallery, Egyptian mummy, and a rare coin collection of 50,000+ specimens
• **1857 Memorial Museum (British Residency)** — Interactive museum at the ASI-protected Residency ruins documenting the Siege of Lucknow. Original cannonballs, letters, maps, photographs, and dioramas
• **Nawab Wajid Ali Shah Museum** — Dedicated to the last Nawab of Awadh, a patron of arts. Displays his musical compositions, costumes, and the story of Kathak in Lucknow
• **Picture Gallery (Husainabad)** — Portraits of the Nawabs of Awadh in a heritage building near Chhota Imambara
• **Lucknow Zoo & State Museum of Natural History** — Heritage zoo (1921) with an adjacent natural history museum
• **Regional Science City** — Interactive science museum with 3D theatre and innovation hub

**Cultural Life:**
• **Awadhi cuisine** — Dum pukht (slow-cooking technique), Lucknowi biryani, galouti kebab, tunday kebab, kakori kebab, sheermal, kulcha-nihari
• **Chikan embroidery** — GI-tagged hand embroidery on fine muslin, a 400-year Lucknowi tradition
• **Lucknow's Urdu tradition** — Centre of Urdu poetry: Meer Taqi Meer, Atish, Josh Malihabadi, Kaifi Azmi
• **Kathak** — Lucknow Gharana is one of the three major Kathak schools
• **Lucknow Mahotsav** — Annual 10-day cultural festival
• **Pehle aap** (after you) culture — Lucknow is famous for its elaborate courtesy and hospitality traditions`,
    textHi: `**लखनऊ — नवाबों का शहर और तहज़ीब**

लखनऊ उत्तर प्रदेश की राजधानी, नवाबी संस्कृति, तहज़ीब और पाक कला के लिए प्रसिद्ध।

**विरासत:** बड़ा इमामबाड़ा (भूलभुलैया), छोटा इमामबाड़ा, रूमी दरवाज़ा, ब्रिटिश रेजीडेंसी, हुसैनाबाद क्लॉक टावर
**सांस्कृतिक जीवन:** अवधी व्यंजन (ग़लौटी कबाब, टुंडे कबाब), चिकन कढ़ाई (जीआई टैग), उर्दू शायरी, कथक लखनऊ घराना`,
    textTe: `**లక్నో — నవాబుల నగరం & తెహజీబ్**

లక్నో ఉత్తరప్రదేశ్ రాజధాని. బారా ఇమామ్‌బారా (భూల్ భులైయా), రూమీ దర్వాజా, అవధీ వంటకాలు (గలౌటీ కబాబ్), చికన్ ఎంబ్రాయిడరీ (GI ట్యాగ్), కథక్ లక్నో ఘరానా ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**லக்னோ — நவாப்களின் நகரம் & தெஹ்ஸீப்**

லக்னோ உத்தரப் பிரதேச தலைநகரம். பாரா இமாம்பாரா (பூல் புலையா), ரூமி தர்வாஜா, அவதி உணவு (கலௌட்டி கபாப்), சிக்கன் எம்பிராய்டரி (GI டேக்), கதக் லக்னோ கரானா இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Lucknow Circle", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Awadhi Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Lucknow Museums", url: "https://museumsofindia.gov.in" },
      { title: "Abhilekh Patal – Nawabi Records", url: "https://abhilekh-patal.in" },
      { title: "MGMD – 1857 Freedom Movement", url: "https://mgmd.gov.in" },
    ],
    followUps: ["Tell me about classical dance", "Tell me about Mughal Empire", "Tell me about handicrafts"],
  },
  {
    keywords: ["varanasi", "banaras", "kashi", "varanasi culture", "varanasi heritage", "ganga", "ghats", "oldest city"],
    text: `**Varanasi — The Eternal City**

Varanasi (also Kashi / Banaras), in Uttar Pradesh, is one of the world's oldest continuously inhabited cities (~3,000 years) and the spiritual capital of India. Mark Twain wrote: "Benares is older than history, older than tradition, older even than legend."

**Key Heritage Sites:**
• **Ghats of Varanasi** — 84 ghats along the Ganges stretching 6.8 km. **Dashashwamedh Ghat** hosts the iconic Ganga Aarti every evening (7 priests, fire ceremonies). **Manikarnika Ghat** — sacred cremation ground burning continuously for 5,000 years. **Assi Ghat** — confluence of Assi river and Ganges, where pilgrims begin their north-bound walk
• **Kashi Vishwanath Temple** — One of the 12 Jyotirlingas, dedicated to Lord Shiva. Original temple destroyed by Aurangzeb; rebuilt in 1780 by Ahilyabai Holkar. The new **Kashi Vishwanath Corridor** (2021) is a massive redevelopment connecting the temple directly to the ghats
• **Sarnath** — 10 km from Varanasi, where Buddha gave his first sermon. **Dhamek Stupa** (5th century, 43m high), **Ashoka Pillar** (Lion Capital = India's national emblem), Mulagandhakuti Vihara with Kosetsu Nosu paintings, and ancient Deer Park
• **Ramnagar Fort** — 18th-century Mughal-style fort of the Maharaja of Varanasi on the eastern bank. Hosts the 31-day Ram Lila (one of India's oldest, recognised by UNESCO ICH)
• **Banaras Hindu University (BHU)** — Founded 1916 by Madan Mohan Malaviya, one of Asia's largest residential universities. New Vishwanath Temple on campus open to all castes
• **Alamgir Mosque (Beni Madhav Ka Darera)** — Mosque built by Aurangzeb on a Hindu temple site, overlooking Panchganga Ghat. Blend of Hindu and Mughal architecture
• **Durga Temple (Monkey Temple)** — 18th-century Nagara-style temple painted red, built by a Bengali Rani, with a large rectangular pond (Durga Kund)
• **Tulsi Manas Temple** — Modern marble temple (1964) at the site where Goswami Tulsidas wrote the Ramcharitmanas (Hindi Ramayana). Walls inscribed with complete text
• **Sankat Mochan Hanuman Temple** — Founded by Tulsidas in the 16th century, one of the holiest Hanuman temples. Famous for its annual music festival (Sankat Mochan Sangeet Samaroh)
• **Chunar Fort** — Ancient fortress 40 km from Varanasi, on a rocky hill overlooking the Ganges. Dates to 56 BCE (Vikramaditya era), later held by Sher Shah Suri and the Mughals

**Museums & Institutions:**
• **Bharat Kala Bhavan (BHU)** — One of India's finest university museums with 1 lakh+ artefacts. Highlights: Nicholas Roerich paintings, Mughal miniatures, Banaras through the Ages gallery, ancient sculptures, decorative arts, and a rare collection of 12th-century palm-leaf manuscripts
• **Sarnath Archaeological Museum** — ASI museum (1910) at the site of Buddha's first sermon. Houses the original **Ashoka Lion Capital** (India's national emblem), Dharamrajika Stupa relics, and the exquisite 5th-century standing Buddha in Sarnath style (red sandstone)
• **Ramnagar Fort Museum** — Royal museum with vintage cars (including ivory-fitted palanquins), Mughal-era armoury, antique clocks, medieval costumes, astronomical clock, and a rare collection of sacred Tulsi Das manuscripts (Ramcharitmanas)
• **Man Mandir Observatory** — 18th-century astronomical observatory by Jai Singh II, older than the one in Jaipur
• **Kranti Museum (Jhansi House)** — Museum dedicated to the 1857 freedom struggle, housed in the building where revolutionaries met
• **International Rice Research Museum (IRRI Varanasi)** — Display of 6,000+ rice varieties from India

**Cultural Life:**
• **Banarasi silk** — GI-tagged, world-famous hand-woven silk sarees with intricate gold/silver brocade (zari). Weavers trace their lineage to 14th-century Muslim artisans who settled here
• **Banaras Gharana of Kathak** — Oldest gharana of Kathak dance
• **Thumri & Dadra** — Semi-classical Hindustani vocal forms that flourished here (Girija Devi, Siddheshwari Devi)
• **Benares School of Music** — Centre of Hindustani classical music; Ravi Shankar, Bismillah Khan, and Girija Devi hailed from Varanasi
• **Dev Deepawali** — Festival of lights on all 84 ghats (Kartik Purnima, 15 days after Diwali)
• Wooden toys of Varanasi — traditional lacquerware craft`,
    textHi: `**वाराणसी — शाश्वत नगरी**

वाराणसी (काशी/बनारस) विश्व के सबसे प्राचीन शहरों में से एक (~3,000 वर्ष) और भारत की आध्यात्मिक राजधानी है।

**विरासत:** 84 घाट (दशाश्वमेध गंगा आरती), काशी विश्वनाथ मंदिर (12 ज्योतिर्लिंगों में से एक), सारनाथ (बुद्ध का पहला प्रवचन), रामनगर किला, BHU
**सांस्कृतिक जीवन:** बनारसी रेशम (जीआई टैग), बनारस कथक घराना, ठुमरी-दादरा, हिंदुस्तानी शास्त्रीय संगीत (रवि शंकर, बिस्मिल्लाह खान), देव दीपावली`,
    textTe: `**వారణాసి — శాశ్వత నగరం**

వారణాసి (కాశీ/బనారస్) ప్రపంచంలో అత్యంత ప్రాచీన నగరాలలో ఒకటి (~3,000 సంవత్సరాలు), భారతదేశ ఆధ్యాత్మిక రాజధాని. 84 ఘాట్లు, కాశీ విశ్వనాథ్, సారనాథ్, బనారసీ పట్టు (GI ట్యాగ్), హిందూస్తానీ సంగీతం ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**வாரணாசி — நிரந்தர நகரம்**

வாரணாசி (காசி/பனாரஸ்) உலகின் மிகப் பழமையான நகரங்களில் ஒன்று (~3,000 ஆண்டுகள்), இந்தியாவின் ஆன்மீக தலைநகரம். 84 காட்கள், காசி விஸ்வநாத், சாரநாத், பனாரஸி பட்டு (GI டேக்), இந்துஸ்தானி இசை இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Sarnath & Varanasi Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Varanasi Heritage", url: "https://indianculture.gov.in" },
      { title: "Vedic Heritage Portal – Kashi Tradition", url: "https://vedicheritage.gov.in" },
      { title: "Museums of India – Sarnath Museum", url: "https://museumsofindia.gov.in" },
      { title: "Gyan Bharatam – Sanskrit & Vedic Knowledge", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Vedas", "Tell me about classical music", "Tell me about handicrafts"],
  },
  {
    keywords: ["ahmedabad", "amdavad", "ahmedabad culture", "ahmedabad heritage", "walled city", "gujarat capital"],
    text: `**Ahmedabad — India's First UNESCO World Heritage City**

Ahmedabad, Gujarat's largest city, became India's first UNESCO World Heritage City in 2017. Founded in 1411 by Sultan Ahmed Shah, it blends Hindu, Islamic, and Jain architecture in a unique composite style.

**Key Heritage Sites:**
• **Walled City of Ahmedabad** — UNESCO World Heritage Site (2017), featuring 600+ year-old pols (residential clusters) with intricately carved wooden havelis, bird-feeders, and chabutaras (bird-feeding towers). Over 600 pols with 10,000+ heritage structures
• **Sabarmati Ashram** — Mahatma Gandhi's headquarters (1917–1930) from where he launched the Dandi March (March 12, 1930). Hriday Kunj (Gandhi's living quarters), Vinoba-Mira Kutir, and open-air prayer grounds on the Sabarmati riverbank
• **Adalaj Stepwell (Vav)** — Exquisite 5-storey stepwell (1498) built by Rani Rudabai. Intricate carvings blending Hindu and Islamic styles, with Ami Khumbor (pot of life) motifs, floral patterns, and mythological scenes on every surface
• **Sidi Saiyyed Mosque** — Famous for the Sidi Saiyyed Jali (1573) — stone lattice window depicting the "Tree of Life", used as IIM Ahmedabad's logo. Considered a masterpiece of Indo-Islamic art
• **Jama Masjid** — Built 1424 by Ahmed Shah, 260 pillars supporting 15 domes with beautiful yellow sandstone jali work. One of the largest mosques in India
• **Hutheesing Jain Temple** — Ornate 19th-century Jain Derasar built in 1848, dedicated to the 15th Tirthankara Dharmanatha. Elaborate carvings on white marble
• **Sarkhej Roza** — Often called "Acropolis of Ahmedabad". 15th-century tomb-mosque complex blending Hindu and Islamic architecture, with a stepped tank, royal tombs, and a weaving quarter. Precursor to Mughal architecture
• **Bhadra Fort & Teen Darwaza** — 15th-century citadel of Ahmed Shah I with the Bhadra Kali Temple inside. Teen Darwaza (Triple Gateway) is one of the finest Sultanate-era arches in India
• **Rani Sipri's Mosque** — 15th-century mosque (1514) with exquisitely carved minarets, jali screens, and a mix of Hindu-Islamic architecture. Also known as "Masjid-e-Nagina" (Jewel of a Mosque)
• **Dada Hari Stepwell** — Another ornate stepwell (1499) with geometric Islamic designs, octagonal well shaft, and a small mosque above
• **Patan (nearby)** — Historic town 125 km north with the UNESCO-listed **Rani ki Vav** (Queen's Stepwell, 1063 CE) — an inverted temple with 500+ principal sculptures and 1,000+ minor sculptures. Featured on the ₹100 note

**Museums & Institutions:**
• **Calico Museum of Textiles** — One of the world's finest textile museums. Collections include Mughal imperial tent fabrics, Rajput court textiles, Patola silks, Kashmiri shawls, trade textiles, and resist-dyed fabrics spanning 500+ years. Housed in a carved wooden haveli
• **Sabarmati Ashram Museum** — Gandhi's life documented through original letters (including correspondence with Tolstoy), photographs, personal effects (his charkha, walking stick, spectacles), and a multimedia exhibit of the Dandi March
• **Lalbhai Dalpatbhai Museum (LD Museum)** — Rare Jain manuscripts with gold-leaf illustrations, Indian miniature paintings, woodcarvings, bronzes, beadwork, and a numismatic collection
• **Auto World Vintage Car Museum** — 100+ vintage and classic cars including Rolls-Royces, Bentleys, and a 1934 Cadillac V12
• **Vechaar Utensil Museum** — 4,500+ objects tracing the evolution of Indian cooking and eating vessels from the Bronze Age to the 20th century
• **IIM Ahmedabad — Louis Kahn Plaza** — While not a museum, the campus itself (1962–1974) is considered one of the 20th century's architectural masterpieces
• **Conflictorium** — India's first museum of conflict, exploring themes of justice, harmony, and dissent through interactive art installations
• **Science City, Ahmedabad** — Gujarat's largest interactive science centre with Hall of Space, Energy Park, IMAX theatre, and a musical fountain

**Cultural Life:**
• **Navratri** — 9-night festival with Garba and Dandiya Raas dance (Ahmedabad hosts the world's largest Navratri celebrations)
• **International Kite Festival (Uttarayan)** — Jan 14, massive kite-flying festival
• **Patola silk** — Double ikat weaving tradition from nearby Patan
• **Gujarati cuisine** — Vegetarian thali tradition, dhokla, fafda, undhiyu, khandvi
• **Street food:** Manek Chowk night market, khaman, dabeli, sev khamani`,
    textHi: `**अहमदाबाद — भारत का पहला यूनेस्को विश्व धरोहर शहर**

अहमदाबाद 2017 में भारत का पहला यूनेस्को विश्व धरोहर शहर बना। 1411 में सुल्तान अहमद शाह द्वारा स्थापित।

**विरासत:** दीवार वाला शहर (यूनेस्को), साबरमती आश्रम, अडालज बावड़ी, सीदी सैयद जाली, जामा मस्जिद
**संग्रहालय:** कैलिको वस्त्र संग्रहालय, IIM अहमदाबाद (लुई कान कैंपस)
**सांस्कृतिक जीवन:** नवरात्रि (गरबा-दांडिया), उत्तरायण (पतंग उत्सव), पटोला रेशम, गुजराती थाली`,
    textTe: `**అహ్మదాబాద్ — భారతదేశ మొదటి యునెస్కో వారసత్వ నగరం**

అహ్మదాబాద్ 2017లో భారతదేశ మొదటి యునెస్కో ప్రపంచ వారసత్వ నగరం. సబర్మతి ఆశ్రమం, కాలికో టెక్స్‌టైల్ మ్యూజియం, నవరాత్రి (గర్బా), ఉత్తరాయణ్ (గాలిపటాల పండుగ) ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**அகமதாபாத் — இந்தியாவின் முதல் யுனெஸ்கோ பாரம்பரிய நகரம்**

அகமதாபாத் 2017ல் இந்தியாவின் முதல் யுனெஸ்கோ உலக பாரம்பரிய நகரம். சபர்மதி ஆசிரமம், காலிகோ ஜவுளி அருங்காட்சியகம், நவராத்திரி (கர்பா), உத்தராயண் (பட்டம் விழா) இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Gujarat Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Gujarat Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Ahmedabad Museums", url: "https://museumsofindia.gov.in" },
      { title: "MGMD – Sabarmati Ashram & Gandhi Heritage", url: "https://mgmd.gov.in" },
      { title: "Abhilekh Patal – Gujarat Historical Records", url: "https://abhilekh-patal.in" },
    ],
    followUps: ["Tell me about Gandhi", "Tell me about UNESCO World Heritage Sites in India", "Tell me about handicrafts"],
  },
  {
    keywords: ["mysore", "mysuru", "mysore culture", "mysore heritage", "mysore palace", "wodeyar", "karnataka heritage"],
    text: `**Mysuru (Mysore) — City of Palaces**

Mysuru, Karnataka's cultural capital, was the seat of the Wodeyar dynasty (1399–1950). It is known for its royal heritage, classical arts, and the spectacular Mysore Dasara festival.

**Key Heritage Sites:**
• **Mysore Palace (Amba Vilas Palace)** — India's most visited monument after the Taj Mahal (~6 million visitors/year). Indo-Saracenic architecture (1912, by Henry Irwin) with Durbar Hall, stained glass, carved mahogany ceilings, and 97,000 electric bulbs illuminated during Dasara
• **Chamundi Hill** — 1,008 steps to Chamundeshwari Temple (goddess and patron deity of the Wodeyars). 5m-high Nandi statue (1659) carved from a single boulder halfway up. Panoramic views of Mysuru
• **St. Philomena's Cathedral** — Neo-Gothic church (1936) with twin 53m spires, one of the tallest churches in Asia. Inspired by Cologne Cathedral, with underground crypt containing a relic of St. Philomena
• **Devaraja Market** — 130+ year-old traditional market with flowers, fruits, spices, Mysore sandalwood products, and kumkum powder
• **Lalitha Mahal Palace** — Second-largest palace in Mysuru (1921), built in Renaissance style with a double-dome inspired by St. Paul's Cathedral, London. Now a heritage hotel
• **Karanji Lake & Kukkurahalli Lake** — Heritage lakes with nature parks, butterfly garden, and birdwatching trails in the heart of the city
• **Srirangapatna (14 km)** — Island fortress of Tipu Sultan on the Kaveri River. Key sites: Tipu's Summer Palace (Daria Daulat Bagh) with stunning frescoes, Gumbaz (tombs of Hyder Ali, Tipu Sultan, and Hyder's wife), Ranganathaswamy Temple (one of the five sacred Ranganatha temples), and the Dungeon where British officers were held
• **Somnathpur (35 km)** — Keshava Temple (1268 CE) — finest example of Hoysala architecture. Every inch of the star-shaped soapstone temple is covered with intricate carvings of gods, animals, and mythological scenes. ASI-protected monument
• **Brindavan Gardens** — Terraced gardens below KRS Dam with illuminated musical fountains, a Mughal-style layout of cascading waterways

**Museums & Institutions:**
• **Jaganmohan Palace — Jayachamarajendra Art Gallery** — 1861 palace converted to an art museum. Highlights: Raja Ravi Varma paintings, Russian painter Svetoslav Roerich's works, traditional Mysore paintings with gold leaf, antique musical instruments including a glass piano, French clocks, and game boards from the Wodeyar court
• **Mysore Palace Museum (Amba Vilas)** — Royal artefacts inside the palace: golden throne (weighing 200 kg, displayed only during Dasara), silver palanquins, Wodeyar family paintings, Belgian stained glass, and Scottish cast-iron pillars
• **Folklore Museum (University of Mysore)** — Traditional Karnataka folk artefacts, puppets, masks, ritual objects, and agricultural implements
• **Regional Museum of Natural History** — One of four RMNH centres in India, with exhibits on the ecology and biodiversity of the Western Ghats
• **Sand Sculpture Museum** — Unique museum displaying detailed sculptures made from Mysore river sand
• **Rail Museum, Mysuru** — Heritage railway artefacts including the Mysore Maharaja's royal saloon carriage

**Cultural Life:**
• **Mysore Dasara (Navaratri)** — State festival of Karnataka, 10-day celebration since 1610. Culminates in Vijayadashami procession with a golden howdah-carrying elephant, torch-lit parade, and cultural performances. UNESCO recognition being pursued
• **Mysore painting style** — Traditional South Indian painting with gold leaf, vivid colours, and fine detail
• **Mysore Ashtanga Yoga** — Pattabhi Jois made Mysuru the global centre of Ashtanga yoga
• **Mysore Pak** — Famous sweet originating from the palace kitchen
• **Mysore silk** — GI-tagged pure silk sarees from the Government Silk Factory (est. 1912)
• **Carnatic music** — Wodeyar kings were great patrons; Veena Sheshanna was a court musician`,
    textHi: `**मैसूरु — महलों का शहर**

मैसूरु कर्नाटक की सांस्कृतिक राजधानी, वोडेयार राजवंश (1399–1950) का गढ़।

**विरासत:** मैसूर पैलेस (ताज महल के बाद भारत का सबसे अधिक देखा जाने वाला स्मारक), चामुंडी हिल, जगनमोहन पैलेस
**सांस्कृतिक जीवन:** मैसूर दशहरा (1610 से), मैसूर पेंटिंग, अष्टांग योग, मैसूर सिल्क (जीआई टैग), मैसूर पाक`,
    textTe: `**మైసూరు — ప్యాలెస్‌ల నగరం**

మైసూరు కర్ణాటక సాంస్కృతిక రాజధాని. మైసూర్ ప్యాలెస్ (తాజ్ మహల్ తర్వాత అత్యధికంగా సందర్శించే స్మారకం), మైసూర్ దసరా, మైసూర్ పెయింటింగ్, మైసూర్ సిల్క్ (GI ట్యాగ్) ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**மைசூரு — அரண்மனைகளின் நகரம்**

மைசூரு கர்நாடகாவின் கலாச்சார தலைநகரம். மைசூர் அரண்மனை (தாஜ் மகாலுக்கு அடுத்து அதிகம் பார்வையிடப்படும் நினைவுச்சின்னம்), மைசூர் தசரா, மைசூர் ஓவியம், மைசூர் பட்டு (GI டேக்) இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Mysuru & Srirangapatna", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Mysuru Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Mysuru Palaces & Museums", url: "https://museumsofindia.gov.in" },
    ],
    followUps: ["Tell me about classical dance", "Tell me about Hampi", "Tell me about festivals"],
  },
  {
    keywords: ["chandigarh", "chandigarh culture", "chandigarh heritage", "le corbusier", "rock garden", "planned city"],
    text: `**Chandigarh — Le Corbusier's Modernist City**

Chandigarh, the joint capital of Punjab and Haryana, is India's first planned city (1950s). Designed by Franco-Swiss architect Le Corbusier, its Capitol Complex is a UNESCO World Heritage Site (2016).

**Key Heritage Sites:**
• **Capitol Complex** — UNESCO World Heritage Site (2016), comprising the High Court, Secretariat, and Legislative Assembly. Features the iconic **Open Hand Monument** (26m, kinetic sculpture that rotates in the wind) symbolizing "open to give, open to receive". Geometric Brise Soleil façades designed for natural cooling
• **Rock Garden** — Created by Nek Chand (1957–1975) from industrial and urban waste. 18-acre sculpture garden with 5,000+ statues made from broken bangles, tiles, ceramic pots, and industrial debris. One of the most visited sites in India (~5,000 visitors daily)
• **Sukhna Lake** — Man-made lake at the Shivalik foothills, created by Le Corbusier in 1958. Wildlife sanctuary on northern bank, rowing and yachting permitted
• **Rose Garden (Zakir Hussain Rose Garden)** — Asia's largest rose garden with 1,600+ species across 30 acres. Annual Rose Festival in February
• **Tower of Shadows** — Le Corbusier's experimental structure at the Capitol Complex demonstrating how architectural design can provide shade without walls. A living lesson in passive solar design
• **Pinjore Gardens (Yadavindra Gardens, nearby)** — 17th-century Mughal-style terraced garden (35 km from Chandigarh) built by Nawab Fidai Khan, architect of Badshahi Mosque. Seven descending terraces with fountains, pavilions, and miniature palaces
• **Chandigarh Architecture Trail** — The city itself is a heritage site: Sector 17 Plaza (pedestrian shopping area), Government Press Building, Gandhi Bhawan (PU campus — lotus-shaped building by Pierre Jeanneret), and the Pierre Jeanneret-designed furniture now collected worldwide

**Museums & Institutions:**
• **Government Museum and Art Gallery** — One of the best-curated museums in North India. Highlights: exquisite **Gandhara sculptures** (2nd–5th century CE), Pahari and Rajasthani miniature paintings, Mughal-era artefacts, and a modern art section with works by Amrita Sher-Gil, Nicholas Roerich, and Nandlal Bose. Also houses a 3rd-century Buddha head from Taxila
• **Le Corbusier Centre** — Museum dedicated to the city's architect. Original drawings, scale models, furniture prototypes, correspondence, and photographs documenting the creation of Chandigarh
• **Natural History Museum** — Dioramas of India's diverse ecosystems, fossil gallery, and interactive wildlife exhibits
• **International Dolls Museum** — 6,000+ dolls from 25+ countries in traditional costumes
• **Rock Garden** — While primarily a sculpture garden (5,000+ figures by Nek Chand), it also functions as an open-air museum of recycled art — broken bangles, tiles, ceramic pots, and industrial waste transformed into waterfalls, theatres, and human/animal sculptures

**Cultural Life:**
• Le Corbusier's sector-based grid design — each sector is self-contained with market, school, and parks
• **Chandigarh Carnival** — Annual cultural festival with dance, music, and food
• Punjabi and Haryanvi folk traditions converge here: Bhangra, Giddha, Ragni
• Chandigarh is consistently rated among India's cleanest and most livable cities`,
    textHi: `**चंडीगढ़ — ले कोर्बुज़िए का आधुनिकतावादी शहर**

चंडीगढ़ पंजाब और हरियाणा की संयुक्त राजधानी, भारत का पहला योजनाबद्ध शहर। कैपिटल कॉम्प्लेक्स यूनेस्को विश्व धरोहर (2016) है।

**विरासत:** कैपिटल कॉम्प्लेक्स (यूनेस्को), रॉक गार्डन (नेक चंद), सुखना झील, रोज़ गार्डन
**सांस्कृतिक जीवन:** ले कोर्बुज़िए की सेक्टर-आधारित डिज़ाइन, भांगड़ा, गिद्धा, चंडीगढ़ कार्निवल`,
    textTe: `**చండీగఢ్ — లే కార్బుజియే ఆధునిక నగరం**

చండీగఢ్ పంజాబ్ & హర్యానా ఉమ్మడి రాజధాని, భారతదేశ మొదటి ప్రణాళికాబద్ధ నగరం. క్యాపిటల్ కాంప్లెక్స్ (యునెస్కో 2016), రాక్ గార్డెన్, సుఖ్నా లేక్ ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**சண்டிகர் — லே கார்பூசியேவின் நவீன நகரம்**

சண்டிகர் பஞ்சாப் & ஹரியானா கூட்டு தலைநகரம், இந்தியாவின் முதல் திட்டமிட்ட நகரம். கேபிடல் காம்ப்ளெக்ஸ் (யுனெஸ்கோ 2016), ராக் கார்டன், சுக்னா ஏரி இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture Portal – Chandigarh Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Chandigarh Museums", url: "https://museumsofindia.gov.in" },
      { title: "Gyan Bharatam – Punjab & Haryana Knowledge", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about UNESCO World Heritage Sites in India", "Tell me about classical dance", "Tell me about festivals"],
  },
  {
    keywords: ["thiruvananthapuram", "trivandrum", "trivandrum culture", "kerala capital", "kerala culture", "padmanabhaswamy"],
    text: `**Thiruvananthapuram — Kerala's Cultural Gateway**

Thiruvananthapuram (Trivandrum), capital of Kerala, is built on seven hills and named after Lord Anantha (the serpent on which Lord Vishnu reclines). It was the capital of the erstwhile Travancore kingdom.

**Key Heritage Sites:**
• **Padmanabhaswamy Temple** — Ancient temple with the world's richest treasure vault (estimated $22 billion in gold, diamonds, and jewels discovered in 2011). Dravidian architecture with 7-storey gopuram (30m). Lord Vishnu in Ananthasayana posture (reclining on the serpent Anantha), so large the deity is viewed through three doors. Only Hindus permitted entry; strict dress code
• **Kowdiar Palace** — Official residence of the Travancore Royal Family (1934), Art Deco style with Kerala-Mughal blend, set in sprawling grounds
• **Kovalam Beach** — Famous crescent-shaped beach with lighthouse (1972), historic fishing village turned international beach destination
• **Agasthyakoodam** — Sacred peak (1,868m) in the Western Ghats, believed to be the abode of Sage Agastya. Rich biodiversity hotspot with rare medicinal plants
• **Veli Tourist Village** — Lagoon where Veli Lake meets the Arabian Sea, with floating bridge and sculpture park
• **Attukal Bhagavathy Temple** — Famous for Attukal Pongala, the world's largest gathering of women (Guinness Record, 3+ million women cooking together)
• **Sree Chitra Thirunal Palace** — Heritage palace of the Travancore Maharajas, where many reforms including temple entry for all castes were proclaimed (1936 Temple Entry Proclamation by Chithira Thirunal)

**Museums & Institutions:**
• **Napier Museum** — 19th-century Indo-Saracenic masterpiece (designed by Robert Chisholm) housing an extraordinary collection: ivory carvings, Chola bronzes, Keralan woodwork, a temple chariot, Japanese lacquerware, and a life-size model of a traditional Kerala house
• **Kuthiramalika (Puthenmalika) Palace Museum** — Travancore royal palace famous for 122 carved wooden horses on its brackets. Displays: Travancore royal regalia, ivory throne, paintings of the Maharajas, Belgian mirrors, and crystal furniture
• **Natural History Museum** — Adjacent to Napier Museum, one of the oldest in India. 2,000+ specimens of taxidermied animals, birds, and marine life
• **Sri Chitra Art Gallery** — Rare collection including Raja Ravi Varma paintings, Mughal and Tanjore art, works from Bali and Japan, and copies of the Ajanta and Sigiriya murals. One of the few galleries in India to house both Indian and East Asian art
• **Science & Technology Museum** — Interactive science exhibits in the museum complex
• **Kanakakunnu Palace** — Heritage palace now used as a premier cultural events venue, surrounded by a sculpture garden with works by Kerala's leading artists
• **Kerala Museum (Ernakulam, nearby)** — Comprehensive museum of Kerala's history, art, and cultural traditions across 2,000 years

**Cultural Life:**
• **Kathakali** — Kerala's iconic classical dance-drama with elaborate face makeup (vesham), originated in 17th century. Major school at Kerala Kalamandalam (Thrissur)
• **Mohiniyattam** — Graceful classical dance of Kerala ("dance of the enchantress")
• **Kalaripayattu** — Ancient martial art of Kerala, believed to be the oldest fighting system in the world
• **Onam** — Kerala's harvest festival, 10-day celebration with Pookalam (flower rangoli), Onasadya (feast with 26+ dishes), Vallam Kali (snake boat race)
• **Attukal Pongala** — Guinness World Record for largest gathering of women (3+ million)
• **Ayurveda** — Thiruvananthapuram is a centre for traditional Ayurvedic medicine and wellness tourism
• **International Film Festival of Kerala (IFFK)** — Major annual film festival`,
    textHi: `**तिरुवनंतपुरम — केरल का सांस्कृतिक द्वार**

तिरुवनंतपुरम केरल की राजधानी, पूर्ववर्ती त्रावणकोर राज्य की राजधानी।

**विरासत:** पद्मनाभस्वामी मंदिर (विश्व का सबसे धनी मंदिर), नेपियर संग्रहालय, कुथिरामालिका पैलेस
**सांस्कृतिक जीवन:** कथकली, मोहिनीअट्टम, कलारिपयट्टु (प्राचीनतम मार्शल आर्ट), ओणम, अट्टुकल पोंगल, आयुर्वेद, IFFK फिल्म उत्सव`,
    textTe: `**తిరువనంతపురం — కేరళ సాంస్కృతిక ద్వారం**

తిరువనంతపురం కేరళ రాజధాని. పద్మనాభస్వామి ఆలయం (ప్రపంచంలో అత్యంత సంపన్న ఆలయం), కథకళి, మోహినియాట్టం, కలరిపయట్టు, ఓణం, ఆయుర్వేదం ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**திருவனந்தபுரம் — கேரளாவின் கலாச்சார நுழைவாயில்**

திருவனந்தபுரம் கேரளா தலைநகரம். பத்மநாபசுவாமி கோவில் (உலகின் செல்வச் செழிப்பான கோவில்), கதகளி, மோகினியாட்டம், களரிப்பயட்டு, ஓணம், ஆயுர்வேதம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture Portal – Kerala Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Kerala Museums", url: "https://museumsofindia.gov.in" },
      { title: "Vedic Heritage Portal – Ayurveda & Kerala Traditions", url: "https://vedicheritage.gov.in" },
      { title: "Gyan Bharatam – Kerala Knowledge Systems", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about classical dance", "Tell me about yoga and Ayurveda", "Tell me about festivals"],
  },
  {
    keywords: ["patna", "patna culture", "patna heritage", "pataliputra", "bihar capital", "nalanda", "magadh"],
    text: `**Patna — The Ancient Pataliputra**

Patna, capital of Bihar, is one of the world's oldest continuously inhabited cities. As Pataliputra, it was the capital of the Maurya (322–185 BCE), Shunga, and Gupta empires — the golden ages of Indian civilisation.

**Key Heritage Sites:**
• **Golghar** — Beehive-shaped granary (1786), built by Captain John Garstin with 29m height. Spiral staircase leads to the top for panoramic views of Patna and the Ganges
• **Kumhrar** — Excavated remains of the Mauryan palace of Pataliputra. Arogya Vihar hall with remains of 80 polished sandstone pillars (3rd century BCE), linked to Chandragupta Maurya's court described by Megasthenes
• **Agam Kuan** — "Unfathomable well", believed to date from Emperor Ashoka's time (3rd century BCE). Legend associates it with Ashoka's "hell" — a torture chamber for criminals
• **Mahavir Mandir** — One of the most revered Hanuman temples in India, second richest temple in Bihar. Unique feature: prasad distributed includes Tirupati-style laddoos
• **Takht Sri Patna Sahib (Harmandir Sahib)** — Birthplace of Guru Gobind Singh (1666), one of five sacred Sikh Takhts. Marble and sandstone gurudwara with museum displaying Guru's weapons, manuscripts, and personal items
• **Padri Ki Haveli (St. Mary's Church)** — Oldest church in Bihar (1713), built by Capuchin missionaries. One of the oldest churches in India
• **Sher Shah Suri Mosque** — 1545 Mughal-era mosque near the old fort, named after the Afghan ruler who built the Grand Trunk Road
• **Gandhi Ghat** — Historic ghat where Gandhi's ashes were immersed in the Ganges. Now a memorial with evening aarti ceremonies
• **Eco Park (Rajdhani Vatika)** — 100-acre park on the Ganges riverbank with Japanese garden, musical fountain, and amphitheatre

**Museums & Institutions:**
• **Patna Museum (Jadu Ghar)** — One of India's most important archaeological museums. Star exhibits: **Didarganj Yakshi** — the finest Mauryan-era polished stone sculpture (3rd century BCE), considered a masterpiece of ancient Indian art. Also houses a 200-million-year-old fossilized tree trunk, Gandhara sculptures, Buddhist relics, Mughal paintings, and a cannon ball collection from 1857
• **Bihar Museum** — Modern state-of-the-art museum (opened 2015) designed by Japanese architect Maki & Associates. Galleries: Orientation, Children's, History, and Mahatma Gandhi. Houses artefacts transferred from Patna Museum with interactive multimedia displays
• **Nalanda Archaeological Museum** — At the UNESCO site, displays antiquities excavated from Nalanda university ruins: bronze and stone sculptures, terracotta, coins, inscriptions, and seals (5th–12th century CE)
• **Rajgir Museum** — ASI museum with Buddhist and Jain artefacts from excavations around ancient Rajgriha (Magadha capital)
• **Quila House (Jalan Museum)** — Private museum in a Mughal-era building with a rare collection: Napoleon's bed, Marie Antoinette's Sèvres porcelain, Mughal jade, and Chinese pottery. One of the finest private collections in India
• **Khuda Bakhsh Oriental Public Library** — National library with rare Mughal manuscripts, Rajput miniatures, and a collection of Qurans (including a 1-inch-wide micro-Quran)

**Nearby Heritage (within 100 km):**
• **Nalanda** — UNESCO World Heritage Site (2016), remains of the ancient Nalanda Mahavihara (university), founded in 5th century CE, one of the world's first residential universities with 10,000+ students
• **Rajgir** — Ancient capital of Magadha, Griddhakuta Hill (Vulture Peak) where Buddha preached, hot springs
• **Vaishali** — World's first republic, site where Lord Mahavira was born, Ashoka Pillar

**Cultural Life:**
• **Chhath Puja** — Ancient Vedic festival dedicated to the Sun God, unique to Bihar. Devotees stand in water offering prayers to the setting and rising sun. Proposed for UNESCO ICH recognition
• **Madhubani (Mithila) painting** — GI-tagged folk art from Bihar with geometric patterns and vibrant colours
• **Sonepur Mela** — Asia's largest cattle fair, held at the confluence of Gandak and Ganges`,
    textHi: `**पटना — प्राचीन पाटलिपुत्र**

पटना बिहार की राजधानी, विश्व के सबसे प्राचीन शहरों में से एक। मौर्य, शुंग और गुप्त साम्राज्यों की राजधानी रही।

**विरासत:** पटना संग्रहालय (दीदारगंज यक्षी), गोलघर, कुम्हरार (मौर्य महल अवशेष), तख्त श्री पटना साहिब
**निकटवर्ती:** नालंदा (यूनेस्को), राजगीर, वैशाली
**सांस्कृतिक जीवन:** छठ पूजा, मधुबनी चित्रकला (जीआई टैग), सोनपुर मेला`,
    textTe: `**పాట్నా — ప్రాచీన పాటలీపుత్ర**

పాట్నా బీహార్ రాజధాని, ప్రపంచంలో అత్యంత ప్రాచీన నగరాలలో ఒకటి. మౌర్య, గుప్త సామ్రాజ్యాల రాజధాని. నలందా (యునెస్కో), పాట్నా మ్యూజియం, ఛఠ్ పూజ, మధుబని చిత్రకళ ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**பாட்னா — பண்டைய பாடலிபுத்திரா**

பாட்னா பீகார் தலைநகரம், உலகின் மிகப் பழமையான நகரங்களில் ஒன்று. மௌரிய, குப்த பேரரசுகளின் தலைநகரம். நாளந்தா (யுனெஸ்கோ), பாட்னா அருங்காட்சியகம், சாத் பூஜை, மதுபனி ஓவியம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Patna Circle & Nalanda", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Bihar Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Patna & Nalanda Museums", url: "https://museumsofindia.gov.in" },
      { title: "Vedic Heritage Portal – Magadha & Buddhist Tradition", url: "https://vedicheritage.gov.in" },
      { title: "Gyan Bharatam – Ancient Indian Knowledge", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about Indus Valley civilization", "Tell me about Nalanda", "Tell me about festivals"],
  },
  {
    keywords: ["bhopal", "bhopal culture", "bhopal heritage", "city of lakes", "madhya pradesh capital", "bhimbetka", "sanchi nearby"],
    text: `**Bhopal — City of Lakes**

Bhopal, capital of Madhya Pradesh, is a city of contrasts — Nawabi-era mosques and palaces in the old city, modern institutions in the new. It is uniquely positioned near some of India's most important heritage sites.

**Key Heritage Sites:**
• **Bhimbetka Rock Shelters** — UNESCO World Heritage Site (2003), 45 km from Bhopal. 500+ rock shelters with paintings dating back 30,000 years, depicting hunting, dancing, and animal scenes. Among the oldest known human art
• **Sanchi Stupa** — UNESCO World Heritage Site (1989), 46 km from Bhopal. Emperor Ashoka's Great Stupa (3rd century BCE) with famous toranas (gateways) depicting Buddha's life
• **Taj-ul-Masajid** — One of the largest mosques in Asia, three-domed pink sandstone structure with twin 18-storey minarets. Construction begun by Shah Jahan Begum (1868), completed only in 1985. Can host 175,000 worshippers
• **Gohar Mahal** — 19th-century Nawabi palace (1820) by Nawab Qudsia Begum, blending Hindu and Mughal styles. Overlooks the Upper Lake. Recently restored, hosts Bhopal's annual Shaan-e-Bhopal craft exhibitions
• **Upper and Lower Lakes** — Upper Lake (Bada Talab) is one of the oldest man-made lakes in India (11th century, built by Raja Bhoj). 31 sq km — largest artificial lake in Asia at the time. Lower Lake (Chhota Talab) is connected via an overbridge
• **Shaukat Mahal** — Bizarre fusion of French Gothic, Renaissance, and Islamic architecture (19th century), unlike any other building in India. Designed by a French architect descended from the Bourbon dynasty
• **Sadar Manzil** — 1832 Nawabi-era hall of public audience, now a heritage structure in the Old City
• **Udayagiri Caves (nearby, 60 km)** — 5th-century Gupta-era cave temples with the famous Varaha (boar incarnation of Vishnu) relief — one of the finest examples of Gupta sculpture in India. ASI-protected
• **Raisen Fort (nearby, 45 km)** — Massive 11th-century hilltop fort with 40+ gates, palaces, temples, cannons, and a panoramic view of the Vindhyas. Linked to legends of Padmini and the Rajput resistance
• **Islamnagar (nearby, 11 km)** — 18th-century town with Chaman Mahal (garden palace) and Rani Mahal (women's palace) of the Dost Mohammed Khan dynasty. Beautiful frescoes and Mughal gardens

**Museums & Institutions:**
• **State Museum (Bhopal)** — Rich collection spanning prehistory to medieval India. Highlights: stone sculptures from Raisen, Vidisha, Gyaraspur, and Hinglajgarh; copies of Bhimbetka rock paintings; Paramara and Pratihara period art; tribal artefacts; and a natural history section
• **Indira Gandhi Rashtriya Manav Sangrahalaya (IGRMS — National Museum of Mankind)** — India's premier anthropological museum spread over 200 acres on Shamla Hills. Open-air exhibits of traditional habitations from 40+ tribal communities across India (Toda huts, Naga morung, Bastar dwellings). Indoor galleries cover human evolution, rock art, and traditional technology
• **Bharat Bhavan** — Multi-arts complex designed by Charles Correa (1982). Houses: Roopankar (Museum of Fine Arts) with folk and tribal art, Rangamandal (repertory theatre), and Vagarth (literary section). Considered one of India's finest cultural institutions
• **Sanchi Archaeological Museum** — ASI museum adjacent to the Great Stupa. Displays original Sanchi gateway sculptures, Ashoka pillar fragments, Buddhist relics, coins, and inscriptions from excavations (3rd century BCE–12th century CE)
• **Regional Science Centre** — Interactive science museum with planetarium, 3D shows, and innovation hub
• **Birla Museum** — Sculpture gallery with artefacts from Raisen, Vidisha, and Mandsaur

**Cultural Life:**
• **Bhopal's Begum legacy** — Four successive women rulers (Begums of Bhopal) in the 19th century, rare in Indian history
• MP is called the "Heart of India" for its central location and concentration of heritage sites
• **Nearby:** Udayagiri caves (Gupta-era), Pachmarhi (hill station, rock art), Orchha, Mandu`,
    textHi: `**भोपाल — झीलों का शहर**

भोपाल मध्य प्रदेश की राजधानी, नवाबी विरासत और आधुनिक संस्थानों का मिश्रण।

**विरासत:** भीमबेटका (यूनेस्को, 30,000 वर्ष पुराने शैलचित्र), सांची स्तूप (यूनेस्को), ताज-उल-मस्जिद, गोहर महल
**संग्रहालय:** राज्य संग्रहालय, जनजातीय संग्रहालय (मानव संग्रहालय), भारत भवन
**सांस्कृतिक जीवन:** भोपाल की बेगम विरासत, मध्य प्रदेश — "भारत का हृदय"`,
    textTe: `**భోపాల్ — సరస్సుల నగరం**

భోపాల్ మధ్యప్రదేశ్ రాజధాని. భీంబేట్కా (యునెస్కో, 30,000 సంవత్సరాల పురాతన శిలా చిత్రాలు), సాంచి స్తూపం (యునెస్కో), తాజ్-ఉల్-మసీదు, జనజాతి మ్యూజియం ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**போபால் — ஏரிகளின் நகரம்**

போபால் மத்தியப் பிரதேச தலைநகரம். பீம்பேட்கா (யுனெஸ்கோ, 30,000 ஆண்டுகள் பழமையான பாறை ஓவியங்கள்), சாஞ்சி ஸ்தூபம் (யுனெஸ்கோ), தாஜ்-உல்-மஸ்ஜித், பழங்குடி அருங்காட்சியகம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Bhopal Circle (Sanchi, Bhimbetka)", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – MP Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Bhopal Museums", url: "https://museumsofindia.gov.in" },
      { title: "Vedic Heritage Portal – Gupta & Buddhist Art", url: "https://vedicheritage.gov.in" },
    ],
    followUps: ["Tell me about Sanchi Stupa", "Tell me about UNESCO World Heritage Sites in India", "Tell me about Indus Valley civilization"],
  },
  {
    keywords: ["pune", "pune culture", "pune heritage", "peshwa", "maratha", "pune maratha"],
    text: `**Pune — Cultural Capital of Maharashtra**

Pune (Poona), Maharashtra's second-largest city, is the cultural and educational hub of western India. It was the seat of the Peshwas (Maratha prime ministers) and the centre of the Maratha Empire.

**Key Heritage Sites:**
• **Shaniwar Wada** — Fortified palace of the Peshwas (1732), the seat of Maratha power. Though largely destroyed by fire in 1828, the impressive entrance gate and fortification walls survive
• **Aga Khan Palace** — Where Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai were imprisoned (1942–1944). Now a Gandhi National Memorial
• **Sinhagad Fort** — Hill fort (1,312m) associated with the legendary Battle of Sinhagad (1670) where Tanaji Malusare died capturing it from the Mughals. Shivaji reportedly said: "The fort is won, but the lion is lost"
• **Lal Mahal** — Reconstructed palace where young Shivaji spent his formative years (1630–1640) with his mother Jijabai. Site of the famous incident where Shivaji cut off the fingers of Mughal general Shaista Khan
• **Parvati Hill Temple** — 17th-century Peshwa-era hilltop temple complex (2,100 feet) with temples to Devdeveshwar, Kartikeya, and Vishnu. Peshwa Museum inside with original documents and weapons. Best panoramic view of Pune
• **Rajgad Fort** — Shivaji's capital for 26 years (1648–1674), 50 km from Pune. Three concentric defensive walls, Padmavati Lake (on a mountain top!), palace ruins, and breathtaking trekking trails
• **Torna Fort** — First fort captured by 16-year-old Shivaji (1646), marking the beginning of the Maratha Empire. Highest fort in the Pune region (1,403m)
• **Pataleshwar Cave Temple** — 8th-century rock-cut temple (Rashtrakuta era) dedicated to Shiva, carved from a single basalt rock in the heart of modern Pune. ASI-protected
• **Osho Ashram (Rajneesh International Meditation Centre)** — Internationally known meditation centre in Koregaon Park, attracting visitors from 100+ countries
• **Kasba Ganpati** — Pune's oldest Ganesh temple (1630s), established by Jijabai (Shivaji's mother). Considered the presiding deity (Gram Daivat) of Pune
**Museums & Institutions:**
• **Raja Dinkar Kelkar Museum** — One of India's most unique museums with 20,000+ artefacts collected by Dr. D.D. Kelkar. Highlights: Mastani Mahal (reconstructed palace of Bajirao's consort), 2,000+ oil lamps, nutcrackers, combs, writing instruments, Indian musical instruments, palanquins, hookah collection, and betel-nut cutters spanning 300 years
• **Aga Khan Palace Museum** — Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai were imprisoned here (1942–44). Kasturba's samadhi is in the grounds. Museum displays personal belongings, letters, photographs, and a multimedia documentary of the Quit India movement
• **Mahatma Phule Museum (formerly Pune Museum, est. 1890)** — Prehistoric and protohistoric artefacts, Maratha-era weapons and armoury, natural history gallery, and agricultural implements
• **Darshan Museum** — Multimedia museum dedicated to Sadhu Vaswani. Interactive exhibits with holographic projection and immersive theatre
• **Blades of Glory Cricket Museum** — India's first cricket museum with 2,000+ memorabilia: Don Bradman's autograph, Sachin Tendulkar's bats, World Cup mementos, and vintage cricket photographs
• **Tribal Cultural Museum (TRTI)** — Museum dedicated to Maharashtra's tribal communities, folk art, and traditional crafts
• **National War Museum, Pune** — Military history exhibits including artefacts from the 1971 war, Kargil, and gallantry award citations

**Cultural Life:**
• **Ganesh Chaturthi** — Lokmanya Tilak started the public Ganeshotsav in Pune (1893), transforming it from a private worship into a mass social-cultural festival. Dagdusheth Halwai Ganpati is the most famous pandal
• **Sawai Gandharva Bhimsen Festival** — One of India's most prestigious Hindustani classical music festivals
• **Lavani** — Maharashtra's vibrant traditional folk dance and music form
• **Pune's educational legacy** — First girls' school in India (Savitribai Phule, 1848), Fergusson College, Deccan College (1821)
• **Marathi literature & theatre** — Pune is the heart of Marathi Natya (drama), Pu La Deshpande, Kusumagraj
• **IT & cultural blend** — Koregaon Park's vibrant café culture alongside traditional peths (old market areas)`,
    textHi: `**पुणे — महाराष्ट्र की सांस्कृतिक राजधानी**

पुणे पेशवाओं का केंद्र और मराठा साम्राज्य की सत्ता का गढ़ था।

**विरासत:** शनिवार वाड़ा (पेशवा महल), आगा खान पैलेस (गांधी स्मारक), सिंहगढ़ किला, राजा दिनकर केलकर संग्रहालय
**सांस्कृतिक जीवन:** गणेश चतुर्थी (लोकमान्य तिलक ने 1893 में शुरू किया), सवाई गंधर्व भीमसेन उत्सव, लावणी, मराठी साहित्य और नाटक`,
    textTe: `**పూణే — మహారాష్ట్ర సాంస్కృతిక రాజధాని**

పూణే పేష్వాల కేంద్రం, మరాఠా సామ్రాజ్యం అధికార స్థానం. శనివార్ వాడా, ఆగాఖాన్ ప్యాలెస్, గణేశ చతుర్థి (1893 నుండి), సవాయ్ గంధర్వ సంగీతోత్సవం, లావణి ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**புனே — மகாராஷ்டிராவின் கலாச்சார தலைநகரம்**

புனே பேஷ்வாக்களின் மையம், மராட்டிய பேரரசின் அதிகார மையம். ஷனிவார் வாடா, ஆகா கான் அரண்மனை, கணேஷ் சதுர்த்தி (1893 முதல்), சவாய் கந்தர்வ இசை விழா, லாவணி இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Pune Forts & Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Maratha Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Pune Museums", url: "https://museumsofindia.gov.in" },
      { title: "MGMD – Aga Khan Palace & Gandhi Heritage", url: "https://mgmd.gov.in" },
    ],
    followUps: ["Tell me about Gandhi", "Tell me about Mughal Empire", "Tell me about festivals"],
  },
  {
    keywords: ["kochi", "cochin", "kochi culture", "kochi heritage", "kerala heritage", "fort kochi", "jewish synagogue"],
    text: `**Kochi — Queen of the Arabian Sea**

Kochi (Cochin), in Kerala, has been a spice-trading port for over 600 years. Its unique blend of Portuguese, Dutch, British, Arab, Jewish, and Chinese influences makes it one of India's most cosmopolitan heritage cities.

**Key Heritage Sites:**
• **Fort Kochi** — Historic neighbourhood with colonial-era churches, warehouses, and the iconic **Chinese Fishing Nets** (Cheena vala), believed to have been introduced by traders from the court of Kublai Khan (14th century). The tree-trunk cantilevered nets are now a symbol of Kerala tourism
• **Mattancherry Palace (Dutch Palace)** — Built 1555 by the Portuguese for the Raja of Kochi, renovated by the Dutch. Famous for Kerala-style murals (among the best preserved in India) depicting Ramayana scenes, Shiva's cosmic dance, and Krishna legends
• **Paradesi Synagogue** — Oldest active synagogue in the Commonwealth (1568), in Jew Town, Mattancherry. Hand-painted Chinese floor tiles (18th century, each tile unique), Belgian chandeliers, gold crown from the Maharaja, and ancient Torah scrolls
• **Santa Cruz Cathedral Basilica** — Originally built by the Portuguese in 1505, rebuilt in present Gothic form in 1902. Stunning ceiling paintings, altar, and stained glass windows
• **St. Francis Church** — Oldest European church in India (1503). Vasco da Gama was originally buried here (1524) before his remains were moved to Lisbon. Portuguese, Dutch, and British colonial influence visible in its architecture
• **Jew Town & Spice Market** — Heritage quarter with antique shops, spice warehouses dating to the Portuguese era, and the narrow lanes where Cochin's Jewish community lived for 2,000+ years
• **Bolgatty Palace** — Dutch palace (1744) on Bolgatty Island, one of the oldest Dutch palaces outside Holland. Now a heritage hotel
• **Cherai Beach & Vypeen Island** — Historic island with Portuguese-era Fort Pallipuram (1503, oldest European fort in India), lighthouse, and fishing villages
• **Tripunithura Hill Palace Complex** — Sprawling 54-acre estate of the Kochi Maharajas with 49 buildings, including the royal family's coronation hall, deer park, and archaeological museum
**Museums & Institutions:**
• **Hill Palace Museum (Thripunithura)** — Largest archaeological museum in Kerala, spread across 54 acres. Former palace of the Kochi Maharajas. Collections: royal crown and ornaments, oil paintings, Chera coins, stone sculptures, epigraphy, and a deer park. 49 buildings in the palace complex
• **Mattancherry Palace Museum (Dutch Palace)** — Stunning Kerala-style murals (17th century) depicting Ramayana scenes, Shiva's cosmic dance, and Krishna legends. Coronation hall with royal portraits, palanquins, and ceremonial dresses of the Kochi rulers
• **Kerala Folklore Museum** — Three-storey museum showcasing 5,000+ artefacts of Kerala's folk culture: tribal masks, temple art, bronze lamps, wood carvings, stone sculptures, and a complete Malabar-style theatre hall reconstructed from a 500-year-old building
• **Indo-Portuguese Museum** — Inside the Bishop's House, Fort Kochi. Displays the Portuguese colonial influence: altar pieces, vestments, silver processional crosses, and paintings from the 16th–18th century
• **Maritime Museum (INS Dronacharya)** — Naval history of the Kochi coast, ship models, and navigational instruments
• **Pepper House — David Hall Art Gallery** — Colonial-era spice warehouses repurposed as contemporary art spaces during and between the Biennale

**Cultural Life:**
• **Kochi-Muziris Biennale** — India's largest contemporary art exhibition (since 2012), held in heritage warehouses of Fort Kochi
• **Kathakali** — Regular performances at venues across Kochi (Kerala Kathakali Centre, Greenix Village)
• **Spice trade heritage** — Kochi's Jew Town and Spice Market still trade in pepper, cardamom, cloves, and cinnamon
• **Kerala cuisine** — Malabar biryani, appam with stew, karimeen pollichathu, puttu-kadala
• **Snake boat races (Vallam Kali)** — Held on the backwaters near Kochi during Onam`,
    textHi: `**कोच्चि — अरब सागर की रानी**

कोच्चि 600+ वर्षों से मसाला व्यापार का बंदरगाह रहा है। पुर्तगाली, डच, ब्रिटिश, अरब, यहूदी और चीनी प्रभावों का अनूठा मिश्रण।

**विरासत:** फोर्ट कोच्चि (चीनी मछली पकड़ने के जाल), मत्तनचेरी पैलेस, पारादेसी सिनेगॉग (1568), सांता क्रूज़ कैथेड्रल
**सांस्कृतिक जीवन:** कोच्चि-मुज़िरिस बिएनाले, कथकली, मसाला व्यापार विरासत, केरल व्यंजन`,
    textTe: `**కొచ్చి — అరేబియన్ సముద్రపు రాణి**

కొచ్చి 600+ సంవత్సరాలుగా సుగంధ ద్రవ్యాల వాణిజ్య ఓడరేవు. ఫోర్ట్ కొచ్చి (చైనీస్ ఫిషింగ్ నెట్స్), మట్టాంచేరి ప్యాలెస్, పారదేసి సినగాగ్ (1568), కొచ్చి-ముజిరిస్ బైనాలే ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**கொச்சி — அரேபியக் கடலின் ராணி**

கொச்சி 600+ ஆண்டுகளாக மசாலா வணிக துறைமுகம். ஃபோர்ட் கொச்சி (சீன மீன்பிடி வலைகள்), மட்டாஞ்சேரி அரண்மனை, பாரடேஸி தொழுகைக்கூடம் (1568), கொச்சி-முசிரிஸ் பியனாலே இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "Indian Culture Portal – Kerala Maritime Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – Kochi Museums", url: "https://museumsofindia.gov.in" },
      { title: "Abhilekh Patal – Colonial-era Kochi Records", url: "https://abhilekh-patal.in" },
    ],
    followUps: ["Tell me about classical dance", "Tell me about festivals", "Tell me about handicrafts"],
  },
  {
    keywords: ["guwahati", "guwahati culture", "guwahati heritage", "assam capital", "kamakhya", "northeast", "northeast india culture"],
    text: `**Guwahati — Gateway to Northeast India**

Guwahati, the largest city of Assam and gateway to the Northeast, sits on the banks of the Brahmaputra River. It is one of the fastest-growing cities in India and the cultural hub of the entire Northeast region.

**Key Heritage Sites:**
• **Kamakhya Temple** — One of 51 Shakti Peethas, atop Nilachal Hill (10th century, rebuilt 17th century). Famous for the annual Ambubachi Mela (tantric fertility festival), attracting millions of pilgrims. Unique beehive-shaped dome (Nilachal-style architecture). No idol — the goddess is worshipped as a yoni (natural rock fissure)
• **Umananda Temple** — Shiva temple on Peacock Island (world's smallest inhabited river island) in the Brahmaputra. Built 1694 by Ahom king Gadadhar Singha. Home to endangered golden langur monkeys
• **Navagraha Temple** — Ancient temple of the nine celestial bodies (planets) on Chitrachal Hill. Believed to be an ancient astronomical observatory. Each shivalinga represents a planet and is draped in coloured cloth
• **Basistha Temple** — Ancient temple complex at the confluence of three streams (Basistha, Sandhya, and Lalita), associated with Sage Vasistha. Set in a forested area with natural rock formations
• **Assam Secretariat (Dispur)** — Modernist government complex, seat of the Assam state government
• **Sukreswar Temple** — 17th-century Shiva temple on Sukreswar Hill overlooking the Brahmaputra. Built by Ahom king Pramatta Singha. Traditionally, funeral rites (shraddha) are performed here
• **Hajo (30 km)** — Sacred to Hindus, Muslims, and Buddhists. **Hayagriva Madhava Temple** (6th century, believed by Buddhists to be where Buddha attained Nirvana), **Poa Mecca Mosque** (17th century, believed to contain soil from Mecca — a quarter of a pilgrimage to Mecca), and **Kedareshwar Temple** (Shiva temple)
• **Madan Kamdev (40 km)** — The "Khajuraho of the Northeast", ruins of 9th–12th century temples with erotic stone carvings from the Pala dynasty. ASI-protected site, 30+ stone ruins spread over a hilltop
• **Saraighat Bridge** — First bridge over the Brahmaputra (1962). Named after the Battle of Saraighat (1671) where Ahom general Lachit Borphukan defeated the Mughal navy
**Museums & Institutions:**
• **Assam State Museum** — One of the most important museums in Northeast India. Collections: Ahom-era royal artefacts (coins, manuscripts, weapons), tribal textiles and ornaments from all NE states, stone and bronze sculptures, epigraphic records, and natural history specimens
• **Srimanta Sankaradeva Kalakshetra** — Premier cultural complex (32 acres) showcasing all eight Northeastern states. Includes: Museum of Assamese culture, a Satra-style Namghar (prayer hall), library of NE manuscripts, open-air theatre, heritage park with replicas of traditional NE homes, and an artisan village with live craft demonstrations
• **Guwahati Planetarium** — Modern planetarium named after the ancient astronomer Varahamihira
• **War Cemetery (Commonwealth War Graves)** — Memorial to soldiers of WWII's Burma Campaign
• **Regional Science Centre** — Interactive exhibits on science and the ecology of the Brahmaputra valley
• **Assam Rajyik State Museum (proposed)** — New state-of-the-art museum under development to showcase Assam's 2,000-year cultural history

**Cultural Life:**
• **Bihu** — Assam's most important festival. Rongali/Bohag Bihu (April), Bhogali/Magh Bihu (Jan), Kongali/Kati Bihu (Oct). Bihu dance with dhol, pepa (buffalo horn), gogona
• **Assamese silk** — Muga silk (golden silk, exclusive to Assam, GI tag), Eri silk, Pat silk
• **Sattriya dance** — Classical dance form (one of 8 recognized by Sangeet Natak Akademi) originating from Assam's Vaishnavite sattras (monasteries), created by Srimanta Sankaradeva in 15th century
• **Northeast cultural diversity** — Guwahati serves as the meeting point for the cultures of 8 NE states: Naga, Mizo, Manipuri, Khasi, Bodo, and other tribal communities
• **Kaziranga connection** — Gateway to Kaziranga National Park (UNESCO), home of the one-horned rhinoceros
• **Jonbeel Mela** — Ancient barter fair, last of its kind in India`,
    textHi: `**गुवाहाटी — पूर्वोत्तर भारत का प्रवेशद्वार**

गुवाहाटी असम का सबसे बड़ा शहर और संपूर्ण पूर्वोत्तर क्षेत्र का सांस्कृतिक केंद्र।

**विरासत:** कामाख्या मंदिर (51 शक्तिपीठों में से एक), उमानंद मंदिर, श्रीमंत शंकरदेव कलाक्षेत्र
**सांस्कृतिक जीवन:** बिहू (असम का प्रमुख त्योहार), मूगा रेशम (जीआई टैग), सत्रिय नृत्य (शास्त्रीय नृत्य), पूर्वोत्तर की 8 राज्यों की विविध संस्कृति`,
    textTe: `**గువాహటి — ఈశాన్య భారతదేశ ద్వారం**

గువాహటి అస్సాం అతిపెద్ద నగరం, ఈశాన్య ప్రాంతం సాంస్కృతిక కేంద్రం. కామాఖ్య ఆలయం, బిహు పండుగ, మూగా పట్టు (GI ట్యాగ్), సత్రియ నృత్యం, 8 ఈశాన్య రాష్ట్రాల వైవిధ్య సంస్కృతి ఇక్కడి ప్రత్యేకతలు.`,
    textTa: `**குவாஹாட்டி — வடகிழக்கு இந்தியாவின் நுழைவாயில்**

குவாஹாட்டி அஸ்ஸாமின் மிகப்பெரிய நகரம், வடகிழக்கு பகுதியின் கலாச்சார மையம். காமாக்யா கோவில், பிஹு விழா, மூகா பட்டு (GI டேக்), சத்ரிய நடனம், 8 வடகிழக்கு மாநிலங்களின் பல்வேறு கலாச்சாரம் இங்கே சிறப்புகள்.`,
    confidence: "High",
    sources: [
      { title: "ASI – Guwahati & NE Monuments", url: "https://asi.nic.in" },
      { title: "Indian Culture Portal – Northeast Heritage", url: "https://indianculture.gov.in" },
      { title: "Museums of India – NE Museums", url: "https://museumsofindia.gov.in" },
      { title: "Gyan Bharatam – NE Knowledge Traditions", url: "https://gyanbharatam.com" },
    ],
    followUps: ["Tell me about classical dance", "Tell me about festivals", "Tell me about handicrafts"],
  },
];

// Fallback response
export const fallbackResponse: KBEntry = {
  keywords: [],
  text: `Thank you for your question. While I don't have a specific pre-indexed answer for this query, here's what I can tell you:

The Ministry of Culture oversees **66+ portals and websites** covering India's vast cultural heritage — from ancient archaeological sites to living art forms.

For the most relevant information, try asking about:
• **Monuments & ASI** — Taj Mahal, Ajanta, Ellora, Red Fort, Konark, Hampi, Khajuraho, ASI ticketing, AMASR Act, conservation
• **Museums** — National Museum, Indian Museum Kolkata, Victoria Memorial, Salar Jung, NGMA, JATAN virtual museum
• **Performing Arts** — Classical dance (Bharatanatyam, Kathak, etc.), Hindustani & Carnatic music
• **Archives** — National Archives, Abhilekh Patal, Mughal farmans, cartographic records, Public Records Act
• **Indian Culture Portal** — Rare books, manuscripts, inscriptions, gazetteers, freedom movement documents
• **Knowledge Systems** — Vedas, Ayurveda, ancient mathematics (Aryabhata, Brahmagupta), astronomy
• **Heritage** — UNESCO sites, intangible cultural heritage, excavations (Rakhigarhi, Dholavira, Lothal)
• **City Heritage** — Delhi, Mumbai, Kolkata, Chennai, Hyderabad, Jaipur, Lucknow, Varanasi, Ahmedabad, Pune, Mysuru, Kochi, Guwahati, and more
• **Schemes** — Fellowships, scholarships, Adopt a Heritage, Swachh Smarak

You can also visit **indianculture.gov.in**, **asi.nic.in**, **museumsofindia.gov.in**, or **nationalarchives.nic.in**.`,
  textHi: `आपके प्रश्न के लिए धन्यवाद। इस विशेष प्रश्न का पूर्व-अनुक्रमित उत्तर उपलब्ध नहीं है।

कृपया इन विषयों पर पूछें: स्मारक, संग्रहालय, शास्त्रीय नृत्य, वेद, अभिलेखागार, सांस्कृतिक योजनाएँ, यूनेस्को विरासत

**indianculture.gov.in** पर जाएँ।`,
  textTe: `ఈ అంశం భారతదేశ సాంస్కృతిక వారసత్వానికి సంబంధించినది. సంస్కృతి మంత్రిత్వ శాఖ 66+ అధికారిక పోర్టల్‌ల ద్వారా భారతదేశ సాంస్కృతిక వనరులను సంరక్షిస్తుంది మరియు ప్రోత్సహిస్తుంది. మరిన్ని వివరాలకు **indianculture.gov.in** సందర్శించండి.`,
  textTa: `இந்த தலைப்பு இந்தியாவின் கலாச்சார பாரம்பரியம் தொடர்பானது. கலாச்சார அமைச்சகம் 66+ அதிகாரப்பூர்வ தளங்கள் மூலம் இந்தியாவின் கலாச்சார வளங்களைப் பாதுகாத்து மேம்படுத்துகிறது. மேலும் விவரங்களுக்கு **indianculture.gov.in** பார்வையிடவும்.`,
  textHinglish: `Aapke sawaal ke liye dhanyavaad. Iska specific pre-indexed jawab abhi available nahi hai, lekin main aapko ye bata sakta hoon:

Sanskriti Mantralay **66+ portals aur websites** maintain karta hai jo India ki cultural heritage cover karte hain.

Aap in topics par puch sakte hain:
• **Smarak & ASI** — Taj Mahal, Ajanta, Ellora, Lal Qila, Konark, Hampi, Khajuraho
• **Sangrahalay** — National Museum, Indian Museum Kolkata, Victoria Memorial, Salar Jung
• **Pradarshan Kala** — Bharatanatyam, Kathak, Hindustani aur Carnatic sangeet
• **Abhilekhagar** — National Archives, Abhilekh Patal, Mughal farmans
• **Vedic Virasat** — 4 Ved, Upanishad, Sanskrit
• **City Heritage** — Delhi, Mumbai, Kolkata, Chennai, Jaipur, Varanasi, etc.
• **Schemes** — Fellowships, scholarships, Adopt a Heritage

Aap **indianculture.gov.in**, **asi.nic.in**, **museumsofindia.gov.in** par bhi visit kar sakte hain.`,
  confidence: "Medium",
  sources: [
    { title: "Ministry of Culture", url: "https://culture.gov.in" },
    { title: "Indian Culture Portal", url: "https://indianculture.gov.in" },
    { title: "ASI", url: "https://asi.nic.in" },
    { title: "Museums of India", url: "https://museumsofindia.gov.in" },
  ],
  followUps: ["Tell me about Ajanta caves", "List museums in India", "What are the Vedas?"],
};

// Smart matcher with fuzzy matching
export function findBestResponse(query: string): KBEntry {
  const lowerQuery = query.toLowerCase().trim();

  // Remove common question words for better matching
  const cleanQuery = lowerQuery
    .replace(/\b(what|where|when|who|how|which|tell|me|about|the|is|are|was|were|do|does|did|can|could|please|show|explain|describe|give|list|of|in|at|to|a|an|and|or|for|from|on|with|this|that|these|those|i|you|it|its|my|your)\b/g, " ")
    .replace(/[?!.,;:'"]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  let bestMatch: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      const lowerKeyword = keyword.toLowerCase();
      // Exact substring match
      if (lowerQuery.includes(lowerKeyword)) {
        score += lowerKeyword.length * (lowerKeyword.includes(" ") ? 3 : 1);
      }
      // Also check cleaned query
      else if (cleanQuery.includes(lowerKeyword)) {
        score += lowerKeyword.length * (lowerKeyword.includes(" ") ? 2 : 0.8);
      }
      // Partial word match (keyword appears as part of a word in query)
      else {
        const queryWords = lowerQuery.split(/\s+/);
        for (const word of queryWords) {
          if (word.length >= 4 && lowerKeyword.length >= 4) {
            // Check if word starts with keyword or keyword starts with word
            if (word.startsWith(lowerKeyword.slice(0, 4)) || lowerKeyword.startsWith(word.slice(0, 4))) {
              score += 2;
            }
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch && bestScore > 0 ? bestMatch : fallbackResponse;
}
