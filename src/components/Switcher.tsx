
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Switcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = async (language: any) => {
    await i18n.changeLanguage(language);
    console.log(language, "lng");
    setCurrentLanguage(language);
  };

  return (
    <div className="w-1/3 flex items-center justify-center">
      <div className="flex items-center justify-between w-[200px]">
        <p
          className={`text-xl font-bold text-dark cursor-pointer ${
            currentLanguage === "az" && "text-primary"
          }`}
          onClick={() => changeLanguage("az")}
        >
          Az
        </p>
        <span>|</span>
        <p
          className={`text-xl font-bold text-dark cursor-pointer ${
            currentLanguage === "en" && "text-primary"
          }`}
          onClick={() => changeLanguage("en")}
        >
          En
        </p>
        <span>|</span>
        <p
          className={`text-xl font-bold text-dark cursor-pointer ${
            currentLanguage === "ru" && "text-primary"
          }`}
          onClick={() => changeLanguage("ru")}
        >
          Ru
        </p>
      </div>
    </div>
  );
};

export default Switcher;
