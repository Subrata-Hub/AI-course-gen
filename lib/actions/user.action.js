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
    const user = await User.findOne({ clerkId: userId });

    // return {
    //   _id: user._id.toString(),

    // };
    return user;
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
    // const { _id } = params;
    // console.log(_id);
    const { mongoUser } = params;
    console.log(mongoUser);

    const userCourses = await Courses.find({ author: mongoUser })
      .populate("author")
      .lean();
    return userCourses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
