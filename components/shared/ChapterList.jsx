import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

const ChapterList = ({ course }) => {
  return (
    <div className="mt-3">
      <h2 className="text-xl font-medium">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div
            className="mb-2 flex items-center justify-between rounded-lg border p-5 dark:border-slate-800"
            key={index}
          >
            <div className="flex items-center gap-5">
              <h2 className="size-10 flex-none rounded-full bg-blue-500 p-2 text-center text-white dark:bg-purple-800">
                {index + 1}
              </h2>
              <div>
                <h2 className="base-semibold text-dark500_light700">
                  {chapter?.chapter_name}
                  {/* {edit && (
                    <EditChapter
                      course={course}
                      index={index}
                      refreshData={refreshData}
                    />
                  )} */}
                </h2>
                <p className="mt-1 text-[13px] text-gray-500 dark:text-blue-200">
                  {chapter?.about}
                </p>
                <p className="flex items-center gap-2 text-[13px] text-blue-500 dark:text-purple-700">
                  <HiOutlineClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>

            {/* {chapterLoadingStatuses?.[index] === "loading" && (
              <Spinner show={true} sized={"size-6"} />
            )}
            {chapterLoadingStatuses?.[index] === "completed" && (
              <HiOutlineCheckCircle className="text-3xl text-green-600  flex-non" />
            )}
            {chapterLoadingStatuses?.[index] === "error" && (
              <HiOutlineCheckCircle className="text-3xl text-red-600  flex-non" />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
