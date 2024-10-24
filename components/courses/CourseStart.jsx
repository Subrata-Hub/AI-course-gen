/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, { useEffect, useState } from "react";
import ChapterListCard from "../cards/ChapterListCard";
import ChapterContent from "../shared/ChapterContent";
import { getChapterById } from "@/lib/actions/chapters.action";
import RightSideBar from "../shared/RightSideBar";
import { getQuestionByChapterId } from "@/lib/actions/question.action";

const CourseStart = ({ course }) => {
  const [selectedChapter, setSelectedChapter] = useState(
    course?.courseOutput?.chapters[0]
  );
  const [chapterContent, setChapterContent] = useState();
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    GetSelectedChapterContent(course?.courseOutput?.chapters[0].chapter_name);
  }, []);

  const GetSelectedChapterContent = async (chapterName) => {
    const result = await getChapterById({
      chapterName,
      cousesId: course?._id,
    });
    setChapterContent(result);
  };

  useEffect(() => {
    if (chapterContent?._id) {
      getQuestions(chapterContent?._id);
    }
  }, [chapterContent]);

  const getQuestions = async (chapterId) => {
    const questions = await getQuestionByChapterId({ chapterId });
    setQuestion(questions);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="text-dark100_light900 light-border custom-scrollbar fixed left-0 top-0 flex h-screen overflow-y-auto  border-r pl-6 pt-[88px] shadow-sm md:block md:w-64 lg:w-[310px]">
        <h2 className="primary-gradient rounded-lg p-4 text-lg font-semibold text-light-900">
          {course?.courseOutput?.course_name}
        </h2>
        <div>
          {course?.courseOutput?.chapters.map((chapter, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer hover:bg-purple-100 hover:dark:bg-slate-900 ${
                  selectedChapter?.chapter_name === chapter?.chapter_name &&
                  "bg-purple-100 dark:bg-slate-900"
                } `}
                onClick={() => {
                  setSelectedChapter(chapter);
                  GetSelectedChapterContent(chapter?.chapter_name);
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="no-scrollbar ml-[264px] w-full flex-1 overflow-y-auto">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>

      {/* Right Sidebar for Questions */}
      <div className="text-dark100_light900 light-border no-scrollbar mt-8 overflow-y-auto border-l shadow-sm md:w-64 lg:w-[260px]">
        <RightSideBar questions={questions} />
      </div>
    </div>
  );
};

export default CourseStart;
