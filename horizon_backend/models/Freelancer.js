import mongoose from "mongoose";

//setup collaboration
const skillsSchema = new mongoose.Schema(
  {
    name: { type: String },
    test_score: { type: Number },
    verified: { type: Boolean },
    verified_by: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    verification_attempts: { type: Number },
    revoked: { type: Boolean },
    last_verified_at: { type: Date },
  },
  { _id: true }
);

const ratingSchema = new mongoose.Schema(
  {
    freelancer_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    skill_id: { type: mongoose.Schema.Types.ObjectId },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    stars: { type: Number },
    feedback: { type: String },
  },
  { timestamps: true }
);

const freelancerSchema = new mongoose.Schema(
  {
    bio: { type: String },
    is_verified: { type: Boolean },
    verification_status: {
      type: String,
      enum: ["pending", "partial", "verified"],
    },
    profile_completed: { type: Boolean },
    skills: { type: [skillsSchema], default: [] },
    rating_history: { type: [ratingSchema] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "freelancers", timestamps: true }
);

const FreelancerModel = mongoose.model("freelancers", freelancerSchema);
export default FreelancerModel;
