import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ar from "./ar.json";
import { I18nManager } from "react-native";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  // debug: true,
  lng: I18nManager.isRTL ? "ar" : "en",
  fallbackLng: "en",
  resources: {
    en: en,
    ar: ar,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
