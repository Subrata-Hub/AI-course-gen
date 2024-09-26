import CourseLayout from "@/components/create-course/CourseLayout";
import { getCoursesById } from "@/lib/actions/courses.action";
import React from "react";

const Page = async ({ params }) => {
  const courseId = params.Id;

  const courses = await getCoursesById({ courseId });
  console.log(courses);
  return (
    <div className="mt-6">
      <CourseLayout courses={courses} />
    </div>
  );
};

export default Page;
