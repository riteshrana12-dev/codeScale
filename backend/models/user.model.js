import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true }, // firstname userInput
  lastName: { type: String, required: true }, // lastname userINPUT
  email: { type: String, required: true, unique: true, trim: true }, // user email
  password: { type: String, required: true, trim: true }, // user password
  role: { type: String, required: true }, // user role
});

const userModel = model("profile", userSchema);
export default userModel;
