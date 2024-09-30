import React from "react";
import CourseCard from "../cards/CourseCard";

const UserCourses = ({ courses }) => {
  return (
    <div className="mt-5">
      <h2 className="text-dark200_light800 text-[21px] font-[500]">
        My AI Courses
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {courses.length > 0
          ? courses.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="mt-5 h-[250px] w-full animate-pulse rounded-lg bg-slate-300"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default UserCourses;
