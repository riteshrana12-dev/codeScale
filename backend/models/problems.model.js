import { Schema, model } from "mongoose";

const exampleSchema = new Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  explanation: { type: String },
});

const testCaseSchema = new Schema({
  input: { type: Object, required: true }, // structured inPut
  expectedOutput: { type: Object, required: true }, // structured outPut
});

const solutionSchema = new Schema({
  language: { type: String, required: true }, // e.g. "JavaScript"
  code: { type: String, required: true },
});

const problemsSchema = new Schema({
  title: { type: String, required: true, unique: true },
  functionName: { type: String, required: true },
  description: { type: String, required: true }, // Problem statement
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
    lowercase: true,
  },

  // THE KEY ADDITION:
  points: {
    type: Number,
    required: true,
    // Automatically assigns points if you forget to provide them
    default: function () {
      if (this.difficulty === "easy") return 10;
      if (this.difficulty === "medium") return 30;
      if (this.difficulty === "hard") return 60;
      return 0;
    },
  },

  tags: [{ type: String }], // ["Array", "HashMap"]
  constraints: [{ type: String }], // ["1 <= nums.length <= 10^4"]
  examples: [exampleSchema], // sample inputs/outputs
  testCases: [testCaseSchema], // hidden evaluation cases
  solutions: [solutionSchema], // reference solutions
  // createdBy: { type: Schema.Types.ObjectId }, // admin/author
  createdAt: { type: Date, default: Date.now },
});

const problemsModel = model("Question", problemsSchema);
export default problemsModel;
