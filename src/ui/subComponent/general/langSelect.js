import { useState } from "react"; // React import for useState
import ReactFlagsSelect from "react-flags-select"; // Import flags select for language selection
// import "./login.css"; // Import your CSS
// import "../CSS/general.css";

const LangSelect = () => {
  const [lang, setLang] = useState("US");
  console.log(lang);
  return (
    <ReactFlagsSelect
      countries={["US", "SA", "IL"]} // US for English, SA for Arabic, IL for Hebrew
      customLabels={{
        US: "English",
        SA: "العربية", // Arabic
        IL: "עברית", // Hebrew
      }}
      selected={lang}
      onSelect={(code) => setLang(code)}
      className="custom-dropdown"
    />
  );
};

export default LangSelect;
