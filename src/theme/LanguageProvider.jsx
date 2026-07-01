import { createContext, useContext, useMemo, useState } from "react";
import { content } from "../data/content";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "am" : "en"));
  };

  const value = useMemo(
    () => ({
      language,
      toggleLanguage,
      text: content[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}