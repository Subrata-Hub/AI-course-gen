import React from "react";
import Sidebar from "@/components/shared/Sidebar";
// import Navbar from "@/components/shared/navbar/Navbar";
const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="hidden md:block md:w-[270px] lg:w-[280px]">
        <Sidebar />
      </div>
      <div className="md:ml-[266px]">
        {/* <Navbar /> */}
        <div className="pt-14">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
