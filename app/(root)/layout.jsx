import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="background-light850_dark100 relative">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col px-6  pb-6 pt-16 max-md:pb-14 sm:px-14">
        {children}
      </section>
    </div>
  );
};

export default Layout;
