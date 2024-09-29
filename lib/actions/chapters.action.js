"use server";
import Chapters from "@/database/chapters.model";
import { connectToDatabase } from "../mongoose";

export async function createChapters(params) {
  try {
    connectToDatabase();
    const { courses, content, videoId } = params;
    const chapters = await Chapters.create({
      courses,
      content,
      videoId,
    });

    return { _id: chapters._id.toString() };
  } catch (error) {
    console.error("Error creating chapter:", error);
    throw new Error("Failed to create chapter.");
  }
}
