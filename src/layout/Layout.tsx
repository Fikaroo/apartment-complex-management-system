import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <Fragment>
      <div className="flex">
        <Navbar />
        <Header />
      </div>
      {children}
    </Fragment>
  );
};

export default Layout;
