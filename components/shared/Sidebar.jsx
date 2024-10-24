"use client";
import React from "react";
import { dashboardMenu } from "../../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ProgressBar from "../shared/ProgressBar";

const Sidebar = ({ totalUserCourses }) => {
  const pathName = usePathname();

  return (
    <div className="background-light900_dark200 light-border custom-scrollbar fixed left-0 top-0 flex h-screen flex-col justify-between border-r pl-9 pr-4 pt-32  shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[280px]">
      <ul className="">
        {dashboardMenu.map((item) => (
          <Link href={item.path} key={item.id}>
            <div
              className={`${
                item.path === pathName
                  ? "primary-gradient rounded-xl text-light-900"
                  : "text-dark300_light900"
              } mb-6 flex  items-center justify-start gap-5 bg-transparent p-3.5`}
            >
              <div className="text-[20px]">{item.icon}</div>
              <p
                className={`${item.path === pathName ? "base-bold" : "base-medium"} max-lg:hidden`}
              >
                {item.name}
              </p>
            </div>
          </Link>
        ))}
      </ul>
      <div className=" w-4/5">
        <ProgressBar
          value={(totalUserCourses / 20) * 100}
          color="primary-gradient"
          trackColor="bg-gray-300 dark:bg-gray-700"
        />
        {/* <div className="primary-gradient h-2"></div> */}
        <h2 className="text-dark200_light800 my-2 text-sm">
          {totalUserCourses} out of 20 course created
        </h2>
        <h2 className="text-light400_light500 text-xs">
          Upgrade your plane for unlimeted genation
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;

// absolute bottom-5
