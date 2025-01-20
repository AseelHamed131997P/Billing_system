import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select"; // Import flags select for language selection
import i18next from "i18next";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function LangSelect() {
  const { t } = useTranslation();
  const [lang, setLang] = useState(
    "" // Default to 'US' if no matching cookie is found
  );
  function getLang(code) {
    setLang(code);
    switch (code) {
      case "US":
        console.log(`examine code ${code}`);
        i18next.changeLanguage("en");
        break;
      case "SA":
        console.log(`examine code ${code}`);
        i18next.changeLanguage("ar");
        break;
      case "IL":
        console.log(`examine code ${code}`);
        i18next.changeLanguage("he");
        break;
    }
  }

  useEffect(() => {
    console.log("after change the state");
    console.log(lang);
  }, [lang]); // This will run whenever `lang` changes
  // Step 1: Check if there's a language stored in cookies
  const getDefaultLanguage = () => {
    const cookieLang = Cookies.get("i18next");
    if (cookieLang) {
      return cookieLang === "en"
        ? "US"
        : cookieLang === "ar"
        ? "SA"
        : cookieLang === "he"
        ? "IL"
        : "US"; // Default value if no match is found
    }

    // Step 2: If no cookie, fall back to the <html> tag's lang attribute
    return "US"; // Default to 'en' if no lang attribute exists
  };

  useEffect(() => {
    const defaultLang = getDefaultLanguage();
    setLang(defaultLang); // Set default language state
    console.log(" first time");
    // Step 3: Initialize i18next with the detected language
  }, []);

  return (
    <ReactFlagsSelect
      countries={["US", "SA", "IL"]} // US for English, SA for Arabic, IL for Hebrew
      customLabels={{
        US: "English",
        SA: "العربية", // Arabic
        IL: "עברית", // Hebrew
      }}
      selected={lang}
      onSelect={(code) => getLang(code)}
      className="custom-dropdown"
    />
  );
}

export default LangSelect;
