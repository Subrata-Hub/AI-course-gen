"use server";
import Chapters from "@/database/chapters.model";
import { connectToDatabase } from "../mongoose";

export async function createChapters(params) {
  try {
    connectToDatabase();
    const { courses, chapterName, chapterIndex, content, videoId } = params;
    const chapters = await Chapters.create({
      courses,
      content,
      videoId,
      chapterIndex,
      chapterName,
    });

    return { _id: chapters._id.toString() };
  } catch (error) {
    console.error("Error creating chapter:", error);
    throw new Error("Failed to create chapter.");
  }
}

export async function getChapterById(params) {
  try {
    connectToDatabase();
    const { chapterName, cousesId } = params;

    const chapter = await Chapters.findOne({
      chapterName,
      courses: cousesId,
    }).lean();

    // Manually convert _id and any other fields with ObjectId
    if (chapter) {
      chapter._id = chapter._id.toString();
      chapter.courses = chapter.courses.toString();
    }

    return chapter;
  } catch (error) {
    console.error("Error getting chapter:", error);
    throw new Error("Failed to getting chapter chapter.");
  }
}
