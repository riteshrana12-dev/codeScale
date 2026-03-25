import { Schema, model } from "mongoose";

const submissionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "profile" },
  problemId: { type: Schema.Types.ObjectId, ref: "Question" },
  code: { type: String, required: true },
  language: { type: String, required: true },
  statue: {
    type: String,
    enum: ["pending", "accepted", "failed", "error"],
    default: "pending",
  },
  testCaseResults: [
    {
      input: Object,
      expectedOutput: Object,
      output: Object,
      status: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const submissionModel = model("submission", submissionSchema);

export default submissionModel;
