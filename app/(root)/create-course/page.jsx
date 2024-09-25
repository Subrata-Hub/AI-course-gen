import CreateCourse from "@/components/forms/CreateCourse";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <CreateCourse mongoUserId={JSON.stringify(mongoUser._id)} />
    </div>
  );
};

export default Page;
