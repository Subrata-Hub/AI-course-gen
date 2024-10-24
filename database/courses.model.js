import { model, models, Schema } from "mongoose";

const CoursesSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  label: { type: String, required: true },
  includeVideo: { type: String, required: true, default: "yes" },
  courseOutput: { type: Object, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  courseBanner: { type: String, default: "/placeholder.png" },
  publish: { type: Boolean, default: false },
  newchapters: [{ type: Schema.Types.ObjectId, ref: "Chapters", default: [] }],
});

const Courses = models.Courses || model("Courses", CoursesSchema);
export default Courses;
