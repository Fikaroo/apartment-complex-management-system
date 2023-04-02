import { NavLink, useLocation } from "react-router-dom";

import {
  Squares2X2Icon,
  BriefcaseIcon,
  UsersIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  BellIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import {
  Squares2X2Icon as Squares2X2IconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  UsersIcon as UsersIconSolid,
  ListBulletIcon as ListBulletIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  BellIcon as BellIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

import { ReactComponent as Logo } from "../assets/logo.svg";
const Navbar = () => {
  const { pathname } = useLocation();
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Squares2X2Icon,
      iconSolid: Squares2X2IconSolid,
    },
    {
      name: "Deals",
      path: "/deals",
      icon: BriefcaseIcon,
      iconSolid: BriefcaseIconSolid,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: UsersIcon,
      iconSolid: UsersIconSolid,
    },
    {
      name: "Sos",
      path: "/sos",
      icon: ListBulletIcon,
      iconSolid: ListBulletIconSolid,
    },
    {
      name: "Blog",
      path: "/blog",
      icon: CalendarDaysIcon,
      iconSolid: CalendarDaysIconSolid,
    },
    {
      name: "Notification",
      path: "/notification",
      icon: BellIcon,
      iconSolid: BellIconSolid,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
    },
  ];

  return (
    <div className="min-h-screen border-r border-line">
      <div className="px-5 py-[23.5px] border-b border-line">
        <div className="flex items-center justify-center w-12 h-12 rounded bg-dark">
          <Logo />
        </div>
      </div>

      <ul className="p-5 space-y-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex group items-center relative justify-center w-12 h-12 border border-line rounded-full ${
              item.path === pathname ? "bg-primary" : "bg-white"
            }`}
          >
            <li>
              <div className="relative z-10">
                {item.path === pathname ? (
                  <item.iconSolid className="w-5 h-5 fill-white" />
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
              </div>
              <div
                className={`absolute left-0 top-0 scale-0 flex items-center h-full pr-6 font-semibold  ${
                  item.path === pathname ? "text-white bg-primary" : "bg-white"
                }  transition-all rounded-full pl-14  group-hover:scale-100`}
              >
                {item.name}
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
