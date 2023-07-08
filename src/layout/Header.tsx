import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "../../public/Avatar.svg";
import { useTranslation } from "react-i18next";
import Switcher from "../components/Switcher";
const Header = () => {
  const [headerName, setHeaderName] = useState("");
  const { pathname } = useLocation();
  const { t,i18n } = useTranslation();

    


  const getPathName = (pathname: string) => {
    switch (pathname) {
      case "/":
        return setHeaderName("İdarəetmə Paneli");

      case "/references":
        return setHeaderName("References");

      case "/control-panel/deals":
        return setHeaderName("Sifarişlər");
      case "/sos":
        return setHeaderName("Sos bildirişləri");
      case "/references/users":
        return setHeaderName("İstifadəçilər");
      case "/references/objects":
        return setHeaderName("Obyektlər");
      case "/references/buildings":
        return setHeaderName("Binalar");
      case "/references/companies":
        return setHeaderName(t("companies"));
      case "/references/apartments":
        return setHeaderName("Mənzillər");
      case "/references/employees":
        return setHeaderName(t("employees"));
      case "/references/residents":
        return setHeaderName(t("users"));
      case "/references/vendorRooms":
        return setHeaderName("Otaqlar");
      case "/references/transport":
        return setHeaderName(t("transport"));
      case "/sos/accident":
        return setHeaderName("Qəzalar");
      case "/settings/ordertype":
        return setHeaderName("Sifariş tipləri");
      case "/settings/roomtype":
        return setHeaderName(t("roomType"));
      case "/settings/parking":
        return setHeaderName("Dayanacaq");
      default:
        return setHeaderName("");
    }
  };

  useEffect(() => {
    getPathName(pathname);
  }, [pathname,t]);
  return (
    <div className="flex items-center justify-between w-full h-24 px-12 border-b border-line">
      <h1 className=" w-1/3 text-2xl font-bold text-dark">{headerName}</h1>
      <Switcher/>
      <div className="object-cover w-1/3 flex items-end justify-end">
        <img src={Avatar} className="w-12 h-12 rounded-full" alt="" />
      </div>
    </div>
  );
};

export default Header;
