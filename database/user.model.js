import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  userProfileImage: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);
export default User;
