import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [headerName, setHeaderName] = useState("");
  const { pathname } = useLocation();

  const getPathName = (pathname: string) => {
    switch (pathname) {
      case "/":
        return setHeaderName("İdarəetmə Paneli");

      case "/customers":
        return setHeaderName("Sakinlər");

      case "/deals":
        return setHeaderName("Sifarişlər");
        case "/sos":
          return setHeaderName("Sos bildirişləri");
      default:
        return setHeaderName("");
    }
  };

  useEffect(() => {
    getPathName(pathname);
  }, [pathname]);
  return (
    <div className="flex items-center justify-between w-full h-24 p-6 bg-transparent border-b border-line">
      <h1 className="text-2xl font-bold text-dark">{headerName}</h1>
      <div className="w-12 h-12 rounded-full bg-slate-200"></div>
    </div>
  );
};

export default Header;
