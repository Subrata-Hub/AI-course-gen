"use client";
import React from "react";
import { Button } from "../ui/button";
import CourseBasicInfo from "../shared/CourseBasicInfo";
import CourseDetail from "../shared/CourseDetail";
import ChapterList from "../shared/ChapterList";

const CourseLayout = ({ courses }) => {
  return (
    <div className="px-7 md:px-20 lg:px-40">
      <h2 className="h1-bold text-center text-blue-500">Course Layout</h2>
      {/* <LoadingDialog loading={loading} /> */}
      <CourseBasicInfo course={courses} />
      <CourseDetail course={courses} />
      <ChapterList course={courses} />
      <Button className="my-10">Generate Course Content</Button>
    </div>
  );
};

export default CourseLayout;
