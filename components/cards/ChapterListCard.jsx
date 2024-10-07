import React from "react";
import { HiOutlineClock } from "react-icons/hi2";

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div className=" grid grid-cols-5 items-center border-b p-4 dark:border-slate-800 ">
      <div>
        <h2 className="size-8 rounded-full  bg-blue-500 p-1 text-center text-white dark:bg-purple-800">
          {index + 1}
        </h2>
      </div>
      <div className="col-span-4">
        <h2 className="text-dark500_light700 body-semibold  ">
          {chapter?.chapter_name}
        </h2>
        <h2 className="mt-1 flex items-center gap-2 text-sm text-blue-500 dark:text-purple-700">
          <HiOutlineClock /> {chapter?.duration}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;
