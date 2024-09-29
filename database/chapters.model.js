import { model, models, Schema } from "mongoose";

const ChaptersSchema = new Schema({
  courses: { type: Schema.Types.ObjectId, ref: "Courses" },
  content: { type: Object, required: true },
  videoId: { type: String, required: true },
});

const Chapters = models.Chapters || model("Chapters", ChaptersSchema);
export default Chapters;
