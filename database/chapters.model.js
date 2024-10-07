import { model, models, Schema } from "mongoose";
import { type } from "os";

const ChaptersSchema = new Schema({
  courses: { type: Schema.Types.ObjectId, ref: "Courses" },
  chapterIndex: { type: Number, require: type },
  content: { type: Object, required: true },
  videoId: { type: String, required: true },
});

const Chapters = models.Chapters || model("Chapters", ChaptersSchema);
export default Chapters;
