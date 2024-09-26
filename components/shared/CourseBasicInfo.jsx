"use client";
import Image from "next/image";
import React from "react";
import { HiMiniTag } from "react-icons/hi2";

const CourseBasicInfo = ({ course, edit }) => {
  // const [selectedFile, setSelectedFile] = useState();
  return (
    <div className="mt-5 rounded-xl border p-6 shadow-sm dark:border-slate-800">
      <div className="flex  justify-between gap-8">
        <div className="w-7/12">
          <h2 className="h1-bold text-3xl text-dark-100 dark:text-light-900">
            {course?.courseOutput?.course_name}
          </h2>
          <p className="text-dark500_light500 body-medium mt-3">
            {course?.courseOutput?.description}
          </p>
          <h2 className="mt-2 flex items-center gap-2 font-medium text-blue-600">
            <HiMiniTag /> {course?.category}
          </h2>
        </div>
        <div className="w-5/12">
          <label htmlFor="upload-image">
            <Image
              src={"/assets/images/placeholder.png"}
              width={250}
              height={250}
              className=" w-full cursor-pointer rounded-xl object-cover"
              alt="banner"
            />
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              //   onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
