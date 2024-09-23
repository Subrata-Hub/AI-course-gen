import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MongoDB Url");
  }

  if (isConnected) {
    return console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ai-course-generation",
    });

    isConnected = true;
  } catch (error) {
    console.log("Mongodb connection failed", error);
  }
};
