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
    // Load saved language preference
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("culturin_language");
      if (savedLanguage) {
        const language = availableLanguages.find(
          (lang) => lang.code === savedLanguage
        );
        if (language) {
          setCurrentLanguage(language);
        }
      } else {
        // Auto-detect browser language
        const browserLang = navigator.language.split("-")[0];
        const detectedLanguage = availableLanguages.find(
          (lang) => lang.code === browserLang
        );
        if (detectedLanguage) {
          setCurrentLanguage(detectedLanguage);
        }
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
