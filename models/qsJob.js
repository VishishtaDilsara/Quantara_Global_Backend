import mongoose from "mongoose";

const QsJobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "completed"],
    default: "pending",
  },
});

const QsJob = mongoose.model("qsJobs", QsJobSchema);

export default QsJob;
