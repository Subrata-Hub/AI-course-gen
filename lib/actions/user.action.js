/* eslint-disable no-unused-vars */
"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Courses from "@/database/courses.model";
// import { revalidatePath } from "next/cache";

export async function getUserById(params) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId }).lean();

    return {
      ...user,
      _id: user._id.toString(),
    };
    // return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(params) {
  try {
    connectToDatabase();
    const { clerkId, updateData } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    // revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourses(params) {
  try {
    connectToDatabase();

    const { mongoUser } = params;
    console.log(mongoUser);

    // Fetch courses by author and ensure all documents are plain objects
    const userCourses = await Courses.find({ author: mongoUser })
      .populate("author")
      .lean();

    const totalUserCourses = await Courses.countDocuments({
      author: mongoUser,
    });

    // Transform MongoDB _id fields into plain strings
    const plainUserCourses = userCourses.map((course) => ({
      ...course,
      _id: course._id.toString(),
      author: {
        ...course.author,
        _id: course.author._id.toString(),
      },
    }));

    return { plainUserCourses, totalUserCourses };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
