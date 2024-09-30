/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CourseBasicInfo from "@/components/shared/CourseBasicInfo";
import { getCoursesById } from "@/lib/actions/courses.action";

import React, { useEffect, useState } from "react";

import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

const FinishScreen = ({ params }) => {
  // const { user } = useUser();
  const [course, setCouse] = useState([]);
  const { Id: courseId } = params;
  // const router = useRouter();

  useEffect(() => {
    params && getCourses();
  }, [params]);

  const getCourses = async () => {
    const courseData = await getCoursesById({ courseId });
    console.log(courseData);
    setCouse(courseData);
  };

  return (
    <div className="my-7 px-10 md:px-20 lg:px-44">
      <h2 className="h1-bold  my-2 text-center text-blue-500">
        Congrats! your course is Ready
      </h2>

      <CourseBasicInfo course={course} edit={false} />
      <h2 className="mt-3">Course URL:</h2>
      <h2 className="flex items-center gap-5 rounded-md border p-2 text-center text-gray-400">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/{courseId}
        <HiOutlineClipboardDocumentCheck
          className="size-5 cursor-pointer"
          onClick={async () =>
            await navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${courseId}`
            )
          }
        />
      </h2>
    </div>
  );
};

export default FinishScreen;
