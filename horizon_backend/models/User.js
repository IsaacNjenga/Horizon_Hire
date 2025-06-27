import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post_id: { type: mongoose.Schema.Types.ObjectId },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String },
    media_url: { type: String },
    likes: { type: Number },
    comments: { type: [commentSchema] },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String },
    password: { type: String },
    account_type: { type: String, enum: ["freelancer", "client"] },
    profile_picture: { type: String },
    profile_picture_id: { type: String },
    posts: { type: [postSchema] },
  },
  { collection: "users", timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
