"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex-between">
      <div>
        <h2 className="text-2xl text-dark-100 dark:text-light-900">
          Hellow, <span className="h2-bold">{user?.fullName}</span>
        </h2>
        <p className="text-light400_light500 text-sm">
          Create a new course with AI, share with friend and eren from it{" "}
        </p>
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
