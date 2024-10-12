import CourseCard from "@/components/cards/CourseCard";
import Pagination from "@/components/shared/Pagination";
import { getAllCourses } from "@/lib/actions/courses.action";
import React from "react";

const Explore = async ({ searchParams }) => {
  const { courses, isNext } = await getAllCourses({
    page: searchParams?.page ? +searchParams.page : 1,
  });
  return (
    <div>
      <h2 className="text-[26px] font-bold text-dark-100 dark:text-light-900">
        Explore more Project
      </h2>
      <p className="text-light400_light500 text-sm">
        Explore more project build with AI by other users
      </p>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
        {courses.length > 0 &&
          courses.map((course, index) => (
            <CourseCard course={course} displayUser={true} key={index} />
          ))}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
};

export default Explore;

// [1, 2, 3, 4, 5, 6].map((item, index) => (
//   <div
//     key={index}
//     className="mt-5 h-[250px] w-full animate-pulse rounded-lg bg-slate-300"
//   ></div>
// )
