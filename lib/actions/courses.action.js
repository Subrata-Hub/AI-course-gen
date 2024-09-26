// "use server";
// import Courses from "@/database/courses.model";
// import { connectToDatabase } from "../mongoose";

// export async function createCourses(params) {
//   try {
//     connectToDatabase();

//     const { name, category, label, courseOutput, author } = params;

//     // create the Courses
//     const courses = await Courses.create({
//       name,
//       category,
//       label,
//       courseOutput,
//       author,
//     });

//     return courses;
//   } catch (error) {
//     console.error("Error creating course:", error);
//     throw new Error("Failed to create course.");
//   }
// }

"use server";
import Courses from "@/database/courses.model";
import { connectToDatabase } from "../mongoose";

export async function getCoursesById(params) {
  try {
    connectToDatabase();
    const { courseId } = params;
    const courses = await Courses.findOne({ _id: courseId });
    console.log(courses);
    return courses;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course.");
  }
}

export async function createCourses(params) {
  try {
    connectToDatabase();

    const { name, category, label, courseOutput, author } = params;

    // Create the course
    const course = await Courses.create({
      name,
      category,
      label,
      courseOutput,
      author,
    });

    // Return a plain object with only the necessary data
    return {
      _id: course._id.toString(), // Convert ObjectId to string
      name: course.name,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course.");
  }
}
