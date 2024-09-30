import React from "react";
import CourseBasicInfo from "../shared/CourseBasicInfo";
import CourseDetail from "../shared/CourseDetail";
import ChapterList from "../shared/ChapterList";

const Course = ({ course }) => {
  return (
    <div className="p-5 px-10 md:px-20 lg:px-44">
      <CourseBasicInfo course={course} edit={false} />
      <CourseDetail course={course} />
      <ChapterList course={course} edit={false} />
    </div>
  );
};

export default Course;
