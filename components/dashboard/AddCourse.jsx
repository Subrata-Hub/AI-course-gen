"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const AddCourse = ({ user }) => {
  return (
    <div className="flex-between">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <Image
          src={user?.userProfileImage}
          alt="profile-picture"
          width={120}
          height={120}
          className="size-[120px] rounded-full object-cover"
        />

        <div className="mt-3">
          <h2 className="h2-bold text-dark100_light900">{user?.name}</h2>
          <p className="paragraph-regular text-dark200_light800">
            @{user?.username}
          </p>
          <p className="text-light400_light500 mt-3 text-sm">
            Create a new course with AI, share with friend and eren from it{" "}
          </p>
        </div>
      </div>

      <Link href={"/create-course"}>
        <Button className="primary-gradient min-h-[36px] p-3 !text-light-900">
          + Create AI Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
