/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
"use server";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";

export const createQuestions = async (params) => {
  try {
    connectToDatabase();
    const { questions, chapterId } = params;
    const questionData = questions.map((question) => {
      // Create an array of options, including the correct answer
      let options = [
        question.options[0], // The correct answer
        question.options[1], // Incorrect option
        question.options[2], // Incorrect option
        question.options[3], // Incorrect option
      ];

      console.log(options);

      // Shuffle the options array to randomize the position of the correct answer
      options = options.sort(() => Math.random() - 0.5);
      // console.log("Shuffled options:", options); // Log options to inspect

      // Return the structure expected by your Mongoose schema
      return {
        chapter: chapterId,
        question: question.question,
        answer: question.answer,
        options: options, // Store options as an object
      };
    });

    // Use Mongoose's `insertMany` to create multiple question documents
    await Question.insertMany(questionData);
    console.log("Questions created successfully");
  } catch (error) {
    console.error("Error creating questions:", error);
  }
};

export const getQuestionByChapterId = async (params) => {
  try {
    connectToDatabase();
    const { chapterId } = params;

    // Fetch questions related to the chapter
    const results = await Question.find({ chapter: chapterId }).lean();

    // Convert _id and other ObjectIds or Buffers to strings
    const plainResults = results.map((result) => ({
      ...result,
      _id: result._id.toString(),
      chapter: result.chapter.toString(), // Convert chapter ObjectId to string if needed
    }));

    return plainResults;
  } catch (error) {
    console.log(error);
    return [];
  }
};
