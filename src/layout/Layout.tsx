import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <Fragment>
      <div className="fixed flex w-full">
        <Navbar />
        <Header />
      </div>
      <div className="flex-1 relative mt-24 p-6 ml-[90px]">{children}</div>
    </Fragment>
  );
};

export default Layout;
