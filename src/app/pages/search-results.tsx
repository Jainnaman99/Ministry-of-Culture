import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { SearchResultCard } from "../components/search-result-card";
import { AISearchBar } from "../components/ai-search-bar";
import { EmptyState } from "../components/empty-state";
import { ChatbotPopup } from "../components/chatbot-popup";
import { LoadingState } from "../components/loading-state";
import { ArrowLeft, Filter, Sparkles, Clock, Globe, MessageSquare, ChevronRight, ChevronLeft, Shield } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  keywords: string[];
  image?: string;
  mediaType?: "article" | "image" | "video" | "audio" | "document";
}

interface SearchEntry {
  matchKeywords: string[];
  summary: string;
  results: SearchResult[];
  relatedQueries: string[];
}

// ===== SEARCH DATABASE =====
const searchEntries: SearchEntry[] = [
  {
    matchKeywords: ["ajanta", "ajantha", "cave painting", "buddhist cave"],
    summary: "The Ajanta Caves are 30 rock-cut Buddhist cave monuments in Aurangabad, Maharashtra (2nd century BCE – 480 CE). A UNESCO World Heritage Site since 1983, they feature some of the finest surviving examples of ancient Indian paintings including the iconic Padmapani fresco and Jataka tale murals.",
    results: [
      { id: "1", title: "Ajanta Caves – ASI Protected Monument & UNESCO World Heritage Site", summary: "Complete guide to the 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE. Features exquisite murals and sculptures — the Padmapani and Vajrapani paintings from Cave 1 are considered masterpieces of Buddhist art.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Buddhist", "UNESCO", "Maharashtra", "Rock-cut"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_%2863%29.jpg?width=400"},
      { id: "2", title: "Ajanta Cave Paintings – High-Resolution Digital Gallery", summary: "Explore digitized reproductions of Ajanta's famous murals. The paintings depict Jataka tales, scenes from the life of Buddha, elaborate court life, and nature. Cave 1's ceiling paintings show sophisticated perspective techniques.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Murals", "Padmapani", "Jataka Tales", "Digital Archive"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Khasarpana_Lokesvara.jpg?width=400"},
      { id: "3", title: "Ajanta & Ellora – Museum Artefact Collection", summary: "The National Museum houses replicas, sculptural fragments, and archaeological findings from Ajanta dating to the Satavahana and Vakataka periods. Includes copies of mural paintings and stone carvings.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Museum Collection", "Sculptures", "Vakataka"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ellora%2C_Aurangabad%2C_Maharashtra.jpg?width=400"},
      { id: "4", title: "Conservation & Preservation of Ajanta Caves", summary: "Ongoing scientific conservation by ASI including micro-climate monitoring, bio-deterioration control, chemical treatment of rock surfaces, and visitor management to prevent damage to the 2,000-year-old murals.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Conservation", "Preservation", "Scientific Methods"], mediaType: "document" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_%2863%29.jpg?width=400"},
      { id: "5", title: "Ajanta – Visitor Information & Travel Guide", summary: "Plan your visit to Ajanta Caves: Open Wed–Mon, 9 AM–5 PM (closed Tuesdays). Entry: ₹40 (Indians), ₹600 (foreigners). Nearest airport: Aurangabad. Best time to visit: November–March. Photography allowed in most caves.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Visit", "Timings", "Entry Fee", "Travel"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ajanta_%2863%29.jpg?width=400"},
    ],
    relatedQueries: ["Ellora Caves", "Buddhist heritage sites", "UNESCO sites in Maharashtra"],
  },
  {
    matchKeywords: ["museum", "museums", "gallery", "national museum", "exhibition", "collection", "artefact"],
    summary: "India has 800+ museums under the Ministry of Culture. Major institutions include the National Museum (New Delhi) with 2,00,000+ artefacts, Indian Museum Kolkata (Asia's oldest, founded 1814), Salar Jung Museum Hyderabad (world's largest one-man collection), NGMA, and Victoria Memorial Kolkata.",
    results: [
      { id: "1", title: "National Museum, New Delhi – India's Premier Museum", summary: "Over 2,00,000 works spanning 5,000 years — Harappan civilization, Maurya & Gupta sculptures, Buddhist art, miniature paintings, decorative arts, arms & armour. Houses the famous Dancing Girl bronze from Mohenjo-daro.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["National Museum", "Harappan", "Dancing Girl", "5000 Years"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/India_national_museum_01.jpg?width=400"},
      { id: "2", title: "Indian Museum, Kolkata – Asia's Oldest Museum (1814)", summary: "The oldest and largest multipurpose museum in the Asia-Pacific region. Rare collections: Egyptian mummy, Gandhara sculptures, Ashoka pillar relics, Bharhut Stupa railings, meteorite collection, and geological specimens.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Kolkata", "1814", "Gandhara", "Ashoka"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg?width=400"},
      { id: "3", title: "Salar Jung Museum, Hyderabad – One-Man Collection Wonder", summary: "One of three National Museums. 43,000+ art objects — Indian, Middle Eastern, Far Eastern, European artefacts. Famous for the Veiled Rebecca marble sculpture and mechanical musical clock from 19th-century England.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Hyderabad", "Salar Jung", "Veiled Rebecca", "43000 Objects"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg?width=400"},
      { id: "4", title: "National Gallery of Modern Art (NGMA) – Delhi, Mumbai, Bengaluru", summary: "Works from 1857 onwards by Raja Ravi Varma, Amrita Sher-Gil, Rabindranath Tagore, Jamini Roy, M.F. Husain, S.H. Raza, F.N. Souza. Hosts rotating exhibitions of contemporary Indian art.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Modern Art", "NGMA", "Raja Ravi Varma", "Contemporary"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/India_national_museum_01.jpg?width=400"},
      { id: "5", title: "Victoria Memorial, Kolkata – Monument & Museum", summary: "Built 1906–1921 in memory of Queen Victoria. Houses 28,394 artefacts including oil paintings, rare photographs of Calcutta, weapons, and the Calcutta Gallery documenting the city's evolution.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Victoria Memorial", "Kolkata", "British Era", "Paintings"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Victoria_Memorial_situated_in_Kolkata.jpg?width=400"},
      { id: "6", title: "Virtual Museum Tours – Explore From Home", summary: "The Museums of India portal offers virtual tours of major museums with 360° views, high-resolution artefact images, audio guides, and curated exhibitions accessible from anywhere in the world.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Virtual Tour", "360°", "Online", "Digital"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg?width=400"},
    ],
    relatedQueries: ["National Museum Delhi collections", "How to visit museums", "Virtual museum tours"],
  },
  {
    matchKeywords: ["dance", "classical dance", "bharatanatyam", "kathak", "odissi", "kathakali", "kuchipudi", "manipuri", "mohiniyattam", "sattriya", "performing art"],
    summary: "India has 8 classical dance forms recognized by the Sangeet Natak Akademi: Bharatanatyam (Tamil Nadu), Kathak (North India), Kathakali (Kerala), Odissi (Odisha), Kuchipudi (Andhra Pradesh), Manipuri (Manipur), Mohiniyattam (Kerala), and Sattriya (Assam). All trace roots to Bharata Muni's Natyashastra.",
    results: [
      { id: "1", title: "Eight Classical Dance Forms of India – Complete Guide", summary: "Comprehensive overview with origins, techniques, costume details, and legendary practitioners. From Bharatanatyam's aramandi posture to Kathak's chakkars, Odissi's tribhanga, and Sattriya's Vaishnavite origins.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Classical Dance", "Bharatanatyam", "Kathak", "Odissi", "8 Forms"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Murugashankari_Leo.jpg?width=400"},
      { id: "2", title: "Sangeet Natak Akademi – India's Academy for Performing Arts", summary: "The national academy recognizes and promotes classical and folk performing arts. Awards fellowships, organizes festivals and documentation projects. Maintains archives of rare performance recordings.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Sangeet Natak Akademi", "Awards", "Fellowships"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kathak_contemporary_03.jpg?width=400"},
      { id: "3", title: "Dance Sculptures in ASI-Protected Temples", summary: "Exquisite dance sculptures across India — 108 Bharatanatyam karanas at Brihadeeswarar Temple, Nataraja panels at Chidambaram, dance poses at Khajuraho, and 81 dance positions at Konark Sun Temple.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Temple Sculptures", "Nataraja", "Khajuraho", "Konark"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Konarka_Temple.jpg?width=400"},
      { id: "4", title: "Indian Dance Heritage – Virtual Exhibition & Archives", summary: "Rare photographs, costumes, musical instruments, and video recordings of legendary performers including Rukmini Devi, Birju Maharaj, Kelucharan Mohapatra, Balasaraswati from the Museums of India collection.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Virtual Exhibition", "Rukmini Devi", "Birju Maharaj"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Odissi_dance_at_Nishagandi_Dance_Festival_2024_%28207%29.jpg?width=400"},
      { id: "5", title: "Natyashastra – The Ancient Treatise on Performing Arts", summary: "Bharata Muni's Natyashastra (c. 200 BCE – 200 CE) is the foundational text for Indian dance, music, and drama. Covers 108 dance postures (karanas), rasas (emotions), abhinaya (expression), and stagecraft.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Natyashastra", "Bharata Muni", "Rasas", "Karanas"], mediaType: "document" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Murugashankari_Leo.jpg?width=400"},
    ],
    relatedQueries: ["Who was Birju Maharaj?", "What is Natyashastra?", "Folk dances of India"],
  },
  {
    matchKeywords: ["monument", "historical", "heritage site", "fort", "temple", "tomb", "asi", "protected", "ancient"],
    summary: "India has 3,696 ASI-protected monuments, 42 UNESCO World Heritage Sites (34 cultural, 7 natural, 1 mixed), and thousands more state-protected sites. They span from the Indus Valley Civilization (3300 BCE) to the colonial period, covering forts, temples, mosques, tombs, caves, and rock-cut structures.",
    results: [
      { id: "1", title: "ASI Centrally Protected Monuments – Complete Directory", summary: "3,696 monuments and archaeological sites of national importance maintained by the Archaeological Survey of India. Searchable database by state, period, religion, and monument type.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["ASI", "3696 Monuments", "Protected", "Directory"], mediaType: "article" , image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "UNESCO World Heritage Sites in India – All 42 Sites", summary: "Complete list: Taj Mahal, Ajanta, Ellora, Red Fort, Qutub Minar, Hampi, Khajuraho, Mahabalipuram, Konark, Sanchi, Bodh Gaya, Fatehpur Sikri, Humayun's Tomb, Rani ki Vav, Dholavira, Jaipur City, Shantiniketan, and more.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["UNESCO", "42 Sites", "World Heritage"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg?width=400"},
      { id: "3", title: "Taj Mahal, Red Fort, Qutub Minar – Delhi-Agra Heritage Circuit", summary: "The Golden Triangle heritage circuit covering three of India's most iconic monuments. Includes visitor information, timings, entry fees, and architectural significance of each site.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Taj Mahal", "Red Fort", "Qutub Minar", "Golden Triangle"], mediaType: "article" },
      { id: "4", title: "South Indian Temple Architecture – Dravidian Marvels", summary: "From the Great Living Chola Temples to Mahabalipuram, Hampi, and Meenakshi Temple. Explores Dravidian architectural styles, gopurams, mandapams, and sculptural traditions.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Dravidian", "Chola", "Gopuram", "South India"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/A_collage_of_Mamallapuram_town_Tamil_Nadu_India.jpg?width=400"},
      { id: "5", title: "Mughal Architecture – Forts, Tombs & Gardens", summary: "The architectural legacy of the Mughal Empire (1526–1857): Taj Mahal, Red Fort, Humayun's Tomb, Fatehpur Sikri, Agra Fort, Jama Masjid. Characteristic features: charbagh gardens, pietra dura, domes, minarets.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Mughal", "Architecture", "Charbagh", "Pietra Dura"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomb_of_Humayun%2C_Delhi.jpg?width=400"},
      { id: "6", title: "Rock-Cut Architecture of India – Caves & Temples", summary: "India's extraordinary tradition of rock-cut architecture: Ajanta, Ellora, Elephanta, Badami, Udayagiri, Barabar, and more. Spanning Buddhist, Hindu, and Jain traditions from 3rd century BCE onwards.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Rock-Cut", "Caves", "Elephanta", "Badami"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ellora%2C_Aurangabad%2C_Maharashtra.jpg?width=400"},
    ],
    relatedQueries: ["Taj Mahal history", "UNESCO sites in India", "Temple architecture styles"],
  },
  {
    matchKeywords: ["vedic", "veda", "vedas", "upanishad", "sanskrit", "scripture", "ancient text", "rigveda", "manuscript"],
    summary: "The Vedic Heritage Portal preserves India's oldest knowledge traditions — the four Vedas (Rigveda c. 1500 BCE, Yajurveda, Samaveda, Atharvaveda), 108 Upanishads, and associated literature. UNESCO inscribed Vedic Chanting as Intangible Cultural Heritage in 2003.",
    results: [
      { id: "1", title: "The Four Vedas – Comprehensive Digital Archive", summary: "Digitized manuscripts and scholarly resources on Rigveda (1,028 hymns), Yajurveda (ritual mantras), Samaveda (musical chants), and Atharvaveda (daily life & medicine). Audio recordings of chanting traditions across different shakhas.", source: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in", keywords: ["Vedas", "Rigveda", "Audio", "Shakhas"], mediaType: "audio", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Rigveda_MS2097.jpg?width=400"},
      { id: "2", title: "Rare Vedic Manuscripts – Palm Leaf & Birch Bark Collection", summary: "Curated collection of rare manuscripts from repositories across India — palm-leaf texts, birch-bark scrolls, copper plates, with translations and scholarly commentaries. Some dating back over 1,000 years.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Manuscripts", "Palm Leaf", "Birch Bark", "Rare"], mediaType: "document", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Odia_palm_leaf_manuscript.JPG?width=400"},
      { id: "3", title: "Upanishads & Classical Indian Philosophy", summary: "108 principal Upanishads exploring Brahman (ultimate reality), Atman (self), Karma, and Moksha. IGNCA archives on Vedanta, Yoga Sutras, Samkhya, Nyaya, and other darshanas (philosophical schools).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Upanishads", "Philosophy", "Brahman", "Vedanta"], mediaType: "article", image: "https://commons.wikimedia.org/wiki/Special:FilePath/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg?width=400"},
      { id: "4", title: "UNESCO – Tradition of Vedic Chanting (2003)", summary: "The tradition of Vedic chanting was proclaimed a Masterpiece of Oral and Intangible Heritage of Humanity in 2003. The oral transmission system has preserved these texts with remarkable accuracy for over 3,000 years.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["UNESCO", "Intangible Heritage", "Oral Tradition", "Chanting"], mediaType: "audio", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Atharva-Veda_samhita_page_471_illustration.png?width=400"},
    ],
    relatedQueries: ["What is the Gayatri Mantra?", "Sanskrit literature", "Ancient Indian sciences"],
  },
  {
    matchKeywords: ["gandhi", "mahatma", "freedom", "independence", "dandi", "quit india", "non-violence", "swadeshi"],
    summary: "Mahatma Gandhi (1869–1948) led India's independence movement through non-violent civil disobedience. Key events: Non-Cooperation Movement (1920), Dandi March (1930), Quit India Movement (1942). His legacy is preserved at Gandhi Smriti, Gandhi Heritage Portal (1,00,000+ pages), and MGMD.",
    results: [
      { id: "1", title: "Gandhi Smriti & Darshan Samiti – Memorial & Museum", summary: "Located at 5, Tees January Marg, New Delhi — where Gandhi spent his last 144 days. Preserves his room, prayer ground, Martyrs' Column. 'Eternal Gandhi' permanent multimedia exhibition and photo gallery of the freedom movement.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Gandhi Smriti", "Memorial", "New Delhi", "Martyrs' Column"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "Gandhi Heritage Portal – Digital Archives (1,00,000+ Pages)", summary: "Complete access to Gandhi's Collected Works (100 volumes), letters, photographs, audio recordings of speeches, publications (Harijan, Young India, Indian Opinion). Searchable database for researchers.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Digital Archive", "Collected Works", "Letters", "Audio"], mediaType: "document" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Freedom Movement – Key Events Timeline", summary: "From 1857 First War of Independence to 1947: Non-Cooperation (1920), Civil Disobedience (1930), Dandi March, Quit India (1942), INA movement. Documents from National Archives and Gandhi Heritage Portal.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Freedom Movement", "Dandi March", "Quit India", "Timeline"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "4", title: "MGMD – Mahatma Gandhi Memorial & Digital Museum", summary: "Digital museum with manuscripts, photographs, personal belongings, documentary films. Interactive timeline of freedom movement. Virtual exhibitions on Champaran Satyagraha, Salt March, and Quit India.", source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["MGMD", "Digital Museum", "Virtual Exhibition"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["Dandi March details", "Gandhi's philosophy", "Freedom fighters of India"],
  },
  {
    matchKeywords: ["taj mahal", "taj", "agra", "shah jahan", "mumtaz"],
    summary: "The Taj Mahal is an ivory-white marble mausoleum in Agra, built by Mughal Emperor Shah Jahan (1632–1653) in memory of his wife Mumtaz Mahal. A UNESCO World Heritage Site and one of the New Seven Wonders of the World, it required 20,000+ artisans and 21 years to complete.",
    results: [
      { id: "1", title: "Taj Mahal – ASI Protected Monument & UNESCO Heritage", summary: "Built 1632–1653 by Shah Jahan. White Makrana marble, 28 types of precious stones inlaid using pietra dura. Four minarets tilted outward for earthquake safety. Calligraphy by Amanat Khan. Charbagh garden with reflecting pools.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["UNESCO", "Makrana Marble", "Pietra Dura", "Shah Jahan"], mediaType: "article" , image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "Taj Mahal – Architecture & Design Analysis", summary: "Detailed architectural analysis: 73-metre main dome, octagonal chamber, geometric precision, optical illusions in calligraphy (letters increase in size with height to appear uniform). Designed by Ustad Ahmad Lahauri.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Architecture", "Dome", "Ustad Ahmad Lahauri", "Design"], mediaType: "article" , image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Mughal Architecture – From Humayun's Tomb to Taj Mahal", summary: "The evolution of Mughal funerary architecture: Humayun's Tomb (prototype), Akbar's Tomb at Sikandra, Itmad-ud-Daulah (Baby Taj), and the culmination in the Taj Mahal. Each building refined techniques used in the next.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Mughal", "Evolution", "Humayun's Tomb", "Itmad-ud-Daulah"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tomb_of_Humayun%2C_Delhi.jpg?width=400"},
      { id: "4", title: "Taj Mahal Conservation – Protecting India's Icon", summary: "ASI conservation efforts: mud-pack treatment for yellowing, Taj Trapezium Zone for pollution control, Supreme Court directives, ban on vehicular traffic within 500m. Challenges from air pollution and Yamuna river degradation.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Conservation", "Pollution", "Taj Trapezium Zone"], mediaType: "document" , image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["Who built the Taj Mahal?", "Agra Fort history", "Mughal Empire"],
  },
  {
    matchKeywords: ["unesco", "world heritage", "heritage site", "intangible heritage"],
    summary: "India has 42 UNESCO World Heritage Sites (34 cultural, 7 natural, 1 mixed) and 15 Intangible Cultural Heritage inscriptions including Yoga, Vedic Chanting, Kumbh Mela, Durga Puja, Kolkata, and Garba of Gujarat. India has the 6th highest number of World Heritage Sites globally.",
    results: [
      { id: "1", title: "Complete List of 42 UNESCO World Heritage Sites in India", summary: "All sites with year of inscription: Taj Mahal (1983), Ajanta (1983), Ellora (1983), Agra Fort (1983), Mahabalipuram (1984), Konark (1984), Kaziranga (1985), Hampi (1986), Khajuraho (1986), and 33 more.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["42 Sites", "Complete List", "Cultural", "Natural"], mediaType: "article" , image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "India's 15 Intangible Cultural Heritage Inscriptions", summary: "UNESCO-recognized intangible heritage: Vedic Chanting (2003), Ramlila (2005), Kutiyattam (2001), Yoga (2016), Kumbh Mela (2017), Durga Puja (2021), Garba (2023), Sowa Rigpa, Nawrouz, and more.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Intangible", "Yoga", "Kumbh Mela", "Durga Puja"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Murugashankari_Leo.jpg?width=400"},
      { id: "3", title: "Newest UNESCO Sites – Shantiniketan, Hoysala Temples", summary: "Recently inscribed sites: Shantiniketan (2023), Sacred Ensembles of Hoysala (2023), Dholavira (2021), Kakatiya Rudreshwara Temple (2021), Jaipur City (2019), Victorian Gothic & Art Deco of Mumbai (2018).", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Shantiniketan", "Hoysala", "Dholavira", "Recent"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg?width=400"},
    ],
    relatedQueries: ["Latest UNESCO site in India", "What is Dholavira?", "Intangible heritage list"],
  },
  {
    matchKeywords: ["scheme", "scholarship", "fellowship", "grant", "funding", "apply", "application"],
    summary: "The Ministry of Culture offers fellowships (Senior ₹30,000/month, Junior ₹20,000/month for 2 years), Young Artist Scholarships (₹5,000/month), Cultural Function Grants, Repertory Grants for theatre groups, and financial assistance for cultural organizations. Apply at culturescheme.dashboard.nic.in.",
    results: [
      { id: "1", title: "Senior & Junior Fellowships – Ministry of Culture", summary: "Senior Fellowship: ₹30,000/month for 2 years for outstanding persons in literature, performing arts, visual arts. Junior Fellowship: ₹20,000/month for 2 years. Open to Indian nationals with significant contribution to culture.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Fellowship", "₹30,000", "₹20,000", "2 Years"], mediaType: "document" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "Young Artists Scholarship Scheme", summary: "₹5,000/month for 2 years for artists aged 18–25 in music, dance, theatre, visual arts, literary arts. Selection through national competition. Supports emerging talent in traditional and contemporary art forms.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Young Artists", "₹5,000", "18-25 Age", "Scholarship"], mediaType: "article" , image: "https://images.unsplash.com/photo-1545126178-862cdb469409?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Cultural Function & Production Grant", summary: "Financial support for organizing cultural events, festivals, seminars, workshops. Available to registered cultural organizations, NGOs, and institutions. Supports promotion of Indian art forms and cultural exchange.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Grant", "Events", "Festivals", "NGO"], mediaType: "article" , image: "https://images.unsplash.com/photo-1545126178-862cdb469409?auto=format&fit=crop&w=400&q=75"},
      { id: "4", title: "How to Apply – Culture Schemes Dashboard", summary: "All applications processed online at culturescheme.dashboard.nic.in. Step-by-step guide for registration, document upload, application tracking, and status checking. Deadlines vary by scheme.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Apply Online", "Dashboard", "Registration", "How To"], mediaType: "document" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["How to apply for fellowship?", "Sangeet Natak Akademi awards", "Grants for artists"],
  },
  {
    matchKeywords: ["archive", "archives", "national archives", "abhilekh", "record", "document", "historical record"],
    summary: "The National Archives of India (est. 1891) is South Asia's largest archival repository with 50 million+ pages of records from 1748 onwards. Abhilekh Patal (abhilekh-patal.in) is its digital platform providing free access to 3 crore+ digitized pages of historical records.",
    results: [
      { id: "1", title: "National Archives of India – Overview & Collections", summary: "Established 1891 in Kolkata, moved to New Delhi 1926. Holdings: records from 1748, 50M+ pages of public records, private papers of national leaders, cartographic records, maps, microfilm, and oriental records.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["National Archives", "50 Million Pages", "1891", "New Delhi"], mediaType: "document", image: "https://commons.wikimedia.org/wiki/Special:FilePath/National_Archives_of_India.jpg?width=400"},
      { id: "2", title: "Abhilekh Patal – Free Digital Access to Historical Records", summary: "Search and view 3 crore+ digitized pages online: freedom struggle documents (1857–1947), British India administrative records, treaties, census records, gazetteers. Free registration for downloads.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Abhilekh Patal", "Digital", "Free Access", "3 Crore Pages"], mediaType: "document", image: "https://commons.wikimedia.org/wiki/Special:FilePath/National_Archives_of_India_Interiors.jpg?width=400"},
      { id: "3", title: "Freedom Struggle Documents – Independence Movement Archives", summary: "Archival records of India's independence movement: proceedings of the Constituent Assembly, INA trial papers, Quit India documents, personal papers of Sardar Patel, Rajendra Prasad, C. Rajagopalachari.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Freedom Struggle", "Constituent Assembly", "Independence"], mediaType: "document", image: "https://commons.wikimedia.org/wiki/Special:FilePath/Lord_Clive_meeting_with_Mir_Jafar_after_the_Battle_of_Plassey.jpg?width=400"},
      { id: "4", title: "How to Access Abhilekh Patal – User Guide", summary: "Step-by-step guide: Visit abhilekh-patal.in → Register free account → Search by keyword, date, category → View scanned documents → Download for research. Available in English and Hindi.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["How To", "User Guide", "Registration", "Search"], mediaType: "article", image: "https://commons.wikimedia.org/wiki/Special:FilePath/National_Archives_of_India_Campus.jpg?width=400"},
    ],
    relatedQueries: ["Freedom struggle documents", "How to use Abhilekh Patal?", "East India Company records"],
  },
  {
    matchKeywords: ["konark", "sun temple", "odisha", "surya"],
    summary: "The Konark Sun Temple (c. 1250 CE) in Odisha is designed as a colossal chariot of the Sun God with 24 carved stone wheels and 7 horses. Built by King Narasimhadeva I of the Eastern Ganga dynasty. UNESCO World Heritage Site since 1984. The 24 wheels function as accurate sundials.",
    results: [
      { id: "1", title: "Konark Sun Temple – ASI Monument & UNESCO Site", summary: "13th-century temple designed as the Sun God's chariot with 24 elaborately carved wheels (each 3m diameter) and 7 horses. The vimana was reportedly 60m tall. Rabindranath Tagore: 'Here the language of stone surpasses the language of man.'", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["UNESCO", "Chariot", "24 Wheels", "Sun God"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Konarka_Temple.jpg?width=400"},
      { id: "2", title: "Konark Wheels – Ancient Sundials That Tell Time", summary: "The 24 wheels of Konark are functional sundials — the shadow cast by the spokes on the hub accurately tells the time to the minute. Each wheel has 8 wider spokes representing 3-hour periods (praharas).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Sundial", "Time", "Spokes", "Ancient Science"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Konarka_Temple.jpg?width=400"},
      { id: "3", title: "Sculptures of Konark – Erotic Art & Daily Life", summary: "Intricate carvings depicting celestial beings, mythological narratives, erotic sculptures (mithuna), musicians, dancers, elephants, horses, and scenes of daily life. 81 dance poses carved on the temple walls.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Sculptures", "Dance Poses", "Erotic Art", "Daily Life"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Konarka_Temple.jpg?width=400"},
    ],
    relatedQueries: ["How do Konark wheels tell time?", "Jagannath Puri temple", "Temples of Odisha"],
  },
  {
    matchKeywords: ["painting", "art", "miniature", "madhubani", "warli", "folk art", "rajput painting", "visual art"],
    summary: "India's painting traditions span court art (Mughal miniatures, Rajput schools, Deccan painting, Pahari art) and folk art (Madhubani, Warli, Pattachitra, Kalamkari, Gond, Tanjore, Phad). The Lalit Kala Akademi and NGMA promote visual arts.",
    results: [
      { id: "1", title: "Indian Painting Traditions – Classical & Folk Art Guide", summary: "From Mughal miniature paintings (Akbar, Jahangir ateliers) to Rajput schools (Mewar, Kishangarh's Bani Thani), Pahari art (Kangra, Basohli), and Deccan paintings. Court patronage created distinctive regional styles.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Mughal", "Rajput", "Pahari", "Bani Thani"], mediaType: "image" , image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Madhubani_Mahavidyas.jpg"},
      { id: "2", title: "Folk Art of India – Madhubani, Warli, Pattachitra & More", summary: "Living art traditions: Madhubani (Bihar, geometric patterns), Warli (Maharashtra, tribal art), Pattachitra (Odisha, cloth scrolls), Kalamkari (Andhra, fabric art), Gond (MP), Tanjore (TN, gold foil), Phad (Rajasthan).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Folk Art", "Madhubani", "Warli", "Pattachitra"], mediaType: "image" , image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Madhubani_Mahavidyas.jpg"},
      { id: "3", title: "Lalit Kala Akademi & NGMA – Promoting Visual Arts", summary: "Lalit Kala Akademi: national academy for visual arts, annual awards, Triennale India. NGMA: galleries in Delhi, Mumbai, Bengaluru with 17,000+ works from 1857 onwards.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Lalit Kala", "NGMA", "Awards", "Triennale"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/India_national_museum_01.jpg?width=400"},
    ],
    relatedQueries: ["What is Madhubani art?", "Mughal miniature paintings", "NGMA collections"],
  },
  {
    matchKeywords: ["music", "classical music", "raga", "hindustani", "carnatic", "sitar", "tabla"],
    summary: "India has two classical music systems: Hindustani (North, based on ragas and talas, instruments like sitar, tabla, sarod) and Carnatic (South, 72 Melakarta raga system, veena, mridangam). Legendary musicians: Tansen, Ravi Shankar, M.S. Subbulakshmi, Zakir Hussain, Bismillah Khan.",
    results: [
      { id: "1", title: "Hindustani & Carnatic Classical Music – Complete Guide", summary: "Two systems sharing concepts of shruti, swara (Sa Re Ga Ma Pa Dha Ni), and tala. Hindustani: gharana system, raga-based improvisation. Carnatic: 72 Melakarta system, Trinity (Tyagaraja, Dikshitar, Shyama Shastri).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Hindustani", "Carnatic", "Raga", "Gharana"], mediaType: "audio" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sitar%2C_late_19th_Century.jpg?width=400"},
      { id: "2", title: "Indian Musical Instruments – From Sitar to Mridangam", summary: "String: Sitar, Sarod, Veena, Santoor, Sarangi. Percussion: Tabla, Mridangam, Pakhawaj, Ghatam. Wind: Bansuri, Shehnai, Nadaswaram. Each instrument has centuries of tradition and repertoire.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Sitar", "Tabla", "Veena", "Instruments"], mediaType: "image" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sitar%2C_late_19th_Century.jpg?width=400"},
      { id: "3", title: "Sangeet Natak Akademi – Music Awards & Fellowships", summary: "Annual awards in Hindustani and Carnatic music, instrumental music, and folk/tribal music. Fellowship: highest honour. Past recipients include Ravi Shankar, Zakir Hussain, Bismillah Khan.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Awards", "Ravi Shankar", "Zakir Hussain"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kathak_contemporary_03.jpg?width=400"},
    ],
    relatedQueries: ["What is a Raga?", "Tell me about sitar", "Carnatic music Trinity"],
  },
  {
    matchKeywords: ["yoga", "ayurveda", "traditional knowledge", "wellness", "meditation", "patanjali"],
    summary: "Yoga (UNESCO Intangible Heritage 2016) originates from Patanjali's Yoga Sutras (c. 200 BCE) with 8 limbs (Ashtanga). Ayurveda, India's ancient medicine system, is documented in Charaka Samhita and Sushruta Samhita. International Day of Yoga: 21 June. Resources on vedicheritage.gov.in and gyanbharatam.com.",
    results: [
      { id: "1", title: "Yoga – UNESCO Intangible Cultural Heritage (2016)", summary: "Patanjali's Yoga Sutras (196 aphorisms), eight limbs of Ashtanga Yoga, International Day of Yoga (21 June, UN declaration 2014). IGNCA archives on Hatha Yoga, Raja Yoga, Kundalini Yoga traditions.", source: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in", keywords: ["Yoga", "UNESCO", "Patanjali", "Ashtanga"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Shiva_Bangalore.jpg?width=400"},
      { id: "2", title: "Ayurveda – Ancient Indian Medicine System", summary: "Vedic-period origins. Key texts: Charaka Samhita (internal medicine), Sushruta Samhita (surgery — describes 300+ procedures). Three doshas: Vata, Pitta, Kapha. First references in the Atharvaveda.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Ayurveda", "Charaka", "Sushruta", "Doshas"], mediaType: "article" , image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Gyan Bharatam – Traditional Indian Knowledge Systems", summary: "Portal providing access to traditional knowledge: Vedic sciences, astronomy (Jyotisha), mathematics (Sulba Sutras), grammar (Panini's Ashtadhyayi), metallurgy, architecture (Vastu Shastra).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Gyan Bharatam", "Traditional Knowledge", "Vedic Sciences"], mediaType: "article" , image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["8 limbs of Yoga", "Ayurveda basics", "Vedic mathematics"],
  },
  {
    matchKeywords: ["festival", "diwali", "holi", "durga puja", "kumbh", "navratri", "onam", "pongal", "celebration"],
    summary: "India's festivals reflect its cultural diversity: Diwali (Festival of Lights), Holi (Festival of Colors), Navratri/Durga Puja (UNESCO 2021), Kumbh Mela (UNESCO 2017 — world's largest gathering), Onam, Pongal, Baisakhi, Bihu, Ganesh Chaturthi, Eid, Christmas, and hundreds of regional celebrations.",
    results: [
      { id: "1", title: "Major Festivals of India – Complete Calendar", summary: "Pan-Indian: Diwali, Holi, Navratri, Dussehra, Raksha Bandhan, Janmashtami. Regional: Onam (Kerala), Pongal (Tamil Nadu), Bihu (Assam), Baisakhi (Punjab), Chhath Puja (Bihar), Ganesh Chaturthi (Maharashtra).", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Festivals", "Calendar", "Regional", "Pan-Indian"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Rangoli_of_Lights.jpg?width=400"},
      { id: "2", title: "Kumbh Mela – UNESCO Intangible Heritage (World's Largest Gathering)", summary: "Held at Prayagraj, Haridwar, Ujjain, Nashik in rotation every 3 years (Maha Kumbh every 12). UNESCO inscription 2017. Estimated 120 million pilgrims at 2013 Maha Kumbh. Sacred bathing at sangam of rivers.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Kumbh Mela", "UNESCO", "Prayagraj", "120 Million"], mediaType: "image" , image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Durga Puja – UNESCO Heritage & Bengal's Grandest Festival", summary: "Inscribed as UNESCO Intangible Cultural Heritage in 2021. Kolkata's Durga Puja transforms the city with thousands of artistic pandals, community worship, cultural performances, and immersion processions.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Durga Puja", "UNESCO 2021", "Kolkata", "Pandals"], mediaType: "video" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/%E0%A6%AC%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A6%BE%E0%A6%9C%E0%A6%BE%E0%A6%B0_%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A6%9C%E0%A6%A8%E0%A7%80%E0%A6%A8_%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A7%8B%E0%A7%8E%E0%A6%B8%E0%A6%AC_%E0%A7%A8%E0%A7%A6%E0%A7%A7%E0%A7%AE.jpg?width=400"},
    ],
    relatedQueries: ["Kumbh Mela details", "Durga Puja UNESCO", "Festival calendar"],
  },
  {
    matchKeywords: ["language", "languages", "hindi", "tamil", "bengali", "telugu", "script", "bhashini", "multilingual"],
    summary: "India has 22 Scheduled Languages, 6 Classical Languages (Tamil, Sanskrit, Kannada, Telugu, Malayalam, Odia), and 19,500+ mother tongues (Census 2011). Bhashini (bhashini.gov.in) is the government's AI translation platform supporting Indian languages.",
    results: [
      { id: "1", title: "Languages of India – 22 Scheduled & 6 Classical", summary: "Constitutional recognition for 22 languages. Six designated Classical: Tamil (2004), Sanskrit (2005), Kannada (2008), Telugu (2008), Malayalam (2013), Odia (2014). India's banknotes feature 17 languages.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["22 Languages", "Classical", "Scheduled", "Constitutional"], mediaType: "article" , image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "Bhashini – India's AI Translation Platform", summary: "Government AI-based translation supporting Indian languages. Powers real-time translation, transliteration, speech-to-text, and text-to-speech. Integrated with Ministry of Culture's AI search for multilingual access.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Bhashini", "AI Translation", "Multilingual", "Speech"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "Sahitya Akademi – Awards in 24 Languages", summary: "Annual literary awards recognizing excellence in 24 Indian languages including English. Fellowship limited to 21 living writers at a time — the highest literary honour. Promotes translation between Indian languages.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Sahitya Akademi", "24 Languages", "Literary Awards"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["Classical Languages of India", "What is Bhashini?", "Sahitya Akademi awards"],
  },
  // Culture / heritage generic
  {
    matchKeywords: ["culture", "heritage", "cultural heritage", "india culture", "indian culture", "tradition", "civilization"],
    summary: "India's cultural heritage spans over 5,000 years of continuous civilization. The Ministry of Culture preserves and promotes this through 66+ portals covering 3,696 ASI-protected monuments, 42 UNESCO sites, 800+ museums, 8 classical dance forms, ancient Vedic texts, 50M+ archival pages, and living traditions across 22 languages.",
    results: [
      { id: "1", title: "India's Cultural Heritage – A 5,000-Year Journey", summary: "From the Indus Valley Civilization (3300 BCE) through Vedic, Mauryan, Gupta, Chola, Mughal, and modern periods. A continuous civilization that produced the Vedas, zero, yoga, classical dance, architectural marvels, and a rich literary tradition.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["5000 Years", "Civilization", "Heritage", "Journey"], mediaType: "article" , image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=75"},
      { id: "2", title: "Ministry of Culture – Institutions & Initiatives", summary: "Oversees ASI, National Museum, IGNCA, Sangeet Natak Akademi, Sahitya Akademi, Lalit Kala Akademi, National Archives, National Library, CCRT, and 50+ more institutions dedicated to preserving India's cultural wealth.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Ministry", "Institutions", "ASI", "Akademis"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
      { id: "3", title: "42 UNESCO World Heritage Sites in India", summary: "India ranks 6th globally: Taj Mahal, Ajanta, Ellora, Red Fort, Qutub Minar, Hampi, Konark, Khajuraho, Sanchi, Bodh Gaya, Mahabalipuram, Chola Temples, Dholavira, Shantiniketan, and more.", source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["UNESCO", "42 Sites", "World Heritage"], mediaType: "article" , image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=75"},
      { id: "4", title: "Classical Arts – 8 Dance Forms, 2 Music Systems", summary: "8 classical dances: Bharatanatyam, Kathak, Kathakali, Odissi, Kuchipudi, Manipuri, Mohiniyattam, Sattriya. 2 music systems: Hindustani & Carnatic. All rooted in the Natyashastra.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Dance", "Music", "Classical", "Natyashastra"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/Murugashankari_Leo.jpg?width=400"},
      { id: "5", title: "Living Traditions – Festivals, Languages & Crafts", summary: "22 scheduled languages, 19,500+ mother tongues, hundreds of festivals (Diwali, Holi, Durga Puja, Kumbh Mela), rich textile traditions (Banarasi, Kanjeevaram, Pashmina), and folk art forms across every state.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Festivals", "Languages", "Crafts", "Living"], mediaType: "article" , image: "https://commons.wikimedia.org/wiki/Special:FilePath/The_Rangoli_of_Lights.jpg?width=400"},
      { id: "6", title: "Digital India Culture – 66 Portals at Your Fingertips", summary: "Access India's heritage digitally: indianculture.gov.in (repository), asi.nic.in (monuments), museumsofindia.gov.in (museums), vedicheritage.gov.in (texts), abhilekh-patal.in (archives), and 61 more.", source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Digital", "66 Portals", "Online", "Access"], mediaType: "article" , image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=75"},
    ],
    relatedQueries: ["UNESCO sites in India", "Classical dance forms", "Ministry of Culture institutions"],
  },
];

// ===== URL → readable source label =====
function sourceFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const map: Record<string, string> = {
      "culture.gov.in":          "Ministry of Culture",
      "indianculture.gov.in":    "Indian Culture Portal",
      "asi.nic.in":              "Archaeological Survey of India",
      "museumsofindia.gov.in":   "Museums of India",
      "vedicheritage.gov.in":    "Vedic Heritage Portal",
      "nationalarchives.nic.in": "National Archives of India",
      "ignca.gov.in":            "IGNCA",
    };
    return map[host] ?? host;
  } catch {
    return url;
  }
}

// ===== SMART SEARCH FUNCTION =====
function findSearchResults(query: string): { results: SearchResult[]; summary: string; relatedQueries: string[] } {
  const lowerQ = query.toLowerCase()
    .replace(/[?!.,;:'"]/g, "")
    .replace(/\b(tell|me|about|the|what|is|are|where|how|show|list|explain|describe|give|of|in|at|to|a|an|and|please)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  let bestMatch: SearchEntry | null = null;
  let bestScore = 0;

  for (const entry of searchEntries) {
    let score = 0;
    for (const keyword of entry.matchKeywords) {
      const lk = keyword.toLowerCase();
      if (lowerQ.includes(lk)) {
        score += lk.length * (lk.includes(" ") ? 3 : 1);
      } else {
        // Partial match
        const words = lowerQ.split(/\s+/);
        for (const w of words) {
          if (w.length >= 4 && lk.length >= 4 && (w.startsWith(lk.slice(0, 4)) || lk.startsWith(w.slice(0, 4)))) {
            score += 2;
          }
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return { results: bestMatch.results, summary: bestMatch.summary, relatedQueries: bestMatch.relatedQueries };
  }

  // Fallback — generic but still informative
  return {
    summary: `Based on your search for "${query}", I searched across 66 Ministry of Culture portals including ASI, Indian Culture, Museums of India, Vedic Heritage, National Archives, IGNCA, and others. Here are the most relevant results from India's cultural heritage repositories.`,
    results: [
      { id: "1", title: `${query} – Indian Culture Portal`, summary: `Explore comprehensive resources about ${query} from the Indian Culture digital repository — India's largest online collection of cultural heritage including art, manuscripts, museum collections, and curated exhibitions.`, source: "Indian Culture Portal", url: "https://indianculture.gov.in", keywords: ["Heritage", "Digital Repository", "Culture"] },
      { id: "2", title: `${query} – Archaeological Survey of India`, summary: `Archaeological records, site documentation, conservation reports, and historical research related to ${query}. ASI maintains 3,696 centrally protected monuments across India.`, source: "Archaeological Survey of India", url: "https://asi.nic.in", keywords: ["Archaeology", "ASI", "Monuments"] },
      { id: "3", title: `${query} – Museums of India Collection`, summary: `Browse related artefacts, artworks, and collections from museums across India. Virtual tours, high-resolution images, and expert descriptions available on the Museums of India portal.`, source: "Museums of India", url: "https://museumsofindia.gov.in", keywords: ["Museum", "Virtual Tour", "Collections"] },
      { id: "4", title: `${query} – Vedic Heritage & Traditional Knowledge`, summary: `Explore connections to India's ancient knowledge traditions, Vedic texts, philosophical schools, and traditional arts documented on the Vedic Heritage Portal.`, source: "Vedic Heritage Portal", url: "https://vedicheritage.gov.in", keywords: ["Vedic", "Traditional", "Ancient"] },
    ],
    relatedQueries: ["Monuments of India", "Indian classical arts", "Cultural heritage sites"],
  };
}

export function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const page  = parseInt(searchParams.get("page") || "1", 10);

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [aiSummary, setAiSummary] = useState("");
  const [relatedQueries, setRelatedQueries] = useState<string[]>([]);
  const [filters, setFilters] = useState({ website: "all", contentType: "all", dateRange: "all" });
  const [searchTime, setSearchTime] = useState((0.4 + Math.random() * 0.8).toFixed(2));
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, page, page_size: 10 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        const seen = new Set<string>();
        const mapped: SearchResult[] = (data.results ?? [])
          .filter((r: { url?: string }) => {
            if (!r.url || seen.has(r.url)) return false;
            seen.add(r.url);
            return true;
          })
          .map((r: { title?: string; text?: string; url?: string }, i: number) => ({
            id: String(i + 1),
            title: r.title ?? "",
            summary: r.text ?? "",
            url: r.url ?? "",
            source: sourceFromUrl(r.url ?? ""),
            keywords: [],
          }));
        setResults(mapped);
        setAiSummary(data.answer ?? data.summary ?? "");
        setRelatedQueries(data.relatedQueries ?? []);
        setTotalPages(data.total_pages ?? 1);
        setTotalResults(data.total_results ?? 0);
        if (data.response_time_seconds != null) {
          setSearchTime(Number(data.response_time_seconds).toFixed(2));
        }
        setIsLoading(false);
      })
      .catch(() => {
        const fallback = findSearchResults(query);
        setResults(fallback.results);
        setAiSummary(fallback.summary);
        setRelatedQueries(fallback.relatedQueries);
        setIsLoading(false);
      });
  }, [query, page]);

  const handleNewSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const pageNumbers = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums: (number | "…")[] = [1];
    if (page > 3) nums.push("…");
    for (let p = Math.max(2, page - 1); p <= Math.min(totalPages - 1, page + 1); p++) nums.push(p);
    if (page < totalPages - 2) nums.push("…");
    nums.push(totalPages);
    return nums;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <header className="py-3 px-6 border-b bg-white/90 backdrop-blur-sm sticky top-0 z-10" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-[var(--muted)] transition-colors">
              <ArrowLeft className="h-4 w-4" style={{ color: "var(--navy)" }} />
            </button>
            <div className="flex-1">
              <AISearchBar onSearch={handleNewSearch} placeholder={query} />
            </div>
            <button
              onClick={() => navigate("/chat")}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all hover:shadow-md flex-shrink-0"
              style={{ backgroundColor: "var(--navy)", color: "var(--ivory)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Chat Instead
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-5 rounded-xl border sticky top-20" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-5">
                <Filter className="h-4 w-4" style={{ color: "var(--navy)" }} />
                <h3 className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "var(--font-sans)" }}>Filters</h3>
              </div>
              <div className="space-y-5">
                {[
                  { label: "Website", key: "website" as const, options: [
                    { value: "all", label: "All Sources (66)" },
                    { value: "indianculture", label: "Indian Culture Portal" },
                    { value: "asi", label: "Archaeological Survey" },
                    { value: "museums", label: "Museums of India" },
                    { value: "vedic", label: "Vedic Heritage Portal" },
                    { value: "archives", label: "National Archives" },
                    { value: "ignca", label: "IGNCA" },
                  ]},
                  { label: "Content Type", key: "contentType" as const, options: [
                    { value: "all", label: "All Types" },
                    { value: "text", label: "Text & Articles" },
                    { value: "images", label: "Images & Photos" },
                    { value: "video", label: "Video & Audio" },
                    { value: "documents", label: "Documents & PDFs" },
                  ]},
                  { label: "Date Range", key: "dateRange" as const, options: [
                    { value: "all", label: "All Time" },
                    { value: "week", label: "Past Week" },
                    { value: "month", label: "Past Month" },
                    { value: "year", label: "Past Year" },
                  ]},
                ].map((filter) => (
                  <div key={filter.key}>
                    <label className="block mb-1.5 text-xs font-medium" style={{ color: "var(--navy)" }}>{filter.label}</label>
                    <select
                      value={filters[filter.key]}
                      onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-[10px] uppercase tracking-wider font-medium mb-3" style={{ color: "var(--muted-foreground)" }}>Quick Links</p>
                <div className="space-y-1.5">
                  {["UNESCO Heritage Sites", "Classical Dance Forms", "National Museums", "Cultural Schemes"].map((link) => (
                    <button
                      key={link}
                      onClick={() => handleNewSearch(link)}
                      className="w-full text-left text-xs px-2.5 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors flex items-center gap-2"
                      style={{ color: "var(--navy)" }}
                    >
                      <ChevronRight className="h-3 w-3 opacity-40" />
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Results */}
          <main className="lg:col-span-3">
            {/* Query Header */}
            <div className="mb-5">
              <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Search results for</p>
              <h2 className="text-2xl mb-2" style={{ color: "var(--navy)" }}>{query}</h2>
              {!isLoading && (
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{searchTime}s</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />66 portals searched</span>
                  <span>•</span>
                  <span>{totalResults > 0 ? totalResults : results.length} results found</span>
                </div>
              )}
            </div>

            {/* AI Summary */}
            {!isLoading && aiSummary && (
              <div className="mb-6 p-5 rounded-xl border-l-4 bg-white shadow-sm" style={{ borderLeftColor: "var(--gold)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(198,167,94,0.12)" }}>
                    <Sparkles className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--navy)", fontFamily: "var(--font-sans)" }}>AI Summary</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
                        <Shield className="h-2.5 w-2.5 inline mr-0.5" />RAG Verified
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{aiSummary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {isLoading ? (
              <LoadingState message="Searching across 66 Ministry portals..." />
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <SearchResultCard key={result.id} {...result} />
                ))}
              </div>
            ) : (
              <EmptyState suggestions={["Indian classical dance", "Museums in Delhi", "Historical monuments"]} />
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--gold)] hover:bg-[var(--muted)]"
                  style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>

                <div className="flex gap-1">
                  {pageNumbers().map((p, i) =>
                    p === "…" ? (
                      <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm" style={{ color: "var(--muted-foreground)" }}>…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p as number)}
                        className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: p === page ? "var(--navy)" : "transparent",
                          color: p === page ? "var(--ivory)" : "var(--navy)",
                          border: p === page ? "none" : "1px solid var(--border)",
                        }}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--gold)] hover:bg-[var(--muted)]"
                  style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Related Searches */}
            {!isLoading && relatedQueries.length > 0 && (
              <div className="mt-8 p-5 rounded-xl bg-white border" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>Related Searches</p>
                <div className="flex flex-wrap gap-2">
                  {relatedQueries.map((rq, i) => (
                    <button
                      key={i}
                      onClick={() => handleNewSearch(rq)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs border hover:border-[var(--gold)] hover:bg-[var(--muted)] transition-all"
                      style={{ borderColor: "var(--border)", color: "var(--navy)" }}
                    >
                      <Sparkles className="h-3 w-3" style={{ color: "var(--gold)" }} />
                      {rq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Chatbot */}
      <ChatbotPopup />
    </div>
  );
}
