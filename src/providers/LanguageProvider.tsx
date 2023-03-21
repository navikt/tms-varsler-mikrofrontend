import React, { useState, useEffect, createContext } from "react";

export type Language = "nb" | "en" | "nn";

const defualtLanguage = (sessionStorage.getItem("language") ?? "nb") as Language;
export const LanguageContext = createContext(defualtLanguage);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(defualtLanguage);

  useEffect(() => {
    window.addEventListener("storage", () => {
      setLanguage((sessionStorage.getItem("language") ?? "nb") as Language);
    });
  }, []);

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
