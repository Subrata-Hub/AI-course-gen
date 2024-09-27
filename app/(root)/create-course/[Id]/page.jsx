import CourseLayout from "@/components/create-course/CourseLayout";
import { getCoursesById } from "@/lib/actions/courses.action";
import React from "react";

const Page = async ({ params }) => {
  // const courseId = params.Id;
  const { Id: courseId } = params;

  const courses = await getCoursesById({ courseId });
  console.log(courses);
  return (
    <div className="mt-6">
      <CourseLayout courses={courses} courseId={courseId} />
    </div>
  );
};

export default Page;
