import React from "react";
import {
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlinePlayCircle,
} from "react-icons/hi2";

const CourseDetail = ({ course }) => {
  return (
    <div className="mt-3 rounded-xl border p-6 shadow-sm dark:border-slate-800">
      <div className="flex-between">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-4xl text-blue-500 dark:text-purple-600 " />
          <div className="">
            <h2 className="text-dark500_light500 text-xs">Skill Level</h2>
            <h2 className="base-semibold text-dark500_light700">
              {course?.label}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-4xl text-blue-500 dark:text-purple-600" />
          <div className="">
            <h2 className="text-dark500_light500 text-xs">Duration</h2>
            <h2 className="base-semibold text-dark500_light700">
              {course?.courseOutput?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-4xl text-blue-500 dark:text-purple-600" />
          <div className="">
            <h2 className="text-dark500_light500 text-xs">No Of Chapters</h2>
            <h2 className="base-semibold text-dark500_light700">
              {course?.courseOutput?.noOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlayCircle className="text-4xl text-blue-500 dark:text-purple-600" />
          <div className="">
            <h2 className="text-dark500_light500 text-xs">Videos</h2>
            <h2 className="base-semibold text-dark500_light700">
              {course?.includeVideo}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

// text-[19px] font-semibold leading-[24.8px]
