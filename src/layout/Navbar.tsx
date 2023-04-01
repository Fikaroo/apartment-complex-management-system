import React from "react";
import { NavLink, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "/navbaricon/dashboardicon.svg",
    },
    {
      name: "Deals",
      path: "/deals",
      icon: "/navbaricon/deals.svg",
    },
    {
      name: "Customers",
      path: "/customers",
      icon: "/navbaricon/customers.svg",
    },
    {
      name: "SOS",
      path: "/sos",
      icon: "/navbaricon/sos.svg",
    },
    {
      name: "Blog",
      path: "/blog",
      icon: "/navbaricon/blog.svg",
    },
    {
      name: "Notification",
      path: "/notification",
      icon: "/navbaricon/notification.svg",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "/navbaricon/settings.svg",
    },
  ];

  return (
    <div className="navbar ">
      <div className="nav-head"></div>

      <div className="nav-sidebar">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
