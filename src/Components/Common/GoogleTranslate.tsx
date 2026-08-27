"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "preferred_language";

type Lang = "English" | "Spanish";

const languages: Lang[] = ["English", "Spanish"];

// Map display names → Google Translate codes
const langCodeMap: Record<Lang, string> = {
  English: "en",
  Spanish: "es",
};

/**
 * GoogleTranslate
 *
 * Renders a custom language switcher with EN/BN/ES buttons.
 * The buttons manipulate the hidden Google Translate <select> element
 * and persist the language choice in localStorage.
 */
const GoogleTranslate = () => {
  const [activeLang, setActiveLang] = useState<Lang>("English");
  const containerRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Restore saved language on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const match = languages.find((l) => langCodeMap[l] === saved);
      if (match) setActiveLang(match);
    }
  }, []);

  const changeLanguage = (code: string) => {
    const tryChange = (attempts = 0) => {
      const select = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement | null;

      if (!select) {
        if (attempts < 5) setTimeout(() => tryChange(attempts + 1), 200);
        return;
      }

      select.value = code;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      select.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => {
        if (select.value !== code && attempts < 5) {
          tryChange(attempts + 1);
        }
      }, 300);
    };

    tryChange();
  };

  const handleLangSelect = (lang: Lang) => {
    const code = langCodeMap[lang];
    setActiveLang(lang);
    localStorage.setItem(STORAGE_KEY, code);
    changeLanguage(code);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Language switcher buttons */}
      <div className="flex items-center rounded-lg border border-[#E4E4E7]">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLangSelect(lang)}
            translate="no"
            className={`px-3 py-1 cursor-pointer rounded-lg text-xs 2xl:text-sm transition-colors notranslate ${
              activeLang === lang
                ? "bg-secondary-blue text-white font-medium"
                : "text-[#161C24]"
            }`}
          >
            {lang === "English" ? "EN" : "ES"}
          </button>
        ))}
      </div>

      {/* Hidden Google Translate element */}
      <div ref={containerRef} id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslate;
