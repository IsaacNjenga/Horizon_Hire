import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String },
    description: { type: String },
    required_skills: { type: [String] },
    assigned_freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "reassigned"],
    },
    submitted_at: { type: Date },
    reassigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    deadline: { type: Date },
  },
  { timestamps: true }
);

const skillSampleReviewSchema = new mongoose.Schema({
  reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  skill_id: { type: mongoose.Schema.Types.ObjectId },
  sample_id: { type: mongoose.Schema.Types.ObjectId },
  rating: { type: Number },
  approved: { type: Boolean },
  notes: { type: String },
  reviewed_at: { type: Date },
});

const clientSchema = new mongoose.Schema(
  {
    company_name: { type: String },
    posted_jobs: { type: [jobSchema] },
    verification_votes: { type: [skillSampleReviewSchema] },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "clients", timestamps: true }
);

const ClientModel = mongoose.model("clients", clientSchema);
export default ClientModel;
