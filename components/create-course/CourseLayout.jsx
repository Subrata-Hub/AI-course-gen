"use client";
import React from "react";
import { Button } from "../ui/button";
import CourseBasicInfo from "../shared/CourseBasicInfo";
import CourseDetail from "../shared/CourseDetail";
import ChapterList from "../shared/ChapterList";

const CourseLayout = ({ courses, courseId }) => {
  return (
    <div className="px-7 md:px-20 lg:px-32">
      <h2 className="h1-bold text-center text-blue-500">Course Layout</h2>
      {/* <LoadingDialog loading={loading} /> */}
      <CourseBasicInfo course={courses} courseId={courseId} />
      <CourseDetail course={courses} />
      <ChapterList course={courses} courseId={courseId} />
      <Button className="primary-gradient my-4 min-h-[36px] rounded-xl p-4 !text-light-900">
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
