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
  title: { type: String, required: true, unique: true }, // "Two Sum"
  functionName: { type: String, required: true },
  description: { type: String, required: true }, // Problem statement
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
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
