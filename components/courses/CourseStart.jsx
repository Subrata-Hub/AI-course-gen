/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import ChapterListCard from "../cards/ChapterListCard";

import ChapterContent from "../shared/ChapterContent";
import { getChapterById } from "@/lib/actions/chapters.action";

const CourseStart = ({ course }) => {
  const [selectedChapter, setSelectedChapter] = useState(
    course?.courseOutput?.chapters[0]
  );
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetSelectedChapterContent(0);
  }, []);

  const GetSelectedChapterContent = async (chapterIndex) => {
    const result = await getChapterById({
      chapterIndex,
      cousesId: course?._id,
    });

    setChapterContent(result);
  };

  return (
    <div>
      <div className="text-dark100_light900 light-border custom-scrollbar fixed left-5 top-0 mt-24 hidden h-full overflow-y-scroll border-r shadow-sm md:block md:w-64 lg:w-[280px]">
        <h2 className="primary-gradient rounded-lg p-4 text-lg font-semibold text-light-900">
          {course?.courseOutput?.course_name}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-100 hover:dark:bg-slate-900 ${
                selectedChapter?.chapter_name === chapter?.chapter_name &&
                "bg-purple-100 dark:bg-slate-900"
              } `}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
};

export default CourseStart;
