import React, { createContext, useContext, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const languageNames = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  as: "অসমীয়া (Assamese)",
  bn: "বাংলা (Bengali)",
  ne: "नेपाली (Nepali)",
  mzo: "Mizo (Mizo ṭawng)"
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  // Key lookup helper: e.g. t('nav.gisMap') or t('riskLevels.critical')
  const t = (path) => {
    const keys = path.split(".");
    let current = translations[lang] || translations["en"];
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback = translations["en"];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
