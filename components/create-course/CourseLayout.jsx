/* eslint-disable promise/param-names */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import CourseBasicInfo from "../shared/CourseBasicInfo";
import CourseDetail from "../shared/CourseDetail";
import ChapterList from "../shared/ChapterList";
import { usePathname, useRouter } from "next/navigation";
import { getTranscript, getVideos } from "@/lib/services";
import {
  generateCapterContentAI,
  generateCapterQuestions,
} from "@/lib/AiModel";
import { createChapters } from "@/lib/actions/chapters.action";
import { updateCourses } from "@/lib/actions/courses.action";
import { createQuestions } from "@/lib/actions/question.action";

const CourseLayout = ({ courses, courseId }) => {
  const [loading, setLoading] = useState(false);
  const [chapterLoadingStatuses, setChapterLoadingStatuses] = useState([]);
  const [chapterContent, setChapterContent] = useState([]);
  const [showEditButton, setShowEditButton] = useState(true);

  const router = useRouter();
  const pathName = usePathname();

  const MAX_RETRIES = 3;
  const BACKOFF_DELAY = 2000; // Initial delay in milliseconds

  const sanitizeJsonResponse = (response) => {
    try {
      const cleanedResponse = response
        .replace(/,(?=\s*[}\]])/g, "") // Removes trailing commas
        .replace(/\\u0000/g, ""); // Handles null characters

      // Additional checks for missing commas and unclosed strings
      const bracketStack = [];
      for (const char of cleanedResponse) {
        if (char === "{") {
          bracketStack.push("{");
        } else if (char === "}") {
          if (bracketStack.length === 0 || bracketStack.pop() !== "{") {
            throw new Error("Unbalanced brackets in response");
          }
        }
      }

      // If the stack is empty, all brackets are balanced
      if (bracketStack.length !== 0) {
        throw new Error("Unbalanced brackets in response");
      }
      return cleanedResponse;
    } catch (error) {
      console.error("Error sanitizing response", error);
      throw error; // Throw error to handle upstream
    }
  };

  const generateChapterContent = async () => {
    setShowEditButton(false);
    setLoading(true);
    const chapters = courses?.courseOutput?.chapters;
    const chapterStatuses = new Array(chapters.length).fill("loading");
    setChapterLoadingStatuses([...chapterStatuses]);

    // Array to store all created chapter IDs
    const createdChapterIds = [];

    try {
      const chapterPromises = chapters.map(async (chapter, index) => {
        let retryCount = 0;
        let videoId = "";
        let videoFound = false;

        let content;

        const PROMPT = `Explain the concept in detail on Topic:${courses?.name}, chapter:${chapter?.chapter_name}, in JSON Format with list of array with field as title, explanation, Code Example (Code field in <precode> format if applicable).`;

        retryCount = 0;

        while (retryCount < MAX_RETRIES) {
          try {
            const result = await generateCapterContentAI.sendMessage(PROMPT);
            const rawContent = await result?.response?.text();

            // Sanitize and parse the JSON response
            const cleanedContent = sanitizeJsonResponse(rawContent);
            content = JSON.parse(cleanedContent);

            // If successful, break out of the retry loop
            break;
          } catch (jsonError) {
            retryCount++;
            const backoffDelay = BACKOFF_DELAY * Math.pow(2, retryCount - 1);
            console.error(
              `Error parsing JSON content after ${retryCount} retries`,
              jsonError
            );
            if (retryCount === MAX_RETRIES) {
              chapterStatuses[index] = "error";
              setChapterLoadingStatuses([...chapterStatuses]);
              return null;
            }
            await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          }
        }

        // Retry loop for video search with exponential backoff
        while (retryCount < MAX_RETRIES) {
          try {
            const videoRes = await getVideos(
              courses?.name + ":" + chapter?.chapter_name
            );
            if (videoRes.length > 0) {
              videoId = videoRes[0]?.id?.videoId || "";
              videoFound = true;
              break;
            }
          } catch (videoError) {
            retryCount++;
            const backoffDelay = BACKOFF_DELAY * Math.pow(2, retryCount - 1);
            console.warn(
              "Error fetching video. Retrying after",
              backoffDelay,
              "ms"
            );
            if (retryCount === MAX_RETRIES) {
              return; // Skip this chapter if retries are exhausted
            }
            await new Promise((resolve) => setTimeout(resolve, backoffDelay));
            console.error("Error fetching video", videoError);
          }
        }

        // Save the chapter content to the database
        const createdChapter = await createChapters({
          courses: courseId,
          content: content,
          videoId: videoId,
          chapterIndex: index + 1,
          chapterName: chapter?.chapter_name,
        });

        // Push created chapter ID to the array
        if (createdChapter?._id) {
          createdChapterIds.push(createdChapter._id);
        }

        if (videoFound) {
          let transcript = await getTranscript(videoId);
          const maxLength = 500;
          transcript = transcript.split(" ").slice(0, maxLength).join(" ");

          // const questionPrompt = `You are a helpful AI that is able to generate MCQ questions and answers, in JSON Format with list of array, You are to generate a random hard mcq question about ${chapter?.chapter_name} with context of the following transcript: ${transcript}. the length of each answer should not be more than 15 words,`;
          const questionPrompt = `You are a helpful AI that generates 3 hard MCQ questions. Generate a JSON format with fields: question, answer, and options (with 4 choices), based on the transcript: ${transcript}. The length of each answer should not exceed 15 words.`;

          try {
            const results =
              await generateCapterQuestions.sendMessage(questionPrompt);
            const questions = JSON.parse(results?.response?.text());

            await createQuestions({
              questions,
              chapterId: createdChapter?._id,
            });
          } catch (error) {
            console.log(error);
          }
        }

        // Update chapter content state for display
        setChapterContent((prevContent) => [...prevContent, content]);
        chapterStatuses[index] = "completed";
        setChapterLoadingStatuses([...chapterStatuses]);
      });

      await Promise.all(chapterPromises);

      await updateCourses({
        courseId,
        updatedData: { publish: true, newchapters: createdChapterIds },
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

      <CourseBasicInfo
        course={courses}
        courseId={courseId}
        showEditButton={showEditButton}
      />
      <CourseDetail course={courses} />
      <ChapterList
        course={courses}
        courseId={courseId}
        loading={loading}
        chapterLoadingStatuses={chapterLoadingStatuses}
        chapterContent={chapterContent}
        showEditButton={showEditButton}
      />
      <Button
        className="primary-gradient my-4 min-h-[36px] rounded-xl p-4 !text-light-900"
        onClick={generateChapterContent}
      >
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
