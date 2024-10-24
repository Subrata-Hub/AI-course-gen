import { model, models, Schema } from "mongoose";
import { type } from "os";

const ChaptersSchema = new Schema({
  courses: { type: Schema.Types.ObjectId, ref: "Courses" },
  chapterIndex: { type: Number, require: type, default: 1 },
  chapterName: { type: String },
  content: { type: Object, required: true },
  videoId: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
});

const Chapters = models.Chapters || model("Chapters", ChaptersSchema);
export default Chapters;
