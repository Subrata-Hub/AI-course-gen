"use server";
import Courses from "@/database/courses.model";
import { connectToDatabase } from "../mongoose";

export async function createCourses(params) {
  try {
    connectToDatabase();

    const { name, category, label, courseOutput, author } = params;

    // create the Courses
    const courses = await Courses.create({
      name,
      category,
      label,
      courseOutput,
      author,
    });

    return courses;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course.");
  }
}
