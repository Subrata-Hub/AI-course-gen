import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import { getUserById, getUserCourses } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
// import Navbar from "@/components/shared/navbar/Navbar";
const DashboardLayout = async ({ children }) => {
  const { userId } = auth();
  console.log(userId);

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  // Fetch MongoDB user by Clerk userId
  const mongoUser = await getUserById({ userId });
  const plainMongoUser = {
    ...mongoUser,
    _id: mongoUser._id.toString(),
  };

  const { totalUserCourses } = await getUserCourses({
    mongoUser: plainMongoUser._id,
  });

  console.log(typeof totalUserCourses);
  return (
    <div>
      <div className="hidden md:block md:w-[270px] lg:w-[280px]">
        <Sidebar totalUserCourses={totalUserCourses} />
      </div>
      <div className="md:ml-[266px]">
        {/* <Navbar /> */}
        <div className="pt-14">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
