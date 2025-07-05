"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Language {
  code: string;
  name: string;
  flag: string;
  rtl?: boolean;
}

export interface TranslationContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  setLanguage: (language: Language) => void;
  translate: (text: string, targetLang?: string) => Promise<string>;
  translateSync: (text: string) => string;
  isTranslating: boolean;
  translationCache: Record<string, Record<string, string>>;
}

const availableLanguages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

// Helper function to detect language from URL
const detectLanguageFromURL = (): string => {
  if (typeof window === "undefined") return "en";

  const pathname = window.location.pathname;
  const langMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);

  if (langMatch) {
    const langCode = langMatch[1];
    const isValidLang = availableLanguages.some(
      (lang) => lang.code === langCode
    );
    return isValidLang ? langCode : "en";
  }

  return "en";
};

// Helper function to get locale from cookie
const getLocaleFromCookie = (): string => {
  if (typeof document === "undefined") return "en";

  const cookies = document.cookie.split(";");
  const localeCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("NEXT_LOCALE=")
  );

  if (localeCookie) {
    const locale = localeCookie.split("=")[1];
    return availableLanguages.some((lang) => lang.code === locale)
      ? locale
      : "en";
  }

  return "en";
};

// Mock translation data - in production, this would come from a translation API
const mockTranslations: Record<string, Record<string, string>> = {
  "Welcome to Culturin": {
    es: "Bienvenido a Culturin",
    fr: "Bienvenue chez Culturin",
    de: "Willkommen bei Culturin",
    it: "Benvenuto in Culturin",
    pt: "Bem-vindo ao Culturin",
    zh: "欢迎来到Culturin",
    ja: "Culturinへようこそ",
    ko: "Culturin에 오신 것을 환영합니다",
    ar: "مرحباً بك في Culturin",
    hi: "Culturin में आपका स्वागत है",
    ru: "Добро пожаловать в Culturin",
    th: "ยินดีต้อนรับสู่ Culturin",
    vi: "Chào mừng đến với Culturin",
    tr: "Culturin'e Hoş Geldiniz",
  },
  "Own your bookings. Tell richer stories. Grow your cultural tour brand.": {
    es: "Controla tus reservas. Cuenta historias más ricas. Haz crecer tu marca de tours culturales.",
    fr: "Maîtrisez vos réservations. Racontez des histoires plus riches. Développez votre marque de tours culturels.",
    de: "Behalten Sie Ihre Buchungen. Erzählen Sie reichere Geschichten. Lassen Sie Ihre Kulturtour-Marke wachsen.",
    it: "Controlla le tue prenotazioni. Racconta storie più ricche. Fai crescere il tuo brand di tour culturali.",
    pt: "Controle suas reservas. Conte histórias mais ricas. Faça crescer sua marca de tours culturais.",
    zh: "掌控您的预订。讲述更丰富的故事。发展您的文化旅游品牌。",
    ja: "予約をコントロール。より豊かな物語を語る。文化ツアーブランドを成長させる。",
    ko: "예약을 관리하세요. 더 풍부한 이야기를 들려주세요. 문화 투어 브랜드를 성장시키세요.",
    ar: "تحكم في حجوزاتك. احك قصصاً أغنى. نمّي علامتك التجارية للجولات الثقافية.",
    hi: "अपनी बुकिंग को नियंत्रित करें। समृद्ध कहानियां सुनाएं। अपने सांस्कृतिक टूर ब्रांड को बढ़ाएं।",
    ru: "Контролируйте свои бронирования. Рассказывайте более богатые истории. Развивайте свой бренд культурных туров.",
    th: "ควบคุมการจองของคุณ เล่าเรื่องราวที่สมบูรณ์ขึ้น เติบโตแบรนด์ทัวร์วัฒนธรรมของคุณ",
    vi: "Kiểm soát đặt chỗ của bạn. Kể những câu chuyện phong phú hơn. Phát triển thương hiệu tour văn hóa của bạn.",
    tr: "Rezervasyonlarınızı kontrol edin. Daha zengin hikayeler anlatın. Kültürel tur markanızı büyütün.",
  },
  "Get more direct bookings, build guest loyalty, and craft unforgettable cultural journeys — without using five different tools.":
    {
      es: "Obtén más reservas directas, construye lealtad de huéspedes y crea viajes culturales inolvidables, sin usar cinco herramientas diferentes.",
      fr: "Obtenez plus de réservations directes, fidélisez vos clients et créez des voyages culturels inoubliables, sans utiliser cinq outils différents.",
      de: "Erhalten Sie mehr Direktbuchungen, bauen Sie Gästeloyalität auf und gestalten Sie unvergessliche kulturelle Reisen - ohne fünf verschiedene Tools zu verwenden.",
      it: "Ottieni più prenotazioni dirette, costruisci la fedeltà degli ospiti e crea viaggi culturali indimenticabili, senza usare cinque strumenti diversi.",
      pt: "Obtenha mais reservas diretas, construa fidelidade de hóspedes e crie jornadas culturais inesquecíveis - sem usar cinco ferramentas diferentes.",
      zh: "获得更多直接预订，建立客户忠诚度，打造难忘的文化之旅——无需使用五种不同的工具。",
      ja: "より多くの直接予約を獲得し、ゲストのロイヤルティを築き、忘れられない文化的な旅を作り上げましょう。5つの異なるツールを使う必要はありません。",
      ko: "더 많은 직접 예약을 받고, 고객 충성도를 구축하며, 잊을 수 없는 문화 여행을 만들어보세요. 다섯 가지 다른 도구를 사용할 필요 없이 말입니다.",
      ar: "احصل على المزيد من الحجوزات المباشرة، وابن ولاء الضيوف، واصنع رحلات ثقافية لا تُنسى - دون استخدام خمس أدوات مختلفة.",
      hi: "अधिक प्रत्यक्ष बुकिंग प्राप्त करें, अतिथि वफादारी का निर्माण करें, और अविस्मरणीय सांस्कृतिक यात्राएं तैयार करें - पांच अलग-अलग उपकरणों का उपयोग किए बिना।",
      ru: "Получайте больше прямых бронирований, формируйте лояльность гостей и создавайте незабываемые культурные путешествия - не используя пять разных инструментов.",
      th: "รับการจองโดยตรงมากขึ้น สร้างความภักดีของแขก และสร้างการเดินทางทางวัฒนธรรมที่น่าจดจำ โดยไม่ต้องใช้เครื่องมือที่แตกต่างกันห้าอย่าง",
      vi: "Nhận được nhiều đặt chỗ trực tiếp hơn, xây dựng lòng trung thành của khách và tạo ra những hành trình văn hóa khó quên - mà không cần sử dụng năm công cụ khác nhau.",
      tr: "Daha fazla doğrudan rezervasyon alın, misafir sadakati oluşturun ve unutulmaz kültürel yolculuklar yaratın - beş farklı araç kullanmadan.",
    },
  "Authentic cultural experiences": {
    es: "Experiencias culturales auténticas",
    fr: "Expériences culturelles authentiques",
    de: "Authentische kulturelle Erfahrungen",
    it: "Esperienze culturali autentiche",
    pt: "Experiências culturais autênticas",
    zh: "真正的文化体验",
    ja: "本格的な文化体験",
    ko: "진정한 문화 체험",
    ar: "تجارب ثقافية أصيلة",
    hi: "प्रामाणिक सांस्कृतिक अनुभव",
    ru: "Подлинные культурные впечатления",
    th: "ประสบการณ์ทางวัฒนธรรมที่แท้จริง",
    vi: "Trải nghiệm văn hóa chân thực",
    tr: "Otantik kültürel deneyimler",
  },
  "Book Now": {
    es: "Reservar Ahora",
    fr: "Réserver Maintenant",
    de: "Jetzt Buchen",
    it: "Prenota Ora",
    pt: "Reservar Agora",
    zh: "立即预订",
    ja: "今すぐ予約",
    ko: "지금 예약",
    ar: "احجز الآن",
    hi: "अभी बुक करें",
    ru: "Забронировать Сейчас",
    th: "จองเลย",
    vi: "Đặt Ngay",
    tr: "Şimdi Rezervasyon Yap",
  },
  Price: {
    es: "Precio",
    fr: "Prix",
    de: "Preis",
    it: "Prezzo",
    pt: "Preço",
    zh: "价格",
    ja: "価格",
    ko: "가격",
    ar: "السعر",
    hi: "मूल्य",
    ru: "Цена",
    th: "ราคา",
    vi: "Giá",
    tr: "Fiyat",
  },
  Duration: {
    es: "Duración",
    fr: "Durée",
    de: "Dauer",
    it: "Durata",
    pt: "Duração",
    zh: "持续时间",
    ja: "期間",
    ko: "기간",
    ar: "المدة",
    hi: "अवधि",
    ru: "Продолжительность",
    th: "ระยะเวลา",
    vi: "Thời gian",
    tr: "Süre",
  },
  "15 Languages": {
    es: "15 Idiomas",
    fr: "15 Langues",
    de: "15 Sprachen",
    it: "15 Lingue",
    pt: "15 Idiomas",
    zh: "15种语言",
    ja: "15言語",
    ko: "15개 언어",
    ar: "15 لغة",
    hi: "15 भाषाएं",
    ru: "15 языков",
    th: "15 ภาษา",
    vi: "15 ngôn ngữ",
    tr: "15 Dil",
  },
  "Auto-translate your content": {
    es: "Traduce automáticamente tu contenido",
    fr: "Traduisez automatiquement votre contenu",
    de: "Übersetzen Sie Ihre Inhalte automatisch",
    it: "Traduci automaticamente i tuoi contenuti",
    pt: "Traduza automaticamente seu conteúdo",
    zh: "自动翻译您的内容",
    ja: "コンテンツを自動翻訳",
    ko: "콘텐츠를 자동 번역",
    ar: "ترجم محتواك تلقائياً",
    hi: "अपनी सामग्री का स्वचालित अनुवाद करें",
    ru: "Автоматически переводите ваш контент",
    th: "แปลเนื้อหาของคุณโดยอัตโนมัติ",
    vi: "Tự động dịch nội dung của bạn",
    tr: "İçeriğinizi otomatik çevirin",
  },
  "Smart Pricing": {
    es: "Precios Inteligentes",
    fr: "Tarification Intelligente",
    de: "Intelligente Preisgestaltung",
    it: "Prezzi Intelligenti",
    pt: "Preços Inteligentes",
    zh: "智能定价",
    ja: "スマート価格設定",
    ko: "스마트 가격 책정",
    ar: "التسعير الذكي",
    hi: "स्मार्ट मूल्य निर्धारण",
    ru: "Умное ценообразование",
    th: "การกำหนดราคาอัจฉริยะ",
    vi: "Định giá thông minh",
    tr: "Akıllı Fiyatlandırma",
  },
  "AI-powered price optimization": {
    es: "Optimización de precios impulsada por IA",
    fr: "Optimisation des prix alimentée par l'IA",
    de: "KI-gestützte Preisoptimierung",
    it: "Ottimizzazione dei prezzi basata sull'IA",
    pt: "Otimização de preços baseada em IA",
    zh: "AI驱动的价格优化",
    ja: "AI搭載価格最適化",
    ko: "AI 기반 가격 최적화",
    ar: "تحسين الأسعار بالذكاء الاصطناعي",
    hi: "AI-संचालित मूल्य अनुकूलन",
    ru: "Оптимизация цен на основе ИИ",
    th: "การปรับราคาด้วย AI",
    vi: "Tối ưu hóa giá bằng AI",
    tr: "AI destekli fiyat optimizasyonu",
  },
  "Market Analysis": {
    es: "Análisis de Mercado",
    fr: "Analyse de Marché",
    de: "Marktanalyse",
    it: "Analisi di Mercato",
    pt: "Análise de Mercado",
    zh: "市场分析",
    ja: "市場分析",
    ko: "시장 분석",
    ar: "تحليل السوق",
    hi: "बाजार विश्लेषण",
    ru: "Анализ рынка",
    th: "การวิเคราะห์ตลาด",
    vi: "Phân tích thị trường",
    tr: "Pazar Analizi",
  },
  "Real-time market insights": {
    es: "Insights de mercado en tiempo real",
    fr: "Insights de marché en temps réel",
    de: "Markteinblicke in Echtzeit",
    it: "Insights di mercato in tempo reale",
    pt: "Insights de mercado em tempo real",
    zh: "实时市场洞察",
    ja: "リアルタイム市場インサイト",
    ko: "실시간 시장 통찰력",
    ar: "رؤى السوق في الوقت الفعلي",
    hi: "वास्तविक समय बाजार अंतर्दृष्टि",
    ru: "Рыночная аналитика в реальном времени",
    th: "ข้อมูลเชิงลึกของตลาดแบบเรียลไทม์",
    vi: "Thông tin thị trường thời gian thực",
    tr: "Gerçek zamanlı pazar öngörüleri",
  },
  "Global Reach Features": {
    es: "Características de Alcance Global",
    fr: "Fonctionnalités de Portée Mondiale",
    de: "Globale Reichweite-Features",
    it: "Funzionalità di Portata Globale",
    pt: "Recursos de Alcance Global",
    zh: "全球覆盖功能",
    ja: "グローバルリーチ機能",
    ko: "글로벌 도달 기능",
    ar: "ميزات الوصول العالمي",
    hi: "वैश्विक पहुंच सुविधाएं",
    ru: "Функции глобального охвата",
    th: "คุณสมบัติการเข้าถึงระดับโลก",
    vi: "Tính năng tiếp cận toàn cầu",
    tr: "Küresel Erişim Özellikleri",
  },
  "Expand your business worldwide with our translation and pricing tools": {
    es: "Expande tu negocio mundialmente con nuestras herramientas de traducción y precios",
    fr: "Développez votre entreprise dans le monde entier avec nos outils de traduction et de tarification",
    de: "Erweitern Sie Ihr Geschäft weltweit mit unseren Übersetzungs- und Preistools",
    it: "Espandi la tua attività in tutto il mondo con i nostri strumenti di traduzione e prezzi",
    pt: "Expanda seu negócio mundialmente com nossas ferramentas de tradução e preços",
    zh: "使用我们的翻译和定价工具在全球范围内扩展您的业务",
    ja: "翻訳と価格設定ツールで世界中にビジネスを拡大",
    ko: "번역 및 가격 책정 도구로 전 세계적으로 비즈니스를 확장하세요",
    ar: "وسع نشاطك التجاري عالمياً باستخدام أدوات الترجمة والتسعير الخاصة بنا",
    hi: "हमारे अनुवाद और मूल्य निर्धारण उपकरणों के साथ दुनिया भर में अपने व्यवसाय का विस्तार करें",
    ru: "Расширьте свой бизнес по всему миру с помощью наших инструментов перевода и ценообразования",
    th: "ขยายธุรกิจของคุณไปทั่วโลกด้วยเครื่องมือแปลและกำหนดราคาของเรา",
    vi: "Mở rộng doanh nghiệp của bạn trên toàn thế giới với các công cụ dịch thuật và định giá của chúng tôi",
    tr: "Çeviri ve fiyatlandırma araçlarımızla işinizi dünya çapında genişletin",
  },
  "Experience auto-translation and dynamic pricing": {
    es: "Experimenta la traducción automática y precios dinámicos",
    fr: "Découvrez la traduction automatique et la tarification dynamique",
    de: "Erleben Sie automatische Übersetzung und dynamische Preisgestaltung",
    it: "Sperimenta la traduzione automatica e i prezzi dinamici",
    pt: "Experimente tradução automática e preços dinâmicos",
    zh: "体验自动翻译和动态定价",
    ja: "自動翻訳と動的価格設定を体験",
    ko: "자동 번역과 동적 가격 책정을 경험해보세요",
    ar: "جرب الترجمة التلقائية والتسعير الديناميكي",
    hi: "स्वचालित अनुवाद और गतिशील मूल्य निर्धारण का अनुभव करें",
    ru: "Испытайте автоматический перевод и динамическое ценообразование",
    th: "สัมผัสการแปลอัตโนมัติและการกำหนดราคาแบบไดนามิก",
    vi: "Trải nghiệm dịch tự động và định giá động",
    tr: "Otomatik çeviri ve dinamik fiyatlandırmayı deneyimleyin",
  },
  "Discover unique tours and activities": {
    es: "Descubre tours y actividades únicos",
    fr: "Découvrez des visites et activités uniques",
    de: "Entdecken Sie einzigartige Touren und Aktivitäten",
    it: "Scopri tour e attività uniche",
    pt: "Descubra tours e atividades únicos",
    zh: "发现独特的旅游和活动",
    ja: "ユニークなツアーとアクティビティを発見",
    ko: "독특한 투어와 활동을 발견하세요",
    ar: "اكتشف جولات وأنشطة فريدة",
    hi: "अनूठे टूर और गतिविधियों की खोज करें",
    ru: "Откройте для себя уникальные туры и мероприятия",
    th: "ค้นพบทัวร์และกิจกรรมที่ไม่เหมือนใคร",
    vi: "Khám phá các tour du lịch và hoạt động độc đáo",
    tr: "Benzersiz turlar ve etkinlikler keşfedin",
  },
  "Language Test Page": {
    es: "Página de Prueba de Idiomas",
    fr: "Page de Test de Langue",
    de: "Sprachtestseite",
    it: "Pagina di Test Linguistico",
    pt: "Página de Teste de Idioma",
    zh: "语言测试页面",
    ja: "言語テストページ",
    ko: "언어 테스트 페이지",
    ar: "صفحة اختبار اللغة",
    hi: "भाषा परीक्षण पृष्ठ",
    ru: "Страница тестирования языка",
    th: "หน้าทดสอบภาษา",
    vi: "Trang kiểm tra ngôn ngữ",
    tr: "Dil Test Sayfası",
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    // During SSG/SSR, return default values
    if (typeof window === "undefined") {
      return {
        currentLanguage: availableLanguages[0],
        availableLanguages,
        setLanguage: () => {},
        translate: async (text: string) => text,
        translateSync: (text: string) => text,
        isTranslating: false,
        translationCache: {},
      };
    }
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    availableLanguages[0]
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] =
    useState<Record<string, Record<string, string>>>(mockTranslations);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // First, try to detect language from URL
      const urlLangCode = detectLanguageFromURL();
      let detectedLanguage = availableLanguages.find(
        (lang) => lang.code === urlLangCode
      );

      // If no URL language, try cookie
      if (!detectedLanguage) {
        const cookieLangCode = getLocaleFromCookie();
        detectedLanguage = availableLanguages.find(
          (lang) => lang.code === cookieLangCode
        );
      }

      // If still no language, try localStorage
      if (!detectedLanguage) {
        const savedLanguage = localStorage.getItem("culturin_language");
        if (savedLanguage) {
          detectedLanguage = availableLanguages.find(
            (lang) => lang.code === savedLanguage
          );
        }
      }

      // Final fallback to browser language
      if (!detectedLanguage) {
        const browserLang = navigator.language.split("-")[0];
        detectedLanguage = availableLanguages.find(
          (lang) => lang.code === browserLang
        );
      }

      if (detectedLanguage) {
        setCurrentLanguage(detectedLanguage);
        // Update document attributes
        document.documentElement.dir = detectedLanguage.rtl ? "rtl" : "ltr";
        document.documentElement.lang = detectedLanguage.code;
        // Save to localStorage
        localStorage.setItem("culturin_language", detectedLanguage.code);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    if (typeof window !== "undefined") {
      localStorage.setItem("culturin_language", language.code);

      // Update document direction for RTL languages
      document.documentElement.dir = language.rtl ? "rtl" : "ltr";
      document.documentElement.lang = language.code;
    }
  };

  const translateSync = (text: string): string => {
    if (currentLanguage.code === "en") return text;

    const cached = translationCache[text]?.[currentLanguage.code];
    if (cached) return cached;

    // Return original text if no translation found
    return text;
  };

  const translate = async (
    text: string,
    targetLang?: string
  ): Promise<string> => {
    const lang = targetLang || currentLanguage.code;

    if (lang === "en") return text;

    // Check cache first
    const cached = translationCache[text]?.[lang];
    if (cached) return cached;

    setIsTranslating(true);

    try {
      // In production, this would call a real translation API like Google Translate
      // For now, we'll simulate the API call and use our mock data
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay

      const translation = mockTranslations[text]?.[lang] || text;

      // Cache the translation
      setTranslationCache((prev) => ({
        ...prev,
        [text]: {
          ...prev[text],
          [lang]: translation,
        },
      }));

      return translation;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text
    } finally {
      setIsTranslating(false);
    }
  };

  const value: TranslationContextType = {
    currentLanguage,
    availableLanguages,
    setLanguage,
    translate,
    translateSync,
    isTranslating,
    translationCache,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
