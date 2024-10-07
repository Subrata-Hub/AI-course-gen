import CourseStart from "@/components/courses/CourseStart";
import { getCoursesById } from "@/lib/actions/courses.action";
import React from "react";

const Page = async ({ params }) => {
  console.log(params);
  const courseId = params.courseId;

  const courseData = await getCoursesById({ courseId });

  console.log(courseData);
  return <CourseStart course={courseData} />;
};

export default Page;
