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

      if (!detectedLanguage) {
        // Fallback to saved language preference
        const savedLanguage = localStorage.getItem("culturin_language");
        if (savedLanguage) {
          detectedLanguage = availableLanguages.find(
            (lang) => lang.code === savedLanguage
          );
        }
      }

      if (!detectedLanguage) {
        // Final fallback to browser language
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
