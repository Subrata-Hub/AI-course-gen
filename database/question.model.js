import { model, models, Schema } from "mongoose";

const QuestionSchema = new Schema({
  chapter: { type: Schema.Types.ObjectId, ref: "Chapters", required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  options: { type: [String], required: true },
});

const Question = models.Question || model("Question", QuestionSchema);
export default Question;
