import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [headerName, setHeaderName] = useState("");
  const { pathname } = useLocation();

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
      default:
        return setHeaderName("");
    }
  };

  useEffect(() => {
    getPathName(pathname);
  }, [pathname]);
  return (
    <div className="flex items-center justify-between w-full p-6 border-b h-24x border-line">
      <h1 className="text-2xl font-bold text-dark">{headerName}</h1>
      <div className="w-12 h-12 rounded-full bg-slate-200"></div>
    </div>
  );
};

export default Header;
