import UserCourses from "@/components/courses/UserCourses";
import AddCourse from "@/components/dashboard/AddCourse";
import { getUserById, getUserCourses } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Dashboard = async () => {
  try {
    // Fetch user authentication details
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

    const { plainUserCourses: userCourses } = await getUserCourses({
      mongoUser: plainMongoUser._id,
    });

    if (!userCourses) {
      throw new Error("No courses found for this user");
    }

    return (
      <div>
        {/* AddCourse could remain a client-side component */}
        <AddCourse />

        {/* Passing fetched courses to UserCourses */}
        <UserCourses courses={userCourses} />
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <div>Error loading dashboard. Please try again later.</div>;
  }
};

export default Dashboard;
