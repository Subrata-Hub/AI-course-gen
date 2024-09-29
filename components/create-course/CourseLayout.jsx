/* eslint-disable object-shorthand */
"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CourseBasicInfo from "../shared/CourseBasicInfo";
import CourseDetail from "../shared/CourseDetail";
import ChapterList from "../shared/ChapterList";
import { usePathname, useRouter } from "next/navigation";
import { getVideos } from "@/lib/services";
import { generateCapterContentAI } from "@/lib/AiModel";
import { createChapters } from "@/lib/actions/chapters.action";
import { updateCourses } from "@/lib/actions/courses.action";

const CourseLayout = ({ courses, courseId }) => {
  const [loading, setLoading] = useState(false);
  const [chapterLoadingStatuses, setChapterLoadingStatuses] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  const MAX_RETRIES = 3;

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = courses?.courseOutput?.chapters;
    const chapterStatuses = new Array(chapters.length).fill("loading");
    setChapterLoadingStatuses([...chapterStatuses]);

    try {
      const chapterPromises = chapters.map(async (chapter, index) => {
        let retryCount = 0;
        let content = null;
        let videoId = "";

        // Retry loop for content generation
        while (retryCount < MAX_RETRIES) {
          try {
            // Generate Video URL
            const videoRes = await getVideos(
              courses?.name + ":" + chapter?.chapter_name
            );
            videoId = videoRes[0]?.id?.videoId || "";

            // Generate content using AI
            const PROMPT = `Explain the concept in detail on Topic:${courses?.name}, chapter:${chapter?.chapter_name}, in JSON Format...`;
            const result = await generateCapterContentAI.sendMessage(PROMPT);
            const rawContent = await result?.response?.text();

            // Parse JSON content
            content = JSON.parse(rawContent);

            // If we successfully get content, break the loop
            break;
          } catch (jsonError) {
            retryCount++;
            if (retryCount === MAX_RETRIES) {
              console.error(
                `Error parsing JSON content after ${MAX_RETRIES} retries`,
                jsonError
              );
              chapterStatuses[index] = "error";
              setChapterLoadingStatuses([...chapterStatuses]);
              return; // Skip this chapter if retries are exhausted
            }
          }
        }

        // Save the chapter content to the database
        await createChapters({
          courses: courseId,
          content: content,
          videoId: videoId,
        });

        chapterStatuses[index] = "completed";
        setChapterLoadingStatuses([...chapterStatuses]);
      });

      await Promise.all(chapterPromises);

      await updateCourses({
        courseId,
        updatedData: { publish: true },
        path: pathName,
      });

      router.replace(`/create-course/${courseId}/finish`);
    } catch (error) {
      console.error("Error generating chapter content", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-7 md:px-20 lg:px-32">
      <h2 className="h1-bold text-center text-blue-500">Course Layout</h2>

      <CourseBasicInfo course={courses} courseId={courseId} />
      <CourseDetail course={courses} />
      <ChapterList
        course={courses}
        courseId={courseId}
        loading={loading}
        chapterLoadingStatuses={chapterLoadingStatuses}
      />
      <Button
        className="primary-gradient my-4 min-h-[36px] rounded-xl p-4 !text-light-900"
        onClick={GenerateChapterContent}
      >
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
