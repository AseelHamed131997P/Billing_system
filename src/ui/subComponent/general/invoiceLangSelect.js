import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import i18nInvoice from "../../utils/i18nInvoice";
import { useTranslation } from "react-i18next";

function InvoiceLangSelect() {
  const [lang, setLang] = useState(() => {
    const storedLang = localStorage.getItem("i18nextLng") || "en";
    return storedLang === "en" ? "US" : storedLang === "ar" ? "SA" : "IL";
  });

  const { t } = useTranslation("translation", { i18n: i18nInvoice });

  const handleLanguageChange = (code) => {
    const language =
      code === "US" ? "en" : code === "SA" ? "ar" : code === "IL" ? "he" : "en";

    setLang(code);
    // localStorage.setItem("secondaryLanguage", language);
    i18nInvoice.changeLanguage(language);
  };

  useEffect(() => {
    console.log(`invoice lang ${lang}`);
  }, [lang]);

  return (
    <div>
      <ReactFlagsSelect
        countries={["US", "SA", "IL"]}
        customLabels={{
          US: "English",
          SA: "العربية",
          IL: "עברית",
        }}
        selected={lang}
        onSelect={handleLanguageChange}
        className="custom-dropdown-secondary"
      />
    </div>
  );
}

export default InvoiceLangSelect;
