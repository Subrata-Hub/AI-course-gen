"use server";
import Courses from "@/database/courses.model";
import { connectToDatabase } from "../mongoose";
import mongoose from "mongoose"; // Import mongoose to use isValidObjectId
import { revalidatePath } from "next/cache";
import User from "@/database/user.model";
import Chapters from "@/database/chapters.model";

export async function getAllCourses(params) {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 6 } = params;

    const skipAmount = (page - 1) * pageSize;

    const courses = await Courses.find()
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .lean();

    const totalCouses = await Courses.countDocuments();

    const isNext = totalCouses > skipAmount + courses.length;

    const formattedCourses = courses.map((course) => ({
      ...course,
      _id: course._id.toString(), // Convert ObjectId to string
      author: {
        ...course.author,
        _id: course.author._id.toString(), // Convert ObjectId for author
      },
    }));

    return { courses: formattedCourses, isNext };

    // return { courses, isNext };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw new Error("Failed to fetch course.");
  }
}

export async function getCoursesById(params) {
  try {
    connectToDatabase();

    const { courseId } = params;

    // Validate if the provided courseId is a valid ObjectId
    if (!mongoose.isValidObjectId(courseId)) {
      throw new Error(`Invalid courseId: ${courseId}`);
    }

    const courses = await Courses.findById(courseId)
      // .populate("newchapters")
      .lean();
    if (!courses) {
      throw new Error("Course not found");
    }

    // console.log(courses);

    return {
      ...courses,
      _id: courses._id.toString(), // Convert ObjectId to string
      author: courses.author.toString(), // Convert ObjectId to string
      courseOutput: {
        ...courses.courseOutput,
        // Convert any nested object as needed
        chapters: courses.courseOutput.chapters.map((chapter) => ({
          ...chapter,
        })),
      },
    };
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw new Error("Failed to fetch course.");
  }
}

export async function createCourses(params) {
  try {
    connectToDatabase();

    const { name, category, label, courseOutput, author } = params;

    // Create the course
    const courses = await Courses.create({
      name,
      category,
      label,
      courseOutput,
      author,
    });

    // Return a plain object with only the necessary data
    return {
      _id: courses._id.toString(), // Convert ObjectId to string
    };
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course.");
  }
}

export async function updateCourses(params) {
  try {
    await connectToDatabase();
    const { courseId, updatedData, path } = params;

    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if the course was updated successfully
    if (!updatedCourse) {
      console.error("Course not found for the provided ID");
      throw new Error("Course not found");
    }

    console.log("Successfully updated course:", updatedCourse);

    revalidatePath(path);
  } catch (error) {
    console.error("Error in updateCourses function:", error.message); // Log the specific error message
    throw new Error("Failed to update course. " + error.message); // Pass the detailed error message
  }
}

export async function deleteCouses(params) {
  try {
    await connectToDatabase();
    const { courseId, path } = params;
    await Courses.deleteOne({ _id: courseId });
    await Chapters.deleteMany({ courses: courseId });
    revalidatePath(path);
  } catch (error) {
    console.error("Error in deleteCourses function:", error.message); // Log the specific error message
    throw new Error("Failed to delete course. " + error.message); // Pass the detailed error message
  }
}
