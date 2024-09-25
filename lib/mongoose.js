// import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URL) {
//     return console.log("Missing MongoDB Url");
//   }

//   if (isConnected) {
//     return console.log("MongoDB already connected");
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: "ai-course-generation",
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//   } catch (error) {
//     console.log("Mongodb connection failed", error);
//   }
// };

import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    console.error("Error: Missing MongoDB URL in environment variables.");
    throw new Error("Missing MongoDB URL");
  }

  if (isConnected) {
    console.log("MongoDB is already connected.");
    return mongoose.connection;
  }

  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ai-course-generation",
    });

    isConnected = true;
    console.log("MongoDB connected successfully.");
    return dbConnection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Ensure the error is thrown so it's handled at a higher level
  }
};
